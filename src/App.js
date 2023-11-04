import React, { useState, createContext, useContext } from 'react';
import './App.css';
import ChatComponent from './ChatComponent';
import axios from 'axios';


const ChatContext = createContext();


const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);


  const sendMessage = async (message) => {
    const response = await axios.post('/api/send_message/', { message });//API
    setMessages([...messages, { text: message, type: 'user' }, { text: response.data.message, type: 'bot' }]);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};


const useChat = () => {
  return useContext(ChatContext);
};

function App() {
  return (
    <div className="App">
      <h1>AI Chatbot</h1>
      <ChatProvider>
        <ChatComponent />
      </ChatProvider>
    </div>
  );
}

export default App;

