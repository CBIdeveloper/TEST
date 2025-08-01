import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from '../../lib/components/Container/Container';
import SelectInput from '../../lib/components/inputs/SelectInput/SelectInput';
import Table from '../../lib/components/Table/Table';
import PageTitle from '../../lib/components/PageTitle/PageTitle';
import { setLoading } from '../../store/loading/slice';
import ApiService from '../../utils/api/ApiService';
import CloudDataTable from '../../utils/tables/dataSearch/CloudDataTable/CloudDataTable';
import InformationRetrievalService from '../../utils/api/instances/InformationRetrieval/service';
import DateHelper from '../../utils/helper/DateHelper';
import { dateObjectToDateString } from '../../utils/parsers/dateParser';
import './CloudData.scss';
import DataSearchConfig from '../../utils/config/dataSearch/dataSearchConfig';
import { getUserId } from '../../../src/utils/auth/auth';
import TableCount2 from '../../lib/components/TableCount/TableCount2';

class CloudData extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      classificationList: [],
      classificationId: '',
      tableData: [],
      filteredTableData: [],
    };
    this.table = new CloudDataTable();
  }

  componentDidMount() {
    const { props } = this;
    props.setLoading(true);
    ApiService.braidingCategory
      .readBraidingCategory()
      .then((braidingList) => {
        InformationRetrievalService.getInformationRetrieval({
          braidingList,
        }).then((response) => {
          response.dataList = response.dataList.sort((a, b) => a.sort - b.sort);
          response.dataList = response.dataList.map((item, index) => ({
            ...item,
            sort2: index + 1,
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
                  let updateCycle;
                  if (braiding.id === 13 || braiding.id === 14) {
                    updateCycle = '簽證';
                  } else {
                    updateCycle = '演訓';
                  }
                  let updatedAtDateObject = DateHelper.momentDate(
                    braiding.transmissionDate,
                  );
                  let updatedAtString =
                    dateObjectToDateString(updatedAtDateObject);
                  
                  console.log(DataSearchConfig);
                  const configItem = DataSearchConfig.find(
                    (config) => config.code === braidingCategoryPlan.code,
                  );
                  // console.log(braidingCategoryPlan,configItem)
                  const newBraidingPlan = {
                    id: configItem.id,
                    name: braiding.name,
                    name2: braiding.name + '(演訓)',
                    code: braidingCategoryPlan.code,
                    sort: braidingCategoryPlan.sort,
                    // mobilizationAgency: braiding.mobilizationAgency,
                  };
                  // console.log(newBraidingPlan)
                  response.dataList.push(newBraidingPlan);
                }
              }
              response.dataList = response.dataList.sort(
                (a, b) => a.sort - b.sort,
              );
              let dataList = response.dataList;
              let filteredDataList = dataList.filter(
                (item) =>
                  item.name2 !== '後備軍人',
              );
              filteredDataList = filteredDataList.map((item, index) => ({
                ...item,
                sort2: index + 1,
              }));
              ApiService.fileUpload.getData2().then((res) => {
                // console.log(res.fileUploadList);
                for (let filteredDataListItem of filteredDataList) {
                  const matchingFilteredData = res.fileUploadList.find(
                    (filteredDataItem) =>
                      filteredDataItem.code === filteredDataListItem.code,
                  );
                  // console.log(matchingFilteredData);
                  if (matchingFilteredData) {
                    filteredDataListItem.editAgency =
                      matchingFilteredData.editAgency;
                    filteredDataListItem.transAt = matchingFilteredData.transAt;
                    filteredDataListItem.transCount =
                      matchingFilteredData.transCount;
                    if (matchingFilteredData.state == '1') {
                      filteredDataListItem.state = '檢核中';
                    } else if (matchingFilteredData.state == '2') {
                      filteredDataListItem.state = '檢核完成';
                    } else if (matchingFilteredData.state == '3') {
                      filteredDataListItem.state = '檢核失敗';
                    }
                    filteredDataListItem.complianceQuantity =
                      matchingFilteredData.complianceQuantity;
                    filteredDataListItem.nonComplianceQuantity =
                      matchingFilteredData.nonComplianceQuantity;
                  }
                }
                const names = Array.from(
                  new Set(filteredDataList.map((item) => item.name)),
                ).map((name) => ({
                  text: name,
                  value: name,
                }));
                this.setCategoryList(names);
                // console.log(filteredDataList);
                this.setTableData(filteredDataList);
                this.setFilteredTableData(filteredDataList);
              });
            });
        });
      })
      .catch(() => {
        props.setLoading(false);
      });
  }
  setCategoryList = (categoryList) => {
    this.setState({ categoryList });
  };

  setClassificationList = (classificationList) => {
    this.setState({ classificationList });
  };

  setClassificationId = (classificationId) => {
    this.setState({ classificationId });
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

  handleClassificationOnChanged = (value) => {
    const { state } = this;
    if (state.classificationId !== value) {
      let filterList;
      if (value === '') {
        this.setFilteredTableData(state.tableData);
      } else {
        filterList = state.tableData.filter((item) => item.name === value);
        this.setFilteredTableData(filterList);
      }
      this.setClassificationId(value);
    }
  };

  render() {
    const { props, state } = this;
    // console.log('planId', state.planId);
    return (
      <div className="data-search">
        <Container breadcrumb={false}>
          <PageTitle title={props.language.dataSearch.subMenus.cloudData} />
          <div className="mobilization-container">
            <SelectInput
              title={props.language.categoryDetail.categoryId}
              inputName=""
              inputPlaceholder={'請選擇'}
              inputValue={state.classificationId}
              setFieldValue={(field, value) =>
                this.handleClassificationOnChanged(value)
              }
              options={state.categoryList}
            />
          </div>
          <TableCount2 count={state.filteredTableData.length} />
          <Table
            data={state.filteredTableData}
            columns={this.table.getTableHeader()}
          />
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

CloudData.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CloudData);
