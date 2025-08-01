class BraidingCategoryListResponse {
  constructor({ get_dto_list }) {
    this.braidingCategoryList = get_dto_list.map((item) => ({
      id: item.id,
      mobilizationClassificationId: item.mobilization_classification_id,
      fullName: item.full_name,
      categoryType: item.category_type,
      code: item.code,
      sort: item.sort,
      classification: item.mobilization_classification,
      plan: item.mobilization_classification.mobilization_plan
    }));
  }
}

export default BraidingCategoryListResponse;
