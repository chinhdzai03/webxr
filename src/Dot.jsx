import React from 'react'

function Dot() {
  return (
    <div>
       <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "8px",
        height: "8px",
        backgroundColor: "black",
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
    </div>
  )
}

export default Dot
