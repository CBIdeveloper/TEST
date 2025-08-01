class CityListResponse {
  constructor({ get_dto_list }) {
    this.cityList = get_dto_list.map((city) => ({
      id: city.id,
      enCode: city.en_code,
      cityName: city.city_name,
      areaCode: city.area_code,
    }));
  }
}

export default CityListResponse;
