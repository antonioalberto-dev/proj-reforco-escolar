import React, { Component } from 'react'
import {
  ImageBackground, Text, StyleSheet,
  View, TextInput, TouchableOpacity,
  Platform, Alert, Image
} from 'react-native'

import backgroundImage from '../../assets/imgs/auth.png'
import commonStyles from '../commonStyles'

export default class Auth extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    stageNew: false,
  }

  signinOrSignup = () => {
    if (this.state.stageNew) {
      Alert.alert('Sucesso!', 'Criar conta')
    } else {
      Alert.alert('Sucesso!', 'Logar')
    }
  }

  render() {
    return (
      <ImageBackground
        source={backgroundImage}
        style={styles.background}>
        <Text style={styles.title}> Reforço Escolar </Text>
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>
            {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
          </Text>
          {
            this.state.stageNew &&
            <TextInput placeholder="Nome" value={this.state.name} style={styles.input}
              onChange={name => this.setState({ name })} />
          }
          <TextInput placeholder="Email" value={this.state.email} style={styles.input}
            onChange={email => this.setState({ email })} />
          <TextInput placeholder="Senha" value={this.state.password} style={styles.input}
            onChange={password => this.setState({ password })} secureTextEntry />
          {
            this.state.stageNew &&
            <TextInput placeholder="Confirmação de senha" value={this.state.confirmPassword}
              style={styles.input} onChange={confirmPassword => this.setState({ confirmPassword })}
              secureTextEntry />
          }
          <TouchableOpacity onPress={this.signinOrSignup}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>
                {this.state.stageNew ? 'Registrar' : 'Entrar'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ padding: 10 }}
          onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
          <Text style={styles.buttonText}>
            {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontFamily: commonStyles.fontfamily,
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: commonStyles.fontfamily,
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    width: '90%',
    borderRadius: 15,
  },
  input: {
    marginTop: 10,
    backgroundColor: "#fff",
    padding: Platform.OS == 'ios' ? 10 : 10,
    borderRadius: 40,
    paddingStart: 23,
  },
  button: {
    backgroundColor: commonStyles.colors.today,
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: commonStyles.fontfamily,
    color: '#fff',
    fontSize: 20,
  },
})