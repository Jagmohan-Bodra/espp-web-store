import React, {useState} from 'react';
import styles from './styles.module.scss';

const MennuList = (props) => {
  const [visible, setVisible] = useState(false);
  const {name, data, onChange, viewAll, value} = props;
  return (
    <div className={styles.menuListMain}>
      <div className={styles.titleMenu} onClick={() => setVisible(!visible)}>
        <i className={styles.titleMenuLeft}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            fill="currentColor"
            className="bi bi-circle-fill"
            viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" />
          </svg>
        </i>
        <span className={styles.titleMenuCenter}>{name}</span>
        <span className={styles.titleMenuRight}>{visible ? '-' : '+'}</span>
      </div>
      {visible && (
        <ul className={styles.listDropDown}>
          {(data || []).map((item, index) => (
            <li key={index} className={value == item._id && styles.active}>
              <span
                className={styles.textName}
                key={index}
                onClick={() => onChange(item._id)}>
                {item.name}
              </span>
            </li>
          ))}
          <li onClick={() => viewAll && viewAll()}>
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="12"
                fill="currentColor"
                className="bi bi-arrow-right"
                viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                />
              </svg>
            </i>
            <span className={styles.textViewAll}>VIEW ALL</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default MennuList;
