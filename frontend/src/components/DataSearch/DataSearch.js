import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ButtonDiv from '../../lib/components/ButtonDiv/ButtonDiv';
import Container from '../../lib/components/Container/Container';
import DateInput from '../../lib/components/inputs/DateInput/DateInput';
import MultiTableSearch from '../../lib/components/MultiTableSearch/MultiTableSearch';
import SelectInput from '../../lib/components/inputs/SelectInput/SelectInput';
import Table from '../../lib/components/Table/Table';
// import TableCount from '../../lib/components/TableCount/TableCount';
import TextInput from '../../lib/components/inputs/TextInput/TextInput';
import PageTitle from '../../lib/components/PageTitle/PageTitle';
import { setLoading } from '../../store/loading/slice';
import ApiService from '../../utils/api/ApiService';
import ApprovalStatusType from '../../utils/constants/ApprovalStatusType';
import DataSearchTable from '../../utils/tables/dataSearch/DataSearchTable/DataSearchTable';
import InformationRetrievalService from '../../utils/api/instances/InformationRetrieval/service';
import ModalHelper from '../../utils/helper/ModalHelper';
import { userHasRole } from '../../utils/auth/auth';
import './DataSearch.scss';
import TableCount2 from '../../lib/components/TableCount/TableCount2';
import ExcelJS from 'exceljs';
import DataSearchConfig from '../../utils/config/dataSearch/dataSearchConfig';
import DateHelper from '../../utils/helper/DateHelper';

