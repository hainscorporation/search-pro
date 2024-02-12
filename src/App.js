import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/pages/home/Home";
import Client from "./components/pages/clientView/Client/Client";

const theme = createTheme({
  pallete: {
    text: {
      primary: "rgb(93, 108, 116)",
    },
  },
  typography: {
    fontFamily: ["Nunito", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/client" element={<Client />}/>
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
