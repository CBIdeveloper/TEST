import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, FieldArray } from 'formik';
import { withRouter } from 'react-router-dom';
import { MdAddCircle, MdOutlineRemoveCircle } from 'react-icons/md';

import ButtonDiv from '../../lib/components/ButtonDiv/ButtonDiv';
import Container from '../../lib/components/Container/Container';
import FileInput from '../../lib/components/inputs/FileInput/FileInput';
import FormRow from '../../lib/components/FormRow/FormRow';
import FormSectionTitle from '../../lib/components/FormSectionTitle/FormSectionTitle';
import FormikErrorModal from '../../lib/components/FormikErrorModal/FormikErrorModal';
import Header from '../Header/Header';
import IpInput from '../../lib/components/inputs/IpInput/IpInput';
import CheckBox from '../../lib/components/inputs/CheckBox/CheckBox';
import CheckBoxTitle from '../../lib/components/inputs/CheckBoxAddTitle/CheckBox';
import MobilizationPlanInput from '../../lib/components/inputs/MobilizationPlanInput/MobilizationPlanInput';
import MultipleSelectInput from '../../lib/components/inputs/MultipleSelectInput/MultipleSelectInput';
import PhoneInput from '../../lib/components/inputs/PhoneInput/PhoneInput';
import SectionTitle from '../../lib/components/SectionTitle/SectionTitle';
import SelectInput from '../../lib/components/inputs/SelectInput/SelectInput';
import TextInput from '../../lib/components/inputs/TextInput/TextInput';
import UnitInput from '../../lib/components/inputs/UnitInput/UnitInput';
import { setLoading } from '../../store/loading/slice';
import AgencyType from '../../utils/constants/AgencyType';
import ApiService from '../../utils/api/ApiService';
import BooleanType from '../../utils/constants/BooleanType';
import BusinessPlanType from '../../utils/constants/BusinessPlanType';
import MobilizationType from '../../utils/constants/MobilizationType';
import MobilizationPlanType from '../../utils/config/MobilizationPlanType';
import AccessControlListItem from '../SystemManagement/AccessControl/AccessControlListItem/AccessControlListItem';
import ModalHelper from '../../utils/helper/ModalHelper';
import Path from '../../utils/path/path';
import RegisterForm from '../../utils/forms/RegisterForm';
import SysUserAccountRequest from '../../utils/dataModels/SysUserAccount/SysUserAccountRequest';
import SysUserAccountAppliedAttachmentRequest from '../../utils/dataModels/SysUserAccount/SysUserAccountAppliedAttachmentRequest';
import './Register.scss';
import checkboxNone from '../../assets/images/icons/checkbox_none.png';
import checkboxChecked from '../../assets/images/icons/checkbox_check.png';
import UnitInput2 from '../../lib/components/inputs/UnitInput/UnitInput2';

