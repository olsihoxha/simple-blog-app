import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,Image,Dimensions,StatusBar,FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SharedElement } from 'react-navigation-shared-element';


  String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};


function convertHTML(str) {
  //those are some of the html Entities (the list goes on but for testing pourposes it works fine)
  return str.replace(/&/g,"&amp;")
    .replace(/&lt;/g,"<")
    .replace(/&gt;/g,">")
    .replace(/&quot;/g,"\"")
    .replace(/&#8217;/g,"'")
    .replace(/&amp;nbsp;/g," ")
    .replace(/&nbsp;/g," ")
    .replace(/&amp;/g,"&")
    .replace(/&euro;/g,"€")
    .replace(/&pound;/g,"£");
    
}


const {width}=Dimensions.get('screen');


//Body of the Feed
const Body=({isDark,navigation})=>{

  const[allNews,setAllNews]=useState([]);

  useEffect(() => {
    (async function f(){
      const response = await fetch("https://gotanews.tv/wp-json/wp/v2/posts?_embed&page=1");
      const data = await response.json();
//jetpack_featured_media_url
      let allNewsToSet=[];
      
      for(let index=0;index<6;index++){
        const id=data[index]['id'];
       
        const thenews=data[index]['content']['rendered'];
        thenews = thenews.replace(/<(.|\n)*?>/g, '');
        thenews = thenews.replaceAll("&#8217;","'");
        thenews =convertHTML(thenews);

        const theTitle=data[index]['title']['rendered'];
        theTitle=convertHTML(theTitle);
        theTitle = theTitle.replaceAll("&#8217;","'");
        
        const theImage=data[index]['jetpack_featured_media_url'];
       
        let theItem={
          id,
          title:theTitle,
          image:theImage,
          desc:thenews
        }
        //this is to strip out all the html-tags with a regular expression
        
        allNewsToSet=[...allNewsToSet,theItem];
      }
      setAllNews(allNewsToSet);

        
    })();
   
  }, [])

    return(
      <View style={{flex:1,backgroundColor:isDark?'black':'white'}}>
     <FlatList
     keyExtractor={item=>(item.id).toString()}
     data={allNews}
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