import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ContactItem from './ContactItem/ContactItem';
import Container from '../../../lib/components/Container/Container';
import PageTitle from '../../../lib/components/PageTitle/PageTitle';
import MaintainManufacturerContact from './MaintainManufacturerContact/MaintainManufacturerContact';
import { setLoading } from '../../../store/loading/slice';
import ContactInformationConfig from '../../../utils/config/ContactInformationConfig';

import './ContactInformation.scss';
import ContactInfomationTable from '../../../utils/tables/retrievalService/ContactInformation/ContactInformationTable.js';
import TableCount from '../../../lib/components/TableCount/TableCount.js';
import Table from '../../../lib/components/Table/Table.js';
import Pagination from '../../../lib/components/Pagination/Pagination.js';
import QueryHelper from '../../../utils/helper/QueryHelper.js';
import MultiTableSearch from '../../../lib/components/MultiTableSearch/MultiTableSearch.js';
import TextInput from '../../../lib/components/inputs/TextInput/TextInput.js';
import { contactAgencyType } from '../../../utils/constants/AgencyType.js';
import SelectInput from '../../../lib/components/inputs/SelectInput/SelectInput.js';
import ApiService from '../../../utils/api/ApiService.js';
import MultipleSelectInput from '../../../lib/components/inputs/MultipleSelectInput/MultipleSelectInput.js';
import booleanType from '../../../utils/constants/BooleanType.js';
import ButtonDiv from '../../../lib/components/ButtonDiv/ButtonDiv.js';
import { deleteItemFromSelectList } from '../../../store/table/slice.js';
import ExcelJS from 'exceljs';

