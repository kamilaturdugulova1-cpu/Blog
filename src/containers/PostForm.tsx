import React, { useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from '../axios-api';
import type { BlogPostForm } from '../types';
import Spinner from '../components/Spinner';

const PostForm = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState<BlogPostForm>({ title: '', description: '', createdAt: '' });

    useEffect(() => {
        if (!id) {
            setPost({ title: '', description: '', createdAt: '' });
            return;
        }

        const fetchPost = async () => {
            setLoading(true);
            try {
                const response = await axiosApi.get<BlogPostForm>(`/posts/${id}.json`);
                if (response.data) {
                    setPost(response.data);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        void fetchPost();
    }, [id]);

    const inputChanged = (e: React.BaseSyntheticEvent) => {
        const { name, value } = e.target;
        setPost((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onFormSubmit = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (id) {
                await axiosApi.put(`/posts/${id}.json`, post);
            } else {
                const newPost = {
                    ...post,
                    createdAt: new Date().toLocaleString(),
                };
                await axiosApi.post('/posts.json', newPost);
            }
            navigate('/');
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="py-3" style={{ maxWidth: '500px' }}>
            <h5 className="fw-normal mb-3">{id ? 'Edit post' : 'New post'}</h5>
            <form onSubmit={onFormSubmit}>
                <div className="mb-2">
                    <input
                        type="text"
                        name="title"
                        className="form-control form-control-sm"
                        placeholder="Title"
                        required
                        value={post.title}
                        onChange={inputChanged}
                    />
                </div>
                <div className="mb-3">
          <textarea
              name="description"
              className="form-control form-control-sm"
              placeholder="Description"
              rows={4}
              required
              value={post.description}
              onChange={inputChanged}
          />
                </div>
                <button type="submit" className="btn btn-secondary btn-sm">Save</button>
            </form>
        </div>
    );
};

export default PostForm;