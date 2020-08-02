/* globals Sammy */
import home from './controllers/home.js';
import login, {loginPost} from './controllers/login.js';
import register, {registerPost} from './controllers/register.js';
import logout from './controllers/logout.js';
import createPost from './controllers/create.js';
import details from './controllers/details.js';
import edit, {editPost} from './controllers/edit.js';
import {deletePost} from './controllers/delete.js';

window.addEventListener('load', () => {
    const app = Sammy('#root', function () {
        this.use('Handlebars', 'hbs');
        
        this.userData = {
            email: localStorage.getItem('email') || '',
            userId: localStorage.getItem('userId') || '',
            posts: []
        };

        this.get('/', home);
        this.get('index.html', home);
        this.get('#/home', home);

        this.get('#/login', login);
        this.get('#/register', register)

        this.post('#/login', ctx => {loginPost.call(ctx); });
        this.post('#/register', ctx => {registerPost.call(ctx); });

        this.get('#/logout', logout)

        this.post('#/create', ctx => {createPost.call(ctx); });
        this.get('#/details/:id', details)

        this.get('#/edit/:id', edit);
        this.post('#/edit/:id', ctx => {editPost.call(ctx); });

        this.get('#/delete/:id', deletePost)
    });

    app.run();
});