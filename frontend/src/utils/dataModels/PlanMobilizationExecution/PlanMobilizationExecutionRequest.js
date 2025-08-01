import { dateObjectToDateString } from '../../parsers/dateParser';

class PlanMobilizationExecutionRequest {
  constructor({
    mobilizationExecutionSubject,
    releaseDate,
    cityId,
    releaseFirstlevelUnitId,
    file,
  }) {
    this.mobilizationExecutionSubject = mobilizationExecutionSubject;
    this.releaseDate = dateObjectToDateString(releaseDate);
    this.cityId = cityId;
    this.releaseFirstlevelUnitId = releaseFirstlevelUnitId;
    this.file = file;
  }

  getCreateData = () => {
    const formData = new FormData();
    formData.append('upload_file_list[0].mobilization_execution_subject', this.mobilizationExecutionSubject);
    formData.append('upload_file_list[0].release_date', this.releaseDate);
    formData.append('upload_file_list[0].city_id', this.cityId);
    formData.append('upload_file_list[0].release_firstlevel_unit_id', this.releaseFirstlevelUnitId);
    formData.append('upload_file_list[0].file', this.file);
    return formData;
  };

  getUpdateData = () => {
    const formData = new FormData();
    formData.append('mobilization_execution_subject', this.mobilizationExecutionSubject);
    formData.append('release_date', this.releaseDate);
    formData.append('city_id', this.cityId);
    formData.append('release_firstlevel_unit_id', this.releaseFirstlevelUnitId);
    formData.append('file', this.file);
    return formData;
  };

  getUpdateDataWithoutFile = () => ({
    mobilization_execution_subject: this.mobilizationExecutionSubject,
    release_firstlevel_unit_id: this.releaseFirstlevelUnitId,
    city_id: this.cityId,
    release_date: this.releaseDate,
  });
}

export default PlanMobilizationExecutionRequest;
