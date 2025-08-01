import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import Divider from '../../../../../lib/components/Divider/Divider';
import TextInput from '../../../../../lib/components/inputs/TextInput/TextInput';

import ApiService from '../../../../api/ApiService';
import RejectUserForm from '../../../../forms/systemManagement/RejectUserForm';
import ApproveSysUserAccountRequest from '../../../../dataModels/SysUserAccount/ApproveSysUserAccountRequest';

import '../RejectUserModal.scss';

class ModalContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { userData: null };
  }

  componentDidMount() {
    const { props } = this;
    ApiService.sysUserAccount
      .readSysUserAccountById(props.id)
      .then((response) => {
        this.setUserData(response);
      });
  }

  setUserData = (userData) => {
    this.setState({ userData });
  };

  onSubmit = (values) => {
    const { props } = this;
    const request = new ApproveSysUserAccountRequest({
      ...values,
      userAccountAppliedStatus: 2,
    });
    ApiService.sysUserAccount
      .approveSysUserAccount(props.id, request)
      .then(() => {
        props.onClose();
        props.history.goBack();
      });
  };

  render() {
    const { props } = this;

    return (
      <div className="reject-user-modal">
        <Formik
          initialValues={RejectUserForm.initialValue({})}
          validationSchema={RejectUserForm.validationSchema()}
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
                  full
                  title={props.language.rejectUserModal.reasonOfFailure}
                  inputType="textarea"
                  inputName="reasonOfFailure"
                  inputPlaceholder={props.language.rejectUserModal.reasonOfFailureHint}
                  inputValue={values.reasonOfFailure}
                  inputOnChange={handleChange}
                  touched={touched}
                  errors={errors}
                  required={RejectUserForm.isFieldRequired('reasonOfFailure')}
                />
              </div>
              <Divider />
              <div className="button-group">
                <ButtonDiv className="cancel-button" onClick={props.onClose}>
                  {props.language.rejectUserModal.cancel}
                </ButtonDiv>
                <ButtonDiv className="confirm-button" onClick={submitForm}>
                  {props.language.rejectUserModal.confirm}
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
  id: PropTypes.number.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ModalContent),
);
