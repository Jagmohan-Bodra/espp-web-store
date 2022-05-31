import {useNode} from '@craftjs/core';
import React, {useState} from 'react';
import {Row, Col, CarouselItem, Form, Input, Button} from 'reactstrap';
import styles from './styles.module.scss';
import {CardProductView} from '~/components/public/CardProduct';
import {ButtonLink} from '~/components/public/Button';
import CarouselBlock from '~/components/public/Carousel';

const data = [
  {
    src: 'https://placeimg.com/640/480/nature/grayscale',
    altText: 'Slide 1',
    caption: 'Slide 1',
  },
  {
    src: 'https://placeimg.com/640/480/nature/grayscale',
    altText: 'Slide 2',
    caption: 'Slide 2',
  },
  {
    src: 'https://placeimg.com/640/480/nature/grayscale',
    altText: 'Slide 3',
    caption: 'Slide 3',
  },
];

const dataProduct = [
  {
    image: 'https://placeimg.com/640/480/nature/grayscale',
    name: 'STAEDTLER',
    description: 'Scissors with Safety Tip 14cm',
    publicPrice: '$2.50',
    privatePrice: '$2.50',
  },
  {
    image: 'https://placeimg.com/640/480/nature/grayscale',
    name: 'Helix Oxford',
    description: 'Oxford Maths Set',
    publicPrice: '$2.50',
  },
  {
    image: 'https://placeimg.com/640/480/nature/grayscale',
    name: 'STAEDTLER',
    description: 'Scissors with Safety Tip 14cm',
    publicPrice: '$2.50',
    privatePrice: '$2.50',
  },
  {
    image: 'https://placeimg.com/640/480/nature/grayscale',
    name: 'Helix Oxford',
    description: 'Oxford Maths Set',
    publicPrice: '$2.50',
  },
];

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';

