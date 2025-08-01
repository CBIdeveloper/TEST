class CodefileRequest {
  constructor({
    codeId,
    name,
    heading,
    parentCodeId,
    sequenceNumber,
    isExisted,
  }) {
    this.code_id = codeId;
    this.name = name;
    this.heading = heading;
    this.parent_code_id = parentCodeId;
    this.sequence_number = sequenceNumber;
    this.is_existed = isExisted;
  }
}

export default CodefileRequest;
