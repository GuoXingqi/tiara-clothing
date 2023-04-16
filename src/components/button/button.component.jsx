import './button.styles.scss';

/*
3 types of buttons:

default

inverted

google sign in

*/
const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',
}

//what does children do? + sign up font looks bizzard

const Button = ({children, buttonType, ...otherProps}) => {
  return (
    <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      { ...otherProps }
    >
      {children}
    </button>
  );
}

export default Button;