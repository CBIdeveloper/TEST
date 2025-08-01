import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdAddCircle, MdOutlineRemoveCircle } from 'react-icons/md';
import { FieldArray, Formik } from 'formik';
import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import FormDescription from '../../../../../lib/components/FormDescription/FormDescription';
import FormRow from '../../../../../lib/components/FormRow/FormRow';
import MultipleFileInput from '../../../../../lib/components/inputs/MultipleFileInput/MultipleFileInput';
import MultipleSelectInput from '../../../../../lib/components/inputs/MultipleSelectInput/MultipleSelectInput';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';
import SelectInputNotitle from '../../../../../lib/components/inputs/SelectInput/SelectInputNotitle';
import TextInput from '../../../../../lib/components/inputs/TextInput/TextInput';
import TextInputNotitle from '../../../../../lib/components/inputs/TextInput/TextInputNotitle';

import { setLoading } from '../../../../../store/loading/slice';
import BusinessManagementSignForm from '../../../../../utils/forms/businessManagement/BusinessManagementSignForm';
import BusinessManagementSignRequest from '../../../../../utils/dataModels/BusinessManagement/BusinessManagementSignRequest';
import ApiService from '../../../../api/ApiService';
import FileRecordRequest from '../../../../dataModels/FileRecord/FileRecordRequest';
import ModalHelper from '../../../../helper/ModalHelper';
import DateHelper from '../../../../helper/DateHelper';
import {
  getUserId,
  getName,
  getJobPosition,
  getUnitName,
  getBusinessPhone,
} from '../../../../auth/auth';

import FormSectionTitle2 from '../../../../../lib/components/FormSectionTitle2/FormSectionTitle2';

import BooleanType from '../../../../../utils/constants/BooleanType';
import FoodType from '../../../../../utils/constants/FoodType';
import TrafficType from '../../../../../utils/constants/TrafficType';

