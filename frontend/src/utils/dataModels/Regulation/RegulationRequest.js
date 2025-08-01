class RegulationRequest {
  constructor({ regulationName, regulationUrl, regulationType, remark }) {
    this.regulation_name = regulationName;
    this.regulation_url = regulationUrl;
    this.regulation_type = regulationType;
    this.remark = remark;
  }
}

export default RegulationRequest;
