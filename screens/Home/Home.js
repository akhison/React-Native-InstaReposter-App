import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, 
         Clipboard, AppState, Switch, AsyncStorage, Linking, 
         Dimensions, Platform
         } from 'react-native';
import { EvilIcons, SimpleLineIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import {api_url} from '../../config/apiUrl';
import HomeStyles from './HomeStyles';


const deviceHeight = Dimensions.get('window').height;

export default function Home(){
    const [loading, setLoading] = useState(true);
    const [shareBtnDisabled, setShareBtnDisabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [data, setData] = useState({})
    const [isEnabled, setIsEnabled] = useState(true);
    const [caption, setCaption] = useState('');
    const [appState, setAppState] = useState(AppState.currentState);

    const toggleSwitch = () => setIsEnabled(previousState => {
           console.log(previousState)
           storeData(!previousState);
    })
    
    //GET THE COPIED LINK (INSTAGRAM POST COPY URL) FROM DEVICE CLIPBOARD
    const getCopiedLink = async () => {
        let copiedLink = await Clipboard.getString();
        let index = copiedLink.lastIndexOf('/');
        let url = copiedLink.substring(0, index);
        if(url.length >= 39) {
            downloadFile(url);
        }else {
            setLoading(false);
            setErrorMessage("can't find a valid Instagram link. please copy link from post on Instagram.");
        }
    }

    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange);
        getCopiedLink();
        
        return () => {
            AppState.removeEventListener('change', handleAppStateChange);  
          }
    },[]);
    
    //WHEN POST CAPTION CHANGES, RETRIEVE STORE DATA
    useEffect(() => {
        retrieveData()
    },[caption]);

    const handleAppStateChange = nextAppState => {
       if (nextAppState === 'active') {
            //console.log('App has come to the foreground!', appState.appState);
            getCopiedLink();
       }
        setAppState({ appState: nextAppState });
      };
      
      //POST THE URL TO THE DOWNLOAD FILE API
      const downloadFile = async (url) => {
        setLoading(true);
        setErrorMessage(null);
        try {
        const rawResponse = await fetch(api_url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({url})
        });
        const response = await rawResponse.json();
        if (response.data.source !== undefined) {
            setData(response.data);
            setCaption(response.caption);
            setLoading(false);
            setShareBtnDisabled(false)
        }else {
            setLoading(false);
            setErrorMessage("there seems to be a problem with your post link, please re-copy link and try again!"); 
        }
        } catch (error) {
            setLoading(false);
            setErrorMessage("network failed");
        }

      };
      
      //RENDER THE POST SOURCE BASED ON ITS MIMETYPE - IMAGE OR VIDEO
      const renderSourceFile = (data) => {
          if (data.mimeType === "image/jpeg") {
              return (
                <Image 
                  style={HomeStyles.contentImage} 
                  source={{uri: data.source}}
                />
              )
          } else {
            return (
                <Video
                    source={{ uri: data.source }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    shouldPlay={false}
                    resizeMode="contain"
                    useNativeControls={true}
                    style={HomeStyles.contentVideo}
                />
            )
          }
      }

    //STORE DEFAULT CAPTION ISENBALED OPTION TO THE LOCAL STORAGE
    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('isEnabled', value.toString());
          setIsEnabled(value)
        } catch (error) {
           //console.log("erorr storing stored", error)
        }
    }

    //RETRIVE VALUES STORED IN THE LOCALSTORAGE.
    const retrieveData = async () => {
        try {
          let tags = await AsyncStorage.getItem('tags');
          const value = await AsyncStorage.getItem('isEnabled');
          if (value !== null) {
              setIsEnabled(value == 'true' ? true : false);
              tags = tags === null ? '' : tags;
              value == 'true' ? 
              Clipboard.setString(caption + '    ' + ' @withreposterPro ' + tags + ' #withreposterpro') : Clipboard.setString('');
          }else {
               storeData(true);
          }
        } catch (error) {
            //console.log("erorr retrieving stored data", error)
        }
      }

      // SAVE FILE RETRIEVE FROM THE API TO DEVICE. 
      const saveFileToDevice = async (fileUrl, mimeType) => {
            if(shareBtnDisabled) return null;
            setShareBtnDisabled(true)
            const downloadResumable = FileSystem.createDownloadResumable(
            fileUrl,
            FileSystem.documentDirectory + 'RegrammPro_' + (Date.now() * Math.random()) + mimeType,
            {},
            );
            try {
            const { uri } = await downloadResumable.downloadAsync();
             if (Platform.OS === "ios") {
                 await MediaLibrary.saveToLibraryAsync(uri);
                 postToInstagram(uri)
             }else {
                const requestPermission = await MediaLibrary.requestPermissionsAsync();
                const permission = await MediaLibrary.getPermissionsAsync();
                     if (permission.granted) {
                           await MediaLibrary.saveToLibraryAsync(uri);
                           postToInstagram(uri)
                     }else {
                       setErrorMessage("You need to grant ReposterPro access to your photos"); 
                     }
             }
            } catch (e) {
            // console.error(e);
            }
     }

      //POST THE IMAGE/VIDEO STORED ON THE DEVICE TO INSTAGRAM
      const postToInstagram = async (fileUrl) => {
        let encodedURL = encodeURIComponent(fileUrl);
        let instagramURL = Platform.OS == 'ios' ? 
            `instagram://library?AssetPath=${encodedURL}` : "http://instagram.com";
        Linking.openURL(instagramURL);
      }
      
      //INDICATES A LOADING COMPONENT WHEN SHARING THE FILE TO INSTAGRAM
      const showSharingLoading = () => {
        if (!loading && shareBtnDisabled && errorMessage == null) {
            return (
                <Text style={{
                    backgroundColor:'#333',
                    color:'#fff', 
                    padding:20, 
                    width:'80%', 
                    textAlign:'center',
                    position:'absolute',
                    borderWidth:1,
                    borderColor:"#333",
                    borderRadius: 10,
                    overflow: 'hidden',
                    zIndex: 100
                    }}>
                   Instagram loading...
                </Text>
              )
        }
    }

    return (
        <View style={HomeStyles.container}>
            <View style={HomeStyles.contentWrapper}>
            {showSharingLoading()}
               {loading ? 
               <View>
                   <ActivityIndicator
                    animating = {true}
                    color = '#52d7a0' 
                    size = "large"/>
                    <Text style={{margin:5, color:'#999'}}>downloading..</Text>
               </View> : 
                errorMessage === null ?
                renderSourceFile(data) : 
                <View style={HomeStyles.errorMessageWrap}>
                    <SimpleLineIcons name="info" size={20} color="#999" />  
                    <Text style={{marginLeft:7, color:'#333',}}>
                        {errorMessage}
                    </Text>
                </View>
               }
            </View>
            <View style={HomeStyles.copyCaptionWrapper}>
                <View style={{paddingRight:30}}>
                    <Text style={{color:'#555', fontWeight:'bold', marginBottom:5}}>
                        Copy caption
                    </Text>
                    <Text style={{color:'#333',}}>
                        Copy the caption text into your clipboard so you can paste it on Instagram.
                    </Text>
                </View>
                <View style={{}}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#52d7a0" }}
                        thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                
            </View>
                {deviceHeight >= 800 ?
                   <TouchableOpacity style={HomeStyles.shareBtn} onPress={
                        () => saveFileToDevice(data.source, data.mimeType == "video/mp4" ? '.mp4' : '.jpg')
                        }>
                        <EvilIcons name="share-apple" size={36} color="#fff" />  
                        <Text style={{color: '#fff'}}>REPOST</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={HomeStyles.shareBtnRound} onPress={
                        () => saveFileToDevice(data.source, data.mimeType == "video/mp4" ? '.mp4' : '.jpg')
                        }>
                        <EvilIcons name="share-apple" size={36} color="#fff" />  
                        <Text style={{color: '#fff'}}>REPOST</Text>
                  </TouchableOpacity>   
                }
        </View>
    )
}