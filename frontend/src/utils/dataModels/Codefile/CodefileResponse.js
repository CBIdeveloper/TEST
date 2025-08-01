class CodefileResponse {
  constructor({
    id,
    codeId,
    name,
    heading,
    parentCodeId,
    sequenceNumber,
    isExisted,
  }) {
    this.id = id;
    this.codeId = codeId;
    this.name = name;
    this.heading = heading;
    this.parentCodeId = parentCodeId;
    this.sequenceNumber = sequenceNumber;
    this.isExisted = isExisted;

    this.isParent = this.parentCodeId === '0';
  }
}

export default CodefileResponse;
