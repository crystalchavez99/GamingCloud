import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect , useHistory} from 'react-router-dom';
import './UploadPage.css';

function UploadPage({ user }){
    return(
        <div className='upload'>
            <h1>Upload Page</h1>
        </div>
    )
}
export default UploadPage;
