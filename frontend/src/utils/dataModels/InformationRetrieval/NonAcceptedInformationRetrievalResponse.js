import DataSearchConfig from '../../config/dataSearch/dataSearchConfig';

class NonAcceptedInformationRetrievalResponse {
  constructor({ non_accepted_information_retrival_info_dict }) {
    const keys = Object.keys(non_accepted_information_retrival_info_dict);
    this.nonAcceptedDataList = keys
      .map((key) => {
        const configItem = DataSearchConfig.find(
          (config) => config.code === key,
        );
        if (configItem === undefined) return null;
        const { id, name, type, firstLevelAgency, secondaryAgency } =
          configItem;
        const {
          total_number_of_non_accepted_information_retrieval,
          last_period_number_of_accepted_information_retrieval,
          current_period_number_of_non_accepted_information_retrieval,
        } = non_accepted_information_retrival_info_dict[key];

        let hrLastPeriod = '';
        let hrCurrentPeriod = '';
        let frLastPeriod = '';
        let frCurrentPeriod = '';

        if (type === '人力') {
          hrLastPeriod = last_period_number_of_accepted_information_retrieval;
          hrCurrentPeriod =
            total_number_of_non_accepted_information_retrieval === 0
              ? '未上傳'
              : current_period_number_of_non_accepted_information_retrieval;
        }
        if (type === '物力') {
          frLastPeriod = last_period_number_of_accepted_information_retrieval;
          frCurrentPeriod =
            total_number_of_non_accepted_information_retrieval === 0
              ? '未上傳'
              : current_period_number_of_non_accepted_information_retrieval;
        }

        return {
          id,
          type,
          name,
          agencyName: `${firstLevelAgency}${secondaryAgency}`,
          hrLastPeriod,
          hrCurrentPeriod,
          frLastPeriod,
          frCurrentPeriod,
        };
      })
      .filter((item) => item !== null);
  }
}

export default NonAcceptedInformationRetrievalResponse;
