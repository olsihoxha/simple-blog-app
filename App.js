import React,{useState} from 'react';
import {View,StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator} from 'react-navigation-shared-element';
import DetailsScreen from './components/Details';
import Header from './components/Header';
import Body from './components/Body';



const Stack = createSharedElementStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen
        sharedElementsConfig={(route,otherRoute,showing)=>{
          const {item} = route.params;
          return[
              {id:`item.${item.id}.image`},
          ];
        }}
        name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const Feed=({navigation })=>{
  const [isDark,setIsDark]=useState(false);
  return(
  <View style={{flex:1}}>
    <StatusBar backgroundColor={'#AAB7B8'} />
    <Header setIsDark={setIsDark}/>
    <Body navigation={navigation} isDark={isDark} style={{flex:1}}/>
    </View>
  );
}






