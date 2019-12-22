class CacheController {
  constructor () {
    this.caches = {}
  }

  setItem (key, val) {
    return  this.caches[key] || (this.caches[key] = val);
  }

  getItem (key) {
    if (this.isTimeToClear()) this.clearCache()
    return this.caches[key]
  }

  clearCache () {
    console.log(`清除缓存时间：${new Date().toLocaleString()}`)
    this.caches = {}
  }

  isTimeToClear () {
    let date = new Date()
    return date.getSeconds() === 0 && date.getMinutes() === 0 && date.getHours() === 0
  }

}

module.exports = function cache () {
  let caches = new CacheController()
  return async function (ctx, next) {
    let path = ctx.url
    if (path.indexOf('/api/data') >= 0) {
      if (caches.getItem(path)) {
        console.log(`获取缓存 ${path}，时间 ${new Date().toLocaleString()}`)
      } else {
        console.log(`查询内容 ${path}，时间 ${new Date().toLocaleString()}`)
        caches.setItem(path, Math.ceil(Math.random()*100))
      }
      ctx.body = caches.getItem(path)
    } else {
      await next()
    }
  }
}