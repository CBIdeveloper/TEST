class MobilizationPlanListResponse {
  constructor({ get_dto_list }) {
    this.mobilizationPlanList = get_dto_list.map((item) => ({
      id: item.id,
      planName: item.plan_name,
    }));
  }
}

export default MobilizationPlanListResponse;
