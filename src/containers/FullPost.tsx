import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axiosApi from '../axios-api';
import type { BlogPostForm } from '../types';
import Spinner from '../components/Spinner';

const FullPost = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPostForm | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosApi.get<BlogPostForm | null>(`/posts/${id}.json`)
            .then(res => setPost(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    const deletePost = async () => {
        if (window.confirm('Delete this post?')) {
            setLoading(true);
            try {
                await axiosApi.delete(`/posts/${id}.json`);
                navigate('/');
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) return <Spinner />;
    if (!post) return <p className="text-secondary small">Post not found!</p>;

    return (
        <div className="py-3">
            <small className="text-muted">Created on: {post.createdAt}</small>
            <h3 className="fw-normal my-2">{post.title}</h3>
            <p className="text-secondary small" style={{ whiteSpace: 'pre-line' }}>{post.description}</p>
            <div className="d-flex gap-2 mt-4">
                <Link to={`/posts/${id}/edit`} className="btn btn-outline-secondary btn-sm">
                    Редактировать
                </Link>
                <button onClick={deletePost} className="btn btn-outline-danger btn-sm">
                    Удалить
                </button>
            </div>
        </div>
    );
};

export default FullPost;