import dva from 'dva';
import { hashRouter } from 'dva/router';
import createLoading from 'dva-loading';
import { message } from 'antd';
import routerConfig from './routerConfig';

const onError = (e) => { // 整体的错误处理
  const { msg } = e;
  console.log(msg);
  message.error(msg);
};

const app = dva({
  history: hashRouter,
  onError,
});

app.use(createLoading({ effect: true }));

// app.model(storeModel);
app.router(routerConfig);
app.start('#root');
