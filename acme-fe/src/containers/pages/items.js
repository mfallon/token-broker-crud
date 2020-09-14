import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import {
  format,
  compareDesc
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
    const { showAlert } = this.state;

    const [ resolved, unresolved ] = items;

    const resolvedFiltered = !_.isEmpty(this.state.filter) ?
      resolved.filter(item=> new RegExp(`${this.state.filter}`, 'i').test(item.description)) :
      resolved;

    return (
      <div className="container">
        { showAlert && <Alert message={ alert } /> }
       <Panel title="Resolved Claims" panelClass="bg-primary">
         <div>
            <div className='row filter'>
              <label htmlFor="filter" className="col-sm-4 control-label">Filter by Description:</label>
              <div className='col-sm-8'>
                <input type="text" className="form-control form-control-filter" id="filter" name="filter" placeholder="filter claims by description" onChange={this.setFilter} />
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
          </div>
          { !_.isEmpty(resolvedFiltered) && <div className="mt-3">
            <table className='table table-striped table-condensed'>
              <thead className="text-white bg-secondary">
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Issued</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                { resolvedFiltered.map(item => {
                  return (<tr key={item.id}>
                    <td>{ item.description }</td>
                    <td>{ item.currency + ' ' + item.amount}</td>
                    <td>{`${item.created ? format(new Date(item.created),"dd/MM/yyyy") : ''}`}</td>
                    <td><button onClick={ () => deleteIssue(item.id, this.setAlertTimeout) } className="btn btn-sm btn-outline-danger">Delete</button></td>
                  </tr>)})}
              </tbody>
            </table>
          </div> }
          { _.isEmpty(resolvedFiltered) && <div className="alert alert-success text-center mt-3">
            There are no resolved claims
          </div> }
          <div className="d-flex justify-content-end">
            <Link to="/add" className="btn btn-primary">Add a new claim</Link>
          </div>
        </Panel>
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
      unresolved.sort((a, b) => compareDesc(new Date(a.created), new Date(b.created))),
      resolved.sort((a, b) => compareDesc(new Date(a.resolved), new Date(b.resolved)))
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
