
import React, {Component} from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity,Animated} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class Panel extends Component{
    constructor(props){
        super(props);
        this.state = {
            expanded    : false,
            animation   : new Animated.Value()
        };
    }

    toggle(){
        let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded : !this.state.expanded
        });

        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue,
                tension:15,
            }
        ).start();
    }

    _setMaxHeight(event){
        this.setState({
            maxHeight   : event.nativeEvent.layout.height
        });
    }

    _setMinHeight(event){
        this.setState({
            minHeight   : event.nativeEvent.layout.height
        });
    }
    componentDidMount(prevProps, prevState) {
      this.state.animation.setValue(30);
    }
    render(){
        const { styleTouchable, title, styleText } = this.props
        return (
            <Animated.View
                style={[styles.container,{height: this.state.animation}]}>
                <TouchableOpacity onPress={this.toggle.bind(this)} style={[styles.titleContainer, styleTouchable]} onLayout={this._setMinHeight.bind(this)}>
                    <Text style={[styles.title, styleText]} >{title}</Text>
                    <MaterialIcons name={'keyboard-arrow-down'} size={20} />
                    {/* <TouchableHighlight
                        style={[styles.button]}
                        onPress={this.toggle.bind(this)}
                        underlayColor="#f1f1f1">
                        <View style={{ width:30, height:30, backgroundColor:'red' }}>
                        </View>
                    </TouchableOpacity> */}
                </TouchableOpacity>

                <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                    {this.props.children}
                </View>

            </Animated.View>
        );
    }
}

var styles = StyleSheet.create({
    container   : {
        overflow:'scroll'
    },
    titleContainer : {
        flexDirection: 'row'
    },
    title       : {
        flex    : 1,
        padding : 10,
        color   :'#2a2f43',
    },
    button      : {

    },
    buttonImage : {
        width   : 30,
        height  : 25
    },
    body        : {
        padding     : 10,
        paddingTop  : 0
    }
});

export default Panel;
