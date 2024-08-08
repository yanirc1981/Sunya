import Image from 'react-bootstrap/Image';
import {iCards} from '../Image/Image';
import "./imagecomponent.css"

function ImageComponentB() {
  return (
    <div className="image-container">
      <Image src={iCards} fluid className="component-img" />
    </div>
  );
}

export default ImageComponentB;
