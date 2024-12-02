import { addComment } from "../../api/comments";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

type NewCommentFormProps = {
    commentFormOpen: boolean;
    setCommentFormOpen: (open: boolean) => void;
}

export default function NewCommentForm({ commentFormOpen, setCommentFormOpen }: NewCommentFormProps) {
    const [ comment, setComment ] = useState('');
    const [ username, setUsername ] = useState('');

    const handleSubmit = async () => {
        await addComment(
            comment,
            username
        );
        setComment('');
        setUsername('');
    }

    return (
        <Modal
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            sx={{
                bgcolor: 'background.paper',
            }}
            open={commentFormOpen}
            onClose={() => setCommentFormOpen(false)}
        >
            <Box
                className='p-4 flex flex-col gap-4'
                component="form"
                noValidate
                autoComplete="off"
            >
                <TextField 
                    className='self-start'
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Comment e.g. 'Today's songs were great!'"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Post
                </Button>
            </Box>
        </Modal>
    )
}