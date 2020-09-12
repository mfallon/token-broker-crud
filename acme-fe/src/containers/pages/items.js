import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import {
  format,
  compareDesc,
  formatDistance
} from 'date-fns';
import PropTypes from 'prop-types';
import Panel from '../../components/organisms/Panel';
import Alert from '../../components/molecules/Alert';

import {
  getIssues,
  deleteIssue
} from '../../state/actions';
import {
  selectIssues,
  selectAlert
} from '../../state/selectors';

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      severity: true,
      status: true,
      created: true,
      filter: '',
      showAlert: false
    };
  }

  componentDidMount() {
    const { getIssues, items } = this.props;
    if (_.isEmpty(items)) {
      getIssues();
    }
    if (!_.isEmpty(this.props.alert)) {
      this.setAlertTimeout();
    }
  }

  // trying to capture when the alert message is updated in props
  shouldComponentUpdate(nextProps) {
    if (nextProps.alert !== this.props.alert) {
      this.setAlertTimeout();
    }
    return true;
  }

  setAlertTimeout = (ms = 2500) => {
    this.setState({ showAlert: true });
    setTimeout(() => {
      this.setState({ showAlert: false });
    }, ms);
  }

  setToggle = evt => {
    const { id } = evt.target;
    const toggle = {};
    toggle[id] = evt.target.checked
    this.setState(toggle);
  }

  setFilter = evt => {
    const { value } = evt.target;
    this.setState({
      filter: value.length > 3 ?
        value : ''
    });
  }

  clearFilter = () => {
    document.querySelector('#filter').value = "";
    this.setState({
      filter: ''
    });
  }

  render() {
    const { items, deleteIssue, alert } = this.props;
    const { push: pushHistory } = this.props.history;
    const { severity, status, created, showAlert } = this.state;

    const [ unresolved, resolved ] = items;

    const unresolvedFiltered = !_.isEmpty(this.state.filter) ?
      unresolved.filter(item=> new RegExp(`${this.state.filter}`, 'i').test(item.description)) :
      unresolved;

    return (
      <div className="container">
        { showAlert && <Alert message={ alert } /> }
        <Panel title="Unresolved Claims" panelClass="bg-primary">
          { !_.isEmpty(unresolvedFiltered) && <div>
            <div className='row filter'>
              <label htmlFor="filter" className="col-sm-4 control-label">Filter by Description:</label>
              <div className='col-sm-8'>
                <input type="text" className="form-control form-control-filter" id="filter" name="filter" placeholder="filter issues by any word" onChange={this.setFilter} />
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={this.clearFilter}
                  title="reset filter"
                  style={{
                    position: 'absolute',
                    top: "5px",
                    right: "22px"
                  }}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
            <div className='row filter pt-2'>
              <label className="col-sm-5 control-label">Show/Hide Columns:</label>
              <div className="col-sm-2 form-check">
                <input className="form-check-input" type="checkbox" id="severity" name="severity" checked={severity} onChange={this.setToggle} />
                <label className="form-check-label" htmlFor="severity">Severity</label>&nbsp;
              </div>
              <div className="col-sm-2 form-check">
                <input className="form-check-input" type="checkbox" id="status" name="status" checked={status} onChange={this.setToggle} />
                <label className="form-check-label" htmlFor="status">Status</label>&nbsp;
              </div>
              <div className="col-sm-2 form-check">
                <input className="form-check-input" type="checkbox" id="created" name="created" checked={created} onChange={this.setToggle} />
                <label className="form-check-label" htmlFor="created">Created</label>&nbsp;
              </div>
            </div>
            <table className='table table-striped table-condensed'>
              <thead className="text-white bg-secondary">
                <tr>
                  <th>Description</th>
                  { severity && <th style={{minWidth: '80px'}}>Severity</th> }
                  { status && <th style={{minWidth: '80px'}}>Status</th> }
                  { created && <th style={{minWidth: '80px'}}>Created</th> }
                  <th> </th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                { unresolvedFiltered.map(item => {
                  return (<tr key={item.id}>
                    <td><Link to={`/detail/${item.id}`}>{ item.description }</Link></td>
                    { severity && <td><span className={`badge badge-secondary ${ item.severity === 'major' ? 'badge-warning' : item.severity === 'critical' ? 'badge-danger' : ''}`}>{ item.severity }</span></td> }
                    { status && <td><span className={`badge badge-secondary ${ item.status === 'in progress' ? 'badge-success' : item.status === 'open' ? 'badge-primary' : ''}`}>{ item.status }</span></td> }
                    { created && <td>{`${formatDistance(new Date(item.created), new Date())} ago`}</td> }
                    <td><button onClick={ () => pushHistory(`/edit/${item.id}`) } className="btn btn-sm btn-outline-primary">Edit</button></td>
                    <td><button onClick={ () => deleteIssue(item.id, this.setAlertTimeout) } className="btn btn-sm btn-outline-danger">Delete</button></td>
                  </tr>)})}
              </tbody>
            </table>
          </div> }
          { _.isEmpty(unresolvedFiltered) && <div className="alert alert-success text-center">
            There are no unresolved claims
          </div> }
          <div className="d-flex justify-content-end">
            <Link to="/add" className="btn btn-primary">Add a new claim</Link>
          </div>
        </Panel>
        { !_.isEmpty(resolved) && <Panel title="Resolved Claims" panelClass="bg-success">
          <table className='table table-striped table-condensed'>
            <thead className="text-white bg-secondary">
              <tr>
                <th>Description</th>
                <th>Severity</th>
                <th>Created</th>
                <th>Closed</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { resolved.map(item => {
                return (<tr key={item.id}>
                  <td><Link to={`/detail/${item.id}`}>{ item.description }</Link></td>
                  <td><span className={`badge badge-secondary ${ item.severity === 'major' ? 'badge-warning' : item.severity === 'critical' ? 'badge-danger' : ''}`}>{ item.severity }</span></td>
                  <td>{`${format(item.created, 'Do [of] MMM \'YY')}`}</td>
                  <td>{`${format(item.resolved, 'Do [of] MMM \'YY')}`}</td>
                  <td><button onClick={ () => pushHistory(`/edit/${item.id}`) } className="btn btn-sm btn-outline-primary">Edit</button></td>
                  <td><button onClick={ () => deleteIssue(item.id, this.setAlertTimeoout) } className="btn btn-sm btn-outline-danger">Delete</button></td>
                </tr>)})}
            </tbody>
          </table>
        </Panel> }
      </div>
    );
  }
}

Items.propTypes = {
  items: PropTypes.array.isRequired,
  getIssues: PropTypes.func.isRequired,
  deleteIssue: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const items = _.values(selectIssues(state));
  const [ unresolved, resolved ] = items.reduce((accum, item) => {
    let [ unresolved, resolved ] = accum;
    if ( item.status === 'closed') {
      resolved = [ ...resolved, item];
    } else {
      unresolved = [ ...unresolved, item];
    }
    return [ unresolved, resolved ];
  }, [[], []]);
  return {
    items: !_.isEmpty(items) ? [
      unresolved.sort((a, b) => compareDesc(a.created, b.created)),
      resolved.sort((a, b) => compareDesc(a.resolved, b.resolved))
    ] : [],
    alert: selectAlert(state)
  };
};

const mapDispatchToProps = dispatch => ({
  getIssues: () => getIssues(dispatch),
  deleteIssue: (id, callback) => deleteIssue(id, dispatch, callback)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Items);
