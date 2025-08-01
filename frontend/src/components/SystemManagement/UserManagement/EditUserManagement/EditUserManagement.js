import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, FieldArray } from 'formik';
import { withRouter } from 'react-router-dom';
import { MdAddCircle, MdOutlineRemoveCircle } from 'react-icons/md';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import Container from '../../../../lib/components/Container/Container';
import FormDescription from '../../../../lib/components/FormDescription/FormDescription';
import FormRow from '../../../../lib/components/FormRow/FormRow';
import FormSectionTitle from '../../../../lib/components/FormSectionTitle/FormSectionTitle';
import FormikErrorModal from '../../../../lib/components/FormikErrorModal/FormikErrorModal';
import IpInput from '../../../../lib/components/inputs/IpInput/IpInput';
import MobilizationPlanInput from '../../../../lib/components/inputs/MobilizationPlanInput/MobilizationPlanInput';
import MultipleSelectInput from '../../../../lib/components/inputs/MultipleSelectInput/MultipleSelectInput';
import PhoneInput from '../../../../lib/components/inputs/PhoneInput/PhoneInput';
import SectionTitle from '../../../../lib/components/SectionTitle/SectionTitle';
import SelectInput from '../../../../lib/components/inputs/SelectInput/SelectInput';
import TextInput from '../../../../lib/components/inputs/TextInput/TextInput';
import UnitInput from '../../../../lib/components/inputs/UnitInput/UnitInput';
import UnitInput2 from '../../../../lib/components/inputs/UnitInput/UnitInput2';

import { setLoading } from '../../../../store/loading/slice';

import AgencyType from '../../../../utils/constants/AgencyType';
import ApiService from '../../../../utils/api/ApiService';
import BooleanType from '../../../../utils/constants/BooleanType';
import BusinessPlanType from '../../../../utils/constants/BusinessPlanType';
import MobilizationType from '../../../../utils/constants/MobilizationType';
import ModalHelper from '../../../../utils/helper/ModalHelper';
import RegisterForm from '../../../../utils/forms/RegisterForm';
import SysUserAccountRequest from '../../../../utils/dataModels/SysUserAccount/SysUserAccountRequest';
import QueryType from '../../../../utils/types/QueryType';
import { inputUserStateType } from '../../../../utils/constants/UserStateType';
import { userHasRole } from '../../../../utils/auth/auth';

import './EditUserManagement.scss';
import checkboxChecked from '../../../../assets/images/icons/checkbox_check.png';
import checkboxNone from '../../../../assets/images/icons/checkbox_none.png';

