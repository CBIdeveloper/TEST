import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import DateInput from '../../../../../lib/components/inputs/DateInput/DateInput';
import FormDescription from '../../../../../lib/components/FormDescription/FormDescription';
import FormRow from '../../../../../lib/components/FormRow/FormRow';
import FileInput from '../../../../../lib/components/inputs/FileInput/FileInput';
import SelectInput from '../../../../../lib/components/inputs/SelectInput/SelectInput';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';
import TextInput from '../../../../../lib/components/inputs/TextInput/TextInput';

import { setLoading } from '../../../../../store/loading/slice';

import ApiService from '../../../../../utils/api/ApiService';
import MobilizationExecutionForm from '../../../../../utils/forms/retrievalService/planDownload/MobilizationExecutionForm';
import ModalHelper from '../../../../../utils/helper/ModalHelper';
import PlanMobilizationExecutionRequest from '../../../../../utils/dataModels/PlanMobilizationExecution/PlanMobilizationExecutionRequest';
import QueryType from '../../../../../utils/types/QueryType';
import { getCityId } from '../../../../../utils/auth/auth';

import './EditMobilizationExecution.scss';

class EditMobilizationExecution extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      formInitialValues: null,
      cityList: [],
      firstLevelUnitList: [],
    };
  }

  componentDidMount() {
    this.initState();
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    if (props.query.queryObject !== prevProps.query.queryObject) {
      this.initState();
    }
  }

  setId = (id) => {
    this.setState({ id });
  };

  setFormInitialValues = (formInitialValues) => {
    this.setState({ formInitialValues });
  };

  setCityList = (cityList) => {
    this.setState({ cityList });
  };

  setFirstLevelUnitList = (firstLevelUnitList) => {
    this.setState({ firstLevelUnitList });
  };

  initState = () => {
    const { props } = this;
    const id = props.query.queryObject.get(QueryType.ID);
    this.setId(id);
    if (id !== null) {
      ApiService.planMobilizationExecution
        .readPlanMobilizationExecutionById(id)
        .then((response) => {
          this.setFormInitialValues(response);

          ApiService.firstlevelUnit
            .readFirstlevelUnitByCityId(response.cityId)
            .then((unitList) => {
              const firstlevelUnitList = unitList.map((item) => ({
                text: item.fullName,
                value: item.id,
              }));
              this.setFirstLevelUnitList(firstlevelUnitList);
            });
        });

      ApiService.city.readCity().then((response) => {
        if(getCityId() !== '' && getCityId() !== null){
          response = response.filter(
            (item) => item.id == getCityId()
          )
        }
        const cityList = response.map((item) => ({
          text: item.cityName,
          value: item.id,
        }));
        this.setCityList(cityList);
      });
    }
  };

  handleCityOnChanged = ({ values, field, cityId, setFieldValue }) => {
    if (values.cityId !== cityId) {
      ApiService.firstlevelUnit
        .readFirstlevelUnitByCityId(cityId)
        .then((response) => {
          const firstlevelUnitList = response.map((item) => ({
            text: item.fullName,
            value: item.id,
          }));
          this.setFirstLevelUnitList(firstlevelUnitList);
          setFieldValue(field, cityId);
          setFieldValue('releaseFirstlevelUnitId', '');
        });
    }
  };

  handleFileOnClicked = () => {
    const { state } = this;
    ApiService.planMobilizationExecution.downloadMobilizationExecution(
      state.id,
    );
  };

  onSubmit = (values) => {
    const { props, state } = this;
    props.setLoading(true);
    if (values.file === '') {
      const request = new PlanMobilizationExecutionRequest(
        values,
      ).getUpdateData();
      ApiService.planMobilizationExecution
        .updatePlanMobilizationExecution(state.id, request)
        .then((response) => {
          ModalHelper.openMessageModalByStatus({
            response,
            callback: props.history.goBack,
          });
          props.setLoading(false);
        })
        .catch(() => {
          props.setLoading(false);
        });
    } else {
      const request = new PlanMobilizationExecutionRequest(
        values,
      ).getUpdateDataWithoutFile();
      ApiService.planMobilizationExecution
        .updatePlanMobilizationExecutionWithoutFile(state.id, request)
        .then((response) => {
          ModalHelper.openMessageModalByStatus({
            response,
            callback: props.history.goBack,
          });
          props.setLoading(false);
        })
        .catch(() => {
          props.setLoading(false);
        });
    }
  };

  render() {
    const { props, state } = this;

    if (state.formInitialValues === null) return '';

    return (
      <div className="edit-mobilization-execution">
        <SectionTitle
          title={
            props.language.retrievalService.subMenus.editMobilizationExecution
          }
        />
        <Formik
          initialValues={MobilizationExecutionForm.initialValue(
            state.formInitialValues,
          )}
          validationSchema={MobilizationExecutionForm.validationSchema()}
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
                  <TextInput
                    full
                    title={
                      props.language.editMobilizationExecution
                        .mobilizationExecutionSubject
                    }
                    inputType="text"
                    inputName="mobilizationExecutionSubject"
                    inputPlaceholder={
                      props.language.editMobilizationExecution
                        .mobilizationExecutionSubjectHint
                    }
                    inputValue={values.mobilizationExecutionSubject}
                    inputOnChange={handleChange}
                    touched={touched}
                    errors={errors}
                    required={MobilizationExecutionForm.isFieldRequired(
                      'mobilizationExecutionSubject',
                    )}
                  />
                </FormRow>
                <FormRow>
                  <SelectInput
                    title={props.language.editMobilizationExecution.cityId}
                    inputName="cityId"
                    inputPlaceholder={
                      props.language.editMobilizationExecution.cityIdHint
                    }
                    inputValue={values.cityId}
                    setFieldValue={(field, cityId) => {
                      this.handleCityOnChanged({
                        values,
                        field,
                        cityId,
                        setFieldValue,
                      });
                    }}
                    options={state.cityList}
                    touched={touched}
                    errors={errors}
                    required={MobilizationExecutionForm.isFieldRequired(
                      'cityId',
                    )}
                  />
                </FormRow>
                <FormRow>
                  <SelectInput
                    title={
                      props.language.editMobilizationExecution
                        .releaseFirstlevelUnitId
                    }
                    inputName="releaseFirstlevelUnitId"
                    inputPlaceholder={
                      props.language.editMobilizationExecution
                        .releaseFirstlevelUnitIdHint
                    }
                    inputValue={values.releaseFirstlevelUnitId}
                    setFieldValue={setFieldValue}
                    options={state.firstLevelUnitList}
                    touched={touched}
                    errors={errors}
                    required={MobilizationExecutionForm.isFieldRequired(
                      'releaseFirstlevelUnitId',
                    )}
                    disable={values.cityId === ''}
                  />
                </FormRow>
                <FormRow>
                  <DateInput
                    title={props.language.editMobilizationExecution.releaseDate}
                    inputName="releaseDate"
                    inputPlaceholder={
                      props.language.editMobilizationExecution.releaseDateHint
                    }
                    inputValue={values.releaseDate}
                    setFieldValue={setFieldValue}
                    touched={touched}
                    errors={errors}
                    required={MobilizationExecutionForm.isFieldRequired(
                      'releaseDate',
                    )}
                  />
                </FormRow>
                <FormRow>
                  <FileInput
                    title={props.language.editMobilizationExecution.file}
                    inputName="file"
                    inputPlaceholder={
                      props.language.editMobilizationExecution.fileHint
                    }
                    inputValue={values.file}
                    setFieldValue={setFieldValue}
                    description={
                      props.language.editMobilizationExecution.fileDescription
                    }
                    acceptFileExtension={['.rar', '.zip', '.7z']}
                    limitSize={false}
                    touched={touched}
                    errors={errors}
                    required={false}
                  />
                </FormRow>
                <FormRow>
                  <FormDescription
                    leftBorder
                    title={props.language.editMobilizationExecution.currentFile}
                    content={
                      <ButtonDiv
                        className="file-text"
                        onClick={this.handleFileOnClicked}
                      >
                        {state.formInitialValues.uploadedFileName}
                      </ButtonDiv>
                    }
                  />
                </FormRow>

                <div className="action-button-container">
                  <ButtonDiv
                    className="normal-button"
                    onClick={props.history.goBack}
                  >
                    {props.language.editMobilizationExecution.back}
                  </ButtonDiv>
                  <ButtonDiv className="normal-button" onClick={resetForm}>
                    {props.language.editMobilizationExecution.clear}
                  </ButtonDiv>
                  <ButtonDiv className="save-button" onClick={submitForm}>
                    {props.language.editMobilizationExecution.save}
                  </ButtonDiv>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
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

EditMobilizationExecution.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditMobilizationExecution),
);
