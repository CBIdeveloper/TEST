import BaseForm from './BaseForm';

import FormikHelper from '../helper/FormikHelper';

class ChangePasswordForm extends BaseForm {
  initialValue = (values) => ({
    accountVerification: values.accountVerification || '',
    accountVerificationCheck: values.accountVerificationCheck || '',
  });

  validationSchema = () =>
    this.Yup.object().shape({
      accountVerification: this.Yup.string()
        .required('密碼必填!')
        .min(8, '密碼至少需要8個字！')
        .max(20, '密碼長度至多20個字！')
        .test('Invalid password', '密碼格式錯誤！', (accountVerification) =>
          FormikHelper.passwordValidation(accountVerification),
        ),
      // accountVerificationCheck: this.Yup.string()
      //   .required('確認密碼必填!')
      //   .min(8, '確認密碼至少需要8個字！')
      //   .max(20, '確認密碼長度至多20個字！')
      //   .test(
      //     'Invalid verification string check',
      //     '確認密碼格式錯誤！',
      //     (accountVerificationCheck) =>
      //       FormikHelper.passwordValidation(accountVerificationCheck),
      //   ),
    });
}

const changePasswordForm = new ChangePasswordForm();

export default changePasswordForm;
