import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';

class FrRadiationProtectResponse {
  constructor({
    id,
    name,
    email,

    companyName,
    companyAddress,
    companyCity,
    companyTown,
    companyVillage,
    companyTel,

    protectionName,
    quality,
    creDate,
  }) {
    this.id = id;
    this.name = name;
    this.email = email;

    this.companyName = companyName;
    this.companyAddress = companyAddress;
    this.companyCity = companyCity;
    this.companyTown = companyTown;
    this.companyVillage = companyVillage;
    this.companyTel = companyTel;

    this.protectionName = protectionName;
    this.quality = quality;

    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default FrRadiationProtectResponse;
