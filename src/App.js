import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import OrdersTable from './components/OrdersTable/OrdersTable'

const theme = createTheme({
  pallete: {
    text: {
      primary: 'rgb(93, 108, 116)'
    }
  },
  typography: {
    fontFamily: [
      'Nunito',
      'sans-serif'
    ].join(','),
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
        <div className="App">
          <OrdersTable /> 
        </div>
      </ThemeProvider>
  )
}

export default App;