Template.toFormularioPieza.helpers({
	allForms:function(){
		return serviceRequestForm.find();
	}
});

Template.toFormularioPieza.events({  
    "click #formEditId": function(event, template) {
        var id = event.currentTarget.getAttribute("data-id");
		var oid=ObjectId("id").toString();
        if ( valid(oid) ) {
            console.log("[formularioPieza1]: Seleccionando formulario con id " + 
                oid + " para edición");
            Session.set("formEditId", oid);
        }
    }
});