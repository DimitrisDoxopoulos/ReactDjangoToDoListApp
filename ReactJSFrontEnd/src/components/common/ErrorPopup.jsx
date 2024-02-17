import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { Snackbar, SnackbarContent, IconButton } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

const AutoHideDuration = 6000; // Auto-hide duration in milliseconds

const ErrorPopup = ({ message, open, onClose }) => {

    useEffect(() => {
        let timeoutId;
        if (open) {
            timeoutId = setTimeout(onClose, AutoHideDuration);
        }
        return () => clearTimeout(timeoutId);
    }, [open, onClose]);

    const handleClick = () => {
        onClose();
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={open}
            autoHideDuration={AutoHideDuration}
            onClose={handleClick}
        >
            <SnackbarContent
                style={{
                    backgroundColor: '#f44336',
                }}
                message={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ErrorOutline style={{ marginRight: '8px', color: 'white' }} />
                        {message}
                    </div>
                }
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </Snackbar>
    );
};

ErrorPopup.propTypes = {
    message: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ErrorPopup;
