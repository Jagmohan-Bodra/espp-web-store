import React, {useState} from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';
import styles from './styles.module.scss';

const CarouselBlock = (props) => {
  const {slides, animating, data, length, className, unIndicators, unControl} =
    props;
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      className={className}>
      {!unIndicators && (
        <CarouselIndicators
          items={data}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
      )}
      {slides}
      {!unControl && (
        <>
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
            slide={false}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={next}
          />
        </>
      )}
    </Carousel>
  );
};

export const Slides = (props) => {
  const {content, setAnimating, key, image} = props;
  return (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={image}>
      <img width="100%" src={image} alt={key} />
      <div className={styles.itemContent}>
        <div className={styles.contentCenter}>{content}</div>
      </div>
    </CarouselItem>
  );
};

export default CarouselBlock;

//  Using
//   <CarouselBlock
//     sildes={data.map((item, index) => (
//       <Slides key={index} constent={<div>{item}</div>}/>
//     ))}
//   />
