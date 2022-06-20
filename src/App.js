import './App.css';
import {useState, useEffect} from 'react';
import { Routes, Route, useNavigate} from "react-router-dom";
import { HeaderStyled } from './HeaderStyled';
import { Article } from './Article';
import { Nav } from './Nav';
import { Create } from './Create';
import { Read } from './Read';
import { Control } from './Control';

function App() {
  const [mode,setMode] = useState('WELCOME'); //todo 삭제예정
  const [id, setId] = useState(null); // todo 삭제예정
  // const [nextId, setNextId] = useState(3);
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
  ]);
  const refreshTopics = async ()=> {
    const resp = await fetch('http://localhost:3333/topics');
    const data = await resp.json();
    setTopics(data);
  };
  useEffect(()=>{
    refreshTopics();
  }, []);
  const navigate = useNavigate();
  return (
    <div>
      <HeaderStyled onSelect={headerHandler()}></HeaderStyled>
      <Nav data={topics}  onSelect={navHandler()}></Nav>
      <Routes>
        <Route path="/" element={<Article title="Welcome" body="Hello, WEB!"></Article>}></Route>
        <Route path="/create" element={<Create onCreate={onCreateHandler}></Create>} />
        <Route path="/read/:id" element={<Read topics={topics} ></Read>} />
        <Route path="/update/:id" element={<Read topics={topics} ></Read>} />

      </Routes>

      <Routes>
        {
          ['/','/read/:id', '/update/:id'].map(path=>{
            return <Route key={path} path = {path} element={<Control onDelete={(id)=> {
              //delete topic
              deleteHandler(id)
            }}></Control>}></Route>
          })
        }
      </Routes>
      
    </div>
  );
  async function onCreateHandler(title, body) {
    const resp = await fetch('http://localhost:3333/topics', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, body})
    })
    const data = await resp.json();
    navigate(`/read/${data.id}`);
    refreshTopics();
  }


  function navHandler() {
    return (id) => {
      setMode('READ');
      setId(id);
    };
  }

  function deleteHandler(id) {
    const newTopics = topics.filter((e) => {
      if (e.id === id) {
        return false;
      } else {
        return true;
      }
    });
    setTopics(newTopics);
    navigate('/');
  }

  // function createHandler() {
  //   return () => {
  //     setMode('CREATE');
  //   };
  // }

  function headerHandler() {
    return () => {
      setMode('WELCOME');
    };
  }
}

export default App;