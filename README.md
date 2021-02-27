  # react-native-app-android

### Description
This is my first React-Native APP in android, it is  a simple login authentication and registration. 
This application mainly designed for Android, a clinic application. after login user can use  it for booking consultation and checking consultation records.
This app mainly designed for Android.

#### Front-end
The front-and framework used in this app is react native and developed by using JavaScript and some react-native libraries such as react react-native calendar, react-native elements, react-native navigation etc.\
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
The backend has been developed by using Expressjs. The database used to store user data such as booing ,account infomation and consulation record is MySQL.
+ mysql database to store necessary data.\
  ![alt text](https://github.com/YinHk/react-native-app-android/blob/master/image/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202021-02-26%20195809.jpg)
+ An API for creating user account
+ An API for authenticating logins using email and password
+ An API for creating record storing in database

