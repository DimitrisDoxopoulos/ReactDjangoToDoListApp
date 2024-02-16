import React from 'react'
import PropTypes from "prop-types";

const CreateAnchor = ({ link }) => {
    return (
        <a href={link} style={{ color: 'purple', fontWeight: 'bold', textDecoration: 'underline' }}>
            Create
        </a>
    );
}

CreateAnchor.propTypes = {
    link: PropTypes.string.isRequired,
};

export default CreateAnchor
