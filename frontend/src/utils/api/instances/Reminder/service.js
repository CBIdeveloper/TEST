import Router from './router';
import { getRequest } from '../../axios/axiosMethod';

import ReminderResponse from '../../../dataModels/Reminder/ReminderResponse';

const getReminderList = (date) =>
  getRequest(Router.getReminderList(date)).then(
    (response) => new ReminderResponse(response.data),
  );

export default {
  getReminderList,
};
