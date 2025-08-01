import BaseForm from './BaseForm';

class LoginForm extends BaseForm {
  initialValue = () => ({
    account: '',
    accountVerification: '',
    // validate: '',
  });

  validationSchema = () =>
    this.Yup.object().shape({
      account: this.Yup.string().required('身分證字號必填！'),
      accountVerification: this.Yup.string().required('密碼必填!'),
      // validate: this.Yup.string().required('驗證碼必填!'),
    });
}

const loginForm = new LoginForm();

export default loginForm;
