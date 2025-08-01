import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';
import genderParser from '../../parsers/genderParser';

class FrContainerfieldResponse {
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

    factoryName,
    factoryAddress,
    factoryCity,
    factoryTown,
    factoryVillage,
    factoryTel,
    flightCenter,

    containerfield,
    storehouse,
    basement,
    space,
    parking,
    entranceWidth,
    crane,
    stacker,
    tractor,
    electromotor,
    extinguisher,

    deputyname,
    deputyid,
    levyApprovalno,
    levyType,
    levyUnit,
    levyPlace,
    levyCity,
    levyTown,
    levyVillage,
    levyDate,
    levyFactory,
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

    this.factoryName = factoryName;
    this.factoryAddress = factoryAddress;
    this.factoryCity = factoryCity;
    this.factoryTown = factoryTown;
    this.factoryVillage = factoryVillage;
    this.factoryTel = factoryTel;
    this.flightCenter = flightCenter;

    this.containerfield = containerfield;
    this.storehouse = storehouse;
    this.basement = basement;
    this.space = space;
    this.parking = parking;
    this.entranceWidth = entranceWidth;
    this.crane = crane;
    this.stacker = stacker;
    this.tractor = tractor;
    this.electromotor = electromotor;
    this.extinguisher = extinguisher;

    this.deputyname = deputyname;
    this.deputyid = deputyid;
    this.levyApprovalno = levyApprovalno;
    this.levyType = levyType;
    this.levyUnit = levyUnit;
    this.levyPlace = levyPlace;
    this.levyCity = levyCity;
    this.levyTown = levyTown;
    this.levyVillage = levyVillage;
    this.levyDate = levyDate;
    this.levyFactory = levyFactory;
    this.visaquantity = visaquantity;

    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default FrContainerfieldResponse;
