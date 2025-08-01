import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateString } from '../../parsers/dateParser';

class PlanMobilizationClassificationResponse {
  constructor({
    id,
    mobilizationClassificationSubject,
    releaseDate,
    mobilizationClassificationId,
    mobilizationClassification,
    releaseFirstlevelAgencyId,
    releaseFirstlevelAgency,
    createdUserAccountId,
    uploadedFileName,
    updatedAt,
  }) {
    this.id = id;
    this.mobilizationClassificationSubject = mobilizationClassificationSubject;
    this.releaseDate = DateHelper.momentDate(releaseDate);
    this.mobilizationClassificationId = mobilizationClassificationId;
    this.mobilizationClassification =
      mobilizationClassification === null
        ? ''
        : mobilizationClassification.planName;
    this.releaseFirstlevelAgencyId = releaseFirstlevelAgencyId;
    this.releaseFirstlevelAgency =
      releaseFirstlevelAgency === null ? '' : releaseFirstlevelAgency.shortName;
    this.createdUserAccountId = createdUserAccountId;
    // this.uploadedFileName = uploadedFileName;
    this.uploadedFileName = '計畫下載';
    this.updatedAt = DateHelper.momentDate(updatedAt);

    this.releaseDateString = dateObjectToDateString(this.releaseDate);
    this.updatedAtString = dateObjectToDateString(this.updatedAt);
  }
}

export default PlanMobilizationClassificationResponse;
