import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  format
} from 'date-fns';
import Panel from '../../components/organisms/Panel';
import FormField from '../../components/molecules/FormField';
import FormButtons from '../../components/molecules/FormButtons';
import {
  selectIssues
} from '../../state/selectors';

class IssueDetail extends Component {
  constructor(props) {
    super(props);
    const match = props.location.pathname.match(/\/detail\/(\w{24})$/);
    if ( match ) {
      const [ url, id ] = match;
      this.id = id;
      this.issue = props.issues[id];
    }
  }

  componentDidMount() {
    if (_.isEmpty(this.props.issues)) {
      this.props.history.replace('/');
    }
  }

  render() {
    const { issue } =  this;
    const { goBack, push: pushHistory } = this.props.history;

    return issue ? (
      <Panel
        title={`Issue Detail: ${issue.description}`}
        panelClass="bg-primary"
        date={!_.isEmpty(issue.resolved) ? `Closed: ${format(new Date(issue.resolved), 'h:mm A DD/MM/YY')}` : `Opened: ${format(new Date(issue.created), 'h:mm A DD/MM/YY')}`}
      >
        <FormField labelText="Description">{ issue.description }</FormField>
        <FormField labelText="Severity">{ issue.severity }</FormField>
        <FormField labelText="Status">{ issue.status }</FormField>
        <FormField labelText="Created">{ format(new Date(issue.created), 'h:mm A DD/MM/YY') }</FormField>
        { !_.isEmpty(issue.resolved) && <FormField labelText="Resolved">{ format(new Date(issue.resolved), 'h:mm A DD/MM/YY') }</FormField> }
        <FormButtons
          cancel={{
            label: 'Back',
            onClick: goBack
          }}
          submit={{
            label: 'Edit',
            onClick: () => pushHistory(`/edit/${issue.id}`)
          }}
        />
      </Panel>
    ) : null;
  }
}

IssueDetail.propTypes = {
  issues: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  // id not availabe here so just get issues from state
  return {
    issues: selectIssues(state)
  };
};

export default connect(
  mapStateToProps
)(IssueDetail);
