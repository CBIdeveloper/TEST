class UserDataResponse {
  constructor({ get_dto_list }) {
    this.UserDataList = get_dto_list.map((item) => ({
      maintainManufacturer: item.manufacturer,
      jobPosition: item.job_position,
      businessPhone: item.business_phone,
      email: item.email,
      mobilizationPlanText: item.mobilization_plan_text,
    }));
  }
}

export default UserDataResponse;
