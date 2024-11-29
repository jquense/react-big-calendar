import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Navigate as navigate } from '../../../src'

function ViewNamesGroup({ views: viewNames, view, messages, onView }) {
  return viewNames.map((name) => (
    <button
      type="button"
      key={name}
      className={clsx({ 'rbc-active': view === name })}
      onClick={() => onView(name)}
    >
      {messages[name]}
    </button>
  ))
}
ViewNamesGroup.propTypes = {
  messages: PropTypes.object,
  onView: PropTypes.func,
  view: PropTypes.string,
  views: PropTypes.array,
}

export default function CustomToolbar({
  // date, // available, but not used here
  label,
  localizer: { messages },
  onNavigate,
  onView,
  view,
  views,
}) {
  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <ViewNamesGroup
          view={view}
          views={views}
          messages={messages}
          onView={onView}
        />
      </span>

      <span className="rbc-toolbar-label">{label}</span>

      <span className={clsx('rbc-btn-group', 'examples--custom-toolbar')}>
        <button
          type="button"
          onClick={() => onNavigate(navigate.PREVIOUS)}
          aria-label={messages.previous}
          style={{ 
            border: 'none',
            borderRadius: '50%', // Make buttons circular
            padding: '8px 14px', 
            cursor: 'pointer',
            transition: 'box-shadow 0.2s ease-in-out', // Smooth hover transition
          }}
          onMouseEnter={(e) => (e.target.style.boxShadow = '0px 0px 0px 0.5px rgba(0, 0, 0, 0.1)')} // Light gray circle on hover
          onMouseLeave={(e) => (e.target.style.boxShadow = 'none')}
        >
          &#60;
        </button>
        <button
          type="button"
          onClick={() => onNavigate(navigate.TODAY)}
          aria-label={messages.today}
          
          style={{
            border: '1px solid #cccccc', // Light gray border
            borderRadius: '4px', 
            padding: '5px 12px', 
            fontSize: '14px', 
            fontWeight: 'normal',
            cursor: 'pointer', // Indicate clickability
            transition: 'background-color 0.2s ease-in-out', // Smooth hover transition
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#e6e6e6'; // Darker gray on hover
            e.target.style.boxShadow = 'inset 0px 0px 3px 0px rgba(0, 0, 0, 0.2)'; // Inner shadow on hover
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'white'; // Back to original color
            e.target.style.boxShadow = 'none'; // Remove inner shadow
          }}
        >
         Today
        </button>
        <button
          type="button"
          onClick={() => onNavigate(navigate.NEXT)}
          aria-label={messages.next}
          style={{ 
            border: 'none',
            borderRadius: '50%', // Make buttons circular
            padding: '8px 14px', 
            cursor: 'pointer',
            transition: 'box-shadow 0.2s ease-in-out', // Smooth hover transition
          }}
          onMouseEnter={(e) => (e.target.style.boxShadow = '0px 0px 0px 0.5px rgba(0, 0, 0, 0.1)')} // Light gray circle on hover
          onMouseLeave={(e) => (e.target.style.boxShadow = 'none')}
        >
          &#62;
        </button>
      </span>
    </div>
  )
}
CustomToolbar.propTypes = {
  date: PropTypes.instanceOf(Date),
  label: PropTypes.string,
  localizer: PropTypes.object,
  messages: PropTypes.object,
  onNavigate: PropTypes.func,
  onView: PropTypes.func,
  view: PropTypes.string,
  views: PropTypes.array,
}
