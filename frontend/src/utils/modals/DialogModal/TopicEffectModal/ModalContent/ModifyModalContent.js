import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FieldArray, Formik } from 'formik';
import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import FormDescription from '../../../../../lib/components/FormDescription/FormDescription';
import FormRow from '../../../../../lib/components/FormRow/FormRow';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';
import TextInput from '../../../../../lib/components/inputs/TextInput/TextInput';

import { setLoading } from '../../../../../store/loading/slice';
import TopicEffectForm from '../../../../../utils/forms/businessManagement/TopicEffectForm';
import TopicRequest from '../../../../../utils/dataModels/BusinessManagement/TopicRequest';
import ApiService from '../../../../api/ApiService';
import ModalHelper from '../../../../helper/ModalHelper';

import '../TopicEffectModal.scss';

class ModalContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formInitialValues: {},
    };
  }

  componentDidMount() {
    this.initState();
  }

  setFormInitialValues = (formInitialValues) => {
    this.setState({ formInitialValues });
  };

  initState = async () => {
    const { props } = this;
    props.setLoading(true);
    ApiService.businessManagement
      .readBusinessManagementById(props.id)
      .then((response) => {
        props.setLoading(false);
        this.setFormInitialValues(response);
      });
  };

  displayTopicEffectUnit = () => {
    const { props, state } = this;

    if (!state.formInitialValues || Object.keys(state.formInitialValues).length === 0) return '';

    return (
      <Formik
        initialValues={TopicEffectForm.initialValue({
          ...state.formInitialValues
        })}
        validationSchema={TopicEffectForm.validationSchema()}
        onSubmit={this.onSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          resetForm,
          setFieldValue,
          submitForm,
          values,
        }) => (
          <form onSubmit={handleSubmit} className="form" autoComplete="off">
            <div className="visible-unit-card">
              <FieldArray
                name="topicList"
                render={() => (
                  <div className="contents">
                    {values.topicList.map((content, index) => (
                      <div key={index}>
                        <FormRow>
                          <FormDescription
                            title={props.language.topicEffectModal.topic}
                            content={content.researchTopic}
                          />
                        </FormRow>
                        <FormRow>
                          <TextInput
                            full
                            title={props.language.topicEffectModal.effect}
                            inputType="textarea"
                            inputName={`topicList.${index}.effect`}
                            inputPlaceholder={`請輸入${props.language.topicEffectModal.effect}`}
                            inputValue={content.effect || ''}
                            inputOnChange={handleChange}
                            setFieldValue={setFieldValue}
                          />
                        </FormRow>
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>
            <div className="action-button-container">
              <ButtonDiv className="normal-button" onClick={resetForm}>
                {props.language.topicEffectModal.clear}
              </ButtonDiv>
              <ButtonDiv className="submit-button" onClick={submitForm}>
                {props.language.topicEffectModal.submit}
              </ButtonDiv>
            </div>
          </form>
        )}
      </Formik>
    );
  }

  onSubmit = (values) => {
    if (values.topicList.length > 0) {
      const { props } = this;
      const request = values.topicList.map(
        (item) => new TopicRequest(item),
      );
      ApiService.businessManagement
        .updateTopicEffect(request)
        .then((response) => {
          props.setLoading(false);
          ModalHelper.openMessageModalByStatus({
            response,
            callback: () => { },
          });
        })
        .catch((error) => {
          console.log(error)
          props.setLoading(false);
        });
    }
  }

  render() {
    const { props, state } = this;

    return (
      <div className="topic-effect-modal">
        <SectionTitle title={props.title} />
        <div className="info-section">
          <FormRow>
            <FormDescription
              title={props.language.topicEffectModal.title}
              content={state.formInitialValues.title}
            />
          </FormRow>
          {this.displayTopicEffectUnit()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});

ModalContent.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalContent);
