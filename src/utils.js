module.exports = {
  genArrayByInc(start, len, suffix) {
    return Array(len).fill().map((item, index) => suffix ? (index + start) + suffix : (index + start))
  },
}