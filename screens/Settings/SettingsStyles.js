import {StyleSheet, Dimensions} from 'react-native';

const SettingsStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 25,
    },
    headerText: {
        fontSize: 27,
        fontWeight: 'bold',
        color: '#333'
      },
    linkTitle: {
        fontWeight: 'bold',
        color: '#999',
        marginTop: 20,
        marginBottom: 10
    },
    linkWrapper: {
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingVertical: 20,
        borderTopWidth:1,
        borderColor: '#eae9ea',
        borderBottomWidth:1
    },
    linkText: {
        color: '#333',
        fontWeight:'500'
    },
    linkArrow: {
        color: '#ccc',
        fontWeight:"bold"
    },
    linkAddSign: {
      color: '#f45e9c',
      fontWeight:"bold"
     },
     tagsInput: {
      color: '#555',
      borderBottomWidth: 2,
      padding: 10,
      fontWeight: 'bold'
     }, 
  });

  export default SettingsStyles;
  