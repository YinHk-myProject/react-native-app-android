import React from 'react'
import { Button } from 'react-native-elements'
import { View, StyleSheet } from 'react-native'
import { useHistory } from "react-router-dom"


function LogoutPage() {

   const history = useHistory()

   return(
     

    <View style={styles.container}>
     <View style={{width:'30%',marginTop:250}}>
      <Button title="確認登出" 
        buttonStyle={{backgroundColor: "#ffb908", borderRadius: 28, 
        height: 60, width:"100%"}} 
        onPress={() => history.push("/")}
        />
     </View>
    </View>


  )
  

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
      }
    })

export default  LogoutPage