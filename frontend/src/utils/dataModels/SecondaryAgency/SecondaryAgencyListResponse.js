class SecondaryAgencyListResponse {
  constructor({ get_dto_list }) {
    this.secondaryAgencyList = get_dto_list.map((item) => ({
      id: item.id,
      firstlevelAgencyId: item.firstlevel_agency_id,
      fullName: item.full_name,
      shortName: item.short_name,
      enCode: item.en_code,
    }));
  }
}

export default SecondaryAgencyListResponse;
