import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdOutlineRemoveCircle } from 'react-icons/md';

import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import FormDescription from '../../../../../lib/components/FormDescription/FormDescription';
import FormRow from '../../../../../lib/components/FormRow/FormRow';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';

import { setLoading } from '../../../../../store/loading/slice';

import ApiService from '../../../../api/ApiService';
import ModalHelper from '../../../../helper/ModalHelper';
import { getUserId, userHasRole } from '../../../../auth/auth';

import '../AnnouncementModal.scss';

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
    ApiService.announcement.readAnnouncementById(props.id).then((response) => {
      this.setFormInitialValues(response);
    });
  };

  displayDeleteButton = (item, deleteFunction) =>
    (item.createdUserAccountId === Number(getUserId() && userHasRole(7)) ? (
      <MdOutlineRemoveCircle
        className="delete-button"
        onClick={() => deleteFunction(item.id)}
      />
    ) : (
      ''
    ));

  deleteAttachFile = (id) => {
    ModalHelper.openDeleteModal({
      deleteFunction: () => {
        ApiService.announcement.deleteAttachmentFile(id).then((response) => {
          props.setLoading(false);
          ModalHelper.openMessageModalByStatus({
            response,
            callback: () => {},
          });
        });
      },
    });
  };

  displayAttachment = () => {
    const { props, state } = this;
    if (state.formInitialValues.announcementAttachments === undefined) {
      return '';
    }
    return state.formInitialValues.announcementAttachments.map((item) => (
      <div className="file-container" key={item.id}>
        <ButtonDiv
          className="file-link"
          onClick={() => {
            props.setLoading(true);
            ApiService.announcement.downloadAttachmentFileRecord(item.id);
          }}
        >
          {item.uploadedFileName}
        </ButtonDiv>
        {this.displayDeleteButton(item, this.deleteAttachFile)}
      </div>
    ));
  };

  render() {
    const { props, state } = this;

    return (
      <div className="business-management-modal">
        <SectionTitle title={props.language.announcementModal.modalTitle} />
        <div className="info-section">
          <FormRow>
            <FormDescription
              title={props.language.announcementModal.title}
              content={state.formInitialValues.title}
            />
          </FormRow>
          <FormRow>
            <FormDescription
              title={props.language.announcementModal.announcementBeganAt}
              content={state.formInitialValues.announcementBeganAtString}
            />
          </FormRow>
          <FormRow>
            <FormDescription
              title={props.language.announcementModal.announcementEndedAt}
              content={state.formInitialValues.announcementEndedAtString}
            />
          </FormRow>
          <FormRow>
            <FormDescription
              title={props.language.announcementModal.file}
              content={this.displayAttachment()}
            />
          </FormRow>
          <FormRow>
            <FormDescription
              title={props.language.announcementModal.content}
              content={state.formInitialValues.content}
            />
          </FormRow>
        </div>
        <div className="action-button-container">
          <ButtonDiv className="close-button" onClick={props.onClose}>
            {props.language.announcementModal.close}
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
