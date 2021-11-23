import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Auth from './screens/Auth'
import TaskList from './screens/TaskList'

const mainRouters = {
  Auth: {
    name: 'Auth',
    screen: Auth,
  },
  Home: {
    name: 'Home',
    screen: TaskList,
  }
}

const mainNavigator = createSwitchNavigator(mainRouters, {
  initialRouteName: 'Auth'
})

export default createAppContainer(mainNavigator)