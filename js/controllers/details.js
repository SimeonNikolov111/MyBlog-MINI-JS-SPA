import {getPostById} from '../data.js';

export default async function details() {

    this.partials = {
        header: await this.load('./templates/common/header.hbs')
    };

    const postId = this.params.id;
    let post = this.app.userData.posts.find(p => p.objectId == postId);

    if (post === undefined) {
        post = await getPostById(postId);
    }

    const context = Object.assign({ post }, this.app.userData);

    this.partial('./templates/details.hbs', context);
};
