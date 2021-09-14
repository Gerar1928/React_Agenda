const Button = ({ action, buttonClass, btnRef, handleClick }) => {
    return (<button className={ buttonClass } ref={ btnRef } onClick={ handleClick }>{ action }</button>);
}

export default Button;