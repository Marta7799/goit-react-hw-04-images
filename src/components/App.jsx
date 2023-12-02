import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { useState, useEffect } from 'react';
import { useFetch } from './Api/fetchImages';

export const App = () => {
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [page, setPage] = useState(1);
  const { images, isLoading, clearImages } = useFetch(query, page, 12);

  const handleSubmit = e => {
    e.preventDefault();
    clearImages();

    const form = e.currentTarget;
    const input = form.elements.input.value;
    setQuery(input);
    setPage(1);
    form.reset();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleImageClick = imageID => {
    const element = images.filter(image => {
      return image.id === imageID;
    });
    const clickImg = element[0];
    setLargeImage(clickImg);
    setIsModalOpen(true);
  };

  const loadMoreClick = () => {
    setPage(page + 1);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      {isModalOpen ? (
        <Modal clickImage={largeImage} handleClose={closeModal} />
      ) : null}
      <Searchbar handleSubmit={handleSubmit} />
      {isLoading & (page <= 1) ? <Loader /> : null}
      <ImageGallery>
        <ImageGalleryItem images={images} onClick={handleImageClick} />
      </ImageGallery>
      {isLoading & (page >= 2) ? <Loader /> : null}

      {images.length === 0 ? null : <Button handleClick={loadMoreClick} />}
    </div>
  );
};
