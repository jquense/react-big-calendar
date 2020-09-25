import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { navigate } from './utils/constants'

const Toolbar = ({
  localizer: { messages },
  label,
  views,
  view,
  onView,
  onNavigate,
}) => {
  const nav = useMemo(
    () => ({
      view: newView => onView(newView),
      next: () => onNavigate(navigate.NEXT),
      previous: () => onNavigate(navigate.PREVIOUS),
      today: () => onNavigate(navigate.TODAY),
    }),
    /**
     * TODO: list onNavigate and onView in deps after
     * they've been put in a useCallback
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const viewNamesGroup = function() {
    if (views.length > 1) {
      return views.map(name => (
        <button
          type="button"
          key={name}
          className={clsx({ 'rbc-active': view === name })}
          onClick={() => nav.view(name)}
        >
          {messages[name]}
        </button>
      ))
    }
  }

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={nav.today}>
          {messages.today}
        </button>
        <button type="button" onClick={nav.previous}>
          {messages.previous}
        </button>
        <button type="button" onClick={nav.next}>
          {messages.next}
        </button>
      </span>

      <span className="rbc-toolbar-label">{label}</span>

      <span className="rbc-btn-group">{viewNamesGroup()}</span>
    </div>
  )
}

Toolbar.propTypes = {
  view: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.node.isRequired,
  localizer: PropTypes.object,
  onNavigate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
}

export default Toolbar
