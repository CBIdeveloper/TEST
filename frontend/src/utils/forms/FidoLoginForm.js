import BaseForm from './BaseForm';

class FidoLoginForm extends BaseForm {
  initialValue = () => ({
    account: '',
  });

  validationSchema = () =>
    this.Yup.object().shape({
      account: this.Yup.string().required('身分證字號必填！'),
    });
}

const fidologinForm = new FidoLoginForm();

export default fidologinForm;
