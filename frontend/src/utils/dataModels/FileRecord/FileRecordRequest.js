class FileRecordRequest {
  constructor({ id, uploadFileList }) {
    this.id = id;
    this.uploadFileList = uploadFileList;
  }

  getFormData = () => {
    const formData = new FormData();
    this.uploadFileList.forEach((item, index) => {
      formData.append(
        `upload_file_list[${index}].business_management_test_id`,
        this.id,
      );
      formData.append(`upload_file_list[${index}].file`, item);
    });
    return formData;
  };

  getAnnouncementFormData = () => {
    const formData = new FormData();
    this.uploadFileList.forEach((item, index) => {
      formData.append(`upload_file_list[${index}].announcement_id`, this.id);
      formData.append(`upload_file_list[${index}].file`, item);
    });
    return formData;
  };
}

export default FileRecordRequest;
