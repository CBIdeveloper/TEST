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
import MobilizationPlanForm from '../../../../../utils/forms/retrievalService/planDownload/MobilizationPlanForm';
import ModalHelper from '../../../../../utils/helper/ModalHelper';
import PlanMobilizationPlanRequest from '../../../../../utils/dataModels/PlanMobilizationPlan/PlanMobilizationPlanRequest';
import QueryType from '../../../../../utils/types/QueryType';
import { getFirstlevelAgencyId } from '../../../../../utils/auth/auth';

import './AddMobilizationPlan.scss';

class AddMobilizationPlan extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { planList: [], agencyList: [], planId: null };
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

  setPlanList = (planList) => {
    this.setState({ planList });
  };

  setAgencyList = (agencyList) => {
    this.setState({ agencyList });
  };

  setPlanId = (planId) => {
    this.setState({ planId });
  };

  initState = () => {
    const { props } = this;
    const id = props.query.queryObject.get(QueryType.ID);
    if (id !== null) {
      this.setPlanId(id);
      ApiService.mobilizationPlan.readMobilizationPlan().then((response) => {
        const planList = response.map((item) => ({
          text: item.planName,
          value: item.id,
        }));
        this.setPlanList(planList);
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
    const request = new PlanMobilizationPlanRequest(values).getCreateData();
    ApiService.planMobilizationPlan
      .createPlanMobilizationPlan(request)
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

    if (state.planId === null) return '';

    return (
      <div className="add-mobilization-plan">
        <SectionTitle
          title={props.language.retrievalService.subMenus.addMobilizationPlan}
        />
        <Formik
          initialValues={MobilizationPlanForm.initialValue({
            mobilizationPlanId: Number(state.planId),
            firstlevelAgencyId: getFirstlevelAgencyId(),
            isCreate: true,
          })}
          validationSchema={MobilizationPlanForm.validationSchema()}
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
                      props.language.addMobilizationPlan.mobilizationPlanSubject
                    }
                    inputType="text"
                    inputName="mobilizationPlanSubject"
                    inputPlaceholder={
                      props.language.addMobilizationPlan
                        .mobilizationPlanSubjectHint
                    }
                    inputValue={values.mobilizationPlanSubject}
                    inputOnChange={handleChange}
                    touched={touched}
                    errors={errors}
                    required={MobilizationPlanForm.isFieldRequired(
                      'mobilizationPlanSubject',
                    )}
                  />
                </FormRow>
                <FormRow>
                  <SelectInput
                    title={
                      props.language.addMobilizationPlan.mobilizationPlanId
                    }
                    inputName="mobilizationPlanId"
                    inputPlaceholder={
                      props.language.addMobilizationPlan.mobilizationPlanIdHint
                    }
                    inputValue={values.mobilizationPlanId}
                    setFieldValue={setFieldValue}
                    options={state.planList}
                    touched={touched}
                    errors={errors}
                    required={MobilizationPlanForm.isFieldRequired(
                      'mobilizationPlanId',
                    )}
                    disable
                  />
                </FormRow>
                <FormRow>
                  <SelectInput
                    title={
                      props.language.addMobilizationPlan
                        .releaseFirstlevelAgencyId
                    }
                    inputName="releaseFirstlevelAgencyId"
                    inputPlaceholder={
                      props.language.addMobilizationPlan
                        .releaseFirstlevelAgencyIdHint
                    }
                    inputValue={values.releaseFirstlevelAgencyId}
                    setFieldValue={setFieldValue}
                    options={state.agencyList}
                    touched={touched}
                    errors={errors}
                    required={MobilizationPlanForm.isFieldRequired(
                      'releaseFirstlevelAgencyId',
                    )}
                  />
                </FormRow>
                <FormRow>
                  <DateInput
                    title={props.language.addMobilizationPlan.releaseDate}
                    inputName="releaseDate"
                    inputPlaceholder={
                      props.language.addMobilizationPlan.releaseDateHint
                    }
                    inputValue={values.releaseDate}
                    setFieldValue={setFieldValue}
                    touched={touched}
                    errors={errors}
                    required={MobilizationPlanForm.isFieldRequired(
                      'releaseDate',
                    )}
                  />
                </FormRow>
                <FormRow>
                  <FileInput
                    title={props.language.addMobilizationPlan.file}
                    inputName="file"
                    inputPlaceholder={
                      props.language.addMobilizationPlan.fileHint
                    }
                    inputValue={values.file}
                    setFieldValue={setFieldValue}
                    description={
                      props.language.addMobilizationPlan.fileDescription
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
                    {props.language.addMobilizationPlan.back}
                  </ButtonDiv>
                  <ButtonDiv className="normal-button" onClick={resetForm}>
                    {props.language.addMobilizationPlan.clear}
                  </ButtonDiv>
                  <ButtonDiv className="submit-button" onClick={submitForm}>
                    {props.language.addMobilizationPlan.submit}
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

AddMobilizationPlan.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddMobilizationPlan),
);
