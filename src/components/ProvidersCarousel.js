import React from 'react';
import { isMobile, isIE } from '../utils/browser';
import shuffle from 'lodash/shuffle';
import ProvidersCard from './ProvidersCard';
import { FormattedMessage as Trans } from 'react-intl';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Dot } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import '../styles/ProvidersCarousel.scss';

class ProvidersCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.providers = shuffle(props.providers);

  }

  render() {
    let visibleSlides = isMobile() ? 1 : 2;
    const providers = this.providers;

    if(isIE()) {
      return (
        <ul className='ProvidersCarousel--IE'>
          {providers.map((provider,idx) =>
            <li key={idx}>
              <ProvidersCard provider={provider} />
            </li>
          )}
        </ul>
      );
    }

    return (
      <div className="ProvidersCarousel">
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={70}
          lockOnWindowScroll={true}
          isPlaying={true}
          interval={3000}
          totalSlides={providers.length}
          visibleSlides={visibleSlides}>

          <ul className="pagination">
            <li className="page-item col-mr-auto">
              <ButtonBack className="btn btn-link btn-dir">
                <i className="icon icon-arrow-left mr-2"></i>
                <Trans id="prev" />
              </ButtonBack>
            </li>
            {providers.map((_,i) =>
              <li key={i} className="page-item page-dots">
                <Dot className="btn btn-link" slide={i}>{i+1}</Dot>
              </li>
            )}
            <li className="page-item col-ml-auto">
              <ButtonNext className="btn btn-link btn-dir">
                <Trans id="more" />
                <i className="icon icon-arrow-right ml-2"></i>
              </ButtonNext>
            </li>
          </ul>

          <Slider>
            {providers.map((provider,idx) =>
              <Slide key={idx} index={idx}>
                <ProvidersCard provider={provider} />
              </Slide>
            )}
          </Slider>


        </CarouselProvider>
      </div>
    )
  }
}

export default ProvidersCarousel;
