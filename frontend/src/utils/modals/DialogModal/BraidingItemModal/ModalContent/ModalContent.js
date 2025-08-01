import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdOutlineRemoveCircle } from 'react-icons/md';

import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import FormDescription from '../../../../../lib/components/FormDescription/FormDescription';
import FormRow from '../../../../../lib/components/FormRow/FormRow';
import MultipleFileInput from '../../../../../lib/components/inputs/MultipleFileInput/MultipleFileInput';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';

import { setLoading } from '../../../../../store/loading/slice';

import ApiService from '../../../../api/ApiService';
import FileRecordRequest from '../../../../dataModels/FileRecord/FileRecordRequest';
import ModalHelper from '../../../../helper/ModalHelper';
import { getUserId } from '../../../../auth/auth';

import '../BraidingItemModal.scss';

class ModalContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formInitialValues: {},
      returnFile: [],
      isAllFileVisible: false,
    };
  }

  componentDidMount() {
    this.initState();
  }

  setFormInitialValues = (formInitialValues) => {
    // console.log(formInitialValues);
    if (formInitialValues.updateCycle === null) {
      formInitialValues.updateCycle = '';
    } else {
      formInitialValues.updateCycle = formInitialValues.updateCycle + ' 個月';
    }
    if (formInitialValues.braidingNum === null) {
      formInitialValues.braidingNum = '';
    } else {
      formInitialValues.braidingNum = formInitialValues.braidingNum + ' 筆';
    }
    if (formInitialValues.systemNum === null) {
      formInitialValues.systemNum = '';
    } else {
      formInitialValues.systemNum = formInitialValues.systemNum + ' 筆';
    }
    if (formInitialValues.systemPlanNum === null) {
      formInitialValues.systemPlanNum = '';
    } else {
      formInitialValues.systemPlanNum = formInitialValues.systemPlanNum + ' 筆';
    }
    let formattedDate = new Date(formInitialValues.transmissionDate)
      .toISOString()
      .split('T')[0];
    formInitialValues.transmissionDate = formattedDate;
    formattedDate = new Date(formInitialValues.transmissionPlanDate)
      .toISOString()
      .split('T')[0];
    formInitialValues.transmissionPlanDate = formattedDate;
    this.setState({ formInitialValues });
  };
  setReturnFile = (returnFile) => {
    this.setState({ returnFile });
  };

  setIsAllFileVisible = (isAllFileVisible) => {
    this.setState({ isAllFileVisible });
  };

  initState = () => {
    const { props } = this;
    // console.log(props.id)
    ApiService.braidingItem.getBraidingItemList(props.id).then((response) => {
      this.setFormInitialValues(response.braidingItemList[0]);
    });
  };
  render() {
    const { props, state } = this;

    return (
      <div className="braiding-item-modal">
        <SectionTitle title={props.title} />
        <div className="info-section">
          <FormRow>
            <FormDescription
              title={props.language.braidingItemModal.id}
              content={state.formInitialValues.id}
            />
          </FormRow>
          <FormRow>
            <FormDescription
              title={props.language.braidingItemModal.fullName}
              content={state.formInitialValues.fullName}
            />
          </FormRow>
          <FormRow>
            <FormDescription
              title={props.language.braidingItemModal.mainOrgan}
              content={state.formInitialValues.mainOrgan}
            />
          </FormRow>
          <FormRow>
            <FormDescription
              title={props.language.braidingItemModal.updateCycle}
              content={state.formInitialValues.updateCycle}
            />
          </FormRow>
          <FormRow>
            <FormDescription
              title={props.language.braidingItemModal.braidingNum}
              content={state.formInitialValues.braidingNum}
            />
          </FormRow>
          {state.formInitialValues.isPlan === 0 && (
            <FormRow>
              <FormDescription
                title={props.language.braidingItemModal.systemNum}
                content={state.formInitialValues.systemNum}
              />
            </FormRow>
          )}
          {state.formInitialValues.isPlan === 0 && (
            <FormRow>
              <FormDescription
                title={props.language.braidingItemModal.transmissionDate}
                content={state.formInitialValues.transmissionDate}
              />
            </FormRow>
          )}
          {state.formInitialValues.isPlan === 1 && (
            <FormRow>
              <FormDescription
                title={props.language.braidingItemModal.systemPlanNum}
                content={state.formInitialValues.systemPlanNum}
              />
            </FormRow>
          )}
          {state.formInitialValues.isPlan === 1 && (
            <FormRow>
              <FormDescription
                title={props.language.braidingItemModal.transmissionPlanDate}
                content={state.formInitialValues.transmissionPlanDate}
              />
            </FormRow>
          )}
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
