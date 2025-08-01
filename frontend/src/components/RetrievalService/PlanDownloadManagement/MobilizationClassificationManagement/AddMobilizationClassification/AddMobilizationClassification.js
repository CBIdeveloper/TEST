import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import DateInput from '../../../../../lib/components/inputs/DateInput/DateInput';
import FormRow from '../../../../../lib/components/FormRow/FormRow';
import FileInput from '../../../../../lib/components/inputs/FileInput/FileInput';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';
import SelectInput from '../../../../../lib/components/inputs/SelectInput/SelectInput';
import TextInput from '../../../../../lib/components/inputs/TextInput/TextInput';

import { setLoading } from '../../../../../store/loading/slice';

import ApiService from '../../../../../utils/api/ApiService';
import MobilizationClassificationForm from '../../../../../utils/forms/retrievalService/planDownload/MobilizationClassificationForm';
import ModalHelper from '../../../../../utils/helper/ModalHelper';
import PlanMobilizationClassificationRequest from '../../../../../utils/dataModels/PlanMobilizationClassification/PlanMobilizationClassificationRequest';
import QueryType from '../../../../../utils/types/QueryType';
import { getFirstlevelAgencyId } from '../../../../../utils/auth/auth';

import './AddMobilizationClassification.scss';

class AddMobilizationClassification extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      classificationList: [],
      agencyList: [],
      classificationId: null,
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

  setClassificationList = (classificationList) => {
    this.setState({ classificationList });
  };

  setAgencyList = (agencyList) => {
    this.setState({ agencyList });
  };

  setClassificationId = (classificationId) => {
    this.setState({ classificationId });
  };

  initState = () => {
    const { props } = this;
    const id = props.query.queryObject.get(QueryType.ID);
    if (id !== null) {
      this.setClassificationId(id);
      ApiService.mobilizationClassification
        .readMobilizationClassification()
        .then((response) => {
          const classificationList = response.map((item) => ({
            text: item.classificationName,
            value: item.id,
          }));
          this.setClassificationList(classificationList);
        });
      ApiService.firstlevelAgency.readFirstlevelAgency().then((response) => {
        const agencyList = response.map((item) => ({
          text: item.shortName,
          value: item.id,
        }));
        this.setAgencyList(agencyList);
      });
    }
  };

  onSubmit = (values) => {
    const { props } = this;
    props.setLoading(true);
    const request = new PlanMobilizationClassificationRequest(
      values,
    ).getCreateData();
    ApiService.planMobilizationClassification
      .createPlanMobilizationClassification(request)
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

    if (state.classificationId === null) return '';

    return (
      <div className="add-mobilization-classification">
        <SectionTitle
          title={
            props.language.retrievalService.subMenus
              .addMobilizationClassification
          }
        />
        <Formik
          initialValues={MobilizationClassificationForm.initialValue({
            mobilizationClassificationId: Number(state.classificationId),
            firstlevelAgencyId: getFirstlevelAgencyId(),
            isCreate: true,
          })}
          validationSchema={MobilizationClassificationForm.validationSchema()}
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
                      props.language.addMobilizationClassification
                        .mobilizationClassificationSubject
                    }
                    inputType="text"
                    inputName="mobilizationClassificationSubject"
                    inputPlaceholder={
                      props.language.addMobilizationClassification
                        .mobilizationClassificationSubjectHint
                    }
                    inputValue={values.mobilizationClassificationSubject}
                    inputOnChange={handleChange}
                    touched={touched}
                    errors={errors}
                    required={MobilizationClassificationForm.isFieldRequired(
                      'mobilizationClassificationSubject',
                    )}
                  />
                </FormRow>
                <FormRow>
                  <SelectInput
                    title={
                      props.language.addMobilizationClassification
                        .mobilizationClassificationId
                    }
                    inputName="mobilizationClassificationId"
                    inputPlaceholder={
                      props.language.addMobilizationClassification
                        .mobilizationClassificationIdHint
                    }
                    inputValue={values.mobilizationClassificationId}
                    setFieldValue={setFieldValue}
                    options={state.classificationList}
                    touched={touched}
                    errors={errors}
                    required={MobilizationClassificationForm.isFieldRequired(
                      'mobilizationClassificationId',
                    )}
                    disable
                  />
                </FormRow>
                <FormRow>
                  <SelectInput
                    title={
                      props.language.addMobilizationClassification
                        .releaseFirstlevelAgencyId
                    }
                    inputName="releaseFirstlevelAgencyId"
                    inputPlaceholder={
                      props.language.addMobilizationClassification
                        .releaseFirstlevelAgencyIdHint
                    }
                    inputValue={values.releaseFirstlevelAgencyId}
                    setFieldValue={setFieldValue}
                    options={state.agencyList}
                    touched={touched}
                    errors={errors}
                    required={MobilizationClassificationForm.isFieldRequired(
                      'releaseFirstlevelAgencyId',
                    )}
                  />
                </FormRow>
                <FormRow>
                  <DateInput
                    title={
                      props.language.addMobilizationClassification.releaseDate
                    }
                    inputName="releaseDate"
                    inputPlaceholder={
                      props.language.addMobilizationClassification
                        .releaseDateHint
                    }
                    inputValue={values.releaseDate}
                    setFieldValue={setFieldValue}
                    touched={touched}
                    errors={errors}
                    required={MobilizationClassificationForm.isFieldRequired(
                      'releaseDate',
                    )}
                  />
                </FormRow>
                <FormRow>
                  <FileInput
                    title={props.language.addMobilizationClassification.file}
                    inputName="file"
                    inputPlaceholder={
                      props.language.addMobilizationClassification.fileHint
                    }
                    inputValue={values.file}
                    setFieldValue={setFieldValue}
                    description={
                      props.language.addMobilizationClassification
                        .fileDescription
                    }
                    acceptFileExtension={['.pdf']}
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
                    {props.language.addMobilizationClassification.back}
                  </ButtonDiv>
                  <ButtonDiv className="normal-button" onClick={resetForm}>
                    {props.language.addMobilizationClassification.clear}
                  </ButtonDiv>
                  <ButtonDiv className="submit-button" onClick={submitForm}>
                    {props.language.addMobilizationClassification.submit}
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

AddMobilizationClassification.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddMobilizationClassification),
);
