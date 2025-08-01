import GeneralResponse from '../GeneralResponse';

class SignInResponse extends GeneralResponse {
  constructor({
    executed,
    access_token,
    access_token_expired_at,
    refresh_token,
    refresh_token_expired_at,
    is_password_setting_required,
    id,
    code,
    message,
    entity_type,
    status_code,
  }) {
    super({
      executed,
      id,
      code,
      message,
      entity_type,
      status_code,
    });
    this.accessToken = access_token;
    this.accessTokenExpiredAt = access_token_expired_at;
    this.refreshToken = refresh_token;
    this.refreshTokenExpiredAt = refresh_token_expired_at;
    this.isPasswordSettingRequired = is_password_setting_required;
  }
}

export default SignInResponse;
