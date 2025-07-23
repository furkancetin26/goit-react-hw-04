import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';

export default function ImageGallery({ images, onImageClick }) {
  if (images.length === 0) return null;

  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard image={image} onClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
}