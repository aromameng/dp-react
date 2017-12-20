
const Koa = require('koa'),
Router = require('koa-router');
var Mock = require('mockjs');
var cors = require('koa-cors');

const app = new Koa(),
router = new Router;

app.use(cors());

// 首页 —— 推荐列表（猜你喜欢）
const homeListData = require('./home/list.js')
router.get('/api/homelist', (ctx, next) => {
  ctx.body = homeListData;
});

// 喜欢
let homeLikeData = require('./home/like.js')
router.get('/api/homelike',(ctx,next)=>{
  let page= Number(ctx.query.page) || 1,
      rows=10,
      isLastPage=false,
      lists = homeLikeData.data,
      newList = lists.slice(rows*(page-1),rows*page);
      if(newList.length<rows) isLastPage=true;
      ctx.body = JSON.stringify(Object.assign({data:newList},{page:page,isLastPage:isLastPage}));
})

// 开始服务并生成路由
app.use(router.routes())
 .use(router.allowedMethods());

app.listen(3000);
console.log('app running on port 3000');