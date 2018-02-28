import apis from './apis';
// import key from 'keymaster';

// const EMPLIST = [];
const EMPOBJ = {};
export default {
  namespace: 'home',
  state: {
    userInfo: {
      name: '',
      age: '',
      sex: '',
    },
    register: '',
    files: '',
  },
  reducers: {
    getUserInfoSuccess(state, action) {
      const { payload: { resultData = EMPOBJ } } = action;
      console.log('userInfo:', resultData);
      return {
        ...state,
        userInfo: resultData,
      };
    },
    getCountSuccess(state, action) {
      const { payload: { resultData = 100 } } = action;
      return {
        ...state,
        register: resultData,
      };
    },
    uploadFilesSuccess(state, action) {
      const { payload: { resultData = EMPOBJ } } = action;
      return {
        ...state,
        files: resultData,
      };
    },
  },
  effects: {
    * getUserInfo({ payload }, { call, put }) {
      const response = yield call(apis.getUserInfo, payload);
      yield put({
        type: 'getUserInfoSuccess',
        payload: response,
      });
    },
    * getUserCount({ payload }, { call, put }) {
      const response = yield call(apis.getUserCount, payload);
      yield put({
        type: 'getCountSuccess',
        payload: response,
      });
    },
    * uploadFiles({ payload }, { call, put }) {
      const response = yield call(apis.uploadFiles, payload);
      yield put({
        type: 'uploadFilesSuccess',
        payload: response,
      });
    },
  },
  subscriptions: {
  },
};
