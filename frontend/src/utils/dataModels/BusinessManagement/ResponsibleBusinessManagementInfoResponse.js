import ResponsibleItem from './ResponsibleItem';

class ResponsibleBusinessManagementInfoResponse {
  constructor({ get_dto_list }) {
    this.data = get_dto_list.reduce((accum, current) => {
      const currentItem = new ResponsibleItem(current);
      const { isRespondedAttatchmentRequired, data, type } = currentItem;
      if (isRespondedAttatchmentRequired && data.length > 0) {
        if (accum[type] === undefined) {
          return {
            ...accum,
            [type]: data,
          };
        }
        accum[type].concat(data);
        return accum;
      }
      return accum;
    }, {});
  }
}

export default ResponsibleBusinessManagementInfoResponse;
