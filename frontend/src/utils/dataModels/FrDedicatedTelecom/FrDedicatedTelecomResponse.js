import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';
import genderParser from '../../parsers/genderParser';

class FrDedicatedTelecomResponse {
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
    habitation,
    habitatCity,
    habitatTown,
    habitatVillage,
    tel,

    setupName,
    setupAddress,
    setupCity,
    setupTown,
    setupVillage,
    setupPname,
    setupPtel,

    eqType,
    setQuantity,
    levyEnergy,
    frequency,
    power,
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
    this.habitation = habitation;
    this.habitatCity = habitatCity;
    this.habitatTown = habitatTown;
    this.habitatVillage = habitatVillage;
    this.tel = tel;

    this.setupName = setupName;
    this.setupAddress = setupAddress;
    this.setupCity = setupCity;
    this.setupTown = setupTown;
    this.setupVillage = setupVillage;
    this.setupPname = setupPname;
    this.setupPtel = setupPtel;

    this.eqType = eqType;
    this.setQuantity = setQuantity;
    this.levyEnergy = levyEnergy;
    this.frequency = frequency;
    this.power = power;

    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default FrDedicatedTelecomResponse;
