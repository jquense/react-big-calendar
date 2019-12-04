import React from 'react'
import Api from './Api'
import Intro from './Intro.md'
import { render } from 'react-dom'
import Layout from 'react-tackle-box/Layout'

import localizer from 'react-big-calendar/lib/localizers/globalize'
import globalize from 'globalize'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import 'react-big-calendar/lib/sass/styles.scss'
import './styles.scss'
import './prism.scss'
import Card from './Card'
import ExampleControlSlot from './ExampleControlSlot'
import Basic from './demos/basic'
import Selectable from './demos/selectable'
import CreateEventWithNoOverlap from './demos/createEventWithNoOverlap'
import Cultures from './demos/cultures'
import Popup from './demos/popup'
import Rendering from './demos/rendering'
import CustomView from './demos/customView'
import Resource from './demos/resource'
import DndResource from './demos/dndresource'
import Timeslots from './demos/timeslots'
import Dnd from './demos/dnd'
import DndOutsideSource from './demos/dndOutsideSource'
import Dropdown from 'react-bootstrap/lib/Dropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'

const globalizeLocalizer = localizer(globalize)

let demoRoot =
  'https://github.com/intljusticemission/react-big-calendar/tree/master/examples/demos'

const EXAMPLES = {
  basic: 'Basic Calendar',
  selectable: 'Create events',
  createEventWithNoOverlap: 'Create events with no-overlap algorithm',
  cultures: 'Localization',
  popup: 'Show more via a popup',
  timeslots: 'Custom Time Grids',
  rendering: 'Customized Component Rendering',
  customView: 'Custom Calendar Views',
  resource: 'Resource Scheduling',
  dnd: 'Addon: Drag and drop',
  dndresource: 'Resource Drag and drop',
  dndOutsideSource: 'Addon: Drag and drop (from outside calendar)',
}

const DEFAULT_EXAMPLE = 'basic'

class Example extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      selected: DEFAULT_EXAMPLE,
    }
  }

  select = selected => {
    this.setState({ selected })
  }

  componentDidMount() {
    const hash = (window.location.hash || '').slice(1)
    this.select(hash || DEFAULT_EXAMPLE)
  }

  render() {
    let selected = this.state.selected
    let Current = {
      basic: Basic,
      selectable: Selectable,
      cultures: Cultures,
      popup: Popup,
      rendering: Rendering,
      customView: CustomView,
      resource: Resource,
      timeslots: Timeslots,
      dnd: Dnd,
      dndresource: DndResource,
      dndOutsideSource: DndOutsideSource,
      createEventWithNoOverlap: CreateEventWithNoOverlap,
    }[selected]

    return (
      <div className="app">
        <div className="jumbotron">
          <div className="container">
            <h1>
              Big Calendar <i className="fa fa-calendar" />
            </h1>
            <p>such enterprise, very business.</p>
            <p>
              <a href="#intro">
                <i className="fa fa-play" /> Getting started
              </a>
              {' | '}
              <a href="#api">
                <i className="fa fa-book" /> API documentation
              </a>
              {' | '}
              <a
                target="_blank"
                href="https://github.com/intljusticemission/react-big-calendar"
              >
                <i className="fa fa-github" /> github
              </a>
            </p>
          </div>
        </div>
        <div className="examples">
          <Card className="examples--header">
            <Layout
              align="center"
              justify="space-between"
              style={{ marginBottom: 15 }}
            >
              <div className="examples--view-source">
                <a target="_blank" href={demoRoot + '/' + selected + '.js'}>
                  <strong>
                    <i className="fa fa-code" />
                    {' View example source code'}
                  </strong>
                </a>
              </div>
              <Dropdown
                pullRight
                id="examples-dropdown"
                className="examples--dropdown"
              >
                <Dropdown.Toggle bsStyle="link" className="dropdown--toggle ">
                  {EXAMPLES[selected]}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {Object.entries(EXAMPLES).map(([key, title]) => (
                    <MenuItem
                      active={this.state.selected === key}
                      key={key}
                      href={`#${key}`}
                      onClick={() => this.select(key)}
                    >
                      {title}
                    </MenuItem>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Layout>
            <ExampleControlSlot.Outlet />
          </Card>
          <div className="example">
            <Current localizer={globalizeLocalizer} />
          </div>
        </div>
        <div className="docs">
          <div className="contain section">
            <Intro />
          </div>
          <Api className="contain section" />
        </div>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  render(<Example />, document.getElementById('app'))
})
