import React,{useState} from 'react';
import { StyleSheet, Text, View,Image,Switch,Dimensions} from 'react-native';

const {width}=Dimensions.get('screen');
//Header of the Feed
const Header=({setIsDark})=>{
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () =>{ 
      setIsEnabled(previousState => !previousState);
      setIsDark(!isEnabled);
    }
    return(
      <View style={{...styles.header,backgroundColor:isEnabled?'#212326':'#F2F3F4'}}>
      <View style={styles.headerMainContainer}>
      <Image source={require('../images/gotanews.png')} style={styles.imageLogo}/>
      <Text style={{...styles.headTitle,color:isEnabled?'white':'black'}}>Gota News</Text>
      <View style={{flex:1}}>
  
      <Switch
          trackColor={{ false: "#767577", true: "#AED6F1" }}
          thumbColor={isEnabled ? "#2980B9" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      </View>
      </View>
    )
  }


  const styles = StyleSheet.create({
    //Header
    header:{ shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    paddingVertical:5,
    },
    headerMainContainer:{
      flexDirection:'row',
      alignItems:'center',
    },
    imageLogo:{
      width:50,
      height:50
    },
    headTitle:{
      fontSize:20,
      fontWeight:'bold',
      color:'black'
    },
  
  });
  

  export default Header;