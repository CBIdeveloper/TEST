import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';

class FrBackupWellResponse {
  constructor({
    id,
    unitName,
    unitAddress,
    unitTel,

    backupwellName,
    backupwellX,
    backupwellY,
    dailyWatersupply,
    waterPopulation,
    creDate,
  }) {
    this.id = id;
    this.unitName = unitName;
    this.unitAddress = unitAddress;
    this.unitTel = unitTel;

    this.backupwellName = backupwellName;
    this.backupwellX = backupwellX;
    this.backupwellY = backupwellY;
    this.dailyWatersupply = dailyWatersupply;
    this.waterPopulation = waterPopulation;

    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default FrBackupWellResponse;
