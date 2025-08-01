class RoleMainResponse {
  constructor({ id, roleName, roleMemo, ownedPermissionGroups }) {
    this.id = id;
    this.roleName = roleName;
    this.roleMemo = roleMemo;
    this.rolePermissionGroupList = ownedPermissionGroups;
    this.rolePermissionGroupIdList = ownedPermissionGroups.map(
      (item) => item.permissionGroupCode,
    );
  }
}

export default RoleMainResponse;
