import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateString } from '../../parsers/dateParser';

class PlanMobilizationExecutionResponse {
  constructor({
    id,
    mobilizationExecutionSubject,
    releaseDate,
    cityId,
    city,
    releaseFirstlevelUnitId,
    releaseFirstlevelUnit,
    createdUserAccountId,
    uploadedFileName,
    updatedAt,
  }) {
    this.id = id;
    this.mobilizationExecutionSubject = mobilizationExecutionSubject;
    this.releaseDate = DateHelper.momentDate(releaseDate);
    this.cityId = cityId;
    this.city = city === null ? '' : city.cityName;
    this.releaseFirstlevelUnitId = releaseFirstlevelUnitId;
    this.releaseFirstlevelUnit =
      releaseFirstlevelUnit === null ? '' : releaseFirstlevelUnit.fullName;
    this.createdUserAccountId = createdUserAccountId;
    // this.uploadedFileName = uploadedFileName;
    this.uploadedFileName = '計畫下載';
    this.updatedAt = DateHelper.momentDate(updatedAt);

    this.releaseDateString = dateObjectToDateString(this.releaseDate);
    this.updatedAtString = dateObjectToDateString(this.updatedAt);
  }
}

export default PlanMobilizationExecutionResponse;
