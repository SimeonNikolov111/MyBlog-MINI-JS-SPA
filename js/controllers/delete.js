import {deletePost as deletePostApi} from '../data.js';

export async function deletePost(){

    const postId = this.params.id;

    try {
        const result = deletePostApi(postId);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.redirect('#/home');
    } catch (err) {
        console.error(err);
    }
};