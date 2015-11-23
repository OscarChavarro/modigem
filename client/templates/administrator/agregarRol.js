Template.addRole.events({ 
  'submit form': function(e) {
           e.preventDefault();
        var nuevoRol = {
    nameC_: $(e.target).find('[name=nameC]').val(),
        nameSpa_: $(e.target).find('[name=nameSpa]').val()
        };
        userRole.insert(nuevoRol);
        }
        });