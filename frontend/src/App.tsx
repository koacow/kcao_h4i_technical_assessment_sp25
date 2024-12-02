import './App.css';
import CommentCard from './components/CommentCard';
import SongCard from './components/SongCard';
import { Comment } from './types/comments';
import { Song } from './types/songs';
import { fetchDailySongs } from './api/songs';
import { fetchDailyComments } from './api/comments';
import { useEffect, useState } from 'react';

function App() {
  const [ comments, setComments ] = useState<Comment[]>([]);
  const [ songs, setSongs ] = useState<Song[]>([]);

  useEffect(() => {
    fetchDailySongs().then((songs) => setSongs(songs));
    fetchDailyComments().then((comments) => setComments(comments));
  }, []);

  return (
    <>
      {
        songs.map((song) => (
          <SongCard song={song} key={song.id} />
        ))
      }
      {
        comments.map((comment) => (
          <CommentCard comment={comment} key={comment.id} />
        ))
      }
    </>

  )
}

export default App
