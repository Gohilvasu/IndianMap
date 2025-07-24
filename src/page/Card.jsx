import React, { useState } from 'react';
import '../assets/card.css';

const cards = [
  { id: 1, content: 'Card 1', img: '/images/img1.jpg' },
  { id: 2, content: 'Card 2', img: '/images/img2.jpg' },
  { id: 3, content: 'Card 3', img: '/images/img3.jpg' },
  { id: 4, content: 'Card 4', img: '/images/img4.jpg' },
  { id: 5, content: 'Card 5', img: '/images/img5.jpg' },
  { id: 6, content: 'Card 6', img: '/images/img6.jpg' },
  { id: 7, content: 'Card 7', img: '/images/img7.jpg' },
];
const VISIBLE_CARDS = 5;

const Card = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCards = cards.length;
  const half = Math.floor(VISIBLE_CARDS / 2);

  const getWrappedIndex = (index) => {
    return (index + totalCards) % totalCards;
  };

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => getWrappedIndex(prev - 1));
  }

  const handleNext = () => {
    setActiveIndex((prev) => getWrappedIndex(prev + 1));

  }

  return (
    <div className="carousel-wrapper">
       <button className="nav-button left" onClick={handlePrev}>&#10094;</button>
    <div className="carousel-container">
      
      {Array.from({ length: VISIBLE_CARDS }).map((_, i) => {
        const offset = i - half;
        const index = getWrappedIndex(activeIndex + offset); 
        const absOffset = Math.abs(offset);

        return ( 
          <div
            key={cards[index].id}
            className={`carousel-card ${offset === 0 ? 'active' : ''}`}
            style={{
              transform: `translateX(${offset *  150}px) scale(${1 - absOffset * 0.1}) rotateY(${offset * -20}deg)`,
              zIndex: 100 - absOffset,
              opacity: offset === 0 ? 1 : 0.6,
            }}
            onClick={() => handleCardClick(index)}
          >
            <img src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`} alt={cards[index].content} />
            <p>{cards[index].content}</p>
          </div>
        );
      })}
    </div>
      <button className="nav-button right" onClick={handleNext}>&#10095;</button>
    </div>
  );
};

export default Card;
