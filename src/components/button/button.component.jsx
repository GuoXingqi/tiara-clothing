import { BaseButton, GoogleSignInButton, InvertedButton } from "./button.styles";

//maping to auto-complete
export const BUTTON_TYPE_CLASSES = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted',
}

//return correct Button styled-component string based on buttonType props
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
  return (
    //passing buttong Type to the follwing mapping, 
    //for exemple, if buttonType matched with base, return a BaseButton styled-component
    //passing props e.g.: buttonType = {BUTTON_TYPE_CLASSES.google}
    {
      [BUTTON_TYPE_CLASSES.base]: BaseButton,
      [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
      [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[buttonType]
  )
}

//what does children do? + sign up font looks bizzard
const Button = ({children, buttonType, ...otherProps}) => {
  const CustomButton = getButton(buttonType);

  return (
    <CustomButton { ...otherProps }>{children}</CustomButton>
  );
}

export default Button;