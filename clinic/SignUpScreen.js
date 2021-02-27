import React, {useState} from 'react'
import { Button } from 'react-native-elements'
import { useHistory } from "react-router-dom"
import { View, 
         Text,
         Alert, 
         TextInput, 
         StyleSheet,
         ScrollView, 
         SafeAreaView } from 'react-native'


function SignUpScreen() {

    const [name, setName] = useState('')
    const [userpassword, setuserpassword] = useState('')
    const [check, setCheck] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const history = useHistory()

  
    // create confirm alert after submission
    const createAlert = () => Alert.alert("新用戶登記","確認注冊新用戶?",
          [{text: "取消",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
           },
           { text: "確定", onPress: () => { HandleSignup() } }
          ],
          { cancelable: false }
    )


    // alert when some places are missing
    const formAlert = () => Alert.alert("","請輸入所有空位!",
          [{text: "取消",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
           },
           { text: "確定", onPress: () => console.log("Confirm Pressed")}
          ],
          { cancelable: false }
    )
    

    // alert when first password do not consist to second password
    const passwordAlert = () => Alert.alert("","請重覆輪入相同密碼以確認!",
          [{text: "取消",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
           },
           { text: "確定", onPress: () =>{
             setuserpassword('')
             setCheck('')}
           }
          ],
          { cancelable: false }
    )


    // alert when password do not match the requirement
    const passwordLengthAlert = () => Alert.alert("","密碼長度要最少六,最長為十六!",
          [{text: "取消",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
           },
           { text: "確定", onPress: () => {
            setuserpassword('')
            setCheck('')}
           }
          ],
          { cancelable: false }
    )


    // alert when email do not match the format
    const emailAlert = () => Alert.alert("","請輸入有效格式電郵地址!",
          [{text: "取消",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
           },
           { text: "確定", onPress: () => setEmail('')
           }
          ],
          { cancelable: false }
    )


    // alert when phone number do not match the format
    const phoneAlert = () => Alert.alert("","請輸入有效電話號碼!",
          [{text: "取消",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
           },
           { text: "確定", onPress: () => setPhone('')
           }
          ],
          { cancelable: false }
    )


    // alert when name does not contain alphabet only
    const nameAlert = () => Alert.alert("","用戶名稱只可以含有英文字母",
          [{text: "取消",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
           },
           { text: "確定", onPress: () => setName('')
           }
          ],
          { cancelable: false }
    )


    // alert when account registration fail
    const errorAlert = () => Alert.alert("新登記失敗","電郵己被注冊,請以登入或另一個電郵作登記",
          [{text: "取消",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
           },
           { text: "確定", onPress: () => console.log("Confirm Pressed")
           }
          ],
          { cancelable: false }
    )


    // alert when account registration sucessfully
    const sussessAlert = () => Alert.alert("注冊成功","馬上登入?",
          [{text: "取消",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
           },
           { text: "確定", onPress: () => {
             console.log("Confirm Pressed")
             history.push("/")}
           }
          ],
          { cancelable: false }
    )



    

    //handle submit account registration info
    const HandleSignup = () =>{
      
      if(name!=''&&userpassword!=''&&address!=''&&email!=''&&phone!=''){
       
       if(userpassword!=check){passwordAlert()}
       else if(userpassword.length<6||userpassword.length>12){passwordLengthAlert()}
       else if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)==false){
         emailAlert()}
       else if(!name.match(/^[a-zA-Z]+$/)) {nameAlert()}
       else if(isNaN(phone)==true||phone.length<8){phoneAlert()}
       else(

        fetch(`http://localhost:5000/registration`, {
          
          method: 'Post',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "name": name,
            "userpassword": userpassword,
            "address": address,
            "email": email,
            "phone": phone
          })
        }).then((response) => response.json())
           .then((json)=>{ console.log(json.message)
              if(json.message=="Account created"){
                setName('')
                setuserpassword('')
                setCheck('')
                setAddress('')
                setEmail('')
                setPhone('')
                sussessAlert()
              }
              else if(json.message=="Account has already exist"){
                errorAlert()
                setName('')
                setuserpassword('')
                setCheck('')
                setAddress('')
                setEmail('')
                setPhone('')
              }
            })


       )
       }else formAlert()

    }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{marginTop:100,alignItems: "center"}}>
          <Text style={styles.title}>新用戶注冊</Text>
        </View>
        <View style={{marginTop:100,alignItems: "center"}}>
          <TextInput
            style={styles.input}
            placeholder='姓名'
            autoCapitalize="characters"
            placeholderTextColor='#bfbfbf'
            onChangeText={text => setName(text)}
            value={name}
            style={styles.input}
           />
          <Text style={styles.text}>請填英文</Text>
        </View>
        <View style={styles.item}>
          <TextInput
            style={styles.input}
            placeholder='密碼'
            placeholderTextColor='#bfbfbf'
            onChangeText={text => setuserpassword(text)}
            value={userpassword}
            secureTextEntry={true}
            style={styles.input}
           />
           <Text style={styles.text}>
           請至少長度六,最長十六英文字母戓數字並不要含有特殊字元</Text>
        </View>
        <View style={styles.item}>
         <TextInput
            style={styles.input}
            placeholder='再一次輸入密碼'
            placeholderTextColor='#bfbfbf'
            onChangeText={text => setCheck(text)}
            value={check}
            secureTextEntry={true}
            style={styles.input}
           />
           <Text style={styles.text}>
           請確保和上方相同</Text>
        </View>
        <View style={styles.item}>
          <TextInput
            style={styles.input}
            placeholder='住址'
            placeholderTextColor='#bfbfbf'
            onChangeText={text => setAddress(text)}
            value={address}
            style={styles.input}
           />
           <Text style={styles.text}>
           請以英文住址輸入</Text>
        </View>
        <View style={styles.item}>
          <TextInput
            style={styles.input}
            placeholder='電郵'
            placeholderTextColor='#bfbfbf'
            onChangeText={text => setEmail(text)}
            value={email}
            style={styles.input}
           />
           <Text style={styles.text}>
            請輸入有效電郵地址</Text>
        </View>
        <View style={styles.item}>
          <TextInput
            style={styles.input}
            placeholder='電話'
            placeholderTextColor='#bfbfbf'
            onChangeText={text => setPhone(text)}
            value={phone}
            style={styles.input}
           />
           <Text style={styles.text}>
            請輸入有效電話</Text>
        </View>
        <View style={styles.btn}>
        <Button title="遞交" 
         buttonStyle={{backgroundColor: "#ffb908", borderRadius: 28, 
         height: 60, width:"100%"}}
         onPress={createAlert} />
        </View>
        <View style={styles.btn}>
        <Button title="返回" 
         buttonStyle={{backgroundColor: "#ffb908", borderRadius: 28, 
         height: 60, width:"100%"}}
         onPress={() => history.push("/")}
         />
        </View>
      </ScrollView>
    </SafeAreaView>

    )

}

const styles = StyleSheet.create({
  
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
      },
    
    scrollView: {
        paddingHorizontal:20
      },

    title: {
        fontWeight:"bold",
        fontSize:30,
        color:"#ff7259"
      },
    
    text:  {
        marginTop:15,
        marginHorizontal:30,
        fontSize:15,
        color:'red'
      },

    input: {
        height: 55,
        width: "80%",
        color: "#000000",
        borderWidth: 0.7,
        borderRadius: 20,
        borderColor: "#000000",
        fontSize:21,
        fontWeight: 'bold'
      },
    
    item: {
        marginTop: 50,
        alignItems: "center"
      },

    btn:  {
        width:"100%", 
        marginTop: 40,
        marginBottom: 20,
        paddingHorizontal:50,
        justifyContent: "center"
      }



})

export default  SignUpScreen