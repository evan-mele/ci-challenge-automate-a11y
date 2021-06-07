import React from 'react';
import PropTypes from 'prop-types';
import { HEADER_ID } from '../config/constants';

import Layout from '../layout/Layout';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required*'),
  email: Yup.string().email('Invalid email').required('Required'),
});

function validateEmail(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}

function validateUsername(value) {
  let error;
  if (value === 'admin') {
    error = 'Nice try!';
  }
  return error;
}

const ContactUs = props => {
    const { title } = props;

return (
    <Layout headerText={title} title={title}>
       <div id="feedback_form">
            <form action="#" className="ac-form">
              <fieldset className="ac-form__fieldset">

<Formik
       initialValues={{
         firstName: '',
         lastName: '',
         email: '',
       }}
       validationSchema={SignupSchema}
       onSubmit={(values, {resetForm}) => {
         // same shape as initial values
         console.log(values);
         alert ("Click OK to confirm your email submission");
         resetForm({})
       }}>
         {/* {({ isSubmitting}) => (
           <Form>
             <label htmlFor="firstName"> First Name</label>
             <Field name = "firstName" placeholder = "" />
             <label htmlFor="lastName"> Last Name</label>
             <Field name = "lastName" placeholder = "" />
             <label htmlFor="email"> Email</label>
             <Field name = "email" placeholder = "" type = "email" />
             <button type = "submit" disabled = {isSubmitting}>
               Submit
             </button>
           </Form>

         )} */}
      {({ errors, touched, isValidating}) => (
         <Form>
           <label htmlFor="firstName">First Name</label>
           <Field name="firstName" validate={validateUsername}/>
           {errors.firstName && touched.firstName ? (
             <div>{errors.firstName}</div>
           ) : null}
           <label htmlFor="lastName">Last Name</label>
           <Field name="lastName" />
           {errors.lastName && touched.lastName ? (
             <div>{errors.lastName}</div>
           ) : null}
           <label htmlFor="email">Email</label>
           <Field name="email" type="email" validate={validateEmail}/>
           {errors.email && touched.email ? <div>{errors.email}</div> : null}
           <button type="submit">Submit</button>
         </Form>
       )}
      </Formik>
            
                </fieldset>
            </form>
          </div>
    </Layout>
    );
  };

ContactUs.propTypes = {
    title: PropTypes.string.isRequired,
  };
  
  export default ContactUs;
