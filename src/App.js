import React, { Component } from 'react';
import { Link } from 'dva/router';
import styles from './app.less';

/* eslint-disable */
class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <div className={styles.app_head}>
          <h1 className={`${styles.app_title} title`}>测试dva dom</h1>
        </div>
        <ul>
          <li>
            <Link to="/home">home</Link>
          </li>
          <li>
            <Link to="/list">list</Link>
          </li>
          <li>
            <Link to="/detail">detail</Link>
          </li>
        </ul>
        { this.props.children }
      </div>
    );
  }
}
export default App;
