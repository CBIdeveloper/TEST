import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';

class FrReservoirResponse {
  constructor({
    id,
    unitName,
    unitAddress,
    unitTel,

    reservoirName,
    reservoirX,
    reservoirY,
    functiontype,
    waterStorage,
    maxStorage,
    creDate,
  }) {
    this.id = id;
    this.unitName = unitName;
    this.unitAddress = unitAddress;
    this.unitTel = unitTel;

    this.reservoirName = reservoirName;
    this.reservoirX = reservoirX;
    this.reservoirY = reservoirY;
    this.functiontype = functiontype;
    this.waterStorage = waterStorage;
    this.maxStorage = maxStorage;

    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default FrReservoirResponse;
