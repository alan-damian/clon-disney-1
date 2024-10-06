import styled from 'styled-components';
import ImgSlider from './ImgSlider';
import Viewers from './Viewers';
import Recommends from './Recommends';
import NewDisney from './NewDisney';
import Originals from './Originals';
import Trending from './Trending';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { setMovies } from '../features/movie/movieSlice';
import { selectUserName } from '../features/user/userSlice';


const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png")center center / cover no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const moviesRef = collection(db, 'movies');

  const fetchMovies = useCallback(async () => {
    const querySnapshot = await getDocs(moviesRef);
    const movies = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const recommends = [];
    const newDisneys = [];
    const originals = [];
    const trending = [];

    movies.forEach((movie) => {
      switch (movie.type) {
        case "recommend":
          recommends.push(movie);
          break;
        case 'new':
          newDisneys.push(movie);
          break;
        case 'original':
          originals.push(movie);
          break;
        case 'trending':
          trending.push(movie);
          break;
        default:
          console.log('Tipo de película no reconocido:', movie.type);
      }
    });

    dispatch(setMovies({ recommend: recommends, newDisney: newDisneys, original: originals, trending: trending }));
  }, [dispatch, moviesRef]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies, userName]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

export default Home;