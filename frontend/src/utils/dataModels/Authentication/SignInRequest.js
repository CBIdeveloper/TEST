class SignInRequest {
  constructor({ username, password, captchaCode }) {
    this.user_name = username;
    this.password = password;
    this.captcha_code = captchaCode;
  }
}

export default SignInRequest;
