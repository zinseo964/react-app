// import logo from './logo.svg';
import './App.css';

function Header(){ //component 이름은 반드시 대문자로 시작해야한다
  return <header><h1><a href="/">Web</a></h1></header> //component는 단 하나의 태그를 return 한다(최상위태그가 하나다)
} //javascript 가 아니라 jsx 라는 언어임

function Nav(props) {
  console.log("nav",props.data);
  const list = props.data.map((e)=> {
    return <li key={e.id}><a href={'/read/'+e.id}>{e.title}</a></li>
  });
  // const list = [
  //   <li><a href = "/read/1">html</a></li>,
  //   <li><a href = "/read/2">css</a></li>
  // ];
  return <nav>
        <ol>
          {list}
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
    {id :2, title: 'css', body: 'css is ...'}
  ];
  return (
  <div>
      <Header></Header>
      <Nav data={topics}></Nav>
      <Article title="Welcome!!!!!" body="Hello, WEB!"></Article>
  </div>
  );
}

export default App;
