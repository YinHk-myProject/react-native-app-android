import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { View, Text, StyleSheet } from 'react-native'
import Profile from './Profile'
import SettingPage from './SettingPage'
import LogoutPage from './LogoutPage'


const Home = () => <Profile />
const Setting = () => <SettingPage />
const Logout = () => <LogoutPage />

const Drawer = createDrawerNavigator()

function ProfilePage () {

  return(
    
    <View style={styles.navigator}>
       <Drawer.Navigator
         initialRouteName="profile"
         openByDefault={true}
        >
        <Drawer.Screen name="主頁" component={Home} />
        <Drawer.Screen name="設定" component={Setting} />
        <Drawer.Screen name="登出" component={Logout} />
       </Drawer.Navigator>
    </View>
  )


}

const styles = StyleSheet.create({

  navigator: {
    width:"100%",
    height:"100%"
  }

})

export default ProfilePage
