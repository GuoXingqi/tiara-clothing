import {
  signInWithGooglePopup, 
  createUserDocumentFromAuth 
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {

  //sign in and record user auth document
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();//response is user
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <SignUpForm />
    </div>
  )

}

export default SignIn;