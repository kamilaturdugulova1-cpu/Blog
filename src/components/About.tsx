import { useEffect, useState } from 'react';
import axiosApi from '../axios-api';
import Spinner from '../components/Spinner';

const About = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosApi.get<string | null>('/about.json')
            .then(res => { if (res.data) setText(res.data); })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Spinner />;

    return (
        <div className="py-3">
            <h5 className="fw-normal">About Us</h5>
            <p className="text-secondary small">{text || 'No description provided.'}</p>
        </div>
    );
};

export default About;