import React, { useReducer } from "react";
import ReactDOM from "react-dom/client";
import Annotataor from "./annotator";
import Draggable from "react-draggable";
import "./styles.css";
import App from "./App"
import bboxReducer from './reducers/bboxReducer'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

const options = [
  { key: 1, text: "IPsoft", value: "IPsoft" },
  { key: 2, text: "Google", value: "Google" },
  { key: 3, text: "Mozilla", value: "Mozilla" },
  { key: 4, text: "Safari", value: "Safari" }
];

const idata = [
    {
      id: "BRa2xX",
      mark: {
        x: 84.393063583815,
        y: 107.51445086705202,
        width: 211.56069364161849,
        height: 83.2369942196532,
        type: "RECT"
      },
      comment: "Google"
    },
    {
      id: "QtPJeW",
      mark: {
        x: 469.3641618497109,
        y: 86.70520231213872,
        width: 221.96531791907518,
        height: 149.1329479768786,
        type: "RECT"
      },
      comment: "Mozilla"
    },
    {
      id: "czysBh",
      mark: {
        x: 153.757225433526,
        y: 322.5433526011561,
        width: 201.15606936416185,
        height: 83.23699421965318,
        type: "RECT"
      },
      comment: "IPsoft"
    }
  ];

  const store = configureStore({
    reducer: {
      bbox: bboxReducer
    }
  })
const rootElement = document.getElementById('root');

// Use createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(rootElement);

// Render your app inside the root
const rerender =() =>{ root.render(
<Provider store={store}>
<App options = {options} idata={idata} />
</Provider>);
}

rerender()

// store.subscribe(()=>{
//     rerender()
// })