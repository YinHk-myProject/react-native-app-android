import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import 'react-native-gesture-handler'
import { StyleSheet, View, StatusBar, Text } from 'react-native'
import { NativeRouter, Switch, Route } from 'react-router-native'
import LoginScreen from './LoginScreen'
import SignUpScreen from './SignUpScreen'
import HomeScreen from './HomeScreen'



const App = () => {
  
  return (

    
    <SafeAreaProvider>
    <NativeRouter>
      <View style={styles.container}>
       <StatusBar backgroundColor="#ff7259" barStyle="light-content"/>
       <Route exact path="/" component={LoginScreen}/>
       <Route exact path="/signup" component={SignUpScreen}/>
       <Route exact path="/home" component={HomeScreen}/>
      </View>
    </NativeRouter>
    </SafeAreaProvider>
   


    )

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },


})

export default App
