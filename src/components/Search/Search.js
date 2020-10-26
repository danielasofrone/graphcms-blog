import React, {useState} from 'react';
import { useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as S from '../homePage.styled'
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import {Link, useParams} from 'react-router-dom'

const GET_POSTS = gql`
query($query: String) {
  posts(stage: PUBLISHED, locales: en, where: { _search: $query }) {
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

const Search = () => {
  const [search, setSearch] = useState('');

function createMarkup(posts) {
  return { __html: posts };
}

const { query } = useParams()

  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: {
      query
    }
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <>
     <S.NavBar>
     <Navbar bg="light">
       <Navbar.Brand href="/">GraphQl exercice</Navbar.Brand>
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
       <Link to={`/post/${post.slug}`}> 
       <h2>{post.title}</h2>
       </Link>
        <p dangerouslySetInnerHTML={createMarkup(post.excerpt)} />
       </S.Card>
    ))}
      </S.Container>
    </>
  );
}

export default Search;


