import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FieldArray, Formik } from 'formik';
import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import FormDescription from '../../../../../lib/components/FormDescription/FormDescription';
import FormRow from '../../../../../lib/components/FormRow/FormRow';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';

import { setLoading } from '../../../../../store/loading/slice';
import TopicEffectForm from '../../../../../utils/forms/businessManagement/TopicEffectForm';
import ApiService from '../../../../api/ApiService';

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
      >
        {({
          values,
        }) => (
          <form className="form" autoComplete="off">
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
                          <FormDescription
                            title={props.language.topicEffectModal.effect}
                            content={content.effect}
                          />
                        </FormRow>
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>
            <div className="action-button-container">
              <ButtonDiv className="close-button" onClick={props.onClose}>
                {props.language.topicEffectModal.close}
              </ButtonDiv>
            </div>
          </form>
        )}
      </Formik>
    );
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
