import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Bar extends PureComponent {
  static propTypes = {
    bar: PropTypes.string,
    userName: PropTypes.object,
  }

  static defaultProps = {
    bar: '',
    userName: null,
  }

  constructor() {
    super();
    this.state = {

    };
  }

  // componentWillReceiveProps(nextProps) {
  //   // console.log('bar:', nextProps.bar === this.props.bar);
  // }

  render() {
    console.log('bar is re-render');
    return (
      <div {...this.props.userName}>
        {this.props.bar}
      </div>
    );
  }
}
