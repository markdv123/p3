import React from 'react'
import {TextField, Input} from '@material-ui/core'

export default (props) =>
  props.fieldType === 'textfield' ? (
    <TextField
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={(e) => props.onChange(e)}
      placeholder={props.placeholder}
    />
  ) : (
    <Input
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={(e) => props.onChange(e)}
      placeholder={props.placeholder}
      autoComplete="false"
    />
  )