import React from 'react'
import PropTypes from "prop-types";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const ConfirmationDialogue = ({ open, onClose, onConfirm, message, title }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button style={{ textTransform: 'none' }} variant="outlined" onClick={onClose} color="secondary">Cancel</Button>
                <Button style={{ textTransform: 'none' }} variant="outlined" onClick={onConfirm} color="secondary">Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

ConfirmationDialogue.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};
export default ConfirmationDialogue
