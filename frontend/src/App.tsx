import './App.css';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SongCarousel from './components/SongCarousel';
import CommentSection from './components/CommentSection';
import CssBaseline from '@mui/material/CssBaseline';

function App() {


  return (
    <>
      <CssBaseline />
      <Container>
        <Typography 
          variant='h1'
          className='text-center'
        >
          Encore
        </Typography>
        <SongCarousel />
        <CommentSection />
      </Container>
    </>

  )
}

export default App
