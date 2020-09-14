import _ from 'lodash';
import {
  GET_ISSUES_RECEIVED,
  ISSUE_ADDED,
  ISSUE_DELETED,
  SET_ALERT
} from './actions';
import {
  selectIssues,
  selectIssue
} from './selectors';

const initialState = {
  issues: {},
  alert: ''
};

const issuesReducer = (state = initialState, action) => {
  const issues = _.clone(selectIssues(state));
  switch (action.type) {
    case GET_ISSUES_RECEIVED:
      return {
        ...state,
        issues: action.payload
      };
    case ISSUE_ADDED:
      return {
        ...state,
        issues: {
          ...issues,
          ...action.payload
        }
      };
    case ISSUE_DELETED:
      delete issues[action.payload];
      return {
        ...state,
        issues
      };
    case SET_ALERT:
      return {
        ...state,
        alert: action.payload
      };
    default:
      return state;
  }
};

export default issuesReducer;
