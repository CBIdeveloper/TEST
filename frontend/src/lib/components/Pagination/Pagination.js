import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  MdNavigateBefore,
  MdNavigateNext,
  MdFirstPage,
  MdLastPage,
} from 'react-icons/md';

import ButtonDiv from '../ButtonDiv/ButtonDiv';
import Dropdown from '../Dropdown/Dropdown';

import { resetSelectList } from '../../../store/table/slice';

import './Pagination.scss';
import { setLoading } from '../../../store/loading/slice';

class Pagination extends React.PureComponent {
  constructor(props) {
    super(props);
    const pageSizeIndex = props.tableInstance.pageSizeList.findIndex(
      (pageSize) => pageSize === props.tableInstance.pageSize.toString(),
    );
    this.state = {
      inputWidth: 0,
      currentPage: props.tableInstance.currentPage,
      pageSizeIndex: pageSizeIndex === -1 ? 0 : pageSizeIndex,
    };
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    if (props.currentPage !== prevProps.currentPage) {
      this.setCurrentPage(props.currentPage);
    }
  }

  setCurrentPage = (currentPage) => {
    this.setState({ currentPage, inputWidth: currentPage.length });
  };

  setPageSizeIndex = (pageSizeIndex) => {
    this.setState({ pageSizeIndex });
  };

  handleCurrentPageOnChange = (event) => {
    this.setCurrentPage(event.target.value);
  };

  handleSearchOnClick = () => {
    const { props, state } = this;
    props.tableInstance.goToPage(state.currentPage);
  };

  setPageSize = (index) => {
    const { props } = this;
    const pageSize = props.tableInstance.pageSizeList[index];
    this.setPageSizeIndex(index);
    props.tableInstance.setTablePageSize(pageSize);
    this.firstPage();
    props.resetSelectList();
  };

  firstPage = () => {
    const { props } = this;
    props.tableInstance.firstPage();
    props.resetSelectList();
  };

  previousPage = () => {
    const { props } = this;
    if (props.currentPage > 1) {
      props.tableInstance.previousPage();
      props.resetSelectList();
    }
  };

  nextPage = () => {
    const { props } = this;
    if (props.currentPage < props.totalPage) {
      props.tableInstance.nextPage();
      props.resetSelectList();
    }
  };

  lastPage = () => {
    const { props } = this;
    props.tableInstance.lastPage();
    props.resetSelectList();
  };

  render() {
    const { props, state } = this;

    return (
      <div className="pagination">
        <div className="page-size">
          <Dropdown
            dropdownContentList={props.tableInstance.pageSizeList}
            currentIndex={state.pageSizeIndex}
            onClick={this.setPageSize}
          />
        </div>
        <div className="page-control">
          <ButtonDiv className="icon" onClick={this.firstPage}>
            <MdFirstPage size={24} />
          </ButtonDiv>
          <ButtonDiv className="icon" onClick={this.previousPage}>
            <MdNavigateBefore size={24} />
          </ButtonDiv>
          <ButtonDiv className="icon" onClick={this.nextPage}>
            <MdNavigateNext size={24} />
          </ButtonDiv>
          <ButtonDiv className="icon" onClick={this.lastPage}>
            <MdLastPage size={24} />
          </ButtonDiv>
        </div>
        <div className="search-page">
          <div className="search-page-container">
            <input
              value={state.currentPage}
              className="current-page"
              onChange={this.handleCurrentPageOnChange}
              style={{ width: `${state.inputWidth}ch` }}
            />
            <div className="total-page">{`/ ${props.totalPage}`}</div>
            <ButtonDiv
              className="search-button"
              onClick={this.handleSearchOnClick}
            >
              {props.language.pagination.go}
            </ButtonDiv>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({
  resetSelectList: (payload) => dispatch(resetSelectList(payload)),
  setLoading: (payload) => dispatch(setLoading(payload)),
});

Pagination.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  resetSelectList: PropTypes.func.isRequired,
  tableInstance: PropTypes.objectOf(Object).isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
