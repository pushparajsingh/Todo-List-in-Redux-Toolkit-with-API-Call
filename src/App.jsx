import { useEffect, useState } from "react";
import "./App.css";
import { FormSubmit } from "./Todo";
import store from './Redux/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <>
      <Provider store={store}>
        <FormSubmit />
      </Provider>
    </>
  );
}

export default App;
