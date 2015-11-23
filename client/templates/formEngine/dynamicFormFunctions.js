lastQueryGroup = null;

/**
Dado un objeto en memoria, típicamente uno de los resultados de una
operación tipo "find" que proviene de la base de datos MongoDB, esta
función genera un código HTML con opciones dentro de una caja combo
en un formulario.
*/
var buildComboBoxSelectInputFromArray = function(array, errorLabel, varName)
{
    var html;

    if ( array === null || typeof array === "undefined" ||
         array.length < 1 ) {
        html = 
            "<label>" + errorLabel + "</label>";                
    }
    else {
        html = '<select class="form-control"';        
        html += "name=\"" + varName + "\""; 
        html += "id=\"\">";

        for ( var i in array ) {
            var o = array[i];
            var item = o.nameSpa;
            var answerId = o._id;
            html += "<option value=\"" + answerId + 
            "\">" + item + "</option>";
        }
        html += "</select>";
    }
    return html;
}

/**
Dado un objeto en memoria, típicamente uno de los resultados de una
operación tipo "find" que proviene de la base de datos MongoDB, esta
función genera un código HTML con inputs tipo "radio" para ingresar
en un formulario.
*/
var buildRadioInputsFromArray = function(array, errorLabel, varName)
{
    var html;

    if ( array === null || typeof array === "undefined" ||
         array.length < 1 ) {
        html = 
            "<label>" + errorLabel + "</label>";                
    }
    else {
        html = '<div class="list-group">';
        for ( var i in array ) {
            var o = array[i];
            var item = o.nameSpa;
            var answerId = o._id;
            html += 
                "<input type=\"radio\" name=\"" + varName + 
                "\" value=\"" + answerId + 
                "\">" + item + "</input>";
        }
        html = '</div>';
    }
    return html;
}

/**
Esta función construye un diálogo dinámico que varía dependiendo de la información
del usuario. Si el usuario es anónimo, este formulario solicita información básica
para crear un perfil, como el nombre y el correo electrónico (en esta etapa la
cuenta que se crea no tiene una contraseña asignada, esta se asignará la segunda
vez que el usuario entre al sistema). Si el usuario ya existe y está registrado
no se le preguntan datos.
*/
var buildEmailRegister = function()
{
    var html = 
        '<label>Dentro de las siguientes horas, serás presentado a profesionales disponibles ' +
        'e interesados, quienes estarán enviándote cotizaciones personalizadas basados en las ' +
        'preguntas que acabas de responder. ';
    var uid = Meteor.userId();

    if ( valid(uid) ) {
        // El usuario ya está registrado y se encuentra en sesión
        html += 'Como ya has ingresado al sistema, usaremos los datos de contacto ';
        html += 'registrados en tu perfil para localizarte. Dinos qué mecanismo de contacto prefieres:';
        html += '<div class="radio">';
        html += '  <label>';
        html += '    <input id="emailandmessagepreloaded" type="radio" name="contact" value="emailandmessage" checked>';
        html += '    Quiero recibir las cotizaciones por correo y por mensaje de texto al celular';
        html += '  </label>';
        html += '</div>';
        html += '<div class="radio">';
        html += '  <label>';
        html += '    <input id="emailonlypreloaded" type="radio" name="contact" value="emailonly">';
        html += '   Quiero recibir las cotizaciones únicamente por correo electrónico';
        html += '  </label>';
        html += '</div>';
        html += '<div id="extendedFormArea"></div>';        
    }
    else {
        // El usuario está en modo anónimo
        /*
        var initContent;
        initContent = '<form id="innerDataRequest">';
        initContent += '    <label>Dirección de correo electrónico:</label><br>';
        initContent += '    <input type="text" class="form-control" name="newEmail">';
        initContent += '    <label>Número de celular: (Ejem: 3054124124)</label><br>';
        initContent += '    <input type="text" class="form-control" name="newPhoneNumber" title="Debe tener diez numeros, Ejem: 3051234567" pattern="[0-9]{10}">';
        initContent += '    <label>Nombre:</label><br>';
        initContent += '    <input type="text" class="form-control" name="newName">';
        initContent += '</form>';
        */
        html += 'Dinos cómo prefieres que estos profesionales te contacten:';
        html += '<div class="radio">';
        html += '  <label>';
        html += '    <input id="emailandmessage" type="radio" name="contact" value="emailandmessage"  required>';
        html += '    Quiero recibir las cotizaciones por correo y por mensaje de texto al celular';
        html += '  </label>';
        html += '</div>';
        html += '<div class="radio">';
        html += '  <label>';
        html += '    <input id="emailonly" type="radio" name="contact" value="emailonly" required>';
        html += '   Quiero recibir las cotizaciones únicamente por correo electrónico';
        html += '  </label>';
        html += '</div>';
        html += '<div id="extendedFormArea"></div>';
        //html += '<div id="extendedFormArea">' + initContent + '</div>';
    }
    html += '</label>';
    return html;
}

