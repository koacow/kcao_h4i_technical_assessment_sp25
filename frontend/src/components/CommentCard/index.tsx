import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Comment } from '../../types/comments';

type CommentCardProps = {
  comment: Comment;
};

const toFormattedDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleString();
}

export default function CommentCard ({ comment }: CommentCardProps) {
    return (
        <Card className='text-left'>
            <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                    {comment.username} | {toFormattedDate(comment.created_at)}
                </Typography>
                <Typography variant="h6" component="div">
                    {comment.content}
                </Typography>
            </CardContent>
        </Card>
    )
}