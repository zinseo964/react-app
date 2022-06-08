// import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function Header(){ //component 이름은 반드시 대문자로 시작해야한다
  return <header><h1><a href="/">Web</a></h1></header> //component는 단 하나의 태그를 return 한다(최상위태그가 하나다)
} //javascript 가 아니라 jsx 라는 언어임

function Nav(props) {
  const liTags = props.data.map((e)=> {
    return <li key={e.id}><a href={'/read/'+e.id}>{e.title}</a></li>
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
  const topics = [
    {id :1, title: 'html', body: 'html is ...'},
    {id :2, title: 'css', body: 'css is ...'},
    {id :3, title: 'js', body: 'js is ...'}
  ];
  function createHandler(){
    alert('create!');
  }
  return (
  <div>
      <Header onSelect={()=> {
        alert('header!!');
      }}></Header>
      <Nav data={topics}></Nav>
      <Article title="Welcome!!!!!" body="Hello, WEB!"></Article>
      <br></br>
      <ButtonGroup variant="text" aria-label="text button group">
        <Button variant="outlined" onClick={()=> {
          alert('create!');
        }}>Create</Button>
        <Button variant="outlined">Update</Button>
      </ButtonGroup>&nbsp;
      <Button variant="outlined">Delete</Button>
      <br></br>
  </div>
  );
}

export default App;
