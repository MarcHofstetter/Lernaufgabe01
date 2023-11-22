import React, { useState, useRef } from 'react';
import { Autocomplete, Loader, MantineProvider } from '@mantine/core';
import './Login.css';

export function Login() {
    const timeoutRef = useRef<number>(-1);
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<string[]>([]);

    const handleChange = (val: string) => {
        window.clearTimeout(timeoutRef.current);
        setValue(val);
        setData([]);

        if (val.trim().length === 0 || val.includes('@')) {
            setLoading(false);
        } else {
            setLoading(true);
            timeoutRef.current = window.setTimeout(() => {
                setLoading(false);
                setData(['gmail.com', 'outlook.com', 'yahoo.com', 'bluewin.ch', 'swisslive.ch'].map((provider) => `${val}@${provider}`));
            }, 1000);
        }
    };

    return (
        <div className="login-container">
            <MantineProvider>
                <Autocomplete
                    value={value}
                    data={data}
                    onChange={handleChange}
                    rightSection={loading ? <Loader size="1rem" /> : null}
                    label="Email"
                    placeholder="Your email"
                />
            </MantineProvider>
        </div>
    );
}
