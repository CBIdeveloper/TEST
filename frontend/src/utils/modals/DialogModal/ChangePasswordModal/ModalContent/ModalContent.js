import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import Divider from '../../../../../lib/components/Divider/Divider';
import TextInput from '../../../../../lib/components/inputs/TextInput/TextInput';

import ApiService from '../../../../api/ApiService';
import ChangePasswordForm from '../../../../forms/ChangePasswordForm';
import ChangePasswordRequest from '../../../../dataModels/SysUserAccount/ChangePasswordRequest';
import ModalHelper from '../../../../helper/ModalHelper';

import '../ChangePasswordModal.scss';

import checkboxChecked from '../../../../../assets/images/icons/checkbox_check.png';
import checkboxNone from '../../../../../assets/images/icons/checkbox_none.png';

class ModalContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isClearText: false,
    };
  }

  togglePassword = () => {
    const { isClearText } = this.state;
    this.setState({ isClearText: !isClearText });
  };

  InputType = () => {
    const { isClearText } = this.state;
    return isClearText ? 'text' : 'password';
  };

  trailingIcon = () => {
    const { props, state } = this;
    return state.isClearText ? (
      <div className="password-toggle">
        <img className="checkbox" src={checkboxChecked} alt="checkbox" />
        <div>{props.language.changePasswordModal.display}</div>
      </div>
    ) : (
      <div className="password-toggle">
        <img className="checkbox" src={checkboxNone} alt="checkbox" />
        <div>{props.language.changePasswordModal.display}</div>
      </div>
    );
  };

  onSubmit = (values) => {
    const { props } = this;
    const request = new ChangePasswordRequest({
      changedPassword: values.accountVerification,
    });
    ApiService.sysUserAccount
      .changePassword(props.id, request)
      .then((response) => {
        ModalHelper.openMessageModalByStatus({
          response,
          callback: () => {
            props.onClose();
          },
        });
      });
  };

  render() {
    const { props } = this;

    return (
      <div className="change-password-modal">
        <Formik
          initialValues={ChangePasswordForm.initialValue({})}
          validationSchema={ChangePasswordForm.validationSchema()}
          onSubmit={this.onSubmit}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            submitForm,
            touched,
            errors,
          }) => (
            <form onSubmit={handleSubmit} className="form" autoComplete="off">
              <div className="remark-container">
                <TextInput
                  title={props.language.changePasswordModal.accountVerification}
                  inputType={this.InputType()}
                  inputName="accountVerification"
                  inputPlaceholder={
                    props.language.changePasswordModal.accountVerificationHint
                  }
                  inputValue={values.accountVerification}
                  inputOnChange={handleChange}
                  trailingIcon={this.trailingIcon()}
                  iconOnClick={this.togglePassword}
                  touched={touched}
                  errors={errors}
                  required
                  description={
                    props.language.changePasswordModal.passwordDescription
                  }
                />
                {/* <TextInput */}
                {/*  title={ */}
                {/*    props.language.changePasswordModal.accountVerificationCheck */}
                {/*  } */}
                {/*  inputType={this.InputType()} */}
                {/*  inputName="accountVerification" */}
                {/*  inputPlaceholder={ */}
                {/*    props.language.changePasswordModal */}
                {/*      .accountVerificationCheckHint */}
                {/*  } */}
                {/*  inputValue={values.accountVerificationCheck} */}
                {/*  inputOnChange={handleChange} */}
                {/*  trailingIcon={this.trailingIcon()} */}
                {/*  iconOnClick={this.togglePassword} */}
                {/*  touched={touched} */}
                {/*  errors={errors} */}
                {/*  required */}
                {/* /> */}
              </div>
              <Divider />
              <div className="button-group">
                <ButtonDiv className="cancel-button" onClick={props.onClose}>
                  {props.language.changePasswordModal.cancel}
                </ButtonDiv>
                <ButtonDiv className="confirm-button" onClick={submitForm}>
                  {props.language.changePasswordModal.confirm}
                </ButtonDiv>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

ModalContent.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ModalContent),
);
