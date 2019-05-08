/******/ ;(function(modules) {
  // webpackBootstrap
  /******/ // install a JSONP callback for chunk loading
  /******/ function webpackJsonpCallback(data) {
    /******/ var chunkIds = data[0]
    /******/ var moreModules = data[1]
    /******/ var executeModules = data[2] // add "moreModules" to the modules object, // then flag all "chunkIds" as loaded and fire callback
    /******/
    /******/ /******/ /******/ var moduleId,
      chunkId,
      i = 0,
      resolves = []
    /******/ for (; i < chunkIds.length; i++) {
      /******/ chunkId = chunkIds[i]
      /******/ if (installedChunks[chunkId]) {
        /******/ resolves.push(installedChunks[chunkId][0])
        /******/
      }
      /******/ installedChunks[chunkId] = 0
      /******/
    }
    /******/ for (moduleId in moreModules) {
      /******/ if (
        Object.prototype.hasOwnProperty.call(moreModules, moduleId)
      ) {
        /******/ modules[moduleId] = moreModules[moduleId]
        /******/
      }
      /******/
    }
    /******/ if (parentJsonpFunction) parentJsonpFunction(data)
    /******/
    /******/ while (resolves.length) {
      /******/ resolves.shift()()
      /******/
    } // add entry modules from loaded chunk to deferred list
    /******/
    /******/ /******/ deferredModules.push.apply(
      deferredModules,
      executeModules || []
    ) // run deferred modules when all chunks ready
    /******/
    /******/ /******/ return checkDeferredModules()
    /******/
  }
  /******/ function checkDeferredModules() {
    /******/ var result
    /******/ for (var i = 0; i < deferredModules.length; i++) {
      /******/ var deferredModule = deferredModules[i]
      /******/ var fulfilled = true
      /******/ for (var j = 1; j < deferredModule.length; j++) {
        /******/ var depId = deferredModule[j]
        /******/ if (installedChunks[depId] !== 0) fulfilled = false
        /******/
      }
      /******/ if (fulfilled) {
        /******/ deferredModules.splice(i--, 1)
        /******/ result = __webpack_require__(
          (__webpack_require__.s = deferredModule[0])
        )
        /******/
      }
      /******/
    }
    /******/ return result
    /******/
  } // The module cache
  /******/
  /******/ /******/ var installedModules = {} // object to store loaded and loading chunks // undefined = chunk not loaded, null = chunk preloaded/prefetched // Promise = chunk loading, 0 = chunk loaded
  /******/
  /******/ /******/ /******/ /******/ var installedChunks = {
    /******/ 0: 0,
    /******/
  }
  /******/
  /******/ var deferredModules = [] // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    }) // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ) // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true // Return the exports of the module
    /******/
    /******/ /******/ return module.exports
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter,
      })
      /******/
    }
    /******/
  } // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function(exports) {
    /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
        value: 'Module',
      })
      /******/
    }
    /******/ Object.defineProperty(exports, '__esModule', { value: true })
    /******/
  } // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
  /******/
  /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
    value,
    mode
  ) {
    /******/ if (mode & 1) value = __webpack_require__(value)
    /******/ if (mode & 8) return value
    /******/ if (
      mode & 4 &&
      typeof value === 'object' &&
      value &&
      value.__esModule
    )
      return value
    /******/ var ns = Object.create(null)
    /******/ __webpack_require__.r(ns)
    /******/ Object.defineProperty(ns, 'default', {
      enumerable: true,
      value: value,
    })
    /******/ if (mode & 2 && typeof value != 'string')
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function(key) {
            return value[key]
          }.bind(null, key)
        )
    /******/ return ns
    /******/
  } // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module['default']
          }
        : /******/ function getModuleExports() {
            return module
          }
    /******/ __webpack_require__.d(getter, 'a', getter)
    /******/ return getter
    /******/
  } // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property)
  } // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = ''
  /******/
  /******/ var jsonpArray = (window['webpackJsonp'] =
    window['webpackJsonp'] || [])
  /******/ var oldJsonpFunction = jsonpArray.push.bind(jsonpArray)
  /******/ jsonpArray.push = webpackJsonpCallback
  /******/ jsonpArray = jsonpArray.slice()
  /******/ for (var i = 0; i < jsonpArray.length; i++)
    webpackJsonpCallback(jsonpArray[i])
  /******/ var parentJsonpFunction = oldJsonpFunction // add entry module to deferred list
  /******/
  /******/
  /******/ /******/ deferredModules.push([197, 1]) // run deferred modules when ready
  /******/ /******/ return checkDeferredModules()
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ 102: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.views = exports.dateRangeFormat = exports.dateFormat = exports.accessor = exports.eventComponent = void 0

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _elementType = _interopRequireDefault(__webpack_require__(48))

      exports.elementType = _elementType.default

      var _all = _interopRequireDefault(__webpack_require__(69))

      var _constants = __webpack_require__(16)

      var eventComponent = _propTypes.default.oneOfType([
        _elementType.default,
        _propTypes.default.shape({
          month: _elementType.default,
          week: _elementType.default,
          day: _elementType.default,
          agenda: _elementType.default,
        }),
      ])

      exports.eventComponent = eventComponent
      var viewNames = Object.keys(_constants.views).map(function(k) {
        return _constants.views[k]
      })

      var accessor = _propTypes.default.oneOfType([
        _propTypes.default.string,
        _propTypes.default.func,
      ])

      exports.accessor = accessor
      var dateFormat = _propTypes.default.any
      exports.dateFormat = dateFormat
      var dateRangeFormat = _propTypes.default.func
      /**
       * accepts either an array of builtin view names:
       *
       * ```
       * views={['month', 'day', 'agenda']}
       * ```
       *
       * or an object hash of the view name and the component (or boolean for builtin)
       *
       * ```
       * views={{
       *   month: true,
       *   week: false,
       *   workweek: WorkWeekViewComponent,
       * }}
       * ```
       */

      exports.dateRangeFormat = dateRangeFormat

      var views = _propTypes.default.oneOfType([
        _propTypes.default.arrayOf(_propTypes.default.oneOf(viewNames)),
        (0, _all.default)(_propTypes.default.object, function(props, name) {
          for (
            var _len = arguments.length,
              args = new Array(_len > 2 ? _len - 2 : 0),
              _key = 2;
            _key < _len;
            _key++
          ) {
            args[_key - 2] = arguments[_key]
          }

          var prop = props[name],
            err
          Object.keys(prop).every(function(key) {
            var isBuiltinView =
              viewNames.indexOf(key) !== -1 && typeof prop[key] === 'boolean'
            return (
              isBuiltinView ||
              !(err = _elementType.default.apply(
                void 0,
                [prop, key].concat(args)
              ))
            )
          })
          return err || null
        }),
      ])

      exports.views = views

      /***/
    },

    /***/ 110: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      exports.__esModule = true
      exports.accessor = accessor
      exports.wrapAccessor = void 0

      /**
       * Retrieve via an accessor-like property
       *
       *    accessor(obj, 'name')   // => retrieves obj['name']
       *    accessor(data, func)    // => retrieves func(data)
       *    ... otherwise null
       */
      function accessor(data, field) {
        var value = null
        if (typeof field === 'function') value = field(data)
        else if (
          typeof field === 'string' &&
          typeof data === 'object' &&
          data != null &&
          field in data
        )
          value = data[field]
        return value
      }

      var wrapAccessor = function wrapAccessor(acc) {
        return function(data) {
          return accessor(data, acc)
        }
      }

      exports.wrapAccessor = wrapAccessor

      /***/
    },

    /***/ 111: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _withDragAndDrop = _interopRequireDefault(__webpack_require__(412))

      var _default = _withDragAndDrop.default
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 112: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.mergeComponents = exports.nest = exports.dragAccessors = void 0

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var _objectWithoutPropertiesLoose2 = _interopRequireDefault(
        __webpack_require__(12)
      )

      var _accessors = __webpack_require__(110)

      var _react = __webpack_require__(1)

      var dragAccessors = {
        start: (0, _accessors.wrapAccessor)(function(e) {
          return e.start
        }),
        end: (0, _accessors.wrapAccessor)(function(e) {
          return e.end
        }),
      }
      exports.dragAccessors = dragAccessors

      var nest = function nest() {
        for (
          var _len = arguments.length, Components = new Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          Components[_key] = arguments[_key]
        }

        var factories = Components.filter(Boolean).map(_react.createFactory)

        var Nest = function Nest(_ref) {
          var children = _ref.children,
            props = (0, _objectWithoutPropertiesLoose2.default)(_ref, [
              'children',
            ])
          return factories.reduceRight(function(child, factory) {
            return factory(props, child)
          }, children)
        }

        return Nest
      }

      exports.nest = nest

      var mergeComponents = function mergeComponents(components, addons) {
        if (components === void 0) {
          components = {}
        }

        var keys = Object.keys(addons)
        var result = (0, _extends2.default)({}, components)
        keys.forEach(function(key) {
          result[key] = components[key]
            ? nest(components[key], addons[key])
            : addons[key]
        })
        return result
      }

      exports.mergeComponents = mergeComponents

      /***/
    },

    /***/ 113: /***/ function(module, exports, __webpack_require__) {
      var content = __webpack_require__(416)

      if (typeof content === 'string') content = [[module.i, content, '']]

      var transform
      var insertInto

      var options = { hmr: true }

      options.transform = transform
      options.insertInto = undefined

      var update = __webpack_require__(28)(content, options)

      if (content.locals) module.exports = content.locals

      if (false) {
      }

      /***/
    },

    /***/ 139: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = _default
      exports.formats = void 0

      var _dates = _interopRequireDefault(__webpack_require__(8))

      var _oldGlobalize = _interopRequireDefault(__webpack_require__(276))

      var _localizer = __webpack_require__(67)

      var _warning = _interopRequireDefault(__webpack_require__(83))

      var dateRangeFormat = function dateRangeFormat(_ref, culture, local) {
        var start = _ref.start,
          end = _ref.end
        return (
          local.format(
            start,
            {
              date: 'short',
            },
            culture
          ) +
          ' — ' +
          local.format(
            end,
            {
              date: 'short',
            },
            culture
          )
        )
      }

      var timeRangeFormat = function timeRangeFormat(_ref2, culture, local) {
        var start = _ref2.start,
          end = _ref2.end
        return (
          local.format(
            start,
            {
              time: 'short',
            },
            culture
          ) +
          ' — ' +
          local.format(
            end,
            {
              time: 'short',
            },
            culture
          )
        )
      }

      var timeRangeStartFormat = function timeRangeStartFormat(
        _ref3,
        culture,
        local
      ) {
        var start = _ref3.start
        return (
          local.format(
            start,
            {
              time: 'short',
            },
            culture
          ) + ' — '
        )
      }

      var timeRangeEndFormat = function timeRangeEndFormat(
        _ref4,
        culture,
        local
      ) {
        var end = _ref4.end
        return (
          ' — ' +
          local.format(
            end,
            {
              time: 'short',
            },
            culture
          )
        )
      }

      var weekRangeFormat = function weekRangeFormat(_ref5, culture, local) {
        var start = _ref5.start,
          end = _ref5.end
        return (
          local.format(start, 'MMM dd', culture) +
          ' — ' +
          local.format(
            end,
            _dates.default.eq(start, end, 'month') ? 'dd' : 'MMM dd',
            culture
          )
        )
      }

      var formats = {
        dateFormat: 'dd',
        dayFormat: 'eee dd/MM',
        weekdayFormat: 'eee',
        selectRangeFormat: timeRangeFormat,
        eventTimeRangeFormat: timeRangeFormat,
        eventTimeRangeStartFormat: timeRangeStartFormat,
        eventTimeRangeEndFormat: timeRangeEndFormat,
        timeGutterFormat: {
          time: 'short',
        },
        monthHeaderFormat: 'MMMM yyyy',
        dayHeaderFormat: 'eeee MMM dd',
        dayRangeHeaderFormat: weekRangeFormat,
        agendaHeaderFormat: dateRangeFormat,
        agendaDateFormat: 'eee MMM dd',
        agendaTimeFormat: {
          time: 'short',
        },
        agendaTimeRangeFormat: timeRangeFormat,
      }
      exports.formats = formats

      function _default(globalize) {
        var locale = function locale(culture) {
          return culture ? globalize(culture) : globalize
        } // return the first day of the week from the locale data. Defaults to 'world'
        // territory if no territory is derivable from CLDR.
        // Failing to use CLDR supplemental (not loaded?), revert to the original
        // method of getting first day of week.

        function firstOfWeek(culture) {
          try {
            var days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
            var cldr = locale(culture).cldr
            var territory = cldr.attributes.territory
            var weekData = cldr.get('supplemental').weekData
            var firstDay = weekData.firstDay[territory || '001']
            return days.indexOf(firstDay)
          } catch (e) {
            false ? undefined : void 0 // maybe cldr supplemental is not loaded? revert to original method

            var date = new Date() //cldr-data doesn't seem to be zero based

            var localeDay = Math.max(
              parseInt(
                locale(culture).formatDate(date, {
                  raw: 'e',
                }),
                10
              ) - 1,
              0
            )
            return Math.abs(date.getDay() - localeDay)
          }
        }

        if (!globalize.load) return (0, _oldGlobalize.default)(globalize)
        return new _localizer.DateLocalizer({
          firstOfWeek: firstOfWeek,
          formats: formats,
          format: function format(value, _format, culture) {
            _format =
              typeof _format === 'string'
                ? {
                    raw: _format,
                  }
                : _format
            return locale(culture).formatDate(value, _format)
          },
        })
      }

      /***/
    },

    /***/ 14: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var _Calendar = _interopRequireDefault(__webpack_require__(299))

      var _EventWrapper = _interopRequireDefault(__webpack_require__(399))

      var _BackgroundWrapper = _interopRequireDefault(__webpack_require__(169))

      var _moment = _interopRequireDefault(__webpack_require__(400))

      var _globalize = _interopRequireDefault(__webpack_require__(139))

      var _move = _interopRequireDefault(__webpack_require__(144))

      var _constants = __webpack_require__(16)

      ;(0, _extends2.default)(_Calendar.default, {
        globalizeLocalizer: _globalize.default,
        momentLocalizer: _moment.default,
        Views: _constants.views,
        Navigate: _constants.navigate,
        move: _move.default,
        components: {
          eventWrapper: _EventWrapper.default,
          dayWrapper: _BackgroundWrapper.default,
          dateCellWrapper: _BackgroundWrapper.default,
        },
      })
      var _default = _Calendar.default
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 143: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _react = _interopRequireDefault(__webpack_require__(1))

      var propTypes = false ? undefined : {}

      function Card(_ref) {
        var children = _ref.children,
          className = _ref.className,
          style = _ref.style
        return _react.default.createElement(
          'div',
          {
            className: (className || '') + ' card',
            style: style,
          },
          children
        )
      }

      Card.propTypes = false ? undefined : {}
      var _default = Card
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 144: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = moveDate

      var _objectWithoutPropertiesLoose2 = _interopRequireDefault(
        __webpack_require__(12)
      )

      var _invariant = _interopRequireDefault(__webpack_require__(23))

      var _constants = __webpack_require__(16)

      var _Views = _interopRequireDefault(__webpack_require__(145))

      function moveDate(View, _ref) {
        var action = _ref.action,
          date = _ref.date,
          today = _ref.today,
          props = (0, _objectWithoutPropertiesLoose2.default)(_ref, [
            'action',
            'date',
            'today',
          ])
        View = typeof View === 'string' ? _Views.default[View] : View

        switch (action) {
          case _constants.navigate.TODAY:
            date = today || new Date()
            break

          case _constants.navigate.DATE:
            break

          default:
            !(View && typeof View.navigate === 'function')
              ? false
                ? undefined
                : invariant(false)
              : void 0
            date = View.navigate(date, action, props)
        }

        return date
      }

      module.exports = exports['default']

      /***/
    },

    /***/ 145: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _constants = __webpack_require__(16)

      var _Month = _interopRequireDefault(__webpack_require__(305))

      var _Day = _interopRequireDefault(__webpack_require__(342))

      var _Week = _interopRequireDefault(__webpack_require__(173))

      var _WorkWeek = _interopRequireDefault(__webpack_require__(363))

      var _Agenda = _interopRequireDefault(__webpack_require__(364))

      var _VIEWS

      var VIEWS = ((_VIEWS = {}),
      (_VIEWS[_constants.views.MONTH] = _Month.default),
      (_VIEWS[_constants.views.WEEK] = _Week.default),
      (_VIEWS[_constants.views.WORK_WEEK] = _WorkWeek.default),
      (_VIEWS[_constants.views.DAY] = _Day.default),
      (_VIEWS[_constants.views.AGENDA] = _Agenda.default),
      _VIEWS)
      var _default = VIEWS
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 154: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var _objectWithoutPropertiesLoose2 = _interopRequireDefault(
        __webpack_require__(12)
      )

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _classnames = _interopRequireDefault(__webpack_require__(6))

      var _dates = _interopRequireDefault(__webpack_require__(8))

      var EventCell =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(EventCell, _React$Component)

          function EventCell() {
            return _React$Component.apply(this, arguments) || this
          }

          var _proto = EventCell.prototype

          _proto.render = function render() {
            var _this$props = this.props,
              style = _this$props.style,
              className = _this$props.className,
              event = _this$props.event,
              selected = _this$props.selected,
              isAllDay = _this$props.isAllDay,
              onSelect = _this$props.onSelect,
              _onDoubleClick = _this$props.onDoubleClick,
              localizer = _this$props.localizer,
              continuesPrior = _this$props.continuesPrior,
              continuesAfter = _this$props.continuesAfter,
              accessors = _this$props.accessors,
              getters = _this$props.getters,
              children = _this$props.children,
              _this$props$component = _this$props.components,
              Event = _this$props$component.event,
              EventWrapper = _this$props$component.eventWrapper,
              props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, [
                'style',
                'className',
                'event',
                'selected',
                'isAllDay',
                'onSelect',
                'onDoubleClick',
                'localizer',
                'continuesPrior',
                'continuesAfter',
                'accessors',
                'getters',
                'children',
                'components',
              ])
            var title = accessors.title(event)
            var tooltip = accessors.tooltip(event)
            var end = accessors.end(event)
            var start = accessors.start(event)
            var allDay = accessors.allDay(event)
            var showAsAllDay =
              isAllDay ||
              allDay ||
              _dates.default.diff(
                start,
                _dates.default.ceil(end, 'day'),
                'day'
              ) > 1
            var userProps = getters.eventProp(event, start, end, selected)

            var content = _react.default.createElement(
              'div',
              {
                className: 'rbc-event-content',
                title: tooltip || undefined,
              },
              Event
                ? _react.default.createElement(Event, {
                    event: event,
                    title: title,
                    isAllDay: allDay,
                    localizer: localizer,
                  })
                : title
            )

            return _react.default.createElement(
              EventWrapper,
              (0, _extends2.default)({}, this.props, {
                type: 'date',
              }),
              _react.default.createElement(
                'div',
                (0, _extends2.default)({}, props, {
                  tabIndex: 0,
                  style: (0, _extends2.default)({}, userProps.style, style),
                  className: (0, _classnames.default)(
                    'rbc-event',
                    className,
                    userProps.className,
                    {
                      'rbc-selected': selected,
                      'rbc-event-allday': showAsAllDay,
                      'rbc-event-continues-prior': continuesPrior,
                      'rbc-event-continues-after': continuesAfter,
                    }
                  ),
                  onClick: function onClick(e) {
                    return onSelect && onSelect(event, e)
                  },
                  onDoubleClick: function onDoubleClick(e) {
                    return _onDoubleClick && _onDoubleClick(event, e)
                  },
                }),
                typeof children === 'function' ? children(content) : content
              )
            )
          }

          return EventCell
        })(_react.default.Component)

      EventCell.propTypes = false ? undefined : {}
      var _default = EventCell
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 157: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireWildcard = __webpack_require__(20)

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var _assertThisInitialized2 = _interopRequireDefault(
        __webpack_require__(3)
      )

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _classnames = _interopRequireDefault(__webpack_require__(6))

      var _height = _interopRequireDefault(__webpack_require__(328))

      var _querySelectorAll = _interopRequireDefault(__webpack_require__(106))

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _reactDom = __webpack_require__(9)

      var _dates = _interopRequireDefault(__webpack_require__(8))

      var _BackgroundCells = _interopRequireDefault(__webpack_require__(329))

      var _EventRow = _interopRequireDefault(__webpack_require__(158))

      var _EventEndingRow = _interopRequireDefault(__webpack_require__(334))

      var DateSlotMetrics = _interopRequireWildcard(__webpack_require__(340))

      var DateContentRow =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(DateContentRow, _React$Component)

          function DateContentRow() {
            var _this

            for (
              var _len = arguments.length, args = new Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              args[_key] = arguments[_key]
            }

            _this =
              _React$Component.call.apply(
                _React$Component,
                [this].concat(args)
              ) || this

            _this.handleSelectSlot = function(slot) {
              var _this$props = _this.props,
                range = _this$props.range,
                onSelectSlot = _this$props.onSelectSlot
              onSelectSlot(range.slice(slot.start, slot.end + 1), slot)
            }

            _this.handleShowMore = function(slot, target) {
              var _this$props2 = _this.props,
                range = _this$props2.range,
                onShowMore = _this$props2.onShowMore

              var metrics = _this.slotMetrics(_this.props)

              var row = (0, _querySelectorAll.default)(
                (0, _reactDom.findDOMNode)(
                  (0, _assertThisInitialized2.default)(_this)
                ),
                '.rbc-row-bg'
              )[0]
              var cell
              if (row) cell = row.children[slot - 1]
              var events = metrics.getEventsForSlot(slot)
              onShowMore(events, range[slot - 1], cell, slot, target)
            }

            _this.createHeadingRef = function(r) {
              _this.headingRow = r
            }

            _this.createEventRef = function(r) {
              _this.eventRow = r
            }

            _this.getContainer = function() {
              var container = _this.props.container
              return container
                ? container()
                : (0, _reactDom.findDOMNode)(
                    (0, _assertThisInitialized2.default)(_this)
                  )
            }

            _this.renderHeadingCell = function(date, index) {
              var _this$props3 = _this.props,
                renderHeader = _this$props3.renderHeader,
                getNow = _this$props3.getNow
              return renderHeader({
                date: date,
                key: 'header_' + index,
                className: (0, _classnames.default)(
                  'rbc-date-cell',
                  _dates.default.eq(date, getNow(), 'day') && 'rbc-now'
                ),
              })
            }

            _this.renderDummy = function() {
              var _this$props4 = _this.props,
                className = _this$props4.className,
                range = _this$props4.range,
                renderHeader = _this$props4.renderHeader
              return _react.default.createElement(
                'div',
                {
                  className: className,
                },
                _react.default.createElement(
                  'div',
                  {
                    className: 'rbc-row-content',
                  },
                  renderHeader &&
                    _react.default.createElement(
                      'div',
                      {
                        className: 'rbc-row',
                        ref: _this.createHeadingRef,
                      },
                      range.map(_this.renderHeadingCell)
                    ),
                  _react.default.createElement(
                    'div',
                    {
                      className: 'rbc-row',
                      ref: _this.createEventRef,
                    },
                    _react.default.createElement(
                      'div',
                      {
                        className: 'rbc-row-segment',
                      },
                      _react.default.createElement(
                        'div',
                        {
                          className: 'rbc-event',
                        },
                        _react.default.createElement(
                          'div',
                          {
                            className: 'rbc-event-content',
                          },
                          '\xA0'
                        )
                      )
                    )
                  )
                )
              )
            }

            _this.slotMetrics = DateSlotMetrics.getSlotMetrics()
            return _this
          }

          var _proto = DateContentRow.prototype

          _proto.getRowLimit = function getRowLimit() {
            var eventHeight = (0, _height.default)(this.eventRow)
            var headingHeight = this.headingRow
              ? (0, _height.default)(this.headingRow)
              : 0
            var eventSpace =
              (0, _height.default)((0, _reactDom.findDOMNode)(this)) -
              headingHeight
            return Math.max(Math.floor(eventSpace / eventHeight), 1)
          }

          _proto.render = function render() {
            var _this$props5 = this.props,
              date = _this$props5.date,
              rtl = _this$props5.rtl,
              range = _this$props5.range,
              className = _this$props5.className,
              selected = _this$props5.selected,
              selectable = _this$props5.selectable,
              renderForMeasure = _this$props5.renderForMeasure,
              accessors = _this$props5.accessors,
              getters = _this$props5.getters,
              components = _this$props5.components,
              getNow = _this$props5.getNow,
              renderHeader = _this$props5.renderHeader,
              onSelect = _this$props5.onSelect,
              localizer = _this$props5.localizer,
              onSelectStart = _this$props5.onSelectStart,
              onSelectEnd = _this$props5.onSelectEnd,
              onDoubleClick = _this$props5.onDoubleClick,
              resourceId = _this$props5.resourceId,
              longPressThreshold = _this$props5.longPressThreshold,
              isAllDay = _this$props5.isAllDay
            if (renderForMeasure) return this.renderDummy()
            var metrics = this.slotMetrics(this.props)
            var levels = metrics.levels,
              extra = metrics.extra
            var WeekWrapper = components.weekWrapper
            var eventRowProps = {
              selected: selected,
              accessors: accessors,
              getters: getters,
              localizer: localizer,
              components: components,
              onSelect: onSelect,
              onDoubleClick: onDoubleClick,
              resourceId: resourceId,
              slotMetrics: metrics,
            }
            return _react.default.createElement(
              'div',
              {
                className: className,
              },
              _react.default.createElement(_BackgroundCells.default, {
                date: date,
                getNow: getNow,
                rtl: rtl,
                range: range,
                selectable: selectable,
                container: this.getContainer,
                getters: getters,
                onSelectStart: onSelectStart,
                onSelectEnd: onSelectEnd,
                onSelectSlot: this.handleSelectSlot,
                components: components,
                longPressThreshold: longPressThreshold,
              }),
              _react.default.createElement(
                'div',
                {
                  className: 'rbc-row-content',
                },
                renderHeader &&
                  _react.default.createElement(
                    'div',
                    {
                      className: 'rbc-row ',
                      ref: this.createHeadingRef,
                    },
                    range.map(this.renderHeadingCell)
                  ),
                _react.default.createElement(
                  WeekWrapper,
                  (0, _extends2.default)(
                    {
                      isAllDay: isAllDay,
                    },
                    eventRowProps
                  ),
                  levels.map(function(segs, idx) {
                    return _react.default.createElement(
                      _EventRow.default,
                      (0, _extends2.default)(
                        {
                          key: idx,
                          segments: segs,
                        },
                        eventRowProps
                      )
                    )
                  }),
                  !!extra.length &&
                    _react.default.createElement(
                      _EventEndingRow.default,
                      (0, _extends2.default)(
                        {
                          segments: extra,
                          onShowMore: this.handleShowMore,
                        },
                        eventRowProps
                      )
                    )
                )
              )
            )
          }

          return DateContentRow
        })(_react.default.Component)

      DateContentRow.propTypes = false ? undefined : {}
      DateContentRow.defaultProps = {
        minRows: 0,
        maxRows: Infinity,
      }
      var _default = DateContentRow
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 158: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _classnames = _interopRequireDefault(__webpack_require__(6))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _EventRowMixin = _interopRequireDefault(__webpack_require__(159))

      var EventRow =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(EventRow, _React$Component)

          function EventRow() {
            return _React$Component.apply(this, arguments) || this
          }

          var _proto = EventRow.prototype

          _proto.render = function render() {
            var _this = this

            var _this$props = this.props,
              segments = _this$props.segments,
              slots = _this$props.slotMetrics.slots,
              className = _this$props.className
            var lastEnd = 1
            return _react.default.createElement(
              'div',
              {
                className: (0, _classnames.default)(className, 'rbc-row'),
              },
              segments.reduce(function(row, _ref, li) {
                var event = _ref.event,
                  left = _ref.left,
                  right = _ref.right,
                  span = _ref.span
                var key = '_lvl_' + li
                var gap = left - lastEnd

                var content = _EventRowMixin.default.renderEvent(
                  _this.props,
                  event
                )

                if (gap)
                  row.push(
                    _EventRowMixin.default.renderSpan(slots, gap, key + '_gap')
                  )
                row.push(
                  _EventRowMixin.default.renderSpan(slots, span, key, content)
                )
                lastEnd = right + 1
                return row
              }, [])
            )
          }

          return EventRow
        })(_react.default.Component)

      EventRow.propTypes = false ? undefined : {}
      EventRow.defaultProps = (0, _extends2.default)(
        {},
        _EventRowMixin.default.defaultProps
      )
      var _default = EventRow
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 159: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _EventCell = _interopRequireDefault(__webpack_require__(154))

      var _selection = __webpack_require__(38)

      /* eslint-disable react/prop-types */
      var _default = {
        propTypes: {
          slotMetrics: _propTypes.default.object.isRequired,
          selected: _propTypes.default.object,
          isAllDay: _propTypes.default.bool,
          accessors: _propTypes.default.object.isRequired,
          localizer: _propTypes.default.object.isRequired,
          components: _propTypes.default.object.isRequired,
          getters: _propTypes.default.object.isRequired,
          onSelect: _propTypes.default.func,
          onDoubleClick: _propTypes.default.func,
        },
        defaultProps: {
          segments: [],
          selected: {},
        },
        renderEvent: function renderEvent(props, event) {
          var selected = props.selected,
            _ = props.isAllDay,
            accessors = props.accessors,
            getters = props.getters,
            onSelect = props.onSelect,
            onDoubleClick = props.onDoubleClick,
            localizer = props.localizer,
            slotMetrics = props.slotMetrics,
            components = props.components
          var continuesPrior = slotMetrics.continuesPrior(event)
          var continuesAfter = slotMetrics.continuesAfter(event)
          return _react.default.createElement(_EventCell.default, {
            event: event,
            getters: getters,
            localizer: localizer,
            accessors: accessors,
            components: components,
            onSelect: onSelect,
            onDoubleClick: onDoubleClick,
            continuesPrior: continuesPrior,
            continuesAfter: continuesAfter,
            selected: (0, _selection.isSelected)(event, selected),
          })
        },
        renderSpan: function renderSpan(slots, len, key, content) {
          if (content === void 0) {
            content = ' '
          }

          var per = (Math.abs(len) / slots) * 100 + '%'
          return _react.default.createElement(
            'div',
            {
              key: key,
              className: 'rbc-row-segment', // IE10/11 need max-width. flex-basis doesn't respect box-sizing
              style: {
                WebkitFlexBasis: per,
                flexBasis: per,
                maxWidth: per,
              },
            },
            content
          )
        },
      }
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 16: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      exports.__esModule = true
      exports.views = exports.navigate = void 0
      var navigate = {
        PREVIOUS: 'PREV',
        NEXT: 'NEXT',
        TODAY: 'TODAY',
        DATE: 'DATE',
      }
      exports.navigate = navigate
      var views = {
        MONTH: 'month',
        WEEK: 'week',
        WORK_WEEK: 'work_week',
        DAY: 'day',
        AGENDA: 'agenda',
      }
      exports.views = views

      /***/
    },

    /***/ 161: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var Header = function Header(_ref) {
        var label = _ref.label
        return _react.default.createElement('span', null, label)
      }

      Header.propTypes = false ? undefined : {}
      var _default = Header
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 162: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.getSlotMetrics = getSlotMetrics

      var _dates = _interopRequireDefault(__webpack_require__(8))

      var getDstOffset = function getDstOffset(start, end) {
        return start.getTimezoneOffset() - end.getTimezoneOffset()
      }

      var getKey = function getKey(min, max, step, slots) {
        return (
          '' +
          +_dates.default.startOf(min, 'minutes') +
          ('' + +_dates.default.startOf(max, 'minutes')) +
          (step + '-' + slots)
        )
      }

      function getSlotMetrics(_ref) {
        var start = _ref.min,
          end = _ref.max,
          step = _ref.step,
          timeslots = _ref.timeslots
        var key = getKey(start, end, step, timeslots) // if the start is on a DST-changing day but *after* the moment of DST
        // transition we need to add those extra minutes to our minutesFromMidnight

        var daystart = _dates.default.startOf(start, 'day')

        var daystartdstoffset = getDstOffset(daystart, start)
        var totalMin =
          1 +
          _dates.default.diff(start, end, 'minutes') +
          getDstOffset(start, end)
        var minutesFromMidnight =
          _dates.default.diff(daystart, start, 'minutes') + daystartdstoffset
        var numGroups = Math.ceil(totalMin / (step * timeslots))
        var numSlots = numGroups * timeslots
        var groups = new Array(numGroups)
        var slots = new Array(numSlots) // Each slot date is created from "zero", instead of adding `step` to
        // the previous one, in order to avoid DST oddities

        for (var grp = 0; grp < numGroups; grp++) {
          groups[grp] = new Array(timeslots)

          for (var slot = 0; slot < timeslots; slot++) {
            var slotIdx = grp * timeslots + slot
            var minFromStart = slotIdx * step // A date with total minutes calculated from the start of the day

            slots[slotIdx] = groups[grp][slot] = new Date(
              start.getFullYear(),
              start.getMonth(),
              start.getDate(),
              0,
              minutesFromMidnight + minFromStart,
              0,
              0
            )
          }
        } // Necessary to be able to select up until the last timeslot in a day

        var lastSlotMinFromStart = slots.length * step
        slots.push(
          new Date(
            start.getFullYear(),
            start.getMonth(),
            start.getDate(),
            0,
            minutesFromMidnight + lastSlotMinFromStart,
            0,
            0
          )
        )

        function positionFromDate(date) {
          var diff =
            _dates.default.diff(start, date, 'minutes') +
            getDstOffset(start, date)
          return Math.min(diff, totalMin)
        }

        return {
          groups: groups,
          update: function update(args) {
            if (getKey(args) !== key) return getSlotMetrics(args)
            return this
          },
          dateIsInGroup: function dateIsInGroup(date, groupIndex) {
            var nextGroup = groups[groupIndex + 1]
            return _dates.default.inRange(
              date,
              groups[groupIndex][0],
              nextGroup ? nextGroup[0] : end,
              'minutes'
            )
          },
          nextSlot: function nextSlot(slot) {
            var next =
              slots[Math.min(slots.indexOf(slot) + 1, slots.length - 1)] // in the case of the last slot we won't a long enough range so manually get it

            if (next === slot) next = _dates.default.add(slot, step, 'minutes')
            return next
          },
          closestSlotToPosition: function closestSlotToPosition(percent) {
            var slot = Math.min(
              slots.length - 1,
              Math.max(0, Math.floor(percent * numSlots))
            )
            return slots[slot]
          },
          closestSlotFromPoint: function closestSlotFromPoint(
            point,
            boundaryRect
          ) {
            var range = Math.abs(boundaryRect.top - boundaryRect.bottom)
            return this.closestSlotToPosition(
              (point.y - boundaryRect.top) / range
            )
          },
          closestSlotFromDate: function closestSlotFromDate(date, offset) {
            if (offset === void 0) {
              offset = 0
            }

            if (_dates.default.lt(date, start, 'minutes')) return slots[0]

            var diffMins = _dates.default.diff(start, date, 'minutes')

            return slots[(diffMins - (diffMins % step)) / step + offset]
          },
          startsBeforeDay: function startsBeforeDay(date) {
            return _dates.default.lt(date, start, 'day')
          },
          startsAfterDay: function startsAfterDay(date) {
            return _dates.default.gt(date, end, 'day')
          },
          startsBefore: function startsBefore(date) {
            return _dates.default.lt(
              _dates.default.merge(start, date),
              start,
              'minutes'
            )
          },
          startsAfter: function startsAfter(date) {
            return _dates.default.gt(
              _dates.default.merge(end, date),
              end,
              'minutes'
            )
          },
          getRange: function getRange(rangeStart, rangeEnd) {
            rangeStart = _dates.default.min(
              end,
              _dates.default.max(start, rangeStart)
            )
            rangeEnd = _dates.default.min(
              end,
              _dates.default.max(start, rangeEnd)
            )
            var rangeStartMin = positionFromDate(rangeStart)
            var rangeEndMin = positionFromDate(rangeEnd)
            var top = (rangeStartMin / (step * numSlots)) * 100
            return {
              top: top,
              height: (rangeEndMin / (step * numSlots)) * 100 - top,
              start: positionFromDate(rangeStart),
              startDate: rangeStart,
              end: positionFromDate(rangeEnd),
              endDate: rangeEnd,
            }
          },
        }
      }

      /***/
    },

    /***/ 168: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireWildcard = __webpack_require__(20)

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _classnames = _interopRequireDefault(__webpack_require__(6))

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _react = _interopRequireWildcard(__webpack_require__(1))

      var _BackgroundWrapper = _interopRequireDefault(__webpack_require__(169))

      var TimeSlotGroup =
        /*#__PURE__*/
        (function(_Component) {
          ;(0, _inheritsLoose2.default)(TimeSlotGroup, _Component)

          function TimeSlotGroup() {
            return _Component.apply(this, arguments) || this
          }

          var _proto = TimeSlotGroup.prototype

          _proto.render = function render() {
            var _this$props = this.props,
              renderSlot = _this$props.renderSlot,
              resource = _this$props.resource,
              group = _this$props.group,
              getters = _this$props.getters,
              _this$props$component = _this$props.components
            _this$props$component =
              _this$props$component === void 0 ? {} : _this$props$component
            var _this$props$component2 = _this$props$component.timeSlotWrapper,
              Wrapper =
                _this$props$component2 === void 0
                  ? _BackgroundWrapper.default
                  : _this$props$component2
            return _react.default.createElement(
              'div',
              {
                className: 'rbc-timeslot-group',
              },
              group.map(function(value, idx) {
                var slotProps = getters ? getters.slotProp(value, resource) : {}
                return _react.default.createElement(
                  Wrapper,
                  {
                    key: idx,
                    value: value,
                    resource: resource,
                  },
                  _react.default.createElement(
                    'div',
                    (0, _extends2.default)({}, slotProps, {
                      className: (0, _classnames.default)(
                        'rbc-time-slot',
                        slotProps.className
                      ),
                    }),
                    renderSlot && renderSlot(value, idx)
                  )
                )
              })
            )
          }

          return TimeSlotGroup
        })(_react.Component)

      exports.default = TimeSlotGroup
      TimeSlotGroup.propTypes = false ? undefined : {}
      module.exports = exports['default']

      /***/
    },

    /***/ 169: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _NoopWrapper = _interopRequireDefault(__webpack_require__(74))

      var _default = _NoopWrapper.default
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 170: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _extends3 = _interopRequireDefault(__webpack_require__(4))

      var _classnames = _interopRequireDefault(__webpack_require__(6))

      var _react = _interopRequireDefault(__webpack_require__(1))

      /* eslint-disable react/prop-types */
      function TimeGridEvent(props) {
        var _extends2

        var style = props.style,
          className = props.className,
          event = props.event,
          accessors = props.accessors,
          isRtl = props.isRtl,
          selected = props.selected,
          label = props.label,
          continuesEarlier = props.continuesEarlier,
          continuesLater = props.continuesLater,
          getters = props.getters,
          onClick = props.onClick,
          onDoubleClick = props.onDoubleClick,
          _props$components = props.components,
          Event = _props$components.event,
          EventWrapper = _props$components.eventWrapper
        var title = accessors.title(event)
        var tooltip = accessors.tooltip(event)
        var end = accessors.end(event)
        var start = accessors.start(event)
        var userProps = getters.eventProp(event, start, end, selected)
        var height = style.height,
          top = style.top,
          width = style.width,
          xOffset = style.xOffset
        var inner = [
          _react.default.createElement(
            'div',
            {
              key: '1',
              className: 'rbc-event-label',
            },
            label
          ),
          _react.default.createElement(
            'div',
            {
              key: '2',
              className: 'rbc-event-content',
            },
            Event
              ? _react.default.createElement(Event, {
                  event: event,
                  title: title,
                })
              : title
          ),
        ]
        return _react.default.createElement(
          EventWrapper,
          (0, _extends3.default)(
            {
              type: 'time',
            },
            props
          ),
          _react.default.createElement(
            'div',
            {
              onClick: onClick,
              onDoubleClick: onDoubleClick,
              style: (0, _extends3.default)(
                {},
                userProps.style,
                ((_extends2 = {
                  top: top + '%',
                  height: height + '%',
                }),
                (_extends2[isRtl ? 'right' : 'left'] =
                  Math.max(0, xOffset) + '%'),
                (_extends2.width = width + '%'),
                _extends2)
              ),
              title: tooltip
                ? (typeof label === 'string' ? label + ': ' : '') + tooltip
                : undefined,
              className: (0, _classnames.default)(
                'rbc-event',
                className,
                userProps.className,
                {
                  'rbc-selected': selected,
                  'rbc-event-continues-earlier': continuesEarlier,
                  'rbc-event-continues-later': continuesLater,
                }
              ),
            },
            inner
          )
        )
      }

      var _default = TimeGridEvent
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 173: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var _objectWithoutPropertiesLoose2 = _interopRequireDefault(
        __webpack_require__(12)
      )

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _dates = _interopRequireDefault(__webpack_require__(8))

      var _constants = __webpack_require__(16)

      var _TimeGrid = _interopRequireDefault(__webpack_require__(73))

      var Week =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(Week, _React$Component)

          function Week() {
            return _React$Component.apply(this, arguments) || this
          }

          var _proto = Week.prototype

          _proto.render = function render() {
            var _this$props = this.props,
              date = _this$props.date,
              props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, [
                'date',
              ])
            var range = Week.range(date, this.props)
            return _react.default.createElement(
              _TimeGrid.default,
              (0, _extends2.default)({}, props, {
                range: range,
                eventOffset: 15,
              })
            )
          }

          return Week
        })(_react.default.Component)

      Week.propTypes = false ? undefined : {}
      Week.defaultProps = _TimeGrid.default.defaultProps

      Week.navigate = function(date, action) {
        switch (action) {
          case _constants.navigate.PREVIOUS:
            return _dates.default.add(date, -1, 'week')

          case _constants.navigate.NEXT:
            return _dates.default.add(date, 1, 'week')

          default:
            return date
        }
      }

      Week.range = function(date, _ref) {
        var localizer = _ref.localizer
        var firstOfWeek = localizer.startOfWeek()

        var start = _dates.default.startOf(date, 'week', firstOfWeek)

        var end = _dates.default.endOf(date, 'week', firstOfWeek)

        return _dates.default.range(start, end)
      }

      Week.title = function(date, _ref2) {
        var localizer = _ref2.localizer

        var _Week$range = Week.range(date, {
            localizer: localizer,
          }),
          start = _Week$range[0],
          rest = _Week$range.slice(1)

        return localizer.format(
          {
            start: start,
            end: rest.pop(),
          },
          'dayRangeHeaderFormat'
        )
      }

      var _default = Week
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 197: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _Api = _interopRequireDefault(__webpack_require__(199))

      var _Intro = _interopRequireDefault(__webpack_require__(268))

      var _reactDom = __webpack_require__(9)

      var _Layout = _interopRequireDefault(__webpack_require__(101))

      var _globalize = _interopRequireDefault(__webpack_require__(139))

      var _globalize2 = _interopRequireDefault(__webpack_require__(47))

      __webpack_require__(277)

      __webpack_require__(283)

      __webpack_require__(291)

      __webpack_require__(293)

      __webpack_require__(295)

      var _Card = _interopRequireDefault(__webpack_require__(143))

      var _ExampleControlSlot = _interopRequireDefault(__webpack_require__(34))

      var _basic = _interopRequireDefault(__webpack_require__(298))

      var _selectable = _interopRequireDefault(__webpack_require__(401))

      var _cultures = _interopRequireDefault(__webpack_require__(402))

      var _popup = _interopRequireDefault(__webpack_require__(407))

      var _rendering = _interopRequireDefault(__webpack_require__(408))

      var _customView = _interopRequireDefault(__webpack_require__(409))

      var _resource = _interopRequireDefault(__webpack_require__(410))

      var _dndresource = _interopRequireDefault(__webpack_require__(411))

      var _timeslots = _interopRequireDefault(__webpack_require__(417))

      var _dnd = _interopRequireDefault(__webpack_require__(418))

      var _dndOutsideSource = _interopRequireDefault(__webpack_require__(419))

      var _Dropdown = _interopRequireDefault(__webpack_require__(420))

      var _MenuItem = _interopRequireDefault(__webpack_require__(479))

      var globalizeLocalizer = (0, _globalize.default)(_globalize2.default)
      var demoRoot =
        'https://github.com/intljusticemission/react-big-calendar/tree/master/examples/demos'
      var EXAMPLES = {
        basic: 'Basic Calendar',
        selectable: 'Create events',
        cultures: 'Localization',
        popup: 'Show more via a popup',
        timeslots: 'Custom Time Grids',
        rendering: 'Customized Component Rendering',
        customView: 'Custom Calendar Views',
        resource: 'Resource Scheduling',
        dnd: 'Addon: Drag and drop',
        dndOutsideSource: 'Addon: Drag and drop (from outside calendar)',
      }
      var DEFAULT_EXAMPLE = 'basic'

      var Example =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(Example, _React$Component)

          function Example() {
            var _this

            for (
              var _len = arguments.length, args = new Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              args[_key] = arguments[_key]
            }

            _this =
              _React$Component.call.apply(
                _React$Component,
                [this].concat(args)
              ) || this

            _this.select = function(selected) {
              _this.setState({
                selected: selected,
              })
            }

            _this.state = {
              selected: DEFAULT_EXAMPLE,
            }
            return _this
          }

          var _proto = Example.prototype

          _proto.componentDidMount = function componentDidMount() {
            var hash = (window.location.hash || '').slice(1)
            this.select(hash || DEFAULT_EXAMPLE)
          }

          _proto.render = function render() {
            var _this2 = this

            var selected = this.state.selected
            var Current = {
              basic: _basic.default,
              selectable: _selectable.default,
              cultures: _cultures.default,
              popup: _popup.default,
              rendering: _rendering.default,
              customView: _customView.default,
              resource: _resource.default,
              timeslots: _timeslots.default,
              dnd: _dnd.default,
              dndresource: _dndresource.default,
              dndOutsideSource: _dndOutsideSource.default,
            }[selected]
            return _react.default.createElement(
              'div',
              {
                className: 'app',
              },
              _react.default.createElement(
                'div',
                {
                  className: 'jumbotron',
                },
                _react.default.createElement(
                  'div',
                  {
                    className: 'container',
                  },
                  _react.default.createElement(
                    'h1',
                    null,
                    'Big Calendar ',
                    _react.default.createElement('i', {
                      className: 'fa fa-calendar',
                    })
                  ),
                  _react.default.createElement(
                    'p',
                    null,
                    'such enterprise, very business.'
                  ),
                  _react.default.createElement(
                    'p',
                    null,
                    _react.default.createElement(
                      'a',
                      {
                        href: '#intro',
                      },
                      _react.default.createElement('i', {
                        className: 'fa fa-play',
                      }),
                      ' Getting started'
                    ),
                    ' | ',
                    _react.default.createElement(
                      'a',
                      {
                        href: '#api',
                      },
                      _react.default.createElement('i', {
                        className: 'fa fa-book',
                      }),
                      ' API documentation'
                    ),
                    ' | ',
                    _react.default.createElement(
                      'a',
                      {
                        target: '_blank',
                        href:
                          'https://github.com/intljusticemission/react-big-calendar',
                      },
                      _react.default.createElement('i', {
                        className: 'fa fa-github',
                      }),
                      ' github'
                    )
                  )
                )
              ),
              _react.default.createElement(
                'div',
                {
                  className: 'examples',
                },
                _react.default.createElement(
                  _Card.default,
                  {
                    className: 'examples--header',
                  },
                  _react.default.createElement(
                    _Layout.default,
                    {
                      align: 'center',
                      justify: 'space-between',
                      style: {
                        marginBottom: 15,
                      },
                    },
                    _react.default.createElement(
                      'div',
                      {
                        className: 'examples--view-source',
                      },
                      _react.default.createElement(
                        'a',
                        {
                          target: '_blank',
                          href: demoRoot + '/' + selected + '.js',
                        },
                        _react.default.createElement(
                          'strong',
                          null,
                          _react.default.createElement('i', {
                            className: 'fa fa-code',
                          }),
                          ' View example source code'
                        )
                      )
                    ),
                    _react.default.createElement(
                      _Dropdown.default,
                      {
                        pullRight: true,
                        id: 'examples-dropdown',
                        className: 'examples--dropdown',
                      },
                      _react.default.createElement(
                        _Dropdown.default.Toggle,
                        {
                          bsStyle: 'link',
                          className: 'dropdown--toggle ',
                        },
                        EXAMPLES[selected]
                      ),
                      _react.default.createElement(
                        _Dropdown.default.Menu,
                        null,
                        Object.entries(EXAMPLES).map(function(_ref) {
                          var key = _ref[0],
                            title = _ref[1]
                          return _react.default.createElement(
                            _MenuItem.default,
                            {
                              active: _this2.state.selected === key,
                              key: key,
                              href: '#' + key,
                              onClick: function onClick() {
                                return _this2.select(key)
                              },
                            },
                            title
                          )
                        })
                      )
                    )
                  ),
                  _react.default.createElement(
                    _ExampleControlSlot.default.Outlet,
                    null
                  )
                ),
                _react.default.createElement(
                  'div',
                  {
                    className: 'example',
                  },
                  _react.default.createElement(Current, {
                    localizer: globalizeLocalizer,
                  })
                )
              ),
              _react.default.createElement(
                'div',
                {
                  className: 'docs',
                },
                _react.default.createElement(
                  'div',
                  {
                    className: 'contain section',
                  },
                  _react.default.createElement(_Intro.default, null)
                ),
                _react.default.createElement(_Api.default, {
                  className: 'contain section',
                })
              )
            )
          }

          return Example
        })(_react.default.Component)

      document.addEventListener('DOMContentLoaded', function() {
        ;(0,
        _reactDom.render)(_react.default.createElement(Example, null), document.getElementById('app'))
      })

      /***/
    },

    /***/ 199: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _transform = _interopRequireDefault(__webpack_require__(124))

      var _Calendar = _interopRequireDefault(__webpack_require__(267))

      function displayObj(obj) {
        return JSON.stringify(obj, null, 2).replace(/"|'/g, '')
      }

      var capitalize = function capitalize(str) {
        return str[0].toUpperCase() + str.substr(1)
      }

      var cleanDocletValue = function cleanDocletValue(str) {
        return str
          .trim()
          .replace(/^\{/, '')
          .replace(/\}$/, '')
      }

      var Api =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(Api, _React$Component)

          function Api() {
            return _React$Component.apply(this, arguments) || this
          }

          var _proto = Api.prototype

          _proto.render = function render() {
            var _this = this

            var calData = _Calendar.default.Calendar
            return _react.default.createElement(
              'div',
              this.props,
              _react.default.createElement(
                'h1',
                {
                  id: 'api',
                },
                _react.default.createElement(
                  'a',
                  {
                    href: '#api',
                  },
                  'API'
                )
              ),
              _react.default.createElement('p', {
                dangerouslySetInnerHTML: {
                  __html: calData.descHtml,
                },
              }),
              _react.default.createElement('h2', null, 'Props'),
              Object.keys(calData.props).map(function(propName) {
                var data = calData.props[propName]
                return _this.renderProp(data, propName, 'h3')
              })
            )
          }

          _proto.renderProp = function renderProp(data, name, Heading) {
            var _this2 = this

            var typeInfo = this.renderType(data)
            return _react.default.createElement(
              'section',
              {
                key: name,
              },
              _react.default.createElement(
                Heading,
                {
                  id: 'prop-' + name,
                },
                _react.default.createElement(
                  'a',
                  {
                    href: '#prop-' + name,
                  },
                  _react.default.createElement('code', null, name)
                ),
                data.required &&
                  _react.default.createElement('strong', null, ' required'),
                this.renderControllableNote(data, name)
              ),
              _react.default.createElement('div', {
                dangerouslySetInnerHTML: {
                  __html: data.descriptionHtml,
                },
              }),
              name !== 'formats'
                ? _react.default.createElement(
                    'div',
                    {
                      style: {
                        paddingLeft: 0,
                      },
                    },
                    _react.default.createElement(
                      'div',
                      null,
                      'type: ',
                      typeInfo && typeInfo.type === 'pre'
                        ? typeInfo
                        : _react.default.createElement('code', null, typeInfo)
                    ),
                    data.defaultValue &&
                      _react.default.createElement(
                        'div',
                        null,
                        'default: ',
                        _react.default.createElement(
                          'code',
                          null,
                          data.defaultValue.value.trim()
                        )
                      )
                  )
                : _react.default.createElement(
                    'div',
                    null,
                    Object.keys(data.type.value).map(function(propName) {
                      return _this2.renderProp(
                        data.type.value[propName],
                        name + '.' + propName,
                        'h4'
                      )
                    })
                  )
            )
          }

          _proto.renderType = function renderType(prop) {
            var _this3 = this

            var type = prop.type || {}
            var name = getDisplayTypeName(type.name)
            var doclets = prop.doclets || {}

            switch (name) {
              case 'node':
                return 'any'

              case 'function':
                return 'Function'

              case 'elementType':
                return 'ReactClass<any>'

              case 'dateFormat':
                return 'string | (date: Date, culture: ?string, localizer: Localizer) => string'

              case 'dateRangeFormat':
                return '(range: { start: Date, end: Date }, culture: ?string, localizer: Localizer) => string'

              case 'object':
              case 'Object':
                if (type.value)
                  return _react.default.createElement(
                    'pre',
                    {
                      className: 'shape-prop',
                    },
                    displayObj(renderObject(type.value))
                  )
                return name

              case 'union':
                return type.value.reduce(function(current, val, i, list) {
                  val =
                    typeof val === 'string'
                      ? {
                          name: val,
                        }
                      : val

                  var item = _this3.renderType({
                    type: val,
                  })

                  if (_react.default.isValidElement(item)) {
                    item = _react.default.cloneElement(item, {
                      key: i,
                    })
                  }

                  current = current.concat(item)
                  return i === list.length - 1 ? current : current.concat(' | ')
                }, [])

              case 'array': {
                var child = this.renderType({
                  type: type.value,
                })
                return _react.default.createElement(
                  'span',
                  null,
                  'Array<',
                  child,
                  '>'
                )
              }

              case 'enum':
                return this.renderEnum(type)

              case 'custom':
                return cleanDocletValue(doclets.type || name)

              default:
                return name
            }
          }

          _proto.renderEnum = function renderEnum(enumType) {
            var enumValues = enumType.value || []
            if (!Array.isArray(enumValues)) return enumValues
            var renderedEnumValues = []
            enumValues.forEach(function(_ref, i) {
              var value = _ref.value

              if (i > 0) {
                renderedEnumValues.push(
                  _react.default.createElement(
                    'span',
                    {
                      key: i + 'c',
                    },
                    ' | '
                  )
                )
              }

              renderedEnumValues.push(
                _react.default.createElement(
                  'code',
                  {
                    key: i,
                  },
                  value
                )
              )
            })
            return _react.default.createElement(
              'span',
              null,
              renderedEnumValues
            )
          }

          _proto.renderControllableNote = function renderControllableNote(
            prop,
            propName
          ) {
            var controllable = prop.doclets && prop.doclets.controllable
            var isHandler =
              prop.type && getDisplayTypeName(prop.type.name) === 'function'

            if (!controllable) {
              return false
            }

            var text = isHandler
              ? _react.default.createElement(
                  'span',
                  null,
                  'controls ',
                  _react.default.createElement('code', null, controllable)
                )
              : _react.default.createElement(
                  'span',
                  null,
                  'controlled by: ',
                  _react.default.createElement('code', null, controllable),
                  ', initialized with:',
                  ' ',
                  _react.default.createElement(
                    'code',
                    null,
                    'default' + capitalize(propName)
                  )
                )
            return _react.default.createElement(
              'div',
              {
                className: 'pull-right',
              },
              _react.default.createElement(
                'em',
                null,
                _react.default.createElement('small', null, text)
              )
            )
          }

          return Api
        })(_react.default.Component)

      function getDisplayTypeName(typeName) {
        if (typeName === 'func') {
          return 'function'
        } else if (typeName === 'bool') {
          return 'boolean'
        } else if (typeName === 'object') {
          return 'Object'
        }

        return typeName
      }

      function renderObject(props) {
        return (0, _transform.default)(
          props,
          function(obj, val, key) {
            obj[val.required ? key : key + '?'] = simpleType(val)
          },
          {}
        )
      }

      function simpleType(prop) {
        var type = prop.type || {}
        var name = getDisplayTypeName(type.name)
        var doclets = prop.doclets || {}

        switch (name) {
          case 'node':
            return 'any'

          case 'function':
            return 'Function'

          case 'elementType':
            return 'ReactClass<any>'

          case 'object':
          case 'Object':
            if (type.value) return renderObject(type.value)
            return name

          case 'array':
          case 'Array':
            var child = simpleType({
              type: type.value,
            })
            return 'Array<' + child + '>'

          case 'custom':
            return cleanDocletValue(doclets.type || name)

          default:
            return name
        }
      }

      var _default = Api
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 21: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      exports.__esModule = true
      exports.default = void 0
      var now = new Date()
      var _default = [
        {
          id: 0,
          title: 'All Day Event very long title',
          allDay: true,
          start: new Date(2015, 3, 0),
          end: new Date(2015, 3, 1),
        },
        {
          id: 1,
          title: 'Long Event',
          start: new Date(2015, 3, 7),
          end: new Date(2015, 3, 10),
        },
        {
          id: 2,
          title: 'DTS STARTS',
          start: new Date(2016, 2, 13, 0, 0, 0),
          end: new Date(2016, 2, 20, 0, 0, 0),
        },
        {
          id: 3,
          title: 'DTS ENDS',
          start: new Date(2016, 10, 6, 0, 0, 0),
          end: new Date(2016, 10, 13, 0, 0, 0),
        },
        {
          id: 4,
          title: 'Some Event',
          start: new Date(2015, 3, 9, 0, 0, 0),
          end: new Date(2015, 3, 10, 0, 0, 0),
        },
        {
          id: 5,
          title: 'Conference',
          start: new Date(2015, 3, 11),
          end: new Date(2015, 3, 13),
          desc: 'Big conference for important people',
        },
        {
          id: 6,
          title: 'Meeting',
          start: new Date(2015, 3, 12, 10, 30, 0, 0),
          end: new Date(2015, 3, 12, 12, 30, 0, 0),
          desc: 'Pre-meeting meeting, to prepare for the meeting',
        },
        {
          id: 7,
          title: 'Lunch',
          start: new Date(2015, 3, 12, 12, 0, 0, 0),
          end: new Date(2015, 3, 12, 13, 0, 0, 0),
          desc: 'Power lunch',
        },
        {
          id: 8,
          title: 'Meeting',
          start: new Date(2015, 3, 12, 14, 0, 0, 0),
          end: new Date(2015, 3, 12, 15, 0, 0, 0),
        },
        {
          id: 9,
          title: 'Happy Hour',
          start: new Date(2015, 3, 12, 17, 0, 0, 0),
          end: new Date(2015, 3, 12, 17, 30, 0, 0),
          desc: 'Most important meal of the day',
        },
        {
          id: 10,
          title: 'Dinner',
          start: new Date(2015, 3, 12, 20, 0, 0, 0),
          end: new Date(2015, 3, 12, 21, 0, 0, 0),
        },
        {
          id: 11,
          title: 'Birthday Party',
          start: new Date(2015, 3, 13, 7, 0, 0),
          end: new Date(2015, 3, 13, 10, 30, 0),
        },
        {
          id: 12,
          title: 'Late Night Event',
          start: new Date(2015, 3, 17, 19, 30, 0),
          end: new Date(2015, 3, 18, 2, 0, 0),
        },
        {
          id: 12.5,
          title: 'Late Same Night Event',
          start: new Date(2015, 3, 17, 19, 30, 0),
          end: new Date(2015, 3, 17, 23, 30, 0),
        },
        {
          id: 13,
          title: 'Multi-day Event',
          start: new Date(2015, 3, 20, 19, 30, 0),
          end: new Date(2015, 3, 22, 2, 0, 0),
        },
        {
          id: 14,
          title: 'Today',
          start: new Date(new Date().setHours(new Date().getHours() - 3)),
          end: new Date(new Date().setHours(new Date().getHours() + 3)),
        },
        {
          id: 15,
          title: 'Point in Time Event',
          start: now,
          end: now,
        },
      ]
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 267: /***/ function(module, exports) {
      module.exports = {
        Calendar: {
          description:
            'react-big-calendar is a full featured Calendar component for managing events and dates. It uses\nmodern `flexbox` for layout, making it super responsive and performant. Leaving most of the layout heavy lifting\nto the browser. __note:__ The default styles use `height: 100%` which means your container must set an explicit\nheight (feel free to adjust the styles to suit your specific needs).\n\nBig Calendar is unopiniated about editing and moving events, preferring to let you implement it in a way that makes\nthe most sense to your app. It also tries not to be prescriptive about your event data structures, just tell it\nhow to find the start and end datetimes and you can pass it whatever you want.\n\nOne thing to note is that, `react-big-calendar` treats event start/end dates as an _exclusive_ range.\nwhich means that the event spans up to, but not including, the end date. In the case\nof displaying events on whole days, end dates are rounded _up_ to the next day. So an\nevent ending on `Apr 8th 12:00:00 am` will not appear on the 8th, whereas one ending\non `Apr 8th 12:01:00 am` will. If you want _inclusive_ ranges consider providing a\nfunction `endAccessor` that returns the end date + 1 day for those events that end at midnight.',
          displayName: 'Calendar',
          methods: [
            {
              name: 'getContext',
              docblock: null,
              modifiers: [],
              params: [
                {
                  name:
                    '{\n  startAccessor,\n  endAccessor,\n  allDayAccessor,\n  tooltipAccessor,\n  titleAccessor,\n  resourceAccessor,\n  resourceIdAccessor,\n  resourceTitleAccessor,\n  eventPropGetter,\n  slotPropGetter,\n  dayPropGetter,\n  view,\n  views,\n  localizer,\n  culture,\n  messages = {},\n  components = {},\n  formats = {},\n}',
                  type: null,
                },
              ],
              returns: null,
            },
            {
              name: 'getViews',
              docblock: null,
              modifiers: [],
              params: [],
              returns: null,
            },
            {
              name: 'getView',
              docblock: null,
              modifiers: [],
              params: [],
              returns: null,
            },
            {
              name: 'getDrilldownView',
              docblock: null,
              modifiers: [],
              params: [{ name: 'date', type: null }],
              returns: null,
            },
            {
              name: 'handleRangeChange',
              docblock:
                "@param date\n@param viewComponent\n@param {'month'|'week'|'work_week'|'day'|'agenda'} [view] - optional\nparameter. It appears when range change on view changing. It could be handy\nwhen you need to have both: range and view type at once, i.e. for manage rbc\nstate via url",
              modifiers: [],
              params: [
                { name: 'date', description: null, type: null },
                { name: 'viewComponent', description: null, type: null },
                { name: 'view' },
              ],
              returns: null,
              description: null,
            },
            {
              name: 'handleNavigate',
              docblock: null,
              modifiers: [],
              params: [
                { name: 'action', type: null },
                { name: 'newDate', type: null },
              ],
              returns: null,
            },
            {
              name: 'handleViewChange',
              docblock: null,
              modifiers: [],
              params: [{ name: 'view', type: null }],
              returns: null,
            },
            {
              name: 'handleSelectEvent',
              docblock: null,
              modifiers: [],
              params: [{ name: '...args', type: null }],
              returns: null,
            },
            {
              name: 'handleDoubleClickEvent',
              docblock: null,
              modifiers: [],
              params: [{ name: '...args', type: null }],
              returns: null,
            },
            {
              name: 'handleSelectSlot',
              docblock: null,
              modifiers: [],
              params: [{ name: 'slotInfo', type: null }],
              returns: null,
            },
            {
              name: 'handleDrillDown',
              docblock: null,
              modifiers: [],
              params: [
                { name: 'date', type: null },
                { name: 'view', type: null },
              ],
              returns: null,
            },
          ],
          props: {
            localizer: {
              type: { name: 'object' },
              required: true,
              description: '',
              name: 'localizer',
              docblock: '',
              doclets: {},
              descriptionHtml: '',
            },
            elementProps: {
              type: { name: 'object' },
              required: false,
              description: 'Props passed to main calendar `<div>`.',
              defaultValue: { value: '{}', computed: false },
              name: 'elementProps',
              docblock: 'Props passed to main calendar `<div>`.',
              doclets: {},
              descriptionHtml:
                '<p>Props passed to main calendar <code>&lt;div&gt;</code>.</p>\n',
            },
            date: {
              type: { name: 'instanceOf', value: 'Date' },
              required: false,
              description:
                'The current date value of the calendar. Determines the visible view range.\nIf `date` is omitted then the result of `getNow` is used; otherwise the\ncurrent date is used.',
              name: 'date',
              docblock:
                'The current date value of the calendar. Determines the visible view range.\nIf `date` is omitted then the result of `getNow` is used; otherwise the\ncurrent date is used.\n\n@controllable onNavigate',
              doclets: { controllable: 'onNavigate' },
              descriptionHtml:
                '<p>The current date value of the calendar. Determines the visible view range.\nIf <code>date</code> is omitted then the result of <code>getNow</code> is used; otherwise the\ncurrent date is used.</p>\n',
            },
            view: {
              type: { name: 'string' },
              required: false,
              description: 'The current view of the calendar.',
              defaultValue: { value: 'views.MONTH', computed: true },
              name: 'view',
              docblock:
                "The current view of the calendar.\n\n@default 'month'\n@controllable onView",
              doclets: { default: "'month'", controllable: 'onView' },
              descriptionHtml: '<p>The current view of the calendar.</p>\n',
            },
            defaultView: {
              type: {
                name:
                  "Calendar.Views ('month'|'week'|'work_week'|'day'|'agenda')",
              },
              required: false,
              description: 'The initial view set for the Calendar.',
              name: 'defaultView',
              docblock:
                "The initial view set for the Calendar.\n@type Calendar.Views ('month'|'week'|'work_week'|'day'|'agenda')\n@default 'month'",
              doclets: {
                type:
                  "Calendar.Views ('month'|'week'|'work_week'|'day'|'agenda')",
                default: "'month'",
              },
              descriptionHtml:
                '<p>The initial view set for the Calendar.</p>\n',
            },
            events: {
              type: { name: 'arrayOf', value: { name: 'object' } },
              required: false,
              description:
                'An array of event objects to display on the calendar. Events objects\ncan be any shape, as long as the Calendar knows how to retrieve the\nfollowing details of the event:\n\n - start time\n - end time\n - title\n - whether its an "all day" event or not\n - any resource the event may be related to\n\nEach of these properties can be customized or generated dynamically by\nsetting the various "accessor" props. Without any configuration the default\nevent should look like:\n\n```js\nEvent {\n  title: string,\n  start: Date,\n  end: Date,\n  allDay?: boolean\n  resource?: any,\n}\n```',
              name: 'events',
              docblock:
                'An array of event objects to display on the calendar. Events objects\ncan be any shape, as long as the Calendar knows how to retrieve the\nfollowing details of the event:\n\n - start time\n - end time\n - title\n - whether its an "all day" event or not\n - any resource the event may be related to\n\nEach of these properties can be customized or generated dynamically by\nsetting the various "accessor" props. Without any configuration the default\nevent should look like:\n\n```js\nEvent {\n  title: string,\n  start: Date,\n  end: Date,\n  allDay?: boolean\n  resource?: any,\n}\n```',
              doclets: {},
              descriptionHtml:
                '<p>An array of event objects to display on the calendar. Events objects\ncan be any shape, as long as the Calendar knows how to retrieve the\nfollowing details of the event:</p>\n<ul>\n<li>start time</li>\n<li>end time</li>\n<li>title</li>\n<li>whether its an &quot;all day&quot; event or not</li>\n<li>any resource the event may be related to</li>\n</ul>\n<p>Each of these properties can be customized or generated dynamically by\nsetting the various &quot;accessor&quot; props. Without any configuration the default\nevent should look like:</p>\n<pre><code class="lang-js">Event <span class="token punctuation">{</span>\n  title<span class="token punctuation">:</span> string<span class="token punctuation">,</span>\n  start<span class="token punctuation">:</span> Date<span class="token punctuation">,</span>\n  end<span class="token punctuation">:</span> Date<span class="token punctuation">,</span>\n  allDay<span class="token operator">?</span><span class="token punctuation">:</span> boolean\n  resource<span class="token operator">?</span><span class="token punctuation">:</span> any<span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</code></pre>\n',
            },
            titleAccessor: {
              type: {
                name: 'union',
                raw: 'accessor',
                value: ['func', 'string'],
              },
              required: false,
              description:
                'Accessor for the event title, used to display event information. Should\nresolve to a `renderable` value.\n\n```js\nstring | (event: Object) => string\n```',
              defaultValue: { value: "'title'", computed: false },
              name: 'titleAccessor',
              docblock:
                'Accessor for the event title, used to display event information. Should\nresolve to a `renderable` value.\n\n```js\nstring | (event: Object) => string\n```\n\n@type {(func|string)}',
              doclets: { type: '{(func|string)}' },
              descriptionHtml:
                '<p>Accessor for the event title, used to display event information. Should\nresolve to a <code>renderable</code> value.</p>\n<pre><code class="lang-js">string <span class="token operator">|</span> <span class="token punctuation">(</span><span class="token parameter">event<span class="token punctuation">:</span> Object</span><span class="token punctuation">)</span> <span class="token operator">=></span> string\n</code></pre>\n',
            },
            tooltipAccessor: {
              type: {
                name: 'union',
                raw: 'accessor',
                value: ['func', 'string'],
              },
              required: false,
              description:
                'Accessor for the event tooltip. Should\nresolve to a `renderable` value. Removes the tooltip if null.\n\n```js\nstring | (event: Object) => string\n```',
              defaultValue: { value: "'title'", computed: false },
              name: 'tooltipAccessor',
              docblock:
                'Accessor for the event tooltip. Should\nresolve to a `renderable` value. Removes the tooltip if null.\n\n```js\nstring | (event: Object) => string\n```\n\n@type {(func|string)}',
              doclets: { type: '{(func|string)}' },
              descriptionHtml:
                '<p>Accessor for the event tooltip. Should\nresolve to a <code>renderable</code> value. Removes the tooltip if null.</p>\n<pre><code class="lang-js">string <span class="token operator">|</span> <span class="token punctuation">(</span><span class="token parameter">event<span class="token punctuation">:</span> Object</span><span class="token punctuation">)</span> <span class="token operator">=></span> string\n</code></pre>\n',
            },
            allDayAccessor: {
              type: {
                name: 'union',
                raw: 'accessor',
                value: ['func', 'string'],
              },
              required: false,
              description:
                'Determines whether the event should be considered an "all day" event and ignore time.\nMust resolve to a `boolean` value.\n\n```js\nstring | (event: Object) => boolean\n```',
              defaultValue: { value: "'allDay'", computed: false },
              name: 'allDayAccessor',
              docblock:
                'Determines whether the event should be considered an "all day" event and ignore time.\nMust resolve to a `boolean` value.\n\n```js\nstring | (event: Object) => boolean\n```\n\n@type {(func|string)}',
              doclets: { type: '{(func|string)}' },
              descriptionHtml:
                '<p>Determines whether the event should be considered an &quot;all day&quot; event and ignore time.\nMust resolve to a <code>boolean</code> value.</p>\n<pre><code class="lang-js">string <span class="token operator">|</span> <span class="token punctuation">(</span><span class="token parameter">event<span class="token punctuation">:</span> Object</span><span class="token punctuation">)</span> <span class="token operator">=></span> boolean\n</code></pre>\n',
            },
            startAccessor: {
              type: {
                name: 'union',
                raw: 'accessor',
                value: ['func', 'string'],
              },
              required: false,
              description:
                'The start date/time of the event. Must resolve to a JavaScript `Date` object.\n\n```js\nstring | (event: Object) => Date\n```',
              defaultValue: { value: "'start'", computed: false },
              name: 'startAccessor',
              docblock:
                'The start date/time of the event. Must resolve to a JavaScript `Date` object.\n\n```js\nstring | (event: Object) => Date\n```\n\n@type {(func|string)}',
              doclets: { type: '{(func|string)}' },
              descriptionHtml:
                '<p>The start date/time of the event. Must resolve to a JavaScript <code>Date</code> object.</p>\n<pre><code class="lang-js">string <span class="token operator">|</span> <span class="token punctuation">(</span><span class="token parameter">event<span class="token punctuation">:</span> Object</span><span class="token punctuation">)</span> <span class="token operator">=></span> Date\n</code></pre>\n',
            },
            endAccessor: {
              type: {
                name: 'union',
                raw: 'accessor',
                value: ['func', 'string'],
              },
              required: false,
              description:
                'The end date/time of the event. Must resolve to a JavaScript `Date` object.\n\n```js\nstring | (event: Object) => Date\n```',
              defaultValue: { value: "'end'", computed: false },
              name: 'endAccessor',
              docblock:
                'The end date/time of the event. Must resolve to a JavaScript `Date` object.\n\n```js\nstring | (event: Object) => Date\n```\n\n@type {(func|string)}',
              doclets: { type: '{(func|string)}' },
              descriptionHtml:
                '<p>The end date/time of the event. Must resolve to a JavaScript <code>Date</code> object.</p>\n<pre><code class="lang-js">string <span class="token operator">|</span> <span class="token punctuation">(</span><span class="token parameter">event<span class="token punctuation">:</span> Object</span><span class="token punctuation">)</span> <span class="token operator">=></span> Date\n</code></pre>\n',
            },
            resourceAccessor: {
              type: {
                name: 'union',
                raw: 'accessor',
                value: ['func', 'string'],
              },
              required: false,
              description:
                'Returns the id of the `resource` that the event is a member of. This\nid should match at least one resource in the `resources` array.\n\n```js\nstring | (event: Object) => Date\n```',
              defaultValue: { value: "'resourceId'", computed: false },
              name: 'resourceAccessor',
              docblock:
                'Returns the id of the `resource` that the event is a member of. This\nid should match at least one resource in the `resources` array.\n\n```js\nstring | (event: Object) => Date\n```\n\n@type {(func|string)}',
              doclets: { type: '{(func|string)}' },
              descriptionHtml:
                '<p>Returns the id of the <code>resource</code> that the event is a member of. This\nid should match at least one resource in the <code>resources</code> array.</p>\n<pre><code class="lang-js">string <span class="token operator">|</span> <span class="token punctuation">(</span><span class="token parameter">event<span class="token punctuation">:</span> Object</span><span class="token punctuation">)</span> <span class="token operator">=></span> Date\n</code></pre>\n',
            },
            resources: {
              type: { name: 'arrayOf', value: { name: 'object' } },
              required: false,
              description:
                'An array of resource objects that map events to a specific resource.\nResource objects, like events, can be any shape or have any properties,\nbut should be uniquly identifiable via the `resourceIdAccessor`, as\nwell as a "title" or name as provided by the `resourceTitleAccessor` prop.',
              name: 'resources',
              docblock:
                'An array of resource objects that map events to a specific resource.\nResource objects, like events, can be any shape or have any properties,\nbut should be uniquly identifiable via the `resourceIdAccessor`, as\nwell as a "title" or name as provided by the `resourceTitleAccessor` prop.',
              doclets: {},
              descriptionHtml:
                '<p>An array of resource objects that map events to a specific resource.\nResource objects, like events, can be any shape or have any properties,\nbut should be uniquly identifiable via the <code>resourceIdAccessor</code>, as\nwell as a &quot;title&quot; or name as provided by the <code>resourceTitleAccessor</code> prop.</p>\n',
            },
            resourceIdAccessor: {
              type: {
                name: 'union',
                raw: 'accessor',
                value: ['func', 'string'],
              },
              required: false,
              description:
                'Provides a unique identifier for each resource in the `resources` array\n\n```js\nstring | (resource: Object) => any\n```',
              defaultValue: { value: "'id'", computed: false },
              name: 'resourceIdAccessor',
              docblock:
                'Provides a unique identifier for each resource in the `resources` array\n\n```js\nstring | (resource: Object) => any\n```\n\n@type {(func|string)}',
              doclets: { type: '{(func|string)}' },
              descriptionHtml:
                '<p>Provides a unique identifier for each resource in the <code>resources</code> array</p>\n<pre><code class="lang-js">string <span class="token operator">|</span> <span class="token punctuation">(</span><span class="token parameter">resource<span class="token punctuation">:</span> Object</span><span class="token punctuation">)</span> <span class="token operator">=></span> any\n</code></pre>\n',
            },
            resourceTitleAccessor: {
              type: {
                name: 'union',
                raw: 'accessor',
                value: ['func', 'string'],
              },
              required: false,
              description:
                'Provides a human readable name for the resource object, used in headers.\n\n```js\nstring | (resource: Object) => any\n```',
              defaultValue: { value: "'title'", computed: false },
              name: 'resourceTitleAccessor',
              docblock:
                'Provides a human readable name for the resource object, used in headers.\n\n```js\nstring | (resource: Object) => any\n```\n\n@type {(func|string)}',
              doclets: { type: '{(func|string)}' },
              descriptionHtml:
                '<p>Provides a human readable name for the resource object, used in headers.</p>\n<pre><code class="lang-js">string <span class="token operator">|</span> <span class="token punctuation">(</span><span class="token parameter">resource<span class="token punctuation">:</span> Object</span><span class="token punctuation">)</span> <span class="token operator">=></span> any\n</code></pre>\n',
            },
            getNow: {
              type: { name: 'func' },
              required: false,
              description:
                'Determines the current date/time which is highlighted in the views.\n\nThe value affects which day is shaded and which time is shown as\nthe current time. It also affects the date used by the Today button in\nthe toolbar.\n\nProviding a value here can be useful when you are implementing time zones\nusing the `startAccessor` and `endAccessor` properties.',
              defaultValue: { value: '() => new Date()', computed: false },
              name: 'getNow',
              docblock:
                'Determines the current date/time which is highlighted in the views.\n\nThe value affects which day is shaded and which time is shown as\nthe current time. It also affects the date used by the Today button in\nthe toolbar.\n\nProviding a value here can be useful when you are implementing time zones\nusing the `startAccessor` and `endAccessor` properties.\n\n@type {func}\n@default () => new Date()',
              doclets: { type: '{func}', default: '() => new Date()' },
              descriptionHtml:
                '<p>Determines the current date/time which is highlighted in the views.</p>\n<p>The value affects which day is shaded and which time is shown as\nthe current time. It also affects the date used by the Today button in\nthe toolbar.</p>\n<p>Providing a value here can be useful when you are implementing time zones\nusing the <code>startAccessor</code> and <code>endAccessor</code> properties.</p>\n',
            },
            onNavigate: {
              type: { name: 'func' },
              required: false,
              description: 'Callback fired when the `date` value changes.',
              name: 'onNavigate',
              docblock:
                'Callback fired when the `date` value changes.\n\n@controllable date',
              doclets: { controllable: 'date' },
              descriptionHtml:
                '<p>Callback fired when the <code>date</code> value changes.</p>\n',
            },
            onView: {
              type: { name: 'func' },
              required: false,
              description: 'Callback fired when the `view` value changes.',
              name: 'onView',
              docblock:
                'Callback fired when the `view` value changes.\n\n@controllable view',
              doclets: { controllable: 'view' },
              descriptionHtml:
                '<p>Callback fired when the <code>view</code> value changes.</p>\n',
            },
            onDrillDown: {
              type: { name: 'func' },
              required: false,
              description:
                'Callback fired when date header, or the truncated events links are clicked',
              name: 'onDrillDown',
              docblock:
                'Callback fired when date header, or the truncated events links are clicked',
              doclets: {},
              descriptionHtml:
                '<p>Callback fired when date header, or the truncated events links are clicked</p>\n',
            },
            onRangeChange: {
              type: { name: 'func' },
              required: false,
              description:
                "```js\n(dates: Date[] | { start: Date; end: Date }, view?: 'month'|'week'|'work_week'|'day'|'agenda') => void\n```\n\nCallback fired when the visible date range changes. Returns an Array of dates\nor an object with start and end dates for BUILTIN views. Optionally new `view`\nwill be returned when callback called after view change.\n\nCustom views may return something different.",
              name: 'onRangeChange',
              docblock:
                "```js\n(dates: Date[] | { start: Date; end: Date }, view?: 'month'|'week'|'work_week'|'day'|'agenda') => void\n```\n\nCallback fired when the visible date range changes. Returns an Array of dates\nor an object with start and end dates for BUILTIN views. Optionally new `view`\nwill be returned when callback called after view change.\n\nCustom views may return something different.",
              doclets: {},
              descriptionHtml:
                '<pre><code class="lang-js"><span class="token punctuation">(</span>dates<span class="token punctuation">:</span> Date<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token punctuation">{</span> start<span class="token punctuation">:</span> Date<span class="token punctuation">;</span> end<span class="token punctuation">:</span> Date <span class="token punctuation">}</span><span class="token punctuation">,</span> view<span class="token operator">?</span><span class="token punctuation">:</span> <span class="token string">\'month\'</span><span class="token operator">|</span><span class="token string">\'week\'</span><span class="token operator">|</span><span class="token string">\'work_week\'</span><span class="token operator">|</span><span class="token string">\'day\'</span><span class="token operator">|</span><span class="token string">\'agenda\'</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span>\n</code></pre>\n<p>Callback fired when the visible date range changes. Returns an Array of dates\nor an object with start and end dates for BUILTIN views. Optionally new <code>view</code>\nwill be returned when callback called after view change.</p>\n<p>Custom views may return something different.</p>\n',
            },
            onSelectSlot: {
              type: { name: 'func' },
              required: false,
              description:
                'A callback fired when a date selection is made. Only fires when `selectable` is `true`.\n\n```js\n(\n  slotInfo: {\n    start: Date,\n    end: Date,\n    slots: Array<Date>,\n    action: "select" | "click" | "doubleClick",\n    bounds: ?{ // For "select" action\n      x: number,\n      y: number,\n      top: number,\n      right: number,\n      left: number,\n      bottom: number,\n    },\n    box: ?{ // For "click" or "doubleClick" actions\n      clientX: number,\n      clientY: number,\n      x: number,\n      y: number,\n    },\n  }\n) => any\n```',
              name: 'onSelectSlot',
              docblock:
                'A callback fired when a date selection is made. Only fires when `selectable` is `true`.\n\n```js\n(\n  slotInfo: {\n    start: Date,\n    end: Date,\n    slots: Array<Date>,\n    action: "select" | "click" | "doubleClick",\n    bounds: ?{ // For "select" action\n      x: number,\n      y: number,\n      top: number,\n      right: number,\n      left: number,\n      bottom: number,\n    },\n    box: ?{ // For "click" or "doubleClick" actions\n      clientX: number,\n      clientY: number,\n      x: number,\n      y: number,\n    },\n  }\n) => any\n```',
              doclets: {},
              descriptionHtml:
                '<p>A callback fired when a date selection is made. Only fires when <code>selectable</code> is <code>true</code>.</p>\n<pre><code class="lang-js"><span class="token punctuation">(</span>\n  slotInfo<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    start<span class="token punctuation">:</span> Date<span class="token punctuation">,</span>\n    end<span class="token punctuation">:</span> Date<span class="token punctuation">,</span>\n    slots<span class="token punctuation">:</span> Array<span class="token operator">&lt;</span>Date<span class="token operator">></span><span class="token punctuation">,</span>\n    action<span class="token punctuation">:</span> <span class="token string">"select"</span> <span class="token operator">|</span> <span class="token string">"click"</span> <span class="token operator">|</span> <span class="token string">"doubleClick"</span><span class="token punctuation">,</span>\n    bounds<span class="token punctuation">:</span> <span class="token operator">?</span><span class="token punctuation">{</span> <span class="token comment">// For "select" action</span>\n      x<span class="token punctuation">:</span> number<span class="token punctuation">,</span>\n      y<span class="token punctuation">:</span> number<span class="token punctuation">,</span>\n      top<span class="token punctuation">:</span> number<span class="token punctuation">,</span>\n      right<span class="token punctuation">:</span> number<span class="token punctuation">,</span>\n      left<span class="token punctuation">:</span> number<span class="token punctuation">,</span>\n      bottom<span class="token punctuation">:</span> number<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    box<span class="token punctuation">:</span> <span class="token operator">?</span><span class="token punctuation">{</span> <span class="token comment">// For "click" or "doubleClick" actions</span>\n      clientX<span class="token punctuation">:</span> number<span class="token punctuation">,</span>\n      clientY<span class="token punctuation">:</span> number<span class="token punctuation">,</span>\n      x<span class="token punctuation">:</span> number<span class="token punctuation">,</span>\n      y<span class="token punctuation">:</span> number<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">)</span> <span class="token operator">=></span> any\n</code></pre>\n',
            },
            onSelectEvent: {
              type: { name: 'func' },
              required: false,
              description:
                'Callback fired when a calendar event is selected.\n\n```js\n(event: Object, e: SyntheticEvent) => any\n```',
              name: 'onSelectEvent',
              docblock:
                'Callback fired when a calendar event is selected.\n\n```js\n(event: Object, e: SyntheticEvent) => any\n```\n\n@controllable selected',
              doclets: { controllable: 'selected' },
              descriptionHtml:
                '<p>Callback fired when a calendar event is selected.</p>\n<pre><code class="lang-js"><span class="token punctuation">(</span><span class="token parameter">event<span class="token punctuation">:</span> Object<span class="token punctuation">,</span> e<span class="token punctuation">:</span> SyntheticEvent</span><span class="token punctuation">)</span> <span class="token operator">=></span> any\n</code></pre>\n',
            },
            onDoubleClickEvent: {
              type: { name: 'func' },
              required: false,
              description:
                'Callback fired when a calendar event is clicked twice.\n\n```js\n(event: Object, e: SyntheticEvent) => void\n```',
              name: 'onDoubleClickEvent',
              docblock:
                'Callback fired when a calendar event is clicked twice.\n\n```js\n(event: Object, e: SyntheticEvent) => void\n```',
              doclets: {},
              descriptionHtml:
                '<p>Callback fired when a calendar event is clicked twice.</p>\n<pre><code class="lang-js"><span class="token punctuation">(</span><span class="token parameter">event<span class="token punctuation">:</span> Object<span class="token punctuation">,</span> e<span class="token punctuation">:</span> SyntheticEvent</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span>\n</code></pre>\n',
            },
            onSelecting: {
              type: { name: 'func' },
              required: false,
              description:
                'Callback fired when dragging a selection in the Time views.\n\nReturning `false` from the handler will prevent a selection.\n\n```js\n(range: { start: Date, end: Date }) => ?boolean\n```',
              name: 'onSelecting',
              docblock:
                'Callback fired when dragging a selection in the Time views.\n\nReturning `false` from the handler will prevent a selection.\n\n```js\n(range: { start: Date, end: Date }) => ?boolean\n```',
              doclets: {},
              descriptionHtml:
                '<p>Callback fired when dragging a selection in the Time views.</p>\n<p>Returning <code>false</code> from the handler will prevent a selection.</p>\n<pre><code class="lang-js"><span class="token punctuation">(</span><span class="token parameter">range<span class="token punctuation">:</span> <span class="token punctuation">{</span> start<span class="token punctuation">:</span> Date<span class="token punctuation">,</span> end<span class="token punctuation">:</span> Date <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token operator">?</span>boolean\n</code></pre>\n',
            },
            onShowMore: {
              type: { name: 'func' },
              required: false,
              description:
                'Callback fired when a +{count} more is clicked\n\n```js\n(events: Object, date: Date) => any\n```',
              name: 'onShowMore',
              docblock:
                'Callback fired when a +{count} more is clicked\n\n```js\n(events: Object, date: Date) => any\n```',
              doclets: {},
              descriptionHtml:
                '<p>Callback fired when a +{count} more is clicked</p>\n<pre><code class="lang-js"><span class="token punctuation">(</span><span class="token parameter">events<span class="token punctuation">:</span> Object<span class="token punctuation">,</span> date<span class="token punctuation">:</span> Date</span><span class="token punctuation">)</span> <span class="token operator">=></span> any\n</code></pre>\n',
            },
            selected: {
              type: { name: 'object' },
              required: false,
              description: 'The selected event, if any.',
              name: 'selected',
              docblock: 'The selected event, if any.',
              doclets: {},
              descriptionHtml: '<p>The selected event, if any.</p>\n',
            },
            views: {
              type: {
                name:
                  "Calendar.Views ('month'|'week'|'work_week'|'day'|'agenda')",
                raw: 'componentViews',
              },
              required: false,
              description:
                "An array of built-in view names to allow the calendar to display.\naccepts either an array of builtin view names,\n\n```jsx\nviews={['month', 'day', 'agenda']}\n```\nor an object hash of the view name and the component (or boolean for builtin).\n\n```jsx\nviews={{\n  month: true,\n  week: false,\n  myweek: WorkWeekViewComponent,\n}}\n```\n\nCustom views can be any React component, that implements the following\ninterface:\n\n```js\ninterface View {\n  static title(date: Date, { formats: DateFormat[], culture: string?, ...props }): string\n  static navigate(date: Date, action: 'PREV' | 'NEXT' | 'DATE'): Date\n}\n```",
              defaultValue: {
                value: '[views.MONTH, views.WEEK, views.DAY, views.AGENDA]',
                computed: false,
              },
              name: 'views',
              docblock:
                "An array of built-in view names to allow the calendar to display.\naccepts either an array of builtin view names,\n\n```jsx\nviews={['month', 'day', 'agenda']}\n```\nor an object hash of the view name and the component (or boolean for builtin).\n\n```jsx\nviews={{\n  month: true,\n  week: false,\n  myweek: WorkWeekViewComponent,\n}}\n```\n\nCustom views can be any React component, that implements the following\ninterface:\n\n```js\ninterface View {\n  static title(date: Date, { formats: DateFormat[], culture: string?, ...props }): string\n  static navigate(date: Date, action: 'PREV' | 'NEXT' | 'DATE'): Date\n}\n```\n\n@type Calendar.Views ('month'|'week'|'work_week'|'day'|'agenda')\n@View\n     ['month', 'week', 'day', 'agenda']",
              doclets: {
                type:
                  "Calendar.Views ('month'|'week'|'work_week'|'day'|'agenda')",
                View: true,
              },
              descriptionHtml:
                '<p>An array of built-in view names to allow the calendar to display.\naccepts either an array of builtin view names,</p>\n<pre><code class="lang-jsx">views<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">[</span><span class="token string">\'month\'</span><span class="token punctuation">,</span> <span class="token string">\'day\'</span><span class="token punctuation">,</span> <span class="token string">\'agenda\'</span><span class="token punctuation">]</span><span class="token punctuation">}</span>\n</code></pre>\n<p>or an object hash of the view name and the component (or boolean for builtin).</p>\n<pre><code class="lang-jsx">views<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>\n  month<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n  week<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n  myweek<span class="token punctuation">:</span> WorkWeekViewComponent<span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">}</span>\n</code></pre>\n<p>Custom views can be any React component, that implements the following\ninterface:</p>\n<pre><code class="lang-js"><span class="token keyword">interface</span> <span class="token class-name">View</span> <span class="token punctuation">{</span>\n  <span class="token keyword">static</span> <span class="token function">title</span><span class="token punctuation">(</span>date<span class="token punctuation">:</span> Date<span class="token punctuation">,</span> <span class="token punctuation">{</span> formats<span class="token punctuation">:</span> DateFormat<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> culture<span class="token punctuation">:</span> string<span class="token operator">?</span><span class="token punctuation">,</span> <span class="token operator">...</span>props <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">:</span> string\n  <span class="token keyword">static</span> <span class="token function">navigate</span><span class="token punctuation">(</span>date<span class="token punctuation">:</span> Date<span class="token punctuation">,</span> action<span class="token punctuation">:</span> <span class="token string">\'PREV\'</span> <span class="token operator">|</span> <span class="token string">\'NEXT\'</span> <span class="token operator">|</span> <span class="token string">\'DATE\'</span><span class="token punctuation">)</span><span class="token punctuation">:</span> Date\n<span class="token punctuation">}</span>\n</code></pre>\n',
            },
            drilldownView: {
              type: { name: 'string' },
              required: false,
              description:
                'The string name of the destination view for drill-down actions, such\nas clicking a date header, or the truncated events links. If\n`getDrilldownView` is also specified it will be used instead.\n\nSet to `null` to disable drill-down actions.\n\n```js\n<BigCalendar\n  drilldownView="agenda"\n/>\n```',
              defaultValue: { value: 'views.DAY', computed: true },
              name: 'drilldownView',
              docblock:
                'The string name of the destination view for drill-down actions, such\nas clicking a date header, or the truncated events links. If\n`getDrilldownView` is also specified it will be used instead.\n\nSet to `null` to disable drill-down actions.\n\n```js\n<BigCalendar\n  drilldownView="agenda"\n/>\n```',
              doclets: {},
              descriptionHtml:
                '<p>The string name of the destination view for drill-down actions, such\nas clicking a date header, or the truncated events links. If\n<code>getDrilldownView</code> is also specified it will be used instead.</p>\n<p>Set to <code>null</code> to disable drill-down actions.</p>\n<pre><code class="lang-js"><span class="token operator">&lt;</span>BigCalendar\n  drilldownView<span class="token operator">=</span><span class="token string">"agenda"</span>\n<span class="token operator">/</span><span class="token operator">></span>\n</code></pre>\n',
            },
            getDrilldownView: {
              type: { name: 'func' },
              required: false,
              description:
                "Functionally equivalent to `drilldownView`, but accepts a function\nthat can return a view name. It's useful for customizing the drill-down\nactions depending on the target date and triggering view.\n\nReturn `null` to disable drill-down actions.\n\n```js\n<BigCalendar\n  getDrilldownView={(targetDate, currentViewName, configuredViewNames) =>\n    if (currentViewName === 'month' && configuredViewNames.includes('week'))\n      return 'week'\n\n    return null;\n  }}\n/>\n```",
              name: 'getDrilldownView',
              docblock:
                "Functionally equivalent to `drilldownView`, but accepts a function\nthat can return a view name. It's useful for customizing the drill-down\nactions depending on the target date and triggering view.\n\nReturn `null` to disable drill-down actions.\n\n```js\n<BigCalendar\n  getDrilldownView={(targetDate, currentViewName, configuredViewNames) =>\n    if (currentViewName === 'month' && configuredViewNames.includes('week'))\n      return 'week'\n\n    return null;\n  }}\n/>\n```",
              doclets: {},
              descriptionHtml:
                '<p>Functionally equivalent to <code>drilldownView</code>, but accepts a function\nthat can return a view name. It&#39;s useful for customizing the drill-down\nactions depending on the target date and triggering view.</p>\n<p>Return <code>null</code> to disable drill-down actions.</p>\n<pre><code class="lang-js"><span class="token operator">&lt;</span>BigCalendar\n  getDrilldownView<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token parameter">targetDate<span class="token punctuation">,</span> currentViewName<span class="token punctuation">,</span> configuredViewNames</span><span class="token punctuation">)</span> <span class="token operator">=></span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>currentViewName <span class="token operator">===</span> <span class="token string">\'month\'</span> <span class="token operator">&amp;&amp;</span> configuredViewNames<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token string">\'week\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token keyword">return</span> <span class="token string">\'week\'</span>\n\n    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">}</span>\n<span class="token operator">/</span><span class="token operator">></span>\n</code></pre>\n',
            },
            length: {
              type: { name: 'number' },
              required: false,
              description:
                'Determines the end date from date prop in the agenda view\ndate prop + length (in number of days) = end date',
              defaultValue: { value: '30', computed: false },
              name: 'length',
              docblock:
                'Determines the end date from date prop in the agenda view\ndate prop + length (in number of days) = end date',
              doclets: {},
              descriptionHtml:
                '<p>Determines the end date from date prop in the agenda view\ndate prop + length (in number of days) = end date</p>\n',
            },
            toolbar: {
              type: { name: 'bool' },
              required: false,
              description: 'Determines whether the toolbar is displayed',
              defaultValue: { value: 'true', computed: false },
              name: 'toolbar',
              docblock: 'Determines whether the toolbar is displayed',
              doclets: {},
              descriptionHtml:
                '<p>Determines whether the toolbar is displayed</p>\n',
            },
            popup: {
              type: { name: 'bool' },
              required: false,
              description:
                'Show truncated events in an overlay when you click the "+_x_ more" link.',
              defaultValue: { value: 'false', computed: false },
              name: 'popup',
              docblock:
                'Show truncated events in an overlay when you click the "+_x_ more" link.',
              doclets: {},
              descriptionHtml:
                '<p>Show truncated events in an overlay when you click the &quot;+_x_ more&quot; link.</p>\n',
            },
            popupOffset: {
              type: {
                name: 'union',
                value: [
                  { name: 'number' },
                  {
                    name: 'shape',
                    value: {
                      x: { name: 'number', required: false },
                      y: { name: 'number', required: false },
                    },
                  },
                ],
              },
              required: false,
              description:
                'Distance in pixels, from the edges of the viewport, the "show more" overlay should be positioned.\n\n```jsx\n<BigCalendar popupOffset={30}/>\n<BigCalendar popupOffset={{x: 30, y: 20}}/>\n```',
              name: 'popupOffset',
              docblock:
                'Distance in pixels, from the edges of the viewport, the "show more" overlay should be positioned.\n\n```jsx\n<BigCalendar popupOffset={30}/>\n<BigCalendar popupOffset={{x: 30, y: 20}}/>\n```',
              doclets: {},
              descriptionHtml:
                '<p>Distance in pixels, from the edges of the viewport, the &quot;show more&quot; overlay should be positioned.</p>\n<pre><code class="lang-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>BigCalendar</span> <span class="token attr-name">popupOffset</span><span class="token script language-javascript"><span class="token punctuation">=</span><span class="token punctuation">{</span><span class="token number">30</span><span class="token punctuation">}</span></span><span class="token punctuation">/></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>BigCalendar</span> <span class="token attr-name">popupOffset</span><span class="token script language-javascript"><span class="token punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>x<span class="token punctuation">:</span> <span class="token number">30</span><span class="token punctuation">,</span> y<span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">}</span><span class="token punctuation">}</span></span><span class="token punctuation">/></span></span>\n</code></pre>\n',
            },
            selectable: {
              type: {
                name: 'enum',
                value: [
                  { value: 'true', computed: false },
                  { value: 'false', computed: false },
                  { value: "'ignoreEvents'", computed: false },
                ],
              },
              required: false,
              description:
                "Allows mouse selection of ranges of dates/times.\n\nThe 'ignoreEvents' option prevents selection code from running when a\ndrag begins over an event. Useful when you want custom event click or drag\nlogic",
              name: 'selectable',
              docblock:
                "Allows mouse selection of ranges of dates/times.\n\nThe 'ignoreEvents' option prevents selection code from running when a\ndrag begins over an event. Useful when you want custom event click or drag\nlogic",
              doclets: {},
              descriptionHtml:
                '<p>Allows mouse selection of ranges of dates/times.</p>\n<p>The &#39;ignoreEvents&#39; option prevents selection code from running when a\ndrag begins over an event. Useful when you want custom event click or drag\nlogic</p>\n',
            },
            longPressThreshold: {
              type: { name: 'number' },
              required: false,
              description:
                'Specifies the number of miliseconds the user must press and hold on the screen for a touch\nto be considered a "long press." Long presses are used for time slot selection on touch\ndevices.',
              defaultValue: { value: '250', computed: false },
              name: 'longPressThreshold',
              docblock:
                'Specifies the number of miliseconds the user must press and hold on the screen for a touch\nto be considered a "long press." Long presses are used for time slot selection on touch\ndevices.\n\n@type {number}\n@default 250',
              doclets: { type: '{number}', default: '250' },
              descriptionHtml:
                '<p>Specifies the number of miliseconds the user must press and hold on the screen for a touch\nto be considered a &quot;long press.&quot; Long presses are used for time slot selection on touch\ndevices.</p>\n',
            },
            step: {
              type: { name: 'number' },
              required: false,
              description:
                'Determines the selectable time increments in week and day views',
              defaultValue: { value: '30', computed: false },
              name: 'step',
              docblock:
                'Determines the selectable time increments in week and day views',
              doclets: {},
              descriptionHtml:
                '<p>Determines the selectable time increments in week and day views</p>\n',
            },
            timeslots: {
              type: { name: 'number' },
              required: false,
              description:
                'The number of slots per "section" in the time grid views. Adjust with `step`\nto change the default of 1 hour long groups, with 30 minute slots.',
              name: 'timeslots',
              docblock:
                'The number of slots per "section" in the time grid views. Adjust with `step`\nto change the default of 1 hour long groups, with 30 minute slots.',
              doclets: {},
              descriptionHtml:
                '<p>The number of slots per &quot;section&quot; in the time grid views. Adjust with <code>step</code>\nto change the default of 1 hour long groups, with 30 minute slots.</p>\n',
            },
            rtl: {
              type: { name: 'bool' },
              required: false,
              description:
                'Switch the calendar to a `right-to-left` read direction.',
              name: 'rtl',
              docblock:
                'Switch the calendar to a `right-to-left` read direction.',
              doclets: {},
              descriptionHtml:
                '<p>Switch the calendar to a <code>right-to-left</code> read direction.</p>\n',
            },
            eventPropGetter: {
              type: { name: 'func' },
              required: false,
              description:
                'Optionally provide a function that returns an object of className or style props\nto be applied to the the event node.\n\n```js\n(\n\tevent: Object,\n\tstart: Date,\n\tend: Date,\n\tisSelected: boolean\n) => { className?: string, style?: Object }\n```',
              name: 'eventPropGetter',
              docblock:
                'Optionally provide a function that returns an object of className or style props\nto be applied to the the event node.\n\n```js\n(\n\tevent: Object,\n\tstart: Date,\n\tend: Date,\n\tisSelected: boolean\n) => { className?: string, style?: Object }\n```',
              doclets: {},
              descriptionHtml:
                '<p>Optionally provide a function that returns an object of className or style props\nto be applied to the the event node.</p>\n<pre><code class="lang-js"><span class="token punctuation">(</span>\n    <span class="token parameter">event<span class="token punctuation">:</span> Object<span class="token punctuation">,</span>\n    start<span class="token punctuation">:</span> Date<span class="token punctuation">,</span>\n    end<span class="token punctuation">:</span> Date<span class="token punctuation">,</span>\n    isSelected<span class="token punctuation">:</span> boolean</span>\n<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> className<span class="token operator">?</span><span class="token punctuation">:</span> string<span class="token punctuation">,</span> style<span class="token operator">?</span><span class="token punctuation">:</span> Object <span class="token punctuation">}</span>\n</code></pre>\n',
            },
            slotPropGetter: {
              type: { name: 'func' },
              required: false,
              description:
                'Optionally provide a function that returns an object of className or style props\nto be applied to the the time-slot node. Caution! Styles that change layout or\nposition may break the calendar in unexpected ways.\n\n```js\n(date: Date, resourceId: (number|string)) => { className?: string, style?: Object }\n```',
              name: 'slotPropGetter',
              docblock:
                'Optionally provide a function that returns an object of className or style props\nto be applied to the the time-slot node. Caution! Styles that change layout or\nposition may break the calendar in unexpected ways.\n\n```js\n(date: Date, resourceId: (number|string)) => { className?: string, style?: Object }\n```',
              doclets: {},
              descriptionHtml:
                '<p>Optionally provide a function that returns an object of className or style props\nto be applied to the the time-slot node. Caution! Styles that change layout or\nposition may break the calendar in unexpected ways.</p>\n<pre><code class="lang-js"><span class="token punctuation">(</span><span class="token parameter">date<span class="token punctuation">:</span> Date<span class="token punctuation">,</span> resourceId<span class="token punctuation">:</span> <span class="token punctuation">(</span>number<span class="token operator">|</span>string<span class="token punctuation">)</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> className<span class="token operator">?</span><span class="token punctuation">:</span> string<span class="token punctuation">,</span> style<span class="token operator">?</span><span class="token punctuation">:</span> Object <span class="token punctuation">}</span>\n</code></pre>\n',
            },
            dayPropGetter: {
              type: { name: 'func' },
              required: false,
              description:
                'Optionally provide a function that returns an object of className or style props\nto be applied to the the day background. Caution! Styles that change layout or\nposition may break the calendar in unexpected ways.\n\n```js\n(date: Date) => { className?: string, style?: Object }\n```',
              name: 'dayPropGetter',
              docblock:
                'Optionally provide a function that returns an object of className or style props\nto be applied to the the day background. Caution! Styles that change layout or\nposition may break the calendar in unexpected ways.\n\n```js\n(date: Date) => { className?: string, style?: Object }\n```',
              doclets: {},
              descriptionHtml:
                '<p>Optionally provide a function that returns an object of className or style props\nto be applied to the the day background. Caution! Styles that change layout or\nposition may break the calendar in unexpected ways.</p>\n<pre><code class="lang-js"><span class="token punctuation">(</span><span class="token parameter">date<span class="token punctuation">:</span> Date</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> className<span class="token operator">?</span><span class="token punctuation">:</span> string<span class="token punctuation">,</span> style<span class="token operator">?</span><span class="token punctuation">:</span> Object <span class="token punctuation">}</span>\n</code></pre>\n',
            },
            showMultiDayTimes: {
              type: { name: 'bool' },
              required: false,
              description:
                'Support to show multi-day events with specific start and end times in the\nmain time grid (rather than in the all day header).\n\n**Note: This may cause calendars with several events to look very busy in\nthe week and day views.**',
              name: 'showMultiDayTimes',
              docblock:
                'Support to show multi-day events with specific start and end times in the\nmain time grid (rather than in the all day header).\n\n**Note: This may cause calendars with several events to look very busy in\nthe week and day views.**',
              doclets: {},
              descriptionHtml:
                '<p>Support to show multi-day events with specific start and end times in the\nmain time grid (rather than in the all day header).</p>\n<p><strong>Note: This may cause calendars with several events to look very busy in\nthe week and day views.</strong></p>\n',
            },
            min: {
              type: { name: 'instanceOf', value: 'Date' },
              required: false,
              description:
                'Constrains the minimum _time_ of the Day and Week views.',
              name: 'min',
              docblock:
                'Constrains the minimum _time_ of the Day and Week views.',
              doclets: {},
              descriptionHtml:
                '<p>Constrains the minimum <em>time</em> of the Day and Week views.</p>\n',
            },
            max: {
              type: { name: 'instanceOf', value: 'Date' },
              required: false,
              description:
                'Constrains the maximum _time_ of the Day and Week views.',
              name: 'max',
              docblock:
                'Constrains the maximum _time_ of the Day and Week views.',
              doclets: {},
              descriptionHtml:
                '<p>Constrains the maximum <em>time</em> of the Day and Week views.</p>\n',
            },
            scrollToTime: {
              type: { name: 'instanceOf', value: 'Date' },
              required: false,
              description:
                'Determines how far down the scroll pane is initially scrolled down.',
              name: 'scrollToTime',
              docblock:
                'Determines how far down the scroll pane is initially scrolled down.',
              doclets: {},
              descriptionHtml:
                '<p>Determines how far down the scroll pane is initially scrolled down.</p>\n',
            },
            culture: {
              type: { name: 'string' },
              required: false,
              description:
                "Specify a specific culture code for the Calendar.\n\n**Note: it's generally better to handle this globally via your i18n library.**",
              name: 'culture',
              docblock:
                "Specify a specific culture code for the Calendar.\n\n**Note: it's generally better to handle this globally via your i18n library.**",
              doclets: {},
              descriptionHtml:
                '<p>Specify a specific culture code for the Calendar.</p>\n<p><strong>Note: it&#39;s generally better to handle this globally via your i18n library.</strong></p>\n',
            },
            formats: {
              type: {
                name: 'shape',
                value: {
                  dateFormat: {
                    type: {
                      name: 'custom',
                      raw: 'dateFormat',
                      description:
                        'Format for the day of the month heading in the Month view.\ne.g. "01", "02", "03", etc',
                      required: false,
                    },
                    description:
                      'Format for the day of the month heading in the Month view.\ne.g. "01", "02", "03", etc',
                    required: false,
                    name: 'dateFormat',
                    docblock:
                      'Format for the day of the month heading in the Month view.\ne.g. "01", "02", "03", etc',
                    doclets: {},
                    descriptionHtml:
                      '<p>Format for the day of the month heading in the Month view.\ne.g. &quot;01&quot;, &quot;02&quot;, &quot;03&quot;, etc</p>\n',
                  },
                  dayFormat: {
                    type: {
                      name: 'custom',
                      raw: 'dateFormat',
                      description:
                        'A day of the week format for Week and Day headings,\ne.g. "Wed 01/04"',
                      required: false,
                    },
                    description:
                      'A day of the week format for Week and Day headings,\ne.g. "Wed 01/04"',
                    required: false,
                    name: 'dayFormat',
                    docblock:
                      'A day of the week format for Week and Day headings,\ne.g. "Wed 01/04"',
                    doclets: {},
                    descriptionHtml:
                      '<p>A day of the week format for Week and Day headings,\ne.g. &quot;Wed 01/04&quot;</p>\n',
                  },
                  weekdayFormat: {
                    type: {
                      name: 'custom',
                      raw: 'dateFormat',
                      description:
                        'Week day name format for the Month week day headings,\ne.g: "Sun", "Mon", "Tue", etc',
                      required: false,
                    },
                    description:
                      'Week day name format for the Month week day headings,\ne.g: "Sun", "Mon", "Tue", etc',
                    required: false,
                    name: 'weekdayFormat',
                    docblock:
                      'Week day name format for the Month week day headings,\ne.g: "Sun", "Mon", "Tue", etc',
                    doclets: {},
                    descriptionHtml:
                      '<p>Week day name format for the Month week day headings,\ne.g: &quot;Sun&quot;, &quot;Mon&quot;, &quot;Tue&quot;, etc</p>\n',
                  },
                  timeGutterFormat: {
                    type: {
                      name: 'custom',
                      raw: 'dateFormat',
                      description:
                        'The timestamp cell formats in Week and Time views, e.g. "4:00 AM"',
                      required: false,
                    },
                    description:
                      'The timestamp cell formats in Week and Time views, e.g. "4:00 AM"',
                    required: false,
                    name: 'timeGutterFormat',
                    docblock:
                      'The timestamp cell formats in Week and Time views, e.g. "4:00 AM"',
                    doclets: {},
                    descriptionHtml:
                      '<p>The timestamp cell formats in Week and Time views, e.g. &quot;4:00 AM&quot;</p>\n',
                  },
                  monthHeaderFormat: {
                    type: {
                      name: 'custom',
                      raw: 'dateFormat',
                      description:
                        'Toolbar header format for the Month view, e.g "2015 April"',
                      required: false,
                    },
                    description:
                      'Toolbar header format for the Month view, e.g "2015 April"',
                    required: false,
                    name: 'monthHeaderFormat',
                    docblock:
                      'Toolbar header format for the Month view, e.g "2015 April"',
                    doclets: {},
                    descriptionHtml:
                      '<p>Toolbar header format for the Month view, e.g &quot;2015 April&quot;</p>\n',
                  },
                  dayRangeHeaderFormat: {
                    type: {
                      name: 'custom',
                      raw: 'dateRangeFormat',
                      description:
                        'Toolbar header format for the Week views, e.g. "Mar 29 - Apr 04"',
                      required: false,
                    },
                    description:
                      'Toolbar header format for the Week views, e.g. "Mar 29 - Apr 04"',
                    required: false,
                    name: 'dayRangeHeaderFormat',
                    docblock:
                      'Toolbar header format for the Week views, e.g. "Mar 29 - Apr 04"',
                    doclets: {},
                    descriptionHtml:
                      '<p>Toolbar header format for the Week views, e.g. &quot;Mar 29 - Apr 04&quot;</p>\n',
                  },
                  dayHeaderFormat: {
                    type: {
                      name: 'custom',
                      raw: 'dateFormat',
                      description:
                        'Toolbar header format for the Day view, e.g. "Wednesday Apr 01"',
                      required: false,
                    },
                    description:
                      'Toolbar header format for the Day view, e.g. "Wednesday Apr 01"',
                    required: false,
                    name: 'dayHeaderFormat',
                    docblock:
                      'Toolbar header format for the Day view, e.g. "Wednesday Apr 01"',
                    doclets: {},
                    descriptionHtml:
                      '<p>Toolbar header format for the Day view, e.g. &quot;Wednesday Apr 01&quot;</p>\n',
                  },
                  agendaHeaderFormat: {
                    type: {
                      name: 'custom',
                      raw: 'dateRangeFormat',
                      description:
                        'Toolbar header format for the Agenda view, e.g. "4/1/2015 — 5/1/2015"',
                      required: false,
                    },
                    description:
                      'Toolbar header format for the Agenda view, e.g. "4/1/2015 — 5/1/2015"',
                    required: false,
                    name: 'agendaHeaderFormat',
                    docblock:
                      'Toolbar header format for the Agenda view, e.g. "4/1/2015 — 5/1/2015"',
                    doclets: {},
                    descriptionHtml:
                      '<p>Toolbar header format for the Agenda view, e.g. &quot;4/1/2015 — 5/1/2015&quot;</p>\n',
                  },
                  selectRangeFormat: {
                    type: {
                      name: 'custom',
                      raw: 'dateRangeFormat',
                      description:
                        'A time range format for selecting time slots, e.g "8:00am — 2:00pm"',
                      required: false,
                    },
                    description:
                      'A time range format for selecting time slots, e.g "8:00am — 2:00pm"',
                    required: false,
                    name: 'selectRangeFormat',
                    docblock:
                      'A time range format for selecting time slots, e.g "8:00am — 2:00pm"',
                    doclets: {},
                    descriptionHtml:
                      '<p>A time range format for selecting time slots, e.g &quot;8:00am — 2:00pm&quot;</p>\n',
                  },
                  agendaDateFormat: {
                    type: {
                      name: 'custom',
                      raw: 'dateFormat',
                      required: false,
                    },
                    description: '',
                    required: false,
                    name: 'agendaDateFormat',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  agendaTimeFormat: {
                    type: {
                      name: 'custom',
                      raw: 'dateFormat',
                      required: false,
                    },
                    description: '',
                    required: false,
                    name: 'agendaTimeFormat',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  agendaTimeRangeFormat: {
                    type: {
                      name: 'custom',
                      raw: 'dateRangeFormat',
                      required: false,
                    },
                    description: '',
                    required: false,
                    name: 'agendaTimeRangeFormat',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  eventTimeRangeFormat: {
                    type: {
                      name: 'custom',
                      raw: 'dateRangeFormat',
                      description: 'Time range displayed on events.',
                      required: false,
                    },
                    description: 'Time range displayed on events.',
                    required: false,
                    name: 'eventTimeRangeFormat',
                    docblock: 'Time range displayed on events.',
                    doclets: {},
                    descriptionHtml: '<p>Time range displayed on events.</p>\n',
                  },
                  eventTimeRangeStartFormat: {
                    type: {
                      name: 'custom',
                      raw: 'dateFormat',
                      description:
                        'An optional event time range for events that continue onto another day',
                      required: false,
                    },
                    description:
                      'An optional event time range for events that continue onto another day',
                    required: false,
                    name: 'eventTimeRangeStartFormat',
                    docblock:
                      'An optional event time range for events that continue onto another day',
                    doclets: {},
                    descriptionHtml:
                      '<p>An optional event time range for events that continue onto another day</p>\n',
                  },
                  eventTimeRangeEndFormat: {
                    type: {
                      name: 'custom',
                      raw: 'dateFormat',
                      description:
                        'An optional event time range for events that continue from another day',
                      required: false,
                    },
                    description:
                      'An optional event time range for events that continue from another day',
                    required: false,
                    name: 'eventTimeRangeEndFormat',
                    docblock:
                      'An optional event time range for events that continue from another day',
                    doclets: {},
                    descriptionHtml:
                      '<p>An optional event time range for events that continue from another day</p>\n',
                  },
                },
              },
              required: false,
              description:
                "Localizer specific formats, tell the Calendar how to format and display dates.\n\n`format` types are dependent on the configured localizer; both Moment and Globalize\naccept strings of tokens according to their own specification, such as: `'DD mm yyyy'`.\n\n```jsx\nlet formats = {\n  dateFormat: 'dd',\n\n  dayFormat: (date, , localizer) =>\n    localizer.format(date, 'DDD', culture),\n\n  dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>\n    localizer.format(start, { date: 'short' }, culture) + ' — ' +\n    localizer.format(end, { date: 'short' }, culture)\n}\n\n<Calendar formats={formats} />\n```\n\nAll localizers accept a function of\nthe form `(date: Date, culture: ?string, localizer: Localizer) -> string`",
              name: 'formats',
              docblock:
                "Localizer specific formats, tell the Calendar how to format and display dates.\n\n`format` types are dependent on the configured localizer; both Moment and Globalize\naccept strings of tokens according to their own specification, such as: `'DD mm yyyy'`.\n\n```jsx\nlet formats = {\n  dateFormat: 'dd',\n\n  dayFormat: (date, , localizer) =>\n    localizer.format(date, 'DDD', culture),\n\n  dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>\n    localizer.format(start, { date: 'short' }, culture) + ' — ' +\n    localizer.format(end, { date: 'short' }, culture)\n}\n\n<Calendar formats={formats} />\n```\n\nAll localizers accept a function of\nthe form `(date: Date, culture: ?string, localizer: Localizer) -> string`",
              doclets: {},
              descriptionHtml:
                '<p>Localizer specific formats, tell the Calendar how to format and display dates.</p>\n<p><code>format</code> types are dependent on the configured localizer; both Moment and Globalize\naccept strings of tokens according to their own specification, such as: <code>&#39;DD mm yyyy&#39;</code>.</p>\n<pre><code class="lang-jsx"><span class="token keyword">let</span> formats <span class="token operator">=</span> <span class="token punctuation">{</span>\n  dateFormat<span class="token punctuation">:</span> <span class="token string">\'dd\'</span><span class="token punctuation">,</span>\n\n  <span class="token function-variable function">dayFormat</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token parameter">date<span class="token punctuation">,</span> <span class="token punctuation">,</span> localizer</span><span class="token punctuation">)</span> <span class="token operator">=></span>\n    localizer<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>date<span class="token punctuation">,</span> <span class="token string">\'DDD\'</span><span class="token punctuation">,</span> culture<span class="token punctuation">)</span><span class="token punctuation">,</span>\n\n  <span class="token function-variable function">dayRangeHeaderFormat</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> start<span class="token punctuation">,</span> end <span class="token punctuation">}</span><span class="token punctuation">,</span> culture<span class="token punctuation">,</span> localizer</span><span class="token punctuation">)</span> <span class="token operator">=></span>\n    localizer<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>start<span class="token punctuation">,</span> <span class="token punctuation">{</span> date<span class="token punctuation">:</span> <span class="token string">\'short\'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> culture<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">\' — \'</span> <span class="token operator">+</span>\n    localizer<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>end<span class="token punctuation">,</span> <span class="token punctuation">{</span> date<span class="token punctuation">:</span> <span class="token string">\'short\'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> culture<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Calendar</span> <span class="token attr-name">formats</span><span class="token script language-javascript"><span class="token punctuation">=</span><span class="token punctuation">{</span>formats<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n</code></pre>\n<p>All localizers accept a function of\nthe form <code>(date: Date, culture: ?string, localizer: Localizer) -&gt; string</code></p>\n',
            },
            components: {
              type: {
                name: 'shape',
                value: {
                  event: {
                    type: {
                      name: 'custom',
                      raw: 'elementType',
                      required: false,
                    },
                    description: '',
                    required: false,
                    name: 'event',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  eventWrapper: {
                    type: {
                      name: 'custom',
                      raw: 'elementType',
                      required: false,
                    },
                    description: '',
                    required: false,
                    name: 'eventWrapper',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  eventContainerWrapper: {
                    type: {
                      name: 'custom',
                      raw: 'elementType',
                      required: false,
                    },
                    description: '',
                    required: false,
                    name: 'eventContainerWrapper',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  dayWrapper: {
                    type: {
                      name: 'custom',
                      raw: 'elementType',
                      required: false,
                    },
                    description: '',
                    required: false,
                    name: 'dayWrapper',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  dateCellWrapper: {
                    type: {
                      name: 'custom',
                      raw: 'elementType',
                      required: false,
                    },
                    description: '',
                    required: false,
                    name: 'dateCellWrapper',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  timeSlotWrapper: {
                    type: {
                      name: 'custom',
                      raw: 'elementType',
                      required: false,
                    },
                    description: '',
                    required: false,
                    name: 'timeSlotWrapper',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  timeGutterHeader: {
                    type: {
                      name: 'custom',
                      raw: 'elementType',
                      required: false,
                    },
                    description: '',
                    required: false,
                    name: 'timeGutterHeader',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  resourceHeader: {
                    type: {
                      name: 'custom',
                      raw: 'elementType',
                      required: false,
                    },
                    description: '',
                    required: false,
                    name: 'resourceHeader',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  toolbar: {
                    type: {
                      name: 'custom',
                      raw: 'elementType',
                      required: false,
                    },
                    description: '',
                    required: false,
                    name: 'toolbar',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  agenda: {
                    type: {
                      name: 'shape',
                      value: {
                        date: {
                          type: {
                            name: 'custom',
                            raw: 'elementType',
                            required: false,
                          },
                          description: '',
                          required: false,
                          name: 'date',
                          docblock: '',
                          doclets: {},
                          descriptionHtml: '',
                        },
                        time: {
                          type: {
                            name: 'custom',
                            raw: 'elementType',
                            required: false,
                          },
                          description: '',
                          required: false,
                          name: 'time',
                          docblock: '',
                          doclets: {},
                          descriptionHtml: '',
                        },
                        event: {
                          type: {
                            name: 'custom',
                            raw: 'elementType',
                            required: false,
                          },
                          description: '',
                          required: false,
                          name: 'event',
                          docblock: '',
                          doclets: {},
                          descriptionHtml: '',
                        },
                      },
                      required: false,
                    },
                    description: '',
                    required: false,
                    name: 'agenda',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  day: {
                    type: {
                      name: 'shape',
                      value: {
                        header: {
                          type: {
                            name: 'custom',
                            raw: 'elementType',
                            required: false,
                          },
                          description: '',
                          required: false,
                          name: 'header',
                          docblock: '',
                          doclets: {},
                          descriptionHtml: '',
                        },
                        event: {
                          type: {
                            name: 'custom',
                            raw: 'elementType',
                            required: false,
                          },
                          description: '',
                          required: false,
                          name: 'event',
                          docblock: '',
                          doclets: {},
                          descriptionHtml: '',
                        },
                      },
                      required: false,
                    },
                    description: '',
                    required: false,
                    name: 'day',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  week: {
                    type: {
                      name: 'shape',
                      value: {
                        header: {
                          type: {
                            name: 'custom',
                            raw: 'elementType',
                            required: false,
                          },
                          description: '',
                          required: false,
                          name: 'header',
                          docblock: '',
                          doclets: {},
                          descriptionHtml: '',
                        },
                        event: {
                          type: {
                            name: 'custom',
                            raw: 'elementType',
                            required: false,
                          },
                          description: '',
                          required: false,
                          name: 'event',
                          docblock: '',
                          doclets: {},
                          descriptionHtml: '',
                        },
                      },
                      required: false,
                    },
                    description: '',
                    required: false,
                    name: 'week',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  month: {
                    type: {
                      name: 'shape',
                      value: {
                        header: {
                          type: {
                            name: 'custom',
                            raw: 'elementType',
                            required: false,
                          },
                          description: '',
                          required: false,
                          name: 'header',
                          docblock: '',
                          doclets: {},
                          descriptionHtml: '',
                        },
                        dateHeader: {
                          type: {
                            name: 'custom',
                            raw: 'elementType',
                            required: false,
                          },
                          description: '',
                          required: false,
                          name: 'dateHeader',
                          docblock: '',
                          doclets: {},
                          descriptionHtml: '',
                        },
                        event: {
                          type: {
                            name: 'custom',
                            raw: 'elementType',
                            required: false,
                          },
                          description: '',
                          required: false,
                          name: 'event',
                          docblock: '',
                          doclets: {},
                          descriptionHtml: '',
                        },
                      },
                      required: false,
                    },
                    description: '',
                    required: false,
                    name: 'month',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                },
              },
              required: false,
              description:
                'Customize how different sections of the calendar render by providing custom Components.\nIn particular the `Event` component can be specified for the entire calendar, or you can\nprovide an individual component for each view type.\n\n```jsx\nlet components = {\n  event: MyEvent, // used by each view (Month, Day, Week)\n  eventWrapper: MyEventWrapper,\n  eventContainerWrapper: MyEventContainerWrapper,\n  dayWrapper: MyDayWrapper,\n  dateCellWrapper: MyDateCellWrapper,\n  timeSlotWrapper: MyTimeSlotWrapper,\n  timeGutterHeader: MyTimeGutterWrapper,\n  toolbar: MyToolbar,\n  agenda: {\n  \t event: MyAgendaEvent // with the agenda view use a different component to render events\n    time: MyAgendaTime,\n    date: MyAgendaDate,\n  },\n  day: {\n    header: MyDayHeader,\n    event: MyDayEvent,\n  },\n  week: {\n    header: MyWeekHeader,\n    event: MyWeekEvent,\n  },\n  month: {\n    header: MyMonthHeader,\n    dateHeader: MyMonthDateHeader,\n    event: MyMonthEvent,\n  }\n}\n<Calendar components={components} />\n```',
              name: 'components',
              docblock:
                'Customize how different sections of the calendar render by providing custom Components.\nIn particular the `Event` component can be specified for the entire calendar, or you can\nprovide an individual component for each view type.\n\n```jsx\nlet components = {\n  event: MyEvent, // used by each view (Month, Day, Week)\n  eventWrapper: MyEventWrapper,\n  eventContainerWrapper: MyEventContainerWrapper,\n  dayWrapper: MyDayWrapper,\n  dateCellWrapper: MyDateCellWrapper,\n  timeSlotWrapper: MyTimeSlotWrapper,\n  timeGutterHeader: MyTimeGutterWrapper,\n  toolbar: MyToolbar,\n  agenda: {\n  \t event: MyAgendaEvent // with the agenda view use a different component to render events\n    time: MyAgendaTime,\n    date: MyAgendaDate,\n  },\n  day: {\n    header: MyDayHeader,\n    event: MyDayEvent,\n  },\n  week: {\n    header: MyWeekHeader,\n    event: MyWeekEvent,\n  },\n  month: {\n    header: MyMonthHeader,\n    dateHeader: MyMonthDateHeader,\n    event: MyMonthEvent,\n  }\n}\n<Calendar components={components} />\n```',
              doclets: {},
              descriptionHtml:
                '<p>Customize how different sections of the calendar render by providing custom Components.\nIn particular the <code>Event</code> component can be specified for the entire calendar, or you can\nprovide an individual component for each view type.</p>\n<pre><code class="lang-jsx"><span class="token keyword">let</span> components <span class="token operator">=</span> <span class="token punctuation">{</span>\n  event<span class="token punctuation">:</span> MyEvent<span class="token punctuation">,</span> <span class="token comment">// used by each view (Month, Day, Week)</span>\n  eventWrapper<span class="token punctuation">:</span> MyEventWrapper<span class="token punctuation">,</span>\n  eventContainerWrapper<span class="token punctuation">:</span> MyEventContainerWrapper<span class="token punctuation">,</span>\n  dayWrapper<span class="token punctuation">:</span> MyDayWrapper<span class="token punctuation">,</span>\n  dateCellWrapper<span class="token punctuation">:</span> MyDateCellWrapper<span class="token punctuation">,</span>\n  timeSlotWrapper<span class="token punctuation">:</span> MyTimeSlotWrapper<span class="token punctuation">,</span>\n  timeGutterHeader<span class="token punctuation">:</span> MyTimeGutterWrapper<span class="token punctuation">,</span>\n  toolbar<span class="token punctuation">:</span> MyToolbar<span class="token punctuation">,</span>\n  agenda<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n       event<span class="token punctuation">:</span> MyAgendaEvent <span class="token comment">// with the agenda view use a different component to render events</span>\n    time<span class="token punctuation">:</span> MyAgendaTime<span class="token punctuation">,</span>\n    date<span class="token punctuation">:</span> MyAgendaDate<span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  day<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    header<span class="token punctuation">:</span> MyDayHeader<span class="token punctuation">,</span>\n    event<span class="token punctuation">:</span> MyDayEvent<span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  week<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    header<span class="token punctuation">:</span> MyWeekHeader<span class="token punctuation">,</span>\n    event<span class="token punctuation">:</span> MyWeekEvent<span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  month<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    header<span class="token punctuation">:</span> MyMonthHeader<span class="token punctuation">,</span>\n    dateHeader<span class="token punctuation">:</span> MyMonthDateHeader<span class="token punctuation">,</span>\n    event<span class="token punctuation">:</span> MyMonthEvent<span class="token punctuation">,</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Calendar</span> <span class="token attr-name">components</span><span class="token script language-javascript"><span class="token punctuation">=</span><span class="token punctuation">{</span>components<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n</code></pre>\n',
            },
            messages: {
              type: {
                name: 'shape',
                value: {
                  allDay: {
                    type: { name: 'node', required: false },
                    description: '',
                    required: false,
                    name: 'allDay',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  previous: {
                    type: { name: 'node', required: false },
                    description: '',
                    required: false,
                    name: 'previous',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  next: {
                    type: { name: 'node', required: false },
                    description: '',
                    required: false,
                    name: 'next',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  today: {
                    type: { name: 'node', required: false },
                    description: '',
                    required: false,
                    name: 'today',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  month: {
                    type: { name: 'node', required: false },
                    description: '',
                    required: false,
                    name: 'month',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  week: {
                    type: { name: 'node', required: false },
                    description: '',
                    required: false,
                    name: 'week',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  day: {
                    type: { name: 'node', required: false },
                    description: '',
                    required: false,
                    name: 'day',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  agenda: {
                    type: { name: 'node', required: false },
                    description: '',
                    required: false,
                    name: 'agenda',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  date: {
                    type: { name: 'node', required: false },
                    description: '',
                    required: false,
                    name: 'date',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  time: {
                    type: { name: 'node', required: false },
                    description: '',
                    required: false,
                    name: 'time',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  event: {
                    type: { name: 'node', required: false },
                    description: '',
                    required: false,
                    name: 'event',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  noEventsInRange: {
                    type: { name: 'node', required: false },
                    description: '',
                    required: false,
                    name: 'noEventsInRange',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                  showMore: {
                    type: { name: 'func', required: false },
                    description: '',
                    required: false,
                    name: 'showMore',
                    docblock: '',
                    doclets: {},
                    descriptionHtml: '',
                  },
                },
              },
              required: false,
              description:
                'String messages used throughout the component, override to provide localizations',
              name: 'messages',
              docblock:
                'String messages used throughout the component, override to provide localizations',
              doclets: {},
              descriptionHtml:
                '<p>String messages used throughout the component, override to provide localizations</p>\n',
            },
          },
          docblock:
            'react-big-calendar is a full featured Calendar component for managing events and dates. It uses\nmodern `flexbox` for layout, making it super responsive and performant. Leaving most of the layout heavy lifting\nto the browser. __note:__ The default styles use `height: 100%` which means your container must set an explicit\nheight (feel free to adjust the styles to suit your specific needs).\n\nBig Calendar is unopiniated about editing and moving events, preferring to let you implement it in a way that makes\nthe most sense to your app. It also tries not to be prescriptive about your event data structures, just tell it\nhow to find the start and end datetimes and you can pass it whatever you want.\n\nOne thing to note is that, `react-big-calendar` treats event start/end dates as an _exclusive_ range.\nwhich means that the event spans up to, but not including, the end date. In the case\nof displaying events on whole days, end dates are rounded _up_ to the next day. So an\nevent ending on `Apr 8th 12:00:00 am` will not appear on the 8th, whereas one ending\non `Apr 8th 12:01:00 am` will. If you want _inclusive_ ranges consider providing a\nfunction `endAccessor` that returns the end date + 1 day for those events that end at midnight.',
          doclets: {},
          descriptionHtml:
            '<p>react-big-calendar is a full featured Calendar component for managing events and dates. It uses\nmodern <code>flexbox</code> for layout, making it super responsive and performant. Leaving most of the layout heavy lifting\nto the browser. <strong>note:</strong> The default styles use <code>height: 100%</code> which means your container must set an explicit\nheight (feel free to adjust the styles to suit your specific needs).</p>\n<p>Big Calendar is unopiniated about editing and moving events, preferring to let you implement it in a way that makes\nthe most sense to your app. It also tries not to be prescriptive about your event data structures, just tell it\nhow to find the start and end datetimes and you can pass it whatever you want.</p>\n<p>One thing to note is that, <code>react-big-calendar</code> treats event start/end dates as an <em>exclusive</em> range.\nwhich means that the event spans up to, but not including, the end date. In the case\nof displaying events on whole days, end dates are rounded _up_ to the next day. So an\nevent ending on <code>Apr 8th 12:00:00 am</code> will not appear on the 8th, whereas one ending\non <code>Apr 8th 12:01:00 am</code> will. If you want <em>inclusive</em> ranges consider providing a\nfunction <code>endAccessor</code> that returns the end date + 1 day for those events that end at midnight.</p>\n',
        },
      }

      /***/
    },

    /***/ 268: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var React = __webpack_require__(1)

      module.exports = function() {
        return React.createElement(
          'div',
          null,
          React.createElement(
            'h1',
            {
              id: '-a-id-intro-href-intro-getting-started-a-',
            },
            React.createElement(
              'a',
              {
                id: 'intro',
                href: '#intro',
              },
              'Getting Started'
            )
          ),
          React.createElement(
            'p',
            null,
            'You can install ',
            React.createElement('code', null, 'react-big-calendar'),
            ' via ',
            React.createElement(
              'a',
              {
                href: 'https://yarnpkg.com/en/',
              },
              'yarn'
            ),
            ' or ',
            React.createElement(
              'a',
              {
                href: 'https://www.npmjs.com/',
              },
              'npm'
            ),
            ':'
          ),
          React.createElement(
            'p',
            null,
            React.createElement('em', null, 'yarn:'),
            ' ',
            React.createElement('code', null, 'yarn add react-big-calendar')
          ),
          React.createElement(
            'p',
            null,
            React.createElement('em', null, 'npm:'),
            ' ',
            React.createElement(
              'code',
              null,
              'npm install --save react-big-calendar'
            )
          ),
          React.createElement(
            'p',
            null,
            'Styles can be found at: ',
            React.createElement(
              'code',
              null,
              'react-big-calendar/lib/css/react-big-calendar.css'
            ),
            ", and should be included on the page with the calendar component. Also make sure that your calendar's container element has a height, or the calendar won't be visible (see why below)."
          ),
          React.createElement(
            'p',
            null,
            'Date internationalization and localization is ',
            React.createElement('strong', null, 'hard'),
            ' and ',
            React.createElement('code', null, 'react-big-calendar'),
            ' doesn\'t even attempt to solve that problem. Instead you can use one of the many excellent solutions already out there, via adapters called "localizers". Big Calendar comes with two localizers for use with ',
            React.createElement(
              'a',
              {
                href: 'https://github.com/jquery/globalize',
              },
              'Globalize.js'
            ),
            ' or ',
            React.createElement(
              'a',
              {
                href: 'http://momentjs.com/',
              },
              'Moment.js'
            ),
            '.'
          ),
          React.createElement(
            'p',
            null,
            "Choose the localizer that best suits your needs, or write your own. Whatever you do, you'll need to set it up before you can use the calendar (you only need to set it up once)."
          ),
          React.createElement(
            'pre',
            null,
            React.createElement('code', {
              className: 'jsx',
              dangerouslySetInnerHTML: {
                __html:
                  '<span class="token keyword">import</span> BigCalendar <span class="token keyword">from</span> <span class="token string">\'react-big-calendar\'</span>\n<span class="token keyword">import</span> moment <span class="token keyword">from</span> <span class="token string">\'moment\'</span>\n\n<span class="token comment">// Setup the localizer by providing the moment (or globalize) Object</span>\n<span class="token comment">// to the correct localizer.</span>\n<span class="token keyword">const</span> localizer <span class="token operator">=</span> BigCalendar<span class="token punctuation">.</span><span class="token function">momentLocalizer</span><span class="token punctuation">(</span>moment<span class="token punctuation">)</span> <span class="token comment">// or globalizeLocalizer</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">MyCalendar</span> <span class="token operator">=</span> <span class="token parameter">props</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>BigCalendar</span>\n      <span class="token attr-name">localizer</span><span class="token script language-javascript"><span class="token punctuation">=</span><span class="token punctuation">{</span>localizer<span class="token punctuation">}</span></span>\n      <span class="token attr-name">events</span><span class="token script language-javascript"><span class="token punctuation">=</span><span class="token punctuation">{</span>myEventsList<span class="token punctuation">}</span></span>\n      <span class="token attr-name">startAccessor</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>start<span class="token punctuation">"</span></span>\n      <span class="token attr-name">endAccessor</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>end<span class="token punctuation">"</span></span>\n    <span class="token punctuation">/></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token punctuation">)</span>',
              },
            })
          ),
          React.createElement(
            'p',
            null,
            "Once you've configured a localizer, the Calendar is ready to accept ",
            React.createElement('code', null, 'dateFormat'),
            ' props. These props determine how dates will be displayed throughout the component and are specific to the localizer of your choice. For instance if you are using the Moment localizer, then any ',
            React.createElement(
              'a',
              {
                href: 'http://momentjs.com/docs/#/displaying/format/',
              },
              'Moment format pattern'
            ),
            ' is valid!'
          )
        )
      }

      module.exports.displayName = 'Intro'

      /***/
    },

    /***/ 276: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = _default
      exports.formats = void 0

      var _dates = _interopRequireDefault(__webpack_require__(8))

      var _localizer = __webpack_require__(67)

      var dateRangeFormat = function dateRangeFormat(_ref, culture, local) {
        var start = _ref.start,
          end = _ref.end
        return (
          local.format(start, 'd', culture) +
          ' — ' +
          local.format(end, 'd', culture)
        )
      }

      var timeRangeFormat = function timeRangeFormat(_ref2, culture, local) {
        var start = _ref2.start,
          end = _ref2.end
        return (
          local.format(start, 't', culture) +
          ' — ' +
          local.format(end, 't', culture)
        )
      }

      var timeRangeStartFormat = function timeRangeStartFormat(
        _ref3,
        culture,
        local
      ) {
        var start = _ref3.start
        return local.format(start, 't', culture) + ' — '
      }

      var timeRangeEndFormat = function timeRangeEndFormat(
        _ref4,
        culture,
        local
      ) {
        var end = _ref4.end
        return ' — ' + local.format(end, 't', culture)
      }

      var weekRangeFormat = function weekRangeFormat(_ref5, culture, local) {
        var start = _ref5.start,
          end = _ref5.end
        return (
          local.format(start, 'MMM dd', culture) +
          ' - ' +
          local.format(
            end,
            _dates.default.eq(start, end, 'month') ? 'dd' : 'MMM dd',
            culture
          )
        )
      }

      var formats = {
        dateFormat: 'dd',
        dayFormat: 'ddd dd/MM',
        weekdayFormat: 'ddd',
        selectRangeFormat: timeRangeFormat,
        eventTimeRangeFormat: timeRangeFormat,
        eventTimeRangeStartFormat: timeRangeStartFormat,
        eventTimeRangeEndFormat: timeRangeEndFormat,
        timeGutterFormat: 't',
        monthHeaderFormat: 'Y',
        dayHeaderFormat: 'dddd MMM dd',
        dayRangeHeaderFormat: weekRangeFormat,
        agendaHeaderFormat: dateRangeFormat,
        agendaDateFormat: 'ddd MMM dd',
        agendaTimeFormat: 't',
        agendaTimeRangeFormat: timeRangeFormat,
      }
      exports.formats = formats

      function _default(globalize) {
        function getCulture(culture) {
          return culture
            ? globalize.findClosestCulture(culture)
            : globalize.culture()
        }

        function firstOfWeek(culture) {
          culture = getCulture(culture)
          return (culture && culture.calendar.firstDay) || 0
        }

        return new _localizer.DateLocalizer({
          firstOfWeek: firstOfWeek,
          formats: formats,
          format: function format(value, _format, culture) {
            return globalize.format(value, _format, culture)
          },
        })
      }

      /***/
    },

    /***/ 291: /***/ function(module, exports, __webpack_require__) {
      var content = __webpack_require__(292)

      if (typeof content === 'string') content = [[module.i, content, '']]

      var transform
      var insertInto

      var options = { hmr: true }

      options.transform = transform
      options.insertInto = undefined

      var update = __webpack_require__(28)(content, options)

      if (content.locals) module.exports = content.locals

      if (false) {
      }

      /***/
    },

    /***/ 292: /***/ function(module, exports, __webpack_require__) {
      exports = module.exports = __webpack_require__(27)(true)
      // imports

      // module
      exports.push([
        module.i,
        ".rbc-btn {\n  color: inherit;\n  font: inherit;\n  margin: 0;\n}\nbutton.rbc-btn {\n  overflow: visible;\n  text-transform: none;\n  -webkit-appearance: button;\n  cursor: pointer;\n}\nbutton[disabled].rbc-btn {\n  cursor: not-allowed;\n}\nbutton.rbc-input::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n.rbc-calendar {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  height: 100%;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -ms-flex-align: stretch;\n      align-items: stretch;\n}\n.rbc-calendar *,\n.rbc-calendar *:before,\n.rbc-calendar *:after {\n  -webkit-box-sizing: inherit;\n          box-sizing: inherit;\n}\n.rbc-abs-full,\n.rbc-row-bg {\n  overflow: hidden;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n.rbc-ellipsis,\n.rbc-event-label,\n.rbc-row-segment .rbc-event-content,\n.rbc-show-more {\n  display: block;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.rbc-rtl {\n  direction: rtl;\n}\n.rbc-off-range {\n  color: #999999;\n}\n.rbc-off-range-bg {\n  background: #e5e5e5;\n}\n.rbc-header {\n  overflow: hidden;\n  -ms-flex: 1 0;\n      flex: 1 0;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  padding: 0 3px;\n  text-align: center;\n  vertical-align: middle;\n  font-weight: bold;\n  font-size: 90%;\n  min-height: 0;\n  border-bottom: 1px solid #DDD;\n}\n.rbc-header + .rbc-header {\n  border-left: 1px solid #DDD;\n}\n.rbc-rtl .rbc-header + .rbc-header {\n  border-left-width: 0;\n  border-right: 1px solid #DDD;\n}\n.rbc-header > a,\n.rbc-header > a:active,\n.rbc-header > a:visited {\n  color: inherit;\n  text-decoration: none;\n}\n.rbc-row-content {\n  position: relative;\n  -moz-user-select: none;\n   -ms-user-select: none;\n       user-select: none;\n  -webkit-user-select: none;\n  z-index: 4;\n}\n.rbc-today {\n  background-color: #eaf6ff;\n}\n.rbc-toolbar {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -ms-flex-pack: center;\n      justify-content: center;\n  -ms-flex-align: center;\n      align-items: center;\n  margin-bottom: 10px;\n  font-size: 16px;\n}\n.rbc-toolbar .rbc-toolbar-label {\n  -ms-flex-positive: 1;\n      flex-grow: 1;\n  padding: 0 10px;\n  text-align: center;\n}\n.rbc-toolbar button {\n  color: #373a3c;\n  display: inline-block;\n  margin: 0;\n  text-align: center;\n  vertical-align: middle;\n  background: none;\n  background-image: none;\n  border: 1px solid #ccc;\n  padding: .375rem 1rem;\n  border-radius: 4px;\n  line-height: normal;\n  white-space: nowrap;\n}\n.rbc-toolbar button:active,\n.rbc-toolbar button.rbc-active {\n  background-image: none;\n  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n          box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n  background-color: #e6e6e6;\n  border-color: #adadad;\n}\n.rbc-toolbar button:active:hover,\n.rbc-toolbar button.rbc-active:hover,\n.rbc-toolbar button:active:focus,\n.rbc-toolbar button.rbc-active:focus {\n  color: #373a3c;\n  background-color: #d4d4d4;\n  border-color: #8c8c8c;\n}\n.rbc-toolbar button:focus {\n  color: #373a3c;\n  background-color: #e6e6e6;\n  border-color: #adadad;\n}\n.rbc-toolbar button:hover {\n  color: #373a3c;\n  background-color: #e6e6e6;\n  border-color: #adadad;\n}\n.rbc-btn-group {\n  display: inline-block;\n  white-space: nowrap;\n}\n.rbc-btn-group > button:first-child:not(:last-child) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.rbc-btn-group > button:last-child:not(:first-child) {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.rbc-rtl .rbc-btn-group > button:first-child:not(:last-child) {\n  border-radius: 4px;\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.rbc-rtl .rbc-btn-group > button:last-child:not(:first-child) {\n  border-radius: 4px;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.rbc-btn-group > button:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n.rbc-btn-group button + button {\n  margin-left: -1px;\n}\n.rbc-rtl .rbc-btn-group button + button {\n  margin-left: 0;\n  margin-right: -1px;\n}\n.rbc-btn-group + .rbc-btn-group,\n.rbc-btn-group + button {\n  margin-left: 10px;\n}\n.rbc-event {\n  padding: 2px 5px;\n  background-color: #3174ad;\n  border-radius: 5px;\n  color: #fff;\n  cursor: pointer;\n}\n.rbc-slot-selecting .rbc-event {\n  cursor: inherit;\n  pointer-events: none;\n}\n.rbc-event.rbc-selected {\n  background-color: #265985;\n}\n.rbc-event:focus {\n  outline: 5px auto #3b99fc;\n}\n.rbc-event-label {\n  font-size: 80%;\n}\n.rbc-event-overlaps {\n  -webkit-box-shadow: -1px 1px 5px 0px rgba(51, 51, 51, 0.5);\n          box-shadow: -1px 1px 5px 0px rgba(51, 51, 51, 0.5);\n}\n.rbc-event-continues-prior {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.rbc-event-continues-after {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.rbc-event-continues-earlier {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n.rbc-event-continues-later {\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.rbc-row {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n      flex-direction: row;\n}\n.rbc-row-segment {\n  padding: 0 1px 1px 1px;\n}\n.rbc-selected-cell {\n  background-color: rgba(0, 0, 0, 0.1);\n}\n.rbc-show-more {\n  background-color: rgba(255, 255, 255, 0.3);\n  z-index: 4;\n  font-weight: bold;\n  font-size: 85%;\n  height: auto;\n  line-height: normal;\n}\n.rbc-month-view {\n  position: relative;\n  border: 1px solid #DDD;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -ms-flex: 1 0;\n      flex: 1 0;\n  width: 100%;\n  -moz-user-select: none;\n   -ms-user-select: none;\n       user-select: none;\n  -webkit-user-select: none;\n  height: 100%;\n}\n.rbc-month-header {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n      flex-direction: row;\n}\n.rbc-month-row {\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -ms-flex: 1 0;\n      flex: 1 0;\n  -ms-flex-preferred-size: 0px;\n      flex-basis: 0px;\n  overflow: hidden;\n  height: 100%;\n}\n.rbc-month-row + .rbc-month-row {\n  border-top: 1px solid #DDD;\n}\n.rbc-date-cell {\n  -ms-flex: 1 1;\n      flex: 1 1;\n  min-width: 0;\n  padding-right: 5px;\n  text-align: right;\n}\n.rbc-date-cell.rbc-now {\n  font-weight: bold;\n}\n.rbc-date-cell > a,\n.rbc-date-cell > a:active,\n.rbc-date-cell > a:visited {\n  color: inherit;\n  text-decoration: none;\n}\n.rbc-row-bg {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n      flex-direction: row;\n  -ms-flex: 1 0;\n      flex: 1 0;\n  overflow: hidden;\n}\n.rbc-day-bg {\n  -ms-flex: 1 0;\n      flex: 1 0;\n}\n.rbc-day-bg + .rbc-day-bg {\n  border-left: 1px solid #DDD;\n}\n.rbc-rtl .rbc-day-bg + .rbc-day-bg {\n  border-left-width: 0;\n  border-right: 1px solid #DDD;\n}\n.rbc-overlay {\n  position: absolute;\n  z-index: 5;\n  border: 1px solid #e5e5e5;\n  background-color: #fff;\n  -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);\n          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);\n  padding: 10px;\n}\n.rbc-overlay > * + * {\n  margin-top: 1px;\n}\n.rbc-overlay-header {\n  border-bottom: 1px solid #e5e5e5;\n  margin: -10px -10px 5px -10px;\n  padding: 2px 10px;\n}\n.rbc-agenda-view {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -ms-flex: 1 0;\n      flex: 1 0;\n  overflow: auto;\n}\n.rbc-agenda-view table.rbc-agenda-table {\n  width: 100%;\n  border: 1px solid #DDD;\n  border-spacing: 0;\n  border-collapse: collapse;\n}\n.rbc-agenda-view table.rbc-agenda-table tbody > tr > td {\n  padding: 5px 10px;\n  vertical-align: top;\n}\n.rbc-agenda-view table.rbc-agenda-table .rbc-agenda-time-cell {\n  padding-left: 15px;\n  padding-right: 15px;\n  text-transform: lowercase;\n}\n.rbc-agenda-view table.rbc-agenda-table tbody > tr > td + td {\n  border-left: 1px solid #DDD;\n}\n.rbc-rtl .rbc-agenda-view table.rbc-agenda-table tbody > tr > td + td {\n  border-left-width: 0;\n  border-right: 1px solid #DDD;\n}\n.rbc-agenda-view table.rbc-agenda-table tbody > tr + tr {\n  border-top: 1px solid #DDD;\n}\n.rbc-agenda-view table.rbc-agenda-table thead > tr > th {\n  padding: 3px 5px;\n  text-align: left;\n  border-bottom: 1px solid #DDD;\n}\n.rbc-rtl .rbc-agenda-view table.rbc-agenda-table thead > tr > th {\n  text-align: right;\n}\n.rbc-agenda-time-cell {\n  text-transform: lowercase;\n}\n.rbc-agenda-time-cell .rbc-continues-after:after {\n  content: ' \\BB';\n}\n.rbc-agenda-time-cell .rbc-continues-prior:before {\n  content: '\\AB   ';\n}\n.rbc-agenda-date-cell,\n.rbc-agenda-time-cell {\n  white-space: nowrap;\n}\n.rbc-agenda-event-cell {\n  width: 100%;\n}\n.rbc-time-column {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  min-height: 100%;\n}\n.rbc-time-column .rbc-timeslot-group {\n  -ms-flex: 1 1;\n      flex: 1 1;\n}\n.rbc-timeslot-group {\n  border-bottom: 1px solid #DDD;\n  min-height: 40px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: column nowrap;\n      flex-flow: column nowrap;\n}\n.rbc-time-gutter,\n.rbc-header-gutter {\n  -ms-flex: none;\n      flex: none;\n}\n.rbc-label {\n  padding: 0 5px;\n}\n.rbc-day-slot {\n  position: relative;\n}\n.rbc-day-slot .rbc-events-container {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  margin-right: 10px;\n  top: 0;\n}\n.rbc-day-slot .rbc-events-container.rbc-is-rtl {\n  left: 10px;\n  right: 0;\n}\n.rbc-day-slot .rbc-event {\n  border: 1px solid #265985;\n  display: -ms-flexbox;\n  display: flex;\n  max-height: 100%;\n  min-height: 20px;\n  -ms-flex-flow: column wrap;\n      flex-flow: column wrap;\n  -ms-flex-align: start;\n      align-items: flex-start;\n  overflow: hidden;\n  position: absolute;\n}\n.rbc-day-slot .rbc-event-label {\n  -ms-flex: none;\n      flex: none;\n  padding-right: 5px;\n  width: auto;\n}\n.rbc-day-slot .rbc-event-content {\n  width: 100%;\n  -ms-flex: 1 1;\n      flex: 1 1;\n  word-wrap: break-word;\n  line-height: 1;\n  height: 100%;\n  min-height: 1em;\n}\n.rbc-day-slot .rbc-time-slot {\n  border-top: 1px solid #f7f7f7;\n}\n.rbc-time-view-resources .rbc-time-gutter,\n.rbc-time-view-resources .rbc-time-header-gutter {\n  position: -webkit-sticky;\n  position: sticky;\n  left: 0;\n  background-color: white;\n  border-right: 1px solid #DDD;\n  z-index: 10;\n  margin-right: -1px;\n}\n.rbc-time-view-resources .rbc-time-header {\n  overflow: hidden;\n}\n.rbc-time-view-resources .rbc-time-header-content {\n  min-width: auto;\n  -ms-flex: 1 0;\n      flex: 1 0;\n  -ms-flex-preferred-size: 0px;\n      flex-basis: 0px;\n}\n.rbc-time-view-resources .rbc-time-header-cell-single-day {\n  display: none;\n}\n.rbc-time-view-resources .rbc-day-slot {\n  min-width: 140px;\n}\n.rbc-time-view-resources .rbc-header,\n.rbc-time-view-resources .rbc-day-bg {\n  width: 140px;\n  -ms-flex: 1 1;\n      flex: 1 1;\n  -ms-flex-preferred-size: 0 px;\n      flex-basis: 0 px;\n}\n.rbc-time-header-content + .rbc-time-header-content {\n  margin-left: -1px;\n}\n.rbc-time-slot {\n  -ms-flex: 1 0;\n      flex: 1 0;\n}\n.rbc-time-slot.rbc-now {\n  font-weight: bold;\n}\n.rbc-day-header {\n  text-align: center;\n}\n.rbc-slot-selection {\n  z-index: 10;\n  position: absolute;\n  background-color: rgba(0, 0, 0, 0.5);\n  color: white;\n  font-size: 75%;\n  width: 100%;\n  padding: 3px;\n}\n.rbc-slot-selecting {\n  cursor: move;\n}\n.rbc-time-view {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -ms-flex: 1 1;\n      flex: 1 1;\n  width: 100%;\n  border: 1px solid #DDD;\n  min-height: 0;\n}\n.rbc-time-view .rbc-time-gutter {\n  white-space: nowrap;\n}\n.rbc-time-view .rbc-allday-cell {\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n.rbc-time-view .rbc-allday-cell + .rbc-allday-cell {\n  border-left: 1px solid #DDD;\n}\n.rbc-time-view .rbc-allday-events {\n  position: relative;\n  z-index: 4;\n}\n.rbc-time-view .rbc-row {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  min-height: 20px;\n}\n.rbc-time-header {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex: 0 0 auto;\n      flex: 0 0 auto;\n  -ms-flex-direction: row;\n      flex-direction: row;\n}\n.rbc-time-header.rbc-overflowing {\n  border-right: 1px solid #DDD;\n}\n.rbc-rtl .rbc-time-header.rbc-overflowing {\n  border-right-width: 0;\n  border-left: 1px solid #DDD;\n}\n.rbc-time-header > .rbc-row:first-child {\n  border-bottom: 1px solid #DDD;\n}\n.rbc-time-header > .rbc-row.rbc-row-resource {\n  border-bottom: 1px solid #DDD;\n}\n.rbc-time-header-cell-single-day {\n  display: none;\n}\n.rbc-time-header-content {\n  -ms-flex: 1 1;\n      flex: 1 1;\n  display: -ms-flexbox;\n  display: flex;\n  min-width: 0;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  border-left: 1px solid #DDD;\n}\n.rbc-rtl .rbc-time-header-content {\n  border-left-width: 0;\n  border-right: 1px solid #DDD;\n}\n.rbc-time-header-content > .rbc-row.rbc-row-resource {\n  border-bottom: 1px solid #DDD;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n.rbc-time-content {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex: 1 0;\n      flex: 1 0;\n  -ms-flex-align: start;\n      align-items: flex-start;\n  width: 100%;\n  border-top: 2px solid #DDD;\n  overflow-y: auto;\n  position: relative;\n}\n.rbc-time-content > .rbc-time-gutter {\n  -ms-flex: none;\n      flex: none;\n}\n.rbc-time-content > * + * > * {\n  border-left: 1px solid #DDD;\n}\n.rbc-rtl .rbc-time-content > * + * > * {\n  border-left-width: 0;\n  border-right: 1px solid #DDD;\n}\n.rbc-time-content > .rbc-day-slot {\n  width: 100%;\n  -moz-user-select: none;\n   -ms-user-select: none;\n       user-select: none;\n  -webkit-user-select: none;\n}\n.rbc-current-time-indicator {\n  position: absolute;\n  z-index: 3;\n  left: 0;\n  right: 0;\n  height: 1px;\n  background-color: #74ad31;\n  pointer-events: none;\n}\n",
        '',
        {
          version: 3,
          sources: [
            '/Users/stephen.blades/Projects/react-big-calendar/src/less/styles.less',
          ],
          names: [],
          mappings:
            'AAAA;EACE,eAAe;EACf,cAAc;EACd,UAAU;CACX;AACD;EACE,kBAAkB;EAClB,qBAAqB;EACrB,2BAA2B;EAC3B,gBAAgB;CACjB;AACD;EACE,oBAAoB;CACrB;AACD;EACE,UAAU;EACV,WAAW;CACZ;AACD;EACE,+BAA+B;UACvB,uBAAuB;EAC/B,aAAa;EACb,qBAAqB;EACrB,cAAc;EACd,2BAA2B;MACvB,uBAAuB;EAC3B,wBAAwB;MACpB,qBAAqB;CAC1B;AACD;;;EAGE,4BAA4B;UACpB,oBAAoB;CAC7B;AACD;;EAEE,iBAAiB;EACjB,mBAAmB;EACnB,OAAO;EACP,QAAQ;EACR,SAAS;EACT,UAAU;CACX;AACD;;;;EAIE,eAAe;EACf,iBAAiB;EACjB,wBAAwB;EACxB,oBAAoB;CACrB;AACD;EACE,eAAe;CAChB;AACD;EACE,eAAe;CAChB;AACD;EACE,oBAAoB;CACrB;AACD;EACE,iBAAiB;EACjB,cAAc;MACV,UAAU;EACd,wBAAwB;EACxB,oBAAoB;EACpB,eAAe;EACf,mBAAmB;EACnB,uBAAuB;EACvB,kBAAkB;EAClB,eAAe;EACf,cAAc;EACd,8BAA8B;CAC/B;AACD;EACE,4BAA4B;CAC7B;AACD;EACE,qBAAqB;EACrB,6BAA6B;CAC9B;AACD;;;EAGE,eAAe;EACf,sBAAsB;CACvB;AACD;EACE,mBAAmB;EACnB,uBAAuB;GACtB,sBAAsB;OAClB,kBAAkB;EACvB,0BAA0B;EAC1B,WAAW;CACZ;AACD;EACE,0BAA0B;CAC3B;AACD;EACE,qBAAqB;EACrB,cAAc;EACd,oBAAoB;MAChB,gBAAgB;EACpB,sBAAsB;MAClB,wBAAwB;EAC5B,uBAAuB;MACnB,oBAAoB;EACxB,oBAAoB;EACpB,gBAAgB;CACjB;AACD;EACE,qBAAqB;MACjB,aAAa;EACjB,gBAAgB;EAChB,mBAAmB;CACpB;AACD;EACE,eAAe;EACf,sBAAsB;EACtB,UAAU;EACV,mBAAmB;EACnB,uBAAuB;EACvB,iBAAiB;EACjB,uBAAuB;EACvB,uBAAuB;EACvB,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;EACpB,oBAAoB;CACrB;AACD;;EAEE,uBAAuB;EACvB,yDAAyD;UACjD,iDAAiD;EACzD,0BAA0B;EAC1B,sBAAsB;CACvB;AACD;;;;EAIE,eAAe;EACf,0BAA0B;EAC1B,sBAAsB;CACvB;AACD;EACE,eAAe;EACf,0BAA0B;EAC1B,sBAAsB;CACvB;AACD;EACE,eAAe;EACf,0BAA0B;EAC1B,sBAAsB;CACvB;AACD;EACE,sBAAsB;EACtB,oBAAoB;CACrB;AACD;EACE,2BAA2B;EAC3B,8BAA8B;CAC/B;AACD;EACE,0BAA0B;EAC1B,6BAA6B;CAC9B;AACD;EACE,mBAAmB;EACnB,0BAA0B;EAC1B,6BAA6B;CAC9B;AACD;EACE,mBAAmB;EACnB,2BAA2B;EAC3B,8BAA8B;CAC/B;AACD;EACE,iBAAiB;CAClB;AACD;EACE,kBAAkB;CACnB;AACD;EACE,eAAe;EACf,mBAAmB;CACpB;AACD;;EAEE,kBAAkB;CACnB;AACD;EACE,iBAAiB;EACjB,0BAA0B;EAC1B,mBAAmB;EACnB,YAAY;EACZ,gBAAgB;CACjB;AACD;EACE,gBAAgB;EAChB,qBAAqB;CACtB;AACD;EACE,0BAA0B;CAC3B;AACD;EACE,0BAA0B;CAC3B;AACD;EACE,eAAe;CAChB;AACD;EACE,2DAA2D;UACnD,mDAAmD;CAC5D;AACD;EACE,0BAA0B;EAC1B,6BAA6B;CAC9B;AACD;EACE,2BAA2B;EAC3B,8BAA8B;CAC/B;AACD;EACE,0BAA0B;EAC1B,2BAA2B;CAC5B;AACD;EACE,6BAA6B;EAC7B,8BAA8B;CAC/B;AACD;EACE,qBAAqB;EACrB,cAAc;EACd,wBAAwB;MACpB,oBAAoB;CACzB;AACD;EACE,uBAAuB;CACxB;AACD;EACE,qCAAqC;CACtC;AACD;EACE,2CAA2C;EAC3C,WAAW;EACX,kBAAkB;EAClB,eAAe;EACf,aAAa;EACb,oBAAoB;CACrB;AACD;EACE,mBAAmB;EACnB,uBAAuB;EACvB,qBAAqB;EACrB,cAAc;EACd,2BAA2B;MACvB,uBAAuB;EAC3B,cAAc;MACV,UAAU;EACd,YAAY;EACZ,uBAAuB;GACtB,sBAAsB;OAClB,kBAAkB;EACvB,0BAA0B;EAC1B,aAAa;CACd;AACD;EACE,qBAAqB;EACrB,cAAc;EACd,wBAAwB;MACpB,oBAAoB;CACzB;AACD;EACE,qBAAqB;EACrB,cAAc;EACd,mBAAmB;EACnB,2BAA2B;MACvB,uBAAuB;EAC3B,cAAc;MACV,UAAU;EACd,6BAA6B;MACzB,gBAAgB;EACpB,iBAAiB;EACjB,aAAa;CACd;AACD;EACE,2BAA2B;CAC5B;AACD;EACE,cAAc;MACV,UAAU;EACd,aAAa;EACb,mBAAmB;EACnB,kBAAkB;CACnB;AACD;EACE,kBAAkB;CACnB;AACD;;;EAGE,eAAe;EACf,sBAAsB;CACvB;AACD;EACE,qBAAqB;EACrB,cAAc;EACd,wBAAwB;MACpB,oBAAoB;EACxB,cAAc;MACV,UAAU;EACd,iBAAiB;CAClB;AACD;EACE,cAAc;MACV,UAAU;CACf;AACD;EACE,4BAA4B;CAC7B;AACD;EACE,qBAAqB;EACrB,6BAA6B;CAC9B;AACD;EACE,mBAAmB;EACnB,WAAW;EACX,0BAA0B;EAC1B,uBAAuB;EACvB,mDAAmD;UAC3C,2CAA2C;EACnD,cAAc;CACf;AACD;EACE,gBAAgB;CACjB;AACD;EACE,iCAAiC;EACjC,8BAA8B;EAC9B,kBAAkB;CACnB;AACD;EACE,qBAAqB;EACrB,cAAc;EACd,2BAA2B;MACvB,uBAAuB;EAC3B,cAAc;MACV,UAAU;EACd,eAAe;CAChB;AACD;EACE,YAAY;EACZ,uBAAuB;EACvB,kBAAkB;EAClB,0BAA0B;CAC3B;AACD;EACE,kBAAkB;EAClB,oBAAoB;CACrB;AACD;EACE,mBAAmB;EACnB,oBAAoB;EACpB,0BAA0B;CAC3B;AACD;EACE,4BAA4B;CAC7B;AACD;EACE,qBAAqB;EACrB,6BAA6B;CAC9B;AACD;EACE,2BAA2B;CAC5B;AACD;EACE,iBAAiB;EACjB,iBAAiB;EACjB,8BAA8B;CAC/B;AACD;EACE,kBAAkB;CACnB;AACD;EACE,0BAA0B;CAC3B;AACD;EACE,gBAAc;CACf;AACD;EACE,kBAAc;CACf;AACD;;EAEE,oBAAoB;CACrB;AACD;EACE,YAAY;CACb;AACD;EACE,qBAAqB;EACrB,cAAc;EACd,2BAA2B;MACvB,uBAAuB;EAC3B,iBAAiB;CAClB;AACD;EACE,cAAc;MACV,UAAU;CACf;AACD;EACE,8BAA8B;EAC9B,iBAAiB;EACjB,qBAAqB;EACrB,cAAc;EACd,6BAA6B;MACzB,yBAAyB;CAC9B;AACD;;EAEE,eAAe;MACX,WAAW;CAChB;AACD;EACE,eAAe;CAChB;AACD;EACE,mBAAmB;CACpB;AACD;EACE,UAAU;EACV,QAAQ;EACR,mBAAmB;EACnB,SAAS;EACT,mBAAmB;EACnB,OAAO;CACR;AACD;EACE,WAAW;EACX,SAAS;CACV;AACD;EACE,0BAA0B;EAC1B,qBAAqB;EACrB,cAAc;EACd,iBAAiB;EACjB,iBAAiB;EACjB,2BAA2B;MACvB,uBAAuB;EAC3B,sBAAsB;MAClB,wBAAwB;EAC5B,iBAAiB;EACjB,mBAAmB;CACpB;AACD;EACE,eAAe;MACX,WAAW;EACf,mBAAmB;EACnB,YAAY;CACb;AACD;EACE,YAAY;EACZ,cAAc;MACV,UAAU;EACd,sBAAsB;EACtB,eAAe;EACf,aAAa;EACb,gBAAgB;CACjB;AACD;EACE,8BAA8B;CAC/B;AACD;;EAEE,yBAAyB;EACzB,iBAAiB;EACjB,QAAQ;EACR,wBAAwB;EACxB,6BAA6B;EAC7B,YAAY;EACZ,mBAAmB;CACpB;AACD;EACE,iBAAiB;CAClB;AACD;EACE,gBAAgB;EAChB,cAAc;MACV,UAAU;EACd,6BAA6B;MACzB,gBAAgB;CACrB;AACD;EACE,cAAc;CACf;AACD;EACE,iBAAiB;CAClB;AACD;;EAEE,aAAa;EACb,cAAc;MACV,UAAU;EACd,8BAA8B;MAC1B,iBAAiB;CACtB;AACD;EACE,kBAAkB;CACnB;AACD;EACE,cAAc;MACV,UAAU;CACf;AACD;EACE,kBAAkB;CACnB;AACD;EACE,mBAAmB;CACpB;AACD;EACE,YAAY;EACZ,mBAAmB;EACnB,qCAAqC;EACrC,aAAa;EACb,eAAe;EACf,YAAY;EACZ,aAAa;CACd;AACD;EACE,aAAa;CACd;AACD;EACE,qBAAqB;EACrB,cAAc;EACd,2BAA2B;MACvB,uBAAuB;EAC3B,cAAc;MACV,UAAU;EACd,YAAY;EACZ,uBAAuB;EACvB,cAAc;CACf;AACD;EACE,oBAAoB;CACrB;AACD;EACE,gCAAgC;UACxB,wBAAwB;EAChC,YAAY;EACZ,aAAa;EACb,mBAAmB;CACpB;AACD;EACE,4BAA4B;CAC7B;AACD;EACE,mBAAmB;EACnB,WAAW;CACZ;AACD;EACE,+BAA+B;UACvB,uBAAuB;EAC/B,iBAAiB;CAClB;AACD;EACE,qBAAqB;EACrB,cAAc;EACd,mBAAmB;MACf,eAAe;EACnB,wBAAwB;MACpB,oBAAoB;CACzB;AACD;EACE,6BAA6B;CAC9B;AACD;EACE,sBAAsB;EACtB,4BAA4B;CAC7B;AACD;EACE,8BAA8B;CAC/B;AACD;EACE,8BAA8B;CAC/B;AACD;EACE,cAAc;CACf;AACD;EACE,cAAc;MACV,UAAU;EACd,qBAAqB;EACrB,cAAc;EACd,aAAa;EACb,2BAA2B;MACvB,uBAAuB;EAC3B,4BAA4B;CAC7B;AACD;EACE,qBAAqB;EACrB,6BAA6B;CAC9B;AACD;EACE,8BAA8B;EAC9B,qBAAqB;MACjB,eAAe;CACpB;AACD;EACE,qBAAqB;EACrB,cAAc;EACd,cAAc;MACV,UAAU;EACd,sBAAsB;MAClB,wBAAwB;EAC5B,YAAY;EACZ,2BAA2B;EAC3B,iBAAiB;EACjB,mBAAmB;CACpB;AACD;EACE,eAAe;MACX,WAAW;CAChB;AACD;EACE,4BAA4B;CAC7B;AACD;EACE,qBAAqB;EACrB,6BAA6B;CAC9B;AACD;EACE,YAAY;EACZ,uBAAuB;GACtB,sBAAsB;OAClB,kBAAkB;EACvB,0BAA0B;CAC3B;AACD;EACE,mBAAmB;EACnB,WAAW;EACX,QAAQ;EACR,SAAS;EACT,YAAY;EACZ,0BAA0B;EAC1B,qBAAqB;CACtB',
          file: 'styles.less',
          sourcesContent: [
            ".rbc-btn {\n  color: inherit;\n  font: inherit;\n  margin: 0;\n}\nbutton.rbc-btn {\n  overflow: visible;\n  text-transform: none;\n  -webkit-appearance: button;\n  cursor: pointer;\n}\nbutton[disabled].rbc-btn {\n  cursor: not-allowed;\n}\nbutton.rbc-input::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n.rbc-calendar {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  height: 100%;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -ms-flex-align: stretch;\n      align-items: stretch;\n}\n.rbc-calendar *,\n.rbc-calendar *:before,\n.rbc-calendar *:after {\n  -webkit-box-sizing: inherit;\n          box-sizing: inherit;\n}\n.rbc-abs-full,\n.rbc-row-bg {\n  overflow: hidden;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n.rbc-ellipsis,\n.rbc-event-label,\n.rbc-row-segment .rbc-event-content,\n.rbc-show-more {\n  display: block;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.rbc-rtl {\n  direction: rtl;\n}\n.rbc-off-range {\n  color: #999999;\n}\n.rbc-off-range-bg {\n  background: #e5e5e5;\n}\n.rbc-header {\n  overflow: hidden;\n  -ms-flex: 1 0;\n      flex: 1 0;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  padding: 0 3px;\n  text-align: center;\n  vertical-align: middle;\n  font-weight: bold;\n  font-size: 90%;\n  min-height: 0;\n  border-bottom: 1px solid #DDD;\n}\n.rbc-header + .rbc-header {\n  border-left: 1px solid #DDD;\n}\n.rbc-rtl .rbc-header + .rbc-header {\n  border-left-width: 0;\n  border-right: 1px solid #DDD;\n}\n.rbc-header > a,\n.rbc-header > a:active,\n.rbc-header > a:visited {\n  color: inherit;\n  text-decoration: none;\n}\n.rbc-row-content {\n  position: relative;\n  -moz-user-select: none;\n   -ms-user-select: none;\n       user-select: none;\n  -webkit-user-select: none;\n  z-index: 4;\n}\n.rbc-today {\n  background-color: #eaf6ff;\n}\n.rbc-toolbar {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -ms-flex-pack: center;\n      justify-content: center;\n  -ms-flex-align: center;\n      align-items: center;\n  margin-bottom: 10px;\n  font-size: 16px;\n}\n.rbc-toolbar .rbc-toolbar-label {\n  -ms-flex-positive: 1;\n      flex-grow: 1;\n  padding: 0 10px;\n  text-align: center;\n}\n.rbc-toolbar button {\n  color: #373a3c;\n  display: inline-block;\n  margin: 0;\n  text-align: center;\n  vertical-align: middle;\n  background: none;\n  background-image: none;\n  border: 1px solid #ccc;\n  padding: .375rem 1rem;\n  border-radius: 4px;\n  line-height: normal;\n  white-space: nowrap;\n}\n.rbc-toolbar button:active,\n.rbc-toolbar button.rbc-active {\n  background-image: none;\n  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n          box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n  background-color: #e6e6e6;\n  border-color: #adadad;\n}\n.rbc-toolbar button:active:hover,\n.rbc-toolbar button.rbc-active:hover,\n.rbc-toolbar button:active:focus,\n.rbc-toolbar button.rbc-active:focus {\n  color: #373a3c;\n  background-color: #d4d4d4;\n  border-color: #8c8c8c;\n}\n.rbc-toolbar button:focus {\n  color: #373a3c;\n  background-color: #e6e6e6;\n  border-color: #adadad;\n}\n.rbc-toolbar button:hover {\n  color: #373a3c;\n  background-color: #e6e6e6;\n  border-color: #adadad;\n}\n.rbc-btn-group {\n  display: inline-block;\n  white-space: nowrap;\n}\n.rbc-btn-group > button:first-child:not(:last-child) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.rbc-btn-group > button:last-child:not(:first-child) {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.rbc-rtl .rbc-btn-group > button:first-child:not(:last-child) {\n  border-radius: 4px;\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.rbc-rtl .rbc-btn-group > button:last-child:not(:first-child) {\n  border-radius: 4px;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.rbc-btn-group > button:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n.rbc-btn-group button + button {\n  margin-left: -1px;\n}\n.rbc-rtl .rbc-btn-group button + button {\n  margin-left: 0;\n  margin-right: -1px;\n}\n.rbc-btn-group + .rbc-btn-group,\n.rbc-btn-group + button {\n  margin-left: 10px;\n}\n.rbc-event {\n  padding: 2px 5px;\n  background-color: #3174ad;\n  border-radius: 5px;\n  color: #fff;\n  cursor: pointer;\n}\n.rbc-slot-selecting .rbc-event {\n  cursor: inherit;\n  pointer-events: none;\n}\n.rbc-event.rbc-selected {\n  background-color: #265985;\n}\n.rbc-event:focus {\n  outline: 5px auto #3b99fc;\n}\n.rbc-event-label {\n  font-size: 80%;\n}\n.rbc-event-overlaps {\n  -webkit-box-shadow: -1px 1px 5px 0px rgba(51, 51, 51, 0.5);\n          box-shadow: -1px 1px 5px 0px rgba(51, 51, 51, 0.5);\n}\n.rbc-event-continues-prior {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.rbc-event-continues-after {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.rbc-event-continues-earlier {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n.rbc-event-continues-later {\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.rbc-row {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n      flex-direction: row;\n}\n.rbc-row-segment {\n  padding: 0 1px 1px 1px;\n}\n.rbc-selected-cell {\n  background-color: rgba(0, 0, 0, 0.1);\n}\n.rbc-show-more {\n  background-color: rgba(255, 255, 255, 0.3);\n  z-index: 4;\n  font-weight: bold;\n  font-size: 85%;\n  height: auto;\n  line-height: normal;\n}\n.rbc-month-view {\n  position: relative;\n  border: 1px solid #DDD;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -ms-flex: 1 0;\n      flex: 1 0;\n  width: 100%;\n  -moz-user-select: none;\n   -ms-user-select: none;\n       user-select: none;\n  -webkit-user-select: none;\n  height: 100%;\n}\n.rbc-month-header {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n      flex-direction: row;\n}\n.rbc-month-row {\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -ms-flex: 1 0;\n      flex: 1 0;\n  -ms-flex-preferred-size: 0px;\n      flex-basis: 0px;\n  overflow: hidden;\n  height: 100%;\n}\n.rbc-month-row + .rbc-month-row {\n  border-top: 1px solid #DDD;\n}\n.rbc-date-cell {\n  -ms-flex: 1 1;\n      flex: 1 1;\n  min-width: 0;\n  padding-right: 5px;\n  text-align: right;\n}\n.rbc-date-cell.rbc-now {\n  font-weight: bold;\n}\n.rbc-date-cell > a,\n.rbc-date-cell > a:active,\n.rbc-date-cell > a:visited {\n  color: inherit;\n  text-decoration: none;\n}\n.rbc-row-bg {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n      flex-direction: row;\n  -ms-flex: 1 0;\n      flex: 1 0;\n  overflow: hidden;\n}\n.rbc-day-bg {\n  -ms-flex: 1 0;\n      flex: 1 0;\n}\n.rbc-day-bg + .rbc-day-bg {\n  border-left: 1px solid #DDD;\n}\n.rbc-rtl .rbc-day-bg + .rbc-day-bg {\n  border-left-width: 0;\n  border-right: 1px solid #DDD;\n}\n.rbc-overlay {\n  position: absolute;\n  z-index: 5;\n  border: 1px solid #e5e5e5;\n  background-color: #fff;\n  -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);\n          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);\n  padding: 10px;\n}\n.rbc-overlay > * + * {\n  margin-top: 1px;\n}\n.rbc-overlay-header {\n  border-bottom: 1px solid #e5e5e5;\n  margin: -10px -10px 5px -10px;\n  padding: 2px 10px;\n}\n.rbc-agenda-view {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -ms-flex: 1 0;\n      flex: 1 0;\n  overflow: auto;\n}\n.rbc-agenda-view table.rbc-agenda-table {\n  width: 100%;\n  border: 1px solid #DDD;\n  border-spacing: 0;\n  border-collapse: collapse;\n}\n.rbc-agenda-view table.rbc-agenda-table tbody > tr > td {\n  padding: 5px 10px;\n  vertical-align: top;\n}\n.rbc-agenda-view table.rbc-agenda-table .rbc-agenda-time-cell {\n  padding-left: 15px;\n  padding-right: 15px;\n  text-transform: lowercase;\n}\n.rbc-agenda-view table.rbc-agenda-table tbody > tr > td + td {\n  border-left: 1px solid #DDD;\n}\n.rbc-rtl .rbc-agenda-view table.rbc-agenda-table tbody > tr > td + td {\n  border-left-width: 0;\n  border-right: 1px solid #DDD;\n}\n.rbc-agenda-view table.rbc-agenda-table tbody > tr + tr {\n  border-top: 1px solid #DDD;\n}\n.rbc-agenda-view table.rbc-agenda-table thead > tr > th {\n  padding: 3px 5px;\n  text-align: left;\n  border-bottom: 1px solid #DDD;\n}\n.rbc-rtl .rbc-agenda-view table.rbc-agenda-table thead > tr > th {\n  text-align: right;\n}\n.rbc-agenda-time-cell {\n  text-transform: lowercase;\n}\n.rbc-agenda-time-cell .rbc-continues-after:after {\n  content: ' »';\n}\n.rbc-agenda-time-cell .rbc-continues-prior:before {\n  content: '« ';\n}\n.rbc-agenda-date-cell,\n.rbc-agenda-time-cell {\n  white-space: nowrap;\n}\n.rbc-agenda-event-cell {\n  width: 100%;\n}\n.rbc-time-column {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  min-height: 100%;\n}\n.rbc-time-column .rbc-timeslot-group {\n  -ms-flex: 1 1;\n      flex: 1 1;\n}\n.rbc-timeslot-group {\n  border-bottom: 1px solid #DDD;\n  min-height: 40px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: column nowrap;\n      flex-flow: column nowrap;\n}\n.rbc-time-gutter,\n.rbc-header-gutter {\n  -ms-flex: none;\n      flex: none;\n}\n.rbc-label {\n  padding: 0 5px;\n}\n.rbc-day-slot {\n  position: relative;\n}\n.rbc-day-slot .rbc-events-container {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  margin-right: 10px;\n  top: 0;\n}\n.rbc-day-slot .rbc-events-container.rbc-is-rtl {\n  left: 10px;\n  right: 0;\n}\n.rbc-day-slot .rbc-event {\n  border: 1px solid #265985;\n  display: -ms-flexbox;\n  display: flex;\n  max-height: 100%;\n  min-height: 20px;\n  -ms-flex-flow: column wrap;\n      flex-flow: column wrap;\n  -ms-flex-align: start;\n      align-items: flex-start;\n  overflow: hidden;\n  position: absolute;\n}\n.rbc-day-slot .rbc-event-label {\n  -ms-flex: none;\n      flex: none;\n  padding-right: 5px;\n  width: auto;\n}\n.rbc-day-slot .rbc-event-content {\n  width: 100%;\n  -ms-flex: 1 1;\n      flex: 1 1;\n  word-wrap: break-word;\n  line-height: 1;\n  height: 100%;\n  min-height: 1em;\n}\n.rbc-day-slot .rbc-time-slot {\n  border-top: 1px solid #f7f7f7;\n}\n.rbc-time-view-resources .rbc-time-gutter,\n.rbc-time-view-resources .rbc-time-header-gutter {\n  position: -webkit-sticky;\n  position: sticky;\n  left: 0;\n  background-color: white;\n  border-right: 1px solid #DDD;\n  z-index: 10;\n  margin-right: -1px;\n}\n.rbc-time-view-resources .rbc-time-header {\n  overflow: hidden;\n}\n.rbc-time-view-resources .rbc-time-header-content {\n  min-width: auto;\n  -ms-flex: 1 0;\n      flex: 1 0;\n  -ms-flex-preferred-size: 0px;\n      flex-basis: 0px;\n}\n.rbc-time-view-resources .rbc-time-header-cell-single-day {\n  display: none;\n}\n.rbc-time-view-resources .rbc-day-slot {\n  min-width: 140px;\n}\n.rbc-time-view-resources .rbc-header,\n.rbc-time-view-resources .rbc-day-bg {\n  width: 140px;\n  -ms-flex: 1 1;\n      flex: 1 1;\n  -ms-flex-preferred-size: 0 px;\n      flex-basis: 0 px;\n}\n.rbc-time-header-content + .rbc-time-header-content {\n  margin-left: -1px;\n}\n.rbc-time-slot {\n  -ms-flex: 1 0;\n      flex: 1 0;\n}\n.rbc-time-slot.rbc-now {\n  font-weight: bold;\n}\n.rbc-day-header {\n  text-align: center;\n}\n.rbc-slot-selection {\n  z-index: 10;\n  position: absolute;\n  background-color: rgba(0, 0, 0, 0.5);\n  color: white;\n  font-size: 75%;\n  width: 100%;\n  padding: 3px;\n}\n.rbc-slot-selecting {\n  cursor: move;\n}\n.rbc-time-view {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -ms-flex: 1 1;\n      flex: 1 1;\n  width: 100%;\n  border: 1px solid #DDD;\n  min-height: 0;\n}\n.rbc-time-view .rbc-time-gutter {\n  white-space: nowrap;\n}\n.rbc-time-view .rbc-allday-cell {\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n.rbc-time-view .rbc-allday-cell + .rbc-allday-cell {\n  border-left: 1px solid #DDD;\n}\n.rbc-time-view .rbc-allday-events {\n  position: relative;\n  z-index: 4;\n}\n.rbc-time-view .rbc-row {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  min-height: 20px;\n}\n.rbc-time-header {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex: 0 0 auto;\n      flex: 0 0 auto;\n  -ms-flex-direction: row;\n      flex-direction: row;\n}\n.rbc-time-header.rbc-overflowing {\n  border-right: 1px solid #DDD;\n}\n.rbc-rtl .rbc-time-header.rbc-overflowing {\n  border-right-width: 0;\n  border-left: 1px solid #DDD;\n}\n.rbc-time-header > .rbc-row:first-child {\n  border-bottom: 1px solid #DDD;\n}\n.rbc-time-header > .rbc-row.rbc-row-resource {\n  border-bottom: 1px solid #DDD;\n}\n.rbc-time-header-cell-single-day {\n  display: none;\n}\n.rbc-time-header-content {\n  -ms-flex: 1 1;\n      flex: 1 1;\n  display: -ms-flexbox;\n  display: flex;\n  min-width: 0;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  border-left: 1px solid #DDD;\n}\n.rbc-rtl .rbc-time-header-content {\n  border-left-width: 0;\n  border-right: 1px solid #DDD;\n}\n.rbc-time-header-content > .rbc-row.rbc-row-resource {\n  border-bottom: 1px solid #DDD;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n.rbc-time-content {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex: 1 0;\n      flex: 1 0;\n  -ms-flex-align: start;\n      align-items: flex-start;\n  width: 100%;\n  border-top: 2px solid #DDD;\n  overflow-y: auto;\n  position: relative;\n}\n.rbc-time-content > .rbc-time-gutter {\n  -ms-flex: none;\n      flex: none;\n}\n.rbc-time-content > * + * > * {\n  border-left: 1px solid #DDD;\n}\n.rbc-rtl .rbc-time-content > * + * > * {\n  border-left-width: 0;\n  border-right: 1px solid #DDD;\n}\n.rbc-time-content > .rbc-day-slot {\n  width: 100%;\n  -moz-user-select: none;\n   -ms-user-select: none;\n       user-select: none;\n  -webkit-user-select: none;\n}\n.rbc-current-time-indicator {\n  position: absolute;\n  z-index: 3;\n  left: 0;\n  right: 0;\n  height: 1px;\n  background-color: #74ad31;\n  pointer-events: none;\n}\n",
          ],
          sourceRoot: '',
        },
      ])

      // exports

      /***/
    },

    /***/ 293: /***/ function(module, exports, __webpack_require__) {
      var content = __webpack_require__(294)

      if (typeof content === 'string') content = [[module.i, content, '']]

      var transform
      var insertInto

      var options = { hmr: true }

      options.transform = transform
      options.insertInto = undefined

      var update = __webpack_require__(28)(content, options)

      if (content.locals) module.exports = content.locals

      if (false) {
      }

      /***/
    },

    /***/ 294: /***/ function(module, exports, __webpack_require__) {
      exports = module.exports = __webpack_require__(27)(true)
      // imports

      // module
      exports.push([
        module.i,
        "html {\n  font-size: 10px;\n}\nbody {\n  font-size: 16px;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color';\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\nh4 {\n  margin-top: 20px;\n}\na {\n  -webkit-transition: all 200ms;\n  transition: all 200ms;\n}\na,\na:hover,\na:focus,\na:active {\n  text-decoration: none;\n}\n.jumbotron {\n  background-color: #3174ad;\n  color: white;\n}\n.jumbotron a {\n  font-size: 85%;\n  color: #e6e6e6;\n}\n.contain {\n  background-color: white;\n  border-radius: 3px;\n  padding: 20px;\n  max-width: 900px;\n  margin: auto;\n}\n.docs {\n  background-color: #3174ad;\n  margin-top: 20px;\n  padding: 30px;\n}\n.examples {\n  position: relative;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.example {\n  font-size: 14px;\n  padding: 0 40px;\n  min-height: calc(100vh - 100px);\n  min-height: -webkit-max-content;\n  min-height: -moz-max-content;\n  min-height: max-content;\n  height: calc(100vh - 100px);\n  width: 100%;\n  margin: auto;\n}\n.example,\n.example > * {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n}\n.example .rbc-calendar {\n  -ms-flex: 1 1;\n      flex: 1 1;\n  min-height: 580px;\n}\n.examples--list {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -ms-flex-pack: center;\n      justify-content: center;\n  -ms-flex-align: center;\n      align-items: center;\n}\n.examples--list > li {\n  text-align: center;\n}\n.examples--list a {\n  position: relative;\n  display: inline-block;\n  text-decoration: none;\n  padding: 1.4rem 1rem;\n  white-space: nowrap;\n  border-radius: 0.3rem;\n}\n.examples--list a:after {\n  content: '';\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  height: 4px;\n}\n.examples--list a:hover:after {\n  background-color: #3174ad;\n}\n.section {\n  margin-bottom: 20px;\n}\naside {\n  margin-bottom: 40px;\n}\nh3 > a > code,\nh4 > a > code {\n  color: #3174ad;\n  background: none;\n  padding: 0;\n}\n.examples--header {\n  margin: 0 40px;\n  text-align: center;\n}\n.dropdown--toggle {\n  font-size: 18px;\n  font-weight: 600;\n  border-radius: 3px;\n  -webkit-transition: all 200ms;\n  transition: all 200ms;\n}\n.dropdown--toggle,\n.dropdown--toggle:hover,\n.dropdown--toggle:focus,\n.dropdown--toggle:active {\n  color: #ad3173;\n  text-decoration: none;\n}\n.dropdown--toggle:hover,\n.dropdown--toggle:focus,\n.dropdown--toggle:active {\n  color: #992b66;\n  border: 1px solid #ad3173;\n  text-decoration: none;\n}\n.examples--view-source {\n  font-size: 80%;\n}\n.callout {\n  border-left: 4px solid #3174ad;\n  padding: 10px;\n  color: #265985;\n  font-size: 20px;\n  margin-bottom: 15px;\n  margin-top: 0;\n}\npre {\n  border-radius: 8px;\n  border: none;\n}\npre.shape-prop {\n  border: none;\n}\ncode {\n  color: #555;\n  background-color: rgba(0, 0, 0, 0.04);\n}\n.playgroundStage,\n.cm-s-neo.CodeMirror {\n  background-color: #f4f4f4;\n  height: auto;\n  min-height: 75px;\n}\n.CodeMirror {\n  font-size: 12px;\n}\n.cm-s-neo div.CodeMirror-cursor {\n  border-left: 1px solid #9b9da2;\n}\n.cm-s-neo .CodeMirror-linenumber {\n  color: #ccc;\n}\n.cm-s-neo .cm-atom,\n.cm-s-neo .cm-number {\n  color: #905;\n}\n.prop-table {\n  font-size: 14 px;\n}\n.playgroundStage {\n  padding: 15px 0 15px 15px;\n}\n.playground.collapsableCode .playgroundCode {\n  height: 0;\n  overflow: hidden;\n}\n.playground.collapsableCode .playgroundCode.expandedCode {\n  height: auto;\n}\n.playgroundPreview {\n  position: relative;\n  padding: 40px 15px 15px 15px;\n}\n.playgroundPreview:before {\n  position: absolute;\n  top: 3px;\n  left: 7px;\n  color: #959595;\n  border-bottom: 1px solid #eee;\n  padding: 0 3px;\n  content: 'Result';\n}\n.playground {\n  position: relative;\n  margin: 0;\n  margin-bottom: 20px;\n  border-top: 1px solid #ccc;\n}\n.playgroundCode,\n.playgroundPreview {\n  border-left: 1px solid #ccc;\n  border-right: 1px solid #ccc;\n}\n.playgroundToggleCodeBar {\n  padding: 1px;\n  border-top: 1px solid #ccc;\n}\n.playgroundToggleCodeLink {\n  color: #333;\n  background-color: #ccc;\n  margin-top: 1px;\n  margin-left: -1px;\n  border-bottom-left-radius: 3px;\n  border-bottom-right-radius: 3px;\n  padding: 3px 5px;\n}\n.playgroundToggleCodeLink:hover,\n.playgroundToggleCodeLink:focus {\n  color: black;\n}\n.anchor,\n.anchor:hover,\n.anchor:active,\n.anchor:focus {\n  color: black;\n  text-decoration: none;\n  position: relative;\n}\n.anchor-icon {\n  font-size: 90%;\n  padding-top: 0.1em;\n  position: absolute;\n  left: -0.8em;\n  opacity: 0;\n}\nh1:hover .anchor-icon,\nh1 a:focus .anchor-icon,\nh2:hover .anchor-icon,\nh2 a:focus .anchor-icon,\nh3:hover .anchor-icon,\nh3 a:focus .anchor-icon,\nh4:hover .anchor-icon,\nh4 a:focus .anchor-icon {\n  opacity: 0.5;\n}\n.special-day {\n  background-color: #fec;\n}\n.card {\n  background-color: white;\n  border: 0;\n  padding: 24px;\n  border-radius: 2px;\n  margin-bottom: 20px;\n  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n",
        '',
        {
          version: 3,
          sources: [
            '/Users/stephen.blades/Projects/react-big-calendar/examples/styles.less',
          ],
          names: [],
          mappings:
            'AAAA;EACE,gBAAgB;CACjB;AACD;EACE,gBAAgB;EAChB,wGAAwG;EACxG,oCAAoC;EACpC,mCAAmC;CACpC;AACD;EACE,iBAAiB;CAClB;AACD;EACE,8BAA8B;EAC9B,sBAAsB;CACvB;AACD;;;;EAIE,sBAAsB;CACvB;AACD;EACE,0BAA0B;EAC1B,aAAa;CACd;AACD;EACE,eAAe;EACf,eAAe;CAChB;AACD;EACE,wBAAwB;EACxB,mBAAmB;EACnB,cAAc;EACd,iBAAiB;EACjB,aAAa;CACd;AACD;EACE,0BAA0B;EAC1B,iBAAiB;EACjB,cAAc;CACf;AACD;EACE,mBAAmB;EACnB,kBAAkB;EAClB,eAAe;CAChB;AACD;EACE,gBAAgB;EAChB,gBAAgB;EAChB,gCAAgC;EAChC,gCAAgC;EAChC,6BAA6B;EAC7B,wBAAwB;EACxB,4BAA4B;EAC5B,YAAY;EACZ,aAAa;CACd;AACD;;EAEE,qBAAqB;EACrB,cAAc;EACd,2BAA2B;MACvB,uBAAuB;CAC5B;AACD;EACE,cAAc;MACV,UAAU;EACd,kBAAkB;CACnB;AACD;EACE,qBAAqB;EACrB,cAAc;EACd,oBAAoB;MAChB,gBAAgB;EACpB,sBAAsB;MAClB,wBAAwB;EAC5B,uBAAuB;MACnB,oBAAoB;CACzB;AACD;EACE,mBAAmB;CACpB;AACD;EACE,mBAAmB;EACnB,sBAAsB;EACtB,sBAAsB;EACtB,qBAAqB;EACrB,oBAAoB;EACpB,sBAAsB;CACvB;AACD;EACE,YAAY;EACZ,mBAAmB;EACnB,QAAQ;EACR,SAAS;EACT,UAAU;EACV,YAAY;CACb;AACD;EACE,0BAA0B;CAC3B;AACD;EACE,oBAAoB;CACrB;AACD;EACE,oBAAoB;CACrB;AACD;;EAEE,eAAe;EACf,iBAAiB;EACjB,WAAW;CACZ;AACD;EACE,eAAe;EACf,mBAAmB;CACpB;AACD;EACE,gBAAgB;EAChB,iBAAiB;EACjB,mBAAmB;EACnB,8BAA8B;EAC9B,sBAAsB;CACvB;AACD;;;;EAIE,eAAe;EACf,sBAAsB;CACvB;AACD;;;EAGE,eAAe;EACf,0BAA0B;EAC1B,sBAAsB;CACvB;AACD;EACE,eAAe;CAChB;AACD;EACE,+BAA+B;EAC/B,cAAc;EACd,eAAe;EACf,gBAAgB;EAChB,oBAAoB;EACpB,cAAc;CACf;AACD;EACE,mBAAmB;EACnB,aAAa;CACd;AACD;EACE,aAAa;CACd;AACD;EACE,YAAY;EACZ,sCAAsC;CACvC;AACD;;EAEE,0BAA0B;EAC1B,aAAa;EACb,iBAAiB;CAClB;AACD;EACE,gBAAgB;CACjB;AACD;EACE,+BAA+B;CAChC;AACD;EACE,YAAY;CACb;AACD;;EAEE,YAAY;CACb;AACD;EACE,iBAAiB;CAClB;AACD;EACE,0BAA0B;CAC3B;AACD;EACE,UAAU;EACV,iBAAiB;CAClB;AACD;EACE,aAAa;CACd;AACD;EACE,mBAAmB;EACnB,6BAA6B;CAC9B;AACD;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,eAAe;EACf,8BAA8B;EAC9B,eAAe;EACf,kBAAkB;CACnB;AACD;EACE,mBAAmB;EACnB,UAAU;EACV,oBAAoB;EACpB,2BAA2B;CAC5B;AACD;;EAEE,4BAA4B;EAC5B,6BAA6B;CAC9B;AACD;EACE,aAAa;EACb,2BAA2B;CAC5B;AACD;EACE,YAAY;EACZ,uBAAuB;EACvB,gBAAgB;EAChB,kBAAkB;EAClB,+BAA+B;EAC/B,gCAAgC;EAChC,iBAAiB;CAClB;AACD;;EAEE,aAAa;CACd;AACD;;;;EAIE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;CACpB;AACD;EACE,eAAe;EACf,mBAAmB;EACnB,mBAAmB;EACnB,aAAa;EACb,WAAW;CACZ;AACD;;;;;;;;EAQE,aAAa;CACd;AACD;EACE,uBAAuB;CACxB;AACD;EACE,wBAAwB;EACxB,UAAU;EACV,cAAc;EACd,mBAAmB;EACnB,oBAAoB;EACpB,wHAAwH;UAChH,gHAAgH;CACzH',
          file: 'styles.less',
          sourcesContent: [
            "html {\n  font-size: 10px;\n}\nbody {\n  font-size: 16px;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color';\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\nh4 {\n  margin-top: 20px;\n}\na {\n  -webkit-transition: all 200ms;\n  transition: all 200ms;\n}\na,\na:hover,\na:focus,\na:active {\n  text-decoration: none;\n}\n.jumbotron {\n  background-color: #3174ad;\n  color: white;\n}\n.jumbotron a {\n  font-size: 85%;\n  color: #e6e6e6;\n}\n.contain {\n  background-color: white;\n  border-radius: 3px;\n  padding: 20px;\n  max-width: 900px;\n  margin: auto;\n}\n.docs {\n  background-color: #3174ad;\n  margin-top: 20px;\n  padding: 30px;\n}\n.examples {\n  position: relative;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.example {\n  font-size: 14px;\n  padding: 0 40px;\n  min-height: calc(100vh - 100px);\n  min-height: -webkit-max-content;\n  min-height: -moz-max-content;\n  min-height: max-content;\n  height: calc(100vh - 100px);\n  width: 100%;\n  margin: auto;\n}\n.example,\n.example > * {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n}\n.example .rbc-calendar {\n  -ms-flex: 1 1;\n      flex: 1 1;\n  min-height: 580px;\n}\n.examples--list {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -ms-flex-pack: center;\n      justify-content: center;\n  -ms-flex-align: center;\n      align-items: center;\n}\n.examples--list > li {\n  text-align: center;\n}\n.examples--list a {\n  position: relative;\n  display: inline-block;\n  text-decoration: none;\n  padding: 1.4rem 1rem;\n  white-space: nowrap;\n  border-radius: 0.3rem;\n}\n.examples--list a:after {\n  content: '';\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  height: 4px;\n}\n.examples--list a:hover:after {\n  background-color: #3174ad;\n}\n.section {\n  margin-bottom: 20px;\n}\naside {\n  margin-bottom: 40px;\n}\nh3 > a > code,\nh4 > a > code {\n  color: #3174ad;\n  background: none;\n  padding: 0;\n}\n.examples--header {\n  margin: 0 40px;\n  text-align: center;\n}\n.dropdown--toggle {\n  font-size: 18px;\n  font-weight: 600;\n  border-radius: 3px;\n  -webkit-transition: all 200ms;\n  transition: all 200ms;\n}\n.dropdown--toggle,\n.dropdown--toggle:hover,\n.dropdown--toggle:focus,\n.dropdown--toggle:active {\n  color: #ad3173;\n  text-decoration: none;\n}\n.dropdown--toggle:hover,\n.dropdown--toggle:focus,\n.dropdown--toggle:active {\n  color: #992b66;\n  border: 1px solid #ad3173;\n  text-decoration: none;\n}\n.examples--view-source {\n  font-size: 80%;\n}\n.callout {\n  border-left: 4px solid #3174ad;\n  padding: 10px;\n  color: #265985;\n  font-size: 20px;\n  margin-bottom: 15px;\n  margin-top: 0;\n}\npre {\n  border-radius: 8px;\n  border: none;\n}\npre.shape-prop {\n  border: none;\n}\ncode {\n  color: #555;\n  background-color: rgba(0, 0, 0, 0.04);\n}\n.playgroundStage,\n.cm-s-neo.CodeMirror {\n  background-color: #f4f4f4;\n  height: auto;\n  min-height: 75px;\n}\n.CodeMirror {\n  font-size: 12px;\n}\n.cm-s-neo div.CodeMirror-cursor {\n  border-left: 1px solid #9b9da2;\n}\n.cm-s-neo .CodeMirror-linenumber {\n  color: #ccc;\n}\n.cm-s-neo .cm-atom,\n.cm-s-neo .cm-number {\n  color: #905;\n}\n.prop-table {\n  font-size: 14 px;\n}\n.playgroundStage {\n  padding: 15px 0 15px 15px;\n}\n.playground.collapsableCode .playgroundCode {\n  height: 0;\n  overflow: hidden;\n}\n.playground.collapsableCode .playgroundCode.expandedCode {\n  height: auto;\n}\n.playgroundPreview {\n  position: relative;\n  padding: 40px 15px 15px 15px;\n}\n.playgroundPreview:before {\n  position: absolute;\n  top: 3px;\n  left: 7px;\n  color: #959595;\n  border-bottom: 1px solid #eee;\n  padding: 0 3px;\n  content: 'Result';\n}\n.playground {\n  position: relative;\n  margin: 0;\n  margin-bottom: 20px;\n  border-top: 1px solid #ccc;\n}\n.playgroundCode,\n.playgroundPreview {\n  border-left: 1px solid #ccc;\n  border-right: 1px solid #ccc;\n}\n.playgroundToggleCodeBar {\n  padding: 1px;\n  border-top: 1px solid #ccc;\n}\n.playgroundToggleCodeLink {\n  color: #333;\n  background-color: #ccc;\n  margin-top: 1px;\n  margin-left: -1px;\n  border-bottom-left-radius: 3px;\n  border-bottom-right-radius: 3px;\n  padding: 3px 5px;\n}\n.playgroundToggleCodeLink:hover,\n.playgroundToggleCodeLink:focus {\n  color: black;\n}\n.anchor,\n.anchor:hover,\n.anchor:active,\n.anchor:focus {\n  color: black;\n  text-decoration: none;\n  position: relative;\n}\n.anchor-icon {\n  font-size: 90%;\n  padding-top: 0.1em;\n  position: absolute;\n  left: -0.8em;\n  opacity: 0;\n}\nh1:hover .anchor-icon,\nh1 a:focus .anchor-icon,\nh2:hover .anchor-icon,\nh2 a:focus .anchor-icon,\nh3:hover .anchor-icon,\nh3 a:focus .anchor-icon,\nh4:hover .anchor-icon,\nh4 a:focus .anchor-icon {\n  opacity: 0.5;\n}\n.special-day {\n  background-color: #fec;\n}\n.card {\n  background-color: white;\n  border: 0;\n  padding: 24px;\n  border-radius: 2px;\n  margin-bottom: 20px;\n  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n",
          ],
          sourceRoot: '',
        },
      ])

      // exports

      /***/
    },

    /***/ 295: /***/ function(module, exports, __webpack_require__) {
      var content = __webpack_require__(296)

      if (typeof content === 'string') content = [[module.i, content, '']]

      var transform
      var insertInto

      var options = { hmr: true }

      options.transform = transform
      options.insertInto = undefined

      var update = __webpack_require__(28)(content, options)

      if (content.locals) module.exports = content.locals

      if (false) {
      }

      /***/
    },

    /***/ 296: /***/ function(module, exports, __webpack_require__) {
      exports = module.exports = __webpack_require__(27)(true)
      // imports

      // module
      exports.push([
        module.i,
        '.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: slategray;\n}\n.token.punctuation {\n  color: #999;\n}\n.namespace {\n  opacity: .7;\n}\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n  color: #905;\n}\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n  color: #690;\n}\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n  color: #a67f59;\n  background: rgba(255, 255, 255, 0.5);\n}\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n  color: #07a;\n}\n.token.function {\n  color: #DD4A68;\n}\n.token.regex,\n.token.important,\n.token.variable {\n  color: #e90;\n}\n.token.important,\n.token.bold {\n  font-weight: bold;\n}\n.token.italic {\n  font-style: italic;\n}\n.token.entity {\n  cursor: help;\n}\n',
        '',
        {
          version: 3,
          sources: [
            '/Users/stephen.blades/Projects/react-big-calendar/examples/prism.less',
          ],
          names: [],
          mappings:
            'AAAA;;;;EAIE,iBAAiB;CAClB;AACD;EACE,YAAY;CACb;AACD;EACE,YAAY;CACb;AACD;;;;;;;EAOE,YAAY;CACb;AACD;;;;;;EAME,YAAY;CACb;AACD;;;;;EAKE,eAAe;EACf,qCAAqC;CACtC;AACD;;;EAGE,YAAY;CACb;AACD;EACE,eAAe;CAChB;AACD;;;EAGE,YAAY;CACb;AACD;;EAEE,kBAAkB;CACnB;AACD;EACE,mBAAmB;CACpB;AACD;EACE,aAAa;CACd',
          file: 'prism.less',
          sourcesContent: [
            '.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: slategray;\n}\n.token.punctuation {\n  color: #999;\n}\n.namespace {\n  opacity: .7;\n}\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n  color: #905;\n}\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n  color: #690;\n}\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n  color: #a67f59;\n  background: rgba(255, 255, 255, 0.5);\n}\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n  color: #07a;\n}\n.token.function {\n  color: #DD4A68;\n}\n.token.regex,\n.token.important,\n.token.variable {\n  color: #e90;\n}\n.token.important,\n.token.bold {\n  font-weight: bold;\n}\n.token.italic {\n  font-style: italic;\n}\n.token.entity {\n  cursor: help;\n}\n',
          ],
          sourceRoot: '',
        },
      ])

      // exports

      /***/
    },

    /***/ 298: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _reactBigCalendar = _interopRequireDefault(__webpack_require__(14))

      var _events = _interopRequireDefault(__webpack_require__(21))

      var _dates = _interopRequireDefault(__webpack_require__(8))

      var allViews = Object.keys(_reactBigCalendar.default.Views).map(function(
        k
      ) {
        return _reactBigCalendar.default.Views[k]
      })

      var Basic = function Basic(_ref) {
        var localizer = _ref.localizer
        return _react.default.createElement(_reactBigCalendar.default, {
          events: _events.default,
          views: allViews,
          step: 60,
          showMultiDayTimes: true,
          max: _dates.default.add(
            _dates.default.endOf(new Date(2015, 17, 1), 'day'),
            -1,
            'hours'
          ),
          defaultDate: new Date(2015, 3, 1),
          localizer: localizer,
        })
      }

      var _default = Basic
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 299: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var _objectWithoutPropertiesLoose2 = _interopRequireDefault(
        __webpack_require__(12)
      )

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _uncontrollable = _interopRequireDefault(__webpack_require__(300))

      var _classnames = _interopRequireDefault(__webpack_require__(6))

      var _propTypes2 = __webpack_require__(102)

      var _warning = _interopRequireDefault(__webpack_require__(83))

      var _helpers = __webpack_require__(35)

      var _constants = __webpack_require__(16)

      var _localizer = __webpack_require__(67)

      var _messages = _interopRequireDefault(__webpack_require__(304))

      var _move = _interopRequireDefault(__webpack_require__(144))

      var _Views = _interopRequireDefault(__webpack_require__(145))

      var _Toolbar = _interopRequireDefault(__webpack_require__(368))

      var _NoopWrapper = _interopRequireDefault(__webpack_require__(74))

      var _omit = _interopRequireDefault(__webpack_require__(369))

      var _defaults = _interopRequireDefault(__webpack_require__(397))

      var _transform = _interopRequireDefault(__webpack_require__(124))

      var _mapValues = _interopRequireDefault(__webpack_require__(398))

      var _accessors = __webpack_require__(110)

      function viewNames(_views) {
        return !Array.isArray(_views) ? Object.keys(_views) : _views
      }

      function isValidView(view, _ref) {
        var _views = _ref.views
        var names = viewNames(_views)
        return names.indexOf(view) !== -1
      }
      /**
       * react-big-calendar is a full featured Calendar component for managing events and dates. It uses
       * modern `flexbox` for layout, making it super responsive and performant. Leaving most of the layout heavy lifting
       * to the browser. __note:__ The default styles use `height: 100%` which means your container must set an explicit
       * height (feel free to adjust the styles to suit your specific needs).
       *
       * Big Calendar is unopiniated about editing and moving events, preferring to let you implement it in a way that makes
       * the most sense to your app. It also tries not to be prescriptive about your event data structures, just tell it
       * how to find the start and end datetimes and you can pass it whatever you want.
       *
       * One thing to note is that, `react-big-calendar` treats event start/end dates as an _exclusive_ range.
       * which means that the event spans up to, but not including, the end date. In the case
       * of displaying events on whole days, end dates are rounded _up_ to the next day. So an
       * event ending on `Apr 8th 12:00:00 am` will not appear on the 8th, whereas one ending
       * on `Apr 8th 12:01:00 am` will. If you want _inclusive_ ranges consider providing a
       * function `endAccessor` that returns the end date + 1 day for those events that end at midnight.
       */

      var Calendar =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(Calendar, _React$Component)

          function Calendar() {
            var _this

            for (
              var _len = arguments.length, _args = new Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              _args[_key] = arguments[_key]
            }

            _this =
              _React$Component.call.apply(
                _React$Component,
                [this].concat(_args)
              ) || this

            _this.getViews = function() {
              var views = _this.props.views

              if (Array.isArray(views)) {
                return (0, _transform.default)(
                  views,
                  function(obj, name) {
                    return (obj[name] = _Views.default[name])
                  },
                  {}
                )
              }

              if (typeof views === 'object') {
                return (0, _mapValues.default)(views, function(value, key) {
                  if (value === true) {
                    return _Views.default[key]
                  }

                  return value
                })
              }

              return _Views.default
            }

            _this.getView = function() {
              var views = _this.getViews()

              return views[_this.props.view]
            }

            _this.getDrilldownView = function(date) {
              var _this$props = _this.props,
                view = _this$props.view,
                drilldownView = _this$props.drilldownView,
                getDrilldownView = _this$props.getDrilldownView
              if (!getDrilldownView) return drilldownView
              return getDrilldownView(date, view, Object.keys(_this.getViews()))
            }

            _this.handleRangeChange = function(date, viewComponent, view) {
              var _this$props2 = _this.props,
                onRangeChange = _this$props2.onRangeChange,
                localizer = _this$props2.localizer

              if (onRangeChange) {
                if (viewComponent.range) {
                  onRangeChange(
                    viewComponent.range(date, {
                      localizer: localizer,
                    }),
                    view
                  )
                } else {
                  false ? undefined : void 0
                }
              }
            }

            _this.handleNavigate = function(action, newDate) {
              var _this$props3 = _this.props,
                view = _this$props3.view,
                date = _this$props3.date,
                getNow = _this$props3.getNow,
                onNavigate = _this$props3.onNavigate,
                props = (0, _objectWithoutPropertiesLoose2.default)(
                  _this$props3,
                  ['view', 'date', 'getNow', 'onNavigate']
                )

              var ViewComponent = _this.getView()

              var today = getNow()
              date = (0, _move.default)(
                ViewComponent,
                (0, _extends2.default)({}, props, {
                  action: action,
                  date: newDate || date || today,
                  today: today,
                })
              )
              onNavigate(date, view, action)

              _this.handleRangeChange(date, ViewComponent)
            }

            _this.handleViewChange = function(view) {
              if (view !== _this.props.view && isValidView(view, _this.props)) {
                _this.props.onView(view)
              }

              var views = _this.getViews()

              _this.handleRangeChange(
                _this.props.date || _this.props.getNow(),
                views[view],
                view
              )
            }

            _this.handleSelectEvent = function() {
              for (
                var _len2 = arguments.length,
                  args = new Array(_len2),
                  _key2 = 0;
                _key2 < _len2;
                _key2++
              ) {
                args[_key2] = arguments[_key2]
              }

              ;(0, _helpers.notify)(_this.props.onSelectEvent, args)
            }

            _this.handleDoubleClickEvent = function() {
              for (
                var _len3 = arguments.length,
                  args = new Array(_len3),
                  _key3 = 0;
                _key3 < _len3;
                _key3++
              ) {
                args[_key3] = arguments[_key3]
              }

              ;(0, _helpers.notify)(_this.props.onDoubleClickEvent, args)
            }

            _this.handleSelectSlot = function(slotInfo) {
              ;(0, _helpers.notify)(_this.props.onSelectSlot, slotInfo)
            }

            _this.handleDrillDown = function(date, view) {
              var onDrillDown = _this.props.onDrillDown

              if (onDrillDown) {
                onDrillDown(date, view, _this.drilldownView)
                return
              }

              if (view) _this.handleViewChange(view)

              _this.handleNavigate(_constants.navigate.DATE, date)
            }

            _this.state = {
              context: _this.getContext(_this.props),
            }
            return _this
          }

          var _proto = Calendar.prototype

          _proto.componentWillReceiveProps = function componentWillReceiveProps(
            nextProps
          ) {
            this.setState({
              context: this.getContext(nextProps),
            })
          }

          _proto.getContext = function getContext(_ref2) {
            var startAccessor = _ref2.startAccessor,
              endAccessor = _ref2.endAccessor,
              allDayAccessor = _ref2.allDayAccessor,
              tooltipAccessor = _ref2.tooltipAccessor,
              titleAccessor = _ref2.titleAccessor,
              resourceAccessor = _ref2.resourceAccessor,
              resourceIdAccessor = _ref2.resourceIdAccessor,
              resourceTitleAccessor = _ref2.resourceTitleAccessor,
              eventPropGetter = _ref2.eventPropGetter,
              slotPropGetter = _ref2.slotPropGetter,
              dayPropGetter = _ref2.dayPropGetter,
              view = _ref2.view,
              views = _ref2.views,
              localizer = _ref2.localizer,
              culture = _ref2.culture,
              _ref2$messages = _ref2.messages,
              messages = _ref2$messages === void 0 ? {} : _ref2$messages,
              _ref2$components = _ref2.components,
              components = _ref2$components === void 0 ? {} : _ref2$components,
              _ref2$formats = _ref2.formats,
              formats = _ref2$formats === void 0 ? {} : _ref2$formats
            var names = viewNames(views)
            var msgs = (0, _messages.default)(messages)
            return {
              viewNames: names,
              localizer: (0, _localizer.mergeWithDefaults)(
                localizer,
                culture,
                formats,
                msgs
              ),
              getters: {
                eventProp: function eventProp() {
                  return (
                    (eventPropGetter &&
                      eventPropGetter.apply(void 0, arguments)) ||
                    {}
                  )
                },
                slotProp: function slotProp() {
                  return (
                    (slotPropGetter &&
                      slotPropGetter.apply(void 0, arguments)) ||
                    {}
                  )
                },
                dayProp: function dayProp() {
                  return (
                    (dayPropGetter && dayPropGetter.apply(void 0, arguments)) ||
                    {}
                  )
                },
              },
              components: (0, _defaults.default)(
                components[view] || {},
                (0, _omit.default)(components, names),
                {
                  eventWrapper: _NoopWrapper.default,
                  eventContainerWrapper: _NoopWrapper.default,
                  dayWrapper: _NoopWrapper.default,
                  dateCellWrapper: _NoopWrapper.default,
                  weekWrapper: _NoopWrapper.default,
                  timeSlotWrapper: _NoopWrapper.default,
                }
              ),
              accessors: {
                start: (0, _accessors.wrapAccessor)(startAccessor),
                end: (0, _accessors.wrapAccessor)(endAccessor),
                allDay: (0, _accessors.wrapAccessor)(allDayAccessor),
                tooltip: (0, _accessors.wrapAccessor)(tooltipAccessor),
                title: (0, _accessors.wrapAccessor)(titleAccessor),
                resource: (0, _accessors.wrapAccessor)(resourceAccessor),
                resourceId: (0, _accessors.wrapAccessor)(resourceIdAccessor),
                resourceTitle: (0, _accessors.wrapAccessor)(
                  resourceTitleAccessor
                ),
              },
            }
          }

          _proto.render = function render() {
            var _this$props4 = this.props,
              view = _this$props4.view,
              toolbar = _this$props4.toolbar,
              events = _this$props4.events,
              style = _this$props4.style,
              className = _this$props4.className,
              elementProps = _this$props4.elementProps,
              current = _this$props4.date,
              getNow = _this$props4.getNow,
              length = _this$props4.length,
              showMultiDayTimes = _this$props4.showMultiDayTimes,
              onShowMore = _this$props4.onShowMore,
              _0 = _this$props4.components,
              _1 = _this$props4.formats,
              _2 = _this$props4.messages,
              _3 = _this$props4.culture,
              props = (0, _objectWithoutPropertiesLoose2.default)(
                _this$props4,
                [
                  'view',
                  'toolbar',
                  'events',
                  'style',
                  'className',
                  'elementProps',
                  'date',
                  'getNow',
                  'length',
                  'showMultiDayTimes',
                  'onShowMore',
                  'components',
                  'formats',
                  'messages',
                  'culture',
                ]
              )
            current = current || getNow()
            var View = this.getView()
            var _this$state$context = this.state.context,
              accessors = _this$state$context.accessors,
              components = _this$state$context.components,
              getters = _this$state$context.getters,
              localizer = _this$state$context.localizer,
              viewNames = _this$state$context.viewNames
            var CalToolbar = components.toolbar || _Toolbar.default
            var label = View.title(current, {
              localizer: localizer,
              length: length,
            })
            return _react.default.createElement(
              'div',
              (0, _extends2.default)({}, elementProps, {
                className: (0, _classnames.default)(
                  className,
                  'rbc-calendar',
                  props.rtl && 'rbc-is-rtl'
                ),
                style: style,
              }),
              toolbar &&
                _react.default.createElement(CalToolbar, {
                  date: current,
                  view: view,
                  views: viewNames,
                  label: label,
                  onView: this.handleViewChange,
                  onNavigate: this.handleNavigate,
                  localizer: localizer,
                }),
              _react.default.createElement(
                View,
                (0, _extends2.default)({}, props, {
                  events: events,
                  date: current,
                  getNow: getNow,
                  length: length,
                  localizer: localizer,
                  getters: getters,
                  components: components,
                  accessors: accessors,
                  showMultiDayTimes: showMultiDayTimes,
                  getDrilldownView: this.getDrilldownView,
                  onNavigate: this.handleNavigate,
                  onDrillDown: this.handleDrillDown,
                  onSelectEvent: this.handleSelectEvent,
                  onDoubleClickEvent: this.handleDoubleClickEvent,
                  onSelectSlot: this.handleSelectSlot,
                  onShowMore: onShowMore,
                })
              )
            )
          }
          /**
           *
           * @param date
           * @param viewComponent
           * @param {'month'|'week'|'work_week'|'day'|'agenda'} [view] - optional
           * parameter. It appears when range change on view changing. It could be handy
           * when you need to have both: range and view type at once, i.e. for manage rbc
           * state via url
           */

          return Calendar
        })(_react.default.Component)

      Calendar.defaultProps = {
        elementProps: {},
        popup: false,
        toolbar: true,
        view: _constants.views.MONTH,
        views: [
          _constants.views.MONTH,
          _constants.views.WEEK,
          _constants.views.DAY,
          _constants.views.AGENDA,
        ],
        step: 30,
        length: 30,
        drilldownView: _constants.views.DAY,
        titleAccessor: 'title',
        tooltipAccessor: 'title',
        allDayAccessor: 'allDay',
        startAccessor: 'start',
        endAccessor: 'end',
        resourceAccessor: 'resourceId',
        resourceIdAccessor: 'id',
        resourceTitleAccessor: 'title',
        longPressThreshold: 250,
        getNow: function getNow() {
          return new Date()
        },
      }
      Calendar.propTypes = false ? undefined : {}

      var _default = (0, _uncontrollable.default)(Calendar, {
        view: 'onView',
        date: 'onNavigate',
        selected: 'onSelectEvent',
      })

      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 304: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = messages

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var defaultMessages = {
        date: 'Date',
        time: 'Time',
        event: 'Event',
        allDay: 'All Day',
        week: 'Week',
        work_week: 'Work Week',
        day: 'Day',
        month: 'Month',
        previous: 'Back',
        next: 'Next',
        yesterday: 'Yesterday',
        tomorrow: 'Tomorrow',
        today: 'Today',
        agenda: 'Agenda',
        noEventsInRange: 'There are no events in this range.',
        showMore: function showMore(total) {
          return '+' + total + ' more'
        },
      }

      function messages(msgs) {
        return (0, _extends2.default)({}, defaultMessages, msgs)
      }

      module.exports = exports['default']

      /***/
    },

    /***/ 305: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var _objectWithoutPropertiesLoose2 = _interopRequireDefault(
        __webpack_require__(12)
      )

      var _assertThisInitialized2 = _interopRequireDefault(
        __webpack_require__(3)
      )

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _reactDom = __webpack_require__(9)

      var _classnames = _interopRequireDefault(__webpack_require__(6))

      var _dates = _interopRequireDefault(__webpack_require__(8))

      var _chunk = _interopRequireDefault(__webpack_require__(306))

      var _constants = __webpack_require__(16)

      var _helpers = __webpack_require__(35)

      var _position = _interopRequireDefault(__webpack_require__(308))

      var _requestAnimationFrame = _interopRequireDefault(
        __webpack_require__(153)
      )

      var _Popup = _interopRequireDefault(__webpack_require__(317))

      var _Overlay = _interopRequireDefault(__webpack_require__(318))

      var _DateContentRow = _interopRequireDefault(__webpack_require__(157))

      var _Header = _interopRequireDefault(__webpack_require__(161))

      var _DateHeader = _interopRequireDefault(__webpack_require__(341))

      var _eventLevels = __webpack_require__(39)

      var eventsForWeek = function eventsForWeek(evts, start, end, accessors) {
        return evts.filter(function(e) {
          return (0, _eventLevels.inRange)(e, start, end, accessors)
        })
      }

      var MonthView =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(MonthView, _React$Component)

          function MonthView() {
            var _this

            for (
              var _len = arguments.length, _args = new Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              _args[_key] = arguments[_key]
            }

            _this =
              _React$Component.call.apply(
                _React$Component,
                [this].concat(_args)
              ) || this

            _this.getContainer = function() {
              return (0, _reactDom.findDOMNode)(
                (0, _assertThisInitialized2.default)(_this)
              )
            }

            _this.renderWeek = function(week, weekIdx) {
              var _this$props = _this.props,
                events = _this$props.events,
                components = _this$props.components,
                selectable = _this$props.selectable,
                getNow = _this$props.getNow,
                selected = _this$props.selected,
                date = _this$props.date,
                localizer = _this$props.localizer,
                longPressThreshold = _this$props.longPressThreshold,
                accessors = _this$props.accessors,
                getters = _this$props.getters
              var _this$state = _this.state,
                needLimitMeasure = _this$state.needLimitMeasure,
                rowLimit = _this$state.rowLimit
              events = eventsForWeek(
                events,
                week[0],
                week[week.length - 1],
                accessors
              )
              events.sort(function(a, b) {
                return (0, _eventLevels.sortEvents)(a, b, accessors)
              })
              return _react.default.createElement(_DateContentRow.default, {
                key: weekIdx,
                ref: weekIdx === 0 ? _this.slotRowRef : undefined,
                container: _this.getContainer,
                className: 'rbc-month-row',
                getNow: getNow,
                date: date,
                range: week,
                events: events,
                maxRows: rowLimit,
                selected: selected,
                selectable: selectable,
                components: components,
                accessors: accessors,
                getters: getters,
                localizer: localizer,
                renderHeader: _this.readerDateHeading,
                renderForMeasure: needLimitMeasure,
                onShowMore: _this.handleShowMore,
                onSelect: _this.handleSelectEvent,
                onDoubleClick: _this.handleDoubleClickEvent,
                onSelectSlot: _this.handleSelectSlot,
                longPressThreshold: longPressThreshold,
                rtl: _this.props.rtl,
              })
            }

            _this.readerDateHeading = function(_ref) {
              var date = _ref.date,
                className = _ref.className,
                props = (0, _objectWithoutPropertiesLoose2.default)(_ref, [
                  'date',
                  'className',
                ])
              var _this$props2 = _this.props,
                currentDate = _this$props2.date,
                getDrilldownView = _this$props2.getDrilldownView,
                localizer = _this$props2.localizer

              var isOffRange =
                _dates.default.month(date) !== _dates.default.month(currentDate)

              var isCurrent = _dates.default.eq(date, currentDate, 'day')

              var drilldownView = getDrilldownView(date)
              var label = localizer.format(date, 'dateFormat')
              var DateHeaderComponent =
                _this.props.components.dateHeader || _DateHeader.default
              return _react.default.createElement(
                'div',
                (0, _extends2.default)({}, props, {
                  className: (0, _classnames.default)(
                    className,
                    isOffRange && 'rbc-off-range',
                    isCurrent && 'rbc-current'
                  ),
                }),
                _react.default.createElement(DateHeaderComponent, {
                  label: label,
                  date: date,
                  drilldownView: drilldownView,
                  isOffRange: isOffRange,
                  onDrillDown: function onDrillDown(e) {
                    return _this.handleHeadingClick(date, drilldownView, e)
                  },
                })
              )
            }

            _this.handleSelectSlot = function(range, slotInfo) {
              _this._pendingSelection = _this._pendingSelection.concat(range)
              clearTimeout(_this._selectTimer)
              _this._selectTimer = setTimeout(function() {
                return _this.selectDates(slotInfo)
              })
            }

            _this.handleHeadingClick = function(date, view, e) {
              e.preventDefault()

              _this.clearSelection()

              ;(0, _helpers.notify)(_this.props.onDrillDown, [date, view])
            }

            _this.handleSelectEvent = function() {
              _this.clearSelection()

              for (
                var _len2 = arguments.length,
                  args = new Array(_len2),
                  _key2 = 0;
                _key2 < _len2;
                _key2++
              ) {
                args[_key2] = arguments[_key2]
              }

              ;(0, _helpers.notify)(_this.props.onSelectEvent, args)
            }

            _this.handleDoubleClickEvent = function() {
              _this.clearSelection()

              for (
                var _len3 = arguments.length,
                  args = new Array(_len3),
                  _key3 = 0;
                _key3 < _len3;
                _key3++
              ) {
                args[_key3] = arguments[_key3]
              }

              ;(0, _helpers.notify)(_this.props.onDoubleClickEvent, args)
            }

            _this.handleShowMore = function(events, date, cell, slot, target) {
              var _this$props3 = _this.props,
                popup = _this$props3.popup,
                onDrillDown = _this$props3.onDrillDown,
                onShowMore = _this$props3.onShowMore,
                getDrilldownView = _this$props3.getDrilldownView //cancel any pending selections so only the event click goes through.

              _this.clearSelection()

              if (popup) {
                var position = (0, _position.default)(
                  cell,
                  (0, _reactDom.findDOMNode)(
                    (0, _assertThisInitialized2.default)(_this)
                  )
                )

                _this.setState({
                  overlay: {
                    date: date,
                    events: events,
                    position: position,
                    target: target,
                  },
                })
              } else {
                ;(0, _helpers.notify)(onDrillDown, [
                  date,
                  getDrilldownView(date) || _constants.views.DAY,
                ])
              }

              ;(0, _helpers.notify)(onShowMore, [events, date, slot])
            }

            _this._bgRows = []
            _this._pendingSelection = []
            _this.slotRowRef = _react.default.createRef()
            _this.state = {
              rowLimit: 5,
              needLimitMeasure: true,
            }
            return _this
          }

          var _proto = MonthView.prototype

          _proto.componentWillReceiveProps = function componentWillReceiveProps(
            _ref2
          ) {
            var date = _ref2.date
            this.setState({
              needLimitMeasure: !_dates.default.eq(
                date,
                this.props.date,
                'month'
              ),
            })
          }

          _proto.componentDidMount = function componentDidMount() {
            var _this2 = this

            var running
            if (this.state.needLimitMeasure) this.measureRowLimit(this.props)
            window.addEventListener(
              'resize',
              (this._resizeListener = function() {
                if (!running) {
                  ;(0, _requestAnimationFrame.default)(function() {
                    running = false

                    _this2.setState({
                      needLimitMeasure: true,
                    }) //eslint-disable-line
                  })
                }
              }),
              false
            )
          }

          _proto.componentDidUpdate = function componentDidUpdate() {
            if (this.state.needLimitMeasure) this.measureRowLimit(this.props)
          }

          _proto.componentWillUnmount = function componentWillUnmount() {
            window.removeEventListener('resize', this._resizeListener, false)
          }

          _proto.render = function render() {
            var _this$props4 = this.props,
              date = _this$props4.date,
              localizer = _this$props4.localizer,
              className = _this$props4.className,
              month = _dates.default.visibleDays(date, localizer),
              weeks = (0, _chunk.default)(month, 7)

            this._weekCount = weeks.length
            return _react.default.createElement(
              'div',
              {
                className: (0, _classnames.default)(
                  'rbc-month-view',
                  className
                ),
              },
              _react.default.createElement(
                'div',
                {
                  className: 'rbc-row rbc-month-header',
                },
                this.renderHeaders(weeks[0])
              ),
              weeks.map(this.renderWeek),
              this.props.popup && this.renderOverlay()
            )
          }

          _proto.renderHeaders = function renderHeaders(row) {
            var _this$props5 = this.props,
              localizer = _this$props5.localizer,
              components = _this$props5.components
            var first = row[0]
            var last = row[row.length - 1]
            var HeaderComponent = components.header || _Header.default
            return _dates.default
              .range(first, last, 'day')
              .map(function(day, idx) {
                return _react.default.createElement(
                  'div',
                  {
                    key: 'header_' + idx,
                    className: 'rbc-header',
                  },
                  _react.default.createElement(HeaderComponent, {
                    date: day,
                    localizer: localizer,
                    label: localizer.format(day, 'weekdayFormat'),
                  })
                )
              })
          }

          _proto.renderOverlay = function renderOverlay() {
            var _this3 = this

            var overlay = (this.state && this.state.overlay) || {}
            var _this$props6 = this.props,
              accessors = _this$props6.accessors,
              localizer = _this$props6.localizer,
              components = _this$props6.components,
              getters = _this$props6.getters,
              selected = _this$props6.selected
            return _react.default.createElement(
              _Overlay.default,
              {
                rootClose: true,
                placement: 'bottom',
                container: this,
                show: !!overlay.position,
                onHide: function onHide() {
                  return _this3.setState({
                    overlay: null,
                  })
                },
                target: function target() {
                  return overlay.target
                },
              },
              function(_ref3) {
                var props = _ref3.props
                return _react.default.createElement(
                  _Popup.default,
                  (0, _extends2.default)({}, props, {
                    accessors: accessors,
                    getters: getters,
                    selected: selected,
                    components: components,
                    localizer: localizer,
                    position: overlay.position,
                    events: overlay.events,
                    slotStart: overlay.date,
                    slotEnd: overlay.end,
                    onSelect: _this3.handleSelectEvent,
                    onDoubleClick: _this3.handleDoubleClickEvent,
                  })
                )
              }
            )
          }

          _proto.measureRowLimit = function measureRowLimit() {
            this.setState({
              needLimitMeasure: false,
              rowLimit: this.slotRowRef.current.getRowLimit(),
            })
          }

          _proto.selectDates = function selectDates(slotInfo) {
            var slots = this._pendingSelection.slice()

            this._pendingSelection = []
            slots.sort(function(a, b) {
              return +a - +b
            })
            ;(0, _helpers.notify)(this.props.onSelectSlot, {
              slots: slots,
              start: slots[0],
              end: slots[slots.length - 1],
              action: slotInfo.action,
              bounds: slotInfo.bounds,
              box: slotInfo.box,
            })
          }

          _proto.clearSelection = function clearSelection() {
            clearTimeout(this._selectTimer)
            this._pendingSelection = []
          }

          return MonthView
        })(_react.default.Component)

      MonthView.propTypes = false ? undefined : {}

      MonthView.range = function(date, _ref4) {
        var localizer = _ref4.localizer

        var start = _dates.default.firstVisibleDay(date, localizer)

        var end = _dates.default.lastVisibleDay(date, localizer)

        return {
          start: start,
          end: end,
        }
      }

      MonthView.navigate = function(date, action) {
        switch (action) {
          case _constants.navigate.PREVIOUS:
            return _dates.default.add(date, -1, 'month')

          case _constants.navigate.NEXT:
            return _dates.default.add(date, 1, 'month')

          default:
            return date
        }
      }

      MonthView.title = function(date, _ref5) {
        var localizer = _ref5.localizer
        return localizer.format(date, 'monthHeaderFormat')
      }

      var _default = MonthView
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 317: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireWildcard = __webpack_require__(20)

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _react = _interopRequireWildcard(__webpack_require__(1))

      var _offset = _interopRequireDefault(__webpack_require__(71))

      var _scrollTop = _interopRequireDefault(__webpack_require__(151))

      var _scrollLeft = _interopRequireDefault(__webpack_require__(152))

      var _dates = _interopRequireDefault(__webpack_require__(8))

      var _EventCell = _interopRequireDefault(__webpack_require__(154))

      var _selection = __webpack_require__(38)

      var Popup =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(Popup, _React$Component)

          function Popup() {
            return _React$Component.apply(this, arguments) || this
          }

          var _proto = Popup.prototype

          _proto.componentDidMount = function componentDidMount() {
            var _this$props = this.props,
              _this$props$popupOffs = _this$props.popupOffset,
              popupOffset =
                _this$props$popupOffs === void 0 ? 5 : _this$props$popupOffs,
              popperRef = _this$props.popperRef,
              _getOffset = (0, _offset.default)(popperRef.current),
              top = _getOffset.top,
              left = _getOffset.left,
              width = _getOffset.width,
              height = _getOffset.height,
              viewBottom = window.innerHeight + (0, _scrollTop.default)(window),
              viewRight = window.innerWidth + (0, _scrollLeft.default)(window),
              bottom = top + height,
              right = left + width

            if (bottom > viewBottom || right > viewRight) {
              var topOffset, leftOffset
              if (bottom > viewBottom)
                topOffset =
                  bottom - viewBottom + (popupOffset.y || +popupOffset || 0)
              if (right > viewRight)
                leftOffset =
                  right - viewRight + (popupOffset.x || +popupOffset || 0)
              this.setState({
                topOffset: topOffset,
                leftOffset: leftOffset,
              }) //eslint-disable-line
            }
          }

          _proto.render = function render() {
            var _this$props2 = this.props,
              events = _this$props2.events,
              selected = _this$props2.selected,
              getters = _this$props2.getters,
              accessors = _this$props2.accessors,
              components = _this$props2.components,
              onSelect = _this$props2.onSelect,
              onDoubleClick = _this$props2.onDoubleClick,
              slotStart = _this$props2.slotStart,
              slotEnd = _this$props2.slotEnd,
              localizer = _this$props2.localizer,
              popperRef = _this$props2.popperRef
            var _this$props$position = this.props.position,
              left = _this$props$position.left,
              width = _this$props$position.width,
              top = _this$props$position.top,
              topOffset = (this.state || {}).topOffset || 0,
              leftOffset = (this.state || {}).leftOffset || 0
            var style = {
              top: Math.max(0, top - topOffset),
              left: left - leftOffset,
              minWidth: width + width / 2,
            }
            return _react.default.createElement(
              'div',
              {
                style: style,
                className: 'rbc-overlay',
                ref: popperRef,
              },
              _react.default.createElement(
                'div',
                {
                  className: 'rbc-overlay-header',
                },
                localizer.format(slotStart, 'dayHeaderFormat')
              ),
              events.map(function(event, idx) {
                return _react.default.createElement(_EventCell.default, {
                  key: idx,
                  type: 'popup',
                  event: event,
                  getters: getters,
                  onSelect: onSelect,
                  accessors: accessors,
                  components: components,
                  onDoubleClick: onDoubleClick,
                  continuesPrior: _dates.default.lt(
                    accessors.end(event),
                    slotStart,
                    'day'
                  ),
                  continuesAfter: _dates.default.gte(
                    accessors.start(event),
                    slotEnd,
                    'day'
                  ),
                  selected: (0, _selection.isSelected)(event, selected),
                })
              })
            )
          }

          return Popup
        })(_react.default.Component)

      Popup.propTypes = false ? undefined : {}

      var _default = _react.default.forwardRef(function(props, ref) {
        return _react.default.createElement(
          Popup,
          (0, _extends2.default)(
            {
              popperRef: ref,
            },
            props
          )
        )
      })

      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 329: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireWildcard = __webpack_require__(20)

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _reactDom = __webpack_require__(9)

      var _classnames = _interopRequireDefault(__webpack_require__(6))

      var _dates = _interopRequireDefault(__webpack_require__(8))

      var _helpers = __webpack_require__(35)

      var _selection = __webpack_require__(38)

      var _Selection = _interopRequireWildcard(__webpack_require__(72))

      var BackgroundCells =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(BackgroundCells, _React$Component)

          function BackgroundCells(props, context) {
            var _this

            _this = _React$Component.call(this, props, context) || this
            _this.state = {
              selecting: false,
            }
            return _this
          }

          var _proto = BackgroundCells.prototype

          _proto.componentDidMount = function componentDidMount() {
            this.props.selectable && this._selectable()
          }

          _proto.componentWillUnmount = function componentWillUnmount() {
            this._teardownSelectable()
          }

          _proto.componentWillReceiveProps = function componentWillReceiveProps(
            nextProps
          ) {
            if (nextProps.selectable && !this.props.selectable)
              this._selectable()
            if (!nextProps.selectable && this.props.selectable)
              this._teardownSelectable()
          }

          _proto.render = function render() {
            var _this$props = this.props,
              range = _this$props.range,
              getNow = _this$props.getNow,
              getters = _this$props.getters,
              currentDate = _this$props.date,
              Wrapper = _this$props.components.dateCellWrapper
            var _this$state = this.state,
              selecting = _this$state.selecting,
              startIdx = _this$state.startIdx,
              endIdx = _this$state.endIdx
            var current = getNow()
            return _react.default.createElement(
              'div',
              {
                className: 'rbc-row-bg',
              },
              range.map(function(date, index) {
                var selected = selecting && index >= startIdx && index <= endIdx

                var _getters$dayProp = getters.dayProp(date),
                  className = _getters$dayProp.className,
                  style = _getters$dayProp.style

                return _react.default.createElement(
                  Wrapper,
                  {
                    key: index,
                    value: date,
                    range: range,
                  },
                  _react.default.createElement('div', {
                    style: style,
                    className: (0, _classnames.default)(
                      'rbc-day-bg',
                      className,
                      selected && 'rbc-selected-cell',
                      _dates.default.eq(date, current, 'day') && 'rbc-today',
                      currentDate &&
                        _dates.default.month(currentDate) !==
                          _dates.default.month(date) &&
                        'rbc-off-range-bg'
                    ),
                  })
                )
              })
            )
          }

          _proto._selectable = function _selectable() {
            var _this2 = this

            var node = (0, _reactDom.findDOMNode)(this)
            var selector = (this._selector = new _Selection.default(
              this.props.container,
              {
                longPressThreshold: this.props.longPressThreshold,
              }
            ))

            var selectorClicksHandler = function selectorClicksHandler(
              point,
              actionType
            ) {
              if (
                !(0, _Selection.isEvent)(
                  (0, _reactDom.findDOMNode)(_this2),
                  point
                )
              ) {
                var rowBox = (0, _Selection.getBoundsForNode)(node)
                var _this2$props = _this2.props,
                  range = _this2$props.range,
                  rtl = _this2$props.rtl

                if ((0, _selection.pointInBox)(rowBox, point)) {
                  var currentCell = (0, _selection.getSlotAtX)(
                    rowBox,
                    point.x,
                    rtl,
                    range.length
                  )

                  _this2._selectSlot({
                    startIdx: currentCell,
                    endIdx: currentCell,
                    action: actionType,
                    box: point,
                  })
                }
              }

              _this2._initial = {}

              _this2.setState({
                selecting: false,
              })
            }

            selector.on('selecting', function(box) {
              var _this2$props2 = _this2.props,
                range = _this2$props2.range,
                rtl = _this2$props2.rtl
              var startIdx = -1
              var endIdx = -1

              if (!_this2.state.selecting) {
                ;(0, _helpers.notify)(_this2.props.onSelectStart, [box])
                _this2._initial = {
                  x: box.x,
                  y: box.y,
                }
              }

              if (selector.isSelected(node)) {
                var nodeBox = (0, _Selection.getBoundsForNode)(node)

                var _dateCellSelection = (0, _selection.dateCellSelection)(
                  _this2._initial,
                  nodeBox,
                  box,
                  range.length,
                  rtl
                )

                startIdx = _dateCellSelection.startIdx
                endIdx = _dateCellSelection.endIdx
              }

              _this2.setState({
                selecting: true,
                startIdx: startIdx,
                endIdx: endIdx,
              })
            })
            selector.on('beforeSelect', function(box) {
              if (_this2.props.selectable !== 'ignoreEvents') return
              return !(0,
              _Selection.isEvent)((0, _reactDom.findDOMNode)(_this2), box)
            })
            selector.on('click', function(point) {
              return selectorClicksHandler(point, 'click')
            })
            selector.on('doubleClick', function(point) {
              return selectorClicksHandler(point, 'doubleClick')
            })
            selector.on('select', function(bounds) {
              _this2._selectSlot(
                (0, _extends2.default)({}, _this2.state, {
                  action: 'select',
                  bounds: bounds,
                })
              )

              _this2._initial = {}

              _this2.setState({
                selecting: false,
              })

              ;(0, _helpers.notify)(_this2.props.onSelectEnd, [_this2.state])
            })
          }

          _proto._teardownSelectable = function _teardownSelectable() {
            if (!this._selector) return

            this._selector.teardown()

            this._selector = null
          }

          _proto._selectSlot = function _selectSlot(_ref) {
            var endIdx = _ref.endIdx,
              startIdx = _ref.startIdx,
              action = _ref.action,
              bounds = _ref.bounds,
              box = _ref.box
            if (endIdx !== -1 && startIdx !== -1)
              this.props.onSelectSlot &&
                this.props.onSelectSlot({
                  start: startIdx,
                  end: endIdx,
                  action: action,
                  bounds: bounds,
                  box: box,
                })
          }

          return BackgroundCells
        })(_react.default.Component)

      BackgroundCells.propTypes = false ? undefined : {}
      var _default = BackgroundCells
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 334: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _EventRowMixin = _interopRequireDefault(__webpack_require__(159))

      var _eventLevels = __webpack_require__(39)

      var _range = _interopRequireDefault(__webpack_require__(337))

      var isSegmentInSlot = function isSegmentInSlot(seg, slot) {
        return seg.left <= slot && seg.right >= slot
      }

      var eventsInSlot = function eventsInSlot(segments, slot) {
        return segments.filter(function(seg) {
          return isSegmentInSlot(seg, slot)
        }).length
      }

      var EventEndingRow =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(EventEndingRow, _React$Component)

          function EventEndingRow() {
            return _React$Component.apply(this, arguments) || this
          }

          var _proto = EventEndingRow.prototype

          _proto.render = function render() {
            var _this$props = this.props,
              segments = _this$props.segments,
              slots = _this$props.slotMetrics.slots
            var rowSegments = (0, _eventLevels.eventLevels)(segments).levels[0]
            var current = 1,
              lastEnd = 1,
              row = []

            while (current <= slots) {
              var key = '_lvl_' + current

              var _ref =
                  rowSegments.filter(function(seg) {
                    return isSegmentInSlot(seg, current)
                  })[0] || {},
                event = _ref.event,
                left = _ref.left,
                right = _ref.right,
                span = _ref.span //eslint-disable-line

              if (!event) {
                current++
                continue
              }

              var gap = Math.max(0, left - lastEnd)

              if (this.canRenderSlotEvent(left, span)) {
                var content = _EventRowMixin.default.renderEvent(
                  this.props,
                  event
                )

                if (gap) {
                  row.push(
                    _EventRowMixin.default.renderSpan(slots, gap, key + '_gap')
                  )
                }

                row.push(
                  _EventRowMixin.default.renderSpan(slots, span, key, content)
                )
                lastEnd = current = right + 1
              } else {
                if (gap) {
                  row.push(
                    _EventRowMixin.default.renderSpan(slots, gap, key + '_gap')
                  )
                }

                row.push(
                  _EventRowMixin.default.renderSpan(
                    slots,
                    1,
                    key,
                    this.renderShowMore(segments, current)
                  )
                )
                lastEnd = current = current + 1
              }
            }

            return _react.default.createElement(
              'div',
              {
                className: 'rbc-row',
              },
              row
            )
          }

          _proto.canRenderSlotEvent = function canRenderSlotEvent(slot, span) {
            var segments = this.props.segments
            return (0, _range.default)(slot, slot + span).every(function(s) {
              var count = eventsInSlot(segments, s)
              return count === 1
            })
          }

          _proto.renderShowMore = function renderShowMore(segments, slot) {
            var _this = this

            var localizer = this.props.localizer
            var count = eventsInSlot(segments, slot)
            return count
              ? _react.default.createElement(
                  'a',
                  {
                    key: 'sm_' + slot,
                    href: '#',
                    className: 'rbc-show-more',
                    onClick: function onClick(e) {
                      return _this.showMore(slot, e)
                    },
                  },
                  localizer.messages.showMore(count)
                )
              : false
          }

          _proto.showMore = function showMore(slot, e) {
            e.preventDefault()
            this.props.onShowMore(slot, e.target)
          }

          return EventEndingRow
        })(_react.default.Component)

      EventEndingRow.propTypes = false ? undefined : {}
      EventEndingRow.defaultProps = (0, _extends2.default)(
        {},
        _EventRowMixin.default.defaultProps
      )
      var _default = EventEndingRow
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 34: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _Slot = _interopRequireDefault(__webpack_require__(297))

      var _default = (0, _Slot.default)()

      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 340: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.getSlotMetrics = getSlotMetrics

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var _memoizeOne = _interopRequireDefault(__webpack_require__(160))

      var _dates = _interopRequireDefault(__webpack_require__(8))

      var _eventLevels2 = __webpack_require__(39)

      var isSegmentInSlot = function isSegmentInSlot(seg, slot) {
        return seg.left <= slot && seg.right >= slot
      }

      var isEqual = function isEqual(a, b) {
        return a.range === b.range && a.events === b.events
      }

      function getSlotMetrics() {
        return (0, _memoizeOne.default)(function(options) {
          var range = options.range,
            events = options.events,
            maxRows = options.maxRows,
            minRows = options.minRows,
            accessors = options.accessors

          var _endOfRange = (0, _eventLevels2.endOfRange)(range),
            first = _endOfRange.first,
            last = _endOfRange.last

          var segments = events.map(function(evt) {
            return (0, _eventLevels2.eventSegments)(evt, range, accessors)
          })

          var _eventLevels = (0, _eventLevels2.eventLevels)(
              segments,
              Math.max(maxRows - 1, 1)
            ),
            levels = _eventLevels.levels,
            extra = _eventLevels.extra

          while (levels.length < minRows) {
            levels.push([])
          }

          return {
            first: first,
            last: last,
            levels: levels,
            extra: extra,
            range: range,
            slots: range.length,
            clone: function clone(args) {
              var metrics = getSlotMetrics()
              return metrics((0, _extends2.default)({}, options, args))
            },
            getDateForSlot: function getDateForSlot(slotNumber) {
              return range[slotNumber]
            },
            getSlotForDate: function getSlotForDate(date) {
              return range.find(function(r) {
                return _dates.default.eq(r, date, 'day')
              })
            },
            getEventsForSlot: function getEventsForSlot(slot) {
              return segments
                .filter(function(seg) {
                  return isSegmentInSlot(seg, slot)
                })
                .map(function(seg) {
                  return seg.event
                })
            },
            continuesPrior: function continuesPrior(event) {
              return _dates.default.lt(accessors.start(event), first, 'day')
            },
            continuesAfter: function continuesAfter(event) {
              var eventEnd = accessors.end(event)

              var singleDayDuration = _dates.default.eq(
                accessors.start(event),
                eventEnd,
                'minutes'
              )

              return singleDayDuration
                ? _dates.default.gte(eventEnd, last, 'minutes')
                : _dates.default.gt(eventEnd, last, 'minutes')
            },
          }
        }, isEqual)
      }

      /***/
    },

    /***/ 341: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var DateHeader = function DateHeader(_ref) {
        var label = _ref.label,
          drilldownView = _ref.drilldownView,
          onDrillDown = _ref.onDrillDown

        if (!drilldownView) {
          return _react.default.createElement('span', null, label)
        }

        return _react.default.createElement(
          'a',
          {
            href: '#',
            onClick: onDrillDown,
          },
          label
        )
      }

      DateHeader.propTypes = false ? undefined : {}
      var _default = DateHeader
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 342: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var _objectWithoutPropertiesLoose2 = _interopRequireDefault(
        __webpack_require__(12)
      )

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _dates = _interopRequireDefault(__webpack_require__(8))

      var _constants = __webpack_require__(16)

      var _TimeGrid = _interopRequireDefault(__webpack_require__(73))

      var Day =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(Day, _React$Component)

          function Day() {
            return _React$Component.apply(this, arguments) || this
          }

          var _proto = Day.prototype

          _proto.render = function render() {
            var _this$props = this.props,
              date = _this$props.date,
              props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, [
                'date',
              ])
            var range = Day.range(date)
            return _react.default.createElement(
              _TimeGrid.default,
              (0, _extends2.default)({}, props, {
                range: range,
                eventOffset: 10,
              })
            )
          }

          return Day
        })(_react.default.Component)

      Day.propTypes = false ? undefined : {}

      Day.range = function(date) {
        return [_dates.default.startOf(date, 'day')]
      }

      Day.navigate = function(date, action) {
        switch (action) {
          case _constants.navigate.PREVIOUS:
            return _dates.default.add(date, -1, 'day')

          case _constants.navigate.NEXT:
            return _dates.default.add(date, 1, 'day')

          default:
            return date
        }
      }

      Day.title = function(date, _ref) {
        var localizer = _ref.localizer
        return localizer.format(date, 'dayHeaderFormat')
      }

      var _default = Day
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 343: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireWildcard = __webpack_require__(20)

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _objectWithoutPropertiesLoose2 = _interopRequireDefault(
        __webpack_require__(12)
      )

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var _assertThisInitialized2 = _interopRequireDefault(
        __webpack_require__(3)
      )

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _reactDom = __webpack_require__(9)

      var _classnames = _interopRequireDefault(__webpack_require__(6))

      var _Selection = _interopRequireWildcard(__webpack_require__(72))

      var _dates = _interopRequireDefault(__webpack_require__(8))

      var TimeSlotUtils = _interopRequireWildcard(__webpack_require__(162))

      var _selection = __webpack_require__(38)

      var _helpers = __webpack_require__(35)

      var DayEventLayout = _interopRequireWildcard(__webpack_require__(344))

      var _TimeSlotGroup = _interopRequireDefault(__webpack_require__(168))

      var _TimeGridEvent = _interopRequireDefault(__webpack_require__(170))

      var DayColumn =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(DayColumn, _React$Component)

          function DayColumn() {
            var _this

            for (
              var _len = arguments.length, _args = new Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              _args[_key] = arguments[_key]
            }

            _this =
              _React$Component.call.apply(
                _React$Component,
                [this].concat(_args)
              ) || this
            _this.state = {
              selecting: false,
              timeIndicatorPosition: null,
            }
            _this.intervalTriggered = false

            _this.renderEvents = function() {
              var _this$props = _this.props,
                events = _this$props.events,
                isRtl = _this$props.rtl,
                selected = _this$props.selected,
                accessors = _this$props.accessors,
                localizer = _this$props.localizer,
                getters = _this$props.getters,
                components = _this$props.components,
                step = _this$props.step,
                timeslots = _this$props.timeslots

              var _assertThisInitialize = (0, _assertThisInitialized2.default)(
                  _this
                ),
                slotMetrics = _assertThisInitialize.slotMetrics

              var messages = localizer.messages
              var styledEvents = DayEventLayout.getStyledEvents({
                events: events,
                accessors: accessors,
                slotMetrics: slotMetrics,
                minimumStartDifference: Math.ceil((step * timeslots) / 2),
              })
              return styledEvents.map(function(_ref, idx) {
                var event = _ref.event,
                  style = _ref.style
                var end = accessors.end(event)
                var start = accessors.start(event)
                var format = 'eventTimeRangeFormat'
                var label
                var startsBeforeDay = slotMetrics.startsBeforeDay(start)
                var startsAfterDay = slotMetrics.startsAfterDay(end)
                if (startsBeforeDay) format = 'eventTimeRangeEndFormat'
                else if (startsAfterDay) format = 'eventTimeRangeStartFormat'
                if (startsBeforeDay && startsAfterDay) label = messages.allDay
                else
                  label = localizer.format(
                    {
                      start: start,
                      end: end,
                    },
                    format
                  )
                var continuesEarlier =
                  startsBeforeDay || slotMetrics.startsBefore(start)
                var continuesLater =
                  startsAfterDay || slotMetrics.startsAfter(end)
                return _react.default.createElement(_TimeGridEvent.default, {
                  style: style,
                  event: event,
                  label: label,
                  key: 'evt_' + idx,
                  getters: getters,
                  isRtl: isRtl,
                  components: components,
                  continuesEarlier: continuesEarlier,
                  continuesLater: continuesLater,
                  accessors: accessors,
                  selected: (0, _selection.isSelected)(event, selected),
                  onClick: function onClick(e) {
                    return _this._select(event, e)
                  },
                  onDoubleClick: function onDoubleClick(e) {
                    return _this._doubleClick(event, e)
                  },
                })
              })
            }

            _this._selectable = function() {
              var node = (0, _reactDom.findDOMNode)(
                (0, _assertThisInitialized2.default)(_this)
              )
              var selector = (_this._selector = new _Selection.default(
                function() {
                  return (0, _reactDom.findDOMNode)(
                    (0, _assertThisInitialized2.default)(_this)
                  )
                },
                {
                  longPressThreshold: _this.props.longPressThreshold,
                }
              ))

              var maybeSelect = function maybeSelect(box) {
                var onSelecting = _this.props.onSelecting
                var current = _this.state || {}
                var state = selectionState(box)
                var start = state.startDate,
                  end = state.endDate

                if (onSelecting) {
                  if (
                    (_dates.default.eq(current.startDate, start, 'minutes') &&
                      _dates.default.eq(current.endDate, end, 'minutes')) ||
                    onSelecting({
                      start: start,
                      end: end,
                    }) === false
                  )
                    return
                }

                if (
                  _this.state.start !== state.start ||
                  _this.state.end !== state.end ||
                  _this.state.selecting !== state.selecting
                ) {
                  _this.setState(state)
                }
              }

              var selectionState = function selectionState(point) {
                var currentSlot = _this.slotMetrics.closestSlotFromPoint(
                  point,
                  (0, _Selection.getBoundsForNode)(node)
                )

                if (!_this.state.selecting) _this._initialSlot = currentSlot
                var initialSlot = _this._initialSlot
                if (initialSlot === currentSlot)
                  currentSlot = _this.slotMetrics.nextSlot(initialSlot)

                var selectRange = _this.slotMetrics.getRange(
                  _dates.default.min(initialSlot, currentSlot),
                  _dates.default.max(initialSlot, currentSlot)
                )

                return (0, _extends2.default)({}, selectRange, {
                  selecting: true,
                  top: selectRange.top + '%',
                  height: selectRange.height + '%',
                })
              }

              var selectorClicksHandler = function selectorClicksHandler(
                box,
                actionType
              ) {
                if (
                  !(0, _Selection.isEvent)(
                    (0, _reactDom.findDOMNode)(
                      (0, _assertThisInitialized2.default)(_this)
                    ),
                    box
                  )
                ) {
                  var _selectionState = selectionState(box),
                    startDate = _selectionState.startDate,
                    endDate = _selectionState.endDate

                  _this._selectSlot({
                    startDate: startDate,
                    endDate: endDate,
                    action: actionType,
                    box: box,
                  })
                }

                _this.setState({
                  selecting: false,
                })
              }

              selector.on('selecting', maybeSelect)
              selector.on('selectStart', maybeSelect)
              selector.on('beforeSelect', function(box) {
                if (_this.props.selectable !== 'ignoreEvents') return
                return !(0,
                _Selection.isEvent)((0, _reactDom.findDOMNode)((0, _assertThisInitialized2.default)(_this)), box)
              })
              selector.on('click', function(box) {
                return selectorClicksHandler(box, 'click')
              })
              selector.on('doubleClick', function(box) {
                return selectorClicksHandler(box, 'doubleClick')
              })
              selector.on('select', function(bounds) {
                if (_this.state.selecting) {
                  _this._selectSlot(
                    (0, _extends2.default)({}, _this.state, {
                      action: 'select',
                      bounds: bounds,
                    })
                  )

                  _this.setState({
                    selecting: false,
                  })
                }
              })
              selector.on('reset', function() {
                if (_this.state.selecting) {
                  _this.setState({
                    selecting: false,
                  })
                }
              })
            }

            _this._teardownSelectable = function() {
              if (!_this._selector) return

              _this._selector.teardown()

              _this._selector = null
            }

            _this._selectSlot = function(_ref2) {
              var startDate = _ref2.startDate,
                endDate = _ref2.endDate,
                action = _ref2.action,
                bounds = _ref2.bounds,
                box = _ref2.box
              var current = startDate,
                slots = []

              while (_dates.default.lte(current, endDate)) {
                slots.push(current)
                current = _dates.default.add(
                  current,
                  _this.props.step,
                  'minutes'
                )
              }

              ;(0, _helpers.notify)(_this.props.onSelectSlot, {
                slots: slots,
                start: startDate,
                end: endDate,
                resourceId: _this.props.resource,
                action: action,
                bounds: bounds,
                box: box,
              })
            }

            _this._select = function() {
              for (
                var _len2 = arguments.length,
                  args = new Array(_len2),
                  _key2 = 0;
                _key2 < _len2;
                _key2++
              ) {
                args[_key2] = arguments[_key2]
              }

              ;(0, _helpers.notify)(_this.props.onSelectEvent, args)
            }

            _this._doubleClick = function() {
              for (
                var _len3 = arguments.length,
                  args = new Array(_len3),
                  _key3 = 0;
                _key3 < _len3;
                _key3++
              ) {
                args[_key3] = arguments[_key3]
              }

              ;(0, _helpers.notify)(_this.props.onDoubleClickEvent, args)
            }

            _this.slotMetrics = TimeSlotUtils.getSlotMetrics(_this.props)
            return _this
          }

          var _proto = DayColumn.prototype

          _proto.componentDidMount = function componentDidMount() {
            this.props.selectable && this._selectable()

            if (this.props.isNow) {
              this.setTimeIndicatorPositionUpdateInterval()
            }
          }

          _proto.componentWillUnmount = function componentWillUnmount() {
            this._teardownSelectable()

            this.clearTimeIndicatorInterval()
          }

          _proto.componentWillReceiveProps = function componentWillReceiveProps(
            nextProps
          ) {
            if (nextProps.selectable && !this.props.selectable)
              this._selectable()
            if (!nextProps.selectable && this.props.selectable)
              this._teardownSelectable()
            this.slotMetrics = this.slotMetrics.update(nextProps)
          }

          _proto.componentDidUpdate = function componentDidUpdate(
            prevProps,
            prevState
          ) {
            var getNowChanged = !_dates.default.eq(
              prevProps.getNow(),
              this.props.getNow(),
              'minutes'
            )

            if (prevProps.isNow !== this.props.isNow || getNowChanged) {
              this.clearTimeIndicatorInterval()

              if (this.props.isNow) {
                var tail =
                  !getNowChanged &&
                  _dates.default.eq(
                    prevProps.date,
                    this.props.date,
                    'minutes'
                  ) &&
                  prevState.timeIndicatorPosition ===
                    this.state.timeIndicatorPosition
                this.setTimeIndicatorPositionUpdateInterval(tail)
              }
            }
          }

          /**
           * @param tail {Boolean} - whether `positionTimeIndicator` call should be
           *   deferred or called upon setting interval (`true` - if deferred);
           */
          _proto.setTimeIndicatorPositionUpdateInterval = function setTimeIndicatorPositionUpdateInterval(
            tail
          ) {
            var _this2 = this

            if (tail === void 0) {
              tail = false
            }

            if (!this.intervalTriggered && !tail) {
              this.positionTimeIndicator()
            }

            this._timeIndicatorTimeout = window.setTimeout(function() {
              _this2.intervalTriggered = true

              _this2.positionTimeIndicator()

              _this2.setTimeIndicatorPositionUpdateInterval()
            }, 60000)
          }

          _proto.clearTimeIndicatorInterval = function clearTimeIndicatorInterval() {
            this.intervalTriggered = false
            window.clearTimeout(this._timeIndicatorTimeout)
          }

          _proto.positionTimeIndicator = function positionTimeIndicator() {
            var _this$props2 = this.props,
              min = _this$props2.min,
              max = _this$props2.max,
              getNow = _this$props2.getNow
            var current = getNow()

            if (current >= min && current <= max) {
              var _this$slotMetrics$get = this.slotMetrics.getRange(
                  current,
                  current
                ),
                top = _this$slotMetrics$get.top

              this.setState({
                timeIndicatorPosition: top,
              })
            } else {
              this.clearTimeIndicatorInterval()
            }
          }

          _proto.render = function render() {
            var _this$props3 = this.props,
              max = _this$props3.max,
              rtl = _this$props3.rtl,
              isNow = _this$props3.isNow,
              resource = _this$props3.resource,
              accessors = _this$props3.accessors,
              localizer = _this$props3.localizer,
              _this$props3$getters = _this$props3.getters,
              dayProp = _this$props3$getters.dayProp,
              getters = (0, _objectWithoutPropertiesLoose2.default)(
                _this$props3$getters,
                ['dayProp']
              ),
              _this$props3$componen = _this$props3.components,
              EventContainer = _this$props3$componen.eventContainerWrapper,
              components = (0, _objectWithoutPropertiesLoose2.default)(
                _this$props3$componen,
                ['eventContainerWrapper']
              )
            var slotMetrics = this.slotMetrics
            var _this$state = this.state,
              selecting = _this$state.selecting,
              top = _this$state.top,
              height = _this$state.height,
              startDate = _this$state.startDate,
              endDate = _this$state.endDate
            var selectDates = {
              start: startDate,
              end: endDate,
            }

            var _dayProp = dayProp(max),
              className = _dayProp.className,
              style = _dayProp.style

            return _react.default.createElement(
              'div',
              {
                style: style,
                className: (0, _classnames.default)(
                  className,
                  'rbc-day-slot',
                  'rbc-time-column',
                  isNow && 'rbc-now',
                  isNow && 'rbc-today', // WHY
                  selecting && 'rbc-slot-selecting'
                ),
              },
              slotMetrics.groups.map(function(grp, idx) {
                return _react.default.createElement(_TimeSlotGroup.default, {
                  key: idx,
                  group: grp,
                  resource: resource,
                  getters: getters,
                  components: components,
                })
              }),
              _react.default.createElement(
                EventContainer,
                {
                  localizer: localizer,
                  resource: resource,
                  accessors: accessors,
                  getters: getters,
                  components: components,
                  slotMetrics: slotMetrics,
                },
                _react.default.createElement(
                  'div',
                  {
                    className: (0, _classnames.default)(
                      'rbc-events-container',
                      rtl && 'rtl'
                    ),
                  },
                  this.renderEvents()
                )
              ),
              selecting &&
                _react.default.createElement(
                  'div',
                  {
                    className: 'rbc-slot-selection',
                    style: {
                      top: top,
                      height: height,
                    },
                  },
                  _react.default.createElement(
                    'span',
                    null,
                    localizer.format(selectDates, 'selectRangeFormat')
                  )
                ),
              isNow &&
                _react.default.createElement('div', {
                  className: 'rbc-current-time-indicator',
                  style: {
                    top: this.state.timeIndicatorPosition + '%',
                  },
                })
            )
          }

          return DayColumn
        })(_react.default.Component)

      DayColumn.propTypes = false ? undefined : {}
      DayColumn.defaultProps = {
        dragThroughEvents: true,
        timeslots: 2,
      }
      var _default = DayColumn
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 344: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.getStyledEvents = getStyledEvents

      var _createClass2 = _interopRequireDefault(__webpack_require__(345))

      var _sortBy = _interopRequireDefault(__webpack_require__(346))

      var Event =
        /*#__PURE__*/
        (function() {
          function Event(data, _ref) {
            var accessors = _ref.accessors,
              slotMetrics = _ref.slotMetrics

            var _slotMetrics$getRange = slotMetrics.getRange(
                accessors.start(data),
                accessors.end(data)
              ),
              start = _slotMetrics$getRange.start,
              startDate = _slotMetrics$getRange.startDate,
              end = _slotMetrics$getRange.end,
              endDate = _slotMetrics$getRange.endDate,
              top = _slotMetrics$getRange.top,
              height = _slotMetrics$getRange.height

            this.start = start
            this.end = end
            this.startMs = +startDate
            this.endMs = +endDate
            this.top = top
            this.height = height
            this.data = data
          }
          /**
           * The event's width without any overlap.
           */

          ;(0, _createClass2.default)(Event, [
            {
              key: '_width',
              get: function get() {
                // The container event's width is determined by the maximum number of
                // events in any of its rows.
                if (this.rows) {
                  var columns =
                    this.rows.reduce(
                      function(max, row) {
                        return Math.max(max, row.leaves.length + 1)
                      }, // add itself
                      0
                    ) + 1 // add the container

                  return 100 / columns
                }

                var availableWidth = 100 - this.container._width // The row event's width is the space left by the container, divided
                // among itself and its leaves.

                if (this.leaves) {
                  return availableWidth / (this.leaves.length + 1)
                } // The leaf event's width is determined by its row's width

                return this.row._width
              },
              /**
               * The event's calculated width, possibly with extra width added for
               * overlapping effect.
               */
            },
            {
              key: 'width',
              get: function get() {
                var noOverlap = this._width
                var overlap = Math.min(100, this._width * 1.7) // Containers can always grow.

                if (this.rows) {
                  return overlap
                } // Rows can grow if they have leaves.

                if (this.leaves) {
                  return this.leaves.length > 0 ? overlap : noOverlap
                } // Leaves can grow unless they're the last item in a row.

                var leaves = this.row.leaves
                var index = leaves.indexOf(this)
                return index === leaves.length - 1 ? noOverlap : overlap
              },
            },
            {
              key: 'xOffset',
              get: function get() {
                // Containers have no offset.
                if (this.rows) return 0 // Rows always start where their container ends.

                if (this.leaves) return this.container._width // Leaves are spread out evenly on the space left by its row.

                var _this$row = this.row,
                  leaves = _this$row.leaves,
                  xOffset = _this$row.xOffset,
                  _width = _this$row._width
                var index = leaves.indexOf(this) + 1
                return xOffset + index * _width
              },
            },
          ])
          return Event
        })()
      /**
       * Return true if event a and b is considered to be on the same row.
       */

      function onSameRow(a, b, minimumStartDifference) {
        return (
          // Occupies the same start slot.
          Math.abs(b.start - a.start) < minimumStartDifference || // A's start slot overlaps with b's end slot.
          (b.start > a.start && b.start < a.end)
        )
      }

      function sortByRender(events) {
        var sortedByTime = (0, _sortBy.default)(events, [
          'startMs',
          function(e) {
            return -e.endMs
          },
        ])
        var sorted = []

        while (sortedByTime.length > 0) {
          var event = sortedByTime.shift()
          sorted.push(event)

          for (var i = 0; i < sortedByTime.length; i++) {
            var test = sortedByTime[i] // Still inside this event, look for next.

            if (event.endMs > test.startMs) continue // We've found the first event of the next event group.
            // If that event is not right next to our current event, we have to
            // move it here.

            if (i > 0) {
              var _event = sortedByTime.splice(i, 1)[0]
              sorted.push(_event)
            } // We've already found the next event group, so stop looking.

            break
          }
        }

        return sorted
      }

      function getStyledEvents(_ref2) {
        var events = _ref2.events,
          minimumStartDifference = _ref2.minimumStartDifference,
          slotMetrics = _ref2.slotMetrics,
          accessors = _ref2.accessors
        // Create proxy events and order them so that we don't have
        // to fiddle with z-indexes.
        var proxies = events.map(function(event) {
          return new Event(event, {
            slotMetrics: slotMetrics,
            accessors: accessors,
          })
        })
        var eventsInRenderOrder = sortByRender(proxies) // Group overlapping events, while keeping order.
        // Every event is always one of: container, row or leaf.
        // Containers can contain rows, and rows can contain leaves.

        var containerEvents = []

        var _loop = function _loop(i) {
          var event = eventsInRenderOrder[i] // Check if this event can go into a container event.

          var container = containerEvents.find(function(c) {
            return (
              c.end > event.start ||
              Math.abs(event.start - c.start) < minimumStartDifference
            )
          }) // Couldn't find a container — that means this event is a container.

          if (!container) {
            event.rows = []
            containerEvents.push(event)
            return 'continue'
          } // Found a container for the event.

          event.container = container // Check if the event can be placed in an existing row.
          // Start looking from behind.

          var row = null

          for (var j = container.rows.length - 1; !row && j >= 0; j--) {
            if (onSameRow(container.rows[j], event, minimumStartDifference)) {
              row = container.rows[j]
            }
          }

          if (row) {
            // Found a row, so add it.
            row.leaves.push(event)
            event.row = row
          } else {
            // Couldn't find a row – that means this event is a row.
            event.leaves = []
            container.rows.push(event)
          }
        }

        for (var i = 0; i < eventsInRenderOrder.length; i++) {
          var _ret = _loop(i)

          if (_ret === 'continue') continue
        } // Return the original events, along with their styles.

        return eventsInRenderOrder.map(function(event) {
          return {
            event: event.data,
            style: {
              top: event.top,
              height: event.height,
              width: event.width,
              xOffset: event.xOffset,
            },
          }
        })
      }

      /***/
    },

    /***/ 35: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      exports.__esModule = true
      exports.notify = notify
      exports.instanceId = instanceId
      exports.isFirstFocusedRender = isFirstFocusedRender
      var idCount = 0

      function uniqueId(prefix) {
        return '' + ((prefix == null ? '' : prefix) + ++idCount)
      }

      function notify(handler, args) {
        handler && handler.apply(null, [].concat(args))
      }

      function instanceId(component, suffix) {
        if (suffix === void 0) {
          suffix = ''
        }

        component.__id || (component.__id = uniqueId('rw_'))
        return (component.props.id || component.__id) + suffix
      }

      function isFirstFocusedRender(component) {
        return (
          component._firstFocus ||
          (component.state.focused && (component._firstFocus = true))
        )
      }

      /***/
    },

    /***/ 359: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireWildcard = __webpack_require__(20)

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _classnames = _interopRequireDefault(__webpack_require__(6))

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _react = _interopRequireWildcard(__webpack_require__(1))

      var TimeSlotUtils = _interopRequireWildcard(__webpack_require__(162))

      var _TimeSlotGroup = _interopRequireDefault(__webpack_require__(168))

      var TimeGutter =
        /*#__PURE__*/
        (function(_Component) {
          ;(0, _inheritsLoose2.default)(TimeGutter, _Component)

          function TimeGutter() {
            var _this

            for (
              var _len = arguments.length, args = new Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              args[_key] = arguments[_key]
            }

            _this =
              _Component.call.apply(_Component, [this].concat(args)) || this

            _this.renderSlot = function(value, idx) {
              if (idx !== 0) return null
              var _this$props = _this.props,
                localizer = _this$props.localizer,
                getNow = _this$props.getNow

              var isNow = _this.slotMetrics.dateIsInGroup(getNow(), idx)

              return _react.default.createElement(
                'span',
                {
                  className: (0, _classnames.default)(
                    'rbc-label',
                    isNow && 'rbc-now'
                  ),
                },
                localizer.format(value, 'timeGutterFormat')
              )
            }

            var _this$props2 = _this.props,
              min = _this$props2.min,
              max = _this$props2.max,
              timeslots = _this$props2.timeslots,
              step = _this$props2.step
            _this.slotMetrics = TimeSlotUtils.getSlotMetrics({
              min: min,
              max: max,
              timeslots: timeslots,
              step: step,
            })
            return _this
          }

          var _proto = TimeGutter.prototype

          _proto.componentWillReceiveProps = function componentWillReceiveProps(
            nextProps
          ) {
            var min = nextProps.min,
              max = nextProps.max,
              timeslots = nextProps.timeslots,
              step = nextProps.step
            this.slotMetrics = this.slotMetrics.update({
              min: min,
              max: max,
              timeslots: timeslots,
              step: step,
            })
          }

          _proto.render = function render() {
            var _this2 = this

            var _this$props3 = this.props,
              resource = _this$props3.resource,
              components = _this$props3.components
            return _react.default.createElement(
              'div',
              {
                className: 'rbc-time-gutter rbc-time-column',
              },
              this.slotMetrics.groups.map(function(grp, idx) {
                return _react.default.createElement(_TimeSlotGroup.default, {
                  key: idx,
                  group: grp,
                  resource: resource,
                  components: components,
                  renderSlot: _this2.renderSlot,
                })
              })
            )
          }

          return TimeGutter
        })(_react.Component)

      exports.default = TimeGutter
      TimeGutter.propTypes = false ? undefined : {}
      module.exports = exports['default']

      /***/
    },

    /***/ 360: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _classnames = _interopRequireDefault(__webpack_require__(6))

      var _scrollbarSize = _interopRequireDefault(__webpack_require__(172))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _dates = _interopRequireDefault(__webpack_require__(8))

      var _DateContentRow = _interopRequireDefault(__webpack_require__(157))

      var _Header = _interopRequireDefault(__webpack_require__(161))

      var _ResourceHeader = _interopRequireDefault(__webpack_require__(361))

      var _helpers = __webpack_require__(35)

      var TimeGridHeader =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(TimeGridHeader, _React$Component)

          function TimeGridHeader() {
            var _this

            for (
              var _len = arguments.length, args = new Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              args[_key] = arguments[_key]
            }

            _this =
              _React$Component.call.apply(
                _React$Component,
                [this].concat(args)
              ) || this

            _this.handleHeaderClick = function(date, view, e) {
              e.preventDefault()
              ;(0, _helpers.notify)(_this.props.onDrillDown, [date, view])
            }

            _this.renderRow = function(resource) {
              var _this$props = _this.props,
                events = _this$props.events,
                rtl = _this$props.rtl,
                selectable = _this$props.selectable,
                getNow = _this$props.getNow,
                range = _this$props.range,
                getters = _this$props.getters,
                localizer = _this$props.localizer,
                accessors = _this$props.accessors,
                components = _this$props.components
              var resourceId = accessors.resourceId(resource)
              var eventsToDisplay = resource
                ? events.filter(function(event) {
                    return accessors.resource(event) === resourceId
                  })
                : events
              return _react.default.createElement(_DateContentRow.default, {
                isAllDay: true,
                rtl: rtl,
                getNow: getNow,
                minRows: 2,
                range: range,
                events: eventsToDisplay,
                resourceId: resourceId,
                className: 'rbc-allday-cell',
                selectable: selectable,
                selected: _this.props.selected,
                components: components,
                accessors: accessors,
                getters: getters,
                localizer: localizer,
                onSelect: _this.props.onSelectEvent,
                onDoubleClick: _this.props.onDoubleClickEvent,
                onSelectSlot: _this.props.onSelectSlot,
                longPressThreshold: _this.props.longPressThreshold,
              })
            }

            return _this
          }

          var _proto = TimeGridHeader.prototype

          _proto.renderHeaderCells = function renderHeaderCells(range) {
            var _this2 = this

            var _this$props2 = this.props,
              localizer = _this$props2.localizer,
              getDrilldownView = _this$props2.getDrilldownView,
              getNow = _this$props2.getNow,
              dayProp = _this$props2.getters.dayProp,
              _this$props2$componen = _this$props2.components.header,
              HeaderComponent =
                _this$props2$componen === void 0
                  ? _Header.default
                  : _this$props2$componen
            var today = getNow()
            return range.map(function(date, i) {
              var drilldownView = getDrilldownView(date)
              var label = localizer.format(date, 'dayFormat')

              var _dayProp = dayProp(date),
                className = _dayProp.className,
                style = _dayProp.style

              var header = _react.default.createElement(HeaderComponent, {
                date: date,
                label: label,
                localizer: localizer,
              })

              return _react.default.createElement(
                'div',
                {
                  key: i,
                  style: style,
                  className: (0, _classnames.default)(
                    'rbc-header',
                    className,
                    _dates.default.eq(date, today, 'day') && 'rbc-today'
                  ),
                },
                drilldownView
                  ? _react.default.createElement(
                      'a',
                      {
                        href: '#',
                        onClick: function onClick(e) {
                          return _this2.handleHeaderClick(
                            date,
                            drilldownView,
                            e
                          )
                        },
                      },
                      header
                    )
                  : _react.default.createElement('span', null, header)
              )
            })
          }

          _proto.render = function render() {
            var _this3 = this

            var _this$props3 = this.props,
              width = _this$props3.width,
              rtl = _this$props3.rtl,
              resources = _this$props3.resources,
              range = _this$props3.range,
              events = _this$props3.events,
              getNow = _this$props3.getNow,
              accessors = _this$props3.accessors,
              selectable = _this$props3.selectable,
              components = _this$props3.components,
              getters = _this$props3.getters,
              scrollRef = _this$props3.scrollRef,
              localizer = _this$props3.localizer,
              isOverflowing = _this$props3.isOverflowing,
              _this$props3$componen = _this$props3.components,
              TimeGutterHeader = _this$props3$componen.timeGutterHeader,
              _this$props3$componen2 = _this$props3$componen.resourceHeader,
              ResourceHeaderComponent =
                _this$props3$componen2 === void 0
                  ? _ResourceHeader.default
                  : _this$props3$componen2
            var style = {}

            if (isOverflowing) {
              style[rtl ? 'marginLeft' : 'marginRight'] =
                (0, _scrollbarSize.default)() + 'px'
            }

            var groupedEvents = resources.groupEvents(events)
            return _react.default.createElement(
              'div',
              {
                style: style,
                ref: scrollRef,
                className: (0, _classnames.default)(
                  'rbc-time-header',
                  isOverflowing && 'rbc-overflowing'
                ),
              },
              _react.default.createElement(
                'div',
                {
                  className: 'rbc-label rbc-time-header-gutter',
                  style: {
                    width: width,
                    minWidth: width,
                    maxWidth: width,
                  },
                },
                TimeGutterHeader &&
                  _react.default.createElement(TimeGutterHeader, null)
              ),
              resources.map(function(_ref, idx) {
                var id = _ref[0],
                  resource = _ref[1]
                return _react.default.createElement(
                  'div',
                  {
                    className: 'rbc-time-header-content',
                    key: id || idx,
                  },
                  resource &&
                    _react.default.createElement(
                      'div',
                      {
                        className: 'rbc-row rbc-row-resource',
                        key: 'resource_' + idx,
                      },
                      _react.default.createElement(
                        'div',
                        {
                          className: 'rbc-header',
                        },
                        _react.default.createElement(ResourceHeaderComponent, {
                          index: idx,
                          label: accessors.resourceTitle(resource),
                          resource: resource,
                        })
                      )
                    ),
                  _react.default.createElement(
                    'div',
                    {
                      className:
                        'rbc-row rbc-time-header-cell' +
                        (range.length <= 1
                          ? ' rbc-time-header-cell-single-day'
                          : ''),
                    },
                    _this3.renderHeaderCells(range)
                  ),
                  _react.default.createElement(_DateContentRow.default, {
                    isAllDay: true,
                    rtl: rtl,
                    getNow: getNow,
                    minRows: 2,
                    range: range,
                    events: groupedEvents.get(id) || [],
                    resourceId: resource && id,
                    className: 'rbc-allday-cell',
                    selectable: selectable,
                    selected: _this3.props.selected,
                    components: components,
                    accessors: accessors,
                    getters: getters,
                    localizer: localizer,
                    onSelect: _this3.props.onSelectEvent,
                    onDoubleClick: _this3.props.onDoubleClickEvent,
                    onSelectSlot: _this3.props.onSelectSlot,
                    longPressThreshold: _this3.props.longPressThreshold,
                  })
                )
              })
            )
          }

          return TimeGridHeader
        })(_react.default.Component)

      TimeGridHeader.propTypes = false ? undefined : {}
      var _default = TimeGridHeader
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 361: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var ResourceHeader = function ResourceHeader(_ref) {
        var label = _ref.label
        return _react.default.createElement(
          _react.default.Fragment,
          null,
          label
        )
      }

      ResourceHeader.propTypes = false ? undefined : {}
      var _default = ResourceHeader
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 362: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      exports.__esModule = true
      exports.default = Resources
      exports.NONE = void 0
      var NONE = {}
      exports.NONE = NONE

      function Resources(resources, accessors) {
        return {
          map: function map(fn) {
            if (!resources) return [fn([NONE, null], 0)]
            return resources.map(function(resource, idx) {
              return fn([accessors.resourceId(resource), resource], idx)
            })
          },
          groupEvents: function groupEvents(events) {
            var eventsByResource = new Map()

            if (!resources) {
              // Return all events if resources are not provided
              eventsByResource.set(NONE, events)
              return eventsByResource
            }

            events.forEach(function(event) {
              var id = accessors.resource(event) || NONE
              var resourceEvents = eventsByResource.get(id) || []
              resourceEvents.push(event)
              eventsByResource.set(id, resourceEvents)
            })
            return eventsByResource
          },
        }
      }

      /***/
    },

    /***/ 363: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var _objectWithoutPropertiesLoose2 = _interopRequireDefault(
        __webpack_require__(12)
      )

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _Week = _interopRequireDefault(__webpack_require__(173))

      var _TimeGrid = _interopRequireDefault(__webpack_require__(73))

      function workWeekRange(date, options) {
        return _Week.default.range(date, options).filter(function(d) {
          return [6, 0].indexOf(d.getDay()) === -1
        })
      }

      var WorkWeek =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(WorkWeek, _React$Component)

          function WorkWeek() {
            return _React$Component.apply(this, arguments) || this
          }

          var _proto = WorkWeek.prototype

          _proto.render = function render() {
            var _this$props = this.props,
              date = _this$props.date,
              props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, [
                'date',
              ])
            var range = workWeekRange(date, this.props)
            return _react.default.createElement(
              _TimeGrid.default,
              (0, _extends2.default)({}, props, {
                range: range,
                eventOffset: 15,
              })
            )
          }

          return WorkWeek
        })(_react.default.Component)

      WorkWeek.propTypes = false ? undefined : {}
      WorkWeek.defaultProps = _TimeGrid.default.defaultProps
      WorkWeek.range = workWeekRange
      WorkWeek.navigate = _Week.default.navigate

      WorkWeek.title = function(date, _ref) {
        var localizer = _ref.localizer

        var _workWeekRange = workWeekRange(date, {
            localizer: localizer,
          }),
          start = _workWeekRange[0],
          rest = _workWeekRange.slice(1)

        return localizer.format(
          {
            start: start,
            end: rest.pop(),
          },
          'dayRangeHeaderFormat'
        )
      }

      var _default = WorkWeek
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 364: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _class = _interopRequireDefault(__webpack_require__(365))

      var _width = _interopRequireDefault(__webpack_require__(171))

      var _scrollbarSize = _interopRequireDefault(__webpack_require__(172))

      var _dates = _interopRequireDefault(__webpack_require__(8))

      var _constants = __webpack_require__(16)

      var _eventLevels = __webpack_require__(39)

      var _selection = __webpack_require__(38)

      var Agenda =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(Agenda, _React$Component)

          function Agenda(props) {
            var _this

            _this = _React$Component.call(this, props) || this

            _this.renderDay = function(day, events, dayKey) {
              var _this$props = _this.props,
                selected = _this$props.selected,
                getters = _this$props.getters,
                accessors = _this$props.accessors,
                localizer = _this$props.localizer,
                _this$props$component = _this$props.components,
                Event = _this$props$component.event,
                AgendaDate = _this$props$component.date
              events = events.filter(function(e) {
                return (0,
                _eventLevels.inRange)(e, _dates.default.startOf(day, 'day'), _dates.default.endOf(day, 'day'), accessors)
              })
              return events.map(function(event, idx) {
                var title = accessors.title(event)
                var end = accessors.end(event)
                var start = accessors.start(event)
                var userProps = getters.eventProp(
                  event,
                  start,
                  end,
                  (0, _selection.isSelected)(event, selected)
                )
                var dateLabel =
                  idx === 0 && localizer.format(day, 'agendaDateFormat')
                var first =
                  idx === 0
                    ? _react.default.createElement(
                        'td',
                        {
                          rowSpan: events.length,
                          className: 'rbc-agenda-date-cell',
                        },
                        AgendaDate
                          ? _react.default.createElement(AgendaDate, {
                              day: day,
                              label: dateLabel,
                            })
                          : dateLabel
                      )
                    : false
                return _react.default.createElement(
                  'tr',
                  {
                    key: dayKey + '_' + idx,
                    className: userProps.className,
                    style: userProps.style,
                  },
                  first,
                  _react.default.createElement(
                    'td',
                    {
                      className: 'rbc-agenda-time-cell',
                    },
                    _this.timeRangeLabel(day, event)
                  ),
                  _react.default.createElement(
                    'td',
                    {
                      className: 'rbc-agenda-event-cell',
                    },
                    Event
                      ? _react.default.createElement(Event, {
                          event: event,
                          title: title,
                        })
                      : title
                  )
                )
              }, [])
            }

            _this.timeRangeLabel = function(day, event) {
              var _this$props2 = _this.props,
                accessors = _this$props2.accessors,
                localizer = _this$props2.localizer,
                components = _this$props2.components
              var labelClass = '',
                TimeComponent = components.time,
                label = localizer.messages.allDay
              var end = accessors.end(event)
              var start = accessors.start(event)

              if (!accessors.allDay(event)) {
                if (_dates.default.eq(start, end)) {
                  label = localizer.format(start, 'agendaTimeFormat')
                } else if (_dates.default.eq(start, end, 'day')) {
                  label = localizer.format(
                    {
                      start: start,
                      end: end,
                    },
                    'agendaTimeRangeFormat'
                  )
                } else if (_dates.default.eq(day, start, 'day')) {
                  label = localizer.format(start, 'agendaTimeFormat')
                } else if (_dates.default.eq(day, end, 'day')) {
                  label = localizer.format(end, 'agendaTimeFormat')
                }
              }

              if (_dates.default.gt(day, start, 'day'))
                labelClass = 'rbc-continues-prior'
              if (_dates.default.lt(day, end, 'day'))
                labelClass += ' rbc-continues-after'
              return _react.default.createElement(
                'span',
                {
                  className: labelClass.trim(),
                },
                TimeComponent
                  ? _react.default.createElement(TimeComponent, {
                      event: event,
                      day: day,
                      label: label,
                    })
                  : label
              )
            }

            _this._adjustHeader = function() {
              if (!_this.tbodyRef.current) return
              var header = _this.headerRef.current
              var firstRow = _this.tbodyRef.current.firstChild
              if (!firstRow) return
              var isOverflowing =
                _this.contentRef.current.scrollHeight >
                _this.contentRef.current.clientHeight
              var widths = _this._widths || []
              _this._widths = [
                (0, _width.default)(firstRow.children[0]),
                (0, _width.default)(firstRow.children[1]),
              ]

              if (
                widths[0] !== _this._widths[0] ||
                widths[1] !== _this._widths[1]
              ) {
                _this.dateColRef.current.style.width = _this._widths[0] + 'px'
                _this.timeColRef.current.style.width = _this._widths[1] + 'px'
              }

              if (isOverflowing) {
                _class.default.addClass(header, 'rbc-header-overflowing')

                header.style.marginRight = (0, _scrollbarSize.default)() + 'px'
              } else {
                _class.default.removeClass(header, 'rbc-header-overflowing')
              }
            }

            _this.headerRef = _react.default.createRef()
            _this.dateColRef = _react.default.createRef()
            _this.timeColRef = _react.default.createRef()
            _this.contentRef = _react.default.createRef()
            _this.tbodyRef = _react.default.createRef()
            return _this
          }

          var _proto = Agenda.prototype

          _proto.componentDidMount = function componentDidMount() {
            this._adjustHeader()
          }

          _proto.componentDidUpdate = function componentDidUpdate() {
            this._adjustHeader()
          }

          _proto.render = function render() {
            var _this2 = this

            var _this$props3 = this.props,
              length = _this$props3.length,
              date = _this$props3.date,
              events = _this$props3.events,
              accessors = _this$props3.accessors,
              localizer = _this$props3.localizer
            var messages = localizer.messages

            var end = _dates.default.add(date, length, 'day')

            var range = _dates.default.range(date, end, 'day')

            events = events.filter(function(event) {
              return (0, _eventLevels.inRange)(event, date, end, accessors)
            })
            events.sort(function(a, b) {
              return +accessors.start(a) - +accessors.start(b)
            })
            return _react.default.createElement(
              'div',
              {
                className: 'rbc-agenda-view',
              },
              events.length !== 0
                ? _react.default.createElement(
                    _react.default.Fragment,
                    null,
                    _react.default.createElement(
                      'table',
                      {
                        ref: this.headerRef,
                        className: 'rbc-agenda-table',
                      },
                      _react.default.createElement(
                        'thead',
                        null,
                        _react.default.createElement(
                          'tr',
                          null,
                          _react.default.createElement(
                            'th',
                            {
                              className: 'rbc-header',
                              ref: this.dateColRef,
                            },
                            messages.date
                          ),
                          _react.default.createElement(
                            'th',
                            {
                              className: 'rbc-header',
                              ref: this.timeColRef,
                            },
                            messages.time
                          ),
                          _react.default.createElement(
                            'th',
                            {
                              className: 'rbc-header',
                            },
                            messages.event
                          )
                        )
                      )
                    ),
                    _react.default.createElement(
                      'div',
                      {
                        className: 'rbc-agenda-content',
                        ref: this.contentRef,
                      },
                      _react.default.createElement(
                        'table',
                        {
                          className: 'rbc-agenda-table',
                        },
                        _react.default.createElement(
                          'tbody',
                          {
                            ref: this.tbodyRef,
                          },
                          range.map(function(day, idx) {
                            return _this2.renderDay(day, events, idx)
                          })
                        )
                      )
                    )
                  )
                : _react.default.createElement(
                    'span',
                    {
                      className: 'rbc-agenda-empty',
                    },
                    messages.noEventsInRange
                  )
            )
          }

          return Agenda
        })(_react.default.Component)

      Agenda.propTypes = false ? undefined : {}
      Agenda.defaultProps = {
        length: 30,
      }

      Agenda.range = function(start, _ref) {
        var _ref$length = _ref.length,
          length =
            _ref$length === void 0 ? Agenda.defaultProps.length : _ref$length

        var end = _dates.default.add(start, length, 'day')

        return {
          start: start,
          end: end,
        }
      }

      Agenda.navigate = function(date, action, _ref2) {
        var _ref2$length = _ref2.length,
          length =
            _ref2$length === void 0 ? Agenda.defaultProps.length : _ref2$length

        switch (action) {
          case _constants.navigate.PREVIOUS:
            return _dates.default.add(date, -length, 'day')

          case _constants.navigate.NEXT:
            return _dates.default.add(date, length, 'day')

          default:
            return date
        }
      }

      Agenda.title = function(start, _ref3) {
        var _ref3$length = _ref3.length,
          length =
            _ref3$length === void 0 ? Agenda.defaultProps.length : _ref3$length,
          localizer = _ref3.localizer

        var end = _dates.default.add(start, length, 'day')

        return localizer.format(
          {
            start: start,
            end: end,
          },
          'agendaHeaderFormat'
        )
      }

      var _default = Agenda
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 368: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _classnames = _interopRequireDefault(__webpack_require__(6))

      var _constants = __webpack_require__(16)

      var Toolbar =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(Toolbar, _React$Component)

          function Toolbar() {
            var _this

            for (
              var _len = arguments.length, args = new Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              args[_key] = arguments[_key]
            }

            _this =
              _React$Component.call.apply(
                _React$Component,
                [this].concat(args)
              ) || this

            _this.navigate = function(action) {
              _this.props.onNavigate(action)
            }

            _this.view = function(view) {
              _this.props.onView(view)
            }

            return _this
          }

          var _proto = Toolbar.prototype

          _proto.render = function render() {
            var _this$props = this.props,
              messages = _this$props.localizer.messages,
              label = _this$props.label
            return _react.default.createElement(
              'div',
              {
                className: 'rbc-toolbar',
              },
              _react.default.createElement(
                'span',
                {
                  className: 'rbc-btn-group',
                },
                _react.default.createElement(
                  'button',
                  {
                    type: 'button',
                    onClick: this.navigate.bind(
                      null,
                      _constants.navigate.TODAY
                    ),
                  },
                  messages.today
                ),
                _react.default.createElement(
                  'button',
                  {
                    type: 'button',
                    onClick: this.navigate.bind(
                      null,
                      _constants.navigate.PREVIOUS
                    ),
                  },
                  messages.previous
                ),
                _react.default.createElement(
                  'button',
                  {
                    type: 'button',
                    onClick: this.navigate.bind(null, _constants.navigate.NEXT),
                  },
                  messages.next
                )
              ),
              _react.default.createElement(
                'span',
                {
                  className: 'rbc-toolbar-label',
                },
                label
              ),
              _react.default.createElement(
                'span',
                {
                  className: 'rbc-btn-group',
                },
                this.viewNamesGroup(messages)
              )
            )
          }

          _proto.viewNamesGroup = function viewNamesGroup(messages) {
            var _this2 = this

            var viewNames = this.props.views
            var view = this.props.view

            if (viewNames.length > 1) {
              return viewNames.map(function(name) {
                return _react.default.createElement(
                  'button',
                  {
                    type: 'button',
                    key: name,
                    className: (0, _classnames.default)({
                      'rbc-active': view === name,
                    }),
                    onClick: _this2.view.bind(null, name),
                  },
                  messages[name]
                )
              })
            }
          }

          return Toolbar
        })(_react.default.Component)

      Toolbar.propTypes = false ? undefined : {}
      var _default = Toolbar
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 38: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      exports.__esModule = true
      exports.isSelected = isSelected
      exports.slotWidth = slotWidth
      exports.getSlotAtX = getSlotAtX
      exports.pointInBox = pointInBox
      exports.dateCellSelection = dateCellSelection

      function isSelected(event, selected) {
        if (!event || selected == null) return false
        return [].concat(selected).indexOf(event) !== -1
      }

      function slotWidth(rowBox, slots) {
        var rowWidth = rowBox.right - rowBox.left
        var cellWidth = rowWidth / slots
        return cellWidth
      }

      function getSlotAtX(rowBox, x, rtl, slots) {
        var cellWidth = slotWidth(rowBox, slots)
        return rtl
          ? slots - 1 - Math.floor((x - rowBox.left) / cellWidth)
          : Math.floor((x - rowBox.left) / cellWidth)
      }

      function pointInBox(box, _ref) {
        var x = _ref.x,
          y = _ref.y
        return (
          y >= box.top && y <= box.bottom && x >= box.left && x <= box.right
        )
      }

      function dateCellSelection(start, rowBox, box, slots, rtl) {
        var startIdx = -1
        var endIdx = -1
        var lastSlotIdx = slots - 1
        var cellWidth = slotWidth(rowBox, slots) // cell under the mouse

        var currentSlot = getSlotAtX(rowBox, box.x, rtl, slots) // Identify row as either the initial row
        // or the row under the current mouse point

        var isCurrentRow = rowBox.top < box.y && rowBox.bottom > box.y
        var isStartRow = rowBox.top < start.y && rowBox.bottom > start.y // this row's position relative to the start point

        var isAboveStart = start.y > rowBox.bottom
        var isBelowStart = rowBox.top > start.y
        var isBetween = box.top < rowBox.top && box.bottom > rowBox.bottom // this row is between the current and start rows, so entirely selected

        if (isBetween) {
          startIdx = 0
          endIdx = lastSlotIdx
        }

        if (isCurrentRow) {
          if (isBelowStart) {
            startIdx = 0
            endIdx = currentSlot
          } else if (isAboveStart) {
            startIdx = currentSlot
            endIdx = lastSlotIdx
          }
        }

        if (isStartRow) {
          // select the cell under the initial point
          startIdx = endIdx = rtl
            ? lastSlotIdx - Math.floor((start.x - rowBox.left) / cellWidth)
            : Math.floor((start.x - rowBox.left) / cellWidth)

          if (isCurrentRow) {
            if (currentSlot < startIdx) startIdx = currentSlot
            else endIdx = currentSlot //select current range
          } else if (start.y < box.y) {
            // the current row is below start row
            // select cells to the right of the start cell
            endIdx = lastSlotIdx
          } else {
            // select cells to the left of the start cell
            startIdx = 0
          }
        }

        return {
          startIdx: startIdx,
          endIdx: endIdx,
        }
      }

      /***/
    },

    /***/ 39: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.endOfRange = endOfRange
      exports.eventSegments = eventSegments
      exports.eventLevels = eventLevels
      exports.inRange = inRange
      exports.segsOverlap = segsOverlap
      exports.sortEvents = sortEvents

      var _findIndex = _interopRequireDefault(__webpack_require__(335))

      var _dates = _interopRequireDefault(__webpack_require__(8))

      function endOfRange(dateRange, unit) {
        if (unit === void 0) {
          unit = 'day'
        }

        return {
          first: dateRange[0],
          last: _dates.default.add(dateRange[dateRange.length - 1], 1, unit),
        }
      }

      function eventSegments(event, range, accessors) {
        var _endOfRange = endOfRange(range),
          first = _endOfRange.first,
          last = _endOfRange.last

        var slots = _dates.default.diff(first, last, 'day')

        var start = _dates.default.max(
          _dates.default.startOf(accessors.start(event), 'day'),
          first
        )

        var end = _dates.default.min(
          _dates.default.ceil(accessors.end(event), 'day'),
          last
        )

        var padding = (0, _findIndex.default)(range, function(x) {
          return _dates.default.eq(x, start, 'day')
        })

        var span = _dates.default.diff(start, end, 'day')

        span = Math.min(span, slots)
        span = Math.max(span, 1)
        return {
          event: event,
          span: span,
          left: padding + 1,
          right: Math.max(padding + span, 1),
        }
      }

      function eventLevels(rowSegments, limit) {
        if (limit === void 0) {
          limit = Infinity
        }

        var i,
          j,
          seg,
          levels = [],
          extra = []

        for (i = 0; i < rowSegments.length; i++) {
          seg = rowSegments[i]

          for (j = 0; j < levels.length; j++) {
            if (!segsOverlap(seg, levels[j])) break
          }

          if (j >= limit) {
            extra.push(seg)
          } else {
            ;(levels[j] || (levels[j] = [])).push(seg)
          }
        }

        for (i = 0; i < levels.length; i++) {
          levels[i].sort(function(a, b) {
            return a.left - b.left
          }) //eslint-disable-line
        }

        return {
          levels: levels,
          extra: extra,
        }
      }

      function inRange(e, start, end, accessors) {
        var eStart = _dates.default.startOf(accessors.start(e), 'day')

        var eEnd = accessors.end(e)

        var startsBeforeEnd = _dates.default.lte(eStart, end, 'day') // when the event is zero duration we need to handle a bit differently

        var endsAfterStart = !_dates.default.eq(eStart, eEnd, 'minutes')
          ? _dates.default.gt(eEnd, start, 'minutes')
          : _dates.default.gte(eEnd, start, 'minutes')
        return startsBeforeEnd && endsAfterStart
      }

      function segsOverlap(seg, otherSegs) {
        return otherSegs.some(function(otherSeg) {
          return otherSeg.left <= seg.right && otherSeg.right >= seg.left
        })
      }

      function sortEvents(evtA, evtB, accessors) {
        var startSort =
          +_dates.default.startOf(accessors.start(evtA), 'day') -
          +_dates.default.startOf(accessors.start(evtB), 'day')

        var durA = _dates.default.diff(
          accessors.start(evtA),
          _dates.default.ceil(accessors.end(evtA), 'day'),
          'day'
        )

        var durB = _dates.default.diff(
          accessors.start(evtB),
          _dates.default.ceil(accessors.end(evtB), 'day'),
          'day'
        )

        return (
          startSort || // sort by start Day first
          Math.max(durB, 1) - Math.max(durA, 1) || // events spanning multiple days go first
          !!accessors.allDay(evtB) - !!accessors.allDay(evtA) || // then allDay single day events
          +accessors.start(evtA) - +accessors.start(evtB)
        ) // then sort by start time
      }

      /***/
    },

    /***/ 399: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _NoopWrapper = _interopRequireDefault(__webpack_require__(74))

      var _default = _NoopWrapper.default
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 400: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = _default
      exports.formats = void 0

      var _dates = _interopRequireDefault(__webpack_require__(8))

      var _localizer = __webpack_require__(67)

      var dateRangeFormat = function dateRangeFormat(_ref, culture, local) {
        var start = _ref.start,
          end = _ref.end
        return (
          local.format(start, 'L', culture) +
          ' — ' +
          local.format(end, 'L', culture)
        )
      }

      var timeRangeFormat = function timeRangeFormat(_ref2, culture, local) {
        var start = _ref2.start,
          end = _ref2.end
        return (
          local.format(start, 'LT', culture) +
          ' — ' +
          local.format(end, 'LT', culture)
        )
      }

      var timeRangeStartFormat = function timeRangeStartFormat(
        _ref3,
        culture,
        local
      ) {
        var start = _ref3.start
        return local.format(start, 'LT', culture) + ' — '
      }

      var timeRangeEndFormat = function timeRangeEndFormat(
        _ref4,
        culture,
        local
      ) {
        var end = _ref4.end
        return ' — ' + local.format(end, 'LT', culture)
      }

      var weekRangeFormat = function weekRangeFormat(_ref5, culture, local) {
        var start = _ref5.start,
          end = _ref5.end
        return (
          local.format(start, 'MMMM DD', culture) +
          ' - ' +
          local.format(
            end,
            _dates.default.eq(start, end, 'month') ? 'DD' : 'MMMM DD',
            culture
          )
        )
      }

      var formats = {
        dateFormat: 'DD',
        dayFormat: 'DD ddd',
        weekdayFormat: 'ddd',
        selectRangeFormat: timeRangeFormat,
        eventTimeRangeFormat: timeRangeFormat,
        eventTimeRangeStartFormat: timeRangeStartFormat,
        eventTimeRangeEndFormat: timeRangeEndFormat,
        timeGutterFormat: 'LT',
        monthHeaderFormat: 'MMMM YYYY',
        dayHeaderFormat: 'dddd MMM DD',
        dayRangeHeaderFormat: weekRangeFormat,
        agendaHeaderFormat: dateRangeFormat,
        agendaDateFormat: 'ddd MMM DD',
        agendaTimeFormat: 'LT',
        agendaTimeRangeFormat: timeRangeFormat,
      }
      exports.formats = formats

      function _default(moment) {
        var locale = function locale(m, c) {
          return c ? m.locale(c) : m
        }

        return new _localizer.DateLocalizer({
          formats: formats,
          firstOfWeek: function firstOfWeek(culture) {
            var data = culture
              ? moment.localeData(culture)
              : moment.localeData()
            return data ? data.firstDayOfWeek() : 0
          },
          format: function format(value, _format, culture) {
            return locale(moment(value), culture).format(_format)
          },
        })
      }

      /***/
    },

    /***/ 401: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _reactBigCalendar = _interopRequireDefault(__webpack_require__(14))

      var _events = _interopRequireDefault(__webpack_require__(21))

      var _ExampleControlSlot = _interopRequireDefault(__webpack_require__(34))

      var propTypes = false ? undefined : {}

      var Selectable =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(Selectable, _React$Component)

          function Selectable() {
            var _this

            for (
              var _len = arguments.length, args = new Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              args[_key] = arguments[_key]
            }

            _this =
              _React$Component.call.apply(
                _React$Component,
                [this].concat(args)
              ) || this

            _this.handleSelect = function(_ref) {
              var start = _ref.start,
                end = _ref.end
              var title = window.prompt('New Event name')
              if (title)
                _this.setState({
                  events: [].concat(_this.state.events, [
                    {
                      start: start,
                      end: end,
                      title: title,
                    },
                  ]),
                })
            }

            _this.state = {
              events: _events.default,
            }
            return _this
          }

          var _proto = Selectable.prototype

          _proto.render = function render() {
            var localizer = this.props.localizer
            return _react.default.createElement(
              _react.default.Fragment,
              null,
              _react.default.createElement(
                _ExampleControlSlot.default.Entry,
                {
                  waitForOutlet: true,
                },
                _react.default.createElement(
                  'strong',
                  null,
                  'Click an event to see more info, or drag the mouse over the calendar to select a date/time range.'
                )
              ),
              _react.default.createElement(_reactBigCalendar.default, {
                selectable: true,
                localizer: localizer,
                events: this.state.events,
                defaultView: _reactBigCalendar.default.Views.WEEK,
                scrollToTime: new Date(1970, 1, 1, 6),
                defaultDate: new Date(2015, 3, 12),
                onSelectEvent: function onSelectEvent(event) {
                  return alert(event.title)
                },
                onSelectSlot: this.handleSelect,
              })
            )
          }

          return Selectable
        })(_react.default.Component)

      Selectable.propTypes = false ? undefined : {}
      var _default = Selectable
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 402: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _reactBigCalendar = _interopRequireDefault(__webpack_require__(14))

      var _events = _interopRequireDefault(__webpack_require__(21))

      var _Layout = _interopRequireDefault(__webpack_require__(101))

      var _ExampleControlSlot = _interopRequireDefault(__webpack_require__(34))

      __webpack_require__(403)

      __webpack_require__(404)

      __webpack_require__(405)

      __webpack_require__(406)

      var Cultures =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(Cultures, _React$Component)

          function Cultures() {
            var _this

            for (
              var _len = arguments.length, args = new Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              args[_key] = arguments[_key]
            }

            _this =
              _React$Component.call.apply(
                _React$Component,
                [this].concat(args)
              ) || this
            _this.state = {
              culture: 'fr',
            }
            return _this
          }

          var _proto = Cultures.prototype

          _proto.render = function render() {
            var _this2 = this

            var localizer = this.props.localizer
            var cultures = ['en', 'en-GB', 'es', 'fr', 'ar-AE']
            var rtl = this.state.culture === 'ar-AE'
            return _react.default.createElement(
              _react.default.Fragment,
              null,
              _react.default.createElement(
                _ExampleControlSlot.default.Entry,
                {
                  waitForOutlet: true,
                },
                _react.default.createElement(
                  _Layout.default,
                  {
                    direction: 'column',
                    align: 'center',
                  },
                  _react.default.createElement(
                    'label',
                    null,
                    'Select a Culture'
                  ),
                  ' ',
                  _react.default.createElement(
                    'select',
                    {
                      className: 'form-control',
                      style: {
                        width: 200,
                        display: 'inline-block',
                      },
                      defaultValue: 'fr',
                      onChange: function onChange(e) {
                        return _this2.setState({
                          culture: e.target.value,
                        })
                      },
                    },
                    cultures.map(function(c, idx) {
                      return _react.default.createElement(
                        'option',
                        {
                          key: idx,
                          value: c,
                        },
                        c
                      )
                    })
                  )
                )
              ),
              _react.default.createElement(_reactBigCalendar.default, {
                rtl: rtl,
                events: _events.default,
                culture: this.state.culture,
                defaultDate: new Date(2015, 3, 1),
                localizer: localizer,
              })
            )
          }

          return Cultures
        })(_react.default.Component)

      var _default = Cultures
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 407: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _reactBigCalendar = _interopRequireDefault(__webpack_require__(14))

      var _events = _interopRequireDefault(__webpack_require__(21))

      var _ExampleControlSlot = _interopRequireDefault(__webpack_require__(34))

      var Popup = function Popup(_ref) {
        var localizer = _ref.localizer
        return _react.default.createElement(
          _react.default.Fragment,
          null,
          _react.default.createElement(
            _ExampleControlSlot.default.Entry,
            {
              waitForOutlet: true,
            },
            _react.default.createElement(
              'strong',
              null,
              'Click the "+x more" link on any calendar day that cannot fit all the days events to see an inline popup of all the events.'
            )
          ),
          _react.default.createElement(_reactBigCalendar.default, {
            popup: true,
            events: _events.default,
            localizer: localizer,
            defaultDate: new Date(2015, 3, 1),
          })
        )
      }

      var _default = Popup
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 408: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _reactBigCalendar = _interopRequireDefault(__webpack_require__(14))

      var _events = _interopRequireDefault(__webpack_require__(21))

      function Event(_ref) {
        var event = _ref.event
        return _react.default.createElement(
          'span',
          null,
          _react.default.createElement('strong', null, event.title),
          event.desc && ':  ' + event.desc
        )
      }

      function EventAgenda(_ref2) {
        var event = _ref2.event
        return _react.default.createElement(
          'span',
          null,
          _react.default.createElement(
            'em',
            {
              style: {
                color: 'magenta',
              },
            },
            event.title
          ),
          _react.default.createElement('p', null, event.desc)
        )
      }

      var customDayPropGetter = function customDayPropGetter(date) {
        if (date.getDate() === 7 || date.getDate() === 15)
          return {
            className: 'special-day',
            style: {
              border: 'solid 3px ' + (date.getDate() === 7 ? '#faa' : '#afa'),
            },
          }
        else return {}
      }

      var customSlotPropGetter = function customSlotPropGetter(date) {
        if (date.getDate() === 7 || date.getDate() === 15)
          return {
            className: 'special-day',
          }
        else return {}
      }

      var Rendering = function Rendering(_ref3) {
        var localizer = _ref3.localizer
        return _react.default.createElement(_reactBigCalendar.default, {
          events: _events.default,
          localizer: localizer,
          defaultDate: new Date(2015, 3, 1),
          defaultView: _reactBigCalendar.default.Views.AGENDA,
          dayPropGetter: customDayPropGetter,
          slotPropGetter: customSlotPropGetter,
          components: {
            event: Event,
            agenda: {
              event: EventAgenda,
            },
          },
        })
      }

      var _default = Rendering
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 409: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _dateArithmetic = _interopRequireDefault(__webpack_require__(140))

      var _events = _interopRequireDefault(__webpack_require__(21))

      var _reactBigCalendar = _interopRequireDefault(__webpack_require__(14))

      var _TimeGrid = _interopRequireDefault(__webpack_require__(73))

      var _ExampleControlSlot = _interopRequireDefault(__webpack_require__(34))

      var MyWeek =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(MyWeek, _React$Component)

          function MyWeek() {
            return _React$Component.apply(this, arguments) || this
          }

          var _proto = MyWeek.prototype

          _proto.render = function render() {
            var date = this.props.date
            var range = MyWeek.range(date)
            return _react.default.createElement(
              _TimeGrid.default,
              (0, _extends2.default)({}, this.props, {
                range: range,
                eventOffset: 15,
              })
            )
          }

          return MyWeek
        })(_react.default.Component)

      MyWeek.range = function(date) {
        var start = date

        var end = _dateArithmetic.default.add(start, 2, 'day')

        var current = start
        var range = []

        while (_dateArithmetic.default.lte(current, end, 'day')) {
          range.push(current)
          current = _dateArithmetic.default.add(current, 1, 'day')
        }

        return range
      }

      MyWeek.navigate = function(date, action) {
        switch (action) {
          case _reactBigCalendar.default.Navigate.PREVIOUS:
            return _dateArithmetic.default.add(date, -3, 'day')

          case _reactBigCalendar.default.Navigate.NEXT:
            return _dateArithmetic.default.add(date, 3, 'day')

          default:
            return date
        }
      }

      MyWeek.title = function(date) {
        return 'My awesome week: ' + date.toLocaleDateString()
      }

      var CustomView = function CustomView(_ref) {
        var localizer = _ref.localizer
        return _react.default.createElement(
          _react.default.Fragment,
          null,
          _react.default.createElement(
            _ExampleControlSlot.default.Entry,
            {
              waitForOutlet: true,
            },
            _react.default.createElement(
              'strong',
              null,
              'The Calendar below implments a custom 3-day week view'
            )
          ),
          _react.default.createElement(_reactBigCalendar.default, {
            events: _events.default,
            localizer: localizer,
            defaultView: _reactBigCalendar.default.Views.WEEK,
            defaultDate: new Date(2015, 3, 1),
            views: {
              month: true,
              week: MyWeek,
            },
          })
        )
      }

      var _default = CustomView
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 410: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _reactBigCalendar = _interopRequireDefault(__webpack_require__(14))

      var _ExampleControlSlot = _interopRequireDefault(__webpack_require__(34))

      var events = [
        {
          id: 0,
          title: 'Board meeting',
          start: new Date(2018, 0, 29, 9, 0, 0),
          end: new Date(2018, 0, 29, 13, 0, 0),
          resourceId: 1,
        },
        {
          id: 1,
          title: 'MS training',
          allDay: true,
          start: new Date(2018, 0, 29, 14, 0, 0),
          end: new Date(2018, 0, 29, 16, 30, 0),
          resourceId: 2,
        },
        {
          id: 2,
          title: 'Team lead meeting',
          start: new Date(2018, 0, 29, 8, 30, 0),
          end: new Date(2018, 0, 29, 12, 30, 0),
          resourceId: 3,
        },
        {
          id: 11,
          title: 'Birthday Party',
          start: new Date(2018, 0, 30, 7, 0, 0),
          end: new Date(2018, 0, 30, 10, 30, 0),
          resourceId: 4,
        },
      ]
      var resourceMap = [
        {
          resourceId: 1,
          resourceTitle: 'Board room',
        },
        {
          resourceId: 2,
          resourceTitle: 'Training room',
        },
        {
          resourceId: 3,
          resourceTitle: 'Meeting room 1',
        },
        {
          resourceId: 4,
          resourceTitle: 'Meeting room 2',
        },
      ]

      var Resource = function Resource(_ref) {
        var localizer = _ref.localizer
        return _react.default.createElement(
          _react.default.Fragment,
          null,
          _react.default.createElement(_reactBigCalendar.default, {
            events: events,
            localizer: localizer,
            defaultView: _reactBigCalendar.default.Views.DAY,
            views: ['day', 'work_week'],
            step: 60,
            defaultDate: new Date(2018, 0, 29),
            resources: resourceMap,
            resourceIdAccessor: 'resourceId',
            resourceTitleAccessor: 'resourceTitle',
          })
        )
      }

      var _default = Resource
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 411: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var _assertThisInitialized2 = _interopRequireDefault(
        __webpack_require__(3)
      )

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _reactBigCalendar = _interopRequireDefault(__webpack_require__(14))

      var _dragAndDrop = _interopRequireDefault(__webpack_require__(111))

      __webpack_require__(113)

      var DragAndDropCalendar = (0, _dragAndDrop.default)(
        _reactBigCalendar.default
      )
      var events = [
        {
          id: 0,
          title: 'Board meeting',
          start: new Date(2018, 0, 29, 9, 0, 0),
          end: new Date(2018, 0, 29, 13, 0, 0),
          resourceId: 1,
        },
        {
          id: 1,
          title: 'MS training',
          start: new Date(2018, 0, 29, 14, 0, 0),
          end: new Date(2018, 0, 29, 16, 30, 0),
          resourceId: 2,
        },
        {
          id: 2,
          title: 'Team lead meeting',
          start: new Date(2018, 0, 29, 8, 30, 0),
          end: new Date(2018, 0, 29, 12, 30, 0),
          resourceId: 3,
        },
        {
          id: 11,
          title: 'Birthday Party',
          start: new Date(2018, 0, 30, 7, 0, 0),
          end: new Date(2018, 0, 30, 10, 30, 0),
          resourceId: 4,
        },
      ]
      var resourceMap = [
        {
          resourceId: 1,
          resourceTitle: 'Board room',
        },
        {
          resourceId: 2,
          resourceTitle: 'Training room',
        },
        {
          resourceId: 3,
          resourceTitle: 'Meeting room 1',
        },
        {
          resourceId: 4,
          resourceTitle: 'Meeting room 2',
        },
      ]

      var Dnd =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(Dnd, _React$Component)

          function Dnd(props) {
            var _this

            _this = _React$Component.call(this, props) || this

            _this.resizeEvent = function(resizeType, _ref) {
              var event = _ref.event,
                start = _ref.start,
                end = _ref.end
              var events = _this.state.events
              var nextEvents = events.map(function(existingEvent) {
                return existingEvent.id == event.id
                  ? (0, _extends2.default)({}, existingEvent, {
                      start: start,
                      end: end,
                    })
                  : existingEvent
              })

              _this.setState({
                events: nextEvents,
              })
            }

            _this.state = {
              events: events,
            }
            _this.moveEvent = _this.moveEvent.bind(
              (0, _assertThisInitialized2.default)(_this)
            )
            return _this
          }

          var _proto = Dnd.prototype

          _proto.moveEvent = function moveEvent(_ref2) {
            var event = _ref2.event,
              start = _ref2.start,
              end = _ref2.end,
              resourceId = _ref2.resourceId,
              droppedOnAllDaySlot = _ref2.isAllDay
            var events = this.state.events
            var idx = events.indexOf(event)
            var allDay = event.allDay

            if (!event.allDay && droppedOnAllDaySlot) {
              allDay = true
            } else if (event.allDay && !droppedOnAllDaySlot) {
              allDay = false
            }

            var updatedEvent = (0, _extends2.default)({}, event, {
              start: start,
              end: end,
              resourceId: resourceId,
              allDay: allDay,
            })
            var nextEvents = [].concat(events)
            nextEvents.splice(idx, 1, updatedEvent)
            this.setState({
              events: nextEvents,
            })
          }

          _proto.render = function render() {
            return _react.default.createElement(DragAndDropCalendar, {
              selectable: true,
              localizer: this.props.localizer,
              events: this.state.events,
              onEventDrop: this.moveEvent,
              resizable: true,
              resources: resourceMap,
              resourceIdAccessor: 'resourceId',
              resourceTitleAccessor: 'resourceTitle',
              onEventResize: this.resizeEvent,
              defaultView: 'day',
              defaultDate: new Date(2018, 0, 29),
            })
          }

          return Dnd
        })(_react.default.Component)

      var _default = Dnd
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 412: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = withDragAndDrop

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var _objectWithoutPropertiesLoose2 = _interopRequireDefault(
        __webpack_require__(12)
      )

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _classnames = _interopRequireDefault(__webpack_require__(6))

      var _propTypes2 = __webpack_require__(102)

      var _EventWrapper = _interopRequireDefault(__webpack_require__(413))

      var _EventContainerWrapper = _interopRequireDefault(
        __webpack_require__(414)
      )

      var _WeekWrapper = _interopRequireDefault(__webpack_require__(415))

      var _common = __webpack_require__(112)

      /**
       * Creates a higher-order component (HOC) supporting drag & drop and optionally resizing
       * of events:
       *
       * ```js
       *    import Calendar from 'react-big-calendar'
       *    import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
       *    export default withDragAndDrop(Calendar)
       * ```
       * (you can optionally pass any dnd backend as an optional second argument to `withDragAndDrop`.
       * It defaults to `react-dnd-html5-backend` which you should probably include in
       * your project if using this default).
       *
       * Set `resizable` to true in your calendar if you want events to be resizable.
       *
       * The HOC adds `onEventDrop`, `onEventResize`, and `onDragStart` callback properties if the events are
       * moved or resized. These callbacks are called with these signatures:
       *
       * ```js
       *    function onEventDrop({ event, start, end, allDay }) {...}
       *    function onEventResize(type, { event, start, end, allDay }) {...}  // type is always 'drop'
       *    function onDragStart({ event, action, direction }) {...}
       * ```
       *
       * Moving and resizing of events has some subtlety which one should be aware of.
       *
       * In some situations, non-allDay events are displayed in "row" format where they
       * are rendered horizontally. This is the case for ALL events in a month view. It
       * is also occurs with multi-day events in a day or week view (unless `showMultiDayTimes`
       * is set).
       *
       * When dropping or resizing non-allDay events into a the header area or when
       * resizing them horizontally because they are displayed in row format, their
       * times are preserved, only their date is changed.
       *
       * If you care about these corner cases, you can examine the `allDay` param suppled
       * in the callback to determine how the user dropped or resized the event.
       *
       * Additionally, this HOC adds the callback props `onDropFromOutside` and `onDragOver`.
       * By default, the calendar will not respond to outside draggable items being dropped
       * onto it. However, if `onDropFromOutside` callback is passed, then when draggable
       * DOM elements are dropped on the calendar, the callback will fire, receiving an
       * object with start and end times, and an allDay boolean.
       *
       * If `onDropFromOutside` is passed, but `onDragOver` is not, any draggable event will be
       * droppable  onto the calendar by default. On the other hand, if an `onDragOver` callback
       * *is* passed, then it can discriminate as to whether a draggable item is droppable on the
       * calendar. To designate a draggable item as droppable, call `event.preventDefault`
       * inside `onDragOver`. If `event.preventDefault` is not called in the `onDragOver`
       * callback, then the draggable item will not be droppable on the calendar.
       *
       * * ```js
       *    function onDropFromOutside({ start, end, allDay }) {...}
       *    function onDragOver(DragEvent: event) {...}
       * ```
       * @param {*} Calendar
       * @param {*} backend
       */
      function withDragAndDrop(Calendar) {
        var DragAndDropCalendar =
          /*#__PURE__*/
          (function(_React$Component) {
            ;(0, _inheritsLoose2.default)(DragAndDropCalendar, _React$Component)

            function DragAndDropCalendar() {
              var _this

              for (
                var _len = arguments.length, args = new Array(_len), _key = 0;
                _key < _len;
                _key++
              ) {
                args[_key] = arguments[_key]
              }

              _this =
                _React$Component.call.apply(
                  _React$Component,
                  [this].concat(args)
                ) || this

              _this.defaultOnDragOver = function(event) {
                event.preventDefault()
              }

              _this.handleBeginAction = function(event, action, direction) {
                var onDragStart = _this.props.onDragStart

                _this.setState({
                  event: event,
                  action: action,
                  direction: direction,
                })

                if (onDragStart) {
                  onDragStart({
                    event: event,
                    action: action,
                    direction: direction,
                  })
                }
              }

              _this.handleInteractionStart = function() {
                if (_this.state.interacting === false)
                  _this.setState({
                    interacting: true,
                  })
              }

              _this.handleInteractionEnd = function(interactionInfo) {
                var _this$state = _this.state,
                  action = _this$state.action,
                  event = _this$state.event
                if (!action) return

                _this.setState({
                  action: null,
                  event: null,
                  interacting: false,
                  direction: null,
                })

                if (interactionInfo == null) return
                interactionInfo.event = event
                if (action === 'move') _this.props.onEventDrop(interactionInfo)
                if (action === 'resize')
                  _this.props.onEventResize(interactionInfo)
              }

              var components = _this.props.components
              _this.components = (0, _common.mergeComponents)(components, {
                eventWrapper: _EventWrapper.default,
                eventContainerWrapper: _EventContainerWrapper.default,
                weekWrapper: _WeekWrapper.default,
              })
              _this.state = {
                interacting: false,
              }
              return _this
            }

            var _proto = DragAndDropCalendar.prototype

            _proto.getChildContext = function getChildContext() {
              return {
                draggable: {
                  onStart: this.handleInteractionStart,
                  onEnd: this.handleInteractionEnd,
                  onBeginAction: this.handleBeginAction,
                  onDropFromOutside: this.props.onDropFromOutside,
                  draggableAccessor: this.props.draggableAccessor,
                  resizableAccessor: this.props.resizableAccessor,
                  dragAndDropAction: this.state,
                },
              }
            }

            _proto.render = function render() {
              var _this$props = this.props,
                selectable = _this$props.selectable,
                elementProps = _this$props.elementProps,
                props = (0, _objectWithoutPropertiesLoose2.default)(
                  _this$props,
                  ['selectable', 'elementProps']
                )
              var interacting = this.state.interacting
              delete props.onEventDrop
              delete props.onEventResize
              props.selectable = selectable ? 'ignoreEvents' : false
              var elementPropsWithDropFromOutside = this.props.onDropFromOutside
                ? (0, _extends2.default)({}, elementProps, {
                    onDragOver: this.props.onDragOver || this.defaultOnDragOver,
                  })
                : elementProps
              props.className = (0, _classnames.default)(
                props.className,
                'rbc-addons-dnd',
                !!interacting && 'rbc-addons-dnd-is-dragging'
              )
              return _react.default.createElement(
                Calendar,
                (0, _extends2.default)({}, props, {
                  elementProps: elementPropsWithDropFromOutside,
                  components: this.components,
                })
              )
            }

            return DragAndDropCalendar
          })(_react.default.Component)

        DragAndDropCalendar.defaultProps = {
          // TODO: pick these up from Calendar.defaultProps
          components: {},
          draggableAccessor: null,
          resizableAccessor: null,
          step: 30,
        }
        DragAndDropCalendar.contextTypes = {
          dragDropManager: _propTypes.default.object,
        }
        DragAndDropCalendar.childContextTypes = {
          draggable: _propTypes.default.shape({
            onStart: _propTypes.default.func,
            onEnd: _propTypes.default.func,
            onBeginAction: _propTypes.default.func,
            onDropFromOutside: _propTypes.default.fun,
            draggableAccessor: _propTypes2.accessor,
            resizableAccessor: _propTypes2.accessor,
            dragAndDropAction: _propTypes.default.object,
          }),
        }
        DragAndDropCalendar.propTypes = false ? undefined : {}
        return DragAndDropCalendar
      }

      module.exports = exports['default']

      /***/
    },

    /***/ 413: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _classnames = _interopRequireDefault(__webpack_require__(6))

      var _propTypes2 = __webpack_require__(102)

      var _accessors = __webpack_require__(110)

      var EventWrapper =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(EventWrapper, _React$Component)

          function EventWrapper() {
            var _this

            for (
              var _len = arguments.length, args = new Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              args[_key] = arguments[_key]
            }

            _this =
              _React$Component.call.apply(
                _React$Component,
                [this].concat(args)
              ) || this

            _this.handleResizeUp = function(e) {
              if (e.button !== 0) return
              e.stopPropagation()

              _this.context.draggable.onBeginAction(
                _this.props.event,
                'resize',
                'UP'
              )
            }

            _this.handleResizeDown = function(e) {
              if (e.button !== 0) return
              e.stopPropagation()

              _this.context.draggable.onBeginAction(
                _this.props.event,
                'resize',
                'DOWN'
              )
            }

            _this.handleResizeLeft = function(e) {
              if (e.button !== 0) return
              e.stopPropagation()

              _this.context.draggable.onBeginAction(
                _this.props.event,
                'resize',
                'LEFT'
              )
            }

            _this.handleResizeRight = function(e) {
              if (e.button !== 0) return
              e.stopPropagation()

              _this.context.draggable.onBeginAction(
                _this.props.event,
                'resize',
                'RIGHT'
              )
            }

            _this.handleStartDragging = function(e) {
              if (e.button === 0) {
                _this.context.draggable.onBeginAction(_this.props.event, 'move')
              }
            }

            return _this
          }

          var _proto = EventWrapper.prototype

          _proto.renderAnchor = function renderAnchor(direction) {
            var cls = direction === 'Up' || direction === 'Down' ? 'ns' : 'ew'
            return _react.default.createElement(
              'div',
              {
                className: 'rbc-addons-dnd-resize-' + cls + '-anchor',
                onMouseDown: this['handleResize' + direction],
              },
              _react.default.createElement('div', {
                className: 'rbc-addons-dnd-resize-' + cls + '-icon',
              })
            )
          }

          _proto.render = function render() {
            var _this$props = this.props,
              event = _this$props.event,
              type = _this$props.type,
              continuesPrior = _this$props.continuesPrior,
              continuesAfter = _this$props.continuesAfter
            var children = this.props.children
            if (event.__isPreview)
              return _react.default.cloneElement(children, {
                className: (0, _classnames.default)(
                  children.props.className,
                  'rbc-addons-dnd-drag-preview'
                ),
              })
            var draggable = this.context.draggable
            var draggableAccessor = draggable.draggableAccessor,
              resizableAccessor = draggable.resizableAccessor
            var isDraggable = draggableAccessor
              ? !!(0, _accessors.accessor)(event, draggableAccessor)
              : true
            /* Event is not draggable, no need to wrap it */

            if (!isDraggable) {
              return children
            }
            /*
             * The resizability of events depends on whether they are
             * allDay events and how they are displayed.
             *
             * 1. If the event is being shown in an event row (because
             * it is an allDay event shown in the header row or because as
             * in month view the view is showing all events as rows) then we
             * allow east-west resizing.
             *
             * 2. Otherwise the event is being displayed
             * normally, we can drag it north-south to resize the times.
             *
             * See `DropWrappers` for handling of the drop of such events.
             *
             * Notwithstanding the above, we never show drag anchors for
             * events which continue beyond current component. This happens
             * in the middle of events when showMultiDay is true, and to
             * events at the edges of the calendar's min/max location.
             */

            var isResizable = resizableAccessor
              ? !!(0, _accessors.accessor)(event, resizableAccessor)
              : true

            if (isResizable || isDraggable) {
              /*
               * props.children is the singular <Event> component.
               * BigCalendar positions the Event abolutely and we
               * need the anchors to be part of that positioning.
               * So we insert the anchors inside the Event's children
               * rather than wrap the Event here as the latter approach
               * would lose the positioning.
               */
              var newProps = {
                onMouseDown: this.handleStartDragging,
                onTouchStart: this.handleStartDragging,
              }

              if (isResizable) {
                // replace original event child with anchor-embellished child
                var StartAnchor = null
                var EndAnchor = null

                if (type === 'date') {
                  StartAnchor = !continuesPrior && this.renderAnchor('Left')
                  EndAnchor = !continuesAfter && this.renderAnchor('Right')
                } else {
                  StartAnchor = !continuesPrior && this.renderAnchor('Up')
                  EndAnchor = !continuesAfter && this.renderAnchor('Down')
                }

                newProps.children = _react.default.createElement(
                  'div',
                  {
                    className: 'rbc-addons-dnd-resizable',
                  },
                  StartAnchor,
                  children.props.children,
                  EndAnchor
                )
              }

              if (
                draggable.dragAndDropAction.interacting && // if an event is being dragged right now
                draggable.dragAndDropAction.event === event // and it's the current event
              ) {
                // add a new class to it
                newProps.className = (0, _classnames.default)(
                  children.props.className,
                  'rbc-addons-dnd-dragged-event'
                )
              }

              children = _react.default.cloneElement(children, newProps)
            }

            return children
          }

          return EventWrapper
        })(_react.default.Component)

      EventWrapper.contextTypes = {
        draggable: _propTypes.default.shape({
          onStart: _propTypes.default.func,
          onEnd: _propTypes.default.func,
          onBeginAction: _propTypes.default.func,
          draggableAccessor: _propTypes2.accessor,
          resizableAccessor: _propTypes2.accessor,
          dragAndDropAction: _propTypes.default.object,
        }),
      }
      EventWrapper.propTypes = false ? undefined : {}
      var _default = EventWrapper
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 414: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireWildcard = __webpack_require__(20)

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var _assertThisInitialized2 = _interopRequireDefault(
        __webpack_require__(3)
      )

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _dates = _interopRequireDefault(__webpack_require__(8))

      var _reactDom = __webpack_require__(9)

      var _Selection = _interopRequireWildcard(__webpack_require__(72))

      var _TimeGridEvent = _interopRequireDefault(__webpack_require__(170))

      var _common = __webpack_require__(112)

      var _NoopWrapper = _interopRequireDefault(__webpack_require__(74))

      var pointInColumn = function pointInColumn(bounds, _ref) {
        var x = _ref.x,
          y = _ref.y
        var left = bounds.left,
          right = bounds.right,
          top = bounds.top
        return x < right + 10 && x > left && y > top
      }

      var propTypes = false ? undefined : {}

      var EventContainerWrapper =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(EventContainerWrapper, _React$Component)

          function EventContainerWrapper() {
            var _this

            for (
              var _len = arguments.length, args = new Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              args[_key] = arguments[_key]
            }

            _this =
              _React$Component.call.apply(
                _React$Component,
                [this].concat(args)
              ) || this

            _this.handleMove = function(point, boundaryBox) {
              var event = _this.context.draggable.dragAndDropAction.event
              var _this$props = _this.props,
                accessors = _this$props.accessors,
                slotMetrics = _this$props.slotMetrics

              if (!pointInColumn(boundaryBox, point)) {
                _this.reset()

                return
              }

              var currentSlot = slotMetrics.closestSlotFromPoint(
                {
                  y: point.y - _this.eventOffsetTop,
                  x: point.x,
                },
                boundaryBox
              )
              var eventStart = accessors.start(event)
              var eventEnd = accessors.end(event)

              var end = _dates.default.add(
                currentSlot,
                _dates.default.diff(eventStart, eventEnd, 'minutes'),
                'minutes'
              )

              _this.update(event, slotMetrics.getRange(currentSlot, end))
            }

            _this.handleDropFromOutside = function(point, boundaryBox) {
              var slotMetrics = _this.props.slotMetrics
              var start = slotMetrics.closestSlotFromPoint(
                {
                  y: point.y,
                  x: point.x,
                },
                boundaryBox
              )

              _this.context.draggable.onDropFromOutside({
                start: start,
                end: slotMetrics.nextSlot(start),
                allDay: false,
              })
            }

            _this._selectable = function() {
              var node = (0, _reactDom.findDOMNode)(
                (0, _assertThisInitialized2.default)(_this)
              )
              var selector = (_this._selector = new _Selection.default(
                function() {
                  return node.closest('.rbc-time-view')
                }
              ))
              selector.on('beforeSelect', function(point) {
                var dragAndDropAction =
                  _this.context.draggable.dragAndDropAction
                if (!dragAndDropAction.action) return false

                if (dragAndDropAction.action === 'resize') {
                  return pointInColumn(
                    (0, _Selection.getBoundsForNode)(node),
                    point
                  )
                }

                var eventNode = (0, _Selection.getEventNodeFromPoint)(
                  node,
                  point
                )
                if (!eventNode) return false
                _this.eventOffsetTop =
                  point.y - (0, _Selection.getBoundsForNode)(eventNode).top
              })
              selector.on('selecting', function(box) {
                var bounds = (0, _Selection.getBoundsForNode)(node)
                var dragAndDropAction =
                  _this.context.draggable.dragAndDropAction
                if (dragAndDropAction.action === 'move')
                  _this.handleMove(box, bounds)
                if (dragAndDropAction.action === 'resize')
                  _this.handleResize(box, bounds)
              })
              selector.on('dropFromOutside', function(point) {
                if (!_this.context.draggable.onDropFromOutside) return
                var bounds = (0, _Selection.getBoundsForNode)(node)
                if (!pointInColumn(bounds, point)) return

                _this.handleDropFromOutside(point, bounds)
              })
              selector.on('selectStart', function() {
                return _this.context.draggable.onStart()
              })
              selector.on('select', function(point) {
                var bounds = (0, _Selection.getBoundsForNode)(node)
                if (!_this.state.event || !pointInColumn(bounds, point)) return

                _this.handleInteractionEnd()
              })
              selector.on('click', function() {
                return _this.context.draggable.onEnd(null)
              })
              selector.on('reset', function() {
                _this.reset()

                _this.context.draggable.onEnd(null)
              })
            }

            _this.handleInteractionEnd = function() {
              var resource = _this.props.resource
              var event = _this.state.event

              _this.reset()

              _this.context.draggable.onEnd({
                start: event.start,
                end: event.end,
                resourceId: resource,
              })
            }

            _this._teardownSelectable = function() {
              if (!_this._selector) return

              _this._selector.teardown()

              _this._selector = null
            }

            _this.state = {}
            return _this
          }

          var _proto = EventContainerWrapper.prototype

          _proto.componentDidMount = function componentDidMount() {
            this._selectable()
          }

          _proto.componentWillUnmount = function componentWillUnmount() {
            this._teardownSelectable()
          }

          _proto.reset = function reset() {
            if (this.state.event)
              this.setState({
                event: null,
                top: null,
                height: null,
              })
          }

          _proto.update = function update(event, _ref2) {
            var startDate = _ref2.startDate,
              endDate = _ref2.endDate,
              top = _ref2.top,
              height = _ref2.height
            var lastEvent = this.state.event

            if (
              lastEvent &&
              startDate === lastEvent.start &&
              endDate === lastEvent.end
            ) {
              return
            }

            this.setState({
              top: top,
              height: height,
              event: (0, _extends2.default)({}, event, {
                start: startDate,
                end: endDate,
              }),
            })
          }

          _proto.handleResize = function handleResize(point, boundaryBox) {
            var start, end
            var _this$props2 = this.props,
              accessors = _this$props2.accessors,
              slotMetrics = _this$props2.slotMetrics
            var _this$context$draggab = this.context.draggable
                .dragAndDropAction,
              event = _this$context$draggab.event,
              direction = _this$context$draggab.direction
            var currentSlot = slotMetrics.closestSlotFromPoint(
              point,
              boundaryBox
            )

            if (direction === 'UP') {
              end = accessors.end(event)
              start = _dates.default.min(
                currentSlot,
                slotMetrics.closestSlotFromDate(end, -1)
              )
            } else if (direction === 'DOWN') {
              start = accessors.start(event)
              end = _dates.default.max(
                currentSlot,
                slotMetrics.closestSlotFromDate(start)
              )
            }

            this.update(event, slotMetrics.getRange(start, end))
          }

          _proto.render = function render() {
            var _this$props3 = this.props,
              children = _this$props3.children,
              accessors = _this$props3.accessors,
              components = _this$props3.components,
              getters = _this$props3.getters,
              slotMetrics = _this$props3.slotMetrics,
              localizer = _this$props3.localizer
            var _this$state = this.state,
              event = _this$state.event,
              top = _this$state.top,
              height = _this$state.height
            if (!event) return children
            var events = children.props.children
            var start = event.start,
              end = event.end
            var label
            var format = 'eventTimeRangeFormat'
            var startsBeforeDay = slotMetrics.startsBeforeDay(start)
            var startsAfterDay = slotMetrics.startsAfterDay(end)
            if (startsBeforeDay) format = 'eventTimeRangeEndFormat'
            else if (startsAfterDay) format = 'eventTimeRangeStartFormat'
            if (startsBeforeDay && startsAfterDay)
              label = localizer.messages.allDay
            else
              label = localizer.format(
                {
                  start: start,
                  end: end,
                },
                format
              )
            return _react.default.cloneElement(children, {
              children: _react.default.createElement(
                _react.default.Fragment,
                null,
                events,
                event &&
                  _react.default.createElement(_TimeGridEvent.default, {
                    event: event,
                    label: label,
                    className: 'rbc-addons-dnd-drag-preview',
                    style: {
                      top: top,
                      height: height,
                      width: 100,
                    },
                    getters: getters,
                    components: (0, _extends2.default)({}, components, {
                      eventWrapper: _NoopWrapper.default,
                    }),
                    accessors: (0, _extends2.default)(
                      {},
                      accessors,
                      _common.dragAccessors
                    ),
                    continuesEarlier: startsBeforeDay,
                    continuesLater: startsAfterDay,
                  })
              ),
            })
          }

          return EventContainerWrapper
        })(_react.default.Component)

      EventContainerWrapper.contextTypes = {
        draggable: _propTypes.default.shape({
          onStart: _propTypes.default.func,
          onEnd: _propTypes.default.func,
          onDropFromOutside: _propTypes.default.func,
          onBeginAction: _propTypes.default.func,
          dragAndDropAction: _propTypes.default.object,
        }),
      }
      EventContainerWrapper.propTypes = false ? undefined : {}
      EventContainerWrapper.propTypes = false ? undefined : {}
      var _default = EventContainerWrapper
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 415: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireWildcard = __webpack_require__(20)

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var _assertThisInitialized2 = _interopRequireDefault(
        __webpack_require__(3)
      )

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _dates = _interopRequireDefault(__webpack_require__(8))

      var _selection = __webpack_require__(38)

      var _reactDom = __webpack_require__(9)

      var _eventLevels = __webpack_require__(39)

      var _Selection = _interopRequireWildcard(__webpack_require__(72))

      var _EventRow = _interopRequireDefault(__webpack_require__(158))

      var _common = __webpack_require__(112)

      var propTypes = false ? undefined : {}

      var eventTimes = function eventTimes(event, accessors) {
        var start = accessors.start(event)
        var end = accessors.end(event)
        var isZeroDuration =
          _dates.default.eq(start, end, 'minutes') && start.getMinutes() === 0 // make zero duration midnight events at least one day long

        if (isZeroDuration) end = _dates.default.add(end, 1, 'day')
        return {
          start: start,
          end: end,
        }
      }

      var WeekWrapper =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(WeekWrapper, _React$Component)

          function WeekWrapper() {
            var _this

            for (
              var _len = arguments.length, args = new Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              args[_key] = arguments[_key]
            }

            _this =
              _React$Component.call.apply(
                _React$Component,
                [this].concat(args)
              ) || this

            _this.handleMove = function(_ref, node) {
              var x = _ref.x,
                y = _ref.y
              var event = _this.context.draggable.dragAndDropAction.event
              var metrics = _this.props.slotMetrics
              var accessors = _this.props.accessors
              if (!event) return
              var rowBox = (0, _Selection.getBoundsForNode)(node)

              if (
                !(0, _selection.pointInBox)(rowBox, {
                  x: x,
                  y: y,
                })
              ) {
                _this.reset()

                return
              } // Make sure to maintain the time of the start date while moving it to the new slot

              var start = _dates.default.merge(
                metrics.getDateForSlot(
                  (0, _selection.getSlotAtX)(rowBox, x, false, metrics.slots)
                ),
                accessors.start(event)
              )

              var end = _dates.default.add(
                start,
                _dates.default.diff(
                  accessors.start(event),
                  accessors.end(event),
                  'minutes'
                ),
                'minutes'
              )

              _this.update(event, start, end)
            }

            _this.handleDropFromOutside = function(point, rowBox) {
              if (!_this.context.draggable.onDropFromOutside) return
              var metrics = _this.props.slotMetrics
              var start = metrics.getDateForSlot(
                (0, _selection.getSlotAtX)(
                  rowBox,
                  point.x,
                  false,
                  metrics.slots
                )
              )

              _this.context.draggable.onDropFromOutside({
                start: start,
                end: _dates.default.add(start, 1, 'day'),
                allDay: false,
              })
            }

            _this._selectable = function() {
              var node = (0, _reactDom.findDOMNode)(
                (0, _assertThisInitialized2.default)(_this)
              ).closest('.rbc-month-row, .rbc-allday-cell')
              var container = node.closest('.rbc-month-view, .rbc-time-view')
              var selector = (_this._selector = new _Selection.default(
                function() {
                  return container
                }
              ))
              selector.on('beforeSelect', function(point) {
                var isAllDay = _this.props.isAllDay
                var action = _this.context.draggable.dragAndDropAction.action
                return (
                  action === 'move' ||
                  (action === 'resize' &&
                    (!isAllDay ||
                      (0, _selection.pointInBox)(
                        (0, _Selection.getBoundsForNode)(node),
                        point
                      )))
                )
              })
              selector.on('selecting', function(box) {
                var bounds = (0, _Selection.getBoundsForNode)(node)
                var dragAndDropAction =
                  _this.context.draggable.dragAndDropAction
                if (dragAndDropAction.action === 'move')
                  _this.handleMove(box, bounds)
                if (dragAndDropAction.action === 'resize')
                  _this.handleResize(box, bounds)
              })
              selector.on('selectStart', function() {
                return _this.context.draggable.onStart()
              })
              selector.on('select', function(point) {
                var bounds = (0, _Selection.getBoundsForNode)(node)
                if (
                  !_this.state.segment ||
                  !(0, _selection.pointInBox)(bounds, point)
                )
                  return

                _this.handleInteractionEnd()
              })
              selector.on('dropFromOutside', function(point) {
                if (!_this.context.draggable.onDropFromOutside) return
                var bounds = (0, _Selection.getBoundsForNode)(node)
                if (!(0, _selection.pointInBox)(bounds, point)) return

                _this.handleDropFromOutside(point, bounds)
              })
              selector.on('click', function() {
                return _this.context.draggable.onEnd(null)
              })
            }

            _this.handleInteractionEnd = function() {
              var _this$props = _this.props,
                resourceId = _this$props.resourceId,
                isAllDay = _this$props.isAllDay
              var event = _this.state.segment.event

              _this.reset()

              _this.context.draggable.onEnd({
                start: event.start,
                end: event.end,
                resourceId: resourceId,
                isAllDay: isAllDay,
              })
            }

            _this._teardownSelectable = function() {
              if (!_this._selector) return

              _this._selector.teardown()

              _this._selector = null
            }

            _this.state = {}
            return _this
          }

          var _proto = WeekWrapper.prototype

          _proto.componentDidMount = function componentDidMount() {
            this._selectable()
          }

          _proto.componentWillUnmount = function componentWillUnmount() {
            this._teardownSelectable()
          }

          _proto.reset = function reset() {
            if (this.state.segment)
              this.setState({
                segment: null,
              })
          }

          _proto.update = function update(event, start, end) {
            var segment = (0, _eventLevels.eventSegments)(
              (0, _extends2.default)({}, event, {
                end: end,
                start: start,
                __isPreview: true,
              }),
              this.props.slotMetrics.range,
              _common.dragAccessors
            )
            var lastSegment = this.state.segment

            if (
              lastSegment &&
              segment.span === lastSegment.span &&
              segment.left === lastSegment.left &&
              segment.right === lastSegment.right
            ) {
              return
            }

            this.setState({
              segment: segment,
            })
          }

          _proto.handleResize = function handleResize(point, node) {
            var _this$context$draggab = this.context.draggable
                .dragAndDropAction,
              event = _this$context$draggab.event,
              direction = _this$context$draggab.direction
            var _this$props2 = this.props,
              accessors = _this$props2.accessors,
              metrics = _this$props2.slotMetrics

            var _eventTimes = eventTimes(event, accessors),
              start = _eventTimes.start,
              end = _eventTimes.end

            var rowBox = (0, _Selection.getBoundsForNode)(node)
            var cursorInRow = (0, _selection.pointInBox)(rowBox, point)

            if (direction === 'RIGHT') {
              if (cursorInRow) {
                if (metrics.last < start) return this.reset() // add min

                end = _dates.default.add(
                  metrics.getDateForSlot(
                    (0, _selection.getSlotAtX)(
                      rowBox,
                      point.x,
                      false,
                      metrics.slots
                    )
                  ),
                  1,
                  'day'
                )
              } else if (
                _dates.default.inRange(start, metrics.first, metrics.last) ||
                (rowBox.bottom < point.y && +metrics.first > +start)
              ) {
                end = _dates.default.add(metrics.last, 1, 'milliseconds')
              } else {
                this.setState({
                  segment: null,
                })
                return
              }

              end = _dates.default.max(end, _dates.default.add(start, 1, 'day'))
            } else if (direction === 'LEFT') {
              // inbetween Row
              if (cursorInRow) {
                if (metrics.first > end) return this.reset()
                start = metrics.getDateForSlot(
                  (0, _selection.getSlotAtX)(
                    rowBox,
                    point.x,
                    false,
                    metrics.slots
                  )
                )
              } else if (
                _dates.default.inRange(end, metrics.first, metrics.last) ||
                (rowBox.top > point.y && +metrics.last < +end)
              ) {
                start = _dates.default.add(metrics.first, -1, 'milliseconds')
              } else {
                this.reset()
                return
              }

              start = _dates.default.min(
                _dates.default.add(end, -1, 'day'),
                start
              )
            }

            this.update(event, start, end)
          }

          _proto.render = function render() {
            var _this$props3 = this.props,
              children = _this$props3.children,
              accessors = _this$props3.accessors
            var segment = this.state.segment
            return _react.default.createElement(
              'div',
              {
                className: 'rbc-addons-dnd-row-body',
              },
              children,
              segment &&
                _react.default.createElement(
                  _EventRow.default,
                  (0, _extends2.default)({}, this.props, {
                    selected: null,
                    className: 'rbc-addons-dnd-drag-row',
                    segments: [segment],
                    accessors: (0, _extends2.default)(
                      {},
                      accessors,
                      _common.dragAccessors
                    ),
                  })
                )
            )
          }

          return WeekWrapper
        })(_react.default.Component)

      WeekWrapper.contextTypes = {
        draggable: _propTypes.default.shape({
          onStart: _propTypes.default.func,
          onEnd: _propTypes.default.func,
          dragAndDropAction: _propTypes.default.object,
          onDropFromOutside: _propTypes.default.func,
          onBeginAction: _propTypes.default.func,
        }),
      }
      WeekWrapper.propTypes = false ? undefined : {}
      WeekWrapper.propTypes = false ? undefined : {}
      var _default = WeekWrapper
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 416: /***/ function(module, exports, __webpack_require__) {
      exports = module.exports = __webpack_require__(27)(true)
      // imports

      // module
      exports.push([
        module.i,
        '.rbc-addons-dnd .rbc-addons-dnd-row-body {\n  position: relative;\n}\n.rbc-addons-dnd .rbc-addons-dnd-drag-row {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n}\n.rbc-addons-dnd .rbc-addons-dnd-over {\n  background-color: rgba(0, 0, 0, 0.3);\n}\n.rbc-addons-dnd .rbc-event {\n  -webkit-transition: opacity 150ms;\n  transition: opacity 150ms;\n}\n.rbc-addons-dnd .rbc-event:hover .rbc-addons-dnd-resize-ns-icon,\n.rbc-addons-dnd .rbc-event:hover .rbc-addons-dnd-resize-ew-icon {\n  display: block;\n}\n.rbc-addons-dnd .rbc-addons-dnd-dragged-event {\n  opacity: 0;\n}\n.rbc-addons-dnd.rbc-addons-dnd-is-dragging .rbc-event:not(.rbc-addons-dnd-dragged-event):not(.rbc-addons-dnd-drag-preview) {\n  opacity: .50;\n}\n.rbc-addons-dnd .rbc-addons-dnd-resizable {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.rbc-addons-dnd .rbc-addons-dnd-resize-ns-anchor {\n  width: 100%;\n  text-align: center;\n  position: absolute;\n}\n.rbc-addons-dnd .rbc-addons-dnd-resize-ns-anchor:first-child {\n  top: 0;\n}\n.rbc-addons-dnd .rbc-addons-dnd-resize-ns-anchor:last-child {\n  bottom: 0;\n}\n.rbc-addons-dnd .rbc-addons-dnd-resize-ns-anchor .rbc-addons-dnd-resize-ns-icon {\n  display: none;\n  border-top: 3px double;\n  margin: 0 auto;\n  width: 10px;\n  cursor: ns-resize;\n}\n.rbc-addons-dnd .rbc-addons-dnd-resize-ew-anchor {\n  position: absolute;\n  top: 4px;\n  bottom: 0;\n}\n.rbc-addons-dnd .rbc-addons-dnd-resize-ew-anchor:first-child {\n  left: 0;\n}\n.rbc-addons-dnd .rbc-addons-dnd-resize-ew-anchor:last-child {\n  right: 0;\n}\n.rbc-addons-dnd .rbc-addons-dnd-resize-ew-anchor .rbc-addons-dnd-resize-ew-icon {\n  display: none;\n  border-left: 3px double;\n  margin-top: auto;\n  margin-bottom: auto;\n  height: 10px;\n  cursor: ew-resize;\n}\n',
        '',
        {
          version: 3,
          sources: [
            '/Users/stephen.blades/Projects/react-big-calendar/src/addons/dragAndDrop/styles.less',
          ],
          names: [],
          mappings:
            'AAAA;EACE,mBAAmB;CACpB;AACD;EACE,mBAAmB;EACnB,OAAO;EACP,QAAQ;EACR,SAAS;CACV;AACD;EACE,qCAAqC;CACtC;AACD;EACE,kCAAkC;EAClC,0BAA0B;CAC3B;AACD;;EAEE,eAAe;CAChB;AACD;EACE,WAAW;CACZ;AACD;EACE,aAAa;CACd;AACD;EACE,mBAAmB;EACnB,YAAY;EACZ,aAAa;CACd;AACD;EACE,YAAY;EACZ,mBAAmB;EACnB,mBAAmB;CACpB;AACD;EACE,OAAO;CACR;AACD;EACE,UAAU;CACX;AACD;EACE,cAAc;EACd,uBAAuB;EACvB,eAAe;EACf,YAAY;EACZ,kBAAkB;CACnB;AACD;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;CACX;AACD;EACE,QAAQ;CACT;AACD;EACE,SAAS;CACV;AACD;EACE,cAAc;EACd,wBAAwB;EACxB,iBAAiB;EACjB,oBAAoB;EACpB,aAAa;EACb,kBAAkB;CACnB',
          file: 'styles.less',
          sourcesContent: [
            '.rbc-addons-dnd .rbc-addons-dnd-row-body {\n  position: relative;\n}\n.rbc-addons-dnd .rbc-addons-dnd-drag-row {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n}\n.rbc-addons-dnd .rbc-addons-dnd-over {\n  background-color: rgba(0, 0, 0, 0.3);\n}\n.rbc-addons-dnd .rbc-event {\n  -webkit-transition: opacity 150ms;\n  transition: opacity 150ms;\n}\n.rbc-addons-dnd .rbc-event:hover .rbc-addons-dnd-resize-ns-icon,\n.rbc-addons-dnd .rbc-event:hover .rbc-addons-dnd-resize-ew-icon {\n  display: block;\n}\n.rbc-addons-dnd .rbc-addons-dnd-dragged-event {\n  opacity: 0;\n}\n.rbc-addons-dnd.rbc-addons-dnd-is-dragging .rbc-event:not(.rbc-addons-dnd-dragged-event):not(.rbc-addons-dnd-drag-preview) {\n  opacity: .50;\n}\n.rbc-addons-dnd .rbc-addons-dnd-resizable {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.rbc-addons-dnd .rbc-addons-dnd-resize-ns-anchor {\n  width: 100%;\n  text-align: center;\n  position: absolute;\n}\n.rbc-addons-dnd .rbc-addons-dnd-resize-ns-anchor:first-child {\n  top: 0;\n}\n.rbc-addons-dnd .rbc-addons-dnd-resize-ns-anchor:last-child {\n  bottom: 0;\n}\n.rbc-addons-dnd .rbc-addons-dnd-resize-ns-anchor .rbc-addons-dnd-resize-ns-icon {\n  display: none;\n  border-top: 3px double;\n  margin: 0 auto;\n  width: 10px;\n  cursor: ns-resize;\n}\n.rbc-addons-dnd .rbc-addons-dnd-resize-ew-anchor {\n  position: absolute;\n  top: 4px;\n  bottom: 0;\n}\n.rbc-addons-dnd .rbc-addons-dnd-resize-ew-anchor:first-child {\n  left: 0;\n}\n.rbc-addons-dnd .rbc-addons-dnd-resize-ew-anchor:last-child {\n  right: 0;\n}\n.rbc-addons-dnd .rbc-addons-dnd-resize-ew-anchor .rbc-addons-dnd-resize-ew-icon {\n  display: none;\n  border-left: 3px double;\n  margin-top: auto;\n  margin-bottom: auto;\n  height: 10px;\n  cursor: ew-resize;\n}\n',
          ],
          sourceRoot: '',
        },
      ])

      // exports

      /***/
    },

    /***/ 417: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _reactBigCalendar = _interopRequireDefault(__webpack_require__(14))

      var _events = _interopRequireDefault(__webpack_require__(21))

      var Timeslots = function Timeslots(_ref) {
        var localizer = _ref.localizer
        return _react.default.createElement(_reactBigCalendar.default, {
          events: _events.default,
          step: 15,
          timeslots: 8,
          localizer: localizer,
          defaultView: _reactBigCalendar.default.Views.WEEK,
          defaultDate: new Date(2015, 3, 12),
        })
      }

      var _default = Timeslots
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 418: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var _assertThisInitialized2 = _interopRequireDefault(
        __webpack_require__(3)
      )

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _events = _interopRequireDefault(__webpack_require__(21))

      var _reactBigCalendar = _interopRequireDefault(__webpack_require__(14))

      var _dragAndDrop = _interopRequireDefault(__webpack_require__(111))

      __webpack_require__(113)

      var DragAndDropCalendar = (0, _dragAndDrop.default)(
        _reactBigCalendar.default
      )

      var Dnd =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(Dnd, _React$Component)

          function Dnd(props) {
            var _this

            _this = _React$Component.call(this, props) || this

            _this.resizeEvent = function(_ref) {
              var event = _ref.event,
                start = _ref.start,
                end = _ref.end
              var events = _this.state.events
              var nextEvents = events.map(function(existingEvent) {
                return existingEvent.id == event.id
                  ? (0, _extends2.default)({}, existingEvent, {
                      start: start,
                      end: end,
                    })
                  : existingEvent
              })

              _this.setState({
                events: nextEvents,
              }) //alert(`${event.title} was resized to ${start}-${end}`)
            }

            _this.state = {
              events: _events.default,
            }
            _this.moveEvent = _this.moveEvent.bind(
              (0, _assertThisInitialized2.default)(_this)
            )
            _this.newEvent = _this.newEvent.bind(
              (0, _assertThisInitialized2.default)(_this)
            )
            return _this
          }

          var _proto = Dnd.prototype

          _proto.moveEvent = function moveEvent(_ref2) {
            var event = _ref2.event,
              start = _ref2.start,
              end = _ref2.end,
              droppedOnAllDaySlot = _ref2.isAllDay
            var events = this.state.events
            var idx = events.indexOf(event)
            var allDay = event.allDay

            if (!event.allDay && droppedOnAllDaySlot) {
              allDay = true
            } else if (event.allDay && !droppedOnAllDaySlot) {
              allDay = false
            }

            var updatedEvent = (0, _extends2.default)({}, event, {
              start: start,
              end: end,
              allDay: allDay,
            })
            var nextEvents = [].concat(events)
            nextEvents.splice(idx, 1, updatedEvent)
            this.setState({
              events: nextEvents,
            }) // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
          }

          _proto.newEvent = function newEvent(event) {
            // let idList = this.state.events.map(a => a.id)
            // let newId = Math.max(...idList) + 1
            // let hour = {
            //   id: newId,
            //   title: 'New Event',
            //   allDay: event.slots.length == 1,
            //   start: event.start,
            //   end: event.end,
            // }
            // this.setState({
            //   events: this.state.events.concat([hour]),
            // })
          }

          _proto.render = function render() {
            return _react.default.createElement(DragAndDropCalendar, {
              selectable: true,
              localizer: this.props.localizer,
              events: this.state.events,
              onEventDrop: this.moveEvent,
              resizable: true,
              onEventResize: this.resizeEvent,
              onSelectSlot: this.newEvent,
              onDragStart: console.log,
              defaultView: _reactBigCalendar.default.Views.MONTH,
              defaultDate: new Date(2015, 3, 12),
            })
          }

          return Dnd
        })(_react.default.Component)

      var _default = Dnd
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 419: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _extends3 = _interopRequireDefault(__webpack_require__(4))

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _react = _interopRequireDefault(__webpack_require__(1))

      var _events = _interopRequireDefault(__webpack_require__(21))

      var _reactBigCalendar = _interopRequireDefault(__webpack_require__(14))

      var _dragAndDrop = _interopRequireDefault(__webpack_require__(111))

      var _Layout = _interopRequireDefault(__webpack_require__(101))

      var _Card = _interopRequireDefault(__webpack_require__(143))

      __webpack_require__(113)

      var DragAndDropCalendar = (0, _dragAndDrop.default)(
        _reactBigCalendar.default
      )

      var formatName = function formatName(name, count) {
        return name + ' ID ' + count
      }

      var Dnd =
        /*#__PURE__*/
        (function(_React$Component) {
          ;(0, _inheritsLoose2.default)(Dnd, _React$Component)

          function Dnd(props) {
            var _this

            _this = _React$Component.call(this, props) || this

            _this.handleDragStart = function(name) {
              _this.setState({
                draggedEvent: name,
              })
            }

            _this.customOnDragOver = function(event) {
              // check for undroppable is specific to this example
              // and not part of API. This just demonstrates that
              // onDragOver can optionally be passed to conditionally
              // allow draggable items to be dropped on cal, based on
              // whether event.preventDefault is called
              if (_this.state.draggedEvent !== 'undroppable') {
                console.log('preventDefault')
                event.preventDefault()
              }
            }

            _this.onDropFromOutside = function(_ref) {
              var _extends2

              var start = _ref.start,
                end = _ref.end,
                allDay = _ref.allDay
              var _this$state = _this.state,
                draggedEvent = _this$state.draggedEvent,
                counters = _this$state.counters
              var event = {
                title: formatName(draggedEvent, counters[draggedEvent]),
                start: start,
                end: end,
                isAllDay: allDay,
              }
              var updatedCounters = (0, _extends3.default)(
                {},
                counters,
                ((_extends2 = {}),
                (_extends2[draggedEvent] = counters[draggedEvent] + 1),
                _extends2)
              )

              _this.setState({
                draggedEvent: null,
                counters: updatedCounters,
              })

              _this.newEvent(event)
            }

            _this.resizeEvent = function(_ref2) {
              var event = _ref2.event,
                start = _ref2.start,
                end = _ref2.end
              var events = _this.state.events
              var nextEvents = events.map(function(existingEvent) {
                return existingEvent.id == event.id
                  ? (0, _extends3.default)({}, existingEvent, {
                      start: start,
                      end: end,
                    })
                  : existingEvent
              })

              _this.setState({
                events: nextEvents,
              }) //alert(`${event.title} was resized to ${start}-${end}`)
            }

            _this.state = {
              events: _events.default,
              draggedEvent: null,
              counters: {
                item1: 0,
                item2: 0,
              },
            }
            return _this
          }

          var _proto = Dnd.prototype

          _proto.moveEvent = function moveEvent(_ref3) {
            var event = _ref3.event,
              start = _ref3.start,
              end = _ref3.end,
              droppedOnAllDaySlot = _ref3.isAllDay
            var events = this.state.events
            var idx = events.indexOf(event)
            var allDay = event.allDay

            if (!event.allDay && droppedOnAllDaySlot) {
              allDay = true
            } else if (event.allDay && !droppedOnAllDaySlot) {
              allDay = false
            }

            var updatedEvent = (0, _extends3.default)({}, event, {
              start: start,
              end: end,
              allDay: allDay,
            })
            var nextEvents = [].concat(events)
            nextEvents.splice(idx, 1, updatedEvent)
            this.setState({
              events: nextEvents,
            }) // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
          }

          _proto.newEvent = function newEvent(event) {
            var idList = this.state.events.map(function(a) {
              return a.id
            })
            var newId = Math.max.apply(Math, idList) + 1
            var hour = {
              id: newId,
              title: event.title,
              allDay: event.isAllDay,
              start: event.start,
              end: event.end,
            }
            this.setState({
              events: this.state.events.concat([hour]),
            })
          }

          _proto.render = function render() {
            var _this2 = this

            return _react.default.createElement(
              'div',
              null,
              _react.default.createElement(
                _Card.default,
                {
                  className: 'examples--header',
                  style: {
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                  },
                },
                _react.default.createElement(
                  'h4',
                  {
                    style: {
                      color: 'gray',
                      width: '100%',
                    },
                  },
                  'Outside Drag Sources'
                ),
                Object.entries(this.state.counters).map(function(_ref4) {
                  var name = _ref4[0],
                    count = _ref4[1]
                  return _react.default.createElement(
                    'div',
                    {
                      style: {
                        border: '2px solid gray',
                        borderRadius: '4px',
                        width: '100px',
                        margin: '10px',
                      },
                      draggable: 'true',
                      key: name,
                      onDragStart: function onDragStart() {
                        return _this2.handleDragStart(name)
                      },
                    },
                    formatName(name, count)
                  )
                }),
                _react.default.createElement(
                  'div',
                  {
                    style: {
                      border: '2px solid gray',
                      borderRadius: '4px',
                      width: '100px',
                      margin: '10px',
                    },
                    draggable: 'true',
                    key: name,
                    onDragStart: function onDragStart() {
                      return _this2.handleDragStart('undroppable')
                    },
                  },
                  'Draggable but not for calendar.'
                )
              ),
              _react.default.createElement(DragAndDropCalendar, {
                selectable: true,
                localizer: this.props.localizer,
                events: this.state.events,
                onEventDrop: this.moveEvent,
                onDropFromOutside: this.onDropFromOutside,
                onDragOver: this.customOnDragOver,
                resizable: true,
                onEventResize: this.resizeEvent,
                onSelectSlot: this.newEvent,
                onD: true,
                defaultView: _reactBigCalendar.default.Views.MONTH,
                defaultDate: new Date(2015, 3, 12),
              })
            )
          }

          return Dnd
        })(_react.default.Component)

      var _default = Dnd
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 67: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.mergeWithDefaults = mergeWithDefaults
      exports.DateLocalizer = void 0

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _invariant = _interopRequireDefault(__webpack_require__(23))

      var localePropType = _propTypes.default.oneOfType([
        _propTypes.default.string,
        _propTypes.default.func,
      ])

      function _format(localizer, formatter, value, format, culture) {
        var result =
          typeof format === 'function'
            ? format(value, culture, localizer)
            : formatter.call(localizer, value, format, culture)
        !(result == null || typeof result === 'string')
          ? false
            ? undefined
            : invariant(false)
          : void 0
        return result
      }

      var DateLocalizer = function DateLocalizer(spec) {
        var _this = this

        !(typeof spec.format === 'function')
          ? false
            ? undefined
            : invariant(false)
          : void 0
        !(typeof spec.firstOfWeek === 'function')
          ? false
            ? undefined
            : invariant(false)
          : void 0
        this.propType = spec.propType || localePropType
        this.startOfWeek = spec.firstOfWeek
        this.formats = spec.formats

        this.format = function() {
          for (
            var _len = arguments.length, args = new Array(_len), _key = 0;
            _key < _len;
            _key++
          ) {
            args[_key] = arguments[_key]
          }

          return _format.apply(void 0, [_this, spec.format].concat(args))
        }
      }

      exports.DateLocalizer = DateLocalizer

      function mergeWithDefaults(
        localizer,
        culture,
        formatOverrides,
        messages
      ) {
        var formats = (0, _extends2.default)(
          {},
          localizer.formats,
          formatOverrides
        )
        return (0, _extends2.default)({}, localizer, {
          messages: messages,
          startOfWeek: function startOfWeek() {
            return localizer.startOfWeek(culture)
          },
          format: function format(value, _format2) {
            return localizer.format(
              value,
              formats[_format2] || _format2,
              culture
            )
          },
        })
      }

      /***/
    },

    /***/ 72: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.getEventNodeFromPoint = getEventNodeFromPoint
      exports.isEvent = isEvent
      exports.objectsCollide = objectsCollide
      exports.getBoundsForNode = getBoundsForNode
      exports.default = void 0

      var _contains = _interopRequireDefault(__webpack_require__(36))

      var _closest = _interopRequireDefault(__webpack_require__(330))

      var _events = _interopRequireDefault(__webpack_require__(332))

      function addEventListener(type, handler, target) {
        if (target === void 0) {
          target = document
        }

        _events.default.on(target, type, handler, {
          passive: false,
        })

        return {
          remove: function remove() {
            _events.default.off(target, type, handler)
          },
        }
      }

      function isOverContainer(container, x, y) {
        return (
          !container ||
          (0, _contains.default)(container, document.elementFromPoint(x, y))
        )
      }

      function getEventNodeFromPoint(node, _ref) {
        var clientX = _ref.clientX,
          clientY = _ref.clientY
        var target = document.elementFromPoint(clientX, clientY)
        return (0, _closest.default)(target, '.rbc-event', node)
      }

      function isEvent(node, bounds) {
        return !!getEventNodeFromPoint(node, bounds)
      }

      function getEventCoordinates(e) {
        var target = e

        if (e.touches && e.touches.length) {
          target = e.touches[0]
        }

        return {
          clientX: target.clientX,
          clientY: target.clientY,
          pageX: target.pageX,
          pageY: target.pageY,
        }
      }

      var clickTolerance = 5
      var clickInterval = 250

      var Selection =
        /*#__PURE__*/
        (function() {
          function Selection(node, _temp) {
            var _ref2 = _temp === void 0 ? {} : _temp,
              _ref2$global = _ref2.global,
              global = _ref2$global === void 0 ? false : _ref2$global,
              _ref2$longPressThresh = _ref2.longPressThreshold,
              longPressThreshold =
                _ref2$longPressThresh === void 0 ? 250 : _ref2$longPressThresh

            this.container = node
            this.globalMouse = !node || global
            this.longPressThreshold = longPressThreshold
            this._listeners = Object.create(null)
            this._handleInitialEvent = this._handleInitialEvent.bind(this)
            this._handleMoveEvent = this._handleMoveEvent.bind(this)
            this._handleTerminatingEvent = this._handleTerminatingEvent.bind(
              this
            )
            this._keyListener = this._keyListener.bind(this)
            this._dropFromOutsideListener = this._dropFromOutsideListener.bind(
              this
            ) // Fixes an iOS 10 bug where scrolling could not be prevented on the window.
            // https://github.com/metafizzy/flickity/issues/457#issuecomment-254501356

            this._onTouchMoveWindowListener = addEventListener(
              'touchmove',
              function() {},
              window
            )
            this._onKeyDownListener = addEventListener(
              'keydown',
              this._keyListener
            )
            this._onKeyUpListener = addEventListener('keyup', this._keyListener)
            this._onDropFromOutsideListener = addEventListener(
              'drop',
              this._dropFromOutsideListener
            )

            this._addInitialEventListener()
          }

          var _proto = Selection.prototype

          _proto.on = function on(type, handler) {
            var handlers = this._listeners[type] || (this._listeners[type] = [])
            handlers.push(handler)
            return {
              remove: function remove() {
                var idx = handlers.indexOf(handler)
                if (idx !== -1) handlers.splice(idx, 1)
              },
            }
          }

          _proto.emit = function emit(type) {
            for (
              var _len = arguments.length,
                args = new Array(_len > 1 ? _len - 1 : 0),
                _key = 1;
              _key < _len;
              _key++
            ) {
              args[_key - 1] = arguments[_key]
            }

            var result
            var handlers = this._listeners[type] || []
            handlers.forEach(function(fn) {
              if (result === undefined) result = fn.apply(void 0, args)
            })
            return result
          }

          _proto.teardown = function teardown() {
            this.listeners = Object.create(null)
            this._onTouchMoveWindowListener &&
              this._onTouchMoveWindowListener.remove()
            this._onInitialEventListener &&
              this._onInitialEventListener.remove()
            this._onEndListener && this._onEndListener.remove()
            this._onEscListener && this._onEscListener.remove()
            this._onMoveListener && this._onMoveListener.remove()
            this._onKeyUpListener && this._onKeyUpListener.remove()
            this._onKeyDownListener && this._onKeyDownListener.remove()
          }

          _proto.isSelected = function isSelected(node) {
            var box = this._selectRect
            if (!box || !this.selecting) return false
            return objectsCollide(box, getBoundsForNode(node))
          }

          _proto.filter = function filter(items) {
            var box = this._selectRect //not selecting

            if (!box || !this.selecting) return []
            return items.filter(this.isSelected, this)
          } // Adds a listener that will call the handler only after the user has pressed on the screen
          // without moving their finger for 250ms.

          _proto._addLongPressListener = function _addLongPressListener(
            handler,
            initialEvent
          ) {
            var _this = this

            var timer = null
            var touchMoveListener = null
            var touchEndListener = null

            var handleTouchStart = function handleTouchStart(initialEvent) {
              timer = setTimeout(function() {
                cleanup()
                handler(initialEvent)
              }, _this.longPressThreshold)
              touchMoveListener = addEventListener('touchmove', function() {
                return cleanup()
              })
              touchEndListener = addEventListener('touchend', function() {
                return cleanup()
              })
            }

            var touchStartListener = addEventListener(
              'touchstart',
              handleTouchStart
            )

            var cleanup = function cleanup() {
              if (timer) {
                clearTimeout(timer)
              }

              if (touchMoveListener) {
                touchMoveListener.remove()
              }

              if (touchEndListener) {
                touchEndListener.remove()
              }

              timer = null
              touchMoveListener = null
              touchEndListener = null
            }

            if (initialEvent) {
              handleTouchStart(initialEvent)
            }

            return {
              remove: function remove() {
                cleanup()
                touchStartListener.remove()
              },
            }
          } // Listen for mousedown and touchstart events. When one is received, disable the other and setup
          // future event handling based on the type of event.

          _proto._addInitialEventListener = function _addInitialEventListener() {
            var _this2 = this

            var mouseDownListener = addEventListener('mousedown', function(e) {
              _this2._onInitialEventListener.remove()

              _this2._handleInitialEvent(e)

              _this2._onInitialEventListener = addEventListener(
                'mousedown',
                _this2._handleInitialEvent
              )
            })
            var touchStartListener = addEventListener('touchstart', function(
              e
            ) {
              _this2._onInitialEventListener.remove()

              _this2._onInitialEventListener = _this2._addLongPressListener(
                _this2._handleInitialEvent,
                e
              )
            })
            this._onInitialEventListener = {
              remove: function remove() {
                mouseDownListener.remove()
                touchStartListener.remove()
              },
            }
          }

          _proto._dropFromOutsideListener = function _dropFromOutsideListener(
            e
          ) {
            var _getEventCoordinates = getEventCoordinates(e),
              pageX = _getEventCoordinates.pageX,
              pageY = _getEventCoordinates.pageY,
              clientX = _getEventCoordinates.clientX,
              clientY = _getEventCoordinates.clientY

            this.emit('dropFromOutside', {
              x: pageX,
              y: pageY,
              clientX: clientX,
              clientY: clientY,
            })
            e.preventDefault()
          }

          _proto._handleInitialEvent = function _handleInitialEvent(e) {
            var _getEventCoordinates2 = getEventCoordinates(e),
              clientX = _getEventCoordinates2.clientX,
              clientY = _getEventCoordinates2.clientY,
              pageX = _getEventCoordinates2.pageX,
              pageY = _getEventCoordinates2.pageY

            var node = this.container(),
              collides,
              offsetData // Right clicks

            if (
              e.which === 3 ||
              e.button === 2 ||
              !isOverContainer(node, clientX, clientY)
            )
              return

            if (
              !this.globalMouse &&
              node &&
              !(0, _contains.default)(node, e.target)
            ) {
              var _normalizeDistance = normalizeDistance(0),
                top = _normalizeDistance.top,
                left = _normalizeDistance.left,
                bottom = _normalizeDistance.bottom,
                right = _normalizeDistance.right

              offsetData = getBoundsForNode(node)
              collides = objectsCollide(
                {
                  top: offsetData.top - top,
                  left: offsetData.left - left,
                  bottom: offsetData.bottom + bottom,
                  right: offsetData.right + right,
                },
                {
                  top: pageY,
                  left: pageX,
                }
              )
              if (!collides) return
            }

            var result = this.emit(
              'beforeSelect',
              (this._initialEventData = {
                isTouch: /^touch/.test(e.type),
                x: pageX,
                y: pageY,
                clientX: clientX,
                clientY: clientY,
              })
            )
            if (result === false) return

            switch (e.type) {
              case 'mousedown':
                this._onEndListener = addEventListener(
                  'mouseup',
                  this._handleTerminatingEvent
                )
                this._onEscListener = addEventListener(
                  'keydown',
                  this._handleTerminatingEvent
                )
                this._onMoveListener = addEventListener(
                  'mousemove',
                  this._handleMoveEvent
                )
                break

              case 'touchstart':
                this._handleMoveEvent(e)

                this._onEndListener = addEventListener(
                  'touchend',
                  this._handleTerminatingEvent
                )
                this._onMoveListener = addEventListener(
                  'touchmove',
                  this._handleMoveEvent
                )
                break

              default:
                break
            }
          }

          _proto._handleTerminatingEvent = function _handleTerminatingEvent(e) {
            var _getEventCoordinates3 = getEventCoordinates(e),
              pageX = _getEventCoordinates3.pageX,
              pageY = _getEventCoordinates3.pageY

            this.selecting = false
            this._onEndListener && this._onEndListener.remove()
            this._onMoveListener && this._onMoveListener.remove()
            if (!this._initialEventData) return
            var inRoot =
              !this.container ||
              (0, _contains.default)(this.container(), e.target)
            var bounds = this._selectRect
            var click = this.isClick(pageX, pageY)
            this._initialEventData = null

            if (e.key === 'Escape') {
              return this.emit('reset')
            }

            if (!inRoot) {
              return this.emit('reset')
            }

            if (click && inRoot) {
              return this._handleClickEvent(e)
            } // User drag-clicked in the Selectable area

            if (!click) return this.emit('select', bounds)
          }

          _proto._handleClickEvent = function _handleClickEvent(e) {
            var _getEventCoordinates4 = getEventCoordinates(e),
              pageX = _getEventCoordinates4.pageX,
              pageY = _getEventCoordinates4.pageY,
              clientX = _getEventCoordinates4.clientX,
              clientY = _getEventCoordinates4.clientY

            var now = new Date().getTime()

            if (
              this._lastClickData &&
              now - this._lastClickData.timestamp < clickInterval
            ) {
              // Double click event
              this._lastClickData = null
              return this.emit('doubleClick', {
                x: pageX,
                y: pageY,
                clientX: clientX,
                clientY: clientY,
              })
            } // Click event

            this._lastClickData = {
              timestamp: now,
            }
            return this.emit('click', {
              x: pageX,
              y: pageY,
              clientX: clientX,
              clientY: clientY,
            })
          }

          _proto._handleMoveEvent = function _handleMoveEvent(e) {
            if (this._initialEventData === null) {
              return
            }

            var _this$_initialEventDa = this._initialEventData,
              x = _this$_initialEventDa.x,
              y = _this$_initialEventDa.y

            var _getEventCoordinates5 = getEventCoordinates(e),
              pageX = _getEventCoordinates5.pageX,
              pageY = _getEventCoordinates5.pageY

            var w = Math.abs(x - pageX)
            var h = Math.abs(y - pageY)
            var left = Math.min(pageX, x),
              top = Math.min(pageY, y),
              old = this.selecting // Prevent emitting selectStart event until mouse is moved.
            // in Chrome on Windows, mouseMove event may be fired just after mouseDown event.

            if (this.isClick(pageX, pageY) && !old && !(w || h)) {
              return
            }

            this.selecting = true
            this._selectRect = {
              top: top,
              left: left,
              x: pageX,
              y: pageY,
              right: left + w,
              bottom: top + h,
            }

            if (!old) {
              this.emit('selectStart', this._initialEventData)
            }

            if (!this.isClick(pageX, pageY))
              this.emit('selecting', this._selectRect)
            e.preventDefault()
          }

          _proto._keyListener = function _keyListener(e) {
            this.ctrl = e.metaKey || e.ctrlKey
          }

          _proto.isClick = function isClick(pageX, pageY) {
            var _this$_initialEventDa2 = this._initialEventData,
              x = _this$_initialEventDa2.x,
              y = _this$_initialEventDa2.y,
              isTouch = _this$_initialEventDa2.isTouch
            return (
              !isTouch &&
              Math.abs(pageX - x) <= clickTolerance &&
              Math.abs(pageY - y) <= clickTolerance
            )
          }

          return Selection
        })()
      /**
       * Resolve the disance prop from either an Int or an Object
       * @return {Object}
       */

      function normalizeDistance(distance) {
        if (distance === void 0) {
          distance = 0
        }

        if (typeof distance !== 'object')
          distance = {
            top: distance,
            left: distance,
            right: distance,
            bottom: distance,
          }
        return distance
      }
      /**
       * Given two objects containing "top", "left", "offsetWidth" and "offsetHeight"
       * properties, determine if they collide.
       * @param  {Object|HTMLElement} a
       * @param  {Object|HTMLElement} b
       * @return {bool}
       */

      function objectsCollide(nodeA, nodeB, tolerance) {
        if (tolerance === void 0) {
          tolerance = 0
        }

        var _getBoundsForNode = getBoundsForNode(nodeA),
          aTop = _getBoundsForNode.top,
          aLeft = _getBoundsForNode.left,
          _getBoundsForNode$rig = _getBoundsForNode.right,
          aRight =
            _getBoundsForNode$rig === void 0 ? aLeft : _getBoundsForNode$rig,
          _getBoundsForNode$bot = _getBoundsForNode.bottom,
          aBottom =
            _getBoundsForNode$bot === void 0 ? aTop : _getBoundsForNode$bot

        var _getBoundsForNode2 = getBoundsForNode(nodeB),
          bTop = _getBoundsForNode2.top,
          bLeft = _getBoundsForNode2.left,
          _getBoundsForNode2$ri = _getBoundsForNode2.right,
          bRight =
            _getBoundsForNode2$ri === void 0 ? bLeft : _getBoundsForNode2$ri,
          _getBoundsForNode2$bo = _getBoundsForNode2.bottom,
          bBottom =
            _getBoundsForNode2$bo === void 0 ? bTop : _getBoundsForNode2$bo

        return !// 'a' bottom doesn't touch 'b' top
        (
          aBottom - tolerance < bTop || // 'a' top doesn't touch 'b' bottom
          aTop + tolerance > bBottom || // 'a' right doesn't touch 'b' left
          aRight - tolerance < bLeft || // 'a' left doesn't touch 'b' right
          aLeft + tolerance > bRight
        )
      }
      /**
       * Given a node, get everything needed to calculate its boundaries
       * @param  {HTMLElement} node
       * @return {Object}
       */

      function getBoundsForNode(node) {
        if (!node.getBoundingClientRect) return node
        var rect = node.getBoundingClientRect(),
          left = rect.left + pageOffset('left'),
          top = rect.top + pageOffset('top')
        return {
          top: top,
          left: left,
          right: (node.offsetWidth || 0) + left,
          bottom: (node.offsetHeight || 0) + top,
        }
      }

      function pageOffset(dir) {
        if (dir === 'left')
          return window.pageXOffset || document.body.scrollLeft || 0
        if (dir === 'top')
          return window.pageYOffset || document.body.scrollTop || 0
      }

      var _default = Selection
      exports.default = _default

      /***/
    },

    /***/ 73: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireWildcard = __webpack_require__(20)

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5))

      var _propTypes = _interopRequireDefault(__webpack_require__(2))

      var _classnames = _interopRequireDefault(__webpack_require__(6))

      var _requestAnimationFrame = _interopRequireDefault(
        __webpack_require__(153)
      )

      var _react = _interopRequireWildcard(__webpack_require__(1))

      var _reactDom = __webpack_require__(9)

      var _memoizeOne = _interopRequireDefault(__webpack_require__(160))

      var _dates = _interopRequireDefault(__webpack_require__(8))

      var _DayColumn = _interopRequireDefault(__webpack_require__(343))

      var _TimeGutter = _interopRequireDefault(__webpack_require__(359))

      var _width = _interopRequireDefault(__webpack_require__(171))

      var _TimeGridHeader = _interopRequireDefault(__webpack_require__(360))

      var _helpers = __webpack_require__(35)

      var _eventLevels = __webpack_require__(39)

      var _Resources = _interopRequireDefault(__webpack_require__(362))

      var TimeGrid =
        /*#__PURE__*/
        (function(_Component) {
          ;(0, _inheritsLoose2.default)(TimeGrid, _Component)

          function TimeGrid(props) {
            var _this

            _this = _Component.call(this, props) || this

            _this.handleScroll = function(e) {
              if (_this.scrollRef.current) {
                _this.scrollRef.current.scrollLeft = e.target.scrollLeft
              }
            }

            _this.handleResize = function() {
              _requestAnimationFrame.default.cancel(_this.rafHandle)

              _this.rafHandle = (0, _requestAnimationFrame.default)(
                _this.checkOverflow
              )
            }

            _this.gutterRef = function(ref) {
              _this.gutter = ref && (0, _reactDom.findDOMNode)(ref)
            }

            _this.handleSelectAlldayEvent = function() {
              //cancel any pending selections so only the event click goes through.
              _this.clearSelection()

              for (
                var _len = arguments.length, args = new Array(_len), _key = 0;
                _key < _len;
                _key++
              ) {
                args[_key] = arguments[_key]
              }

              ;(0, _helpers.notify)(_this.props.onSelectEvent, args)
            }

            _this.handleSelectAllDaySlot = function(slots, slotInfo) {
              var onSelectSlot = _this.props.onSelectSlot
              ;(0, _helpers.notify)(onSelectSlot, {
                slots: slots,
                start: slots[0],
                end: slots[slots.length - 1],
                action: slotInfo.action,
              })
            }

            _this.checkOverflow = function() {
              if (_this._updatingOverflow) return
              var content = _this.contentRef.current
              var isOverflowing = content.scrollHeight > content.clientHeight

              if (_this.state.isOverflowing !== isOverflowing) {
                _this._updatingOverflow = true

                _this.setState(
                  {
                    isOverflowing: isOverflowing,
                  },
                  function() {
                    _this._updatingOverflow = false
                  }
                )
              }
            }

            _this.memoizedResources = (0, _memoizeOne.default)(function(
              resources,
              accessors
            ) {
              return (0, _Resources.default)(resources, accessors)
            })
            _this.state = {
              gutterWidth: undefined,
              isOverflowing: null,
            }
            _this.scrollRef = _react.default.createRef()
            _this.contentRef = _react.default.createRef()
            return _this
          }

          var _proto = TimeGrid.prototype

          _proto.componentWillMount = function componentWillMount() {
            this.calculateScroll()
          }

          _proto.componentDidMount = function componentDidMount() {
            this.checkOverflow()

            if (this.props.width == null) {
              this.measureGutter()
            }

            this.applyScroll()
            window.addEventListener('resize', this.handleResize)
          }

          _proto.componentWillUnmount = function componentWillUnmount() {
            window.removeEventListener('resize', this.handleResize)

            _requestAnimationFrame.default.cancel(this.rafHandle)

            if (this.measureGutterAnimationFrameRequest) {
              window.cancelAnimationFrame(
                this.measureGutterAnimationFrameRequest
              )
            }
          }

          _proto.componentDidUpdate = function componentDidUpdate() {
            if (this.props.width == null) {
              this.measureGutter()
            }

            this.applyScroll() //this.checkOverflow()
          }

          _proto.componentWillReceiveProps = function componentWillReceiveProps(
            nextProps
          ) {
            var _this$props = this.props,
              range = _this$props.range,
              scrollToTime = _this$props.scrollToTime // When paginating, reset scroll

            if (
              !_dates.default.eq(nextProps.range[0], range[0], 'minute') ||
              !_dates.default.eq(nextProps.scrollToTime, scrollToTime, 'minute')
            ) {
              this.calculateScroll(nextProps)
            }
          }

          _proto.renderEvents = function renderEvents(range, events, now) {
            var _this2 = this

            var _this$props2 = this.props,
              min = _this$props2.min,
              max = _this$props2.max,
              components = _this$props2.components,
              accessors = _this$props2.accessors,
              localizer = _this$props2.localizer
            var resources = this.memoizedResources(
              this.props.resources,
              accessors
            )
            var groupedEvents = resources.groupEvents(events)
            return resources.map(function(_ref, i) {
              var id = _ref[0],
                resource = _ref[1]
              return range.map(function(date, jj) {
                var daysEvents = (groupedEvents.get(id) || []).filter(function(
                  event
                ) {
                  return _dates.default.inRange(
                    date,
                    accessors.start(event),
                    accessors.end(event),
                    'day'
                  )
                })
                return _react.default.createElement(
                  _DayColumn.default,
                  (0, _extends2.default)({}, _this2.props, {
                    localizer: localizer,
                    min: _dates.default.merge(date, min),
                    max: _dates.default.merge(date, max),
                    resource: resource && id,
                    components: components,
                    isNow: _dates.default.eq(date, now, 'day'),
                    key: i + '-' + jj,
                    date: date,
                    events: daysEvents,
                  })
                )
              })
            })
          }

          _proto.render = function render() {
            var _this$props3 = this.props,
              events = _this$props3.events,
              range = _this$props3.range,
              width = _this$props3.width,
              selected = _this$props3.selected,
              getNow = _this$props3.getNow,
              resources = _this$props3.resources,
              components = _this$props3.components,
              accessors = _this$props3.accessors,
              getters = _this$props3.getters,
              localizer = _this$props3.localizer,
              min = _this$props3.min,
              max = _this$props3.max,
              showMultiDayTimes = _this$props3.showMultiDayTimes,
              longPressThreshold = _this$props3.longPressThreshold
            width = width || this.state.gutterWidth
            var start = range[0],
              end = range[range.length - 1]
            this.slots = range.length
            var allDayEvents = [],
              rangeEvents = []
            events.forEach(function(event) {
              if ((0, _eventLevels.inRange)(event, start, end, accessors)) {
                var eStart = accessors.start(event),
                  eEnd = accessors.end(event)

                if (
                  accessors.allDay(event) ||
                  (_dates.default.isJustDate(eStart) &&
                    _dates.default.isJustDate(eEnd)) ||
                  (!showMultiDayTimes &&
                    !_dates.default.eq(eStart, eEnd, 'day'))
                ) {
                  allDayEvents.push(event)
                } else {
                  rangeEvents.push(event)
                }
              }
            })
            allDayEvents.sort(function(a, b) {
              return (0, _eventLevels.sortEvents)(a, b, accessors)
            })
            return _react.default.createElement(
              'div',
              {
                className: (0, _classnames.default)(
                  'rbc-time-view',
                  resources && 'rbc-time-view-resources'
                ),
              },
              _react.default.createElement(_TimeGridHeader.default, {
                range: range,
                events: allDayEvents,
                width: width,
                getNow: getNow,
                localizer: localizer,
                selected: selected,
                resources: this.memoizedResources(resources, accessors),
                selectable: this.props.selectable,
                accessors: accessors,
                getters: getters,
                components: components,
                scrollRef: this.scrollRef,
                isOverflowing: this.state.isOverflowing,
                longPressThreshold: longPressThreshold,
                onSelectSlot: this.handleSelectAllDaySlot,
                onSelectEvent: this.handleSelectAlldayEvent,
                onDoubleClickEvent: this.props.onDoubleClickEvent,
                onDrillDown: this.props.onDrillDown,
                getDrilldownView: this.props.getDrilldownView,
              }),
              _react.default.createElement(
                'div',
                {
                  ref: this.contentRef,
                  className: 'rbc-time-content',
                  onScroll: this.handleScroll,
                },
                _react.default.createElement(_TimeGutter.default, {
                  date: start,
                  ref: this.gutterRef,
                  localizer: localizer,
                  min: _dates.default.merge(start, min),
                  max: _dates.default.merge(start, max),
                  step: this.props.step,
                  getNow: this.props.getNow,
                  timeslots: this.props.timeslots,
                  components: components,
                  className: 'rbc-time-gutter',
                }),
                this.renderEvents(range, rangeEvents, getNow())
              )
            )
          }

          _proto.clearSelection = function clearSelection() {
            clearTimeout(this._selectTimer)
            this._pendingSelection = []
          }

          _proto.measureGutter = function measureGutter() {
            var _this3 = this

            if (this.measureGutterAnimationFrameRequest) {
              window.cancelAnimationFrame(
                this.measureGutterAnimationFrameRequest
              )
            }

            this.measureGutterAnimationFrameRequest = window.requestAnimationFrame(
              function() {
                var width = (0, _width.default)(_this3.gutter)

                if (width && _this3.state.gutterWidth !== width) {
                  _this3.setState({
                    gutterWidth: width,
                  })
                }
              }
            )
          }

          _proto.applyScroll = function applyScroll() {
            if (this._scrollRatio) {
              var content = this.contentRef.current
              content.scrollTop = content.scrollHeight * this._scrollRatio // Only do this once

              this._scrollRatio = null
            }
          }

          _proto.calculateScroll = function calculateScroll(props) {
            if (props === void 0) {
              props = this.props
            }

            var _props = props,
              min = _props.min,
              max = _props.max,
              scrollToTime = _props.scrollToTime

            var diffMillis =
              scrollToTime - _dates.default.startOf(scrollToTime, 'day')

            var totalMillis = _dates.default.diff(max, min)

            this._scrollRatio = diffMillis / totalMillis
          }

          return TimeGrid
        })(_react.Component)

      exports.default = TimeGrid
      TimeGrid.propTypes = false ? undefined : {}
      TimeGrid.defaultProps = {
        step: 30,
        timeslots: 2,
        min: _dates.default.startOf(new Date(), 'day'),
        max: _dates.default.endOf(new Date(), 'day'),
        scrollToTime: _dates.default.startOf(new Date(), 'day'),
      }
      module.exports = exports['default']

      /***/
    },

    /***/ 74: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      exports.__esModule = true
      exports.default = void 0

      function NoopWrapper(props) {
        return props.children
      }

      var _default = NoopWrapper
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /***/ 8: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var _interopRequireDefault = __webpack_require__(0)

      exports.__esModule = true
      exports.default = void 0

      var _extends2 = _interopRequireDefault(__webpack_require__(4))

      var _dateArithmetic = _interopRequireDefault(__webpack_require__(140))

      /* eslint no-fallthrough: off */
      var MILLI = {
        seconds: 1000,
        minutes: 1000 * 60,
        hours: 1000 * 60 * 60,
        day: 1000 * 60 * 60 * 24,
      }
      var MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
      var dates = (0, _extends2.default)({}, _dateArithmetic.default, {
        monthsInYear: function monthsInYear(year) {
          var date = new Date(year, 0, 1)
          return MONTHS.map(function(i) {
            return dates.month(date, i)
          })
        },
        firstVisibleDay: function firstVisibleDay(date, localizer) {
          var firstOfMonth = dates.startOf(date, 'month')
          return dates.startOf(firstOfMonth, 'week', localizer.startOfWeek())
        },
        lastVisibleDay: function lastVisibleDay(date, localizer) {
          var endOfMonth = dates.endOf(date, 'month')
          return dates.endOf(endOfMonth, 'week', localizer.startOfWeek())
        },
        visibleDays: function visibleDays(date, localizer) {
          var current = dates.firstVisibleDay(date, localizer),
            last = dates.lastVisibleDay(date, localizer),
            days = []

          while (dates.lte(current, last, 'day')) {
            days.push(current)
            current = dates.add(current, 1, 'day')
          }

          return days
        },
        ceil: function ceil(date, unit) {
          var floor = dates.startOf(date, unit)
          return dates.eq(floor, date) ? floor : dates.add(floor, 1, unit)
        },
        range: function range(start, end, unit) {
          if (unit === void 0) {
            unit = 'day'
          }

          var current = start,
            days = []

          while (dates.lte(current, end, unit)) {
            days.push(current)
            current = dates.add(current, 1, unit)
          }

          return days
        },
        merge: function merge(date, time) {
          if (time == null && date == null) return null
          if (time == null) time = new Date()
          if (date == null) date = new Date()
          date = dates.startOf(date, 'day')
          date = dates.hours(date, dates.hours(time))
          date = dates.minutes(date, dates.minutes(time))
          date = dates.seconds(date, dates.seconds(time))
          return dates.milliseconds(date, dates.milliseconds(time))
        },
        eqTime: function eqTime(dateA, dateB) {
          return (
            dates.hours(dateA) === dates.hours(dateB) &&
            dates.minutes(dateA) === dates.minutes(dateB) &&
            dates.seconds(dateA) === dates.seconds(dateB)
          )
        },
        isJustDate: function isJustDate(date) {
          return (
            dates.hours(date) === 0 &&
            dates.minutes(date) === 0 &&
            dates.seconds(date) === 0 &&
            dates.milliseconds(date) === 0
          )
        },
        duration: function duration(start, end, unit, firstOfWeek) {
          if (unit === 'day') unit = 'date'
          return Math.abs(
            dates[unit](start, undefined, firstOfWeek) -
              dates[unit](end, undefined, firstOfWeek)
          )
        },
        diff: function diff(dateA, dateB, unit) {
          if (!unit || unit === 'milliseconds') return Math.abs(+dateA - +dateB) // the .round() handles an edge case
          // with DST where the total won't be exact
          // since one day in the range may be shorter/longer by an hour

          return Math.round(
            Math.abs(
              +dates.startOf(dateA, unit) / MILLI[unit] -
                +dates.startOf(dateB, unit) / MILLI[unit]
            )
          )
        },
        total: function total(date, unit) {
          var ms = date.getTime(),
            div = 1

          switch (unit) {
            case 'week':
              div *= 7

            case 'day':
              div *= 24

            case 'hours':
              div *= 60

            case 'minutes':
              div *= 60

            case 'seconds':
              div *= 1000
          }

          return ms / div
        },
        week: function week(date) {
          var d = new Date(date)
          d.setHours(0, 0, 0)
          d.setDate(d.getDate() + 4 - (d.getDay() || 7))
          return Math.ceil(
            ((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7 + 1) / 7
          )
        },
        today: function today() {
          return dates.startOf(new Date(), 'day')
        },
        yesterday: function yesterday() {
          return dates.add(dates.startOf(new Date(), 'day'), -1, 'day')
        },
        tomorrow: function tomorrow() {
          return dates.add(dates.startOf(new Date(), 'day'), 1, 'day')
        },
      })
      var _default = dates
      exports.default = _default
      module.exports = exports['default']

      /***/
    },

    /******/
  }
)
//# sourceMappingURL=bundle.js.map
