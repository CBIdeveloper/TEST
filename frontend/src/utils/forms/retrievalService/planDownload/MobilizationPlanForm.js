import BaseForm from '../../BaseForm';

class MobilizationPlanForm extends BaseForm {
  initialValue = (values) => ({
    isCreate: values.isCreate || false,
    mobilizationPlanSubject: values.mobilizationPlanSubject || '',
    mobilizationPlanId: values.mobilizationPlanId || '',
    releaseFirstlevelAgencyId: values.releaseFirstlevelAgencyId || '',
    releaseDate: values.releaseDate || '',
    file: values.file || '',
  });

  validationSchema = () =>
    this.Yup.object().shape({
      isCreate: this.Yup.bool(),
      mobilizationPlanSubject: this.Yup.string()
        .required('公告主旨必填！')
        .max(800, '公告主旨至多800個字！'),
      mobilizationPlanId: this.Yup.string().required('動員方案必填!'),
      releaseFirstlevelAgencyId: this.Yup.string().required('策訂單位必填!'),
      releaseDate: this.Yup.date().required('策訂日期必填!'),
      file: this.Yup.string()
        .nullable()
        .when('isCreate', {
          is: true,
          then: this.Yup.string().required('附件必填!'),
        }),
    });
}

const mobilizationPlanForm = new MobilizationPlanForm();

export default mobilizationPlanForm;
