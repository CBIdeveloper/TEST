class CodefileListResponse {
  constructor({ get_dto_list }) {
    this.codefileList = get_dto_list.map((item) => ({
      id: item.code_id,
      parentcodeid: item.parent_code_id,
      name: item.name,
      uid: item.id,
    }));
  }
}

export default CodefileListResponse;
