import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export default ({ authenticated, children, component: Component, ...rest }) => {

  return authenticated === true ? (
    <Route {...rest} component={Component}>
    </Route>
  ) : (
    <Redirect to="/" />
  )
}