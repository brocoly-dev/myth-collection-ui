import { LocalizationProvider } from '@mui/x-date-pickers';
import './App.css';
import FigureManagement from './components/FigureManagement/FigureManagement'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FigureManagement />
      </LocalizationProvider>
    </div>
  );
}

export default App;
