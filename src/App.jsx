import logo from './logo.svg';
import './App.css';
import Editor from "./Editor";

function App() {
  return (
    <div className="App">
        <h3>Slate Plugins Test</h3>
        <div style={{height: 200}}>
            <Editor />
        </div>
    </div>
  );
}

export default App;