/**
Dada una pregunta y un tipo de pregunta, esta función calcula el
segmento de código HTML para construir un formulario con los widgets
necesarios para que el usuario de la respuesta.

Existen 3 tipos de segmentos de formularios:
  - Cuadros unitarios: implementando tipos de respuestas abiertas
    y de respuestas simples, como por ejemplo las numéricas
  - Selecciones múltiples estandar por tipo: por ejemplo, en 
    "MULTIPLE_SELECTION_GENRE" se tienen siempre unas opciones
    predefinidas.
  - Selecciones múltiples particulares a la pregunta.

En los casos 2 y 3 se hace una consulta a la tabla 
serviceRequestAnswerOption en la base de datos y se buscan las opciones
cuyos identificadores correspondan al tipo o a la pregunta.

Nótese que este método requiere tener programados acá, de manera
estática, los comportamientos para los siguientes nombres de sistema
(nameC):
  - FREE_TEXT_SINGLE_LINE
  - FREE_TEXT_MULTIPLE_LINE
  - SINGLE_SELECTION_GENRE
  - SINGLE_SELECTION_DISTANCE_KMS
  - GEOGRAPHIC_AREA_WILLING_TRAVEL
  - GEOGRAPHIC_AREA (pregunta especial programada en serviceRequestForm.html)
  - TIME_INTERVAL_AT_DAYS

PRE: query y answers son copias en memoria (cache) de la base de datos.

Utiliza un mecanismo de recepción de información por subscripción personalizada,
lado del cliente. Por investigar si existe una manera de implementar 
esto basados en el Meteor.publish y Meteor.subscribe!
*/
buildAnswerPartFromCType = function(query, serviceRequestAnswerOptionArrayCache)
{
    var html;
    var t = query.typeC;
    var options;
    var filter;
    var loadingArray = [
        {"nameSpa" : "En este momento estamos cargando las opciones"},
        {"nameSpa" : "a partir de la base de datos."}
    ];

    //- 1. Preparación de información común -
    if ( t == "SINGLE_SELECTION_GENRE" ||
         t == "SINGLE_SELECTION_DISTANCE_KMS" ) {
        filter = {fixedToQueryTypeId:queryType._id};
        options = {"sort" : [["order", "asc"]]};
        serviceRequestAnswerOptionArrayCache = loadingArray;
    }

    //- 2. Arme las preguntas -

    if (t == "GEOGRAPHIC_AREA_WILLING_TRAVEL"){
        html = '<div id="grupo">';
        html += ' <div class="form-group">';
        html += '  <div class="checkbox" id="verVoyaProf">';
        html += '   <label><input type="checkbox" id="' + query._id + '" name="' + query._id + '" value="Yo viajo donde esta el profesional">Yo viajo donde esta el profesional</label>';
        html += '  </div>';
        html += ' </div>';
        html += ' <div id="voyaProf" style="padding-left:10px;" class="collapse">';
        html += '  <h5 class="text-uppercase">Estoy dispuesto a viajar dentro de:</h5>';
        html += '  <select class="form-control input-lg">';
        html += '   <option value="mi barrio">Mi Barrio</option>';
        html += '   <option value="mi zona">Mi Zona</option>';
        html += '   <option value="mi ciudad">Bogotá</option>';
        html += '  </select>';
        html += ' </div>';
        html += ' <div class="form-group" id="ProfAmi">';
        html += '  <div class="checkbox">';
        html += '   <label><input type="checkbox" id="' + query._id + '" name="' + query._id + '" value="El profesional viaja donde estoy yo">El profesional viaja donde estoy yo</label>';
        html += '  </div>';
        html += ' </div>';
        html += '</div>';
        html += '<div class="form-group" id="solo">';
        html += ' <div class="checkbox">';
        html += '  <label><input type="checkbox" id="' + query._id + '" name="' + query._id + '" value="Internet o Telefono">Internet o Teléfono</label>';
        html += ' </div>';
        html += '</div>';
    }
    else if (t == "TIME_INTERVAL_AT_DAYS"){
        html = '<div class="form-group" id="calendarType">';
        html +=     '<select class="form-control input-lg" id="' + query._id + '" name="' + query._id + '">';     
        html +=         '<option value="Cualquier dia">Cualquier día</option>';
        html +=         '<option value="Una Fecha especifica">Una Fecha específica</option>';
        html +=         '<option value="Un rango de fechas">Un rango de fechas</option>';
        html +=         '<option value="Dias especificos">Días específicos</option>';                
        html +=     '</select>';
        html += '</div>';

        html += '<div id="simpleCalendar" class="collapse">';
        html +=     '<div class="form-group">';
        html +=         '<h5 class="heading-form">Seleccione una fecha</h5>';    
        html +=         '<input type="text" class="form-control input-lg simpleCalendar" id="' + query._id + '" name="' + query._id + '">';
        html +=     '</div>';
        html += '</div>';

        html += '<div id="multipleCalendarDay" class="collapse">';
        html +=     '<div class="form-group">'; 
        html +=         '<h5 class="heading-form">Seleccione una fecha</h5>';    
        html +=         '<input type="text" class="form-control input-lg multipleCalendarDay" id="' + query._id + '" name="' + query._id + '">';
        html +=     '</div>';
        html += '</div>';

        html += '<div id="multipleCalendar" class="collapse">';
        html +=     '<div class="form-group">'; 
        html +=         '<h5 class="heading-form">Seleccione una fecha</h5>';    
        html +=         '<div class="input-group">';
        html +=             '<input type="text" class="form-control input-lg multipleCalendar1" id="' + query._id + '-1" name="' + query._id + '-1">';
        html +=             '<div class="input-group-addon">A</div>';
        html +=             '<input type="text" class="form-control input-lg multipleCalendar2" id="' + query._id + '-2" name="' + query._id + '-2">';
        html +=         '</div>';
        html +=     '</div>';
        html += '</div>';
    }
    else if ( t == "FREE_TEXT_SINGLE_LINE" ) {
        var contentido = "";
        html = 
            '<input type="text" value="' + contentido + '" ' + 
            'class = "form-control" ' +   
            'placeholder = "Texto libre de un renglón" ' +   
            'id = "' + query._id + '" ' +   
            'name = "' + query._id + '" />';
    }
    else if ( t == "FREE_TEXT_MULTIPLE_LINE" ) {
        var contentido = "";
        html = 
            "<textarea value=\"" + contentido + "\" " + 
            "class = \"form-control\" " +
            "rows = \"4\" " +
            "placeholder = \"Texto libre varios renglones\" " +   
            "id = \"" + query._id + "\" " +   
            "name = \"" + query._id + "\" />";
    }
    else if ( t == "SINGLE_SELECTION_GENRE" ) {
        html = buildRadioInputsFromArray(
            serviceRequestAnswerOptionArrayCache,
            "Acá deberían tenerse opciones de género pero en la base de datos no se encuentran!",
            "answerOptionSingleChoice");
    }
    else if ( t == "SINGLE_SELECTION_DISTANCE_KMS" ) {
        html = buildComboBoxSelectInputFromArray(
            serviceRequestAnswerOptionArrayCache,
            "Acá deberían tenerse distancias pero en la base de datos no se encuentran!",
            "answerOptionSingleChoice");
    }
    else if ( t == "SINGLE_SELECTION_CUSTOM" ) { 
        var serviceRequestAnswerOptionArrayCache;
        var i;

        if ( !valid(serviceRequestAnswerOptionArrayCache) ) {
            html = 
                "<input type=\"text\" value=\"" + 
                "Pregunta de selección simple en múltiples opciones sin opciones\" name = \"" + 
                query._id + "\" />"; 
        }
        else {
            html = "<select class=\"form-control\">";
            for ( i in serviceRequestAnswerOptionArrayCache ) {
                html += "<option>";
                html += "" + serviceRequestAnswerOptionArrayCache[i].nameSpa;
                html += "</option>";
            }
            html += "</select>";
        }
    }
    else if ( t == "MULTIPLE_SELECTION_CUSTOM" ) { 
        var i;

        if ( !valid(serviceRequestAnswerOptionArrayCache) ) {
            html = 
                "<input type=\"text\" value=\"" + 
                "Pregunta de selección múltiple en múltiples opciones sin opciones\" name = \"answer\" />"; 
        }
        else {
            html = "<div class=\"list-group\">";
            for ( i in serviceRequestAnswerOptionArrayCache ) {
                // Mecanismo clásico
                //html += "<br><input type=\"radio\" name=\"" + query._id + "\" value=\"";
                //html += serviceRequestAnswerOptionArrayCache[i].nameSpa + "\">";
                //html += serviceRequestAnswerOptionArrayCache[i].nameSpa + "</input>";

                // Mecanismo nuevo
                html += '<div class="form-group list-group-item">';
                html += '    <div class="checkbox">';
                html += '        <label>';
                html += '<input type="checkbox" name="';
                html += query._id + '" value="' + serviceRequestAnswerOptionArrayCache[i].nameSpa + '">' + serviceRequestAnswerOptionArrayCache[i].nameSpa + '</label>';
                html += '    </div>';
                html += '</div>';
            }
            // Opción de "otro" con cuadro de texto incorporado        
            html += '<div class="form-group list-group-item">';
            html += '    <div class="checkbox">';
            html += '        <label>';
            html += '           <input id="OTHERCHECKBOX" type="checkbox" name="' + query._id + '" value="[OTHER]" />';
            html += '           Otro...';
            html += '           <div id="inner' + query._id + '">'; // Llenado dinámicamente
            html += '           </div>';
            html += '        </label>';
            html += '    </div>';
            html += '</div>';   

            html += "</div>";
        }
    }
    else if ( t == "EMAIL_REGISTER" ) { 
        html = buildEmailRegister();
    }
    else {
        html = 
            "<input type=\"text\" value=\"" + 
            "Respuesta de tipo desconocido [" + t + "]- manejándola como respuesta abierta\" name = \"answer\" />";                
    }
    return html;
}

