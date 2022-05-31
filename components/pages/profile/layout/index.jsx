import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';
import Collapse from '~/components/public/collapse';
import pathRouter from '~/constants/path-router';

const menuData = [
  {
    title: 'Profile',
    url: pathRouter.PROFILE_INFO,
  },
  {
    title: 'Address Book',
    url: pathRouter.PROFILE_ADDRESS_BOOK,
  },
  {
    title: 'Order History',
    url: pathRouter.PROFILE_ORDER_HISTORY,
  },
  {
    title: 'Wishlist',
    url: pathRouter.PROFILE_WISHLIST,
  },
];

const ProfileLayoutComponent = (props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (link) => {
    if (
      router.pathname === pathRouter.PROFILE_ORDER_VIEW &&
      link === pathRouter.PROFILE_ORDER_HISTORY
    ) {
      return true;
    }
    return router.asPath === link;
  };

  return (
    <div className={`profile-layout-component`}>
      <div className={`profile-layout-component_body`}>
        <div className={`profile-layout-component_body_left`}>
          <button
            className={`profile-layout-component_body_left_btn_nav`}
            onClick={() => setIsOpen(!isOpen)}>
            nav
          </button>
          <div className={`profile-layout-component_body_left_collapse`}>
            <Collapse
              isOpen={isOpen}
              className={`profile-layout-component_body_left_collapse_group`}>
              <div
                className={`profile-layout-component_body_left_collapse_group_box`}>
                {menuData.map((item, index) => (
                  <div
                    key={index}
                    className={`profile-layout-component_body_left_collapse_group_box_link ${
                      isActive(item.url) ? 'active' : ''
                    }`}>
                    <Link href={item.url}>{item.title}</Link>
                  </div>
                ))}
              </div>
            </Collapse>
          </div>
        </div>
      </div>

      <div className={`profile-layout-component_body_content`}>
        {props.children}
      </div>
    </div>
  );
};

export default ProfileLayoutComponent;
