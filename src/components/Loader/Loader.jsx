import { InfinitySpin } from 'react-loader-spinner';
import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div className={styles.loader}>
      <InfinitySpin width="200" color="#4fa94d" />
    </div>
  );
}