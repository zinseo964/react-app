import logo from './logo.svg';
import './App.css';

function HeaderTag(){ //component 이름은 반드시 대문자로 시작해야한다
  return <header><h1><a href="/">Web</a></h1></header> //component는 단 하나의 태그를 return 한다(최상위태그가 하나다)
} //javascript 가 아니라 jsx 라는 언어임

function NavTag() {
  return <nav><ol>
          <li><a href = "/read/1">html</a></li>
          <li><a href = "/read/2">css</a></li>
        </ol></nav>
}

function ArticleTag(){
  return <article>
  <h2>Welcome</h2>
  Hello, WEB!
</article>
}
function App() {
  return (
    <div className="App">
      <HeaderTag></HeaderTag>
      <NavTag></NavTag>
      <ArticleTag></ArticleTag>
  </div>
  );
}

export default App;
