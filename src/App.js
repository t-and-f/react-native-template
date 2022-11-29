import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from './views/Home';
import Info from './views/Info';

const MainNavigator = createStackNavigator(
  {
    Home: {screen: Home},
    Info: {screen: Info},
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const App = createAppContainer(MainNavigator);

export default App;
