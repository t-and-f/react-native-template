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
import SplashScreen from 'react-native-splash-screen';
// import codePush from 'react-native-code-push';
import config from './config';

import {Colors} from 'react-native/Libraries/NewAppScreen';
// import {pushNotifications} from './services';

// pushNotifications.configure();

const App = () => {
  const [label, setLabel] = React.useState('Loading...');

  React.useEffect(() => {
    SplashScreen.hide();

    fetch('https://test-health-api.herokuapp.com/').then(response =>
      response.text().then(text => setLabel(text)),
    );
  });

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

export default App;
// export default codePush(App);
