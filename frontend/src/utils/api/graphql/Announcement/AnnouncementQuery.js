import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      announcements ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          title
          content
          isPinned
          announcementBeganAt
          announcementEndedAt
          announcementAttachments {
            id
            uploadedFileName
            createdUserAccountId
          }
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getAnnouncement = baseQuery(
  '(order: [{ isPinned: DESC }, {announcementBeganAt: DESC}])',
);

const getAnnouncementById = (id) =>
  baseQuery(
    `(where: {id: {eq: ${id}}}, order: [{ isPinned: DESC }, {announcementBeganAt: DESC}])`,
  );

const getAnnouncementPagination = ({ take, skip }) =>
  baseQuery(
    `(take: ${take}, skip: ${skip}, order: [{ isPinned: DESC }, {announcementBeganAt: DESC}])`,
  );

const getAnnouncementQueryPagination = ({ query, take, skip }) =>
  baseQuery(
    `(${query}, take: ${take}, skip: ${skip}, order: [{ isPinned: DESC }, {announcementBeganAt: DESC}])`,
  );

export default {
  getAnnouncement,
  getAnnouncementById,

  getAnnouncementPagination,
  getAnnouncementQueryPagination,
};
