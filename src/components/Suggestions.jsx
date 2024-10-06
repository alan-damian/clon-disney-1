import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';




const Container = styled.div`
    display: grid;
    grid-gap: 25px;
    gap: 25px;
    grid-template-columns: repeat(4, minmax(0, 1fr));

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`;

const Suggestion = styled.div`
    padding-top: 56.25%;
    border-radius: 10px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    border: 3px solid rgba(249, 249, 249, 0.1);

    img {
        inset: 0px;
        display: block;
        height: 100%;
        object-fit: cover;
        opacity: 1;
        position: absolute;
        transition: opacity 500ms ease-in-out 0s;
        width: 100%;
        z-index: 1;
        top: 0;
    }

    &:hover {
        box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
        rgb(0 0 0 / 72%) 0px 30px 22px -10px;
        transform: scale(1.05);
        border-color: rgba(249, 249, 249, 0.8);
    }
`;



const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
`;

const Suggestions = () => {
  const categories = ['recommend', 'trending', 'original', 'newDisney']
  let randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const movies = useSelector((state) => state.movie[randomCategory]);
  const randomMovies = [...movies]?.sort(() => Math.random() - 0.5)?.slice(0, 4);  
  return (
    <>
    <h1>Suggestions</h1>
    <Container>
      {randomMovies?.map((movie) => (
        <Suggestion key={movie.id}>
          <Link to={`/detail/${movie.id}`}>
            <Image src={movie.cardImg} alt={movie.title} />
          </Link>
        </Suggestion>
      ))}
    </Container>
    </>
  );
};

export default Suggestions;