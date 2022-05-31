import styles from './styles.module.scss';

const StaticMenuButton = () => {
  const handleExpend = () => {
    var x = document.getElementById('wiooh-Jx50sgwuy');
    if (x.style.display === 'block') {
      x.style.display = 'none';
    } else {
      x.style.display = 'block';
    }
  };
  return (
    <div className={styles.static_menu_button} onClick={handleExpend}>
      <i className="fa fa-bars"></i>
    </div>
  );
};

export default StaticMenuButton;
