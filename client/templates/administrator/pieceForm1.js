Template.formularioPieza1.helpers({
    /**
    */
    buildAnswerOptions: function(question) {
        var varname = "EditAnswerOptionsArrayFor" + question._id;
        var arr;
        arr = Session.get(varname);
        return buildAnswerPartFromCType(question, arr);
    },
    /**
    Realiza un llamado al procedimiento remoto "getQueriesFromFormId" en el
    lado del servidor y hace disponible la información de las preguntas como
    una variable de sesión que constituye un caché para la sesión de usuario
    actual.
    */
    startForm: function(fid) {
        // Borra el caché, ya que en modo edición la información cambia
        Session.set("EditQueryArrayFor" + fid, null);

        Meteor.call("getQueriesFromFormId", fid, 
            function(err, response) {
                if ( valid(err) ) {
                    console.log("  - Mensaje de error: " + err);
                }
                else if ( valid(response) && 
                     valid(response.id) && valid(response.array) ) {
                    Session.set("EditQueryArrayFor" + response.id, response.array);
                }
            }
        );

        return "";
    },
    /**
    Esta función implementa una barrera de bloqueo para la sincronización de
    la plantilla con la disponibilidad de la variable de sesión para el caché
    de las preguntas en el formulario fid.
    */
    questionListReady: function(fid) {
        if ( !valid(fid) ) {
            return false;
        }
        var v = Session.get("EditQueryArrayFor" + fid);

        if ( !valid(v) ) {
            return false;
        }
        return true;
    },
    /**
    Versión optimizada para pasar la colección a la plantilla en Spacebars.
    Nótese que retorna el caché en memoria para la variable de sesión
    correspondiente al formulario identificado con fid. Dado que la
    operación Session.get es reactiva, la información será mostrada
    tan pronto como esta variable esté disponible.
    */
    dbServiceRequestForm2QueryFiltered: function(fid) {
        var errorArray = [
            {"nameSpa" : "Error conectándose a la base de datos"},
            {"nameSpa" : "ver módulo serviceRequestForm.js"}
        ];

        var array = Session.get("EditQueryArrayFor" + fid);

        if ( valid(array) ) {
            return array;
        }
        return errorArray;
    },
    /**
    Realiza un llamado al procedimiento remoto "getAnswerOptionsFromQueryId" en el
    lado del servidor y hace disponible la información de las opciones de respuesta en
    una variable de sesión que constituye un caché para la sesión de usuario
    actual.
    */
    startQuery: function(qid) {
        Meteor.call("getAnswerOptionsFromQueryId", qid, 
            function(err, response) {
                if ( valid(err) ) {
                    console.log("  - Mensaje de error: " + err);
                }
                else if ( valid(response) && 
                     valid(response.id) && valid(response.array) ) {
                    var varname = "EditAnswerOptionsArrayFor" + response.id;
                    Session.set(varname, response.array);
                }
            }
        );

        return "";
    },
    /**
    Esta función implementa una barrera de bloqueo para la sincronización de
    la plantilla con la disponibilidad de la variable de sesión para el caché
    de las opciones de respuesta para la pregunta qid.
    */
    answerOptionsListReady: function(qid) {
        var varname = "EditAnswerOptionsArrayFor" + qid;

        if ( !valid(qid) ) {
            return false;
        }
        var v = Session.get(varname);

        if ( !valid(v) ) {
            return false;
        }

        return true;
    },
    /**
    Versión optimizada para pasar la colección a la plantilla en Spacebars.
    Nótese que retorna el caché en memoria para la variable de sesión
    correspondiente al formulario identificado con fid. Dado que la
    operación Session.get es reactiva, la información será mostrada
    tan pronto como esta variable esté disponible.
    */
    dbServiceRequestAnswerOptionFiltered: function(qid) {
        console.log("Importando opciones de respuesta asociadas a la pregunta con ID: " + qid);
        var errorArray = [
            {"nameSpa" : "Error conectándose a la base de datos"},
            {"nameSpa" : "ver módulo serviceRequestForm.js"}
        ];
        var varname = "EditAnswerOptionsArrayFor" + qid;
        var array = Session.get(varname);

        if ( valid(array) ) {
            return array;
        }
        return errorArray;
    }
});