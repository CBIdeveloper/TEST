import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FieldArray, Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import { MdAddCircle, MdOutlineRemoveCircle } from 'react-icons/md';

import ButtonDiv from '../../lib/components/ButtonDiv/ButtonDiv';
import DateInput from '../../lib/components/inputs/DateInput/DateInput';
import FormDescription from '../../lib/components/FormDescription/FormDescription';
import FormRow from '../../lib/components/FormRow/FormRow';
import FormikErrorModal from '../../lib/components/FormikErrorModal/FormikErrorModal';
import MultipleFileInput from '../../lib/components/inputs/MultipleFileInput/MultipleFileInput';
import MultipleSelectInput from '../../lib/components/inputs/MultipleSelectInput/MultipleSelectInput';
import PhoneInput from '../../lib/components/inputs/PhoneInput/PhoneInput';
import SelectInput from '../../lib/components/inputs/SelectInput/SelectInput';
import TextInput from '../../lib/components/inputs/TextInput/TextInput';
// import UnitInput from '../../lib/components/inputs/UnitInput/UnitInput';
import UnitInput2 from '../../lib/components/inputs/UnitInput/UnitInput2';

import { setLoading } from '../../store/loading/slice';

import ApiService from '../../utils/api/ApiService';
import BooleanType from '../../utils/constants/BooleanType';
import MeetingType from '../../utils/constants/MeetingType';
import BusinessManagementForm from '../../utils/forms/businessManagement/BusinessManagementForm';
import BusinessManagementRequest from '../../utils/dataModels/BusinessManagement/BusinessManagementRequest';
import FileRecordRequest from '../../utils/dataModels/FileRecord/FileRecordRequest';
import FormSectionTitle from '../../lib/components/FormSectionTitle/FormSectionTitle';
import FormSectionTitle2 from '../../lib/components/FormSectionTitle2/FormSectionTitle2';
import ModalHelper from '../../utils/helper/ModalHelper';
import QueryType from '../../utils/types/QueryType';
import SectionTitle from '../../lib/components/SectionTitle/SectionTitle';
import VisibleUnitType from '../../utils/constants/VisibleUnitType';
import {
  getUserId,
  getUserWorkObject,
  getJobPosition,
} from '../../utils/auth/auth';
import SignType from '../../utils/constants/SignType';
import DOMPurify from 'dompurify';
import './EditBusinessManagement.scss';
import checkboxNone from '../../assets/images/icons/checkbox_none2.png';
import checkboxChecked from '../../assets/images/icons/checkbox_check2.png';
import DateTimeInput from '../../lib/components/inputs/DateTimeInput/DateTimeInput';
import CheckBoxTitle from '../../lib/components/inputs/ThreeCheckBoxAddTitle/CheckBox';
import QuestionType from '../../utils/constants/QuestionType';
class EditBusinessManagement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      formInitialValues: null,
      userList: [],
      firstlevelAgencyList: [],
      secondaryAgencyObject: {},
      cityList: [],
      firstlevelUnitObject: {},
      levelList: [],
      military: [],
      militaryuid: [],
      isVisibleToAll: false,
      isOrganizationClear: false,
      isGovernmentClear: false,
      isMilitaryClear: false,
      resultO: '',
      resultG: '',
      visibleFirstlevelAgencyIdList: [],
      visibleSecondaryAgencyIdList: [],
      visibleCityIdList: [],
      visibleFirstlevelUnitIdList: [],
      visiblelevelIdList: [],
      visibleMilitaryIdList: [],
      meetingTypeList: [],
      questionList: [],
      hasFood: false,
      hasPlace: false,
      hasTraffic: false,
      index: 0,
    };
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

  setFormInitialValues = (formInitialValues) => {
    this.setState({ formInitialValues });
  };

  setUserList = (userList) => {
    this.setState({ userList });
  };

  setIsVisibleToAll = (isVisibleToAll) => {
    this.setState({ isVisibleToAll });
  };

  setIsOrganizationClear = (isOrganizationClear) => {
    this.setState({ isOrganizationClear });
  };

  setIsGovernmentClear = (isGovernmentClear) => {
    this.setState({ isGovernmentClear });
  };

  setIsMilitaryClear = (isMilitaryClear) => {
    this.setState({ isMilitaryClear });
  };

  setFirstlevelAgencyList = (firstlevelAgencyList) => {
    this.setState({ firstlevelAgencyList });
  };

  setSecondaryAgencyObject = async (secondaryAgencyObject) => {
    await this.setState({ secondaryAgencyObject });
  };

  setCityList = (cityList) => {
    this.setState({ cityList });
  };

  setFirstlevelUnitObject = async (firstlevelUnitObject) => {
    await this.setState({ firstlevelUnitObject });
  };

  setLevelList = (levelList) => {
    this.setState({ levelList });
  };

  setMilitary = (military) => {
    this.setState({ military });
  };

  setMilitaryUid = (militaryuid) => {
    this.setState({ militaryuid });
  };

  setResultO = (resultO) => {
    this.setState({ resultO });
  };

  setResultG = (resultG) => {
    this.setState({ resultG });
  };

  setMeetingType = (meetingTypeList) => {
    this.setState({ meetingTypeList });
  };

  setVisibleFirstlevelAgencyIdList = (visibleFirstlevelAgencyIdList) => {
    this.setState({ visibleFirstlevelAgencyIdList });
  };

  setVisibleSecondaryAgencyIdList = (visibleSecondaryAgencyIdList) => {
    this.setState({ visibleSecondaryAgencyIdList });
  };

  setVisibleCityIdList = (visibleCityIdList) => {
    this.setState({ visibleCityIdList });
  };

  setVisibleFirstlevelUnitIdList = (visibleFirstlevelUnitIdList) => {
    this.setState({ visibleFirstlevelUnitIdList });
  };

  setVisiblelevelIdList = (visiblelevelIdList) => {
    this.setState({ visiblelevelIdList });
  };

  setVisibleMilitaryIdList = (visibleMilitaryIdList) => {
    this.setState({ visibleMilitaryIdList });
  };

  initState = () => {
    const { props } = this;
    const id = props.query.queryObject.get(QueryType.ID);
    this.initUserList();
    this.setId(id);
    if (id !== null) {
      ApiService.businessManagement
        .readBusinessManagementById(id)
        .then((response) => {
          response.questionTypeList = response.requestList.map(
            (item) => item.questionType,
          );
          response.isRequiredList = response.requestList.map(
            (item) => item.isRequired,
          );
          response.questionList = response.requestList.map(
            (item) => item.question,
          );
          response.optionList = response.requestList.map((item) => item.option);
          this.setFormInitialValues(response);
          this.setIsVisibleToAll(response.isVisibleToAll);
          this.setIsOrganizationClear(response.isOrganizationClear);
          this.setIsGovernmentClear(response.isGovernmentClear);
          this.setIsMilitaryClear(response.isMilitaryClear);
          this.initSecondaryObject(response.visibleFirstlevelAgencyIdList);
          this.initUnitObject(response.visibleCityIdList);
          this.setResultO(response.resultO);
          this.setResultG(response.resultG);
          this.setVisibleFirstlevelAgencyIdList(
            response.visibleFirstlevelAgencyIdList,
          );
          this.setVisibleSecondaryAgencyIdList(
            response.visibleSecondaryAgencyIdList,
          );
          this.setVisibleCityIdList(response.visibleCityIdList);
          this.setVisibleFirstlevelUnitIdList(
            response.visibleFirstlevelUnitIdList,
          );
          this.setVisiblelevelIdList(response.visiblelevelIdList);
          this.setVisibleMilitaryIdList(response.visibleMilitaryIdList);
          this.setState({ hasFood: response.isFood });
          this.setState({ hasPlace: response.isPlace });
          this.setState({ hasTraffic: response.isTraffic });
        });
    }
    ApiService.city.readCity().then((response) => {
      const cityList = response.map((item) => ({
        text: item.cityName,
        value: item.id,
      }));
      this.setCityList(cityList);
    });
    ApiService.firstlevelAgency.readFirstlevelAgency().then((response) => {
      const firstlevelAgencyList = response.map((item) => ({
        text: item.shortName,
        value: item.id,
      }));
      this.setFirstlevelAgencyList(firstlevelAgencyList);
    });
    ApiService.codefile.getMilitarylevelList().then((response) => {
      const militarylevelList = response.codefileList.map((item) => ({
        text: item.name,
        value: item.id,
      }));
      this.setLevelList(militarylevelList);
    });
    ApiService.codefile.getMilitaryAgencyList().then((response) => {
      const militarylevelList = response.codefileList.map((item) => ({
        text: item.name,
        value: item.id,
      }));
      this.setMilitary(militarylevelList);
      const militarylevelUidList = response.codefileList.map((item) => ({
        text: item.id,
        value: item.uid,
      }));
      this.setMilitaryUid(militarylevelUidList);
    });
    ApiService.codefile.getMeetingTypeList().then((response) => {
      const meetingTypeList = response.codefileList.map((item) => ({
        text: item.name,
        value: item.id,
      }));
      this.setMeetingType(meetingTypeList);
    });
  };

  initUserList = () => {
    const workObject = getUserWorkObject();
    let loadUserFunction = null;
    if (workObject) {
      if (workObject.agencyType === '1') {
        if (workObject.secondaryAgencyId !== '') {
          loadUserFunction =
            ApiService.simpleSysUserAccount.readSysUserAccountBySecondaryAgency(
              workObject.secondaryAgencyId,
            );
        } else if (workObject.firstLevelAgencyId !== '') {
          loadUserFunction =
            ApiService.simpleSysUserAccount.readSysUserAccountByFirstLevelAgency(
              workObject.firstLevelAgencyId,
            );
        } else if (workObject.militaryagencyId !== '') {
          loadUserFunction =
            ApiService.simpleSysUserAccount.readSysUserAccountByMilitaryagency(
              workObject.militaryagencyId,
            );
        }
      } else if (
        workObject.firstLevelUnitId !== null &&
        workObject.firstLevelUnitId !== ''
      ) {
        loadUserFunction =
          ApiService.simpleSysUserAccount.readSysUserAccountByFirstLevelUnit(
            workObject.firstLevelUnitId,
          );
      } else if (workObject.cityId !== null && workObject.cityId !== '') {
        loadUserFunction =
          ApiService.simpleSysUserAccount.readSysUserAccountByCity(
            workObject.cityId,
          );
      } else if (workObject.militaryagencyId !== null) {
        loadUserFunction =
          ApiService.simpleSysUserAccount.readSysUserAccountByMilitaryagency(
            workObject.militaryagencyId,
          );
      }
    }

    if (loadUserFunction !== null) {
      loadUserFunction.then((users) => {
        const userList = users.map((item) => ({
          text: item.name,
          value: item.id,
          data: item,
        }));
        this.setUserList(userList);
      });
    }
  };

  initSecondaryObject = (visibleFirstlevelAgencyIdList) => {
    const list = visibleFirstlevelAgencyIdList.filter((item) => item !== '');
    list.forEach((id) => {
      ApiService.secondaryAgency
        .readSecondaryAgencyByFirstLevelId(id)
        .then(async (response) => {
          const { state } = this;
          if (state.secondaryAgencyObject[id] === undefined) {
            const secondaryAgencyList = response.map((item) => ({
              text: item.shortName,
              value: item.id,
            }));
            await this.setSecondaryAgencyObject({
              ...state.secondaryAgencyObject,
              [id]: secondaryAgencyList,
            });
          }
        });
    });
  };

  initUnitObject = (visibleCityIdList) => {
    visibleCityIdList.forEach((id) => {
      ApiService.firstlevelUnit
        .readFirstlevelUnitByCityId(id)
        .then(async (response) => {
          const { state } = this;
          if (state.firstlevelUnitObject[id] === undefined) {
            const firstlevelUnitList = response.map((item) => ({
              text: item.fullName,
              value: item.id,
            }));
            await this.setFirstlevelUnitObject({
              ...state.firstlevelUnitObject,
              [id]: firstlevelUnitList,
            });
          }
        });
    });
  };

  handleIsFileOnChanged = ({
    values,
    isRespondedAttatchmentRequired,
    field,
    setFieldValue,
  }) => {
    if (
      values.isRespondedAttatchmentRequired !==
        isRespondedAttatchmentRequired &&
      !isRespondedAttatchmentRequired
    ) {
      setFieldValue('attachmentDeadlineDate', '');
    }
    setFieldValue(field, isRespondedAttatchmentRequired);
  };

  handleSignOnChanged = ({ values, isSign, field, setFieldValue }) => {
    if (values.isSign !== isSign && !isSign) {
    }
    setFieldValue(field, isSign);
  };

  handleIsAllVisibleOnChanged = ({
    values,
    isVisibleToAll,
    field,
    setFieldValue,
  }) => {
    if (values.isVisibleToAll !== isVisibleToAll && !isVisibleToAll) {
      setFieldValue('visibleFirstlevelAgencyIdList', []);
      setFieldValue('visibleSecondaryAgencyIdList', []);
      setFieldValue('visibleCityIdList', []);
      setFieldValue('visibleFirstlevelUnitIdList', []);
    }
    setFieldValue(field, isVisibleToAll);
  };

  handleAnnouncedUserOnChanged = ({ field, user, setFieldValue }) => {
    const { state } = this;
    const userItem = state.userList.find((item) => item.value === user);
    if (userItem !== undefined) {
      const { jobPosition, businessPhone, telephoneExtension } = userItem.data;
      setFieldValue('jobPosition', jobPosition);
      setFieldValue('businessPhone', businessPhone);
      setFieldValue('telephoneExtension', telephoneExtension);
    }
    setFieldValue(field, user);
  };

  handleFirstLevelAgencyOnChanged = async ({
    value,
    field,
    setFieldValue,
    index,
  }) => {
    const { state } = this;
    if (state.secondaryAgencyObject[value] === undefined && value !== '') {
      await ApiService.secondaryAgency
        .readSecondaryAgencyByFirstLevelId(value)
        .then(async (response) => {
          const secondaryAgencyList = response.map((item) => ({
            text: item.shortName,
            value: item.id,
          }));
          await this.setSecondaryAgencyObject({
            ...state.secondaryAgencyObject,
            [value]: secondaryAgencyList,
          });
        });
    }
    setFieldValue(field, value);
    setFieldValue(`visibleSecondaryAgencyIdList.${index}`, '');
  };

  handleCityOnChanged = async ({ value, field, setFieldValue, index }) => {
    const { state } = this;
    if (state.firstlevelUnitObject[value] === undefined && value !== '') {
      await ApiService.firstlevelUnit
        .readFirstlevelUnitByCityId(value)
        .then(async (response) => {
          const firstlevelUnitList = response.map((item) => ({
            text: item.fullName,
            value: item.id,
          }));
          await this.setFirstlevelUnitObject({
            ...state.firstlevelUnitObject,
            [value]: firstlevelUnitList,
          });
        });
    }
    setFieldValue(field, value);
    setFieldValue(`visibleFirstlevelUnitIdList.${index}`, '');
  };

  visibleAgencyList = (values) => {
    const visibleFirstlevelAgencyIdList = [];
    const visibleSecondaryAgencyIdList = [];
    values.visibleSecondaryAgencyIdList.forEach((item, index) => {
      if (item === '') {
        if (
          !visibleFirstlevelAgencyIdList.includes(
            values.visibleFirstlevelAgencyIdList[index],
          ) &&
          values.visibleFirstlevelAgencyIdList[index] !== ''
        ) {
          visibleFirstlevelAgencyIdList.push(
            values.visibleFirstlevelAgencyIdList[index],
          );
        }
      } else if (!visibleSecondaryAgencyIdList.includes(item)) {
        visibleSecondaryAgencyIdList.push(item);
      }
    });
    return {
      visibleFirstlevelAgencyIdList,
      visibleSecondaryAgencyIdList,
    };
  };

  visiableLevel = () => {
    const { state } = this;
    const firstlevelAgencyListMap = state.firstlevelAgencyList.map(
      (item) => item.text,
    );
    const firstlevelAgencyList = firstlevelAgencyListMap.join('，');

    const cityListMap = state.cityList.map((item) => item.text);
    const cityList = cityListMap.join('，');

    let visMilitaryList = '';
    const filterMilitary = state.military.filter(
      (item) =>
        item.value !== '001' && item.value !== '002' && item.value !== '003',
    );
    const militaryMap = filterMilitary.map((item) => item.text);
    const militaryList = militaryMap.join('，');
    if (state.visiblelevelIdList != '') {
      state.visiblelevelIdList.sort();
      const filteredMilitaryLists = state.visiblelevelIdList.map((id) => {
        if (id === '001') {
          return state.military.filter(
            (item) => item.value !== '001' && item.value.startsWith('001'),
          );
        } else if (id === '002') {
          return state.military.filter(
            (item) => item.value !== '002' && item.value.startsWith('002'),
          );
        } else if (id === '003') {
          return state.military.filter(
            (item) => item.value !== '003' && item.value.startsWith('003'),
          );
        } else {
          return state.military.filter((item) => item.value === id);
        }
      });
      const militaryMap = filteredMilitaryLists.flat().map((item) => item.text);
      const militaryList = militaryMap.join('，');
      visMilitaryList = militaryList;
    }
    ModalHelper.openVisiableLevelModal({
      isVisibleToAll: state.isVisibleToAll,
      isOrganizationClear: state.isOrganizationClear,
      isGovernmentClear: state.isGovernmentClear,
      isMilitaryClear: state.isMilitaryClear,
      firstlevelAgencyList: firstlevelAgencyList,
      visOrganizationList: state.resultO,
      cityList: cityList,
      visGovermentList: state.resultG,
      militaryList: militaryList,
      visMilitaryList: visMilitaryList,
    });
  };

  onSubmit = (values) => {
    const { props, state } = this;
    // props.setLoading(true);
    const visibleFirstlevelAgencyIdList = [
      ...new Set(state.visibleFirstlevelAgencyIdList),
    ].filter((item) => item !== '');
    const visibleSecondaryAgencyIdList = [
      ...new Set(state.visibleSecondaryAgencyIdList),
    ].filter((item) => item !== '');
    const visibleCityIdList = [...new Set(state.visibleCityIdList)].filter(
      (item) => item !== '',
    );
    const visibleFirstlevelUnitIdList = [
      ...new Set(state.visibleFirstlevelUnitIdList),
    ].filter((item) => item !== '');
    const request = new BusinessManagementRequest({
      ...state.formInitialValues,
      ...values,
      // ...this.visibleAgencyList(values),
      // visibleFirstlevelUnitIdList: values.visibleFirstlevelUnitIdList.filter(
      //   (item) => item !== '',
      // ),
      visibleFirstlevelAgencyIdList: visibleFirstlevelAgencyIdList,
      visibleSecondaryAgencyIdList: visibleSecondaryAgencyIdList,
      visibleCityIdList: visibleCityIdList,
      visibleFirstlevelUnitIdList: visibleFirstlevelUnitIdList,
      isOrganizationClear: state.isOrganizationClear,
      isGovernmentClear: state.isGovernmentClear,
      isMilitaryClear: state.isMilitaryClear,
      hasFood: state.hasFood,
      hasPlace: state.hasPlace,
      hasTraffic: state.hasTraffic,
    });
    state.visiblelevelIdList = state.visiblelevelIdList.filter(
      (id) => id.length !== 6 && id !== '',
    );
    state.visibleMilitaryIdList = state.visibleMilitaryIdList.filter(
      (id) => id !== '',
    );
    let militaryuidMap = null;
    if (state.militaryuid != null) {
      militaryuidMap = state.militaryuid.reduce((map, obj) => {
        map[obj.text] = obj.value;
        return map;
      }, {});
    }
    if (
      state.visiblelevelIdList != null ||
      state.visibleMilitaryIdList != null
    ) {
      request.visible_level_id_list = state.visiblelevelIdList.map((id) =>
        militaryuidMap[id] !== undefined ? militaryuidMap[id] : id,
      );
      request.visible_military_id_list = state.visibleMilitaryIdList.map((id) =>
        militaryuidMap[id] !== undefined ? militaryuidMap[id] : id,
      );
    }
    const MAX_SIZE_MB = 25;
    const totalSize = values.file.reduce((sum, file) => sum + file.size, 0);
    const totalSizeMB = totalSize / (1024 * 1024);
    const hasEmptyTopic = request.topic_list.some(
      (item) => item === null || item === undefined || item === '',
    );
    const hasEmptyRequired = request.is_required_list.some(
      (item) => item === undefined,
    );
    const hasEmptyOption = request.option_list.some((item) => item === '');
    const hasEmptyRequest = request.request_list.some((item) => item === '');
    const hasEmptyQuestionType = request.question_type_list.some(
      (item) => item === '',
    );
    if (totalSizeMB > MAX_SIZE_MB) {
      ModalHelper.openUploadLimitModal();
      props.setLoading(false);
    } else if (hasEmptyTopic) {
      ModalHelper.openhasEmptyModal();
      props.setLoading(false);
    } else if (
      request.is_sign &&
      request.is_meeting_time_required &&
      request.meeting_end_date < request.meeting_deadline_date
    ) {
      ModalHelper.openhasErrorMeetingModal();
      props.setLoading(false);
    } else if (
      hasEmptyRequired ||
      hasEmptyOption ||
      hasEmptyRequest ||
      hasEmptyQuestionType ||
      request.request_list.length > request.is_required_list.length ||
      request.request_list.length > request.question_type_list.length
    ) {
      ModalHelper.openhasEmptyRequestModal();
      props.setLoading(false);
    } else {
      const request_list_input = request.request_list;
      const request_list = request_list_input.map((question, index) => ({
        question_type: request.question_type_list[index],
        is_required: request.is_required_list[index],
        question: question,
        option: request.option_list[index] || null,
      }));
      request.request_list = request_list;
      if (request.food === undefined) {
        request.food = false;
      }
      if (request.place === undefined) {
        request.place = false;
      }
      if (request.traffic === undefined) {
        request.traffic = false;
      }
      const transformed_list = request.topic_list.map((item) =>
        typeof item === 'object' && item.researchTopic
          ? item.researchTopic
          : item,
      );
      request.topic_list = transformed_list;
      // console.log(request);
      this.processFiles(values.file)
        .then((processedFiles) => {
          ApiService.businessManagement
            .updateBusinessManagement(state.id, request)
            .then((response) => {
              if (values.file.length > 0) {
                const fileRequest = new FileRecordRequest({
                  id: state.id,
                  uploadFileList: values.file,
                });
                const formData = fileRequest.getFormData();
                ApiService.businessManagement
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
        })
        .catch(() => {
          props.setLoading(false);
        });
    }
  };
  processFiles = (files) => {
    return Promise.all(
      files.map(async (file) => {
        if (file.type.startsWith('text/')) {
          const fileContent = await this.readFile(file);
          const cleanedContent = DOMPurify.sanitize(fileContent, {
            ALLOWED_TAGS: ['p', 'b', 'i', 'u', 'strong'],
            ALLOWED_ATTR: [],
          });
          return new File([cleanedContent], file.name, { type: file.type });
        } else {
          return file;
        }
      }),
    );
  };
  readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };
  organizationTitle = ({ values, setFieldValue, arrayHelpers }) => {
    const { props } = this;
    return (
      <div className="visible-unit-input-title">
        <div>{props.language.addBusinessManagement.organization}</div>
        <MdAddCircle
          size={18}
          className="add-button"
          onClick={() => {
            arrayHelpers.push('');
            setFieldValue('visibleSecondaryAgencyIdList', [
              ...values.visibleSecondaryAgencyIdList,
              '',
            ]);
          }}
        />
      </div>
    );
  };

  organizationInputTitle = ({ values, index, setFieldValue, arrayHelpers }) => {
    const { props } = this;
    if (values.visibleFirstlevelAgencyIdList.length > 1) {
      return (
        <div className="visible-unit-input-title">
          <div>{props.language.addBusinessManagement.organization}</div>
          <MdOutlineRemoveCircle
            size={18}
            className="delete-button"
            onClick={() => {
              const visibleSecondaryAgencyIdList = [
                ...values.visibleSecondaryAgencyIdList,
              ];
              visibleSecondaryAgencyIdList.splice(index, 1);
              arrayHelpers.remove(index);
              setFieldValue(
                'visibleSecondaryAgencyIdList',
                visibleSecondaryAgencyIdList,
              );
            }}
          />
        </div>
      );
    }
    return props.language.addBusinessManagement.organization;
  };

  visibleSecondaryAgencyOption = (id) => {
    const { state } = this;
    return state.secondaryAgencyObject[id] === undefined
      ? []
      : state.secondaryAgencyObject[id];
  };

  displayOrganizationVisibleUnit = ({
    values,
    setFieldValue,
    errors,
    touched,
  }) => {
    const { props, state } = this;
    return values.isVisibleToAll ? (
      ''
    ) : (
      <div className="visible-unit-card">
        <FieldArray
          name="visibleFirstlevelAgencyIdList"
          render={(arrayHelpers) => (
            <div className="contents">
              <FormSectionTitle
                title={this.organizationTitle({
                  values,
                  setFieldValue,
                  arrayHelpers,
                })}
              />
              {values.visibleFirstlevelAgencyIdList.map((content, index) => (
                <div key={index}>
                  <FormRow>
                    <UnitInput2
                      hideThird
                      title={this.organizationInputTitle({
                        values,
                        index,
                        setFieldValue,
                        arrayHelpers,
                      })}
                      firstLevelTitle={
                        props.language.addBusinessManagement.firstlevelAgencyId
                      }
                      firstLevelName={`visibleFirstlevelAgencyIdList.${index}`}
                      firstLevelValue={content}
                      firstLevelPlaceholder={
                        props.language.addBusinessManagement
                          .firstlevelAgencyIdHint
                      }
                      firstLevelOptions={state.firstlevelAgencyList}
                      firstLevelOnChanged={this.handleFirstLevelAgencyOnChanged}
                      secondLevelTitle={
                        props.language.addBusinessManagement.secondaryAgencyId
                      }
                      secondLevelName={`visibleSecondaryAgencyIdList.${index}`}
                      secondLevelValue={
                        values.visibleSecondaryAgencyIdList[index]
                      }
                      secondLevelPlaceholder={
                        props.language.addBusinessManagement
                          .secondaryAgencyIdHint
                      }
                      secondLevelOptions={this.visibleSecondaryAgencyOption(
                        content,
                      )}
                      setFieldValue={setFieldValue}
                      touched={touched}
                      errors={errors}
                      index={index}
                    />
                  </FormRow>
                </div>
              ))}
            </div>
          )}
        />
      </div>
    );
  };

  governmentTitle = ({ values, setFieldValue, arrayHelpers }) => {
    const { props } = this;
    return (
      <div className="visible-unit-input-title">
        <div>{props.language.addBusinessManagement.government}</div>
        <MdAddCircle
          size={18}
          className="add-button"
          onClick={() => {
            arrayHelpers.push('');
            setFieldValue('visibleFirstlevelUnitIdList', [
              ...values.visibleFirstlevelUnitIdList,
              '',
            ]);
          }}
        />
      </div>
    );
  };

  governmentInputTitle = ({ values, index, setFieldValue, arrayHelpers }) => {
    const { props } = this;
    if (values.visibleCityIdList.length > 1) {
      return (
        <div className="visible-unit-input-title">
          <div>{props.language.addBusinessManagement.government}</div>
          <MdOutlineRemoveCircle
            size={18}
            className="delete-button"
            onClick={() => {
              const visibleFirstlevelUnitIdList = [
                ...values.visibleFirstlevelUnitIdList,
              ];
              visibleFirstlevelUnitIdList.splice(index, 1);
              arrayHelpers.remove(index);
              setFieldValue(
                'visibleFirstlevelUnitIdList',
                visibleFirstlevelUnitIdList,
              );
            }}
          />
        </div>
      );
    }
    return props.language.addBusinessManagement.government;
  };

  visibleFirstLevelUnitOption = (id) => {
    const { state } = this;
    return state.firstlevelUnitObject[id] === undefined
      ? []
      : state.firstlevelUnitObject[id];
  };

  displayGovernmentVisibleUnit = ({
    values,
    setFieldValue,
    errors,
    touched,
  }) => {
    const { props, state } = this;
    return values.isVisibleToAll ? (
      ''
    ) : (
      <div className="visible-unit-card">
        <FieldArray
          name="visibleCityIdList"
          render={(arrayHelpers) => (
            <div className="contents">
              <FormSectionTitle
                title={this.governmentTitle({
                  values,
                  setFieldValue,
                  arrayHelpers,
                })}
              />
              {values.visibleCityIdList.map((content, index) => (
                <div key={index}>
                  <FormRow>
                    <UnitInput2
                      hideThird
                      title={this.governmentInputTitle({
                        values,
                        index,
                        setFieldValue,
                        arrayHelpers,
                      })}
                      firstLevelTitle={
                        props.language.addBusinessManagement.cityId
                      }
                      firstLevelName={`visibleCityIdList.${index}`}
                      firstLevelValue={content}
                      firstLevelPlaceholder={
                        props.language.addBusinessManagement.cityIdHint
                      }
                      firstLevelOptions={state.cityList}
                      firstLevelOnChanged={this.handleCityOnChanged}
                      secondLevelTitle={
                        props.language.addBusinessManagement.firstlevelUnitId
                      }
                      secondLevelName={`visibleFirstlevelUnitIdList.${index}`}
                      secondLevelValue={
                        values.visibleFirstlevelUnitIdList[index]
                      }
                      secondLevelPlaceholder={
                        props.language.addBusinessManagement
                          .firstlevelUnitIdHint
                      }
                      secondLevelOptions={this.visibleFirstLevelUnitOption(
                        content,
                      )}
                      setFieldValue={setFieldValue}
                      touched={touched}
                      errors={errors}
                      index={index}
                    />
                  </FormRow>
                </div>
              ))}
            </div>
          )}
        />
      </div>
    );
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

  deleteAttachFile = (id) => {
    ModalHelper.openDeleteModal({
      deleteFunction: () => {
        ApiService.businessManagement
          .deleteAttachmentFile(id)
          .then((response) => {
            this.props.setLoading(false);
            ModalHelper.openMessageModalByStatus({
              response,
              callback: this.initState,
            });
          })
          .catch(() => {
            this.props.setLoading(false);
          });
      },
    });
  };

  displayAttachment = () => {
    const { props, state } = this;
    return state.formInitialValues.businessManagementTestAttachments.map(
      (item) => (
        <div className="file-container">
          <ButtonDiv
            key={item.id}
            className="file-link"
            onClick={() => {
              props.setLoading(false);
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

  handleIsMeetingOnChanged = ({
    values,
    isMeetingTimeRequired,
    field,
    setFieldValue,
  }) => {
    if (
      values.isMeetingTimeRequired !== isMeetingTimeRequired &&
      !isMeetingTimeRequired
    ) {
      setFieldValue('meetingDeadlineDate', '');
    }
    setFieldValue(field, isMeetingTimeRequired);
  };

  handleChange = (e) => {
    const sanitizedValue = DOMPurify.sanitize(e.target.value);
    props.onChange(sanitizedValue);
  };

  topicTitle = ({ values, setFieldValue, arrayHelpers }) => {
    const { props, state } = this;
    if (values.meetingStartDate > new Date()) {
      return (
        <div className="visible-unit-input-title">
          <div>研討議題</div>
          <MdAddCircle
            size={18}
            className="add-button"
            onClick={() => {
              arrayHelpers.push('');
              setFieldValue('topicList', [...values.topicList, '']);
            }}
          />
        </div>
      );
    }
  };

  topicInputTitle = ({ values, index, setFieldValue, arrayHelpers }) => {
    if (values.topicList.length > 1 && values.meetingStartDate > new Date()) {
      return (
        <div className="visible-unit-input-title">
          <div>研討議題</div>
          <MdOutlineRemoveCircle
            size={18}
            className="delete-button"
            onClick={() => {
              const topicList = [...values.topicList];
              topicList.splice(index, 1);
              arrayHelpers.remove(index);
              setFieldValue('topicList', topicList);
            }}
          />
        </div>
      );
    }
    return '研討議題';
  };
  displayTopicUnit = ({
    values,
    setFieldValue,
    handleChange,
    errors,
    touched,
  }) => {
    const { props, state } = this;
    return (
      <div className="visible-unit-card">
        <FieldArray
          name="topicList"
          render={(arrayHelpers) => (
            <div className="contents">
              <FormSectionTitle2
                title={this.topicTitle({
                  values,
                  setFieldValue,
                  arrayHelpers,
                })}
              />
              {values.topicList.map((content, index) => (
                <div key={index}>
                  <TextInput
                    full
                    title={this.topicInputTitle({
                      values,
                      index,
                      setFieldValue,
                      arrayHelpers,
                    })}
                    inputType="text"
                    inputName={`topicList.${index}`}
                    inputPlaceholder="請輸入研討議題"
                    inputValue={content.researchTopic}
                    inputOnChange={handleChange}
                    touched={touched}
                    errors={errors}
                    index={index}
                    required="*"
                    disable={values.meetingStartDate < new Date()}
                  />
                </div>
              ))}
            </div>
          )}
        />
      </div>
    );
  };

  trailingFoodIcon = () => {
    const { props, state } = this;
    return state.hasFood ? (
      <div className="password-toggle">
        <img className="checkbox" src={checkboxChecked} alt="checkbox" />
        <div>{'供餐'}</div>
      </div>
    ) : (
      <div className="password-toggle">
        <img className="checkbox" src={checkboxNone} alt="checkbox" />
        <div>{'供餐'}</div>
      </div>
    );
  };

  toggleFood = () => {
    const { hasFood } = this.state;
    this.setState({ hasFood: !hasFood });
  };

  trailingPlaceIcon = () => {
    const { props, state } = this;
    return state.hasPlace ? (
      <div className="password-toggle">
        <img className="checkbox" src={checkboxChecked} alt="checkbox" />
        <div>{'留宿'}</div>
      </div>
    ) : (
      <div className="password-toggle">
        <img className="checkbox" src={checkboxNone} alt="checkbox" />
        <div>{'留宿'}</div>
      </div>
    );
  };

  togglePlace = () => {
    const { hasPlace } = this.state;
    this.setState({ hasPlace: !hasPlace });
  };

  trailingTrafficIcon = () => {
    const { props, state } = this;
    return state.hasTraffic ? (
      <div className="password-toggle">
        <img className="checkbox" src={checkboxChecked} alt="checkbox" />
        <div>{'交通方式'}</div>
      </div>
    ) : (
      <div className="password-toggle">
        <img className="checkbox" src={checkboxNone} alt="checkbox" />
        <div>{'交通方式'}</div>
      </div>
    );
  };

  toggleTraffic = () => {
    const { hasTraffic } = this.state;
    this.setState({ hasTraffic: !hasTraffic });
  };

  displaySignUnit = ({
    values,
    setFieldValue,
    errors,
    touched,
    handleChange,
  }) => {
    const { props, state } = this;
    const index = state.index;
    // console.log(values);
    return values.isSign ? (
      <div className="visible-unit-card">
        <FormRow>
          {this.displayTopicUnit({
            values,
            setFieldValue,
            handleChange,
            errors,
            touched,
          })}
        </FormRow>
        <FormSectionTitle title="報名資訊" />
        <FormRow>
          <SelectInput
            title="類型區分"
            inputName="meetingType"
            inputPlaceholder="請選擇類型區分"
            inputValue={values.meetingType}
            setFieldValue={setFieldValue}
            options={state.meetingTypeList}
            touched={touched}
            errors={errors}
            required={BusinessManagementForm.isFieldRequired('meetingType')}
          />
          <TextInput
            title="報名名額(人)"
            inputName="meetingPeople"
            inputPlaceholder="請輸入報名人數"
            inputValue={values.meetingPeople}
            inputOnChange={handleChange}
            touched={touched}
            errors={errors}
            required={BusinessManagementForm.isFieldRequired('meetingPeople')}
          />
        </FormRow>
        <FormRow>
          <div className="date-containers">
            <div className="use-date-container">
              <DateTimeInput
                title="會議日期與時間"
                inputName="meetingStartDate"
                inputPlaceholder={
                  props.language.addPermissionApplication.useStartDateHint
                }
                inputValue={values.meetingStartDate}
                setFieldValue={setFieldValue}
                minDate={new Date()}
                maxDate={values.meetingEndDate}
                touched={touched}
                errors={errors}
                required={BusinessManagementForm.isFieldRequired(
                  'meetingStartDate',
                )}
                display={values.meetingEndDate < new Date()}
              />
              <span>~</span>
              <DateTimeInput
                title=""
                inputName="meetingEndDate"
                inputPlaceholder={
                  props.language.addPermissionApplication.useEndDateHint
                }
                inputValue={values.meetingEndDate}
                setFieldValue={setFieldValue}
                minDate={values.meetingStartDate}
                touched={touched}
                errors={errors}
                required={BusinessManagementForm.isFieldRequired(
                  'meetingEndDate',
                )}
                display={values.meetingEndDate < new Date()}
              />
            </div>
          </div>
        </FormRow>
        <FormRow>
          <TextInput
            full
            title="會議地點"
            inputType="text"
            inputName="meetingPlace"
            inputPlaceholder="請輸入會議地點（例如：OO部第O會議室）"
            inputValue={values.meetingPlace}
            inputOnChange={handleChange}
            setFieldValue={setFieldValue}
            touched={touched}
            errors={errors}
            required={BusinessManagementForm.isFieldRequired('meetingPlace')}
          />
        </FormRow>
        <FormRow>
          <MultipleSelectInput
            horizontal
            singleSelection
            title="報名截止時間"
            inputName="isMeetingTimeRequired"
            inputPlaceholder="報名截止時間"
            inputValue={values.isMeetingTimeRequired}
            setFieldValue={(field, value) => {
              this.handleIsMeetingOnChanged({
                values,
                isMeetingTimeRequired: value,
                field,
                setFieldValue,
              });
            }}
            options={MeetingType}
            trailingIcon={
              <DateInput
                full
                title=""
                inputName="meetingDeadlineDate"
                inputPlaceholder=""
                inputValue={values.meetingDeadlineDate}
                setFieldValue={setFieldValue}
                touched={touched}
                errors={errors}
                maxDate={
                  new Date(
                    new Date(values.meetingStartDate).setDate(
                      new Date(values.meetingStartDate).getDate() - 1,
                    ),
                  )
                }
                disable={!values.isMeetingTimeRequired || values.meetingEndDate < new Date()}
                required="*"
              />
            }
          />
          <CheckBoxTitle
            title="報名蒐集資訊"
            trailingIcon={this.trailingFoodIcon()}
            iconOnClick={this.toggleFood}
            trailingIcon2={this.trailingPlaceIcon()}
            iconOnClick2={this.togglePlace}
            trailingIcon3={this.trailingTrafficIcon()}
            iconOnClick3={this.toggleTraffic}
          />
        </FormRow>
        <FieldArray
          name="questionList"
          render={(arrayHelpers) => (
            <div className="visible-unit-card">
              <FormSectionTitle2
                title={this.requestTitle({
                  values,
                  setFieldValue,
                  arrayHelpers,
                })}
              />
              {values.questionList.map((content, index) => (
                <div key={index}>
                  <FormRow>
                    <SelectInput
                      title={this.requestInputTitle({
                        values,
                        index,
                        setFieldValue,
                        arrayHelpers,
                      })}
                      inputName={`questionTypeList.${index}`}
                      inputPlaceholder="請選擇題目類型"
                      inputValue={values.questionTypeList[index]}
                      setFieldValue={setFieldValue}
                      options={QuestionType}
                      required="*"
                      display={values.meetingStartDate < new Date()}
                    />
                    <MultipleSelectInput
                      horizontal
                      singleSelection
                      title="是否必填"
                      inputName={`isRequiredList.${index}`}
                      inputValue={values.isRequiredList[index]}
                      setFieldValue={setFieldValue}
                      options={SignType}
                      required="*"
                      display={values.meetingStartDate < new Date()}
                    />
                  </FormRow>
                  <FormRow>
                    <TextInput
                      full
                      title="題目內容"
                      inputType="text"
                      inputName={`questionList.${index}`}
                      inputPlaceholder="請輸入題目內容"
                      inputValue={content}
                      inputOnChange={handleChange}
                      setFieldValue={setFieldValue}
                      index={index}
                      required="*"
                      disable={values.meetingStartDate < new Date()}
                    />
                  </FormRow>
                  <FormRow>
                    {values.questionTypeList[index] === 2 ||
                    values.questionTypeList[index] === 3 ? (
                      <TextInput
                        full
                        title="選項"
                        inputType="textarea"
                        inputName={`optionList.${index}`}
                        inputPlaceholder="請輸入選項"
                        description="選項請用逗號,分隔表示"
                        inputValue={values.optionList[index]}
                        inputOnChange={handleChange}
                        setFieldValue={setFieldValue}
                        required="*"
                        disable={values.meetingStartDate < new Date()}
                      />
                    ) : (
                      ''
                    )}
                  </FormRow>
                </div>
              ))}
            </div>
          )}
        />
      </div>
    ) : (
      ''
    );
  };

  trailRequestIcon = (values) => {
    return values.isRequestClear ? (
      <div className="password-toggle">
        <img className="checkbox" src={checkboxChecked} alt="checkbox" />
        <div></div>
      </div>
    ) : (
      <div className="password-toggle">
        <img className="checkbox" src={checkboxNone} alt="checkbox" />
        <div></div>
      </div>
    );
  };

  toggleRequest = (values, setFieldValue) => {
    setFieldValue('isRequestClear', !values.isRequestClear);
  };

  requestTitle = ({ values, setFieldValue, arrayHelpers }) => {
    const { props, state } = this;
    if (values.meetingStartDate > new Date()) {
      return (
        <div className="visible-unit-input-title">
          <div>回饋表單</div>
          {values.isRequestClear == true ? (
            <MdAddCircle
              size={18}
              className="add-button"
              onClick={() => {
                arrayHelpers.push('');
                setFieldValue('questionList', [...values.questionList, '']);
              }}
            />
          ) : (
            <MdAddCircle size={18} className="hidden-button" />
          )}
        </div>
      );
    }
  };

  requestInputTitle = ({ values, index, setFieldValue, arrayHelpers }) => {
    if (values.isRequestClear === true) {
      values.questionList.length = values.questionList.length;
    } else {
      values.questionList.length = 0;
    }
    if (
      values.questionList.length > 0 &&
      values.meetingStartDate > new Date()
    ) {
      return (
        <div className="visible-unit-input-title">
          <div>題目類型</div>
          <MdOutlineRemoveCircle
            size={18}
            className="delete-button"
            onClick={() => {
              const questionList = [...values.questionList];
              questionList.splice(index, 1);
              arrayHelpers.remove(index);
              setFieldValue('questionList', questionList);
            }}
          />
        </div>
      );
    }
    return '題目類型';
  };

  displayRequestUnit = ({
    values,
    setFieldValue,
    errors,
    touched,
    handleChange,
  }) => {
    const { props, state } = this;
    const index = state.index;
    return (
      <FieldArray
        name="questionList"
        render={(arrayHelpers) => (
          <div className="visible-unit-card">
            <FormSectionTitle2
              title={this.requestTitle({
                values,
                setFieldValue,
                arrayHelpers,
                index,
                handleChange,
              })}
              trailingIcon={() => this.trailRequestIcon(values)}
              iconOnClick={() => this.toggleRequest(values, setFieldValue)}
            />
            {state.formInitialValues.questionList.map((content, index) => (
              <div key={index}>
                <FormRow>
                  <SelectInput
                    title={this.requestInputTitle({
                      values,
                      index,
                      setFieldValue,
                      arrayHelpers,
                    })}
                    inputName={`questionTypeList.${index}`}
                    inputPlaceholder="請選擇題目類型"
                    inputValue={state.formInitialValues.questionTypeList[index]}
                    setFieldValue={setFieldValue}
                    options={QuestionType}
                    disable
                  />
                  <MultipleSelectInput
                    horizontal
                    singleSelection
                    title="是否必填"
                    inputName={`isRequiredList.${index}`}
                    inputValue={state.formInitialValues.isRequiredList[index]}
                    setFieldValue={setFieldValue}
                    options={SignType}
                    display
                  />
                </FormRow>
                <FormRow>
                  <TextInput
                    full
                    title="題目內容"
                    inputType="text"
                    inputName={`questionList.${index}`}
                    inputPlaceholder="請輸入題目內容"
                    inputValue={content}
                    inputOnChange={handleChange}
                    setFieldValue={setFieldValue}
                    index={index}
                    disable
                  />
                </FormRow>
                <FormRow>
                  {values.questionTypeList[index] === 2 ||
                  values.questionTypeList[index] === 3 ? (
                    <TextInput
                      full
                      title="選項"
                      inputType="textarea"
                      inputName={`optionList.${index}`}
                      inputPlaceholder="請輸入選項"
                      description="選項請用逗號,分隔表示"
                      inputValue={state.formInitialValues.optionList[index]}
                      inputOnChange={handleChange}
                      setFieldValue={setFieldValue}
                      disable
                    />
                  ) : (
                    ''
                  )}
                </FormRow>
              </div>
            ))}
          </div>
        )}
      />
    );
  };

  render() {
    const { props, state } = this;

    if (state.formInitialValues === null) return '';

    return (
      <div className="edit-business-management">
        <SectionTitle title={props.title} />

        <Formik
          initialValues={BusinessManagementForm.initialValue({
            jobPosition: getJobPosition(),
            ...state.formInitialValues,
          })}
          validationSchema={BusinessManagementForm.validationSchema()}
          onSubmit={this.onSubmit}
        >
          {({
            handleSubmit,
            handleChange,
            setFieldValue,
            isSubmitting,
            submitForm,
            touched,
            values,
            errors,
          }) => (
            <form onSubmit={handleSubmit} className="form" autoComplete="off">
              <FormikErrorModal isSubmitting={isSubmitting} errors={errors} />
              <div className="inputs">
                <div className="announcement-unit">
                  <FormSectionTitle
                    title={
                      props.language.editBusinessManagement.announcementUnitInfo
                    }
                  />
                  <FormRow>
                    <TextInput
                      title={
                        props.language.editBusinessManagement.announcementUnit
                      }
                      inputName="announcementUnit"
                      inputValue={values.announcementUnit}
                      inputOnChange={this.handleChange}
                      display
                      required={BusinessManagementForm.isFieldRequired(
                        'announcementUnit',
                      )}
                    />
                    <SelectInput
                      title={props.language.addBusinessManagement.announcedUser}
                      inputName="announcedUserAccountId"
                      inputPlaceholder={
                        props.language.editBusinessManagement.nameHint
                      }
                      inputValue={values.announcedUserAccountId}
                      setFieldValue={(field, value) => {
                        this.handleAnnouncedUserOnChanged({
                          field,
                          user: value,
                          setFieldValue,
                        });
                      }}
                      options={state.userList}
                      trailingInput={
                        <div className="job-position">
                          <div>
                            {props.language.addBusinessManagement.jobPosition}
                          </div>
                          <TextInput
                            zenMode
                            title=""
                            inputName="jobPosition"
                            inputPlaceholder={
                              props.language.addBusinessManagement
                                .jobPositionHint
                            }
                            inputValue={
                              values.jobPosition
                                ? values.jobPosition
                                : getJobPosition()
                            }
                            inputOnChange={this.handleChange}
                            touched={touched}
                            errors={errors}
                            // required={BusinessManagementForm.isFieldRequired(
                            //   'jobPosition',
                            // )}
                            disable
                          />
                        </div>
                      }
                      touched={touched}
                      errors={errors}
                      required={BusinessManagementForm.isFieldRequired(
                        'announcedUserAccountId',
                      )}
                    />
                  </FormRow>
                  <FormRow>
                    <DateInput
                      title={
                        props.language.editBusinessManagement.announcementDate
                      }
                      inputName="announcementDate"
                      inputPlaceholder={
                        props.language.editBusinessManagement
                          .announcementDateHint
                      }
                      inputValue={values.announcementDate}
                      setFieldValue={setFieldValue}
                      touched={touched}
                      errors={errors}
                      required={BusinessManagementForm.isFieldRequired(
                        'announcementDate',
                      )}
                    />
                    <PhoneInput
                      inputType="text"
                      title={props.language.editBusinessManagement.phone}
                      inputName="businessPhone"
                      inputPlaceholder={
                        props.language.editBusinessManagement.businessPhoneHint
                      }
                      inputValue={values.businessPhone}
                      extensionTitle={
                        props.language.editBusinessManagement.telephoneExtension
                      }
                      extensionInputName="telephoneExtension"
                      extensionInputPlaceholder={
                        props.language.editBusinessManagement
                          .telephoneExtensionHint
                      }
                      extensionInputValue={values.telephoneExtension}
                      setFieldValue={setFieldValue}
                      touched={touched}
                      errors={errors}
                      required={BusinessManagementForm.isFieldRequired(
                        'businessPhone',
                      )}
                    />
                  </FormRow>
                  <FormRow>
                    <TextInput
                      title={props.language.editBusinessManagement.createdDate}
                      inputName="createdDate"
                      inputValue={state.formInitialValues.createdDateString}
                      inputOnChange={handleChange}
                      display
                      required={BusinessManagementForm.isFieldRequired(
                        'createdDate',
                      )}
                    />
                    <TextInput
                      title={props.language.editBusinessManagement.createdUser}
                      inputName="createdUser"
                      inputValue={state.formInitialValues.createdUserAccount}
                      inputOnChange={handleChange}
                      display
                      required={BusinessManagementForm.isFieldRequired(
                        'createdUser',
                      )}
                    />
                  </FormRow>
                  <FormRow>
                    <MultipleSelectInput
                      horizontal
                      singleSelection
                      title={props.language.editBusinessManagement.visibleUnit}
                      inputName="isVisibleToAll"
                      inputValue={values.isVisibleToAll}
                      setFieldValue={(field, value) => {
                        this.handleIsAllVisibleOnChanged({
                          values,
                          isVisibleToAll: value,
                          field,
                          setFieldValue,
                        });
                      }}
                      options={VisibleUnitType}
                      touched={touched}
                      errors={errors}
                      required={BusinessManagementForm.isFieldRequired(
                        'isVisibleToAll',
                      )}
                      trailingIcon={
                        <ButtonDiv
                          className="visable-level-button"
                          onClick={() => this.visiableLevel()}
                        >
                          顯示已選單位
                        </ButtonDiv>
                      }
                      display
                    />
                    <MultipleSelectInput
                      horizontal
                      singleSelection
                      title="報名功能"
                      inputName="isSign"
                      inputValue={values.isSign}
                      setFieldValue={(field, value) => {
                        this.handleSignOnChanged({
                          values,
                          isSign: value,
                          field,
                          setFieldValue,
                        });
                      }}
                      options={SignType}
                      touched={touched}
                      errors={errors}
                      display
                    />
                  </FormRow>
                </div>

                {/* {this.displayOrganizationVisibleUnit({
                  values,
                  setFieldValue,
                  errors,
                  touched,
                })}

                {this.displayGovernmentVisibleUnit({
                  values,
                  setFieldValue,
                  errors,
                  touched,
                })} */}

                <div className="announcement-info">
                  <FormSectionTitle
                    title={
                      props.language.editBusinessManagement.announcementInfo
                    }
                  />
                  <FormRow>
                    <TextInput
                      full
                      title="會議事由"
                      inputType="text"
                      inputName="title"
                      inputPlaceholder={
                        props.language.addBusinessManagement.titleHint
                      }
                      inputValue={values.title}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={BusinessManagementForm.isFieldRequired('title')}
                    />
                  </FormRow>
                  <FormRow>
                    <MultipleFileInput
                      title={props.language.editBusinessManagement.file}
                      inputName="file"
                      inputPlaceholder={
                        props.language.editBusinessManagement.fileHint
                      }
                      inputValue={values.file}
                      setFieldValue={setFieldValue}
                      description={
                        props.language.editBusinessManagement.fileDescription
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
                      touched={touched}
                      errors={errors}
                      required={BusinessManagementForm.isFieldRequired('file')}
                      disable
                    />
                    <MultipleSelectInput
                      horizontal
                      singleSelection
                      title={
                        props.language.editBusinessManagement
                          .isRespondedAttatchmentRequiredAndFileDate
                      }
                      inputName="isRespondedAttatchmentRequired"
                      inputValue={values.isRespondedAttatchmentRequired}
                      setFieldValue={(field, value) => {
                        this.handleIsFileOnChanged({
                          values,
                          isRespondedAttatchmentRequired: value,
                          field,
                          setFieldValue,
                        });
                      }}
                      options={BooleanType}
                      trailingIcon={
                        <DateInput
                          full
                          title=""
                          inputName="attachmentDeadlineDate"
                          inputPlaceholder={
                            props.language.editBusinessManagement
                              .attachmentDeadlineDateHint
                          }
                          inputValue={values.attachmentDeadlineDate}
                          setFieldValue={setFieldValue}
                          touched={touched}
                          errors={errors}
                          disable={!values.isRespondedAttatchmentRequired}
                          required={BusinessManagementForm.isFieldRequired(
                            'attachmentDeadlineDate',
                          )}
                        />
                      }
                      touched={touched}
                      errors={errors}
                      required={BusinessManagementForm.isFieldRequired(
                        'isRespondedAttatchmentRequired',
                      )}
                      disable
                    />
                  </FormRow>
                  <FormRow>
                    <FormDescription
                      title={props.language.editBusinessManagement.uploadedFile}
                      content={this.displayAttachment()}
                    />
                    <div />
                  </FormRow>
                  <FormRow>
                    <TextInput
                      full
                      title="備註"
                      inputType="textarea"
                      inputName="content"
                      inputPlaceholder="請輸入備註"
                      inputValue={values.content}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                    />
                  </FormRow>
                </div>

                {/* <FormRow>
                  {this.displayTopicUnit({
                    values,
                    setFieldValue,
                    handleChange,
                    errors,
                    touched,
                  })}
                </FormRow> */}

                {this.displaySignUnit({
                  values,
                  setFieldValue,
                  errors,
                  touched,
                  handleChange,
                })}

                {/* {this.displayRequestUnit({
                  values,
                  setFieldValue,
                  errors,
                  touched,
                  handleChange,
                })} */}

                <div className="action-button-container">
                  <ButtonDiv
                    className="normal-button"
                    onClick={props.history.goBack}
                  >
                    {props.language.editBusinessManagement.back}
                  </ButtonDiv>
                  <ButtonDiv className="save-button" onClick={submitForm}>
                    {props.language.editBusinessManagement.save}
                  </ButtonDiv>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
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

EditBusinessManagement.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  title: PropTypes.string.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditBusinessManagement),
);
