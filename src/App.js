import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Store from "./store/Store";
import NavigationBar from "./components/shared/NavBar/NavBar";
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
    <Store>
      <Router>
        <ThemeProvider theme={theme}>
          <NavigationBar />
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/client" element={<Client />}/>
            </Routes>
          </div>
        </ThemeProvider>
      </Router>
    </Store>
  );
}

export default App;
