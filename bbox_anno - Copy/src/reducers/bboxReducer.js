import { createSlice } from '@reduxjs/toolkit'

const initialState = [
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

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const bboxSlice = createSlice({
  name: 'bbox',
  initialState,
  reducers: {
    createBbox(state, action) {
        const content = action.payload
        console.log("store reducer content, ",(content))
        console.log("store state cond",JSON.parse(JSON.stringify(state.concat(content))))
        state.concat(content)
    }
  },
})

export const { createBbox } = bboxSlice.actions
export default bboxSlice.reducer