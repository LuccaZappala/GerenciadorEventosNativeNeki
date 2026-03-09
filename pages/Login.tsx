import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Image, 
  Alert, ScrollView, Switch, KeyboardAvoidingView, Platform 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import api from '../services/api';
import { styles } from './Login.styles';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const loadSavedCredentials = async () => {
      const savedEmail = await AsyncStorage.getItem('@NekiEvents:email');
      const savedPass = await AsyncStorage.getItem('@NekiEvents:password');

      if (savedEmail && savedPass) {
        setEmail(savedEmail);
        setPassword(savedPass);
        setRememberMe(true);
      }
    };
    loadSavedCredentials();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      const response = await api.post('/administradores/login', {
        email: email,
        senha: password
      });

      const { token, admin } = response.data;

      if (token && admin?.id) {
        await AsyncStorage.setItem('@NekiEvents:token', token);
        await AsyncStorage.setItem('@NekiEvents:adminId', String(admin.id));
        await AsyncStorage.setItem('usuarioNome', admin.nome || "Administrador");

        if (rememberMe) {
          await AsyncStorage.setItem('@NekiEvents:email', email);
          await AsyncStorage.setItem('@NekiEvents:password', password);
        } else {
          await AsyncStorage.removeItem('@NekiEvents:email');
          await AsyncStorage.removeItem('@NekiEvents:password');
        }

        navigation.replace('Home');
      }
    } catch (error) {
      console.error("Erro no login:", error);
      Alert.alert('Erro', 'Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>BEM VINDO(A)!{'\n'}ADICIONE SEUS EVENTOS NO NEKI EVENTOS!</Text>
          <Text style={styles.welcomeSubtitle}>FAÇA LOGIN OU CADASTRE-SE</Text>
          <Image source={require('../assets/mascoteNeki.png')} style={styles.mascote} resizeMode="contain" />
        </View>

        <View style={styles.formSection}>
          <Image source={require('../assets/logotipoNekiBranca.png')} style={styles.logo} resizeMode="contain" />
          
          <View style={styles.formCard}>
            <Text style={styles.cardTitle}>Login</Text>

            <TextInput 
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput 
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <View style={styles.checkBoxContainer}>
              <Switch 
                    value={!!rememberMe} 
                    onValueChange={(newValue) => setRememberMe(newValue)}
                    trackColor={{ false: "#767577", true: "#FFF" }}
                    thumbColor={rememberMe ? "#2B94A7" : "#f4f3f4"}
                />
              <Text style={styles.checkBoxText}>Gravar Senha</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>ENTRAR</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton} 
              onPress={() => navigation.navigate('Cadastro')}
            >
              <Text style={styles.secondaryButtonText}>CADASTRAR-SE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;