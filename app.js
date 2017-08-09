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

router.get('/luis/:version/apps/:app_id', (ctx) => {
    /**
     * @typedef {{params:{app_id:string}}} ctx
     * @typedef {{then:function}} Request
     */
    ctx.body = Request.get({
        url: `https://westus.api.cognitive.microsoft.com/luis/${ctx.params.version}/apps/${ctx.params.app_id}`,
        qs: ctx.query,
        json: true
    }, (err, res, json) => {
        return json;
    });
});

app.use(router.routes(), router.allowedMethods());
app.listen(9200);
