//============================================================================
/**
Ruta para el editor de formularios. Nótese que la gran mayoría de 
tablas/colecciones de la base de datos Meteor que se usan acá no
son manejadas con el mecanismo estándar de publicación / subscripción
si no mediante interacciones cliente / servidor personalizadas e
implementadas con llamados a procedimientos remotos (RPC).
*/
Router.route("/serviceRequestFormCreateEdit", {
    name: "serviceRequestFormCreateEdit",
    loadingTemplate: "serviceFormEditorLoading",
    /**
    */
    data: function() {
        formId = Session.get("formId");
        Session.set("databaseReady", false);
        Session.set("selectedServiceRequestForm", null);
        console.log("Entrando a editor de formularios para el formulario de id " + formId);
    },
    /**
    */
    waitOn: function() {
        return Meteor.subscribe("serviceRequestQueryType");
    }
});

//============================================================================

/**
*/
var customMultipleChoicesEditorForm = function(queryId, queryType) 
{
    var html;

    html = '<table border="2">';

    var varname = "EditAnswerOptionsFor" + queryId;
    var choices = Session.get(varname);

    var i;

    for ( i in choices ) {
        html += '<tr><td>';
        html += '<div class="col-md-6">';
        html += '    <form id=' + queryId + ' class="editMultipleChoiceForm">';
        html += '        <input type="text" id="' + choices[i]._id + '" name="content" value="' + choices[i].nameSpa + '">';
        html += '    </form>';
        html += '</div>';
        /*
        html += '<div class="col-md-2">';
        html += '    <form id=' + queryId + ' class="upMultipleChoiceForm">';
        html += '        <input type="submit" id="' + choices[i]._id + '" name="button" value="subir">';
        html += '    </form>';
        html += '</div>';
        html += '<div class="col-md-2">';
        html += '    <form id=' + queryId + ' class="downMultipleChoiceForm">';
        html += '        <input type="submit" id="' + choices[i]._id + '" name="button" value="bajar">';
        html += '    </form>';
        html += '</div>';
        */
        html += '<div class="col-md-2">';
        html += '    <form id=' + queryId + ' class="deleteMultipleChoiceForm">';
        html += '        <input type="submit" id="' + choices[i]._id + '" name="button" value="borrar">';
        html += '    </form>';
        html += '</div>';
        html += '</td></tr>';
    }

    html += '<tr>';
    html += '<td>';
    html += '<form class="createMultipleChoiceForm">';
    html += '    <input type="text" id="' + queryId + '" name="newOption" value="" >';
    html += '    <input type="submit" value="Agregar opción de respuesta">';
    html += '</form>';
    html += '</td>';
    html += '</tr>';
    html += '</table>';

    return html;
}

/**
*/
var showMultipleChoicesEditorForm = function(queryId, queryType) 
{
    var html;

    html = '';

    var varname = "EditAnswerOptionsFor" + queryId;
    var choices = Session.get(varname);

    var i;

    for ( i in choices ) {
        html += '<li>';
        html += choices[i].nameEng;
        html += '</li>';
    }

    return html;
}

/**
Limpia el caché de opciones de respuesta para la pregunta especificada.
*/
var updateAnswerOptionsCacheForQueryId = function(questionId)
{
    var varnamecached = "EditAnswerOptionsFor" + questionId;
    Session.get(varnamecached, null);
    Meteor.call("getAnswerOptionsFromQueryId", questionId, function(error, response) 
        {
            if ( valid(error) ) {
                console.log("Error  llamando answerOptionsListReady");
            }
            else if ( valid(response) && valid(response.id) && valid(response.array) ) {
                console.log("  - Recibo respuesta del RPC");
                var varname = "EditAnswerOptionsFor" + response.id;
                Session.set(varname, response.array);
            }
        }
    );
}

