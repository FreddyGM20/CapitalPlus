import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios"; // Importa axios para realizar la solicitud HTTP
import './App.css'

axios.defaults.withCredentials = true;

import Home from "./pages/home/home";
import Signup from './pages/signup/signup'
import Signin from './pages/signin/signin'
import Dashboard from './pages/dashboard/dashboard'
import Withdraw from "./pages/withdraw/withdraw";
import Transfer from './pages/transfer/transfer'
import Depositar from './pages/depositar/depositar'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/login"} element={<Signin />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/withdraw"} element={<Withdraw />} />
          <Route path={"/transfer"} element={<Transfer />} />
          <Route path={"/depositar"} element={<Depositar />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;