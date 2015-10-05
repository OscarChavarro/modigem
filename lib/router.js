Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/',{name: 'paginaPrincipal'});
Router.route('/logAsAdmin',{name: 'logAsAdmin'});
Router.route('/logAsUser',{name: 'logAsUser'});