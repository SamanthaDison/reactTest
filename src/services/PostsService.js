import { useParams } from "react-router-dom"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {

    async toggleLike(post) {
        const res = await api.post(`api/posts/${post.id}/like`)
        const i = AppState.posts.findIndex(p => p.id == post.id)
        AppState.posts.splice(i, 1, res.data)
    }

    async getPosts(url = 'api/posts') {
        const res = await api.get(url)
        const posts = res.data.posts
        const newer = res.data.newer
        const older = res.data.older
        logger.log(posts, newer, older)

        AppState.posts = posts
        // console.log('appstate', AppState.posts);
        AppState.newer = newer
        AppState.older = older
    }


    async getProfile(profileId) {
        const res = await api.get(`api/profiles/${profileId}`)
        AppState.profile = res.data
    }

    async getProfileContent() {

        const { id } = useParams()


        return await Promise.all([
            this.getProfile(id),
            this.getPosts('api/posts?creatorId=' + id)
        ])
    }

}

export const postsService = new PostsService()