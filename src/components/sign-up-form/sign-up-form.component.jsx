import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

//methods
import { 
  createAuthUserWithEmailAndPassword, 
  createUserDocumentFromAuth 
} from '../../utils/firebase/firebase.utils';

import './sign-up-form.styles.scss';

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
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use.');
      } else {
        console.log('user creation encountered an error', error);
      }
    }
  };

  return (
    <div className='sign-up-container'>
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
    </div>
  );
}

export default SignUpForm;