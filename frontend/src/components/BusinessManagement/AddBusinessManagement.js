import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FieldArray, Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import { MdAddCircle, MdOutlineRemoveCircle } from 'react-icons/md';

import ButtonDiv from '../../lib/components/ButtonDiv/ButtonDiv';
import DateInput from '../../lib/components/inputs/DateInput/DateInput';
import FormRow from '../../lib/components/FormRow/FormRow';
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
import SectionTitle from '../../lib/components/SectionTitle/SectionTitle';
import VisibleUnitType from '../../utils/constants/VisibleUnitType';
import SignType from '../../utils/constants/SignType';
import DOMPurify from 'dompurify';
import {
  getUserId,
  getName,
  getUnitName,
  getJobPosition,
  getBusinessPhone,
  getTelephoneExtension,
} from '../../utils/auth/auth';
import './AddBusinessManagement.scss';
import checkboxNone from '../../assets/images/icons/checkbox_none2.png';
import checkboxChecked from '../../assets/images/icons/checkbox_check2.png';
import DateTimeInput from '../../lib/components/inputs/DateTimeInput/DateTimeInput';
import CheckBoxTitle from '../../lib/components/inputs/ThreeCheckBoxAddTitle/CheckBox';
import QuestionType from '../../utils/constants/QuestionType';

