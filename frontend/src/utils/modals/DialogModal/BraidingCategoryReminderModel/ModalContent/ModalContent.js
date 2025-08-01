import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import FormDescription from '../../../../../lib/components/FormDescription/FormDescription';
import FormRow from '../../../../../lib/components/FormRow/FormRow';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';

import { setLoading } from '../../../../../store/loading/slice';

import '../BraidingCategoryReminderModel.scss';

class ModalContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { formInitialValues: {} };
  }

  componentDidMount() {
    this.initState();
  }

  setFormInitialValues = (formInitialValues) => {
    this.setState({ formInitialValues });
  };

  initState = () => {
    const { props } = this;
    
  };

  render() {
    const { props, state } = this;

    return (
      <div className="business-management-modal">
        <SectionTitle title={props.language.braidingCategoryReminderModal.modalTitle} />
        <div className="info-section">
          <FormRow>
            <FormDescription
              title={props.language.braidingCategoryReminderModal.fullName}
              content={props.fullName}
            />
          </FormRow>
          <FormRow>
            <FormDescription
              title={props.language.braidingCategoryReminderModal.systemNum}
              content={props.systemNum}
            />
          </FormRow>
          <FormRow>
            <FormDescription
              title={props.language.braidingCategoryReminderModal.transmissionDate}
              content={props.transmissionDate}
            />
          </FormRow>
        </div>
        <div className="action-button-container">
          <ButtonDiv className="close-button" onClick={props.onClose}>
            {props.language.braidingCategoryReminderModal.close}
          </ButtonDiv>
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
  id: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalContent);
