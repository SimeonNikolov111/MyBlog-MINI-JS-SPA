function host(endpoint){
    return `https://api.backendless.com/56BC5191-A89D-8053-FFE1-5C7AA9824100/DA5F1542-64FC-4FA6-A227-34DD5668382C/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    POSTS: 'data/posts',
    POSTS_BY_ID: 'data/posts/'
}

export async function register(email, password){
    
    const result = (await fetch(host(endpoints.REGISTER), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })).json();

    return result;
}

export async function login(email, password){
    
    const result = await (await fetch(host(endpoints.LOGIN), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login: email,
            password
        })
    })).json();

    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('email', result.email);
    localStorage.setItem('userId', result.objectId);

    return result;
}

export async function logout(){

    const token = localStorage.getItem('user-token');

    const result = fetch(host(endpoints.LOGOUT),{
        headers: {
            mothod: "GET",
            'user-token': token
        }
    });

    return result;
}

export async function createPost(post){

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.POSTS), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(post)
    })).json();

    return result;
}

export async function getOwnPosts(){

    const token = localStorage.getItem('userToken');
    const ownerId = localStorage.getItem('userId');

    const result = await (await fetch(host(endpoints.POSTS + `?where=ownerId%3D%27${ownerId}%27`), {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    })).json();

    return result;
}

export async function getPostById(postId){

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.POSTS_BY_ID + postId), {
        method: "GET",
        headers: {
            'user-token': token
        }
    })).json();

    return result;
}

export async function editPost(id, updatedProperties){

    const token = localStorage.getItem('userToken');

    const result = await (await fetch(host(endpoints.POSTS_BY_ID + id), {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedProperties)
    })).json();

    return result;
}

export async function deletePost(postId){

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.POSTS_BY_ID + postId), {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    })).json();

    return result;
}