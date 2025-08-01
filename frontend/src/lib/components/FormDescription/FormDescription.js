import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './FormDescription.scss';

class FormDescription extends React.PureComponent {
  leftBorderClassname = () => {
    const { props } = this;
    return props.leftBorder ? 'left-border' : '';
  };

  render() {
    const { props } = this;

    return (
      <div className={`form-description ${this.leftBorderClassname()}`}>
        <div className="description-title">{props.title}</div>
        <div className="description-content">{props.content}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

FormDescription.defaultProps = {
  leftBorder: false,
};

FormDescription.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node,
  leftBorder: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDescription);
