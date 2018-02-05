import React from 'react'
import PropTypes from 'prop-types'

export default function TitleComponent({ title }) {
  return <div>{title}</div>
}

TitleComponent.propTypes = {
  title: PropTypes.string,
}
