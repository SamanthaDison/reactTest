import React from 'react';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import './PostCard.scss'

export default function PostCard({ post }) {


    async function toggleLike() {
        try {
            await postsService.toggleLike(post)
        } catch (error) {

        }
    }

    // another way of handling the conditional rendering of the img
    const hasImage = (post.imgUrl ? <img src={post.imgUrl} alt="" className={post.imgUrl ? '' : 'd-none'} /> : null)

    const hasLiked = post.likeIds.includes(AppState.account?.id)


    return (

        <div className="PostCard card p-2 m-2">
            <div className='py-2 d-flex justify-content-between align-items-center'>
                <div className='d-flex  align-items-center'>
                    <img src={post.creator.picture} className="rounded-circle" height={42} width={42} alt="" />
                    <p className='m-0 ps-2'>{post.creator.name}</p>
                </div>
                <div>
                    <p className='m-0'>{new Date(post.createdAt).toLocaleString('en-us', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                </div>
            </div>
            <img src={post.imgUrl} alt="" className={post.imgUrl ? '' : 'd-none'} />
            <div className='card-body'>
                <p>{post.body}</p>
                <div className='text-end'>
                    {hasLiked
                        ? <span onClick={toggleLike}>💖</span>
                        : <span onClick={toggleLike}>💗</span>
                    }
                    <span>{post.likeIds.length}</span>
                </div>
            </div>
        </div>
    )

}