import axios from 'axios';
import _ from 'lodash';

const config = {
  url: '/',
  baseURL: 'http://localhost:8080',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  // transformRequest:
  // transformResponse:
  // params
  // data
  // paramsSerializer
  // timeout
  // withCredentials
  // adapter
  // auth
  // responseType: 'json' // default
  // responseEncoding: 'utf8'
  // xsrfCookieName: 'XSRF-TOKEN'
  // xsrfHeaderName: 'X-XSRF-TOKEN', // default
  // onUploadProgress:
  // onDownloadProgress:
  // maxContentLength:
  // validateStatus:
  // maxRedirects:
  // socketPath:
  // httpAgent:
  // httpsAgent:
  // proxy:
  // cancelToken:
};

const errorHandler = err => {
  if (err.response) {
    // handle 4XX, 5XX errors
    console.log(`Error response ${err.status} from API`, err);
  } else if (err.request) {
    // no response
    console.log('No response from API:', err.request);
  } else {
    console.log('Error:', err.message);
  }
};

export default {
  getIssues: callback => {
    axios.get('', {
      ...config,
      // translates issues array to object keyed on '_id'
      transformResponse: [res => _.keyBy(JSON.parse(res), o => o.id)]
    })
      .then(res => callback(res))
      .catch(err => errorHandler(err));
  },
  addIssue: (issue, callback) => {
    axios.post('', issue, { ...config })
      .then(res => callback(res))
      .catch(err => errorHandler(err));
  },
  editIssue: (id, issue, callback) => {
    axios.put(`/${id}`, issue, { ...config })
      .then(res => callback(res))
      .catch(err => errorHandler(err));
  },
  deleteIssue: (id, callback) => {
    axios.delete(`/${id}`, { ...config })
      .then(res => callback(res))
      .catch(err => errorHandler(err));
  }
};
