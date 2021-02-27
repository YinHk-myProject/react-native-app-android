import React, {useState} from 'react'
import { Button } from 'react-native-elements'
import { View, Text, Alert, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native'



function SettingPage () {

    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const [show3, setShow3] = useState(false)
    const [newPw, setNewPw] = useState('')
    const [check, setCheck] = useState('')
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')

   
    // alert when submitting all inputs are empty
    const fillAlert = () => Alert.alert("","請輸入需要更新的資料",
          [{text: "取消",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
           },
           { text: "確定", onPress: () => console.log("Confirm Pressed")
           }
          ],
          { cancelable: false }
    )


    // alert when update successfully
    const updateAlert = () => Alert.alert("","成功更新的資料",
          [{text: "取消",
             onPress: () => console.log("Cancel Pressed"),
             style: "cancel"
            },
            { text: "確定", onPress: () => console.log("Confirm Pressed")
            }
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
       setNewPw('')
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
            setNewPw('')
            setCheck('')}
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
           { text: "確定", onPress: () => setNewName('')
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
           { text: "確定", onPress: () => setNewPhone('')
           }
          ],
          { cancelable: false }
    )



    // submit update info
    function HandleUpdate() {

    if (newPw != '' || newName != '' || newPhone != '') {

      if (newPw != '' && newPw != check) { passwordAlert()} 
      else if (newPw != '' && (newPw.length < 6 || newPw.length > 12)) { passwordLengthAlert()} 
      else if (newName != '' & (!newName.match(/^[a-zA-Z]+$/))) { nameAlert()} 
      else if (newPhone != '' && (isNaN(newPhone) == true || newPhone.length < 8)) { phoneAlert()} 
      else
        (

          fetch(`http://localhost:5000/update`, {
            method: 'Post',
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "NewPW": newPw,
              "NewName": newName,
              "NewPhone": newPhone
            })
          }).then((response) => response.json())
            .then((json) => {
              console.log(json.message)
              setNewPw('')
              setCheck('')
              setNewName('')
              setNewPhone('')
              updateAlert()
            }))

    } else
      fillAlert()



  }

    return( 
        <View style={styles.container}>
         <ScrollView style={styles.scrollView}>
          <View style={{ marginTop:100,width:"80%",marginHorizontal:55}}>
           <Pressable onPress={()=>setShow(true)}>
            <Text style={{fontSize:15,color:"#b31b00"}}>更改密碼</Text>
           </Pressable>
          </View>
          <View style={{marginTop:15,width:"80%",marginHorizontal:55}}>
           {show?
            <TextInput 
             placeholder="新密碼"
             placeholderTextColor="#b3b3b3"
             secureTextEntry={true}
             onChangeText={text => setNewPw(text)}
             value={newPw}
             style={styles.input}
            />:null}
          </View>
          <View style={{marginTop:15,width:"80%",marginHorizontal:55}}>
           {show?
            <TextInput 
             placeholder="再確認新密碼"
             placeholderTextColor="#b3b3b3"
             secureTextEntry={true}
             onChangeText={text => setCheck(text)}
             value={check}
             style={styles.input}
            />:null}
          </View>
          <View style={{marginTop:80,width:"80%",marginHorizontal:55}}>
           <Pressable onPress={()=>setShow2(true)}>
            <Text style={{fontSize: 15, color: "#b31b00"}}>更改用戶名</Text>
           </Pressable>
          </View>
          <View style={{marginTop:15,width:"80%",marginHorizontal:55}}>
           {show2?
            <TextInput 
             placeholder="新用戶名"
             placeholderTextColor="#b3b3b3"
             onChangeText={text => setNewName(text)}
             value={newName}
             style={styles.input}
            />:null}
          </View>
          <View style={{marginTop:100,width:"80%",marginHorizontal:55}}>
           <Pressable onPress={()=>setShow3(true)}>
            <Text style={{fontSize: 15, color: "#b31b00"}}>更改電話</Text>
           </Pressable>
          </View>
          <View style={{margin: 20,width:"80%",marginHorizontal:55}}>
           {show3?
            <TextInput 
             placeholder="新電話"
             placeholderTextColor="#b3b3b3"
             onChangeText={text => setNewPhone(text)}
             value={newPhone}
             style={styles.input}
            />:null}
          </View>
          <View style={{ marginTop:70,marginBottom:60,width:"80%",marginHorizontal:35}}>
           <Button title="更新資料" 
              buttonStyle={{backgroundColor: "#ffb908", borderRadius: 28, 
              height: 60, width:"100%"}} 
              onPress={HandleUpdate}
            />
          </View>
         </ScrollView>
        </View>
      )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
      },

    scrollView: {
        paddingHorizontal:20,
        width: '100%'
      },

    text:  {
      fontSize:20,
      fontWeight: 'bold',
      margin: 20,
      color: '#6e6e6e' 
      },
    
    input:  {
      height: 55,
      width: "80%",
      color: "#000000",
      borderWidth: 0.7,
      borderRadius: 20,
      borderColor: "#000000",
      fontSize:21,
      fontWeight: 'bold'
    }

})

export default SettingPage