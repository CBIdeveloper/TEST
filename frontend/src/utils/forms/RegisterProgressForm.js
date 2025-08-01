import BaseForm from './BaseForm';

import FormikHelper from '../helper/FormikHelper';

class RegisterProgressForm extends BaseForm {
  initialValue = () => ({
    name: '',
    pid: '',
    validate: '',
  });

  validationSchema = () =>
    this.Yup.object().shape({
      name: this.Yup.string().required('姓名必填!').max(30, '姓名至多30個字！'),
      pid: this.Yup.string()
        .required('身分證字號必填!')
        .max(10, '身分證字號至多10個字！')
        .test('Invalid identity number', '身分證字號格式錯誤！', (id) =>
          FormikHelper.identityNumberValidation(id),
        ),
      validate: this.Yup.string().required('驗證碼必填!'),
    });
}

const registerProgressForm = new RegisterProgressForm();

export default registerProgressForm;
