class RoleMainRequest {
  constructor({ roleName, roleMemo, rolePermissionGroupIdList }) {
    this.role_name = roleName;
    this.role_memo = roleMemo;
    this.permission_group_code_set = rolePermissionGroupIdList;
  }
}

export default RoleMainRequest;
