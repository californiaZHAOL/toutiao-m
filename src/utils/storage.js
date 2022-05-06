/**
 * 封装本地存储的操作
 */

export const setItem = (key, value) => {
  if (!(value instanceof String)) {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

export const getItem = (key) => {
  const value = localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch (err) {
    return value
  }
}

export const removeItem = (key) => {
  localStorage.removeItem(key)
}
