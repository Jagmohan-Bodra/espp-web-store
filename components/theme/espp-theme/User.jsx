import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {isEmptyToken} from '~/helpers/common';
import {CustomerIcon, DownArrow} from '~/lib/icons';
import Router from 'next/router';
import {reqSignOut} from '~/reduxs/me/action';
import pathRouter from '~/constants/path-router';

const User = () => {
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const me = useSelector((state) => state.me.data);
  const emptyToken = isEmptyToken();

  const handleLogout = () => {
    dispatch(reqSignOut(Router));
  };

  const handleLogin = () => {
    Router.push({pathname: '/auth/sign-in'});
  };

  const handleMyCompares = () => {
    Router.push({pathname: '/shop/my-compares'});
  };

  const handleProfile = () => {
    Router.push({pathname: pathRouter.PROFILE_INFO});
  };

  return (
    <div className={`theme-user-component`}>
      <Dropdown
        isOpen={dropdownOpen}
        toggle={toggle}
        className={`theme-user-component_dropdown`}>
        <DropdownToggle
          caret
          className={`theme-user-component_dropdown_toggle`}>
          <CustomerIcon className={`ml-2`} />
          <DownArrow />
        </DropdownToggle>
        <DropdownMenu className={`theme-user-component_dropdown_toggle_menu`}>
          <div className={`arrow-popup-drop-down-menu`}>
            <span />
          </div>
          {!emptyToken && (
            <DropdownItem header>
              {me.firstName || ''} {me.lastName || ''}
            </DropdownItem>
          )}
          {!emptyToken && (
            <DropdownItem onClick={handleProfile}>My Profile</DropdownItem>
          )}
          <DropdownItem onClick={handleMyCompares}>My Compares</DropdownItem>
          {!emptyToken && (
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          )}
          {emptyToken && (
            <DropdownItem onClick={handleLogin}>Login</DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default User;
