class BraidingCategoryListResponse {
  constructor({ get_dto_list }) {
    this.braidingCategoryPlanList = get_dto_list.map((item) => ({
      id: item.id,
      braidingCategoryId: item.braiding_category_id,
      fullName: item.full_name,
      code: item.code,
      classificationName:
        item.braiding_category.mobilization_classification.classification_name,
      mobilizationClassificationId:
        item.braiding_category.mobilization_classification.id,
      mobilizationPlanName:
        item.braiding_category.mobilization_classification.mobilization_plan
          .plan_name,
      mobilizationPlanId:
        item.braiding_category.mobilization_classification.mobilization_plan.id,
      systemNum: item.system_num,
      transmissionDate: item.transmission_date,
      sort: item.sort,
      code: item.code,
    }));
  }
}
export default BraidingCategoryListResponse;
