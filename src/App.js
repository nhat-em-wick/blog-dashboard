import RouterPage from "./routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function App() {
  
  return <>
    <RouterPage />
    <ToastContainer />
  </>
}

export default App;
