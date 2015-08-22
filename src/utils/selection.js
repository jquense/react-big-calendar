
export function isSelected(event, selected){
  if (!event || selected == null) return false;
  return [].concat(selected).indexOf(event) !== -1
}
