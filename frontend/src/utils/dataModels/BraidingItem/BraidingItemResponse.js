class BraidingItemResponse {
  constructor({ get_dto_list }) {
    this.braidingItemList = get_dto_list.map((item) => ({
      id: item.id,
      fullName: item.full_name,
      mainOrgan: item.main_organ,
      updateCycle: item.update_cycle,
      braidingNum: item.braiding_num,
      systemNum: item.system_num,
      transmissionDate: item.transmission_date,
    }));
  }
}

export default BraidingItemResponse;
