import './App.css';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SongCarousel from './components/SongCarousel';
import CommentSection from './components/CommentSection';

function App() {


  return (
    <Container>
      <Typography variant='h1'>
        Song Discussion Board
      </Typography>
      <SongCarousel />
      <CommentSection />
    </Container>

  )
}

export default App
