import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './SectionTitle.scss';

class SectionTitle extends React.PureComponent {
  render() {
    const { props } = this;

    return <div className="section-title">{props.title}</div>;
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

SectionTitle.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SectionTitle),
);
