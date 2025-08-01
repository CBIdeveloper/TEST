import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import { MdOutlineRemoveCircle } from 'react-icons/md';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import Container from '../../../../lib/components/Container/Container';
import DateInput from '../../../../lib/components/inputs/DateInput/DateInput';
import FormDescription from '../../../../lib/components/FormDescription/FormDescription';
import FormRow from '../../../../lib/components/FormRow/FormRow';
import MultipleFileInput from '../../../../lib/components/inputs/MultipleFileInput/MultipleFileInput';
import MultipleSelectInput from '../../../../lib/components/inputs/MultipleSelectInput/MultipleSelectInput';
import SectionTitle from '../../../../lib/components/SectionTitle/SectionTitle';
import TextInput from '../../../../lib/components/inputs/TextInput/TextInput';

import { setLoading } from '../../../../store/loading/slice';

import ApiService from '../../../../utils/api/ApiService';
import AnnouncementForm from '../../../../utils/forms/systemManagement/AnnouncementForm';
import AnnouncementRequest from '../../../../utils/dataModels/Announcement/AnnouncementRequest';
import BooleanType from '../../../../utils/constants/BooleanType';
import FileRecordRequest from '../../../../utils/dataModels/FileRecord/FileRecordRequest';
import ModalHelper from '../../../../utils/helper/ModalHelper';
import QueryType from '../../../../utils/types/QueryType';
import { getUserId } from '../../../../utils/auth/auth';

import './EditSystemAnnouncement.scss';

