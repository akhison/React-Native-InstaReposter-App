import React, {useState, useEffect} from 'react';
import { StyleSheet,  } from 'react-native';
import Navigation from './routes/mainStack';
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';

export default function App() {
    const [isReady, setisReady] = useState(false);

    const cacheResourcesAsync = async () => {
      const images = [require('./assets/icon.png'), require('./assets/splash.png')]; 
      const cacheImages = images.map(image => {
        return Asset.fromModule(image).downloadAsync();
      }); 
      return Promise.all(cacheImages);
    }

    return (
      isReady === false ? (
        <AppLoading
          startAsync={cacheResourcesAsync}
          onFinish={() => setisReady(true)}
          onError={console.warn}
     />) : (<Navigation />)
   );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
