import React from 'react'
import PropTypes from 'prop-types'
import {} from '../helpers/utils'
import Type from './Type.component'
import ControllableNote from './ControllableNote.component'

export default function Prop({ data = {}, name, heading: Heading }) {
  const typeInfo = Type(data)

  return (
    <section key={name}>
      <Heading id={`prop-${name}`}>
        <a href={`#prop-${name}`}>
          <code>{name}</code>
        </a>
        {data.required && <strong>{' required'}</strong>}
        <ControllableNote
          controllable={data.doclets?.controllable}
          type={data.type}
          name={name}
        />
      </Heading>
      <div dangerouslySetInnerHTML={{ __html: data.descriptionHtml }} />

      {name !== 'formats' ? (
        <div style={{ paddingLeft: 0 }}>
          <div>
            {'type: '}
            {typeInfo && typeInfo.type === 'pre' ? (
              typeInfo
            ) : (
              <code>{typeInfo}</code>
            )}
          </div>
          {data.defaultValue && (
            <div>
              default: <code>{data.defaultValue.value.trim()}</code>
            </div>
          )}
        </div>
      ) : (
        <div>
          {Object.keys(data.type.value).map((propName) => (
            <Prop
              data={data.type.value[propName]}
              name={`${name}.${propName}`}
              heading={<h4 />}
            />
          ))}
        </div>
      )}
    </section>
  )
}

Prop.propTypes = {
  data: PropTypes.object,
  name: PropTypes.string,
  heading: PropTypes.any,
}
