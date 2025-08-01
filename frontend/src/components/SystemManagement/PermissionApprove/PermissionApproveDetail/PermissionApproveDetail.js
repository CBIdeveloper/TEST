import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Formik} from 'formik';
import {withRouter} from 'react-router-dom';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import Container from '../../../../lib/components/Container/Container';
import FormDescription from '../../../../lib/components/FormDescription/FormDescription';
import FormRow from '../../../../lib/components/FormRow/FormRow';
import PageTitle from '../../../../lib/components/PageTitle/PageTitle';
import TextInput from '../../../../lib/components/inputs/TextInput/TextInput';

import {setLoading} from '../../../../store/loading/slice';

import ApiService from '../../../../utils/api/ApiService';
import PermissionApproveForm from '../../../../utils/forms/systemManagement/PermissionApproveForm';
import PermissionApproveRequest from "../../../../utils/dataModels/PermissionApprove/PermissionApproveRequest";
import ModalHelper from '../../../../utils/helper/ModalHelper';
import QueryType from '../../../../utils/types/QueryType';
import {userHasRole} from '../../../../utils/auth/auth';
import DateTimeInput from "../../../../lib/components/inputs/DateTimeInput/DateTimeInput";

import './PermissionApproveDetail.scss';
import FormikErrorModal from "../../../../lib/components/FormikErrorModal/FormikErrorModal";

