const userId = 1; // 这里写死用户ID，实际可根据登录态获取

// 获取总资产与总收益历史
async function fetchHistory() {
    const res = await fetch(`http://localhost:3000/assets/history/${userId}`);
    const data = await res.json();
    return data.data || [];
}

async function renderHistoryChart() {
    const history = await fetchHistory();
    const dates = history.map(item => item.record_date);
    const totalAssets = history.map(item => item.total_assets);
    const totalProfits = history.map(item => item.total_profit);

    const chartDom = document.getElementById('historyChart');
    const myChart = echarts.init(chartDom);
    const option = {
        tooltip: { trigger: 'axis' },
        legend: { data: ['总资产', '总收益'] },
        xAxis: { type: 'category', data: dates },
        yAxis: [
            { type: 'value', name: '总资产', position: 'left' },
            { type: 'value', name: '总收益', position: 'right' }
        ],
        series: [
            {
                name: '总资产',
                type: 'line',
                data: totalAssets,
                yAxisIndex: 0
            },
            {
                name: '总收益',
                type: 'bar',
                data: totalProfits,
                yAxisIndex: 1
            }
        ]
    };
    myChart.setOption(option);
}
renderHistoryChart();






// 获取资产明细
async function fetchAssets(assetType = 'all') {
    let url = `http://localhost:3000/assets/asset/${userId}`;
    if (assetType !== 'all') {
        url = `http://localhost:3000/assets/asset/${userId}/${assetType}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    return data.data || [];
}

// 渲染资产表格
async function renderAssetTable() {
    const assetType = document.getElementById('assetTypeSelect').value;
    const assets = await fetchAssets(assetType);
    const tbody = document.querySelector('#assetTable tbody');
    tbody.innerHTML = '';
    assets.forEach(a => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${a.asset_type}</td>
      <td>${a.asset_code}</td>
      <td>${a.asset_name}</td>
      <td>${a.quantity}</td>
      <td>${a.purchase_price}</td>
      <td>${a.current_price}</td>
      <td>${a.total_profit}</td>
    `;
        tbody.appendChild(tr);
    });
}

// 获取收益汇总
async function fetchSummary() {
    const res = await fetch(`http://localhost:3000/assets/rate/${userId}`);
    const data = await res.json();
    return data.data || [];
}

// // 渲染收益汇总方块
// async function renderSummary() {
//     const summary = await fetchSummary();
//     const grid = document.getElementById('summaryGrid');
//     grid.innerHTML = '';
//     const types = ['stock', 'bond', 'fund', 'crypto'];
//     const typeNames = { stock: '股票', bond: '债券', fund: '基金', crypto: '加密货币' };
//     types.forEach(type => {
//         const item = summary.find(s => s.asset_type === type) || {};
//         const profit = item.total_current && item.total_cost ? (item.total_current - item.total_cost).toFixed(2) : '0.00';
//         const rate = item.return_rate !== null && item.return_rate !== undefined ? item.return_rate.toFixed(2) + '%' : '--';
//         const div = document.createElement('div');
//         div.style = 'width:120px;height:120px;border:1px solid #ccc;display:flex;flex-direction:column;align-items:center;justify-content:center;';
//         div.innerHTML = `
//       <strong>${typeNames[type]}</strong>
//       <div>总收益：${profit}</div>
//       <div>收益率：${rate}</div>
//     `;
//         grid.appendChild(div);
//     });
// }
//// 渲染收益汇总方块
async function renderSummary() {
    const summary = await fetchSummary();
    const grid = document.getElementById('summaryGrid');
    grid.innerHTML = '';
    const types = ['stock', 'bond', 'fund', 'crypto'];
    const typeNames = { stock: '股票', bond: '债券', fund: '基金', crypto: '加密货币' };
    types.forEach(type => {
        const item = summary.find(s => s.asset_type === type) || {};
        const profit = item.total_profit !== undefined ? item.total_profit.toFixed(2) : '0.00';
        const rate = item.return_rate !== undefined && item.return_rate !== null ? (item.return_rate * 100).toFixed(2) + '%' : '--';
        const div = document.createElement('div');
        div.style = 'width:120px;height:120px;border:1px solid #ccc;display:flex;flex-direction:column;align-items:center;justify-content:center;';
        div.innerHTML = `
          <strong>${typeNames[type]}</strong>
          <div>总收益：${profit}</div>
          <div>收益率：${rate}</div>
        `;
        grid.appendChild(div);
    });
}


// 下拉框事件
document.getElementById('assetTypeSelect').addEventListener('change', renderAssetTable);

// 初始化
renderAssetTable();
renderSummary();