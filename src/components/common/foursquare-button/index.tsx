import React, { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import FancyButton from '../fancy-button';
import config from '../../../config';
import './style.css';

interface FsqButtonProps extends React.HTMLProps<HTMLButtonElement> {
    redirectPath: string;
}

const FoursquareButton = ({ redirectPath, children, style }: FsqButtonProps): ReactElement<HTMLButtonElement> => {
    const [clientId, setClientId] = useState<string>('');

    const fetchAuthData = async () => {
        const url: string = config.apiUrl + '/foursquare-client-id';
        try {
            const { data } = await axios.get(url);
            setClientId(data.clientId);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAuthData();
    }, []);

    const foursquareUrl = 'https://foursquare.com/oauth2/authenticate';
    const redirectUrl: string = config.baseUrl + redirectPath;

    const authUrl = new URL(foursquareUrl);
    authUrl.searchParams.append('client_id', clientId);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('redirect_uri', redirectUrl);

    return (
        <FancyButton style={style} className="foursquare-btn">
            <a className="foursquare-link" href={authUrl.href}>
                {children}
            </a>
        </FancyButton>
    );
};

export default FoursquareButton;