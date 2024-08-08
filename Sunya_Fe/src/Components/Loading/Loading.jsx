import "./Loading.css"
import {logoA} from '../Image/Image'; 


const Loading = () => (
  <div className="loading-screen">
    <img src={logoA} alt="Logo" className="logo_app" />
  </div>
);

export default Loading;
