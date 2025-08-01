import ApiKey from '../../ApiKey';

import { createQuery } from '../../../parsers/queryParser';
import { dateObjectToDateString } from '../../../parsers/dateParser';

export default Object.freeze({
  getReminderList: (date) => {
    const query = createQuery({
      [ApiKey.beganDate]: dateObjectToDateString(date),
    });
    return `${ApiKey.reminder}${query}`;
  },
});
