import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Article } from './Article';

export function Read(props) {
  const params = useParams();
  const id = Number(params.id);
  const [topic, setTopic] = useState({title:null, body:null});
  useEffect(()=>{    
    (async ()=>{
      const resp = await fetch('http://localhost:3333/topics/'+id);
      const data = await resp.json();
      setTopic(data);
    })();
  },[id]);  
  return <Article title={topic.title} body={topic.body}></Article>
}
