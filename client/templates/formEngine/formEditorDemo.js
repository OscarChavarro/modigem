//============================================================================
/**
Ruta Iron.router para permitir al usuario programador observar una página de
tipo demostración donde podrá tener acceso a las operaciones de edición de
formularios.
*/
Router.route("/formEditorDemo", {
    name: "formEditorDemo",
    loadingTemplate: "formEditorDemoLoading",
    /**
    */
    data: function () {
        return true;
    },
    /**
    */
    waitOn: function() {
        return Meteor.subscribe("serviceRequestForm");
    }
});

//============================================================================
Template.formEditorDemo.helpers({
    /**
    */
    allForms: function() {
        return serviceRequestForm.find();
    }
});

Template.formEditorDemo.events({
    /**
    Ejemplo de envío de identificadores de formulario al editor de formulario.
    Nótese que tras ejecutar esta función, el navegador realizará un salto
    a la URL del editor de formulario. Esta función se llama como respuesta
    a un evento de click hecho sobre un ancla (etiqueta <A>), y en esa etiqueta
    debe tenerse como atributo un "data-id" que tenga un valor correspondiente
    a un identificador _id existente en la base de datos para la colección
    de formularios.
    */
    "click #setFormId": function(event, template) {
        var id = event.currentTarget.getAttribute("data-id");
        if ( valid(id) ) {
            console.log("[formEditorDemo]: Seleccionando formulario con id " + 
                id + " para edición");
            Session.set("formId", id);
        }
    },
    /**
    */
    "submit #createForm": function(event, template) {
        event.preventDefault();
        var oid = new Mongo.ObjectID();
        var filter = {_id: oid};
        serviceRequestForm.insert(filter);
    },
    /**
    */
    "submit .deleteForm": function(event, template) {
        event.preventDefault();
        var id = event.target.id;

        console.log("Quiero borrar a " + id);

        var oid = new Mongo.ObjectID(id);
        var filter = {_id: oid};
        var x = serviceRequestForm.remove(filter);
    }
});
