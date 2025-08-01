import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import Container from '../../../../lib/components/Container/Container';
import FormDescription from '../../../../lib/components/FormDescription/FormDescription';
import FormRow from '../../../../lib/components/FormRow/FormRow';
import MultipleSelectInput from '../../../../lib/components/inputs/MultipleSelectInput/MultipleSelectInput';
import PageTitle from '../../../../lib/components/PageTitle/PageTitle';
import SelectInput from '../../../../lib/components/inputs/SelectInput/SelectInput';
import TextInput from '../../../../lib/components/inputs/TextInput/TextInput';

import { setLoading } from '../../../../store/loading/slice';

import AgencyType from '../../../../utils/constants/AgencyType';
import ApiService from '../../../../utils/api/ApiService';
import ApproveUserForm from '../../../../utils/forms/systemManagement/ApproveUserForm';
import ApproveSysUserAccountRequest from '../../../../utils/dataModels/SysUserAccount/ApproveSysUserAccountRequest';
import BooleanType from '../../../../utils/constants/BooleanType';
import BusinessPlanType from '../../../../utils/constants/BusinessPlanType';
import ModalHelper from '../../../../utils/helper/ModalHelper';
import QueryType from '../../../../utils/types/QueryType';
import { userHasRole } from '../../../../utils/auth/auth';

import './ApproveUserDetail.scss';

class ApproveUserDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formInitialValue: null,
      id: '',
      roleMainList: [],
      braidingCategoryList: [],
      userList: [],
    };
  }

  componentDidMount() {
    ApiService.roleMain.readRoleMain().then((response) => {
      const roleMainList = response.map((item) => ({
        text: item.roleName,
        value: item.id,
      }));
      this.setRoleMainList(roleMainList);
    });
    this.initState();
    // ApiService.braidingCategory.getBraidingCategoryList().then((response) => {
    //   const data = response.braidingCategoryList.map((item) => ({
    //     text: item.fullName,
    //     value: item.id,
    //     type: item.categoryType,
    //     mobilizationClassificationId: item.mobilizationClassificationId,
    //   }));
    //   this.setBraidingCategoryList(data);
      
    // });
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    if (props.query.queryObject !== prevProps.query.queryObject) {
      this.initState();
    }
  }
  setBraidingCategoryList = (braidingCategoryList) => {
    this.setState({ braidingCategoryList });
  };

  setId = (id) => {
    this.setState({ id });
  };

  setFormInitialValue = (formInitialValue) => {
    this.setState({ formInitialValue });
  };
  setUserList = (userList) => {
    this.setState({ userList });
  };
  setRoleMainList = (roleMainList) => {
    this.setState({ roleMainList });
  };

  initState = () => {
    const { props, state } = this;
    const id = props.query.queryObject.get(QueryType.ID);
    if (id !== null) {
      this.setId(id);
      ApiService.sysUserAccount.readSysUserAccountById(id).then((response) => {
        // console.log(response);
        this.setFormInitialValue(response);
        this.setUserList(response);
        const result = response.braidingCategoryNameList.join(',');
        this.setBraidingCategoryList(result);
      });
    }
  };

  agencyTypeTitle = ({ values }) => {
    const { props, state } = this;
    if (values.agencyType === '1') {
      return props.language.register.organization;
    } else if (values.agencyType === '2') {
      return props.language.register.government;
    } else if (values.agencyType === '3') {
      return props.language.register.maintainManufacturer;
    } else if (values.agencyType === '4') {
      return props.language.register.militaryAgency;
    }
  };

  displayIsOrganizer = ({ values, setFieldValue }) => {
    const { props } = this;
    return (
      <div className="is-plan-sponsor">
        <div>{props.language.register.isPlansponsorDescription}</div>
        <MultipleSelectInput
          singleSelection
          horizontal
          zenMode
          title={props.language.register.isPlansponsor}
          inputName="isPlansponsor"
          inputValue={values.isPlansponsor}
          setFieldValue={setFieldValue}
          options={BooleanType}
          display
        />
      </div>
    );
  };

  displayMobilizationPlanCard = () => {
    const { props, state } = this;
    // console.log(state.userList.agencyType);
    return (
      <FormRow>
        <FormDescription
          leftBorder
          title={props.language.register.braidingCategoryIdList}
          content={state.braidingCategoryList}
        />
      </FormRow>
    );
  };

  reject = () => {
    const { state } = this;
    ModalHelper.openRejectUserModal(Number(state.id));
  };

  onSubmit = (values) => {
    const { props, state } = this;
    const request = new ApproveSysUserAccountRequest({
      userAccountAppliedStatus: 1,
    });
    // TODO: alarm before is plan sponsor approve...
    ModalHelper.openConfirmModal({
      confirmFunction: (callback) => {
        ApiService.sysUserAccount
          .approveSysUserAccount(state.id, request)
          .then(() => {
            callback();
            props.history.goBack();
          });
      },
    });
  };

  displayAttachment = () => {
    const { props, state } = this;
    const { sysUserAccountAppliedAttachments } = state.formInitialValue;
    return sysUserAccountAppliedAttachments.length > 0 ? (
      <div className="file-container">
        <ButtonDiv
          className="file-link"
          onClick={() => {
            props.setLoading(true);
            ApiService.sysUserAccount.downloadAttachmentFileRecord(
              sysUserAccountAppliedAttachments[0].id,
            );
          }}
        >
          {sysUserAccountAppliedAttachments[0].uploadedFileName}
        </ButtonDiv>
      </div>
    ) : (
      ''
    );
  };

  displayRejectReason = (values) => {
    const { props, state } = this;
    const { userAccountAppliedStatus } = state.formInitialValue;
    return userAccountAppliedStatus === 2 ? (
      <FormRow>
        <TextInput
          full
          title={props.language.approveUserDetail.reasonOfFailure}
          inputType="textarea"
          inputName="reasonOfFailure"
          inputValue={values.reasonOfFailure}
          inputOnChange={() => {}}
          display
        />
      </FormRow>
    ) : (
      ''
    );
  };

  render() {
    const { props, state } = this;

    if (state.formInitialValue === null) return '';

    return (
      <Container className="approve-user-detail">
        <div>
          <PageTitle
            title={props.language.systemManagement.subMenus.approveUserDetail}
            breadcrumb={false}
          />
          <Formik
            initialValues={ApproveUserForm.initialValue(state.formInitialValue)}
            validationSchema={ApproveUserForm.validationSchema()}
            onSubmit={this.onSubmit}
          >
            {({
              handleSubmit,
              handleChange,
              setFieldValue,
              values,
              submitForm,
              touched,
              errors,
            }) => (
              <form onSubmit={handleSubmit} className="form" autoComplete="off">
                <div className="inputs">
                  <FormRow>
                    <TextInput
                      title={props.language.register.name}
                      inputType="text"
                      inputName="name"
                      inputValue={values.name}
                      inputOnChange={handleChange}
                      display
                    />
                    <TextInput
                      title={props.language.register.jobPosition}
                      inputType="text"
                      inputName="jobPosition"
                      inputValue={values.jobPosition}
                      inputOnChange={handleChange}
                      display
                    />
                  </FormRow>
                  <FormRow>
                    <TextInput
                      title={props.language.register.account}
                      inputType="text"
                      inputName="account"
                      inputValue={values.account}
                      inputOnChange={handleChange}
                      description={props.language.register.accountDescription}
                      display
                    />
                  </FormRow>
                  <FormRow>
                    <TextInput
                      title={props.language.register.pid}
                      inputType="text"
                      inputName="pid"
                      inputValue={values.pid}
                      inputOnChange={handleChange}
                      display
                    />
                    <TextInput
                      medium
                      title={props.language.register.email}
                      inputType="text"
                      inputName="email"
                      inputValue={values.email}
                      inputOnChange={handleChange}
                      display
                    />
                  </FormRow>
                  <FormRow>
                    <FormDescription
                      leftBorder
                      title={props.language.register.businessPhone}
                      content={state.formInitialValue.fullTelephone}
                    />
                    <FormDescription
                      leftBorder
                      title={props.language.register.lineId}
                      content={values.lineId}
                    />
                  </FormRow>
                  <FormRow>
                    <FormDescription
                      leftBorder
                      title={props.language.register.cellphone}
                      content={values.cellphone}
                    />
                    <SelectInput
                      inputType="text"
                      title={props.language.register.businessPlan}
                      inputName="businessPlan"
                      inputValue={values.businessPlan}
                      setFieldValue={setFieldValue}
                      options={BusinessPlanType}
                      trailingInput={this.displayIsOrganizer({
                        values,
                        setFieldValue,
                      })}
                      display
                    />
                  </FormRow>
                  <FormRow>
                    <SelectInput
                      title={props.language.register.roleMainId}
                      inputName="roleMainId"
                      inputPlaceholder={props.language.register.roleMainIdHint}
                      inputValue={values.roleMainId}
                      setFieldValue={setFieldValue}
                      trailingInput={
                        values.roleMainId !== '' &&
                        values.roleMainId !== null ? (
                          <ButtonDiv
                            className="access-button"
                            onClick={() =>
                              ModalHelper.openAccessModal({
                                roleId: values.roleMainId,
                              })
                            }
                          >
                            {props.language.approveUserDetail.viewAccess}
                          </ButtonDiv>
                        ) : null
                      }
                      options={state.roleMainList}
                      display
                    />
                  </FormRow>
                  <FormRow>
                    <FormDescription
                      leftBorder
                      title={props.language.register.appliedIpAddress}
                      content={values.appliedIpAddress}
                    />
                    <div />
                  </FormRow>
                  <FormRow>
                    <MultipleSelectInput
                      horizontal
                      singleSelection
                      title={props.language.register.agencyType}
                      inputName="agencyType"
                      inputValue={values.agencyType}
                      setFieldValue={setFieldValue}
                      options={AgencyType}
                      display
                    />
                    <FormDescription
                      leftBorder
                      title={this.agencyTypeTitle({ values })}
                      content={state.formInitialValue.fullWorkPlace}
                    />
                  </FormRow>
                  <FormRow>
                    <TextInput
                      full
                      title={props.language.register.businessNeeds}
                      inputType="textarea"
                      inputName="businessNeeds"
                      inputValue={values.businessNeeds}
                      inputOnChange={handleChange}
                      display
                    />
                  </FormRow>
                  <FormRow>
                    <FormDescription
                      leftBorder
                      title={props.language.register.file}
                      content={this.displayAttachment()}
                    />
                  </FormRow>
                  {this.displayMobilizationPlanCard()}
                  {this.displayRejectReason(values)}
                </div>
                <div className="action-button-container">
                  <ButtonDiv
                    className="normal-button"
                    onClick={props.history.goBack}
                  >
                    {props.language.approveUserDetail.back}
                  </ButtonDiv>
                  {state.formInitialValue.userAccountAppliedStatus === 0 ? (
                    <>
                      <ButtonDiv
                        className="normal-button"
                        onClick={this.reject}
                        // display={userHasRole(86)}
                      >
                        {props.language.approveUserDetail.reject}
                      </ButtonDiv>
                      <ButtonDiv
                        className="approve-button"
                        onClick={submitForm}
                        // display={userHasRole(86)}
                      >
                        {props.language.approveUserDetail.approve}
                      </ButtonDiv>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </form>
            )}
          </Formik>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
  query: state.route.query,
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});

ApproveUserDetail.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ApproveUserDetail),
);
