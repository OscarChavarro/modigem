Template.addRole.events({ 
    'submit form': function(e) {
        e.preventDefault();
        var nuevoRol = {
            nameC: $(e.target).find('[name=nameC]').val(),
            nameSpa: $(e.target).find('[name=nameSpa]').val()
        };
        userRole.insert(nuevoRol);
    }
});