import axios from 'axios';
import _ from 'lodash';

const config = {
  url: '/',
  baseURL: 'http://localhost:8080',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

const errorHandler = err => {
  if (err.response) {
    // handle 4XX, 5XX errors
    const message = `Error response ${err.status} from API`;
    console.log(message, err);
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
      transformResponse: [res => _.keyBy(JSON.parse(res), o => o.id)]
    })
      .then(res => callback(res))
      .catch(err => errorHandler(err));
  },
  addIssue: (item, callback, fail) => {
    axios.post('', item, { ...config })
      .then(res => callback(res))
      .catch(err => {
        errorHandler(err);
        fail(err);
      });
  },
  deleteIssue: (id, callback) => {
    axios.delete(`/${id}`, { ...config })
      .then(res => callback(res))
      .catch(err => errorHandler(err));
  }
};
