import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';

class FrChemicalProtectResponse {
  constructor({
    id,
    name,
    title,
    tel,

    companyName,
    companyAddress,
    companyCity,
    companyTown,
    companyVillage,
    companyTel,

    equipType,
    equipName,
    quality,
    creDate,
  }) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.tel = tel;

    this.companyName = companyName;
    this.companyAddress = companyAddress;
    this.companyCity = companyCity;
    this.companyTown = companyTown;
    this.companyVillage = companyVillage;
    this.companyTel = companyTel;

    this.equipType = equipType;
    this.equipName = equipName;
    this.quality = quality;

    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default FrChemicalProtectResponse;
