import React, { PureComponent } from 'react';
import { withRouter } from 'dva/router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styles from './home.less';

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

    };
  }

  get userInfoDom() {
    const userInfo = this.props.userInfo || {};
    const result = Object.keys(userInfo).map(item => (
      <p key={item}>{ userInfo[item] }</p>
    ));
    return result;
  }
  uploadFile = (e) => {
    console.log(this.form);
    const file = e.target.files[0];
    const { type } = file;
    const IMAGE_TYPE = /^image\/(png|jpg|jpeg|bmp)$/;
    if (!IMAGE_TYPE.test(type)) return;
    this.props.uploadFiles(new FormData(this.form));
  }

  handle = () => {
    this.props.getUserInfo({ userName: 'shenjun', password: '456789' });
  }

  success = () => {
    this.props.getUserCount({ userName: 'xiaoming', password: '123456' });
  }

  render() {
    return (
      <div className={styles.homecontent} id="homecontent">
        <Button onClick={this.handle}>request userInfo</Button>
        <Button onClick={this.success}>request count</Button>
        {this.userInfoDom}
        <div className={styles.homecontent_box}>
          <div className={styles.homecontent_box_head}>
            <h1 className={styles.homecontent_box_head_title}>这里是box的head部分</h1>
          </div>
          <div className={styles.homecontent_box_con}>
            <ul className={styles.homecontent_box_con_btngroup}>
              <li className={`${styles.homecontent_box_con_btngroup_item} ${styles.item_1}`}>按钮组A</li>
              <li className={`${styles.homecontent_box_con_btngroup_item} ${styles.item_2}`}>按钮组B</li>
              <li className={`${styles.homecontent_box_con_btngroup_item} ${styles.item_3}`}>按钮组C</li>
            </ul>
            <div className={styles.homecontent_box_con_mybtn}>点击下载...</div>
            <form ref={ref => this.form = ref}>
              <input
                type="file"
                multiple
                accept="image/png, image/jpg, image/bmp, image/jpeg"
                onChange={this.uploadFile}
                name="sxxfile"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
