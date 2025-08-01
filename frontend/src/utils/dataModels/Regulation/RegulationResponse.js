import DateHelper from '../../helper/DateHelper';
import RegulationEnumType from '../../constants/RegulationEnumType';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';

class RegulationResponse {
  constructor({
    id,
    regulationName,
    regulationUrl,
    regulationType,
    remark,
    abandonAt,
    abandonUserAccountId,
  }) {
    const regulationTypeItem = RegulationEnumType.find(
      (item) => item.value === regulationType,
    );

    this.id = id;
    this.regulationName = regulationName;
    this.regulationUrl = regulationUrl;
    this.regulationType = regulationType;
    this.remark = remark;
    this.abandonAt = DateHelper.momentDate(abandonAt);
    this.abandonUserAccountId = abandonUserAccountId;

    this.regulationTypeString =
      regulationTypeItem === undefined ? '' : regulationTypeItem.text;
    this.abandonAtString = dateObjectToDateTimeString(this.abandonAt);
  }
}

export default RegulationResponse;
