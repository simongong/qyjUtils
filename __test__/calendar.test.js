const { expect } = require('@jest/globals');
const Calendar = require('../src/calendar');
const Solar2Lunar = require('../src/solar2lunar');

describe('getBirthdayDiff 获取离某个生日差几天', () => {
  const today = Calendar.todayFMD()
  
  test('今年生日已过或者下个生日在30天之后，返回 -1', () => {
    const birthday = Calendar.substractNDay(today, 3) //生日已过
    const birthStr = `${birthday.month}-${birthday.day}`
    const result = Calendar.getBirthdayDiff(birthStr)
    expect(result).toBe(-1)
    const birthday2 = Calendar.addNDay(today, 100) //生日在30天以后
    const birthStr2 = `${birthday2.month}-${birthday2.day}`
    const result2 = Calendar.getBirthdayDiff(birthStr2)
    expect(result2).toBe(-1)
    const birthday3 = Calendar.addNDay(today, 31) //生日在30天以后
    const birthStr3 = `${birthday3.month}-${birthday3.day}`
    const result3 = Calendar.getBirthdayDiff(birthStr3)
    expect(result3).toBe(-1)
  });

  test('今年生日未过且下个生日在30天以内，返回天数', () => {
    const birthday = Calendar.addNDay(today, 3)
    const birthStr = `${birthday.month}-${birthday.day}`
    const result = Calendar.getBirthdayDiff(birthStr)
    expect(result).toBe(3)
    const birthday2 = Calendar.addNDay(today, 30)
    const birthStr2 = `${birthday2.month}-${birthday2.day}`
    const result2 = Calendar.getBirthdayDiff(birthStr2)
    expect(result2).toBe(30)
  });

  test('今年生日未过且下个生日在制定threshold天以内，返回天数', () => {
    const birthday = Calendar.addNDay(today, 3)
    const birthStr = `${birthday.month}-${birthday.day}`
    const result = Calendar.getBirthdayDiff(birthStr, 7)
    expect(result).toBe(3)
    const birthday2 = Calendar.addNDay(today, 30)
    const birthStr2 = `${birthday2.month}-${birthday2.day}`
    const result2 = Calendar.getBirthdayDiff(birthStr2, 7)
    expect(result2).toBe(-1)
  });

  test('支持正常农历场景', () => {
    let birthday = Calendar.addNDay(today, 3)
    birthday = Solar2Lunar.toLunar(birthday.year, birthday.month, birthday.day)
    const birthStr = `${birthday.month}-${birthday.day}`
    const result = Calendar.getBirthdayDiff(birthStr, 30, true)
    expect(result).toBe(3)
    let birthday2 = Calendar.addNDay(today, 31)
    birthday2 = Solar2Lunar.toLunar(birthday2.year, birthday2.month, birthday2.day)
    const birthStr2 = `${birthday2.month}-${birthday2.day}`
    const result2 = Calendar.getBirthdayDiff(birthStr2, 30, true)
    expect(result2).toBe(-1)
  });

  test('Solar2Lunar 支持有闰月农历场景', () => {
    // 2020年农历闰四月：2020-4-25 2020-5-25 都是农历2020-4-3
    let birthday = Calendar.toFMD('2020-4-3')
    const lunarDate1 = Solar2Lunar.toLunar(2020, 4, 25)
    const lunarDate2 = Solar2Lunar.toLunar(2020, 5, 25)
    
    expect(lunarDate1.year).toBe(birthday.year)
    expect(lunarDate1.month).toBe(birthday.month)
    expect(lunarDate1.day).toBe(birthday.day)
    expect(lunarDate1.year).toBe(lunarDate2.year)
    expect(lunarDate1.month).toBe(lunarDate2.month)
    expect(lunarDate1.day).toBe(lunarDate2.day)
  });
})

describe('getLunarDay 获取某天的农历日子', () => {
  test('支持有闰月农历场景', () => {
    // 2020年农历闰四月：2020-4-25 2020-5-25 都是农历2020-4-3
    const day1 = Calendar.toFMD('2020-4-25')
    const day2 = Calendar.toFMD('2020-5-25')
  
    const lunarDay1 = Calendar.getLunarDay(day1)
    const lunarDay2 = Calendar.getLunarDay(day2)
    expect(lunarDay1).toBe(lunarDay2)
    expect(lunarDay2).toBe('初三')
  });
})