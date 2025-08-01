import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';
import genderParser from '../../parsers/genderParser';

class FrReligiousplaceResponse {
  constructor({
    id,
    name,
    birthdate,
    pid,
    gender,
    abode,
    abodeCity,
    abodeTown,
    abodeVillage,
    tel,

    religionName,
    religionPlace,
    religionCity,
    religionTown,
    religionVillage,
    religionTel,

    dormitory,
    basement,
    hall,
    parking,
    space,
    entranceWidth,
    waterwell,
    watertower,
    electromotor,
    extinguisher,

    deputyname,
    deputyid,
    levyReligionname,
    levyType,
    levyUnit,
    levyPlace,
    levyCity,
    levyTown,
    levyVillage,
    levyDate,
    visaquantity,
    creDate,
  }) {
    this.id = id;
    this.name = name;
    this.birthdate = birthdate;
    this.pid = pid;
    this.gender = genderParser(gender);
    this.abode = abode;
    this.abodeCity = abodeCity;
    this.abodeTown = abodeTown;
    this.abodeVillage = abodeVillage;
    this.tel = tel;

    this.religionName = religionName;
    this.religionPlace = religionPlace;
    this.religionCity = religionCity;
    this.religionTown = religionTown;
    this.religionVillage = religionVillage;
    this.religionTel = religionTel;

    this.dormitory = dormitory;
    this.basement = basement;
    this.hall = hall;
    this.parking = parking;
    this.space = space;
    this.entranceWidth = entranceWidth;
    this.waterwell = waterwell;
    this.watertower = watertower;
    this.electromotor = electromotor;
    this.extinguisher = extinguisher;

    this.deputyname = deputyname;
    this.deputyid = deputyid;
    this.levyReligionname = levyReligionname;
    this.levyType = levyType;
    this.levyUnit = levyUnit;
    this.levyPlace = levyPlace;
    this.levyCity = levyCity;
    this.levyTown = levyTown;
    this.levyVillage = levyVillage;
    this.levyDate = levyDate;
    this.visaquantity = visaquantity;

    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default FrReligiousplaceResponse;
