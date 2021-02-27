import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {Agenda} from 'react-native-calendars'
import { Card } from 'react-native-paper'
import moment from 'moment'
import getData from './getData'



export default function RecordsPage () {
  
  const [data, loadingData] = getData()
  
  const renderItem = (item, firstItemInDay) => {
    //console.log('rendering', item)
    return (

      <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
       <Card>
        <Card.Content>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text>{item.name}</Text>
          </View>
        </Card.Content>
       </Card>
      </TouchableOpacity>
    )
  }



  if (loadingData || !data){
    return (
        <View>
            <Text>Loading</Text>
        </View>
    )
  }

  return(
    
    <View style={{ flex: 1,justifyContent:'center',alignItems:'center'}}>
      <View style={{backgroundColor:'#ff7259',width:'100%',alignItems:'center'}}>
       <Text style={{color:'#ffffff',fontSize:20}}>我的過往記錄</Text>
      </View>
      <Agenda
        style={{width:'100%'}}
        items={data}
        selected={moment().format("YYYY-MM-DD")}
        renderItem={(item, firstItemInDay) => { return (renderItem(item, firstItemInDay))}}
        theme={{
          agendaDayTextColor: '#ff7259',
          agendaDayNumColor: '#0c2f6b',
          agendaTodayColor: 'red',
          agendaKnobColor: '#ff7259'
        }}
      />
    </View>
  )

}