class Register extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isClearText: false,
      isReportClear: false,
      firstlevelAgencyList: [],
      secondaryAgencyList: [],
      cityList: [],
      firstlevelUnitList: [],
      militarylevelList: [],
      militaryAgencyList: [],
      originMobilizationPlanList: [],
      mobilizationPlanList: [],
      mobilizationClassificationObject: {},
      mobilizationClassificationList: [],
      braidingCategoryObject: {},
      braidingCategoryList: [],
      groupedList: [],

      filteredSecondaryAgencyList: [],
      filteredFirstlevelUnitList: [],
      filteredMilitaryAgencyList: [],

      checkedState: [],
    };
  }

  componentDidMount() {
    this.initState();
  }

  setFirstlevelAgencyList = (firstlevelAgencyList) => {
    this.setState({ firstlevelAgencyList });
  };

  setSecondaryAgencyList = async (secondaryAgencyList) => {
    await this.setState({ secondaryAgencyList });
  };

  setMilitarylevelList = (militarylevelList) => {
    this.setState({ militarylevelList });
  };

  setMilitaryAgencyList = async (militaryAgencyList) => {
    await this.setState({ militaryAgencyList });
  };

  setCityList = (cityList) => {
    this.setState({ cityList });
  };

  setFirstlevelUnitList = async (firstlevelUnitList) => {
    await this.setState({ firstlevelUnitList });
  };

  setOriginMobilizationPlanList = (originMobilizationPlanList) => {
    this.setState({ originMobilizationPlanList });
  };

  setMobilizationPlanList = (mobilizationPlanList) => {
    this.setState({ mobilizationPlanList });
  };

  setMobilizationClassificationObject = async (
    mobilizationClassificationObject,
  ) => {
    await this.setState({ mobilizationClassificationObject });
  };

  setMobilizationClassificationList = async (
    mobilizationClassificationList,
  ) => {
    await this.setState({ mobilizationClassificationList });
  };

  setBraidingCategoryObject = async (braidingCategoryObject) => {
    await this.setState({ braidingCategoryObject });
  };

  setBraidingCategoryList = (braidingCategoryList) => {
    this.setState({ braidingCategoryList });
  };

  setGroupedList = (groupedList) => {
    this.setState({ groupedList });
  };

  setFilteredSecondaryAgencyList = (filteredSecondaryAgencyList) => {
    this.setState({ filteredSecondaryAgencyList });
  };

  setFilteredMilitaryAgencyList = (filteredMilitaryAgencyList) => {
    this.setState({ filteredMilitaryAgencyList });
  };

  setFilteredFirstlevelUnitList = (filteredFirstlevelUnitList) => {
    this.setState({ filteredFirstlevelUnitList });
  };

  setFilteredMilitarylevelList = (filteredMilitarylevelList) => {
    this.setState({ filteredMilitarylevelList });
  };

  setCheckedState = (checkedState) => {
    this.setState({ checkedState });
  };

  togglePassword = () => {
    const { isClearText } = this.state;
    this.setState({ isClearText: !isClearText });
  };

  toggleReport = () => {
    const { isReportClear } = this.state;
    this.setState({ isReportClear: !isReportClear });
  };

  initState = () => {
    ApiService.city.getCityList().then((response) => {
      const cityList = response.cityList.map((item) => ({
        text: item.cityName,
        value: item.id,
      }));
      this.setCityList(cityList);
    });
    ApiService.firstlevelUnit.getFirstlevelUnitList().then((response) => {
      const firstlevelUnitList = response.firstlevelUnitList.map((item) => ({
        text: item.fullName,
        value: item.id,
        cityId: item.cityId,
      }));
      this.setFirstlevelUnitList(firstlevelUnitList);
    });

    ApiService.firstlevelAgency.getFirstlevelAgencyList().then((response) => {
      const firstlevelAgencyList = response.firstlevelAgencyList.map(
        (item) => ({
          text: item.shortName,
          value: item.id,
        }),
      );
      this.setFirstlevelAgencyList(firstlevelAgencyList);
    });
    ApiService.secondaryAgency.getSecondaryAgencyList().then((response) => {
      const secondaryAgencyList = response.secondaryAgencyList.map((item) => ({
        text: item.shortName,
        value: item.id,
        firstlevelAgencyId: item.firstlevelAgencyId,
      }));
      this.setSecondaryAgencyList(secondaryAgencyList);
    });
    //API取得層級
    ApiService.codefile.getMilitarylevelList().then((response) => {
      const militarylevelList = response.codefileList.map((item) => ({
        text: item.name,
        value: item.id,
      }));
      this.setMilitarylevelList(militarylevelList);
    });
    //API取得單位
    ApiService.codefile.getMilitaryAgencyList().then((response) => {
      const militaryAgencyList = response.codefileList.map((item) => ({
        text: item.name,
        value: item.id,
        militarylevelListId: item.parentcodeid,
      }));
      this.setMilitaryAgencyList(militaryAgencyList);
    });
    ApiService.mobilizationPlan.getMobilizationPlanList().then((response) => {
      const mobilizationPlanList = response.mobilizationPlanList.map(
        (item) => ({
          text: item.planName,
          value: item.id,
        }),
      );
      this.setOriginMobilizationPlanList(mobilizationPlanList);
      this.setMobilizationPlanList(mobilizationPlanList);
    });
    ApiService.mobilizationClassification
      .getMobilizationClassificationList()
      .then((response) => {
        const mobilizationClassificationList =
          response.mobilizationClassificationList.map((item) => ({
            text: item.classificationName,
            value: item.id,
            mobilizationPlanId: item.mobilizationPlanId,
          }));
        this.setMobilizationClassificationList(mobilizationClassificationList);
      });
    ApiService.braidingCategory.getBraidingCategoryList().then((response) => {
      const braidingCategoryList = response.braidingCategoryList.map(
        (item) => ({
          text: item.fullName,
          value: item.id,
          type: item.categoryType,
          mobilizationClassificationId: item.mobilizationClassificationId,
          mobilizationClassificationName:
            item.classification.classification_name,
          planId: item.plan.id,
          planName: item.plan.plan_name,
        }),
      );
      const groupedList = braidingCategoryList
        .sort((a, b) => a.planId - b.planId)
        .reduce((acc, item) => {
          if (!acc[item.planName]) {
            acc[item.planName] = {};
          }
          if (!acc[item.planName][item.mobilizationClassificationName]) {
            acc[item.planName][item.mobilizationClassificationName] = [];
          }
          acc[item.planName][item.mobilizationClassificationName].push(item);

          return acc;
        }, {});
      this.setBraidingCategoryList(braidingCategoryList);
      this.setGroupedList(groupedList);
    });
  };

  InputType = () => {
    const { isClearText } = this.state;
    return isClearText ? 'text' : 'password';
  };

  trailingIcon = () => {
    const { props, state } = this;
    return state.isClearText ? (
      <div className="password-toggle">
        <img className="checkbox" src={checkboxChecked} alt="checkbox" />
        <div>{props.language.register.display}</div>
      </div>
    ) : (
      <div className="password-toggle">
        <img className="checkbox" src={checkboxNone} alt="checkbox" />
        <div>{props.language.register.display}</div>
      </div>
    );
  };
  trailingReportIcon = () => {
    const { props, state } = this;
    return state.isReportClear ? (
      <div className="password-toggle">
        <img className="checkbox" src={checkboxChecked} alt="checkbox" />
        <div>{'決策報表'}</div>
      </div>
    ) : (
      <div className="password-toggle">
        <img className="checkbox" src={checkboxNone} alt="checkbox" />
        <div>{'決策報表'}</div>
      </div>
    );
  };

  handleAgencyTypeOnChanged = ({
    values,
    agencyType,
    field,
    setFieldValue,
  }) => {
    // console.log('handleAgencyTypeOnChanged', agencyType);
    if (values.agencyType !== agencyType) {
      setFieldValue(field, agencyType);
      setFieldValue('cityId', '');
      setFieldValue('firstlevelUnitId', '');
      setFieldValue('unitName', '');
      setFieldValue('firstlevelAgencyId', '');
      setFieldValue('secondaryAgencyId', '');
      setFieldValue('levelId', '');
      setFieldValue('militaryAgencyId', '');
      setFieldValue('militarylevelListId', '');
      setFieldValue('department', '');
      setFieldValue('maintainManufacturer', '');
      // if (agencyType === '1') {
      setFieldValue('mobilizationPlanList', [RegisterForm.template]);
      // } else {
      //   setFieldValue('mobilizationPlanList', []);
      // }
    }
  };

  handleBusinessPlanOnChanged = ({
    values,
    businessPlan,
    field,
    setFieldValue,
  }) => {
    if (values.businessPlan !== businessPlan) {
      const { state } = this;
      setFieldValue(field, businessPlan);
      setFieldValue('mobilizationPlanList', [RegisterForm.template]);
      // if (businessPlan !== '5') {
      //   setFieldValue('mobilizationPlanList', [RegisterForm.template]);
      // }
      if (businessPlan === '1') {
        setFieldValue('mobilizationType', '');
      }
      this.handleAgencyTypeOnChanged({
        values,
        agencyType: businessPlan === '4' ? '2' : '1',
        field: 'agencyType',
        setFieldValue,
      });
      setFieldValue('mobilizationPlanId', '');
      this.setMobilizationPlanList(state.originMobilizationPlanList);
    }
  };

  trailingCheckBox = (id, text) => {
    const { state } = this;
    return state.checkedState[id] ? (
      <div className="password-toggle">
        <img className="checkbox" src={checkboxChecked} alt="checkbox" />
        <div>{text}</div>
      </div>
    ) : (
      <div className="password-toggle">
        <img className="checkbox" src={checkboxNone} alt="checkbox" />
        <div>{text}</div>
      </div>
    );
  };

  handleCheckboxChange = (
    planName,
    mobilizationClassificationName,
    categoryText,
    type,
  ) => {
    const newCheckedState = { ...this.state.checkedState };
    if (type === 'category') {
      const categoryKey = `${planName}_${mobilizationClassificationName}_${categoryText}`;
      newCheckedState[categoryKey] = !newCheckedState[categoryKey];
    }
    if (type === 'class') {
      const classKey = `${planName}_${mobilizationClassificationName}`;
      const isChecked = !newCheckedState[classKey];
      newCheckedState[classKey] = isChecked;
      this.state.groupedList[planName][mobilizationClassificationName].forEach(
        (item) => {
          const categoryKey = `${planName}_${mobilizationClassificationName}_${item.text}`;
          newCheckedState[categoryKey] = isChecked;
        },
      );
    }
    if (type === 'plan') {
      const isChecked = !newCheckedState[planName];
      newCheckedState[planName] = isChecked;
      Object.keys(this.state.groupedList[planName]).forEach((className) => {
        const classKey = `${planName}_${className}`;
        newCheckedState[classKey] = isChecked;

        this.state.groupedList[planName][className].forEach((item) => {
          const categoryKey = `${planName}_${className}_${item.text}`;
          newCheckedState[categoryKey] = isChecked;
        });
      });
    }
    this.checkParentState(newCheckedState, planName);
    this.setCheckedState(newCheckedState);
  };

  checkParentState = (newCheckedState, planName) => {
    const { state } = this;
    let allClassesChecked = true;
    Object.keys(state.groupedList[planName]).forEach((className) => {
      const classKey = `${planName}_${className}`;
      let allCategoriesChecked = true;
      state.groupedList[planName][className].forEach((item) => {
        const categoryKey = `${planName}_${className}_${item.text}`;
        if (!newCheckedState[categoryKey]) {
          allCategoriesChecked = false;
        }
      });
      newCheckedState[classKey] = allCategoriesChecked;

      if (!allCategoriesChecked) {
        allClassesChecked = false;
      }
    });
    newCheckedState[planName] = allClassesChecked;
  };

  renderGroupedList = (groupedList, militaryAgencyId) => {
    const rows = [];
    Object.entries(groupedList).forEach(([planName, classes]) => {
      if (militaryAgencyId === '001002' && planName !== '科技動員方案') {
        return;
      }
      let isFirstPlanRow = true;
      Object.entries(classes).forEach(
        ([mobilizationClassificationName, categories]) => {
          rows.push(
            <div
              className="checkbox-container-two"
              key={`${planName}_${mobilizationClassificationName}`}
            >
              {/* Plan CheckBox */}
              <div className="checkbox-item">
                {isFirstPlanRow && (
                  <CheckBox
                    trailingIcon={this.trailingCheckBox(
                      `${planName}`,
                      planName,
                    )}
                    iconOnClick={() =>
                      this.handleCheckboxChange(planName, '', '', 'plan')
                    }
                  />
                )}
              </div>
              <div className="checkbox-section">
                <CheckBox
                  trailingIcon={this.trailingCheckBox(
                    `${planName}_${mobilizationClassificationName}`,
                    mobilizationClassificationName,
                  )}
                  iconOnClick={() =>
                    this.handleCheckboxChange(
                      planName,
                      mobilizationClassificationName,
                      '',
                      'class',
                    )
                  }
                />
              </div>
              <div className="checkbox-section-two">
                {categories.map((item) => (
                  <CheckBox
                    key={`${planName}_${mobilizationClassificationName}_${item.text}`}
                    trailingIcon={this.trailingCheckBox(
                      `${planName}_${mobilizationClassificationName}_${item.text}`,
                      item.text,
                    )}
                    iconOnClick={() =>
                      this.handleCheckboxChange(
                        planName,
                        mobilizationClassificationName,
                        item.text,
                        'category',
                      )
                    }
                  />
                ))}
              </div>
            </div>,
          );
          isFirstPlanRow = false;
        },
      );
    });
    return rows;
  };

  onSubmit = async (values) => {
    const { props, state } = this;
    // props.setLoading(true);
    const result = Object.entries(state.checkedState).map(([key,checked]) => {
        if(checked==true){
          const parts = key.split('_');
          const text = parts.length > 2 ? parts[2] : null;
          if (text) {
            const category = state.braidingCategoryList.find(
              (item) => item.text === text,
            );
            return category ? category.value : null;
          }  
        }
        return null;
      })
      .filter((item) => item !== null);
    const braidingCategoryIdList = result;
    let request = new SysUserAccountRequest({
      ...values,
      braidingCategoryIdList: braidingCategoryIdList,
      password: values.accountVerification,
      roleMainId: this.getUserRoleMainId(values),
      mobilizationPlanId: values.mobilizationPlanId,
      report: this.state.isReportClear,
    });
    if (values.mobilizationPlanId) {
      const response =
        await ApiService.mobilizationClassification.getMobilizationClassificationList();
      const filteredResponse = response.mobilizationClassificationList.filter(
        (item) => item.mobilizationPlanId === values.mobilizationPlanId,
      );
      if (filteredResponse.length > 0) {
        const response2 =
          await ApiService.braidingCategory.getBraidingCategoryList();
        const filteredIds = filteredResponse.map((item) => item.id);
        const filteredResponse2 = response2.braidingCategoryList.filter(
          (item) => filteredIds.includes(item.mobilizationClassificationId),
        );
        const filteredId2s = filteredResponse2.map((item) => item.id);
        request.braiding_category_id_list = filteredId2s;
      }
    }
    if (request.business_plan == '3' || request.business_plan == '4') {
      request.braiding_category_id_list = braidingCategoryIdList;
    }
    // console.log(request);
    if (
      braidingCategoryIdList == '' &&
      (values.businessPlan == '3' || values.businessPlan == '4')
    ) {
      alert('編管類別必填');
    } else {
      props.setLoading(true);
      ApiService.sysUserAccount
        .createSysUserAccount(request)
        .then((response) => {
          const { post_dto, id } = response.data;
          const { email } = post_dto;
          const fileRequest = new SysUserAccountAppliedAttachmentRequest({
            id,
            uploadFile: values.file,
          }).getFormData();

          ApiService.sysUserAccount
            .uploadAttachmentFileRecord(fileRequest)
            .then(() => {
              props.setLoading(false);
              ModalHelper.openMessageModal({
                message: `${props.language.register.yourEmail}${email}`,
                callback: () => {
                  props.history.push(Path.loginPath);
                },
              });
            })
            .catch((uploadError) => {
              console.error('Upload Error:', uploadError);
              props.setLoading(false);
            });
        })
        .catch((createError) => {
          console.error('Create Account Error:', createError);
          props.setLoading(false);
        });
    }
  };

  handleFirstLevelAgencyOnChanged = ({ value, field, setFieldValue }) => {
    const { state } = this;
    if (value !== '') {
      const secondaryAgencyList = state.secondaryAgencyList.filter(
        (item) => item.firstlevelAgencyId === value,
      );
      this.setFilteredSecondaryAgencyList(secondaryAgencyList);
    }
    setFieldValue(field, value);
    setFieldValue('secondaryAgencyId', '');
    setFieldValue('department', '');
  };

  handleCityOnChanged = ({ value, field, setFieldValue }) => {
    const { state } = this;
    if (value !== '') {
      const firstlevelUnitList = state.firstlevelUnitList.filter(
        (item) => item.cityId === value,
      );
      this.setFilteredFirstlevelUnitList(firstlevelUnitList);
    }
    setFieldValue(field, value);
    setFieldValue('firstlevelUnitId', '');
    setFieldValue('unitName', '');
  };
  //動員執行層級下拉式選單連動單位下拉式選單
  handleMilitarylevelOnChanged = ({ value, field, setFieldValue }) => {
    // console.log('1111111111111111')
    const { state } = this;
    const { militaryAgencyList } = state;
    if (value !== '') {
      const filteredMilitaryAgencyList = militaryAgencyList.filter(
        (item) => String(item.militarylevelListId) === String(value),
      );
      this.setFilteredMilitaryAgencyList(filteredMilitaryAgencyList);
    }
    setFieldValue(field, value);
    setFieldValue('militarylevelListId', '');
  };
  //動員執行下拉式選單連動動員方案-科技動員方案
  handleMilitarylevelOnChanged2 = ({ value, field, setFieldValue }) => {
    const { state } = this;

    if (value === '001002') {
      const mobilizationPlanList = state.originMobilizationPlanList.filter(
        (item) => item.value == 5,
      );
      this.setMobilizationPlanList(mobilizationPlanList);
      setFieldValue('mobilizationPlanList', [RegisterForm.template2]);

      const data = state.mobilizationClassificationList.filter(
        (item) =>
          item.mobilizationPlanId === RegisterForm.template2.mobilizationPlanId,
      );
      this.setMobilizationClassificationObject({
        ...state.mobilizationClassificationObject,
        [RegisterForm.template2.mobilizationPlanId]: data,
      });
      setFieldValue('mobilizationPlanList.0.mobilizationClassificationId', '');
      setFieldValue('mobilizationPlanList.0.braidingCategoryIdList', []);
    } else {
      this.setMobilizationPlanList(state.originMobilizationPlanList);
      setFieldValue('mobilizationPlanList', [RegisterForm.template]);
    }
    setFieldValue(field, value);
  };
  handlePlanOnChanged = async ({
    value,
    field,
    setFieldValue,
    index,
    values,
  }) => {
    const { state } = this;
    if (
      values.businessPlan === '2' ||
      values.businessPlan === '3' ||
      values.businessPlan === '4'
    ) {
      if (state.mobilizationClassificationObject[value] === undefined) {
        const data = state.mobilizationClassificationList.filter(
          (item) => item.mobilizationPlanId === value,
        );
        this.setMobilizationClassificationObject({
          ...state.mobilizationClassificationObject,
          [value]: data,
        });
      }
      setFieldValue(
        `mobilizationPlanList.${index}.mobilizationClassificationId`,
        '',
      );
      setFieldValue(`mobilizationPlanList.${index}.braidingCategoryIdList`, []);
    }
    setFieldValue(field, value);
  };

  handleMobilizationPlanOnChanged = async ({
    value,
    setFieldValue,
    values,
  }) => {
    //動員方案->編管類別選擇
    setFieldValue('mobilizationPlanId', value);
    const { state } = this;
    const mobilizationPlanList = state.originMobilizationPlanList.filter(
      (item) => item.value !== value,
    );
    // console.log('mobilizationPlanList', mobilizationPlanList);
    const valuesMobilizationPlanList = values.mobilizationPlanList.filter(
      (content) => content.mobilizationPlanId !== value,
    );
    // console.log('valuesMobilizationPlanList', valuesMobilizationPlanList);
    setFieldValue('mobilizationPlanList', valuesMobilizationPlanList);

    this.setMobilizationPlanList(mobilizationPlanList);
  };

  handleClassificationOnChanged = async ({
    value,
    field,
    setFieldValue,
    index,
  }) => {
    const { state } = this;
    if (state.braidingCategoryObject[value] === undefined) {
      const data = state.braidingCategoryList.filter(
        (item) => item.mobilizationClassificationId === value,
      );
      this.setBraidingCategoryObject({
        ...state.braidingCategoryObject,
        [value]: data,
      });
    }
    setFieldValue(field, value);
    setFieldValue(`mobilizationPlanList.${index}.braidingCategoryIdList`, []);
  };

  displayIsOrganizer = ({ values, setFieldValue, errors, touched }) => {
    const { props } = this;
    return (
      <div className="is-plan-sponsor">
        <div>{props.language.register.isPlansponsorDescription}</div>
        <MultipleSelectInput
          singleSelection
          horizontal
          zenMode
          title={props.language.register.isPlansponsor}
          inputName="isPlansponsor"
          inputValue={values.isPlansponsor}
          setFieldValue={setFieldValue}
          options={BooleanType}
          errors={errors}
          touched={touched}
        />
      </div>
    );
  };
  //業務計畫別
  displayAgencyType = ({
    handleChange,
    values,
    setFieldValue,
    errors,
    touched,
  }) => {
    const { props, state } = this;
    return values.agencyType === '1' ? (
      <UnitInput2
        title={props.language.register.organization}
        firstLevelTitle={props.language.register.firstlevelAgencyId}
        firstLevelName="firstlevelAgencyId"
        firstLevelValue={values.firstlevelAgencyId}
        firstLevelPlaceholder={props.language.register.firstlevelAgencyIdHint}
        firstLevelOptions={state.firstlevelAgencyList}
        firstLevelOnChanged={this.handleFirstLevelAgencyOnChanged}
        secondLevelTitle={props.language.register.secondaryAgencyId}
        secondLevelName="secondaryAgencyId"
        secondLevelValue={values.secondaryAgencyId}
        secondLevelPlaceholder={props.language.register.secondaryAgencyIdHint}
        secondLevelOptions={state.filteredSecondaryAgencyList}
        thirdLevelTitle={props.language.register.department}
        thirdLevelName="department"
        thirdLevelValue={values.department}
        thirdLevelPlaceholder={props.language.register.departmentHint}
        setFieldValue={setFieldValue}
        touched={touched}
        errors={errors}
        required
      />
    ) : values.agencyType === '2' ? (
      <UnitInput2
        title={props.language.register.government}
        firstLevelTitle={props.language.register.cityId}
        firstLevelName="cityId"
        firstLevelValue={values.cityId}
        firstLevelPlaceholder={props.language.register.cityIdHint}
        firstLevelOptions={state.cityList}
        firstLevelOnChanged={this.handleCityOnChanged}
        secondLevelTitle={props.language.register.firstlevelUnitId}
        secondLevelName="firstlevelUnitId"
        secondLevelValue={values.firstlevelUnitId}
        secondLevelPlaceholder={props.language.register.firstlevelUnitIdHint}
        secondLevelOptions={state.filteredFirstlevelUnitList}
        thirdLevelTitle={props.language.register.unitName}
        thirdLevelName="unitName"
        thirdLevelValue={values.unitName}
        thirdLevelPlaceholder={props.language.register.unitNameHint}
        setFieldValue={setFieldValue}
        touched={touched}
        errors={errors}
        required
      />
    ) : values.agencyType === '3' ? (
      <TextInput
        title={props.language.register.maintainManufacturerName}
        inputType="text"
        inputName="maintainManufacturer"
        inputPlaceholder={props.language.register.maintainManufacturerNameHint}
        inputValue={values.maintainManufacturer}
        inputOnChange={handleChange}
        touched={touched}
        errors={errors}
        required
      />
    ) : (
      <UnitInput
        title={props.language.register.militaryAgency}
        firstLevelTitle={props.language.register.level}
        firstLevelName="levelId"
        firstLevelValue={values.levelId}
        firstLevelPlaceholder={props.language.register.levelHint}
        firstLevelOptions={state.militarylevelList}
        firstLevelOnChanged={this.handleMilitarylevelOnChanged}
        secondLevelTitle={props.language.register.militaryAgency}
        secondLevelName="militaryAgencyId"
        secondLevelValue={values.militaryAgencyId}
        secondLevelPlaceholder={props.language.register.militaryAgencyHint}
        secondLevelOptions={state.filteredMilitaryAgencyList}
        secondLevelOnChanged={this.handleMilitarylevelOnChanged2}
        thirdLevelTitle={props.language.register.secondlevelmilitaryAgency}
        thirdLevelName="secondlevelmilitaryAgency"
        thirdLevelValue={values.secondlevelmilitaryAgency}
        thirdLevelPlaceholder={
          props.language.register.secondlevelmilitaryAgencyHint
        }
        setFieldValue={setFieldValue}
        touched={touched}
        errors={errors}
        required
      />
    );
  };

  displayMobilizationPlanCard = ({
    values,
    setFieldValue,
    handleChange,
    errors,
    touched,
  }) => {
    if (values.businessPlan === '') return '';
    if (
      values.agencyType === '1' ||
      values.agencyType === '2' ||
      values.agencyType === '4'
    ) {
      return (
        <div className="mobilization-plan-card">
          {this.displayMobilizationPlanInput({
            values,
            setFieldValue,
            handleChange,
            errors,
            touched,
          })}
        </div>
      );
    }
    return '';
  };

  displayMobilizationPlanInput = ({
    values,
    setFieldValue,
    handleChange,
    errors,
    touched,
  }) => {
    const { props, state } = this;
    if (values.businessPlan === '1') {
      AgencyType.forEach((item) => {
        if (item.value === '1') {
          item.disabled = false;
        } else if (item.value === '2') {
          item.disabled = true;
        } else if (item.value === '3') {
          item.disabled = false;
        } else if (item.value === '4') {
          item.disabled = true;
        }
      });
      return (
        <div className="contents">
          <FormSectionTitle
            title={props.language.register.mobilizationTypeTitle}
          />
          <FormRow>
            <MultipleSelectInput
              horizontal
              singleSelection
              title={props.language.register.mobilizationType}
              inputName="mobilizationType"
              inputValue={values.mobilizationType}
              setFieldValue={setFieldValue}
              options={MobilizationType}
              touched={touched}
              errors={errors}
              // required
              required={RegisterForm.isFieldRequired('mobilizationType')}
            />
          </FormRow>
        </div>
      );
    } else if (values.businessPlan === '2') {
      AgencyType.forEach((item) => {
        if (item.value === '1') {
          item.disabled = false;
        } else if (item.value === '2') {
          item.disabled = true;
        } else if (item.value === '3') {
          item.disabled = false;
        } else if (item.value === '4') {
          item.disabled = true;
        }
      });
      return (
        <div className="contents">
          {values.businessPlan === '2' && (
            <FormSectionTitle
              title={props.language.register.mobilizationPlan}
            />
          )}
          <FormRow>
            {values.businessPlan === '2' && (
              <MobilizationPlanInput
                title={props.language.register.mobilization}
                planInputName={'mobilizationPlanId'}
                planInputValue={values.mobilizationPlanId}
                planInputPlaceholder={
                  props.language.register.mobilizationPlanIdHint
                }
                planOptions={state.originMobilizationPlanList}
                planOnChanged={(params) =>
                  this.handleMobilizationPlanOnChanged({ ...params, values })
                }
                classificationInputName={''}
                classificationInputValue={''}
                classificationInputPlaceholder={''}
                classificationOptions={[]}
                classificationOnChanged={() => {}}
                hideClassification={true}
                setFieldValue={setFieldValue}
                touched={touched}
                errors={errors}
                index={values.mobilizationPlanList.length}
                required
              />
            )}
          </FormRow>
          <FieldArray
            name="mobilizationPlanList"
            render={(arrayHelpers) => (
              <div className="contents">
                <FormSectionTitle
                  title={this.mobilizationPlanTitle({ values, arrayHelpers })}
                />
                {values.mobilizationPlanList.map((content, index) => (
                  <div key={index}>
                    <FormRow>
                      <MobilizationPlanInput
                        title={this.mobilizationPlanInputTitle({
                          values,
                          index,
                          arrayHelpers,
                        })}
                        planInputName={`mobilizationPlanList.${index}.mobilizationPlanId`}
                        planInputValue={content.mobilizationPlanId}
                        planInputPlaceholder={
                          props.language.register.mobilizationPlanIdHint
                        }
                        planOptions={state.mobilizationPlanList}
                        planOnChanged={(params) =>
                          this.handlePlanOnChanged({ ...params, values })
                        }
                        classificationInputName={`mobilizationPlanList.${index}.mobilizationClassificationId`}
                        classificationInputValue={
                          content.mobilizationClassificationId
                        }
                        classificationInputPlaceholder={
                          props.language.register
                            .mobilizationClassificationIdHint
                        }
                        classificationOptions={this.mobilizationClassificationOption(
                          content.mobilizationPlanId,
                        )}
                        classificationOnChanged={
                          this.handleClassificationOnChanged
                        }
                        setFieldValue={setFieldValue}
                        touched={touched}
                        errors={errors}
                        index={index}
                        required={values.businessPlan === '3'}
                      />
                    </FormRow>
                    {values.businessPlan === '2' ||
                    values.businessPlan === '3' ? (
                      <FormRow>
                        <MultipleSelectInput
                          horizontal
                          title={props.language.register.braidingCategoryIdList}
                          inputName={`mobilizationPlanList.${index}.braidingCategoryIdList`}
                          inputValue={content.braidingCategoryIdList}
                          setFieldValue={setFieldValue}
                          options={this.braidingCategoryOption(
                            content.mobilizationClassificationId,
                          )}
                          touched={touched}
                          errors={errors}
                        />
                      </FormRow>
                    ) : (
                      ''
                    )}
                  </div>
                ))}
              </div>
            )}
          />
        </div>
      );
    } else if (values.businessPlan === '3') {
      AgencyType.forEach((item) => {
        if (item.value === '1') {
          item.disabled = false;
        } else if (item.value === '2') {
          item.disabled = true;
        } else if (item.value === '3') {
          item.disabled = false;
        } else if (item.value === '4') {
          item.disabled = true;
        }
      });
      return (
        <div>
          <FormSectionTitle title={props.language.register.mobilizationPlan} />
          <div className="checkbox-container">
            <label className="checkbox-item-title">動員方案</label>
            <div className="checkbox-item-title">動員分類</div>
            <div className="checkbox-section-title">
              編管類別&nbsp;<span style={{ color: 'red' }}>*</span>
            </div>
          </div>
          <div>
            {this.renderGroupedList(state.groupedList, values.militaryAgencyId)}
          </div>
        </div>
      );
    } else if (values.businessPlan === '4') {
      AgencyType.forEach((item) => {
        if (item.value === '1') {
          item.disabled = true;
        } else if (item.value === '2') {
          item.disabled = false;
        } else if (item.value === '3') {
          item.disabled = true;
        } else if (item.value === '4') {
          item.disabled = false;
        }
      });
      if (values.agencyType === '2' && values.isPlansponsor === true) {
        this.state.isReportClear = true;
      } else if (values.agencyType === '2' && values.isPlansponsor === false) {
        this.state.isReportClear = false;
      }
      return (
        <div>
          {values.agencyType === '2' && (
            <CheckBoxTitle
              title={'是否檢視'}
              trailingIcon={this.trailingReportIcon()}
              iconOnClick={this.toggleReport}
              disabled
            />
          )}
          {values.agencyType === '4' && (
            <CheckBoxTitle
              title={'是否檢視'}
              trailingIcon={this.trailingReportIcon()}
              iconOnClick={this.toggleReport}
            />
          )}
          <FormSectionTitle title={props.language.register.mobilizationPlan} />
          <div className="checkbox-container">
            <label className="checkbox-item-title">動員方案</label>
            <div className="checkbox-item-title">動員分類</div>
            <div className="checkbox-section-title">
              編管類別&nbsp;<span style={{ color: 'red' }}>*</span>
            </div>
          </div>
          <div>
            {this.renderGroupedList(state.groupedList, values.militaryAgencyId)}
          </div>
        </div>
      );
      // if (values.isPlansponsor) {
      //   return (
      //     <div className="form-row ">
      //       <div className="form-description left-border">
      //         <div className="description-title">編管類別</div>
      //         <div className="description-content2">
      //           {this.state.braidingCategoryList.map((item, index) => (
      //             <span key={index}>
      //               {item.text}
      //               {index !== this.state.braidingCategoryList.length - 1 &&
      //                 ', '}
      //             </span>
      //           ))}
      //         </div>
      //       </div>
      //     </div>
      //   );
      // } else {
      //const mobilizationPlanId = content.mobilizationPlanId
      // return (
      //   <div className="contents">
      //     <FieldArray
      //       name="mobilizationPlanList"
      //       render={(arrayHelpers) => (
      //         <div className="contents">
      //           <FormSectionTitle
      //             title={this.mobilizationPlanTitle({ values, arrayHelpers })}
      //           />
      //           {values.mobilizationPlanList.map((content, index) => (
      //             <div key={index}>
      //               <FormRow>
      //                 <MobilizationPlanInput
      //                   title={this.mobilizationPlanInputTitle({
      //                     values,
      //                     index,
      //                     arrayHelpers,
      //                   })}
      //                   planInputName={`mobilizationPlanList.${index}.mobilizationPlanId`}
      //                   planInputValue={content.mobilizationPlanId}
      //                   planInputPlaceholder={
      //                     props.language.register.mobilizationPlanIdHint
      //                   }
      //                   planOptions={state.mobilizationPlanList}
      //                   planOnChanged={(params) =>
      //                     this.handlePlanOnChanged({ ...params, values })
      //                   }
      //                   classificationInputName={`mobilizationPlanList.${index}.mobilizationClassificationId`}
      //                   classificationInputValue={
      //                     content.mobilizationClassificationId
      //                   }
      //                   classificationInputPlaceholder={
      //                     props.language.register
      //                       .mobilizationClassificationIdHint
      //                   }
      //                   classificationOptions={this.mobilizationClassificationOption(
      //                     content.mobilizationPlanId,
      //                   )}
      //                   classificationOnChanged={
      //                     this.handleClassificationOnChanged
      //                   }
      //                   setFieldValue={setFieldValue}
      //                   touched={touched}
      //                   errors={errors}
      //                   index={index}
      //                   required={values.businessPlan === '4'}
      //                 />
      //               </FormRow>
      //               {values.businessPlan === '4' ? (
      //                 <FormRow>
      //                   <MultipleSelectInput
      //                     horizontal
      //                     title={props.language.register.braidingCategoryIdList}
      //                     inputName={`mobilizationPlanList.${index}.braidingCategoryIdList`}
      //                     inputValue={content.braidingCategoryIdList}
      //                     setFieldValue={setFieldValue}
      //                     options={this.braidingCategoryOption(
      //                       content.mobilizationClassificationId,
      //                     )}
      //                     touched={touched}
      //                     errors={errors}
      //                   />
      //                 </FormRow>
      //               ) : (
      //                 ''
      //               )}
      //             </div>
      //           ))}
      //         </div>
      //       )}
      //     />
      //   </div>
      // );
      // }
    }
  };

  mobilizationPlanTitle = ({ values, arrayHelpers }) => {
    const { props } = this;
    if (
      values.businessPlan === '2' ||
      values.businessPlan === '3' ||
      values.businessPlan === '4'
    ) {
      return (
        <div className="mobilization-plan-input-title">
          <div>{props.language.register.mobilizationPlan}</div>
          <MdAddCircle
            size={18}
            className="add-button"
            onClick={() => arrayHelpers.push(RegisterForm.template)}
          />
        </div>
      );
    }
    return props.language.register.mobilizationPlan;
  };

  mobilizationPlanInputTitle = ({ values, index, arrayHelpers }) => {
    const { props } = this;
    if (values.mobilizationPlanList.length > 1) {
      return (
        <div className="mobilization-plan-input-title">
          <div>{props.language.register.mobilization}</div>
          <MdOutlineRemoveCircle
            size={18}
            className="delete-button"
            onClick={() => arrayHelpers.remove(index)}
          />
        </div>
      );
    }
    return props.language.register.mobilization;
  };

  mobilizationClassificationOption = (id) => {
    const { state } = this;
    return state.mobilizationClassificationObject[id] === undefined
      ? []
      : state.mobilizationClassificationObject[id];
  };

  braidingCategoryOption = (id) => {
    const { state } = this;
    if (state.braidingCategoryObject[id] === undefined) {
      return [];
    }
    return state.braidingCategoryObject[id];
  };

  getUserRoleMainId = (values) => {
    const {
      businessPlan,
      isPlansponsor,
      mobilizationType,
      agencyType,
      levelId,
      militaryAgencyId,
      secondlevelmilitaryAgency,
    } = values;
    // console.log(levelId);
    if (isPlansponsor) {
      if (businessPlan === '1') {
        if (mobilizationType === '1') return 1;
        if (mobilizationType === '2') return 3;
        if (mobilizationType === '3') return 5;
        if (mobilizationType === '4') return 7;
      }
      if (businessPlan === '2') return 9;
      if (businessPlan === '3') return 11;
      if (businessPlan === '4') {
        if (agencyType === '4') {
          if (levelId == '003' && this.state.isReportClear) {
            return 34;
          } else if (levelId == '003' && !this.state.isReportClear) {
            return 35;
          } else if (levelId == '002' && this.state.isReportClear) {
            return 32;
          } else if (levelId == '002' && !this.state.isReportClear) {
            return 33;
          } else if (levelId == '001' && this.state.isReportClear) {
            return 30;
          } else if (levelId == '001' && !this.state.isReportClear) {
            return 31;
          }
        } else {
          return 13;
        }
      }
    }

    if (businessPlan === '1') {
      if (mobilizationType === '1') return 2;
      if (mobilizationType === '2') return 4;
      if (mobilizationType === '3') return 6;
      if (mobilizationType === '4') return 8;
    }
    if (businessPlan === '2') return 10;
    if (businessPlan === '3') return 12;
    if (businessPlan === '4') {
      if (agencyType === '4') {
        if (levelId == '003' && this.state.isReportClear) {
          return 34;
        } else if (levelId == '003' && !this.state.isReportClear) {
          return 35;
        } else if (levelId == '002' && this.state.isReportClear) {
          return 32;
        } else if (levelId == '002' && !this.state.isReportClear) {
          return 33;
        } else if (levelId == '001' && this.state.isReportClear) {
          return 30;
        } else if (levelId == '001' && !this.state.isReportClear) {
          return 31;
        }
      } else {
        return 14;
      }
    }
    return 0;
  };

  render() {
    const { props, state } = this;
    return (
      <div className="register">
        <Header logoOnly />
        <div className="register-container">
          <Container breadcrumb={false}>
            <SectionTitle title={props.language.register.title} />
            <Formik
              enableReinitialize
              initialValues={RegisterForm.initialValue({
                state: '1',
                roleMainId: -1,
              })}
              validationSchema={RegisterForm.validationSchema()}
              // onSubmit={this.onSubmit}
              onSubmit={this.onSubmit}
            >
              {({
                handleSubmit,
                handleChange,
                resetForm,
                setFieldValue,
                isSubmitting,
                submitForm,
                touched,
                values,
                errors,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className="form"
                  autoComplete="off"
                >
                  <FormikErrorModal
                    isSubmitting={isSubmitting}
                    errors={errors}
                  />
                  <div className="inputs">
                    {/* <FormSectionTitle */}
                    {/*  title={props.language.register.userInfo} */}
                    {/* /> */}
                    <FormRow>
                      <TextInput
                        title={props.language.register.name}
                        inputType="text"
                        inputName="name"
                        inputPlaceholder={props.language.register.nameHint}
                        inputValue={values.name}
                        inputOnChange={handleChange}
                        touched={touched}
                        errors={errors}
                        required={RegisterForm.isFieldRequired('name')}
                      />
                      <TextInput
                        title={props.language.register.jobPosition}
                        inputType="text"
                        inputName="jobPosition"
                        inputPlaceholder={
                          props.language.register.jobPositionHint
                        }
                        inputValue={values.jobPosition}
                        inputOnChange={handleChange}
                        touched={touched}
                        errors={errors}
                        required={RegisterForm.isFieldRequired('jobPosition')}
                      />
                    </FormRow>
                    <FormRow>
                      {/* <TextInput */}
                      {/*  title={props.language.register.account} */}
                      {/*  inputType="text" */}
                      {/*  inputName="account" */}
                      {/*  inputPlaceholder={props.language.register.accountHint} */}
                      {/*  inputValue={values.account} */}
                      {/*  inputOnChange={handleChange} */}
                      {/*  touched={touched} */}
                      {/*  errors={errors} */}
                      {/*  required={RegisterForm.isFieldRequired('account')} */}
                      {/*  description={props.language.register.accountDescription} */}
                      {/* /> */}
                      <TextInput
                        title={props.language.register.password}
                        inputType={this.InputType()}
                        inputName="accountVerification"
                        inputPlaceholder={props.language.register.passwordHint}
                        inputValue={values.accountVerification}
                        inputOnChange={handleChange}
                        trailingIcon={this.trailingIcon()}
                        iconOnClick={this.togglePassword}
                        touched={touched}
                        errors={errors}
                        required
                        description={
                          props.language.register.passwordDescription
                        }
                      />
                    </FormRow>
                    <FormRow>
                      <TextInput
                        title={props.language.register.pid}
                        inputType="text"
                        inputName="pid"
                        inputPlaceholder={props.language.register.pidHint}
                        inputValue={values.pid}
                        inputOnChange={handleChange}
                        touched={touched}
                        errors={errors}
                        required={RegisterForm.isFieldRequired('pid')}
                      />
                      <TextInput
                        medium
                        title={props.language.register.email}
                        inputType="text"
                        inputName="email"
                        inputPlaceholder={props.language.register.emailHint}
                        inputValue={values.email}
                        inputOnChange={handleChange}
                        touched={touched}
                        errors={errors}
                        required={RegisterForm.isFieldRequired('email')}
                      />
                    </FormRow>
                    <FormRow>
                      <PhoneInput
                        inputType="text"
                        title={props.language.register.businessPhone}
                        inputName="businessPhone"
                        inputPlaceholder={
                          props.language.register.businessPhoneHint
                        }
                        inputValue={values.businessPhone}
                        extensionTitle={
                          props.language.register.telephoneExtension
                        }
                        extensionInputName="telephoneExtension"
                        extensionInputPlaceholder={
                          props.language.register.telephoneExtensionHint
                        }
                        extensionInputValue={values.telephoneExtension}
                        setFieldValue={setFieldValue}
                        touched={touched}
                        errors={errors}
                        required={RegisterForm.isFieldRequired('businessPhone')}
                      />
                      <TextInput
                        title={props.language.register.lineId}
                        inputType="text"
                        inputName="lineId"
                        inputPlaceholder={props.language.register.lineIdHint}
                        inputValue={values.lineId}
                        inputOnChange={handleChange}
                        touched={touched}
                        errors={errors}
                        required={RegisterForm.isFieldRequired('lineId')}
                      />
                    </FormRow>
                    <FormRow>
                      <TextInput
                        title={props.language.register.cellphone}
                        inputType="text"
                        inputName="cellphone"
                        inputPlaceholder={props.language.register.cellphoneHint}
                        inputValue={values.cellphone}
                        inputOnChange={handleChange}
                        touched={touched}
                        errors={errors}
                        required={RegisterForm.isFieldRequired('cellphone')}
                      />
                      <SelectInput
                        inputType="text"
                        title={props.language.register.businessPlan}
                        inputName="businessPlan"
                        inputPlaceholder={
                          props.language.register.businessPlanHint
                        }
                        inputValue={values.businessPlan}
                        setFieldValue={(field, value) =>
                          this.handleBusinessPlanOnChanged({
                            values,
                            businessPlan: value,
                            field,
                            setFieldValue,
                          })
                        }
                        options={BusinessPlanType}
                        trailingInput={this.displayIsOrganizer({
                          values,
                          setFieldValue,
                          errors,
                          touched,
                        })}
                        touched={touched}
                        errors={errors}
                        required={RegisterForm.isFieldRequired('businessPlan')}
                      />
                    </FormRow>
                    <FormRow>
                      <IpInput
                        title={props.language.register.appliedIpAddress}
                        inputName="appliedIpAddress"
                        inputPlaceholder={
                          props.language.register.appliedIpAddressHint
                        }
                        inputValue={values.appliedIpAddress}
                        setFieldValue={setFieldValue}
                        description={
                          props.language.register.appliedIpAddressDescription
                        }
                        touched={touched}
                        errors={errors}
                        required={RegisterForm.isFieldRequired(
                          'appliedIpAddress',
                        )}
                      />
                    </FormRow>
                    <FormRow>
                      <MultipleSelectInput
                        horizontal
                        singleSelection
                        title={props.language.register.agencyType}
                        inputName="agencyType"
                        inputValue={values.agencyType}
                        setFieldValue={(field, value) => {
                          this.handleAgencyTypeOnChanged({
                            values,
                            field,
                            agencyType: value,
                            setFieldValue,
                          });
                        }}
                        options={AgencyType}
                        touched={touched}
                        errors={errors}
                        required={RegisterForm.isFieldRequired('agencyType')}
                      />
                      {this.displayAgencyType({
                        handleChange,
                        values,
                        setFieldValue,
                        errors,
                        touched,
                      })}
                    </FormRow>
                    <FormRow>
                      <TextInput
                        full
                        title={props.language.register.businessNeeds}
                        inputType="textarea"
                        inputName="businessNeeds"
                        inputPlaceholder={
                          props.language.register.businessNeedsHint
                        }
                        inputValue={values.businessNeeds}
                        inputOnChange={handleChange}
                        touched={touched}
                        errors={errors}
                        required={RegisterForm.isFieldRequired('businessNeeds')}
                      />
                    </FormRow>
                    <FormRow>
                      <FileInput
                        title={props.language.register.file}
                        inputName="file"
                        inputPlaceholder={props.language.register.fileHint}
                        inputValue={values.file}
                        setFieldValue={setFieldValue}
                        description={props.language.register.fileDescription}
                        acceptFileExtension={['.pdf']}
                        touched={touched}
                        errors={errors}
                        required
                      />
                    </FormRow>
                    {this.displayMobilizationPlanCard({
                      values,
                      setFieldValue,
                      handleChange,
                      errors,
                      touched,
                    })}

                    <div className="action-button-container">
                      <ButtonDiv
                        className="reset-button"
                        onClick={props.history.goBack}
                      >
                        {props.language.register.back}
                      </ButtonDiv>
                      <ButtonDiv className="reset-button" onClick={resetForm}>
                        {props.language.register.clear}
                      </ButtonDiv>
                      <ButtonDiv className="submit-button" onClick={submitForm}>
                        {props.language.register.submit}
                      </ButtonDiv>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </Container>
        </div>
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

Register.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Register),
);
