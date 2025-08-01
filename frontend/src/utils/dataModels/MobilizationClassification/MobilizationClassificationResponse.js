class MobilizationClassificationResponse {
  constructor({
    id,
    classificationName,
    mobilizationPlanId,
    mobilizationPlan,
  }) {
    this.id = id;
    this.classificationName = classificationName;
    this.mobilizationPlanId = mobilizationPlanId;
    this.mobilizationPlan = mobilizationPlan.planName;
  }
}

export default MobilizationClassificationResponse;
