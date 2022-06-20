import Button from '@mui/material/Button';
import { Link, useParams } from "react-router-dom";

export function Control(props) {
  const params = useParams();
  const id = Number(params.id);
  let contextUI = null;
  if (id) {
    contextUI = <>
      <Button variant="outlined">Update</Button>
      <Button variant="outlined" onClick={()=>{props.onDelete(id);}}>Delete</Button>
    </>;
  }
  return <>
    <Button component={Link} to="/create" variant="outlined">Create</Button>
    {contextUI}
  </>;
}
