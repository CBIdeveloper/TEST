class FirstlevelUnitResponse {
  constructor({ id, fullName, cityId, city }) {
    this.id = id;
    this.fullName = fullName;
    this.cityId = cityId;
    this.city = city.cityName;
  }
}

export default FirstlevelUnitResponse;