/**
Dado un registro de la base de datos en la tabla 
"serviceRequestForm2Query"
esta función construye una representación HTML que es útil como
parte de un formulario. Dependiendo del tipo de información de
la pregunta asociada, esta función selecciona el tipo de entrada
particular para la interacción del usuario.
@Deprecated
*/
var buildFormPart = function(q2f, counter)
{
    //- 1. Calcular la descripción de la pregunta ----------------------------
    var description = "[VACIO]";
    var id = "0";
    var query;
    var filter = {_id:q2f.queryId};
    query = serviceRequestFormQuery.findOne(filter);

    if ( query === null || typeof query === "undefined" ) {
        description = "NO SE ENCUENTRA LA PREGUNTA CON ID " +
            q2f.queryId + " EN LA BASE DE DATOS";
        //console.log(description);
    }
    else {
        var d;
        d = query.descriptionSpa;
        if ( d === null || typeof d === "undefined" ) {
            description = "[LA PREGUNTA NO TIENE DESCRIPCION EN LA BASE DE DATOS]";
        }
        else {
            description = query.descriptionSpa;
            id = query._id;
        }
    }

    //- 2. Calcular el widget para la respuesta ------------------------------
    var html;
    var isContactQuestion = false;
 
    if ( query === null || typeof query === "undefined" ) {
        html = "";
    }
    else {
        var tid = query.queryTypeId;

        if ( tid === null || typeof tid === "undefined" ) {
            html = "<input type=\"text\" value=\"TIPO_DE_RESPUESTA_VACIO\" name = \"answer\" />";
        }
        else {
            var queryType;
            queryType = serviceRequestQueryType.findOne({_id:tid});

            if ( queryType === null || typeof queryType === "undefined" ) {
                html = "<input type=\"text\" value=\"ERROR: No queryType with id " + tid + "\" name = \"answer\" />";
            }
            else {
                var typeC;

                typeC = queryType.nameC;
                if ( typeC === null || typeof typeC === "undefined" ) {
                    html = "<input type=\"text\" value=\"ERROR: no nameC property on queryType with id " + tid + "\" name = \"answer\" />";                
                }
                else {
                    html = buildAnswerPartFromCType(query, queryType);
                }

                if ( typeC === "EMAIL_REGISTER" ) {
                    isContactQuestion = true;
                }
            }
        }
    }

    //- 3. Armar el segmento de HTML que representa la pregunta --------------
    part = buildQuestionBeginHtmlSegment();
    part += "    " + html;
    part += "</div>";

    return part;
}

