import React from 'react';
import styles from './styles.module.scss';

const BreadcrumbConponent = (props) => {
  const {data} = props;
  return (
    <div>
      {(data || []).map((item, index) => (
        <a
          className={styles.breadcrumblink}
          key={index}
          href={'/' + item.link || '#'}>
          {item.name + ' > '}
        </a>
      ))}
    </div>
  );
};

export default BreadcrumbConponent;
