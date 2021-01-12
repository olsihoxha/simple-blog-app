import React from 'react';
import { Text, View,Image,Dimensions,StatusBar,Linking,Alert} from 'react-native';
import {SharedElement } from 'react-navigation-shared-element';
import Icon from 'react-native-vector-icons/FontAwesome';


const {width}=Dimensions.get('screen');

const DetailsScreen=({ route })=>{
    const {item,isDark}=route.params;
    return(
      <>
      <StatusBar backgroundColor={'#AAB7B8'} />
        <View style={{flex:1,backgroundColor:isDark?'black':'white'}}>     
          <Text style={{
                        textAlign:'center',
                        marginTop:15,
                        marginBottom:15,
                        fontSize:20,
                        fontWeight:'bold',
                        color:isDark?'white':'black'}}>{item.title}</Text>
         
          <SharedElement id={`item.${item.id}.image`}>
          <Image resizeMode='cover' source={{uri:item.image}} style={{width,height:200,}}/>
          </SharedElement>
          <View style={{
            width,
            alignItems:'center',
            marginVertical:15}}>
            <View>
            <Text style={{
            color:isDark?'white':'black',
            alignSelf:'baseline',
            fontSize:18,
            fontWeight:'bold'}}>Follow us:</Text>
            </View>

            <View style={{flexDirection:'row',marginTop:6}}>
            <Icon onPress={() => Linking.openURL('https://www.facebook.com/gotanews/')} name="facebook" size={25} color={"#4267B2"} style={{paddingHorizontal:10}}/>
            <Icon onPress={() => Alert.alert( "Twitter Account Suspended!","We will be back soon on Twitter.Thank you!")} name="twitter" size={25} color={"#1DA1F2"} style={{paddingHorizontal:10}}/>
            <Icon onPress={() => Linking.openURL('https://m.facebook.com/gotanews.tv/')} name="instagram" size={25} color={"#DE3163"} style={{paddingHorizontal:10}}/>
            </View>

          </View>
          <Text style={{color:isDark?'white':'black',}}>{item.desc}</Text>
        </View>
        </>
    );
  }


  export default DetailsScreen;