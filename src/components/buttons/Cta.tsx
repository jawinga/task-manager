import React from 'react'

interface buttonProps{

  isOpen:boolean;
  isOpenFunct: ()=>void;

}

export const Cta  = ({isOpen, isOpenFunct}:buttonProps) => {

    const [isActive, setIsActive] = React.useState(false);

    function handleClick() {

        setIsActive((prev) => !prev);
        console.log(`Clicked!, ${ isActive}`);
        isOpenFunct();
    }


  return (
    <button onClick={handleClick} className='cta'>Add task <div className='cta__state'>{isActive? "-" : "+"}</div></button>
  )
}
