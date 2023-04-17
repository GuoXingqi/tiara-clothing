import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    SignInAuthUserWithEmailAndPassword, 
} from '../../utils/firebase/firebase.utils.js';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {

  //Sign in with email and passowrd
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  const resetFormfields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    //1) email and password pair isExist in firebre?
    try {

      //const { reponse } = await SignInAuthUserWithEmailAndPassword(email, password);
      await SignInAuthUserWithEmailAndPassword(email, password);
      resetFormfields();
      alert('Sign in with email and password succeeded!')
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert("Incorrect password for email!");
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email');
          break;
        default:
          console.log(error);
      }
    }
  };

  //Google sign in and record user auth document
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();//response is user
    //const userDocRef = await createUserDocumentFromAuth(user); //-solve defined varaible but never used issue.
    await createUserDocumentFromAuth(user);
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label='Email'
          type='text'
          name='email'
          required
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label = 'Password'
          type='password'
          name='password'
          required
          value={password}
          onChange={handleChange}
        />

        <div className="buttons-container">
          <Button type='submit'>Sign in</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
        </div>
        </form>
    </div>
  );

}

export default SignInForm;