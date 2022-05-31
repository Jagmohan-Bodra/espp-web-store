import {useEffect, useState} from 'react';
import {Row, Col} from 'reactstrap';
import ThemeMenu from '~/components/public/menu/ThemeMenu';
import {getItemVariant} from '~/helpers/common';
import Magnifying from './Magnifying';
import Shopping from './Shopping';
import User from './User';
import Router from 'next/router';

const cssClass = 'theme-espp-theme';

const EsppTheme = (props) => {
  const {data, isHome} = props;
  const [onTop, setonTop] = useState(true);
  const obj = {
    logo_header: getItemVariant(data, 'theme_logo'),
    menu_header: getItemVariant(data, 'theme_menu'),
    about_us_footer: getItemVariant(data, 'theme_about_us'),
    customer_care_footer: getItemVariant(data, 'theme_customer_care'),
    connect_witd_us_footer: getItemVariant(data, 'theme_connect_with_us'),
    contact_us_footer: getItemVariant(data, 'theme_contact_us'),
    logo_footer: getItemVariant(data, 'theme_footer_logo'),
    copyright_footer: getItemVariant(data, 'footer_copyright'),
  };

  const handleScroll = () => {
    if (window.scrollY < 100) {
      setonTop(true);
    } else {
      setonTop(false);
    }
  };

  const handleGoHome = () => {
    Router.push({pathname: '/'});
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // cleanup this component
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`${cssClass}`}>
      <div
        className={`${cssClass}_menu shadow-sm  ${isHome ? 'home' : ''} ${
          onTop ? 'ontop' : ''
        }`}>
        <div className={`${cssClass}_header`}>
          <span className={`${cssClass}_header_span`}>
            Promotional Message Content
          </span>
        </div>
        <div className={`${cssClass}_menu_group container-fluid`}>
          <a className={`${cssClass}_menu_group_logo`} onClick={handleGoHome}>
            <img src={obj?.logo_header?.values?.value || ''} />
          </a>
          <div className={`${cssClass}_menu_group_menu`}>
            <ThemeMenu
              data={obj?.menu_header?.values?.value || []}
              block={
                <div className={`${cssClass}_menu_group_menu_action`}>
                  <Magnifying />
                  <Shopping />
                  <User />
                </div>
              }
            />
          </div>
        </div>
      </div>
      <div className={`${cssClass}_body`}>{props.children}</div>
      <div className={`${cssClass}_footer`}>
        <div className={`${cssClass}_footer_group container`}>
          <Row>
            <Col xl="3" lg="3" md="6" sm="6" xs="12">
              <div className={`${cssClass}_footer_group_col`}>
                <div className={`${cssClass}_footer_group_col_title`}>
                  About Us
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: obj?.about_us_footer?.values?.value,
                  }}></div>
              </div>
            </Col>
            <Col xl="3" lg="3" md="6" sm="6" xs="12">
              <div className={`${cssClass}_footer_group_col`}>
                <div className={`${cssClass}_footer_group_col_title`}>
                  Customer Care
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: obj?.customer_care_footer?.values?.value,
                  }}></div>
              </div>
            </Col>
            <Col xl="3" lg="3" md="6" sm="6" xs="12">
              <div className={`${cssClass}_footer_group_col`}>
                <div className={`${cssClass}_footer_group_col_title`}>
                  Connect with Us{' '}
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: obj?.connect_witd_us_footer?.values?.value,
                  }}></div>
              </div>
            </Col>
            <Col xl="3" lg="3" md="6" sm="6" xs="12">
              <div className={`${cssClass}_footer_group_col`}>
                <div className={`${cssClass}_footer_group_col_title`}>
                  Contact Us
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: obj?.contact_us_footer?.values?.value,
                  }}></div>
              </div>
            </Col>
          </Row>
          <hr className={`${cssClass}_footer_group_hr mt-5`} />
          <div className={`${cssClass}_footer_group_block`}>
            <div className={`${cssClass}_footer_group_block_text`}>
              <div
                dangerouslySetInnerHTML={{
                  __html: obj?.copyright_footer?.values?.value,
                }}></div>
            </div>
            <div className={`${cssClass}_footer_group_block_logo`}>
              <img src={obj?.logo_footer?.values?.value} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EsppTheme;
