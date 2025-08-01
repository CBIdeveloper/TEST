import Router from './router';
import { postRequest } from '../../axios/axiosMethod';

import SignInResponse from '../../../dataModels/Authentication/SignInResponse';
import SignInFidoPushResponse from '../../../dataModels/Authentication/SignInFidoPushResponse';
import GeneralResponse from '../../../dataModels/GeneralResponse';

const signIn = (body) =>
  postRequest(Router.signIn, body, {
    withCredentials: true,
  }).then((response) => {
    const { data } = response;
    return new SignInResponse(data);
  });

const signOut = () =>
  postRequest(Router.signOut).then(
    (response) => new GeneralResponse(response.data),
  );

const signInByIdentityNumber = (body) =>
  postRequest(Router.signInByIdentityNumber, body).then((response) => {
    const { data } = response;
    return new SignInResponse(data);
  });

const signInByZero = (body) =>
  postRequest(Router.signInByZero, body).then((response) => {
    const { data } = response;
    return new SignInResponse(data);
  });

const fidoGetSpTicket = (body) =>
  postRequest(Router.fidoGetSpTicket, body).then((response) => {
    const { data } = response;
    return new SignInFidoPushResponse(data);
  });

const fidoRequestAthOrSignPush = (body) =>
  postRequest(Router.fidoRequestAthOrSignPush, body).then((response) => {
    const { data } = response;
    return new SignInFidoPushResponse(data);
  });

const fidoGetAthOrSignResult = (body) =>
  postRequest(Router.fidoGetAthOrSignResult, body).then((response) => {
    const { data } = response;
    return new SignInResponse(data);
  });

export default {
  signIn,
  signOut,
  signInByIdentityNumber,
  signInByZero,
  fidoGetSpTicket,
  fidoRequestAthOrSignPush,
  fidoGetAthOrSignResult,
};
