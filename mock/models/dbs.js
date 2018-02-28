const url = 'localhost:27017/sxxdatabase';
const db = require('monk')(url);
const collection = db.get('user');

function createIndex() {
  collection.index('name')
    .then(data => {
      console.log(data, '创建索引成功！！！');
    });
}

collection.ensureIndex('name')
  .then(data => {
    console.log(data, '确认name索引');
  })
  .catch(err => {
    console.log('未创建索引值...');
    createIndex();
  })

/**
 * 中间件1
 * @params { string } method  方法
 * @params { any }    query   查询条件
 * @params { boject } options 参数配置
 * @return { promise }
 */
const middlewareOne = method => (query, options) => {
  return new Promise((resolve, reject) => {
    collection[method](query, options)
      .then(data => resolve(data))
      .catch(err => reject(null));
  });
};

/**
 * 中间件2
 * @params { string }  method  方法
 * @params { any }     query   查询条件
 * @params { object }  update  修改结果
 * @params { boject }  options 参数配置
 * @return { promise }
 */
const middlewareTwo = method => (query, update, options) => {
  return new Promise((resolve, reject) => {
    collection[method](query, update, options)
      .then(data => resolve(data))
      .catch(err => reject(null));
  });
};

exports.count = middlewareOne('count');
exports.insert = middlewareOne('insert');
exports.find = middlewareOne('find');
exports.findOne = middlewareOne('findOne');
exports.remove = middlewareOne('remove');
exports.dropCollection = middlewareOne('drop');

exports.update = middlewareTwo('update');
exports.findOneAndUpdate = middlewareTwo('findOneAndUpdate');
exports.findOneAndDelete = middlewareTwo('findOneAndDelete');
