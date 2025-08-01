import { dateObjectToDateString } from '../../parsers/dateParser';

class PlanMobilizationProgramRequest {
  constructor({
    mobilizationProgramSubject,
    releaseDate,
    releaseFirstlevelAgencyId,
    file,
  }) {
    this.mobilizationProgramSubject = mobilizationProgramSubject;
    this.releaseDate = dateObjectToDateString(releaseDate);
    // todo: adapt to executive yuan
    this.releaseFirstlevelAgencyId = "";
    this.file = file;
  }

  getCreateData = () => {
    const formData = new FormData();
    formData.append('upload_file_list[0].mobilization_program_subject', this.mobilizationProgramSubject);
    formData.append('upload_file_list[0].release_date', this.releaseDate);
    formData.append('upload_file_list[0].release_firstlevel_agency_id', this.releaseFirstlevelAgencyId);
    formData.append('upload_file_list[0].file', this.file);
    return formData;
  };

  getUpdateData = () => {
    const formData = new FormData();
    formData.append('mobilization_program_subject', this.mobilizationProgramSubject);
    formData.append('release_date', this.releaseDate);
    formData.append('release_firstlevel_agency_id', this.releaseFirstlevelAgencyId);
    formData.append('file', this.file);
    return formData;
  };

  getUpdateDataWithoutFile = () => ({
    mobilization_program_subject: this.mobilizationProgramSubject,
    release_date: this.releaseDate,
    release_firstlevel_agency_id: this.releaseFirstlevelAgencyId,
  });
}

export default PlanMobilizationProgramRequest;
