import axios from 'axios';

import HiCosResponse from '../../../dataModels/HiCos/HiCosResponse';

const pkcs11info = () =>
  axios
    .post('http://localhost:61161/pkcs11info')
    .then((response) => new HiCosResponse(response.data));

const sign = (body) =>
  axios
    .post('http://localhost:61161/sign', body, {
      headers: {
        'Content-Type': 'text/plain',
      },
    })
    .then((response) => response);

export default {
  pkcs11info,
  sign,
};
