import { useState, useEffect } from 'react';
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

  // ✅ Sadece burası fetch işlemini yapacak
  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchImages(query, page);
        // Sayfa 1 ise yeni arama, değilse ekleme
        setImages(prev =>
          page === 1 ? result.results : [...prev, ...result.results]
        );
        setError(null);
      } catch (error) {
        setError('Veri alınırken hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    if (newQuery === query) return; // Aynı arama tekrar yapılmasın
    setQuery(newQuery);
    setPage(1);          // Sayfayı sıfırla
    setImages([]);       // Eski sonuçları temizle
  };

  const openModal = (image) => {
    setModalData(image);
  };

  const closeModal = () => {
    setModalData(null);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1); // Sadece sayfayı artır, useEffect çalışır
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
