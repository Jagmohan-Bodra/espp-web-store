import {useRouter} from 'next/router';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Nav,
  DropdownToggle,
} from 'reactstrap';
import {isEmpty, isArray} from 'validate.js';
import {openRightModal} from '~/components/modals/right-modal/common';

const cssClass = 'component-theme-menu-navbar-collapse';

const ThemeMenu = (props) => {
  const {data, block} = props;
  const router = useRouter();
  // const [isOpen, setIsOpen] = useState(false);
  // const toggle = () => setIsOpen(!isOpen);

  const checkActive = (link) => {
    if (router.asPath === link) {
      return true;
    }
    return;
  };

  const checkActiveHasSub = () => {
    if (router.asPath && router.asPath.includes('about-us/')) {
      return 'active';
    }
    return '';
  };

  const dropdownMenuSub = (item, index) => {
    if (!isEmpty(item.children)) {
      return (
        <UncontrolledDropdown
          inNavbar
          className={`${cssClass}_nav_uncontrolled_dropdown`}
          key={index}>
          <DropdownToggle
            nav
            caret
            className={`${cssClass}_nav_uncontrolled_dropdown_toggle ${checkActiveHasSub()}`}>
            {`${item.title}`}
          </DropdownToggle>
          <DropdownMenu
            right
            className={`${cssClass}_nav_uncontrolled_dropdown_dropdown_menu`}>
            <div className={`arrow-popup-drop-down-menu`}>
              <span />
            </div>
            {item.children.map((sub, subIndex) => {
              if (isEmpty(sub.children)) {
                return (
                  <DropdownItem
                    href={sub.url}
                    key={subIndex}
                    className={`${cssClass}_nav_uncontrolled_dropdown_dropdown_menu_dropdownitem`}>
                    {sub.title}
                  </DropdownItem>
                );
              }
              return dropdownMenuSub(sub, subIndex);
            })}
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    }
  };

  const onMenuClick = () => {
    openRightModal({
      header: block,
      headerTip: ' ',
      body: (
        <Collapse navbar className={`${cssClass}`} isOpen={true}>
          <Nav navbar className={`${cssClass}_nav`}>
            {data.map((item, index) =>
              !isEmpty(item.children) ? (
                dropdownMenuSub(item, index)
              ) : (
                <NavItem key={index} className={`${cssClass}_nav_navitem`}>
                  <NavLink
                    href={`${item.url}`}
                    active={checkActive(item.url)}
                    className={`${cssClass}_nav_navitem_link`}>{`${item.title}`}</NavLink>
                </NavItem>
              ),
            )}
          </Nav>
        </Collapse>
      ),
      footer: '',
      className: 'theme_menu',
    });
  };

  return (
    <div>
      <Navbar
        color="light"
        light
        expand="md"
        className={`component-theme-menu`}>
        <NavbarToggler
          onClick={onMenuClick}
          className={`component-theme-menu-navbar-toggler`}
        />
        <Collapse navbar className={`${cssClass}`}>
          <Nav navbar className={`${cssClass}_nav`}>
            {isArray(data) &&
              data.map((item, index) => {
                if (!isEmpty(item.children)) {
                  return dropdownMenuSub(item, index);
                }
                return (
                  <NavItem key={index} className={`${cssClass}_nav_navitem`}>
                    <NavLink
                      href={`${item.url}`}
                      active={checkActive(item.url)}
                      className={`${cssClass}_nav_navitem_link`}>{`${item.title}`}</NavLink>
                  </NavItem>
                );
              })}
          </Nav>
          {block && (
            <NavbarText className={`${cssClass}_navbartext`}>
              {block}
            </NavbarText>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default ThemeMenu;
