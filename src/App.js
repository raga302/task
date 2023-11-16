import './App.css';
import ToDoInput from './components/ToDoInput';


function App() {

  return (

    <div className='main'>
      <div className='container d-flex align-items-center h-100 w-100 flex-column text-center'>
        <ToDoInput />
      </div>
    </div>

  );
}

export default App;
