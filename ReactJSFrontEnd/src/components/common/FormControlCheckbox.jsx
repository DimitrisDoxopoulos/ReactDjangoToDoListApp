import { Checkbox, FormControlLabel } from '@mui/material';
import * as PropTypes from 'prop-types';

const MyCheckbox = ({ label, checked, onChange, color, ariaLabel }) => {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked} onChange={onChange} color={color}
                    inputProps={{ "aria-label": ariaLabel }}
                />
            }
            label={label}
        />
    );
};

MyCheckbox.propTypes = {
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    ariaLabel: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default MyCheckbox;