/**
*/
buildQuestionBeginHtmlSegment = function(query)
{
    var html;
    html = "";

    if ( !valid(query) ) {
        return "ERROR: No se ha especificado una pregunta válida en buildQuestionBeginHtmlSegment.";
    }

    if ( !valid(query.typeC) ) {
        return "ERROR: La pregunta especificada en buildQuestionBeginHtmlSegment no tiene un typeC válido.";
    }

    // 1. Identificar si es una pregunta de tipo contacto
    var isContactQuestion = false;
    if ( query.typeC === "EMAIL_REGISTER" ) {
        isContactQuestion = true;
    }

    // 2. Si el grupo de pregunta es diferente al anterior, se inserta el
    //      ícono correspondiente
    if ( (valid(query) && valid(query.legend) && query.legend != lastQueryGroup)
          || isContactQuestion ) {
        html += "<hr>";
        if ( !isContactQuestion ) {
            lastQueryGroup = query.legend;
        }
        else {
            lastQueryGroup = "contact";   
        }
        var icon = "glyphicon-chevron-right";
        var message = "Aca va un título";
        switch ( lastQueryGroup ) {
          case "icon-font-clock":
            icon = "glyphicon-time";
            message = "¿Cuándo necesitas el servicio?";
            break;
          case "icon-font-info ng-scope":
            icon = "glyphicon-pencil";
            message = "Díganos sus necesidades";
            break;
          case "icon-font-location":
            icon = "glyphicon-map-marker";
            message = "¿Dónde quieres el servicio?";
            break;
          case "icon-font-pencil":
            icon = "glyphicon-chevron-right"
            message = "¿Alguna otra cosa que el profesional deba saber?";
            break;
          case "icon-font-truck":
            message = "Ubicación geográfica";
            break;
          case "icon-font-location-travel":
            message = "¿Cómo quieres que se lleve a cabo el servicio?";
            icon = "glyphicon-send";
            break;
          case "contact":
            message = "¿Cómo quieres recibir esta cotización?";
            icon = "glyphicon-send";
            break; 
          default:
            message = "Grupo desconocido";
            break;
        }
        html += '<h3 class="green"><span class="glyphicon ' + icon + '"></span>' + message + '</h3>';
    }
    return html;
}

