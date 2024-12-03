import useDate from '../../hooks/useDate';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SongCarousel from '../../components/SongCarousel';
import CommentSection from '../../components/CommentSection';
import DateSwitch from '../../components/DateSwitch';

export default function Home() {
    const { currentDate, incrementDate, decrementDate, incrementDisabled } = useDate();
    return (
        <Container>
            <Typography 
                variant='h1'
                className='text-center'
            >
                Encore
            </Typography>
            <DateSwitch currentDate={currentDate} incrementDate={incrementDate} decrementDate={decrementDate} incrementDisabled={incrementDisabled} />
            <SongCarousel currentDate={currentDate} />
            <CommentSection currentDate={currentDate} />
        </Container>
    )
}