class EditSystemAnnouncement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { id: null, formInitialValue: null, planName: '' };
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

  setFormInitialValue = (formInitialValue) => {
    this.setState({ formInitialValue });
  };

  initState = () => {
    const { props } = this;
    const id = props.query.queryObject.get(QueryType.ID);
    if (id !== null) {
      this.setId(id);
      ApiService.announcement.readAnnouncementById(id).then((response) => {
        this.setFormInitialValue(response);
      });
    }
  };

  deleteAttachFile = (id) => {
    ModalHelper.openDeleteModal({
      deleteFunction: () => {
        const { props } = this;
        ApiService.announcement
          .deleteAttachmentFile(id)
          .then((response) => {
            props.setLoading(false);
            ModalHelper.openMessageModalByStatus({
              response,
              callback: this.initState,
            });
          })
      },
    });
  };

  displayDeleteButton = (item, deleteFunction) =>
    item.createdUserAccountId === Number(getUserId()) ? (
      <MdOutlineRemoveCircle
        className="delete-button"
        onClick={() => deleteFunction(item.id)}
      />
    ) : (
      ''
    );

  displayAttachment = () => {
    const { props, state } = this;
    if (state.formInitialValue.announcementAttachments === undefined) {
      return '';
    }
    return state.formInitialValue.announcementAttachments.map((item) => (
      <div className="file-container">
        <ButtonDiv
          key={item.id}
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

  onSubmit = (values) => {
    const { props, state } = this;
    props.setLoading(true);
    const request = new AnnouncementRequest(values);
    ApiService.announcement
      .updateAnnouncement(state.id, request)
      .then((response) => {
        if (values.file.length > 0) {
          const { id } = response.data;
          const fileRequest = new FileRecordRequest({
            id: state.id,
            uploadFileList: values.file,
          });
          const formData = fileRequest.getAnnouncementFormData();
          ApiService.announcement
            .uploadAttachmentFileRecord(formData)
            .then(() => {
              props.setLoading(false);
              ModalHelper.openMessageModalByStatus({
                response,
                callback: props.history.goBack,
              });
            })
            .catch(() => {
              props.setLoading(false);
            });
        } else {
          props.setLoading(false);
          ModalHelper.openMessageModalByStatus({
            response,
            callback: props.history.goBack,
          });
        }
      })
      .catch(() => {
        props.setLoading(false);
      });
  };

  render() {
    const { props, state } = this;

    if (state.formInitialValue === null) return '';

    return (
      <Container>
        <div className="edit-system-announcement">
          <SectionTitle
            title={
              props.language.systemManagement.subMenus.editSystemAnnouncement
            }
          />
          <Formik
            initialValues={AnnouncementForm.initialValue(
              state.formInitialValue,
            )}
            validationSchema={AnnouncementForm.validationSchema()}
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
                      title={props.language.editSystemAnnouncement.title}
                      inputType="text"
                      inputName="title"
                      inputPlaceholder={
                        props.language.editSystemAnnouncement.titleHint
                      }
                      inputValue={values.title}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={AnnouncementForm.isFieldRequired('title')}
                    />
                  </FormRow>
                  <FormRow>
                    <MultipleSelectInput
                      singleSelection
                      horizontal
                      title={props.language.editSystemAnnouncement.isPinned}
                      inputName="isPinned"
                      inputValue={values.isPinned}
                      setFieldValue={setFieldValue}
                      options={BooleanType}
                      touched={touched}
                      errors={errors}
                      required={AnnouncementForm.isFieldRequired('isPinned')}
                    />
                  </FormRow>
                  <FormRow>
                    <DateInput
                      title={
                        props.language.editSystemAnnouncement
                          .announcementBeganAt
                      }
                      inputName="announcementBeganAt"
                      inputPlaceholder={
                        props.language.editSystemAnnouncement
                          .announcementBeganAtHint
                      }
                      inputValue={values.announcementBeganAt}
                      setFieldValue={setFieldValue}
                      maxDate={values.announcementEndedAt}
                      touched={touched}
                      errors={errors}
                      required={AnnouncementForm.isFieldRequired(
                        'announcementBeganAt',
                      )}
                    />
                  </FormRow>
                  <FormRow>
                    <DateInput
                      title={
                        props.language.editSystemAnnouncement
                          .announcementEndedAt
                      }
                      inputName="announcementEndedAt"
                      inputPlaceholder={
                        props.language.editSystemAnnouncement
                          .announcementEndedAtHint
                      }
                      inputValue={values.announcementEndedAt}
                      setFieldValue={setFieldValue}
                      description={
                        props.language.editSystemAnnouncement
                          .announcementEndedAtDescription
                      }
                      minDate={values.announcementBeganAt}
                      touched={touched}
                      errors={errors}
                      required={AnnouncementForm.isFieldRequired(
                        'announcementEndedAt',
                      )}
                    />
                  </FormRow>
                  <FormRow>
                    <MultipleFileInput
                      title={props.language.editSystemAnnouncement.file}
                      inputName="file"
                      inputPlaceholder={
                        props.language.editSystemAnnouncement.fileHint
                      }
                      inputValue={values.file}
                      setFieldValue={setFieldValue}
                      description={
                        props.language.editSystemAnnouncement.fileDescription
                      }
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
                  <FormRow>
                    <FormDescription
                      leftBorder
                      title={props.language.editSystemAnnouncement.currentFile}
                      content={this.displayAttachment()}
                    />
                  </FormRow>
                  <FormRow>
                    <TextInput
                      full
                      title={props.language.editSystemAnnouncement.content}
                      inputType="textarea"
                      inputName="content"
                      inputPlaceholder={
                        props.language.editSystemAnnouncement.contentHint
                      }
                      inputValue={values.content}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={AnnouncementForm.isFieldRequired('content')}
                    />
                  </FormRow>
                  <div className="action-button-container">
                    <ButtonDiv
                      className="normal-button"
                      onClick={props.history.goBack}
                    >
                      {props.language.editSystemAnnouncement.back}
                    </ButtonDiv>
                    {/* <ButtonDiv className="normal-button" onClick={resetForm}> */}
                    {/*  {props.language.editSystemAnnouncement.clear} */}
                    {/* </ButtonDiv> */}
                    <ButtonDiv className="save-button" onClick={submitForm}>
                      {props.language.editSystemAnnouncement.save}
                    </ButtonDiv>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </Container>
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

EditSystemAnnouncement.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditSystemAnnouncement),
);
