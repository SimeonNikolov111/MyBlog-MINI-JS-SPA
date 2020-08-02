import {getOwnPosts} from '../data.js';

export default async function home(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        post: await this.load('./templates/post.hbs')
    };

    const posts = await getOwnPosts();
    this.app.userData.posts = posts;
    const context = Object.assign(this.app.userData);

    this.partial('../templates/home.hbs', context);
};