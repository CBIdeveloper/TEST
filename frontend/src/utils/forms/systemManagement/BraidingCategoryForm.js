import BaseForm from '../BaseForm';

class BraidingCategoryForm extends BaseForm {
  initialValue = (values) => ({
    fullName: values.fullName || '',
    categoryType: values.categoryType || '1',
    projectManagementNumber: values.projectManagementNumber || null,
    updateCycle: values.updateCycle || null,
  });

  validationSchema = () =>
    this.Yup.object().shape({
      fullName: this.Yup.string()
        .required('編管類型必填！')
        .max(50, '編管類型至多50個字！'),
      categoryType: this.Yup.string().required('人/物力必填！'),
      // projectManagementNumber: this.Yup.number()
      //   .nullable()
      //   .required('請只輸入數字！'),
    });
}

const braidingCategoryForm = new BraidingCategoryForm();

export default braidingCategoryForm;
