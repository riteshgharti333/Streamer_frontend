import './QueryMovieCard.scss'

const QueryMovieCard = () => {
  return (
    <div className='queryMovieCard'>
         <div className="queryMovie">
        <img src="https://dx35vtwkllhj9.cloudfront.net/ifcfilms/the-lost-king/images/regions/us/share.jpg" alt="" />
        <p>The Lost King</p> 
        <div className="queryMoviesInfo">
        <span>2003</span>
          <span className='line'>|</span>
          <span>18+</span>
          <span className='line'>|</span>
          <span>Sports</span>
        </div>
      </div>
    </div>
  )
}

export default QueryMovieCard
