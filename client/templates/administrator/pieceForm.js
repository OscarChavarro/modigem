Template.toFormularioPieza.helpers({
	allForms:function(){
		return serviceRequestForm.find();
	}
});

Template.toFormularioPieza.events({  
    "click #formEditId": function(event, template) {
        var id = event.currentTarget.getAttribute("data-id");
        if ( valid(id) ) {
            console.log("[formularioPieza1]: Seleccionando formulario con id " + 
                id + " para edición");
            Session.set("formEditId", id);
        }
    }
});