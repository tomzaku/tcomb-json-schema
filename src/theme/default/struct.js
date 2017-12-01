var React = require('react');
var { View, Text, StyleSheet } = require('react-native');

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const LIBRARY_ICON = {
  MaterialCommunityIcons,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  Foundation,
  Ionicons,
  MaterialIcons,
  Octicons,
  Zocial,
  SimpleLineIcons,
}
// var Icon = require('react-native-vector-icons')
function renderIcon(iconsPath){
  let paths = iconsPath.split('/');
  let Icon = LIBRARY_ICON[paths[0]]

  return(
    <Icon
    name={paths[1]}
    color={'white'}
    style={{paddingRight: 12}}
    size={20}
  />
  );
}

function struct(locals) {
  if (locals.hidden) {
    return null;
  }
  // Handle if have icon
  if (locals.config.icon){
    const GET_LIBRARY_ICON = 'react-native-vector-icons/' + locals.config.icon.split('/')[0]
    var Icon = LIBRARY_ICON[locals.config.icon.split('/')[0]]
    // let Icon = require(LIBRARY_ICON);
    // import Icon from LIBRARY_ICON
  }
  
  var stylesheet = locals.stylesheet;
  var fieldsetStyle = stylesheet.fieldset;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var labelContainer =  stylesheet.labelContainer && stylesheet.labelContainer.normal;
  var rowContainerStyle =  stylesheet.rowContainerStyle && stylesheet.rowContainerStyle.normal;

  if (locals.hasError) {
    controlLabelStyle = stylesheet.controlLabel.error;
    labelContainer = stylesheet.labelContainer.error;
    rowContainerStyle = stylesheet.rowContainerStyle.error;
  }

  var label = locals.label ? <Text style={[styles.titleHeader, controlLabelStyle]}>{locals.label}</Text> : null;
  var error = locals.hasError && locals.error ? <Text accessibilityLiveRegion="polite" style={stylesheet.errorBlock}>{locals.error}</Text> : null;

  var rows = locals.order && locals.order.map(function (name) {
    return locals.inputs[name];
  });
  return (
    <View style={fieldsetStyle}>
      <View style={[labelContainer, styles.header]}>
        {locals.config.icon
          ? renderIcon(locals.config.icon)
          : locals.showIcon 
            ? (<Text style={styles.textInteadIcon}>{locals.label[0]}</Text>)
            : null
        }
        {label}
      </View>
      {error}
      <View style={[styles.rowContainer, rowContainerStyle]}>
        {rows}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#16a3ff',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 12,
    paddingRight: 16,
    alignItems: 'center',
  },
  textInteadIcon: {
    color: 'white',
    fontWeight: 'bold',
    paddingRight: 12,
  },
  titleHeader: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  rowContainer: {
   paddingTop: 12,
   paddingLeft: 8,
   paddingRight: 8,
   borderRadius: 2,
   borderWidth: 0.5,
   borderColor: 'rgba(201, 201, 201, 0.7)',
  },
});

module.exports = struct;