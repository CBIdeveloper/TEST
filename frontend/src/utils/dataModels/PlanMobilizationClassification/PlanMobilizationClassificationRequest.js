import { dateObjectToDateString } from '../../parsers/dateParser';

class PlanMobilizationClassificationRequest {
  constructor({
    mobilizationClassificationSubject,
    mobilizationClassificationId,
    releaseDate,
    releaseFirstlevelAgencyId,
    file,
  }) {
    this.mobilizationClassificationSubject = mobilizationClassificationSubject;
    this.mobilizationClassificationId = mobilizationClassificationId;
    this.releaseDate = dateObjectToDateString(releaseDate);
    this.releaseFirstlevelAgencyId = releaseFirstlevelAgencyId;
    this.file = file;
  }

  getCreateData = () => {
    const formData = new FormData();
    formData.append('upload_file_list[0].mobilization_classification_subject', this.mobilizationClassificationSubject);
    formData.append('upload_file_list[0].mobilization_classification_id', this.mobilizationClassificationId);
    formData.append('upload_file_list[0].release_date', this.releaseDate);
    formData.append('upload_file_list[0].release_firstlevel_agency_id', this.releaseFirstlevelAgencyId);
    formData.append('upload_file_list[0].file', this.file);
    return formData;
  };

  getUpdateData = () => {
    const formData = new FormData();
    formData.append('mobilization_classification_subject', this.mobilizationClassificationSubject);
    formData.append('mobilization_classification_id', this.mobilizationClassificationId);
    formData.append('release_date', this.releaseDate);
    formData.append('release_firstlevel_agency_id', this.releaseFirstlevelAgencyId);
    formData.append('file', this.file);
    return formData;
  };

  getUpdateDataWithoutFile = () => ({
    mobilization_classification_subject: this.mobilizationClassificationSubject,
    mobilization_classification_id: this.mobilizationClassificationId,
    release_date: this.releaseDate,
    release_firstlevel_agency_id: this.releaseFirstlevelAgencyId,
  });
}

export default PlanMobilizationClassificationRequest;
