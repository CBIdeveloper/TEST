import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import Container from '../../../../lib/components/Container/Container';
import DateInput from '../../../../lib/components/inputs/DateInput/DateInput';
import MultipleFileInput from '../../../../lib/components/inputs/MultipleFileInput/MultipleFileInput';
import FormRow from '../../../../lib/components/FormRow/FormRow';
import SectionTitle from '../../../../lib/components/SectionTitle/SectionTitle';
import TextInput from '../../../../lib/components/inputs/TextInput/TextInput';
import MultipleSelectInput from '../../../../lib/components/inputs/MultipleSelectInput/MultipleSelectInput';

import { setLoading } from '../../../../store/loading/slice';

import ApiService from '../../../../utils/api/ApiService';
import AnnouncementForm from '../../../../utils/forms/systemManagement/AnnouncementForm';
import AnnouncementRequest from '../../../../utils/dataModels/Announcement/AnnouncementRequest';
import BooleanType from '../../../../utils/constants/BooleanType';
import FileRecordRequest from '../../../../utils/dataModels/FileRecord/FileRecordRequest';
import ModalHelper from '../../../../utils/helper/ModalHelper';

import './AddSystemAnnouncement.scss';

class AddSystemAnnouncement extends React.PureComponent {
  onSubmit = (values) => {
    const { props } = this;
    props.setLoading(true);
    const request = new AnnouncementRequest(values);
    ApiService.announcement
      .createAnnouncement(request)
      .then((response) => {
        if (values.file.length > 0) {
          const { id } = response.data;
          const fileRequest = new FileRecordRequest({
            id,
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
    const { props } = this;

    return (
      <Container>
        <div className="add-system-announcement">
          <SectionTitle
            title={
              props.language.systemManagement.subMenus.addSystemAnnouncement
            }
          />
          <Formik
            initialValues={AnnouncementForm.initialValue({})}
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
                      title={props.language.addSystemAnnouncement.title}
                      inputType="text"
                      inputName="title"
                      inputPlaceholder={
                        props.language.addSystemAnnouncement.titleHint
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
                      title={props.language.addSystemAnnouncement.isPinned}
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
                        props.language.addSystemAnnouncement.announcementBeganAt
                      }
                      inputName="announcementBeganAt"
                      inputPlaceholder={
                        props.language.addSystemAnnouncement
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
                        props.language.addSystemAnnouncement.announcementEndedAt
                      }
                      inputName="announcementEndedAt"
                      inputPlaceholder={
                        props.language.addSystemAnnouncement
                          .announcementEndedAtHint
                      }
                      inputValue={values.announcementEndedAt}
                      setFieldValue={setFieldValue}
                      minDate={values.announcementBeganAt}
                      description={
                        props.language.addSystemAnnouncement
                          .announcementEndedAtDescription
                      }
                      touched={touched}
                      errors={errors}
                      required={AnnouncementForm.isFieldRequired(
                        'announcementEndedAt',
                      )}
                    />
                  </FormRow>
                  <FormRow>
                    <MultipleFileInput
                      title={props.language.addSystemAnnouncement.file}
                      inputName="file"
                      inputPlaceholder={
                        props.language.addSystemAnnouncement.fileHint
                      }
                      inputValue={values.file}
                      setFieldValue={setFieldValue}
                      description={
                        props.language.addSystemAnnouncement.fileDescription
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
                    <TextInput
                      full
                      title={props.language.addSystemAnnouncement.content}
                      inputType="textarea"
                      inputName="content"
                      inputPlaceholder={
                        props.language.addSystemAnnouncement.contentHint
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
                      {props.language.addSystemAnnouncement.back}
                    </ButtonDiv>
                    <ButtonDiv className="normal-button" onClick={resetForm}>
                      {props.language.addSystemAnnouncement.clear}
                    </ButtonDiv>
                    <ButtonDiv className="submit-button" onClick={submitForm}>
                      {props.language.addSystemAnnouncement.submit}
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
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});

AddSystemAnnouncement.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddSystemAnnouncement),
);
