import axios from 'axios';

const config = {
  url: '/',
  baseURL: 'http://broker-api:8081', // update localhost to broker-api when run on docker
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
};

export default {
  validate: (token, resolve, reject) => {
    console.log("Axios attempting to validate token " + token);
    axios.get(`validate/${token}`, {
      ...config
    })
      .then(res => resolve(res))
      .catch(err => {
        reject(err);
      });
  }
};
