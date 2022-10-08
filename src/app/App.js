import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navbar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import SignUp from "./layouts/signup";
import Income from "./layouts/income";
import Accounts from "./layouts/accounts";
import Expenses from "./layouts/expenses";
import Provider from "./components/context";
import User from "./layouts/user";
import History from "./layouts/history";
import Stats from "./layouts/stats";

function App() {
  return (
    <Provider>
      <NavBar />

      <main className="bg-stone-200 w-[100%] h-[90%] md:px-40 fixed overflow-x-hidden overflow-auto pb-[200px]">
        <Switch>
          <Route exact path="/main/:userId?" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/income/:userId" component={Income} />
          <Route exact path="/accounts/:userId" component={Accounts} />
          <Route exact path="/expenses/:userId" component={Expenses} />
          <Route exact path="/settings/:userId" component={User} />
          <Route exact path="/history/:userId" component={History} />
          <Route exact path="/stats/:userId" component={Stats} />

          <Redirect to="/main/:userId?" />
        </Switch>
      </main>
    </Provider>
  );
}

export default App;
