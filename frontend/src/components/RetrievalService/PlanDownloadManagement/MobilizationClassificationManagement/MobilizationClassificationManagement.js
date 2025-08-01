import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MultiTableSearch from '../../../../lib/components/MultiTableSearch/MultiTableSearch';
import PageTitle from '../../../../lib/components/PageTitle/PageTitle';
import Pagination from '../../../../lib/components/Pagination/Pagination';
import SelectInput from '../../../../lib/components/inputs/SelectInput/SelectInput';
import Table from '../../../../lib/components/Table/Table';
import TableCount from '../../../../lib/components/TableCount/TableCount';

import ApiService from '../../../../utils/api/ApiService';
import MobilizationClassificationManagementTable from '../../../../utils/tables/retrievalService/PlanDownloadManagement/MobilizationClassificationManagementTable';
import QueryHelper from '../../../../utils/helper/QueryHelper';
import { getUserId } from '../../../../utils/auth/auth';

import './MobilizationClassificationManagement.scss';

class MobilizationClassificationManagement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      mobilizationPlanList: [],
      mobilizationClassificationList: [],
      mobilizationPlanId: '',
      mobilizationClassificationId: '',
      tableCount: 0,
    };
    this.table = new MobilizationClassificationManagementTable(
      this.setTableData,
      this.setTableCount,
    );
  }

  componentDidMount() {
    ApiService.mobilizationPlan.readMobilizationPlan().then((response) => {
      const mobilizationPlanList = response.map((item) => ({
        text: item.planName,
        value: item.id,
      }));
      this.setMobilizationPlanList(mobilizationPlanList);
    });
    ApiService.mobilizationClassification
      .readMobilizationClassification()
      .then((response) => {
        const mobilizationClassificationList = response.map((item) => ({
          text: item.classificationName,
          value: item.id,
        }));
        this.setMobilizationClassificationList(mobilizationClassificationList);
      });
    ApiService.sysUserAccount
      .readSysUserAccountById(getUserId())
      .then((userData) => {
        const { mobilizationClassificationIdList } = userData;
        this.table.idList = mobilizationClassificationIdList;
        this.table.fetchTableData();
      });
  }

  setTableData = (tableData) => {
    const data = tableData.map((item, index) => ({
      ...item,
      index: index + this.table.currentSkip() + 1,
    }));
    this.setState({ tableData: data });
  };

  setTableCount = (tableCount) => {
    this.setState({ tableCount });
  };

  setMobilizationPlanList = (mobilizationPlanList) => {
    this.setState({ mobilizationPlanList });
  };

  setMobilizationClassificationList = (mobilizationClassificationList) => {
    this.setState({ mobilizationClassificationList });
  };

  setMobilizationPlanId = (mobilizationPlanId) => {
    this.setState({ mobilizationPlanId });
  };

  setMobilizationClassificationId = (mobilizationClassificationId) => {
    this.setState({ mobilizationClassificationId });
  };

  resetSearch = () => {
    this.setMobilizationPlanId('');
    this.setMobilizationClassificationId('');
  };

  searchInput = () => {
    const { state } = this;

    return (
      <div className="search-containers">
        <div className="text-containers">
          <SelectInput
            title=""
            inputName=""
            inputPlaceholder="動員方案別"
            inputValue={state.mobilizationPlanId}
            setFieldValue={(field, value) => this.setMobilizationPlanId(value)}
            options={state.mobilizationPlanList}
            zenMode
            full
          />
          <SelectInput
            title=""
            inputName=""
            inputPlaceholder="動員分類"
            inputValue={state.mobilizationClassificationId}
            setFieldValue={(field, value) =>
              this.setMobilizationClassificationId(value)
            }
            options={state.mobilizationClassificationList}
            zenMode
            full
          />
        </div>
      </div>
    );
  };

  search = () => {
    const { state } = this;
    const queryList = [this.table.queryPrefix()];
    if (state.mobilizationPlanId !== '') {
      queryList.push(
        QueryHelper.equal(
          'mobilizationPlanId',
          state.mobilizationPlanId,
          'number',
        ),
      );
    }
    if (state.mobilizationClassificationId !== '') {
      queryList.push(
        QueryHelper.equal('id', state.mobilizationClassificationId, 'number'),
      );
    }
    this.table.query = QueryHelper.multipleAndQuery(queryList);
    this.table.currentPage = 1;
    this.table.queryTableData();
  };

  render() {
    const { props, state } = this;

    return (
      <div className="mobilization-classification-management">
        <PageTitle
          title={
            props.language.retrievalService.subMenus
              .mobilizationClassificationManagement
          }
          breadcrumb={false}
        />
        <MultiTableSearch
          searchInput={this.searchInput()}
          resetFunction={this.resetSearch}
          searchFunction={this.search}
        />
        <TableCount count={state.tableCount} />
        <Table data={state.tableData} columns={this.table.getTableHeader()} />
        <Pagination
          tableInstance={this.table}
          currentPage={this.table.currentPage}
          totalPage={this.table.totalPage}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

MobilizationClassificationManagement.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MobilizationClassificationManagement);
