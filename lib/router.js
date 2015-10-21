Router.configure({
    layoutTemplate: 'layout',
	notFoundTemplate: 'paginaNoExiste'
});

Router.route('/',{name: 'home'});
Router.route('/signUp',{name: 'signUpForm'});
Router.route('/login',{name: 'loginForm'});
Router.route('/adminPanel',{name: 'adminPanel'});
Router.route('/userPanel',{name: 'userPanel'});
Router.route('/formularioPieza1',{name: 'formularioPieza1'});
