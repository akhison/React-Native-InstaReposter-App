import {StyleSheet, Dimensions} from 'react-native';
const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width + 20);
const imageWidth = dimensions.width;

const HeaderStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconRight: {
        marginRight:20
    },
    iconLeft: {
        marginLeft:20
    },
    iconText: {
        color:'#fff',
        fontWeight:"500",
        fontSize: 18
    },
    logo: {
        width:80,
        height:80,
    },
    logoAndroid: {
        width:80,
        height:80,
        position: 'absolute',
        left: imageWidth/5.5
    }
  });

  export default HeaderStyles;
  