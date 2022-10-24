// Original: https://dribbble.com/shots/5708399-Christmas-Collisions
// By: 𝔅𝔢𝔰𝔱𝔖𝔢𝔯𝔳𝔢𝔡𝔅𝔬𝔩𝔡 @bstsrvdbld

import ReactDOM from "react-dom"
import { Suspense, useReducer } from "react"
import { App } from "./App"
import { Underlay, Overlay } from "./DirtyFigmaExport"
import "./styles.css"

function RootApp() {
  const [i, inc] = useReducer((x) => x + 1, 0)
  return (
    <>
      {/* <Underlay /> */}
      <Suspense fallback={null}>
        <App key={i} />
      </Suspense>
      <div style={{ position: "absolute", zIndex: 1, top: 0, left: 0, padding: "20px" }}>
        <button
          onClick={inc}
          style={{
            background: "none",
            border: "2px solid rgba(0,0,0,0.3)",
            fontFamily: "Antonio, sans-serif",
            fontSize: "20pt",
            textTransform: "uppercase",
            padding: "10px 20px",
            borderRadius: "3px",
          }}>
          About us
        </button>
      </div>
      <div style={{ position: "absolute", zIndex: 1, bottom: 0, right: 0, padding: "20px" }}>
        <button
          onClick={inc}
          style={{
            background: "none",
            border: "2px solid rgba(0,0,0,0.3)",
            fontFamily: "Antonio, sans-serif",
            fontSize: "20pt",
            textTransform: "uppercase",
            padding: "10px 20px",
            borderRadius: "3px",
          }}>
          How to start
        </button>
      </div>
      <div style={{ position: "absolute", zIndex: 1, bottom: 0, left: 0, padding: "20px" }}>
        <button
          onClick={inc}
          style={{
            background: "none",
            border: "2px solid rgba(0,0,0,0.3)",
            fontFamily: "Antonio, sans-serif",
            fontSize: "20pt",
            textTransform: "uppercase",
            padding: "10px 20px",
            borderRadius: "3px",
          }}>
          Make my Box
        </button>
      </div>
      <div style={{ position: "absolute", zIndex: 1, top: 0, right: 0, padding: "20px" }}>
        <button
          onClick={inc}
          style={{
            background: "none",
            border: "2px solid rgba(0,0,0,0.3)",
            fontFamily: "Antonio, sans-serif",
            fontSize: "20pt",
            textTransform: "uppercase",
            padding: "10px 20px",
            borderRadius: "3px",
          }}>
          Support
        </button>
      </div>
      <div style={{ position: "absolute", zIndex: 1, top: "50%", left: "50%", padding: "20px" }}>
        <button
          onClick={inc}
          style={{
            background: "none",
            border: "2px solid rgba(0,0,0,0.3)",
            fontFamily: "Antonio, sans-serif",
            fontSize: "20pt",
            textTransform: "uppercase",
            padding: "10px 20px",
            borderRadius: "3px",
          }}>
          Our products
        </button>
      </div>
      {/* <Overlay /> */}
    </>
  )
}

ReactDOM.render(<RootApp />, document.getElementById("root"))
