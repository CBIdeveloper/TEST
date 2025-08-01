class FirstlevelUnitListResponse {
  constructor({ get_dto_list }) {
    this.firstlevelUnitList = get_dto_list.map((item) => ({
      id: item.id,
      fullName: item.full_name,
      cityId: item.city_id,
    }));
  }
}
export default FirstlevelUnitListResponse;
