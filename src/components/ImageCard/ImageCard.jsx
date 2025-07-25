import styles from './ImageCard.module.css';

export default function ImageCard({ image, onClick }) {
  const { alt_description, urls } = image;

  return (
    <div className={styles.card} >
      <img src={urls.small} alt={alt_description} onClick={() => onClick(image)}/>
    </div>
  );
}