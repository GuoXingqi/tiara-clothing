import { useState, FormEvent, ChangeEvent } from "react";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { 
    signInWithGooglePopup,
    SignInAuthUserWithEmailAndPassword, 
} from '../../utils/firebase/firebase.utils';

import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles";


const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {

  //Sign in with email and passowrd
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  const resetFormfields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await SignInAuthUserWithEmailAndPassword(email, password);
      resetFormfields();
    } catch (error) {
      console.log('user sign in failed', error);


      //code below not suitable to be typed yet, pending on saga
      // switch (error.code) {
      //   case 'auth/wrong-password':
      //     alert("Incorrect password for email!");
      //     break;
      //   case 'auth/user-not-found':
      //     alert('No user associated with this email');
      //     break;
      //   default:
      //     console.log(error);
      // }
    }
  };

  //Google sign in and record user auth document
  const signInWithGoogle = async () => {
    await signInWithGooglePopup();//response is userAuth, pushed to doc in userReducer
  }

  return (
    <SignInContainer>
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

        <ButtonsContainer>
          <Button type='submit'>Sign in</Button>
          <Button 
            type='button' 
            buttonType={BUTTON_TYPE_CLASSES.google} 
            onClick={signInWithGoogle}
          >
            Google sign in
          </Button>
        </ButtonsContainer>
        </form>
    </SignInContainer>
  );

}

export default SignInForm;