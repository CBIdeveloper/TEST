import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdOutlineRemoveCircle } from 'react-icons/md';
import { FieldArray, Formik } from 'formik';
import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import FormDescription from '../../../../../lib/components/FormDescription/FormDescription';
import FormRow from '../../../../../lib/components/FormRow/FormRow';
import MultipleFileInput from '../../../../../lib/components/inputs/MultipleFileInput/MultipleFileInput';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';

import { setLoading } from '../../../../../store/loading/slice';
import BusinessManagementForm from '../../../../../utils/forms/businessManagement/BusinessManagementForm';
import ApiService from '../../../../api/ApiService';
import FileRecordRequest from '../../../../dataModels/FileRecord/FileRecordRequest';
import ModalHelper from '../../../../helper/ModalHelper';
import { getUserId } from '../../../../auth/auth';
import DateHelper from '../../../../helper/DateHelper';

import '../BusinessManagementModal.scss';

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
    this.setState({ formInitialValues });
  };

  setReturnFile = (returnFile) => {
    this.setState({ returnFile });
  };

  setIsAllFileVisible = (isAllFileVisible) => {
    this.setState({ isAllFileVisible });
  };

  initState = async () => {
    const { props } = this;
    props.setLoading(true);
    const response = await ApiService.codefile.getMeetingTypeList();
    const meetingTypeList = response.codefileList;
    const response2 = await ApiService.topic.getTopicList(props.id);
    const topicList = response2.join(',');
    ApiService.businessManagement
      .readBusinessManagementById(props.id)
      .then((response) => {
        props.setLoading(false);
        if (
          response.meetingStartDate != null &&
          response.meetingEndDate != null
        ) {
          // console.log(response.meetingStartDate)
          response.meetingStartDate = DateHelper.changeDate(
            response.meetingStartDate,
          );
          response.meetingEndDate = DateHelper.changeDate(
            response.meetingEndDate,
          );
          response.meetingDate =
            response.meetingStartDate + '~' + response.meetingEndDate;
        } else {
          response.meetingDate = '';
        }
        const meeting = meetingTypeList.find(
          (item) => item.id === response.meetingType,
        );
        if (response.meetingType != null && response.meetingType != '') {
          response.meetingType = meeting.name;
        }
        if (response.meetingDeadlineDate === null) {
          response.meetingDeadlineDate = '無';
        } else {
          const stringDate = String(response.meetingDeadlineDate);
          const date = new Date(stringDate);
          response.meetingDeadlineDate = date.toISOString().slice(0, 10);
        }
        if (response.meetingPeople != null) {
          response.meetingPeople = response.meetingPeople + '人數';
        } else {
          response.meetingPeople = '';
        }
        if (topicList != '') {
          response.topicList = topicList;
        }
        const isAllFileVisible =
          this.userIdCheck(response.announcedUserAccountId) ||
          this.userIdCheck(response.createdUserAccountId);
        this.setFormInitialValues(response);
        this.setIsAllFileVisible(isAllFileVisible);
      });
  };

  userIdCheck = (value) => value === Number(getUserId());

  displayDeleteButton = (item, deleteFunction) =>
    this.userIdCheck(item.createdUserAccountId) ? (
      <MdOutlineRemoveCircle
        className="delete-button"
        onClick={() => deleteFunction(item.id)}
      />
    ) : (
      ''
    );

  deleteAttachFile = (id) => {
    ModalHelper.openDeleteModal({
      deleteFunction: () => {
        ApiService.businessManagement
          .deleteAttachmentFile(id)
          .then((response) => {
            this.props.setLoading(false);
            ModalHelper.openMessageModalByStatus({
              response,
              callback: () => {},
            });
          });
      },
    });
  };

  deleteRespondedFile = (id) => {
    ModalHelper.openDeleteModal({
      deleteFunction: () => {
        ApiService.businessManagement
          .deleteRespondedAttachmentFile(id)
          .then((response) => {
            this.props.setLoading(false);
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
    if (
      state.formInitialValues.businessManagementTestAttachments === undefined
    ) {
      return '';
    }
    return state.formInitialValues.businessManagementTestAttachments.map(
      (item) => (
        <div className="file-container" key={item.id}>
          <ButtonDiv
            key={item.id}
            className="file-link"
            onClick={() => {
              props.setLoading(true);
              ApiService.businessManagement.downloadAttachmentFileRecord(
                item.id,
              );
            }}
          >
            {item.uploadedFileName}
          </ButtonDiv>
          {this.displayDeleteButton(item, this.deleteAttachFile)}
        </div>
      ),
    );
  };

  displayRespondedAttachment = () => {
    const { props, state } = this;
    if (
      state.formInitialValues.businessManagementTestRespondedAttachments ===
      undefined
    ) {
      return '';
    }
    return state.formInitialValues.businessManagementTestRespondedAttachments
      .filter(
        (item) =>
          state.isAllFileVisible || this.userIdCheck(item.createdUserAccountId),
      )
      .map((item) => (
        <div className="file-container" key={item.id}>
          <ButtonDiv
            key={item.id}
            className="file-link"
            onClick={() => {
              props.setLoading(true);
              ApiService.businessManagement.downloadRespondedAttachmentFile(
                item.id,
              );
            }}
          >
            {item.uploadedFileName}
          </ButtonDiv>
          {this.displayDeleteButton(item, this.deleteRespondedFile)}
        </div>
      ));
  };

  displayFileInput = () => {
    const { props, state } = this;
    if (state.formInitialValues.isRespondedAttatchmentRequired === undefined) {
      return '';
    }
    if (!state.formInitialValues.isRespondedAttatchmentRequired) return '';
    return (
      <FormRow>
        <MultipleFileInput
          title={props.language.businessManagementModal.returnFile}
          inputName="returnFile"
          inputPlaceholder={props.language.businessManagementModal.fileHint}
          inputValue={state.returnFile}
          setFieldValue={(field, value) => this.setReturnFile(value)}
          description={props.language.businessManagementModal.fileDescription}
          acceptFileExtension={[
            '.pdf',
            '.xlsx',
            '.docx',
            '.pptx',
            '.odt',
            '.ods',
            '.odp',
            '.rar',
            '.zip',
            '.7z',
          ]}
        />
      </FormRow>
    );
  };

  displayUploadButton = () => {
    const { props, state } = this;
    if (state.formInitialValues.isRespondedAttatchmentRequired === undefined) {
      return '';
    }
    if (!state.formInitialValues.isRespondedAttatchmentRequired) return '';
    return (
      <ButtonDiv
        className="upload-button"
        onClick={this.uploadRespondedAttachment}
      >
        {props.language.businessManagementModal.upload}
      </ButtonDiv>
    );
  };

  uploadRespondedAttachment = () => {
    const { props, state } = this;
    const MAX_SIZE_MB = 25;
    const totalSize = state.returnFile.reduce(
      (sum, file) => sum + file.size,
      0,
    );
    const totalSizeMB = totalSize / (1024 * 1024);
    if (totalSizeMB > MAX_SIZE_MB) {
      ModalHelper.openUploadLimitModal();
    } else {
      const request = new FileRecordRequest({
        id: props.id,
        uploadFileList: state.returnFile,
      });
      const formData = request.getFormData();
      ApiService.businessManagement
        .uploadRespondedAttachmentFile(formData)
        .then((response) => {
          ModalHelper.openMessageModalByStatus({
            response,
            callback: this.initState,
          });
        });
    }
  };

  render() {
    const { props, state } = this;

    return (
      <div className="business-management-modal">
        <SectionTitle title={props.title} />
        <div className="info-section">
          <FormRow>
            <FormDescription
              title={props.language.businessManagementModal.title}
              content={state.formInitialValues.title}
            />
            {state.formInitialValues.isSign === true && (
              <FormDescription
                title="會議日期與時間"
                content={state.formInitialValues.meetingDate}
              />
            )}
          </FormRow>
          <FormRow>
            <FormDescription
              title={props.language.businessManagementModal.announcementUnit}
              content={state.formInitialValues.announcementUnit}
            />
            {state.formInitialValues.isSign === true && (
              <FormDescription
                title="報名截止時間"
                content={state.formInitialValues.meetingDeadlineDate}
              />
            )}
          </FormRow>
          <FormRow>
            <FormDescription
              title={props.language.businessManagementModal.announcedUser}
              content={state.formInitialValues.announcedUserAccount}
            />
            {state.formInitialValues.isSign === true && (
              <FormDescription
                title="類別區分"
                content={state.formInitialValues.meetingType}
              />
            )}
          </FormRow>
          <FormRow>
            <FormDescription
              title={props.language.businessManagementModal.date}
              content={state.formInitialValues.announcementDateString}
            />
            {state.formInitialValues.isSign === true && (
              <FormDescription
                title="報名名額"
                content={state.formInitialValues.meetingPeople}
              />
            )}
          </FormRow>
          <FormRow>
            <FormDescription
              title={props.language.businessManagementModal.phone}
              content={state.formInitialValues.telephoneNumber}
            />
            {state.formInitialValues.isSign === true && (
              <FormDescription
                title="講習地點"
                content={state.formInitialValues.meetingPlace}
              />
            )}
          </FormRow>
          <FormRow>
            <FormDescription
              title={props.language.businessManagementModal.file}
              content={this.displayAttachment()}
            />
          </FormRow>
          <FormRow>
            <FormDescription
              title="備註"
              content={state.formInitialValues.content}
            />
          </FormRow>
          {state.formInitialValues.topicList != '' && (
            <FormRow>
              <FormDescription
                title="研討議題"
                content={state.formInitialValues.topicList}
              />
            </FormRow>
          )}
          {this.displayFileInput()}
          <FormRow>
            <FormDescription
              title={
                props.language.businessManagementModal.attachmentDeadlineDate
              }
              content={state.formInitialValues.attachmentDeadlineDateString}
            />
          </FormRow>
          <FormRow>
            <FormDescription
              title={props.language.businessManagementModal.returnFileList}
              content={this.displayRespondedAttachment()}
            />
          </FormRow>
        </div>
        <div className="action-button-container">
          <ButtonDiv className="close-button" onClick={props.onClose}>
            {props.language.businessManagementModal.close}
          </ButtonDiv>
          {this.displayUploadButton()}
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
