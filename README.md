This repository base on https://github.com/gcanti/tcomb
It will render options and type base on JSONSchema
# Playground

If you want to get a general feel for how this works please head over to https://mozilla-services.github.io/react-jsonschema-form/

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
