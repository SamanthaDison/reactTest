
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { App } from '../App.jsx';
import { AppState } from '../AppState.js';
import PostCard from '../components/PostCard.jsx';
import { postsService } from '../services/PostsService.js';

function PostsPage() {

    async function getPosts() {
        try {
            await postsService.getPosts()
        } catch (error) {

        }
    }


    async function changePage(url) {
        try {
            await postsService.getPosts(url)
        } catch (error) {

        }
    }

    useEffect(() => {
        getPosts()
    }, [])

    // NOTE if you open a map w/ {}, it does not explicitly give return so we must include that here.... when we are using props and components we MUST use keys
    const posts = AppState.posts.map(p => {
        return (
            <div className='col-md-4' key={p.id}>
                <PostCard post={p} />
            </div>
        )
    })

    // NOTE you may also do this but you can no longer add your classes
    // const posts = AppState.posts.map(p => <PostCard post={p} key={p.id} />)


    // another method of conditional rendering 
    const olderPosts = AppState.older ? (
        <button className='btn btn-warning' onClick={changePage.bind(null, AppState.older)}>Older</button>
    ) : null



    return (

        <div className="PostsPage container-fluid">

            <div className="row">
                {posts}
            </div>


            {/* NOTE if you want to invoke fn and pass parameters it must be formatted as follows see:line55,58 */}
            <div className='row sticky-bottom py-2'>
                <div className="col-6 text-end">
                    <button className='btn btn-warning' disabled={!AppState.newer} onClick={() => changePage(AppState.newer)}>Newer</button>
                </div>
                <div className="col-6 text-start">

                    {/* NOTE conditionally rendering an entire element in return */}
                    {AppState.older ? (
                        <button className='btn btn-warning' onClick={changePage.bind(null, AppState.older)}>Older</button>
                    ) : null}

                </div>
            </div>
        </div>
    )

}
export default observer(PostsPage)