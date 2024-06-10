import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appReducerContants } from "./redux/appReducer";

function App() {
  const { appTitle, pageLoading } = useSelector((state) => state.appReducer);

  console.log("☣️👻👻 >>> App >>> appTitle: ", appTitle)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: appReducerContants.UPDATE_APP_TITLE, payload: "Admin - Template"})
  }, []);


  return (
    <div className="App">
      <h1>Admin template</h1>
    </div>
  );
}

export default App;
