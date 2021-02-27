import React, {Component, useState, useEffect, useRef} from 'react'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import { View, Text, Alert } from 'react-native'
import { Button } from 'react-native-elements'
//import { API_URL } from 'react-native-dotenv'

export default BookingPage = () => {
  
  const [show, setShow] = useState(true)
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState('')
  const [day, setDay] = useState('')
  const today = moment()
  const next2week = moment().add(14, 'days')
  
  // update state of day and time before fetching API
  const UpdateState = useEffect(()=>{
    setDay(moment.utc(date).local().format("YYYY-MM-DD"))
    setTime(moment.utc(date).local().format("HH:mm"))
  })
  
  // create confirm alert of submission
  const createAlert = () => Alert.alert("確認","遞交登記預約",
          [{text: "Cancel",
            onPress: () => setShow(true),
            style: "cancel"
           },
           { text: "OK", onPress: () => {
           UpdateState
           SubmitBooking()
          }}
          ],
          { cancelable: false }
         )



  // alert when time is not available
  const unavailableAlert = () => Alert.alert("預約失敗","你己有一項新的預約",
          [{text: "取消",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
           },
           { text: "確定", onPress: () => console.log("Confirm Pressed")
           }
          ],
          { cancelable: false }
         )


  // alert when time is not available
  const bookedAlert = () => Alert.alert("預約失敗","該時段己被預約",
          [{text: "取消",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
           },
           { text: "確定", onPress: () => console.log("Confirm Pressed")
           }
          ],
          { cancelable: false }
         )






  //handle submit booking
  const SubmitBooking = () => {
   if(date!=''&&time!=''){

    fetch(`http://localhost:5000/booking`, {
      method: 'Post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "Time": time,
        "Date": day
      })
    }).then((response) => response.json())
       .then((json)=>{
        if(json.message=="You have booked"){
          unavailableAlert()
          setShow(true)
        }else if(json.message=="Booking is unavailable"){
            bookedAlert()
            setShow(true)
         }else if(json.message=="Booking  is success"){setShow(false)}

       })


   }   

  }


    return(
    
    <View style={{ flex: 1, width:"100%", justifyContent: 'center', alignItems: 'center' }}>{show?
     <View style={{ flex: 1, width:"100%", justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontSize:20,margin:20}}>請預約你的門診時段</Text>
      <Text style={{fontSize:15,margin:20,color:'red'}}>最早可預約時段為早上9時,最晚為下午4時半</Text>
      <View style={{width:"80%",marginTop:20}}>
        <DatePicker
         date={date}
         onDateChange={setDate}
         textColor="#1c56c7"
         minuteInterval={20}
         minimumDate={new Date(today.format('YYYY-MM-DD'))}
         maximumDate={new Date(next2week.format('YYYY-MM-DD'))}
        />
      </View>
      <View style={{width:"40%",marginTop:80}}>
       <Button title="登記預約" 
         onPress={createAlert}
         buttonStyle={{backgroundColor: "#ffb908", borderRadius: 28, 
         height: 60, width:"100%"}} />
      </View>
     </View>:
     <View style={{ flex: 1, width:"100%", justifyContent: 'center', alignItems: 'center' }}>
       <Text style={{fontSize:20,margin:50,color:'blue'}}>成功登記預約!</Text>
       <View style={{width:"40%",marginTop:80}}>
        <Button title="返回"
          onPress={()=>{setShow(true)}} 
          buttonStyle={{backgroundColor: "#ff7259", borderRadius: 28, 
          height: 60, width:"100%"}} />
       </View>
     </View>
    }
    </View>

    )
  


}



