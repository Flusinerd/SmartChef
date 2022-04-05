import './App.css';
import { SCButton } from './components/button/button';
import { SCNavbar } from './components/navbar/Navbar';

function App() {
  return (
    <div className="App">
        <SCNavbar>
          
        </SCNavbar>
        <SCButton disabled={true}> Hello World </SCButton>
    </div>
  );
}

export default App;
