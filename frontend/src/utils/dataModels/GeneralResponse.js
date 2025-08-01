class GeneralResponse {
  constructor({ executed, id, code, message, entity_type, status_code }) {
    this.executed = executed;
    this.id = id;
    this.code = code;
    this.message = message;
    this.entityType = entity_type;
    this.statusCode = status_code;
  }
}

export default GeneralResponse;
