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
            username,
            comment
        );
        setComment('');
        setUsername('');
    }

    return (
        <Modal
            open={commentFormOpen}
            onClose={() => setCommentFormOpen(false)}
        >
            <Box>
                <TextField 
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="New Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Box>
        </Modal>
    )
}