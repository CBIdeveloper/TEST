import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ButtonDiv from '../ButtonDiv/ButtonDiv';
import TextInput from '../inputs/TextInput/TextInput';
import TextSelectInput from '../inputs/TextSelectInput/TextSelectInput';
import DateInput from '../inputs/DateInput/DateInput';
import SelectInput from '../inputs/SelectInput/SelectInput';

import QueryHelper from '../../../utils/helper/QueryHelper';
import { dateObjectToDateString } from '../../../utils/parsers/dateParser';

import './TableSearch.scss';

class TableSearch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: '',
      queryText: '',
      queryDate: '',
      tableSearchObject: [],
    };
  }

  componentDidMount() {
    this.initTableSearchObject();
  }

  initTableSearchObject = () => {
    const { props } = this;
    this.setState({
      tableSearchObject: props.tableInstance.getTableSearchObject(),
    });
  };

  handleInputOnChange = (event) => {
    const { value } = event.target;
    this.setState({ [event.target.name]: value });
  };

  handleSetFieldValue = (field, value) => {
    this.setState({ queryText: value });
  };

  handleDateOnChange = (inputName, value) => {
    this.setState({ [inputName]: value });
  };

  handleSelectOnChange = (inputName, value) => {
    this.setState({ [inputName]: value });
  };

  handleSearchOnClick = () => {
    // TODO: search table by type and content
    const { props, state } = this;
    if (state.searchKey === '') {
      props.tableInstance.query = '';
      props.tableInstance.fetchTableData();
    } else {
      this.search();
    }
  };

  handleEnterOnClick = (event) => {
    if (event.key === 'Enter') {
      this.handleSearchOnClick();
    }
  };

  search = () => {
    const { props } = this;
    const inputType = this.inputType();

    if (props.prefix.length > 0) {
      this.prefixSearch(inputType, props.prefix);
    } else {
      this.normalSearch(inputType);
    }
  };

  normalSearch = (inputType) => {
    const { props, state } = this;
    switch (inputType) {
      case 'number': {
        props.tableInstance.query = QueryHelper.singleQuery(
          QueryHelper.equal(state.searchKey, state.queryText, 'number'),
        );
        break;
      }
      case 'date': {
        props.tableInstance.query = QueryHelper.singleQuery(
          QueryHelper.equal(
            state.searchKey,
            dateObjectToDateString(state.queryDate),
            'string',
          ),
        );
        break;
      }
      case 'dateRange': {
        props.tableInstance.query = QueryHelper.multipleAndQuery([
          QueryHelper.dateRange(
            state.searchKey,
            dateObjectToDateString(state.queryDate.startDate),
            dateObjectToDateString(state.queryDate.endDate),
          ),
        ]);
        break;
      }
      default: {
        props.tableInstance.query = QueryHelper.singleQuery(
          QueryHelper.contains(state.searchKey, state.queryText, 'string'),
        );
      }
    }
    props.tableInstance.queryTableData();
  };

  prefixSearch = (inputType, prefix) => {
    const { props, state } = this;
    let query;
    switch (inputType) {
      case 'number': {
        query = QueryHelper.equal(state.searchKey, state.queryText, 'number');
        break;
      }
      case 'date': {
        query = QueryHelper.equal(
          state.searchKey,
          dateObjectToDateString(state.queryDate),
          'string',
        );
        break;
      }
      case 'dateRange': {
        query = QueryHelper.dateRange(
          state.searchKey,
          dateObjectToDateString(state.queryDate.startDate),
          dateObjectToDateString(state.queryDate.endDate),
        );
        break;
      }
      default: {
        query = QueryHelper.contains(
          state.searchKey,
          state.queryText,
          'string',
        );
      }
    }
    props.tableInstance.query = QueryHelper.multipleAndQuery([
      query,
      ...prefix,
    ]);
    props.tableInstance.queryTableData();
  };

  inputType = () => {
    const { state } = this;
    if (state.tableSearchObject !== null) {
      const searchObject = state.tableSearchObject.find(
        (item) => item.value === state.searchKey,
      );
      return searchObject === undefined ? 'text' : searchObject.type;
    }
    return '';
  };

  selectOptions = () => {
    const { state } = this;
    const searchItem = state.tableSearchObject.find(
      (item) => item.value === state.searchKey,
    );
    return searchItem === undefined ? [] : searchItem.options;
  };

  displayInput = () => {
    const { props, state } = this;
    const inputType = this.inputType();
    if (inputType === 'date') {
      return (
        <DateInput
          title=""
          inputValue={state.queryDate}
          inputName="queryDate"
          inputPlaceholder={props.language.tableSearch.inputContentHint}
          setFieldValue={this.handleDateOnChange}
          zenMode
        />
      );
    }
    if (inputType === 'dateRange') {
      return (
        <DateInput
          range
          title=""
          inputValue={state.queryDate}
          inputName="queryDate"
          inputPlaceholder={props.language.tableSearch.inputContentHint}
          setFieldValue={this.handleDateOnChange}
          zenMode
        />
      );
    }
    if (inputType === 'text' || inputType === 'number') {
      return (
        <TextInput
          title=""
          inputType="text"
          inputValue={state.queryText}
          inputName="queryText"
          inputPlaceholder={props.language.tableSearch.inputContentHint}
          inputOnChange={this.handleInputOnChange}
          onKeyUp={this.handleEnterOnClick}
          zenMode
        />
      );
    }
    if (inputType === 'select') {
      return (
        <TextSelectInput
          title=""
          inputType="text"
          inputValue={state.queryText}
          inputName="queryText"
          inputPlaceholder={props.language.tableSearch.inputContentHint}
          setFieldValue={this.handleSetFieldValue}
          onKeyUp={this.handleEnterOnClick}
          options={this.selectOptions()}
          zenMode
        />
      );
    }
    return '';
  };

  render() {
    const { props, state } = this;

    return (
      <div className="table-search">
        <div className="search-select-container">
          <SelectInput
            title=""
            inputValue={state.searchKey}
            inputName="searchKey"
            inputPlaceholder={props.language.tableSearch.inputTypeHint}
            options={state.tableSearchObject}
            setFieldValue={this.handleSelectOnChange}
            zenMode
          />
        </div>
        {this.displayInput()}
        <ButtonDiv className="search-button" onClick={this.handleSearchOnClick}>
          {props.language.tableSearch.search}
        </ButtonDiv>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

TableSearch.defaultProps = {
  prefix: [],
};

TableSearch.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  tableInstance: PropTypes.objectOf(Object).isRequired,
  prefix: PropTypes.arrayOf(Object),
};

export default connect(mapStateToProps, mapDispatchToProps)(TableSearch);
