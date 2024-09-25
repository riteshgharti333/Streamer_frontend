import "./Slide.scss";
import Slider from "infinite-react-carousel";

const Slide = ({ children, slidesToShow, arrowsScroll, isLoading }) => {
  const settings = {
    centerMode: true,
    centerPadding: 0,
    slidesToShow,
    arrowsScroll,
  };

  return (
    <div className={`slide ${isLoading ? "loading" : ""}`}>
      <div className="container">
        <Slider
          slidesToShow={slidesToShow}
          arrowsScroll={arrowsScroll}
          {...settings}
        >
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;
