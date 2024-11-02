// exibe foto, nome e email do usuário
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { Paper, Typography } from '@mui/material';

export default function UserInfos() {
    const auth = useAuth();
    const [user, setUser] = useState(auth?.user);

    useEffect(() => {
        setUser(auth?.user);
    }, [auth]);
    if (!user) {
        return <Typography>Loading user information...</Typography>;
    }

    return (
        <Paper sx={{ padding: '2em', textAlign: 'center' }}>
            {/* <img src={user.photoUrl} alt={`${user.name}'s avatar`} style={{ borderRadius: '50%', width: '100px', height: '100px' }} />*/}
            <Typography variant="h5">{user.name}</Typography>
            <Typography variant="body1">{user.email}</Typography>
        </Paper>
    );
}
