import SongCard from "../SongCard";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WarningAmberOutlined from '@mui/icons-material/WarningAmberOutlined';
import Skeleton from '@mui/material/Skeleton';
import { fetchDailySongs } from "../../api/songs";
import { useQuery } from "@tanstack/react-query";

export default function SongCarousel() {
    const { data: songs, isLoading, error } = useQuery({
        queryKey: ['songs'],
        queryFn: fetchDailySongs
    });

    if (isLoading) {
        return (
            <Box className='flex w-full justify-evenly'>
                {
                    Array(3).fill(null).map((_, index) => (
                        <Skeleton key={index} variant="rectangular" width={300} height={300} />
                    ))
                }
            </Box>
        )
    }

    else if (error) {
        return (
            <Box className='flex flex-col w-full items-center'>
                <WarningAmberOutlined />
                <Typography variant="h6">
                    An error occurred while fetching today's songs. Please try again later.
                </Typography>
            </Box>
        )
    }

    else {
            return (
                <Box className='flex w-full justify-evenly'>
                    {songs?.map((song) => (
                        <SongCard key={song.id} song={song} />
                    ))}
                </Box>
        )
    }
}