import React from 'react';
import ChatInterface from './components/ChatInterface';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <ChatInterface />
      </div>
    </AuthProvider>
  );
}

export default App;
