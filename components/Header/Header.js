import React from 'react';
import { View, Text, TouchableOpacity, Image, Linking, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderStyles from './HeaderStyle';

const deviceHeight = Dimensions.get('window').height;

console.log(deviceHeight)

export default function Header({
        logo=false, 
        rightIcon=false, 
        rightUseText=false,
        leftIcon=false,
        hideTitle=false,
        rightText,
        navigation
    }){
    const openInstgramApp = () => {
         const url = "http://instagram.com";
                Linking.openURL(url);
         }
    return (
           <View style={HeaderStyles.container}>
               {rightIcon && 
                <TouchableOpacity style={HeaderStyles.iconRight} onPress={openInstgramApp}>
                    <Ionicons name="logo-instagram" size={36} color="#fff" />
                </TouchableOpacity>
               }
               {leftIcon && 
                <TouchableOpacity style={HeaderStyles.iconLeft} onPress={() => navigation.navigate('Settings')} >
                    <Text style={HeaderStyles.iconText}>Settings</Text>
                </TouchableOpacity>
               }
               {logo && 
                    <Image style={Platform.OS === 'ios' ? HeaderStyles.logo : HeaderStyles.logoAndroid} source={require('../../assets/reposter-logo.png')} />
               }
               {hideTitle && 
                <Text></Text>
               }
               {rightUseText && 
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Text style={{paddingRight:20, fontWeight:'500', color:'#ff006a', fontSize: 18}}>{rightText}</Text>
                </TouchableOpacity>
               }
            </View>
    )
}