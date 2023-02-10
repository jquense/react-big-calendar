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
        >
          &#60;
        </button>
        <button
          type="button"
          onClick={() => onNavigate(navigate.TODAY)}
          aria-label={messages.today}
        >
          &#8226;
        </button>
        <button
          type="button"
          onClick={() => onNavigate(navigate.NEXT)}
          aria-label={messages.next}
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
