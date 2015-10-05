Template.formulario1.events({ 
  'submit form': function(e) {
	   e.preventDefault();
    
	var NuevoUsuario= {
	 museo: $(e.target).find('[name=datos1]').val(),
   	 nombre: $(e.target).find('[name=datos2]').val(),
	 apellido: $(e.target).find('[name=datos3]').val(),
	 usuario: $(e.target).find('[name=datos4]').val(),
	 correo: $(e.target).find('[name=datos5]').val(),
	 contraseña: $(e.target).find('[name=datos6]').val(),
	 contraseña2: $(e.target).find('[name=datos7]').val(),
	 serial: $(e.target).find('[name=datos8]').val()
	 
	};
	titularbd.insert(NuevoUsuario);
	}
	});