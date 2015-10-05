Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/',{name: 'home'});
Router.route('/signUp',{name: 'signUpForm'});
Router.route('/login',{name: 'loginForm'});
Router.route('/adminPanel',{name: 'adminPanel'});
Router.route('/userPanel',{name: 'userPanel'});