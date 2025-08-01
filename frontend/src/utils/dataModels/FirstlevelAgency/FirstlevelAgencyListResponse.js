class FirstlevelAgencyListResponse {
  constructor({ get_dto_list }) {
    this.firstlevelAgencyList = get_dto_list.map((item) => ({
      id: item.id,
      fullName: item.full_name,
      shortName: item.short_name,
      enCode: item.en_code,
    }));
  }
}

export default FirstlevelAgencyListResponse;
