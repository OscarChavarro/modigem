//============================================================================
Router.route('/serviceRequestQueryTypeCreate', {
    name: 'serviceRequestQueryTypeCreate',
    loadingTemplate: "serviceRequestQueryTypeLoading",
    data: function() {
        datasetServiceRequestQueryTypeFiltered = serviceRequestQueryType.find();
    },
    waitOn: function() {
        return Meteor.subscribe("serviceRequestQueryType");
    }
});

Router.route('/serviceRequestQueryTypeEditDelete', {
    name: 'serviceRequestQueryTypeEditDelete',
    loadingTemplate: "rerviceRequestQueryTypeLoading",
    data: function() {
        datasetServiceRequestQueryTypeFiltered = serviceRequestQueryType.find();
    },
    waitOn: function() {
        return Meteor.subscribe("serviceRequestQueryType");
    }
});

//============================================================================

/*
Retorna acceso a la colección calculada en el Router.
*/
Template.serviceRequestQueryTypeEditDelete.helpers({
    dbServiceRequestQueryType: function() {
        return datasetServiceRequestQueryTypeFiltered;
    }
});

/*
Retorna acceso a la colección calculada en el Router.
*/
Template.serviceRequestQueryTypeCreate.helpers({
    dbServiceRequestQueryType: function() {
        return datasetServiceRequestQueryTypeFiltered;
    }
});


//============================================================================

/**
Esta es la función que se llama en la acción "submit" para el formulario
de creación de formularios para peticiones de servicios.
*/
Template.serviceRequestQueryTypeCreate.events({
  "submit #ServiceRequestQueryTypeCreateForm": function (event) {
    event.preventDefault();
    var n = event.target.nameSpa.value;
    var c = event.target.nameC.value;

    console.log("Creando para n: " + n);
    console.log("Creando para c: " + c);

    serviceRequestQueryType.insert({
        nameC: c,
        nameSpa: n
    });

    event.target.nameSpa.value = "";
    event.target.nameC.value = "";

    return false;
  }
});
