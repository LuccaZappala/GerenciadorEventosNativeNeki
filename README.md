# 📱 Gerenciador de Eventos Neki - Mobile

Este é o módulo Mobile do sistema de Gerenciamento de Eventos, desenvolvido como parte do processo seletivo da Neki. O aplicativo oferece uma experiência fluida para administradores gerenciarem eventos diretamente de seus dispositivos Android ou iOS.

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para configurar e executar o aplicativo no seu ambiente.

## 📋 Pré-requisitos

Antes de iniciar, você precisa ter instalado:

- Node.js (versão 18 ou superior recomendada)
- Aplicativo Expo Go instalado no smartphone
  - Google Play
  - App Store

⚠️ Atenção: O smartphone e o computador devem estar conectados obrigatoriamente na mesma rede Wi-Fi.

## 📦 Instalação

Clone o repositório e instale todas as dependências necessárias de forma automática:

```bash
# Entrar na pasta do projeto
cd GerenciadorEventosNativeNeki

# Instalar pacotes registrados no package.json
npm install
```

## ⚙️ Configuração da API (Endereço de IP)

Para que o celular físico se comunique com o seu Backend local, você deve configurar o IP da sua máquina.

### 1. Descobrir o IP da máquina

No terminal, descubra seu IP:

**Windows**
```bash
ipconfig
```

**Mac / Linux**
```bash
ifconfig
```

### 2. Configurar no projeto

Localize o arquivo:

```
services/api.ts
```

Altere a baseURL para o seu IP real:

```typescript
baseURL: 'http://192.168.X.X:8080' // Substitua pelo seu IPv4
```

## ▶️ Execução

Inicie o servidor do Expo:

```bash
npx expo start
```

Escaneie o QR Code gerado no terminal usando:

- Expo Go (Android)
- Câmera do iOS

## ✨ Funcionalidades em Destaque

### 🔐 Autenticação Segura
Login integrado com persistência de sessão via AsyncStorage.

### 📅 Calendário Nativo
Implementação do `@react-native-community/datetimepicker`, permitindo a seleção de datas através da interface nativa do sistema, evitando erros de digitação.

### 🖼️ Gestão de Imagens Inteligente

- Seleção de fotos da galeria com Expo Image Picker
- Conversão automática para Base64 para garantir compatibilidade total de exibição com a plataforma Web
- Preview de imagem: Modal de visualização em tela cheia com ajuste proporcional (`resizeMode: contain`)

### ✅ Validação de Formulário
Bloqueio de envio de campos vazios com alertas informativos ao usuário.

### ⚡ CRUD Completo
Fluxo completo de:

- Criação de eventos
- Listagem de eventos
- Edição de eventos
- Exclusão de eventos

## 🛠️ Stack Tecnológica

- React Native com Expo (Managed Workflow)
- TypeScript (Tipagem estática para robustez do código)
- Axios (Comunicação com API REST)
- React Navigation (Navegação em Stack entre telas)
- React Native Safe Area Context (Tratamento de entalhes/notches e barras de status)

## 👨‍💻 Desenvolvedor

Projeto desenvolvido por **Lucca Zappala Jurado**.