class AddBusinessManagement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      firstlevelAgencyList: [],
      secondaryAgencyObject: {},
      secondaryAgencyNameObject: {},
      cityList: [],
      firstlevelUnitObject: {},
      firstlevelUnitNameObject: {},
      levelList: [],
      military: [],
      militaryuid: [],
      militaryAgencyObject: {},
      militaryAgencyNameObject: {},
      meetingTypeList: [],
      questionList: [],
      initUserValue: null,
      isOrganizationClear: false,
      isGovernmentClear: false,
      isMilitaryClear: false,
      isRequestClear: false,
      hasFood: false,
      hasPlace: false,
      hasTraffic: false,
      index: 0,
    };
  }

  componentDidMount() {
    this.initState();
  }

  setUserList = (userList) => {
    this.setState({ userList });
  };

  setFirstlevelAgencyList = (firstlevelAgencyList) => {
    this.setState({ firstlevelAgencyList });
  };

  setSecondaryAgencyObject = async (secondaryAgencyObject) => {
    await this.setState({ secondaryAgencyObject });
  };

  setSecondaryAgencyNameObject = async (secondaryAgencyNameObject) => {
    await this.setState({ secondaryAgencyNameObject });
  };

  setCityList = (cityList) => {
    this.setState({ cityList });
  };

  setFirstlevelUnitObject = async (firstlevelUnitObject) => {
    await this.setState({ firstlevelUnitObject });
  };

  setFirstlevelUnitNameObject = async (firstlevelUnitNameObject) => {
    await this.setState({ firstlevelUnitNameObject });
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

  setMeetingType = (meetingTypeList) => {
    this.setState({ meetingTypeList });
  };

  setMilitaryAgencyObject = async (militaryAgencyObject) => {
    await this.setState({ militaryAgencyObject });
  };

  setMilitaryAgencyNameObject = async (militaryAgencyNameObject) => {
    await this.setState({ militaryAgencyNameObject });
  };

  setInitUserValue = (initUserValue) => {
    this.setState({ initUserValue });
  };

  initState = () => {
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
    ApiService.sysUserAccount
      .readSysUserAccountById(getUserId())
      .then((response) => {
        let loadUserFunction = null;
        if (response.agencyType === '1') {
          if (response.secondaryAgencyId !== null) {
            loadUserFunction =
              ApiService.simpleSysUserAccount.readSysUserAccountBySecondaryAgency(
                response.secondaryAgencyId,
              );
          } else if (response.firstlevelAgencyId !== null) {
            loadUserFunction =
              ApiService.simpleSysUserAccount.readSysUserAccountByFirstLevelAgency(
                response.firstlevelAgencyId,
              );
          } else if (response.militaryagencyId !== null) {
            loadUserFunction =
              ApiService.simpleSysUserAccount.readSysUserAccountByMilitaryagency(
                response.militaryagencyId,
              );
          }
        } else if (response.firstlevelUnitId !== null) {
          loadUserFunction =
            ApiService.simpleSysUserAccount.readSysUserAccountByFirstLevelUnit(
              response.firstlevelUnitId,
            );
        } else if (response.cityId !== null) {
          loadUserFunction =
            ApiService.simpleSysUserAccount.readSysUserAccountByCity(
              response.cityId,
            );
        } else if (response.militaryagencyId !== null) {
          loadUserFunction =
            ApiService.simpleSysUserAccount.readSysUserAccountByMilitaryagency(
              response.militaryagencyId,
            );
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
        this.setInitUserValue(response);
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
      setFieldValue('visibleLevelIdList', []);
      setFieldValue('visibleMilitaryIdList', []);
    }
    setFieldValue(field, isVisibleToAll);
  };

  handleSignOnChanged = ({ values, isSign, field, setFieldValue }) => {
    if (values.isSign !== isSign && !isSign) {
    }
    setFieldValue(field, isSign);
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
          const secondaryAgencyNameList = response.map((item) => ({
            text: item.id,
            value: item.shortName,
          }));
          await this.setSecondaryAgencyObject({
            ...state.secondaryAgencyObject,
            [value]: secondaryAgencyList,
          });
          await this.setSecondaryAgencyNameObject({
            ...state.secondaryAgencyNameObject,
            [value]: secondaryAgencyNameList,
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
          const firstlevelUnitNameList = response.map((item) => ({
            text: item.id,
            value: item.fullName,
          }));
          await this.setFirstlevelUnitObject({
            ...state.firstlevelUnitObject,
            [value]: firstlevelUnitList,
          });
          await this.setFirstlevelUnitNameObject({
            ...state.firstlevelUnitNameObject,
            [value]: firstlevelUnitNameList,
          });
        });
    }
    setFieldValue(field, value);
    setFieldValue(`visibleFirstlevelUnitIdList.${index}`, '');
  };
  handleMilitarylevelOnChanged = async ({
    value,
    field,
    setFieldValue,
    index,
  }) => {
    const { state } = this;
    if (state.militaryAgencyObject[value] === undefined && value !== '') {
      await ApiService.codefile
        .getMilitaryAgencyList()
        .then(async (response) => {
          const filteredMilitaryAgencyList = response.codefileList.filter(
            (item) => String(item.parentcodeid) === String(value),
          );
          const militaryAgencyList = filteredMilitaryAgencyList.map((item) => ({
            text: item.name,
            value: item.id,
          }));
          const militaryAgencyNameList = filteredMilitaryAgencyList.map(
            (item) => ({
              text: item.id,
              value: item.name,
            }),
          );
          await this.setMilitaryAgencyObject({
            ...state.militaryAgencyObject,
            [value]: militaryAgencyList,
          });
          await this.setMilitaryAgencyNameObject({
            ...state.militaryAgencyNameObject,
            [value]: militaryAgencyNameList,
          });
        });
    }
    setFieldValue(field, value);
    setFieldValue(`visibleMilitaryIdList.${index}`, '');
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

  visibleLevelList = (values) => {
    const visibleCityIdList = [];
    const visibleFirstlevelUnitIdList = [];
    values.visibleFirstlevelUnitIdList.forEach((item, index) => {
      if (item === '') {
        if (
          !visibleCityIdList.includes(values.visibleCityIdList[index]) &&
          values.visibleCityIdList[index] !== ''
        ) {
          visibleCityIdList.push(values.visibleCityIdList[index]);
        }
      } else if (!visibleFirstlevelUnitIdList.includes(item)) {
        visibleFirstlevelUnitIdList.push(item);
      }
    });
    return {
      visibleCityIdList,
      visibleFirstlevelUnitIdList,
    };
  };

  visibleMilitaryList = (values) => {
    const visibleLevelIdList = [];
    const visibleMilitaryIdList = [];
    if (
      Array.isArray(values.visibleMilitaryIdList) &&
      Array.isArray(values.visibleLevelIdList)
    ) {
      values.visibleMilitaryIdList.forEach((item, index) => {
        if (item === '') {
          if (
            !visibleLevelIdList.includes(values.visibleLevelIdList[index]) &&
            values.visibleLevelIdList[index] !== ''
          ) {
            visibleLevelIdList.push(values.visibleLevelIdList[index]);
          }
        } else if (!visibleMilitaryIdList.includes(item)) {
          visibleMilitaryIdList.push(item);
        }
      });
    }
    return {
      visibleLevelIdList,
      visibleMilitaryIdList,
    };
  };

  visiableLevel = (
    isVisibleToAll,
    visibleFirstlevelAgencyIdList,
    visibleSecondaryAgencyIdList,
    visibleCityIdList,
    visibleFirstlevelUnitIdList,
    visibleLevelIdList,
    visibleMilitaryIdList,
  ) => {
    const { state } = this;
    const firstlevelAgencyListMap = state.firstlevelAgencyList.map(
      (item) => item.text,
    );
    const firstlevelAgencyList = firstlevelAgencyListMap.join('，');
    let visOrganizationList = '';
    if (state.isOrganizationClear === false) {
      const flatSecondaryAgencyObject = Object.values(
        state.secondaryAgencyNameObject,
      ).flat();
      const visOrganization = visibleFirstlevelAgencyIdList
        .map((firstId, index) => {
          const firstObj = state.firstlevelAgencyList.find(
            (c) => c.value === firstId,
          );
          if (!firstObj || firstObj.text === '') {
            return '';
          }
          const first = firstObj.text;
          let second = '';
          if (visibleSecondaryAgencyIdList[index] != '') {
            const secondObj = flatSecondaryAgencyObject.find(
              (u) => u.text === visibleSecondaryAgencyIdList[index],
            );
            if (secondObj) {
              second = secondObj.value;
            }
          }
          return first + second;
        })
        .filter(Boolean);
      const setVisOrganization = [...new Set(visOrganization)];
      let result = setVisOrganization.filter((item, index, arr) => {
        if (item.length === 3) {
          return true;
        }
        return !arr.some(
          (threeCharItem) =>
            threeCharItem.length === 3 && item.startsWith(threeCharItem),
        );
      });
      visOrganizationList = result.join('，');
    }

    const cityListMap = state.cityList.map((item) => item.text);
    const cityList = cityListMap.join('，');
    let visGovermentList = '';
    if (state.isGovernmentClear === false) {
      const flatFirstlevelUnitNameObject = Object.values(
        state.firstlevelUnitNameObject,
      ).flat();
      const visGoverment = visibleCityIdList
        .map((cityId, index) => {
          const cityObj = state.cityList.find((c) => c.value === cityId);
          if (!cityObj || cityObj.text === '') {
            return '';
          }
          const city = cityObj.text;
          let unit = '';
          if (visibleFirstlevelUnitIdList[index] != '') {
            const unitObj = flatFirstlevelUnitNameObject.find(
              (u) => u.text === visibleFirstlevelUnitIdList[index],
            );
            if (unitObj) {
              unit = unitObj.value;
            }
          }
          return city + unit;
        })
        .filter(Boolean);
      const setVisGoverment = [...new Set(visGoverment)];
      let result = setVisGoverment.filter((item, index, arr) => {
        if (item.length === 3) {
          return true;
        }
        return !arr.some(
          (threeCharItem) =>
            threeCharItem.length === 3 && item.startsWith(threeCharItem),
        );
      });
      visGovermentList = result.join('，');
    }

    const filterMilitary = state.military.filter(
      (item) =>
        item.value !== '001' && item.value !== '002' && item.value !== '003',
    );
    const militaryMap = filterMilitary
      .flat()
      .filter(
        (item) =>
          item.value.startsWith('001') ||
          item.value.startsWith('002') ||
          item.value.startsWith('003'),
      )
      .map((item) => item.text);
    const militaryList = militaryMap.join('，');
    let visMilitaryList = '';
    if (state.isMilitaryClear === false) {
      const visiMilitaryList = visibleLevelIdList.map((levelId, index) => {
        return visibleMilitaryIdList[index] || levelId;
      });
      const setVisiMilitaryList = [...new Set(visiMilitaryList)];
      let result = setVisiMilitaryList.filter((item, index, arr) => {
        if (item.length === 3) {
          return true;
        }
        return !arr.some(
          (threeCharItem) =>
            threeCharItem.length === 3 && item.startsWith(threeCharItem),
        );
      });
      result.sort();
      const filteredMilitaryLists = result.map((id) => {
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
      isVisibleToAll: isVisibleToAll,
      isOrganizationClear: state.isOrganizationClear,
      isGovernmentClear: state.isGovernmentClear,
      isMilitaryClear: state.isMilitaryClear,
      firstlevelAgencyList: firstlevelAgencyList,
      visOrganizationList: visOrganizationList,
      cityList: cityList,
      visGovermentList: visGovermentList,
      militaryList: militaryList,
      visMilitaryList: visMilitaryList,
    });
  };
  onSubmit = (values) => {
    const { props, state } = this;
    props.setLoading(true);
    const request = new BusinessManagementRequest({
      ...values,
      ...this.visibleAgencyList(values),
      ...this.visibleLevelList(values),
      ...this.visibleMilitaryList(values),
      businessManagementTestType: props.typeId,
      isOrganizationClear: state.isOrganizationClear,
      isGovernmentClear: state.isGovernmentClear,
      isMilitaryClear: state.isMilitaryClear,
      hasFood: state.hasFood,
      hasPlace: state.hasPlace,
      hasTraffic: state.hasTraffic,
      jobPosition: getJobPosition(),
    });
    let militaryuidMap = null;
    if (state.militaryuid != null) {
      militaryuidMap = state.militaryuid.reduce((map, obj) => {
        map[obj.text] = obj.value;
        return map;
      }, {});
    }
    if (values.visibleMilitaryIdList != null) {
      request.visible_level_id_list = request.visible_level_id_list.map((id) =>
        militaryuidMap[id] !== undefined ? militaryuidMap[id] : id,
      );
      request.visible_military_id_list = request.visible_military_id_list.map(
        (id) => (militaryuidMap[id] !== undefined ? militaryuidMap[id] : id),
      );
    }
    request.visible_firstlevel_agency_id_list =
      request.visible_firstlevel_agency_id_list.filter(
        (id) => id !== '' && id !== undefined,
      );
    request.visible_secondary_agency_id_list =
      request.visible_secondary_agency_id_list.filter(
        (id) => id !== '' && id !== undefined,
      );
    request.visible_city_id_list = request.visible_city_id_list.filter(
      (id) => id !== '' && id !== undefined,
    );
    request.visible_firstlevel_unit_id_list =
      request.visible_firstlevel_unit_id_list.filter(
        (id) => id !== '' && id !== undefined,
      );
    request.visible_level_id_list = request.visible_level_id_list.filter(
      (id) => id !== '' && id !== undefined,
    );
    request.visible_military_id_list = request.visible_military_id_list.filter(
      (id) => id !== '' && id !== undefined,
    );
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
    } else if (
      (request.is_sign && hasEmptyTopic) ||
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
      this.processFiles(values.file)
        .then((processedFiles) => {
          ApiService.businessManagement
            .createBusinessManagement(request)
            .then((response) => {
              if (processedFiles.length > 0) {
                props.setLoading(false);
                const { id } = response.data;
                const fileRequest = new FileRecordRequest({
                  id,
                  uploadFileList: processedFiles,
                });
                const formData = fileRequest.getFormData();
                ApiService.businessManagement
                  .uploadAttachmentFileRecord(formData)
                  .then(() => {
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
  trailOrganizationIcon = () => {
    const { props, state } = this;
    return state.isOrganizationClear ? (
      <div className="password-toggle">
        <img className="checkbox" src={checkboxChecked} alt="checkbox" />
        <div>{'全選'}</div>
      </div>
    ) : (
      <div className="password-toggle">
        <img className="checkbox" src={checkboxNone} alt="checkbox" />
        <div>{'全選'}</div>
      </div>
    );
  };

  toggleOrganization = () => {
    const { isOrganizationClear } = this.state;
    this.setState({ isOrganizationClear: !isOrganizationClear });
  };

  organizationTitle = ({ values, setFieldValue, arrayHelpers }) => {
    const { props, state } = this;
    return (
      <div className="visible-unit-input-title">
        <div>{props.language.addBusinessManagement.organization}</div>
        {state.isOrganizationClear != true ? (
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
        ) : (
          <MdAddCircle size={18} className="hidden-button" />
        )}
      </div>
    );
  };

  organizationInputTitle = ({ values, index, setFieldValue, arrayHelpers }) => {
    const { props, state } = this;
    if (state.isOrganizationClear === true) {
      values.visibleFirstlevelAgencyIdList.length = 0;
    } else {
      values.visibleFirstlevelAgencyIdList.length =
        values.visibleFirstlevelAgencyIdList.length;
    }
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
              <FormSectionTitle2
                title={this.organizationTitle({
                  values,
                  setFieldValue,
                  arrayHelpers,
                })}
                trailingIcon={this.trailOrganizationIcon()}
                iconOnClick={this.toggleOrganization}
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

  trailGovernmentIcon = () => {
    const { props, state } = this;
    return state.isGovernmentClear ? (
      <div className="password-toggle">
        <img className="checkbox" src={checkboxChecked} alt="checkbox" />
        <div>{'全選'}</div>
      </div>
    ) : (
      <div className="password-toggle">
        <img className="checkbox" src={checkboxNone} alt="checkbox" />
        <div>{'全選'}</div>
      </div>
    );
  };

  toggleGovernment = () => {
    const { isGovernmentClear } = this.state;
    this.setState({ isGovernmentClear: !isGovernmentClear });
  };

  governmentTitle = ({ values, setFieldValue, arrayHelpers }) => {
    const { props, state } = this;
    return (
      <div className="visible-unit-input-title">
        <div>{props.language.addBusinessManagement.government}</div>
        {state.isGovernmentClear != true ? (
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
        ) : (
          <MdAddCircle size={18} className="hidden-button" />
        )}
      </div>
    );
  };

  governmentInputTitle = ({ values, index, setFieldValue, arrayHelpers }) => {
    const { props, state } = this;
    if (state.isGovernmentClear === true) {
      values.visibleCityIdList.length = 0;
    } else {
      values.visibleCityIdList.length = values.visibleCityIdList.length;
    }
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
              <FormSectionTitle2
                title={this.governmentTitle({
                  values,
                  setFieldValue,
                  arrayHelpers,
                })}
                trailingIcon={this.trailGovernmentIcon()}
                iconOnClick={this.toggleGovernment}
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

  trailMilitaryIcon = () => {
    const { props, state } = this;
    return state.isMilitaryClear ? (
      <div className="password-toggle">
        <img className="checkbox" src={checkboxChecked} alt="checkbox" />
        <div>{'全選'}</div>
      </div>
    ) : (
      <div className="password-toggle">
        <img className="checkbox" src={checkboxNone} alt="checkbox" />
        <div>{'全選'}</div>
      </div>
    );
  };

  toggleMilitary = () => {
    const { isMilitaryClear } = this.state;
    this.setState({ isMilitaryClear: !isMilitaryClear });
  };

  militaryTitle = ({ values, setFieldValue, arrayHelpers }) => {
    const { props, state } = this;
    return (
      <div className="visible-unit-input-title">
        <div>{props.language.addBusinessManagement.military}</div>
        {state.isMilitaryClear != true ? (
          <MdAddCircle
            size={18}
            className="add-button"
            onClick={() => {
              arrayHelpers.push('');
              setFieldValue('visibleMilitaryIdList', [
                ...values.visibleMilitaryIdList,
                '',
              ]);
            }}
          />
        ) : (
          <MdAddCircle size={18} className="hidden-button" />
        )}
      </div>
    );
  };

  militaryInputTitle = ({ values, index, setFieldValue, arrayHelpers }) => {
    const { props, state } = this;
    if (state.isMilitaryClear === true) {
      values.visibleLevelIdList.length = 0;
    } else {
      values.visibleLevelIdList.length = values.visibleLevelIdList.length;
    }
    if (values.visibleLevelIdList.length > 1) {
      return (
        <div className="visible-unit-input-title">
          <div>{props.language.addBusinessManagement.military}</div>
          <MdOutlineRemoveCircle
            size={18}
            className="delete-button"
            onClick={() => {
              const visibleMilitaryIdList = [...values.visibleMilitaryIdList];
              visibleMilitaryIdList.splice(index, 1);
              arrayHelpers.remove(index);
              setFieldValue('visibleMilitaryIdList', visibleMilitaryIdList);
            }}
          />
        </div>
      );
    }
    return props.language.addBusinessManagement.military;
  };

  visibleMilitaryAgencyOption = (id) => {
    const { state } = this;
    return state.militaryAgencyObject[id] === undefined
      ? []
      : state.militaryAgencyObject[id];
  };

  displayMilitaryVisibleUnit = ({ values, setFieldValue, errors, touched }) => {
    const { props, state } = this;
    return values.isVisibleToAll ? (
      ''
    ) : (
      <div className="visible-unit-card">
        <FieldArray
          name="visibleLevelIdList"
          render={(arrayHelpers) => (
            <div className="contents">
              <FormSectionTitle2
                title={this.militaryTitle({
                  values,
                  setFieldValue,
                  arrayHelpers,
                })}
                trailingIcon={this.trailMilitaryIcon()}
                iconOnClick={this.toggleMilitary}
              />
              {values.visibleLevelIdList.map((content, index) => (
                <div key={index}>
                  <FormRow>
                    <UnitInput2
                      hideThird
                      title={this.militaryInputTitle({
                        values,
                        index,
                        setFieldValue,
                        arrayHelpers,
                      })}
                      firstLevelTitle="層級"
                      firstLevelName={`visibleLevelIdList.${index}`}
                      firstLevelValue={content}
                      firstLevelPlaceholder="層級"
                      firstLevelOptions={state.levelList}
                      firstLevelOnChanged={this.handleMilitarylevelOnChanged}
                      secondLevelTitle="機關"
                      secondLevelName={`visibleMilitaryIdList.${index}`}
                      secondLevelValue={values.visibleMilitaryIdList[index]}
                      secondLevelPlaceholder="機關"
                      secondLevelOptions={this.visibleMilitaryAgencyOption(
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

  topicTitle = ({ values, setFieldValue, arrayHelpers }) => {
    const { props, state } = this;
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
  };

  topicInputTitle = ({ values, index, setFieldValue, arrayHelpers }) => {
    if (values.topicList.length > 1) {
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
                    inputValue={content}
                    inputOnChange={handleChange}
                    setFieldValue={setFieldValue}
                    touched={touched}
                    errors={errors}
                    index={index}
                    required="*"
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
            required="*"
          />
          <TextInput
            title="報名名額(人)"
            inputName="meetingPeople"
            inputPlaceholder="請輸入報名人數"
            inputValue={values.meetingPeople}
            inputOnChange={handleChange}
            touched={touched}
            errors={errors}
            required="*"
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
                required="*"
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
                required="*"
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
            required="*"
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
                disable={!values.isMeetingTimeRequired}
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
                  index,
                  handleChange,
                })}
                trailingIcon={() => this.trailRequestIcon(values)}
                iconOnClick={() => this.toggleRequest(values, setFieldValue)}
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
                        description="選項內容輸入說明：半形逗號，分隔選項"
                        inputValue={values.optionList[index]}
                        inputOnChange={handleChange}
                        setFieldValue={setFieldValue}
                        required="*"
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
  };

  requestInputTitle = ({ values, index, setFieldValue, arrayHelpers }) => {
    if (values.isRequestClear === true) {
      values.questionList.length = values.questionList.length;
    } else {
      values.questionList.length = 0;
    }
    if (values.questionList.length > 0) {
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
                  />
                  <MultipleSelectInput
                    horizontal
                    singleSelection
                    title="是否必填"
                    inputName={`isRequiredList.${index}`}
                    inputValue={values.isRequiredList[index]}
                    setFieldValue={setFieldValue}
                    options={SignType}
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
    // if (state.initUserValue === null) return '';
    return (
      <div className="add-business-management">
        <SectionTitle title={props.title} />

        <Formik
          initialValues={BusinessManagementForm.initialValue({
            announcedUserAccountId: Number(getUserId()),
            jobPosition: getJobPosition(),
            businessPhone: getBusinessPhone(),
            telephoneExtension: getTelephoneExtension(),
            announcementUnit: getUnitName(),
            createdUser: getName(),
            // isVisibleToAll: false,
            visibleFirstlevelAgencyIdList: [],
            visibleCityIdList: [],
            visibleLevelIdList: [],
            ...state.initUserValue,
          })}
          validationSchema={BusinessManagementForm.validationSchema()}
          onSubmit={this.onSubmit}
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
              <div className="inputs">
                <div className="announcement-unit">
                  <FormSectionTitle
                    title={
                      props.language.addBusinessManagement.announcementUnitInfo
                    }
                  />
                  <FormRow>
                    <TextInput
                      title={
                        props.language.addBusinessManagement.announcementUnit
                      }
                      inputName="announcementUnit"
                      inputValue={values.announcementUnit}
                      inputOnChange={handleChange}
                      display
                      required={BusinessManagementForm.isFieldRequired(
                        'announcementUnit',
                      )}
                    />
                    <SelectInput
                      title={props.language.addBusinessManagement.announcedUser}
                      inputName="announcedUserAccountId"
                      inputPlaceholder={
                        props.language.addBusinessManagement.nameHint
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
                            inputOnChange={handleChange}
                            // touched={touched}
                            // errors={errors}
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
                        props.language.addBusinessManagement.announcementDate
                      }
                      inputName="announcementDate"
                      inputPlaceholder={
                        props.language.addBusinessManagement
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
                      title={props.language.addBusinessManagement.phone}
                      inputName="businessPhone"
                      inputPlaceholder={
                        props.language.addBusinessManagement.businessPhoneHint
                      }
                      inputValue={values.businessPhone}
                      extensionTitle={
                        props.language.addBusinessManagement.telephoneExtension
                      }
                      extensionInputName="telephoneExtension"
                      extensionInputPlaceholder={
                        props.language.addBusinessManagement
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
                      title={props.language.addBusinessManagement.createdDate}
                      inputName="createdDate"
                      inputValue={values.createdDate}
                      inputOnChange={handleChange}
                      display
                      required={BusinessManagementForm.isFieldRequired(
                        'createdDate',
                      )}
                    />
                    <TextInput
                      title={props.language.addBusinessManagement.createdUser}
                      inputName="createdUser"
                      inputValue={values.createdUser}
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
                      title={props.language.addBusinessManagement.visibleUnit}
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
                          onClick={() =>
                            this.visiableLevel(
                              values.isVisibleToAll,
                              values.visibleFirstlevelAgencyIdList,
                              values.visibleSecondaryAgencyIdList,
                              values.visibleCityIdList,
                              values.visibleFirstlevelUnitIdList,
                              values.visibleLevelIdList,
                              values.visibleMilitaryIdList,
                            )
                          }
                        >
                          顯示已選單位
                        </ButtonDiv>
                      }
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
                    />
                  </FormRow>
                </div>

                {this.displayOrganizationVisibleUnit({
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
                })}

                {this.displayMilitaryVisibleUnit({
                  values,
                  setFieldValue,
                  errors,
                  touched,
                })}
                <div className="announcement-info">
                  <FormSectionTitle
                    title={
                      props.language.addBusinessManagement.announcementInfo
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
                      title={props.language.addBusinessManagement.file}
                      inputName="file"
                      inputPlaceholder={
                        props.language.addBusinessManagement.fileHint
                      }
                      inputValue={values.file}
                      setFieldValue={setFieldValue}
                      description={
                        props.language.addBusinessManagement.fileDescription
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
                      // touched={touched}
                      // errors={errors}
                      // required={BusinessManagementForm.isFieldRequired('file')}
                    />
                    <MultipleSelectInput
                      horizontal
                      singleSelection
                      title={
                        props.language.addBusinessManagement
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
                            props.language.addBusinessManagement
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
                    />
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
                    {props.language.addBusinessManagement.back}
                  </ButtonDiv>
                  <ButtonDiv className="normal-button" onClick={resetForm}>
                    {props.language.addBusinessManagement.clear}
                  </ButtonDiv>
                  <ButtonDiv className="submit-button" onClick={submitForm}>
                    {props.language.addBusinessManagement.submit}
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
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});

AddBusinessManagement.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  typeId: PropTypes.number.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddBusinessManagement),
);
