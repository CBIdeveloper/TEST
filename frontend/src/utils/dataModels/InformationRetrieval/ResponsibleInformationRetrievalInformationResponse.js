import DataSearchConfig from '../../config/dataSearch/dataSearchConfig';
import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateString } from '../../parsers/dateParser';

class ResponsibleInformationRetrievalInformationResponse {
  constructor({ responsible_information_retrival_info_dict }) {
    const keys = Object.keys(responsible_information_retrival_info_dict);

    this.data = keys.reduce((accum, key) => {
      const configItem = DataSearchConfig.find((config) => config.code === key);
      if (configItem === undefined) return accum;

      const {
        id,
        name,
        mobilizationPlan,
        mobilizationPlanId,
        mobilizationClassification,
        mobilizationClassificationId,
        code,
      } = configItem;
      const data = responsible_information_retrival_info_dict[key];
      const { item1, item2, item3 } = data;

      const totalCount = item1;
      const dateObject =
        item2 === null ? '' : DateHelper.momentDate(item2.CreDate);
      const dateString =
        dateObject === '' ? '無更新日期' : dateObjectToDateString(dateObject);
      const isError = item3;
      const isEmpty = totalCount === 0;

      if (accum[mobilizationPlanId] === undefined) {
        return {
          ...accum,
          [mobilizationPlanId]: [
            {
              id,
              name,
              mobilizationPlan,
              mobilizationClassification,
              mobilizationClassificationId,
              code,
              totalCount,
              dateString,
              isError,
              isEmpty,
            },
          ],
        };
      }

      accum[mobilizationPlanId].push({
        id,
        name,
        mobilizationPlan,
        mobilizationClassification,
        mobilizationClassificationId,
        code,
        totalCount,
        dateString,
        isError,
        isEmpty,
      });

      return accum;
    }, {});
  }
}

export default ResponsibleInformationRetrievalInformationResponse;
