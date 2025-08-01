import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './FormSectionTitle.scss';

class FormSectionTitle extends React.PureComponent {
  render() {
    const { props } = this;

    return <div className="form-section-title">{props.title}</div>;
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

FormSectionTitle.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormSectionTitle);
