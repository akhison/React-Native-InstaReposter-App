import React from 'react';
import {View, Text, Platform} from 'react-native';
import HelpStyles from './HelpStyles';

export default function Help() {

    return (
          <View style={HelpStyles.container}>
              <Text style={HelpStyles.headerText}>Help</Text>
              <View style={{marginTop: 50}}>
                 <Text style={HelpStyles.title}>How to use ReposterPro</Text>
                 <Text style={HelpStyles.text}>
                   Open the Instagram app, find the photo or video you want to want to repost and tap the (three dots ...) button in the top right
                   corner and select the "Copy Link" 
                 </Text>
                 <Text style={HelpStyles.text}>
                   Return to reposter and then wait for the post to download and then click on the Repost button to share to Instagram.
                 </Text>
                 {Platform.OS == "android" && <Text style={HelpStyles.text, {fontWeight:'bold'}}>
                   While on Instagram, click on the camera icon and select the downloaded image or video to repost. You can then paste the 
                   caption also into your post.
                 </Text>}
              </View>
          </View>
    )
}