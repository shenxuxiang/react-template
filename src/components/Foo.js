import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Foo extends PureComponent {
  static propTypes = {
    foo: PropTypes.string,
    children: PropTypes.node,
    onhandle: PropTypes.func,
  }

  static defaultProps = {
    foo: '',
    children: undefined,
    onhandle: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.foo,
    };
  }

  updateValue = (e) => {
    this.setState({
      value: e.target.value,
    }, this.props.onhandle(e.target.value));
  }

  render() {
    console.log('Foo is re-render');
    return (
      <div>
        {this.props.foo}
        {
          React.Children.map(
            this.props.children,
            child => React.cloneElement(child, { userName: { className: 'shenxuxiang', name: 'sxx' } }),
          )
        }
        <input
          type="text"
          value={this.state.value}
          onChange={this.updateValue}
        />
      </div>
    );
  }
}
