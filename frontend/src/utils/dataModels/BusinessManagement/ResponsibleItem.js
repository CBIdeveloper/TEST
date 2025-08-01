class ResponsibleItem {
  constructor({
    id,
    announcement_date,
    title,
    is_responded_attatchment_required,
    business_management_test_type,
    is_visible_to_all,
    business_management_test_responded_attachments,
  }) {
    this.isRespondedAttatchmentRequired = is_responded_attatchment_required;
    this.type = business_management_test_type;

    this.data = business_management_test_responded_attachments.map((item) => {
      const {
        uploaded_firstlevel_agency,
        uploaded_secondary_agency,
        uploaded_firstlevel_unit,
      } = item;

      const firstLevelAgency =
        uploaded_firstlevel_agency === null
          ? ''
          : uploaded_firstlevel_agency.short_name;
      const secondaryAgency =
        uploaded_secondary_agency === null
          ? ''
          : uploaded_secondary_agency.short_name;
      const firstLevelUnit =
        uploaded_firstlevel_unit === null
          ? ''
          : uploaded_firstlevel_unit.full_name;

      return {
        title,
        unitName: `${firstLevelAgency}${secondaryAgency}${firstLevelUnit}`,
      };
    });
  }
}

export default ResponsibleItem;
