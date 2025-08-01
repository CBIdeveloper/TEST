import BaseForm from '../BaseForm';

class SystemCodeSetForm extends BaseForm {
  initialValue = (values) => ({
    codeId: values.codeId || '',
    name: values.name || '',
    sequenceNumber: values.sequenceNumber || '',
  });

  validationSchema = () =>
    this.Yup.object().shape({
      codeId: this.Yup.string()
        .required('代碼編號必填！')
        .max(3, '代碼編號至多3個字！')
        .min(1, '代碼編號至少1個字！'),
      name: this.Yup.string()
        .required('代碼項中文名稱必填！')
        .max(50, '代碼項中文名稱至多50個字！'),
      sequenceNumber: this.Yup.number().required('代碼排序必填！'),
    });
}

const systemCodeSetForm = new SystemCodeSetForm();

export default systemCodeSetForm;
