import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';

class FrFoodResponse {
  constructor({
    id,
    publicfoodBusin,
    publicfoodStock,
    rollingFacility,
    safetyStock,
    safetyDays,
    population,
    availableDays,
    creDate,
  }) {
    this.id = id;
    this.publicfoodBusin = publicfoodBusin;
    this.publicfoodStock = publicfoodStock;
    this.rollingFacility = rollingFacility;
    this.safetyStock = safetyStock;
    this.safetyDays = safetyDays;
    this.population = population;
    this.availableDays = availableDays;

    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default FrFoodResponse;