/**
Dado un identificador de formulario, esta función genera el código html
necesario para mostrarlo.

Este método está siendo reemplazado por la versión de control basada en código Spacebars,
en las plantillas showServiceRequestForm y en la del editor (pendiente por migrar).
@Deprecated
*/
buildForm = function(fid)
{
    lastQueryGroup = null;

    var filter = {formId:fid};
    var options = {"sort" : [["order", "asc"]]};
    var query2form;
    var selectedServiceRequestForm;

    query2form = serviceRequestForm2Query.find(filter, options).fetch();

    selectedServiceRequestForm = serviceRequestForm.findOne({_id:fid});
    if ( !valid(selectedServiceRequestForm) ) {
        return "ERROR: No hay en la base de datos un formulario con id " + fid ;
    }

    if ( !valid(query2form) || query2form.length < 1 ) {
        //return "<br>[dynamicForm.js] El formulario con ID " +
        //  selectedServiceRequestForm._id + " está vacío.";
        return "<img border=\"\" src=\"img/animations/loading.gif\" />";
    }

    var formString = "";
    var count = 1;

    for ( var i in query2form ) {
        var part = buildFormPart(query2form[i], count);
        formString += part;
        count++;
    }
    formString += "<input type=\"hidden\" name=\"fid\" value=\"" + fid + "\" />";

    return formString;
}
