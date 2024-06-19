import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'

const HelmetProvider = (props) => {
    const {title} = useSelector(store => store.helmet)

  return (
    <>
        <Helmet title={title}/>
        {props.children}
    </>
  )
}

export default HelmetProvider