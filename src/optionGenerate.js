import moment from 'moment'
var _ = require('lodash');
var t = require('tcomb-form-native/lib');
import StructTemplate from './theme/default/struct'
import SelectTemplate from './theme/default/select'
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

let DEFINITIONS = {}

const changeThemeMaterialTextBox = (localStylesheet, { child, parent}) => {

 
  localStylesheet.controlLabel.normal.fontSize = 13;
  localStylesheet.controlLabel.normal.color = '#525252';
  localStylesheet.controlLabel.normal.marginBottom = 0;
  // localStylesheet.controlLabel.normal.marginLeft = 16;
  // localStylesheet.controlLabel.error.marginLeft = 16;
  localStylesheet.controlLabel.normal.fontWeight = '300';
  // localStylesheet.controlLabel.normal.fontWeight = '300';
  localStylesheet[child].normal.borderWidth = 0;
  localStylesheet[child].normal.color = '#191919';
  localStylesheet[child].normal.fontSize = 16;
  // localStylesheet[child].normal.height = 30;
  localStylesheet[child].normal.paddingLeft =  0;
  localStylesheet[child].error.borderWidth = 0;
  localStylesheet[child].normal.marginBottom = 0;
  localStylesheet[child].error.marginBottom = 0;
  localStylesheet[parent].normal.borderWidth = 0;
  localStylesheet[parent].error.borderWidth = 0;
  // localStylesheet[parent].normal.marginLeft = 16;
  // localStylesheet[parent].error.marginLeft = 16;
  localStylesheet[parent].normal.borderRadius = 0;
  localStylesheet[parent].error.borderRadius = 0;
  localStylesheet[parent].normal.borderBottomWidth = 1;
  localStylesheet[parent].error.borderBottomWidth = 1;
  localStylesheet[parent].normal.borderBottomColor = '#9b9b9b';
  localStylesheet[parent].error.borderBottomColor = '#d90909';
  return localStylesheet;
}


stylesheet = changeThemeMaterialTextBox(stylesheet, {child: 'textbox', parent: 'textboxView'});
stylesheet = changeThemeMaterialTextBox(stylesheet, {child: 'dateValue', parent: 'dateTouchable'});
stylesheet = changeThemeMaterialTextBox(stylesheet, {child: 'pickerValue', parent: 'pickerContainer'});

const stylesheetTitle = _.cloneDeep(t.form.Form.stylesheet);
let checkedFirstObject = false;
stylesheetTitle.controlLabel.normal = {
  // flex: 1,
  // color: 'white',
  // fontSize: 16,
  // fontWeight: '600',
}
// stylesheetTitle.labelContainer = {
//   normal : {
//     backgroundColor: 'blue'
//   }
// }
const updateOptionSingle = ({title}) => {
  return {
    label: title,
  }
}
var SCHEMA_ORIGIN = null;
const optionGenerate = ({schema, uiSchema}) => {
  let options = {
  };
  options = updateOptionSingle(schema)

  // Save definition
  
  // if (schema.definitions) {
  //   DEFINITIONS = {
  //     ...Def
  //   }
  // }

  // Handle Ref
  if (schema.$ref) {
    let paths = schema.$ref.split('/');
    const goToRefPath = SCHEMA_ORIGIN
    // for (let i = 1; i < paths.length; i++) { 
    //   goToRefPath = goToRefPath[paths[i]]
    // }
    paths.map((namePath)=> {
      if(namePath === '#'){
        // goToRefPath = schema
      } else {
        goToRefPath = goToRefPath[namePath]
      }
    })
    schema = {
      ...schema,
      ...goToRefPath
    }
  }
  const {type} = schema;
  switch(type){
    case 'object': {
      // Handle First Object in schema
      if(!checkedFirstObject){
        checkedFirstObject = true;
        const stylesheetTitleFirstObject = _.cloneDeep(stylesheetTitle);
        stylesheetTitleFirstObject.rowContainerStyle = {
          normal: {
            paddingLeft: 0, 
            paddingRight: 0, 
          },
        }
        options.stylesheet = stylesheetTitleFirstObject;
      } else {
        options.config = {...options.config, icon: schema.icon}
        options.stylesheet = stylesheetTitle;
      }
      
      options.template = StructTemplate
      Object.keys(schema.properties).map((childKey) => {
        options.fields = options.fields || {}
        options.fields[childKey] = optionGenerate({schema: schema.properties[childKey]})
      })
      break;
    }
    case 'string': {
      // Update mode if date time
      switch(schema.format){
        case 'date':{
          options.mode = 'date'
          options.config = options.config || {}
          options.config.format = (date) => {
            const formatedDate = moment(date).format('DD/MM/YYYY');
            return formatedDate;
          }
          break;
        }
        case 'date-time': {
          break;
        }
        case 'time': {
          options.mode = 'time'
          break;
        }
      }

      // Update Template 
      if(schema.enum && schema.enum.length>0) {
        options.template = SelectTemplate;
      }


      // Material theme
      options.stylesheet = stylesheet;

      
      // Change theme choice button
      // if(schema.enum && schema.enum.length > 0) {

      // }
      break;
    }
  }
  // Parent 

  // options = updateOptionSingle(schema)

  // Child

  // Object.keys(schema).map( (keySchema) => {
  //   options.label = schema[keySchema].title
  // })
  return options;
  return {
    label: "asdasd",
    fields:{
      Information: {
        fields: {
          name: {
            label: "Your name!"
          }
        }
      }
    }
  }
}
const main = ({schema, uiSchema}) => {
  SCHEMA_ORIGIN = schema;
  return optionGenerate({schema, uiSchema})
}

export default main;

