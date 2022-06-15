import './App.css';
import {useState} from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link, Routes, Route, useParams} from "react-router-dom";
import { HeaderStyled } from './HeaderStyled';
import { Article } from './Article';
import { Nav } from './Nav';
import { Create } from './Create';
import { Read } from './Read';

function Control(){
  const params = useParams();
  const id = Number(params.id);
  let contextUI = null;
  if(id) {
    contextUI = <>
      <Button variant="outlined">Update</Button>
      <Button variant="outlined">Delete</Button>
    </>
  }
  return <>
    <Button component={Link} to="/create" variant="outlined">Create</Button>
  </>
}

function App() {
  const [mode,setMode] = useState('WELCOME'); //todo 삭제예정
  const [id, setId] = useState(null); // todo 삭제예정
  const [nextId, setNextId] = useState(3);
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
  ]);

  return (
    <div>
      <HeaderStyled onSelect={headerHandler()}></HeaderStyled>
      <Nav data={topics}  onSelect={navHandler()}></Nav>
      <Routes>
        <Route path="/" element={<Article title="Welcome" body="Hello, WEB!"></Article>}></Route>
        <Route path="/create" element={<Create onCreate={onCreateHandler()}></Create>} />
        <Route path="/read/:id" element={<Read topics={topics} ></Read>} />
        <Route path="/update/:id" element={<Read topics={topics} ></Read>} />

      </Routes>

      <Routes>
        {
          ['/','/read/:id', '/update/:id'].map(path=>{
            return <Route key={path} path = {path} element={<Control></Control>}></Route>
          })
        }
      </Routes>
      
    </div>
  );

  function onCreateHandler() {
    return (title, body) => {
      const newTopic = { id: nextId, title, body };
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setId(nextId);
      setMode('READ');
      setNextId(nextId + 1);
    };
  }

  function navHandler() {
    return (id) => {
      setMode('READ');
      setId(id);
    };
  }

  function deleteHandler() {
    return () => {
      const newTopics = topics.filter((e) => {
        if (e.id === id) {
          return false;
        } else {
          return true;
        }
      });
      setMode('WELCOME');
      setTopics(newTopics);
    };
  }

  function createHandler() {
    return () => {
      setMode('CREATE');
    };
  }

  function headerHandler() {
    return () => {
      setMode('WELCOME');
    };
  }
}

export default App;