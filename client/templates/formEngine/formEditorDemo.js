//============================================================================
Router.route("/formEditorDemo", {
    name: "formEditorDemo",
    loadingTemplate: "formEditorDemoLoading",
    data: function () {
        return true;
    }
});

//============================================================================

Template.formEditorDemo.events({
    /**
    Ejemplo de envío de identificadores de formulario al editor de formulario.
    Nótese que tras ejecutar esta función, el navegador realizará un salto
    a la URL del editor de formulario.
    */
    "click #setFormId": function(event, template) {
        var id = event.currentTarget.getAttribute("data-id");
        if ( valid(id) ) {
            console.log("[formEditorDemo]: Seleccionando formulario con id " + id + " para edición");
            Session.set("formId", id);
        }
    } 
});
