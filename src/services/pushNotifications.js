import PushNotification from 'react-native-push-notification';
import {PushNotificationIOS} from 'react-native';

const configure = () => {
  PushNotification.configure({
    onRegister: function(token) {
      //
    },
    onNotification: function(notification) {
      // process the notification
      // required on iOS only
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
};

const notification = props => {
  PushNotification.localNotification({
    autoCancel: true,
    largeIcon: 'ic_launcher',
    smallIcon: 'ic_notification',
    // bigText - shown when notification is expanded
    bigText: props.bigText,
    subText: props.subText,
    color: props.color || 'green',
    vibrate: true,
    vibration: 500,
    title: props.title || 'Notification',
    message: props.message || 'Notication from app',
    playSound: true,
    soundName: 'default',
    actions: props.actions || '["Accept", "Reject"]',
  });
};

export {configure, notification};
