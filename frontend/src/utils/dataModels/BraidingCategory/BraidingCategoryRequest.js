class BraidingCategoryRequest {
  constructor({ mobilizationClassificationId, fullName, categoryType, projectManagementNumber, updateCycle }) {
    this.mobilization_classification_id = mobilizationClassificationId;
    this.full_name = fullName;
    this.category_type = categoryType;
    this.project_management_number = projectManagementNumber;
    this.update_cycle = updateCycle;
  }
}

export default BraidingCategoryRequest;
