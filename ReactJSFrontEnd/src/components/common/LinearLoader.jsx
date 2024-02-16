import React from 'react'
import {LinearProgress} from "@mui/material";

const LinearLoader = () => {
    return (
        <div className="bg-gray-200 py-4 px-6 text-center text-xl font-bold">
            <span className="text-purple-600 mb-1">Please wait...</span>
            <LinearProgress color="secondary"/>
        </div>
    )
}
export default LinearLoader
