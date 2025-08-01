class MobilizationClassificationRequest {
  constructor({ mobilizationPlanId, classificationName }) {
    this.mobilization_plan_id = mobilizationPlanId;
    this.classification_name = classificationName;
  }
}

export default MobilizationClassificationRequest;
