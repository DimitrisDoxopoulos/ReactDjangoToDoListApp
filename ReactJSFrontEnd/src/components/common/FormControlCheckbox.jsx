import React from "react";
import { Checkbox, FormControlLabel } from '@mui/material';
import * as PropTypes from 'prop-types';

const MyCheckbox = ({ label, checked, value, onChange, color, ariaLabel }) => {
    return (
        <React.Fragment>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={checked} onChange={onChange} color={color}
                        inputProps={{ "aria-label": ariaLabel }} value={value}
                    />
                }
                label={label}
            />
        </React.Fragment>
    );
};

MyCheckbox.propTypes = {
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    value: PropTypes.bool,
    ariaLabel: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default MyCheckbox;