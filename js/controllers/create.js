import {createPost as createPostApi} from '../data.js';

export default async function createPost() {
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

        const post = {
            title: this.params.title,
            category: this.params.category,
            content: this.params.content
        };

        const result = await createPostApi(post);

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
};