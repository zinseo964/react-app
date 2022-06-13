// import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useState} from 'react';

function Header(props){ //component 이름은 반드시 대문자로 시작해야한다
  return <header><h1><a href="/" onClick={(evt)=> {
    console.log('evt', evt);
    console.log(props);
    evt.preventDefault();
    props.onSelect(); // onSelect is called
  }}>Web</a></h1></header> //component는 단 하나의 태그를 return 한다(최상위태그가 하나다)
} //javascript 가 아니라 jsx 라는 언어임

function Nav(props) {
  const liTags = props.data.map((e)=> {
    return <li key={e.id}><a href={'/read/'+e.id} onClick={(evt)=> {
      evt.preventDefault();
      props.onSelect(e.id);
    }}>{e.title}</a></li>
  });
  return <nav>
        <ol>
          {liTags}
        </ol>
      </nav>
}

function Article(props){
  console.log("article",props)
  return <article>
          <h2>{props.title}</h2>
          {props.body}
        </article>
}

function App() {
  const [mode, setMode] = useState('WELCOME'); //useState 값은 기본값
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id :1, title: 'html', body: 'html is ...'},
    {id :2, title: 'css', body: 'css is ...'},
    {id :3, title: 'js', body: 'js is ...'}
  ]);

  const Create = (props) => {
    return <article>
    <h2>Create</h2>
    <form onSubmit={(e)=> {
      e.preventDefault();
      const title = e.target.title.value;
      const body = e.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type='text' name = 'title' placeholder='title'></input></p>
      <p><textarea type='text' name = 'body' placeholder='body'></textarea></p>
      <p><input type='submit' value='Create'></input></p>
    </form>
  </article>
  }

  const [id, setId] = useState(null);
  let content = null;
  if (mode === 'WELCOME'){
    content = <Article title="Welcome!!!!!" body="Hello, WEB!"></Article>
  } else if(mode === 'READ'){
    const topic = topics.filter(e=> {
      if(e.id === id){
        return true;
      } else {
        return false;
      }
    })[0];
    console.log(topic);
    content = <Article title={topic.title} body={topic.body}></Article>
  } else if (mode === 'CREATE') { 
      content = <Create onCreate={(title, body) => {
        const newTopic = {id: nextId, title: title, body: body}; 
        // topics.push(newTopic);
        // setTopics(topics);
        const newTopics = [...topics];
        newTopics.push(newTopic);
        setTopics(newTopics);
        setId(nextId);
        setMode('READ');
        setNextId(nextId+1);
      }}/>
  }

  return (
  <div>
      <Header onSelect={()=> {
        // alert('header!!');
        // mode = 'WELCOME';
        setMode('WELCOME');
      }}></Header>
      <Nav data={topics} onSelect={(id)=> {
        // alert('nav!!'+id);
        // mode = 'READ';
        setMode('READ');
        setId(id);
      }}></Nav>
      {content}
      <br></br>
      <ButtonGroup variant="text" aria-label="text button group">
        <Button variant="outlined" onClick={()=> {
          setMode('CREATE');
        }}>Create</Button>
        <Button variant="outlined">Update</Button>
      </ButtonGroup>&nbsp;
      <Button variant="outlined" onClick={()=> {
        const newTopics = topics.filter((e)=> {
          if(e.id === id) {
            return false;
          } else {
            return true;
          }
        });
        setTopics(newTopics);
        setMode('WELCOME');
      }}>Delete</Button>
      <br></br>
  </div>
  );
}

export default App;
