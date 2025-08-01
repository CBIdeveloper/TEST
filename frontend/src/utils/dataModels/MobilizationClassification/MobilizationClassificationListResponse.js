class MobilizationClassificationListResponse {
  constructor({ get_dto_list }) {
    this.mobilizationClassificationList = get_dto_list.map((item) => ({
      id: item.id,
      classificationName: item.classification_name,
      mobilizationPlanId: item.mobilization_plan_id,
      mobilizationPlanName: item.mobilization_plan.plan_name
    }));
  }
}

export default MobilizationClassificationListResponse;
