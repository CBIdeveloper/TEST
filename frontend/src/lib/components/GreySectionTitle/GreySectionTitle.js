import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './GreySectionTitle.scss';

class GreySectionTitle extends React.PureComponent {
  render() {
    const { props } = this;

    return <div className="grey-section-title">{props.title}</div>;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

GreySectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GreySectionTitle);
