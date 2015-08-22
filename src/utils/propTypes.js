import { PropTypes } from 'react';
import localizer from'./localizer';
import elementType from 'react-prop-types/lib/elementType';
import all from 'react-prop-types/lib/all';
import {createChainableTypeChecker} from 'react-prop-types/lib/common';

export { elementType }

export let eventComponent = PropTypes.oneOfType([
  elementType,
  PropTypes.shape({
    month: elementType,
    week: elementType,
    day: elementType,
    agenda: elementType
  })
])

export let accessor = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.func
])

export let dateFormat = createChainableTypeChecker(
    (...args) => localizer.propType && localizer.propType(...args))

export let views = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.string),
  all([
    PropTypes.object,
    (props, name, component)=>{
      let prop = props[name]
        , err;

      Object.keys(prop).every(
        key => !(err = PropTypes.string(prop, key, component)))

      return err || null
    }
  ])
])
