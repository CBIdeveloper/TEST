import BaseForm from '../../BaseForm';

class MobilizationClassificationForm extends BaseForm {
  initialValue = (values) => ({
    isCreate: values.isCreate || false,
    mobilizationClassificationSubject:
      values.mobilizationClassificationSubject || '',
    releaseFirstlevelAgencyId: values.releaseFirstlevelAgencyId || '',
    mobilizationClassificationId: values.mobilizationClassificationId || '',
    releaseDate: values.releaseDate || '',
    file: values.file || '',
  });

  validationSchema = () =>
    this.Yup.object().shape({
      isCreate: this.Yup.bool(),
      mobilizationClassificationSubject: this.Yup.string()
        .required('公告主旨必填！')
        .max(800, '公告主旨至多800個字！'),
      releaseFirstlevelAgencyId: this.Yup.string().required('策訂單位必填!'),
      mobilizationClassificationId: this.Yup.string().required('動員分類必填!'),
      releaseDate: this.Yup.date().required('策訂日期必填!'),
      file: this.Yup.string()
        .nullable()
        .when('isCreate', {
          is: true,
          then: this.Yup.string().required('附件必填!'),
        }),
    });
}

const mobilizationClassificationForm = new MobilizationClassificationForm();

export default mobilizationClassificationForm;
