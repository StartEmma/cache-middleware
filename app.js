const Koa = require('koa');
const Router = require('koa-router')
const request = require('request')
const cache = require('./cache');
const app = new Koa()
const router = new Router()

router.get('/api/data/:id', async(ctx, next) => {
  ctx.body = '/api/data'
})

app.use(cache())
app.use(router.routes())

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});


function testCache () {
  setInterval(() => {
    let id = Math.ceil(Math.random()*10)
    request(`http://localhost:3000/api/data/${id}`)
  }, 500)
}

testCache()