import { ElMessage } from 'element-plus'

/**
 * hex颜色转rgb
 * @param str hex字符串
 * @returns 转换后的值
 */
export function hexToRgb (str: string): any {
  let hexs: RegExpMatchArray | null = []
  const reg = /^#[0-9a-fA-f]{6}$/
  if (!reg.test(str)) return ElMessage.error('hex颜色值格式错误')
  str = str.replace('#', '')
  hexs = str.match(/../g)
  if (hexs === null) return hexs
  for (let index = 0; index < 3; index++) {
    hexs[index] = String(parseInt(hexs[index], 16))
  }
  return hexs
}

/**
 * rgb值转hex值
 * @param r 红色值
 * @param g 绿色值
 * @param b 蓝色值
 * @returns 返回hex字符串
 */
export function rgbToHex (r: number, g: number, b: number): any {
  const reg = /^d{1,3}$/
  if (!reg.test(r.toString()) || !reg.test(g.toString()) || !reg.test(b.toString())) {
    return ElMessage.error('rgb颜色值错误')
  }
  const hexs = [r.toString(16), g.toString(16), b.toString(16)]
  for (let index = 0; index < 3; index++) {
    if (hexs[index].length === 1) hexs[index] = `0${hexs[index]}`
  }
  return `#${hexs.join()}`
}

/**
 * 加深颜色
 * @param color 颜色Hex字符串
 * @param level 加深的程度，0-1之间
 * @returns 返回处理后的颜色Hex字符串
 */
export function getDarkColor (color: string, level: number): any {
  const reg = /^#[0-9a-fA-f]{6}$/
  if (!reg.test(color)) return ElMessage.error('hex颜色值格式错误')
  const rgb = hexToRgb(color)
  for (let index = 0; index < 3; index++) {
    rgb[index] = Math.floor(rgb[index] * (1 - level))
  }
  return rgbToHex(rgb[0], rgb[1], rgb[2])
}

export function getLightColor (color: string, level: number): any {
  const reg = /^#[0-9a-fA-f]{6}$/
  if (!reg.test(color)) return ElMessage.error('hex颜色值格式错误')
  const rgb = hexToRgb(color)
  for (let index = 0; index < 3; index++) {
    rgb[index] = Math.floor((255 - rgb[index]) * level + rgb[index])
  }
  return rgbToHex(rgb[0], rgb[1], rgb[2])
}
