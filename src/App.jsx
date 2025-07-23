import { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import { fetchImages } from './services/api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';

function App() {
  const [images, setImages] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

const handleSearch = async (query) => {
  try {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setError(null);          
    setIsLoading(true);
    setQuery(query);  
    setPage(1);               
    const data = await fetchImages(query);
    setImages(data.results);
  } catch (error) {
    console.error(error.message);
  } finally {
    setIsLoading(false);
  }
};

  const openModal = (image) => {
    setModalData(image);
  };

  const closeModal = () => {
    setModalData(null);
  };

  const handleLoadMore = async () => {
  try {
    setIsLoading(true);
    const nextPage = page + 1;
    const data = await fetchImages(query, nextPage);
    setImages(prev => [...prev, ...data.results]); // eski resimlere ekle
    setPage(nextPage);
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      <ImageModal isOpen={modalData !== null} onClose={closeModal} image={modalData} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <LoadMoreBtn onClick={handleLoadMore} />}
    </>
  );
}

export default App;