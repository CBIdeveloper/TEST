class SecondaryAgencyResponse {
  constructor({
    id,
    enCode,
    fullName,
    shortName,
    firstlevelAgencyId,
    firstlevelAgency,
  }) {
    this.id = id;
    this.enCode = enCode;
    this.shortName = shortName;
    this.fullName = fullName;
    this.firstlevelAgencyId = firstlevelAgencyId;
    this.firstlevelAgency = firstlevelAgency.fullName;
    this.firstlevelAgencyShortName = firstlevelAgency.shortName;
  }
}

export default SecondaryAgencyResponse;
