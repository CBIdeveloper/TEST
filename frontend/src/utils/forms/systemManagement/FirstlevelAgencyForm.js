import BaseForm from '../BaseForm';

import FormikHelper from '../../helper/FormikHelper';

class FirstlevelAgencyForm extends BaseForm {
  initialValue = (values) => ({
    fullName: values.fullName || '',
    shortName: values.shortName || '',
    enCode: values.enCode || '',
  });

  validationSchema = () =>
    this.Yup.object().shape({
      fullName: this.Yup.string()
        .required('二級機關全銜必填！')
        .max(50, '二級機關全銜至多50個字！'),
      shortName: this.Yup.string()
        .required('二級機關簡稱必填！')
        .max(50, '二級機關簡稱至多50個字！'),
      enCode: this.Yup.string()
        .required('英文代碼必填！')
        .min(3, '英文代碼至少三個字！')
        .test('Invalid enCode', '英文代碼必須為全大寫！', (enCode) =>
          FormikHelper.enCodeValidation(enCode),
        ),
    });
}

const firstlevelAgencyForm = new FirstlevelAgencyForm();

export default firstlevelAgencyForm;
