import React from 'react';
import {Platform} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import Settings from '../screens/Settings/Settings';
import Help from '../screens/Help/Help';
import Header from '../components/Header/Header';

export default function mainStack(){
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
               <Stack.Screen 
                   name="Home" 
                   component={Home} 
                   options={({ navigation, route }) => ({
                       headerTitle: () => <Header logo={true} />,
                       headerRight: () => (<Header rightIcon={true} />),
                       headerLeft: () => (<Header leftIcon={true} navigation={navigation} />),
                    headerStyle: {
                        backgroundColor: '#ff006a',
                        height: Platform.OS === 'ios' ? 120 : 90,
                      },
                      headerTintColor: '#fff',
                    })}
                />

                 <Stack.Screen 
                   name="Settings" 
                   component={Settings} 
                   options={({ navigation, route }) => ({
                        headerTitle: () => <Header hideTitle={true} />,
                        headerRight: () => (<Header rightUseText={true} navigation={navigation} rightText="Done"/>),
                        headerLeft: () => (<Header hideTitle={true} />),
                        headerStyle: {
                            backgroundColor: '#fff',
                            height: Platform.OS === 'ios' ? 120 : 90,
                         },
                        headerTintColor: '#ff006a',
                  })}
                  
                />

                <Stack.Screen 
                   name="Help" 
                   component={Help} 
                   options={({ navigation}) => ({
                        headerTitle: () => <Header hideTitle={true} />,
                        headerRight: () => (<Header hideTitle={true} />),
                        headerStyle: {
                            backgroundColor: '#fff',
                            height:120
                         },
                        headerTintColor: '#ff006a',
                  })}
                  
                />
            </Stack.Navigator>
         </NavigationContainer>
    )
}