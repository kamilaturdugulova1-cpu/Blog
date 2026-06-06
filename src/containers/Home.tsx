import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosApi from '../axios-api';
import type { BlogPost, FirebasePostsList } from '../types';
import Spinner from '../components/Spinner';

const Home = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [welcomeText, setWelcomeText] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const welcomeResponse = await axiosApi.get<string | null>('/homeWelcome.json');
                if (welcomeResponse.data) {
                    setWelcomeText(welcomeResponse.data);
                }

                const postsResponse = await axiosApi.get<FirebasePostsList | null>('/posts.json');
                if (postsResponse.data) {
                    const postsArray = Object.keys(postsResponse.data).map((key) => ({
                        ...postsResponse.data![key],
                        id: key,
                    }));
                    setPosts(postsArray.reverse()); // Свежие посты будут вверху
                } else {
                    setPosts([]);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        void fetchData();
    }, []);

    if (loading) return <Spinner />;

    return (
        <div className="py-2">
            {welcomeText && (
                <div className="bg-light p-4 rounded-3 mb-4">
                    <h1 className="fw-normal display-6 text-dark">Главная</h1>
                    <p className="text-secondary small mb-0">{welcomeText}</p>
                </div>
            )}

            <h5 className="fw-normal mb-3 text-secondary">Свежие публикации:</h5>
            {posts.length === 0 ? (
                <p className="text-secondary small">No posts found.</p>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className="border-bottom py-3">
                        <small className="text-muted d-block">Created on: {post.createdAt}</small>
                        <h5 className="fw-normal my-1">{post.title}</h5>
                        <p className="text-secondary small text-truncate" style={{ maxWidth: '600px' }}>
                            {post.description}
                        </p>
                        <Link to={`/posts/${post.id}`} className="text-decoration-none small text-primary">
                            Read more &gt;&gt;
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
};

export default Home;