class BusinessManagementSignRequest {
  constructor({
    unit,
    jobPosition,
    name,
    telephone,
    isFood,
    foodType,
    isPlace,
    trafficType,
    licensePlate,
  }) {
    this.unit = unit;
    this.job_position = jobPosition;
    this.name = name;
    this.telephone = telephone;
    this.is_food = isFood;
    this.food_type = foodType;
    this.is_place = isPlace;
    this.traffic_type = trafficType;
    this.license_plate = licensePlate;
  }
}

export default BusinessManagementSignRequest;
