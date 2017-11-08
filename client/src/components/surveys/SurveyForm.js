import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';
import formFields from './formFields';
import validateEmails from '../../utils/validateEmails';


class SurveyForm extends Component {
  renderFields() {
    return (
      _.map(formFields, ({ label, name }) => {
        return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
      })
    );
  }

  render() {
    return(
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}

          <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>

          <button className="teal btn-flat right white-text" type="submit">
            Next <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

// form validation function
function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || ''); // use validateEmails utility

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  // should return an object as required by redux-form
  return errors; // if empty, form is valid
}

export default reduxForm({
  validate, // add validate function
  form: 'surveyForm', // set namespace for form field values -> this.state.form.surveyForm
  destroyOnUnmount: false // persist form data even when this component is unmounted
})(SurveyForm);
