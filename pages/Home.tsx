import React, { useState, useEffect } from 'react';
import { 
  View, Text, Image, FlatList, TouchableOpacity, 
  Alert, Modal, TextInput, SafeAreaView, Platform, StatusBar, 
  TouchableWithoutFeedback 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker'; 
import { RootStackParamList } from '../App';
import api from '../services/api';
import { styles } from './Home.styles';
import { Evento } from '../types';
import DateTimePicker from '@react-native-community/datetimepicker';

const Home: React.FC = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEvento, setCurrentEvento] = useState<Partial<Evento>>({});
  const [adminNome, setAdminNome] = useState('Administrador');
  
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const loadUserData = async () => {
    const nome = await AsyncStorage.getItem('usuarioNome');
    if (nome) setAdminNome(nome);
  };

  const fetchEventos = async () => {
    try {
      const adminId = await AsyncStorage.getItem('@NekiEvents:adminId');
      if (!adminId) return;
      const { data } = await api.get(`/eventos/admin/${adminId}`);
      const formatados = data.map((ev: any) => ({
        ...ev,
        nome: ev.titulo || ev.nome,
        imagemUrl: ev.imagem || ev.imagemUrl
      }));
      setEventos(formatados);
    } catch (err) {
      console.error("Erro ao buscar eventos", err);
    }
  };

  useEffect(() => {
    loadUserData();
    fetchEventos();
  }, []);

  const openImagePreview = (uri: string) => {
    setSelectedImage(uri);
    setShowImageModal(true);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permissão", "Precisamos de acesso à galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5, 
      base64: true, 
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      const base64Image = `data:image/jpeg;base64,${asset.base64}`;
      setCurrentEvento({ ...currentEvento, imagemUrl: base64Image });
    }
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
  setShowDatePicker(false); 
  if (selectedDate) {
    setDate(selectedDate);
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setCurrentEvento({ ...currentEvento, data: formattedDate });
  }
};

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@NekiEvents:token');
    await AsyncStorage.removeItem('@NekiEvents:adminId');
    navigation.replace('Login');
  };

  const handleDelete = (id: number) => {
    Alert.alert("Confirmar", "Deseja excluir este evento?", [
      { text: "Cancelar" },
      { text: "Excluir", onPress: async () => {
          try {
            await api.delete(`/eventos/${id}`);
            fetchEventos();
          } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir.");
          }
        } 
      }
    ]);
  };

 const handleSave = async () => {
  const adminId = await AsyncStorage.getItem('@NekiEvents:adminId');
  
  const nomeValido = currentEvento.nome && currentEvento.nome.trim() !== '';
  const dataValida = currentEvento.data && currentEvento.data.trim() !== '';
  const localValido = currentEvento.localizacao && currentEvento.localizacao.trim() !== '';
  const imagemValida = currentEvento.id ? true : (currentEvento.imagemUrl && currentEvento.imagemUrl.trim() !== '');

  if (!nomeValido || !dataValida || !localValido || !imagemValida) {
    Alert.alert(
      "Campos Obrigatórios", 
      "Por favor, preencha o Nome, Data, Localização e anexe uma Imagem para continuar."
    );
    return; 
  }

  try {
    const dadosParaEnviar = {
      titulo: currentEvento.nome || currentEvento.titulo,
      localizacao: currentEvento.localizacao,
      data: currentEvento.data,
      imagem: currentEvento.imagemUrl || currentEvento.imagem,
      idAdministrador: Number(adminId)
    };

    if (currentEvento.id) {
      await api.put(`/eventos/${currentEvento.id}`, dadosParaEnviar);
    } else {
      await api.post('/eventos', dadosParaEnviar);
    }

    setShowModal(false);
    fetchEventos(); 
    Alert.alert("Sucesso", "Evento salvo com sucesso!");
  } catch (error: any) {
    console.error("Erro ao salvar:", error.response?.data || error.message);
    Alert.alert("Erro", "Não foi possível salvar o evento. Verifique a conexão.");
  }
};

  return (
    <SafeAreaView style={[styles.container, { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }]}>
      
      <View style={styles.header}>
        <Image source={require('../assets/logotipoNeki.jpg')} style={styles.logo} resizeMode="contain" />
        <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.adminGreeting} numberOfLines={1}>
                Olá, <Text style={styles.adminName}>{adminNome}</Text>
            </Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Meus Eventos</Text>
          <TouchableOpacity 
            style={styles.addBtn} 
            onPress={() => { setCurrentEvento({}); setShowModal(true); }}
          >
            <Text style={styles.addBtnText}>+ NOVO</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={eventos}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.card}>

              <TouchableOpacity onPress={() => openImagePreview(item.imagem || item.imagemUrl || '')}>
                <Image 
                  source={{ uri: item.imagem || item.imagemUrl || 'https://via.placeholder.com/150' }} 
                  style={styles.cardImage} 
                />
              </TouchableOpacity>

              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.titulo || item.nome}</Text>
                <Text style={styles.cardDetails}>📅 {item.data} | 📍 {item.localizacao}</Text>
              </View>
              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.actionBtn} onPress={() => { setCurrentEvento(item); setShowModal(true); }}>
                  <Text style={styles.editText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn} onPress={() => handleDelete(item.id)}>
                  <Text style={styles.deleteText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      <Modal visible={Boolean(showModal)} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{currentEvento.id ? 'Editar Evento' : 'Novo Evento'}</Text>
            
            {!currentEvento.id && (
              <TextInput style={styles.input} placeholder="Nome do Evento" value={currentEvento.nome} placeholderTextColor="#666" onChangeText={txt => setCurrentEvento({...currentEvento, nome: txt})} />
            )}
            
                  <TouchableOpacity 
                    style={[styles.input, { justifyContent: 'center' }]} 
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text style={{ color: currentEvento.data ? '#000' : '#666' }}>
                      {currentEvento.data ? `📅 ${currentEvento.data}` : "Selecionar Data"}
                    </Text>
                  </TouchableOpacity>

                  {showDatePicker && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={onChangeDate}
                      minimumDate={new Date()} 
                    />
                  )}
            <TextInput style={styles.input} placeholder="Localização" value={currentEvento.localizacao} placeholderTextColor="#666" onChangeText={txt => setCurrentEvento({...currentEvento, localizacao: txt})} />

            {!currentEvento.id && (
              <TouchableOpacity style={[styles.input, { justifyContent: 'center', backgroundColor: '#f0f0f0' }]} onPress={pickImage}>
                <Text style={{ color: currentEvento.imagemUrl ? '#28a745' : '#666' }}>
                  {currentEvento.imagemUrl ? '✓ Imagem Selecionada' : '📎 Anexar Imagem'}
                </Text>
              </TouchableOpacity>
            )}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
              <TouchableOpacity style={[styles.addBtn, { flex: 1, marginRight: 8 }]} onPress={handleSave}>
                <Text style={styles.addBtnText}>SALVAR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.addBtn, { flex: 1, backgroundColor: '#666' }]} onPress={() => setShowModal(false)}>
                <Text style={styles.addBtnText}>FECHAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showImageModal} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setShowImageModal(false)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center' }}>
            {selectedImage && (
              <Image 
                source={{ uri: selectedImage }} 
                style={{ width: '90%', height: '70%' }} 
                resizeMode="contain" 
              />
            )}
            <Text style={{ color: '#FFF', marginTop: 20, fontWeight: 'bold' }}>Toque fora para fechar</Text>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </SafeAreaView>
  );
};

export default Home;