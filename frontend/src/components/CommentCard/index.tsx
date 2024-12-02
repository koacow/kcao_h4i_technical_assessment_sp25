import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Comment } from '../../types/comments';

type CommentCardProps = {
  comment: Comment;
};

export default function CommentCard ({ comment }: CommentCardProps) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    {comment.content}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {comment.user_id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {comment.created_at}
                </Typography>
            </CardContent>
        </Card>
    )
}