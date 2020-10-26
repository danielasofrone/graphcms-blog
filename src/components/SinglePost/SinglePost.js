import React from 'react';
import { useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as S from '../homePage.styled'
import Navbar from 'react-bootstrap/Navbar';
import { useParams } from "react-router-dom";

const GET_POST = gql`
query ($slug: String) {
  post(stage: PUBLISHED, locales: en, where: {slug: $slug}) {
    title,
    author { name},
    coverImage {
      url
    },
    content {
      html
    }
  }
}
`;
const SinglePost = () => {

function createMarkup(posts) {
  return { __html: posts };
}

const {slug} = useParams();

  const { loading, error, data } = useQuery(GET_POST, {
    variables: {slug: slug},

  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  console.log(loading, error, data);

  return (
    <>
     <S.NavBar>
     <Navbar bg="light">
       <Navbar.Brand href="/">GraphQl exercice</Navbar.Brand>
      </Navbar>
     </S.NavBar>
     <S.Container>
     <S.Card>
        <h2>{data.post.title}</h2>
        <img src={data.post.coverImage.url} alt={data.post.title} />
        <p dangerouslySetInnerHTML={createMarkup(data.post.content.html)} />
       </S.Card>
      </S.Container>
    </>
  );
}

export default SinglePost;