class EditUserManagement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstlevelAgencyList: [],
      secondaryAgencyList: [],
      roleMainList: [],
      cityList: [],
      firstlevelUnitList: [],
      militarylevelList: [],
      mobilizationPlanId: null,
      mobilizationPlanList: [],
      mobilizationClassificationObject: {},
      braidingCategoryObject: {},
      formInitialValue: null,
      id: '',
      militaryAgencyList: [],
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

  setFirstlevelAgencyList = (firstlevelAgencyList) => {
    this.setState({ firstlevelAgencyList });
  };

  setSecondaryAgencyList = async (secondaryAgencyList) => {
    await this.setState({ secondaryAgencyList });
  };

  setMilitarylevelList = (militarylevelList) => {
    this.setState({ militarylevelList });
  };
  setMilitaryAgencyList = (militaryAgencyList) => {
    this.setState({ militaryAgencyList });
  };

  setRoleMainList = (roleMainList) => {
    this.setState({ roleMainList });
  };

  setCityList = (cityList) => {
    this.setState({ cityList });
  };

  setFirstlevelUnitList = async (firstlevelUnitList) => {
    await this.setState({ firstlevelUnitList });
  };

  setMobilizationPlanList = (mobilizationPlanList) => {
    this.setState({ mobilizationPlanList });
  };

  setMobilizationClassificationObject = async (
    mobilizationClassificationObject,
  ) => {
    await this.setState({ mobilizationClassificationObject });
  };

  setBraidingCategoryObject = async (braidingCategoryObject) => {
    await this.setState({ braidingCategoryObject });
  };

  setId = (id) => {
    this.setState({ id });
  };

  setFormInitialValue = (formInitialValue) => {
    this.setState({ formInitialValue });
  };

  initState = () => {
    const { props } = this;
    props.setLoading(true);
    const id = props.query.queryObject.get(QueryType.ID);
    if (id !== null) {
      this.setId(id);
      ApiService.sysUserAccount.readSysUserAccountById(id).then((response) => {
        this.initBraidingCategory(response);
        props.setLoading(false);
        // console.log('sysUserAccount', response)
        if (response.firstlevelAgencyId !== null) {
          ApiService.secondaryAgency
            .readSecondaryAgencyByFirstLevelId(response.firstlevelAgencyId)
            .then(async (agencies) => {
              // props.setLoading(false);
              const secondaryAgencyList = agencies.map((item) => ({
                text: item.shortName,
                value: item.id,
              }));
              await this.setSecondaryAgencyList(secondaryAgencyList);
            });
        }
        if (response.cityId !== null) {
          ApiService.firstlevelUnit
            .readFirstlevelUnitByCityId(response.cityId)
            .then(async (units) => {
              // props.setLoading(false);
              const firstlevelUnitList = units.map((item) => ({
                text: item.fullName,
                value: item.id,
              }));
              // console.log("firstlevelUnitList",firstlevelUnitList)
              await this.setFirstlevelUnitList(firstlevelUnitList);
            });
        }
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
    ApiService.mobilizationPlan.readMobilizationPlan().then((response) => {
      const mobilizationPlanList = response.map((item) => ({
        text: item.planName,
        value: item.id,
      }));
      this.setMobilizationPlanList(mobilizationPlanList);
    });
    ApiService.roleMain.readRoleMain().then((response) => {
      const roleMainList = response.map((item) => ({
        text: item.roleName,
        value: item.id,
      }));
      this.setRoleMainList(roleMainList);
    });
    ApiService.codefile.getMilitarylevelList().then((response) => {
      const militarylevelList = response.codefileList.map((item) => ({
        text: item.name,
        value: item.id,
      }));
      this.setMilitarylevelList(militarylevelList);
    });
    ApiService.codefile.getMilitaryAgencyList().then((response) => {
      const militaryAgencyList = response.codefileList.map((item) => ({
        text: item.name,
        value: item.id,
        militarylevelListId: item.parentcodeid,
      }));
      this.setMilitaryAgencyList(militaryAgencyList);
    });
  };

  initBraidingCategory = async (response) => {
    const { businessPlan, braidingCategoryList, braidingCategoryIdList } =
      response;
    let mobilizationPlanId;
    let mobilizationPlanList = [];
    if (businessPlan === '1') {
      mobilizationPlanList = [
        {
          mobilizationPlanId: '',
          mobilizationClassificationId: '',
          braidingCategoryIdList,
        },
      ];
    }
    if (businessPlan === '2') {
      mobilizationPlanId = response.mobilizationPlanId;
    }
    if (businessPlan === '2' || businessPlan === '3' || businessPlan === '4') {
      const mobilizationClassificationIdList = new Set([]);
      const mobilizationPlanIdList = new Set([]);
      const mobilization = braidingCategoryList.reduce((accum, current) => {
        const { id, mobilizationClassificationId, mobilizationClassification } =
          current;
        const { mobilizationPlanId } = mobilizationClassification;
        if (accum[mobilizationClassificationId] === undefined) {
          mobilizationPlanIdList.add(mobilizationPlanId);
          mobilizationClassificationIdList.add(mobilizationClassificationId);
          return {
            ...accum,
            [mobilizationClassificationId]: {
              mobilizationPlanId,
              mobilizationClassificationId,
              braidingCategoryIdList: [id],
            },
          };
        }

        return {
          ...accum,
          [mobilizationClassificationId]: {
            mobilizationPlanId,
            mobilizationClassificationId,
            braidingCategoryIdList: [
              ...accum[mobilizationClassificationId].braidingCategoryIdList,
              id,
            ],
          },
        };
      }, {});

      const planPromises = [...mobilizationPlanIdList].map((id) =>
        ApiService.mobilizationClassification
          .readMobilizationClassificationByPlanId(id)
          .then((classifications) => {
            const data = classifications.map((item) => ({
              text: item.classificationName,
              value: item.id,
            }));
            return { [id]: data };
          }),
      );

      const classificationPromises = [...mobilizationClassificationIdList].map(
        (id) =>
          ApiService.braidingCategory
            .readBraidingCategoryByClassificationId(id)
            .then((categories) => {
              const data = categories.map((item) => ({
                text: item.fullName,
                value: item.id,
                type: item.categoryType,
              }));
              return { [id]: data };
            }),
      );

      Promise.all(planPromises).then((result) => {
        const object = result.reduce(
          (accum, current) => ({
            ...accum,
            ...current,
          }),
          {},
        );
        this.setMobilizationClassificationObject(object);
      });

      Promise.all(classificationPromises).then((result) => {
        const object = result.reduce(
          (accum, current) => ({
            ...accum,
            ...current,
          }),
          {},
        );
        this.setBraidingCategoryObject(object);
      });

      mobilizationPlanList = Object.values(mobilization);
    }

    this.setFormInitialValue({
      ...response,
      mobilizationPlanId,
      mobilizationPlanList,
    });
  };

  // InputType = () => {
  //   const { isClearText } = this.state;
  //   return isClearText ? 'text' : 'password';
  // };

  // trailingIcon = () => {
  //   const { props, state } = this;
  //   return state.isClearText ? (
  //     <div className="password-toggle">
  //       <img className="checkbox" src={checkboxChecked} alt="checkbox" />
  //       <div>{props.language.register.display}</div>
  //     </div>
  //   ) : (
  //     <div className="password-toggle">
  //       <img className="checkbox" src={checkboxNone} alt="checkbox" />
  //       <div>{props.language.register.display}</div>
  //     </div>
  //   );
  // };

  handleAgencyTypeOnChanged = ({
    values,
    agencyType,
    field,
    setFieldValue,
  }) => {
    if (values.agencyType !== agencyType) {
      setFieldValue(field, agencyType);
      setFieldValue('maintainManufacturer', '');
      setFieldValue('mobilizationPlanList', [RegisterForm.template]);
      // if (agencyType === '1') {
      //   setFieldValue('mobilizationPlanList', [RegisterForm.template]);
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
      setFieldValue(field, businessPlan);
      if (businessPlan !== '5') {
        setFieldValue('mobilizationPlanList', [RegisterForm.template]);
      }
      if (businessPlan !== '1') {
        setFieldValue('mobilizationType', null);
      }
      this.handleAgencyTypeOnChanged({
        values,
        agencyType: businessPlan === '4' ? '2' : '1',
        field: 'agencyType',
        setFieldValue,
      });
    }
  };

  onSubmit = (values) => {
    const { props, state } = this;
    const ids = values.mobilizationPlanList.map((row) => row.braidingCategoryIdList).flat();
    // console.log(ids)
    const request = new SysUserAccountRequest({
      ...state.formInitialValue,
      ...values,
      braidingCategoryIdList: ids,
      mobilizationPlanId: values.mobilizationPlanId,
    });
    // console.log(request);
    const updateUserFunction = userHasRole(160)
      ? ApiService.sysUserAccount.updateSysUserAccountWithRemark
      : ApiService.sysUserAccount.updateSysUserAccount;
    updateUserFunction(state.id, request).then((response) => {
      ModalHelper.openMessageModalByStatus({
        response,
        callback: () => {
          props.history.goBack();
        },
      });
    });
  };

  handleFirstLevelAgencyOnChanged = async ({ value, field, setFieldValue }) => {
    if (value !== '') {
      await ApiService.secondaryAgency
        .readSecondaryAgencyByFirstLevelId(value)
        .then(async (response) => {
          const secondaryAgencyList = response.map((item) => ({
            text: item.shortName,
            value: item.id,
          }));
          await this.setSecondaryAgencyList(secondaryAgencyList);
        });
    }
    setFieldValue(field, value);
    setFieldValue('secondaryAgencyId', '');
    setFieldValue('department', '');
  };

  handleCityOnChanged = async ({ value, field, setFieldValue }) => {
    if (value !== '') {
      await ApiService.firstlevelUnit
        .readFirstlevelUnitByCityId(value)
        .then(async (response) => {
          const firstlevelUnitList = response.map((item) => ({
            text: item.fullName,
            value: item.id,
          }));
          await this.setFirstlevelUnitList(firstlevelUnitList);
        });
    }
    setFieldValue(field, value);
    setFieldValue('firstlevelUnitId', '');
    setFieldValue('unitName', '');
  };
  handlePlanOnChanged = async ({
    value,
    field,
    setFieldValue,
    index,
    values,
  }) => {
    const { state } = this;
    if (values.businessPlan === '2' || values.businessPlan === '3' || values.businessPlan === '4') {
      if (state.mobilizationClassificationObject[value] === undefined) {
        ApiService.mobilizationClassification
          .readMobilizationClassificationByPlanId(value)
          .then((response) => {
            const data = response.map((item) => ({
              text: item.classificationName,
              value: item.id,
            }));
            this.setMobilizationClassificationObject({
              ...state.mobilizationClassificationObject,
              [value]: data,
            });
          });
      }
      setFieldValue(
        `mobilizationPlanList.${index}.mobilizationClassificationId`,
        '',
      );
      setFieldValue(`mobilizationPlanList.${index}.braidingCategoryIdList`, []);
    } else {
      ApiService.braidingCategory
        .readBraidingCategoryByPlanId(value)
        .then((response) => {
          const idList = response.map((item) => item.id);
          setFieldValue(
            'mobilizationPlanList[0].braidingCategoryIdList',
            idList,
          );
          setFieldValue('mobilizationPlanList[0].mobilizationPlanId', value);
        });
    }
    setFieldValue(field, value);
  };

  handleMobilizationPlanOnChanged = async ({ value, setFieldValue }) => {
    setFieldValue('mobilizationPlanId', value);
  };

  handleClassificationOnChanged = async ({
    value,
    field,
    setFieldValue,
    index,
  }) => {
    const { state } = this;
    if (state.braidingCategoryObject[value] === undefined) {
      ApiService.braidingCategory
        .readBraidingCategoryByClassificationId(value)
        .then((response) => {
          const data = response.map((item) => ({
            text: item.fullName,
            value: item.id,
            type: item.categoryType,
          }));
          this.setBraidingCategoryObject({
            ...state.braidingCategoryObject,
            [value]: data,
          });
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
          display
        />
      </div>
    );
  };

  displayAgencyType = ({
    handleChange,
    values,
    setFieldValue,
    errors,
    touched,
  }) => {
    const { props, state } = this;
    // console.log('values', values)
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
        secondLevelOptions={state.secondaryAgencyList}
        thirdLevelTitle={props.language.register.department}
        thirdLevelName="department"
        thirdLevelValue={values.department}
        thirdLevelPlaceholder={props.language.register.departmentHint}
        setFieldValue={setFieldValue}
        touched={touched}
        errors={errors}
        required
        disable
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
        secondLevelOptions={state.firstlevelUnitList}
        thirdLevelTitle={props.language.register.unitName}
        thirdLevelName="unitName"
        thirdLevelValue={values.unitName}
        thirdLevelPlaceholder={props.language.register.unitNameHint}
        setFieldValue={setFieldValue}
        touched={touched}
        errors={errors}
        required
        disable
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
        required={RegisterForm.isFieldRequired('maintainManufacturer')}
      />
    ) : (
      <UnitInput
        title={props.language.register.militaryAgency}
        firstLevelTitle={props.language.register.level}
        firstLevelName="levelId"
        firstLevelValue={values.levelId}
        firstLevelPlaceholder={props.language.register.levelHint}
        firstLevelOptions={state.militarylevelList}
        firstLevelOnChanged={this.handleFirstLevelAgencyOnChanged}
        secondLevelTitle={props.language.register.militaryAgency}
        secondLevelName="militaryagencyId"
        secondLevelValue={values.militaryagencyId}
        secondLevelPlaceholder={props.language.register.militaryAgencyHint}
        secondLevelOptions={state.militaryAgencyList}
        secondLevelOnChanged={this.handleFirstLevelAgencyOnChanged}
        thirdLevelTitle={props.language.register.secondlevelmilitaryAgency}
        thirdLevelName="secondlevelMilitaryagency"
        thirdLevelValue={values.secondlevelMilitaryagency}
        thirdLevelPlaceholder={
          props.language.register.secondlevelmilitaryAgencyHint
        }
        setFieldValue={setFieldValue}
        touched={touched}
        errors={errors}
        required
        disable
      />
    );
  };

  displayMobilizationPlanCard = ({
    values,
    setFieldValue,
    errors,
    touched,
  }) => {
    if (values.businessPlan === '') return '';
    if (values.agencyType !== '') {
      return (
        <div className="mobilization-plan-card">
          {this.displayMobilizationPlanInput({
            values,
            setFieldValue,
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
    errors,
    touched,
  }) => {
    const { props, state } = this;
    AgencyType.forEach((item) => {
      if (item.value === '1') {
        item.disabled = true;
      }
      if (item.value === '2') {
        item.disabled = true;
      }
      if (item.value === '3') {
        item.disabled = true;
      }
      if (item.value === '4') {
        item.disabled = true;
      }
    });
    if (values.businessPlan === '1') {
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
              required
              display={!userHasRole(154)}
            />
          </FormRow>
        </div>
      );
    }
    return (
      <>
        {values.businessPlan === '2' && (
          <div className="contents">
            <FormSectionTitle
              title={props.language.register.mobilizationPlan}
            />
            <FormRow>
              <MobilizationPlanInput
                title={props.language.register.mobilization}
                planInputName={'mobilizationPlanId'}
                planInputValue={values.mobilizationPlanId}
                planInputPlaceholder={
                  props.language.register.mobilizationPlanIdHint
                }
                planOptions={state.mobilizationPlanList}
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
            </FormRow>
          </div>
        )}
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
                        props.language.register.mobilizationClassificationIdHint
                      }
                      classificationOptions={this.mobilizationClassificationOption(
                        content.mobilizationPlanId,
                      )}
                      classificationOnChanged={
                        this.handleClassificationOnChanged
                      }
                      hideClassification={
                        values.businessPlan !== '2' &&
                        values.businessPlan !== '3' &&
                        values.businessPlan !== '4'
                      }
                      setFieldValue={setFieldValue}
                      touched={touched}
                      errors={errors}
                      index={index}
                      required
                      display={!userHasRole(154)}
                    />
                  </FormRow>
                  {values.businessPlan === '2' ||
                  values.businessPlan === '3' ||
                  values.businessPlan === '4' ? (
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
                        display={!userHasRole(154)}
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
      </>
    );
  };

  mobilizationPlanTitle = ({ values, arrayHelpers }) => {
    const { props } = this;
    if (values.businessPlan === '2' || values.businessPlan === '3' || values.businessPlan === '4') {
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

  displayAttachment = () => {
    const { props, state } = this;
    const { sysUserAccountAppliedAttachments } = state.formInitialValue;
    return sysUserAccountAppliedAttachments.length > 0 ? (
      <div className="file-container">
        <ButtonDiv
          className="file-link"
          onClick={() => {
            props.setLoading(true);
            ApiService.sysUserAccount.downloadAttachmentFileRecord(
              sysUserAccountAppliedAttachments[0].id,
            );
          }}
        >
          {sysUserAccountAppliedAttachments[0].uploadedFileName}
        </ButtonDiv>
      </div>
    ) : (
      ''
    );
  };

  render() {
    const { props, state } = this;

    if (state.formInitialValue === null) return '';

    return (
      <Container className="edit-user-management">
        <SectionTitle
          title={props.language.systemManagement.subMenus.editUserManagement}
        />
        <Formik
          enableReinitialize
          initialValues={RegisterForm.initialValue({
            ...state.formInitialValue,
            isUpdate: true,
          })}
          validationSchema={RegisterForm.validationSchema()}
          onSubmit={this.onSubmit}
        >
          {({
            initialValues,
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
            <form onSubmit={handleSubmit} className="form" autoComplete="off">
              <FormikErrorModal isSubmitting={isSubmitting} errors={errors} />
              <div className="inputs">
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
                    inputPlaceholder={props.language.register.jobPositionHint}
                    inputValue={values.jobPosition}
                    inputOnChange={handleChange}
                    touched={touched}
                    errors={errors}
                    required={RegisterForm.isFieldRequired('jobPosition')}
                  />
                </FormRow>
                <FormRow>
                  <TextInput
                    title={props.language.register.account}
                    inputType="text"
                    inputName="account"
                    inputPlaceholder={props.language.register.accountHint}
                    inputValue={values.account}
                    inputOnChange={handleChange}
                    touched={touched}
                    errors={errors}
                    // required={RegisterForm.isFieldRequired('account')}
                    // description={props.language.register.accountDescription}
                    display
                  />
                  <FormDescription
                    leftBorder
                    title={props.language.register.password}
                    content={
                      <ButtonDiv
                        className="change-password-button"
                        onClick={() =>
                          ModalHelper.openChangePasswordModal(state.id)
                        }
                      >
                        {props.language.editUserManagement.changePassword}
                      </ButtonDiv>
                    }
                  />
                  {/* <TextInput */}
                  {/*  title={props.language.register.password} */}
                  {/*  inputType={this.InputType()} */}
                  {/*  inputName="password" */}
                  {/*  inputPlaceholder={props.language.register.passwordHint} */}
                  {/*  inputValue={values.password} */}
                  {/*  inputOnChange={handleChange} */}
                  {/*  trailingIcon={this.trailingIcon()} */}
                  {/*  iconOnClick={this.togglePassword} */}
                  {/*  touched={touched} */}
                  {/*  errors={errors} */}
                  {/*  required={RegisterForm.isFieldRequired('password')} */}
                  {/*  description={props.language.register.passwordDescription} */}
                  {/* /> */}
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
                    display
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
                    inputPlaceholder={props.language.register.businessPhoneHint}
                    inputValue={values.businessPhone}
                    extensionTitle={props.language.register.telephoneExtension}
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
                    inputPlaceholder={props.language.register.businessPlanHint}
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
                    display
                  />
                </FormRow>
                <FormRow>
                  <SelectInput
                    title={props.language.register.state}
                    inputName="state"
                    inputPlaceholder={props.language.register.stateHint}
                    inputValue={values.state}
                    setFieldValue={setFieldValue}
                    options={inputUserStateType}
                    touched={touched}
                    errors={errors}
                    required={RegisterForm.isFieldRequired('state')}
                    display={!userHasRole(154)}
                  />
                  <SelectInput
                    title={props.language.register.roleMainId}
                    inputName="roleMainId"
                    inputPlaceholder={props.language.register.roleMainIdHint}
                    inputValue={values.roleMainId}
                    setFieldValue={setFieldValue}
                    options={state.roleMainList}
                    trailingInput={
                      values.roleMainId !== '' && values.roleMainId !== null ? (
                        <ButtonDiv
                          className="access-button"
                          onClick={() =>
                            ModalHelper.openAccessModal({
                              roleId: values.roleMainId,
                            })
                          }
                        >
                          {props.language.editUserManagement.viewAccess}
                        </ButtonDiv>
                      ) : null
                    }
                    touched={touched}
                    errors={errors}
                    required={RegisterForm.isFieldRequired('roleMainId')}
                    display={!userHasRole(154)}
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
                    required={RegisterForm.isFieldRequired('appliedIpAddress')}
                    disable={!userHasRole(154)}
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
                    display={
                      !userHasRole(154) || initialValues.agencyType === '3'
                    }
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
                    inputPlaceholder={props.language.register.businessNeedsHint}
                    inputValue={values.businessNeeds}
                    inputOnChange={handleChange}
                    touched={touched}
                    errors={errors}
                    required={RegisterForm.isFieldRequired('businessNeeds')}
                    display
                  />
                </FormRow>
                {userHasRole(154) ? (
                  <FormRow>
                    <FormDescription
                      leftBorder
                      title={props.language.register.file}
                      content={this.displayAttachment()}
                    />
                  </FormRow>
                ) : (
                  ''
                )}
                <FormRow>
                  <FormDescription
                    leftBorder
                    title={
                      props.language.editUserManagement.currentBraidingList
                    }
                    content={state.formInitialValue.braidingCategoryList
                      .map((item) => item.fullName)
                      .join(', ')}
                  />
                </FormRow>
                {userHasRole(160) ? (
                  <FormRow>
                    <TextInput
                      full
                      title={props.language.editUserManagement.remark}
                      inputType="textarea"
                      inputName="remark"
                      inputPlaceholder={
                        props.language.editUserManagement.remarkHint
                      }
                      inputValue={values.remark}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                    />
                  </FormRow>
                ) : (
                  ''
                )}
                {userHasRole(154) ? (
                  <FormSectionTitle
                    title={props.language.register.otherToolsSystemAccountTitle}
                  />
                ) : (
                  ''
                )}
                {userHasRole(154) ? (
                  <FormRow>
                    <TextInput
                      title={props.language.register.ztacc}
                      inputType="text"
                      inputName="ztacc"
                      inputPlaceholder={props.language.register.ztaccHint}
                      inputValue={values.ztacc}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                    />
                    <TextInput
                      title={props.language.register.pamacc}
                      inputType="text"
                      inputName="pamacc"
                      inputPlaceholder={props.language.register.pamaccHint}
                      inputValue={values.pamacc}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                    />
                  </FormRow>
                ) : (
                  ''
                )}
                {userHasRole(154) ? (
                  <FormRow>
                    <TextInput
                      title={props.language.register.splacc}
                      inputType="text"
                      inputName="splacc"
                      inputPlaceholder={props.language.register.splaccHint}
                      inputValue={values.splacc}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                    />
                    <TextInput
                      title={props.language.register.toacc}
                      inputType="text"
                      inputName="toacc"
                      inputPlaceholder={props.language.register.toaccHint}
                      inputValue={values.toacc}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                    />
                  </FormRow>
                ) : (
                  ''
                )}
                {this.displayMobilizationPlanCard({
                  values,
                  setFieldValue,
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
                    {props.language.editUserManagement.save}
                  </ButtonDiv>
                </div>
              </div>
            </form>
          )}
        </Formik>
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

EditUserManagement.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditUserManagement),
);
