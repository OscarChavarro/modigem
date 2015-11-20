//= VARIABLES GLOBALES ==============================================
// Acceso a colecciones de la base de datos (comunes a cliente y a servidor)
console.log("Definiendo variables de acceso a la base de datos");
//professionalArea = new Mongo.Collection("professionalArea");
//professionalCategory = new Mongo.Collection("professionalCategory");
//professionalService = new Mongo.Collection("professionalService");
serviceRequestAnswerOption = new Mongo.Collection("serviceRequestAnswerOption");
serviceRequestForm = new Mongo.Collection("serviceRequestForm");
serviceRequestForm2Query = new Mongo.Collection("serviceRequestForm2Query");
serviceRequestFormQuery = new Mongo.Collection("serviceRequestFormQuery");
serviceRequestQueryType = new Mongo.Collection("serviceRequestQueryType");

// Variables de sesión internas a cada usuario (solo cliente)

if ( Meteor.isClient ) {
    Session.set("globalSelectedEditLanguage", "Spa");
}

if ( Meteor.isServer ) {
    Meteor.users.allow({
        "update": function (userId, doc) {
            return true; 
        }
    });
    Meteor.users.allow({
        "remove": function (userId, doc) {
            return true; 
        }
    });
}
