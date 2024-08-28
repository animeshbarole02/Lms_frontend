
import './Card.css';

const Card = ({ heading, count, src,className }) => {
  return (

   
    <div className={`card-container ${className}`}>
      <img src={src} alt="" />
      <h3 className='card-heading'>{heading}</h3>
      <p className='card-count'>{count}</p>
    </div>
   
  );
};

export default Card;