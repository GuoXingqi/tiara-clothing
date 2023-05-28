import { FC, ButtonHTMLAttributes } from "react";//pre-defined types from react
import { BaseButton, ButtonSpinner, GoogleSignInButton, InvertedButton } from "./button.styles";

//maping to auto-complete
export enum BUTTON_TYPE_CLASSES {
  base = 'base',
  google = 'google-sign-in',
  inverted = 'inverted',
}

//return correct Button styled-component string based on buttonType props
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base):typeof BaseButton => {
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

export type ButtonProps = {
 buttonType ?: BUTTON_TYPE_CLASSES;
 isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;// htmlattribute <html elements>

//children do - React.ReactNode 
const Button:FC<ButtonProps> = ({children, buttonType, isLoading, ...otherProps}) => {
  const CustomButton = getButton(buttonType);

  return (
    <CustomButton disabled={ isLoading } { ...otherProps }>
      { isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
}

export default Button;