import { PropTypes } from 'react';
import localizer from '../localizer';
import elementType from 'react-prop-types/lib/elementType';
import all from 'react-prop-types/lib/all';
import { views as Views } from './constants';
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


let viewNames = Object.keys(Views).map(k => Views[k])

export let accessor = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.func
])

export let dateFormat = createChainableTypeChecker(
    (...args) => localizer.propType && localizer.propType(...args))

export let dateRangeFormat = PropTypes.func

export let views = PropTypes.oneOfType([
  PropTypes.arrayOf(
    PropTypes.oneOf(viewNames)
  ),
  all([
    PropTypes.object,
    (props, name, component)=>{
      let prop = props[name]
        , err;

      Object.keys(prop).every(key => {
        let isBuiltinView =
          viewNames.indexOf(key) !== -1 &&
          typeof prop[key] === 'boolean';

        return isBuiltinView || !(err = elementType(prop, key, component))
      })

      return err || null
    }
  ])
])
