import api from '../services/api';
export const GET_ISSUES_RECEIVED = 'GET_ISSUES_RECEIVED';
export const ISSUE_EDITED = 'ISSUE_EDITED';
export const ISSUE_ADDED = 'ISSUE_ADDED';
export const ISSUE_DELETED = 'ISSUE_DELETED';
export const SET_ALERT = 'SET_ALERT';

export const issueAdded = payload => {
  return {
    type: ISSUE_ADDED,
    payload
  };
};

export const issueEdited = payload => {
  return {
    type: ISSUE_EDITED,
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

export const updateIssue = (id, issue, callback, dispatch) => {
  api.editIssue(id, issue, res => {
    const { id } = res.data;
    const updated = {};
    updated[id] = {
      id,
      ...issue
    };
    dispatch(issueEdited(updated));
    dispatch(setAlert(`Issue ${id} Updated OK!`));
    callback();
  });
};

export const addIssue = (issue, callback, dispatch) => {
  api.addIssue(issue, res => {
    const { id } = res.data;
    const added = {};
    added[id] = {
      id,
      ...issue
    };
    dispatch(issueAdded(added));
    dispatch(setAlert(`Issue ${id} Added OK!`));
    callback();
  });
};

export const deleteIssue = (id, dispatch, callback) => {
  api.deleteIssue(id, res => {
    dispatch(issueDeleted(id));
    dispatch(setAlert(`Issue ${id} Deleted!`));
    callback();
  });
};