class DataSearch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      planList: [],
      planId: '',
      classificationList: [],
      classificationId: '',
      searchTitle: '',
      startDate: '',
      endDate: '',
      status: '',
      tableData: [],
      filteredTableData: [],
    };
    this.table = new DataSearchTable();
  }

  componentDidMount() {
    const { props } = this;
    props.setLoading(true);
    ApiService.braidingCategory
      .readBraidingCategory()
      .then((braidingList) => {
        // console.log(braidingList);
        InformationRetrievalService.getInformationRetrieval({
          braidingList,
        }).then((response) => {
          // console.log('getInformationRetrieval', response.dataList);
          response.dataList = response.dataList.sort((a, b) => a.sort - b.sort);
          response.dataList = response.dataList.map((item, index) => ({
            ...item,
            type: item.type == '人力' ? '編管人力' : '編管物力',
            sort2: index + 1,
            updatedAtString: item.transmissionDate
              ? item.transmissionDate.substring(0, 10)
              : '',
          }));
          ApiService.braidingCategoryPlan
            .getBraidingCategoryPlanList()
            .then((res) => {
              const braidingMap = new Map();
              for (let data of response.dataList) {
                braidingMap.set(Number(data.code), data);
              }
              const braidingCategoryPlanList = res.braidingCategoryPlanList;
              for (let braidingCategoryPlan of braidingCategoryPlanList) {
                const braidingCategoryId =
                  braidingCategoryPlan.braidingCategoryId;
                if (braidingMap.has(braidingCategoryId)) {
                  const braiding = braidingMap.get(braidingCategoryId);
                  // console.log(braidingCategoryPlan)
                  let type = '演訓人力';
                  if (
                    braidingCategoryPlan.code == '941' ||
                    braidingCategoryPlan.code == '943'
                  ) {
                    type = '演訓物力';
                  }
                  let updatedAtDateObject =
                    braidingCategoryPlan.transmissionDate
                      ? braidingCategoryPlan.transmissionDate.substring(0, 10)
                      : '';
                  const configItem = DataSearchConfig.find(
                    (config) => config.code === braidingCategoryPlan.code,
                  );
                  // console.log(braidingCategoryPlan,configItem)
                  const newBraidingPlan = {
                    id: configItem.id,
                    type: type,
                    name: braidingCategoryPlan.fullName,
                    name2: braiding.name,
                    sort: braidingCategoryPlan.sort,
                    mobilizationPlanId: braiding.mobilizationPlanId,
                    mobilizationPlan: braiding.mobilizationPlan,
                    mobilizationClassification:
                      braiding.mobilizationClassification,
                    mobilizationClassificationId:
                      braiding.mobilizationClassificationId,
                    code: braidingCategoryPlan.code,
                    updateCycle: '不定期',
                    braidingNum: '-',
                    systemNum: braidingCategoryPlan.systemNum,
                    updatedAtString: updatedAtDateObject,
                    approvalStatus: '未確認',
                    approvalStatusValue: '2',
                    // mobilizationAgency: braiding.mobilizationAgency,
                  };
                  // console.log(newBraidingPlan)
                  response.dataList.push(newBraidingPlan);
                }
              }
              response.dataList = response.dataList.sort(
                (a, b) => a.sort - b.sort,
              );
              // console.log(response.dataList)
              this.setTableData(response.dataList);
              this.setFilteredTableData(response.dataList);
            });
        });
      })
      .catch(() => {
        props.setLoading(false);
      });
    ApiService.mobilizationPlan.readMobilizationPlan().then((response) => {
      const mobilizationPlanList = response.map((item) => ({
        text: item.planName,
        value: item.id,
      }));
      this.setPlanList(mobilizationPlanList);
    });
  }

  setPlanList = (planList) => {
    this.setState({ planList });
  };

  setPlanId = (planId) => {
    this.setState({ planId });
  };

  setClassificationList = (classificationList) => {
    this.setState({ classificationList });
  };

  setClassificationId = (classificationId) => {
    this.setState({ classificationId });
  };

  setSearchTitle = (searchTitle) => {
    this.setState({ searchTitle });
  };

  setStartDate = (startDate) => {
    this.setState({ startDate });
  };

  setEndDate = (endDate) => {
    this.setState({ endDate });
  };

  setStatus = (status) => {
    this.setState({ status });
  };

  setTableData = (tableData) => {
    this.setState({ tableData });
  };

  setFilteredTableData = (filteredTableData) => {
    const { props } = this;
    const data = filteredTableData.map((item, index) => ({
      ...item,
      index: index + 1,
    }));
    this.setState({ filteredTableData: data });
    props.setLoading(false);
  };

  handlePlanOnChanged = (value) => {
    const { state } = this;
    // console.log(value)
    if (state.planId !== value) {
      if (value === '') {
        this.setFilteredTableData(state.tableData);
      } else {
        const filterList = state.tableData.filter(
          (item) => item !== null && item.mobilizationPlanId === value,
        );
        this.setFilteredTableData(filterList);
        ApiService.mobilizationClassification
          .readMobilizationClassificationByPlanId(value)
          .then((response) => {
            const data = response.map((item) => ({
              text: item.classificationName,
              value: item.id,
            }));
            this.setClassificationList(data);
          });
      }
      this.setClassificationId('');
      this.setPlanId(value);
    }
  };

  handleClassificationOnChanged = (value) => {
    const { state } = this;
    // console.log(value)
    if (state.classificationId !== value) {
      let filterList;
      if (value === '') {
        filterList = state.tableData.filter(
          (item) => item !== null && item.mobilizationPlanId === state.planId,
        );
      } else {
        filterList = state.tableData.filter(
          (item) => item.mobilizationClassificationId === value,
        );
      }
      this.setFilteredTableData(filterList);
      this.setClassificationId(value);
    }
  };

  searchInput = () => {
    const { props, state } = this;
    return (
      <div className="search-containers">
        <div className="text-containers">
          <TextInput
            title=""
            inputName=""
            inputPlaceholder={props.language.dataSearch.searchTitleHint}
            inputValue={state.searchTitle}
            inputOnChange={(event) => this.setSearchTitle(event.target.value)}
            zenMode
          />
          <SelectInput
            title=""
            inputName=""
            inputPlaceholder={props.language.dataSearch.statusHint}
            inputValue={state.status}
            setFieldValue={(field, value) => this.setStatus(value)}
            options={ApprovalStatusType}
            zenMode
          />
        </div>
        <div className="date-containers">
          <DateInput
            title=""
            inputName=""
            inputPlaceholder={props.language.dataSearch.startDateHint}
            inputValue={state.startDate}
            setFieldValue={(field, value) => this.setStartDate(value)}
            maxDate={state.endDate || new Date()}
            zenMode
          />
          <DateInput
            title=""
            inputName=""
            inputPlaceholder={props.language.dataSearch.endDateHint}
            inputValue={state.endDate}
            setFieldValue={(field, value) => this.setEndDate(value)}
            minDate={state.startDate}
            maxDate={new Date()}
            zenMode
          />
        </div>
      </div>
    );
  };

  resetSearch = () => {
    this.setSearchTitle('');
    this.setStartDate('');
    this.setEndDate('');
    this.setStatus('');
  };

  search = () => {
    const { props, state } = this;
    props.setLoading(true);
    // TODO: use search state to filter table data...
    // TODO: respect plan and classification id...
    //console.log(state.tableData);
    const filterList = state.tableData.filter(
      (item) =>
        item.name.includes(state.searchTitle) &&
        (state.status === '' || state.status === item.approvalStatusValue) &&
        (state.startDate === '' ||
          state.startDate === null ||
          item.updatedAtDateObject >= state.startDate) &&
        (state.endDate === '' ||
          state.endDate === null ||
          item.updatedAtDateObject <= DateHelper.addDays(state.endDate, 1)) &&
        (item.mobilizationPlanId === state.planId || state.planId === '') &&
        (item.mobilizationClassificationId === state.classificationId ||
          state.classificationId === ''),
    );
    this.setFilteredTableData(filterList);
  };

  openApproveModal = () => {
    ModalHelper.openAcceptModal();
  };
  exportToExcel = async () => {
    const { props } = this;
    const currentDate = new Date();
    props.setLoading(true);
    const result = await ApiService.fileUpload.getExcelTable();
    props.setLoading(false);

    const name2Mapping = {
      煤: result.data.cdays,
      油: result.data.odays,
      氣: result.data.gdays,
      藥品醫材: result.data.mpeoplenum,
      糧食: result.data.fdays,
      水庫設施: result.data.rname,
      輻射防護: result.data.rnum,
      榮家安養機構: result.data.vbed,
      淨水設施: result.data.wpnum,
      支援化學戰劑防護: result.data.c_pnum,
    };

    const braidingData = [];
    const trainingData = [];

    this.state.filteredTableData.forEach((item) => {
      const transmissionDate = new Date(item.transmissionDate);
      const differenceInDays =
        (currentDate - transmissionDate) / (1000 * 60 * 60 * 24);
      const updateCycleInDays = item.updateCycle * 30;
      const excelItem = {
        區分: item.type,
        編管類別: item.name2,
        動員方案: item.mobilizationPlan,
        動員分類: item.mobilizationClassification,
        中央主管機關: item.mobilizationAgency,
        '更新週期(月)': item.updateCycle,
        計畫編管數: item.braidingNum,
        系統數據: item.type.startsWith('編管')
          ? name2Mapping[item.name2] || item.systemNum
          : item.systemNum,
        確認狀態: item.approvalStatus,
        資料異動日期: item.updatedAtString,
      };

      if (item.type.startsWith('編管')) {
        excelItem.單位 = item.unit ?? ''; // 只在編管資料中加入單位
        if (differenceInDays > updateCycleInDays) {
          excelItem.更新狀態 = '逾期';
        }
        if (Number(item.braidingNum) * 0.8 > Number(item.systemNum)) {
          excelItem.資料差異 =
            Number(item.braidingNum) - Number(item.systemNum);
        }
        braidingData.push(excelItem);
      } else {
        if (differenceInDays > updateCycleInDays) {
          excelItem.更新狀態 = '逾期';
        }
        if (Number(item.braidingNum) * 0.8 > Number(item.systemNum)) {
          excelItem.資料差異 =
            Number(item.braidingNum) - Number(item.systemNum);
        }
        trainingData.push(excelItem);
      }
    });

    const workbook = new ExcelJS.Workbook();
    const braidingHeaders = [
      '區分',
      '編管類別',
      '動員方案',
      '動員分類',
      '中央主管機關',
      '更新週期(月)',
      '計畫編管數',
      '系統數據',
      '單位',
      '確認狀態',
      '資料異動日期',
      '更新狀態',
      '資料差異',
    ];
    const trainingHeaders = [
      '區分',
      '編管類別',
      '動員方案',
      '動員分類',
      '中央主管機關',
      '更新週期(月)',
      '計畫編管數',
      '系統數據',
      '確認狀態',
      '資料異動日期',
      '更新狀態',
      '資料差異',
    ];

    const braidingWorksheet = workbook.addWorksheet('編管資料');
    braidingWorksheet.columns = braidingHeaders.map((header) => ({
      header,
      key: header,
    }));
    braidingData.forEach((row) => braidingWorksheet.addRow(row));
    braidingWorksheet.columns.forEach((column) => {
      column.width = column.header.length + 5;
    });

    const trainingWorksheet = workbook.addWorksheet('演訓資料');
    trainingWorksheet.columns = trainingHeaders.map((header) => ({
      header,
      key: header,
    }));
    trainingData.forEach((row) => trainingWorksheet.addRow(row));
    trainingWorksheet.columns.forEach((column) => {
      column.width = column.header.length + 5;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = '資料態樣統計表.xlsx';
    link.click();
  };

  render() {
    const { props, state } = this;
    // console.log('planId', state.planId);
    return (
      <div className="data-search">
        <Container breadcrumb={false}>
          <PageTitle title={props.language.dataSearch.subMenus.dataSearch} />
          <div className="mobilization-container">
            <SelectInput
              title={props.language.dataSearch.planId}
              inputName=""
              inputPlaceholder={props.language.dataSearch.planIdHint}
              inputValue={state.planId}
              setFieldValue={(field, value) => this.handlePlanOnChanged(value)}
              options={state.planList}
            />
            <SelectInput
              title={props.language.dataSearch.classificationId}
              inputName=""
              inputPlaceholder={props.language.dataSearch.classificationIdHint}
              inputValue={state.classificationId}
              setFieldValue={(field, value) =>
                this.handleClassificationOnChanged(value)
              }
              options={state.classificationList}
            />
            <div className="approve-button-container">
              <ButtonDiv
                className="approve-button"
                onClick={this.openApproveModal}
                display={userHasRole(36) && userHasRole(37)}
              >
                {props.language.dataSearch.approve}
              </ButtonDiv>
              <ButtonDiv
                className="approve-button"
                onClick={this.exportToExcel}
              >
                統計表
              </ButtonDiv>
            </div>
          </div>
          <MultiTableSearch
            searchInput={this.searchInput()}
            resetFunction={this.resetSearch}
            searchFunction={this.search}
          />
          <TableCount2 count={state.filteredTableData.length} />
          <Table
            data={state.filteredTableData}
            columns={this.table.getTableHeader()}
          />
          {/* <Pagination */}
          {/*  tableInstance={this.table} */}
          {/*  currentPage={this.table.currentPage} */}
          {/*  totalPage={this.table.totalPage} */}
          {/* /> */}
        </Container>
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

DataSearch.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataSearch);
