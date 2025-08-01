class NonReasonResponse {
  constructor({ get_dto_list }) {
    this.nonResponseList = get_dto_list.map((item) => ({
      reason: item.non_compliance_reason,
      count: item.data_count,
    }));
  }
}
export default NonReasonResponse;
