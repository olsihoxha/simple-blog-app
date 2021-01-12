import React from 'react';
import { StyleSheet, Text, View,Image,Dimensions,StatusBar,FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SharedElement } from 'react-navigation-shared-element';


const data=[
    {
      id:'1',
      title:'The movies tonight were super fun',
      image:'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=925&q=80',
      desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    {
      id:'2',
      title:'Another Movie',
      image:'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80',
      desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    {
      id:'3',
      title:'Third Movie',
      image:'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    }
  ]
  
const {width}=Dimensions.get('screen');
//Body of the Feed
const Body=({isDark,navigation})=>{
    return(
      <View style={{flex:1,backgroundColor:isDark?'black':'white'}}>
     <FlatList
     keyExtractor={item=>item.id}
     data={data}
     renderItem={({item})=>{
        return(
          <View style={styles.bodyItemContainer}>
            
            <SharedElement id={`item.${item.id}.image`}>
            <Image
            resizeMode='cover'
            source={{uri:item.image}}
            style={{width:width/1.2,height:200,}}/>
            </SharedElement>
      
            <Text style={{...styles.itemTitle,color:isDark?'white':'black'}}>{item.title}</Text>
            
            <Text numberOfLines={2} ellipsizeMode='tail' style={{
              paddingHorizontal:8,
              color:isDark?'white':'black'}}>{item.desc}</Text>
            
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Details', {item,isDark});
              }}
            style={styles.seeMoreContainer}>
            <Text style={styles.seeFullNewsText}>See full news</Text>
            <Icon name="angle-double-right" size={25} color={"#2E86C1"}/>
            </TouchableOpacity>

            <View style={{width,height:1,backgroundColor:'#E5E7E9',marginVertical:15}}/>
          </View>
        );
     }}
     />     
    </View>
    );
}

const styles = StyleSheet.create({
 
 //Body
  
    bodyItemContainer:{
      paddingVertical:10,
      alignItems:'center',
    },
  
    itemTitle:{
      fontSize:18,
      fontWeight:'bold',
      marginTop:8,
      padding:8,
      alignSelf:'flex-start'
      },
  
      seeMoreContainer:{
        flexDirection:'row',
        alignSelf:'flex-end',
        alignItems:'center',
        paddingRight:20,
        paddingVertical:15,
        },
  
        seeFullNewsText:{
          marginRight:8,
          fontSize:16,
          color:'#2E86C1',
          fontWeight:'bold'}
    //ends Body
  
  });

  export default Body;