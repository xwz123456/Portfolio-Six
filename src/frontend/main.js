const API_URL = 'http://localhost:3000';
const itemsContainer = document.getElementById('itemsContainer');
const addItemForm = document.getElementById('addItemForm');
const errorContainer = document.getElementById('error');

// 加载所有项目
async function loadItems() {
  try {
    const response = await fetch(`${API_URL}/items`);
    if (!response.ok) throw new Error('Failed to load items');

    const items = await response.json();
    renderItems(items);
  } catch (err) {
    console.error('Error loading items:', err);
    itemsContainer.innerHTML = `<p>Error loading items: ${err.message}</p>`;
  }
}

// 渲染项目列表
function renderItems(items) {
  if (items.length === 0) {
    itemsContainer.innerHTML = '<p>No items in portfolio</p>';
    return;
  }

  itemsContainer.innerHTML = items.map(item => `
        <div class="item">
            <h3>${item.name}</h3>
            <p>Type: ${item.type}</p>
            <p>Value: $${parseFloat(item.value).toFixed(2)}</p>
            ${item.description ? `<p>${item.description}</p>` : ''}
            <small>Added: ${new Date(item.created_at).toLocaleString()}</small>
            <button class="delete" onclick="deleteItem(${item.id})">Delete</button>
        </div>
    `).join('');
}

// 添加新项目
async function addItem(event) {
  event.preventDefault();

  const formData = new FormData(addItemForm);
  const itemData = Object.fromEntries(formData.entries());

  // 处理空值
  if (itemData.value === '') itemData.value = 0;
  if (itemData.description === '') itemData.description = '';

  try {
    const response = await fetch(`${API_URL}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemData)
    });

    if (!response.ok) throw new Error('Failed to add item');

    loadItems(); // 重新加载项目
    addItemForm.reset(); // 重置表单
  } catch (err) {
    console.error('Error adding item:', err);
    errorContainer.textContent = `Error adding item: ${err.message}`;
  }
}

// 删除项目
async function deleteItem(id) {
  if (!confirm('Are you sure you want to delete this item?')) return;

  try {
    const response = await fetch(`${API_URL}/items/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Failed to delete item');

    loadItems(); // 重新加载项目
  } catch (err) {
    console.error('Error deleting item:', err);
    errorContainer.textContent = `Error deleting item: ${err.message}`;
  }
}

// 事件监听
addItemForm.addEventListener('submit', addItem);

// 页面加载时加载项目
document.addEventListener('DOMContentLoaded', loadItems);