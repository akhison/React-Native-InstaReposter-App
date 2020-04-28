import {StyleSheet, Dimensions} from 'react-native';
const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width + 20);
const imageWidth = dimensions.width;
const deviceHeight = Dimensions.get('window').height;
const HomeStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',

    },
    shareBtn: {
        position:'absolute', 
        bottom:0, 
        backgroundColor: '#52d7a0', 
        height:100,
        width:'100%',
        flexDirection:"row",
        justifyContent: 'center',
        alignItems:'center',
        paddingBottom: 40,
    },
    shareBtnRound: {
        position:'absolute', 
        bottom:deviceHeight / 5, 
        backgroundColor: '#52d7a0', 
        height:100,
        width:100,
        borderRadius: 100,
        flexDirection:"column",
        justifyContent: 'center',
        alignItems:'center',
        elevation:1

    },
    contentWrapper: {
        height:350,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        position:'relative'

    },
    contentImage: {
        width: imageWidth,
        height: imageHeight,
        resizeMode:"contain",
    },
    contentVideo: {
        width: imageWidth,
        height: imageHeight,

    },
    errorMessageWrap: {
        padding: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
        width: imageWidth * 85/100,
        flexDirection:'row'
    },
    copyCaptionWrapper: {
        flexDirection:'row',
        marginTop: deviceHeight >= 1200 ? 500 : 50,
        paddingVertical:20,
        paddingHorizontal:40,
        borderColor: '#e8e8e8',
        borderBottomWidth: 1,
        borderTopWidth: 1,
    }
    
  });

  export default HomeStyles;
  