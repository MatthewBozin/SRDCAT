import React from 'react'

const LandingOption = (props) => {
  return (
    <div className="mbottom20px">
        <div className="button bordered row heading fontsize30 mleft12px mright12px pleft5px" onClick={() => {props.method(props.page)}}>{props.name}</div>
        <div className="mleft40px fontsize8">{props.text}</div>
    </div>
  )
}

export default LandingOption