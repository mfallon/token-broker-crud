export const selectIssues = state => state.issues;
export const selectAlert = state => state.alert;
export const selectIssue = (id, state) => {
  const issues = selectIssues(state);
  return issues.hasOwnProperty(id) ? issues[id] : null;
};
