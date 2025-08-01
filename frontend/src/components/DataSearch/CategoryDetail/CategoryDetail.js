import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../lib/components/ButtonDiv/ButtonDiv';
import Container from '../../../lib/components/Container/Container';
import DateInput from '../../../lib/components/inputs/DateInput/DateInput';
import MultiTableSearch from '../../../lib/components/MultiTableSearch/MultiTableSearch';
import PageTitle from '../../../lib/components/PageTitle/PageTitle';
import Pagination from '../../../lib/components/Pagination/Pagination';
import SelectInput from '../../../lib/components/inputs/SelectInput/SelectInput';
import SelectItem from '../../../lib/components/inputs/MultipleSelectInput/SelectItem/SelectItem';
import Table from '../../../lib/components/Table/Table';
import TableCount from '../../../lib/components/TableCount/TableCount';
import TextInput from '../../../lib/components/inputs/TextInput/TextInput';

import { setLoading } from '../../../store/loading/slice';

import ApiService from '../../../utils/api/ApiService';
import CategoryDetailTable from '../../../utils/tables/dataSearch/CategoryDetailTable/CategoryDetailTable';
import DataSearchConfig from '../../../utils/config/dataSearch/dataSearchConfig';
import DateHelper from '../../../utils/helper/DateHelper';
import QueryType from '../../../utils/types/QueryType';
import QueryHelper from '../../../utils/helper/QueryHelper';
import { createQuery } from '../../../utils/parsers/queryParser';
import {
  dateObjectToDateString,
  dateObjectToDateTimeStringWithTimezone,
} from '../../../utils/parsers/dateParser';

import './CategoryDetail.scss';

class CategoryDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      categoryList: [],
      searchTitle: '',
      startDate: '',
      endDate: '',
      tableData: [],
      tableCount: 0,
      configItem: null,
      isSingleId: true,
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

  setCategoryList = (categoryList) => {
    this.setState({ categoryList });
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

  setIsSingleId = (isSingleId) => {
    this.setState({ isSingleId });
  };

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

  setConfigItem = (configItem) => {
    this.setState({ configItem });
  };

  toggleIsSingleId = () => {
    const { state } = this;
    this.setIsSingleId(!state.isSingleId);
  };

  initState = () => {
    const { props } = this;
    const id = props.query.queryObject.get(QueryType.ID);
    this.setId(id);
    if (id !== null) {
      const configItem = DataSearchConfig.find(
        (item) => item.id === Number(id),
      );
      if (configItem !== undefined) {
        // console.log(configItem);
        props.setLoading(true);
        ApiService.braidingCategory
          .readBraidingCategory()
          .then((braidingList) => {
            const categoryList = DataSearchConfig.filter(
              (item) =>
                item.mobilizationClassificationId ===
                configItem.mobilizationClassificationId,
            ).map((item) => {
              const braidingItem = braidingList.find(
                (braiding) => braiding.code === item.code,
              );
              if (braidingItem === undefined) {
                return {
                  text: item.name,
                  value: item.id,
                };
              }
              return {
                text: braidingItem.fullName,
                value: item.id,
              };
            });
            this.setCategoryList(categoryList);
          });
        this.table = new CategoryDetailTable(
          this.setTableData,
          this.setTableCount,
          id,
        );
        this.table.categoryTableHeader = configItem.categoryTableHeader;
        if (configItem.typeIndex === '1') {
          this.table.queryFunction = configItem.queryUniqueCategoryData;
        } else {
          this.table.queryFunction = configItem.queryCategoryData;
        }
        this.setConfigItem(configItem);
        this.table.fetchTableData();
      }
    }
  };

  handleCategoryOnChanged = (value) => {
    const { props } = this;
    const query = createQuery({
      [QueryType.ID]: value,
    });
    props.history.push({
      search: query,
    });
  };

  displaySingleIdCheckbox = () => {
    const { props, state } = this;
    return state.configItem.typeIndex === '1' ? (
      <div className="checkbox-containers">
        <SelectItem
          selected={state.isSingleId}
          name={props.language.dataSearch.singleId}
          handleCheckboxOnClick={this.toggleIsSingleId}
        />
      </div>
    ) : (
      ''
    );
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
        {this.displaySingleIdCheckbox()}
      </div>
    );
  };

  resetSearch = () => {
    this.setSearchTitle('');
    this.setStartDate('');
    this.setEndDate('');
    this.setIsSingleId(true);
  };

  search = () => {
    const { props, state } = this;
    const queryList = [];
    const queryObject = {};
    props.setLoading(true);

    if (state.configItem.typeIndex === '1') {
      if (state.isSingleId) {
        this.table.queryFunction = state.configItem.queryUniqueCategoryData;
      } else {
        this.table.queryFunction = state.configItem.queryCategoryData;
      }
    }

    if (state.searchTitle !== '') {
      if (state.configItem.specialQuery && state.isSingleId) {
        queryObject[state.configItem.searchKey] = state.searchTitle;
      } else {
        queryList.push(
          QueryHelper.contains(
            state.configItem.searchKey,
            state.searchTitle,
            'string',
          ),
        );
      }
    }
    if (state.startDate !== '' && state.startDate !== null) {
      if (state.configItem.specialQuery && state.isSingleId) {
        queryObject.beganDate = dateObjectToDateString(state.startDate);
      } else {
        queryList.push(
          QueryHelper.greater(
            'creDate',
            dateObjectToDateTimeStringWithTimezone(state.startDate),
          ),
        );
      }
    }
    if (state.endDate !== '' && state.endDate !== null) {
      if (state.configItem.specialQuery && state.isSingleId) {
        queryObject.endedDate = dateObjectToDateString(
          DateHelper.addDays(state.endDate, 1),
        );
      } else {
        queryList.push(
          QueryHelper.less(
            'creDate',
            dateObjectToDateTimeStringWithTimezone(
              DateHelper.addDays(state.endDate, 1),
            ),
          ),
        );
      }
    }

    if (state.configItem.specialQuery && state.isSingleId) {
      const keys = Object.keys(queryObject);
      this.table.query = keys.reduce(
        (accum, current) => `${accum} ${current}:"${queryObject[current]}",`,
        '',
      );
    } else if (queryList.length > 0) {
      this.table.query = QueryHelper.singleQuery(
        QueryHelper.andQuery([...queryList]),
      );
    } else {
      this.table.query = '';
    }

    this.table.currentPage = 1;
    this.table.queryTableData();
  };

  render() {
    const { props, state } = this;

    if (state.configItem === null) return '';

    return (
      <div className="category-detail">
        <Container breadcrumb={false}>
          <PageTitle
            title={props.language.dataSearch.subMenus.categoryDetail}
          />
          <div className="mobilization-container">
            <div className="plan-name">{state.configItem.mobilizationPlan}</div>
            <div className="classification-name">
              {state.configItem.mobilizationClassification}
            </div>
            <SelectInput
              title={props.language.categoryDetail.categoryId}
              inputName=""
              inputPlaceholder={props.language.categoryDetail.categoryIdHint}
              inputValue={Number(state.id)}
              setFieldValue={(field, value) =>
                this.handleCategoryOnChanged(value)
              }
              placeHolder={false}
              options={state.categoryList}
            />
            <ButtonDiv className="back-button" onClick={props.history.goBack}>
              {props.language.categoryDetail.back}
            </ButtonDiv>
          </div>
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
        </Container>
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

CategoryDetail.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryDetail),
);
