import dva from 'dva';
import { hashRouter } from 'dva/router';
import createLoading from 'dva-loading';
import { message } from 'antd';
import 'babel-polyfill';
import 'isomorphic-fetch';
import routerConfig from './routerConfig';

const onError = (e) => { // 整体的错误处理
  console.log(e);
  const { msg } = e;
  console.log(msg);
  message.error(msg);
};
const app = dva({
  history: hashRouter,
  onError,
});
app.use(createLoading({ effect: true }));
app.router(routerConfig);
app.start('#root');
