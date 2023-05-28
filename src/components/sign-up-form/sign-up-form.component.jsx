//migration to typescript pending on saga-singin ysers from email&password

//types
import { useState } from 'react';//, ChangeEvent, FormEvent

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

//methods
import { 
  createAuthUserWithEmailAndPassword, 
  createUserDocumentFromAuth 
} from '../../utils/firebase/firebase.utils';

import {SignUpContainer} from './sign-up-form.styles';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmedPassword: '',
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {displayName, email, password, confirmedPassword} = formFields;

  const resetFormfields = () => {
    setFormFields(defaultFormFields);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    //1)confirm password match
    if (password !== confirmedPassword) {
      alert("passwords do not match.");
      return;
    }
    //2)create user auth
    try {
      const {user} = await createAuthUserWithEmailAndPassword(email, password);
      //3)push userAuth to db
      await createUserDocumentFromAuth(user, {displayName});
      resetFormfields();
    } catch (error) {
      console.log('user creation encountered an error', error);

      //error.code not fit to be typed, try this after saga migration
      // if (error.code === 'auth/email-already-in-use') {
      //   alert('Cannot create user, email already in use.');
      // } else {
      //   console.log('user creation encountered an error', error);
      // }
    }
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput 
          label='Display Name' 
          name="displayName" 
          type="text" 
          required 
          value={displayName} 
          onChange={handleChange} 
        />

        <FormInput
          label="Email"
          name="email" 
          type="email" 
          required 
          value={email} 
          onChange={handleChange} 
        />

        <FormInput 
          label="Password"
          name="password" 
          type="password" 
          required 
          value={password} 
          onChange={handleChange} 
        />

        <FormInput 
          label="Confirm Password" 
          name="confirmedPassword" 
          type="password" 
          required 
          value={confirmedPassword} 
          onChange={handleChange} 
        />

        <Button type="submit">Sign up</Button>
    </form>
    </SignUpContainer>
  );
}

export default SignUpForm;