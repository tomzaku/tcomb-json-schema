This repository base on https://github.com/gcanti/tcomb
It will render options and type base on JSONSchema
# Compatibility

- tcomb ^2.0.0 -> tcomb-json-schema ^0.2.5
- tcomb ^3.0.0 -> tcomb-json-schema ^0.3.0

# Playground

If you want to get a general feel for how this works please head over to https://gcanti.github.io/resources/json-schema-to-tcomb/playground/playground.html

# API

## transform(schema: JSONSchema): Type

**Example**
Take a look this first https://mozilla-services.github.io/react-jsonschema-form/
```js
var transform = require('tcomb-json-schema-theme');
const JSONSchema = {
  "title": "A registration form",
  "description": "A simple form example.",
  "type": "object",
  "required": [
    "firstName",
    "lastName"
  ],
  "properties": {
    "firstName": {
      "type": "string",
      "title": "First name"
    },
    "lastName": {
      "type": "string",
      "title": "Last name"
    },
    "age": {
      "type": "integer",
      "title": "Age"
    },
    "bio": {
      "type": "string",
      "title": "Bio"
    },
    "password": {
      "type": "string",
      "title": "Password",
      "minLength": 3
    },
    "telephone": {
      "type": "string",
      "title": "Telephone",
      "minLength": 10
    }
  }
}
const UISchema = {
  "firstName": {
    "ui:autofocus": true,
    "ui:emptyValue": ""
  },
  "age": {
    "ui:widget": "updown",
    "ui:title": "Age of person",
    "ui:description": "(earthian year)"
  },
  "bio": {
    "ui:widget": "textarea"
  },
  "password": {
    "ui:widget": "password",
    "ui:help": "Hint: Make it strong!"
  },
  "date": {
    "ui:widget": "alt-datetime"
  },
  "telephone": {
    "ui:options": {
      "inputType": "tel"
    }
  }
}
var TcombType = transform(JSONSchema,UISchema);
render(
  <Form 
  type={TcombType.type}
  options={TcombType.options}
  >
)
```

## registerFormat(format: string, predicateOrType: (x: any) => boolean | Type): void

Registers a new format.

**Example**

```js
function isEmail(x) {
  return /(.)+@(.)+/.test(x);
}

transform.registerFormat('email', isEmail);

var TcombType = transform({
  "type": "string",
  "format": 'email'
});
```

## resetFormats(): void

Removes all registered formats.

```js
transform.resetFormats();
```

## registerType(typeName: string, type: tComb Supported types): void

Registers a new type.

**Example**

```js
var Str10 = t.subtype(t.Str, function (s) {
  return s.length <= 10;
}, 'Str10');

transform.registerType('string10', Str10);

var TcombType = transform({
  type: "string10"
});
```

## resetTypes(): void

Removes all registered types.

```js
transform.resetTypes();
```

# JSON Schema

## strings

type `string` accepts the property `pattern` which will be used as a predicate (the value of the string must match the [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) defined in `pattern`). Example:

```
{
  "type": "string",
  "pattern": "^abc$"
}
```

The pattern may be either

* a simple string with a regex pattern, e.g. `^abc$` (example matching the exact word `abc`), or
* a string version of a regex literal with a leading and trailing slash and optional [regex flags](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Advanced_searching_with_flags) after the last slash, e.g. `/^abc$/i` (example matching `abc` case insensetive)

## enums

If you don't care of values you can describe enums as an array:


```js
"street_type": {
  "type": "string",
  "enum": ["Street", "Avenue", "Boulevard"]
}
```

or if you want to specify values, describe it as an object where the keys are the values:

```js
"street_type": {
  "type": "string",
  "enum": {
    st: "Street",
    ave: "Avenue",
    blvd: "Boulevard"
  }
}
```
