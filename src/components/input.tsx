<<<<<<< HEAD

interface InputProps {
    value: string;
    onChange: (value: string) => void;
  }

  const Input: React.FC<InputProps> = ({ value, onChange }) => {
=======
import React from "react";

interface InputProps {
    value: string;
    onChange: (newValue: string) => void;
}

const Input: React.FC<InputProps> = ({ value, onChange }) => {    
   
 
>>>>>>> 6b32269961a4d534121ad46e99d9a9baf19c7d91

    return (
        
        <input type="text" className=" bg-sky-400 text-white placeholder:text-sky-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50" 
        placeholder="Search city" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required/>
    
    )
}

<<<<<<< HEAD
export default Input;
=======
export default Input
>>>>>>> 6b32269961a4d534121ad46e99d9a9baf19c7d91
