import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';

class FrGasResponse {
  constructor({
    id,
    unitName,

    type,
    stock,
    storageDay,
    storageFacility,
    storageCity,
    safetyStock,
    creDate,
  }) {
    this.id = id;
    this.unitName = unitName;

    this.type = type;
    this.stock = stock;
    this.storageDay = storageDay;
    this.storageFacility = storageFacility;
    this.storageCity = storageCity;
    this.safetyStock = safetyStock;

    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default FrGasResponse;
