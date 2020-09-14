import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Panel from '../../components/organisms/Panel';
import FormField from '../../components/molecules/FormField';
import SelectField from '../../components/atoms/SelectField';
import TextField from '../../components/atoms/TextField';
import FormButtons from '../../components/molecules/FormButtons';
import {
  addIssue
} from '../../state/actions';

class ItemAdd extends Component {

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
      token
    } = e.target.elements;
    // translate to the correct form
    const item = {
      token: token.value
    };
    this.props.addIssue(item, res => {
      this.props.history.replace('/');
    });
  }

  render() {
    const { replace: replaceHistory } = this.props.history;
    return (
      <Panel
        title="Validate a new claim"
        panelClass="bg-primary"
      >
        <form onSubmit={ this.handleSubmit } className="form-horizontal needs-validation" noValidate>
          <FormField labelText="Token">
            <TextField
              id="token"
              placeholder="Paste token value from broker here..."
              required
            />
          </FormField>
          <FormButtons
            cancel={{
              label: 'Cancel',
              onClick: () => replaceHistory('/')
            }}
            submit={{
              label: 'Save',
              disabled: false
            }}
          />
        </form>
      </Panel>
    );
  }
}

ItemAdd.propTypes = {
  addIssue: PropTypes.func.isRequired
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  addIssue: (item, callback) => addIssue(item, callback, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemAdd);
