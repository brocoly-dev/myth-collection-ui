import { LocalizationProvider } from '@mui/x-date-pickers';
import './App.css';
import FigureForm from './components/FigureForm/FigureForm'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FigureForm />
      </LocalizationProvider>
    </div>
  );
}

export default App;
