/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  ToastAndroid,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';
import firebase from 'react-native-firebase';
// import codePush from 'react-native-code-push';

import config from '../config';
import {pushNotifications} from '../services';

pushNotifications.configure();

const Home = props => {
  const [label, setLabel] = React.useState('Loading...');
  const {navigate} = props.navigation;

  React.useEffect(() => {
    SplashScreen.hide();

    fetch('https://test-health-api.herokuapp.com/').then(response =>
      response.text().then(text => setLabel(text)),
    );

    checkPermission();
    messageListener();
  });

  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getFcmToken();
    } else {
      requestPermission();
    }
  };

  const getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      showNotification('Your firebase token is:', fcmToken);
    } else {
      showNotification('Failed', 'No token received');
    }
  };

  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
    } catch (err) {}
  };

  const messageListener = async () => {
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const {title, body} = notification;
        showNotification(title, body);
      });

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const {title, body} = notificationOpen.notification;
        showNotification(title, body);
      });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const {title, body} = notificationOpen.notification;
      this.showNotification(title, body);
    }

    this.messageListener = firebase.messaging().onMessage(message => {
      console.log(JSON.stringify(message));
    });
  };

  const showNotification = (title, message) => {
    pushNotifications.notification({
      title,
      message,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4F6D7A" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Welcome</Text>
              <Text testID="sub-title" style={styles.sectionSubTitle}>
                {label} Test2
              </Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
              <Button
                title={'Press here'}
                onPress={() => {
                  // pushNotifications.sampleLocalNotification({
                  //   title: 'My custom notification title',
                  //   message: 'My custom notification message',
                  // });
                  ToastAndroid.show('Button pressed', ToastAndroid.SHORT);
                }}
              />
              <Button
                title={'Take me to info'}
                onPress={() => {
                  navigate('Info');
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4F6D7A',
  },
  scrollView: {
    backgroundColor: '#4F6D7A',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#4F6D7A',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
  },
  sectionSubTitle: {
    fontSize: 20,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.white,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default Home;
// export default codePush(App);
