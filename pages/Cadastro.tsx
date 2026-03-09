import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  Alert, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App'; 
import api from '../services/api';
import { styles } from './Cadastro.styles'; 

const Cadastro: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleCadastro = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    try {
      await api.post('/administradores/cadastrar', { nome, email, senha });
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert("Erro", "Erro ao cadastrar. Verifique os dados.");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image 
          source={require('../assets/logotipoNekiBranca.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
        
        <View style={styles.formCard}>
          <Text style={styles.title}>Cadastro</Text>

          <TextInput 
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            value={nome}
            onChangeText={setNome}
          />

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
            value={senha}
            onChangeText={setSenha}
          />

          <TextInput 
            style={styles.input}
            placeholder="Confirmar Senha"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />

          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text style={styles.buttonText}>CADASTRAR</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.secondaryButtonText}>VOLTAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Cadastro;