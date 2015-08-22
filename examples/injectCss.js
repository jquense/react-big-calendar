let style;
const seen = [];

export default function injectCss(rules){
  if ( seen.indexOf(rules) !== -1 ){
    return;
  }

  style = style || (function() {
    let _style = document.createElement('style');
    _style.appendChild(document.createTextNode(''));
    document.head.appendChild(_style);
    return _style;
  })();

  seen.push(rules);
  style.innerHTML += '\n' + rules;
}
