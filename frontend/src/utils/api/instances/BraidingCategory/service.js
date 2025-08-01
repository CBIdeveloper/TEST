import Router from './router';
import apolloInstance from '../../apollo/apolloInstance';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../axios/axiosMethod';

import BraidingCategoryQuery from '../../graphql/BraidingCategory/BraidingCategoryQuery';
import BraidingCategoryResponse from '../../../dataModels/BraidingCategory/BraidingCategoryResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';
import BraidingCategoryListResponse from '../../../dataModels/BraidingCategory/BraidingCategoryListResponse';

const readBraidingCategory = () =>
  apolloInstance
    .query({
      query: BraidingCategoryQuery.getBraidingCategory,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.braidingCategories.items.map(
        (item) => new BraidingCategoryResponse(item),
      );
    });

const readBraidingCategoryById = (id) =>
  apolloInstance
    .query({
      query: BraidingCategoryQuery.getBraidingCategoryById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new BraidingCategoryResponse(data.braidingCategories.items[0]);
    });

const readBraidingCategoryByCode = (code) =>
  apolloInstance
    .query({
      query: BraidingCategoryQuery.getBraidingCategoryByCode(code),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new BraidingCategoryResponse(data.braidingCategories.items[0]);
    });

const readBraidingCategoryByIdList = (list) =>
  apolloInstance
    .query({
      query: BraidingCategoryQuery.getBraidingCategoryByIdList(list),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.braidingCategories.items.map(
        (item) => new BraidingCategoryResponse(item),
      );
    });

const readBraidingCategoryByCategoryType = (type) =>
  apolloInstance
    .query({
      query: BraidingCategoryQuery.getBraidingCategoryByCategoryType(type),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.braidingCategories.items.map(
        (item) => new BraidingCategoryResponse(item),
      );
    });

const readBraidingCategoryByClassificationId = (id) =>
  apolloInstance
    .query({
      query: BraidingCategoryQuery.getBraidingCategoryByClassificationId(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.braidingCategories.items.map(
        (item) => new BraidingCategoryResponse(item),
      );
    });

const readBraidingCategoryByPlanId = (id) =>
  apolloInstance
    .query({
      query: BraidingCategoryQuery.getBraidingCategoryByPlanId(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.braidingCategories.items.map(
        (item) => new BraidingCategoryResponse(item),
      );
    });

const readBraidingCategoryPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: BraidingCategoryQuery.getBraidingCategoryPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.braidingCategories.items.map(
        (item) => new BraidingCategoryResponse(item),
      );
      return new PaginationResponse({
        ...data.braidingCategories,
        items,
      });
    });

const readBraidingCategoryQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: BraidingCategoryQuery.getBraidingCategoryQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.braidingCategories.items.map(
        (item) => new BraidingCategoryResponse(item),
      );
      return new PaginationResponse({
        ...data.braidingCategories,
        items,
      });
    });

const createBraidingCategory = (body) =>
  postRequest(Router.createBraidingCategory, body).then((response) => response);

const updateBraidingCategory = (id, body) =>
  putRequest(Router.updateBraidingCategory(id), body).then(
    (response) => response,
  );

const deleteBraidingCategory = (id, body) =>
  deleteRequest(Router.deleteBraidingCategory(id), body).then(
    (response) => response,
  );

const getBraidingCategoryList = () =>
  getRequest(Router.getBraidingCategoryList).then(
    (response) => new BraidingCategoryListResponse(response.data),
  );

export default {
  readBraidingCategory,
  readBraidingCategoryById,
  readBraidingCategoryByCode,
  readBraidingCategoryByIdList,
  readBraidingCategoryByCategoryType,
  readBraidingCategoryByClassificationId,
  readBraidingCategoryByPlanId,

  readBraidingCategoryPagination,
  readBraidingCategoryQueryPagination,

  createBraidingCategory,
  updateBraidingCategory,
  deleteBraidingCategory,
  getBraidingCategoryList,
};