class PermissionApproveDetail extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {formInitialValue: null, id: '', roleMainList: []};
    }

    componentDidMount() {
        this.initState();
    }

    componentDidUpdate(prevProps) {
        const {props} = this;
        if (props.query.queryObject !== prevProps.query.queryObject) {
            this.initState();
        }
    }

    setId = (id) => {
        this.setState({id});
    };

    setFormInitialValue = (formInitialValue) => {
        this.setState({formInitialValue});
    };

    initState = () => {
        const {props} = this;
        const id = props.query.queryObject.get(QueryType.ID);
        if (id !== null) {
            this.setId(id);
            ApiService.permissionApplication.readPermissionApproveById(id).then((response) => {
                this.setFormInitialValue(response);
            });
        }
    };

    onSubmit = (values) => {
        const {props, state} = this;
        if (values.isReject === true) {
            const request = new PermissionApproveRequest({
                ...values,
                status: 2,
            });
            ModalHelper.openPropsConfirmModal({
                title: props.language.permissionApproveDetailRejectConfirmModal.title,
                Message: props.language.permissionApproveDetailRejectConfirmModal.message,
                confirmFunction: (callback) => {
                    ApiService.permissionApplication
                        .approvePermissionApplication(state.id, request)
                        .then(() => {
                            callback();
                            props.history.goBack();
                        });
                },
            });

        } else {
            const request = new PermissionApproveRequest({
                ...values,
                status: 1,
            });
            console.log(request)
            ModalHelper.openPropsConfirmModal({
                title: props.language.permissionApproveDetailConfirmModal.title,
                Message: props.language.permissionApproveDetailConfirmModal.message,
                confirmFunction: (callback) => {
                    ApiService.permissionApplication
                        .approvePermissionApplication(state.id, request)
                        .then(() => {
                            callback();
                            props.history.goBack();
                        });
                },
            });
        }
    };

    render() {
        const {props, state} = this;

        if (state.formInitialValue === null) return '';

        return (
            <Container className="permission-approve-detail">
                <div>
                    <PageTitle
                        title={props.language.systemManagement.subMenus.permissionApproveDetail}
                        breadcrumb={false}
                    />
                    {state.formInitialValue.status === 0 ? (
                        <Formik
                            initialValues={PermissionApproveForm.initialValue(state.formInitialValue)}
                            validationSchema={PermissionApproveForm.validationSchema()}
                            onSubmit={this.onSubmit}
                        >
                            {({
                                  handleSubmit,
                                  handleChange,
                                  setFieldValue,
                                  isSubmitting,
                                  submitForm,
                                  values,
                                  touched,
                                  errors,
                              }) => (
                                <form onSubmit={handleSubmit} className="form" autoComplete="off">
                                    <FormikErrorModal isSubmitting={isSubmitting} errors={errors}/>
                                    <div className="inputs">
                                        <FormRow>
                                            <FormDescription
                                                leftBorder
                                                title={props.language.permissionApplicationDetail.name}
                                                content={state.formInitialValue.name}
                                            />
                                        </FormRow>
                                        <FormRow>
                                            <FormDescription
                                                leftBorder
                                                title={props.language.permissionApplicationDetail.unitName}
                                                content={state.formInitialValue.unitName}
                                            />
                                        </FormRow>
                                        <FormRow>
                                            <FormDescription
                                                leftBorder
                                                title={props.language.permissionApplicationDetail.applyDate}
                                                content={state.formInitialValue.createdAt}
                                            />
                                        </FormRow>
                                        <FormRow>
                                            <div className="date-containers">
                                                <div className="use-date-container">
                                                    <DateTimeInput
                                                        title="申請日期"
                                                        inputName="useStartDate"
                                                        inputPlaceholder="開始日期"
                                                        inputValue={values.useStartDate}
                                                        setFieldValue={setFieldValue}
                                                        maxDate={values.useEndDate}
                                                        required
                                                        touched={touched}
                                                        errors={errors}
                                                    />
                                                    <span>~</span>
                                                    <DateTimeInput
                                                        title=""
                                                        inputName="useEndDate"
                                                        inputPlaceholder="結束日期"
                                                        inputValue={values.useEndDate}
                                                        setFieldValue={setFieldValue}
                                                        minDate={values.useStartDate}
                                                        touched={touched}
                                                        errors={errors}
                                                    />
                                                </div>
                                            </div>
                                        </FormRow>
                                        <FormRow>
                                            <FormDescription
                                                leftBorder
                                                title={props.language.permissionApplicationDetail.requirements}
                                                content={state.formInitialValue.requirements}
                                            />
                                        </FormRow>
                                        <FormRow>
                                            <FormDescription
                                                leftBorder
                                                title={props.language.permissionApplicationDetail.braidingCategory}
                                                content={state.formInitialValue.braidingCategory}
                                            />
                                        </FormRow>
                                        <FormRow>
                                            <TextInput
                                                full
                                                title={props.language.permissionApproveDetail.auditOpinion}
                                                inputType="textarea"
                                                inputName="auditOpinion"
                                                inputPlaceholder={props.language.permissionApproveDetail.auditOpinionHint}
                                                inputValue={values.auditOpinion}
                                                inputOnChange={handleChange}
                                                touched={touched}
                                                errors={errors}
                                                disable={state.formInitialValue.status !== 0}
                                            />
                                        </FormRow>
                                    </div>
                                    <div className="action-button-container">
                                        <ButtonDiv
                                            className="normal-button"
                                            onClick={props.history.goBack}
                                        >
                                            {props.language.permissionApproveDetail.back}
                                        </ButtonDiv>
                                        <>
                                            <ButtonDiv
                                                className="normal-button"
                                                onClick={async () => {
                                                    await setFieldValue('isReject', true)
                                                    await submitForm()
                                                }}
                                                display={userHasRole(169)}
                                            >
                                                {props.language.permissionApproveDetail.reject}
                                            </ButtonDiv>
                                            <ButtonDiv
                                                className="approve-button"
                                                onClick={async () => {
                                                    await setFieldValue('isReject', false)
                                                    await submitForm()
                                                }}
                                                display={userHasRole(169)}
                                            >
                                                {props.language.permissionApproveDetail.approve}
                                            </ButtonDiv>
                                        </>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    ) : (
                        <>
                            <FormRow>
                                <FormDescription
                                    leftBorder
                                    title={props.language.permissionApplicationDetail.name}
                                    content={state.formInitialValue.name}
                                />
                            </FormRow>
                            <FormRow>
                                <FormDescription
                                    leftBorder
                                    title={props.language.permissionApplicationDetail.unitName}
                                    content={state.formInitialValue.unitName}
                                />
                            </FormRow>
                            <FormRow>
                                <FormDescription
                                    leftBorder
                                    title={props.language.permissionApplicationDetail.applyDate}
                                    content={state.formInitialValue.createdAt}
                                />
                            </FormRow>
                            <FormRow>
                                <FormDescription
                                    leftBorder
                                    title={props.language.permissionApplicationDetail.useDate}
                                    content={state.formInitialValue.useDate}
                                />
                            </FormRow>
                            <FormRow>
                                <FormDescription
                                    leftBorder
                                    title={props.language.permissionApplicationDetail.requirements}
                                    content={state.formInitialValue.requirements}
                                />
                            </FormRow>
                            <FormRow>
                                <FormDescription
                                    leftBorder
                                    title={props.language.permissionApplicationDetail.braidingCategory}
                                    content={state.formInitialValue.braidingCategory}
                                />
                            </FormRow>
                            <FormRow>
                                <FormDescription
                                    leftBorder
                                    title={props.language.permissionApproveDetail.auditOpinion}
                                    content={state.formInitialValue.auditOpinion}
                                />
                            </FormRow>
                        </>
                    )}
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

PermissionApproveDetail.propTypes = {
    language: PropTypes.objectOf(Object).isRequired,
    query: PropTypes.objectOf(Object).isRequired,
    setLoading: PropTypes.func.isRequired,
    history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PermissionApproveDetail),
);
