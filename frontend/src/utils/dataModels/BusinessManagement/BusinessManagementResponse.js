import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateString } from '../../parsers/dateParser';
import { getUserId } from '../../auth/auth';

class BusinessManagementResponse {
  constructor({
    id,
    title,
    content,
    announcedUserAccountId,
    announcedUserAccount,
    announcedUserAccountJobPosition,
    announcedUserAccountBusinessPhone,
    announcedUserAccountTelephoneExtension,
    announcementDate,
    attachmentDeadlineDate,
    businessManagementTestType,
    businessManagementTestAttachments,
    businessManagementTestRespondedAttachments,
    createdAt,
    createdUserAccountId,
    createdUserAccount,
    announcedUserAccountAgencyType,
    announcedUserAccountFirstlevelAgencyId,
    announcedUserAccountFirstlevelAgency,
    announcedUserAccountSecondaryAgencyId,
    announcedUserAccountSecondaryAgency,
    announcedUserAccountFirstlevelUnitId,
    announcedUserAccountFirstlevelUnit,
    announcedUserAccountMaintainManufacturer,
    announcedUserAccountMilitaryagencyId,
    announcedUserAccountMilitaryagency,
    firstlevelAgencies,
    secondaryAgencies,
    cities,
    firstlevelUnits,
    levels,
    militaryAgencies,
    isRespondedAttatchmentRequired,
    isVisibleToAll,
    isOrganizationClear,
    isGovernmentClear,
    isMilitaryClear,
    isSign,
    isFood,
    isPlace,
    isTraffic,
    isMeetingTimeRequired,
    meetingPeople,
    meetingType,
    meetingTypeName,
    meetingStartDate,
    meetingEndDate,
    meetingDeadlineDate,
    meetingPlace,
    topicList,
    requestList,
    signState,
    businessManagementTestSigns,
  }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.announcedUserAccountId = announcedUserAccountId;
    this.announcedUserAccount = announcedUserAccount.name;
    this.announcedUserAccountJobPosition = announcedUserAccountJobPosition;
    this.jobPosition = announcedUserAccountJobPosition;
    this.announcedUserAccountBusinessPhone = announcedUserAccountBusinessPhone;
    this.businessPhone = announcedUserAccountBusinessPhone;
    this.announcedUserAccountTelephoneExtension =
      announcedUserAccountTelephoneExtension;
    this.telephoneExtension = announcedUserAccountTelephoneExtension;
    this.announcementDate = DateHelper.momentDate(announcementDate);
    this.attachmentDeadlineDate = DateHelper.momentDate(attachmentDeadlineDate);

    this.businessManagementTestType = businessManagementTestType;
    this.businessManagementTestAttachments = businessManagementTestAttachments;
    this.businessManagementTestRespondedAttachments =
      businessManagementTestRespondedAttachments.map((item) => {
        const {
          uploadedAgencyType,
          uploadedFirstlevelAgency,
          uploadedSecondaryAgency,
          uploadedFirstlevelUnit,
          uploadedMaintainManufacturer,
        } = item;
        const uploadedFirstlevelAgencyName =
          uploadedFirstlevelAgency === null
            ? ''
            : uploadedFirstlevelAgency.shortName;
        const uploadedSecondaryAgencyName =
          uploadedSecondaryAgency === null
            ? ''
            : uploadedSecondaryAgency.shortName;
        const uploadedFirstlevelUnitName =
          uploadedFirstlevelUnit === null
            ? ''
            : uploadedFirstlevelUnit.fullName;
        let unitName = '';
        if (uploadedAgencyType === '1') {
          unitName = `${uploadedFirstlevelAgencyName}${uploadedSecondaryAgencyName}`;
        } else if (uploadedAgencyType === '2') {
          unitName = `${uploadedFirstlevelUnitName}`;
        } else if (uploadedAgencyType === '3') {
          unitName = `${uploadedMaintainManufacturer}`;
        } else if (uploadedAgencyType === '4') {
        }

        const uploadedFileName = `${unitName} ${item.createdUserAccount.name}${item.createdUserAccount.jobPosition}：${item.uploadedFileName}`;

        return {
          ...item,
          uploadedFileName,
        };
      });

    this.createdAt = DateHelper.momentDate(createdAt);
    this.createdDate = DateHelper.momentDate(createdAt);
    this.createdUserAccountId = createdUserAccountId;
    this.createdUserAccount = createdUserAccount.name;

    this.announcedUserAccountAgencyType = announcedUserAccountAgencyType;
    this.announcedUserAccountFirstlevelAgencyId =
      announcedUserAccountFirstlevelAgencyId;
    this.announcedUserAccountFirstlevelAgency =
      announcedUserAccountFirstlevelAgency === null
        ? ''
        : announcedUserAccountFirstlevelAgency.shortName;

    this.announcedUserAccountSecondaryAgencyId =
      announcedUserAccountSecondaryAgencyId;
    this.announcedUserAccountSecondaryAgency =
      announcedUserAccountSecondaryAgency === null
        ? ''
        : announcedUserAccountSecondaryAgency.shortName;

    this.announcedUserAccountFirstlevelUnitId =
      announcedUserAccountFirstlevelUnitId;
    this.announcedUserAccountFirstlevelUnit =
      announcedUserAccountFirstlevelUnit === null
        ? ''
        : announcedUserAccountFirstlevelUnit.fullName;

    this.announcedUserAccountMaintainManufacturer =
      announcedUserAccountMaintainManufacturer;

    this.announcedUserAccountMilitaryagencyId =
      announcedUserAccountMilitaryagencyId;
    this.announcedUserAccountMilitaryagency =
      announcedUserAccountMilitaryagency === null
        ? ''
        : announcedUserAccountMilitaryagency.name;

    this.firstlevelAgencies = firstlevelAgencies.map((item) => item.id);
    this.firstlevelAgencyStrings = firstlevelAgencies.map(
      (item) => item.fullName,
    );

    this.firstlevelUnits = firstlevelUnits.map((item) => item.id);
    this.firstlevelUnitStrings = firstlevelUnits.map((item) => item.fullName);

    this.secondaryAgencies = secondaryAgencies.map((item) => item.id);
    this.secondaryAgencyStrings = secondaryAgencies.map(
      (item) => item.fullName,
    );
    this.cities = cities.map((item) => item.id);
    this.cityStrings = cities.map((item) => item.cityName);
    this.levels = levels.map((item) => item.codeId);
    this.militaries = militaryAgencies.map((item) => item.codeId);
    this.isRespondedAttatchmentRequired = isRespondedAttatchmentRequired;
    this.isVisibleToAll = isVisibleToAll;

    // this.announcementUnit = `${this.announcedUserAccountFirstlevelAgency}${this.announcedUserAccountSecondaryAgency}${this.announcedUserAccountFirstlevelUnit}`;
    switch (this.announcedUserAccountAgencyType) {
      case '1':
        this.announcementUnit = `${this.announcedUserAccountFirstlevelAgency}${this.announcedUserAccountSecondaryAgency}`;
        break;
      case '2':
        this.announcementUnit = `${this.announcedUserAccountFirstlevelUnit}`;
        break;
      case '3':
        this.announcementUnit = `${this.announcedUserAccountMaintainManufacturer}`;
        break;
      case '4':
        this.announcementUnit = `${this.announcedUserAccountMilitaryagency}`;
        break;
    }

    this.announcementDateString = dateObjectToDateString(this.announcementDate);
    this.attachmentDeadlineDateString = dateObjectToDateString(
      this.attachmentDeadlineDate,
    );

    this.createdAtString = dateObjectToDateString(this.createdAt);
    this.createdDateString = dateObjectToDateString(this.createdDate);

    this.telephoneNumber = this.announcedUserAccountBusinessPhone;
    if (
      this.announcedUserAccountTelephoneExtension !== null &&
      this.announcedUserAccountTelephoneExtension !== ''
    ) {
      this.telephoneNumber = `${this.telephoneNumber} 分機：${this.announcedUserAccountTelephoneExtension}`;
    }

    this.isSelfCreated = this.createdUserAccountId === Number(getUserId());
    this.isExpired =
      this.attachmentDeadlineDate !== ''
        ? this.attachmentDeadlineDate < new Date()
        : false;

    // For business management form
    this.visibleFirstlevelAgencyIdList = secondaryAgencies.map(
      (item) => item.firstlevelAgencyId,
    );
    this.visibleSecondaryAgencyIdList = secondaryAgencies.map(
      (item) => item.id,
    );

    this.firstlevelAgencies.forEach((item) => {
      this.visibleFirstlevelAgencyIdList.push(item);
      this.visibleSecondaryAgencyIdList.push('');
    });

    this.visibleCityIdList = firstlevelUnits.map((item) => item.cityId);
    this.visibleFirstlevelUnitIdList = firstlevelUnits.map((item) => item.id);
    this.cities.forEach((item) => {
      this.visibleCityIdList.push(item);
      this.visibleFirstlevelUnitIdList.push('');
    });

    this.visiblelevelIdList = militaryAgencies.map((item) => item.codeId);
    this.visibleMilitaryIdList = militaryAgencies.map((item) => item.codeId);
    this.levels.forEach((item) => {
      this.visiblelevelIdList.push(item);
      this.visibleMilitaryIdList.push('');
    });

    this.isOrganizationClear = isOrganizationClear;
    this.isGovernmentClear = isGovernmentClear;
    this.isMilitaryClear = isMilitaryClear;
    this.resultO = {
      visibleFirstlevelAgencyNames: this.visibleFirstlevelAgencyIdList.map(
        (id) => {
          const agency = firstlevelAgencies.find((agency) => agency.id === id);
          return agency ? agency.fullName : '';
        },
      ),
      visibleSecondlevelAgencyNames: this.visibleSecondaryAgencyIdList.map(
        (id) => {
          const agency = secondaryAgencies.find((agency) => agency.id === id);
          return agency ? agency.fullName : '';
        },
      ),
    };
    this.resultO = this.resultO.visibleFirstlevelAgencyNames.map(
      (firstName, index) => {
        const secondName = this.resultO.visibleSecondlevelAgencyNames[index];
        return firstName + secondName;
      },
    );
    this.resultO = this.resultO.filter((item, index, arr) => {
      if (item.length === 3) {
        return true;
      }
      return !arr.some(
        (threeCharItem) =>
          threeCharItem.length === 3 && item.startsWith(threeCharItem),
      );
    });
    this.resultO = this.resultO.join('，');

    this.resultG = {
      visibleCityIdListNames: this.visibleCityIdList.map((id) => {
        const city = cities.find((city) => city.id === id);
        return city ? city.cityName : '';
      }),
      visibleFirstlevelUnitIdListNames: this.visibleFirstlevelUnitIdList.map(
        (id) => {
          const unit = firstlevelUnits.find((unit) => unit.id === id);
          return unit ? unit.fullName : '';
        },
      ),
    };
    this.resultG = this.resultG.visibleCityIdListNames.map(
      (firstName, index) => {
        const secondName = this.resultG.visibleFirstlevelUnitIdListNames[index];
        return firstName + secondName;
      },
    );
    this.resultG = this.resultG.filter((item, index, arr) => {
      if (item.length === 3) {
        return true;
      }
      return !arr.some(
        (threeCharItem) =>
          threeCharItem.length === 3 && item.startsWith(threeCharItem),
      );
    });
    this.resultG = this.resultG.join('，');
    this.isSign = isSign;
    this.isFood = isFood;
    this.isPlace = isPlace;
    this.isTraffic = isTraffic;
    this.isMeetingTimeRequired = isMeetingTimeRequired;
    this.meetingPeople = meetingPeople;
    this.meetingType = meetingType;
    this.meetingTypeName = meetingTypeName;
    this.meetingStartDate = new Date(meetingStartDate);
    this.meetingStartDate.setHours(this.meetingStartDate.getHours() - 8);
    this.meetingEndDate = new Date(meetingEndDate);
    this.meetingEndDate.setHours(this.meetingEndDate.getHours() - 8);
    this.meetingDate = `${DateHelper.momentDateString(
      meetingStartDate,
      'YYYY-MM-DD HH:mm:ss',
    )} \n ${DateHelper.momentDateString(
      meetingEndDate,
      'YYYY-MM-DD HH:mm:ss',
    )}`;
    if (meetingDeadlineDate) {
      const date = new Date(meetingDeadlineDate);
      date.setHours(date.getHours() - 8);
      this.meetingDeadlineDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
      );
    } else {
      this.meetingDeadlineDate = null;
    }
    if (meetingDeadlineDate === null) {
      this.meetingDeadlineDateString = '無';
    } else {
      const date = new Date(meetingDeadlineDate);
      this.meetingDeadlineDateString = date.toISOString().slice(0, 10);
    }
    this.meetingPlace = meetingPlace;
    this.topicList = topicList;
    this.topicListString = topicList
      .map((item, index) => `${index + 1}. ${item.researchTopic}`)
      .join('\n');
    this.topicListEffectString = topicList
      .map((item, index) => `${index + 1}. ${item.effect || ''}`)
      .join('\n');
    this.requestList = requestList;
    this.signState = signState;
    this.businessManagementTestSigns = businessManagementTestSigns;
  }
}

export default BusinessManagementResponse;
