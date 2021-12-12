import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Navbar from "./components/Navbar";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Navbar />
    </LocalizationProvider>
  );
}

export default App;
