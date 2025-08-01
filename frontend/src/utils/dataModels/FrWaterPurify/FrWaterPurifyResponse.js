import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';

class FrWaterPurifyResponse {
  constructor({
    id,
    unitName,
    unitAddress,
    unitTel,

    facilityName,
    facilityX,
    facilityY,
    dailyWatersupply,
    waterPopulation,
    creDate,
  }) {
    this.id = id;
    this.unitName = unitName;
    this.unitAddress = unitAddress;
    this.unitTel = unitTel;

    this.facilityName = facilityName;
    this.facilityX = facilityX;
    this.facilityY = facilityY;
    this.dailyWatersupply = dailyWatersupply;
    this.waterPopulation = waterPopulation;

    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default FrWaterPurifyResponse;
