import React, { PureComponent } from 'react';
import { withRouter } from 'dva/router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { autobind } from 'core-decorators';
import { Button } from 'antd';
import style from './home.less';
import Foo from '../components/Foo';
// import Bar from '../components/Bar';

const fetchDataFunction = (loading, type) => query => ({
  type,
  loading,
  payload: query || {},
});

const mapStateToProps = state => ({
  userInfo: state.home.userInfo,
  count: state.home.count,
  files: state.home.files,
});

const mapDispatchToProps = {
  getUserInfo: fetchDataFunction(true, 'home/getUserInfo'),
  getUserCount: fetchDataFunction(true, 'home/getUserCount'),
  uploadFiles: fetchDataFunction(true, 'home/uploadFiles'),
};

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends PureComponent {
  static propTypes = {
    getUserInfo: PropTypes.func.isRequired,
    getUserCount: PropTypes.func.isRequired,
    uploadFiles: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
    userInfo: PropTypes.object.isRequired,
    files: PropTypes.string.isRequired,
  }

  constructor() {
    super();
    this.state = {
      foo: 'default Foo',
    };
  }

  get userInfoDom() {
    const userInfo = this.props.userInfo || {};
    const result = Object.keys(userInfo).map(item => (
      <p key={item}>{ userInfo[item] }</p>
    ));
    return result;
  }

  handle = () => {
    this.props.getUserInfo({ userName: 'shenjun', password: '456789' });
  }

  success = () => {
    this.props.getUserCount({ userName: 'xiaoming', password: '123456' });
  }

  uploadFile = (e) => {
    const file = e.target.files[0];
    const { type } = file;
    const IMAGE_TYPE = /^image\/(png|jpg|jpeg|bmp)$/;
    if (!IMAGE_TYPE.test(type)) return;
    this.props.uploadFiles(new FormData('file', file));
  }

  updateFoo = (e) => {
    this.setState({
      foo: e.target.value,
    });
  }

  render() {
    return (
      <div className={style.app_title}>
        { this.props.count }
        <Button onClick={this.handle}>request userInfo</Button>
        <Button onClick={this.success}>request count</Button>
        <p className="app_title">这是home页面</p>
        <p>这是home页面</p>
        <p>这是home页面</p>
        <p>这是home页面</p>
        <p>这是home页面</p>
        {this.userInfoDom}
        <input
          type="file"
          onChange={this.uploadFile}
        />文件上传
        <input type="text" value={this.state.foo} onChange={this.updateFoo} />
        <Foo foo="123456" />
      </div>
    );
  }
}
