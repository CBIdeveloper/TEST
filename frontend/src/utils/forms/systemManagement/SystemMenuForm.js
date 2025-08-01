import BaseForm from '../BaseForm';

class SystemMenuForm extends BaseForm {
  initialValue = (values) => ({
    menuName: values.menuName || '',
    url: values.url || '',
    controller: values.controller || '',
    action: values.action || '',
    param: values.param || '',
    sequenceNumber: values.sequenceNumber || '',
    isVisible: values.isVisible,
    isCreatable: values.isCreatable,
    isUpdatable: values.isUpdatable,
    isDeletable: values.isDeletable,
    isAuditable: values.isAuditable,
    isExportable: values.isExportable,
    isExisted: values.isExisted,
  });

  validationSchema = () =>
    this.Yup.object().shape({
      menuName: this.Yup.string()
        .required('選單名稱必填！')
        .max(100, '選單名稱至多100個字！'),
      url: this.Yup.string().nullable().max(400, '程式路徑至多400個字！'),
      controller: this.Yup.string()
        .nullable()
        .max(50, 'Controller至多50個字！'),
      action: this.Yup.string().nullable().max(50, 'Action至多50個字！'),
      param: this.Yup.string().nullable().max(50, 'Param至多50個字！'),
      sequenceNumber: this.Yup.number().required('選單排序必填！'),
      isVisible: this.Yup.bool().required('是否可見必填！'),
      isCreatable: this.Yup.bool().required('是否有新增功能必填！'),
      isUpdatable: this.Yup.bool().required('是否有修改功能必填！'),
      isDeletable: this.Yup.bool().required('是否有刪除/停用/廢止功能必填！'),
      isAuditable: this.Yup.bool().required('是否有確認功能必填！'),
      isExportable: this.Yup.bool().required('是否有匯出功能必填！'),
      isExisted: this.Yup.bool().required('資料是否存在必填！'),
    });
}

const systemMenuForm = new SystemMenuForm();

export default systemMenuForm;
