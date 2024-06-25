import React, { useState } from "react";



export default function Input({value, onChange}){

    
   
 

    return (
        <div>
        <input type="text" className="bg-sky-400 text-white placeholder:text-sky-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50" 
        placeholder="Search city" 
        value={value}
        onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}