import BraidingCategoryType from '../../constants/BraidingCategoryType';

class BraidingCategoryResponse {
  constructor({
    id,
    categoryType,
    fullName,
    mobilizationClassificationId,
    mobilizationClassification,
    code,
    projectManagementNumber,
    updateCycle,
    systemNum,
    transmissionDate,
    sort,
    unit,
  }) {
    const categoryItem = BraidingCategoryType.find(
      (item) => item.value === categoryType,
    );

    this.id = id;
    this.categoryType = categoryType;
    this.fullName = fullName;
    this.mobilizationClassificationId = mobilizationClassificationId;
    this.mobilizationClassification =
      mobilizationClassification.classificationName;
    this.mobilizationPlanId = mobilizationClassification.mobilizationPlanId;
    this.mobilizationPlan = mobilizationClassification.mobilizationPlan.planName;
    this.code = code;
    this.projectManagementNumber = projectManagementNumber;
    this.updateCycle = updateCycle;
    this.sort = sort;
    this.unit = unit;
    this.systemNum = systemNum;
    this.transmissionDate = transmissionDate;
    this.categoryTypeString =
      categoryItem === undefined ? '' : categoryItem.text;
  }
}

export default BraidingCategoryResponse;
