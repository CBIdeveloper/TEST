import store from '../../store/store';

const getMessage = ({ code, status, responseMessage, entityType }) => {
  const language =
    store.getState().language.languageInfo.languageObject.statusCode;

  if (language[status.toString()] === undefined) {
    return responseMessage || language.unknown;
  }

  if (code === '40003') {
    if (responseMessage === -1) {
      return '帳號或密碼輸入錯誤，請重新輸入';
    }
    return `密碼輸入錯誤${responseMessage}次，請重新輸入`;
  }

  if (status === 500 && code === undefined) {
    return language.unknown;
  }

  if (status === 400 && code === undefined) {
    return language['400']['400'];
  }

  if (status === 401 && code === undefined) {
    return language['401']['401'];
  }

  if (status === 403 && code === undefined) {
    return language['403']['403'];
  }

  if (status === 404 || status === 409) {
    return `${language[status.toString()][code.toString()]} (${entityType})`;
  }

  const message = language[status.toString()][code.toString()];

  return message === undefined ? responseMessage : message;
};

export default {
  getMessage,
};