const Home = () => {
  const {
    connectors: {connect, drag},
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));
  const [animating, setAnimating] = useState(false);

  return (
    <div
      className={`container-fluid empty-component craft-block ${
        selected ? 'selected' : ''
      }`}
      ref={(ref) => connect(drag(ref))}>
      <div>
        <CarouselBlock
          data={data}
          length={data.length}
          animating={animating}
          unControl
          slides={data.map((item, index) => (
            <CarouselItem
              onExiting={() => setAnimating(true)}
              onExited={() => setAnimating(false)}
              key={index}>
              <img
                width="100%"
                height="700px"
                src={item.src}
                alt={item.altText}
              />
              <div className="item-content">
                <div className="content-center">
                  <h2>LOREM IPSUM DOLOR SIT AMET</h2>
                  <Button className={styles.btnSeeMore}>SeeMore</Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        />
      </div>
      <div className={styles.ourStory}>
        <div className={`container`}>
          <h2>Our Story</h2>
          <br />
          <p>{text}</p>
          <br />
          <ButtonLink text="READ MORE" />
        </div>
      </div>

      <div className={`container`} style={{marginTop: 50}}>
        <Row>
          <Col md={6} xs={12}>
            <CarouselBlock
              data={data}
              length={data.length}
              animating={animating}
              unControl
              slides={data.map((item, index) => (
                <CarouselItem
                  onExiting={() => setAnimating(true)}
                  onExited={() => setAnimating(false)}
                  key={index}>
                  <img
                    width="100%"
                    height="100%"
                    src={item.src}
                    alt={item.altText}
                  />
                  <div className="item-content">
                    <div className="content-center">
                      <div className={styles.carouselItemContent}>
                        <span>
                          <b>Featured Products</b>
                        </span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            />
          </Col>
          <Col md={6} xs={12}>
            <Row className={styles.productView}>
              {dataProduct.map((item, index) => (
                <Col xs={6} key={index}>
                  <CardProductView
                    image={item.image}
                    name={item.name}
                    description={item.description}
                    publicPrice={item.publicPrice}
                    privatePrice={item.privatePrice}
                  />
                </Col>
              ))}
            </Row>
            <div className={styles.contSeeMore}>
              <Button className={styles.btnShopMore}>SHOP MORE</Button>
            </div>
          </Col>
        </Row>
      </div>

      <div className={styles.contBestSeller}>
        <div className={styles.titleCenter}>
          <h2>Best Sellers</h2>
        </div>
        <CarouselBlock
          data={data}
          length={data.length}
          animating={animating}
          unIndicators
          slides={data.map((item, index) => (
            <CarouselItem
              onExiting={() => setAnimating(true)}
              onExited={() => setAnimating(false)}
              key={index}
              className={styles.setHeigthBestSeller}>
              <div className="item-content">
                <div className="content-center">
                  <div>
                    <Row>
                      <Col xs={4}>
                        <CardProductView
                          image="https://placeimg.com/640/480/nature/grayscale"
                          name="STAEDTLER"
                          description="Scissors with Safety Tip 14cm"
                          publicPrice="$2.50"
                          privatePrice="$2.50"
                        />
                      </Col>
                      <Col xs={4}>
                        <CardProductView
                          image="https://placeimg.com/640/480/nature/grayscale"
                          name="STAEDTLER"
                          description="Scissors with Safety Tip 14cm"
                          publicPrice="$2.50"
                        />
                      </Col>
                      <Col xs={4}>
                        <CardProductView
                          image="https://placeimg.com/640/480/nature/grayscale"
                          name="STAEDTLER"
                          description="Scissors with Safety Tip 14cm"
                          publicPrice="$2.50"
                          privatePrice="$2.50"
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        />
      </div>

      <div className={`container`} style={{marginTop: 50}}>
        <Row style={{flexDirection: 'row-reverse'}}>
          <Col md={6} xs={12}>
            <CarouselBlock
              data={data}
              length={data.length}
              animating={animating}
              unControl
              slides={data.map((item, index) => (
                <CarouselItem
                  onExiting={() => setAnimating(true)}
                  onExited={() => setAnimating(false)}
                  key={index}>
                  <img
                    width="100%"
                    height="100%"
                    src={item.src}
                    alt={item.altText}
                  />
                  <div className="item-content">
                    <div className="content-center">
                      <div className={styles.carouselItemContent}>
                        <span>
                          <b>New Arrivals</b>
                        </span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            />
          </Col>
          <Col md={6} xs={12}>
            <Row className={styles.productView}>
              {dataProduct.map((item, index) => (
                <Col xs={6} key={index}>
                  <CardProductView
                    image={item.image}
                    name={item.name}
                    description={item.description}
                    publicPrice={item.publicPrice}
                    privatePrice={item.privatePrice}
                  />
                </Col>
              ))}
            </Row>
            <div className={styles.contSeeMore}>
              <Button className={styles.btnShopMore}>SHOP MORE</Button>
            </div>
          </Col>
        </Row>
      </div>

      <div className={styles.contBrand}>
        <div className={styles.titleCenter}>
          <h2>Our Brand Partners</h2>
        </div>
        <CarouselBlock
          data={data}
          length={data.length}
          animating={animating}
          unIndicators
          slides={data.map((item, index) => (
            <CarouselItem
              onExiting={() => setAnimating(true)}
              onExited={() => setAnimating(false)}
              key={index}
              className={styles.setHeigthBrand}>
              <div className="item-content">
                <div className="content-center">
                  <div>
                    <Row>
                      {dataProduct.map((item, index) => (
                        <Col xs={3} key={index}>
                          <img
                            width="100%"
                            height="100%"
                            src={item.image}
                            alt=""
                          />
                        </Col>
                      ))}
                    </Row>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        />
      </div>

      <div className={styles.contMoreForYou}>
        <div className={styles.titleCenter}>
          <h2>More For You</h2>
        </div>
        <CarouselBlock
          data={data}
          length={data.length}
          animating={animating}
          unIndicators
          slides={data.map((item, index) => (
            <CarouselItem
              onExiting={() => setAnimating(true)}
              onExited={() => setAnimating(false)}
              key={index}
              className={styles.setHeigthMore}>
              <div className="item-content">
                <div className="content-center">
                  <div>
                    <Row>
                      <Col xs={6}>
                        <img
                          width="100%"
                          height="350px"
                          src="https://placeimg.com/640/480/nature/grayscale"
                          alt=""
                        />
                        <br />
                        <br />
                        <p>{text}</p>
                        <ButtonLink text="READ MORE" />
                      </Col>
                      <Col xs={6}>
                        <img
                          width="100%"
                          height="350px"
                          src="https://placeimg.com/640/480/nature/grayscale"
                          alt=""
                        />
                        <br />
                        <br />
                        <p>{text}</p>
                        <ButtonLink text="READ MORE" />
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        />
      </div>
      <div>
        <div
          className={styles.contForm}
          style={{
            background:
              "url('https://placeimg.com/640/480/nature/grayscale') no-repeat",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}>
          <div className={styles.formSubscribe}>
            <h2>Join Mailing List!</h2>
            <p>Subscribe to receive updates, store offers and more!</p>
            <Form>
              <Input
                className={styles.formInput}
                type=""
                name="name"
                id="name"
                placeholder="Name"
              />
              <Input
                className={styles.formInput}
                type="email"
                name="email"
                id="email"
                placeholder="Email Addpress"
              />
              <Button className={styles.btnSub}>SUBSCRIBE</Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.craft = {
  displayName: 'Home',
};

export default Home;
