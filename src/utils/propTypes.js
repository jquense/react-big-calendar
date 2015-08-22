import { PropTypes } from 'react';
import localizer from'./localizer';
import elementType from 'react-prop-types/lib/elementType';
import {createChainableTypeChecker} from 'react-prop-types/lib/common';

export { elementType }

export let accessor = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.func
])

export let dateFormat = createChainableTypeChecker(
    (...args) => localizer.propType && localizer.propType(...args))
