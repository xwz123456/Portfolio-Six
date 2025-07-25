// 当前页面状态
let currentPage = 'items';
// 存储删除参数 { type: 'items'|'stocks', identifier: id|symbol }
let deleteParams = null;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 加载初始数据
    loadItemsData();

    // 侧边栏切换事件
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.addEventListener('click', () => {
            // 更新活跃状态
            document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // 切换页面
            currentPage = item.dataset.page;
            switchPage(currentPage);
        });
    });

    // 搜索框事件
    document.getElementById('items-search').addEventListener('input', debounce(searchItems, 300));
    document.getElementById('stocks-search').addEventListener('input', debounce(searchStocks, 300));

    // 模态框事件
    document.getElementById('cancel-delete').addEventListener('click', hideDeleteModal);
    document.getElementById('confirm-delete').addEventListener('click', performDelete);
});

// 切换页面
function switchPage(page) {
    // 更新标题
    document.getElementById('page-title').textContent =
        page === 'items' ? 'Items 表管理' : 'Stocks 表管理';

    // 显示/隐藏页面
    document.getElementById('items-page').classList.toggle('hidden', page !== 'items');
    document.getElementById('stocks-page').classList.toggle('hidden', page !== 'stocks');

    // 加载对应页面数据
    if (page === 'items') {
        loadItemsData();
    } else {
        loadStocksData();
    }
}

// 加载Items表数据
async function loadItemsData(search = '') {
    try {
        let url = 'http://localhost:3000/items/items';
        if (search) {
            url += `?search=${encodeURIComponent(search)}`;
        }

        const response = await fetch(url);
        const result = await response.json();

        const tableBody = document.getElementById('items-table-body');

        if (result.success && result.data.length > 0) {
            // 渲染数据
            tableBody.innerHTML = result.data.map(item => `
                <tr class="hover:bg-gray-50 transition-colors">
                    <td class="table-cell">${item.id}</td>
                    <td class="table-cell">${item.name}</td>
                    <td class="table-cell">${item.type}</td>
                    <td class="table-cell">${item.value}</td>
                    <td class="table-cell">${item.description || '-'}</td>
                    <td class="table-cell">${item.quantity}</td>
                    <td class="table-cell">
                        <button class="text-red-500 hover:text-red-700 transition-colors"
                            onclick="showDeleteModal('items', ${item.id})">
                            <i class="fa fa-trash-o"></i> 删除
                        </button>
                    </td>
                </tr>
            `).join('');
        } else {
            // 无数据状态
            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="table-cell text-center text-gray-500 py-8">
                        <i class="fa fa-inbox mr-2"></i>${search ? '未找到匹配数据' : '暂无数据'}
                    </td>
                </tr>
            `;
        }
    } catch (error) {
        console.error('加载Items数据失败:', error);
        document.getElementById('items-table-body').innerHTML = `
            <tr>
                <td colspan="5" class="table-cell text-center text-red-500 py-8">
                    <i class="fa fa-exclamation-circle mr-2"></i>加载失败，请重试
                </td>
            </tr>
        `;
    }
}

// 加载Stocks表数据
async function loadStocksData(search = '') {
    try {
        let url = 'http://localhost:3000/stocks/stock';
        if (search) {
            url += `?search=${encodeURIComponent(search)}`;
        }

        const response = await fetch(url);
        const result = await response.json();

        const tableBody = document.getElementById('stocks-table-body');

        if (result.success && result.data.length > 0) {
            // 渲染数据
            tableBody.innerHTML = result.data.map(stock => `
                <tr class="hover:bg-gray-50 transition-colors">
                    <td class="table-cell font-medium">${stock.symbol}</td>
                    <td class="table-cell">${stock.company_name}</td>
                    <td class="table-cell">$${stock.price}</td>
                    <td class="table-cell ${stock.change_val >= 0 ? 'text-green-500' : 'text-red-500'}">
                        ${stock.change_val >= 0 ? '+' : ''}${stock.change_val}
                    </td>
                    <td class="table-cell ${stock.percent_change >= 0 ? 'text-green-500' : 'text-red-500'}">
                        ${stock.percent_change >= 0 ? '+' : ''}${stock.percent_change}%
                    </td>
                    <td class="table-cell">${stock.volume}</td>
                    <td class="table-cell">
                        <button class="text-red-500 hover:text-red-700 transition-colors"
                            onclick="showDeleteModal('stocks', '${stock.symbol}')">
                            <i class="fa fa-trash-o"></i> 删除
                        </button>
                    </td>
                </tr>
            `).join('');
        } else {
            // 无数据状态
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="table-cell text-center text-gray-500 py-8">
                        <i class="fa fa-inbox mr-2"></i>${search ? '未找到匹配数据' : '暂无数据'}
                    </td>
                </tr>
            `;
        }
    } catch (error) {
        console.error('加载Stocks数据失败:', error);
        document.getElementById('stocks-table-body').innerHTML = `
            <tr>
                <td colspan="7" class="table-cell text-center text-red-500 py-8">
                    <i class="fa fa-exclamation-circle mr-2"></i>加载失败，请重试
                </td>
            </tr>
        `;
    }
}

// 搜索Items
function searchItems() {
    const searchTerm = document.getElementById('items-search').value.trim();
    loadItemsData(searchTerm);
}

// 搜索Stocks
function searchStocks() {
    const searchTerm = document.getElementById('stocks-search').value.trim();
    loadStocksData(searchTerm);
}

// 显示删除确认框
function showDeleteModal(type, identifier) {
    deleteParams = { type, identifier };
    document.getElementById('delete-modal').classList.remove('hidden');
}

// 隐藏删除确认框
function hideDeleteModal() {
    deleteParams = null;
    document.getElementById('delete-modal').classList.add('hidden');
}

// 执行删除操作
async function performDelete() {
    if (!deleteParams) return;

    const { type, identifier } = deleteParams;
    let apiUrl = '';

    // 根据类型构建不同的删除URL
    if (type === 'items') {
        apiUrl = `http://localhost:3000/items/items/${identifier}`;
    } else if (type === 'stocks') {
        apiUrl = `http://localhost:3000/stocks/stock/${identifier}`;
    } else {
        alert('无效的操作类型');
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (response.ok && result.success) {
            // 删除成功，重新加载数据
            if (type === 'items') {
                loadItemsData(document.getElementById('items-search').value.trim());
            } else {
                loadStocksData(document.getElementById('stocks-search').value.trim());
            }
            hideDeleteModal();
            alert('删除成功');
        } else {
            throw new Error(result.message || '删除失败');
        }
    } catch (error) {
        console.error('删除失败:', error);
        alert(`删除失败: ${error.message}`);
    }
}

// 防抖函数 - 优化搜索性能
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// 暴露函数到全局，供HTML中onclick调用
window.showDeleteModal = showDeleteModal;
