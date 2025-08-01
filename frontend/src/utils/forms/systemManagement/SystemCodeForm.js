import BaseForm from '../BaseForm';

class SystemCodeForm extends BaseForm {
  initialValue = (values) => ({
    codeId: values.codeId || '',
    name: values.name || '',
    heading: values.heading || '',
  });

  validationSchema = () =>
    this.Yup.object().shape({
      codeId: this.Yup.string()
        .required('代碼編號必填！')
        .max(3, '代碼編號至多3個字！')
        .min(1, '代碼編號至少1個字！'),
      name: this.Yup.string()
        .required('代碼中文名稱必填！')
        .max(50, '代碼中文名稱至多50個字！'),
      heading: this.Yup.string()
        .required('代碼英文名稱必填！')
        .max(50, '代碼英文名稱至多50個字！'),
    });
}

const systemCodeForm = new SystemCodeForm();

export default systemCodeForm;
