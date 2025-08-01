import { dateObjectToDateString } from '../../parsers/dateParser';

class PlanMobilizationPlanRequest {
  constructor({
    mobilizationPlanSubject,
    mobilizationPlanId,
    releaseDate,
    releaseFirstlevelAgencyId,
    file,
  }) {
    this.mobilizationPlanSubject = mobilizationPlanSubject;
    this.mobilizationPlanId = mobilizationPlanId;
    this.releaseDate = dateObjectToDateString(releaseDate);
    this.releaseFirstlevelAgencyId = releaseFirstlevelAgencyId;
    this.file = file;
  }

  getCreateData = () => {
    const formData = new FormData();
    formData.append('upload_file_list[0].mobilization_plan_subject', this.mobilizationPlanSubject);
    formData.append('upload_file_list[0].mobilization_plan_id', this.mobilizationPlanId);
    formData.append('upload_file_list[0].release_date', this.releaseDate);
    formData.append('upload_file_list[0].release_firstlevel_agency_id', this.releaseFirstlevelAgencyId);
    formData.append('upload_file_list[0].file', this.file);
    return formData;
  };

  getUpdateData = () => {
    const formData = new FormData();
    formData.append('mobilization_plan_subject', this.mobilizationPlanSubject);
    formData.append('mobilization_plan_id', this.mobilizationPlanId);
    formData.append('release_date', this.releaseDate);
    formData.append('release_firstlevel_agency_id', this.releaseFirstlevelAgencyId);
    formData.append('file', this.file);
    return formData;
  };

  getUpdateDataWithoutFile = () => ({
    mobilization_plan_subject: this.mobilizationPlanSubject,
    mobilization_plan_id: this.mobilizationPlanId,
    release_date: this.releaseDate,
    release_firstlevel_agency_id: this.releaseFirstlevelAgencyId,
  });
}

export default PlanMobilizationPlanRequest;
