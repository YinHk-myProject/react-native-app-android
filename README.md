  # react-native-app-android

### Description
This is my first React-Native APP in android, it is  a simple login authentication and registration. 
This application mainly designed for Android, a clinic application. after login user can use  it for booking consultation and checking consultation records.
This app mainly designed for Android.

#### Front-end
The front-end is inside clinic folder, front-and framework used in this app is react native and developed by using JavaScript and some react-native libraries such as react react-native calendar, react-native elements, react-native navigation etc.\
This App contains user interface and related front-end logic are the follows:
+ An account registration screen require email and password for authentication\
 ![alt text](https://github.com/YinHk/react-native-app-android/blob/master/image/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202021-02-26%20210329.jpg)
 ![alt text](https://github.com/YinHk/react-native-app-android/blob/master/image/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202021-02-26%20210445.jpg)
 
+ Account registration screen require email, password, phone and address
+ A home page after login contains booking screen,setting page and record page.\
   ![alt text](https://github.com/YinHk/react-native-app-android/blob/master/image/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202021-02-26%20210542.jpg)
   ![alt text](https://github.com/YinHk/react-native-app-android/blob/master/image/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202021-02-26%20210741.jpg)
   ![alt text](https://github.com/YinHk/react-native-app-android/blob/master/image/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202021-02-26%20210817.jpg)
   ![alt text](https://github.com/YinHk/react-native-app-android/blob/master/image/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202021-02-26%20211006.jpg)
   ![alt text](https://github.com/YinHk/react-native-app-android/blob/master/image/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202021-02-26%20211117.jpg)\
   
   
#### Backend
The backend is inside clinic_server folder and has been developed by using Expressjs. The database used to store user data such as booing ,account infomation and consulation record is MySQL.\
+ mysql database to store necessary data.\
  ![alt text](https://github.com/YinHk/react-native-app-android/blob/master/image/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202021-02-26%20195809.jpg)
+ An API for creating user account
+ An API for authenticating logins using email and password
+ An API for creating record storing in database


### Set up and run the app

Using git clone to download this project. Before run the app, download and install MySQL, and also Android studio. Please follow the instruction of setting up the development environment of React native app on this page: https://reactnative.dev/docs/environment-setup \
This app is mainly built for android. you can run the app on android emulator or your android device.\

Before running the app, please make sure to do following:
+ Add or modify your localhost network, mysl username and password on ".env" file which is inside clinic_server folder.
+ Change the 'localhost' address in fetch api function to your "IP address" for connecting network inside  SignUPScreen.js, SettingPage.js, LoginScreen.js, BookingPage.js and Profile.js. This is to make sure that run tha app connecting your own network as "localhost" is not work in react native.


Use  command  'npx react-native run-android" to run the front-end side in clinic folder,\
The clinic_server is , please use command 'node creatdb' to run creadb.js  first in order to create database, then use 'node createTable' to run in order to create three tables in database which are user, booking and record. Both these two should run once only. \
After that, you can run the backend server by using the command "nodemon  server" or "node server" and run the clinic_db for an API for clinic to create consultation record.

After setting up all above, the app can run normally:)







