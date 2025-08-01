class SysUserAccountAppliedAttachmentRequest {
  constructor({ id, uploadFile }) {
    this.id = id;
    this.uploadFile = uploadFile;
  }

  getFormData = () => {
    const formData = new FormData();
    formData.append('upload_file_list[0].sys_user_account_id', this.id);
    formData.append('upload_file_list[0].file', this.uploadFile);
    return formData;
  };
}

export default SysUserAccountAppliedAttachmentRequest;
