import dynamic from 'dva/dynamic';

export default (app, modelPath, compPath) => dynamic({
  app,
  models: () => modelPath.map(item => import(`../${item}`)),
  component: () => import(`../routes/${compPath}`),
});