import '../BusinessManagementSignModal.scss';

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

  setSignList = (signList) => {
    this.setState({ signList });
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
    const topicList = response2.join(',')
    ApiService.businessManagement
      .readBusinessManagementById(props.id)
      .then((response) => {
        props.setLoading(false);
        // console.log(response);
        if (
          response.meetingStartDate != null &&
          response.meetingEndDate != null
        ) {
          response.meetingStartDate = DateHelper.changeDate(response.meetingStartDate);
          response.meetingEndDate = DateHelper.changeDate(response.meetingEndDate);
          response.meetingDate =
            response.meetingStartDate + '~' + response.meetingEndDate;
        } else {
          response.meetingDate = '';
        }
        const meeting = meetingTypeList.find(
          (item) => item.id === response.meetingType,
        );
        if (response.meetingType != null) {
          response.meetingType = meeting.name;
        }
        if (
          response.meetingDeadlineDate === '' &&
          response.meetingStartDate != null
        ) {
          response.meetingDeadlineDate = '無';
        } else {
          response.meetingDeadlineDate = DateHelper.changeDate(response.meetingDeadlineDate);
        }
        if (response.meetingPeople != null) {
          response.meetingPeople = response.meetingPeople + '人數';
        } else {
          response.meetingPeople = '';
        }
        if (topicList != "") {
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
              callback: () => { },
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
              callback: () => { },
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

  signTitle = ({ values, setFieldValue, arrayHelpers }) => {
    const { props } = this;
    return (
      <div className="visible-unit-input-title">
        <div>{props.language.businessManagementSignModal.title}</div>
        <MdAddCircle
          size={18}
          className="add-button"
          onClick={() => {
            const newSign = {
              unit: '',
              jobPosition: '',
              name: '',
              telephone: '',
            };
            setFieldValue("signList", [...values.signList, newSign]);
          }}
        />
      </div>
    );
  }

  signInputTitle = ({ values, index, setFieldValue, arrayHelpers }) => {
    const { props } = this;
    if (values.signList.length > 1) {
      return (
        <div className="visible-unit-input-title">
          <div>{props.language.businessManagementSignModal.unit}</div>
          <MdOutlineRemoveCircle
            size={18}
            className="delete-button"
            onClick={() => {
              const signList = [...values.signList];
              signList.splice(index, 1);
              arrayHelpers.remove(index);
              console.log(signList)
              setFieldValue('signList', signList);
            }}
          />
        </div>
      );
    }
    return props.language.businessManagementSignModal.unit;
  };

  displaySignUnit = () => {
    const { props, state } = this;

    if (!state.formInitialValues || Object.keys(state.formInitialValues).length === 0) return '';

    return (
      <Formik
        initialValues={BusinessManagementSignForm.initialValue({
          signList: [{
            unit: getUnitName(),
            jobPosition: getJobPosition(),
            name: getName(),
            telephone: getBusinessPhone(),
          }],
          ...state.formInitialValues
        })}
        validationSchema={BusinessManagementSignForm.validationSchema()}
        onSubmit={this.onSignSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          resetForm,
          setFieldValue,
          submitForm,
          touched,
          values,
          errors,
        }) => (
          <form onSubmit={handleSubmit} className="form" autoComplete="off">
            <div className="visible-unit-card">
              <FieldArray
                name="signList"
                render={(arrayHelpers) => (
                  <div className="contents">
                    <FormSectionTitle2
                      title={this.signTitle({
                        values,
                        setFieldValue,
                        arrayHelpers,
                      })}
                    />
                    {values.signList.map((content, index) => (
                      <div key={index}>
                        <FormRow>
                          <TextInput
                            full
                            title={this.signInputTitle({
                              values,
                              index,
                              setFieldValue,
                              arrayHelpers,
                            })}
                            inputType="text"
                            inputName={`signList.${index}.unit`}
                            inputPlaceholder={`請輸入${props.language.businessManagementSignModal.unit}`}
                            inputValue={content.unit}
                            inputOnChange={handleChange}
                            setFieldValue={setFieldValue}
                            touched={touched}
                            touchedName={`signList.${index}`}
                            errors={errors}
                            errorsName={`signList.${index}.unit`}
                          />
                          <TextInput
                            full
                            title={props.language.businessManagementSignModal.jobPosition}
                            inputType="text"
                            inputName={`signList.${index}.jobPosition`}
                            inputPlaceholder={`請輸入${props.language.businessManagementSignModal.jobPosition}`}
                            inputValue={content.jobPosition}
                            inputOnChange={handleChange}
                            setFieldValue={setFieldValue}
                            touched={touched}
                            touchedName={`signList.${index}`}
                            errors={errors}
                            errorsName={`signList.${index}.jobPosition`}
                          />
                          <TextInput
                            full
                            title={props.language.businessManagementSignModal.name}
                            inputType="text"
                            inputName={`signList.${index}.name`}
                            inputPlaceholder={`請輸入${props.language.businessManagementSignModal.name}`}
                            inputValue={content.name}
                            inputOnChange={handleChange}
                            setFieldValue={setFieldValue}
                            touched={touched}
                            touchedName={`signList.${index}`}
                            errors={errors}
                            errorsName={`signList.${index}.name`}
                          />
                          <TextInput
                            full
                            title={props.language.businessManagementSignModal.telephone}
                            inputType="text"
                            inputName={`signList.${index}.telephone`}
                            inputPlaceholder={`請輸入${props.language.businessManagementSignModal.telephone}`}
                            inputValue={content.telephone}
                            inputOnChange={handleChange}
                            setFieldValue={setFieldValue}
                            touched={touched}
                            touchedName={`signList.${index}`}
                            errors={errors}
                            errorsName={`signList.${index}.telephone`}
                          />
                        </FormRow>
                        <FormRow>
                          {values.isFood &&
                            <MultipleSelectInput
                              horizontal
                              singleSelection
                              title={props.language.businessManagementSignModal.isFood}
                              inputName={`signList.${index}.isFood`}
                              inputValue={content.isFood}
                              setFieldValue={setFieldValue}
                              touched={touched}
                              touchedName={`signList.${index}`}
                              errors={errors}
                              errorsName={`signList.${index}.isFood`}
                              options={BooleanType}
                              trailingIcon={
                                <SelectInputNotitle
                                  inputName={`signList.${index}.foodType`}
                                  inputPlaceholder=""
                                  inputValue={!content.isFood ? content.foodType = null : content.foodType}
                                  setFieldValue={setFieldValue}
                                  options={FoodType}
                                  touched={touched}
                                  touchedName={`signList.${index}`}
                                  errors={errors}
                                  errorsName={`signList.${index}.foodType`}
                                  disable={!content.isFood || false}
                                />
                              }
                            />
                          }
                          {values.isPlace &&
                            <MultipleSelectInput
                              horizontal
                              singleSelection
                              title={props.language.businessManagementSignModal.isPlace}
                              inputName={`signList.${index}.isPlace`}
                              inputValue={content.isPlace}
                              setFieldValue={setFieldValue}
                              touched={touched}
                              touchedName={`signList.${index}`}
                              errors={errors}
                              errorsName={`signList.${index}.isPlace`}
                              options={BooleanType}
                            />
                          }
                          {values.isTraffic &&
                            <MultipleSelectInput
                              horizontal
                              singleSelection
                              title={props.language.businessManagementSignModal.TrafficType}
                              inputName={`signList.${index}.trafficType`}
                              inputValue={content.trafficType}
                              setFieldValue={setFieldValue}
                              touched={touched}
                              touchedName={`signList.${index}`}
                              errors={errors}
                              errorsName={`signList.${index}.trafficType`}
                              options={TrafficType}
                              trailingIcon={
                                <TextInputNotitle
                                  full
                                  inputType="text"
                                  inputName={`signList.${index}.licensePlate`}
                                  inputPlaceholder="請輸入車牌號碼"
                                  inputValue={content.trafficType !== '2' ? content.licensePlate = '' : content.licensePlate}
                                  inputOnChange={handleChange}
                                  setFieldValue={setFieldValue}
                                  touched={touched}
                                  touchedName={`signList.${index}`}
                                  errors={errors}
                                  errorsName={`signList.${index}.licensePlate`}
                                  disable={content.trafficType !== '2'}
                                />
                              }
                            />
                          }
                        </FormRow>
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>
            <div className="action-button-container">
              <ButtonDiv className="normal-button" onClick={resetForm}>
                {props.language.businessManagementSignModal.clear}
              </ButtonDiv>
              <ButtonDiv className="submit-button" onClick={submitForm}>
                {props.language.businessManagementSignModal.submit}
              </ButtonDiv>
            </div>
          </form>
        )}
      </Formik>
    );
  }

  onSignSubmit = (values) => {

    if (values.signList.length > 0) {
      const { props, state } = this;
      props.setLoading(true);
      console.log(values.signList)

      ApiService.businessManagement
        .signDiffCount(props.id)
        .then((response) => {
          props.setLoading(false);
          if (response === -999 || response >= values.signList.length) {
            const request = values.signList.map(
              (item) => new BusinessManagementSignRequest(item),
            );
            console.log('request', request)
            ApiService.businessManagement
              .createBusinessManagementSign(props.id, request)
              .then((response) => {
                props.setLoading(false);
                // console.log('response_create', response)
                ModalHelper.openMessageModalByStatus({
                  response,
                  callback: () => { },
                });
              })
              .catch((error) => {
                console.log(error)
                props.setLoading(false);
              });
          } else {
            props.setLoading(false);
            alert('報名人數超過報名名額')
          }
        })
        .catch(() => {
          props.setLoading(false);
        });
    }
  }

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
            <FormDescription
              title="會議日期與時間"
              content={state.formInitialValues.meetingDate}
            />
          </FormRow>
          <FormRow>
            <FormDescription
              title={props.language.businessManagementModal.announcementUnit}
              content={state.formInitialValues.announcementUnit}
            />
            <FormDescription
              title="報名截止時間"
              content={state.formInitialValues.meetingDeadlineDateString}
            />
          </FormRow>
          <FormRow>
            <FormDescription
              title={props.language.businessManagementModal.announcedUser}
              content={state.formInitialValues.announcedUserAccount}
            />
            <FormDescription
              title="類別區分"
              content={state.formInitialValues.meetingType}
            />
          </FormRow>
          <FormRow>
            <FormDescription
              title={props.language.businessManagementModal.date}
              content={state.formInitialValues.announcementDateString}
            />
            <FormDescription
              title="報名名額"
              content={state.formInitialValues.meetingPeople}
            />
          </FormRow>
          <FormRow>
            <FormDescription
              title={props.language.businessManagementModal.phone}
              content={state.formInitialValues.telephoneNumber}
            />
            <FormDescription
              title="講習地點"
              content={state.formInitialValues.meetingPlace}
            />
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
          <FormRow>
            <FormDescription
              title="研討議題"
              content={state.formInitialValues.topicList}
            />
          </FormRow>
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
        {this.displaySignUnit()}
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
