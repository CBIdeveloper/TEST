import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ModalHelper from '../../../utils/helper/ModalHelper';

import './FormikErrorModal.scss';

class FormikErrorModal extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const { props } = this;
    if (props.isSubmitting === false && prevProps.isSubmitting === true) {
      this.displayErrorModal();
    }
  }

  displayErrorModal = () => {
    const { props } = this;
    const keys = Object.keys(props.errors);
    if (keys.length !== 0) {
      const message = keys.map((key) => {
        if (props.errors[key] instanceof Array) {
          return this.displayArrayError(props.errors[key]);
        }
        return (
          <div className="required-message" key={props.errors[key]}>
            {props.errors[key]}
          </div>
        );
      });
      ModalHelper.openErrorModal({
        message: <div className="formik-error-modal">{message}</div>,
      });
    }
  };

  displayArrayError = (arrayError) =>
    arrayError
      .map((item, index) =>
        (item
          ? Object.values(item).map((error) => (
            <div
              className="required-message"
              key={`第${index + 1}行：${error}`}
            >
              {`第${index + 1}行： ${error}`}
            </div>
          ))
          : ''),
      )
      .filter((item) => item !== '');

  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

FormikErrorModal.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  errors: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormikErrorModal);
