import React, { ReactElement, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import config from '../../config';

interface AuthPageProps {
    redirectUrl: string;
}

function AuthPage({ redirectUrl }: AuthPageProps): ReactElement {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [isError, setError] = useState<boolean>(false);
    const { handleAuth } = useAuth();
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');

        const fetchToken = async () => {
            const url = config.apiUrl + '/foursquare-token';
            try {
                const { data } = await axios.post(url, {
                    code,
                    redirectUrl,
                    userId: 1,
                });
                setLoading(false);
                handleAuth(data.token);
                history.push('/');
            } catch (error) {
                setError(true);
                setLoading(false);
                console.error('Auth error!');
            }
        };

        fetchToken();
    }, []);

    return (
        <div>
            {isLoading && <p style={{ color: 'white' }}>Authorization in progress...</p>}
            {isError && <p style={{ color: 'red' }}>Authentication error</p>}
            {!isLoading && !isError && <p style={{ color: 'white' }}>Redirecting you to homepage...</p>}
        </div>
    );
}

export default AuthPage;
