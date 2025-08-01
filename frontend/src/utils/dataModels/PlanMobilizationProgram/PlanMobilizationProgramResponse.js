import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateString } from '../../parsers/dateParser';

class PlanMobilizationProgramResponse {
  constructor({
    id,
    mobilizationProgramSubject,
    releaseDate,
    releaseFirstlevelAgencyId,
    releaseFirstlevelAgency,
    uploadedFileName,
    updatedAt,
  }) {
    this.id = id;
    this.mobilizationProgramSubject = mobilizationProgramSubject;
    this.releaseDate = DateHelper.momentDate(releaseDate);
    // this.releaseFirstlevelAgencyId = releaseFirstlevelAgencyId;
    // this.releaseFirstlevelAgency =
    //   releaseFirstlevelAgency === null ? '' : releaseFirstlevelAgency.shortName;
    this.releaseFirstlevelAgency = '行政院';
    // this.uploadedFileName = uploadedFileName;
    this.uploadedFileName = '計畫下載';
    this.updatedAt = DateHelper.momentDate(updatedAt);

    this.releaseDateString = dateObjectToDateString(this.releaseDate);
    this.updatedAtString = dateObjectToDateString(this.updatedAt);
  }
}

export default PlanMobilizationProgramResponse;
