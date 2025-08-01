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
import MobilizationPlanManagementTable from '../../../../utils/tables/retrievalService/PlanDownloadManagement/MobilizationPlanManagementTable';
import QueryHelper from '../../../../utils/helper/QueryHelper';
import { getUserId } from '../../../../utils/auth/auth';

import './MobilizationPlanManagement.scss';

class MobilizationPlanManagement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      mobilizationPlanList: [],
      mobilizationPlanId: '',
      tableCount: 0,
    };
    this.table = new MobilizationPlanManagementTable(
      this.setTableData,
      this.setTableCount,
    );
  }

  componentDidMount() {
    ApiService.mobilizationPlan.readMobilizationPlan().then((response) => {
      console.log('B', response);
      const mobilizationPlanList = response.map((item) => ({
        text: item.planName,
        value: item.id,
      }));
      this.setMobilizationPlanList(mobilizationPlanList);
    });

    ApiService.sysUserAccount
      .readSysUserAccountById(getUserId())
      .then((userData) => {
        // console.log('userData', userData);
        const { mobilizationPlanIdList } = userData;
        // console.log(mobilizationPlanIdList)
        this.table.idList = mobilizationPlanIdList;
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

  setMobilizationPlanId = (mobilizationPlanId) => {
    this.setState({ mobilizationPlanId });
  };

  resetSearch = () => {
    this.setMobilizationPlanId('');
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
        </div>
      </div>
    );
  };

  search = () => {
    const { state } = this;
    const queryList = [this.table.queryPrefix()];
    if (state.mobilizationPlanId !== '') {
      queryList.push(
        QueryHelper.equal('id', state.mobilizationPlanId, 'number'),
      );
    }
    this.table.query = QueryHelper.multipleAndQuery(queryList);
    this.table.currentPage = 1;
    this.table.queryTableData();
  };

  render() {
    const { props, state } = this;

    return (
      <div className="mobilization-plan-management">
        <PageTitle
          title={
            props.language.retrievalService.subMenus.mobilizationPlanManagement
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

MobilizationPlanManagement.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MobilizationPlanManagement);
