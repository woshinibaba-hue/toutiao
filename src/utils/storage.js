// 封装本地存储模块

// 设置本地存储数据
export const setItem = (name, data) => {
  // 判断传入的数据是否为 对象类型
  if (typeof data === 'object') {
    // 如果是对象类型，则转换为 json 字符串，因为本地存储只能存字符串格式的数据
    data = JSON.stringify(data)
  }
  // 将数据存入本地存储当中
  window.localStorage.setItem(name, data)
}

// 获取本地存储数据
export const getItem = name => {
  // 获取本地存储的数据
  const data = window.localStorage.getItem(name)
  // 这里为什么使用try catch呢
  // 因为数据可能不是 json 字符串，所有转换可能会出错
  try {
    // 尝试将读取的数据转换为 JavaScript 对象类型
    return JSON.parse(data)
  } catch (error) {
    // 如果出错了，直接将源数据返回即可
    return data
  }
}

// 删除本地存储数据
export const removeItem = name => {
  // 删除本地存储的数据，直接调用方法即可
  window.localStorage.removeItem(name)
}
