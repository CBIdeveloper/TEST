class SecondaryAgencyRequest {
  constructor({ enCode, shortName, fullName, firstlevelAgencyId }) {
    this.en_code = enCode;
    this.short_name = shortName;
    this.full_name = fullName;
    this.firstlevel_agency_id = firstlevelAgencyId;
  }
}

export default SecondaryAgencyRequest;
