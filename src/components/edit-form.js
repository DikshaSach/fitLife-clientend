import React from 'react';
import Input from './input';
import {withRouter} from 'react-router-dom';
import {Field, reduxForm, focus} from 'redux-form';
import {addEventsData} from '../reducers/events';
import {required, nonEmpty} from '../validators';
import requiresLogin from './requires-login';
import {connect} from 'react-redux';
import {makeDateFromISOString} from '../utils';
import Select from './select';
export class EditForm extends React.Component {
    
render(){ let error;
    if (this.props.error) {
        error = (
            <div className="form-error" aria-live="polite">
                {this.props.error}
            </div>
        );
}
  return(
    <div className="exercise-form-container">
    <form
        className="exercise-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values)
        )}>
        {error}
        <label htmlFor="title">Title</label>
        <Field 
            component={Input}
            type="text"
            name="title"
            id="title"
            validate={[required, nonEmpty]}
        />  
        <label>Time Spent</label>
        <Field
            type="text"
            id="time"
            name="time"
            component={Select}
            options={{
            "10-minutes": '10 minutes', 
            "20-minutes":'20 minutes', 
            "30-minutes": '30 minutes',
            "40-minutes": '40 minutes', 
            "50-minutes": '50 minutes', 
            "60-minutes": '60 minutes'
            }}
            valueField="value"
        />
   
        <label htmlFor="start">start</label>
        <Field 
            component={Input}
            type="Date"
            name="start"
            id="start"
            validate={[required, nonEmpty]}
        />
      
       
        
        <button disabled={this.props.pristine || this.props.submitting}>
        submitting
        </button>
    </form>
    </div>
  )
    
}
}


const mapStateToProps = state => {
    
    const {currentUser} = state.auth;
    return {
        id: `${currentUser.id}`
    };
};

export default  requiresLogin()(connect(mapStateToProps)(reduxForm({
    form: 'editexercise',
    onSubmitFail: (errors, dispatch) => dispatch(focus('editexercise', 'title'))
})(withRouter(EditForm))));
