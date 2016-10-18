import React from 'react';

const Header = ({culture, dayFormat, date, localizer}) => {
  return <span>{ localizer.format(date, dayFormat, culture) }</span>
}

export default Header;
