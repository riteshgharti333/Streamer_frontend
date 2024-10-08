import './NotFoundPage.scss'
import mnf from "../../assets/images/mnf2.jpg"
import dnf from "../../assets/images/dnf2.jpg"
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'


const NotFoundPage = () => {

  const isSm = useMediaQuery("(max-width: 480px)");


  return (
    <div className='notfound'>
      <div className="notfoundImg">
        {isSm ?  <img src={mnf} alt="" /> :  <img src={dnf} alt="" />}
        <button><Link to={"/"}>Go to Homepage</Link></button>
      </div>
      </div>

     
  )
}

export default NotFoundPage
