import axios from 'axios';
import _ from 'lodash';

const config = {
  url: '/',
  baseURL: 'http://localhost:8081', // update when on containers
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
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
  validate: (token, callback) => {
    axios.get(`/validate?${token}`, {
      ...config
    })
      .then(res => callback(res))
      .catch(err => errorHandler(err));
  }
};
