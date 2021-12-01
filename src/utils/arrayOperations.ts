/**
 * 判断两数组是否相同
 * @param news 新数据
 * @param old 源数据
 * @returns 两数组相同返回 `true`，反之则反
 */
export function judgmentSameArr (news: Array<string>, old: Array<string>):boolean {
  if (!news && !old) {
    return true
  }
  let count = 0
  const len = old.length
  for (const i in old) {
    for (const j in news) {
      if (old[i] === news[j]) {
        count++
      }
    }
  }
  return count === len
}

/**
 * 判断两个对象是否相同
 * @param a 要比较的对象一
 * @param b 要比较的对象二
 * @returns 相同返回 true，反之则反
 */
export function isObjectValueEqual (first: {[key:string]:any}, second:{[key:string]:any}):boolean {
  if (!first || !second) {
    return false
  }
  const fProps = Object.getOwnPropertyNames(first)
  const sProps = Object.getOwnPropertyNames(second)
  if (fProps.length !== sProps.length) {
    return false
  }
  for (let index = 0; index < fProps.length; index++) {
    // 取第一个参数的属性名
    const pName = fProps[index]
    // 如果第二个参加不存在pName属性则返回false
    if (sProps.indexOf(pName) <= 0) return false
    const propF = first[pName]
    const propS = second[pName]
    if (propF instanceof Object) {
      if (!isObjectValueEqual(propF, propS)) return false
    } else if (propF !== propS) {
      return false
    }
  }
  return true
}
