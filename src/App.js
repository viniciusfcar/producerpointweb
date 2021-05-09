import './App.css';

import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './components/Context/AuthContext'
import Routes from './routes/Routes'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <header className="App-header">
            <Routes />
          </header>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
