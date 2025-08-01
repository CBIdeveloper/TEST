import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from '../../lib/components/Container/Container';
import SelectInput from '../../lib/components/inputs/SelectInput/SelectInput';
import Table from '../../lib/components/Table/Table';
import PageTitle from '../../lib/components/PageTitle/PageTitle';
import Pagination from '../../lib/components/Pagination/Pagination';
import { setLoading } from '../../store/loading/slice';
import ApiService from '../../utils/api/ApiService';
import CloudDataSearchTable from '../../utils/tables/dataSearch/CloudDataTable/CloudDataSearchTable';
import InformationRetrievalService from '../../utils/api/instances/InformationRetrieval/service';
import DateHelper from '../../utils/helper/DateHelper';
import { dateObjectToDateString } from '../../utils/parsers/dateParser';
import './CloudData.scss';
import DataSearchConfig from '../../utils/config/dataSearch/dataSearchConfig';
import TableCount2 from '../../lib/components/TableCount/TableCount2';
import MultiTableSearch from '../../lib/components/MultiTableSearch/MultiTableSearch';
import QueryHelper from '../../utils/helper/QueryHelper';
import { getCityId } from '../../utils/auth/auth';

class CloudDataSearch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      tableAllData: [],
      tableCount: 0,
      braidingCategoryList: [],
      braidingCategory: '',
      mobilizationAgencyList: [],
      mobilizationAgency: '',
      editAgencyList: [],
      editAgency: '',
    };
    this.table = new CloudDataSearchTable(
      this.setTableData,
      this.setTableCount,
    );
  }

  componentDidMount() {
    const { props } = this;
    props.setLoading(true);
    this.table.fetchTableData();
    ApiService.fileUpload.getData().then((response) => {
      const braidingCategoryList = Array.from(
        new Set(response.map((item) => item.fullName).filter(Boolean)),
      ).map((fullName) => ({
        text: fullName,
        value: fullName,
      }));
      const mobilizationAgencyList = Array.from(
        new Set(
          response.map((item) => item.mobilizationAgency).filter(Boolean),
        ),
      ).map((mobilizationAgency) => ({
        text: mobilizationAgency,
        value: mobilizationAgency,
      }));
      const editAgencyList = Array.from(
        new Set(response.map((item) => item.editAgency).filter(Boolean)),
      ).map((editAgency) => ({
        text: editAgency,
        value: editAgency,
      }));
      this.setState({ tableAllData: response });
      this.setState({ braidingCategoryList: braidingCategoryList });
      this.setState({ mobilizationAgencyList: mobilizationAgencyList });
      this.setState({ editAgencyList: editAgencyList });
    });
  }

  setTableData = (tableData) => {
    const { props } = this;
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

  searchInput = () => {
    const { state } = this;
    return (
      <div className="search-containers">
        <div className="text-containers">
          <div className="cloud-data-search-title">
            編管類別
            <SelectInput
              title=""
              inputName=""
              inputPlaceholder="請選擇"
              inputValue={state.braidingCategory}
              setFieldValue={(field, value) =>
                this.setState({ braidingCategory: value })
              }
              options={state.braidingCategoryList}
              zenMode
            />
          </div>
          <div className="cloud-data-search-title">
            中央主管機關
            <SelectInput
              title=""
              inputName=""
              inputPlaceholder="請選擇"
              inputValue={state.mobilizationAgency}
              setFieldValue={(field, value) =>
                this.setState({ mobilizationAgency: value })
              }
              options={state.mobilizationAgencyList}
              zenMode
            />
          </div>
          <div className="cloud-data-search-title">
            編輯機關
            <SelectInput
              title=""
              inputName=""
              inputPlaceholder="請選擇"
              inputValue={state.editAgency}
              setFieldValue={(field, value) =>
                this.setState({ editAgency: value })
              }
              options={state.editAgencyList}
              zenMode
            />
          </div>
        </div>
      </div>
    );
  };

  search = () => {
    const { state } = this;
    const queryList = [];
    let count = 0;
    if (state.braidingCategory !== '') {
      count = 1;
      queryList.push(
        QueryHelper.equal('fullName', state.braidingCategory, 'string'),
      );
    }
    if (state.mobilizationAgency !== '') {
      count = 1;
      queryList.push(
        QueryHelper.equal(
          'mobilizationAgency',
          state.mobilizationAgency,
          'string',
        ),
      );
    }
    if (state.editAgency !== '') {
      count = 1;
      queryList.push(
        QueryHelper.equal('editAgency', state.editAgency, 'string'),
      );
    }
    this.table.query = QueryHelper.multipleAndQuery([
      ...queryList,
      // this.table.queryPrefix(),
    ]);
    if(getCityId()){
      this.table.query = QueryHelper.multipleAndQuery([
        ...queryList,
        this.table.queryPrefix(),
      ]);
    }else {
      this.table.query = QueryHelper.multipleAndQuery([
        ...queryList,
        // this.table.queryPrefix(),
      ]);
    }
    this.table.currentPage = 1;
    this.table.queryTableData(count);
  };

  resetSearch = () => {
    const { props, state } = this;
    const value = '';
    this.setState({ braidingCategory: value });
    this.setState({ mobilizationAgency: value });
    this.setState({ editAgency: value });
    props.setLoading(true);
    this.table.fetchTableData();
  };

  render() {
    const { props, state } = this;
    // console.log('planId', state.planId);
    return (
      <div className="data-search">
        <Container breadcrumb={false}>
          <PageTitle
            title={props.language.dataSearch.subMenus.cloudDataSearch}
          />
          <MultiTableSearch
            searchInput={this.searchInput()}
            resetFunction={this.resetSearch}
            searchFunction={this.search}
          />
          <TableCount2 count={state.tableCount} />
          <Table data={state.tableData} columns={this.table.getTableHeader()} />
          <Pagination
            tableInstance={this.table}
            totalPage={this.table.totalPage}
            currentPage={this.table.currentPage}
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

CloudDataSearch.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CloudDataSearch);
