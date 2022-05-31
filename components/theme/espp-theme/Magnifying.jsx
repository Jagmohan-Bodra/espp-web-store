import Router from 'next/router';
import {useState} from 'react';
import {Input, InputGroupAddon, InputGroup} from 'reactstrap';
import {
  openRightModal,
  closeRightModal,
} from '~/components/modals/right-modal/common';
import pathRouter from '~/constants/path-router';
import {stringify} from '~/helpers/queryString';
import {MagnifyingGlass} from '~/lib/icons';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const handleSubmit = () => {
    Router.push({
      pathname: pathRouter.SHOP_PAGE,
      query: stringify({
        name: {
          regex: search.replace(/\s+/g, ' ').trim(),
        },
      }),
    });
    setSearch('');
    closeRightModal();
  };

  return (
    <InputGroup>
      <Input
        className={`input_search`}
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <InputGroupAddon addonType="append" onClick={handleSubmit}>
        <svg
          color={`#c8c8c8`}
          aria-hidden="true"
          focusable="false"
          data-prefix="fal"
          data-icon="long-arrow-right"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="svg-inline--fa fa-long-arrow-right fa-w-14 fa-2x">
          <path
            fill="currentColor"
            d="M311.03 131.515l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L387.887 239H12c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h375.887l-83.928 83.444c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l116.485-116c4.686-4.686 4.686-12.284 0-16.971L328 131.515c-4.686-4.687-12.284-4.687-16.97 0z"></path>
        </svg>
      </InputGroupAddon>
    </InputGroup>
  );
};

const Magnifying = () => {
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  // const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleClick = () => {
    openRightModal({
      header: ' ',
      headerTip: ' ',
      body: <SearchInput />,
      footer: '',
      className: 'magnifying',
    });
  };

  return (
    <div className={`theme-magnifying-component`}>
      <MagnifyingGlass
        style={{cursor: 'pointer', width: '30px'}}
        onClick={handleClick}
      />
      {/* <Dropdown
        isOpen={dropdownOpen}
        toggle={toggle}
        className={`theme-magnifying-component_dropdown`}>
        <DropdownToggle
          caret
          className={`theme-magnifying-component_dropdown_toggle`}>
          <MagnifyingGlass />
        </DropdownToggle>
        <DropdownMenu
          right
          className={`theme-magnifying-component_dropdown_toggle_menu`}>
          <DropdownItem
            text
            className={`theme-magnifying-component_dropdown_dropdown_item`}>
            <Form className={`input-group`}>
              <Input
                className={`theme-magnifying-component_dropdown_dropdown_item_input form-control `}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                className={`theme-magnifying-component_dropdown_dropdown_item_button btn m-0`}
                onClick={handleSubmit}>
                SEARCH
              </Button>
            </Form>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown> */}
    </div>
  );
};

export default Magnifying;
