import React,{useState,useEffect} from 'react'
import { Avatar } from 'react-native-paper'
import { Card } from 'react-native-elements'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'


function Profile () {

  const [info, setInfo] = useState({})
  const [show, setShow] = useState(false)
  
  useEffect(()=>{
    
    fetch(`http://localhost:5000/home`)
    .then((response) => response.json())
     .then((json) => {
         console.log(json)
         setInfo(json)
         setShow(false)
      })
        .catch(error => {console.log(error)})

  }, [])
  
  const getInfo = ()  =>{

    fetch('http://192.168.0.107:5000/home')
    .then((response) => response.json())
     .then((json) => {
       if(json.Time!=''&&json.Date!=''){
         setInfo(json)
         setShow(true)
         //console.log(json)
       }
       else setShow(false)
      })
        .catch(error => {console.log(error)})
  }


   return( 
            <ScrollView>
             <View style={styles.navigator}> 
              <Avatar.Text size={180} label="Me" />
               <Text style={styles.text}>姓名: {info.User}</Text>
               <Text style={styles.text}>電郵: {info.Email}</Text>
               <View style={{width:"80%"}}>
               <Card>
                <Card.Title style={{marginTop:10,fontSize:20}}>我的最新預約</Card.Title>
                <Card.Divider style={{borderWidth:0.6}}/>
                <View style={{margin:20}}>{show?<View>
                  <Text style={{fontSize:18,color:'green'}}>已預約</Text>
                  <Text style={{marginTop:25,fontSize:20}}>日期: {info.Date}</Text>
                  <Text style={{marginTop:25,fontSize:20}}>時段: {info.Time}</Text></View>
                  :<Text style={{fontSize:18,color:'red'}}>未有預約</Text>}</View>
              </Card>
              </View>
                <View style={{marginTop:30,marginHorizontal:15,marginLeft:50}}><Button title="刷新記錄" 
                 onPress={getInfo}
                 buttonStyle={{backgroundColor: "#ffb908", borderRadius: 28, 
                 height: 60, width:"80%"}} /></View>
              </View>
            </ScrollView>
          )

}

const styles = StyleSheet.create({

    navigator: {
      width:"100%",
      height:"100%",
      alignItems: 'center',
      marginTop: 80,
      padding: 15
    },

    text:  {
      fontSize:20,
      fontWeight: 'bold',
      margin: 20,
      color: '#6e6e6e' 
    }

})
   

export default Profile    
   
    

