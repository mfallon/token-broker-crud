import _ from 'lodash';
import {
  GET_ISSUES_RECEIVED,
  ISSUE_EDITED,
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

/**
*/
const hasProp = (prop, obj) => Object.prototype.hasOwnProperty.call(obj, prop);

/**
* @Private - Iterate through props, setting properties on obj
* if they exist.
*
* @param props {Object} - The properties/values to set
* @param obj {Object} - The object to iterate over
*/
const setProps = (props, obj) => {
  const clone = _.clone(obj);
  Object.keys(props).forEach((prop) => {
    if (hasProp(prop, clone)) {
      clone[prop] = props[prop];
    }
  });
  return clone;
};


const issuesReducer = (state = initialState, action) => {
  const issues = _.clone(selectIssues(state));
  switch (action.type) {
    case GET_ISSUES_RECEIVED:
      return {
        ...state,
        issues: action.payload
      };
    case ISSUE_EDITED:
      const id = Object.keys(action.payload).pop();
      const selected = _.clone(selectIssue(id, state));
      issues[id] = setProps(action.payload[id], selected);
      return {
        ...state,
        issues
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
