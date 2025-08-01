import BaseForm from '../../BaseForm';

class MobilizationExecutionForm extends BaseForm {
  initialValue = (values) => ({
    isCreate: values.isCreate || false,
    mobilizationExecutionSubject: values.mobilizationExecutionSubject || '',
    cityId: values.cityId || '',
    releaseFirstlevelUnitId: values.releaseFirstlevelUnitId || '',
    releaseDate: values.releaseDate || '',
    file: values.file || '',
  });

  validationSchema = () =>
    this.Yup.object().shape({
      isCreate: this.Yup.bool(),
      mobilizationExecutionSubject: this.Yup.string()
        .required('公告主旨必填！')
        .max(800, '公告主旨至多800個字！'),
      cityId: this.Yup.string().required('縣市必填!'),
      releaseFirstlevelUnitId: this.Yup.string().required('策訂單位必填!'),
      releaseDate: this.Yup.date().required('策訂日期必填!'),
      file: this.Yup.string()
        .nullable()
        .when('isCreate', {
          is: true,
          then: this.Yup.string().required('附件必填!'),
        }),
    });
}

const mobilizationExecutionForm = new MobilizationExecutionForm();

export default mobilizationExecutionForm;
