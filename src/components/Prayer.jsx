import React from 'react'

export default function Prayer({name,title}) {
  return (
    <div className='prayer'>
     <p className='nameprayer'> {name} </p>
      <p className='timeprayer'> {title} </p>
     

    </div>
  )
}
