import React from "react";
// import ReactDOM from "react-dom/client";
import ReactDOM from "react-dom";
import "./styles.css";
import App from "./App"
import 'semantic-ui-css/semantic.min.css'

const adataw = 800
const adatah = 550
const adatax = 240
const adatay = -120
const apxsize = 1024
const anmsize = 1800
const annotate_image = "https://source.unsplash.com/random/800x600"
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
    },
    {
        id: "czvasSD",
        mark: {
          x: (adatax-(adataw/2)) * apxsize/anmsize + apxsize/2,
          y: (adatay-(adatah/2)) * apxsize/anmsize + apxsize/2,
          width: adataw * apxsize/anmsize,
          height: adatah * apxsize/anmsize,
          type: "RECT"
        },
        comment: "1"
      }
  ];

//   const store = configureStore({
//     reducer: {
//       bbox: bboxReducer
//     }
//   })
const rootElement = document.getElementById('root');

const renderApp = () => {
    ReactDOM.render(
        <App options = {options} idata={idata} annotate_image={annotate_image}/>, rootElement
    )
}

renderApp()
// Use createRoot instead of ReactDOM.render
//const root = ReactDOM.createRoot(rootElement);

// Render your app inside the root
// const rerender =() =>{ root.render(
// <Provider store={store}>
// <App options = {options} idata={idata} annotate_image={annotate_image}/>
// </Provider>);
// }


//the following render cause drag to not look good
// const rerender =() =>{ root.render(
//     <App options = {options} idata={idata} annotate_image={annotate_image}/>);
//     }

// rerender()

// store.subscribe(()=>{
//     rerender()
// })