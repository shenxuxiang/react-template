import React, { Component } from 'react';
import { Link } from 'dva/router';
import styles from './app.less';

class App extends Component {
  render() {
    /* eslint-disable */
    return (
      <div className={styles.app}>
        <div className={styles.app_head}>
          <h1 className={styles.app_title}>测试dva dom</h1>
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
    /* eslint-enable */
  }
}
export default App;
