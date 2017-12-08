import dva from 'dva';
import { hashRouter } from 'dva/router';
import createLoading from 'dva-loading';
import routerConfig from './routerConfig';
import createLogger from 'redux-logger';
import store_model from './storeModel';
import { message } from 'antd';
const onError = (e) => { // 整体的错误处理
  const { msg } = e;
  console.log(msg)
  message.error(msg);
  // if (msg === 'request_error') {
  //   //message.error = '请求超时，请重新登录！';
  //   // console.log('请求超时，请重新登录！')
  //   message.error('请求超时，请重新登录！');
  // } else {
  //   //message.error = msg;
  //   console.log('123456789')
  // }
}
const app = dva({
  history: hashRouter,
  onError,
  //onAction: [createLogger()],
});

app.use(createLoading({ effect: true }));

app.model(store_model);
app.router(routerConfig);
app.start('#root');
