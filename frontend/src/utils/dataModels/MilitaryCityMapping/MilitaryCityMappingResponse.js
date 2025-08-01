class MilitaryCityMappingResponse {
  constructor({ get_dto_list }) {
    this.militaryCityMappingList = get_dto_list.map((item) => ({
      cityId: item.city_id,
    }));
  }
}
export default MilitaryCityMappingResponse;
