import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ImageComponent from '../ImageComponent/ImageComponent';
import ImageComponentA from '../ImageComponent/ImageComponentA';
import ImageComponentB from '../ImageComponent/ImageComponentB';
import ImageComponentC from '../ImageComponent/ImageComponentC';
import './cards.css';
import { Link } from 'react-router-dom';

function Cards() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="cards-container">
      <div className="carousel-with-title">
        <h2 className="carousel-title">Productos</h2>
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          className="carousel_container"
          prevIcon={
            <span className="carousel-control-prev-icon" aria-hidden="true" />
          }
          nextIcon={
            <span className="carousel-control-next-icon" aria-hidden="true" />
          }
        >
          <Carousel.Item className="div_image">
            <ImageComponent text="First slide" />
            <Carousel.Caption>
            <Link to="/products">
              <div className="item-title">LÁCTEOS
              <div className="subtitles">
                  <span>Yogurt, Kumis, Avena</span>
                </div>
              </div>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="div_image">
            <ImageComponent text="Third slide" />
            <Carousel.Caption>
            <Link to="/products">
              <div className="item-title">
                QUESOS
                <div className="subtitles">
                  <span>Frescos y Maduros</span>
                </div>
              </div>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="div_image">
            <ImageComponent text="Fourth slide" />
            <Carousel.Caption>
            <Link to="/products">
              <div className="item-title">
                POSTRES
                <div className="subtitles">
                  <span>Frescos y Deliciosos</span>
                </div>
              </div>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default Cards;
