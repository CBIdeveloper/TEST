import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';

class FrMajorindustryResponse {
  constructor({
    id,
    name,
    tel,
    deputyname,
    deputytel,

    companyName,
    companyAddress,
    companyCity,
    companyTown,
    companyVillage,
    factoryUniteno,

    factoryStatus,
    factoryAddress,
    factoryCity,
    factoryTown,
    factoryVillage,
    factoryTel,
    factoryNo,
    factoryKind,
    factoryType,
    productName,

    militaryType,
    militaryUnit,
    factoryName,
    militaryUniteno,
    produceSystem,
    produceProject,
    materialName,
    model,
    unit,
    quantity,
    creDate,
  }) {
    this.id = id;
    this.name = name;
    this.tel = tel;
    this.deputyname = deputyname;
    this.deputytel = deputytel;

    this.companyName = companyName;
    this.companyAddress = companyAddress;
    this.companyCity = companyCity;
    this.companyTown = companyTown;
    this.companyVillage = companyVillage;

    this.factoryStatus = factoryStatus;
    this.factoryAddress = factoryAddress;
    this.factoryCity = factoryCity;
    this.factoryTown = factoryTown;
    this.factoryVillage = factoryVillage;
    this.factoryType = factoryType;
    this.productName = productName;
    this.factoryNo = factoryNo;
    this.factoryUniteno = factoryUniteno;

    this.militaryType = militaryType;
    this.militaryUnit = militaryUnit;
    this.factoryName = factoryName;
    this.militaryUniteno = militaryUniteno;
    this.produceSystem = produceSystem;
    this.produceProject = produceProject;
    this.materialName = materialName;
    this.model = model;
    this.unit = unit;
    this.quantity = quantity;

    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default FrMajorindustryResponse;
