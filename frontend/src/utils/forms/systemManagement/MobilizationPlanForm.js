import BaseForm from '../BaseForm';

class MobilizationPlanForm extends BaseForm {
  initialValue = (values) => ({
    planName: values.planName || '',
  });

  validationSchema = () =>
    this.Yup.object().shape({
      planName: this.Yup.string()
        .required('動員方案必填！')
        .max(50, '動員方案至多50個字！'),
    });
}

const mobilizationPlanForm = new MobilizationPlanForm();

export default mobilizationPlanForm;
