import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect , useHistory} from 'react-router-dom';
import './SplashPage.css';

function SplashPage() {
    return(
        <div className='splash'>
            <div className='banner'>
                <h1><span>GamingCloud</span></h1>
                <p>GamingCloud gives our users the ability to create your musicial talent, find fans & industries, and connect with others. </p>
            </div>

        </div>
    )
}

export default SplashPage;
