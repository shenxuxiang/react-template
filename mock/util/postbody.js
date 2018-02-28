/**
 * 获取post请求的参数
 * @params { object } ctx koa上下文
 * @return { promise }
 */
module.exports = function(ctx) {
  const req = ctx.req;
  postBody = '';
  return new Promise((resolve, reject) => {
    try {
      req.addListener('data', function(data) {
        postBody += data;
      });
      req.addListener('end', function() {
        resolve(postBody);
      })
    } catch (err) {
      reject(null);
    }
  })
};
