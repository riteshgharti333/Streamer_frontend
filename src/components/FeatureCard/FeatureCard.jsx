import "./FeatureCard.scss";
import { Link } from "react-router-dom";

const FeatureCard = ({ featureCard }) => {
  const { title, desc, age, year, genre, featureSmImg, _id } = featureCard;

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

        <button className="play-btn">
          <Link to={`/movies/${_id}`}>PLAY </Link>
        </button>
      </div>
    </div>
  );
};

export default FeatureCard;
