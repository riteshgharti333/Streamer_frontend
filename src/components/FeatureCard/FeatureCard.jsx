import "./FeatureCard.scss";
import { Link } from "react-router-dom";

const FeatureCard = ({ title, desc, age, year, genre, featureSmImg, id }) => {
  return (
    <div className="featureCards">
      <img className="featureCardsImg" src={featureSmImg} alt="" />
      <div className="featureCardsInfo">
        <p className="title">{title}</p>
        <p className="desc">{desc}</p>
        <div className="featureCardsSmInfo">
          <span>{year}</span>
          <span className="line">|</span>
          <span>{age}+</span>
          <span className="line">|</span>
          <span>{genre}</span>
        </div>

        <button>
          <Link to={`/movies/${id}`}>PLAY </Link>
        </button>
      </div>
    </div>
  );
};

export default FeatureCard;
