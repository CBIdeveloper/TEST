import decision from '../../assets/images/homepage/ic_decision.png';
import chart from '../../assets/images/homepage/ic_bI.png';
import search from '../../assets/images/homepage/ic_search.png';
import time from '../../assets/images/homepage/ic_time.png';
import system from '../../assets/images/homepage/ic_system.png';
import law from '../../assets/images/homepage/ic_law.png';
import download from '../../assets/images/homepage/ic_download.png';
import chat from '../../assets/images/homepage/ic_chat.png';
import check from '../../assets/images/homepage/ic_check.png';

import ModalHelper from '../helper/ModalHelper';
import Path from '../path/path';
import UrlParser from '../parsers/urlParser';
import {
  getCityId,
  userHasRole,
  getUserId,
  getAgencyType,
  getMilitaryagencyId,
  getAccessToken,
} from '../auth/auth';
import { createQuery } from '../parsers/queryParser';
import QueryType from '../types/QueryType';

const featureConfig = [
  {
    name: '決策報表',
    image: decision,
    type: 'button',
    onClick: () => {
      // console.log(getMilitaryagencyId());
      let city = '';
      if (getAgencyType() === '2') {
        city = getCityId();
      } else if (getAgencyType() === '4') {
        if (
          getMilitaryagencyId() === '001001' ||
          getMilitaryagencyId() === '001002'
        ) {
          city = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22';
        } else if (getMilitaryagencyId() === '002001') {
          city = '22';
        } else if (getMilitaryagencyId() === '002002') {
          city = '18,19';
        } else if (getMilitaryagencyId() === '002003') {
          city = '1,2,3,4,5,6,7,8';
        } else if (getMilitaryagencyId() === '002004') {
          city = '15,16,17';
        } else if (getMilitaryagencyId() === '002005') {
          city = '9,10,11,12,13,14';
        } else if (getMilitaryagencyId() === '002006') {
          city = '1,2,3,4,5,6,7,8,18,21,22';
        } else if (getMilitaryagencyId() === '002007') {
          city = '9,10,11,12,13,14,20';
        } else if (getMilitaryagencyId() === '002008') {
          city = '15,16,17,19,22';
        } else if (getMilitaryagencyId() === '003001') {
          city = '2';
        } else if (getMilitaryagencyId() === '003002') {
          city = '4';
        } else if (getMilitaryagencyId() === '003003') {
          city = '3';
        } else if (getMilitaryagencyId() === '003004') {
          city = '5';
        } else if (getMilitaryagencyId() === '003005') {
          city = '6,7';
        } else if (getMilitaryagencyId() === '003006') {
          city = '8';
        } else if (getMilitaryagencyId() === '003007') {
          city = '9';
        } else if (getMilitaryagencyId() === '003008') {
          city = '10';
        } else if (getMilitaryagencyId() === '003009') {
          city = '11';
        } else if (getMilitaryagencyId() === '003010') {
          city = '12';
        } else if (getMilitaryagencyId() === '003011') {
          city = '13';
        } else if (getMilitaryagencyId() === '003012') {
          city = '15';
        } else if (getMilitaryagencyId() === '003013') {
          city = '16';
        } else if (getMilitaryagencyId() === '003014') {
          city = '17';
        } else if (getMilitaryagencyId() === '003015') {
          city = '1';
        } else if (getMilitaryagencyId() === '003016') {
          city = '19';
        } else if (getMilitaryagencyId() === '003017') {
          city = '18';
        } else if (getMilitaryagencyId() === '003018') {
          city = '22';
        } else if (getMilitaryagencyId() === '003019') {
          city = '20';
        } else if (getMilitaryagencyId() === '003020') {
          city = '21';
        } else if (getMilitaryagencyId() === '003021') {
          city = '-';
        } else if (getMilitaryagencyId() === '003022') {
          city = '-';
        }
      }
      const query = createQuery({
        [QueryType.CITY]: city,
        [QueryType.ID]: getUserId(),
        [QueryType.DID]: decisionReportLink.diD,
      });
      // let decisionReportLink =
      //   'https://10.10.151.11:8443/mstr_test/api_bis.jsp?' +
      //   'city=' +
      //   getCityId() +
      //   '&diD=CD222B90461C5280C0DAF39BA317DBB3'
      // console.log(`${decisionReportLink.url}${query}`);
      window.open(`${decisionReportLink.url}${query}`, '_blank');

      /* 等析數修正好儀表板
      const url = `${decisionReportLink.url}`;
      // const url = `https://10.10.151.11:8443/mstr_test/api_bis.jsp`;
      const token = getAccessToken();
      openWithPost(url, {
        token: token,
      });
      */
    },
    className: 'red',
    access: () => userHasRole(155),
  },
  {
    name: '資訊儀表',
    image: chart,
    type: 'link',
    link: UrlParser([Path.mobilizationEnergyPath, Path.dashboardPath]),
    className: 'red',
    access: () => userHasRole(90),
  },
  {
    name: '報表查詢',
    image: search,
    type: 'link',
    link: UrlParser([Path.mobilizationEnergyPath, Path.reportSearchPath]),
    className: 'red',
    access: () => userHasRole(108),
  },
  {
    name: '業務管考',
    image: time,
    type: 'link',
    link: UrlParser([Path.businessManagementPath, Path.importantPolicyPath]),
    className: 'blue',
    access: () => userHasRole(92),
  },
  {
    name: '資料態樣',
    image: check,
    type: 'link',
    className: 'blue',
    link: UrlParser([Path.dataSearchPath, Path.dataSearchPath]),
    access: () => userHasRole(89),
  },
  {
    name: '系統管理',
    image: system,
    type: 'link',
    link: UrlParser([Path.systemManagementPath, Path.userManagementPath]),
    className: 'blue',
    access: () => userHasRole(109),
  },
  {
    name: '法規查詢',
    image: law,
    type: 'link',
    link: UrlParser([Path.retrievalServicePath, Path.regulationDetailPath]),
    className: 'yellow',
    access: () => userHasRole(103),
  },
  {
    name: '計畫下載',
    image: download,
    type: 'link',
    link: UrlParser([Path.retrievalServicePath, Path.planDownloadPath]),
    className: 'yellow',
    access: () => userHasRole(105),
  },
  {
    name: '聯絡資訊',
    image: chat,
    type: 'link',
    link: UrlParser([Path.retrievalServicePath, Path.contactInformationPath]),
    className: 'yellow',
    access: () => userHasRole(107),
  },
  // {
  //   name: '業務管考',
  //   image: time,
  //   type: 'link',
  //   link: UrlParser([Path.businessManagementPath, Path.importantPolicyPath]),
  //   className: 'blue',
  //   access: () => userHasRole(92),
  // },
  // {
  //   name: '系統管理',
  //   image: system,
  //   type: 'link',
  //   link: UrlParser([Path.systemManagementPath, Path.userManagementPath]),
  //   className: 'blue',
  //   access: () => userHasRole(109),
  // },
  // {
  //   name: 'Q&A專區',
  //   image: qanda,
  //   type: 'link',
  //   link: UrlParser([Path.servePath, Path.qandaPath]),
  //   className: 'blue',
  // },
  // {
  //   name: '線傳考核',
  //   image: check,
  //   type: 'button',
  //   className: 'blue',
  //   onClick: ModalHelper.openMemoModal,
  //   access: () => userHasRole(89),
  // },
];

function openWithPost(url, data) {
  // 動態建立表單
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = url;
  form.target = '_blank';

  // 添加資料欄位
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = data[key];
      form.appendChild(input);
    }
  }

  // 將表單添加到當前 DOM，然後提交
  document.body.appendChild(form);
  form.submit();

  // 提交後刪除表單
  document.body.removeChild(form);
}

export default featureConfig;
