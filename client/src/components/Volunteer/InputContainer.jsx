import React from 'react'
import classes from "./InputContainer.module.css"
export default function InputContainer({children,message="",isError=false}) {
  return (
    <div className={classes.container}>
        {children}
        <p style={{color:isError?"red":"green"}}>{message}</p>
    </div>
  )
}
