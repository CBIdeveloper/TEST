import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Formik} from 'formik';
import {withRouter} from 'react-router-dom';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import Container from '../../../../lib/components/Container/Container';
import FormDescription from '../../../../lib/components/FormDescription/FormDescription';
import FormRow from '../../../../lib/components/FormRow/FormRow';
import SectionTitle from '../../../../lib/components/SectionTitle/SectionTitle';
import TextInput from '../../../../lib/components/inputs/TextInput/TextInput';
import MultipleSelectInput from '../../../../lib/components/inputs/MultipleSelectInput/MultipleSelectInput';

import ApiService from '../../../../utils/api/ApiService';
import BraidingCategoryType from '../../../../utils/constants/BraidingCategoryType';
import BraidingCategoryForm from '../../../../utils/forms/systemManagement/BraidingCategoryForm';
import BraidingCategoryRequest from '../../../../utils/dataModels/BraidingCategory/BraidingCategoryRequest';
import ModalHelper from '../../../../utils/helper/ModalHelper';
import QueryType from '../../../../utils/types/QueryType';

import './AddBraidingCategoryManagement.scss';
import SelectInput from "../../../../lib/components/inputs/SelectInput/SelectInput";
import monthsInt from "../../../../utils/constants/MonthsInt";

class AddBraidingCategoryManagement extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            classificationValue: null,
        };
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

    setClassificationValue = (classificationValue) => {
        this.setState({classificationValue});
    };

    initState = () => {
        const {props} = this;
        const id = props.query.queryObject.get(QueryType.CLASSIFICATION_ID);
        if (id !== null) {
            this.setId(id);
            ApiService.mobilizationClassification
                .readMobilizationClassificationById(id)
                .then((response) => {
                    this.setClassificationValue(response);
                });
        }
    };

    onSubmit = (values) => {
        const {props, state} = this;
        const request = new BraidingCategoryRequest({
            ...values,
            mobilizationClassificationId: state.id,
        });
        ApiService.braidingCategory
            .createBraidingCategory(request)
            .then((response) => {
                ModalHelper.openMessageModalByStatus({
                    response,
                    callback: props.history.goBack,
                });
            });
    };

    render() {
        const {props, state} = this;

        if (state.classificationValue === null) return '';

        return (
            <Container>
                <div className="add-braiding-category-management">
                    <SectionTitle
                        title={
                            props.language.systemManagement.subMenus
                                .addBraidingCategoryManagement
                        }
                    />
                    <Formik
                        initialValues={BraidingCategoryForm.initialValue({})}
                        validationSchema={BraidingCategoryForm.validationSchema()}
                        onSubmit={this.onSubmit}
                    >
                        {({
                              handleSubmit,
                              handleChange,
                              setFieldValue,
                              resetForm,
                              submitForm,
                              touched,
                              values,
                              errors,
                          }) => (
                            <form onSubmit={handleSubmit} className="form" autoComplete="off">
                                <div className="inputs">
                                    <FormRow>
                                        <FormDescription
                                            leftBorder
                                            title={
                                                props.language.addBraidingCategoryManagement
                                                    .mobilizationPlan
                                            }
                                            content={state.classificationValue.mobilizationPlan}
                                        />
                                    </FormRow>
                                    <FormRow>
                                        <FormDescription
                                            leftBorder
                                            title={
                                                props.language.addBraidingCategoryManagement
                                                    .mobilizationClassification
                                            }
                                            content={state.classificationValue.classificationName}
                                        />
                                    </FormRow>
                                    <FormRow>
                                        <TextInput
                                            title={
                                                props.language.addBraidingCategoryManagement.fullName
                                            }
                                            inputType="text"
                                            inputName="fullName"
                                            inputPlaceholder={
                                                props.language.addBraidingCategoryManagement
                                                    .fullNameHint
                                            }
                                            inputValue={values.fullName}
                                            inputOnChange={handleChange}
                                            touched={touched}
                                            errors={errors}
                                            required={BraidingCategoryForm.isFieldRequired(
                                                'fullName',
                                            )}
                                        />
                                    </FormRow>
                                    <FormRow>
                                        <MultipleSelectInput
                                            singleSelection
                                            horizontal
                                            title={
                                                props.language.addBraidingCategoryManagement
                                                    .categoryType
                                            }
                                            inputName="categoryType"
                                            inputValue={values.categoryType}
                                            setFieldValue={setFieldValue}
                                            options={BraidingCategoryType}
                                            touched={touched}
                                            errors={errors}
                                            required={BraidingCategoryForm.isFieldRequired(
                                                'categoryType',
                                            )}
                                        />
                                    </FormRow>
                                    <FormRow>
                                        <TextInput
                                            title={
                                                props.language.addBraidingCategoryManagement.projectManagementNumber
                                            }
                                            inputType="text"
                                            inputName="projectManagementNumber"
                                            inputPlaceholder={
                                                props.language.addBraidingCategoryManagement
                                                    .projectManagementNumberHint
                                            }
                                            inputValue={values.projectManagementNumber}
                                            inputOnChange={handleChange}
                                            touched={touched}
                                            errors={errors}
                                            // required={BraidingCategoryForm.isFieldRequired(
                                            //     'projectManagementNumber',
                                            // )}
                                        />
                                    </FormRow>
                                    <FormRow>
                                        <SelectInput
                                            inputType="text"
                                            title={props.language.addBraidingCategoryManagement.updateCycle}
                                            inputName="updateCycle"
                                            inputValue={values.updateCycle}
                                            setFieldValue={setFieldValue}
                                            options={monthsInt}
                                            trailingInput={<span className="monthUnit">個月</span>}
                                            touched={touched}
                                            errors={errors}
                                        />
                                    </FormRow>
                                    <div className="action-button-container">
                                        <ButtonDiv
                                            className="normal-button"
                                            onClick={props.history.goBack}
                                        >
                                            {props.language.addBraidingCategoryManagement.back}
                                        </ButtonDiv>
                                        <ButtonDiv className="normal-button" onClick={resetForm}>
                                            {props.language.addBraidingCategoryManagement.clear}
                                        </ButtonDiv>
                                        <ButtonDiv className="submit-button" onClick={submitForm}>
                                            {props.language.addBraidingCategoryManagement.submit}
                                        </ButtonDiv>
                                    </div>
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

const mapDispatchToProps = (dispatch) => ({});

AddBraidingCategoryManagement.propTypes = {
    language: PropTypes.objectOf(Object).isRequired,
    query: PropTypes.objectOf(Object).isRequired,
    history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AddBraidingCategoryManagement),
);
