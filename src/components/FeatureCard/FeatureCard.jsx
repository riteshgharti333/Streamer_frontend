import './FeatureCard.scss'
import sm from "../../assets/images/sm.jpg"
import { Link } from 'react-router-dom'

const FeatureCard = ({title,desc,age,year,genre,featureSmImg, id}) => {
  return (
    <div className='featureCards'>
      <img className='featureCardsImg' src={featureSmImg} alt="" />
      <div className="featureCardsInfo">
      <span className='title'>{title}</span>
      <span className='desc'>{desc}</span>
      <div className="featureCardsSmInfo">
      <span>{year}</span>
          <span className='line'>|</span>
          <span>{age}+</span>
          <span className='line'>|</span>
          <span>{genre}</span>
      </div>
      <Link to={`/movies/${id}`}>
    <button >PLAY</button>

      </Link>
      </div>

    </div>
  )
}

export default FeatureCard
