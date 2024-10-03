import "./MobileFeatureSlide.scss";
import Slider from "infinite-react-carousel";

const MobileFeatureSlide = ({ children, slidesToShow, arrowsScroll }) => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    duration: 400,
    arrows: false,
  };

  return (
    <div className="mobileFeatureSlide">
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

export default MobileFeatureSlide;
