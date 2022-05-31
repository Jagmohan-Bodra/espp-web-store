import {useRouter} from 'next/router';
import React, {useState, useEffect} from 'react';
import Collapse from '~/components/public/collapse';
import {parse} from '~/helpers/queryString';
import {DownArrow, ArrowRightIcon} from '~/lib/icons';

const today = new Date().toLocaleDateString();

const CollapseCategory = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const {title, children} = props;

  useEffect(() => {
    setIsOpen(false);
    if (title == 'Categories') {
      setIsOpen(true);
    }
  }, []);

  return (
    <div className={`collapse-category`}>
      <div
        className={`collapse-category_title`}
        onClick={() => setIsOpen(!isOpen)}>
        <div>{title}</div>
        <div>{isOpen ? <DownArrow /> : <ArrowRightIcon />}</div>
      </div>
      <div className={`collapse-category_collapse`}>
        <Collapse isOpen={isOpen}>{children}</Collapse>
      </div>
    </div>
  );
};

const CollapseCategoryChildren = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const {title, children} = props;
  useEffect(() => {
    setIsOpen(false);
  }, []);
  return (
    <div className={`collapse-category-children`}>
      <div
        className={`collapse-category-children_title`}
        onClick={() => setIsOpen(!isOpen)}>
        <div>{title}</div>
        <div>{isOpen ? '-' : '+'}</div>
      </div>
      <div className={`collapse-category-children_collapse`}>
        <Collapse isOpen={isOpen}>{children}</Collapse>
      </div>
    </div>
  );
};

const renderCollapseLoop = (data, index, onChange, isActiveFunc) => {
  const isActive = isActiveFunc(data.id);

  if ((data.children || []).length > 0) {
    return (
      <CollapseCategoryChildren title={data.name} key={index}>
        <div
          key={index}
          className={`collapse-category_link ${isActive ? 'active' : ''}`}
          onClick={() => !isActive && onChange && onChange(data.id)}>
          ALL
        </div>
        {(data.children || []).map((chItem, chIndex) =>
          renderCollapseLoop(chItem, chIndex, onChange, isActiveFunc),
        )}
      </CollapseCategoryChildren>
    );
  }
  return (
    <div
      key={index}
      className={`collapse-category_link ${isActive ? 'active' : ''}`}
      onClick={() => !isActive && onChange && onChange(data.id)}>
      {data.name}
    </div>
  );
};

const MenuLeft = (props) => {
  const {data, onChange} = props;

  const router = useRouter();
  const queryBuilder = parse(router.query) || {};

  const handleOnChange = (item) => (id) => {
    if (item.name == 'Categories') {
      onChange({'productCategories.id': {objectId: id}});
    }
    if (item.name == 'Brands') {
      onChange({'brands.id': {objectId: id}});
    }
    if (item.name == 'Colors') {
      onChange({'colors.id': {objectId: id}});
    }
    if (item.name == 'Tags') {
      onChange({'tags.id': {objectId: id}});
    }
  };

  const isActive = (item) => (id) => {
    if (item.name == 'Categories') {
      const value = queryBuilder['productCategories.id']?.objectId;
      return value == id;
    }
    if (item.name == 'Brands') {
      const value = queryBuilder['brands.id']?.objectId;
      return value == id;
    }
    if (item.name == 'Colors') {
      const value = queryBuilder['colors.id']?.objectId;
      return value == id;
    }
    if (item.name == 'Tags') {
      const value = queryBuilder['tags.id']?.objectId;
      return value == id;
    }
    return false;
  };

  return (
    <div className={`shop-page_menu_left`}>
      <CollapseCategoryPromotion
        onClick={() =>
          onChange && onChange({'promotions.startDate': {inDateOfDay: today}})
        }
      />
      {(data || []).map((item, index) => (
        <CollapseCategory title={item.name} key={index}>
          <div
            className={`collapse-category_link`}
            onClick={() =>
              onChange &&
              onChange(
                item.name == 'Categories'
                  ? {'productCategories.id': {objectId: ''}}
                  : item.name == 'Brands'
                  ? {'brands.id': {objectId: ''}}
                  : item.name == 'Colors'
                  ? {'colors.id': {objectId: ''}}
                  : item.name == 'Tags'
                  ? {'tags.id': {objectId: ''}}
                  : {},
              )
            }>
            ALL
          </div>
          {(item.children || []).map((children, cIndex) =>
            renderCollapseLoop(
              children,
              cIndex,
              handleOnChange(item),
              isActive(item),
            ),
          )}
        </CollapseCategory>
      ))}
    </div>
  );
};

export default MenuLeft;

const CollapseCategoryPromotion = (props) => {
  return (
    <div className={`collapse-category`}>
      <div className={`collapse-category_title`} onClick={props.onClick}>
        <div>{'Promotion'}</div>
      </div>
    </div>
  );
};
