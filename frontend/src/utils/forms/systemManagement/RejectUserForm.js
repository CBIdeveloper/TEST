import BaseForm from '../BaseForm';

class RejectUserForm extends BaseForm {
  initialValue = (values) => ({
    reasonOfFailure: values.reasonOfFailure || '',
  });

  validationSchema = () =>
    this.Yup.object().shape({
      reasonOfFailure: this.Yup.string()
        .required('不同意原因必填！')
        .max(4000, '不同意原因至多4000個字！'),
    });
}

const rejectUserForm = new RejectUserForm();

export default rejectUserForm;
