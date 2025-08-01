import BaseForm from '../BaseForm';

import { defaultPermissionGroup } from '../../config/accessControl/accessControlConfig';

class AccessControlForm extends BaseForm {
  initialValue = (values) => ({
    roleName: values.roleName || '',
    roleMemo: values.roleMemo || '',
    rolePermissionGroupIdList: values.rolePermissionGroupIdList || [],
  });

  validationSchema = () =>
    this.Yup.object().shape({
      roleName: this.Yup.string()
        .required('角色名稱必填！')
        .max(100, '角色名稱至多100個字！'),
      roleMemo: this.Yup.string()
        .nullable()
        .max(400, '角色說明名稱至多400個字！'),
      rolePermissionGroupIdList: this.Yup.array().nullable(),
    });
}

const accessControlForm = new AccessControlForm();

export default accessControlForm;
