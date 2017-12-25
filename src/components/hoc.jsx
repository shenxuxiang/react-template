import React, { PureComponent } from 'react';

export default WrapperComponent =>
  class extends PureComponent { // eslint-disable-line
    constructor() {
      super();
      this.state = {
        Component: null,
      };
    }

    componentWillMount() {
      const { Component } = this.state;
      if (Component) return;
      WrapperComponent()
        .then((module) => {
          console.log(module);
          this.setState({ Component: module.default });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ Component: null });
        });
    }

    render() {
      const { Component } = this.state;
      const result = Component ? (
        <Component {...this.props} />
      ) : null;
      return result;
    }
  };
