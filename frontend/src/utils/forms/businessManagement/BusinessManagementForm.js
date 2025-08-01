import BaseForm from '../BaseForm';
import { dateObjectToDateString } from '../../parsers/dateParser';

class BusinessManagementForm extends BaseForm {
  initialValue = (values) => ({
    announcedUserAccountId: values.announcedUserAccountId || '',
    // jobPosition: values.jobPosition || '',
    announcementUnit: values.announcementUnit || '',
    announcementDate: values.announcementDate || new Date(),
    createdDate: values.createdDate || dateObjectToDateString(new Date()),
    createdUser: values.createdUser || '',
    businessPhone: values.businessPhone || '',
    telephoneExtension: values.telephoneExtension || '',
    isVisibleToAll:
      values.isVisibleToAll === undefined ? false : values.isVisibleToAll,
    isSign: values.isSign || false,
    visibleFirstlevelAgencyIdList: values.visibleFirstlevelAgencyIdList || [''],
    visibleSecondaryAgencyIdList: values.visibleSecondaryAgencyIdList || [''],
    visibleCityIdList: values.visibleCityIdList || [''],
    visibleFirstlevelUnitIdList: values.visibleFirstlevelUnitIdList || [''],
    visibleLevelIdList: values.visibleLevelIdList || [''],
    visibleMilitaryIdList: values.visibleMilitaryIdList || [''],

    title: values.title || '',
    file: values.file || [],
    isRespondedAttatchmentRequired:
      values.isRespondedAttatchmentRequired === undefined
        ? false
        : values.isRespondedAttatchmentRequired,
    attachmentDeadlineDate: values.attachmentDeadlineDate || '',
    topicList: values.topicList || [''],
    content: values.content || '',
    isFood: values.isFood,
    isPlace: values.isPlace,
    isTraffic: values.isTraffic,
    meetingStartDate: values.meetingStartDate || '',
    meetingEndDate: values.meetingEndDate || '',
    meetingType: values.meetingType || '',
    meetingPeople: values.meetingPeople || '',
    meetingPlace: values.meetingPlace || '',
    isMeetingTimeRequired:
      values.isMeetingTimeRequired === undefined
        ? false
        : values.isMeetingTimeRequired,
    isMeetingInformation:
      values.isMeetingInformation === undefined
        ? 0
        : values.isMeetingInformation,
    meetingDeadlineDate: values.meetingDeadlineDate || '',
    isRequestClear: values.isRequestClear || true,
    questionTypeList: values.questionTypeList || [],
    isRequiredList: values.isRequiredList || [],
    questionList: values.questionList || [],
    optionList: values.optionList || [],
  });

  validationSchema = () =>
    this.Yup.object().shape({
      announcedUserAccountId: this.Yup.string().required('承辦人員必填！'),
      // announcementUnit: this.Yup.string().required('公告單位必填！'),
      announcementUnit: this.Yup.string().nullable(),
      announcementDate: this.Yup.date().required('公告日期必填！'),
      // createdDate: this.Yup.date().required('建檔日期必填！'),
      createdDate: this.Yup.date().nullable(),
      // createdUser: this.Yup.string().required('建檔人員必填！'),
      createdUser: this.Yup.string().nullable(),
      // jobPosition: this.Yup.string().required('職稱必填！'),
      businessPhone: this.Yup.string()
        .required('公務電話必填！')
        .max(15, '公務電話至多15個字！'),
      telephoneExtension: this.Yup.string()
        .nullable()
        .max(10, '公務電話分機至多10個字！'),
      isVisibleToAll: this.Yup.bool().required('可見公告單位必填！'),

      visibleFirstlevelAgencyIdList: this.Yup.array().nullable(),
      visibleSecondaryAgencyIdList: this.Yup.array().nullable(),
      visibleCityIdList: this.Yup.array().nullable(),
      visibleFirstlevelUnitIdList: this.Yup.array().nullable(),

      title: this.Yup.string()
        .required('公告主旨必填！')
        .max(400, '公告主旨至多400個字！'),
      file: this.Yup.array().nullable(),
      isRespondedAttatchmentRequired:
        this.Yup.bool().required('是否需回傳附件必填！'),
      attachmentDeadlineDate: this.Yup.string()
        .nullable()
        .when('isRespondedAttatchmentRequired', {
          is: true,
          then: this.Yup.string().required('繳件期限必填！'),
        }),
      meetingStartDate: this.Yup.date().when('isSign', {
        is: true,
        then: this.Yup.date().required('會議開始日期必填！'),
      }),
      meetingEndDate: this.Yup.date().when('isSign', {
        is: true,
        then: this.Yup.date().required('會議結束日期必填！'),
      }),
      meetingType: this.Yup.string()
        .nullable()
        .when('isSign', {
          is: true,
          then: this.Yup.string().required('類型區分必填!'),
        }),
      meetingPeople: this.Yup.number()
        .nullable()
        .when('isSign', (isSign, schema) =>
          isSign
            ? schema.typeError('必須是數字!').required('報名名額必填!')
            : schema,
        ),
      meetingPlace: this.Yup.string()
        .nullable()
        .when('isSign', {
          is: true,
          then: this.Yup.string().required('會議地點必填!'),
        }),
      meetingDeadlineDate: this.Yup.string()
        .nullable()
        .when('isMeetingTimeRequired', {
          is: true,
          then: this.Yup.string().required('報名截止時間必填！'),
        }),
    });
}

const businessManagementForm = new BusinessManagementForm();

export default businessManagementForm;
