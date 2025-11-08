import React from 'react'

const page = async ({params}) => {
    const {id} = await params
  return (
    <h1>{id}</h1>
  )
}

export default page