import React, { Fragment } from 'react'

const linkBase =
  'https://github.com/jquense/react-big-calendar/blob/master/stories/demos/exampleCode/'

export default function DemoLink({ fileName, children }) {
  return (
    <Fragment>
      <div style={{ marginBottom: 10 }}>
        <a target="_blank" href={`${linkBase}${fileName}.js`}>
          &lt;\&gt; View Example Source Code
        </a>
      </div>
      {children ? <div style={{ marginBottom: 10 }}>{children}</div> : null}
    </Fragment>
  )
}
