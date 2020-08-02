import { getPostById, editPost as editPostApi } from "../data.js";

export default async function edit() {

    this.partials = {
        header: await this.load('./templates/common/header.hbs')
    };

    const postId = this.params.id;
    let post = this.app.userData.posts.find(p => p.objectId == postId);

    if (post === undefined) {
        post = await getPostById(postId);
    }

    const context = Object.assign(post , this.app.userData);

    this.partial('./templates/edit.hbs', context);
}

export async function editPost() {

    try {
        if (this.params.title.length < 3) {
            alert('Title shoould be at least 3 characters long!');
            return;
        }
        if (this.params.category.length < 2) {
            alert('Title shoould be at least 2 characters long!');
            return;
        }
        if (this.params.content.length < 5) {
            alert('Description shoould be at least 5 characters long!');
            return;
        }

        const postId = this.params.id;

        const post = {
            title: this.params.title,
            category: this.params.category,
            content: this.params.content
        };

        const result = await editPostApi(postId, post);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }
        
        this.redirect('#/home');
    }
    catch (err) {
        console.error(err);
    }
}