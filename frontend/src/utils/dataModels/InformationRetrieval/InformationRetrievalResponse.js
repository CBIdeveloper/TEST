import ApprovalStatusType from '../../constants/ApprovalStatusType';
import DataSearchConfig from '../../config/dataSearch/dataSearchConfig';
import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateString } from '../../parsers/dateParser';

class InformationRetrievalResponse {
  constructor({ information_retrival_list }, braidingList) {
    // console.log(information_retrival_list)
    const keys = Object.keys(information_retrival_list);
    // console.log(keys);
    this.dataList = keys
      .map((key) => {
        // console.log(DataSearchConfig)
        const configItem = DataSearchConfig.find(
          (config) => config.code === key,
        );
        const braidingItem = braidingList.find((item) => item.code === key);
        if (configItem === undefined) return null;
        let {
          id,
          name,
          name2,
          type,
          firstLevelAgency,
          secondaryAgency,
          mobilizationPlan,
          mobilizationPlanId,
          mobilizationClassification,
          mobilizationClassificationId,
          braidingNum,
          updateCycle,
          systemNum,
          transmissionDate,
          sort,
          unit,
          code,
        } = configItem;
        const data = information_retrival_list[key];
        const { item1, item2 } = data;
        let approvalUnit = '';
        let approvalStatus = '';
        let approvalStatusValue = '';
        let updatedAtString = '';
        let updatedAtDateObject = '';

        if (item1 !== null && item2 !== null) {
          const { ApprovalStatus, CreDate } = item1;
          const {
            FirstlevelUnitFullName,
            FirstlevelAgencyFullName,
            SecondaryAgencyFullName,
          } = item2;
          const statusItem = ApprovalStatusType.find(
            (item) => item.value === ApprovalStatus,
          );
          approvalStatusValue = ApprovalStatus;
          updatedAtDateObject = DateHelper.momentDate(CreDate);
          updatedAtString = dateObjectToDateString(updatedAtDateObject);
          if (statusItem !== undefined) {
            approvalStatus = statusItem.text;
          }
          approvalUnit = [
            FirstlevelAgencyFullName,
            SecondaryAgencyFullName,
            FirstlevelUnitFullName,
          ]
            .filter((item) => item !== null)
            .join('');
        }

        if (braidingItem !== undefined) {
          name = braidingItem.fullName;
          name2 = braidingItem.fullName;
          sort = braidingItem.sort;
          unit = braidingItem.unit;
          updateCycle = braidingItem.updateCycle;
          systemNum = braidingItem.systemNum;
          transmissionDate = braidingItem.transmissionDate;
          braidingNum = braidingItem.projectManagementNumber;
          code = braidingItem.code;
        }

        return {
          id,
          type,
          name,
          name2,
          mobilizationPlan,
          mobilizationPlanId,
          mobilizationClassification,
          mobilizationClassificationId,
          agencyName: `${firstLevelAgency}${secondaryAgency}`,
          approvalStatus,
          approvalStatusValue,
          updatedAtString,
          updatedAtDateObject,
          approvalUnit,
          mobilizationAgency: `${firstLevelAgency}${secondaryAgency}`,
          sort,
          unit,
          transmissionDate,
          sort2: null,
          updateCycle,
          braidingNum,
          systemNum,
          code,
        };
      })
      .filter((item) => item !== null);
  }
}

export default InformationRetrievalResponse;
