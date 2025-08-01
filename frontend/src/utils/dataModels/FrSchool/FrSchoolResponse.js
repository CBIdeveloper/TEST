import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';
import genderParser from '../../parsers/genderParser';

class FrSchoolResponse {
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

    schoolName,
    schoolAddress,
    schoolCity,
    schoolTown,
    schoolVillage,
    schoolTel,

    classroom,
    activitycentre,
    playground,
    basement,
    gateWidth,
    entranceWidth,
    waterwell,
    watertower,
    electromotor,
    extinguisher,
    tent,

    deputyname,
    deputyid,
    levySchoolname,
    levyType,
    levyUnit,
    levyPlace,
    levyCity,
    levyTown,
    levyVillage,
    levyDate,
    visaquantity,
    levyFacilityType,
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

    this.schoolName = schoolName;
    this.schoolAddress = schoolAddress;
    this.schoolCity = schoolCity;
    this.schoolTown = schoolTown;
    this.schoolVillage = schoolVillage;
    this.schoolTel = schoolTel;

    this.classroom = classroom;
    this.activitycentre = activitycentre;
    this.playground = playground;
    this.basement = basement;
    this.gateWidth = gateWidth;
    this.entranceWidth = entranceWidth;
    this.waterwell = waterwell;
    this.watertower = watertower;
    this.electromotor = electromotor;
    this.extinguisher = extinguisher;
    this.tent = tent;

    this.deputyname = deputyname;
    this.deputyid = deputyid;
    this.levySchoolname = levySchoolname;
    this.levyType = levyType;
    this.levyUnit = levyUnit;
    this.levyPlace = levyPlace;
    this.levyCity = levyCity;
    this.levyTown = levyTown;
    this.levyVillage = levyVillage;
    this.levyDate = levyDate;
    this.visaquantity = visaquantity;
    this.levyFacilityType = levyFacilityType;

    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default FrSchoolResponse;
