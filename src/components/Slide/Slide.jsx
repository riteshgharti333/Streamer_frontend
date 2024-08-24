import './Slide.scss'
import Slider from "infinite-react-carousel";

const Slide = ({ children, slidesToShow, arrowsScroll }) => {

  const settings = {
    centerMode: true,
    centerPadding: 0,
    arrows:true
    // arrows:true
    // slidesToShow, 
    // arrowsScroll, 
  };

  return (
    <div className="slide">
      <div className="container">
        <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll} {...settings}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;
