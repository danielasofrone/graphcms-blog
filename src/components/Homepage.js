import React, {useState} from 'react';
import { useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as S from './homePage.styled'
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';

const HomePage = () => {
  const [search, setSearch] = useState('');

  const GET_POSTS = gql`
query {
  posts(stage: PUBLISHED, locales: en) {
    title,
    author { name},
    slug,
    excerpt,
    coverImage {
      url
    },
    content {
      html
    }
  }
}
`;

function createMarkup(posts) {
  return { __html: posts };
}

  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  console.log(loading, error, data);

  return (
    <>
     <S.NavBar>
     <Navbar bg="light">
       <Navbar.Brand href="#home">GraphQl exercice</Navbar.Brand>
      </Navbar>
     </S.NavBar>
     <S.Container>
    <Form>
    <S.SearchBarContainer>
        <Form.Control
        type="text"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}/>
     </S.SearchBarContainer>
    </Form>
    {data.posts.map(post => (
     <S.Card key={post.slug}>
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
        <p dangerouslySetInnerHTML={createMarkup(post.content.html)} />
       </S.Card>
    ))}
      </S.Container>
    </>
  );
}

export default HomePage;


