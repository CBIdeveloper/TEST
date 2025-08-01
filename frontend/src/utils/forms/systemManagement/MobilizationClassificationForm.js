import BaseForm from '../BaseForm';

class MobilizationClassificationForm extends BaseForm {
  initialValue = (values) => ({
    classificationName: values.classificationName || '',
  });

  validationSchema = () =>
    this.Yup.object().shape({
      classificationName: this.Yup.string()
        .required('動員分類必填！')
        .max(50, '動員分類至多50個字！'),
    });
}

const mobilizationClassificationForm = new MobilizationClassificationForm();

export default mobilizationClassificationForm;
