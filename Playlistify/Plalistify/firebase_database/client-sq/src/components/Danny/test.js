import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CreateRoom from './CreateRoom'

// this function for testing purpose
export default function Test() {
    return (
        <div>
            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
                Show MyCreateRoom
            </button>
            {/* you need to provide three parameters when you call CreateRoom component */}
            <CreateRoom personName={"Danny"} personId={1001} redirectTo={"/room"}/>
        </div>
    );
}
