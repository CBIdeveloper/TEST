import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';

class FrMedicineResponse {
  constructor({
    id,
    hospitalName,
    hospitalAddress,
    hospitalCity,
    hospitalTown,
    hospitalVillage,
    hospitalLevel,

    requirementType,
    itemsType,
    items,
    unit,
    manageQuality,
    informQuality,
    informDate,

    levyHospital,
    levyType,
    levyUnit,
    levyPlace,
    levyCity,
    levyTown,
    levyVillage,
    levyDate,
    visitems,
    visaquantity,
    creDate,
  }) {
    this.id = id;
    this.hospitalName = hospitalName;
    this.hospitalAddress = hospitalAddress;
    this.hospitalCity = hospitalCity;
    this.hospitalTown = hospitalTown;
    this.hospitalVillage = hospitalVillage;
    this.hospitalLevel = hospitalLevel;

    this.requirementType = requirementType;
    this.itemsType = itemsType;
    this.items = items;
    this.unit = unit;
    this.manageQuality = manageQuality;
    this.informQuality = informQuality;
    this.informDate = informDate;

    this.levyHospital = levyHospital;
    this.levyType = levyType;
    this.levyUnit = levyUnit;
    this.levyPlace = levyPlace;
    this.levyCity = levyCity;
    this.levyTown = levyTown;
    this.levyVillage = levyVillage;
    this.levyDate = levyDate;
    this.visitems = visitems;
    this.visaquantity = visaquantity;

    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default FrMedicineResponse;
