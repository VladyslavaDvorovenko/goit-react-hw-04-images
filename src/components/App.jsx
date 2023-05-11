import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { searchImages } from '../api/api';
import css from './App.module.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState('');
  const [onClick] = useState(false);

  useEffect(() => {
    if (!query) return;
    (async function () {
      try {
        setIsLoading(true);

        const { images, totalHits } = await searchImages(query, page);
        if (!images.length) {
          setError('There are no images matching your request.');
          return;
        }

        setImages(prevState => [...prevState, ...images]);
        setError('');
        setTotalHits(totalHits);
      } catch (error) {
        setError('Oops. Something went wrong, try again');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [query, page]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const getQuery = value => {
    if (!value.trim || value === query) {
      setError('Please, change your request');
      return;
    }

    setQuery(value);
    setPage(1);
    setImages([]);
    setTotalHits(0);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <section className={css.container}>
      <Searchbar onSubmit={getQuery} />
      {images.length !== 0 && (
        <ImageGallery images={images} onClick={onClick} />
      )}
      {!isLoading && images.length === 0 && !error && (
        <p>There are no images.</p>
      )}
      {error && <p>{error}</p>}
      {!isLoading && totalHits !== images.length && (
        <Button type="button" onClick={loadMore}>
          {' '}
          Load more{' '}
        </Button>
      )}
      {isLoading && <Loader />}
    </section>
  );
};