class ContactInformation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contactInformationConfig: ContactInformationConfig,
      name: '',
      jobPosition: '',
      workPlace: '',
      agencyName: '',
      type: '',
      second: '',
      selectedValue: '',
      mobilizationPlanText: '',
      mobilizationPlan: 0,
      mobilizationClassification: 0,
      braidingCategory: 0,
      selectedMaintainManufacturer: false,
      isSearch: false,
      tableData: [],
      typeOptions: [],
      secondOptions: [],
      mobilizationClassificationOptions: [],
      braidingCategoryOptions: [],
      firstlevelAgencyList: [],
      secondaryAgencyList: [],
      cityList: [],
      firstlevelUnitList: [],
      militarylevelList: [],
      militaryAgencyList: [],
      mobilizationPlanList: [],
      mobilizationClassificationList: [],
      braidingCategoryList: [],
      tableCount: 0,
    };
    this.table = new ContactInfomationTable(
      this.setTableData,
      this.setTableCount,
    );
  }

  componentDidMount = () => {
    const { props } = this;
    // props.setLoading(true);
    this.initState();
    this.table.fetchTableData();
    const contactInformationConfig = ContactInformationConfig.filter(
      (item) => item.id !== 11,
    );
    this.setContactInformationConfig(contactInformationConfig);
  };

  setContactInformationConfig = (contactInformationConfig) => {
    this.setState({ contactInformationConfig });
  };

  setTableData = (tableData) => {
    const { props, state } = this;
    // console.log(state.mobilizationPlan);
    // console.log(state.mobilizationClassification);
    // console.log(state.braidingCategory);
    // console.log(tableData);
    const data = tableData.map((item, index) => ({
      ...item,
      index: index + this.table.currentSkip() + 1,
    }));
    this.setState({ tableData: data });
    props.setLoading(false);
  };

  setTableCount = (tableCount) => {
    this.setState({ tableCount });
  };

  setName = (name) => {
    this.setState({ name });
  };

  setJobPosition = (jobPosition) => {
    this.setState({ jobPosition });
  };

  setWorkPlace = (workPlace) => {
    this.setState({ workPlace });
  };

  setAgencyName = (value) => {
    this.setState({ agencyName: value }, this.updateTypeOptions);
  };

  setType = (value) => {
    this.setState({ type: value }, this.updateSecondOptions);
  };

  setSecond = (second) => {
    this.setState({ second });
  };

  setSelectedValue = (selectedValue) => {
    this.setState({ selectedValue });
  };

  setMobilizationPlanText = (mobilizationPlanText) => {
    this.setState(
      { mobilizationPlanText },
      this.updateMobilizationClassificationOptions,
    );
  };

  // setMobilizationPlan = (mobilizationPlan) => {
  //   this.setState(
  //     { mobilizationPlan },
  //     this.updateMobilizationClassificationOptions,
  //   );
  // };

  setMobilizationClassification = (mobilizationClassification) => {
    this.setState(
      { mobilizationClassification },
      this.updateBraidingCategoryOptions,
    );
  };

  // setBraidingCategory = (braidingCategory) => {
  //   this.setState({ braidingCategory });
  // };

  setFirstlevelAgencyList = (firstlevelAgencyList) => {
    this.setState({ firstlevelAgencyList });
  };

  setSecondaryAgencyList = async (secondaryAgencyList) => {
    await this.setState({ secondaryAgencyList });
  };

  setCityList = (cityList) => {
    this.setState({ cityList });
  };

  setFirstlevelUnitList = (firstlevelUnitList) => {
    this.setState({ firstlevelUnitList });
  };

  setMilitarylevelList = (militarylevelList) => {
    this.setState({ militarylevelList });
  };

  setMilitaryAgencyList = (militaryAgencyList) => {
    this.setState({ militaryAgencyList });
  };

  setBraidingCategoryList = (braidingCategoryList) => {
    this.setState({ braidingCategoryList });
  };

  setMobilizationClassificationList = (mobilizationClassificationList) => {
    this.setState({ mobilizationClassificationList });
  };
  setMobilizationPlanList = (mobilizationPlanList) => {
    this.setState({ mobilizationPlanList });
  };

  initState = () => {
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
    ApiService.city.readCity().then((response) => {
      const cityList = response.map((item) => ({
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
    ApiService.mobilizationClassification
      .getMobilizationClassificationList()
      .then((response) => {
        const mobilizationClassificationList =
          response.mobilizationClassificationList.map((item) => ({
            text: item.classificationName,
            value: item.id,
            mobilizationPlanId: item.mobilizationPlanId,
            mobilizationPlanName: item.mobilizationPlanName,
          }));
        this.setMobilizationClassificationList(mobilizationClassificationList);
      });
    ApiService.mobilizationPlan.getMobilizationPlanList().then((response) => {
      const mobilizationPlanList = response.mobilizationPlanList.map(
        (item) => ({
          text: item.planName,
          value: item.id,
        }),
      );
      this.setMobilizationPlanList(mobilizationPlanList);
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
      this.setBraidingCategoryList(braidingCategoryList);
    });
  };

  updateTypeOptions = () => {
    const { agencyName } = this.state;
    const optionsMap = {
      1: this.state.firstlevelAgencyList,
      2: this.state.cityList,
      4: this.state.militarylevelList,
    };
    this.setType('');
    this.setSecond('');
    this.setState({
      typeOptions: optionsMap[agencyName] || [],
    });
  };

  updateSecondOptions = () => {
    const { agencyName, type } = this.state;
    const optionsMap = {
      1: this.state.secondaryAgencyList.filter(
        (item) => item.firstlevelAgencyId === type,
      ),
      2: this.state.firstlevelUnitList.filter((item) => item.cityId === type),
      4: this.state.militaryAgencyList.filter(
        (item) => item.militarylevelListId === type,
      ),
    };
    this.setState({
      secondOptions: optionsMap[agencyName] || [],
    });
  };

  updateMobilizationClassificationOptions = () => {
    const { mobilizationPlanText } = this.state;
    const optionsMap = mobilizationPlanText
      ? this.state.mobilizationClassificationList.filter(
          (item) => item.mobilizationPlanName === mobilizationPlanText,
        )
      : this.state.mobilizationClassificationList;
    this.setState({
      mobilizationClassificationOptions: optionsMap || [],
    });
  };

  // updateBraidingCategoryOptions = () => {
  //   const { mobilizationClassification } = this.state;
  //   const optionsMap = this.state.braidingCategoryList.filter(
  //     (item) =>
  //       item.mobilizationClassificationId === mobilizationClassification,
  //   );
  //   this.setState({
  //     braidingCategoryOptions: optionsMap || [],
  //   });
  // };

  handleChange = (event) => {
    this.setSelectedValue(event.target.value === 'true');
  };

  displaySearchInput = () => {
    const { state, props } = this;
    const mobilizationPlanTextList = [
      { text: '行政院動員會報', value: 1 },
      { text: '地方政府動員會報', value: 2 },
      { text: '戰綜會報', value: 3 },
      ...state.mobilizationPlanList,
    ];
    const updatedMobilizationPlanTextList = mobilizationPlanTextList.map(
      (item) => ({
        ...item,
        value: item.text,
      }),
    );
    return (
      <>
        <div className="text-containers">
          <TextInput
            title=""
            inputName=""
            inputPlaceholder="姓名"
            inputValue={state.name}
            inputOnChange={(event) => this.setName(event.target.value)}
            zenMode
          />
          <TextInput
            title=""
            inputName=""
            inputPlaceholder="職稱"
            inputValue={state.jobPosition}
            inputOnChange={(event) => this.setJobPosition(event.target.value)}
            zenMode
          />
          <TextInput
            title=""
            inputName=""
            inputPlaceholder="單位"
            inputValue={state.workPlace}
            inputOnChange={(event) => this.setWorkPlace(event.target.value)}
            zenMode
          />
        </div>
        <div className="text-containers">
          <SelectInput
            title=""
            inputName=""
            inputPlaceholder="單位類型"
            inputValue={state.agencyName}
            options={contactAgencyType}
            setFieldValue={(field, value) => this.setAgencyName(value)}
            zenMode
          />
          <SelectInput
            title=""
            inputName=""
            inputPlaceholder=""
            inputValue={state.type}
            options={state.typeOptions}
            setFieldValue={(field, value) => this.setType(value)}
            zenMode
          />
          <SelectInput
            title=""
            inputName=""
            inputPlaceholder=""
            inputValue={state.second}
            options={state.secondOptions}
            setFieldValue={(field, value) => this.setSecond(value)}
            zenMode
          />
          <div className="is-plan-sponsor">
            <div>{props.language.register.isPlansponsorDescription}</div>
            {booleanType.map((option, index) => (
              <label key={index} style={{ marginRight: '10px' }}>
                <input
                  type="radio"
                  name="boolean"
                  value={option.value}
                  checked={state.selectedValue === option.value}
                  onChange={this.handleChange}
                />
                {option.text}
              </label>
            ))}
          </div>
          <SelectInput
            title=""
            inputName=""
            inputPlaceholder="業務計畫別"
            inputValue={state.mobilizationPlanText}
            options={updatedMobilizationPlanTextList}
            setFieldValue={(field, value) =>
              this.setMobilizationPlanText(value)
            }
            zenMode
          />
          <SelectInput
            title=""
            inputName=""
            inputPlaceholder="動員分類"
            inputValue={state.mobilizationClassification}
            options={state.mobilizationClassificationOptions}
            setFieldValue={(field, value) =>
              this.setMobilizationClassification(value)
            }
            zenMode
          />
        </div>
      </>
    );
  };

  contains = (name, value) => {
    const field = Array.isArray(name) ? name.join('.') : name;
    return `contains(${field}, ${value})`;
  };

  search = () => {
    const { props, state } = this;
    const queryList = [this.table.queryPrefix()];
    state.selectedMaintainManufacturer = false;
    state.isSearch = true;
    props.setLoading(true);
    if (state.name !== '') {
      queryList.push(QueryHelper.contains('name', state.name, 'string'));
    }
    if (state.jobPosition !== '') {
      queryList.push(
        QueryHelper.contains('jobPosition', state.jobPosition, 'string'),
      );
    }
    if (state.workPlace !== '') {
      queryList.push(
        QueryHelper.contains('workPlace', state.workPlace, 'string'),
      );
    }
    if (state.selectedValue !== '') {
      queryList.push(
        QueryHelper.equal('isPlansponsor', state.selectedValue, 'boolean'),
      );
    }
    // if (state.mobilizationPlan != 0) {
    //   const mobilizationPlanId = Number(state.mobilizationPlan);
    //   queryList.push(
    //     QueryHelper.equal(
    //       [
    //         'braidingCategories',
    //         'some',
    //         'mobilizationClassification',
    //         'mobilizationPlanId',
    //       ],
    //       mobilizationPlanId,
    //       'number',
    //     ),
    //   );
    // }
    if (state.mobilizationClassification != 0) {
      const mobilizationClassificationId = Number(
        state.mobilizationClassification,
      );
      queryList.push(
        QueryHelper.equal(
          ['braidingCategories', 'some', 'mobilizationClassificationId'],
          mobilizationClassificationId,
          'number',
        ),
      );
    }
    // if (state.braidingCategory != 0) {
    //   const categoryId = Number(state.braidingCategory);
    //   queryList.push(
    //     QueryHelper.equal(
    //       ['braidingCategories', 'some', 'id'],
    //       categoryId,
    //       'number',
    //     ),
    //   );
    // }
    if (state.agencyName !== '') {
      queryList.push(
        QueryHelper.contains('agencyType', state.agencyName, 'string'),
      );
      if (state.agencyName == '1') {
        if (state.type !== '') {
          queryList.push(
            QueryHelper.equal('firstlevelAgencyId', state.type, 'number'),
          );
        }
        if (state.second !== '') {
          queryList.push(
            QueryHelper.equal('secondaryAgencyId', state.second, 'number'),
          );
        }
      }
      if (state.agencyName == '2') {
        if (state.type !== '') {
          queryList.push(QueryHelper.equal('cityId', state.type, 'number'));
        }
        if (state.second !== '') {
          queryList.push(
            QueryHelper.equal('firstlevelUnitId', state.second, 'number'),
          );
        }
      }
      if (state.agencyName == '4') {
        if (state.type !== '') {
          queryList.push(QueryHelper.equal('levelId', state.type, 'string'));
        }
        if (state.second !== '') {
          queryList.push(
            QueryHelper.equal('militaryagencyId', state.second, 'string'),
          );
        }
      }
    }
    if (state.mobilizationPlanText != '') {
      queryList.push(
        QueryHelper.contains(
          'mobilizationPlanText',
          state.mobilizationPlanText,
          'string',
        ),
      );
    }
    this.table.query = QueryHelper.singleQuery(
      QueryHelper.andQuery([...queryList]),
    );
    this.table.currentPage = 1;
    this.table.queryTableData();
  };

  searchMaintainManufacturer = () => {
    const { props, state } = this;
    const queryList = [this.table.queryPrefix()];
    state.selectedMaintainManufacturer = true;
    state.isSearch = false;
    props.setLoading(true);
    if (state.name !== '') {
      queryList.push(QueryHelper.contains('name', state.name, 'string'));
    }
    if (state.jobPosition !== '') {
      queryList.push(
        QueryHelper.contains('jobPosition', state.jobPosition, 'string'),
      );
    }
    if (state.workPlace !== '') {
      queryList.push(
        QueryHelper.contains('workPlace', state.workPlace, 'string'),
      );
    }
    if (state.selectedValue !== '') {
      queryList.push(
        QueryHelper.equal('isPlansponsor', state.selectedValue, 'boolean'),
      );
    }
    queryList.push(QueryHelper.contains('agencyType', '3', 'string'));
    this.table.query = QueryHelper.singleQuery(
      QueryHelper.andQuery([...queryList]),
    );
    this.table.currentPage = 1;
    this.table.queryTableData();
  };

  resetSearch = () => {
    const { props, state } = this;
    this.setName('');
    this.setJobPosition('');
    this.setWorkPlace('');
    this.setSelectedValue('');
    this.setAgencyName('');
    this.setType('');
    this.setSecond('');
    // this.setMobilizationPlanList('');
    // this.setMobilizationPlan(0);
    this.setMobilizationClassification(0);
    state.mobilizationPlanText = '';
    state.selectedMaintainManufacturer = false;
    state.isSearch = false;
    props.setLoading(true);
    this.table.fetchTableData();
  };

  exportToExcel = async () => {
    const { state } = this;
    const formData = new FormData();
    if (state.isSearch) {
      if (state.name) {
        formData.append('name', state.name);
      }
      if (state.jobPosition) {
        formData.append('jobPosition', state.jobPosition);
      }
      if (state.workPlace) {
        formData.append('workPlace', state.workPlace);
      }
      if (state.agencyName) {
        formData.append('agencyType', state.agencyName);
      }
      if (state.type) {
        formData.append('type', state.type);
      }
      if (state.second) {
        formData.append('second', state.second);
      }
      if (state.selectedValue) {
        formData.append('selectedValue', state.selectedValue);
      }
      if (state.mobilizationPlanText) {
        formData.append('mobilizationPlanText', state.mobilizationPlanText);
      }
    }
    formData.append(
      'selectedMaintainManufacturer',
      state.selectedMaintainManufacturer,
    );

    const response = await ApiService.sysUserAccount.getContactUser(formData);
    // console.log(response.data);
    let filteredCategories = response.data;
    if (
      state.isSearch &&
      state.mobilizationClassification != 0 &&
      state.selectedMaintainManufacturer == false
    ) {
      filteredCategories = filteredCategories.filter((category) =>
        category.braiding_categories.some(
          (braiding) =>
            braiding.mobilization_classification_id ===
            state.mobilizationClassification,
        ),
      );
    }
    const excelData = filteredCategories.map((item) => {
      if (item.agency_type == '1') item.agency_type = '中央機關';
      else if (item.agency_type == '2') item.agency_type = '地方政府';
      else if (item.agency_type == '3') item.agency_type = '維護廠商';
      else if (item.agency_type == '4') item.agency_type = '國軍單位';

      if (item.state == '1') item.state = '啟用';
      else if (item.state == '2') item.state = '鎖定';
      else if (item.state == '3') item.state = '停用';

      if (item.telephone_extension) {
        item.business_phone =
          item.business_phone + '-' + item.telephone_extension;
      }

      return {
        姓名: item.name,
        啟用狀態: item.state,
        職稱: item.job_position,
        單位類型: item.agency_type,
        單位: item.work_place,
        連絡電話: item.business_phone,
        信箱: item.email,
        業務計畫別: item.mobilization_plan_text,
      };
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('統計表');
    const headers = [
      '姓名',
      '啟用狀態',
      '職稱',
      '單位類型',
      '單位',
      '連絡電話',
      '信箱',
      '業務計畫別',
    ];
    worksheet.columns = headers.map((header) => ({ header, key: header }));
    excelData.forEach((row) => worksheet.addRow(row));
    worksheet.columns.forEach((column) => {
      column.width = column.header.length + 5;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = '聯絡資訊統計表.xlsx';
    link.click();
  };

  // setContactInformationConfig = (contactInformationConfig) => {
  //   this.setState({ contactInformationConfig });
  // };

  render() {
    const { props, state } = this;

    return (
      <Container breadcrumb={false}>
        <div className="contact-information">
          <PageTitle
            title={props.language.retrievalService.subMenus.contactInformation}
          />
          <MultiTableSearch
            searchInput={this.displaySearchInput()}
            searchFunction={this.search}
            resetFunction={this.resetSearch}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TableCount count={state.tableCount} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <ButtonDiv
                className="approve-button"
                onClick={this.searchMaintainManufacturer}
              >
                系統廠商
              </ButtonDiv>
              <ButtonDiv
                className="approve-button"
                onClick={this.exportToExcel}
              >
                統計表
              </ButtonDiv>
            </div>
          </div>
          <Table data={state.tableData} columns={this.table.getTableHeader()} />
          <Pagination
            tableInstance={this.table}
            totalPage={this.table.totalPage}
            currentPage={this.table.currentPage}
          />
          {/* <MaintainManufacturerContact></MaintainManufacturerContact>
          <div className="contact-information-container">
            {state.contactInformationConfig.map((item) => (
              <ContactItem
                key={item.id}
                id={item.id}
                logo={item.logo}
                contactIcon={item.contactIcon}
                unitName={item.unitName}
                shortName={item.shortName}
                colorName={item.color}
              />
            ))}
          </div> */}
          {/* <div className="contact-information-left">
            {state.contactInformationConfig
              .filter((item) => item.id == 12)
              .map((item) => (
                <ContactItem
                  key={item.id}
                  id={item.id}
                  logo={item.logo}
                  contactIcon={item.contactIcon}
                  unitName={item.unitName}
                  shortName={item.shortName}
                  colorName={item.color}
                />
              ))}
          </div> */}
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

ContactInformation.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContactInformation),
);
