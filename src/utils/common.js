/**
 * Array转树形结构的算法
 * @params list     代转化数组
 * @params parentId 起始节点（默认为'0'）
 * @params pKey     父节点key值。默认pid
 * @params cKey     当前节点唯一标志。默认id
 */
export function getTrees (list, parentId = '0', pKey = 'pid', cKey = 'id') {
  const items = {}
  // 获取每个节点的直属子节点，*记住是直属，不是所有子节点
  for (let i = 0; i < list.length; i++) {
    const key = list[i][pKey]
    if (items[key]) {
      items[key].push(list[i])
    } else {
      items[key] = []
      items[key].push(list[i])
    }
  }
  return formatTree(items, parentId, cKey)
}

// 利用递归格式化每个节点
function formatTree (items, parentId, cKey) {
  const result = []
  if (!items[parentId]) {
    return result
  }
  for (const t of items[parentId]) {
    const temp = formatTree(items, t[cKey], cKey)
    if (temp.length > 0) {
      t.children = temp
    }
    result.push(t)
  }
  return result
}
/**
 * 3d环状图
 */
export function chartPie3d (params) {
  const option = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      options3d: {
        enabled: true,
        alpha: 70 // 倾斜角度
      }
    },
    title: {
      text: ''
    },
    credits: {
      enabled: false // 关闭版权信息的标签
    },
    plotOptions: {
      pie: {
        size: '110%',
        innerSize: 190, // 中间空圆的大小
        depth: 8, // 厚度
        dataLabels: {
          enabled: false
        },
        showInLegend: false
      }
    },
    series: [{
      name: params.data.name,
      data: [{
        y: Number(params.data.value),
        color: params.color
      },
      {
        y: 100 - Number(params.data.value),
        color: 'rgba(255,46,10,0)'
      }
      ]
    }]
  }
  return option
}
