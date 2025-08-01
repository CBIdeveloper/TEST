import BaseForm from '../../BaseForm';

class MobilizationProgramForm extends BaseForm {
  initialValue = (values) => ({
    isCreate: values.isCreate || false,
    mobilizationProgramSubject: values.mobilizationProgramSubject || '',
    // releaseFirstlevelAgencyId: values.releaseFirstlevelAgencyId || '',
    releaseDate: values.releaseDate || '',
    file: values.file || '',
  });

  validationSchema = () =>
    this.Yup.object().shape({
      isCreate: this.Yup.bool(),
      mobilizationProgramSubject: this.Yup.string()
        .required('公告主旨必填!')
        .max(400, '公告主旨至多400個字！'),
      // releaseFirstlevelAgencyId: this.Yup.string().required('策訂單位必填!'),
      releaseDate: this.Yup.date().required('策定日期必填！'),
      file: this.Yup.string()
        .nullable()
        .when('isCreate', {
          is: true,
          then: this.Yup.string().required('附件必填!'),
        }),
    });
}

const mobilizationProgramForm = new MobilizationProgramForm();

export default mobilizationProgramForm;
