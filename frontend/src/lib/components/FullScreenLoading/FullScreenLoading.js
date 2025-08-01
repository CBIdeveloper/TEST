import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './FullScreenLoading.scss';

class FullScreenLoading extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isLoading: props.loading.isLoading };
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    if (!props.loading.isLoading && prevProps.loading.isLoading) {
      setTimeout(() => this.setLoadingState(false), 100);
    }
    if (props.loading.isLoading && !prevProps.loading.isLoading) {
      this.setLoadingState(true);
    }
  }

  setLoadingState = (isLoading) => {
    this.setState({ isLoading });
  };

  render() {
    const { state } = this;

    if (!state.isLoading) return '';

    return (
      <div className="full-screen-loading-container">
        <div className="icon" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading.loading,
});

const mapDispatchToProps = (dispatch) => ({});

FullScreenLoading.propTypes = {
  loading: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FullScreenLoading);
