;(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory(require('react'), require('react-dom')))
    : typeof define === 'function' && define.amd
    ? define(['react', 'react-dom'], factory)
    : ((global = global || self),
      (global.ReactBigCalendar = factory(global.React, global.ReactDOM)))
})(this, function(React, reactDom) {
  'use strict'

  var React__default = 'default' in React ? React['default'] : React
  var reactDom__default = 'default' in reactDom ? reactDom['default'] : reactDom

  function _extends() {
    _extends =
      Object.assign ||
      function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i]

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key]
            }
          }
        }

        return target
      }

    return _extends.apply(this, arguments)
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {}
    var target = {}
    var sourceKeys = Object.keys(source)
    var key, i

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i]
      if (excluded.indexOf(key) >= 0) continue
      target[key] = source[key]
    }

    return target
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype)
    subClass.prototype.constructor = subClass
    subClass.__proto__ = superClass
  }

  var commonjsGlobal =
    typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : typeof self !== 'undefined'
      ? self
      : {}

  function unwrapExports(x) {
    return x &&
      x.__esModule &&
      Object.prototype.hasOwnProperty.call(x, 'default')
      ? x.default
      : x
  }

  function createCommonjsModule(fn, module) {
    return (
      (module = { exports: {} }), fn(module, module.exports), module.exports
    )
  }

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  /* eslint-disable no-unused-vars */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols
  var hasOwnProperty = Object.prototype.hasOwnProperty
  var propIsEnumerable = Object.prototype.propertyIsEnumerable

  function toObject(val) {
    if (val === null || val === undefined) {
      throw new TypeError(
        'Object.assign cannot be called with null or undefined'
      )
    }

    return Object(val)
  }

  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false
      }

      // Detect buggy property enumeration order in older V8 versions.

      // https://bugs.chromium.org/p/v8/issues/detail?id=4118
      var test1 = new String('abc') // eslint-disable-line no-new-wrappers
      test1[5] = 'de'
      if (Object.getOwnPropertyNames(test1)[0] === '5') {
        return false
      }

      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
      var test2 = {}
      for (var i = 0; i < 10; i++) {
        test2['_' + String.fromCharCode(i)] = i
      }
      var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
        return test2[n]
      })
      if (order2.join('') !== '0123456789') {
        return false
      }

      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
      var test3 = {}
      'abcdefghijklmnopqrst'.split('').forEach(function(letter) {
        test3[letter] = letter
      })
      if (
        Object.keys(Object.assign({}, test3)).join('') !==
        'abcdefghijklmnopqrst'
      ) {
        return false
      }

      return true
    } catch (err) {
      // We don't expect any of the above to throw, but better to be safe.
      return false
    }
  }

  var objectAssign = shouldUseNative()
    ? Object.assign
    : function(target, source) {
        var from
        var to = toObject(target)
        var symbols

        for (var s = 1; s < arguments.length; s++) {
          from = Object(arguments[s])

          for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
              to[key] = from[key]
            }
          }

          if (getOwnPropertySymbols) {
            symbols = getOwnPropertySymbols(from)
            for (var i = 0; i < symbols.length; i++) {
              if (propIsEnumerable.call(from, symbols[i])) {
                to[symbols[i]] = from[symbols[i]]
              }
            }
          }
        }

        return to
      }

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED'

  var ReactPropTypesSecret_1 = ReactPropTypesSecret

  var printWarning = function() {}

  {
    var ReactPropTypesSecret$1 = ReactPropTypesSecret_1
    var loggedTypeFailures = {}

    printWarning = function(text) {
      var message = 'Warning: ' + text
      if (typeof console !== 'undefined') {
        console.error(message)
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message)
      } catch (x) {}
    }
  }

  /**
   * Assert that the values match with the type specs.
   * Error messages are memorized and will only be shown once.
   *
   * @param {object} typeSpecs Map of name to a ReactPropType
   * @param {object} values Runtime values that need to be type-checked
   * @param {string} location e.g. "prop", "context", "child context"
   * @param {string} componentName Name of the component for error messages.
   * @param {?Function} getStack Returns the component stack.
   * @private
   */
  function checkPropTypes(
    typeSpecs,
    values,
    location,
    componentName,
    getStack
  ) {
    {
      for (var typeSpecName in typeSpecs) {
        if (typeSpecs.hasOwnProperty(typeSpecName)) {
          var error
          // Prop type validation may throw. In case they do, we don't want to
          // fail the render phase where it didn't fail before. So we log it.
          // After these have been cleaned up, we'll let them throw.
          try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            if (typeof typeSpecs[typeSpecName] !== 'function') {
              var err = Error(
                (componentName || 'React class') +
                  ': ' +
                  location +
                  ' type `' +
                  typeSpecName +
                  '` is invalid; ' +
                  'it must be a function, usually from the `prop-types` package, but received `' +
                  typeof typeSpecs[typeSpecName] +
                  '`.'
              )
              err.name = 'Invariant Violation'
              throw err
            }
            error = typeSpecs[typeSpecName](
              values,
              typeSpecName,
              componentName,
              location,
              null,
              ReactPropTypesSecret$1
            )
          } catch (ex) {
            error = ex
          }
          if (error && !(error instanceof Error)) {
            printWarning(
              (componentName || 'React class') +
                ': type specification of ' +
                location +
                ' `' +
                typeSpecName +
                '` is invalid; the type checker ' +
                'function must return `null` or an `Error` but returned a ' +
                typeof error +
                '. ' +
                'You may have forgotten to pass an argument to the type checker ' +
                'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
                'shape all require an argument).'
            )
          }
          if (
            error instanceof Error &&
            !(error.message in loggedTypeFailures)
          ) {
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error.message] = true

            var stack = getStack ? getStack() : ''

            printWarning(
              'Failed ' +
                location +
                ' type: ' +
                error.message +
                (stack != null ? stack : '')
            )
          }
        }
      }
    }
  }

  var checkPropTypes_1 = checkPropTypes

  var printWarning$1 = function() {}

  {
    printWarning$1 = function(text) {
      var message = 'Warning: ' + text
      if (typeof console !== 'undefined') {
        console.error(message)
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message)
      } catch (x) {}
    }
  }

  function emptyFunctionThatReturnsNull() {
    return null
  }

  var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
    /* global Symbol */
    var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator
    var FAUX_ITERATOR_SYMBOL = '@@iterator' // Before Symbol spec.

    /**
     * Returns the iterator method function contained on the iterable object.
     *
     * Be sure to invoke the function with the iterable as context:
     *
     *     var iteratorFn = getIteratorFn(myIterable);
     *     if (iteratorFn) {
     *       var iterator = iteratorFn.call(myIterable);
     *       ...
     *     }
     *
     * @param {?object} maybeIterable
     * @return {?function}
     */
    function getIteratorFn(maybeIterable) {
      var iteratorFn =
        maybeIterable &&
        ((ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL]) ||
          maybeIterable[FAUX_ITERATOR_SYMBOL])
      if (typeof iteratorFn === 'function') {
        return iteratorFn
      }
    }

    /**
     * Collection of methods that allow declaration and validation of props that are
     * supplied to React components. Example usage:
     *
     *   var Props = require('ReactPropTypes');
     *   var MyArticle = React.createClass({
     *     propTypes: {
     *       // An optional string prop named "description".
     *       description: Props.string,
     *
     *       // A required enum prop named "category".
     *       category: Props.oneOf(['News','Photos']).isRequired,
     *
     *       // A prop named "dialog" that requires an instance of Dialog.
     *       dialog: Props.instanceOf(Dialog).isRequired
     *     },
     *     render: function() { ... }
     *   });
     *
     * A more formal specification of how these methods are used:
     *
     *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
     *   decl := ReactPropTypes.{type}(.isRequired)?
     *
     * Each and every declaration produces a function with the same signature. This
     * allows the creation of custom validation functions. For example:
     *
     *  var MyLink = React.createClass({
     *    propTypes: {
     *      // An optional string or URI prop named "href".
     *      href: function(props, propName, componentName) {
     *        var propValue = props[propName];
     *        if (propValue != null && typeof propValue !== 'string' &&
     *            !(propValue instanceof URI)) {
     *          return new Error(
     *            'Expected a string or an URI for ' + propName + ' in ' +
     *            componentName
     *          );
     *        }
     *      }
     *    },
     *    render: function() {...}
     *  });
     *
     * @internal
     */

    var ANONYMOUS = '<<anonymous>>'

    // Important!
    // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
    var ReactPropTypes = {
      array: createPrimitiveTypeChecker('array'),
      bool: createPrimitiveTypeChecker('boolean'),
      func: createPrimitiveTypeChecker('function'),
      number: createPrimitiveTypeChecker('number'),
      object: createPrimitiveTypeChecker('object'),
      string: createPrimitiveTypeChecker('string'),
      symbol: createPrimitiveTypeChecker('symbol'),

      any: createAnyTypeChecker(),
      arrayOf: createArrayOfTypeChecker,
      element: createElementTypeChecker(),
      instanceOf: createInstanceTypeChecker,
      node: createNodeChecker(),
      objectOf: createObjectOfTypeChecker,
      oneOf: createEnumTypeChecker,
      oneOfType: createUnionTypeChecker,
      shape: createShapeTypeChecker,
      exact: createStrictShapeTypeChecker,
    }

    /**
     * inlined Object.is polyfill to avoid requiring consumers ship their own
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
     */
    /*eslint-disable no-self-compare*/
    function is(x, y) {
      // SameValue algorithm
      if (x === y) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        return x !== 0 || 1 / x === 1 / y
      } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y
      }
    }
    /*eslint-enable no-self-compare*/

    /**
     * We use an Error-like object for backward compatibility as people may call
     * PropTypes directly and inspect their output. However, we don't use real
     * Errors anymore. We don't inspect their stack anyway, and creating them
     * is prohibitively expensive if they are created too often, such as what
     * happens in oneOfType() for any type before the one that matched.
     */
    function PropTypeError(message) {
      this.message = message
      this.stack = ''
    }
    // Make `instanceof Error` still work for returned errors.
    PropTypeError.prototype = Error.prototype

    function createChainableTypeChecker(validate) {
      {
        var manualPropTypeCallCache = {}
        var manualPropTypeWarningCount = 0
      }
      function checkType(
        isRequired,
        props,
        propName,
        componentName,
        location,
        propFullName,
        secret
      ) {
        componentName = componentName || ANONYMOUS
        propFullName = propFullName || propName

        if (secret !== ReactPropTypesSecret_1) {
          if (throwOnDirectAccess) {
            // New behavior only for users of `prop-types` package
            var err = new Error(
              'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
                'Use `PropTypes.checkPropTypes()` to call them. ' +
                'Read more at http://fb.me/use-check-prop-types'
            )
            err.name = 'Invariant Violation'
            throw err
          } else if (typeof console !== 'undefined') {
            // Old behavior for people using React.PropTypes
            var cacheKey = componentName + ':' + propName
            if (
              !manualPropTypeCallCache[cacheKey] &&
              // Avoid spamming the console because they are often not actionable except for lib authors
              manualPropTypeWarningCount < 3
            ) {
              printWarning$1(
                'You are manually calling a React.PropTypes validation ' +
                  'function for the `' +
                  propFullName +
                  '` prop on `' +
                  componentName +
                  '`. This is deprecated ' +
                  'and will throw in the standalone `prop-types` package. ' +
                  'You may be seeing this warning due to a third-party PropTypes ' +
                  'library. See https://fb.me/react-warning-dont-call-proptypes ' +
                  'for details.'
              )
              manualPropTypeCallCache[cacheKey] = true
              manualPropTypeWarningCount++
            }
          }
        }
        if (props[propName] == null) {
          if (isRequired) {
            if (props[propName] === null) {
              return new PropTypeError(
                'The ' +
                  location +
                  ' `' +
                  propFullName +
                  '` is marked as required ' +
                  ('in `' + componentName + '`, but its value is `null`.')
              )
            }
            return new PropTypeError(
              'The ' +
                location +
                ' `' +
                propFullName +
                '` is marked as required in ' +
                ('`' + componentName + '`, but its value is `undefined`.')
            )
          }
          return null
        } else {
          return validate(
            props,
            propName,
            componentName,
            location,
            propFullName
          )
        }
      }

      var chainedCheckType = checkType.bind(null, false)
      chainedCheckType.isRequired = checkType.bind(null, true)

      return chainedCheckType
    }

    function createPrimitiveTypeChecker(expectedType) {
      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName,
        secret
      ) {
        var propValue = props[propName]
        var propType = getPropType(propValue)
        if (propType !== expectedType) {
          // `propValue` being instance of, say, date/regexp, pass the 'object'
          // check, but we can offer a more precise error message here rather than
          // 'of type `object`'.
          var preciseType = getPreciseType(propValue)

          return new PropTypeError(
            'Invalid ' +
              location +
              ' `' +
              propFullName +
              '` of type ' +
              ('`' +
                preciseType +
                '` supplied to `' +
                componentName +
                '`, expected ') +
              ('`' + expectedType + '`.')
          )
        }
        return null
      }
      return createChainableTypeChecker(validate)
    }

    function createAnyTypeChecker() {
      return createChainableTypeChecker(emptyFunctionThatReturnsNull)
    }

    function createArrayOfTypeChecker(typeChecker) {
      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError(
            'Property `' +
              propFullName +
              '` of component `' +
              componentName +
              '` has invalid PropType notation inside arrayOf.'
          )
        }
        var propValue = props[propName]
        if (!Array.isArray(propValue)) {
          var propType = getPropType(propValue)
          return new PropTypeError(
            'Invalid ' +
              location +
              ' `' +
              propFullName +
              '` of type ' +
              ('`' +
                propType +
                '` supplied to `' +
                componentName +
                '`, expected an array.')
          )
        }
        for (var i = 0; i < propValue.length; i++) {
          var error = typeChecker(
            propValue,
            i,
            componentName,
            location,
            propFullName + '[' + i + ']',
            ReactPropTypesSecret_1
          )
          if (error instanceof Error) {
            return error
          }
        }
        return null
      }
      return createChainableTypeChecker(validate)
    }

    function createElementTypeChecker() {
      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        var propValue = props[propName]
        if (!isValidElement(propValue)) {
          var propType = getPropType(propValue)
          return new PropTypeError(
            'Invalid ' +
              location +
              ' `' +
              propFullName +
              '` of type ' +
              ('`' +
                propType +
                '` supplied to `' +
                componentName +
                '`, expected a single ReactElement.')
          )
        }
        return null
      }
      return createChainableTypeChecker(validate)
    }

    function createInstanceTypeChecker(expectedClass) {
      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        if (!(props[propName] instanceof expectedClass)) {
          var expectedClassName = expectedClass.name || ANONYMOUS
          var actualClassName = getClassName(props[propName])
          return new PropTypeError(
            'Invalid ' +
              location +
              ' `' +
              propFullName +
              '` of type ' +
              ('`' +
                actualClassName +
                '` supplied to `' +
                componentName +
                '`, expected ') +
              ('instance of `' + expectedClassName + '`.')
          )
        }
        return null
      }
      return createChainableTypeChecker(validate)
    }

    function createEnumTypeChecker(expectedValues) {
      if (!Array.isArray(expectedValues)) {
        printWarning$1(
          'Invalid argument supplied to oneOf, expected an instance of array.'
        )
        return emptyFunctionThatReturnsNull
      }

      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        var propValue = props[propName]
        for (var i = 0; i < expectedValues.length; i++) {
          if (is(propValue, expectedValues[i])) {
            return null
          }
        }

        var valuesString = JSON.stringify(expectedValues)
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of value `' +
            propValue +
            '` ' +
            ('supplied to `' +
              componentName +
              '`, expected one of ' +
              valuesString +
              '.')
        )
      }
      return createChainableTypeChecker(validate)
    }

    function createObjectOfTypeChecker(typeChecker) {
      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError(
            'Property `' +
              propFullName +
              '` of component `' +
              componentName +
              '` has invalid PropType notation inside objectOf.'
          )
        }
        var propValue = props[propName]
        var propType = getPropType(propValue)
        if (propType !== 'object') {
          return new PropTypeError(
            'Invalid ' +
              location +
              ' `' +
              propFullName +
              '` of type ' +
              ('`' +
                propType +
                '` supplied to `' +
                componentName +
                '`, expected an object.')
          )
        }
        for (var key in propValue) {
          if (propValue.hasOwnProperty(key)) {
            var error = typeChecker(
              propValue,
              key,
              componentName,
              location,
              propFullName + '.' + key,
              ReactPropTypesSecret_1
            )
            if (error instanceof Error) {
              return error
            }
          }
        }
        return null
      }
      return createChainableTypeChecker(validate)
    }

    function createUnionTypeChecker(arrayOfTypeCheckers) {
      if (!Array.isArray(arrayOfTypeCheckers)) {
        printWarning$1(
          'Invalid argument supplied to oneOfType, expected an instance of array.'
        )
        return emptyFunctionThatReturnsNull
      }

      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i]
        if (typeof checker !== 'function') {
          printWarning$1(
            'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
              'received ' +
              getPostfixForTypeWarning(checker) +
              ' at index ' +
              i +
              '.'
          )
          return emptyFunctionThatReturnsNull
        }
      }

      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i]
          if (
            checker(
              props,
              propName,
              componentName,
              location,
              propFullName,
              ReactPropTypesSecret_1
            ) == null
          ) {
            return null
          }
        }

        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` supplied to ' +
            ('`' + componentName + '`.')
        )
      }
      return createChainableTypeChecker(validate)
    }

    function createNodeChecker() {
      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        if (!isNode(props[propName])) {
          return new PropTypeError(
            'Invalid ' +
              location +
              ' `' +
              propFullName +
              '` supplied to ' +
              ('`' + componentName + '`, expected a ReactNode.')
          )
        }
        return null
      }
      return createChainableTypeChecker(validate)
    }

    function createShapeTypeChecker(shapeTypes) {
      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        var propValue = props[propName]
        var propType = getPropType(propValue)
        if (propType !== 'object') {
          return new PropTypeError(
            'Invalid ' +
              location +
              ' `' +
              propFullName +
              '` of type `' +
              propType +
              '` ' +
              ('supplied to `' + componentName + '`, expected `object`.')
          )
        }
        for (var key in shapeTypes) {
          var checker = shapeTypes[key]
          if (!checker) {
            continue
          }
          var error = checker(
            propValue,
            key,
            componentName,
            location,
            propFullName + '.' + key,
            ReactPropTypesSecret_1
          )
          if (error) {
            return error
          }
        }
        return null
      }
      return createChainableTypeChecker(validate)
    }

    function createStrictShapeTypeChecker(shapeTypes) {
      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        var propValue = props[propName]
        var propType = getPropType(propValue)
        if (propType !== 'object') {
          return new PropTypeError(
            'Invalid ' +
              location +
              ' `' +
              propFullName +
              '` of type `' +
              propType +
              '` ' +
              ('supplied to `' + componentName + '`, expected `object`.')
          )
        }
        // We need to check all keys in case some are required but missing from
        // props.
        var allKeys = objectAssign({}, props[propName], shapeTypes)
        for (var key in allKeys) {
          var checker = shapeTypes[key]
          if (!checker) {
            return new PropTypeError(
              'Invalid ' +
                location +
                ' `' +
                propFullName +
                '` key `' +
                key +
                '` supplied to `' +
                componentName +
                '`.' +
                '\nBad object: ' +
                JSON.stringify(props[propName], null, '  ') +
                '\nValid keys: ' +
                JSON.stringify(Object.keys(shapeTypes), null, '  ')
            )
          }
          var error = checker(
            propValue,
            key,
            componentName,
            location,
            propFullName + '.' + key,
            ReactPropTypesSecret_1
          )
          if (error) {
            return error
          }
        }
        return null
      }

      return createChainableTypeChecker(validate)
    }

    function isNode(propValue) {
      switch (typeof propValue) {
        case 'number':
        case 'string':
        case 'undefined':
          return true
        case 'boolean':
          return !propValue
        case 'object':
          if (Array.isArray(propValue)) {
            return propValue.every(isNode)
          }
          if (propValue === null || isValidElement(propValue)) {
            return true
          }

          var iteratorFn = getIteratorFn(propValue)
          if (iteratorFn) {
            var iterator = iteratorFn.call(propValue)
            var step
            if (iteratorFn !== propValue.entries) {
              while (!(step = iterator.next()).done) {
                if (!isNode(step.value)) {
                  return false
                }
              }
            } else {
              // Iterator will provide entry [k,v] tuples rather than values.
              while (!(step = iterator.next()).done) {
                var entry = step.value
                if (entry) {
                  if (!isNode(entry[1])) {
                    return false
                  }
                }
              }
            }
          } else {
            return false
          }

          return true
        default:
          return false
      }
    }

    function isSymbol(propType, propValue) {
      // Native Symbol.
      if (propType === 'symbol') {
        return true
      }

      // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
      if (propValue['@@toStringTag'] === 'Symbol') {
        return true
      }

      // Fallback for non-spec compliant Symbols which are polyfilled.
      if (typeof Symbol === 'function' && propValue instanceof Symbol) {
        return true
      }

      return false
    }

    // Equivalent of `typeof` but with special handling for array and regexp.
    function getPropType(propValue) {
      var propType = typeof propValue
      if (Array.isArray(propValue)) {
        return 'array'
      }
      if (propValue instanceof RegExp) {
        // Old webkits (at least until Android 4.0) return 'function' rather than
        // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
        // passes PropTypes.object.
        return 'object'
      }
      if (isSymbol(propType, propValue)) {
        return 'symbol'
      }
      return propType
    }

    // This handles more types than `getPropType`. Only used for error messages.
    // See `createPrimitiveTypeChecker`.
    function getPreciseType(propValue) {
      if (typeof propValue === 'undefined' || propValue === null) {
        return '' + propValue
      }
      var propType = getPropType(propValue)
      if (propType === 'object') {
        if (propValue instanceof Date) {
          return 'date'
        } else if (propValue instanceof RegExp) {
          return 'regexp'
        }
      }
      return propType
    }

    // Returns a string that is postfixed to a warning about an invalid type.
    // For example, "undefined" or "of type array"
    function getPostfixForTypeWarning(value) {
      var type = getPreciseType(value)
      switch (type) {
        case 'array':
        case 'object':
          return 'an ' + type
        case 'boolean':
        case 'date':
        case 'regexp':
          return 'a ' + type
        default:
          return type
      }
    }

    // Returns class name of the object, if any.
    function getClassName(propValue) {
      if (!propValue.constructor || !propValue.constructor.name) {
        return ANONYMOUS
      }
      return propValue.constructor.name
    }

    ReactPropTypes.checkPropTypes = checkPropTypes_1
    ReactPropTypes.PropTypes = ReactPropTypes

    return ReactPropTypes
  }

  var propTypes = createCommonjsModule(function(module) {
    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */

    {
      var REACT_ELEMENT_TYPE =
        (typeof Symbol === 'function' &&
          Symbol.for &&
          Symbol.for('react.element')) ||
        0xeac7

      var isValidElement = function(object) {
        return (
          typeof object === 'object' &&
          object !== null &&
          object.$$typeof === REACT_ELEMENT_TYPE
        )
      }

      // By explicitly using `prop-types` you are opting into new development behavior.
      // http://fb.me/prop-types-in-prod
      var throwOnDirectAccess = true
      module.exports = factoryWithTypeCheckers(
        isValidElement,
        throwOnDirectAccess
      )
    }
  })

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var invariant$1 = function(condition, format, a, b, c, d, e, f) {
    {
      if (format === undefined) {
        throw new Error('invariant requires an error message argument')
      }
    }

    if (!condition) {
      var error
      if (format === undefined) {
        error = new Error(
          'Minified exception occurred; use the non-minified dev environment ' +
            'for the full error message and additional helpful warnings.'
        )
      } else {
        var args = [a, b, c, d, e, f]
        var argIndex = 0
        error = new Error(
          format.replace(/%s/g, function() {
            return args[argIndex++]
          })
        )
        error.name = 'Invariant Violation'
      }

      error.framesToPop = 1 // we don't care about invariant's own frame
      throw error
    }
  }

  var invariant_1 = invariant$1

  var utils = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.uncontrolledPropTypes = uncontrolledPropTypes
    exports.isProp = isProp
    exports.defaultKey = defaultKey
    exports.canAcceptRef = canAcceptRef

    var _invariant = _interopRequireDefault(invariant_1)

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    var noop = function noop() {}

    function readOnlyPropType(handler, name) {
      return function(props, propName) {
        if (props[propName] !== undefined) {
          if (!props[handler]) {
            return new Error(
              'You have provided a `' +
                propName +
                '` prop to `' +
                name +
                '` ' +
                ('without an `' +
                  handler +
                  '` handler prop. This will render a read-only field. ') +
                ('If the field should be mutable use `' +
                  defaultKey(propName) +
                  '`. ') +
                ('Otherwise, set `' + handler + '`.')
            )
          }
        }
      }
    }

    function uncontrolledPropTypes(controlledValues, displayName) {
      var propTypes = {}
      Object.keys(controlledValues).forEach(function(prop) {
        // add default propTypes for folks that use runtime checks
        propTypes[defaultKey(prop)] = noop

        {
          var handler = controlledValues[prop]
          !(typeof handler === 'string' && handler.trim().length)
            ? (0, _invariant.default)(
                false,
                'Uncontrollable - [%s]: the prop `%s` needs a valid handler key name in order to make it uncontrollable',
                displayName,
                prop
              )
            : void 0
          propTypes[prop] = readOnlyPropType(handler, displayName)
        }
      })
      return propTypes
    }

    function isProp(props, prop) {
      return props[prop] !== undefined
    }

    function defaultKey(key) {
      return 'default' + key.charAt(0).toUpperCase() + key.substr(1)
    }
    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     * All rights reserved.
     *
     * This source code is licensed under the BSD-style license found in the
     * LICENSE file in the root directory of this source tree. An additional grant
     * of patent rights can be found in the PATENTS file in the same directory.
     */

    function canAcceptRef(component) {
      return (
        !!component &&
        (typeof component !== 'function' ||
          (component.prototype && component.prototype.isReactComponent))
      )
    }
  })

  unwrapExports(utils)
  var utils_1 = utils.uncontrolledPropTypes
  var utils_2 = utils.isProp
  var utils_3 = utils.defaultKey
  var utils_4 = utils.canAcceptRef

  var lib = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = uncontrollable

    var _react = _interopRequireDefault(React__default)

    var _invariant = _interopRequireDefault(invariant_1)

    var Utils = _interopRequireWildcard(utils)

    var _jsxFileName = 'src/index.js'

    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj
      } else {
        var newObj = {}
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              var desc =
                Object.defineProperty && Object.getOwnPropertyDescriptor
                  ? Object.getOwnPropertyDescriptor(obj, key)
                  : {}
              if (desc.get || desc.set) {
                Object.defineProperty(newObj, key, desc)
              } else {
                newObj[key] = obj[key]
              }
            }
          }
        }
        newObj.default = obj
        return newObj
      }
    }

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    function _extends() {
      _extends =
        Object.assign ||
        function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i]
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key]
              }
            }
          }
          return target
        }
      return _extends.apply(this, arguments)
    }

    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {}
      var target = {}
      var sourceKeys = Object.keys(source)
      var key, i
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i]
        if (excluded.indexOf(key) >= 0) continue
        target[key] = source[key]
      }
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source)
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i]
          if (excluded.indexOf(key) >= 0) continue
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue
          target[key] = source[key]
        }
      }
      return target
    }

    function _inheritsLoose(subClass, superClass) {
      subClass.prototype.__proto__ = superClass && superClass.prototype
      subClass.__proto__ = superClass
    }

    function uncontrollable(Component, controlledValues, methods) {
      if (methods === void 0) {
        methods = []
      }

      var displayName = Component.displayName || Component.name || 'Component'
      var canAcceptRef = Utils.canAcceptRef(Component)
      var controlledProps = Object.keys(controlledValues)
      var PROPS_TO_OMIT = controlledProps.map(Utils.defaultKey)
      !(canAcceptRef || !methods.length)
        ? (0, _invariant.default)(
            false,
            '[uncontrollable] stateless function components cannot pass through methods ' +
              'because they have no associated instances. Check component: ' +
              displayName +
              ', ' +
              'attempting to pass through methods: ' +
              methods.join(', ')
          )
        : void 0

      var UncontrolledComponent =
        /*#__PURE__*/
        (function(_React$Component) {
          _inheritsLoose(UncontrolledComponent, _React$Component)

          function UncontrolledComponent() {
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
            _this.handlers = Object.create(null)
            controlledProps.forEach(function(propName) {
              var handlerName = controlledValues[propName]

              var handleChange = function handleChange(value) {
                if (_this.props[handlerName]) {
                  var _this$props

                  _this._notifying = true

                  for (
                    var _len2 = arguments.length,
                      args = new Array(_len2 > 1 ? _len2 - 1 : 0),
                      _key2 = 1;
                    _key2 < _len2;
                    _key2++
                  ) {
                    args[_key2 - 1] = arguments[_key2]
                  }

                  ;(_this$props = _this.props)[handlerName].apply(
                    _this$props,
                    [value].concat(args)
                  )

                  _this._notifying = false
                }

                _this._values[propName] = value
                if (!_this.unmounted) _this.forceUpdate()
              }

              _this.handlers[handlerName] = handleChange
            })
            if (methods.length)
              _this.attachRef = function(ref) {
                _this.inner = ref
              }
            return _this
          }

          var _proto = UncontrolledComponent.prototype

          _proto.shouldComponentUpdate = function shouldComponentUpdate() {
            //let the forceUpdate trigger the update
            return !this._notifying
          }

          _proto.componentWillMount = function componentWillMount() {
            var _this2 = this

            var props = this.props
            this._values = Object.create(null)
            controlledProps.forEach(function(key) {
              _this2._values[key] = props[Utils.defaultKey(key)]
            })
          }

          _proto.componentWillReceiveProps = function componentWillReceiveProps(
            nextProps
          ) {
            var _this3 = this

            var props = this.props
            controlledProps.forEach(function(key) {
              /**
               * If a prop switches from controlled to Uncontrolled
               * reset its value to the defaultValue
               */
              if (!Utils.isProp(nextProps, key) && Utils.isProp(props, key)) {
                _this3._values[key] = nextProps[Utils.defaultKey(key)]
              }
            })
          }

          _proto.componentWillUnmount = function componentWillUnmount() {
            this.unmounted = true
          }

          _proto.render = function render() {
            var _this4 = this

            var _this$props2 = this.props,
              innerRef = _this$props2.innerRef,
              props = _objectWithoutProperties(_this$props2, ['innerRef'])

            PROPS_TO_OMIT.forEach(function(prop) {
              delete props[prop]
            })
            var newProps = {}
            controlledProps.forEach(function(propName) {
              var propValue = _this4.props[propName]
              newProps[propName] =
                propValue !== undefined ? propValue : _this4._values[propName]
            })
            return _react.default.createElement(
              Component,
              _extends({}, props, newProps, this.handlers, {
                ref: innerRef || this.attachRef,
              })
            )
          }

          return UncontrolledComponent
        })(_react.default.Component)

      UncontrolledComponent.displayName = 'Uncontrolled(' + displayName + ')'
      UncontrolledComponent.propTypes = _extends(
        {
          innerRef: function innerRef() {},
        },
        Utils.uncontrolledPropTypes(controlledValues, displayName)
      )
      methods.forEach(function(method) {
        UncontrolledComponent.prototype[method] = function $proxiedMethod() {
          var _this$inner

          return (_this$inner = this.inner)[method].apply(
            _this$inner,
            arguments
          )
        }
      })
      var WrappedComponent = UncontrolledComponent

      if (_react.default.forwardRef) {
        WrappedComponent = _react.default.forwardRef(function(props, ref) {
          return _react.default.createElement(
            UncontrolledComponent,
            _extends({}, props, {
              innerRef: ref,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 127,
              },
              __self: this,
            })
          )
        })
        WrappedComponent.propTypes = UncontrolledComponent.propTypes
      }

      WrappedComponent.ControlledComponent = Component
      /**
       * useful when wrapping a Component and you want to control
       * everything
       */

      WrappedComponent.deferControlTo = function(
        newComponent,
        additions,
        nextMethods
      ) {
        if (additions === void 0) {
          additions = {}
        }

        return uncontrollable(
          newComponent,
          _extends({}, controlledValues, additions),
          nextMethods
        )
      }

      return WrappedComponent
    }

    module.exports = exports['default']
  })

  var uncontrollable = unwrapExports(lib)

  var classnames = createCommonjsModule(function(module) {
    /*!
    Copyright (c) 2017 Jed Watson.
    Licensed under the MIT License (MIT), see
    http://jedwatson.github.io/classnames
  */
    /* global define */

    ;(function() {
      var hasOwn = {}.hasOwnProperty

      function classNames() {
        var classes = []

        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i]
          if (!arg) continue

          var argType = typeof arg

          if (argType === 'string' || argType === 'number') {
            classes.push(arg)
          } else if (Array.isArray(arg) && arg.length) {
            var inner = classNames.apply(null, arg)
            if (inner) {
              classes.push(inner)
            }
          } else if (argType === 'object') {
            for (var key in arg) {
              if (hasOwn.call(arg, key) && arg[key]) {
                classes.push(key)
              }
            }
          }
        }

        return classes.join(' ')
      }

      if (module.exports) {
        classNames.default = classNames
        module.exports = classNames
      } else {
        window.classNames = classNames
      }
    })()
  })

  var reactIs_production_min = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, '__esModule', { value: !0 })
    var b = 'function' === typeof Symbol && Symbol.for,
      c = b ? Symbol.for('react.element') : 60103,
      d = b ? Symbol.for('react.portal') : 60106,
      e = b ? Symbol.for('react.fragment') : 60107,
      f = b ? Symbol.for('react.strict_mode') : 60108,
      g = b ? Symbol.for('react.profiler') : 60114,
      h = b ? Symbol.for('react.provider') : 60109,
      k = b ? Symbol.for('react.context') : 60110,
      l = b ? Symbol.for('react.async_mode') : 60111,
      m = b ? Symbol.for('react.forward_ref') : 60112,
      n = b ? Symbol.for('react.placeholder') : 60113
    function q(a) {
      if ('object' === typeof a && null !== a) {
        var p = a.$$typeof
        switch (p) {
          case c:
            switch (((a = a.type), a)) {
              case l:
              case e:
              case g:
              case f:
                return a
              default:
                switch (((a = a && a.$$typeof), a)) {
                  case k:
                  case m:
                  case h:
                    return a
                  default:
                    return p
                }
            }
          case d:
            return p
        }
      }
    }
    exports.typeOf = q
    exports.AsyncMode = l
    exports.ContextConsumer = k
    exports.ContextProvider = h
    exports.Element = c
    exports.ForwardRef = m
    exports.Fragment = e
    exports.Profiler = g
    exports.Portal = d
    exports.StrictMode = f
    exports.isValidElementType = function(a) {
      return (
        'string' === typeof a ||
        'function' === typeof a ||
        a === e ||
        a === l ||
        a === g ||
        a === f ||
        a === n ||
        ('object' === typeof a &&
          null !== a &&
          ('function' === typeof a.then ||
            a.$$typeof === h ||
            a.$$typeof === k ||
            a.$$typeof === m))
      )
    }
    exports.isAsyncMode = function(a) {
      return q(a) === l
    }
    exports.isContextConsumer = function(a) {
      return q(a) === k
    }
    exports.isContextProvider = function(a) {
      return q(a) === h
    }
    exports.isElement = function(a) {
      return 'object' === typeof a && null !== a && a.$$typeof === c
    }
    exports.isForwardRef = function(a) {
      return q(a) === m
    }
    exports.isFragment = function(a) {
      return q(a) === e
    }
    exports.isProfiler = function(a) {
      return q(a) === g
    }
    exports.isPortal = function(a) {
      return q(a) === d
    }
    exports.isStrictMode = function(a) {
      return q(a) === f
    }
  })

  unwrapExports(reactIs_production_min)
  var reactIs_production_min_1 = reactIs_production_min.typeOf
  var reactIs_production_min_2 = reactIs_production_min.AsyncMode
  var reactIs_production_min_3 = reactIs_production_min.ContextConsumer
  var reactIs_production_min_4 = reactIs_production_min.ContextProvider
  var reactIs_production_min_5 = reactIs_production_min.Element
  var reactIs_production_min_6 = reactIs_production_min.ForwardRef
  var reactIs_production_min_7 = reactIs_production_min.Fragment
  var reactIs_production_min_8 = reactIs_production_min.Profiler
  var reactIs_production_min_9 = reactIs_production_min.Portal
  var reactIs_production_min_10 = reactIs_production_min.StrictMode
  var reactIs_production_min_11 = reactIs_production_min.isValidElementType
  var reactIs_production_min_12 = reactIs_production_min.isAsyncMode
  var reactIs_production_min_13 = reactIs_production_min.isContextConsumer
  var reactIs_production_min_14 = reactIs_production_min.isContextProvider
  var reactIs_production_min_15 = reactIs_production_min.isElement
  var reactIs_production_min_16 = reactIs_production_min.isForwardRef
  var reactIs_production_min_17 = reactIs_production_min.isFragment
  var reactIs_production_min_18 = reactIs_production_min.isProfiler
  var reactIs_production_min_19 = reactIs_production_min.isPortal
  var reactIs_production_min_20 = reactIs_production_min.isStrictMode

  var reactIs_development = createCommonjsModule(function(module, exports) {
    {
      ;(function() {
        Object.defineProperty(exports, '__esModule', { value: true })

        // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
        // nor polyfill, then a plain number is used for performance.
        var hasSymbol = typeof Symbol === 'function' && Symbol.for

        var REACT_ELEMENT_TYPE = hasSymbol
          ? Symbol.for('react.element')
          : 0xeac7
        var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca
        var REACT_FRAGMENT_TYPE = hasSymbol
          ? Symbol.for('react.fragment')
          : 0xeacb
        var REACT_STRICT_MODE_TYPE = hasSymbol
          ? Symbol.for('react.strict_mode')
          : 0xeacc
        var REACT_PROFILER_TYPE = hasSymbol
          ? Symbol.for('react.profiler')
          : 0xead2
        var REACT_PROVIDER_TYPE = hasSymbol
          ? Symbol.for('react.provider')
          : 0xeacd
        var REACT_CONTEXT_TYPE = hasSymbol
          ? Symbol.for('react.context')
          : 0xeace
        var REACT_ASYNC_MODE_TYPE = hasSymbol
          ? Symbol.for('react.async_mode')
          : 0xeacf
        var REACT_FORWARD_REF_TYPE = hasSymbol
          ? Symbol.for('react.forward_ref')
          : 0xead0
        var REACT_PLACEHOLDER_TYPE = hasSymbol
          ? Symbol.for('react.placeholder')
          : 0xead1

        function isValidElementType(type) {
          return (
            typeof type === 'string' ||
            typeof type === 'function' ||
            // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
            type === REACT_FRAGMENT_TYPE ||
            type === REACT_ASYNC_MODE_TYPE ||
            type === REACT_PROFILER_TYPE ||
            type === REACT_STRICT_MODE_TYPE ||
            type === REACT_PLACEHOLDER_TYPE ||
            (typeof type === 'object' &&
              type !== null &&
              (typeof type.then === 'function' ||
                type.$$typeof === REACT_PROVIDER_TYPE ||
                type.$$typeof === REACT_CONTEXT_TYPE ||
                type.$$typeof === REACT_FORWARD_REF_TYPE))
          )
        }

        function typeOf(object) {
          if (typeof object === 'object' && object !== null) {
            var $$typeof = object.$$typeof

            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type

                switch (type) {
                  case REACT_ASYNC_MODE_TYPE:
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                    return type
                  default:
                    var $$typeofType = type && type.$$typeof

                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType
                      default:
                        return $$typeof
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof
            }
          }

          return undefined
        }

        var AsyncMode = REACT_ASYNC_MODE_TYPE
        var ContextConsumer = REACT_CONTEXT_TYPE
        var ContextProvider = REACT_PROVIDER_TYPE
        var Element = REACT_ELEMENT_TYPE
        var ForwardRef = REACT_FORWARD_REF_TYPE
        var Fragment = REACT_FRAGMENT_TYPE
        var Profiler = REACT_PROFILER_TYPE
        var Portal = REACT_PORTAL_TYPE
        var StrictMode = REACT_STRICT_MODE_TYPE

        function isAsyncMode(object) {
          return typeOf(object) === REACT_ASYNC_MODE_TYPE
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE
        }
        function isElement(object) {
          return (
            typeof object === 'object' &&
            object !== null &&
            object.$$typeof === REACT_ELEMENT_TYPE
          )
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE
        }

        exports.typeOf = typeOf
        exports.AsyncMode = AsyncMode
        exports.ContextConsumer = ContextConsumer
        exports.ContextProvider = ContextProvider
        exports.Element = Element
        exports.ForwardRef = ForwardRef
        exports.Fragment = Fragment
        exports.Profiler = Profiler
        exports.Portal = Portal
        exports.StrictMode = StrictMode
        exports.isValidElementType = isValidElementType
        exports.isAsyncMode = isAsyncMode
        exports.isContextConsumer = isContextConsumer
        exports.isContextProvider = isContextProvider
        exports.isElement = isElement
        exports.isForwardRef = isForwardRef
        exports.isFragment = isFragment
        exports.isProfiler = isProfiler
        exports.isPortal = isPortal
        exports.isStrictMode = isStrictMode
      })()
    }
  })

  unwrapExports(reactIs_development)
  var reactIs_development_1 = reactIs_development.typeOf
  var reactIs_development_2 = reactIs_development.AsyncMode
  var reactIs_development_3 = reactIs_development.ContextConsumer
  var reactIs_development_4 = reactIs_development.ContextProvider
  var reactIs_development_5 = reactIs_development.Element
  var reactIs_development_6 = reactIs_development.ForwardRef
  var reactIs_development_7 = reactIs_development.Fragment
  var reactIs_development_8 = reactIs_development.Profiler
  var reactIs_development_9 = reactIs_development.Portal
  var reactIs_development_10 = reactIs_development.StrictMode
  var reactIs_development_11 = reactIs_development.isValidElementType
  var reactIs_development_12 = reactIs_development.isAsyncMode
  var reactIs_development_13 = reactIs_development.isContextConsumer
  var reactIs_development_14 = reactIs_development.isContextProvider
  var reactIs_development_15 = reactIs_development.isElement
  var reactIs_development_16 = reactIs_development.isForwardRef
  var reactIs_development_17 = reactIs_development.isFragment
  var reactIs_development_18 = reactIs_development.isProfiler
  var reactIs_development_19 = reactIs_development.isPortal
  var reactIs_development_20 = reactIs_development.isStrictMode

  var reactIs = createCommonjsModule(function(module) {
    {
      module.exports = reactIs_development
    }
  })

  var createChainableTypeChecker_1 = createCommonjsModule(function(
    module,
    exports
  ) {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })
    exports.default = createChainableTypeChecker
    /**
     * Copyright 2013-present, Facebook, Inc.
     * All rights reserved.
     *
     * This source code is licensed under the BSD-style license found in the
     * LICENSE file in the root directory of this source tree. An additional grant
     * of patent rights can be found in the PATENTS file in the same directory.
     */

    // Mostly taken from ReactPropTypes.

    function createChainableTypeChecker(validate) {
      function checkType(
        isRequired,
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        var componentNameSafe = componentName || '<<anonymous>>'
        var propFullNameSafe = propFullName || propName

        if (props[propName] == null) {
          if (isRequired) {
            return new Error(
              'Required ' +
                location +
                ' `' +
                propFullNameSafe +
                '` was not specified ' +
                ('in `' + componentNameSafe + '`.')
            )
          }

          return null
        }

        for (
          var _len = arguments.length,
            args = Array(_len > 6 ? _len - 6 : 0),
            _key = 6;
          _key < _len;
          _key++
        ) {
          args[_key - 6] = arguments[_key]
        }

        return validate.apply(
          undefined,
          [
            props,
            propName,
            componentNameSafe,
            location,
            propFullNameSafe,
          ].concat(args)
        )
      }

      var chainedCheckType = checkType.bind(null, false)
      chainedCheckType.isRequired = checkType.bind(null, true)

      return chainedCheckType
    }
    module.exports = exports['default']
  })

  unwrapExports(createChainableTypeChecker_1)

  var elementType_1 = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })

    var _react2 = _interopRequireDefault(React__default)

    var _createChainableTypeChecker2 = _interopRequireDefault(
      createChainableTypeChecker_1
    )

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    function elementType(
      props,
      propName,
      componentName,
      location,
      propFullName
    ) {
      var propValue = props[propName]

      if (_react2.default.isValidElement(propValue)) {
        return new Error(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type ReactElement ' +
            ('supplied to `' +
              componentName +
              '`,expected an element type (a string ') +
            ', component class, or function component).'
        )
      }

      if (!(0, reactIs.isValidElementType)(propValue)) {
        return new Error(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of value `' +
            propValue +
            '` ' +
            ('supplied to `' +
              componentName +
              '`, expected an element type (a string ') +
            ', component class, or function component).'
        )
      }

      return null
    }

    exports.default = (0, _createChainableTypeChecker2.default)(elementType)
    module.exports = exports['default']
  })

  var elementType = unwrapExports(elementType_1)

  var all_1 = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })
    exports.default = all

    var _createChainableTypeChecker2 = _interopRequireDefault(
      createChainableTypeChecker_1
    )

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    function all() {
      for (
        var _len = arguments.length, validators = Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        validators[_key] = arguments[_key]
      }

      function allPropTypes() {
        for (
          var _len2 = arguments.length, args = Array(_len2), _key2 = 0;
          _key2 < _len2;
          _key2++
        ) {
          args[_key2] = arguments[_key2]
        }

        var error = null

        validators.forEach(function(validator) {
          if (error != null) {
            return
          }

          var result = validator.apply(undefined, args)
          if (result != null) {
            error = result
          }
        })

        return error
      }

      return (0, _createChainableTypeChecker2.default)(allPropTypes)
    }
    module.exports = exports['default']
  })

  var all = unwrapExports(all_1)

  var navigate = {
    PREVIOUS: 'PREV',
    NEXT: 'NEXT',
    TODAY: 'TODAY',
    DATE: 'DATE',
  }
  var views = {
    MONTH: 'month',
    WEEK: 'week',
    WORK_WEEK: 'work_week',
    DAY: 'day',
    AGENDA: 'agenda',
  }

  var eventComponent = propTypes.oneOfType([
    elementType,
    propTypes.shape({
      month: elementType,
      week: elementType,
      day: elementType,
      agenda: elementType,
    }),
  ])
  var viewNames = Object.keys(views).map(function(k) {
    return views[k]
  })
  var accessor = propTypes.oneOfType([propTypes.string, propTypes.func])
  var dateFormat = propTypes.any
  var dateRangeFormat = propTypes.func
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

  var views$1 = propTypes.oneOfType([
    propTypes.arrayOf(propTypes.oneOf(viewNames)),
    all(propTypes.object, function(props, name) {
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
          !(err = elementType.apply(void 0, [prop, key].concat(args)))
        )
      })
      return err || null
    }),
  ])

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var warning = function() {}

  {
    var printWarning$2 = function printWarning(format, args) {
      var len = arguments.length
      args = new Array(len > 2 ? len - 2 : 0)
      for (var key = 2; key < len; key++) {
        args[key - 2] = arguments[key]
      }
      var argIndex = 0
      var message =
        'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++]
        })
      if (typeof console !== 'undefined') {
        console.error(message)
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message)
      } catch (x) {}
    }

    warning = function(condition, format, args) {
      var len = arguments.length
      args = new Array(len > 2 ? len - 2 : 0)
      for (var key = 2; key < len; key++) {
        args[key - 2] = arguments[key]
      }
      if (format === undefined) {
        throw new Error(
          '`warning(condition, format, ...args)` requires a warning ' +
            'message argument'
        )
      }
      if (!condition) {
        printWarning$2.apply(null, [format].concat(args))
      }
    }
  }

  var warning_1 = warning

  function notify(handler, args) {
    handler && handler.apply(null, [].concat(args))
  }

  var localePropType = propTypes.oneOfType([propTypes.string, propTypes.func])

  function _format(localizer, formatter, value, format, culture) {
    var result =
      typeof format === 'function'
        ? format(value, culture, localizer)
        : formatter.call(localizer, value, format, culture)
    !(result == null || typeof result === 'string')
      ? invariant_1(
          false,
          '`localizer format(..)` must return a string, null, or undefined'
        )
      : void 0
    return result
  }

  var DateLocalizer = function DateLocalizer(spec) {
    var _this = this

    !(typeof spec.format === 'function')
      ? invariant_1(false, 'date localizer `format(..)` must be a function')
      : void 0
    !(typeof spec.firstOfWeek === 'function')
      ? invariant_1(
          false,
          'date localizer `firstOfWeek(..)` must be a function'
        )
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
  function mergeWithDefaults(localizer, culture, formatOverrides, messages) {
    var formats = _extends({}, localizer.formats, formatOverrides)

    return _extends({}, localizer, {
      messages: messages,
      startOfWeek: function startOfWeek() {
        return localizer.startOfWeek(culture)
      },
      format: function format(value, _format2) {
        return localizer.format(value, formats[_format2] || _format2, culture)
      },
    })
  }

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
    return _extends({}, defaultMessages, msgs)
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      )
    }

    return self
  }

  var dateArithmetic = createCommonjsModule(function(module) {
    var MILI = 'milliseconds',
      SECONDS = 'seconds',
      MINUTES = 'minutes',
      HOURS = 'hours',
      DAY = 'day',
      WEEK = 'week',
      MONTH = 'month',
      YEAR = 'year',
      DECADE = 'decade',
      CENTURY = 'century'

    var dates = (module.exports = {
      add: function(date, num, unit) {
        date = new Date(date)

        switch (unit) {
          case MILI:
          case SECONDS:
          case MINUTES:
          case HOURS:
          case YEAR:
            return dates[unit](date, dates[unit](date) + num)
          case DAY:
            return dates.date(date, dates.date(date) + num)
          case WEEK:
            return dates.date(date, dates.date(date) + 7 * num)
          case MONTH:
            return monthMath(date, num)
          case DECADE:
            return dates.year(date, dates.year(date) + num * 10)
          case CENTURY:
            return dates.year(date, dates.year(date) + num * 100)
        }

        throw new TypeError('Invalid units: "' + unit + '"')
      },

      subtract: function(date, num, unit) {
        return dates.add(date, -num, unit)
      },

      startOf: function(date, unit, firstOfWeek) {
        date = new Date(date)

        switch (unit) {
          case 'century':
          case 'decade':
          case 'year':
            date = dates.month(date, 0)
          case 'month':
            date = dates.date(date, 1)
          case 'week':
          case 'day':
            date = dates.hours(date, 0)
          case 'hours':
            date = dates.minutes(date, 0)
          case 'minutes':
            date = dates.seconds(date, 0)
          case 'seconds':
            date = dates.milliseconds(date, 0)
        }

        if (unit === DECADE)
          date = dates.subtract(date, dates.year(date) % 10, 'year')

        if (unit === CENTURY)
          date = dates.subtract(date, dates.year(date) % 100, 'year')

        if (unit === WEEK) date = dates.weekday(date, 0, firstOfWeek)

        return date
      },

      endOf: function(date, unit, firstOfWeek) {
        date = new Date(date)
        date = dates.startOf(date, unit, firstOfWeek)
        date = dates.add(date, 1, unit)
        date = dates.subtract(date, 1, MILI)
        return date
      },

      eq: createComparer(function(a, b) {
        return a === b
      }),
      neq: createComparer(function(a, b) {
        return a !== b
      }),
      gt: createComparer(function(a, b) {
        return a > b
      }),
      gte: createComparer(function(a, b) {
        return a >= b
      }),
      lt: createComparer(function(a, b) {
        return a < b
      }),
      lte: createComparer(function(a, b) {
        return a <= b
      }),

      min: function() {
        return new Date(Math.min.apply(Math, arguments))
      },

      max: function() {
        return new Date(Math.max.apply(Math, arguments))
      },

      inRange: function(day, min, max, unit) {
        unit = unit || 'day'

        return (
          (!min || dates.gte(day, min, unit)) &&
          (!max || dates.lte(day, max, unit))
        )
      },

      milliseconds: createAccessor('Milliseconds'),
      seconds: createAccessor('Seconds'),
      minutes: createAccessor('Minutes'),
      hours: createAccessor('Hours'),
      day: createAccessor('Day'),
      date: createAccessor('Date'),
      month: createAccessor('Month'),
      year: createAccessor('FullYear'),

      decade: function(date, val) {
        return val === undefined
          ? dates.year(dates.startOf(date, DECADE))
          : dates.add(date, val + 10, YEAR)
      },

      century: function(date, val) {
        return val === undefined
          ? dates.year(dates.startOf(date, CENTURY))
          : dates.add(date, val + 100, YEAR)
      },

      weekday: function(date, val, firstDay) {
        var weekday = (dates.day(date) + 7 - (firstDay || 0)) % 7

        return val === undefined ? weekday : dates.add(date, val - weekday, DAY)
      },

      diff: function(date1, date2, unit, asFloat) {
        var dividend, divisor, result

        switch (unit) {
          case MILI:
          case SECONDS:
          case MINUTES:
          case HOURS:
          case DAY:
          case WEEK:
            dividend = date2.getTime() - date1.getTime()
            break
          case MONTH:
          case YEAR:
          case DECADE:
          case CENTURY:
            dividend =
              (dates.year(date2) - dates.year(date1)) * 12 +
              dates.month(date2) -
              dates.month(date1)
            break
          default:
            throw new TypeError('Invalid units: "' + unit + '"')
        }

        switch (unit) {
          case MILI:
            divisor = 1
            break
          case SECONDS:
            divisor = 1000
            break
          case MINUTES:
            divisor = 1000 * 60
            break
          case HOURS:
            divisor = 1000 * 60 * 60
            break
          case DAY:
            divisor = 1000 * 60 * 60 * 24
            break
          case WEEK:
            divisor = 1000 * 60 * 60 * 24 * 7
            break
          case MONTH:
            divisor = 1
            break
          case YEAR:
            divisor = 12
            break
          case DECADE:
            divisor = 120
            break
          case CENTURY:
            divisor = 1200
            break
          default:
            throw new TypeError('Invalid units: "' + unit + '"')
        }

        result = dividend / divisor

        return asFloat ? result : absoluteFloor(result)
      },
    })

    function absoluteFloor(number) {
      return number < 0 ? Math.ceil(number) : Math.floor(number)
    }

    function monthMath(date, val) {
      var current = dates.month(date),
        newMonth = current + val

      date = dates.month(date, newMonth)

      while (newMonth < 0) newMonth = 12 + newMonth

      //month rollover
      if (dates.month(date) !== newMonth % 12) date = dates.date(date, 0) //move to last of month

      return date
    }

    function createAccessor(method) {
      return function(date, val) {
        if (val === undefined) return date['get' + method]()

        date = new Date(date)
        date['set' + method](val)
        return date
      }
    }

    function createComparer(operator) {
      return function(a, b, unit) {
        return operator(+dates.startOf(a, unit), +dates.startOf(b, unit))
      }
    }
  })
  var dateArithmetic_1 = dateArithmetic.add
  var dateArithmetic_2 = dateArithmetic.subtract
  var dateArithmetic_3 = dateArithmetic.startOf
  var dateArithmetic_4 = dateArithmetic.endOf
  var dateArithmetic_5 = dateArithmetic.eq
  var dateArithmetic_6 = dateArithmetic.neq
  var dateArithmetic_7 = dateArithmetic.gt
  var dateArithmetic_8 = dateArithmetic.gte
  var dateArithmetic_9 = dateArithmetic.lt
  var dateArithmetic_10 = dateArithmetic.lte
  var dateArithmetic_11 = dateArithmetic.min
  var dateArithmetic_12 = dateArithmetic.max
  var dateArithmetic_13 = dateArithmetic.inRange
  var dateArithmetic_14 = dateArithmetic.milliseconds
  var dateArithmetic_15 = dateArithmetic.seconds
  var dateArithmetic_16 = dateArithmetic.minutes
  var dateArithmetic_17 = dateArithmetic.hours
  var dateArithmetic_18 = dateArithmetic.day
  var dateArithmetic_19 = dateArithmetic.date
  var dateArithmetic_20 = dateArithmetic.month
  var dateArithmetic_21 = dateArithmetic.year
  var dateArithmetic_22 = dateArithmetic.decade
  var dateArithmetic_23 = dateArithmetic.century
  var dateArithmetic_24 = dateArithmetic.weekday
  var dateArithmetic_25 = dateArithmetic.diff

  var MILLI = {
    seconds: 1000,
    minutes: 1000 * 60,
    hours: 1000 * 60 * 60,
    day: 1000 * 60 * 60 * 24,
  }
  var MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  var dates = _extends({}, dateArithmetic, {
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
      return Math.ceil(((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7 + 1) / 7)
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

  /**
   * The base implementation of `_.slice` without an iteratee call guard.
   *
   * @private
   * @param {Array} array The array to slice.
   * @param {number} [start=0] The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the slice of `array`.
   */
  function baseSlice(array, start, end) {
    var index = -1,
      length = array.length

    if (start < 0) {
      start = -start > length ? 0 : length + start
    }
    end = end > length ? length : end
    if (end < 0) {
      end += length
    }
    length = start > end ? 0 : (end - start) >>> 0
    start >>>= 0

    var result = Array(length)
    while (++index < length) {
      result[index] = array[index + start]
    }
    return result
  }

  var _baseSlice = baseSlice

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || (value !== value && other !== other)
  }

  var eq_1 = eq

  /** Detect free variable `global` from Node.js. */
  var freeGlobal =
    typeof commonjsGlobal == 'object' &&
    commonjsGlobal &&
    commonjsGlobal.Object === Object &&
    commonjsGlobal

  var _freeGlobal = freeGlobal

  /** Detect free variable `self`. */
  var freeSelf =
    typeof self == 'object' && self && self.Object === Object && self

  /** Used as a reference to the global object. */
  var root = _freeGlobal || freeSelf || Function('return this')()

  var _root = root

  /** Built-in value references. */
  var Symbol$1 = _root.Symbol

  var _Symbol = Symbol$1

  /** Used for built-in method references. */
  var objectProto = Object.prototype

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto.hasOwnProperty

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto.toString

  /** Built-in value references. */
  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty$1.call(value, symToStringTag),
      tag = value[symToStringTag]

    try {
      value[symToStringTag] = undefined
      var unmasked = true
    } catch (e) {}

    var result = nativeObjectToString.call(value)
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag
      } else {
        delete value[symToStringTag]
      }
    }
    return result
  }

  var _getRawTag = getRawTag

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$1.toString

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString$1.call(value)
  }

  var _objectToString = objectToString

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]'

  /** Built-in value references. */
  var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag
    }
    return symToStringTag$1 && symToStringTag$1 in Object(value)
      ? _getRawTag(value)
      : _objectToString(value)
  }

  var _baseGetTag = baseGetTag

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value
    return value != null && (type == 'object' || type == 'function')
  }

  var isObject_1 = isObject

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]'

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    if (!isObject_1(value)) {
      return false
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = _baseGetTag(value)
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag
  }

  var isFunction_1 = isFunction

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return (
      typeof value == 'number' &&
      value > -1 &&
      value % 1 == 0 &&
      value <= MAX_SAFE_INTEGER
    )
  }

  var isLength_1 = isLength

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength_1(value.length) && !isFunction_1(value)
  }

  var isArrayLike_1 = isArrayLike

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$1 = 9007199254740991

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    var type = typeof value
    length = length == null ? MAX_SAFE_INTEGER$1 : length

    return (
      !!length &&
      (type == 'number' || (type != 'symbol' && reIsUint.test(value))) &&
      (value > -1 && value % 1 == 0 && value < length)
    )
  }

  var _isIndex = isIndex

  /**
   * Checks if the given arguments are from an iteratee call.
   *
   * @private
   * @param {*} value The potential iteratee value argument.
   * @param {*} index The potential iteratee index or key argument.
   * @param {*} object The potential iteratee object argument.
   * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
   *  else `false`.
   */
  function isIterateeCall(value, index, object) {
    if (!isObject_1(object)) {
      return false
    }
    var type = typeof index
    if (
      type == 'number'
        ? isArrayLike_1(object) && _isIndex(index, object.length)
        : type == 'string' && index in object
    ) {
      return eq_1(object[index], value)
    }
    return false
  }

  var _isIterateeCall = isIterateeCall

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object'
  }

  var isObjectLike_1 = isObjectLike

  /** `Object#toString` result references. */
  var symbolTag = '[object Symbol]'

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return (
      typeof value == 'symbol' ||
      (isObjectLike_1(value) && _baseGetTag(value) == symbolTag)
    )
  }

  var isSymbol_1 = isSymbol

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i

  /** Built-in method references without a dependency on `root`. */
  var freeParseInt = parseInt

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  function toNumber(value) {
    if (typeof value == 'number') {
      return value
    }
    if (isSymbol_1(value)) {
      return NAN
    }
    if (isObject_1(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value
      value = isObject_1(other) ? other + '' : other
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value
    }
    value = value.replace(reTrim, '')
    var isBinary = reIsBinary.test(value)
    return isBinary || reIsOctal.test(value)
      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
      : reIsBadHex.test(value)
      ? NAN
      : +value
  }

  var toNumber_1 = toNumber

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e308

  /**
   * Converts `value` to a finite number.
   *
   * @static
   * @memberOf _
   * @since 4.12.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted number.
   * @example
   *
   * _.toFinite(3.2);
   * // => 3.2
   *
   * _.toFinite(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toFinite(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toFinite('3.2');
   * // => 3.2
   */
  function toFinite(value) {
    if (!value) {
      return value === 0 ? value : 0
    }
    value = toNumber_1(value)
    if (value === INFINITY || value === -INFINITY) {
      var sign = value < 0 ? -1 : 1
      return sign * MAX_INTEGER
    }
    return value === value ? value : 0
  }

  var toFinite_1 = toFinite

  /**
   * Converts `value` to an integer.
   *
   * **Note:** This method is loosely based on
   * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted integer.
   * @example
   *
   * _.toInteger(3.2);
   * // => 3
   *
   * _.toInteger(Number.MIN_VALUE);
   * // => 0
   *
   * _.toInteger(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toInteger('3.2');
   * // => 3
   */
  function toInteger(value) {
    var result = toFinite_1(value),
      remainder = result % 1

    return result === result ? (remainder ? result - remainder : result) : 0
  }

  var toInteger_1 = toInteger

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeCeil = Math.ceil,
    nativeMax = Math.max

  /**
   * Creates an array of elements split into groups the length of `size`.
   * If `array` can't be split evenly, the final chunk will be the remaining
   * elements.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Array
   * @param {Array} array The array to process.
   * @param {number} [size=1] The length of each chunk
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {Array} Returns the new array of chunks.
   * @example
   *
   * _.chunk(['a', 'b', 'c', 'd'], 2);
   * // => [['a', 'b'], ['c', 'd']]
   *
   * _.chunk(['a', 'b', 'c', 'd'], 3);
   * // => [['a', 'b', 'c'], ['d']]
   */
  function chunk(array, size, guard) {
    if (guard ? _isIterateeCall(array, size, guard) : size === undefined) {
      size = 1
    } else {
      size = nativeMax(toInteger_1(size), 0)
    }
    var length = array == null ? 0 : array.length
    if (!length || size < 1) {
      return []
    }
    var index = 0,
      resIndex = 0,
      result = Array(nativeCeil(length / size))

    while (index < length) {
      result[resIndex++] = _baseSlice(array, index, (index += size))
    }
    return result
  }

  var chunk_1 = chunk

  var interopRequireDefault = createCommonjsModule(function(module) {
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule
        ? obj
        : {
            default: obj,
          }
    }

    module.exports = _interopRequireDefault
  })

  unwrapExports(interopRequireDefault)

  var _extends_1 = createCommonjsModule(function(module) {
    function _extends() {
      module.exports = _extends =
        Object.assign ||
        function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i]

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key]
              }
            }
          }

          return target
        }

      return _extends.apply(this, arguments)
    }

    module.exports = _extends
  })

  var inDOM = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = void 0

    var _default = !!(
      typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
    )

    exports.default = _default
    module.exports = exports['default']
  })

  unwrapExports(inDOM)

  var contains = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = void 0

    var _inDOM = interopRequireDefault(inDOM)

    var _default = (function() {
      // HTML DOM and SVG DOM may have different support levels,
      // so we need to check on context instead of a document root element.
      return _inDOM.default
        ? function(context, node) {
            if (context.contains) {
              return context.contains(node)
            } else if (context.compareDocumentPosition) {
              return (
                context === node ||
                !!(context.compareDocumentPosition(node) & 16)
              )
            } else {
              return fallback(context, node)
            }
          }
        : fallback
    })()

    exports.default = _default

    function fallback(context, node) {
      if (node)
        do {
          if (node === context) return true
        } while ((node = node.parentNode))
      return false
    }

    module.exports = exports['default']
  })

  var contains$1 = unwrapExports(contains)

  var isWindow = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = getWindow

    function getWindow(node) {
      return node === node.window
        ? node
        : node.nodeType === 9
        ? node.defaultView || node.parentWindow
        : false
    }

    module.exports = exports['default']
  })

  unwrapExports(isWindow)

  var ownerDocument_1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = ownerDocument

    function ownerDocument(node) {
      return (node && node.ownerDocument) || document
    }

    module.exports = exports['default']
  })

  unwrapExports(ownerDocument_1)

  var offset_1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = offset

    var _contains = interopRequireDefault(contains)

    var _isWindow = interopRequireDefault(isWindow)

    var _ownerDocument = interopRequireDefault(ownerDocument_1)

    function offset(node) {
      var doc = (0, _ownerDocument.default)(node),
        win = (0, _isWindow.default)(doc),
        docElem = doc && doc.documentElement,
        box = {
          top: 0,
          left: 0,
          height: 0,
          width: 0,
        }
      if (!doc) return // Make sure it's not a disconnected DOM node

      if (!(0, _contains.default)(docElem, node)) return box
      if (node.getBoundingClientRect !== undefined)
        box = node.getBoundingClientRect() // IE8 getBoundingClientRect doesn't support width & height

      box = {
        top:
          box.top +
          (win.pageYOffset || docElem.scrollTop) -
          (docElem.clientTop || 0),
        left:
          box.left +
          (win.pageXOffset || docElem.scrollLeft) -
          (docElem.clientLeft || 0),
        width: (box.width == null ? node.offsetWidth : box.width) || 0,
        height: (box.height == null ? node.offsetHeight : box.height) || 0,
      }
      return box
    }

    module.exports = exports['default']
  })

  var getOffset = unwrapExports(offset_1)

  var camelize_1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = camelize
    var rHyphen = /-(.)/g

    function camelize(string) {
      return string.replace(rHyphen, function(_, chr) {
        return chr.toUpperCase()
      })
    }

    module.exports = exports['default']
  })

  unwrapExports(camelize_1)

  var camelizeStyle = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = camelizeStyleName

    var _camelize = interopRequireDefault(camelize_1)

    /**
     * Copyright 2014-2015, Facebook, Inc.
     * All rights reserved.
     * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/camelizeStyleName.js
     */
    var msPattern = /^-ms-/

    function camelizeStyleName(string) {
      return (0, _camelize.default)(string.replace(msPattern, 'ms-'))
    }

    module.exports = exports['default']
  })

  unwrapExports(camelizeStyle)

  var hyphenate_1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = hyphenate
    var rUpper = /([A-Z])/g

    function hyphenate(string) {
      return string.replace(rUpper, '-$1').toLowerCase()
    }

    module.exports = exports['default']
  })

  unwrapExports(hyphenate_1)

  var hyphenateStyle = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = hyphenateStyleName

    var _hyphenate = interopRequireDefault(hyphenate_1)

    /**
     * Copyright 2013-2014, Facebook, Inc.
     * All rights reserved.
     * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
     */
    var msPattern = /^ms-/

    function hyphenateStyleName(string) {
      return (0, _hyphenate.default)(string).replace(msPattern, '-ms-')
    }

    module.exports = exports['default']
  })

  unwrapExports(hyphenateStyle)

  var getComputedStyle = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = _getComputedStyle

    var _camelizeStyle = interopRequireDefault(camelizeStyle)

    var rposition = /^(top|right|bottom|left)$/
    var rnumnonpx = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i

    function _getComputedStyle(node) {
      if (!node)
        throw new TypeError('No Element passed to `getComputedStyle()`')
      var doc = node.ownerDocument
      return 'defaultView' in doc
        ? doc.defaultView.opener
          ? node.ownerDocument.defaultView.getComputedStyle(node, null)
          : window.getComputedStyle(node, null)
        : {
            //ie 8 "magic" from: https://github.com/jquery/jquery/blob/1.11-stable/src/css/curCSS.js#L72
            getPropertyValue: function getPropertyValue(prop) {
              var style = node.style
              prop = (0, _camelizeStyle.default)(prop)
              if (prop == 'float') prop = 'styleFloat'
              var current = node.currentStyle[prop] || null
              if (current == null && style && style[prop]) current = style[prop]

              if (rnumnonpx.test(current) && !rposition.test(prop)) {
                // Remember the original values
                var left = style.left
                var runStyle = node.runtimeStyle
                var rsLeft = runStyle && runStyle.left // Put in the new values to get a computed value out

                if (rsLeft) runStyle.left = node.currentStyle.left
                style.left = prop === 'fontSize' ? '1em' : current
                current = style.pixelLeft + 'px' // Revert the changed values

                style.left = left
                if (rsLeft) runStyle.left = rsLeft
              }

              return current
            },
          }
    }

    module.exports = exports['default']
  })

  unwrapExports(getComputedStyle)

  var removeStyle_1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = removeStyle

    function removeStyle(node, key) {
      return 'removeProperty' in node.style
        ? node.style.removeProperty(key)
        : node.style.removeAttribute(key)
    }

    module.exports = exports['default']
  })

  unwrapExports(removeStyle_1)

  var properties = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = exports.animationEnd = exports.animationDelay = exports.animationTiming = exports.animationDuration = exports.animationName = exports.transitionEnd = exports.transitionDuration = exports.transitionDelay = exports.transitionTiming = exports.transitionProperty = exports.transform = void 0

    var _inDOM = interopRequireDefault(inDOM)

    var transform = 'transform'
    exports.transform = transform
    var prefix, transitionEnd, animationEnd
    exports.animationEnd = animationEnd
    exports.transitionEnd = transitionEnd
    var transitionProperty,
      transitionDuration,
      transitionTiming,
      transitionDelay
    exports.transitionDelay = transitionDelay
    exports.transitionTiming = transitionTiming
    exports.transitionDuration = transitionDuration
    exports.transitionProperty = transitionProperty
    var animationName, animationDuration, animationTiming, animationDelay
    exports.animationDelay = animationDelay
    exports.animationTiming = animationTiming
    exports.animationDuration = animationDuration
    exports.animationName = animationName

    if (_inDOM.default) {
      var _getTransitionPropert = getTransitionProperties()

      prefix = _getTransitionPropert.prefix
      exports.transitionEnd = transitionEnd =
        _getTransitionPropert.transitionEnd
      exports.animationEnd = animationEnd = _getTransitionPropert.animationEnd
      exports.transform = transform = prefix + '-' + transform
      exports.transitionProperty = transitionProperty =
        prefix + '-transition-property'
      exports.transitionDuration = transitionDuration =
        prefix + '-transition-duration'
      exports.transitionDelay = transitionDelay = prefix + '-transition-delay'
      exports.transitionTiming = transitionTiming =
        prefix + '-transition-timing-function'
      exports.animationName = animationName = prefix + '-animation-name'
      exports.animationDuration = animationDuration =
        prefix + '-animation-duration'
      exports.animationTiming = animationTiming = prefix + '-animation-delay'
      exports.animationDelay = animationDelay =
        prefix + '-animation-timing-function'
    }

    var _default = {
      transform: transform,
      end: transitionEnd,
      property: transitionProperty,
      timing: transitionTiming,
      delay: transitionDelay,
      duration: transitionDuration,
    }
    exports.default = _default

    function getTransitionProperties() {
      var style = document.createElement('div').style
      var vendorMap = {
        O: function O(e) {
          return 'o' + e.toLowerCase()
        },
        Moz: function Moz(e) {
          return e.toLowerCase()
        },
        Webkit: function Webkit(e) {
          return 'webkit' + e
        },
        ms: function ms(e) {
          return 'MS' + e
        },
      }
      var vendors = Object.keys(vendorMap)
      var transitionEnd, animationEnd
      var prefix = ''

      for (var i = 0; i < vendors.length; i++) {
        var vendor = vendors[i]

        if (vendor + 'TransitionProperty' in style) {
          prefix = '-' + vendor.toLowerCase()
          transitionEnd = vendorMap[vendor]('TransitionEnd')
          animationEnd = vendorMap[vendor]('AnimationEnd')
          break
        }
      }

      if (!transitionEnd && 'transitionProperty' in style)
        transitionEnd = 'transitionend'
      if (!animationEnd && 'animationName' in style)
        animationEnd = 'animationend'
      style = null
      return {
        animationEnd: animationEnd,
        transitionEnd: transitionEnd,
        prefix: prefix,
      }
    }
  })

  unwrapExports(properties)
  var properties_1 = properties.animationEnd
  var properties_2 = properties.animationDelay
  var properties_3 = properties.animationTiming
  var properties_4 = properties.animationDuration
  var properties_5 = properties.animationName
  var properties_6 = properties.transitionEnd
  var properties_7 = properties.transitionDuration
  var properties_8 = properties.transitionDelay
  var properties_9 = properties.transitionTiming
  var properties_10 = properties.transitionProperty
  var properties_11 = properties.transform

  var isTransform_1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = isTransform
    var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i

    function isTransform(property) {
      return !!(property && supportedTransforms.test(property))
    }

    module.exports = exports['default']
  })

  unwrapExports(isTransform_1)

  var style_1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = style

    var _camelizeStyle = interopRequireDefault(camelizeStyle)

    var _hyphenateStyle = interopRequireDefault(hyphenateStyle)

    var _getComputedStyle2 = interopRequireDefault(getComputedStyle)

    var _removeStyle = interopRequireDefault(removeStyle_1)

    var _isTransform = interopRequireDefault(isTransform_1)

    function style(node, property, value) {
      var css = ''
      var transforms = ''
      var props = property

      if (typeof property === 'string') {
        if (value === undefined) {
          return (
            node.style[(0, _camelizeStyle.default)(property)] ||
            (0, _getComputedStyle2.default)(node).getPropertyValue(
              (0, _hyphenateStyle.default)(property)
            )
          )
        } else {
          ;(props = {})[property] = value
        }
      }

      Object.keys(props).forEach(function(key) {
        var value = props[key]

        if (!value && value !== 0) {
          ;(0, _removeStyle.default)(node, (0, _hyphenateStyle.default)(key))
        } else if ((0, _isTransform.default)(key)) {
          transforms += key + '(' + value + ') '
        } else {
          css += (0, _hyphenateStyle.default)(key) + ': ' + value + ';'
        }
      })

      if (transforms) {
        css += properties.transform + ': ' + transforms + ';'
      }

      node.style.cssText += ';' + css
    }

    module.exports = exports['default']
  })

  unwrapExports(style_1)

  var offsetParent_1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = offsetParent

    var _ownerDocument = interopRequireDefault(ownerDocument_1)

    var _style = interopRequireDefault(style_1)

    function nodeName(node) {
      return node.nodeName && node.nodeName.toLowerCase()
    }

    function offsetParent(node) {
      var doc = (0, _ownerDocument.default)(node),
        offsetParent = node && node.offsetParent

      while (
        offsetParent &&
        nodeName(node) !== 'html' &&
        (0, _style.default)(offsetParent, 'position') === 'static'
      ) {
        offsetParent = offsetParent.offsetParent
      }

      return offsetParent || doc.documentElement
    }

    module.exports = exports['default']
  })

  unwrapExports(offsetParent_1)

  var scrollTop_1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = scrollTop

    var _isWindow = interopRequireDefault(isWindow)

    function scrollTop(node, val) {
      var win = (0, _isWindow.default)(node)
      if (val === undefined)
        return win
          ? 'pageYOffset' in win
            ? win.pageYOffset
            : win.document.documentElement.scrollTop
          : node.scrollTop
      if (win)
        win.scrollTo(
          'pageXOffset' in win
            ? win.pageXOffset
            : win.document.documentElement.scrollLeft,
          val
        )
      else node.scrollTop = val
    }

    module.exports = exports['default']
  })

  var getScrollTop = unwrapExports(scrollTop_1)

  var scrollLeft = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = scrollTop

    var _isWindow = interopRequireDefault(isWindow)

    function scrollTop(node, val) {
      var win = (0, _isWindow.default)(node)
      if (val === undefined)
        return win
          ? 'pageXOffset' in win
            ? win.pageXOffset
            : win.document.documentElement.scrollLeft
          : node.scrollLeft
      if (win)
        win.scrollTo(
          val,
          'pageYOffset' in win
            ? win.pageYOffset
            : win.document.documentElement.scrollTop
        )
      else node.scrollLeft = val
    }

    module.exports = exports['default']
  })

  var getScrollLeft = unwrapExports(scrollLeft)

  var position_1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = position

    var _extends2 = interopRequireDefault(_extends_1)

    var _offset = interopRequireDefault(offset_1)

    var _offsetParent = interopRequireDefault(offsetParent_1)

    var _scrollTop = interopRequireDefault(scrollTop_1)

    var _scrollLeft = interopRequireDefault(scrollLeft)

    var _style = interopRequireDefault(style_1)

    function nodeName(node) {
      return node.nodeName && node.nodeName.toLowerCase()
    }

    function position(node, offsetParent) {
      var parentOffset = {
          top: 0,
          left: 0,
        },
        offset // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
      // because it is its only offset parent

      if ((0, _style.default)(node, 'position') === 'fixed') {
        offset = node.getBoundingClientRect()
      } else {
        offsetParent = offsetParent || (0, _offsetParent.default)(node)
        offset = (0, _offset.default)(node)
        if (nodeName(offsetParent) !== 'html')
          parentOffset = (0, _offset.default)(offsetParent)
        parentOffset.top +=
          parseInt((0, _style.default)(offsetParent, 'borderTopWidth'), 10) -
            (0, _scrollTop.default)(offsetParent) || 0
        parentOffset.left +=
          parseInt((0, _style.default)(offsetParent, 'borderLeftWidth'), 10) -
            (0, _scrollLeft.default)(offsetParent) || 0
      } // Subtract parent offsets and node margins

      return (0, _extends2.default)({}, offset, {
        top:
          offset.top -
          parentOffset.top -
          (parseInt((0, _style.default)(node, 'marginTop'), 10) || 0),
        left:
          offset.left -
          parentOffset.left -
          (parseInt((0, _style.default)(node, 'marginLeft'), 10) || 0),
      })
    }

    module.exports = exports['default']
  })

  var getPosition = unwrapExports(position_1)

  var requestAnimationFrame = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = void 0

    var _inDOM = interopRequireDefault(inDOM)

    var vendors = ['', 'webkit', 'moz', 'o', 'ms']
    var cancel = 'clearTimeout'
    var raf = fallback
    var compatRaf

    var getKey = function getKey(vendor, k) {
      return (
        vendor +
        (!vendor ? k : k[0].toUpperCase() + k.substr(1)) +
        'AnimationFrame'
      )
    }

    if (_inDOM.default) {
      vendors.some(function(vendor) {
        var rafKey = getKey(vendor, 'request')

        if (rafKey in window) {
          cancel = getKey(vendor, 'cancel')
          return (raf = function raf(cb) {
            return window[rafKey](cb)
          })
        }
      })
    }
    /* https://github.com/component/raf */

    var prev = new Date().getTime()

    function fallback(fn) {
      var curr = new Date().getTime(),
        ms = Math.max(0, 16 - (curr - prev)),
        req = setTimeout(fn, ms)
      prev = curr
      return req
    }

    compatRaf = function compatRaf(cb) {
      return raf(cb)
    }

    compatRaf.cancel = function(id) {
      window[cancel] &&
        typeof window[cancel] === 'function' &&
        window[cancel](id)
    }

    var _default = compatRaf
    exports.default = _default
    module.exports = exports['default']
  })

  var raf = unwrapExports(requestAnimationFrame)

  var EventCell =
    /*#__PURE__*/
    (function(_React$Component) {
      _inheritsLoose(EventCell, _React$Component)

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
          props = _objectWithoutPropertiesLoose(_this$props, [
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
          dates.diff(start, dates.ceil(end, 'day'), 'day') > 1
        var userProps = getters.eventProp(event, start, end, selected)
        var content = React__default.createElement(
          'div',
          {
            className: 'rbc-event-content',
            title: tooltip || undefined,
          },
          Event
            ? React__default.createElement(Event, {
                event: event,
                title: title,
                isAllDay: allDay,
                localizer: localizer,
              })
            : title
        )
        return React__default.createElement(
          EventWrapper,
          _extends({}, this.props, {
            type: 'date',
          }),
          React__default.createElement(
            'div',
            _extends({}, props, {
              tabIndex: 0,
              style: _extends({}, userProps.style, style),
              className: classnames(
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
    })(React__default.Component)

  EventCell.propTypes = {
    event: propTypes.object.isRequired,
    slotStart: propTypes.instanceOf(Date),
    slotEnd: propTypes.instanceOf(Date),
    selected: propTypes.bool,
    isAllDay: propTypes.bool,
    continuesPrior: propTypes.bool,
    continuesAfter: propTypes.bool,
    accessors: propTypes.object.isRequired,
    components: propTypes.object.isRequired,
    getters: propTypes.object.isRequired,
    localizer: propTypes.object,
    onSelect: propTypes.func,
    onDoubleClick: propTypes.func,
  }

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
    return y >= box.top && y <= box.bottom && x >= box.left && x <= box.right
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

  var Popup =
    /*#__PURE__*/
    (function(_React$Component) {
      _inheritsLoose(Popup, _React$Component)

      function Popup() {
        return _React$Component.apply(this, arguments) || this
      }

      var _proto = Popup.prototype

      _proto.componentDidMount = function componentDidMount() {
        var _this$props$popupOffs = this.props.popupOffset,
          popupOffset =
            _this$props$popupOffs === void 0 ? 5 : _this$props$popupOffs,
          _getOffset = getOffset(this.refs.root),
          top = _getOffset.top,
          left = _getOffset.left,
          width = _getOffset.width,
          height = _getOffset.height,
          viewBottom = window.innerHeight + getScrollTop(window),
          viewRight = window.innerWidth + getScrollLeft(window),
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
        var _this$props = this.props,
          events = _this$props.events,
          selected = _this$props.selected,
          getters = _this$props.getters,
          accessors = _this$props.accessors,
          components = _this$props.components,
          onSelect = _this$props.onSelect,
          onDoubleClick = _this$props.onDoubleClick,
          slotStart = _this$props.slotStart,
          slotEnd = _this$props.slotEnd,
          localizer = _this$props.localizer
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
        return React__default.createElement(
          'div',
          {
            ref: 'root',
            style: style,
            className: 'rbc-overlay',
          },
          React__default.createElement(
            'div',
            {
              className: 'rbc-overlay-header',
            },
            localizer.format(slotStart, 'dayHeaderFormat')
          ),
          events.map(function(event, idx) {
            return React__default.createElement(EventCell, {
              key: idx,
              type: 'popup',
              event: event,
              getters: getters,
              onSelect: onSelect,
              accessors: accessors,
              components: components,
              onDoubleClick: onDoubleClick,
              continuesPrior: dates.lt(accessors.end(event), slotStart, 'day'),
              continuesAfter: dates.gte(accessors.start(event), slotEnd, 'day'),
              selected: isSelected(event, selected),
            })
          })
        )
      }

      return Popup
    })(React__default.Component)

  Popup.propTypes = {
    position: propTypes.object,
    popupOffset: propTypes.oneOfType([
      propTypes.number,
      propTypes.shape({
        x: propTypes.number,
        y: propTypes.number,
      }),
    ]),
    events: propTypes.array,
    selected: propTypes.object,
    accessors: propTypes.object.isRequired,
    components: propTypes.object.isRequired,
    getters: propTypes.object.isRequired,
    localizer: propTypes.object.isRequired,
    onSelect: propTypes.func,
    onDoubleClick: propTypes.func,
    slotStart: propTypes.instanceOf(Date),
    slotEnd: propTypes.number,
  }

  var componentOrElement = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })

    var _typeof =
      typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
        ? function(obj) {
            return typeof obj
          }
        : function(obj) {
            return obj &&
              typeof Symbol === 'function' &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? 'symbol'
              : typeof obj
          }

    var _react2 = _interopRequireDefault(React__default)

    var _createChainableTypeChecker2 = _interopRequireDefault(
      createChainableTypeChecker_1
    )

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName]
      var propType =
        typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)

      if (_react2.default.isValidElement(propValue)) {
        return new Error(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type ReactElement ' +
            ('supplied to `' +
              componentName +
              '`, expected a ReactComponent or a ') +
            'DOMElement. You can usually obtain a ReactComponent or DOMElement ' +
            'from a ReactElement by attaching a ref to it.'
        )
      }

      if (
        (propType !== 'object' || typeof propValue.render !== 'function') &&
        propValue.nodeType !== 1
      ) {
        return new Error(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of value `' +
            propValue +
            '` ' +
            ('supplied to `' +
              componentName +
              '`, expected a ReactComponent or a ') +
            'DOMElement.'
        )
      }

      return null
    }

    exports.default = (0, _createChainableTypeChecker2.default)(validate)
    module.exports = exports['default']
  })

  unwrapExports(componentOrElement)

  var getContainer_1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = getContainer

    var _reactDom2 = _interopRequireDefault(reactDom__default)

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    function getContainer(container, defaultContainer) {
      container = typeof container === 'function' ? container() : container
      return _reactDom2.default.findDOMNode(container) || defaultContainer
    }
    module.exports = exports['default']
  })

  unwrapExports(getContainer_1)

  var ownerDocument_1$1 = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })
    exports.default = ownerDocument
    function ownerDocument(node) {
      return (node && node.ownerDocument) || document
    }
    module.exports = exports['default']
  })

  unwrapExports(ownerDocument_1$1)

  var ownerDocument$2 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true

    exports.default = function(componentOrElement) {
      return (0, _ownerDocument2.default)(
        _reactDom2.default.findDOMNode(componentOrElement)
      )
    }

    var _reactDom2 = _interopRequireDefault(reactDom__default)

    var _ownerDocument2 = _interopRequireDefault(ownerDocument_1$1)

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    module.exports = exports['default']
  })

  unwrapExports(ownerDocument$2)

  var LegacyPortal = createCommonjsModule(function(module, exports) {
    exports.__esModule = true

    var _propTypes2 = _interopRequireDefault(propTypes)

    var _componentOrElement2 = _interopRequireDefault(componentOrElement)

    var _react2 = _interopRequireDefault(React__default)

    var _reactDom2 = _interopRequireDefault(reactDom__default)

    var _getContainer2 = _interopRequireDefault(getContainer_1)

    var _ownerDocument2 = _interopRequireDefault(ownerDocument$2)

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function')
      }
    }

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        )
      }
      return call && (typeof call === 'object' || typeof call === 'function')
        ? call
        : self
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError(
          'Super expression must either be null or a function, not ' +
            typeof superClass
        )
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true,
        },
      })
      if (superClass)
        Object.setPrototypeOf
          ? Object.setPrototypeOf(subClass, superClass)
          : (subClass.__proto__ = superClass)
    }

    /**
     * The `<Portal/>` component renders its children into a new "subtree" outside of current component hierarchy.
     * You can think of it as a declarative `appendChild()`, or jQuery's `$.fn.appendTo()`.
     * The children of `<Portal/>` component will be appended to the `container` specified.
     */
    var Portal = (function(_React$Component) {
      _inherits(Portal, _React$Component)

      function Portal() {
        var _temp, _this, _ret

        _classCallCheck(this, Portal)

        for (
          var _len = arguments.length, args = Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key]
        }

        return (
          (_ret = ((_temp = ((_this = _possibleConstructorReturn(
            this,
            _React$Component.call.apply(_React$Component, [this].concat(args))
          )),
          _this)),
          (_this._mountOverlayTarget = function() {
            if (!_this._overlayTarget) {
              _this._overlayTarget = document.createElement('div')
              _this._portalContainerNode = (0, _getContainer2.default)(
                _this.props.container,
                (0, _ownerDocument2.default)(_this).body
              )
              _this._portalContainerNode.appendChild(_this._overlayTarget)
            }
          }),
          (_this._unmountOverlayTarget = function() {
            if (_this._overlayTarget) {
              _this._portalContainerNode.removeChild(_this._overlayTarget)
              _this._overlayTarget = null
            }
            _this._portalContainerNode = null
          }),
          (_this._renderOverlay = function() {
            var overlay = !_this.props.children
              ? null
              : _react2.default.Children.only(_this.props.children)

            // Save reference for future access.
            if (overlay !== null) {
              _this._mountOverlayTarget()

              var initialRender = !_this._overlayInstance

              _this._overlayInstance = _reactDom2.default.unstable_renderSubtreeIntoContainer(
                _this,
                overlay,
                _this._overlayTarget,
                function() {
                  if (initialRender && _this.props.onRendered) {
                    _this.props.onRendered()
                  }
                }
              )
            } else {
              // Unrender if the component is null for transitions to null
              _this._unrenderOverlay()
              _this._unmountOverlayTarget()
            }
          }),
          (_this._unrenderOverlay = function() {
            if (_this._overlayTarget) {
              _reactDom2.default.unmountComponentAtNode(_this._overlayTarget)
              _this._overlayInstance = null
            }
          }),
          (_this.getMountNode = function() {
            return _this._overlayTarget
          }),
          _temp)),
          _possibleConstructorReturn(_this, _ret)
        )
      }

      Portal.prototype.componentDidMount = function componentDidMount() {
        this._isMounted = true
        this._renderOverlay()
      }

      Portal.prototype.componentDidUpdate = function componentDidUpdate() {
        this._renderOverlay()
      }

      Portal.prototype.componentWillReceiveProps = function componentWillReceiveProps(
        nextProps
      ) {
        if (
          this._overlayTarget &&
          nextProps.container !== this.props.container
        ) {
          this._portalContainerNode.removeChild(this._overlayTarget)
          this._portalContainerNode = (0, _getContainer2.default)(
            nextProps.container,
            (0, _ownerDocument2.default)(this).body
          )
          this._portalContainerNode.appendChild(this._overlayTarget)
        }
      }

      Portal.prototype.componentWillUnmount = function componentWillUnmount() {
        this._isMounted = false
        this._unrenderOverlay()
        this._unmountOverlayTarget()
      }

      Portal.prototype.render = function render() {
        return null
      }

      return Portal
    })(_react2.default.Component)

    Portal.displayName = 'Portal'
    Portal.propTypes = {
      /**
       * A Node, Component instance, or function that returns either. The `container` will have the Portal children
       * appended to it.
       */
      container: _propTypes2.default.oneOfType([
        _componentOrElement2.default,
        _propTypes2.default.func,
      ]),

      onRendered: _propTypes2.default.func,
    }
    exports.default = Portal
    module.exports = exports['default']
  })

  unwrapExports(LegacyPortal)

  var Portal_1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true

    var _propTypes2 = _interopRequireDefault(propTypes)

    var _componentOrElement2 = _interopRequireDefault(componentOrElement)

    var _react2 = _interopRequireDefault(React__default)

    var _reactDom2 = _interopRequireDefault(reactDom__default)

    var _getContainer2 = _interopRequireDefault(getContainer_1)

    var _ownerDocument2 = _interopRequireDefault(ownerDocument$2)

    var _LegacyPortal2 = _interopRequireDefault(LegacyPortal)

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function')
      }
    }

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        )
      }
      return call && (typeof call === 'object' || typeof call === 'function')
        ? call
        : self
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError(
          'Super expression must either be null or a function, not ' +
            typeof superClass
        )
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true,
        },
      })
      if (superClass)
        Object.setPrototypeOf
          ? Object.setPrototypeOf(subClass, superClass)
          : (subClass.__proto__ = superClass)
    }

    /**
     * The `<Portal/>` component renders its children into a new "subtree" outside of current component hierarchy.
     * You can think of it as a declarative `appendChild()`, or jQuery's `$.fn.appendTo()`.
     * The children of `<Portal/>` component will be appended to the `container` specified.
     */
    var Portal = (function(_React$Component) {
      _inherits(Portal, _React$Component)

      function Portal() {
        var _temp, _this, _ret

        _classCallCheck(this, Portal)

        for (
          var _len = arguments.length, args = Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key]
        }

        return (
          (_ret = ((_temp = ((_this = _possibleConstructorReturn(
            this,
            _React$Component.call.apply(_React$Component, [this].concat(args))
          )),
          _this)),
          (_this.setContainer = function() {
            var props =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : _this.props

            _this._portalContainerNode = (0, _getContainer2.default)(
              props.container,
              (0, _ownerDocument2.default)(_this).body
            )
          }),
          (_this.getMountNode = function() {
            return _this._portalContainerNode
          }),
          _temp)),
          _possibleConstructorReturn(_this, _ret)
        )
      }

      Portal.prototype.componentDidMount = function componentDidMount() {
        this.setContainer()
        this.forceUpdate(this.props.onRendered)
      }

      Portal.prototype.componentWillReceiveProps = function componentWillReceiveProps(
        nextProps
      ) {
        if (nextProps.container !== this.props.container) {
          this.setContainer(nextProps)
        }
      }

      Portal.prototype.componentWillUnmount = function componentWillUnmount() {
        this._portalContainerNode = null
      }

      Portal.prototype.render = function render() {
        return this.props.children && this._portalContainerNode
          ? _reactDom2.default.createPortal(
              this.props.children,
              this._portalContainerNode
            )
          : null
      }

      return Portal
    })(_react2.default.Component)

    Portal.displayName = 'Portal'
    Portal.propTypes = {
      /**
       * A Node, Component instance, or function that returns either. The `container` will have the Portal children
       * appended to it.
       */
      container: _propTypes2.default.oneOfType([
        _componentOrElement2.default,
        _propTypes2.default.func,
      ]),

      onRendered: _propTypes2.default.func,
    }
    exports.default = _reactDom2.default.createPortal
      ? Portal
      : _LegacyPortal2.default
    module.exports = exports['default']
  })

  unwrapExports(Portal_1)

  var inDOM$2 = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })
    exports.default = !!(
      typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
    )
    module.exports = exports['default']
  })

  unwrapExports(inDOM$2)

  var contains$2 = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })

    var _inDOM2 = _interopRequireDefault(inDOM$2)

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    exports.default = (function() {
      // HTML DOM and SVG DOM may have different support levels,
      // so we need to check on context instead of a document root element.
      return _inDOM2.default
        ? function(context, node) {
            if (context.contains) {
              return context.contains(node)
            } else if (context.compareDocumentPosition) {
              return (
                context === node ||
                !!(context.compareDocumentPosition(node) & 16)
              )
            } else {
              return fallback(context, node)
            }
          }
        : fallback
    })()

    function fallback(context, node) {
      if (node)
        do {
          if (node === context) return true
        } while ((node = node.parentNode))

      return false
    }
    module.exports = exports['default']
  })

  unwrapExports(contains$2)

  var isWindow$2 = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })
    exports.default = getWindow
    function getWindow(node) {
      return node === node.window
        ? node
        : node.nodeType === 9
        ? node.defaultView || node.parentWindow
        : false
    }
    module.exports = exports['default']
  })

  unwrapExports(isWindow$2)

  var offset_1$1 = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })
    exports.default = offset

    var _contains2 = _interopRequireDefault(contains$2)

    var _isWindow2 = _interopRequireDefault(isWindow$2)

    var _ownerDocument2 = _interopRequireDefault(ownerDocument_1$1)

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    function offset(node) {
      var doc = (0, _ownerDocument2.default)(node),
        win = (0, _isWindow2.default)(doc),
        docElem = doc && doc.documentElement,
        box = { top: 0, left: 0, height: 0, width: 0 }

      if (!doc) return

      // Make sure it's not a disconnected DOM node
      if (!(0, _contains2.default)(docElem, node)) return box

      if (node.getBoundingClientRect !== undefined)
        box = node.getBoundingClientRect()

      // IE8 getBoundingClientRect doesn't support width & height
      box = {
        top:
          box.top +
          (win.pageYOffset || docElem.scrollTop) -
          (docElem.clientTop || 0),
        left:
          box.left +
          (win.pageXOffset || docElem.scrollLeft) -
          (docElem.clientLeft || 0),
        width: (box.width == null ? node.offsetWidth : box.width) || 0,
        height: (box.height == null ? node.offsetHeight : box.height) || 0,
      }

      return box
    }
    module.exports = exports['default']
  })

  unwrapExports(offset_1$1)

  var camelize_1$1 = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })
    exports.default = camelize
    var rHyphen = /-(.)/g

    function camelize(string) {
      return string.replace(rHyphen, function(_, chr) {
        return chr.toUpperCase()
      })
    }
    module.exports = exports['default']
  })

  unwrapExports(camelize_1$1)

  var camelizeStyle$2 = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })
    exports.default = camelizeStyleName

    var _camelize2 = _interopRequireDefault(camelize_1$1)

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    var msPattern = /^-ms-/
    /**
     * Copyright 2014-2015, Facebook, Inc.
     * All rights reserved.
     * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/camelizeStyleName.js
     */
    function camelizeStyleName(string) {
      return (0, _camelize2.default)(string.replace(msPattern, 'ms-'))
    }
    module.exports = exports['default']
  })

  unwrapExports(camelizeStyle$2)

  var hyphenate_1$1 = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })
    exports.default = hyphenate

    var rUpper = /([A-Z])/g

    function hyphenate(string) {
      return string.replace(rUpper, '-$1').toLowerCase()
    }
    module.exports = exports['default']
  })

  unwrapExports(hyphenate_1$1)

  var hyphenateStyle$2 = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })
    exports.default = hyphenateStyleName

    var _hyphenate2 = _interopRequireDefault(hyphenate_1$1)

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    var msPattern = /^ms-/
    /**
     * Copyright 2013-2014, Facebook, Inc.
     * All rights reserved.
     * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
     */

    function hyphenateStyleName(string) {
      return (0, _hyphenate2.default)(string).replace(msPattern, '-ms-')
    }
    module.exports = exports['default']
  })

  unwrapExports(hyphenateStyle$2)

  var getComputedStyle$2 = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })
    exports.default = _getComputedStyle

    var _camelizeStyle2 = _interopRequireDefault(camelizeStyle$2)

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    var rposition = /^(top|right|bottom|left)$/
    var rnumnonpx = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i

    function _getComputedStyle(node) {
      if (!node)
        throw new TypeError('No Element passed to `getComputedStyle()`')
      var doc = node.ownerDocument

      return 'defaultView' in doc
        ? doc.defaultView.opener
          ? node.ownerDocument.defaultView.getComputedStyle(node, null)
          : window.getComputedStyle(node, null)
        : {
            //ie 8 "magic" from: https://github.com/jquery/jquery/blob/1.11-stable/src/css/curCSS.js#L72
            getPropertyValue: function getPropertyValue(prop) {
              var style = node.style

              prop = (0, _camelizeStyle2.default)(prop)

              if (prop == 'float') prop = 'styleFloat'

              var current = node.currentStyle[prop] || null

              if (current == null && style && style[prop]) current = style[prop]

              if (rnumnonpx.test(current) && !rposition.test(prop)) {
                // Remember the original values
                var left = style.left
                var runStyle = node.runtimeStyle
                var rsLeft = runStyle && runStyle.left

                // Put in the new values to get a computed value out
                if (rsLeft) runStyle.left = node.currentStyle.left

                style.left = prop === 'fontSize' ? '1em' : current
                current = style.pixelLeft + 'px'

                // Revert the changed values
                style.left = left
                if (rsLeft) runStyle.left = rsLeft
              }

              return current
            },
          }
    }
    module.exports = exports['default']
  })

  unwrapExports(getComputedStyle$2)

  var removeStyle_1$1 = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })
    exports.default = removeStyle
    function removeStyle(node, key) {
      return 'removeProperty' in node.style
        ? node.style.removeProperty(key)
        : node.style.removeAttribute(key)
    }
    module.exports = exports['default']
  })

  unwrapExports(removeStyle_1$1)

  var properties$2 = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })
    exports.animationEnd = exports.animationDelay = exports.animationTiming = exports.animationDuration = exports.animationName = exports.transitionEnd = exports.transitionDuration = exports.transitionDelay = exports.transitionTiming = exports.transitionProperty = exports.transform = undefined

    var _inDOM2 = _interopRequireDefault(inDOM$2)

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    var transform = 'transform'
    var prefix = void 0,
      transitionEnd = void 0,
      animationEnd = void 0
    var transitionProperty = void 0,
      transitionDuration = void 0,
      transitionTiming = void 0,
      transitionDelay = void 0
    var animationName = void 0,
      animationDuration = void 0,
      animationTiming = void 0,
      animationDelay = void 0

    if (_inDOM2.default) {
      var _getTransitionPropert = getTransitionProperties()

      prefix = _getTransitionPropert.prefix
      exports.transitionEnd = transitionEnd =
        _getTransitionPropert.transitionEnd
      exports.animationEnd = animationEnd = _getTransitionPropert.animationEnd

      exports.transform = transform = prefix + '-' + transform
      exports.transitionProperty = transitionProperty =
        prefix + '-transition-property'
      exports.transitionDuration = transitionDuration =
        prefix + '-transition-duration'
      exports.transitionDelay = transitionDelay = prefix + '-transition-delay'
      exports.transitionTiming = transitionTiming =
        prefix + '-transition-timing-function'

      exports.animationName = animationName = prefix + '-animation-name'
      exports.animationDuration = animationDuration =
        prefix + '-animation-duration'
      exports.animationTiming = animationTiming = prefix + '-animation-delay'
      exports.animationDelay = animationDelay =
        prefix + '-animation-timing-function'
    }

    exports.transform = transform
    exports.transitionProperty = transitionProperty
    exports.transitionTiming = transitionTiming
    exports.transitionDelay = transitionDelay
    exports.transitionDuration = transitionDuration
    exports.transitionEnd = transitionEnd
    exports.animationName = animationName
    exports.animationDuration = animationDuration
    exports.animationTiming = animationTiming
    exports.animationDelay = animationDelay
    exports.animationEnd = animationEnd
    exports.default = {
      transform: transform,
      end: transitionEnd,
      property: transitionProperty,
      timing: transitionTiming,
      delay: transitionDelay,
      duration: transitionDuration,
    }

    function getTransitionProperties() {
      var style = document.createElement('div').style

      var vendorMap = {
        O: function O(e) {
          return 'o' + e.toLowerCase()
        },
        Moz: function Moz(e) {
          return e.toLowerCase()
        },
        Webkit: function Webkit(e) {
          return 'webkit' + e
        },
        ms: function ms(e) {
          return 'MS' + e
        },
      }

      var vendors = Object.keys(vendorMap)

      var transitionEnd = void 0,
        animationEnd = void 0
      var prefix = ''

      for (var i = 0; i < vendors.length; i++) {
        var vendor = vendors[i]

        if (vendor + 'TransitionProperty' in style) {
          prefix = '-' + vendor.toLowerCase()
          transitionEnd = vendorMap[vendor]('TransitionEnd')
          animationEnd = vendorMap[vendor]('AnimationEnd')
          break
        }
      }

      if (!transitionEnd && 'transitionProperty' in style)
        transitionEnd = 'transitionend'

      if (!animationEnd && 'animationName' in style)
        animationEnd = 'animationend'

      style = null

      return {
        animationEnd: animationEnd,
        transitionEnd: transitionEnd,
        prefix: prefix,
      }
    }
  })

  unwrapExports(properties$2)
  var properties_1$1 = properties$2.animationEnd
  var properties_2$1 = properties$2.animationDelay
  var properties_3$1 = properties$2.animationTiming
  var properties_4$1 = properties$2.animationDuration
  var properties_5$1 = properties$2.animationName
  var properties_6$1 = properties$2.transitionEnd
  var properties_7$1 = properties$2.transitionDuration
  var properties_8$1 = properties$2.transitionDelay
  var properties_9$1 = properties$2.transitionTiming
  var properties_10$1 = properties$2.transitionProperty
  var properties_11$1 = properties$2.transform

  var isTransform_1$1 = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })
    exports.default = isTransform
    var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i

    function isTransform(property) {
      return !!(property && supportedTransforms.test(property))
    }
    module.exports = exports['default']
  })

  unwrapExports(isTransform_1$1)

  var style_1$1 = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })
    exports.default = style

    var _camelizeStyle2 = _interopRequireDefault(camelizeStyle$2)

    var _hyphenateStyle2 = _interopRequireDefault(hyphenateStyle$2)

    var _getComputedStyle3 = _interopRequireDefault(getComputedStyle$2)

    var _removeStyle2 = _interopRequireDefault(removeStyle_1$1)

    var _isTransform2 = _interopRequireDefault(isTransform_1$1)

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    function style(node, property, value) {
      var css = ''
      var transforms = ''
      var props = property

      if (typeof property === 'string') {
        if (value === undefined) {
          return (
            node.style[(0, _camelizeStyle2.default)(property)] ||
            (0, _getComputedStyle3.default)(node).getPropertyValue(
              (0, _hyphenateStyle2.default)(property)
            )
          )
        } else {
          ;(props = {})[property] = value
        }
      }

      Object.keys(props).forEach(function(key) {
        var value = props[key]
        if (!value && value !== 0) {
          ;(0, _removeStyle2.default)(node, (0, _hyphenateStyle2.default)(key))
        } else if ((0, _isTransform2.default)(key)) {
          transforms += key + '(' + value + ') '
        } else {
          css += (0, _hyphenateStyle2.default)(key) + ': ' + value + ';'
        }
      })

      if (transforms) {
        css += properties$2.transform + ': ' + transforms + ';'
      }

      node.style.cssText += ';' + css
    }
    module.exports = exports['default']
  })

  unwrapExports(style_1$1)

  var offsetParent_1$1 = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })
    exports.default = offsetParent

    var _ownerDocument2 = _interopRequireDefault(ownerDocument_1$1)

    var _style2 = _interopRequireDefault(style_1$1)

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    function nodeName(node) {
      return node.nodeName && node.nodeName.toLowerCase()
    }

    function offsetParent(node) {
      var doc = (0, _ownerDocument2.default)(node),
        offsetParent = node && node.offsetParent

      while (
        offsetParent &&
        nodeName(node) !== 'html' &&
        (0, _style2.default)(offsetParent, 'position') === 'static'
      ) {
        offsetParent = offsetParent.offsetParent
      }

      return offsetParent || doc.documentElement
    }
    module.exports = exports['default']
  })

  unwrapExports(offsetParent_1$1)

  var scrollTop_1$1 = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })
    exports.default = scrollTop

    var _isWindow2 = _interopRequireDefault(isWindow$2)

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    function scrollTop(node, val) {
      var win = (0, _isWindow2.default)(node)

      if (val === undefined)
        return win
          ? 'pageYOffset' in win
            ? win.pageYOffset
            : win.document.documentElement.scrollTop
          : node.scrollTop

      if (win)
        win.scrollTo(
          'pageXOffset' in win
            ? win.pageXOffset
            : win.document.documentElement.scrollLeft,
          val
        )
      else node.scrollTop = val
    }
    module.exports = exports['default']
  })

  unwrapExports(scrollTop_1$1)

  var scrollLeft$1 = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })
    exports.default = scrollTop

    var _isWindow2 = _interopRequireDefault(isWindow$2)

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    function scrollTop(node, val) {
      var win = (0, _isWindow2.default)(node)

      if (val === undefined)
        return win
          ? 'pageXOffset' in win
            ? win.pageXOffset
            : win.document.documentElement.scrollLeft
          : node.scrollLeft

      if (win)
        win.scrollTo(
          val,
          'pageYOffset' in win
            ? win.pageYOffset
            : win.document.documentElement.scrollTop
        )
      else node.scrollLeft = val
    }
    module.exports = exports['default']
  })

  unwrapExports(scrollLeft$1)

  var position_1$1 = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })

    var _extends =
      Object.assign ||
      function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i]
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key]
            }
          }
        }
        return target
      }

    exports.default = position

    var _offset2 = _interopRequireDefault(offset_1$1)

    var _offsetParent2 = _interopRequireDefault(offsetParent_1$1)

    var _scrollTop2 = _interopRequireDefault(scrollTop_1$1)

    var _scrollLeft2 = _interopRequireDefault(scrollLeft$1)

    var _style2 = _interopRequireDefault(style_1$1)

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    function nodeName(node) {
      return node.nodeName && node.nodeName.toLowerCase()
    }

    function position(node, offsetParent) {
      var parentOffset = { top: 0, left: 0 },
        offset

      // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
      // because it is its only offset parent
      if ((0, _style2.default)(node, 'position') === 'fixed') {
        offset = node.getBoundingClientRect()
      } else {
        offsetParent = offsetParent || (0, _offsetParent2.default)(node)
        offset = (0, _offset2.default)(node)

        if (nodeName(offsetParent) !== 'html')
          parentOffset = (0, _offset2.default)(offsetParent)

        parentOffset.top +=
          parseInt((0, _style2.default)(offsetParent, 'borderTopWidth'), 10) -
            (0, _scrollTop2.default)(offsetParent) || 0
        parentOffset.left +=
          parseInt((0, _style2.default)(offsetParent, 'borderLeftWidth'), 10) -
            (0, _scrollLeft2.default)(offsetParent) || 0
      }

      // Subtract parent offsets and node margins
      return _extends({}, offset, {
        top:
          offset.top -
          parentOffset.top -
          (parseInt((0, _style2.default)(node, 'marginTop'), 10) || 0),
        left:
          offset.left -
          parentOffset.left -
          (parseInt((0, _style2.default)(node, 'marginLeft'), 10) || 0),
      })
    }
    module.exports = exports['default']
  })

  unwrapExports(position_1$1)

  var calculatePosition_1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = calculatePosition

    var _offset2 = _interopRequireDefault(offset_1$1)

    var _position2 = _interopRequireDefault(position_1$1)

    var _scrollTop2 = _interopRequireDefault(scrollTop_1$1)

    var _ownerDocument2 = _interopRequireDefault(ownerDocument$2)

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    function getContainerDimensions(containerNode) {
      var width = void 0,
        height = void 0,
        scroll = void 0

      if (containerNode.tagName === 'BODY') {
        width = window.innerWidth
        height = window.innerHeight

        scroll =
          (0, _scrollTop2.default)(
            (0, _ownerDocument2.default)(containerNode).documentElement
          ) || (0, _scrollTop2.default)(containerNode)
      } else {
        var _getOffset = (0, _offset2.default)(containerNode)

        width = _getOffset.width
        height = _getOffset.height

        scroll = (0, _scrollTop2.default)(containerNode)
      }

      return { width: width, height: height, scroll: scroll }
    }

    function getTopDelta(top, overlayHeight, container, padding) {
      var containerDimensions = getContainerDimensions(container)
      var containerScroll = containerDimensions.scroll
      var containerHeight = containerDimensions.height

      var topEdgeOffset = top - padding - containerScroll
      var bottomEdgeOffset = top + padding - containerScroll + overlayHeight

      if (topEdgeOffset < 0) {
        return -topEdgeOffset
      } else if (bottomEdgeOffset > containerHeight) {
        return containerHeight - bottomEdgeOffset
      } else {
        return 0
      }
    }

    function getLeftDelta(left, overlayWidth, container, padding) {
      var containerDimensions = getContainerDimensions(container)
      var containerWidth = containerDimensions.width

      var leftEdgeOffset = left - padding
      var rightEdgeOffset = left + padding + overlayWidth

      if (leftEdgeOffset < 0) {
        return -leftEdgeOffset
      } else if (rightEdgeOffset > containerWidth) {
        return containerWidth - rightEdgeOffset
      }

      return 0
    }

    function calculatePosition(
      placement,
      overlayNode,
      target,
      container,
      padding
    ) {
      var childOffset =
        container.tagName === 'BODY'
          ? (0, _offset2.default)(target)
          : (0, _position2.default)(target, container)

      var _getOffset2 = (0, _offset2.default)(overlayNode),
        overlayHeight = _getOffset2.height,
        overlayWidth = _getOffset2.width

      var positionLeft = void 0,
        positionTop = void 0,
        arrowOffsetLeft = void 0,
        arrowOffsetTop = void 0

      if (placement === 'left' || placement === 'right') {
        positionTop = childOffset.top + (childOffset.height - overlayHeight) / 2

        if (placement === 'left') {
          positionLeft = childOffset.left - overlayWidth
        } else {
          positionLeft = childOffset.left + childOffset.width
        }

        var topDelta = getTopDelta(
          positionTop,
          overlayHeight,
          container,
          padding
        )

        positionTop += topDelta
        arrowOffsetTop = 50 * (1 - (2 * topDelta) / overlayHeight) + '%'
        arrowOffsetLeft = void 0
      } else if (placement === 'top' || placement === 'bottom') {
        positionLeft = childOffset.left + (childOffset.width - overlayWidth) / 2

        if (placement === 'top') {
          positionTop = childOffset.top - overlayHeight
        } else {
          positionTop = childOffset.top + childOffset.height
        }

        var leftDelta = getLeftDelta(
          positionLeft,
          overlayWidth,
          container,
          padding
        )

        positionLeft += leftDelta
        arrowOffsetLeft = 50 * (1 - (2 * leftDelta) / overlayWidth) + '%'
        arrowOffsetTop = void 0
      } else {
        throw new Error(
          'calcOverlayPosition(): No such placement of "' +
            placement +
            '" found.'
        )
      }

      return {
        positionLeft: positionLeft,
        positionTop: positionTop,
        arrowOffsetLeft: arrowOffsetLeft,
        arrowOffsetTop: arrowOffsetTop,
      }
    }
    module.exports = exports['default']
  })

  unwrapExports(calculatePosition_1)

  var Position_1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true

    var _extends =
      Object.assign ||
      function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i]
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key]
            }
          }
        }
        return target
      }

    var _classnames2 = _interopRequireDefault(classnames)

    var _propTypes2 = _interopRequireDefault(propTypes)

    var _componentOrElement2 = _interopRequireDefault(componentOrElement)

    var _react2 = _interopRequireDefault(React__default)

    var _reactDom2 = _interopRequireDefault(reactDom__default)

    var _calculatePosition2 = _interopRequireDefault(calculatePosition_1)

    var _getContainer2 = _interopRequireDefault(getContainer_1)

    var _ownerDocument2 = _interopRequireDefault(ownerDocument$2)

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    function _objectWithoutProperties(obj, keys) {
      var target = {}
      for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
        target[i] = obj[i]
      }
      return target
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function')
      }
    }

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        )
      }
      return call && (typeof call === 'object' || typeof call === 'function')
        ? call
        : self
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError(
          'Super expression must either be null or a function, not ' +
            typeof superClass
        )
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true,
        },
      })
      if (superClass)
        Object.setPrototypeOf
          ? Object.setPrototypeOf(subClass, superClass)
          : (subClass.__proto__ = superClass)
    }

    /**
     * The Position component calculates the coordinates for its child, to position
     * it relative to a `target` component or node. Useful for creating callouts
     * and tooltips, the Position component injects a `style` props with `left` and
     * `top` values for positioning your component.
     *
     * It also injects "arrow" `left`, and `top` values for styling callout arrows
     * for giving your components a sense of directionality.
     */
    var Position = (function(_React$Component) {
      _inherits(Position, _React$Component)

      function Position(props, context) {
        _classCallCheck(this, Position)

        var _this = _possibleConstructorReturn(
          this,
          _React$Component.call(this, props, context)
        )

        _this.getTarget = function() {
          var target = _this.props.target

          var targetElement = typeof target === 'function' ? target() : target
          return (
            (targetElement && _reactDom2.default.findDOMNode(targetElement)) ||
            null
          )
        }

        _this.maybeUpdatePosition = function(placementChanged) {
          var target = _this.getTarget()

          if (
            !_this.props.shouldUpdatePosition &&
            target === _this._lastTarget &&
            !placementChanged
          ) {
            return
          }

          _this.updatePosition(target)
        }

        _this.state = {
          positionLeft: 0,
          positionTop: 0,
          arrowOffsetLeft: null,
          arrowOffsetTop: null,
        }

        _this._needsFlush = false
        _this._lastTarget = null
        return _this
      }

      Position.prototype.componentDidMount = function componentDidMount() {
        this.updatePosition(this.getTarget())
      }

      Position.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
        this._needsFlush = true
      }

      Position.prototype.componentDidUpdate = function componentDidUpdate(
        prevProps
      ) {
        if (this._needsFlush) {
          this._needsFlush = false
          this.maybeUpdatePosition(this.props.placement !== prevProps.placement)
        }
      }

      Position.prototype.render = function render() {
        var _props = this.props,
          children = _props.children,
          className = _props.className,
          props = _objectWithoutProperties(_props, ['children', 'className'])

        var _state = this.state,
          positionLeft = _state.positionLeft,
          positionTop = _state.positionTop,
          arrowPosition = _objectWithoutProperties(_state, [
            'positionLeft',
            'positionTop',
          ])

        // These should not be forwarded to the child.

        delete props.target
        delete props.container
        delete props.containerPadding
        delete props.shouldUpdatePosition

        var child = _react2.default.Children.only(children)
        return (0, React__default.cloneElement)(
          child,
          _extends({}, props, arrowPosition, {
            // FIXME: Don't forward `positionLeft` and `positionTop` via both props
            // and `props.style`.
            positionLeft: positionLeft,
            positionTop: positionTop,
            className: (0, _classnames2.default)(
              className,
              child.props.className
            ),
            style: _extends({}, child.props.style, {
              left: positionLeft,
              top: positionTop,
            }),
          })
        )
      }

      Position.prototype.updatePosition = function updatePosition(target) {
        this._lastTarget = target

        if (!target) {
          this.setState({
            positionLeft: 0,
            positionTop: 0,
            arrowOffsetLeft: null,
            arrowOffsetTop: null,
          })

          return
        }

        var overlay = _reactDom2.default.findDOMNode(this)
        var container = (0, _getContainer2.default)(
          this.props.container,
          (0, _ownerDocument2.default)(this).body
        )

        this.setState(
          (0, _calculatePosition2.default)(
            this.props.placement,
            overlay,
            target,
            container,
            this.props.containerPadding
          )
        )
      }

      return Position
    })(_react2.default.Component)

    Position.propTypes = {
      /**
       * A node, element, or function that returns either. The child will be
       * be positioned next to the `target` specified.
       */
      target: _propTypes2.default.oneOfType([
        _componentOrElement2.default,
        _propTypes2.default.func,
      ]),

      /**
       * "offsetParent" of the component
       */
      container: _propTypes2.default.oneOfType([
        _componentOrElement2.default,
        _propTypes2.default.func,
      ]),
      /**
       * Minimum spacing in pixels between container border and component border
       */
      containerPadding: _propTypes2.default.number,
      /**
       * How to position the component relative to the target
       */
      placement: _propTypes2.default.oneOf(['top', 'right', 'bottom', 'left']),
      /**
       * Whether the position should be changed on each update
       */
      shouldUpdatePosition: _propTypes2.default.bool,
    }

    Position.displayName = 'Position'

    Position.defaultProps = {
      containerPadding: 0,
      placement: 'right',
      shouldUpdatePosition: false,
    }

    exports.default = Position
    module.exports = exports['default']
  })

  unwrapExports(Position_1)

  var on_1 = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })

    var _inDOM2 = _interopRequireDefault(inDOM$2)

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    var on = function on() {}
    if (_inDOM2.default) {
      on = (function() {
        if (document.addEventListener)
          return function(node, eventName, handler, capture) {
            return node.addEventListener(eventName, handler, capture || false)
          }
        else if (document.attachEvent)
          return function(node, eventName, handler) {
            return node.attachEvent('on' + eventName, function(e) {
              e = e || window.event
              e.target = e.target || e.srcElement
              e.currentTarget = node
              handler.call(node, e)
            })
          }
      })()
    }

    exports.default = on
    module.exports = exports['default']
  })

  unwrapExports(on_1)

  var off_1 = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })

    var _inDOM2 = _interopRequireDefault(inDOM$2)

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    var off = function off() {}
    if (_inDOM2.default) {
      off = (function() {
        if (document.addEventListener)
          return function(node, eventName, handler, capture) {
            return node.removeEventListener(
              eventName,
              handler,
              capture || false
            )
          }
        else if (document.attachEvent)
          return function(node, eventName, handler) {
            return node.detachEvent('on' + eventName, handler)
          }
      })()
    }

    exports.default = off
    module.exports = exports['default']
  })

  unwrapExports(off_1)

  var addEventListener = createCommonjsModule(function(module, exports) {
    exports.__esModule = true

    exports.default = function(node, event, handler, capture) {
      ;(0, _on2.default)(node, event, handler, capture)

      return {
        remove: function remove() {
          ;(0, _off2.default)(node, event, handler, capture)
        },
      }
    }

    var _on2 = _interopRequireDefault(on_1)

    var _off2 = _interopRequireDefault(off_1)

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    module.exports = exports['default']
  })

  unwrapExports(addEventListener)

  var RootCloseWrapper_1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true

    var _contains2 = _interopRequireDefault(contains$2)

    var _propTypes2 = _interopRequireDefault(propTypes)

    var _react2 = _interopRequireDefault(React__default)

    var _reactDom2 = _interopRequireDefault(reactDom__default)

    var _addEventListener2 = _interopRequireDefault(addEventListener)

    var _ownerDocument2 = _interopRequireDefault(ownerDocument$2)

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function')
      }
    }

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        )
      }
      return call && (typeof call === 'object' || typeof call === 'function')
        ? call
        : self
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError(
          'Super expression must either be null or a function, not ' +
            typeof superClass
        )
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true,
        },
      })
      if (superClass)
        Object.setPrototypeOf
          ? Object.setPrototypeOf(subClass, superClass)
          : (subClass.__proto__ = superClass)
    }

    var escapeKeyCode = 27

    function isLeftClickEvent(event) {
      return event.button === 0
    }

    function isModifiedEvent(event) {
      return !!(
        event.metaKey ||
        event.altKey ||
        event.ctrlKey ||
        event.shiftKey
      )
    }

    /**
     * The `<RootCloseWrapper/>` component registers your callback on the document
     * when rendered. Powers the `<Overlay/>` component. This is used achieve modal
     * style behavior where your callback is triggered when the user tries to
     * interact with the rest of the document or hits the `esc` key.
     */

    var RootCloseWrapper = (function(_React$Component) {
      _inherits(RootCloseWrapper, _React$Component)

      function RootCloseWrapper(props, context) {
        _classCallCheck(this, RootCloseWrapper)

        var _this = _possibleConstructorReturn(
          this,
          _React$Component.call(this, props, context)
        )

        _this.addEventListeners = function() {
          var event = _this.props.event

          var doc = (0, _ownerDocument2.default)(_this)

          // Use capture for this listener so it fires before React's listener, to
          // avoid false positives in the contains() check below if the target DOM
          // element is removed in the React mouse callback.
          _this.documentMouseCaptureListener = (0, _addEventListener2.default)(
            doc,
            event,
            _this.handleMouseCapture,
            true
          )

          _this.documentMouseListener = (0, _addEventListener2.default)(
            doc,
            event,
            _this.handleMouse
          )

          _this.documentKeyupListener = (0, _addEventListener2.default)(
            doc,
            'keyup',
            _this.handleKeyUp
          )
        }

        _this.removeEventListeners = function() {
          if (_this.documentMouseCaptureListener) {
            _this.documentMouseCaptureListener.remove()
          }

          if (_this.documentMouseListener) {
            _this.documentMouseListener.remove()
          }

          if (_this.documentKeyupListener) {
            _this.documentKeyupListener.remove()
          }
        }

        _this.handleMouseCapture = function(e) {
          _this.preventMouseRootClose =
            isModifiedEvent(e) ||
            !isLeftClickEvent(e) ||
            (0, _contains2.default)(
              _reactDom2.default.findDOMNode(_this),
              e.target
            )
        }

        _this.handleMouse = function(e) {
          if (!_this.preventMouseRootClose && _this.props.onRootClose) {
            _this.props.onRootClose(e)
          }
        }

        _this.handleKeyUp = function(e) {
          if (e.keyCode === escapeKeyCode && _this.props.onRootClose) {
            _this.props.onRootClose(e)
          }
        }

        _this.preventMouseRootClose = false
        return _this
      }

      RootCloseWrapper.prototype.componentDidMount = function componentDidMount() {
        if (!this.props.disabled) {
          this.addEventListeners()
        }
      }

      RootCloseWrapper.prototype.componentDidUpdate = function componentDidUpdate(
        prevProps
      ) {
        if (!this.props.disabled && prevProps.disabled) {
          this.addEventListeners()
        } else if (this.props.disabled && !prevProps.disabled) {
          this.removeEventListeners()
        }
      }

      RootCloseWrapper.prototype.componentWillUnmount = function componentWillUnmount() {
        if (!this.props.disabled) {
          this.removeEventListeners()
        }
      }

      RootCloseWrapper.prototype.render = function render() {
        return this.props.children
      }

      return RootCloseWrapper
    })(_react2.default.Component)

    RootCloseWrapper.displayName = 'RootCloseWrapper'

    RootCloseWrapper.propTypes = {
      /**
       * Callback fired after click or mousedown. Also triggers when user hits `esc`.
       */
      onRootClose: _propTypes2.default.func,
      /**
       * Children to render.
       */
      children: _propTypes2.default.element,
      /**
       * Disable the the RootCloseWrapper, preventing it from triggering `onRootClose`.
       */
      disabled: _propTypes2.default.bool,
      /**
       * Choose which document mouse event to bind to.
       */
      event: _propTypes2.default.oneOf(['click', 'mousedown']),
    }

    RootCloseWrapper.defaultProps = {
      event: 'click',
    }

    exports.default = RootCloseWrapper
    module.exports = exports['default']
  })

  unwrapExports(RootCloseWrapper_1)

  var Overlay_1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true

    var _extends =
      Object.assign ||
      function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i]
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key]
            }
          }
        }
        return target
      }

    var _propTypes2 = _interopRequireDefault(propTypes)

    var _elementType2 = _interopRequireDefault(elementType_1)

    var _react2 = _interopRequireDefault(React__default)

    var _Portal2 = _interopRequireDefault(Portal_1)

    var _Position2 = _interopRequireDefault(Position_1)

    var _RootCloseWrapper2 = _interopRequireDefault(RootCloseWrapper_1)

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    function _objectWithoutProperties(obj, keys) {
      var target = {}
      for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
        target[i] = obj[i]
      }
      return target
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function')
      }
    }

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        )
      }
      return call && (typeof call === 'object' || typeof call === 'function')
        ? call
        : self
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError(
          'Super expression must either be null or a function, not ' +
            typeof superClass
        )
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true,
        },
      })
      if (superClass)
        Object.setPrototypeOf
          ? Object.setPrototypeOf(subClass, superClass)
          : (subClass.__proto__ = superClass)
    }

    /**
     * Built on top of `<Position/>` and `<Portal/>`, the overlay component is great for custom tooltip overlays.
     */
    var Overlay = (function(_React$Component) {
      _inherits(Overlay, _React$Component)

      function Overlay(props, context) {
        _classCallCheck(this, Overlay)

        var _this = _possibleConstructorReturn(
          this,
          _React$Component.call(this, props, context)
        )

        _this.handleHidden = function() {
          _this.setState({ exited: true })

          if (_this.props.onExited) {
            var _this$props

            ;(_this$props = _this.props).onExited.apply(_this$props, arguments)
          }
        }

        _this.state = { exited: !props.show }
        _this.onHiddenListener = _this.handleHidden.bind(_this)
        return _this
      }

      Overlay.prototype.componentWillReceiveProps = function componentWillReceiveProps(
        nextProps
      ) {
        if (nextProps.show) {
          this.setState({ exited: false })
        } else if (!nextProps.transition) {
          // Otherwise let handleHidden take care of marking exited.
          this.setState({ exited: true })
        }
      }

      Overlay.prototype.render = function render() {
        var _props = this.props,
          container = _props.container,
          containerPadding = _props.containerPadding,
          target = _props.target,
          placement = _props.placement,
          shouldUpdatePosition = _props.shouldUpdatePosition,
          rootClose = _props.rootClose,
          children = _props.children,
          Transition = _props.transition,
          props = _objectWithoutProperties(_props, [
            'container',
            'containerPadding',
            'target',
            'placement',
            'shouldUpdatePosition',
            'rootClose',
            'children',
            'transition',
          ])

        // Don't un-render the overlay while it's transitioning out.

        var mountOverlay = props.show || (Transition && !this.state.exited)
        if (!mountOverlay) {
          // Don't bother showing anything if we don't have to.
          return null
        }

        var child = children

        // Position is be inner-most because it adds inline styles into the child,
        // which the other wrappers don't forward correctly.
        child = _react2.default.createElement(
          _Position2.default,
          {
            container: container,
            containerPadding: containerPadding,
            target: target,
            placement: placement,
            shouldUpdatePosition: shouldUpdatePosition,
          },
          child
        )

        if (Transition) {
          var onExit = props.onExit,
            onExiting = props.onExiting,
            onEnter = props.onEnter,
            onEntering = props.onEntering,
            onEntered = props.onEntered

          // This animates the child node by injecting props, so it must precede
          // anything that adds a wrapping div.

          child = _react2.default.createElement(
            Transition,
            {
              in: props.show,
              appear: true,
              onExit: onExit,
              onExiting: onExiting,
              onExited: this.onHiddenListener,
              onEnter: onEnter,
              onEntering: onEntering,
              onEntered: onEntered,
            },
            child
          )
        }

        // This goes after everything else because it adds a wrapping div.
        if (rootClose) {
          child = _react2.default.createElement(
            _RootCloseWrapper2.default,
            { onRootClose: props.onHide },
            child
          )
        }

        return _react2.default.createElement(
          _Portal2.default,
          { container: container },
          child
        )
      }

      return Overlay
    })(_react2.default.Component)

    Overlay.propTypes = _extends(
      {},
      _Portal2.default.propTypes,
      _Position2.default.propTypes,
      {
        /**
         * Set the visibility of the Overlay
         */
        show: _propTypes2.default.bool,

        /**
         * Specify whether the overlay should trigger `onHide` when the user clicks outside the overlay
         */
        rootClose: _propTypes2.default.bool,

        /**
         * A Callback fired by the Overlay when it wishes to be hidden.
         *
         * __required__ when `rootClose` is `true`.
         *
         * @type func
         */
        onHide: function onHide(props) {
          var propType = _propTypes2.default.func
          if (props.rootClose) {
            propType = propType.isRequired
          }

          for (
            var _len = arguments.length,
              args = Array(_len > 1 ? _len - 1 : 0),
              _key = 1;
            _key < _len;
            _key++
          ) {
            args[_key - 1] = arguments[_key]
          }

          return propType.apply(undefined, [props].concat(args))
        },

        /**
         * A `react-transition-group@2.0.0` `<Transition/>` component
         * used to animate the overlay as it changes visibility.
         */
        transition: _elementType2.default,

        /**
         * Callback fired before the Overlay transitions in
         */
        onEnter: _propTypes2.default.func,

        /**
         * Callback fired as the Overlay begins to transition in
         */
        onEntering: _propTypes2.default.func,

        /**
         * Callback fired after the Overlay finishes transitioning in
         */
        onEntered: _propTypes2.default.func,

        /**
         * Callback fired right before the Overlay transitions out
         */
        onExit: _propTypes2.default.func,

        /**
         * Callback fired as the Overlay begins to transition out
         */
        onExiting: _propTypes2.default.func,

        /**
         * Callback fired after the Overlay finishes transitioning out
         */
        onExited: _propTypes2.default.func,
      }
    )

    exports.default = Overlay
    module.exports = exports['default']
  })

  var Overlay = unwrapExports(Overlay_1)

  var height_1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = height

    var _offset = interopRequireDefault(offset_1)

    var _isWindow = interopRequireDefault(isWindow)

    function height(node, client) {
      var win = (0, _isWindow.default)(node)
      return win
        ? win.innerHeight
        : client
        ? node.clientHeight
        : (0, _offset.default)(node).height
    }

    module.exports = exports['default']
  })

  var getHeight = unwrapExports(height_1)

  var querySelectorAll = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = qsa
    // Zepto.js
    // (c) 2010-2015 Thomas Fuchs
    // Zepto.js may be freely distributed under the MIT license.
    var simpleSelectorRE = /^[\w-]*$/
    var toArray = Function.prototype.bind.call(
      Function.prototype.call,
      [].slice
    )

    function qsa(element, selector) {
      var maybeID = selector[0] === '#',
        maybeClass = selector[0] === '.',
        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector,
        isSimple = simpleSelectorRE.test(nameOnly),
        found

      if (isSimple) {
        if (maybeID) {
          element = element.getElementById ? element : document
          return (found = element.getElementById(nameOnly)) ? [found] : []
        }

        if (element.getElementsByClassName && maybeClass)
          return toArray(element.getElementsByClassName(nameOnly))
        return toArray(element.getElementsByTagName(selector))
      }

      return toArray(element.querySelectorAll(selector))
    }

    module.exports = exports['default']
  })

  var qsa = unwrapExports(querySelectorAll)

  var matches_1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = matches

    var _inDOM = interopRequireDefault(inDOM)

    var _querySelectorAll = interopRequireDefault(querySelectorAll)

    var matchesCache

    function matches(node, selector) {
      if (!matchesCache && _inDOM.default) {
        var body = document.body
        var nativeMatch =
          body.matches ||
          body.matchesSelector ||
          body.webkitMatchesSelector ||
          body.mozMatchesSelector ||
          body.msMatchesSelector
        matchesCache = nativeMatch
          ? function(node, selector) {
              return nativeMatch.call(node, selector)
            }
          : ie8MatchesSelector
      }

      return matchesCache ? matchesCache(node, selector) : null
    }

    function ie8MatchesSelector(node, selector) {
      var matches = (0, _querySelectorAll.default)(
          node.document || node.ownerDocument,
          selector
        ),
        i = 0

      while (matches[i] && matches[i] !== node) {
        i++
      }

      return !!matches[i]
    }

    module.exports = exports['default']
  })

  unwrapExports(matches_1)

  var closest_1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = closest

    var _matches = interopRequireDefault(matches_1)

    var isDoc = function isDoc(obj) {
      return obj != null && obj.nodeType === obj.DOCUMENT_NODE
    }

    function closest(node, selector, context) {
      while (node && (isDoc(node) || !(0, _matches.default)(node, selector))) {
        node = node !== context && !isDoc(node) ? node.parentNode : undefined
      }

      return node
    }

    module.exports = exports['default']
  })

  var closest = unwrapExports(closest_1)

  var on_1$1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = void 0

    var _inDOM = interopRequireDefault(inDOM)

    var on = function on() {}

    if (_inDOM.default) {
      on = (function() {
        if (document.addEventListener)
          return function(node, eventName, handler, capture) {
            return node.addEventListener(eventName, handler, capture || false)
          }
        else if (document.attachEvent)
          return function(node, eventName, handler) {
            return node.attachEvent('on' + eventName, function(e) {
              e = e || window.event
              e.target = e.target || e.srcElement
              e.currentTarget = node
              handler.call(node, e)
            })
          }
      })()
    }

    var _default = on
    exports.default = _default
    module.exports = exports['default']
  })

  unwrapExports(on_1$1)

  var off_1$1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = void 0

    var _inDOM = interopRequireDefault(inDOM)

    var off = function off() {}

    if (_inDOM.default) {
      off = (function() {
        if (document.addEventListener)
          return function(node, eventName, handler, capture) {
            return node.removeEventListener(
              eventName,
              handler,
              capture || false
            )
          }
        else if (document.attachEvent)
          return function(node, eventName, handler) {
            return node.detachEvent('on' + eventName, handler)
          }
      })()
    }

    var _default = off
    exports.default = _default
    module.exports = exports['default']
  })

  unwrapExports(off_1$1)

  var filter = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = filterEvents

    var _contains = interopRequireDefault(contains)

    var _querySelectorAll = interopRequireDefault(querySelectorAll)

    function filterEvents(selector, handler) {
      return function filterHandler(e) {
        var top = e.currentTarget,
          target = e.target,
          matches = (0, _querySelectorAll.default)(top, selector)
        if (
          matches.some(function(match) {
            return (0, _contains.default)(match, target)
          })
        )
          handler.call(this, e)
      }
    }

    module.exports = exports['default']
  })

  unwrapExports(filter)

  var listen_1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = void 0

    var _inDOM = interopRequireDefault(inDOM)

    var _on = interopRequireDefault(on_1$1)

    var _off = interopRequireDefault(off_1$1)

    var listen = function listen() {}

    if (_inDOM.default) {
      listen = function listen(node, eventName, handler, capture) {
        ;(0, _on.default)(node, eventName, handler, capture)
        return function() {
          ;(0, _off.default)(node, eventName, handler, capture)
        }
      }
    }

    var _default = listen
    exports.default = _default
    module.exports = exports['default']
  })

  unwrapExports(listen_1)

  var events = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = void 0

    var _on = interopRequireDefault(on_1$1)

    exports.on = _on.default

    var _off = interopRequireDefault(off_1$1)

    exports.off = _off.default

    var _filter = interopRequireDefault(filter)

    exports.filter = _filter.default

    var _listen = interopRequireDefault(listen_1)

    exports.listen = _listen.default
    var _default = {
      on: _on.default,
      off: _off.default,
      filter: _filter.default,
      listen: _listen.default,
    }
    exports.default = _default
  })

  var events$1 = unwrapExports(events)
  var events_1 = events.on
  var events_2 = events.off
  var events_3 = events.filter
  var events_4 = events.listen

  function addEventListener$2(type, handler, target) {
    if (target === void 0) {
      target = document
    }

    events$1.on(target, type, handler)
    return {
      remove: function remove() {
        events$1.off(target, type, handler)
      },
    }
  }

  function isOverContainer(container, x, y) {
    return !container || contains$1(container, document.elementFromPoint(x, y))
  }

  function getEventNodeFromPoint(node, _ref) {
    var clientX = _ref.clientX,
      clientY = _ref.clientY
    var target = document.elementFromPoint(clientX, clientY)
    return closest(target, '.rbc-event', node)
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
        this._handleTerminatingEvent = this._handleTerminatingEvent.bind(this)
        this._keyListener = this._keyListener.bind(this)
        this._dropFromOutsideListener = this._dropFromOutsideListener.bind(this) // Fixes an iOS 10 bug where scrolling could not be prevented on the window.
        // https://github.com/metafizzy/flickity/issues/457#issuecomment-254501356

        this._onTouchMoveWindowListener = addEventListener$2(
          'touchmove',
          function() {},
          window
        )
        this._onKeyDownListener = addEventListener$2(
          'keydown',
          this._keyListener
        )
        this._onKeyUpListener = addEventListener$2('keyup', this._keyListener)
        this._onDropFromOutsideListener = addEventListener$2(
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
        this._onInitialEventListener && this._onInitialEventListener.remove()
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
          touchMoveListener = addEventListener$2('touchmove', function() {
            return cleanup()
          })
          touchEndListener = addEventListener$2('touchend', function() {
            return cleanup()
          })
        }

        var touchStartListener = addEventListener$2(
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

        var mouseDownListener = addEventListener$2('mousedown', function(e) {
          _this2._onInitialEventListener.remove()

          _this2._handleInitialEvent(e)

          _this2._onInitialEventListener = addEventListener$2(
            'mousedown',
            _this2._handleInitialEvent
          )
        })
        var touchStartListener = addEventListener$2('touchstart', function(e) {
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

      _proto._dropFromOutsideListener = function _dropFromOutsideListener(e) {
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

        if (!this.globalMouse && node && !contains$1(node, e.target)) {
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
            this._onEndListener = addEventListener$2(
              'mouseup',
              this._handleTerminatingEvent
            )
            this._onEscListener = addEventListener$2(
              'keydown',
              this._handleTerminatingEvent
            )
            this._onMoveListener = addEventListener$2(
              'mousemove',
              this._handleMoveEvent
            )
            break

          case 'touchstart':
            this._handleMoveEvent(e)

            this._onEndListener = addEventListener$2(
              'touchend',
              this._handleTerminatingEvent
            )
            this._onMoveListener = addEventListener$2(
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
        var inRoot = !this.container || contains$1(this.container(), e.target)
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
      aRight = _getBoundsForNode$rig === void 0 ? aLeft : _getBoundsForNode$rig,
      _getBoundsForNode$bot = _getBoundsForNode.bottom,
      aBottom = _getBoundsForNode$bot === void 0 ? aTop : _getBoundsForNode$bot

    var _getBoundsForNode2 = getBoundsForNode(nodeB),
      bTop = _getBoundsForNode2.top,
      bLeft = _getBoundsForNode2.left,
      _getBoundsForNode2$ri = _getBoundsForNode2.right,
      bRight = _getBoundsForNode2$ri === void 0 ? bLeft : _getBoundsForNode2$ri,
      _getBoundsForNode2$bo = _getBoundsForNode2.bottom,
      bBottom = _getBoundsForNode2$bo === void 0 ? bTop : _getBoundsForNode2$bo

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
    if (dir === 'top') return window.pageYOffset || document.body.scrollTop || 0
  }

  var BackgroundCells =
    /*#__PURE__*/
    (function(_React$Component) {
      _inheritsLoose(BackgroundCells, _React$Component)

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
        if (nextProps.selectable && !this.props.selectable) this._selectable()
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
        return React__default.createElement(
          'div',
          {
            className: 'rbc-row-bg',
          },
          range.map(function(date, index) {
            var selected = selecting && index >= startIdx && index <= endIdx

            var _getters$dayProp = getters.dayProp(date),
              className = _getters$dayProp.className,
              style = _getters$dayProp.style

            return React__default.createElement(
              Wrapper,
              {
                key: index,
                value: date,
                range: range,
              },
              React__default.createElement('div', {
                style: style,
                className: classnames(
                  'rbc-day-bg',
                  className,
                  selected && 'rbc-selected-cell',
                  dates.eq(date, current, 'day') && 'rbc-today',
                  currentDate &&
                    dates.month(currentDate) !== dates.month(date) &&
                    'rbc-off-range-bg'
                ),
              })
            )
          })
        )
      }

      _proto._selectable = function _selectable() {
        var _this2 = this

        var node = reactDom.findDOMNode(this)
        var selector = (this._selector = new Selection(this.props.container, {
          longPressThreshold: this.props.longPressThreshold,
        }))

        var selectorClicksHandler = function selectorClicksHandler(
          point,
          actionType
        ) {
          if (!isEvent(reactDom.findDOMNode(_this2), point)) {
            var rowBox = getBoundsForNode(node)
            var _this2$props = _this2.props,
              range = _this2$props.range,
              rtl = _this2$props.rtl

            if (pointInBox(rowBox, point)) {
              var currentCell = getSlotAtX(rowBox, point.x, rtl, range.length)

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
            notify(_this2.props.onSelectStart, [box])
            _this2._initial = {
              x: box.x,
              y: box.y,
            }
          }

          if (selector.isSelected(node)) {
            var nodeBox = getBoundsForNode(node)

            var _dateCellSelection = dateCellSelection(
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
          return !isEvent(reactDom.findDOMNode(_this2), box)
        })
        selector.on('click', function(point) {
          return selectorClicksHandler(point, 'click')
        })
        selector.on('doubleClick', function(point) {
          return selectorClicksHandler(point, 'doubleClick')
        })
        selector.on('select', function(bounds) {
          _this2._selectSlot(
            _extends({}, _this2.state, {
              action: 'select',
              bounds: bounds,
            })
          )

          _this2._initial = {}

          _this2.setState({
            selecting: false,
          })

          notify(_this2.props.onSelectEnd, [_this2.state])
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
    })(React__default.Component)

  BackgroundCells.propTypes = {
    date: propTypes.instanceOf(Date),
    getNow: propTypes.func.isRequired,
    getters: propTypes.object.isRequired,
    components: propTypes.object.isRequired,
    container: propTypes.func,
    dayPropGetter: propTypes.func,
    selectable: propTypes.oneOf([true, false, 'ignoreEvents']),
    longPressThreshold: propTypes.number,
    onSelectSlot: propTypes.func.isRequired,
    onSelectEnd: propTypes.func,
    onSelectStart: propTypes.func,
    range: propTypes.arrayOf(propTypes.instanceOf(Date)),
    rtl: propTypes.bool,
    type: propTypes.string,
  }

  /* eslint-disable react/prop-types */

  var EventRowMixin = {
    propTypes: {
      slotMetrics: propTypes.object.isRequired,
      selected: propTypes.object,
      isAllDay: propTypes.bool,
      accessors: propTypes.object.isRequired,
      localizer: propTypes.object.isRequired,
      components: propTypes.object.isRequired,
      getters: propTypes.object.isRequired,
      onSelect: propTypes.func,
      onDoubleClick: propTypes.func,
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
      return React__default.createElement(EventCell, {
        event: event,
        getters: getters,
        localizer: localizer,
        accessors: accessors,
        components: components,
        onSelect: onSelect,
        onDoubleClick: onDoubleClick,
        continuesPrior: continuesPrior,
        continuesAfter: continuesAfter,
        selected: isSelected(event, selected),
      })
    },
    renderSpan: function renderSpan(slots, len, key, content) {
      if (content === void 0) {
        content = ' '
      }

      var per = (Math.abs(len) / slots) * 100 + '%'
      return React__default.createElement(
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

  var EventRow =
    /*#__PURE__*/
    (function(_React$Component) {
      _inheritsLoose(EventRow, _React$Component)

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
        return React__default.createElement(
          'div',
          {
            className: classnames(className, 'rbc-row'),
          },
          segments.reduce(function(row, _ref, li) {
            var event = _ref.event,
              left = _ref.left,
              right = _ref.right,
              span = _ref.span
            var key = '_lvl_' + li
            var gap = left - lastEnd
            var content = EventRowMixin.renderEvent(_this.props, event)
            if (gap)
              row.push(EventRowMixin.renderSpan(slots, gap, key + '_gap'))
            row.push(EventRowMixin.renderSpan(slots, span, key, content))
            lastEnd = right + 1
            return row
          }, [])
        )
      }

      return EventRow
    })(React__default.Component)

  EventRow.propTypes = _extends(
    {
      segments: propTypes.array,
    },
    EventRowMixin.propTypes
  )
  EventRow.defaultProps = _extends({}, EventRowMixin.defaultProps)

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1)

    while (fromRight ? index-- : ++index < length) {
      if (predicate(array[index], index, array)) {
        return index
      }
    }
    return -1
  }

  var _baseFindIndex = baseFindIndex

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = []
    this.size = 0
  }

  var _listCacheClear = listCacheClear

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf(array, key) {
    var length = array.length
    while (length--) {
      if (eq_1(array[length][0], key)) {
        return length
      }
    }
    return -1
  }

  var _assocIndexOf = assocIndexOf

  /** Used for built-in method references. */
  var arrayProto = Array.prototype

  /** Built-in value references. */
  var splice = arrayProto.splice

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete(key) {
    var data = this.__data__,
      index = _assocIndexOf(data, key)

    if (index < 0) {
      return false
    }
    var lastIndex = data.length - 1
    if (index == lastIndex) {
      data.pop()
    } else {
      splice.call(data, index, 1)
    }
    --this.size
    return true
  }

  var _listCacheDelete = listCacheDelete

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet(key) {
    var data = this.__data__,
      index = _assocIndexOf(data, key)

    return index < 0 ? undefined : data[index][1]
  }

  var _listCacheGet = listCacheGet

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas(key) {
    return _assocIndexOf(this.__data__, key) > -1
  }

  var _listCacheHas = listCacheHas

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet(key, value) {
    var data = this.__data__,
      index = _assocIndexOf(data, key)

    if (index < 0) {
      ++this.size
      data.push([key, value])
    } else {
      data[index][1] = value
    }
    return this
  }

  var _listCacheSet = listCacheSet

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache(entries) {
    var index = -1,
      length = entries == null ? 0 : entries.length

    this.clear()
    while (++index < length) {
      var entry = entries[index]
      this.set(entry[0], entry[1])
    }
  }

  // Add methods to `ListCache`.
  ListCache.prototype.clear = _listCacheClear
  ListCache.prototype['delete'] = _listCacheDelete
  ListCache.prototype.get = _listCacheGet
  ListCache.prototype.has = _listCacheHas
  ListCache.prototype.set = _listCacheSet

  var _ListCache = ListCache

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */
  function stackClear() {
    this.__data__ = new _ListCache()
    this.size = 0
  }

  var _stackClear = stackClear

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function stackDelete(key) {
    var data = this.__data__,
      result = data['delete'](key)

    this.size = data.size
    return result
  }

  var _stackDelete = stackDelete

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function stackGet(key) {
    return this.__data__.get(key)
  }

  var _stackGet = stackGet

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function stackHas(key) {
    return this.__data__.has(key)
  }

  var _stackHas = stackHas

  /** Used to detect overreaching core-js shims. */
  var coreJsData = _root['__core-js_shared__']

  var _coreJsData = coreJsData

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(
      (_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO) || ''
    )
    return uid ? 'Symbol(src)_1.' + uid : ''
  })()

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func
  }

  var _isMasked = isMasked

  /** Used for built-in method references. */
  var funcProto = Function.prototype

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func)
      } catch (e) {}
      try {
        return func + ''
      } catch (e) {}
    }
    return ''
  }

  var _toSource = toSource

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/

  /** Used for built-in method references. */
  var funcProto$1 = Function.prototype,
    objectProto$2 = Object.prototype

  /** Used to resolve the decompiled source of functions. */
  var funcToString$1 = funcProto$1.toString

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$2.hasOwnProperty

  /** Used to detect if a method is native. */
  var reIsNative = RegExp(
    '^' +
      funcToString$1
        .call(hasOwnProperty$2)
        .replace(reRegExpChar, '\\$&')
        .replace(
          /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
          '$1.*?'
        ) +
      '$'
  )

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject_1(value) || _isMasked(value)) {
      return false
    }
    var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor
    return pattern.test(_toSource(value))
  }

  var _baseIsNative = baseIsNative

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key]
  }

  var _getValue = getValue

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = _getValue(object, key)
    return _baseIsNative(value) ? value : undefined
  }

  var _getNative = getNative

  /* Built-in method references that are verified to be native. */
  var Map$1 = _getNative(_root, 'Map')

  var _Map = Map$1

  /* Built-in method references that are verified to be native. */
  var nativeCreate = _getNative(Object, 'create')

  var _nativeCreate = nativeCreate

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = _nativeCreate ? _nativeCreate(null) : {}
    this.size = 0
  }

  var _hashClear = hashClear

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key]
    this.size -= result ? 1 : 0
    return result
  }

  var _hashDelete = hashDelete

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__'

  /** Used for built-in method references. */
  var objectProto$3 = Object.prototype

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$3.hasOwnProperty

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet(key) {
    var data = this.__data__
    if (_nativeCreate) {
      var result = data[key]
      return result === HASH_UNDEFINED ? undefined : result
    }
    return hasOwnProperty$3.call(data, key) ? data[key] : undefined
  }

  var _hashGet = hashGet

  /** Used for built-in method references. */
  var objectProto$4 = Object.prototype

  /** Used to check objects for own properties. */
  var hasOwnProperty$4 = objectProto$4.hasOwnProperty

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas(key) {
    var data = this.__data__
    return _nativeCreate
      ? data[key] !== undefined
      : hasOwnProperty$4.call(data, key)
  }

  var _hashHas = hashHas

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__'

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet(key, value) {
    var data = this.__data__
    this.size += this.has(key) ? 0 : 1
    data[key] = _nativeCreate && value === undefined ? HASH_UNDEFINED$1 : value
    return this
  }

  var _hashSet = hashSet

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash(entries) {
    var index = -1,
      length = entries == null ? 0 : entries.length

    this.clear()
    while (++index < length) {
      var entry = entries[index]
      this.set(entry[0], entry[1])
    }
  }

  // Add methods to `Hash`.
  Hash.prototype.clear = _hashClear
  Hash.prototype['delete'] = _hashDelete
  Hash.prototype.get = _hashGet
  Hash.prototype.has = _hashHas
  Hash.prototype.set = _hashSet

  var _Hash = Hash

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear() {
    this.size = 0
    this.__data__ = {
      hash: new _Hash(),
      map: new (_Map || _ListCache)(),
      string: new _Hash(),
    }
  }

  var _mapCacheClear = mapCacheClear

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value
    return type == 'string' ||
      type == 'number' ||
      type == 'symbol' ||
      type == 'boolean'
      ? value !== '__proto__'
      : value === null
  }

  var _isKeyable = isKeyable

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData(map, key) {
    var data = map.__data__
    return _isKeyable(key)
      ? data[typeof key == 'string' ? 'string' : 'hash']
      : data.map
  }

  var _getMapData = getMapData

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete(key) {
    var result = _getMapData(this, key)['delete'](key)
    this.size -= result ? 1 : 0
    return result
  }

  var _mapCacheDelete = mapCacheDelete

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet(key) {
    return _getMapData(this, key).get(key)
  }

  var _mapCacheGet = mapCacheGet

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas(key) {
    return _getMapData(this, key).has(key)
  }

  var _mapCacheHas = mapCacheHas

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet(key, value) {
    var data = _getMapData(this, key),
      size = data.size

    data.set(key, value)
    this.size += data.size == size ? 0 : 1
    return this
  }

  var _mapCacheSet = mapCacheSet

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache(entries) {
    var index = -1,
      length = entries == null ? 0 : entries.length

    this.clear()
    while (++index < length) {
      var entry = entries[index]
      this.set(entry[0], entry[1])
    }
  }

  // Add methods to `MapCache`.
  MapCache.prototype.clear = _mapCacheClear
  MapCache.prototype['delete'] = _mapCacheDelete
  MapCache.prototype.get = _mapCacheGet
  MapCache.prototype.has = _mapCacheHas
  MapCache.prototype.set = _mapCacheSet

  var _MapCache = MapCache

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200

  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */
  function stackSet(key, value) {
    var data = this.__data__
    if (data instanceof _ListCache) {
      var pairs = data.__data__
      if (!_Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value])
        this.size = ++data.size
        return this
      }
      data = this.__data__ = new _MapCache(pairs)
    }
    data.set(key, value)
    this.size = data.size
    return this
  }

  var _stackSet = stackSet

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack(entries) {
    var data = (this.__data__ = new _ListCache(entries))
    this.size = data.size
  }

  // Add methods to `Stack`.
  Stack.prototype.clear = _stackClear
  Stack.prototype['delete'] = _stackDelete
  Stack.prototype.get = _stackGet
  Stack.prototype.has = _stackHas
  Stack.prototype.set = _stackSet

  var _Stack = Stack

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$2 = '__lodash_hash_undefined__'

  /**
   * Adds `value` to the array cache.
   *
   * @private
   * @name add
   * @memberOf SetCache
   * @alias push
   * @param {*} value The value to cache.
   * @returns {Object} Returns the cache instance.
   */
  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED$2)
    return this
  }

  var _setCacheAdd = setCacheAdd

  /**
   * Checks if `value` is in the array cache.
   *
   * @private
   * @name has
   * @memberOf SetCache
   * @param {*} value The value to search for.
   * @returns {number} Returns `true` if `value` is found, else `false`.
   */
  function setCacheHas(value) {
    return this.__data__.has(value)
  }

  var _setCacheHas = setCacheHas

  /**
   *
   * Creates an array cache object to store unique values.
   *
   * @private
   * @constructor
   * @param {Array} [values] The values to cache.
   */
  function SetCache(values) {
    var index = -1,
      length = values == null ? 0 : values.length

    this.__data__ = new _MapCache()
    while (++index < length) {
      this.add(values[index])
    }
  }

  // Add methods to `SetCache`.
  SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd
  SetCache.prototype.has = _setCacheHas

  var _SetCache = SetCache

  /**
   * A specialized version of `_.some` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function arraySome(array, predicate) {
    var index = -1,
      length = array == null ? 0 : array.length

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true
      }
    }
    return false
  }

  var _arraySome = arraySome

  /**
   * Checks if a `cache` value for `key` exists.
   *
   * @private
   * @param {Object} cache The cache to query.
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function cacheHas(cache, key) {
    return cache.has(key)
  }

  var _cacheHas = cacheHas

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2

  /**
   * A specialized version of `baseIsEqualDeep` for arrays with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Array} array The array to compare.
   * @param {Array} other The other array to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `array` and `other` objects.
   * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
   */
  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length

    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false
    }
    // Assume cyclic values are equal.
    var stacked = stack.get(array)
    if (stacked && stack.get(other)) {
      return stacked == other
    }
    var index = -1,
      result = true,
      seen = bitmask & COMPARE_UNORDERED_FLAG ? new _SetCache() : undefined

    stack.set(array, other)
    stack.set(other, array)

    // Ignore non-index properties.
    while (++index < arrLength) {
      var arrValue = array[index],
        othValue = other[index]

      if (customizer) {
        var compared = isPartial
          ? customizer(othValue, arrValue, index, other, array, stack)
          : customizer(arrValue, othValue, index, array, other, stack)
      }
      if (compared !== undefined) {
        if (compared) {
          continue
        }
        result = false
        break
      }
      // Recursively compare arrays (susceptible to call stack limits).
      if (seen) {
        if (
          !_arraySome(other, function(othValue, othIndex) {
            if (
              !_cacheHas(seen, othIndex) &&
              (arrValue === othValue ||
                equalFunc(arrValue, othValue, bitmask, customizer, stack))
            ) {
              return seen.push(othIndex)
            }
          })
        ) {
          result = false
          break
        }
      } else if (
        !(
          arrValue === othValue ||
          equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )
      ) {
        result = false
        break
      }
    }
    stack['delete'](array)
    stack['delete'](other)
    return result
  }

  var _equalArrays = equalArrays

  /** Built-in value references. */
  var Uint8Array = _root.Uint8Array

  var _Uint8Array = Uint8Array

  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */
  function mapToArray(map) {
    var index = -1,
      result = Array(map.size)

    map.forEach(function(value, key) {
      result[++index] = [key, value]
    })
    return result
  }

  var _mapToArray = mapToArray

  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */
  function setToArray(set) {
    var index = -1,
      result = Array(set.size)

    set.forEach(function(value) {
      result[++index] = value
    })
    return result
  }

  var _setToArray = setToArray

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$1 = 1,
    COMPARE_UNORDERED_FLAG$1 = 2

  /** `Object#toString` result references. */
  var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag$1 = '[object Symbol]'

  var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]'

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined

  /**
   * A specialized version of `baseIsEqualDeep` for comparing objects of
   * the same `toStringTag`.
   *
   * **Note:** This function only supports comparing values with tags of
   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {string} tag The `toStringTag` of the objects to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalByTag(
    object,
    other,
    tag,
    bitmask,
    customizer,
    equalFunc,
    stack
  ) {
    switch (tag) {
      case dataViewTag:
        if (
          object.byteLength != other.byteLength ||
          object.byteOffset != other.byteOffset
        ) {
          return false
        }
        object = object.buffer
        other = other.buffer

      case arrayBufferTag:
        if (
          object.byteLength != other.byteLength ||
          !equalFunc(new _Uint8Array(object), new _Uint8Array(other))
        ) {
          return false
        }
        return true

      case boolTag:
      case dateTag:
      case numberTag:
        // Coerce booleans to `1` or `0` and dates to milliseconds.
        // Invalid dates are coerced to `NaN`.
        return eq_1(+object, +other)

      case errorTag:
        return object.name == other.name && object.message == other.message

      case regexpTag:
      case stringTag:
        // Coerce regexes to strings and treat strings, primitives and objects,
        // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
        // for more details.
        return object == other + ''

      case mapTag:
        var convert = _mapToArray

      case setTag:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1
        convert || (convert = _setToArray)

        if (object.size != other.size && !isPartial) {
          return false
        }
        // Assume cyclic values are equal.
        var stacked = stack.get(object)
        if (stacked) {
          return stacked == other
        }
        bitmask |= COMPARE_UNORDERED_FLAG$1

        // Recursively compare objects (susceptible to call stack limits).
        stack.set(object, other)
        var result = _equalArrays(
          convert(object),
          convert(other),
          bitmask,
          customizer,
          equalFunc,
          stack
        )
        stack['delete'](object)
        return result

      case symbolTag$1:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other)
        }
    }
    return false
  }

  var _equalByTag = equalByTag

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    var index = -1,
      length = values.length,
      offset = array.length

    while (++index < length) {
      array[offset + index] = values[index]
    }
    return array
  }

  var _arrayPush = arrayPush

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray

  var isArray_1 = isArray

  /**
   * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
   * `keysFunc` and `symbolsFunc` to get the enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @param {Function} symbolsFunc The function to get the symbols of `object`.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object)
    return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object))
  }

  var _baseGetAllKeys = baseGetAllKeys

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function arrayFilter(array, predicate) {
    var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = []

    while (++index < length) {
      var value = array[index]
      if (predicate(value, index, array)) {
        result[resIndex++] = value
      }
    }
    return result
  }

  var _arrayFilter = arrayFilter

  /**
   * This method returns a new empty array.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {Array} Returns the new empty array.
   * @example
   *
   * var arrays = _.times(2, _.stubArray);
   *
   * console.log(arrays);
   * // => [[], []]
   *
   * console.log(arrays[0] === arrays[1]);
   * // => false
   */
  function stubArray() {
    return []
  }

  var stubArray_1 = stubArray

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$5.propertyIsEnumerable

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeGetSymbols = Object.getOwnPropertySymbols

  /**
   * Creates an array of the own enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbols = !nativeGetSymbols
    ? stubArray_1
    : function(object) {
        if (object == null) {
          return []
        }
        object = Object(object)
        return _arrayFilter(nativeGetSymbols(object), function(symbol) {
          return propertyIsEnumerable.call(object, symbol)
        })
      }

  var _getSymbols = getSymbols

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
      result = Array(n)

    while (++index < n) {
      result[index] = iteratee(index)
    }
    return result
  }

  var _baseTimes = baseTimes

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]'

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments(value) {
    return isObjectLike_1(value) && _baseGetTag(value) == argsTag
  }

  var _baseIsArguments = baseIsArguments

  /** Used for built-in method references. */
  var objectProto$6 = Object.prototype

  /** Used to check objects for own properties. */
  var hasOwnProperty$5 = objectProto$6.hasOwnProperty

  /** Built-in value references. */
  var propertyIsEnumerable$1 = objectProto$6.propertyIsEnumerable

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments = _baseIsArguments(
    (function() {
      return arguments
    })()
  )
    ? _baseIsArguments
    : function(value) {
        return (
          isObjectLike_1(value) &&
          hasOwnProperty$5.call(value, 'callee') &&
          !propertyIsEnumerable$1.call(value, 'callee')
        )
      }

  var isArguments_1 = isArguments

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */
  function stubFalse() {
    return false
  }

  var stubFalse_1 = stubFalse

  var isBuffer_1 = createCommonjsModule(function(module, exports) {
    /** Detect free variable `exports`. */
    var freeExports = exports && !exports.nodeType && exports

    /** Detect free variable `module`. */
    var freeModule =
      freeExports &&
      'object' == 'object' &&
      module &&
      !module.nodeType &&
      module

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports

    /** Built-in value references. */
    var Buffer = moduleExports ? _root.Buffer : undefined

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined

    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */
    var isBuffer = nativeIsBuffer || stubFalse_1

    module.exports = isBuffer
  })

  /** `Object#toString` result references. */
  var argsTag$1 = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    errorTag$1 = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag$1 = '[object Map]',
    numberTag$1 = '[object Number]',
    objectTag = '[object Object]',
    regexpTag$1 = '[object RegExp]',
    setTag$1 = '[object Set]',
    stringTag$1 = '[object String]',
    weakMapTag = '[object WeakMap]'

  var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]'

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {}
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[
    int8Tag
  ] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[
    uint8Tag
  ] = typedArrayTags[uint8ClampedTag] = typedArrayTags[
    uint16Tag
  ] = typedArrayTags[uint32Tag] = true
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] = typedArrayTags[
    arrayBufferTag$1
  ] = typedArrayTags[boolTag$1] = typedArrayTags[
    dataViewTag$1
  ] = typedArrayTags[dateTag$1] = typedArrayTags[errorTag$1] = typedArrayTags[
    funcTag$1
  ] = typedArrayTags[mapTag$1] = typedArrayTags[numberTag$1] = typedArrayTags[
    objectTag
  ] = typedArrayTags[regexpTag$1] = typedArrayTags[setTag$1] = typedArrayTags[
    stringTag$1
  ] = typedArrayTags[weakMapTag] = false

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray(value) {
    return (
      isObjectLike_1(value) &&
      isLength_1(value.length) &&
      !!typedArrayTags[_baseGetTag(value)]
    )
  }

  var _baseIsTypedArray = baseIsTypedArray

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value)
    }
  }

  var _baseUnary = baseUnary

  var _nodeUtil = createCommonjsModule(function(module, exports) {
    /** Detect free variable `exports`. */
    var freeExports = exports && !exports.nodeType && exports

    /** Detect free variable `module`. */
    var freeModule =
      freeExports &&
      'object' == 'object' &&
      module &&
      !module.nodeType &&
      module

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports

    /** Detect free variable `process` from Node.js. */
    var freeProcess = moduleExports && _freeGlobal.process

    /** Used to access faster Node.js helpers. */
    var nodeUtil = (function() {
      try {
        // Use `util.types` for Node.js 10+.
        var types =
          freeModule && freeModule.require && freeModule.require('util').types

        if (types) {
          return types
        }

        // Legacy `process.binding('util')` for Node.js < 10.
        return freeProcess && freeProcess.binding && freeProcess.binding('util')
      } catch (e) {}
    })()

    module.exports = nodeUtil
  })

  /* Node.js helper references. */
  var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  var isTypedArray = nodeIsTypedArray
    ? _baseUnary(nodeIsTypedArray)
    : _baseIsTypedArray

  var isTypedArray_1 = isTypedArray

  /** Used for built-in method references. */
  var objectProto$7 = Object.prototype

  /** Used to check objects for own properties. */
  var hasOwnProperty$6 = objectProto$7.hasOwnProperty

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray_1(value),
      isArg = !isArr && isArguments_1(value),
      isBuff = !isArr && !isArg && isBuffer_1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? _baseTimes(value.length, String) : [],
      length = result.length

    for (var key in value) {
      if (
        (inherited || hasOwnProperty$6.call(value, key)) &&
        !(
          skipIndexes &&
          // Safari 9 has enumerable `arguments.length` in strict mode.
          (key == 'length' ||
            // Node.js 0.10 has enumerable non-index properties on buffers.
            (isBuff && (key == 'offset' || key == 'parent')) ||
            // PhantomJS 2 has enumerable non-index properties on typed arrays.
            (isType &&
              (key == 'buffer' ||
                key == 'byteLength' ||
                key == 'byteOffset')) ||
            // Skip index properties.
            _isIndex(key, length))
        )
      ) {
        result.push(key)
      }
    }
    return result
  }

  var _arrayLikeKeys = arrayLikeKeys

  /** Used for built-in method references. */
  var objectProto$8 = Object.prototype

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$8

    return value === proto
  }

  var _isPrototype = isPrototype

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg))
    }
  }

  var _overArg = overArg

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeKeys = _overArg(Object.keys, Object)

  var _nativeKeys = nativeKeys

  /** Used for built-in method references. */
  var objectProto$9 = Object.prototype

  /** Used to check objects for own properties. */
  var hasOwnProperty$7 = objectProto$9.hasOwnProperty

  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeys(object) {
    if (!_isPrototype(object)) {
      return _nativeKeys(object)
    }
    var result = []
    for (var key in Object(object)) {
      if (hasOwnProperty$7.call(object, key) && key != 'constructor') {
        result.push(key)
      }
    }
    return result
  }

  var _baseKeys = baseKeys

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  function keys(object) {
    return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object)
  }

  var keys_1 = keys

  /**
   * Creates an array of own enumerable property names and symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeys(object) {
    return _baseGetAllKeys(object, keys_1, _getSymbols)
  }

  var _getAllKeys = getAllKeys

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$2 = 1

  /** Used for built-in method references. */
  var objectProto$a = Object.prototype

  /** Used to check objects for own properties. */
  var hasOwnProperty$8 = objectProto$a.hasOwnProperty

  /**
   * A specialized version of `baseIsEqualDeep` for objects with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
      objProps = _getAllKeys(object),
      objLength = objProps.length,
      othProps = _getAllKeys(other),
      othLength = othProps.length

    if (objLength != othLength && !isPartial) {
      return false
    }
    var index = objLength
    while (index--) {
      var key = objProps[index]
      if (!(isPartial ? key in other : hasOwnProperty$8.call(other, key))) {
        return false
      }
    }
    // Assume cyclic values are equal.
    var stacked = stack.get(object)
    if (stacked && stack.get(other)) {
      return stacked == other
    }
    var result = true
    stack.set(object, other)
    stack.set(other, object)

    var skipCtor = isPartial
    while (++index < objLength) {
      key = objProps[index]
      var objValue = object[key],
        othValue = other[key]

      if (customizer) {
        var compared = isPartial
          ? customizer(othValue, objValue, key, other, object, stack)
          : customizer(objValue, othValue, key, object, other, stack)
      }
      // Recursively compare objects (susceptible to call stack limits).
      if (
        !(compared === undefined
          ? objValue === othValue ||
            equalFunc(objValue, othValue, bitmask, customizer, stack)
          : compared)
      ) {
        result = false
        break
      }
      skipCtor || (skipCtor = key == 'constructor')
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor,
        othCtor = other.constructor

      // Non `Object` object instances with different constructors are not equal.
      if (
        objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(
          typeof objCtor == 'function' &&
          objCtor instanceof objCtor &&
          typeof othCtor == 'function' &&
          othCtor instanceof othCtor
        )
      ) {
        result = false
      }
    }
    stack['delete'](object)
    stack['delete'](other)
    return result
  }

  var _equalObjects = equalObjects

  /* Built-in method references that are verified to be native. */
  var DataView = _getNative(_root, 'DataView')

  var _DataView = DataView

  /* Built-in method references that are verified to be native. */
  var Promise = _getNative(_root, 'Promise')

  var _Promise = Promise

  /* Built-in method references that are verified to be native. */
  var Set = _getNative(_root, 'Set')

  var _Set = Set

  /* Built-in method references that are verified to be native. */
  var WeakMap = _getNative(_root, 'WeakMap')

  var _WeakMap = WeakMap

  /** `Object#toString` result references. */
  var mapTag$2 = '[object Map]',
    objectTag$1 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$2 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]'

  var dataViewTag$2 = '[object DataView]'

  /** Used to detect maps, sets, and weakmaps. */
  var dataViewCtorString = _toSource(_DataView),
    mapCtorString = _toSource(_Map),
    promiseCtorString = _toSource(_Promise),
    setCtorString = _toSource(_Set),
    weakMapCtorString = _toSource(_WeakMap)

  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  var getTag = _baseGetTag

  // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
  if (
    (_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
    (_Map && getTag(new _Map()) != mapTag$2) ||
    (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
    (_Set && getTag(new _Set()) != setTag$2) ||
    (_WeakMap && getTag(new _WeakMap()) != weakMapTag$1)
  ) {
    getTag = function(value) {
      var result = _baseGetTag(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? _toSource(Ctor) : ''

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag$2
          case mapCtorString:
            return mapTag$2
          case promiseCtorString:
            return promiseTag
          case setCtorString:
            return setTag$2
          case weakMapCtorString:
            return weakMapTag$1
        }
      }
      return result
    }
  }

  var _getTag = getTag

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$3 = 1

  /** `Object#toString` result references. */
  var argsTag$2 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    objectTag$2 = '[object Object]'

  /** Used for built-in method references. */
  var objectProto$b = Object.prototype

  /** Used to check objects for own properties. */
  var hasOwnProperty$9 = objectProto$b.hasOwnProperty

  /**
   * A specialized version of `baseIsEqual` for arrays and objects which performs
   * deep comparisons and tracks traversed objects enabling objects with circular
   * references to be compared.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} [stack] Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function baseIsEqualDeep(
    object,
    other,
    bitmask,
    customizer,
    equalFunc,
    stack
  ) {
    var objIsArr = isArray_1(object),
      othIsArr = isArray_1(other),
      objTag = objIsArr ? arrayTag$1 : _getTag(object),
      othTag = othIsArr ? arrayTag$1 : _getTag(other)

    objTag = objTag == argsTag$2 ? objectTag$2 : objTag
    othTag = othTag == argsTag$2 ? objectTag$2 : othTag

    var objIsObj = objTag == objectTag$2,
      othIsObj = othTag == objectTag$2,
      isSameTag = objTag == othTag

    if (isSameTag && isBuffer_1(object)) {
      if (!isBuffer_1(other)) {
        return false
      }
      objIsArr = true
      objIsObj = false
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new _Stack())
      return objIsArr || isTypedArray_1(object)
        ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack)
        : _equalByTag(
            object,
            other,
            objTag,
            bitmask,
            customizer,
            equalFunc,
            stack
          )
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
      var objIsWrapped =
          objIsObj && hasOwnProperty$9.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty$9.call(other, '__wrapped__')

      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other

        stack || (stack = new _Stack())
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack)
      }
    }
    if (!isSameTag) {
      return false
    }
    stack || (stack = new _Stack())
    return _equalObjects(object, other, bitmask, customizer, equalFunc, stack)
  }

  var _baseIsEqualDeep = baseIsEqualDeep

  /**
   * The base implementation of `_.isEqual` which supports partial comparisons
   * and tracks traversed objects.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @param {boolean} bitmask The bitmask flags.
   *  1 - Unordered comparison
   *  2 - Partial comparison
   * @param {Function} [customizer] The function to customize comparisons.
   * @param {Object} [stack] Tracks traversed `value` and `other` objects.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   */
  function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true
    }
    if (
      value == null ||
      other == null ||
      (!isObjectLike_1(value) && !isObjectLike_1(other))
    ) {
      return value !== value && other !== other
    }
    return _baseIsEqualDeep(
      value,
      other,
      bitmask,
      customizer,
      baseIsEqual,
      stack
    )
  }

  var _baseIsEqual = baseIsEqual

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$4 = 1,
    COMPARE_UNORDERED_FLAG$2 = 2

  /**
   * The base implementation of `_.isMatch` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @param {Object} source The object of property values to match.
   * @param {Array} matchData The property names, values, and compare flags to match.
   * @param {Function} [customizer] The function to customize comparisons.
   * @returns {boolean} Returns `true` if `object` is a match, else `false`.
   */
  function baseIsMatch(object, source, matchData, customizer) {
    var index = matchData.length,
      length = index,
      noCustomizer = !customizer

    if (object == null) {
      return !length
    }
    object = Object(object)
    while (index--) {
      var data = matchData[index]
      if (
        noCustomizer && data[2]
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
      ) {
        return false
      }
    }
    while (++index < length) {
      data = matchData[index]
      var key = data[0],
        objValue = object[key],
        srcValue = data[1]

      if (noCustomizer && data[2]) {
        if (objValue === undefined && !(key in object)) {
          return false
        }
      } else {
        var stack = new _Stack()
        if (customizer) {
          var result = customizer(
            objValue,
            srcValue,
            key,
            object,
            source,
            stack
          )
        }
        if (
          !(result === undefined
            ? _baseIsEqual(
                srcValue,
                objValue,
                COMPARE_PARTIAL_FLAG$4 | COMPARE_UNORDERED_FLAG$2,
                customizer,
                stack
              )
            : result)
        ) {
          return false
        }
      }
    }
    return true
  }

  var _baseIsMatch = baseIsMatch

  /**
   * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` if suitable for strict
   *  equality comparisons, else `false`.
   */
  function isStrictComparable(value) {
    return value === value && !isObject_1(value)
  }

  var _isStrictComparable = isStrictComparable

  /**
   * Gets the property names, values, and compare flags of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the match data of `object`.
   */
  function getMatchData(object) {
    var result = keys_1(object),
      length = result.length

    while (length--) {
      var key = result[length],
        value = object[key]

      result[length] = [key, value, _isStrictComparable(value)]
    }
    return result
  }

  var _getMatchData = getMatchData

  /**
   * A specialized version of `matchesProperty` for source values suitable
   * for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */
  function matchesStrictComparable(key, srcValue) {
    return function(object) {
      if (object == null) {
        return false
      }
      return (
        object[key] === srcValue &&
        (srcValue !== undefined || key in Object(object))
      )
    }
  }

  var _matchesStrictComparable = matchesStrictComparable

  /**
   * The base implementation of `_.matches` which doesn't clone `source`.
   *
   * @private
   * @param {Object} source The object of property values to match.
   * @returns {Function} Returns the new spec function.
   */
  function baseMatches(source) {
    var matchData = _getMatchData(source)
    if (matchData.length == 1 && matchData[0][2]) {
      return _matchesStrictComparable(matchData[0][0], matchData[0][1])
    }
    return function(object) {
      return object === source || _baseIsMatch(object, source, matchData)
    }
  }

  var _baseMatches = baseMatches

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/

  /**
   * Checks if `value` is a property name and not a property path.
   *
   * @private
   * @param {*} value The value to check.
   * @param {Object} [object] The object to query keys on.
   * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
   */
  function isKey(value, object) {
    if (isArray_1(value)) {
      return false
    }
    var type = typeof value
    if (
      type == 'number' ||
      type == 'symbol' ||
      type == 'boolean' ||
      value == null ||
      isSymbol_1(value)
    ) {
      return true
    }
    return (
      reIsPlainProp.test(value) ||
      !reIsDeepProp.test(value) ||
      (object != null && value in Object(object))
    )
  }

  var _isKey = isKey

  /** Error message constants. */
  var FUNC_ERROR_TEXT = 'Expected a function'

  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided, it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is used as the map cache key. The `func`
   * is invoked with the `this` binding of the memoized function.
   *
   * **Note:** The cache is exposed as the `cache` property on the memoized
   * function. Its creation may be customized by replacing the `_.memoize.Cache`
   * constructor with one whose instances implement the
   * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
   * method interface of `clear`, `delete`, `get`, `has`, and `set`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoized function.
   * @example
   *
   * var object = { 'a': 1, 'b': 2 };
   * var other = { 'c': 3, 'd': 4 };
   *
   * var values = _.memoize(_.values);
   * values(object);
   * // => [1, 2]
   *
   * values(other);
   * // => [3, 4]
   *
   * object.a = 2;
   * values(object);
   * // => [1, 2]
   *
   * // Modify the result cache.
   * values.cache.set(object, ['a', 'b']);
   * values(object);
   * // => ['a', 'b']
   *
   * // Replace `_.memoize.Cache`.
   * _.memoize.Cache = WeakMap;
   */
  function memoize(func, resolver) {
    if (
      typeof func != 'function' ||
      (resolver != null && typeof resolver != 'function')
    ) {
      throw new TypeError(FUNC_ERROR_TEXT)
    }
    var memoized = function() {
      var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache

      if (cache.has(key)) {
        return cache.get(key)
      }
      var result = func.apply(this, args)
      memoized.cache = cache.set(key, result) || cache
      return result
    }
    memoized.cache = new (memoize.Cache || _MapCache)()
    return memoized
  }

  // Expose `MapCache`.
  memoize.Cache = _MapCache

  var memoize_1 = memoize

  /** Used as the maximum memoize cache size. */
  var MAX_MEMOIZE_SIZE = 500

  /**
   * A specialized version of `_.memoize` which clears the memoized function's
   * cache when it exceeds `MAX_MEMOIZE_SIZE`.
   *
   * @private
   * @param {Function} func The function to have its output memoized.
   * @returns {Function} Returns the new memoized function.
   */
  function memoizeCapped(func) {
    var result = memoize_1(func, function(key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear()
      }
      return key
    })

    var cache = result.cache
    return result
  }

  var _memoizeCapped = memoizeCapped

  /** Used to match property names within property paths. */
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g

  /**
   * Converts `string` to a property path array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the property path array.
   */
  var stringToPath = _memoizeCapped(function(string) {
    var result = []
    if (string.charCodeAt(0) === 46 /* . */) {
      result.push('')
    }
    string.replace(rePropName, function(match, number, quote, subString) {
      result.push(
        quote ? subString.replace(reEscapeChar, '$1') : number || match
      )
    })
    return result
  })

  var _stringToPath = stringToPath

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length)

    while (++index < length) {
      result[index] = iteratee(array[index], index, array)
    }
    return result
  }

  var _arrayMap = arrayMap

  /** Used as references for various `Number` constants. */
  var INFINITY$1 = 1 / 0

  /** Used to convert symbols to primitives and strings. */
  var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined

  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value
    }
    if (isArray_1(value)) {
      // Recursively convert values (susceptible to call stack limits).
      return _arrayMap(value, baseToString) + ''
    }
    if (isSymbol_1(value)) {
      return symbolToString ? symbolToString.call(value) : ''
    }
    var result = value + ''
    return result == '0' && 1 / value == -INFINITY$1 ? '-0' : result
  }

  var _baseToString = baseToString

  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */
  function toString(value) {
    return value == null ? '' : _baseToString(value)
  }

  var toString_1 = toString

  /**
   * Casts `value` to a path array if it's not one.
   *
   * @private
   * @param {*} value The value to inspect.
   * @param {Object} [object] The object to query keys on.
   * @returns {Array} Returns the cast property path array.
   */
  function castPath(value, object) {
    if (isArray_1(value)) {
      return value
    }
    return _isKey(value, object) ? [value] : _stringToPath(toString_1(value))
  }

  var _castPath = castPath

  /** Used as references for various `Number` constants. */
  var INFINITY$2 = 1 / 0

  /**
   * Converts `value` to a string key if it's not a string or symbol.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {string|symbol} Returns the key.
   */
  function toKey(value) {
    if (typeof value == 'string' || isSymbol_1(value)) {
      return value
    }
    var result = value + ''
    return result == '0' && 1 / value == -INFINITY$2 ? '-0' : result
  }

  var _toKey = toKey

  /**
   * The base implementation of `_.get` without support for default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @returns {*} Returns the resolved value.
   */
  function baseGet(object, path) {
    path = _castPath(path, object)

    var index = 0,
      length = path.length

    while (object != null && index < length) {
      object = object[_toKey(path[index++])]
    }
    return index && index == length ? object : undefined
  }

  var _baseGet = baseGet

  /**
   * Gets the value at `path` of `object`. If the resolved value is
   * `undefined`, the `defaultValue` is returned in its place.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @param {*} [defaultValue] The value returned for `undefined` resolved values.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.get(object, 'a[0].b.c');
   * // => 3
   *
   * _.get(object, ['a', '0', 'b', 'c']);
   * // => 3
   *
   * _.get(object, 'a.b.c', 'default');
   * // => 'default'
   */
  function get(object, path, defaultValue) {
    var result = object == null ? undefined : _baseGet(object, path)
    return result === undefined ? defaultValue : result
  }

  var get_1 = get

  /**
   * The base implementation of `_.hasIn` without support for deep paths.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {Array|string} key The key to check.
   * @returns {boolean} Returns `true` if `key` exists, else `false`.
   */
  function baseHasIn(object, key) {
    return object != null && key in Object(object)
  }

  var _baseHasIn = baseHasIn

  /**
   * Checks if `path` exists on `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @param {Function} hasFunc The function to check properties.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   */
  function hasPath(object, path, hasFunc) {
    path = _castPath(path, object)

    var index = -1,
      length = path.length,
      result = false

    while (++index < length) {
      var key = _toKey(path[index])
      if (!(result = object != null && hasFunc(object, key))) {
        break
      }
      object = object[key]
    }
    if (result || ++index != length) {
      return result
    }
    length = object == null ? 0 : object.length
    return (
      !!length &&
      isLength_1(length) &&
      _isIndex(key, length) &&
      (isArray_1(object) || isArguments_1(object))
    )
  }

  var _hasPath = hasPath

  /**
   * Checks if `path` is a direct or inherited property of `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   * @example
   *
   * var object = _.create({ 'a': _.create({ 'b': 2 }) });
   *
   * _.hasIn(object, 'a');
   * // => true
   *
   * _.hasIn(object, 'a.b');
   * // => true
   *
   * _.hasIn(object, ['a', 'b']);
   * // => true
   *
   * _.hasIn(object, 'b');
   * // => false
   */
  function hasIn(object, path) {
    return object != null && _hasPath(object, path, _baseHasIn)
  }

  var hasIn_1 = hasIn

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$5 = 1,
    COMPARE_UNORDERED_FLAG$3 = 2

  /**
   * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
   *
   * @private
   * @param {string} path The path of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */
  function baseMatchesProperty(path, srcValue) {
    if (_isKey(path) && _isStrictComparable(srcValue)) {
      return _matchesStrictComparable(_toKey(path), srcValue)
    }
    return function(object) {
      var objValue = get_1(object, path)
      return objValue === undefined && objValue === srcValue
        ? hasIn_1(object, path)
        : _baseIsEqual(
            srcValue,
            objValue,
            COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3
          )
    }
  }

  var _baseMatchesProperty = baseMatchesProperty

  /**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */
  function identity(value) {
    return value
  }

  var identity_1 = identity

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function baseProperty(key) {
    return function(object) {
      return object == null ? undefined : object[key]
    }
  }

  var _baseProperty = baseProperty

  /**
   * A specialized version of `baseProperty` which supports deep paths.
   *
   * @private
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function basePropertyDeep(path) {
    return function(object) {
      return _baseGet(object, path)
    }
  }

  var _basePropertyDeep = basePropertyDeep

  /**
   * Creates a function that returns the value at `path` of a given object.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   * @example
   *
   * var objects = [
   *   { 'a': { 'b': 2 } },
   *   { 'a': { 'b': 1 } }
   * ];
   *
   * _.map(objects, _.property('a.b'));
   * // => [2, 1]
   *
   * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
   * // => [1, 2]
   */
  function property(path) {
    return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path)
  }

  var property_1 = property

  /**
   * The base implementation of `_.iteratee`.
   *
   * @private
   * @param {*} [value=_.identity] The value to convert to an iteratee.
   * @returns {Function} Returns the iteratee.
   */
  function baseIteratee(value) {
    // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
    // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
    if (typeof value == 'function') {
      return value
    }
    if (value == null) {
      return identity_1
    }
    if (typeof value == 'object') {
      return isArray_1(value)
        ? _baseMatchesProperty(value[0], value[1])
        : _baseMatches(value)
    }
    return property_1(value)
  }

  var _baseIteratee = baseIteratee

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax$1 = Math.max

  /**
   * This method is like `_.find` except that it returns the index of the first
   * element `predicate` returns truthy for instead of the element itself.
   *
   * @static
   * @memberOf _
   * @since 1.1.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {number} Returns the index of the found element, else `-1`.
   * @example
   *
   * var users = [
   *   { 'user': 'barney',  'active': false },
   *   { 'user': 'fred',    'active': false },
   *   { 'user': 'pebbles', 'active': true }
   * ];
   *
   * _.findIndex(users, function(o) { return o.user == 'barney'; });
   * // => 0
   *
   * // The `_.matches` iteratee shorthand.
   * _.findIndex(users, { 'user': 'fred', 'active': false });
   * // => 1
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.findIndex(users, ['active', false]);
   * // => 0
   *
   * // The `_.property` iteratee shorthand.
   * _.findIndex(users, 'active');
   * // => 2
   */
  function findIndex(array, predicate, fromIndex) {
    var length = array == null ? 0 : array.length
    if (!length) {
      return -1
    }
    var index = fromIndex == null ? 0 : toInteger_1(fromIndex)
    if (index < 0) {
      index = nativeMax$1(length + index, 0)
    }
    return _baseFindIndex(array, _baseIteratee(predicate, 3), index)
  }

  var findIndex_1 = findIndex

  function endOfRange(dateRange, unit) {
    if (unit === void 0) {
      unit = 'day'
    }

    return {
      first: dateRange[0],
      last: dates.add(dateRange[dateRange.length - 1], 1, unit),
    }
  }
  function eventSegments(event, range, accessors) {
    var _endOfRange = endOfRange(range),
      first = _endOfRange.first,
      last = _endOfRange.last

    var slots = dates.diff(first, last, 'day')
    var start = dates.max(dates.startOf(accessors.start(event), 'day'), first)
    var end = dates.min(dates.ceil(accessors.end(event), 'day'), last)
    var padding = findIndex_1(range, function(x) {
      return dates.eq(x, start, 'day')
    })
    var span = dates.diff(start, end, 'day')
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
    var eStart = dates.startOf(accessors.start(e), 'day')
    var eEnd = accessors.end(e)
    var startsBeforeEnd = dates.lte(eStart, end, 'day') // when the event is zero duration we need to handle a bit differently

    var endsAfterStart = !dates.eq(eStart, eEnd, 'minutes')
      ? dates.gt(eEnd, start, 'minutes')
      : dates.gte(eEnd, start, 'minutes')
    return startsBeforeEnd && endsAfterStart
  }
  function segsOverlap(seg, otherSegs) {
    return otherSegs.some(function(otherSeg) {
      return otherSeg.left <= seg.right && otherSeg.right >= seg.left
    })
  }
  function sortEvents(evtA, evtB, accessors) {
    var startSort =
      +dates.startOf(accessors.start(evtA), 'day') -
      +dates.startOf(accessors.start(evtB), 'day')
    var durA = dates.diff(
      accessors.start(evtA),
      dates.ceil(accessors.end(evtA), 'day'),
      'day'
    )
    var durB = dates.diff(
      accessors.start(evtB),
      dates.ceil(accessors.end(evtB), 'day'),
      'day'
    )
    return (
      startSort || // sort by start Day first
      Math.max(durB, 1) - Math.max(durA, 1) || // events spanning multiple days go first
      !!accessors.allDay(evtB) - !!accessors.allDay(evtA) || // then allDay single day events
      +accessors.start(evtA) - +accessors.start(evtB)
    ) // then sort by start time
  }

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeCeil$1 = Math.ceil,
    nativeMax$2 = Math.max

  /**
   * The base implementation of `_.range` and `_.rangeRight` which doesn't
   * coerce arguments.
   *
   * @private
   * @param {number} start The start of the range.
   * @param {number} end The end of the range.
   * @param {number} step The value to increment or decrement by.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Array} Returns the range of numbers.
   */
  function baseRange(start, end, step, fromRight) {
    var index = -1,
      length = nativeMax$2(nativeCeil$1((end - start) / (step || 1)), 0),
      result = Array(length)

    while (length--) {
      result[fromRight ? length : ++index] = start
      start += step
    }
    return result
  }

  var _baseRange = baseRange

  /**
   * Creates a `_.range` or `_.rangeRight` function.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new range function.
   */
  function createRange(fromRight) {
    return function(start, end, step) {
      if (
        step &&
        typeof step != 'number' &&
        _isIterateeCall(start, end, step)
      ) {
        end = step = undefined
      }
      // Ensure the sign of `-0` is preserved.
      start = toFinite_1(start)
      if (end === undefined) {
        end = start
        start = 0
      } else {
        end = toFinite_1(end)
      }
      step = step === undefined ? (start < end ? 1 : -1) : toFinite_1(step)
      return _baseRange(start, end, step, fromRight)
    }
  }

  var _createRange = createRange

  /**
   * Creates an array of numbers (positive and/or negative) progressing from
   * `start` up to, but not including, `end`. A step of `-1` is used if a negative
   * `start` is specified without an `end` or `step`. If `end` is not specified,
   * it's set to `start` with `start` then set to `0`.
   *
   * **Note:** JavaScript follows the IEEE-754 standard for resolving
   * floating-point values which can produce unexpected results.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {number} [start=0] The start of the range.
   * @param {number} end The end of the range.
   * @param {number} [step=1] The value to increment or decrement by.
   * @returns {Array} Returns the range of numbers.
   * @see _.inRange, _.rangeRight
   * @example
   *
   * _.range(4);
   * // => [0, 1, 2, 3]
   *
   * _.range(-4);
   * // => [0, -1, -2, -3]
   *
   * _.range(1, 5);
   * // => [1, 2, 3, 4]
   *
   * _.range(0, 20, 5);
   * // => [0, 5, 10, 15]
   *
   * _.range(0, -4, -1);
   * // => [0, -1, -2, -3]
   *
   * _.range(1, 4, 0);
   * // => [1, 1, 1]
   *
   * _.range(0);
   * // => []
   */
  var range = _createRange()

  var range_1 = range

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
      _inheritsLoose(EventEndingRow, _React$Component)

      function EventEndingRow() {
        return _React$Component.apply(this, arguments) || this
      }

      var _proto = EventEndingRow.prototype

      _proto.render = function render() {
        var _this$props = this.props,
          segments = _this$props.segments,
          slots = _this$props.slotMetrics.slots
        var rowSegments = eventLevels(segments).levels[0]
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
            var content = EventRowMixin.renderEvent(this.props, event)

            if (gap) {
              row.push(EventRowMixin.renderSpan(slots, gap, key + '_gap'))
            }

            row.push(EventRowMixin.renderSpan(slots, span, key, content))
            lastEnd = current = right + 1
          } else {
            if (gap) {
              row.push(EventRowMixin.renderSpan(slots, gap, key + '_gap'))
            }

            row.push(
              EventRowMixin.renderSpan(
                slots,
                1,
                key,
                this.renderShowMore(segments, current)
              )
            )
            lastEnd = current = current + 1
          }
        }

        return React__default.createElement(
          'div',
          {
            className: 'rbc-row',
          },
          row
        )
      }

      _proto.canRenderSlotEvent = function canRenderSlotEvent(slot, span) {
        var segments = this.props.segments
        return range_1(slot, slot + span).every(function(s) {
          var count = eventsInSlot(segments, s)
          return count === 1
        })
      }

      _proto.renderShowMore = function renderShowMore(segments, slot) {
        var _this = this

        var localizer = this.props.localizer
        var count = eventsInSlot(segments, slot)
        return count
          ? React__default.createElement(
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
        this.props.onShowMore(slot)
      }

      return EventEndingRow
    })(React__default.Component)

  EventEndingRow.propTypes = _extends(
    {
      segments: propTypes.array,
      slots: propTypes.number,
      onShowMore: propTypes.func,
    },
    EventRowMixin.propTypes
  )
  EventEndingRow.defaultProps = _extends({}, EventRowMixin.defaultProps)

  var simpleIsEqual = function simpleIsEqual(a, b) {
    return a === b
  }

  function index$2(resultFn, isEqual) {
    if (isEqual === void 0) {
      isEqual = simpleIsEqual
    }

    var lastThis
    var lastArgs = []
    var lastResult
    var calledOnce = false

    var isNewArgEqualToLast = function isNewArgEqualToLast(newArg, index) {
      return isEqual(newArg, lastArgs[index])
    }

    var result = function result() {
      for (
        var _len = arguments.length, newArgs = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        newArgs[_key] = arguments[_key]
      }

      if (
        calledOnce &&
        lastThis === this &&
        newArgs.length === lastArgs.length &&
        newArgs.every(isNewArgEqualToLast)
      ) {
        return lastResult
      }

      lastResult = resultFn.apply(this, newArgs)
      calledOnce = true
      lastThis = this
      lastArgs = newArgs
      return lastResult
    }

    return result
  }

  var isSegmentInSlot$1 = function isSegmentInSlot(seg, slot) {
    return seg.left <= slot && seg.right >= slot
  }

  var isEqual = function isEqual(a, b) {
    return a.range === b.range && a.events === b.events
  }

  function getSlotMetrics() {
    return index$2(function(options) {
      var range = options.range,
        events = options.events,
        maxRows = options.maxRows,
        minRows = options.minRows,
        accessors = options.accessors

      var _endOfRange = endOfRange(range),
        first = _endOfRange.first,
        last = _endOfRange.last

      var segments = events.map(function(evt) {
        return eventSegments(evt, range, accessors)
      })

      var _eventLevels = eventLevels(segments, Math.max(maxRows - 1, 1)),
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
          return metrics(_extends({}, options, args))
        },
        getDateForSlot: function getDateForSlot(slotNumber) {
          return range[slotNumber]
        },
        getSlotForDate: function getSlotForDate(date) {
          return range.find(function(r) {
            return dates.eq(r, date, 'day')
          })
        },
        getEventsForSlot: function getEventsForSlot(slot) {
          return segments
            .filter(function(seg) {
              return isSegmentInSlot$1(seg, slot)
            })
            .map(function(seg) {
              return seg.event
            })
        },
        continuesPrior: function continuesPrior(event) {
          return dates.lt(accessors.start(event), first, 'day')
        },
        continuesAfter: function continuesAfter(event) {
          var eventEnd = accessors.end(event)
          var singleDayDuration = dates.eq(
            accessors.start(event),
            eventEnd,
            'minutes'
          )
          return singleDayDuration
            ? dates.gte(eventEnd, last, 'minutes')
            : dates.gt(eventEnd, last, 'minutes')
        },
      }
    }, isEqual)
  }

  var DateContentRow =
    /*#__PURE__*/
    (function(_React$Component) {
      _inheritsLoose(DateContentRow, _React$Component)

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
          _React$Component.call.apply(_React$Component, [this].concat(args)) ||
          this

        _this.handleSelectSlot = function(slot) {
          var _this$props = _this.props,
            range = _this$props.range,
            onSelectSlot = _this$props.onSelectSlot
          onSelectSlot(range.slice(slot.start, slot.end + 1), slot)
        }

        _this.handleShowMore = function(slot) {
          var _this$props2 = _this.props,
            range = _this$props2.range,
            onShowMore = _this$props2.onShowMore

          var metrics = _this.slotMetrics(_this.props)

          var row = qsa(
            reactDom.findDOMNode(
              _assertThisInitialized(_assertThisInitialized(_this))
            ),
            '.rbc-row-bg'
          )[0]
          var cell
          if (row) cell = row.children[slot - 1]
          var events = metrics.getEventsForSlot(slot)
          onShowMore(events, range[slot - 1], cell, slot)
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
            : reactDom.findDOMNode(
                _assertThisInitialized(_assertThisInitialized(_this))
              )
        }

        _this.renderHeadingCell = function(date, index) {
          var _this$props3 = _this.props,
            renderHeader = _this$props3.renderHeader,
            getNow = _this$props3.getNow
          return renderHeader({
            date: date,
            key: 'header_' + index,
            className: classnames(
              'rbc-date-cell',
              dates.eq(date, getNow(), 'day') && 'rbc-now'
            ),
          })
        }

        _this.renderDummy = function() {
          var _this$props4 = _this.props,
            className = _this$props4.className,
            range = _this$props4.range,
            renderHeader = _this$props4.renderHeader
          return React__default.createElement(
            'div',
            {
              className: className,
            },
            React__default.createElement(
              'div',
              {
                className: 'rbc-row-content',
              },
              renderHeader &&
                React__default.createElement(
                  'div',
                  {
                    className: 'rbc-row',
                    ref: _this.createHeadingRef,
                  },
                  range.map(_this.renderHeadingCell)
                ),
              React__default.createElement(
                'div',
                {
                  className: 'rbc-row',
                  ref: _this.createEventRef,
                },
                React__default.createElement(
                  'div',
                  {
                    className: 'rbc-row-segment',
                  },
                  React__default.createElement(
                    'div',
                    {
                      className: 'rbc-event',
                    },
                    React__default.createElement(
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

        _this.slotMetrics = getSlotMetrics()
        return _this
      }

      var _proto = DateContentRow.prototype

      _proto.getRowLimit = function getRowLimit() {
        var eventHeight = getHeight(this.eventRow)
        var headingHeight = this.headingRow ? getHeight(this.headingRow) : 0
        var eventSpace = getHeight(reactDom.findDOMNode(this)) - headingHeight
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
        return React__default.createElement(
          'div',
          {
            className: className,
          },
          React__default.createElement(BackgroundCells, {
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
          React__default.createElement(
            'div',
            {
              className: 'rbc-row-content',
            },
            renderHeader &&
              React__default.createElement(
                'div',
                {
                  className: 'rbc-row ',
                  ref: this.createHeadingRef,
                },
                range.map(this.renderHeadingCell)
              ),
            React__default.createElement(
              WeekWrapper,
              _extends(
                {
                  isAllDay: isAllDay,
                },
                eventRowProps
              ),
              levels.map(function(segs, idx) {
                return React__default.createElement(
                  EventRow,
                  _extends(
                    {
                      key: idx,
                      segments: segs,
                    },
                    eventRowProps
                  )
                )
              }),
              !!extra.length &&
                React__default.createElement(
                  EventEndingRow,
                  _extends(
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
    })(React__default.Component)

  DateContentRow.propTypes = {
    date: propTypes.instanceOf(Date),
    events: propTypes.array.isRequired,
    range: propTypes.array.isRequired,
    rtl: propTypes.bool,
    resourceId: propTypes.any,
    renderForMeasure: propTypes.bool,
    renderHeader: propTypes.func,
    container: propTypes.func,
    selected: propTypes.object,
    selectable: propTypes.oneOf([true, false, 'ignoreEvents']),
    longPressThreshold: propTypes.number,
    onShowMore: propTypes.func,
    onSelectSlot: propTypes.func,
    onSelect: propTypes.func,
    onSelectEnd: propTypes.func,
    onSelectStart: propTypes.func,
    onDoubleClick: propTypes.func,
    dayPropGetter: propTypes.func,
    getNow: propTypes.func.isRequired,
    isAllDay: propTypes.bool,
    accessors: propTypes.object.isRequired,
    components: propTypes.object.isRequired,
    getters: propTypes.object.isRequired,
    localizer: propTypes.object.isRequired,
    minRows: propTypes.number.isRequired,
    maxRows: propTypes.number.isRequired,
  }
  DateContentRow.defaultProps = {
    minRows: 0,
    maxRows: Infinity,
  }

  var Header = function Header(_ref) {
    var label = _ref.label
    return React__default.createElement('span', null, label)
  }

  Header.propTypes = {
    label: propTypes.node,
  }

  var DateHeader = function DateHeader(_ref) {
    var label = _ref.label,
      drilldownView = _ref.drilldownView,
      onDrillDown = _ref.onDrillDown

    if (!drilldownView) {
      return React__default.createElement('span', null, label)
    }

    return React__default.createElement(
      'a',
      {
        href: '#',
        onClick: onDrillDown,
      },
      label
    )
  }

  DateHeader.propTypes = {
    label: propTypes.node,
    date: propTypes.instanceOf(Date),
    drilldownView: propTypes.string,
    onDrillDown: propTypes.func,
    isOffRange: propTypes.bool,
  }

  var eventsForWeek = function eventsForWeek(evts, start, end, accessors) {
    return evts.filter(function(e) {
      return inRange(e, start, end, accessors)
    })
  }

  var MonthView =
    /*#__PURE__*/
    (function(_React$Component) {
      _inheritsLoose(MonthView, _React$Component)

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
          _React$Component.call.apply(_React$Component, [this].concat(_args)) ||
          this

        _this.getContainer = function() {
          return reactDom.findDOMNode(
            _assertThisInitialized(_assertThisInitialized(_this))
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
            return sortEvents(a, b, accessors)
          })
          return React__default.createElement(DateContentRow, {
            key: weekIdx,
            ref: weekIdx === 0 ? 'slotRow' : undefined,
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
            props = _objectWithoutPropertiesLoose(_ref, ['date', 'className'])

          var _this$props2 = _this.props,
            currentDate = _this$props2.date,
            getDrilldownView = _this$props2.getDrilldownView,
            localizer = _this$props2.localizer
          var isOffRange = dates.month(date) !== dates.month(currentDate)
          var isCurrent = dates.eq(date, currentDate, 'day')
          var drilldownView = getDrilldownView(date)
          var label = localizer.format(date, 'dateFormat')
          var DateHeaderComponent =
            _this.props.components.dateHeader || DateHeader
          return React__default.createElement(
            'div',
            _extends({}, props, {
              className: classnames(
                className,
                isOffRange && 'rbc-off-range',
                isCurrent && 'rbc-current'
              ),
            }),
            React__default.createElement(DateHeaderComponent, {
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

          notify(_this.props.onDrillDown, [date, view])
        }

        _this.handleSelectEvent = function() {
          _this.clearSelection()

          for (
            var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
            _key2 < _len2;
            _key2++
          ) {
            args[_key2] = arguments[_key2]
          }

          notify(_this.props.onSelectEvent, args)
        }

        _this.handleDoubleClickEvent = function() {
          _this.clearSelection()

          for (
            var _len3 = arguments.length, args = new Array(_len3), _key3 = 0;
            _key3 < _len3;
            _key3++
          ) {
            args[_key3] = arguments[_key3]
          }

          notify(_this.props.onDoubleClickEvent, args)
        }

        _this.handleShowMore = function(events, date, cell, slot) {
          var _this$props3 = _this.props,
            popup = _this$props3.popup,
            onDrillDown = _this$props3.onDrillDown,
            onShowMore = _this$props3.onShowMore,
            getDrilldownView = _this$props3.getDrilldownView //cancel any pending selections so only the event click goes through.

          _this.clearSelection()

          if (popup) {
            var position = getPosition(
              cell,
              reactDom.findDOMNode(
                _assertThisInitialized(_assertThisInitialized(_this))
              )
            )

            _this.setState({
              overlay: {
                date: date,
                events: events,
                position: position,
              },
            })
          } else {
            notify(onDrillDown, [date, getDrilldownView(date) || views.DAY])
          }

          notify(onShowMore, [events, date, slot])
        }

        _this._bgRows = []
        _this._pendingSelection = []
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
          needLimitMeasure: !dates.eq(date, this.props.date, 'month'),
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
              raf(function() {
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
          month = dates.visibleDays(date, localizer),
          weeks = chunk_1(month, 7)
        this._weekCount = weeks.length
        return React__default.createElement(
          'div',
          {
            className: classnames('rbc-month-view', className),
          },
          React__default.createElement(
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
        var HeaderComponent = components.header || Header
        return dates.range(first, last, 'day').map(function(day, idx) {
          return React__default.createElement(
            'div',
            {
              key: 'header_' + idx,
              className: 'rbc-header',
            },
            React__default.createElement(HeaderComponent, {
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
        return React__default.createElement(
          Overlay,
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
          },
          React__default.createElement(Popup, {
            accessors: accessors,
            getters: getters,
            selected: selected,
            components: components,
            localizer: localizer,
            position: overlay.position,
            events: overlay.events,
            slotStart: overlay.date,
            slotEnd: overlay.end,
            onSelect: this.handleSelectEvent,
            onDoubleClick: this.handleDoubleClickEvent,
          })
        )
      }

      _proto.measureRowLimit = function measureRowLimit() {
        this.setState({
          needLimitMeasure: false,
          rowLimit: this.refs.slotRow.getRowLimit(),
        })
      }

      _proto.selectDates = function selectDates(slotInfo) {
        var slots = this._pendingSelection.slice()

        this._pendingSelection = []
        slots.sort(function(a, b) {
          return +a - +b
        })
        notify(this.props.onSelectSlot, {
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
    })(React__default.Component)

  MonthView.propTypes = {
    events: propTypes.array.isRequired,
    date: propTypes.instanceOf(Date),
    min: propTypes.instanceOf(Date),
    max: propTypes.instanceOf(Date),
    step: propTypes.number,
    getNow: propTypes.func.isRequired,
    scrollToTime: propTypes.instanceOf(Date),
    rtl: propTypes.bool,
    width: propTypes.number,
    accessors: propTypes.object.isRequired,
    components: propTypes.object.isRequired,
    getters: propTypes.object.isRequired,
    localizer: propTypes.object.isRequired,
    selected: propTypes.object,
    selectable: propTypes.oneOf([true, false, 'ignoreEvents']),
    longPressThreshold: propTypes.number,
    onNavigate: propTypes.func,
    onSelectSlot: propTypes.func,
    onSelectEvent: propTypes.func,
    onDoubleClickEvent: propTypes.func,
    onShowMore: propTypes.func,
    onDrillDown: propTypes.func,
    getDrilldownView: propTypes.func.isRequired,
    popup: propTypes.bool,
    popupOffset: propTypes.oneOfType([
      propTypes.number,
      propTypes.shape({
        x: propTypes.number,
        y: propTypes.number,
      }),
    ]),
  }

  MonthView.range = function(date, _ref3) {
    var localizer = _ref3.localizer
    var start = dates.firstVisibleDay(date, localizer)
    var end = dates.lastVisibleDay(date, localizer)
    return {
      start: start,
      end: end,
    }
  }

  MonthView.navigate = function(date, action) {
    switch (action) {
      case navigate.PREVIOUS:
        return dates.add(date, -1, 'month')

      case navigate.NEXT:
        return dates.add(date, 1, 'month')

      default:
        return date
    }
  }

  MonthView.title = function(date, _ref4) {
    var localizer = _ref4.localizer
    return localizer.format(date, 'monthHeaderFormat')
  }

  var getDstOffset = function getDstOffset(start, end) {
    return start.getTimezoneOffset() - end.getTimezoneOffset()
  }

  var getKey = function getKey(min, max, step, slots) {
    return (
      '' +
      +dates.startOf(min, 'minutes') +
      ('' + +dates.startOf(max, 'minutes')) +
      (step + '-' + slots)
    )
  }

  function getSlotMetrics$1(_ref) {
    var start = _ref.min,
      end = _ref.max,
      step = _ref.step,
      timeslots = _ref.timeslots
    var key = getKey(start, end, step, timeslots)
    var totalMin =
      1 + dates.diff(start, end, 'minutes') + getDstOffset(start, end)
    var minutesFromMidnight = dates.diff(
      dates.startOf(start, 'day'),
      start,
      'minutes'
    )
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
      var diff = dates.diff(start, date, 'minutes') + getDstOffset(start, date)
      return Math.min(diff, totalMin)
    }

    return {
      groups: groups,
      update: function update(args) {
        if (getKey(args) !== key) return getSlotMetrics$1(args)
        return this
      },
      dateIsInGroup: function dateIsInGroup(date, groupIndex) {
        var nextGroup = groups[groupIndex + 1]
        return dates.inRange(
          date,
          groups[groupIndex][0],
          nextGroup ? nextGroup[0] : end,
          'minutes'
        )
      },
      nextSlot: function nextSlot(slot) {
        var next = slots[Math.min(slots.indexOf(slot) + 1, slots.length - 1)] // in the case of the last slot we won't a long enough range so manually get it

        if (next === slot) next = dates.add(slot, step, 'minutes')
        return next
      },
      closestSlotToPosition: function closestSlotToPosition(percent) {
        var slot = Math.min(
          slots.length - 1,
          Math.max(0, Math.floor(percent * numSlots))
        )
        return slots[slot]
      },
      closestSlotFromPoint: function closestSlotFromPoint(point, boundaryRect) {
        var range = Math.abs(boundaryRect.top - boundaryRect.bottom)
        return this.closestSlotToPosition((point.y - boundaryRect.top) / range)
      },
      closestSlotFromDate: function closestSlotFromDate(date, offset) {
        if (offset === void 0) {
          offset = 0
        }

        if (dates.lt(date, start, 'minutes')) return slots[0]
        var diffMins = dates.diff(start, date, 'minutes')
        return slots[(diffMins - (diffMins % step)) / step + offset]
      },
      startsBeforeDay: function startsBeforeDay(date) {
        return dates.lt(date, start, 'day')
      },
      startsAfterDay: function startsAfterDay(date) {
        return dates.gt(date, end, 'day')
      },
      startsBefore: function startsBefore(date) {
        return dates.lt(dates.merge(start, date), start, 'minutes')
      },
      startsAfter: function startsAfter(date) {
        return dates.gt(dates.merge(end, date), end, 'minutes')
      },
      getRange: function getRange(rangeStart, rangeEnd) {
        rangeStart = dates.min(end, dates.max(start, rangeStart))
        rangeEnd = dates.min(end, dates.max(start, rangeEnd))
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

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps)
    if (staticProps) _defineProperties(Constructor, staticProps)
    return Constructor
  }

  /** Built-in value references. */
  var spreadableSymbol = _Symbol ? _Symbol.isConcatSpreadable : undefined

  /**
   * Checks if `value` is a flattenable `arguments` object or array.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
   */
  function isFlattenable(value) {
    return (
      isArray_1(value) ||
      isArguments_1(value) ||
      !!(spreadableSymbol && value && value[spreadableSymbol])
    )
  }

  var _isFlattenable = isFlattenable

  /**
   * The base implementation of `_.flatten` with support for restricting flattening.
   *
   * @private
   * @param {Array} array The array to flatten.
   * @param {number} depth The maximum recursion depth.
   * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
   * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
   * @param {Array} [result=[]] The initial result value.
   * @returns {Array} Returns the new flattened array.
   */
  function baseFlatten(array, depth, predicate, isStrict, result) {
    var index = -1,
      length = array.length

    predicate || (predicate = _isFlattenable)
    result || (result = [])

    while (++index < length) {
      var value = array[index]
      if (depth > 0 && predicate(value)) {
        if (depth > 1) {
          // Recursively flatten arrays (susceptible to call stack limits).
          baseFlatten(value, depth - 1, predicate, isStrict, result)
        } else {
          _arrayPush(result, value)
        }
      } else if (!isStrict) {
        result[result.length] = value
      }
    }
    return result
  }

  var _baseFlatten = baseFlatten

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length

      while (length--) {
        var key = props[fromRight ? length : ++index]
        if (iteratee(iterable[key], key, iterable) === false) {
          break
        }
      }
      return object
    }
  }

  var _createBaseFor = createBaseFor

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseFor = _createBaseFor()

  var _baseFor = baseFor

  /**
   * The base implementation of `_.forOwn` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */
  function baseForOwn(object, iteratee) {
    return object && _baseFor(object, iteratee, keys_1)
  }

  var _baseForOwn = baseForOwn

  /**
   * Creates a `baseEach` or `baseEachRight` function.
   *
   * @private
   * @param {Function} eachFunc The function to iterate over a collection.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseEach(eachFunc, fromRight) {
    return function(collection, iteratee) {
      if (collection == null) {
        return collection
      }
      if (!isArrayLike_1(collection)) {
        return eachFunc(collection, iteratee)
      }
      var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection)

      while (fromRight ? index-- : ++index < length) {
        if (iteratee(iterable[index], index, iterable) === false) {
          break
        }
      }
      return collection
    }
  }

  var _createBaseEach = createBaseEach

  /**
   * The base implementation of `_.forEach` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   */
  var baseEach = _createBaseEach(_baseForOwn)

  var _baseEach = baseEach

  /**
   * The base implementation of `_.map` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function baseMap(collection, iteratee) {
    var index = -1,
      result = isArrayLike_1(collection) ? Array(collection.length) : []

    _baseEach(collection, function(value, key, collection) {
      result[++index] = iteratee(value, key, collection)
    })
    return result
  }

  var _baseMap = baseMap

  /**
   * The base implementation of `_.sortBy` which uses `comparer` to define the
   * sort order of `array` and replaces criteria objects with their corresponding
   * values.
   *
   * @private
   * @param {Array} array The array to sort.
   * @param {Function} comparer The function to define sort order.
   * @returns {Array} Returns `array`.
   */
  function baseSortBy(array, comparer) {
    var length = array.length

    array.sort(comparer)
    while (length--) {
      array[length] = array[length].value
    }
    return array
  }

  var _baseSortBy = baseSortBy

  /**
   * Compares values to sort them in ascending order.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {number} Returns the sort order indicator for `value`.
   */
  function compareAscending(value, other) {
    if (value !== other) {
      var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = isSymbol_1(value)

      var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = isSymbol_1(other)

      if (
        (!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
        (valIsSymbol &&
          othIsDefined &&
          othIsReflexive &&
          !othIsNull &&
          !othIsSymbol) ||
        (valIsNull && othIsDefined && othIsReflexive) ||
        (!valIsDefined && othIsReflexive) ||
        !valIsReflexive
      ) {
        return 1
      }
      if (
        (!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
        (othIsSymbol &&
          valIsDefined &&
          valIsReflexive &&
          !valIsNull &&
          !valIsSymbol) ||
        (othIsNull && valIsDefined && valIsReflexive) ||
        (!othIsDefined && valIsReflexive) ||
        !othIsReflexive
      ) {
        return -1
      }
    }
    return 0
  }

  var _compareAscending = compareAscending

  /**
   * Used by `_.orderBy` to compare multiple properties of a value to another
   * and stable sort them.
   *
   * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
   * specify an order of "desc" for descending or "asc" for ascending sort order
   * of corresponding values.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {boolean[]|string[]} orders The order to sort by for each property.
   * @returns {number} Returns the sort order indicator for `object`.
   */
  function compareMultiple(object, other, orders) {
    var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length

    while (++index < length) {
      var result = _compareAscending(objCriteria[index], othCriteria[index])
      if (result) {
        if (index >= ordersLength) {
          return result
        }
        var order = orders[index]
        return result * (order == 'desc' ? -1 : 1)
      }
    }
    // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
    // that causes it, under certain circumstances, to provide the same value for
    // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
    // for more details.
    //
    // This also ensures a stable sort in V8 and other engines.
    // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
    return object.index - other.index
  }

  var _compareMultiple = compareMultiple

  /**
   * The base implementation of `_.orderBy` without param guards.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
   * @param {string[]} orders The sort orders of `iteratees`.
   * @returns {Array} Returns the new sorted array.
   */
  function baseOrderBy(collection, iteratees, orders) {
    var index = -1
    iteratees = _arrayMap(
      iteratees.length ? iteratees : [identity_1],
      _baseUnary(_baseIteratee)
    )

    var result = _baseMap(collection, function(value, key, collection) {
      var criteria = _arrayMap(iteratees, function(iteratee) {
        return iteratee(value)
      })
      return { criteria: criteria, index: ++index, value: value }
    })

    return _baseSortBy(result, function(object, other) {
      return _compareMultiple(object, other, orders)
    })
  }

  var _baseOrderBy = baseOrderBy

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0:
        return func.call(thisArg)
      case 1:
        return func.call(thisArg, args[0])
      case 2:
        return func.call(thisArg, args[0], args[1])
      case 3:
        return func.call(thisArg, args[0], args[1], args[2])
    }
    return func.apply(thisArg, args)
  }

  var _apply = apply

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax$3 = Math.max

  /**
   * A specialized version of `baseRest` which transforms the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @param {Function} transform The rest array transform.
   * @returns {Function} Returns the new function.
   */
  function overRest(func, start, transform) {
    start = nativeMax$3(start === undefined ? func.length - 1 : start, 0)
    return function() {
      var args = arguments,
        index = -1,
        length = nativeMax$3(args.length - start, 0),
        array = Array(length)

      while (++index < length) {
        array[index] = args[start + index]
      }
      index = -1
      var otherArgs = Array(start + 1)
      while (++index < start) {
        otherArgs[index] = args[index]
      }
      otherArgs[start] = transform(array)
      return _apply(func, this, otherArgs)
    }
  }

  var _overRest = overRest

  /**
   * Creates a function that returns `value`.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {*} value The value to return from the new function.
   * @returns {Function} Returns the new constant function.
   * @example
   *
   * var objects = _.times(2, _.constant({ 'a': 1 }));
   *
   * console.log(objects);
   * // => [{ 'a': 1 }, { 'a': 1 }]
   *
   * console.log(objects[0] === objects[1]);
   * // => true
   */
  function constant(value) {
    return function() {
      return value
    }
  }

  var constant_1 = constant

  var defineProperty = (function() {
    try {
      var func = _getNative(Object, 'defineProperty')
      func({}, '', {})
      return func
    } catch (e) {}
  })()

  var _defineProperty = defineProperty

  /**
   * The base implementation of `setToString` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var baseSetToString = !_defineProperty
    ? identity_1
    : function(func, string) {
        return _defineProperty(func, 'toString', {
          configurable: true,
          enumerable: false,
          value: constant_1(string),
          writable: true,
        })
      }

  var _baseSetToString = baseSetToString

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 800,
    HOT_SPAN = 16

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeNow = Date.now

  /**
   * Creates a function that'll short out and invoke `identity` instead
   * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
   * milliseconds.
   *
   * @private
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new shortable function.
   */
  function shortOut(func) {
    var count = 0,
      lastCalled = 0

    return function() {
      var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled)

      lastCalled = stamp
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0]
        }
      } else {
        count = 0
      }
      return func.apply(undefined, arguments)
    }
  }

  var _shortOut = shortOut

  /**
   * Sets the `toString` method of `func` to return `string`.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var setToString = _shortOut(_baseSetToString)

  var _setToString = setToString

  /**
   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   */
  function baseRest(func, start) {
    return _setToString(_overRest(func, start, identity_1), func + '')
  }

  var _baseRest = baseRest

  /**
   * Creates an array of elements, sorted in ascending order by the results of
   * running each element in a collection thru each iteratee. This method
   * performs a stable sort, that is, it preserves the original sort order of
   * equal elements. The iteratees are invoked with one argument: (value).
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {...(Function|Function[])} [iteratees=[_.identity]]
   *  The iteratees to sort by.
   * @returns {Array} Returns the new sorted array.
   * @example
   *
   * var users = [
   *   { 'user': 'fred',   'age': 48 },
   *   { 'user': 'barney', 'age': 36 },
   *   { 'user': 'fred',   'age': 40 },
   *   { 'user': 'barney', 'age': 34 }
   * ];
   *
   * _.sortBy(users, [function(o) { return o.user; }]);
   * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
   *
   * _.sortBy(users, ['user', 'age']);
   * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
   */
  var sortBy = _baseRest(function(collection, iteratees) {
    if (collection == null) {
      return []
    }
    var length = iteratees.length
    if (length > 1 && _isIterateeCall(collection, iteratees[0], iteratees[1])) {
      iteratees = []
    } else if (
      length > 2 &&
      _isIterateeCall(iteratees[0], iteratees[1], iteratees[2])
    ) {
      iteratees = [iteratees[0]]
    }
    return _baseOrderBy(collection, _baseFlatten(iteratees, 1), [])
  })

  var sortBy_1 = sortBy

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

      _createClass(Event, [
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
    var sortedByTime = sortBy_1(events, [
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

  function NoopWrapper(props) {
    return props.children
  }

  var TimeSlotGroup =
    /*#__PURE__*/
    (function(_Component) {
      _inheritsLoose(TimeSlotGroup, _Component)

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
              ? NoopWrapper
              : _this$props$component2
        return React__default.createElement(
          'div',
          {
            className: 'rbc-timeslot-group',
          },
          group.map(function(value, idx) {
            var slotProps = getters ? getters.slotProp(value, resource) : {}
            return React__default.createElement(
              Wrapper,
              {
                key: idx,
                value: value,
                resource: resource,
              },
              React__default.createElement(
                'div',
                _extends({}, slotProps, {
                  className: classnames('rbc-time-slot', slotProps.className),
                }),
                renderSlot && renderSlot(value, idx)
              )
            )
          })
        )
      }

      return TimeSlotGroup
    })(React.Component)
  TimeSlotGroup.propTypes = {
    renderSlot: propTypes.func,
    group: propTypes.array.isRequired,
    resource: propTypes.any,
    components: propTypes.object,
    getters: propTypes.object,
  }

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
      React__default.createElement(
        'div',
        {
          key: '1',
          className: 'rbc-event-label',
        },
        label
      ),
      React__default.createElement(
        'div',
        {
          key: '2',
          className: 'rbc-event-content',
        },
        Event
          ? React__default.createElement(Event, {
              event: event,
              title: title,
            })
          : title
      ),
    ]
    return React__default.createElement(
      EventWrapper,
      _extends(
        {
          type: 'time',
        },
        props
      ),
      React__default.createElement(
        'div',
        {
          onClick: onClick,
          onDoubleClick: onDoubleClick,
          style: _extends(
            {},
            userProps.style,
            ((_extends2 = {
              top: top + '%',
              height: height + '%',
            }),
            (_extends2[isRtl ? 'right' : 'left'] = Math.max(0, xOffset) + '%'),
            (_extends2.width = width + '%'),
            _extends2)
          ),
          title: tooltip
            ? (typeof label === 'string' ? label + ': ' : '') + tooltip
            : undefined,
          className: classnames('rbc-event', className, userProps.className, {
            'rbc-selected': selected,
            'rbc-event-continues-earlier': continuesEarlier,
            'rbc-event-continues-later': continuesLater,
          }),
        },
        inner
      )
    )
  }

  var DayColumn =
    /*#__PURE__*/
    (function(_React$Component) {
      _inheritsLoose(DayColumn, _React$Component)

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
          _React$Component.call.apply(_React$Component, [this].concat(_args)) ||
          this
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

          var _assertThisInitialize = _assertThisInitialized(
              _assertThisInitialized(_this)
            ),
            slotMetrics = _assertThisInitialize.slotMetrics

          var messages = localizer.messages
          var styledEvents = getStyledEvents({
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
            var continuesLater = startsAfterDay || slotMetrics.startsAfter(end)
            return React__default.createElement(TimeGridEvent, {
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
              selected: isSelected(event, selected),
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
          var node = reactDom.findDOMNode(
            _assertThisInitialized(_assertThisInitialized(_this))
          )
          var selector = (_this._selector = new Selection(
            function() {
              return reactDom.findDOMNode(
                _assertThisInitialized(_assertThisInitialized(_this))
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
                (dates.eq(current.startDate, start, 'minutes') &&
                  dates.eq(current.endDate, end, 'minutes')) ||
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
              getBoundsForNode(node)
            )

            if (!_this.state.selecting) _this._initialSlot = currentSlot
            var initialSlot = _this._initialSlot
            if (initialSlot === currentSlot)
              currentSlot = _this.slotMetrics.nextSlot(initialSlot)

            var selectRange = _this.slotMetrics.getRange(
              dates.min(initialSlot, currentSlot),
              dates.max(initialSlot, currentSlot)
            )

            return _extends({}, selectRange, {
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
              !isEvent(
                reactDom.findDOMNode(
                  _assertThisInitialized(_assertThisInitialized(_this))
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
            return !isEvent(
              reactDom.findDOMNode(
                _assertThisInitialized(_assertThisInitialized(_this))
              ),
              box
            )
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
                _extends({}, _this.state, {
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

          while (dates.lte(current, endDate)) {
            slots.push(current)
            current = dates.add(current, _this.props.step, 'minutes')
          }

          notify(_this.props.onSelectSlot, {
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
            var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
            _key2 < _len2;
            _key2++
          ) {
            args[_key2] = arguments[_key2]
          }

          notify(_this.props.onSelectEvent, args)
        }

        _this._doubleClick = function() {
          for (
            var _len3 = arguments.length, args = new Array(_len3), _key3 = 0;
            _key3 < _len3;
            _key3++
          ) {
            args[_key3] = arguments[_key3]
          }

          notify(_this.props.onDoubleClickEvent, args)
        }

        _this.slotMetrics = getSlotMetrics$1(_this.props)
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
        if (nextProps.selectable && !this.props.selectable) this._selectable()
        if (!nextProps.selectable && this.props.selectable)
          this._teardownSelectable()
        this.slotMetrics = this.slotMetrics.update(nextProps)
      }

      _proto.componentDidUpdate = function componentDidUpdate(
        prevProps,
        prevState
      ) {
        var getNowChanged = !dates.eq(
          prevProps.getNow(),
          this.props.getNow(),
          'minutes'
        )

        if (prevProps.isNow !== this.props.isNow || getNowChanged) {
          this.clearTimeIndicatorInterval()

          if (this.props.isNow) {
            var tail =
              !getNowChanged &&
              dates.eq(prevProps.date, this.props.date, 'minutes') &&
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
          getters = _objectWithoutPropertiesLoose(_this$props3$getters, [
            'dayProp',
          ]),
          _this$props3$componen = _this$props3.components,
          EventContainer = _this$props3$componen.eventContainerWrapper,
          components = _objectWithoutPropertiesLoose(_this$props3$componen, [
            'eventContainerWrapper',
          ])

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

        return React__default.createElement(
          'div',
          {
            style: style,
            className: classnames(
              className,
              'rbc-day-slot',
              'rbc-time-column',
              isNow && 'rbc-now',
              isNow && 'rbc-today', // WHY
              selecting && 'rbc-slot-selecting'
            ),
          },
          slotMetrics.groups.map(function(grp, idx) {
            return React__default.createElement(TimeSlotGroup, {
              key: idx,
              group: grp,
              resource: resource,
              getters: getters,
              components: components,
            })
          }),
          React__default.createElement(
            EventContainer,
            {
              localizer: localizer,
              resource: resource,
              accessors: accessors,
              getters: getters,
              components: components,
              slotMetrics: slotMetrics,
            },
            React__default.createElement(
              'div',
              {
                className: classnames('rbc-events-container', rtl && 'rtl'),
              },
              this.renderEvents()
            )
          ),
          selecting &&
            React__default.createElement(
              'div',
              {
                className: 'rbc-slot-selection',
                style: {
                  top: top,
                  height: height,
                },
              },
              React__default.createElement(
                'span',
                null,
                localizer.format(selectDates, 'selectRangeFormat')
              )
            ),
          isNow &&
            React__default.createElement('div', {
              className: 'rbc-current-time-indicator',
              style: {
                top: this.state.timeIndicatorPosition + '%',
              },
            })
        )
      }

      return DayColumn
    })(React__default.Component)

  DayColumn.propTypes = {
    events: propTypes.array.isRequired,
    step: propTypes.number.isRequired,
    date: propTypes.instanceOf(Date).isRequired,
    min: propTypes.instanceOf(Date).isRequired,
    max: propTypes.instanceOf(Date).isRequired,
    getNow: propTypes.func.isRequired,
    isNow: propTypes.bool,
    rtl: propTypes.bool,
    accessors: propTypes.object.isRequired,
    components: propTypes.object.isRequired,
    getters: propTypes.object.isRequired,
    localizer: propTypes.object.isRequired,
    showMultiDayTimes: propTypes.bool,
    culture: propTypes.string,
    timeslots: propTypes.number,
    selected: propTypes.object,
    selectable: propTypes.oneOf([true, false, 'ignoreEvents']),
    eventOffset: propTypes.number,
    longPressThreshold: propTypes.number,
    onSelecting: propTypes.func,
    onSelectSlot: propTypes.func.isRequired,
    onSelectEvent: propTypes.func.isRequired,
    onDoubleClickEvent: propTypes.func.isRequired,
    className: propTypes.string,
    dragThroughEvents: propTypes.bool,
    resource: propTypes.any,
  }
  DayColumn.defaultProps = {
    dragThroughEvents: true,
    timeslots: 2,
  }

  var TimeGutter =
    /*#__PURE__*/
    (function(_Component) {
      _inheritsLoose(TimeGutter, _Component)

      function TimeGutter() {
        var _this

        for (
          var _len = arguments.length, args = new Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key]
        }

        _this = _Component.call.apply(_Component, [this].concat(args)) || this

        _this.renderSlot = function(value, idx) {
          if (idx !== 0) return null
          var _this$props = _this.props,
            localizer = _this$props.localizer,
            getNow = _this$props.getNow

          var isNow = _this.slotMetrics.dateIsInGroup(getNow(), idx)

          return React__default.createElement(
            'span',
            {
              className: classnames('rbc-label', isNow && 'rbc-now'),
            },
            localizer.format(value, 'timeGutterFormat')
          )
        }

        var _this$props2 = _this.props,
          min = _this$props2.min,
          max = _this$props2.max,
          timeslots = _this$props2.timeslots,
          step = _this$props2.step
        _this.slotMetrics = getSlotMetrics$1({
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
        return React__default.createElement(
          'div',
          {
            className: 'rbc-time-gutter rbc-time-column',
          },
          this.slotMetrics.groups.map(function(grp, idx) {
            return React__default.createElement(TimeSlotGroup, {
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
    })(React.Component)
  TimeGutter.propTypes = {
    min: propTypes.instanceOf(Date).isRequired,
    max: propTypes.instanceOf(Date).isRequired,
    timeslots: propTypes.number.isRequired,
    step: propTypes.number.isRequired,
    getNow: propTypes.func.isRequired,
    components: propTypes.object.isRequired,
    localizer: propTypes.object.isRequired,
    resource: propTypes.string,
  }

  var width_1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = width

    var _offset = interopRequireDefault(offset_1)

    var _isWindow = interopRequireDefault(isWindow)

    function width(node, client) {
      var win = (0, _isWindow.default)(node)
      return win
        ? win.innerWidth
        : client
        ? node.clientWidth
        : (0, _offset.default)(node).width
    }

    module.exports = exports['default']
  })

  var getWidth = unwrapExports(width_1)

  var scrollbarSize_1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = scrollbarSize

    var _inDOM = interopRequireDefault(inDOM)

    var size

    function scrollbarSize(recalc) {
      if ((!size && size !== 0) || recalc) {
        if (_inDOM.default) {
          var scrollDiv = document.createElement('div')
          scrollDiv.style.position = 'absolute'
          scrollDiv.style.top = '-9999px'
          scrollDiv.style.width = '50px'
          scrollDiv.style.height = '50px'
          scrollDiv.style.overflow = 'scroll'
          document.body.appendChild(scrollDiv)
          size = scrollDiv.offsetWidth - scrollDiv.clientWidth
          document.body.removeChild(scrollDiv)
        }
      }

      return size
    }

    module.exports = exports['default']
  })

  var scrollbarSize = unwrapExports(scrollbarSize_1)

  var ResourceHeader = function ResourceHeader(_ref) {
    var label = _ref.label
    return React__default.createElement(React__default.Fragment, null, label)
  }

  ResourceHeader.propTypes = {
    label: propTypes.node,
    index: propTypes.number,
    resource: propTypes.object,
  }

  var TimeGridHeader =
    /*#__PURE__*/
    (function(_React$Component) {
      _inheritsLoose(TimeGridHeader, _React$Component)

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
          _React$Component.call.apply(_React$Component, [this].concat(args)) ||
          this

        _this.handleHeaderClick = function(date, view, e) {
          e.preventDefault()
          notify(_this.props.onDrillDown, [date, view])
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
          return React__default.createElement(DateContentRow, {
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
            _this$props2$componen === void 0 ? Header : _this$props2$componen
        var today = getNow()
        return range.map(function(date, i) {
          var drilldownView = getDrilldownView(date)
          var label = localizer.format(date, 'dayFormat')

          var _dayProp = dayProp(date),
            className = _dayProp.className,
            style = _dayProp.style

          var header = React__default.createElement(HeaderComponent, {
            date: date,
            label: label,
            localizer: localizer,
          })
          return React__default.createElement(
            'div',
            {
              key: i,
              style: style,
              className: classnames(
                'rbc-header',
                className,
                dates.eq(date, today, 'day') && 'rbc-today'
              ),
            },
            drilldownView
              ? React__default.createElement(
                  'a',
                  {
                    href: '#',
                    onClick: function onClick(e) {
                      return _this2.handleHeaderClick(date, drilldownView, e)
                    },
                  },
                  header
                )
              : React__default.createElement('span', null, header)
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
              ? ResourceHeader
              : _this$props3$componen2
        var style = {}

        if (isOverflowing) {
          style[rtl ? 'marginLeft' : 'marginRight'] = scrollbarSize() + 'px'
        }

        var groupedEvents = resources.groupEvents(events)
        return React__default.createElement(
          'div',
          {
            style: style,
            ref: scrollRef,
            className: classnames(
              'rbc-time-header',
              isOverflowing && 'rbc-overflowing'
            ),
          },
          React__default.createElement(
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
              React__default.createElement(TimeGutterHeader, null)
          ),
          resources.map(function(_ref, idx) {
            var id = _ref[0],
              resource = _ref[1]
            return React__default.createElement(
              'div',
              {
                className: 'rbc-time-header-content',
                key: id || idx,
              },
              resource &&
                React__default.createElement(
                  'div',
                  {
                    className: 'rbc-row rbc-row-resource',
                    key: 'resource_' + idx,
                  },
                  React__default.createElement(
                    'div',
                    {
                      className: 'rbc-header',
                    },
                    React__default.createElement(ResourceHeaderComponent, {
                      index: idx,
                      label: accessors.resourceTitle(resource),
                      resource: resource,
                    })
                  )
                ),
              React__default.createElement(
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
              React__default.createElement(DateContentRow, {
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
    })(React__default.Component)

  TimeGridHeader.propTypes = {
    range: propTypes.array.isRequired,
    events: propTypes.array.isRequired,
    resources: propTypes.object,
    getNow: propTypes.func.isRequired,
    isOverflowing: propTypes.bool,
    rtl: propTypes.bool,
    width: propTypes.number,
    localizer: propTypes.object.isRequired,
    accessors: propTypes.object.isRequired,
    components: propTypes.object.isRequired,
    getters: propTypes.object.isRequired,
    selected: propTypes.object,
    selectable: propTypes.oneOf([true, false, 'ignoreEvents']),
    longPressThreshold: propTypes.number,
    onSelectSlot: propTypes.func,
    onSelectEvent: propTypes.func,
    onDoubleClickEvent: propTypes.func,
    onDrillDown: propTypes.func,
    getDrilldownView: propTypes.func.isRequired,
    scrollRef: propTypes.any,
  }

  var NONE = {}
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

  var TimeGrid =
    /*#__PURE__*/
    (function(_Component) {
      _inheritsLoose(TimeGrid, _Component)

      function TimeGrid(props) {
        var _this

        _this = _Component.call(this, props) || this

        _this.handleScroll = function(e) {
          if (_this.scrollRef.current) {
            _this.scrollRef.current.scrollLeft = e.target.scrollLeft
          }
        }

        _this.handleResize = function() {
          raf.cancel(_this.rafHandle)
          _this.rafHandle = raf(_this.checkOverflow)
        }

        _this.gutterRef = function(ref) {
          _this.gutter = ref && reactDom.findDOMNode(ref)
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

          notify(_this.props.onSelectEvent, args)
        }

        _this.handleSelectAllDaySlot = function(slots, slotInfo) {
          var onSelectSlot = _this.props.onSelectSlot
          notify(onSelectSlot, {
            slots: slots,
            start: slots[0],
            end: slots[slots.length - 1],
            action: slotInfo.action,
          })
        }

        _this.checkOverflow = function() {
          if (_this._updatingOverflow) return
          var isOverflowing =
            _this.refs.content.scrollHeight > _this.refs.content.clientHeight

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

        _this.memoizedResources = index$2(function(resources, accessors) {
          return Resources(resources, accessors)
        })
        _this.state = {
          gutterWidth: undefined,
          isOverflowing: null,
        }
        _this.scrollRef = React__default.createRef()
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
        raf.cancel(this.rafHandle)

        if (this.measureGutterAnimationFrameRequest) {
          window.cancelAnimationFrame(this.measureGutterAnimationFrameRequest)
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
          !dates.eq(nextProps.range[0], range[0], 'minute') ||
          !dates.eq(nextProps.scrollToTime, scrollToTime, 'minute')
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
        var resources = this.memoizedResources(this.props.resources, accessors)
        var groupedEvents = resources.groupEvents(events)
        return resources.map(function(_ref, i) {
          var id = _ref[0],
            resource = _ref[1]
          return range.map(function(date, jj) {
            var daysEvents = (groupedEvents.get(id) || []).filter(function(
              event
            ) {
              return dates.inRange(
                date,
                accessors.start(event),
                accessors.end(event),
                'day'
              )
            })
            return React__default.createElement(
              DayColumn,
              _extends({}, _this2.props, {
                localizer: localizer,
                min: dates.merge(date, min),
                max: dates.merge(date, max),
                resource: resource && id,
                components: components,
                isNow: dates.eq(date, now, 'day'),
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
          if (inRange(event, start, end, accessors)) {
            var eStart = accessors.start(event),
              eEnd = accessors.end(event)

            if (
              accessors.allDay(event) ||
              (dates.isJustDate(eStart) && dates.isJustDate(eEnd)) ||
              (!showMultiDayTimes && !dates.eq(eStart, eEnd, 'day'))
            ) {
              allDayEvents.push(event)
            } else {
              rangeEvents.push(event)
            }
          }
        })
        allDayEvents.sort(function(a, b) {
          return sortEvents(a, b, accessors)
        })
        return React__default.createElement(
          'div',
          {
            className: classnames(
              'rbc-time-view',
              resources && 'rbc-time-view-resources'
            ),
          },
          React__default.createElement(TimeGridHeader, {
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
          React__default.createElement(
            'div',
            {
              ref: 'content',
              className: 'rbc-time-content',
              onScroll: this.handleScroll,
            },
            React__default.createElement(TimeGutter, {
              date: start,
              ref: this.gutterRef,
              localizer: localizer,
              min: dates.merge(start, min),
              max: dates.merge(start, max),
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
          window.cancelAnimationFrame(this.measureGutterAnimationFrameRequest)
        }

        this.measureGutterAnimationFrameRequest = window.requestAnimationFrame(
          function() {
            var width = getWidth(_this3.gutter)

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
          var content = this.refs.content
          var scrollRatio = this._scrollRatio
          setTimeout(function() {
            content.scrollTop = content.scrollHeight * scrollRatio
          }, 2) // Only do this once

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
        var diffMillis = scrollToTime - dates.startOf(scrollToTime, 'day')
        var totalMillis = dates.diff(max, min)
        this._scrollRatio = diffMillis / totalMillis
      }

      return TimeGrid
    })(React.Component)
  TimeGrid.propTypes = {
    events: propTypes.array.isRequired,
    resources: propTypes.array,
    step: propTypes.number,
    timeslots: propTypes.number,
    range: propTypes.arrayOf(propTypes.instanceOf(Date)),
    min: propTypes.instanceOf(Date),
    max: propTypes.instanceOf(Date),
    getNow: propTypes.func.isRequired,
    scrollToTime: propTypes.instanceOf(Date),
    showMultiDayTimes: propTypes.bool,
    rtl: propTypes.bool,
    width: propTypes.number,
    accessors: propTypes.object.isRequired,
    components: propTypes.object.isRequired,
    getters: propTypes.object.isRequired,
    localizer: propTypes.object.isRequired,
    selected: propTypes.object,
    selectable: propTypes.oneOf([true, false, 'ignoreEvents']),
    longPressThreshold: propTypes.number,
    onNavigate: propTypes.func,
    onSelectSlot: propTypes.func,
    onSelectEnd: propTypes.func,
    onSelectStart: propTypes.func,
    onSelectEvent: propTypes.func,
    onDoubleClickEvent: propTypes.func,
    onDrillDown: propTypes.func,
    getDrilldownView: propTypes.func.isRequired,
  }
  TimeGrid.defaultProps = {
    step: 30,
    timeslots: 2,
    min: dates.startOf(new Date(), 'day'),
    max: dates.endOf(new Date(), 'day'),
    scrollToTime: dates.startOf(new Date(), 'day'),
  }

  var Day =
    /*#__PURE__*/
    (function(_React$Component) {
      _inheritsLoose(Day, _React$Component)

      function Day() {
        return _React$Component.apply(this, arguments) || this
      }

      var _proto = Day.prototype

      _proto.render = function render() {
        var _this$props = this.props,
          date = _this$props.date,
          props = _objectWithoutPropertiesLoose(_this$props, ['date'])

        var range = Day.range(date)
        return React__default.createElement(
          TimeGrid,
          _extends({}, props, {
            range: range,
            eventOffset: 10,
          })
        )
      }

      return Day
    })(React__default.Component)

  Day.propTypes = {
    date: propTypes.instanceOf(Date).isRequired,
  }

  Day.range = function(date) {
    return [dates.startOf(date, 'day')]
  }

  Day.navigate = function(date, action) {
    switch (action) {
      case navigate.PREVIOUS:
        return dates.add(date, -1, 'day')

      case navigate.NEXT:
        return dates.add(date, 1, 'day')

      default:
        return date
    }
  }

  Day.title = function(date, _ref) {
    var localizer = _ref.localizer
    return localizer.format(date, 'dayHeaderFormat')
  }

  var Week =
    /*#__PURE__*/
    (function(_React$Component) {
      _inheritsLoose(Week, _React$Component)

      function Week() {
        return _React$Component.apply(this, arguments) || this
      }

      var _proto = Week.prototype

      _proto.render = function render() {
        var _this$props = this.props,
          date = _this$props.date,
          props = _objectWithoutPropertiesLoose(_this$props, ['date'])

        var range = Week.range(date, this.props)
        return React__default.createElement(
          TimeGrid,
          _extends({}, props, {
            range: range,
            eventOffset: 15,
          })
        )
      }

      return Week
    })(React__default.Component)

  Week.propTypes = {
    date: propTypes.instanceOf(Date).isRequired,
  }
  Week.defaultProps = TimeGrid.defaultProps

  Week.navigate = function(date, action) {
    switch (action) {
      case navigate.PREVIOUS:
        return dates.add(date, -1, 'week')

      case navigate.NEXT:
        return dates.add(date, 1, 'week')

      default:
        return date
    }
  }

  Week.range = function(date, _ref) {
    var localizer = _ref.localizer
    var firstOfWeek = localizer.startOfWeek()
    var start = dates.startOf(date, 'week', firstOfWeek)
    var end = dates.endOf(date, 'week', firstOfWeek)
    return dates.range(start, end)
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

  function workWeekRange(date, options) {
    return Week.range(date, options).filter(function(d) {
      return [6, 0].indexOf(d.getDay()) === -1
    })
  }

  var WorkWeek =
    /*#__PURE__*/
    (function(_React$Component) {
      _inheritsLoose(WorkWeek, _React$Component)

      function WorkWeek() {
        return _React$Component.apply(this, arguments) || this
      }

      var _proto = WorkWeek.prototype

      _proto.render = function render() {
        var _this$props = this.props,
          date = _this$props.date,
          props = _objectWithoutPropertiesLoose(_this$props, ['date'])

        var range = workWeekRange(date, this.props)
        return React__default.createElement(
          TimeGrid,
          _extends({}, props, {
            range: range,
            eventOffset: 15,
          })
        )
      }

      return WorkWeek
    })(React__default.Component)

  WorkWeek.propTypes = {
    date: propTypes.instanceOf(Date).isRequired,
  }
  WorkWeek.defaultProps = TimeGrid.defaultProps
  WorkWeek.range = workWeekRange
  WorkWeek.navigate = Week.navigate

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

  var hasClass_1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = hasClass

    function hasClass(element, className) {
      if (element.classList)
        return !!className && element.classList.contains(className)
      else
        return (
          (
            ' ' +
            (element.className.baseVal || element.className) +
            ' '
          ).indexOf(' ' + className + ' ') !== -1
        )
    }

    module.exports = exports['default']
  })

  unwrapExports(hasClass_1)

  var addClass_1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = addClass

    var _hasClass = interopRequireDefault(hasClass_1)

    function addClass(element, className) {
      if (element.classList) element.classList.add(className)
      else if (!(0, _hasClass.default)(element, className))
        if (typeof element.className === 'string')
          element.className = element.className + ' ' + className
        else
          element.setAttribute(
            'class',
            ((element.className && element.className.baseVal) || '') +
              ' ' +
              className
          )
    }

    module.exports = exports['default']
  })

  unwrapExports(addClass_1)

  function replaceClassName(origClass, classToRemove) {
    return origClass
      .replace(new RegExp('(^|\\s)' + classToRemove + '(?:\\s|$)', 'g'), '$1')
      .replace(/\s+/g, ' ')
      .replace(/^\s*|\s*$/g, '')
  }

  var removeClass = function removeClass(element, className) {
    if (element.classList) element.classList.remove(className)
    else if (typeof element.className === 'string')
      element.className = replaceClassName(element.className, className)
    else
      element.setAttribute(
        'class',
        replaceClassName(
          (element.className && element.className.baseVal) || '',
          className
        )
      )
  }

  var _class = createCommonjsModule(function(module, exports) {
    exports.__esModule = true
    exports.default = void 0

    var _addClass = interopRequireDefault(addClass_1)

    exports.addClass = _addClass.default

    var _removeClass = interopRequireDefault(removeClass)

    exports.removeClass = _removeClass.default

    var _hasClass = interopRequireDefault(hasClass_1)

    exports.hasClass = _hasClass.default
    var _default = {
      addClass: _addClass.default,
      removeClass: _removeClass.default,
      hasClass: _hasClass.default,
    }
    exports.default = _default
  })

  var classes = unwrapExports(_class)
  var _class_1 = _class.addClass
  var _class_2 = _class.removeClass
  var _class_3 = _class.hasClass

  var Agenda =
    /*#__PURE__*/
    (function(_React$Component) {
      _inheritsLoose(Agenda, _React$Component)

      function Agenda() {
        var _this

        for (
          var _len = arguments.length, args = new Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key]
        }

        _this =
          _React$Component.call.apply(_React$Component, [this].concat(args)) ||
          this

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
            return inRange(
              e,
              dates.startOf(day, 'day'),
              dates.endOf(day, 'day'),
              accessors
            )
          })
          return events.map(function(event, idx) {
            var title = accessors.title(event)
            var end = accessors.end(event)
            var start = accessors.start(event)
            var userProps = getters.eventProp(
              event,
              start,
              end,
              isSelected(event, selected)
            )
            var dateLabel =
              idx === 0 && localizer.format(day, 'agendaDateFormat')
            var first =
              idx === 0
                ? React__default.createElement(
                    'td',
                    {
                      rowSpan: events.length,
                      className: 'rbc-agenda-date-cell',
                    },
                    AgendaDate
                      ? React__default.createElement(AgendaDate, {
                          day: day,
                          label: dateLabel,
                        })
                      : dateLabel
                  )
                : false
            return React__default.createElement(
              'tr',
              {
                key: dayKey + '_' + idx,
                className: userProps.className,
                style: userProps.style,
              },
              first,
              React__default.createElement(
                'td',
                {
                  className: 'rbc-agenda-time-cell',
                },
                _this.timeRangeLabel(day, event)
              ),
              React__default.createElement(
                'td',
                {
                  className: 'rbc-agenda-event-cell',
                },
                Event
                  ? React__default.createElement(Event, {
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
            if (dates.eq(start, end)) {
              label = localizer.format(start, 'agendaTimeFormat')
            } else if (dates.eq(start, end, 'day')) {
              label = localizer.format(
                {
                  start: start,
                  end: end,
                },
                'agendaTimeRangeFormat'
              )
            } else if (dates.eq(day, start, 'day')) {
              label = localizer.format(start, 'agendaTimeFormat')
            } else if (dates.eq(day, end, 'day')) {
              label = localizer.format(end, 'agendaTimeFormat')
            }
          }

          if (dates.gt(day, start, 'day')) labelClass = 'rbc-continues-prior'
          if (dates.lt(day, end, 'day')) labelClass += ' rbc-continues-after'
          return React__default.createElement(
            'span',
            {
              className: labelClass.trim(),
            },
            TimeComponent
              ? React__default.createElement(TimeComponent, {
                  event: event,
                  day: day,
                  label: label,
                })
              : label
          )
        }

        _this._adjustHeader = function() {
          if (!_this.refs.tbody) return
          var header = _this.refs.header
          var firstRow = _this.refs.tbody.firstChild
          if (!firstRow) return
          var isOverflowing =
            _this.refs.content.scrollHeight > _this.refs.content.clientHeight
          var widths = _this._widths || []
          _this._widths = [
            getWidth(firstRow.children[0]),
            getWidth(firstRow.children[1]),
          ]

          if (
            widths[0] !== _this._widths[0] ||
            widths[1] !== _this._widths[1]
          ) {
            _this.refs.dateCol.style.width = _this._widths[0] + 'px'
            _this.refs.timeCol.style.width = _this._widths[1] + 'px'
          }

          if (isOverflowing) {
            classes.addClass(header, 'rbc-header-overflowing')
            header.style.marginRight = scrollbarSize() + 'px'
          } else {
            classes.removeClass(header, 'rbc-header-overflowing')
          }
        }

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
        var end = dates.add(date, length, 'day')
        var range = dates.range(date, end, 'day')
        events = events.filter(function(event) {
          return inRange(event, date, end, accessors)
        })
        events.sort(function(a, b) {
          return +accessors.start(a) - +accessors.start(b)
        })
        return React__default.createElement(
          'div',
          {
            className: 'rbc-agenda-view',
          },
          events.length !== 0
            ? React__default.createElement(
                React__default.Fragment,
                null,
                React__default.createElement(
                  'table',
                  {
                    ref: 'header',
                    className: 'rbc-agenda-table',
                  },
                  React__default.createElement(
                    'thead',
                    null,
                    React__default.createElement(
                      'tr',
                      null,
                      React__default.createElement(
                        'th',
                        {
                          className: 'rbc-header',
                          ref: 'dateCol',
                        },
                        messages.date
                      ),
                      React__default.createElement(
                        'th',
                        {
                          className: 'rbc-header',
                          ref: 'timeCol',
                        },
                        messages.time
                      ),
                      React__default.createElement(
                        'th',
                        {
                          className: 'rbc-header',
                        },
                        messages.event
                      )
                    )
                  )
                ),
                React__default.createElement(
                  'div',
                  {
                    className: 'rbc-agenda-content',
                    ref: 'content',
                  },
                  React__default.createElement(
                    'table',
                    {
                      className: 'rbc-agenda-table',
                    },
                    React__default.createElement(
                      'tbody',
                      {
                        ref: 'tbody',
                      },
                      range.map(function(day, idx) {
                        return _this2.renderDay(day, events, idx)
                      })
                    )
                  )
                )
              )
            : React__default.createElement(
                'span',
                {
                  className: 'rbc-agenda-empty',
                },
                messages.noEventsInRange
              )
        )
      }

      return Agenda
    })(React__default.Component)

  Agenda.propTypes = {
    events: propTypes.array,
    date: propTypes.instanceOf(Date),
    length: propTypes.number.isRequired,
    selected: propTypes.object,
    accessors: propTypes.object.isRequired,
    components: propTypes.object.isRequired,
    getters: propTypes.object.isRequired,
    localizer: propTypes.object.isRequired,
  }
  Agenda.defaultProps = {
    length: 30,
  }

  Agenda.range = function(start, _ref) {
    var _ref$length = _ref.length,
      length = _ref$length === void 0 ? Agenda.defaultProps.length : _ref$length
    var end = dates.add(start, length, 'day')
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
      case navigate.PREVIOUS:
        return dates.add(date, -length, 'day')

      case navigate.NEXT:
        return dates.add(date, length, 'day')

      default:
        return date
    }
  }

  Agenda.title = function(start, _ref3) {
    var _ref3$length = _ref3.length,
      length =
        _ref3$length === void 0 ? Agenda.defaultProps.length : _ref3$length,
      localizer = _ref3.localizer
    var end = dates.add(start, length, 'day')
    return localizer.format(
      {
        start: start,
        end: end,
      },
      'agendaHeaderFormat'
    )
  }

  var _VIEWS
  var VIEWS = ((_VIEWS = {}),
  (_VIEWS[views.MONTH] = MonthView),
  (_VIEWS[views.WEEK] = Week),
  (_VIEWS[views.WORK_WEEK] = WorkWeek),
  (_VIEWS[views.DAY] = Day),
  (_VIEWS[views.AGENDA] = Agenda),
  _VIEWS)

  function moveDate(View, _ref) {
    var action = _ref.action,
      date = _ref.date,
      today = _ref.today,
      props = _objectWithoutPropertiesLoose(_ref, ['action', 'date', 'today'])

    View = typeof View === 'string' ? VIEWS[View] : View

    switch (action) {
      case navigate.TODAY:
        date = today || new Date()
        break

      case navigate.DATE:
        break

      default:
        !(View && typeof View.navigate === 'function')
          ? invariant_1(
              false,
              'Calendar View components must implement a static `.navigate(date, action)` method.s'
            )
          : void 0
        date = View.navigate(date, action, props)
    }

    return date
  }

  var Toolbar =
    /*#__PURE__*/
    (function(_React$Component) {
      _inheritsLoose(Toolbar, _React$Component)

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
          _React$Component.call.apply(_React$Component, [this].concat(args)) ||
          this

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
        return React__default.createElement(
          'div',
          {
            className: 'rbc-toolbar',
          },
          React__default.createElement(
            'span',
            {
              className: 'rbc-btn-group',
            },
            React__default.createElement(
              'button',
              {
                type: 'button',
                onClick: this.navigate.bind(null, navigate.TODAY),
              },
              messages.today
            ),
            React__default.createElement(
              'button',
              {
                type: 'button',
                onClick: this.navigate.bind(null, navigate.PREVIOUS),
              },
              messages.previous
            ),
            React__default.createElement(
              'button',
              {
                type: 'button',
                onClick: this.navigate.bind(null, navigate.NEXT),
              },
              messages.next
            )
          ),
          React__default.createElement(
            'span',
            {
              className: 'rbc-toolbar-label',
            },
            label
          ),
          React__default.createElement(
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
            return React__default.createElement(
              'button',
              {
                type: 'button',
                key: name,
                className: classnames({
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
    })(React__default.Component)

  Toolbar.propTypes = {
    view: propTypes.string.isRequired,
    views: propTypes.arrayOf(propTypes.string).isRequired,
    label: propTypes.node.isRequired,
    localizer: propTypes.object,
    onNavigate: propTypes.func.isRequired,
    onView: propTypes.func.isRequired,
  }

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, iteratee) {
    var index = -1,
      length = array == null ? 0 : array.length

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break
      }
    }
    return array
  }

  var _arrayEach = arrayEach

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function baseAssignValue(object, key, value) {
    if (key == '__proto__' && _defineProperty) {
      _defineProperty(object, key, {
        configurable: true,
        enumerable: true,
        value: value,
        writable: true,
      })
    } else {
      object[key] = value
    }
  }

  var _baseAssignValue = baseAssignValue

  /** Used for built-in method references. */
  var objectProto$c = Object.prototype

  /** Used to check objects for own properties. */
  var hasOwnProperty$a = objectProto$c.hasOwnProperty

  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignValue(object, key, value) {
    var objValue = object[key]
    if (
      !(hasOwnProperty$a.call(object, key) && eq_1(objValue, value)) ||
      (value === undefined && !(key in object))
    ) {
      _baseAssignValue(object, key, value)
    }
  }

  var _assignValue = assignValue

  /**
   * Copies properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property identifiers to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Function} [customizer] The function to customize copied values.
   * @returns {Object} Returns `object`.
   */
  function copyObject(source, props, object, customizer) {
    var isNew = !object
    object || (object = {})

    var index = -1,
      length = props.length

    while (++index < length) {
      var key = props[index]

      var newValue = customizer
        ? customizer(object[key], source[key], key, object, source)
        : undefined

      if (newValue === undefined) {
        newValue = source[key]
      }
      if (isNew) {
        _baseAssignValue(object, key, newValue)
      } else {
        _assignValue(object, key, newValue)
      }
    }
    return object
  }

  var _copyObject = copyObject

  /**
   * The base implementation of `_.assign` without support for multiple sources
   * or `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssign(object, source) {
    return object && _copyObject(source, keys_1(source), object)
  }

  var _baseAssign = baseAssign

  /**
   * This function is like
   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * except that it includes inherited enumerable properties.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function nativeKeysIn(object) {
    var result = []
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key)
      }
    }
    return result
  }

  var _nativeKeysIn = nativeKeysIn

  /** Used for built-in method references. */
  var objectProto$d = Object.prototype

  /** Used to check objects for own properties. */
  var hasOwnProperty$b = objectProto$d.hasOwnProperty

  /**
   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeysIn(object) {
    if (!isObject_1(object)) {
      return _nativeKeysIn(object)
    }
    var isProto = _isPrototype(object),
      result = []

    for (var key in object) {
      if (
        !(
          key == 'constructor' &&
          (isProto || !hasOwnProperty$b.call(object, key))
        )
      ) {
        result.push(key)
      }
    }
    return result
  }

  var _baseKeysIn = baseKeysIn

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  function keysIn$1(object) {
    return isArrayLike_1(object)
      ? _arrayLikeKeys(object, true)
      : _baseKeysIn(object)
  }

  var keysIn_1 = keysIn$1

  /**
   * The base implementation of `_.assignIn` without support for multiple sources
   * or `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssignIn(object, source) {
    return object && _copyObject(source, keysIn_1(source), object)
  }

  var _baseAssignIn = baseAssignIn

  var _cloneBuffer = createCommonjsModule(function(module, exports) {
    /** Detect free variable `exports`. */
    var freeExports = exports && !exports.nodeType && exports

    /** Detect free variable `module`. */
    var freeModule =
      freeExports &&
      'object' == 'object' &&
      module &&
      !module.nodeType &&
      module

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports

    /** Built-in value references. */
    var Buffer = moduleExports ? _root.Buffer : undefined,
      allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined

    /**
     * Creates a clone of  `buffer`.
     *
     * @private
     * @param {Buffer} buffer The buffer to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Buffer} Returns the cloned buffer.
     */
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice()
      }
      var length = buffer.length,
        result = allocUnsafe
          ? allocUnsafe(length)
          : new buffer.constructor(length)

      buffer.copy(result)
      return result
    }

    module.exports = cloneBuffer
  })

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function copyArray(source, array) {
    var index = -1,
      length = source.length

    array || (array = Array(length))
    while (++index < length) {
      array[index] = source[index]
    }
    return array
  }

  var _copyArray = copyArray

  /**
   * Copies own symbols of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy symbols from.
   * @param {Object} [object={}] The object to copy symbols to.
   * @returns {Object} Returns `object`.
   */
  function copySymbols(source, object) {
    return _copyObject(source, _getSymbols(source), object)
  }

  var _copySymbols = copySymbols

  /** Built-in value references. */
  var getPrototype = _overArg(Object.getPrototypeOf, Object)

  var _getPrototype = getPrototype

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeGetSymbols$1 = Object.getOwnPropertySymbols

  /**
   * Creates an array of the own and inherited enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbolsIn = !nativeGetSymbols$1
    ? stubArray_1
    : function(object) {
        var result = []
        while (object) {
          _arrayPush(result, _getSymbols(object))
          object = _getPrototype(object)
        }
        return result
      }

  var _getSymbolsIn = getSymbolsIn

  /**
   * Copies own and inherited symbols of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy symbols from.
   * @param {Object} [object={}] The object to copy symbols to.
   * @returns {Object} Returns `object`.
   */
  function copySymbolsIn(source, object) {
    return _copyObject(source, _getSymbolsIn(source), object)
  }

  var _copySymbolsIn = copySymbolsIn

  /**
   * Creates an array of own and inherited enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeysIn(object) {
    return _baseGetAllKeys(object, keysIn_1, _getSymbolsIn)
  }

  var _getAllKeysIn = getAllKeysIn

  /** Used for built-in method references. */
  var objectProto$e = Object.prototype

  /** Used to check objects for own properties. */
  var hasOwnProperty$c = objectProto$e.hasOwnProperty

  /**
   * Initializes an array clone.
   *
   * @private
   * @param {Array} array The array to clone.
   * @returns {Array} Returns the initialized clone.
   */
  function initCloneArray(array) {
    var length = array.length,
      result = new array.constructor(length)

    // Add properties assigned by `RegExp#exec`.
    if (
      length &&
      typeof array[0] == 'string' &&
      hasOwnProperty$c.call(array, 'index')
    ) {
      result.index = array.index
      result.input = array.input
    }
    return result
  }

  var _initCloneArray = initCloneArray

  /**
   * Creates a clone of `arrayBuffer`.
   *
   * @private
   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength)
    new _Uint8Array(result).set(new _Uint8Array(arrayBuffer))
    return result
  }

  var _cloneArrayBuffer = cloneArrayBuffer

  /**
   * Creates a clone of `dataView`.
   *
   * @private
   * @param {Object} dataView The data view to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned data view.
   */
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? _cloneArrayBuffer(dataView.buffer) : dataView.buffer
    return new dataView.constructor(
      buffer,
      dataView.byteOffset,
      dataView.byteLength
    )
  }

  var _cloneDataView = cloneDataView

  /** Used to match `RegExp` flags from their coerced string values. */
  var reFlags = /\w*$/

  /**
   * Creates a clone of `regexp`.
   *
   * @private
   * @param {Object} regexp The regexp to clone.
   * @returns {Object} Returns the cloned regexp.
   */
  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp))
    result.lastIndex = regexp.lastIndex
    return result
  }

  var _cloneRegExp = cloneRegExp

  /** Used to convert symbols to primitives and strings. */
  var symbolProto$2 = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf$1 = symbolProto$2 ? symbolProto$2.valueOf : undefined

  /**
   * Creates a clone of the `symbol` object.
   *
   * @private
   * @param {Object} symbol The symbol object to clone.
   * @returns {Object} Returns the cloned symbol object.
   */
  function cloneSymbol(symbol) {
    return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {}
  }

  var _cloneSymbol = cloneSymbol

  /**
   * Creates a clone of `typedArray`.
   *
   * @private
   * @param {Object} typedArray The typed array to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned typed array.
   */
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep
      ? _cloneArrayBuffer(typedArray.buffer)
      : typedArray.buffer
    return new typedArray.constructor(
      buffer,
      typedArray.byteOffset,
      typedArray.length
    )
  }

  var _cloneTypedArray = cloneTypedArray

  /** `Object#toString` result references. */
  var boolTag$2 = '[object Boolean]',
    dateTag$2 = '[object Date]',
    mapTag$3 = '[object Map]',
    numberTag$2 = '[object Number]',
    regexpTag$2 = '[object RegExp]',
    setTag$3 = '[object Set]',
    stringTag$2 = '[object String]',
    symbolTag$2 = '[object Symbol]'

  var arrayBufferTag$2 = '[object ArrayBuffer]',
    dataViewTag$3 = '[object DataView]',
    float32Tag$1 = '[object Float32Array]',
    float64Tag$1 = '[object Float64Array]',
    int8Tag$1 = '[object Int8Array]',
    int16Tag$1 = '[object Int16Array]',
    int32Tag$1 = '[object Int32Array]',
    uint8Tag$1 = '[object Uint8Array]',
    uint8ClampedTag$1 = '[object Uint8ClampedArray]',
    uint16Tag$1 = '[object Uint16Array]',
    uint32Tag$1 = '[object Uint32Array]'

  /**
   * Initializes an object clone based on its `toStringTag`.
   *
   * **Note:** This function only supports cloning values with tags of
   * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
   *
   * @private
   * @param {Object} object The object to clone.
   * @param {string} tag The `toStringTag` of the object to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneByTag(object, tag, isDeep) {
    var Ctor = object.constructor
    switch (tag) {
      case arrayBufferTag$2:
        return _cloneArrayBuffer(object)

      case boolTag$2:
      case dateTag$2:
        return new Ctor(+object)

      case dataViewTag$3:
        return _cloneDataView(object, isDeep)

      case float32Tag$1:
      case float64Tag$1:
      case int8Tag$1:
      case int16Tag$1:
      case int32Tag$1:
      case uint8Tag$1:
      case uint8ClampedTag$1:
      case uint16Tag$1:
      case uint32Tag$1:
        return _cloneTypedArray(object, isDeep)

      case mapTag$3:
        return new Ctor()

      case numberTag$2:
      case stringTag$2:
        return new Ctor(object)

      case regexpTag$2:
        return _cloneRegExp(object)

      case setTag$3:
        return new Ctor()

      case symbolTag$2:
        return _cloneSymbol(object)
    }
  }

  var _initCloneByTag = initCloneByTag

  /** Built-in value references. */
  var objectCreate = Object.create

  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} proto The object to inherit from.
   * @returns {Object} Returns the new object.
   */
  var baseCreate = (function() {
    function object() {}
    return function(proto) {
      if (!isObject_1(proto)) {
        return {}
      }
      if (objectCreate) {
        return objectCreate(proto)
      }
      object.prototype = proto
      var result = new object()
      object.prototype = undefined
      return result
    }
  })()

  var _baseCreate = baseCreate

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneObject(object) {
    return typeof object.constructor == 'function' && !_isPrototype(object)
      ? _baseCreate(_getPrototype(object))
      : {}
  }

  var _initCloneObject = initCloneObject

  /** `Object#toString` result references. */
  var mapTag$4 = '[object Map]'

  /**
   * The base implementation of `_.isMap` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a map, else `false`.
   */
  function baseIsMap(value) {
    return isObjectLike_1(value) && _getTag(value) == mapTag$4
  }

  var _baseIsMap = baseIsMap

  /* Node.js helper references. */
  var nodeIsMap = _nodeUtil && _nodeUtil.isMap

  /**
   * Checks if `value` is classified as a `Map` object.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a map, else `false`.
   * @example
   *
   * _.isMap(new Map);
   * // => true
   *
   * _.isMap(new WeakMap);
   * // => false
   */
  var isMap = nodeIsMap ? _baseUnary(nodeIsMap) : _baseIsMap

  var isMap_1 = isMap

  /** `Object#toString` result references. */
  var setTag$4 = '[object Set]'

  /**
   * The base implementation of `_.isSet` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a set, else `false`.
   */
  function baseIsSet(value) {
    return isObjectLike_1(value) && _getTag(value) == setTag$4
  }

  var _baseIsSet = baseIsSet

  /* Node.js helper references. */
  var nodeIsSet = _nodeUtil && _nodeUtil.isSet

  /**
   * Checks if `value` is classified as a `Set` object.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a set, else `false`.
   * @example
   *
   * _.isSet(new Set);
   * // => true
   *
   * _.isSet(new WeakSet);
   * // => false
   */
  var isSet = nodeIsSet ? _baseUnary(nodeIsSet) : _baseIsSet

  var isSet_1 = isSet

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4

  /** `Object#toString` result references. */
  var argsTag$3 = '[object Arguments]',
    arrayTag$2 = '[object Array]',
    boolTag$3 = '[object Boolean]',
    dateTag$3 = '[object Date]',
    errorTag$2 = '[object Error]',
    funcTag$2 = '[object Function]',
    genTag$1 = '[object GeneratorFunction]',
    mapTag$5 = '[object Map]',
    numberTag$3 = '[object Number]',
    objectTag$3 = '[object Object]',
    regexpTag$3 = '[object RegExp]',
    setTag$5 = '[object Set]',
    stringTag$3 = '[object String]',
    symbolTag$3 = '[object Symbol]',
    weakMapTag$2 = '[object WeakMap]'

  var arrayBufferTag$3 = '[object ArrayBuffer]',
    dataViewTag$4 = '[object DataView]',
    float32Tag$2 = '[object Float32Array]',
    float64Tag$2 = '[object Float64Array]',
    int8Tag$2 = '[object Int8Array]',
    int16Tag$2 = '[object Int16Array]',
    int32Tag$2 = '[object Int32Array]',
    uint8Tag$2 = '[object Uint8Array]',
    uint8ClampedTag$2 = '[object Uint8ClampedArray]',
    uint16Tag$2 = '[object Uint16Array]',
    uint32Tag$2 = '[object Uint32Array]'

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {}
  cloneableTags[argsTag$3] = cloneableTags[arrayTag$2] = cloneableTags[
    arrayBufferTag$3
  ] = cloneableTags[dataViewTag$4] = cloneableTags[boolTag$3] = cloneableTags[
    dateTag$3
  ] = cloneableTags[float32Tag$2] = cloneableTags[float64Tag$2] = cloneableTags[
    int8Tag$2
  ] = cloneableTags[int16Tag$2] = cloneableTags[int32Tag$2] = cloneableTags[
    mapTag$5
  ] = cloneableTags[numberTag$3] = cloneableTags[objectTag$3] = cloneableTags[
    regexpTag$3
  ] = cloneableTags[setTag$5] = cloneableTags[stringTag$3] = cloneableTags[
    symbolTag$3
  ] = cloneableTags[uint8Tag$2] = cloneableTags[
    uint8ClampedTag$2
  ] = cloneableTags[uint16Tag$2] = cloneableTags[uint32Tag$2] = true
  cloneableTags[errorTag$2] = cloneableTags[funcTag$2] = cloneableTags[
    weakMapTag$2
  ] = false

  /**
   * The base implementation of `_.clone` and `_.cloneDeep` which tracks
   * traversed objects.
   *
   * @private
   * @param {*} value The value to clone.
   * @param {boolean} bitmask The bitmask flags.
   *  1 - Deep clone
   *  2 - Flatten inherited properties
   *  4 - Clone symbols
   * @param {Function} [customizer] The function to customize cloning.
   * @param {string} [key] The key of `value`.
   * @param {Object} [object] The parent object of `value`.
   * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
   * @returns {*} Returns the cloned value.
   */
  function baseClone(value, bitmask, customizer, key, object, stack) {
    var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG

    if (customizer) {
      result = object
        ? customizer(value, key, object, stack)
        : customizer(value)
    }
    if (result !== undefined) {
      return result
    }
    if (!isObject_1(value)) {
      return value
    }
    var isArr = isArray_1(value)
    if (isArr) {
      result = _initCloneArray(value)
      if (!isDeep) {
        return _copyArray(value, result)
      }
    } else {
      var tag = _getTag(value),
        isFunc = tag == funcTag$2 || tag == genTag$1

      if (isBuffer_1(value)) {
        return _cloneBuffer(value, isDeep)
      }
      if (tag == objectTag$3 || tag == argsTag$3 || (isFunc && !object)) {
        result = isFlat || isFunc ? {} : _initCloneObject(value)
        if (!isDeep) {
          return isFlat
            ? _copySymbolsIn(value, _baseAssignIn(result, value))
            : _copySymbols(value, _baseAssign(result, value))
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {}
        }
        result = _initCloneByTag(value, tag, isDeep)
      }
    }
    // Check for circular references and return its corresponding clone.
    stack || (stack = new _Stack())
    var stacked = stack.get(value)
    if (stacked) {
      return stacked
    }
    stack.set(value, result)

    if (isSet_1(value)) {
      value.forEach(function(subValue) {
        result.add(
          baseClone(subValue, bitmask, customizer, subValue, value, stack)
        )
      })

      return result
    }

    if (isMap_1(value)) {
      value.forEach(function(subValue, key) {
        result.set(
          key,
          baseClone(subValue, bitmask, customizer, key, value, stack)
        )
      })

      return result
    }

    var keysFunc = isFull
      ? isFlat
        ? _getAllKeysIn
        : _getAllKeys
      : isFlat
      ? keysIn
      : keys_1

    var props = isArr ? undefined : keysFunc(value)
    _arrayEach(props || value, function(subValue, key) {
      if (props) {
        key = subValue
        subValue = value[key]
      }
      // Recursively populate clone (susceptible to call stack limits).
      _assignValue(
        result,
        key,
        baseClone(subValue, bitmask, customizer, key, value, stack)
      )
    })
    return result
  }

  var _baseClone = baseClone

  /**
   * Gets the last element of `array`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to query.
   * @returns {*} Returns the last element of `array`.
   * @example
   *
   * _.last([1, 2, 3]);
   * // => 3
   */
  function last(array) {
    var length = array == null ? 0 : array.length
    return length ? array[length - 1] : undefined
  }

  var last_1 = last

  /**
   * Gets the parent value at `path` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} path The path to get the parent value of.
   * @returns {*} Returns the parent value.
   */
  function parent(object, path) {
    return path.length < 2 ? object : _baseGet(object, _baseSlice(path, 0, -1))
  }

  var _parent = parent

  /**
   * The base implementation of `_.unset`.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {Array|string} path The property path to unset.
   * @returns {boolean} Returns `true` if the property is deleted, else `false`.
   */
  function baseUnset(object, path) {
    path = _castPath(path, object)
    object = _parent(object, path)
    return object == null || delete object[_toKey(last_1(path))]
  }

  var _baseUnset = baseUnset

  /** `Object#toString` result references. */
  var objectTag$4 = '[object Object]'

  /** Used for built-in method references. */
  var funcProto$2 = Function.prototype,
    objectProto$f = Object.prototype

  /** Used to resolve the decompiled source of functions. */
  var funcToString$2 = funcProto$2.toString

  /** Used to check objects for own properties. */
  var hasOwnProperty$d = objectProto$f.hasOwnProperty

  /** Used to infer the `Object` constructor. */
  var objectCtorString = funcToString$2.call(Object)

  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * @static
   * @memberOf _
   * @since 0.8.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */
  function isPlainObject(value) {
    if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag$4) {
      return false
    }
    var proto = _getPrototype(value)
    if (proto === null) {
      return true
    }
    var Ctor = hasOwnProperty$d.call(proto, 'constructor') && proto.constructor
    return (
      typeof Ctor == 'function' &&
      Ctor instanceof Ctor &&
      funcToString$2.call(Ctor) == objectCtorString
    )
  }

  var isPlainObject_1 = isPlainObject

  /**
   * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
   * objects.
   *
   * @private
   * @param {*} value The value to inspect.
   * @param {string} key The key of the property to inspect.
   * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
   */
  function customOmitClone(value) {
    return isPlainObject_1(value) ? undefined : value
  }

  var _customOmitClone = customOmitClone

  /**
   * Flattens `array` a single level deep.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to flatten.
   * @returns {Array} Returns the new flattened array.
   * @example
   *
   * _.flatten([1, [2, [3, [4]], 5]]);
   * // => [1, 2, [3, [4]], 5]
   */
  function flatten(array) {
    var length = array == null ? 0 : array.length
    return length ? _baseFlatten(array, 1) : []
  }

  var flatten_1 = flatten

  /**
   * A specialized version of `baseRest` which flattens the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @returns {Function} Returns the new function.
   */
  function flatRest(func) {
    return _setToString(_overRest(func, undefined, flatten_1), func + '')
  }

  var _flatRest = flatRest

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG$1 = 1,
    CLONE_FLAT_FLAG$1 = 2,
    CLONE_SYMBOLS_FLAG$1 = 4

  /**
   * The opposite of `_.pick`; this method creates an object composed of the
   * own and inherited enumerable property paths of `object` that are not omitted.
   *
   * **Note:** This method is considerably slower than `_.pick`.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The source object.
   * @param {...(string|string[])} [paths] The property paths to omit.
   * @returns {Object} Returns the new object.
   * @example
   *
   * var object = { 'a': 1, 'b': '2', 'c': 3 };
   *
   * _.omit(object, ['a', 'c']);
   * // => { 'b': '2' }
   */
  var omit = _flatRest(function(object, paths) {
    var result = {}
    if (object == null) {
      return result
    }
    var isDeep = false
    paths = _arrayMap(paths, function(path) {
      path = _castPath(path, object)
      isDeep || (isDeep = path.length > 1)
      return path
    })
    _copyObject(object, _getAllKeysIn(object), result)
    if (isDeep) {
      result = _baseClone(
        result,
        CLONE_DEEP_FLAG$1 | CLONE_FLAT_FLAG$1 | CLONE_SYMBOLS_FLAG$1,
        _customOmitClone
      )
    }
    var length = paths.length
    while (length--) {
      _baseUnset(result, paths[length])
    }
    return result
  })

  var omit_1 = omit

  /** Used for built-in method references. */
  var objectProto$g = Object.prototype

  /** Used to check objects for own properties. */
  var hasOwnProperty$e = objectProto$g.hasOwnProperty

  /**
   * Assigns own and inherited enumerable string keyed properties of source
   * objects to the destination object for all destination properties that
   * resolve to `undefined`. Source objects are applied from left to right.
   * Once a property is set, additional values of the same property are ignored.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @see _.defaultsDeep
   * @example
   *
   * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
   * // => { 'a': 1, 'b': 2 }
   */
  var defaults = _baseRest(function(object, sources) {
    object = Object(object)

    var index = -1
    var length = sources.length
    var guard = length > 2 ? sources[2] : undefined

    if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
      length = 1
    }

    while (++index < length) {
      var source = sources[index]
      var props = keysIn_1(source)
      var propsIndex = -1
      var propsLength = props.length

      while (++propsIndex < propsLength) {
        var key = props[propsIndex]
        var value = object[key]

        if (
          value === undefined ||
          (eq_1(value, objectProto$g[key]) &&
            !hasOwnProperty$e.call(object, key))
        ) {
          object[key] = source[key]
        }
      }
    }

    return object
  })

  var defaults_1 = defaults

  /**
   * An alternative to `_.reduce`; this method transforms `object` to a new
   * `accumulator` object which is the result of running each of its own
   * enumerable string keyed properties thru `iteratee`, with each invocation
   * potentially mutating the `accumulator` object. If `accumulator` is not
   * provided, a new object with the same `[[Prototype]]` will be used. The
   * iteratee is invoked with four arguments: (accumulator, value, key, object).
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @static
   * @memberOf _
   * @since 1.3.0
   * @category Object
   * @param {Object} object The object to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @param {*} [accumulator] The custom accumulator value.
   * @returns {*} Returns the accumulated value.
   * @example
   *
   * _.transform([2, 3, 4], function(result, n) {
   *   result.push(n *= n);
   *   return n % 2 == 0;
   * }, []);
   * // => [4, 9]
   *
   * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
   *   (result[value] || (result[value] = [])).push(key);
   * }, {});
   * // => { '1': ['a', 'c'], '2': ['b'] }
   */
  function transform(object, iteratee, accumulator) {
    var isArr = isArray_1(object),
      isArrLike = isArr || isBuffer_1(object) || isTypedArray_1(object)

    iteratee = _baseIteratee(iteratee, 4)
    if (accumulator == null) {
      var Ctor = object && object.constructor
      if (isArrLike) {
        accumulator = isArr ? new Ctor() : []
      } else if (isObject_1(object)) {
        accumulator = isFunction_1(Ctor)
          ? _baseCreate(_getPrototype(object))
          : {}
      } else {
        accumulator = {}
      }
    }
    ;(isArrLike
      ? _arrayEach
      : _baseForOwn)(object, function(value, index, object) {
      return iteratee(accumulator, value, index, object)
    })
    return accumulator
  }

  var transform_1 = transform

  /**
   * Creates an object with the same keys as `object` and values generated
   * by running each own enumerable string keyed property of `object` thru
   * `iteratee`. The iteratee is invoked with three arguments:
   * (value, key, object).
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Object
   * @param {Object} object The object to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Object} Returns the new mapped object.
   * @see _.mapKeys
   * @example
   *
   * var users = {
   *   'fred':    { 'user': 'fred',    'age': 40 },
   *   'pebbles': { 'user': 'pebbles', 'age': 1 }
   * };
   *
   * _.mapValues(users, function(o) { return o.age; });
   * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
   *
   * // The `_.property` iteratee shorthand.
   * _.mapValues(users, 'age');
   * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
   */
  function mapValues(object, iteratee) {
    var result = {}
    iteratee = _baseIteratee(iteratee, 3)

    _baseForOwn(object, function(value, key, object) {
      _baseAssignValue(result, key, iteratee(value, key, object))
    })
    return result
  }

  var mapValues_1 = mapValues

  /**
   * Retrieve via an accessor-like property
   *
   *    accessor(obj, 'name')   // => retrieves obj['name']
   *    accessor(data, func)    // => retrieves func(data)
   *    ... otherwise null
   */
  function accessor$1(data, field) {
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
      return accessor$1(data, acc)
    }
  }

  function viewNames$1(_views) {
    return !Array.isArray(_views) ? Object.keys(_views) : _views
  }

  function isValidView(view, _ref) {
    var _views = _ref.views
    var names = viewNames$1(_views)
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
      _inheritsLoose(Calendar, _React$Component)

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
          _React$Component.call.apply(_React$Component, [this].concat(_args)) ||
          this

        _this.getViews = function() {
          var views$$1 = _this.props.views

          if (Array.isArray(views$$1)) {
            return transform_1(
              views$$1,
              function(obj, name) {
                return (obj[name] = VIEWS[name])
              },
              {}
            )
          }

          if (typeof views$$1 === 'object') {
            return mapValues_1(views$$1, function(value, key) {
              if (value === true) {
                return VIEWS[key]
              }

              return value
            })
          }

          return VIEWS
        }

        _this.getView = function() {
          var views$$1 = _this.getViews()

          return views$$1[_this.props.view]
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
              warning_1(true, 'onRangeChange prop not supported for this view')
            }
          }
        }

        _this.handleNavigate = function(action, newDate) {
          var _this$props3 = _this.props,
            view = _this$props3.view,
            date = _this$props3.date,
            getNow = _this$props3.getNow,
            onNavigate = _this$props3.onNavigate,
            props = _objectWithoutPropertiesLoose(_this$props3, [
              'view',
              'date',
              'getNow',
              'onNavigate',
            ])

          var ViewComponent = _this.getView()

          var today = getNow()
          date = moveDate(
            ViewComponent,
            _extends({}, props, {
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

          var views$$1 = _this.getViews()

          _this.handleRangeChange(
            _this.props.date || _this.props.getNow(),
            views$$1[view],
            view
          )
        }

        _this.handleSelectEvent = function() {
          for (
            var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
            _key2 < _len2;
            _key2++
          ) {
            args[_key2] = arguments[_key2]
          }

          notify(_this.props.onSelectEvent, args)
        }

        _this.handleDoubleClickEvent = function() {
          for (
            var _len3 = arguments.length, args = new Array(_len3), _key3 = 0;
            _key3 < _len3;
            _key3++
          ) {
            args[_key3] = arguments[_key3]
          }

          notify(_this.props.onDoubleClickEvent, args)
        }

        _this.handleSelectSlot = function(slotInfo) {
          notify(_this.props.onSelectSlot, slotInfo)
        }

        _this.handleDrillDown = function(date, view) {
          var onDrillDown = _this.props.onDrillDown

          if (onDrillDown) {
            onDrillDown(date, view, _this.drilldownView)
            return
          }

          if (view) _this.handleViewChange(view)

          _this.handleNavigate(navigate.DATE, date)
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
          views$$1 = _ref2.views,
          localizer = _ref2.localizer,
          culture = _ref2.culture,
          _ref2$messages = _ref2.messages,
          messages$$1 = _ref2$messages === void 0 ? {} : _ref2$messages,
          _ref2$components = _ref2.components,
          components = _ref2$components === void 0 ? {} : _ref2$components,
          _ref2$formats = _ref2.formats,
          formats = _ref2$formats === void 0 ? {} : _ref2$formats
        var names = viewNames$1(views$$1)
        var msgs = messages(messages$$1)
        return {
          viewNames: names,
          localizer: mergeWithDefaults(localizer, culture, formats, msgs),
          getters: {
            eventProp: function eventProp() {
              return (
                (eventPropGetter && eventPropGetter.apply(void 0, arguments)) ||
                {}
              )
            },
            slotProp: function slotProp() {
              return (
                (slotPropGetter && slotPropGetter.apply(void 0, arguments)) ||
                {}
              )
            },
            dayProp: function dayProp() {
              return (
                (dayPropGetter && dayPropGetter.apply(void 0, arguments)) || {}
              )
            },
          },
          components: defaults_1(
            components[view] || {},
            omit_1(components, names),
            {
              eventWrapper: NoopWrapper,
              eventContainerWrapper: NoopWrapper,
              dayWrapper: NoopWrapper,
              dateCellWrapper: NoopWrapper,
              weekWrapper: NoopWrapper,
              timeSlotWrapper: NoopWrapper,
            }
          ),
          accessors: {
            start: wrapAccessor(startAccessor),
            end: wrapAccessor(endAccessor),
            allDay: wrapAccessor(allDayAccessor),
            tooltip: wrapAccessor(tooltipAccessor),
            title: wrapAccessor(titleAccessor),
            resource: wrapAccessor(resourceAccessor),
            resourceId: wrapAccessor(resourceIdAccessor),
            resourceTitle: wrapAccessor(resourceTitleAccessor),
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
          props = _objectWithoutPropertiesLoose(_this$props4, [
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
          ])

        current = current || getNow()
        var View = this.getView()
        var _this$state$context = this.state.context,
          accessors = _this$state$context.accessors,
          components = _this$state$context.components,
          getters = _this$state$context.getters,
          localizer = _this$state$context.localizer,
          viewNames = _this$state$context.viewNames
        var CalToolbar = components.toolbar || Toolbar
        var label = View.title(current, {
          localizer: localizer,
          length: length,
        })
        return React__default.createElement(
          'div',
          _extends({}, elementProps, {
            className: classnames(
              className,
              'rbc-calendar',
              props.rtl && 'rbc-is-rtl'
            ),
            style: style,
          }),
          toolbar &&
            React__default.createElement(CalToolbar, {
              date: current,
              view: view,
              views: viewNames,
              label: label,
              onView: this.handleViewChange,
              onNavigate: this.handleNavigate,
              localizer: localizer,
            }),
          React__default.createElement(
            View,
            _extends(
              {
                ref: 'view',
              },
              props,
              {
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
              }
            )
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
    })(React__default.Component)

  Calendar.defaultProps = {
    elementProps: {},
    popup: false,
    toolbar: true,
    view: views.MONTH,
    views: [views.MONTH, views.WEEK, views.DAY, views.AGENDA],
    step: 30,
    length: 30,
    drilldownView: views.DAY,
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
  Calendar.propTypes = {
    localizer: propTypes.object.isRequired,

    /**
     * Props passed to main calendar `<div>`.
     *
     */
    elementProps: propTypes.object,

    /**
     * The current date value of the calendar. Determines the visible view range.
     * If `date` is omitted then the result of `getNow` is used; otherwise the
     * current date is used.
     *
     * @controllable onNavigate
     */
    date: propTypes.instanceOf(Date),

    /**
     * The current view of the calendar.
     *
     * @default 'month'
     * @controllable onView
     */
    view: propTypes.string,

    /**
     * The initial view set for the Calendar.
     * @type Calendar.Views ('month'|'week'|'work_week'|'day'|'agenda')
     * @default 'month'
     */
    defaultView: propTypes.string,

    /**
     * An array of event objects to display on the calendar. Events objects
     * can be any shape, as long as the Calendar knows how to retrieve the
     * following details of the event:
     *
     *  - start time
     *  - end time
     *  - title
     *  - whether its an "all day" event or not
     *  - any resource the event may be related to
     *
     * Each of these properties can be customized or generated dynamically by
     * setting the various "accessor" props. Without any configuration the default
     * event should look like:
     *
     * ```js
     * Event {
     *   title: string,
     *   start: Date,
     *   end: Date,
     *   allDay?: boolean
     *   resource?: any,
     * }
     * ```
     */
    events: propTypes.arrayOf(propTypes.object),

    /**
     * Accessor for the event title, used to display event information. Should
     * resolve to a `renderable` value.
     *
     * ```js
     * string | (event: Object) => string
     * ```
     *
     * @type {(func|string)}
     */
    titleAccessor: accessor,

    /**
     * Accessor for the event tooltip. Should
     * resolve to a `renderable` value. Removes the tooltip if null.
     *
     * ```js
     * string | (event: Object) => string
     * ```
     *
     * @type {(func|string)}
     */
    tooltipAccessor: accessor,

    /**
     * Determines whether the event should be considered an "all day" event and ignore time.
     * Must resolve to a `boolean` value.
     *
     * ```js
     * string | (event: Object) => boolean
     * ```
     *
     * @type {(func|string)}
     */
    allDayAccessor: accessor,

    /**
     * The start date/time of the event. Must resolve to a JavaScript `Date` object.
     *
     * ```js
     * string | (event: Object) => Date
     * ```
     *
     * @type {(func|string)}
     */
    startAccessor: accessor,

    /**
     * The end date/time of the event. Must resolve to a JavaScript `Date` object.
     *
     * ```js
     * string | (event: Object) => Date
     * ```
     *
     * @type {(func|string)}
     */
    endAccessor: accessor,

    /**
     * Returns the id of the `resource` that the event is a member of. This
     * id should match at least one resource in the `resources` array.
     *
     * ```js
     * string | (event: Object) => Date
     * ```
     *
     * @type {(func|string)}
     */
    resourceAccessor: accessor,

    /**
     * An array of resource objects that map events to a specific resource.
     * Resource objects, like events, can be any shape or have any properties,
     * but should be uniquly identifiable via the `resourceIdAccessor`, as
     * well as a "title" or name as provided by the `resourceTitleAccessor` prop.
     */
    resources: propTypes.arrayOf(propTypes.object),

    /**
     * Provides a unique identifier for each resource in the `resources` array
     *
     * ```js
     * string | (resource: Object) => any
     * ```
     *
     * @type {(func|string)}
     */
    resourceIdAccessor: accessor,

    /**
     * Provides a human readable name for the resource object, used in headers.
     *
     * ```js
     * string | (resource: Object) => any
     * ```
     *
     * @type {(func|string)}
     */
    resourceTitleAccessor: accessor,

    /**
     * Determines the current date/time which is highlighted in the views.
     *
     * The value affects which day is shaded and which time is shown as
     * the current time. It also affects the date used by the Today button in
     * the toolbar.
     *
     * Providing a value here can be useful when you are implementing time zones
     * using the `startAccessor` and `endAccessor` properties.
     *
     * @type {func}
     * @default () => new Date()
     */
    getNow: propTypes.func,

    /**
     * Callback fired when the `date` value changes.
     *
     * @controllable date
     */
    onNavigate: propTypes.func,

    /**
     * Callback fired when the `view` value changes.
     *
     * @controllable view
     */
    onView: propTypes.func,

    /**
     * Callback fired when date header, or the truncated events links are clicked
     *
     */
    onDrillDown: propTypes.func,

    /**
     *
     * ```js
     * (dates: Date[] | { start: Date; end: Date }, view?: 'month'|'week'|'work_week'|'day'|'agenda') => void
     * ```
     *
     * Callback fired when the visible date range changes. Returns an Array of dates
     * or an object with start and end dates for BUILTIN views. Optionally new `view`
     * will be returned when callback called after view change.
     *
     * Custom views may return something different.
     */
    onRangeChange: propTypes.func,

    /**
     * A callback fired when a date selection is made. Only fires when `selectable` is `true`.
     *
     * ```js
     * (
     *   slotInfo: {
     *     start: Date,
     *     end: Date,
     *     slots: Array<Date>,
     *     action: "select" | "click" | "doubleClick",
     *     bounds: ?{ // For "select" action
     *       x: number,
     *       y: number,
     *       top: number,
     *       right: number,
     *       left: number,
     *       bottom: number,
     *     },
     *     box: ?{ // For "click" or "doubleClick" actions
     *       clientX: number,
     *       clientY: number,
     *       x: number,
     *       y: number,
     *     },
     *   }
     * ) => any
     * ```
     */
    onSelectSlot: propTypes.func,

    /**
     * Callback fired when a calendar event is selected.
     *
     * ```js
     * (event: Object, e: SyntheticEvent) => any
     * ```
     *
     * @controllable selected
     */
    onSelectEvent: propTypes.func,

    /**
     * Callback fired when a calendar event is clicked twice.
     *
     * ```js
     * (event: Object, e: SyntheticEvent) => void
     * ```
     */
    onDoubleClickEvent: propTypes.func,

    /**
     * Callback fired when dragging a selection in the Time views.
     *
     * Returning `false` from the handler will prevent a selection.
     *
     * ```js
     * (range: { start: Date, end: Date }) => ?boolean
     * ```
     */
    onSelecting: propTypes.func,

    /**
     * Callback fired when a +{count} more is clicked
     *
     * ```js
     * (events: Object, date: Date) => any
     * ```
     */
    onShowMore: propTypes.func,

    /**
     * The selected event, if any.
     */
    selected: propTypes.object,

    /**
     * An array of built-in view names to allow the calendar to display.
     * accepts either an array of builtin view names,
     *
     * ```jsx
     * views={['month', 'day', 'agenda']}
     * ```
     * or an object hash of the view name and the component (or boolean for builtin).
     *
     * ```jsx
     * views={{
     *   month: true,
     *   week: false,
     *   myweek: WorkWeekViewComponent,
     * }}
     * ```
     *
     * Custom views can be any React component, that implements the following
     * interface:
     *
     * ```js
     * interface View {
     *   static title(date: Date, { formats: DateFormat[], culture: string?, ...props }): string
     *   static navigate(date: Date, action: 'PREV' | 'NEXT' | 'DATE'): Date
     * }
     * ```
     *
     * @type Calendar.Views ('month'|'week'|'work_week'|'day'|'agenda')
     * @View
     ['month', 'week', 'day', 'agenda']
     */
    views: views$1,

    /**
     * The string name of the destination view for drill-down actions, such
     * as clicking a date header, or the truncated events links. If
     * `getDrilldownView` is also specified it will be used instead.
     *
     * Set to `null` to disable drill-down actions.
     *
     * ```js
     * <BigCalendar
     *   drilldownView="agenda"
     * />
     * ```
     */
    drilldownView: propTypes.string,

    /**
     * Functionally equivalent to `drilldownView`, but accepts a function
     * that can return a view name. It's useful for customizing the drill-down
     * actions depending on the target date and triggering view.
     *
     * Return `null` to disable drill-down actions.
     *
     * ```js
     * <BigCalendar
     *   getDrilldownView={(targetDate, currentViewName, configuredViewNames) =>
     *     if (currentViewName === 'month' && configuredViewNames.includes('week'))
     *       return 'week'
     *
     *     return null;
     *   }}
     * />
     * ```
     */
    getDrilldownView: propTypes.func,

    /**
     * Determines the end date from date prop in the agenda view
     * date prop + length (in number of days) = end date
     */
    length: propTypes.number,

    /**
     * Determines whether the toolbar is displayed
     */
    toolbar: propTypes.bool,

    /**
     * Show truncated events in an overlay when you click the "+_x_ more" link.
     */
    popup: propTypes.bool,

    /**
     * Distance in pixels, from the edges of the viewport, the "show more" overlay should be positioned.
     *
     * ```jsx
     * <BigCalendar popupOffset={30}/>
     * <BigCalendar popupOffset={{x: 30, y: 20}}/>
     * ```
     */
    popupOffset: propTypes.oneOfType([
      propTypes.number,
      propTypes.shape({
        x: propTypes.number,
        y: propTypes.number,
      }),
    ]),

    /**
     * Allows mouse selection of ranges of dates/times.
     *
     * The 'ignoreEvents' option prevents selection code from running when a
     * drag begins over an event. Useful when you want custom event click or drag
     * logic
     */
    selectable: propTypes.oneOf([true, false, 'ignoreEvents']),

    /**
     * Specifies the number of miliseconds the user must press and hold on the screen for a touch
     * to be considered a "long press." Long presses are used for time slot selection on touch
     * devices.
     *
     * @type {number}
     * @default 250
     */
    longPressThreshold: propTypes.number,

    /**
     * Determines the selectable time increments in week and day views
     */
    step: propTypes.number,

    /**
     * The number of slots per "section" in the time grid views. Adjust with `step`
     * to change the default of 1 hour long groups, with 30 minute slots.
     */
    timeslots: propTypes.number,

    /**
     *Switch the calendar to a `right-to-left` read direction.
     */
    rtl: propTypes.bool,

    /**
     * Optionally provide a function that returns an object of className or style props
     * to be applied to the the event node.
     *
     * ```js
     * (
     * 	event: Object,
     * 	start: Date,
     * 	end: Date,
     * 	isSelected: boolean
     * ) => { className?: string, style?: Object }
     * ```
     */
    eventPropGetter: propTypes.func,

    /**
     * Optionally provide a function that returns an object of className or style props
     * to be applied to the the time-slot node. Caution! Styles that change layout or
     * position may break the calendar in unexpected ways.
     *
     * ```js
     * (date: Date, resourceId: (number|string)) => { className?: string, style?: Object }
     * ```
     */
    slotPropGetter: propTypes.func,

    /**
     * Optionally provide a function that returns an object of className or style props
     * to be applied to the the day background. Caution! Styles that change layout or
     * position may break the calendar in unexpected ways.
     *
     * ```js
     * (date: Date) => { className?: string, style?: Object }
     * ```
     */
    dayPropGetter: propTypes.func,

    /**
     * Support to show multi-day events with specific start and end times in the
     * main time grid (rather than in the all day header).
     *
     * **Note: This may cause calendars with several events to look very busy in
     * the week and day views.**
     */
    showMultiDayTimes: propTypes.bool,

    /**
     * Constrains the minimum _time_ of the Day and Week views.
     */
    min: propTypes.instanceOf(Date),

    /**
     * Constrains the maximum _time_ of the Day and Week views.
     */
    max: propTypes.instanceOf(Date),

    /**
     * Determines how far down the scroll pane is initially scrolled down.
     */
    scrollToTime: propTypes.instanceOf(Date),

    /**
     * Specify a specific culture code for the Calendar.
     *
     * **Note: it's generally better to handle this globally via your i18n library.**
     */
    culture: propTypes.string,

    /**
     * Localizer specific formats, tell the Calendar how to format and display dates.
     *
     * `format` types are dependent on the configured localizer; both Moment and Globalize
     * accept strings of tokens according to their own specification, such as: `'DD mm yyyy'`.
     *
     * ```jsx
     * let formats = {
     *   dateFormat: 'dd',
     *
     *   dayFormat: (date, , localizer) =>
     *     localizer.format(date, 'DDD', culture),
     *
     *   dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
     *     localizer.format(start, { date: 'short' }, culture) + ' — ' +
     *     localizer.format(end, { date: 'short' }, culture)
     * }
     *
     * <Calendar formats={formats} />
     * ```
     *
     * All localizers accept a function of
     * the form `(date: Date, culture: ?string, localizer: Localizer) -> string`
     */
    formats: propTypes.shape({
      /**
       * Format for the day of the month heading in the Month view.
       * e.g. "01", "02", "03", etc
       */
      dateFormat: dateFormat,

      /**
       * A day of the week format for Week and Day headings,
       * e.g. "Wed 01/04"
       *
       */
      dayFormat: dateFormat,

      /**
       * Week day name format for the Month week day headings,
       * e.g: "Sun", "Mon", "Tue", etc
       *
       */
      weekdayFormat: dateFormat,

      /**
       * The timestamp cell formats in Week and Time views, e.g. "4:00 AM"
       */
      timeGutterFormat: dateFormat,

      /**
       * Toolbar header format for the Month view, e.g "2015 April"
       *
       */
      monthHeaderFormat: dateFormat,

      /**
       * Toolbar header format for the Week views, e.g. "Mar 29 - Apr 04"
       */
      dayRangeHeaderFormat: dateRangeFormat,

      /**
       * Toolbar header format for the Day view, e.g. "Wednesday Apr 01"
       */
      dayHeaderFormat: dateFormat,

      /**
       * Toolbar header format for the Agenda view, e.g. "4/1/2015 — 5/1/2015"
       */
      agendaHeaderFormat: dateRangeFormat,

      /**
       * A time range format for selecting time slots, e.g "8:00am — 2:00pm"
       */
      selectRangeFormat: dateRangeFormat,
      agendaDateFormat: dateFormat,
      agendaTimeFormat: dateFormat,
      agendaTimeRangeFormat: dateRangeFormat,

      /**
       * Time range displayed on events.
       */
      eventTimeRangeFormat: dateRangeFormat,

      /**
       * An optional event time range for events that continue onto another day
       */
      eventTimeRangeStartFormat: dateFormat,

      /**
       * An optional event time range for events that continue from another day
       */
      eventTimeRangeEndFormat: dateFormat,
    }),

    /**
     * Customize how different sections of the calendar render by providing custom Components.
     * In particular the `Event` component can be specified for the entire calendar, or you can
     * provide an individual component for each view type.
     *
     * ```jsx
     * let components = {
     *   event: MyEvent, // used by each view (Month, Day, Week)
     *   eventWrapper: MyEventWrapper,
     *   eventContainerWrapper: MyEventContainerWrapper,
     *   dayWrapper: MyDayWrapper,
     *   dateCellWrapper: MyDateCellWrapper,
     *   timeSlotWrapper: MyTimeSlotWrapper,
     *   timeGutterHeader: MyTimeGutterWrapper,
     *   toolbar: MyToolbar,
     *   agenda: {
     *   	 event: MyAgendaEvent // with the agenda view use a different component to render events
     *     time: MyAgendaTime,
     *     date: MyAgendaDate,
     *   },
     *   day: {
     *     header: MyDayHeader,
     *     event: MyDayEvent,
     *   },
     *   week: {
     *     header: MyWeekHeader,
     *     event: MyWeekEvent,
     *   },
     *   month: {
     *     header: MyMonthHeader,
     *     dateHeader: MyMonthDateHeader,
     *     event: MyMonthEvent,
     *   }
     * }
     * <Calendar components={components} />
     * ```
     */
    components: propTypes.shape({
      event: elementType,
      eventWrapper: elementType,
      eventContainerWrapper: elementType,
      dayWrapper: elementType,
      dateCellWrapper: elementType,
      timeSlotWrapper: elementType,
      timeGutterHeader: elementType,
      resourceHeader: elementType,
      toolbar: elementType,
      agenda: propTypes.shape({
        date: elementType,
        time: elementType,
        event: elementType,
      }),
      day: propTypes.shape({
        header: elementType,
        event: elementType,
      }),
      week: propTypes.shape({
        header: elementType,
        event: elementType,
      }),
      month: propTypes.shape({
        header: elementType,
        dateHeader: elementType,
        event: elementType,
      }),
    }),

    /**
     * String messages used throughout the component, override to provide localizations
     */
    messages: propTypes.shape({
      allDay: propTypes.node,
      previous: propTypes.node,
      next: propTypes.node,
      today: propTypes.node,
      month: propTypes.node,
      week: propTypes.node,
      day: propTypes.node,
      agenda: propTypes.node,
      date: propTypes.node,
      time: propTypes.node,
      event: propTypes.node,
      noEventsInRange: propTypes.node,
      showMore: propTypes.func,
    }),
  }
  var Calendar$1 = uncontrollable(Calendar, {
    view: 'onView',
    date: 'onNavigate',
    selected: 'onSelectEvent',
  })

  var dateRangeFormat$1 = function dateRangeFormat(_ref, culture, local) {
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

  var timeRangeEndFormat = function timeRangeEndFormat(_ref4, culture, local) {
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
        dates.eq(start, end, 'month') ? 'DD' : 'MMMM DD',
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
    agendaHeaderFormat: dateRangeFormat$1,
    agendaDateFormat: 'ddd MMM DD',
    agendaTimeFormat: 'LT',
    agendaTimeRangeFormat: timeRangeFormat,
  }
  function momentLocalizer(moment) {
    var locale = function locale(m, c) {
      return c ? m.locale(c) : m
    }

    return new DateLocalizer({
      formats: formats,
      firstOfWeek: function firstOfWeek(culture) {
        var data = culture ? moment.localeData(culture) : moment.localeData()
        return data ? data.firstDayOfWeek() : 0
      },
      format: function format(value, _format, culture) {
        return locale(moment(value), culture).format(_format)
      },
    })
  }

  var dateRangeFormat$2 = function dateRangeFormat(_ref, culture, local) {
    var start = _ref.start,
      end = _ref.end
    return (
      local.format(start, 'd', culture) +
      ' — ' +
      local.format(end, 'd', culture)
    )
  }

  var timeRangeFormat$1 = function timeRangeFormat(_ref2, culture, local) {
    var start = _ref2.start,
      end = _ref2.end
    return (
      local.format(start, 't', culture) +
      ' — ' +
      local.format(end, 't', culture)
    )
  }

  var timeRangeStartFormat$1 = function timeRangeStartFormat(
    _ref3,
    culture,
    local
  ) {
    var start = _ref3.start
    return local.format(start, 't', culture) + ' — '
  }

  var timeRangeEndFormat$1 = function timeRangeEndFormat(
    _ref4,
    culture,
    local
  ) {
    var end = _ref4.end
    return ' — ' + local.format(end, 't', culture)
  }

  var weekRangeFormat$1 = function weekRangeFormat(_ref5, culture, local) {
    var start = _ref5.start,
      end = _ref5.end
    return (
      local.format(start, 'MMM dd', culture) +
      ' - ' +
      local.format(
        end,
        dates.eq(start, end, 'month') ? 'dd' : 'MMM dd',
        culture
      )
    )
  }

  var formats$1 = {
    dateFormat: 'dd',
    dayFormat: 'ddd dd/MM',
    weekdayFormat: 'ddd',
    selectRangeFormat: timeRangeFormat$1,
    eventTimeRangeFormat: timeRangeFormat$1,
    eventTimeRangeStartFormat: timeRangeStartFormat$1,
    eventTimeRangeEndFormat: timeRangeEndFormat$1,
    timeGutterFormat: 't',
    monthHeaderFormat: 'Y',
    dayHeaderFormat: 'dddd MMM dd',
    dayRangeHeaderFormat: weekRangeFormat$1,
    agendaHeaderFormat: dateRangeFormat$2,
    agendaDateFormat: 'ddd MMM dd',
    agendaTimeFormat: 't',
    agendaTimeRangeFormat: timeRangeFormat$1,
  }
  function oldGlobalize(globalize) {
    function getCulture(culture) {
      return culture
        ? globalize.findClosestCulture(culture)
        : globalize.culture()
    }

    function firstOfWeek(culture) {
      culture = getCulture(culture)
      return (culture && culture.calendar.firstDay) || 0
    }

    return new DateLocalizer({
      firstOfWeek: firstOfWeek,
      formats: formats$1,
      format: function format(value, _format, culture) {
        return globalize.format(value, _format, culture)
      },
    })
  }

  var dateRangeFormat$3 = function dateRangeFormat(_ref, culture, local) {
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

  var timeRangeFormat$2 = function timeRangeFormat(_ref2, culture, local) {
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

  var timeRangeStartFormat$2 = function timeRangeStartFormat(
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

  var timeRangeEndFormat$2 = function timeRangeEndFormat(
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

  var weekRangeFormat$2 = function weekRangeFormat(_ref5, culture, local) {
    var start = _ref5.start,
      end = _ref5.end
    return (
      local.format(start, 'MMM dd', culture) +
      ' — ' +
      local.format(
        end,
        dates.eq(start, end, 'month') ? 'dd' : 'MMM dd',
        culture
      )
    )
  }

  var formats$2 = {
    dateFormat: 'dd',
    dayFormat: 'eee dd/MM',
    weekdayFormat: 'eee',
    selectRangeFormat: timeRangeFormat$2,
    eventTimeRangeFormat: timeRangeFormat$2,
    eventTimeRangeStartFormat: timeRangeStartFormat$2,
    eventTimeRangeEndFormat: timeRangeEndFormat$2,
    timeGutterFormat: {
      time: 'short',
    },
    monthHeaderFormat: 'MMMM yyyy',
    dayHeaderFormat: 'eeee MMM dd',
    dayRangeHeaderFormat: weekRangeFormat$2,
    agendaHeaderFormat: dateRangeFormat$3,
    agendaDateFormat: 'eee MMM dd',
    agendaTimeFormat: {
      time: 'short',
    },
    agendaTimeRangeFormat: timeRangeFormat$2,
  }
  function globalizeLocalizer(globalize) {
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
        warning_1(
          true,
          'Failed to accurately determine first day of the week.\n            Is supplemental data loaded into CLDR?'
        ) // maybe cldr supplemental is not loaded? revert to original method

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

    if (!globalize.load) return oldGlobalize(globalize)
    return new DateLocalizer({
      firstOfWeek: firstOfWeek,
      formats: formats$2,
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

  _extends(Calendar$1, {
    globalizeLocalizer: globalizeLocalizer,
    momentLocalizer: momentLocalizer,
    Views: views,
    Navigate: navigate,
    move: moveDate,
    components: {
      eventWrapper: NoopWrapper,
      dayWrapper: NoopWrapper,
      dateCellWrapper: NoopWrapper,
    },
  })

  return Calendar$1
})
