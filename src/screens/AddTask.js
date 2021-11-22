import React, { Component } from 'react'
import {
  Modal, View, StyleSheet,
  TouchableWithoutFeedback, Text, TouchableOpacity,
  TextInput, Platform
} from 'react-native'

import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'

import commonStyles from '../commonStyles'

const initialState = { desc: '', age: '', class: '', date: new Date(), showDatePicker: false }

export default class AddTask extends Component {

  state = {
    ...initialState
  }

  save = () => {
    const newTask = {
      desc: this.state.desc,
      age: this.state.age,
      class: this.state.class,
      date: this.state.date,
    }

    this.props.onSave && this.props.onSave(newTask)
    this.setState({ ...initialState })
  }

  getDatePicker = () => {
    let datePicker = <DateTimePicker
      value={this.state.date}
      onChange={(_, date) => this.setState({ date, showDatePicker: false })}
      mode='date'
    />

    const dateString = moment(this.state.date).format('ddd, D [de] MMMM [de] YY')

    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
            <Text style={styles.date}>
              {dateString}
            </Text>
          </TouchableOpacity>
          {this.state.showDatePicker && datePicker}
        </View>
      )
    }

    return datePicker
  }

  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={this.onCancel}
        animationType="slide"
      >
        <TouchableWithoutFeedback
          onPress={this.props.onCancel} >
          <View style={styles.background}>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.header}>Nova tarefa</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do aluno"
            onChangeText={desc => this.setState({ desc: desc })}
            value={this.state.desc}
          />
          <TextInput
            style={styles.input}
            placeholder="Idade do aluno"
            onChangeText={text => this.setState({ age: text })}
            value={this.state.age}
          />
          <TextInput
            style={styles.input}
            placeholder="Turma do aluno"
            onChangeText={text => this.setState({ class: text })}
            value={this.state.class}
          />
          {this.getDatePicker()}
          <View style={styles.buttons}>
            <TouchableOpacity onPress={this.props.onCancel}>
              <Text style={styles.button}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.save}>
              <Text style={styles.button}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback
          onPress={this.props.onCancel} >
          <View style={styles.background}>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  container: {
    backgroundColor: "#FFF",
  },
  header: {
    fontFamily: commonStyles.fontfamily,
    backgroundColor: commonStyles.colors.today,
    color: commonStyles.colors.secondary,
    textAlign: "center",
    padding: 15,
    fontSize: 18,
  },
  input: {
    fontFamily: commonStyles.fontfamily,
    height: 50,
    marginHorizontal: 5,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 50,
    paddingStart: 15
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: commonStyles.colors.today,
  },
  date: {
    fontFamily: commonStyles.fontfamily,
    fontSize: 20,
    marginHorizontal: 15,
  }
})