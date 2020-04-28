import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Linking, Share, TextInput, AsyncStorage} from 'react-native';
import SettingsStyles from './SettingsStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Settings({navigation}) {
     const [tags, setTags] = useState('');
     const [closeInput, setCloseInput] = useState(true);

     const handleChange = (val) => {
            setTags(val);
            AsyncStorage.setItem('tags', val);
     }
     
     //ON COMPONENT MOUNTS, CALLS THE getTags function to check for stored tags.
     useEffect(() => {
          getTags();
     },[])

    
     //CHECK IF THERE ARE TAGS STORED IN THE LOCALSTORAGE, IF SO, UPDATE THE TAGS VALUE STATE.
    const getTags =  async () => {
      try {
        const tags = await AsyncStorage.getItem('tags');
        if (tags !== null) {
            setTags(tags);
        }
          } catch (error) {
            console.log("erorr retrieving tags", error)
        }
     }
    
    // SHARE THE APP VIA OTHER APPS
    const onShare = async () => {
        try {
          const result = await Share.share({
            message: 'Share and repost your favourite Instagram post with @WithResposterPro for free.',
            title: 'Share ResposterPro App',
            subject: 'Free App for resposting on Instagram'
          });
        } catch (error) {
          alert(error.message);
        }
      };
    return (
          <KeyboardAwareScrollView>
            <View style={SettingsStyles.container} >
                <Text style={SettingsStyles.headerText}>Settings</Text>
                <View style={{marginTop: 50}}>
                    <Text style={SettingsStyles.linkTitle}>HELP</Text>
                    <TouchableOpacity style={SettingsStyles.linkWrapper} onPress={() => navigation.navigate('Help')}>
                      <Text style={SettingsStyles.linkText}>How to use ReposterPro?</Text>
                      <Text style={SettingsStyles.linkArrow}>></Text>
                    </TouchableOpacity>
                    <Text style={SettingsStyles.linkTitle}>ABOUT</Text>
                    <TouchableOpacity style={SettingsStyles.linkWrapper} onPress={() => Linking.openURL('instagram://user?username=withreposterpro')}>
                      <Text style={SettingsStyles.linkText}>Follow @withreposterpro on Instagram</Text>
                      <Text style={SettingsStyles.linkArrow}>></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={SettingsStyles.linkWrapper} onPress={onShare}>
                      <Text style={SettingsStyles.linkText}>Share app</Text>
                      <Text style={SettingsStyles.linkArrow}>></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={SettingsStyles.linkWrapper} onPress={() => setCloseInput(previousState => !previousState)}>
                      <Text style={SettingsStyles.linkText}>Add tags</Text>
                      <Text style={SettingsStyles.linkAddSign}>{closeInput ? '+' : 'x'}</Text>
                    </TouchableOpacity>
                    {!closeInput && 
                       <TextInput style={SettingsStyles.tagsInput} 
                          multiline
                          placeholder="#tag1   #tag2   #tag3" value={tags} onChangeText={(val) => handleChange(val)} 
                      />}
                  </View>
              </View>
          </KeyboardAwareScrollView>
    )
}