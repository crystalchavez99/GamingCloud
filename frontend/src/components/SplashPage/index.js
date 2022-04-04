import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect , useHistory} from 'react-router-dom';
import './SplashPage.css';

function SplashPage() {
    return(
        <div className='splash'>
            <h1>GamingCloud</h1>
        </div>
    )
}

export default SplashPage;
