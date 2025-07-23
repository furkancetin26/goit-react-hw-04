import Modal from 'react-modal';
import styles from './ImageModal.module.css';

Modal.setAppElement('#root'); // erişilebilirlik için gerekli

export default function ImageModal({ isOpen, onClose, image }) {
  if (!image) return null;

  const { alt_description, urls, user, likes } = image;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      overlayClassName={styles.overlay}
      className={styles.modal}
    >
      <img src={urls.regular} alt={alt_description} />
      <div className={styles.info}>
        <p><strong>Author:</strong> {user.name}</p>
        <p><strong>Likes:</strong> {likes}</p>
        {alt_description && <p><strong>Description:</strong> {alt_description}</p>}
      </div>
    </Modal>
  );
}