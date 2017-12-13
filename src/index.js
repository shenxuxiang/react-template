import dva from 'dva';
import { hashRouter } from 'dva/router';
import createLoading from 'dva-loading';
import { message } from 'antd';
import routerConfig from './routerConfig';
// import createLogger from 'redux-logger';
// import storeModel from './storeModel';

const onError = (e) => { // 整体的错误处理
  const { msg } = e;
  console.log(msg);
  message.error(msg);
  // 这里是我不想要的123
  if (msg === 'request_error') {
    console.log('请求超时，请重新登录！');
  } else {
    console.log('123456789');
  }
};

const app = dva({
  history: hashRouter,
  onError,
});

app.use(createLoading({ effect: true }));

// app.model(storeModel);
app.router(routerConfig);
app.start('#root');
