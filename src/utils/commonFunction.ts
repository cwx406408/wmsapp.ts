import { ElMessage } from 'element-plus'
import useClipboard from 'vue-clipboard3'
import { formatDate } from './formatTime'

export default function (): any {
  const { toClipboard } = useClipboard()
  // 百分比格式化
  const percentFormat = (row: any, column: number, cellValue: any) => {
    return cellValue ? `${cellValue}%` : '-'
  }
  // 对列表日期格式化
  const dateFormatYMD = (row: any, column: number, cellValue: any) => {
    if (!cellValue) return '-'
    return formatDate(new Date(cellValue), 'YYYY-mm-dd')
  }
  // 对列表日期时间格式化
  const dateFormatYMDHMS = (row: any, column: number, cellValue: any) => {
    if (!cellValue) return '-'
    return formatDate(new Date(cellValue), 'YYYY-mm-dd HH:MM:SS')
  }
  // 对列表时间格式化
  const dateFormatHMS = (row: any, column: number, cellVaue: any) => {
    if (!cellVaue) return '-'
    let time = 0
    if (typeof cellVaue === 'number') {
      time = cellVaue
    } else if (typeof row === 'number') {
      time = row
    }

    return formatDate(new Date(time), 'HH:MM:SS')
  }
  // 小数格式化
  const scaleFormat = (value: any = 0, scale = 4) => {
    return Number.parseFloat(value).toFixed(scale)
  }
  const scale2Format = (value: any = 0) => {
    return Number.parseFloat(value).toFixed(2)
  }
  const copyText = (text: string) => {
    return new Promise((resolve, reject) => {
      try {
        toClipboard(text)
        ElMessage.success('Success')
      } catch (e) {
        ElMessage.error('Error')
        reject(e)
      }
    })
  }

  return {
    percentFormat,
    dateFormatYMD,
    dateFormatYMDHMS,
    dateFormatHMS,
    scaleFormat,
    scale2Format,
    copyText
  }
}
