import React from 'react'
import {LinearProgress} from "@mui/material";

const LinearLoader = () => {
    return (
        <React.Fragment>
            <div className="flex justify-center items-center h-screen bg-white">
                <div
                    className="w-3/4 md:w-1/2 lg:w-2/3 py-8 px-6 text-center text-xl font-bold absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="text-purple-600 mb-4">Please wait...</span>
                    <LinearProgress color="secondary"/>
                </div>
            </div>
        </React.Fragment>
    )
}
export default LinearLoader
