import React from 'react';
import metadata from 'component-metadata!react-big-calendar/Calendar';
import transform from 'lodash/object/transform';

function displayObj(obj){
  return JSON.stringify(obj, null, 2).replace(/"|'/g, '')
}

let capitalize = str => str[0].toUpperCase() + str.substr(1);
let cleanDocletValue = str => str.trim().replace(/^\{/, '').replace(/\}$/, '');

let Api = React.createClass({
  render(){
    let calData = metadata.Calendar;

    return (
      <div {...this.props}>
        <h1 id='api'><a href='#api'>API</a></h1>
        <p dangerouslySetInnerHTML={{ __html: calData.descHtml }} />

        <h2>Props</h2>
        {
          Object.keys(calData.props).map(propName => {
            let data = calData.props[propName];

            return this.renderProp(data, propName, 'h3');
          })
        }
      </div>
    )
  },

  renderProp(data, name, Heading){
    let typeInfo = this.renderType(data);

    return (
      <section>
        <Heading id={`prop-${name}`}>
          <a href={`#prop-${name}`}>
            <code>{name}</code>
          </a>
          { data.required &&
            <strong>{' required'}</strong>
          }
          {
            this.renderControllableNote(data, name)
          }
        </Heading>
        <p dangerouslySetInnerHTML={{ __html: data.descHtml }}/>
        <div style={{ paddingLeft: 0 }}>
          <p>
            {'type: '}
            { typeInfo && typeInfo.type === 'pre' ? typeInfo : <code>{typeInfo}</code> }
          </p>
          { data.defaultValue &&
            <div>default: <code>{data.defaultValue.trim()}</code></div>
          }
        </div>
      </section>
    )
  },

  renderType(prop) {
    let type = prop.type || {};
    let name = getDisplayTypeName(type.name);
    let doclets = prop.doclets || {};

    switch (name) {
      case 'elementType':
        return 'Component';
      case 'object':
        if (type.value)
          return (
            <pre className='shape-prop'>
              {'object -> \n'}
              { displayObj(renderObject(type.value))}
            </pre>
          )

        return name;
      case 'union':
        return type.value.reduce((current, val, i, list) => {
          val = typeof val === 'string' ? { name: val } : val;
          let item = this.renderType({ type: val });
          if (React.isValidElement(item)) {
            item = React.cloneElement(item, {key: i});
          }
          current = current.concat(item);

          return i === (list.length - 1) ? current : current.concat(' | ');
        }, []);
      case 'array':
        let child = this.renderType({ type: type.value });

        return <span>{'array<'}{ child }{'>'}</span>;
      case 'enum':
        return this.renderEnum(type);
      case 'custom':
        return cleanDocletValue(doclets.type || name);
      default:
        return name;
    }
  },

  renderEnum(enumType) {
    const enumValues = enumType.value || [];

    const renderedEnumValues = [];
    enumValues.forEach(function renderEnumValue(enumValue, i) {
      if (i > 0) {
        renderedEnumValues.push(
          <span key={`${i}c`}>, </span>
        );
      }

      renderedEnumValues.push(
        <code key={i}>{enumValue}</code>
      );
    });

    return (
      <span>one of: {renderedEnumValues}</span>
    );
  },

  renderControllableNote(prop, propName) {
    let controllable = prop.doclets.controllable;
    let isHandler = prop.type && getDisplayTypeName(prop.type.name) === 'function';

    if (!controllable) {
      return false;
    }

    let text = isHandler ? (
      <span>
        controls <code>{controllable}</code>
      </span>
    ) : (
      <span>
        controlled by: <code>{controllable}</code>,
        initialized with: <code>{'default' + capitalize(propName)}</code>
      </span>
    );

    return (
      <div className='pull-right'>
        <em><small>{ text }</small></em>
      </div>
    );
  }
})

function getDisplayTypeName(typeName) {
  if (typeName === 'func') {
    return 'function';
  } else if (typeName === 'bool') {
    return 'boolean';
  }

  return typeName;
}

function renderObject(props){
  return transform(props, (obj, val, key) => {
    obj[key] = simpleType(val)

    // if (val.desc && typeof obj[key] === 'string')
    //   obj[key] = obj[key] + ': ' + val.desc
  }, {})
}

function simpleType(prop) {
  let type = prop.type || {};
  let name = getDisplayTypeName(type.name);
  let doclets = prop.doclets || {};

  switch (name) {
    case 'elementType':
      return 'Component';
    case 'object':
      if (type.value)
        return renderObject(type.value)
      return name;
    case 'array':
      let child = simpleType({ type: type.value });

      return 'array<' + child + '>';
    case 'custom':
      return cleanDocletValue(doclets.type || name);
    default:
      return name;
  }
}
export default Api;
