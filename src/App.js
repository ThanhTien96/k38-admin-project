import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchListShoe, thunkFetchShoeDetail } from "./redux/action";
import {  Spin, message } from "antd";


function App() {
  const { appTitle, appLoading } = useSelector((state) => state.appReducer);
  const {listShoe, error} = useSelector((state) => state.productReducer);

  const [messageApi, contextHolder] = message.useMessage()


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkFetchListShoe());
    dispatch(thunkFetchShoeDetail())
  }, []);

  useEffect(() => {
    if(error) {
      messageApi.error(error.message);
    }
  },[error, messageApi])


  return (
    <Spin spinning={appLoading} className="App" style={{height: "100vh"}}>
      {contextHolder}
      <h1>Admin template</h1>
    </Spin>
  );
}

export default App;
