import './Feature.scss';
import FeatureCard from '../FeatureCard/FeatureCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const Feature = ({ type }) => {

  const [content, setContent] = useState({});
  const [featureCards, setFeatureCards] = useState([])

  useEffect (() => {
    const getRandomContent = async () => {
        try {
          const res = await axios.get(`https://streamer-backend.onrender.com/api/movies/random?type=${type}`);
          if (res.data.movie && res.data.movie.length > 0) {
            const subsetOfMovieArray = res.data.movie.slice(1);
            setFeatureCards(subsetOfMovieArray);
            setContent(res.data.movie[0]);
           
          }
        }catch(err) {
          console.log(err)
        }
    }
    getRandomContent()
  },[type])


  return (
    <div className='feature'>
      <div className="featureContainer">
        <img className='featureBgImg' src={content.featureImg} alt={content.title} />
        <div className='inner-shadow'></div>
        <div className="info">
          <h1>{content.title}</h1>
          <p>{content.desc}</p>
          <div className="smInfo">
            <span>{content.year}</span>
            <span className='line'>|</span>
            <span>{content.age}+</span>
            <span className='line'>|</span>
            <span>{content.genre}</span>
            <span className='rating'>
              {/* <Rating className='ratings' value={feature.rating} /> */}
            </span>
          </div>
          <Link to={`/movies/${content._id}`}>
          <button>PLAY</button>
          </Link>
        
        </div>
        <div className="featureAllCards">
           
           {
            featureCards.map((featureCard) => (
              <FeatureCard title={featureCard.title} desc={featureCard.desc} year={featureCard.year} age={featureCard.age} genre={featureCard.genre} featureSmImg={featureCard.featureImg} id={featureCard._id} key={featureCard._id} />
            ))
           }
        </div>
      </div>
    </div>
  );
}

export default Feature;
