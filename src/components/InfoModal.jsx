import React from 'react'

function InfoModal( { setShowInfoModal , videoRef } ) {
  return (
    <div style={{
        zIndex:9999,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
      <div style={{
        zIndex: 9999,
        width: '50%',
        height: '50%',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h1 style={{
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'black',
        }}>Infomation Here</h1>
        <button style={{
            backgroundColor: 'red',
            color: 'white',
            borderRadius: '5px',
            padding: '10px',
            cursor: 'pointer',
        }} onClick={() => {setShowInfoModal(false) ; videoRef.current.play()}}>Close</button>
      </div>
    </div>
  )
}

export default InfoModal
