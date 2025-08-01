class CloudDataSearchResponse {
  constructor({
    id,
    code,
    checkUserAccountId,
    checkAt,
    transAt,
    cityId,
    firstlevelUnitId,
    complianceQuantity,
    nonComplianceQuantity,
    transCount,
    editAgency,
    editor,
    fullName,
    mobilizationAgency,
  }) {
    this.id = id;
    this.code = code;
    this.checkUserAccountId = checkUserAccountId;
    this.checkAt = checkAt;
    this.transAt = transAt.replace('T', ' ').replace(/\.\d{3}Z$/, '');
    this.cityId = cityId;
    this.firstlevelUnitId = firstlevelUnitId;
    this.complianceQuantity = complianceQuantity;
    this.nonComplianceQuantity = nonComplianceQuantity;
    this.transCount = transCount;
    this.editAgency = editAgency;
    this.editor = editor;
    this.fullName = fullName;
    this.mobilizationAgency = mobilizationAgency;
  }
}

export default CloudDataSearchResponse;
