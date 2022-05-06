/**
 * 处理数字字符串，去除空格，多余的点，保留两位小数
 * @param val 数值字符串
 * @returns 返回处理后的字符串
 */
export function verifyNumberIntegerAndFloat (val: string): string {
  // 匹配空格
  let v = val.replace(/\s/g, '')
  // 去除除了数字和小数点
  v = v.replace(/[^\d.]/g, '')
  // 去除开始的点
  v = v.replace(/^\./g, '')
  // 只能以一个0开始
  v = v.replace(/^0{2,}/g, '0')
  // 只能有一个小数点
  v = v.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  // 保留两位小数
  v = v.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
  return v
}

/**
 * 处理整数字符串，去除小数点、空格、前缀0
 * @param val 整数字符串
 * @returns 处理后的整数字符串
 */
export function verifyNumberInteger (val: string): string {
  // 去除空格
  let v = val.replace(/\s/g, '')
  // 去除点
  v = v.replace(/[.]+/g, '')
  // 去除开头的0
  v = v.replace(/(^0*)([1-9][\d]*)/g, '$2')
  // 字符全是0时只取一个0
  v = v.replace(/^0*/g, '0')
  return v
}

/**
 * 去除字符串中的中文和空格
 * @param val 需要处理的字符串
 * @returns 处理后的字符串
 */
export function verifyCNAndSpace (val: string): string {
  return val.replace(/[\u4e00-\u9fa5\s]+/g, '')
}

/**
 * 去除字符串中的英文和空格
 * @param val 需要处理的字符串
 * @returns 处理后的字符串
 */
export function verifyENAndSpace (val: string): string {
  return val.replace(/[a-zA-Z\s]+/g, '')
}

/**
 * 去除字符串中的空格
 * @param val 需要处理的字符串
 * @returns 处理后的字符串
 */
export function veritySpace (val: string): string {
  return val.replace(/\s/, '')
}
