import React, { Component } from 'react'
import {
  Text, View, ImageBackground, StyleSheet, FlatList,
  TouchableOpacity, Platform, Alert
} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/pt-br'

import commonStyles from '../commonStyles'
import todayImage from '../../assets/imgs/fundo.jpg'
import Student from '../components/Student'
import AddTask from './AddTask'

const initialState = {
  showDoneTasks: true,
  showAddTask: false,
  visibleTask: [],
  tasks: [],
}

export default class TaskList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      postId: null,
    };
  }

  async componentDidMount() {
    // POST request using fetch with async/await
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        age: '20',
        'class-scholl': 'Ensino Superior',
        name: 'Alberto',
      }),
    };
    const response = await
      fetch('https://proj-reforcoescolar-default-rtdb.firebaseio.com/alunos/.json',
        requestOptions);
    const data = await response.json();
    this.setState({ postId: data.id });
  }

  state = {
    ...initialState
  }

  componentDidMount = async () => {
    const stateString = await AsyncStorage.getItem('tasksState')
    const state = JSON.parse(stateString) || initialState
    this.setState(state, this.filterTasks)
  }

  toggleFilter = () => {
    this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks);
  }

  filterTasks = () => {
    let visibleTask = null
    if (this.state.showDoneTasks) {
      visibleTask = [...this.state.tasks]
    } else {
      const pending = task => task.doneAt === null
      visibleTask = this.state.tasks.filter(pending)
    }

    this.setState({ visibleTask })
    AsyncStorage.setItem('tasksState', JSON.stringify(this.state))
  }

  toggleTask = taskId => {
    const tasks = [...this.state.tasks]
    tasks.forEach(task => {
      if (task.id == taskId) {
        task.doneAt = task.doneAt ? null : new Date()
      }
    })

    this.setState({ tasks }, this.filterTasks)
  }

  addTask = newTask => {
    if (!newTask.desc || !newTask.desc.trim()) {
      Alert.alert('Dados Invalidos', 'Descrição não informada!')
      return
    }

    const tasks = [...this.state.tasks]
    tasks.push({
      id: Math.random(),
      desc: newTask.desc,
      age: newTask.age,
      class: newTask.class,
      estimateAt: newTask.date,
      doneAt: null,
    })

    this.setState({ tasks, showAddTask: false }, this.filterTasks)
  }

  deleteTask = id => {
    const tasks = this.state.tasks.filter(task => task.id !== id)
    this.setState({ tasks }, this.filterTasks)
  }

  render() {
    const todayComplete = moment().locale('pt-br').format('D [de] MMMM')
    const dayToday = moment().locale('pt-br').format('dddd')
    return (
      <View style={styles.container}>
        <AddTask
          isVisible={this.state.showAddTask}
          onCancel={() => { this.setState({ showAddTask: false }) }}
          onSave={this.addTask}
        />
        <ImageBackground source={todayImage}
          style={styles.background}>
          <View style={styles.navStart}>
            <View style={styles.iconBar}>
              <TouchableOpacity onPress={this.toggleFilter}>
                <Icon
                  name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                  size={30} color={commonStyles.colors.secondary}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.logout}>
              <TouchableOpacity>
                <Text style={styles.textLogout}>Sair</Text>
                {/* <Icon
                  name='chevron-circle-right'
                  size={40} color={commonStyles.colors.secondary}
                /> */}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>{dayToday}</Text>
            <Text style={styles.subtitle}>{todayComplete}</Text>
          </View>
        </ImageBackground >
        <View style={styles.taskList}>
          <FlatList data={this.state.visibleTask}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => <Student {...item} onToggleTask={this.toggleTask} onDelete={this.deleteTask} />}
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.7}
          onPress={() => { this.setState({ showAddTask: true }) }}
        >
          <Icon
            name="plus"
            color={commonStyles.colors.secondary}
            size={20}
          />
        </TouchableOpacity>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: commonStyles.fontfamily,
    color: commonStyles.colors.secondary,
    fontSize: 30,
    marginLeft: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: commonStyles.fontfamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30,
  },
  navStart: {
    flexDirection: 'row',
  },
  iconBar: {
    marginHorizontal: 20,
    justifyContent: 'flex-start',
    marginTop: Platform.OS === 'ios' ? 30 : 10,
  },
  logout: {
    justifyContent: 'flex-end',
    marginStart: 260,
    marginTop: 10,
    width: '24%',
    alignItems: 'center',
  },
  textLogout: {
    color: "#fff",
    backgroundColor: commonStyles.colors.today,
    padding: 15,
    borderRadius: 40,
    fontFamily: commonStyles.fontFamily,
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: commonStyles.colors.today,
    alignItems: 'center',
    justifyContent: 'center',
  }
})