import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleGoogleAuth } from '../../utils/authentication/authentication';
import {addUserToRedux} from "../../utils/commonRequests";
import {useDispatch} from "react-redux";

export default function GoogleCallback() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');

        if (accessToken) {
            fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
                .then(res => res.json())
                .then(googleUser => {
                    return handleGoogleAuth({
                        email: googleUser.email,
                        name: googleUser.name || googleUser.email.split('@')[0]
                    });
                })
                .then(() => {
                    const cookies = document.cookie.split(";");
                    let email = "";
                    cookies.forEach(cookie => {
                        if (cookie.includes("current_email")) {
                            email = cookie.split("=")[1];
                        }
                    });
                    addUserToRedux(email, dispatch).then(() => {
                            window.location.reload()
                        }
                    )
                    navigate('/')}) // Redirect on success
                .catch(error => {
                    console.error('Google auth failed:', error);
                    navigate('/login');
                });
        }
    }, [navigate]);

    return <div>Processing Google login...</div>;
}