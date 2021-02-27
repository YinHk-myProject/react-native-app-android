
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import ProfilePage from './ProfilePage'
import BookingPage from './BookingPage'
import RecordsPage from './RecordsPage'


const Profile = () => <ProfilePage />
const Booking = () => <BookingPage />
const Records = () => <RecordsPage />

function HomeScreen () {
  
  const Tab = createBottomTabNavigator()

  return(
   
  <View style={styles.navigator}>
   <NavigationContainer> 
    <Tab.Navigator initialRouteName="profile"
     tabBarOptions={{
      labelStyle: {
        fontSize: 17,
        marginBottom: 5,
        padding: 5,
       },
      activeTintColor: "#ff7259"
     }}
    >
     <Tab.Screen name="主頁" component={Profile} />
     <Tab.Screen name="預約" component={Booking} /> 
     <Tab.Screen name="記錄" component={Records} />
    </Tab.Navigator>
   </NavigationContainer>
  </View> 
  )

}

const styles = StyleSheet.create({

  navigator: {
    width:"100%",
    height:"100%"
  }

})

export default HomeScreen