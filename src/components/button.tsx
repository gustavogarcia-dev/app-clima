import React from "react";

interface ButtonProps {
  icon?: React.ReactNode; 
  onSubmit: () => void; 
}

const Button: React.FC<ButtonProps> = ({icon,onSubmit}) =>{

  const handleClick = () => {

    onSubmit();
  };
    return( 
        <button
      className="relative flex items-center justify-center text-white hover:bg-sky-600 rounded-md p-2"
      onClick={handleClick}
    >
      {icon && <span className="">{icon}</span>}
      
      
    </button>
        )
}

export default Button