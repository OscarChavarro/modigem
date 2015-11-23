console.log("ATENCIÓN: EL SISTEMA NO DEBE TENER SUBSCRIPCIONES GLOBALES EN MAIN.JS, ESTO DEBE MOVERSE A LOS MÉTODOS DATA O WAITON DE LAS RUTAS DONDE SE UTILICEN");

Meteor.subscribe('allPiece');
Meteor.subscribe('allImageClons');
Meteor.subscribe('allImages');
Meteor.subscribe('allRegistered');
Meteor.subscribe('allLandingTexts');
Meteor.subscribe('allAdmins');
Meteor.subscribe('allUserRole');
Meteor.subscribe('allUser2Role');
