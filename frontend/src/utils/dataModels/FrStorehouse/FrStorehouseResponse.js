import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';
import genderParser from '../../parsers/genderParser';

class FrStorehouseResponse {
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

    storehouseAddress,
    storehouseCity,
    storehouseTown,
    storehouseVillage,
    storehouseTel,

    storehouseName,
    storehouseArea,
    storehouseVolume,
    freezingFacility,
    basement,
    space,
    entranceWidth,
    crane,
    stacker,
    electromotor,
    extinguisher,

    deputyname,
    deputyid,
    levyStorehousename,
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

    this.storehouseAddress = storehouseAddress;
    this.storehouseCity = storehouseCity;
    this.storehouseTown = storehouseTown;
    this.storehouseVillage = storehouseVillage;
    this.storehouseTel = storehouseTel;

    this.storehouseName = storehouseName;
    this.storehouseArea = storehouseArea;
    this.storehouseVolume = storehouseVolume;
    this.freezingFacility = freezingFacility;
    this.basement = basement;
    this.space = space;
    this.entranceWidth = entranceWidth;
    this.crane = crane;
    this.stacker = stacker;
    this.electromotor = electromotor;
    this.extinguisher = extinguisher;

    this.deputyname = deputyname;
    this.deputyid = deputyid;
    this.levyStorehousename = levyStorehousename;
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

export default FrStorehouseResponse;
