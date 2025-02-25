import './App.css'
import Password from "./Password.jsx";

function App() {

  return (
      <>
          <div Class=" sm:py-2">
              <h1 Class="text-base/7 font-semibold dark:text-white lg:text-center p-2">
                  Welcome to my portfolio Project
              </h1>
              <div Class="flex justify-around">
                  <Password className="flex-1"/>
                  <Password className="flex-1"/>
              </div>
          </div>
      </>
  )
}

export default App
