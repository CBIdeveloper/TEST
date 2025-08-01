import { dateObjectToDateString, dateObjectToDateTimeString } from '../../parsers/dateParser';

class BusinessManagementRequest {
  constructor({
    announcedUserAccountId,
    announcementDate,
    jobPosition,
    businessPhone,
    telephoneExtension,
    title,
    topicList,
    content,
    isRespondedAttatchmentRequired,
    isVisibleToAll,
    attachmentDeadlineDate,
    businessManagementTestType,
    visibleFirstlevelAgencyIdList,
    visibleSecondaryAgencyIdList,
    visibleCityIdList,
    visibleFirstlevelUnitIdList,
    visibleLevelIdList,
    visibleMilitaryIdList,
    isOrganizationClear,
    isGovernmentClear,
    isMilitaryClear,
    isSign,
    meetingStartDate,
    meetingEndDate,
    meetingType,
    meetingPeople,
    meetingPlace,
    isMeetingTimeRequired,
    meetingDeadlineDate,
    hasFood,
    hasPlace,
    hasTraffic,
    questionTypeList,
    isRequiredList,
    questionList,
    optionList,
  }) {
    this.announced_user_account_id = announcedUserAccountId.toString();
    this.announcement_date = dateObjectToDateString(announcementDate);
    this.announced_user_account_job_position = jobPosition;
    this.announced_user_account_business_phone = businessPhone;
    this.announced_user_account_telephone_extension = telephoneExtension;
    this.title = title;
    this.topic_list = topicList;
    this.content = content;

    this.is_responded_attatchment_required = isRespondedAttatchmentRequired;
    this.is_visible_to_all = isVisibleToAll;
    this.attachment_deadline_date = dateObjectToDateString(
      attachmentDeadlineDate,
    );
    this.business_management_test_type = businessManagementTestType;
    this.visible_firstlevel_agency_id_list = visibleFirstlevelAgencyIdList;
    this.visible_secondary_agency_id_list = visibleSecondaryAgencyIdList;
    this.visible_city_id_list = visibleCityIdList;
    this.visible_firstlevel_unit_id_list = visibleFirstlevelUnitIdList;
    this.visible_level_id_list = visibleLevelIdList;
    this.visible_military_id_list = visibleMilitaryIdList;
    this.is_organization_clear = isOrganizationClear;
    this.is_government_clear = isGovernmentClear;
    this.is_military_clear = isMilitaryClear;

    this.is_sign = isSign;
    this.meeting_start_date = dateObjectToDateTimeString(meetingStartDate);
    this.meeting_end_date = dateObjectToDateTimeString(meetingEndDate);
    this.meeting_type = meetingType;
    this.meeting_people = meetingPeople;
    this.meeting_place = meetingPlace;
    this.is_meeting_time_required = isMeetingTimeRequired;
    this.meeting_deadline_date = meetingDeadlineDate
      ? dateObjectToDateTimeString(meetingDeadlineDate)
      : null;
    this.is_food = hasFood;
    this.is_place = hasPlace;
    this.is_traffic = hasTraffic;

    this.question_type_list = questionTypeList;
    this.is_required_list = isRequiredList;
    this.request_list = questionList;
    this.option_list = optionList;
  }
}

export default BusinessManagementRequest;
