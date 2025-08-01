import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';

class FrVeteranshomesResponse {
  constructor({
    id,
    name,
    title,
    tel,

    orgName,
    orgAddress,
    orgCity,
    orgTown,
    orgVillage,
    orgTel,

    regBedNo,
    occNo,
    occRate,
    adjustBedNo,
    wartmagBedNo,
    creDate,
  }) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.tel = tel;

    this.orgName = orgName;
    this.orgAddress = orgAddress;
    this.orgCity = orgCity;
    this.orgTown = orgTown;
    this.orgVillage = orgVillage;
    this.orgTel = orgTel;

    this.regBedNo = regBedNo;
    this.occNo = occNo;
    this.occRate = occRate;
    this.adjustBedNo = adjustBedNo;
    this.wartmagBedNo = wartmagBedNo;

    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default FrVeteranshomesResponse;
