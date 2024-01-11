import React from 'react';
import { ReactComponent as NewsIcon } from '../icons/newsIcon.svg';
import { ReactComponent as BottomIcon } from '../icons/Ellipse 492.svg';
import { ReactComponent as TopIcon } from '../icons/Ellipse 491.svg';

const NewsItem = ({ news }) => {
  return (
    <div className='news-item'>
      <BottomIcon className='news-bottom-bubble'/>
      <TopIcon className='news-top-bubble'/>

      <div className='news-content'>
        <h3>{news.name}</h3>
        <h4>{news.desc.substring(0, 19) + '...'}</h4>
        <button>Подробнее</button>
      </div>
      <div>
        <NewsIcon />
      </div>
    </div>
  );
};

export default NewsItem;
