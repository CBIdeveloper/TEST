import BaseForm from '../../BaseForm';

class RegulationForm extends BaseForm {
  initialValue = (values) => ({
    regulationName: values.regulationName || '',
    regulationUrl: values.regulationUrl || '',
    regulationType: values.regulationType || '',
    remark: values.remark || '',
  });

  validationSchema = () =>
    this.Yup.object().shape({
      regulationName: this.Yup.string()
        .required('法規名稱必填!')
        .max(400, '法規名稱至多400個字！'),
      regulationUrl: this.Yup.string().required('全國法規資料庫連結必填!'),
      regulationType: this.Yup.string().required('法規種類必填!'),
      remark: this.Yup.string().nullable().max(4000, '備註至多4000個字！'),
    });
}

const regulationForm = new RegulationForm();

export default regulationForm;
