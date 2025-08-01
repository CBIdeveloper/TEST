import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      reminders ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getReminder = baseQuery('');

const getReminderById = (id) => baseQuery(`(where: {id: {eq: ${id}}})`);

const getReminderPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getReminderQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getReminder,
  getReminderById,

  getReminderPagination,
  getReminderQueryPagination,
};
