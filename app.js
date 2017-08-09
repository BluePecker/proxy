/**
 * Created by shuc on 17/8/9.
 */
import Koa from 'koa';
import Router from 'koa-router';
import Request from 'request';

/**
 * @typedef {object} app
 * @property {function} use
 * @property {function} listen
 */
const app = new Koa();
const router = new Router();

router.get('/luis/query', ctx => {
    Request({
        uri: `https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/61ef41a0-b9c4-483c-b787-c13bacd90e13`,
        qs: ctx.query,
        headers: ctx.header,
        json: true
    }).then(res => {
        ctx.body = res;
    }).catch(() => {
        ctx.body = {};
    });
});

router.get('/luis/:version/apps/:app_id', async(ctx, next) => {
    /**
     * @typedef {{params:{app_id:string}}} ctx
     * @typedef {{then:function}} Request
     */
    console.log(`https://westus.api.cognitive.microsoft.com/luis/${ctx.params.version}/apps/${ctx.params.app_id}`);
    await Request.get({
        url: `https://westus.api.cognitive.microsoft.com/luis/${ctx.params.version}/apps/${ctx.params.app_id}`,
        qs: ctx.query,
        json: true
    }, (err, res, json) => {
        console.log(json);
        ctx.body = json;
    });
    await next();
});

app.use(router.routes(), router.allowedMethods());
app.listen(80);
