class PaginationResponse {
  constructor({ totalCount, pageInfo, items }) {
    this.totalCount = totalCount;
    this.hasNextPage = pageInfo.hasNextPage;
    this.hasPreviousPage = pageInfo.hasPreviousPage;
    this.items = items;
  }
}

export default PaginationResponse;
