import './MovieLists.scss'
import MovieListItem from "../MovieListItem/MovieListItem"
import Slide from '../Slide/Slide'

const MovieLists = ({list}) => {

 const sm = window.innerWidth;
 let slide;

 if(sm <= 480){
   slide = 1; 
 }else if(sm <= 768){
  slide = 2;
 }else if(sm <= 1024){
  slide = 3;
 }else{
  slide = 4;
 }

  return (
    <div className='movieLists'>
      <h1>{list.title}</h1>
      <div className="movieListsItems">
      <Slide slidesToShow={slide} arrowsScroll={1}>
       {list.content.map((item,i) => (
        <MovieListItem key={i} index={i} item={item} />
       ))}
      </Slide>
      </div>

      </div>
  )
}

export default MovieLists
