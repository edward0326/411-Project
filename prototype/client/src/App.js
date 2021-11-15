import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import SearchConcert from "./components/SearchConcert";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <SearchConcert />
    </LocalizationProvider>
  );
}

export default App;
