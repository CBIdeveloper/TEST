import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import DateInput from '../../../../../lib/components/inputs/DateInput/DateInput';
import FormRow from '../../../../../lib/components/FormRow/FormRow';
import FileInput from '../../../../../lib/components/inputs/FileInput/FileInput';
import SelectInput from '../../../../../lib/components/inputs/SelectInput/SelectInput';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';
import TextInput from '../../../../../lib/components/inputs/TextInput/TextInput';

import { setLoading } from '../../../../../store/loading/slice';

import ApiService from '../../../../../utils/api/ApiService';
import MobilizationExecutionForm from '../../../../../utils/forms/retrievalService/planDownload/MobilizationExecutionForm';
import PlanMobilizationExecutionRequest from '../../../../../utils/dataModels/PlanMobilizationExecution/PlanMobilizationExecutionRequest';
import ModalHelper from '../../../../../utils/helper/ModalHelper';
import { getCityId } from '../../../../../utils/auth/auth';

import './AddMobilizationExecution.scss';

class AddMobilizationExecution extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { cityList: [], firstLevelUnitList: [] };
  }

  componentDidMount() {
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

  setCityList = (cityList) => {
    this.setState({ cityList });
  };

  setFirstLevelUnitList = (firstLevelUnitList) => {
    this.setState({ firstLevelUnitList });
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

  onSubmit = (values) => {
    const { props } = this;
    props.setLoading(true);
    const request = new PlanMobilizationExecutionRequest(
      values,
    ).getCreateData();
    ApiService.planMobilizationExecution
      .createPlanMobilizationExecution(request)
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
  };

  render() {
    const { props, state } = this;

    return (
      <div className="add-mobilization-execution">
        <SectionTitle
          title={
            props.language.retrievalService.subMenus.addMobilizationExecution
          }
        />
        <Formik
          initialValues={MobilizationExecutionForm.initialValue({
            isCreate: true,
          })}
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
                      props.language.addMobilizationExecution
                        .mobilizationExecutionSubject
                    }
                    inputType="text"
                    inputName="mobilizationExecutionSubject"
                    inputPlaceholder={
                      props.language.addMobilizationExecution
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
                    title={props.language.addMobilizationExecution.cityId}
                    inputName="cityId"
                    inputPlaceholder={
                      props.language.addMobilizationExecution.cityIdHint
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
                      props.language.addMobilizationExecution
                        .releaseFirstlevelUnitId
                    }
                    inputName="releaseFirstlevelUnitId"
                    inputPlaceholder={
                      props.language.addMobilizationExecution
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
                    title={props.language.addMobilizationExecution.releaseDate}
                    inputName="releaseDate"
                    inputPlaceholder={
                      props.language.addMobilizationExecution.releaseDateHint
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
                    title={props.language.addMobilizationExecution.file}
                    inputName="file"
                    inputPlaceholder={
                      props.language.addMobilizationExecution.fileHint
                    }
                    inputValue={values.file}
                    setFieldValue={setFieldValue}
                    description={
                      props.language.addMobilizationExecution.fileDescription
                    }
                    acceptFileExtension={['.rar', '.zip', '.7z']}
                    limitSize={false}
                    touched={touched}
                    errors={errors}
                    required
                  />
                </FormRow>

                <div className="action-button-container">
                  <ButtonDiv
                    className="normal-button"
                    onClick={props.history.goBack}
                  >
                    {props.language.addMobilizationExecution.back}
                  </ButtonDiv>
                  <ButtonDiv className="normal-button" onClick={resetForm}>
                    {props.language.addMobilizationExecution.clear}
                  </ButtonDiv>
                  <ButtonDiv className="submit-button" onClick={submitForm}>
                    {props.language.addMobilizationExecution.submit}
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
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});

AddMobilizationExecution.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddMobilizationExecution),
);
