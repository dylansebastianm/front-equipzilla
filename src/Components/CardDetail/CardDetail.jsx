import { Card, Button, message  } from 'antd';
import { RightCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import "./CardDetail.css"

const CardDetail = ({ movie, handleModalClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const info = () => {
    message.info('The streaming is coming soon');
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    handleModalClose();
  };
  const baseURL = 'https://image.tmdb.org/t/p/';
  const posterSize = 'w780';
  const imageURL = baseURL + posterSize + movie.img;
  const { Meta } = Card;

  return (
    <div>
      {(window.innerWidth > 950) ?
    <div className='cardsDetail-container-component'>
    <Card
    className='cardShadow'
    bordered={false}
    style={{
      width: 525,
      height:525
    
  
    }}
  >
    <div className='title-cardDetail'>{<div className='title-cardDetail-aux'>{movie.title}</div>}</div>
    <div className='description-cardDetail'>
    {movie.description}
    </div>
    <div className='buttons-cardDetail'>
    <Button onClick={handleClose} className='button-cardDetail'>Close</Button>
    <Button onClick={info} className='button-cardDetail'>Play <RightCircleOutlined className='icon-card-detail'/></Button>
    </div>
    </Card>


  < Card
    hoverable
    style={{
      width: 270,
      height: 500
      
    }}
    cover={<img alt="example" className="imgCard" src={imageURL} />}
  >
   </Card>


    </div> : 

    <div className='cardDetail-component-responsive'>
        <div class="card text-bg-dark">
        <img src={imageURL} class="card-img img-cardDetail-responsive" alt="..."/>
        <div class="card-img-overlay">
          <h5 class="card-title">
            <div className='title-responsive'>
            {movie.title}
            </div>
            
            </h5>
            <div class="card-text">
              <div className='description-responsive'>
              {movie.description.slice(0, 120) + "..."}
            </div>

            <div className='buttons-responsive'>
            <Button onClick={handleClose} className='button-cardDetail-responsive'>Close</Button>
            <Button onClick={info} className='button-cardDetail-responsive'>Play <RightCircleOutlined className='icon-card-detail'/></Button>
            </div>
            
            </div>
        </div>
    </div>
    </div>
  }
    </div>
 
   
   
   
  );
};

export default CardDetail;
