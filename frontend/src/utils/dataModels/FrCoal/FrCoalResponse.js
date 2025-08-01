import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';

class FrCoalResponse {
  constructor({
    id,
    name,
    tel,

    companyName,
    companyTel,

    type,
    storageName,
    facilityAddress,
    facilityCity,
    facilityTown,
    facilityVillage,
    stock,
    stockDays,
    maxstock,
    maxstockDays,
    dailyUsage,
    safetyStock,
    creDate,
  }) {
    this.id = id;
    this.name = name;
    this.tel = tel;

    this.companyName = companyName;
    this.companyTel = companyTel;

    this.type = type;
    this.storageName = storageName;
    this.facilityAddress = facilityAddress;
    this.facilityCity = facilityCity;
    this.facilityTown = facilityTown;
    this.facilityVillage = facilityVillage;
    this.stock = stock;
    this.stockDays = stockDays;
    this.maxstock = maxstock;
    this.maxstockDays = maxstockDays;
    this.dailyUsage = dailyUsage;
    this.safetyStock = safetyStock;

    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default FrCoalResponse;
