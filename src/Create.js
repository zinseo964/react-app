export function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={(evt) => {
      evt.preventDefault();
      const title = evt.target.title.value;
      const body = evt.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title"></input></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article>;
}
