import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';

class FrTelecomBusinessResponse {
  constructor({
    id,
    companyName,
    companyAddress,
    companyCity,
    companyTown,
    companyVillage,
    name,
    tel,
    contractorName,
    contractorTel,
    agentName,
    agentTel,
    creDate,
  }) {
    this.id = id;
    this.companyName = companyName;
    this.companyAddress = companyAddress;
    this.companyCity = companyCity;
    this.companyTown = companyTown;
    this.companyVillage = companyVillage;
    this.name = name;
    this.tel = tel;
    this.contractorName = contractorName;
    this.contractorTel = contractorTel;
    this.agentName = agentName;
    this.agentTel = agentTel;

    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default FrTelecomBusinessResponse;
