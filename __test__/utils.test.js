const { expect } = require('@jest/globals');
const Utils = require('../src/utils');

describe('genArrayByInc 获取值递增数组', () => {
  test('不带后缀，从1到10', () => {
    const arr = Utils.genArrayByInc(1, 10)
    expect(arr.length).toBe(10)
    expect(arr[0]).toBe(1)
    expect(arr[1] - arr[0]).toBe(1)
    expect(arr[9]).toBe(10)
  })
})