/**
Limpia el caché de preguntas para el formulario actual.
*/
var updateEditQueryArrayForFormId = function(fid)
{
    var varnamereset = "EditQueryArrayFor" + fid;
    
    // Borra el caché, ya que en modo edición la información cambia
    Session.set(varnamereset, null);
    Meteor.call("getQueriesFromFormId", fid, 
        function(err, response) {
            if ( valid(err) ) {
                console.log("  - Mensaje de error: " + err);
            }
            else if ( valid(response) && 
                valid(response.id) && valid(response.array) ) {
                var varname = "EditQueryArrayFor" + response.id;
                Session.set(varname, response.array);
            }
        }
    );
}

/**
Exporta la colección de la conexión a la base de datos MongoDB para hacerla 
disponible como una variable en el contexto Sidebar.

Nótese que esta función retorna un subconjunto de datos de la tabla
serviceRequestForm2Query a partir de la forma actualmente seleccionada
selectedServiceRequestForm.
*/
Template.serviceRequestFormCreateEdit.helpers({
    /**
    */
    reportQueryTypeOption: function(queryType, query)
    {
        html = '<option value="' + queryType._id + '"">' + queryType.nameSpa + '</option>';

        if ( valid(query.queryTypeId) && query.queryTypeId === queryType._id ) {
            html = '<option value="' + queryType._id + '"" selected="true">' + queryType.nameSpa + '</option>';
        }

        return html;
    },
    /**
    */
    dbServiceRequestForm2Query: function() 
    {
        var srf = Session.get("selectedServiceRequestForm");

        if ( !valid(srf) ) {
            console.log("Importando la coleccion dbServiceRequestForm2Query para la plantilla serviceRequestFormCreateEdit");
            console.log("  - Error: No hay un formulario seleccionado para dbServiceRequestForm2Query");
            return false;
        }
        else if ( !valid(srf._id) ) {
            console.log("Importando la coleccion dbServiceRequestForm2Query para la plantilla serviceRequestFormCreateEdit");
            console.log("  - Error: El formulario seleccionado para dbServiceRequestForm2Query no tiene _id!");
            return false;   
        }
        else {
            console.log("Importando (con filtro de id de formulario " + srf._id + ") la coleccion dbServiceRequestForm2Query para la plantilla serviceRequestFormCreateEdit");
        }

        var options = {"sort" : [["order", "asc"]]};
        var filter = {formId : srf._id};
        var dbTable;
        dbTable = serviceRequestForm2Query.find(filter, options);

        if ( !valid(dbTable) ) {
            alert("ERROR: No es posible consultar la tabla serviceRequestForm2Query. Revise su conexión a internet.");
        }

        return dbTable;
    },
    /*
    Exporta la coleccion de la conexión a la 
    base de datos MongoDB para hacerla disponible como una variable en el 
    contexto Sidebar.
    */
    dbProfessionalService: function() {
        console.log("Importando la coleccion dbProfessionalService para la plantilla serviceRequestFormCreateEdit");
        return professionalService.find();
    },
    /*
    Exporta la coleccion de la conexión a la 
    base de datos MongoDB para hacerla disponible como una variable en el 
    contexto Sidebar.
    */
    dbServiceRequestForm: function() {
        console.log("Importando la coleccion dbServiceRequestForm para la plantilla serviceRequestFormCreateEdit");
        return serviceRequestForm.find();
    },
    /*
    Exporta la coleccion de la conexión a la 
    base de datos MongoDB para hacerla disponible como una variable en el 
    contexto Sidebar.
    */
    dbServiceRequestFormQuery: function() {
        console.log("Importando la coleccion dbServiceRequestFormQuery para la plantilla serviceRequestFormCreateEdit");
        return serviceRequestFormQuery.find();
    },
    /*
    Exporta la coleccion de la conexión a la 
    base de datos MongoDB para hacerla disponible como una variable en el 
    contexto Sidebar.
    */
    dbServiceRequestQueryType: function() {
        console.log("Importando la coleccion dbServiceRequestQueryType para la plantilla serviceRequestQueryTypeCreate");
        return serviceRequestQueryType.find();
    },
    /**
    */
    databaseReady: function () { 
        var s = Session.get("databaseReady");
        return s;
    },
    /**
    */
    databaseStatusMessage: function () { 
        var html;
        var status = true;

        html = '<ul>';

        html += '<li>serviceRequestForm2Query: ';
        if ( serviceRequestForm2QueryHandle.ready() ) {
            html += 'LISTO';
        }
        else {
            html += 'CARGANDO';
            status = false;
        }
        html += '</li>';

        html += '<li>professionalService: ';
        if ( professionalServiceHandle.ready() ) {
            html += 'LISTO';
        }
        else {
            html += 'CARGANDO';
            status = false;
        }
        html += '</li>';

        html += '<li>serviceRequestForm: ';
        if ( serviceRequestFormHandle.ready() ) {
            html += 'LISTO';
        }
        else {
            html += 'CARGANDO';
            status = false;
        }
        html += '</li>';

        html += '<li>serviceRequestQueryType: ';
        if ( serviceRequestQueryTypeHandle.ready() ) {
            html += 'LISTO';
        }
        else {
            html += 'CARGANDO';
            status = false;
        }
        html += '</li>';

        html += '<li>serviceRequestFormQuery: ';
        if ( serviceRequestFormQueryHandle.ready() ) {
            html += 'LISTO';
        }
        else {
            html += 'CARGANDO';
            status = false;
        }
        html += '</li>';

        html += '<li>serviceRequestAnswerOption: ';
        if ( serviceRequestAnswerOptionHandle.ready() ) {
            html += 'LISTO';
        }
        else {
            html += 'CARGANDO';
            status = false;
        }
        html += '</li>';

        html += '</ul>';

        if ( status ) {
            Session.set("databaseReady", true);
        }
        else {
            Session.set("databaseReady", false);
        }

        return html;
    },
    /**
    Le da acceso a la plantilla Spacebars a una variable de sesión (reactiva)
    */
    selectedServiceRequestForm: function() {
        return Session.get("selectedServiceRequestForm");
    },
    /**
    Dado un identificador de un formulario, esta función retorna
    el id correspondiente en la base de datos. Nótese que si el 
    formulario existe en la base de datos y logra cargarse, se retorna
    el mismo id especificado, pero puede pasar que el formulario no
    exista, y en ese caso se crea un formulario vacío y se retorna
    un id que no es el mismo que se había especificado si no el
    nuevo.

    Si no hay disponible ningún formulario asociado, se retorna false.
    */
    getServiceRequestFormId: function() {
        console.log("Accediendo al formulario actualmente cargado");

        if ( !valid(formId) ) {
            console.log("  - Error: en getServiceRequestFormId se ha recibido un FORMID inválido");
            return false;
        }

        var selectedServiceRequestForm = Session.get("selectedServiceRequestForm");

        if ( valid(selectedServiceRequestForm) && valid(selectedServiceRequestForm._id) ) {
            return selectedServiceRequestForm._id;
        }

        console.log("  - Solicitando formulario al servidor...");
        Meteor.call("getFormFromId", formId, function(error, response) {
            if ( valid(error) ) {
                console.log("Error llamando getFormFromProfessionalServiceId: " + error);
            }
            else {
                if ( valid(response.serviceRequestForm) && valid(response.serviceRequestForm._id) ) {
                    console.log("  - Tengo un formulario con id: " + response.serviceRequestForm._id);
                    Session.set("selectedServiceRequestForm", response.serviceRequestForm);
                }
                else {
                    console.log("Error llamando getFormFromProfessionalServiceId: respuesta incompleta.");                    
                }
            }
        });

        return false;
    },
    /**
    Realiza un llamado al procedimiento remoto "getQueriesFromFormId" en el
    lado del servidor y hace disponible la información de las preguntas como
    una variable de sesión que constituye un caché para la sesión de usuario
    actual.
    */
    startForm: function(fid) {
        updateEditQueryArrayForFormId(fid);
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
    dbServiceRequestFormQueryFiltered: function(fid) {
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
    El contexto this es una pregunta.
    */
    showUpForm: function()
    {
        var fid;
        fid = Session.get("selectedServiceRequestForm");
        if ( !valid(fid) || !valid(fid._id) ) {
            return false;
        }

        var array = Session.get("EditQueryArrayFor" + fid._id);
        if ( !valid(array) ) {
            return false;
        }

        if ( valid(array[0]._id) && this._id == array[0]._id && this.order === 1 ) {
            return "El primero no sube";
        }

        html = '<form class="reorderQueryForm">';
        html +='    <input type="submit" id="' + this._id + '" name="up" value="Subir en orden"  class="btn btn-primary btn-block" style="padding:0">';
        html += '</form>';
        return html;
    },
    /**
    El contexto this es una pregunta.
    */
    showDownForm: function()
    {
        var fid;
        fid = Session.get("selectedServiceRequestForm");
        if ( !valid(fid) || !valid(fid._id) ) {
            return false;
        }

        var array = Session.get("EditQueryArrayFor" + fid._id);
        if ( !valid(array) ) {
            return false;
        }

        if ( array.length <1 ) {
            return "";
        }
        ult = array.length - 1;
        if ( this._id == array[ult]._id ) {
            return "El último ya no baja";
        }

        html = '<form class="reorderQueryForm">';
        html +='    <input type="submit" id="' + this._id + '" name="down" value="Bajar en orden" class="btn btn-primary btn-block" style="padding:0">';
        html += '</form>'; 
        return html;
    },
    /**
    Esta función retorna un arreglo con los tipos de preguntas en la
    base de datos del sistema (que es un número pequeño de opciones).
    La primera vez que se llama se conecta con la base de datos y
    realiza una consulta que es guardada en una variable local
    de tipo caché. Los siguientes llamados consultan el caché y
    no llaman a la base de datos, contribuyendo al comportamiento
    eficiente del código. Nótese que esta función fue diseñada
    para ser llamada varias veces en una página (una para cada
    pregunta contenida dentro de un formulario).
    */
    dbQueryTypesArray: function() {
        //-----------------------------------------------------------------
        var queryTypesArr;
        
        queryTypesArr = Session.get("queryTypesArray");
        
        if ( valid(queryTypesArr) ) {
            return queryTypesArr;
        }
        
        var options = {"sort" : [["nameSpa", "asc"]]};
        queryTypesArr = serviceRequestQueryType.find({}, options).fetch();
        Session.set("queryTypesArray", queryTypesArr);
        return queryTypesArr;
    },
    /**
    Dado el identificador de una pregunta, carga las opciones de respuesta asociadas
    */
    answerOptionsListReady: function(questionId, queryType) {
        if ( queryType == "SINGLE_SELECTION_CUSTOM" || queryType == "MULTIPLE_SELECTION_CUSTOM" ) {
            var cache;
            var varnamecache = "EditAnswerOptionsFor" + questionId;
            cache = Session.get(varnamecache);
            if ( valid(cache) ) {
                return true;
            }
            updateAnswerOptionsCacheForQueryId(questionId);
            return false;
        }
        return true;
    },
    /**
    This es una pregunta
    */
    editServiceRequestFormQueryDetails: function () {
        //-----------------------------------------------------------------
        var queryTypes = Session.get("queryTypesArray");
        
        if ( !queryTypes ) {
            return "Cargando detalles de la pregunta a partir de la base de datos";
        }
        
        html = "El tipo de pregunta actual es: ";
        var queryType = null;
        var i;
        for ( i in queryTypes ) {
            if ( queryTypes[i].nameC === this.typeC ) {
                queryType = queryTypes[i];
                break;
            }
        }

        if ( !valid(queryType) || !valid(queryType.nameSpa) ) {
            html += "[indefinida], y por lo tanto no trae parámetros adicionales";
        }
        else {
            html += queryType.nameSpa;
            var t = queryType.nameC;
            if ( t == "SINGLE_SELECTION_CUSTOM" ) {
                html += ", y tiene como parámetros adicionales una lista de posibles respuestas:";
                html += customMultipleChoicesEditorForm(this._id, queryType);
            }
            else if ( t == "MULTIPLE_SELECTION_CUSTOM" ) {
                html += ", y tiene como parámetros adicionales una lista de posibles respuestas:";
                html += customMultipleChoicesEditorForm(this._id, queryType);
            }
            else {
                html += ", y no tiene parámetros adicionales."
            }
        }
        
        return html;
    },
    /**
    This es una pregunta
    */
    showServiceRequestFormQueryDetails: function () {
        //-----------------------------------------------------------------
        var queryTypes = Session.get("queryTypesArray");
        
        if ( !queryTypes ) {
            return "Cargando detalles de la pregunta a partir de la base de datos";
        }

        html = "";
        var queryType = null;
        var i;
        for ( i in queryTypes ) {
            if ( queryTypes[i].nameC === this.typeC ) {
                queryType = queryTypes[i];
                break;
            }
        }

        if ( !valid(queryType) || !valid(queryType.nameSpa) ) {
            html += "[indefinida], y por lo tanto no trae parámetros adicionales";
        }
        else {
            var t = queryType.nameC;
            if ( t == "SINGLE_SELECTION_CUSTOM" || t == "MULTIPLE_SELECTION_CUSTOM" ) {
                html += "<ul>";
                html += showMultipleChoicesEditorForm(this._id, queryType);
                html += "</ul>";
            }
        }
        
        return html;
    },
    /**
    Esta función es llamada por el CRUD de edición de formularios para llenar
    el contenido de un diálogo modal y permitir que el usuario administrador
    (editor de formularios) pueda probar cómo está quedando el formulario
    que está haciendo.
    */
    testDialog: function () {
        console.log("Armando formulario de prueba!");

        var srf = Session.get("selectedServiceRequestForm");

        if ( !valid(srf) ) {
            var msg = "Error: No hay un formulario seleccionado para testDialog";
            console.log(msg);
            return msg;
        }

        var formString = "<form class=\"testDialogForm\">"
        formString = buildForm(srf._id);
        formString += "</form>";

        return formString;
    }    
});

/**
*/
Template.serviceRequestFormCreateEdit.events({
    "submit .createMultipleChoiceForm": function (event) {
        event.preventDefault();
        var id = event.target.newOption.id;
        var text = event.target.newOption.value;

        var o = {parentServiceRequestFormQueryId:id, nameSpa:text};
        serviceRequestAnswerOption.insert(o);

        updateAnswerOptionsCacheForQueryId(id);

        return false;
    },
    /**
    */
    "submit .editMultipleChoiceForm": function (event) {
        event.preventDefault();
        var id = event.target.content.id;
        var text = event.target.content.value;
        var qid = event.target.id;

        console.log("Texto: " + text);
        console.log("Option id: " + id);
        console.log("Question id: " + qid);

        if ( !valid(qid) ) {
            return false;
        }
        var filter1 = {_id:id};
        var filter2 = {_id: new Mongo.ObjectID(id)};
        var object = {nameSpa:text};

        serviceRequestAnswerOption.update(filter1, {$set: object}); 
        serviceRequestAnswerOption.update(filter2, {$set: object}); 
        updateAnswerOptionsCacheForQueryId(qid);

        return false;
    },
    /**
    */
    "submit .upMultipleChoiceForm": function (event) {
        event.preventDefault();
        var id = event.target.button.id;
        var qid = event.target.id;

        if ( !valid(qid) ) {
            return false;
        }

        if ( valid(id) ) {
            var o = {parentServiceRequestFormQueryId:id, nameSpa:text};
            serviceRequestAnswerOption.insert(o); 
            console.log("UP ID: " + id);
        }
        else {
            console.log("  - Error: no hay id en el target button para up");
        }
        updateAnswerOptionsCacheForQueryId(qid);

        return false;
    },
    /**
    */
    "submit .downMultipleChoiceForm": function (event) {
        event.preventDefault();
        var id = event.target.button.id;
        var qid = event.target.id;

        if ( !valid(qid) ) {
            return false;
        }

        if ( valid(id) ) {
            console.log("DOWN ID: " + id);
            var o = {parentServiceRequestFormQueryId:id, nameSpa: text};
            serviceRequestAnswerOption.insert(o); 
        }
        else {
            console.log("  - Error: no hay id en el target button para down");
        }
        updateAnswerOptionsCacheForQueryId(qid);

        return false;
    },
    /**
    */
    "submit .deleteMultipleChoiceForm": function (event) {
        event.preventDefault();
        var id = event.target.button.id;
        var qid = event.target.id;

        if ( !valid(qid) ) {
            return false;
        }

        var filter = {_id:id};
        serviceRequestAnswerOption.remove(filter); 
        updateAnswerOptionsCacheForQueryId(qid);

        return false;
    },
    /**
    */
    "submit #formExport": function(event, template) {
        event.preventDefault();
        Meteor.call("writeToFile", "archivo.html", "Hola", function(error, response){
            console.log("Listo");
        });
    },
    "submit .reorderQueryForm": function (event) {
        event.preventDefault();
        var up = event.target.up;
        var down = event.target.down;
        var id;
        var delta;

        if ( typeof up !== "undefined" ) {
            id = event.target.up.id;
            delta = -1;
            console.log("Subiendo en el orden de pregunta: " + id);
        }
        else if ( typeof down !== "undefined" ) {
            id = event.target.down.id;
            delta = 1;
            console.log("Bajando en el orden de pregunta: " + id);
        }
        else {
            return false;
        }

        Meteor.call("changeQuestionOrderInFormFromId", id, delta, function(error, response) {
            if ( valid(error) ) {
                console.log("ERROR llamando changeQuestionOrderInFormFromId: " + error);
            }
            else if ( response === "OK" ) {
                var form = Session.get("selectedServiceRequestForm");
                if ( valid(form) && valid(form._id) ) {
                    updateEditQueryArrayForFormId(form._id);
                }
            }
            else {
                console.log("  - Resultado del llamado RPC: " + response);                
            }
        });
        
        return true;
    },
    /**
    */
    "submit .editQueryForm": function (event) {
        event.preventDefault();

        var id = event.target.description.id;

        console.log("Cambiando la descripción de la pregunta con id " + id);
        
        var langCode = "Spa";
        var s;
        s = "{\"description" + langCode + "\":\"" + 
            event.target.description.value + "\"}";
        var o = JSON.parse(s);

        serviceRequestFormQuery.update(id, {$set: o});

        var form;
        form = Session.get("selectedServiceRequestForm");
        if ( !valid(form) ) {
            return false;
        }
        updateEditQueryArrayForFormId(form._id);

        return true;
    },
    /**
    Esta función es llamada cuando el usuario da click en el botón de agregar
    una nueva pregunta a un formulario.
    */
    "submit .serviceRequestFormQueryAdd": function (event) {
        event.preventDefault();
        var form = Session.get("selectedServiceRequestForm");

        console.log("Agregando nueva pregunta...");
        if ( !valid(form) || !valid(form._id) ) {
            console.log("  - ERROR: No se tiene un formulario seleccionado para edición");
            return false;
        }

        console.log("  - Agregando al formulario con id: " + form._id);

        var varname = "EditQueryArrayFor" + form._id;
        var questionSet = Session.get(varname);
        if ( !valid(questionSet) || !valid(questionSet.length)) {
            console.log("  - ERROR: No se tiene un conjunto de preguntas para el formulario");
            return false;
        }

        //- 1. Cuente cuántas preguntas tiene este formulario
        var nextId = 1;
        var nextSize = questionSet.length + 1;
        var max = 1;

        if ( nextSize > 1 ) {
            for ( var i in questionSet ) {
                var n;
                n = questionSet[i].order;
                if ( n > max ) {
                    max = n;
                }
            }
            nextId = max + 1;
        }

        var newQueryId = serviceRequestFormQuery.insert({});
        console.log("  - Insertando la pregunta con id: " + newQueryId);
        var q = {formId: form._id, queryId: newQueryId, order: + nextId};
        var newAsId = serviceRequestForm2Query.insert(q);
        console.log("  - Insertando la asociación con id: " + newAsId);

        updateEditQueryArrayForFormId(form._id);

        return false;
    },
    /**
    */
    "submit #formTest": function (event, template) {
        event.preventDefault();
        
        var q;

        var selectedServiceRequestForm = Session.get("selectedServiceRequestForm");

        q = {_id: selectedServiceRequestForm._id};

        var form = serviceRequestForm.findOne(q);
        selectedServiceRequestForm = form;

        var content = document.getElementById("testDialogArea");

        var srf = Session.get("selectedServiceRequestForm");
        if ( valid(content) && valid(srf) ) {
            // Llamado a un template de Spacebars desde JavaScript (cool stuff) 
            var f = Template.testFormDialog;
            var html = Blaze.renderWithData(f, srf, content);
        }

        $('#dialogTestForm').modal("show");
        return true;
    },
    /**
    */
    "submit .selectQueryTypeForm": function (event) {
        event.preventDefault();
        var form = event.target;
        var queryId = form.queryType.id;
        var queryTypeId = form.queryType.value;
        var s;
        var o;
        
        s = "{\"queryTypeId\":\"" + queryTypeId + "\"}";
        o = JSON.parse(s);
        
        serviceRequestFormQuery.update(queryId, {$set: o});

        var form;
        form = Session.get("selectedServiceRequestForm");
        if ( !valid(form) ) {
            return false;
        }
        updateEditQueryArrayForFormId(form._id);

        return false;
    },
    /**
    Esta función es llamada cuando se desea eliminar una pregunta de un
    formulario. Recibe el identificador de la pregunta a eliminar en
    "delete.id" dentro de la forma.

    Esta función es llamada cuando el usuario presiona el botón
    correspondiente a la eliminación de una pregunta de un
    formulario.
    */
    "submit .deleteQueryForm": function (event) {
        event.preventDefault();

        var qid;
        qid = event.target.delete.id;

        if ( !valid(qid) ) {
            console.log("Error: Quiero borrar una pregunta, pero su identificación es inválida");
            return false;
        }

        qid = qid.substring(6);

        console.log("Quero borrar la pregunta " + qid);

        var form = Session.get("selectedServiceRequestForm");
        if ( !valid(form) || !valid(form._id) ) {
            console.log("  - ERROR: No se puede identificar el formulario seleccionado");
            return;
        }
        
        Meteor.call("removeQuestionFromId", form._id, qid, function(error, response) {
            if ( valid(error) ) {
                console.log("ERROR llamando la función remota removeQuestionFromId: " + error);
            }
            else if ( valid(response) && response !== false ) {
                updateEditQueryArrayForFormId(response);
            }
        });

        return false;
    }
});

/**
Estos métodos implementan dentro de la plantilla testFormDialog 
la realización de un llamado remoto al servidor y transferir así la información 
de preguntas específicas para el formulario identificado por fid.

Para cada formulario que el usuario navega, se guarda un caché en memoria de la
información en las siguientes variables:
    TestQueryArrayFor{fid}: contenido de las preguntas para el formulario fid
*/
Template.testFormDialog.helpers({
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
