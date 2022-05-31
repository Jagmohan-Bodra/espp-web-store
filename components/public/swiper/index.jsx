import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {
  Virtual,
  EffectCube,
  EffectFade,
  EffectCoverflow,
  EffectFlip,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Controller,
} from 'swiper';
import {useEffect, useState} from 'react';

SwiperCore.use([Virtual]);
SwiperCore.use([EffectCube]);
SwiperCore.use([EffectFade]);
SwiperCore.use([EffectCoverflow]);
SwiperCore.use([EffectFlip]);
SwiperCore.use([Navigation]);
SwiperCore.use([Pagination]);
SwiperCore.use([Scrollbar]);
SwiperCore.use([A11y]);
SwiperCore.use([Autoplay]);
SwiperCore.use([Controller]);

export const Swipers = (props) => {
  const [controllerSwiper, setControllerSwiper] = useState(null);
  const {
    effect,
    navigation,
    pagination,
    scrollbar,
    slidesPerView,
    spaceBetween,
    data,
    className,
    slideTo,
    setSlideTo,
  } = props;
  const isNavigation = navigation == false ? false : true;

  useEffect(() => {
    if (controllerSwiper && slideTo > -1) {
      controllerSwiper.slideTo(slideTo || 0);
      setSlideTo && setSlideTo(-1);
    }
  }, [slideTo]);

  const handleNext = () => {
    controllerSwiper.slideNext();
  };

  const handlePrev = () => {
    controllerSwiper.slidePrev();
  };

  return (
    <div className={`swipers-component ${className || ''}`}>
      {isNavigation && (
        <>
          <button
            onClick={handleNext}
            className={`swipers-component_btn_next`}
          />
          <button
            onClick={handlePrev}
            className={`swipers-component_btn_prev`}
          />
        </>
      )}
      <Swiper
        className={className || ''}
        effect={effect} // fade - cube - coverflow - flip
        navigation={false}
        pagination={pagination ? {clickable: true} : false}
        scrollbar={scrollbar ? {draggable: true} : false}
        // autoplay={{delay: 5000}}
        onSwiper={setControllerSwiper}
        breakpoints={{
          375: {
            slidesPerView: (slidesPerView || [])[0] || 1,
            spaceBetween: (spaceBetween || [])[0] || 0,
          },
          768: {
            slidesPerView: (slidesPerView || [])[1] || 1,
            spaceBetween: (spaceBetween || [])[1] || 0,
          },
          1024: {
            slidesPerView: (slidesPerView || [])[2] || 1,
            spaceBetween: (spaceBetween || [])[2] || 0,
          },
          1440: {
            slidesPerView: (slidesPerView || [])[3] || 1,
            spaceBetween: (spaceBetween || [])[3] || 0,
          },
        }}
        virtual>
        {(data || []).map((slideContent, index) => (
          <SwiperSlide key={`${index}`} virtualIndex={index}>
            {slideContent}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
