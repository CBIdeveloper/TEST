class FileUploadResponse {
  constructor({ get_dto_list }) {
    this.fileUploadList = get_dto_list.map((item) => ({
      id: item.id,
      code: item.code,
      state: item.state,
      checkState: item.check_state,
      complianceQuantity: item.compliance_quantity,
      nonComplianceQuantity: item.non_compliance_quantity,
      transState: item.trans_state,
      transUserAccountId: item.trans_user_account_id,
      transAt: item.trans_at,
      transCount: item.trans_count,
      createdUserAccountId: item.created_user_account_id,
      createdAt: item.created_at,
      updatedUserAccountId: item.updated_user_account_id,
      updatedAt: item.updated_at,
      deleteAt: item.delete_at,
      cover: item.cover,
      cityId: item.city_id,
    }));
  }
}

export default FileUploadResponse;
