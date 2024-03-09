import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CreateRoom from './CreateRoom'

export default function Test() {
    return (
        <div>
            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
                Show MyCreateRoom
            </button>
            <CreateRoom />
        </div>
    );
}
