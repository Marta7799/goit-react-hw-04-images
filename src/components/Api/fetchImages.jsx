import axios from 'axios';

const API_KEY = '39809012-794bb9f85c23fb448d6e12ec5';

export const fetchImages = (query, page, perPage) => {
  const [images, setImages] = useState([]);

  const [error, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const clearImages = () => setImages([]);

  useEffect(() => {
    if (query === '') return;
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        await axios
          .get(
            `https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=${perPage}&safesearch=true`
          )
          .then(response => {
            setImages(oldImages => [...oldImages, ...response.data.hits]);
          });
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [query, page, perPage]);

  return {
    images,
    error,
    isLoading,
    clearImages,
  };
};
