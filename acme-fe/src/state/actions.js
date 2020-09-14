import api from '../services/api';
export const GET_ISSUES_RECEIVED = 'GET_ISSUES_RECEIVED';
export const ISSUE_ADDED = 'ISSUE_ADDED';
export const ISSUE_DELETED = 'ISSUE_DELETED';
export const SET_ALERT = 'SET_ALERT';

export const issueAdded = payload => {
  return {
    type: ISSUE_ADDED,
    payload
  };
};

export const issueDeleted = payload => {
  return {
    type: ISSUE_DELETED,
    payload
  };
};

export const getIssuesReceived = payload => {
  return {
    type: GET_ISSUES_RECEIVED,
    payload
  };
};

export const setAlert = payload => {
  return {
    type: SET_ALERT,
    payload
  };
};

export const getIssues = dispatch => {
  api.getIssues(res => {
    const { data } = res;
    dispatch(getIssuesReceived(data));
  });
};

export const addIssue = (item, callback, dispatch) => {
  api.addIssue(item, res => {
    const { id } = res.data;
    const added = {};
    added[id] = {
      id,
      ...res.data
    };
    dispatch(issueAdded(added));
    dispatch(setAlert(`Claim Added OK!`));
    callback();
  }, err => {
    dispatch(setAlert(`Could not create claim: error with provided code`));
    callback();
  });
};

export const deleteIssue = (id, dispatch, callback) => {
  api.deleteIssue(id, res => {
    dispatch(issueDeleted(id));
    dispatch(setAlert(`Claim Deleted!`));
    callback();
  });
};
