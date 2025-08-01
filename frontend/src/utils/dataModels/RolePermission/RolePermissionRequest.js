class RolePermissionRequest {
  constructor({
    urlEntrypoint,
    permissionName,
    displayName,
    isPostable,
    isPutable,
    isDeletable,
    isReadable,
  }) {
    this.url_entrypoint = urlEntrypoint;
    this.permission_name = permissionName;
    this.display_name = displayName;
    this.is_postable = isPostable;
    this.is_putable = isPutable;
    this.is_deletable = isDeletable;
    this.is_readable = isReadable;
  }
}

export default RolePermissionRequest;
