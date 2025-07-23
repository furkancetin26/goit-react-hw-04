import styles from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ onClick }) {
  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={onClick}>
        Daha Fazla Yükle
      </button>
    </div>
  );
}