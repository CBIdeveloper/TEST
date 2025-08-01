import GeneralResponse from '../GeneralResponse';

class SignInFidoPushResponse extends GeneralResponse {
  constructor({
    executed,
    sp_ticket,
    code,
    message,
    entity_type,
    status_code,
  }) {
    super({
      executed,
      code,
      message,
      entity_type,
      status_code,
    });
    this.sp_ticket = sp_ticket;
  }
}

export default SignInFidoPushResponse;
