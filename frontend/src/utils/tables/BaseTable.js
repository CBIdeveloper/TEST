/**
 * Represents a table.
 * @class
 */
class BaseTable {
  constructor(setTableDataState) {
    /** @member {number} - the current page of the table */
    this.currentPage = 1;
    /** @member {number} - the total page of the table */
    this.totalPage = 1;
    /** @member {number} - the page size of the table */
    this.pageSize = 20;
    /** @member {Array<string>} - the page size list of the table */
    this.pageSizeList = ['10', '20', '50', '100'];
    /** @member {Array} - the data of the table */
    this.tableData = [];
    /** @member {string} - the current query of the table */
    this.query = '';
    /** @member {function} - the table data state update callback function  */
    this.setTableDataState = setTableDataState;
  }

  /**
   * Gets the title of the table.
   * @function
   * @return {string} - the title of the table
   */
  getTableTitle = () => '';

  /**
   * Gets the header object of the table.
   * @function
   * @return {Object} - the header object of the table
   */
  getTableHeader = () => {};

  /**
   * Gets the data of the table.
   * @function
   * @return {Array} - the data of the table
   */
  getTableData = () => this.tableData;

  /**
   * Gets the initial state of the table.
   * @function
   * @return {Object} - the initial state of the table
   */
  getTableInitialState = () => {};

  /**
   * Gets the search object of the table.
   * @function
   * @return {Array} - the array of search objects of the table
   */
  getTableSearchObject = () => [];

  /**
   * Fetches the table data via API.
   * @function
   */
  fetchTableData = () => {};

  /**
   * Queries the table data via API.
   * @function
   */
  queryTableData = () => {};

  /**
   * Gets the table data based on query setting.
   * @function
   */
  setTableData = () => {
    if (this.query !== '') {
      this.queryTableData();
    } else {
      this.fetchTableData();
    }
  };

  /**
   * Sets the page size of the table.
   * @param {number} pageSize - the target page size
   * @function
   */
  setTablePageSize = (pageSize) => {
    this.pageSize = pageSize;
  };

  /**
   * Goes to the first page of the table.
   * @function
   */
  firstPage = () => {
    this.currentPage = 1;
    this.setTableData();
  };

  /**
   * Goes to the previous page of the table.
   * @function
   */
  previousPage = () => {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.setTableData();
    }
  };

  /**
   * Goes to the next page of the table.
   * @function
   */
  nextPage = () => {
    if (this.currentPage < this.totalPage) {
      this.currentPage += 1;
      this.setTableData();
    }
  };

  /**
   * Goes to the last page of the table.
   * @function
   */
  lastPage = () => {
    this.currentPage = this.totalPage;
    this.setTableData();
  };

  /**
   * Goes to a specific page of the table.
   * @function
   * @param {number} page - the target page
   */
  goToPage = (page) => {
    if (page <= this.totalPage && page > 0) {
      this.currentPage = Number(page);
      this.setTableData();
    }
  };

  /**
   * Defines the action when the table row is clicked.
   * @function
   */
  onRowClicked = () => {};

  /**
   * Modify total page based on total count of the query.
   * @function
   */
  handleTablePagination = (pagination) => {
    const { totalCount } = pagination;
    this.totalPage = Math.ceil(totalCount / this.pageSize);
  };

  /**
   * Calculate the skip count based on the target page and the page size.
   * @function
   * @return {number} - the skip count
   */
  calculateSkip = (targetPage, pageSize) => pageSize * (targetPage - 1);

  /**
   * Calculate the current skip count based on the target page and the page size.
   * @function
   * @return {number} - the skip count
   */
  currentSkip = () => this.calculateSkip(this.currentPage, this.pageSize);

  /**
   * Defines the query prefix of the table.
   * @function
   * @return {Array} - the query prefix
   */
  queryPrefix = () => [];
}

export default BaseTable;
