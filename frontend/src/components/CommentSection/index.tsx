import CommentCard from "../CommentCard";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import NewCommentForm from "../NewCommentForm";
import IconButton from "@mui/material/IconButton";
import AddOutlined from "@mui/icons-material/AddOutlined";
import WarningAmberOutlined from "@mui/icons-material/WarningAmberOutlined";
import { useQuery } from "@tanstack/react-query";
import { fetchCommentsByDate } from "../../api/comments";
import { Comment } from "../../types/comments";
import { useState } from "react";

type CommentSectionProps = {
    currentDate: Date;
};

export default function CommentSection({ currentDate }: CommentSectionProps) {
    const [ commentFormOpen, setCommentFormOpen ] = useState(false);
    const { data: comments, isLoading, error, refetch } = useQuery<Comment[], Error>({
        queryKey: ['comments', currentDate],
        queryFn: fetchCommentsByDate
    });

    if (isLoading) {
        return (
            <Stack>
                <Skeleton variant="rectangular" width={300} height={300} />
                <Skeleton variant="text" width={300} />
            </Stack>
        )
    }

    else if (error) {
        return (
            <Stack>
                <WarningAmberOutlined />
                <Typography variant="h6">
                    An error occurred while fetching today's comments. Please try again later.
                </Typography>
            </Stack>
        )
    }

    else {
        return (
            <Stack className='relative w-3/5 flex flex-col justify-start items-stretch mx-auto mt-5 p-5 gap-y-4'>
                <IconButton
                    className='absolute right-0 top-0 shadow-lg'
                    onClick={() => setCommentFormOpen(true)}
                    sx={{
                        bgcolor: 'background.paper',
                        color: 'secondary.main'
                    }}
                >
                    <AddOutlined />
                </IconButton>
                <NewCommentForm
                    commentFormOpen={commentFormOpen}
                    setCommentFormOpen={setCommentFormOpen}
                    refetch={refetch}
                />
                {comments?.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                ))}
            </Stack>
        )
    }
}
