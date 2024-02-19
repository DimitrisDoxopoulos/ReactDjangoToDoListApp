import React, {useEffect} from 'react';
import { Snackbar, SnackbarContent, IconButton } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from "prop-types";

const AutoHideDuration = 6000; // Auto-hide duration in milliseconds

const SuccessPopup = ({ message, open, onClose }) => {

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
        <React.Fragment>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={AutoHideDuration}
                onClose={handleClick}
            >
                <SnackbarContent
                    style={{
                        backgroundColor: '#4caf50',
                    }}
                    message={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <CheckCircleOutline style={{ marginRight: '8px', color: 'white' }} />
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
        </React.Fragment>
    );
};

SuccessPopup.propTypes = {
    message: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default SuccessPopup;
