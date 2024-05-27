"use client";

import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Loading = () => {
    return (
        <div className="flex h-screen items-center justify-center">
            <InfinitySpin
                visible={true}
                width="200"
                color="#4fa94d"
                ariaLabel="infinity-spin-loading"
            />
        </div>
    );
};

export default Loading;
