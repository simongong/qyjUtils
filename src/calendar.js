/**
 * 给小程序云函数公用的一些工具方法
 * @module qyjUtils
 */
const Solar2Lunar = require('./solar2lunar')

module.exports = {
  /**
   * 获取离生日 date 相差几天，支持农历。返回值为整数。
   * @param {String} birthdayStr 日期字符串，比如：'5-3'
   * @param {Number} threshold 最大差值的阈值，比如传入 7，那么相差7天以上的话就返回-1
   * @param {Boolean} isLunar 日期是公历还是农历，默认公历
   * @return {Number} 生日未过且离${threshold}天以内返回原值，否则返回-1
   */
  getBirthdayDiff(birthdayStr, threshold = 30, isLunar) {
    const today = this.todayFMD()
    const dateSplit = birthdayStr.split('-')
    let birthdayFMD = {
      month: +dateSplit[0],
      day: +dateSplit[1],
    }
    // 农历生日处理逻辑：把今天换成农历 => 计算还未过的最近的农历生日年份 => 下个还未过的公历生日日期 => 计算两个公历日期的间隔
    if (isLunar) {
      const todayLunar = Solar2Lunar.toLunar(today.year, today.month, today.day)
      birthdayFMD.year = (new Date(`${todayLunar.year}-${birthdayStr}`).getTime() < new Date(this.toDateStr(todayLunar)).getTime()) ? todayLunar.year + 1 : todayLunar.year
      birthdayFMD = Solar2Lunar.toSolar(birthdayFMD.year, birthdayFMD.month, birthdayFMD.day)
    } else {
      birthdayFMD.year = (new Date(`${today.year}-${birthdayStr}`).getTime() < new Date().getTime()) ? today.year + 1 : today.year
    }
    
    const diff = this.getDateDiff(today, birthdayFMD)
    return diff > threshold ? -1 : diff
  },
  /**
   * 获取两个date差几天。
   * @param {Object} date1 
   * @param {Object} date2 
   * @return {Number} 默认排序规则，date1小，date2大，返回正数。反之返回负数。
   */
  getDateDiff(date1, date2) {
    const DAY_STEP_MILLI = 24 * 60 * 60 * 1000  // 一天的毫秒数
    return Math.floor((new Date(this.toDateStr(date2)).getTime() - new Date(this.toDateStr(date1)).getTime()) / DAY_STEP_MILLI)
  },
  /**
   * 获取某一天的农历日期。返回值为日期字符串
   * @param {String} date 公历日期字符串，比如：'2022-5-3'
   * @return {String} 农历日期字符串
   */
  getLunarDate(date) {

  },
  /**
   * 获取当日的结构化对象
   * @return {Object} {year, month, day}
   */
  todayFMD() {
    const _date = new Date()
    const year = _date.getFullYear()
    const month = _date.getMonth() + 1
    const day = _date.getDate()
    return {
      year: +year,
      month: +month,
      day: +day,
    }
  },
  /**
   * 获取日期字符串
   * @param {Object} date 结构化日期对象
   * @returns {String} 日期字符串，比如：'2022-5-20'
   */
  toDateStr(date = {}) {
    return `${+date.year}-${+date.month}-${+date.day}`
  },
  /**
   * 返回日期字符串对应的结构化对象
   * @param {String} dateStr 日期字符串
   * @return {Object} {year, month, day}
   */
  toFMD(dateStr) {
    if (typeof dateStr === 'string' && dateStr.includes('-')) {
      const [year, month, day] = dateStr.split('-')
      return {
        year: +year,
        month: +month,
        day: +day,
      }
    }
    return {}
  },

  /**
   * 获取某日的后n天日期对象：按时间戳计算偏移，再反解析为日期
   * @param {Object} date 日期对象
   * @param {Number} n 数字
   * @return {Object} 日期对象
   */
  addNDay(date, n) {
    const DAY_STEP_MILLI = 24 * 60 * 60 * 1000// 一天的毫秒数
    const { year, month, day } = date
    const newDay = new Date(new Date(year, month - 1, day).getTime() + (n * DAY_STEP_MILLI))
    return {
      year: newDay.getFullYear(),
      month: newDay.getMonth() + 1,
      day: newDay.getDate()
    }
  },
  /**
   * 获取某日的前n天日期对象：按时间戳计算偏移，再反解析为日期
   * @param {Object} date 日期对象
   * @param {Number} n 数字
   * @return {Object} 日期对象
   */
  substractNDay(date, n) {
    return this.addNDay(date, n * -1)
  },
  /**
   * 获取农历是哪天（初几）
   * @param {Object} date 日期对象
   * @return {String} 农历日子。比如：'初三'
   */
  getLunarDay(date) {
    const lunar = Solar2Lunar.toLunar(date.year, date.month, date.day, true)
    return lunar[6]
  }
}