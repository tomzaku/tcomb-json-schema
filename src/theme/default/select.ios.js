import React from 'react';
import PropTypes from 'prop-types';
import { Animated, View, TouchableOpacity, Text, Picker } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
// import { RadioButtons, SegmentedControls } from 'react-native-radio-buttons'
const UIPICKER_HEIGHT = 216;
import Panel from '../../components/Panel';

class CollapsiblePickerIOS extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
      height: new Animated.Value(0)
    };
  }

  render() {
    const locals = this.props.locals;
    const { stylesheet } = locals;
    let pickerContainer = stylesheet.pickerContainer.normal;
    let pickerContainerOpen = stylesheet.pickerContainer.open;
    let selectStyle = stylesheet.select.normal;
    let touchableStyle = stylesheet.pickerTouchable.normal;
    let touchableStyleActive = stylesheet.pickerTouchable.active;
    let pickerValue = stylesheet.pickerValue.normal;
    if (locals.hasError) {
      pickerContainer = stylesheet.pickerContainer.error;
      selectStyle = stylesheet.select.error;
      touchableStyle = stylesheet.pickerTouchable.error;
      pickerValue = stylesheet.pickerValue.error;
    }

    let animation = Animated.timing;
    let animationConfig = {
      duration: 200
    };
    if (locals.config) {
      if (locals.config.animation) {
        animation = locals.config.animation;
      }
      if (locals.config.animationConfig) {
        animationConfig = locals.config.animationConfig;
      }
    }
    const options = locals.options.map(({value, text}) => <Picker.Item key={value} value={value} label={text} />);
    const selectedOption = locals.options.find(option => option.value === locals.value);
    const radio_props = locals.options.map(({value, text}) => { return {label: text, value}})
    const height = (this.state.isCollapsed) ? 0 : UIPICKER_HEIGHT;
    return (
      



      <View style={[pickerContainer, (!this.state.isCollapsed) ? pickerContainerOpen : {}]}>
        <Panel
        title={locals.value}
        styleTouchable={[touchableStyle, this.state.isCollapsed ? {} : touchableStyleActive]}
        styleText={pickerValue}
        >
          <RadioForm
          style={{marginTop:12, alignItems:'flex-start'}}
          animation={true}
          >
            {radio_props.map((obj, i) => (
              <RadioButton
              key={i}
              >
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={locals.value === obj.value}
                  onPress={locals.onChange}
                  borderWidth={1}
                  //buttonInnerColor={'#e74c3c'}
                  //buttonOuterColor={locals.value === obj.value ? '#2196f3' : '#000'}
                  buttonSize={12}
                  buttonOuterSize={20}
                  buttonStyle={{}}
                  buttonWrapStyle={{marginLeft: 10}}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  labelHorizontal={true}
                  onPress={locals.onChange}
                  labelStyle={{fontSize: 12, color: '#0a0a0a'}}
                  labelWrapStyle={{}}
                />
                </RadioButton>
            ))}
        </RadioForm>
        </Panel>
          {/* <Picker
            accessibilityLabel={locals.label}
            ref="input"
            style={selectStyle}
            selectedValue={locals.value}
            onValueChange={locals.onChange}
            help={locals.help}
            enabled={locals.enabled}
            mode={locals.mode}
            prompt={locals.prompt}
            itemStyle={locals.itemStyle}
          >
            {options}
          </Picker> */}
      </View>
    );
  }
}

CollapsiblePickerIOS.propTypes = {
  locals: PropTypes.object.isRequired
};

function select(locals) {
  if (locals.hidden) {
    return null;
  }

  const stylesheet = locals.stylesheet;
  let formGroupStyle = stylesheet.formGroup.normal;
  let controlLabelStyle = stylesheet.controlLabel.normal;
  let selectStyle = stylesheet.select.normal;
  let helpBlockStyle = stylesheet.helpBlock.normal;
  let errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    selectStyle = stylesheet.select.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  const label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
  const help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
  const error = locals.hasError && locals.error ? <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>{locals.error}</Text> : null;

  var options = locals.options.map(({value, text}) => <Picker.Item key={value} value={value} label={text} />);

  return (
    <View style={formGroupStyle}>
      {label}
      <CollapsiblePickerIOS locals={locals} />
      {help}
      {error}
    </View>
  );
}

module.exports = select;