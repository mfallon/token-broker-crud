import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import {
  format
} from 'date-fns';
import PropTypes from 'prop-types';
import Panel from '../../components/organisms/Panel';
import FormField from '../../components/molecules/FormField';
import SelectField from '../../components/atoms/SelectField';
import TextField from '../../components/atoms/TextField';
import FormButtons from '../../components/molecules/FormButtons';
import {
  updateIssue
} from '../../state/actions';
import {
  selectIssues
} from '../../state/selectors';

class IssueEdit extends Component {
  constructor(props) {
    super(props);
    const match = props.location.pathname.match(/\/edit\/(\w{24})$/);
    if ( match ) {
      const [ url, id ] = match;
      this.id = id;
      this.issue = props.issues[id];
    }
    // TODO: add props for created according to interface for Issue
    this.errors = [];
  }

  componentDidMount() {
    if (_.isEmpty(this.props.issues)) {
      this.props.history.replace('/');
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      e.stopPropagation();
      if (!e.target.className.match(/was-validated/)) {
        e.target.className += ' was-validated';
      }
      return;
    }
    const {
      description,
      severity,
      status,
      created,
      resolved
    } = e.target.elements;
    const issue = {
      description: description.value,
      severity: severity.value,
      status: status.value,
      created: created.value,
      resolved: status.value === 'closed' ?
        _.isEmpty(resolved.value) ? new Date().toISOString() : resolved.value
        : ''
    };
    this.props.updateIssue(this.id, issue, () => {
      this.props.history.replace('/');
    });
  }

  render() {
    const { issue, errors } =  this;
    const { goBack } = this.props.history;
    return issue ? (
      <Panel
        title={`Edit Issue: ${issue.description}`}
        panelClass="bg-primary"
        date={!_.isEmpty(issue.resolved) ? `Closed: ${format(new Date(issue.resolved), 'h:mm A DD/MM/YY')}` : `Opened: ${format(new Date(issue.created), 'h:mm A DD/MM/YY')}`}
      >
        <form onSubmit={ this.handleSubmit } className="form-horizontal needs-validation">
          <input type="hidden" id="created" name="created" value={ issue.created } />
          <input type="hidden" id="resolved" name="resolved" value={ issue.resolved } />
          <FormField labelText="Description">
            <TextField
              id="description"
              defaultValue={ issue.description }
              required
            />
          </FormField>
          <FormField labelText="Severity">
            <SelectField
              id="severity"
              defaultValue={ issue.severity }
              opts={[{
                value: 'minor',
                label: 'Minor'
              }, {
                value: 'major',
                label: 'Major'
              }, {
                value: 'critical',
                label: 'Critical'
              }]}
            />
          </FormField>
          <FormField labelText="Status">
            <SelectField
              id="status"
              defaultValue={ issue.status }
              opts={[{
                value: 'open',
                label: 'Open'
              }, {
                value: 'in progress',
                label: 'In Progress'
              }, {
                value: 'closed',
                label: 'Closed'
              }]}
            />
          </FormField>
          <FormButtons
            cancel={{
              label: 'Cancel',
              onClick: goBack
            }}
            submit={{
              label: 'Save',
              disabled: false
            }}
          />
        </form>
      </Panel>
    ) : null;
  }
}

IssueEdit.propTypes = {
  issues: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  // id not availabe here so just get issues from state
  return {
    issues: selectIssues(state)
  };
};

const mapDispatchToProps = dispatch => ({
  updateIssue: (id, issue, callback) => updateIssue(id, issue, callback, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueEdit);
