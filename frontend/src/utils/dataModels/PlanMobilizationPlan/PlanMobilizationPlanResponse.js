import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateString } from '../../parsers/dateParser';

class PlanMobilizationPlanResponse {
  constructor({
    id,
    mobilizationPlanSubject,
    releaseDate,
    mobilizationPlanId,
    mobilizationPlan,
    releaseFirstlevelAgencyId,
    releaseFirstlevelAgency,
    createdUserAccountId,
    uploadedFileName,
    updatedAt,
  }) {
    this.id = id;
    this.mobilizationPlanSubject = mobilizationPlanSubject;
    this.releaseDate = DateHelper.momentDate(releaseDate);
    this.mobilizationPlanId = mobilizationPlanId;
    this.mobilizationPlan =
      mobilizationPlan === null ? '' : mobilizationPlan.planName;
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

export default PlanMobilizationPlanResponse;
