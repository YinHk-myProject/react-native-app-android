import React, {Component,useState} from 'react'
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import { Button } from 'react-native-elements'
import { useHistory } from "react-router-dom"



function LoginScreen() {

  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState(false)
  const [wongaccount, setWongaccount] = useState(false)
  const [wongpw, setWongpw] = useState(false)
  const [fill, setFill] = useState(true)
  
  const history = useHistory()

  //handle submit login info
  const HandleLogin = () =>{
      
    if(email!=''&&password!=''){

      fetch(`http://localhost:5000/login`, {
        method: 'Post',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": email,
          "password": password
        })
      }).then((response) => response.json())
          .then((json)=>{ console.log(json.message)
            if(json.message=="login sucessfull"){history.push("/home")}
            else if(json.message=="Email and password does not match"){
              setAlert(true)
              setWongpw(true)
              setWongaccount(false)
              setFill(true)}
            else if(json.message=="Email does not exits"){
              setAlert(true)
              setWongaccount(true)
              setWongpw(false)
              setFill(true)}
           })
        
    } else {
        setAlert(true)
        setFill(false)
        setWongaccount(false)
        setWongpw(false)
      }

     
  }

  return (
   <View style={styles.container}>
    <Text style={styles.title}>MediClinic</Text>
    <View style={{alignItems: "center", marginTop: 10}}>{alert?<View>{wongaccount?
      <Text style={{fontSize: 18, color: '#b50000'}}>用戶尚未注冊,請按最下方注冊新用戶</Text>:null}
      </View>:null}
    </View>
    <View style={{alignItems: "center", marginTop: 10}}>{alert?<View>{wongpw?
      <Text style={{fontSize: 18, color: '#b50000'}}>密碼錯誤,請再試一次或按忘記密碼</Text>:null}
      </View>:null}
    </View>
    <View style={{alignItems: "center", marginTop: 10}}>{alert?<View>{fill?null:
      <Text style={{fontSize: 18, color: '#b50000'}}>請輸入有效電郵和密碼</Text>}
      </View>:null}
    </View>
    <View style={{ marginBottom: 20, marginTop:120, width: "80%"}}>
     <TextInput 
       placeholder="電郵..."
       placeholderTextColor="#ffffff"
       onChangeText={text => setEmail(text)}
       value={email}
       style={styles.input}
     />
    </View>
    <View style={{ margin: 20, width: "80%"}} >
     <TextInput 
       placeholder="密碼..."
       placeholderTextColor="#ffffff"
       onChangeText={text => setPassword(text)}
       value={password}
       secureTextEntry={true}
       style={styles.input}
      />
      <Pressable 
      style={{alignItems: "center", marginTop: 25}} >
        <Text style={{fontSize: 18, color: "#ffffff" }}>忘記密碼?</Text>
      </Pressable>
    </View>
     <View style={{ margin: 40, width: "45%"}}>
      <Button title="登入" 
       buttonStyle={{backgroundColor: "#ffb908", borderRadius: 28, height: 40}}
       onPress={HandleLogin}
      />
     </View>
     <View>
       <Pressable onPress={() => history.push("/signup")}>
          <Text style={{fontSize: 20, color: "#ffffff"}}>注冊新用戶</Text>
       </Pressable>
     </View>
   </View>

  )


}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#ff7259",
    alignItems: "center",
    justifyContent: "center",
  },

  textStyle: {
    color:"white",
    fontSize:10
  },

  input: {
    height:50,
    color:"#ffffff",
    borderBottomWidth: 1,
    borderColor: "#ffffff",
    fontSize:18,
    fontWeight: 'bold'
  },

  title: {
    fontWeight:"bold",
    fontSize:50,
    color:"#ffffff",
    marginBottom:10
  }




})

export default  LoginScreen