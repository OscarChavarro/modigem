Meteor.startup(function () {
    Meteor.methods({
        /**
        Retorna en un arreglo el conjunto de perfiles de usuario disponibles
        para el usuario dado.
        */
        getUserRoles: function(uid) {
            var user2role = global["user2role"];
            var userRole = global["userRole"];
            var arr = [];

            if ( valid(user2role) && valid(userRole) && valid(uid) ) {
                var set;
                set = user2role.find({userId: uid});
                if ( valid(set) ) {
                    var setarr;
                    setarr = set.fetch();
                    if ( valid(setarr) && valid(setarr.length) &&
                         setarr.length > 0 ) {
                        //console.log("Solicitando los roles del usuario " + uid);
                        var i;
                        for ( i in setarr ) {
                            var r = userRole.findOne({_id: setarr[i].userRoleId});
                            if ( valid(r) ) {
                                arr.push({name: r.userRoleNameEng});
                                //console.log("  - Rol: " + r.userRoleNameEng);
                            }
                        }
                    }
                }
            }

            return arr;
        },
        /**
        Hace el método "setPassword" del API Meteor para usuarios disponible
        al lado del cliente.
        */
        setUserPassword: function(userId, newPassword) {
            Accounts.setPassword(userId, newPassword);
        },
        /**
        Mecanismo de envío de información por subscripción personalizada,
        lado del servidor. Por investigar si existe una manera de implementar 
        esto basados en el Meteor.publish y Meteor.subscribe! 

        Este método es usado desde los módulos de gestión de formularios.

        Dado el identificador de una pregunta "queryId", este método
        retorna un objeto que contiene un arreglo con todas las opciones
        de respuesta contenidas en esa pregunta.
        */
        getAnswerOptionsFromQueryId: function(queryId) {
            var errorarray = [
                {"nameSpa" : "ERROR EN EL SERVIDOR: RPC falla en hacer consulta a MongoDB"}
            ];
            // A diferencia del lado del cliente, en el lado del servidor las colecciones
            // MongoDB quedan guardadas en un arreglo de variables globales.
            var serviceRequestAnswerOption = global["serviceRequestAnswerOption"];
            var array;

            if ( !valid(serviceRequestAnswerOption) ) {
                return {id: queryId, array: errorarray};
            }
            else {
                var filter = {parentServiceRequestFormQueryId: queryId};
                var options = {"sort" : [["order", "asc"]]};

                array = serviceRequestAnswerOption.find(filter, options).fetch();
                if ( !valid(array) ) {
                    console.log("  - Error: fallo de acceso a la base de datos");
                    return {id: fid, array: errorarray};
                }
            }

            var answer;
            answer = {
                id: queryId,
                array: array
            };

            return answer;
        },
        /**
        Mecanismo de envío de información por subscripción personalizada,
        lado del servidor. Por investigar si existe una manera de implementar 
        esto basados en el Meteor.publish y Meteor.subscribe!

        Este método es usado en los módulos de gestión de formularios.

        Dado el identificador de un formulario "fid", este método
        retorna un objeto que contiene un arreglo con todas las 
        preguntas contenidas en ese formulario.
        */
        getQueriesFromFormId: function(fid) {
            var answer;
            var filter = {formId: fid};
            var options = {"sort" : [["order", "asc"]]};

            // A diferencia del lado del cliente, en el lado del servidor las colecciones
            // MongoDB quedan guardadas en un arreglo de variables globales.
            var serviceRequestForm2Query = global["serviceRequestForm2Query"];
            var serviceRequestFormQuery = global["serviceRequestFormQuery"];
            var serviceRequestQueryType = global["serviceRequestQueryType"];
            var array = [];

            if ( !valid(serviceRequestForm2Query) || 
                 !valid(serviceRequestFormQuery) ||
                 !valid(serviceRequestQueryType) ) {
                array = [{"nameSpa" : "ERROR EN EL SERVIDOR: RPC no tiene acceso a colección de la base de datos MongoDB"}];
                return {id: fid, array: array};
            }
            else {
                array = serviceRequestForm2Query.find(filter, options).fetch();
                if ( !valid(array) ) {
                    array = [{"nameSpa" : "ERROR EN EL SERVIDOR: RPC falla en hacer consulta a MongoDB"}];
                    console.log("  - Error: fallo de acceso a la base de datos");
                    return {id: fid, array: array};
                }
            }

            var questionsArray = [];
            var o;
            var i;
            var defaultOrder = 1;
            for ( i in array ) {
                filter = {_id:array[i].queryId};
                var o = serviceRequestFormQuery.findOne(filter);
                if ( valid(o) ) {
                    // Append query type information to query
                    if ( valid(o.queryTypeId) ) {
                        var queryType;
                        queryType = serviceRequestQueryType.findOne({_id:o.queryTypeId});
                        if ( valid(queryType) && valid(queryType.nameC) ) {
                            o.typeC = queryType.nameC;
                        }
                    }

                    // Append order information to query
                    if ( valid(array[i].order) ) {
                        o.order = array[i].order;
                        defaultOrder = o.order + 1;
                    }
                    else {
                        o.order = defaultOrder;
                        defaultOrder = defaultOrder + 1;
                    }

                    // Append empty description
                    if ( !valid(o.descriptionSpa) ) {
                        o.descriptionSpa = "[Descripción vacía]";
                    }

                    questionsArray.push(o);
                }
            }
            answer = {id: fid, array: questionsArray};

            return answer;
        },
        /**
        Mecanismo de envío de información por subscripción personalizada,
        lado del servidor.

        Este método es usado en los módulos de gestión de formularios.

        Dado el identificador de un servicio formulario "formId", este método
        retorna un objeto que contiene un identificador de formulario si existe
        o retorna un nuevo formulario si no existe. Nótese que el _id del 
        formulario es diferente a formId en el caso de tener que crear un
        nuevo formulario.
        */
        getFormFromId: function(formId) {
            console.log("========================================================");
            console.log("  - Me preguntan por el formulario con ID: " + formId);
            var serviceRequestForm = global["serviceRequestForm"];

            if ( !valid(formId) || !valid(serviceRequestForm) ) {
                console.log("    . Error: FORMID inválido o no hay acceso a la base de datos");
                return {formId: formId, fid: "undefined"};
            }

            var oid;
            oid = new Mongo.ObjectID(formId);
            var filter;
            filter = {_id: oid};
            var o = serviceRequestForm.findOne(filter);

            if ( !valid(o) ) {
                console.log("    . Error: formulario no encontrado, creando uno nuevo");
                oid = new Mongo.ObjectID();
                filter = {_id: oid};
                serviceRequestForm.insert(filter);
                o = serviceRequestForm.findOne(filter);
                if ( !valid(o) ) {
                    return {formId: formId, fid: "undefined"};
                }
                return {formId: o._id, serviceRequestForm: o};
            }

            var answer;
            console.log("    . Formulario encontrado: " + o._id);
            answer = {formId: formId, serviceRequestForm: o};
            return answer;
        },
        /**
        Mecanismo de envío de información por subscripción personalizada,
        lado del servidor. Por investigar si existe una manera de implementar 
        esto basados en el Meteor.publish y Meteor.subscribe!

        Este método es usado en los módulos de gestión de formularios.

        Dado el identificador de un servicio profesional "psid", este método
        retorna el objeto correspondiente a ese id de la base de datos.
        */
        getProfessionalServiceFromId: function(psid) {
            console.log("========================================================");
            console.log("  - Me preguntan por el servicio profesional de _id: " + psid);
            var professionalService = global["professionalService"];

            if ( !valid(psid) || !valid(professionalService) ) {
                console.log("    . Error: PSID inválido o no hay acceso a la base de datos");
                return {psid: psid, fid: "undefined"};
            }

            var filter;
            filter = {_id: ""+psid};
            var o = professionalService.findOne(filter);

            if ( !valid(o) ) {
                console.log("    . Error: servicio profesional no encontrado");
                return {psid: psid, fid: "undefined"};                
            }

            var answer;
            console.log("    . Servicio profesional encontrado: " + o._id);
            answer = {psid: psid, professionalService: o};
            return answer;
        },
        /**
        Mecanismo de acceso eficiente a la base de datos MongoDB para operación
        compuesta.

        Este método es usado en los módulos de gestión de formularios. Nótese que
        mantiene la integridad referencial y en el proceso modifica varias 
        colecciones MongoDB.
        */
        removeQuestionFromId: function(formId, qid) {
            var serviceRequestForm2Query = global["serviceRequestForm2Query"];
            var serviceRequestFormQuery = global["serviceRequestFormQuery"];

            if ( !valid(serviceRequestForm2Query) || !valid(serviceRequestFormQuery) ) {
                return false;
            }

            var filter = {queryId: qid};
            serviceRequestForm2Query.remove(filter);
            serviceRequestFormQuery.remove(filter);

            /*
            NOTA: acá debería revisarse la integridad referencial
            de la base de datos y buscar que no queden respuestas
            sueltas.
            */

            return formId;
        },
        /**
        */
        changeQuestionOrderInFormFromId: function(questionId, delta) {
            var serviceRequestForm2Query = global["serviceRequestForm2Query"];

            if ( !valid(serviceRequestForm2Query) ) {
                return "Error: no se tiene acceso a la colección MongoDB";
            }

            var qa;
            qa = {queryId: questionId};
            var q2fa = serviceRequestForm2Query.findOne(qa);
            if ( !valid(q2fa) ) {
                return "Error: no encuentra la asociación";
            }
            var currentOrder = 1;
            if ( valid(q2fa.order) ) {
                currentOrder = q2fa.order;
            }
            var n1 = parseInt(currentOrder);
            var n2 = n1 + delta;
            if ( n2 < 1 ) {
                return "No se mueve";
            }
            
            var qb;
            qb = {order: n2, formId: q2fa.formId};            
            var q2fb = serviceRequestForm2Query.findOne(qb);

            if ( valid(q2fb) ) {
                o = {order: n1};
                serviceRequestForm2Query.update(q2fb._id, {$set: o});
            }
            o = {order: n2};
            serviceRequestForm2Query.update(q2fa._id, {$set: o});
            return "OK";
        },


        /* Servicio de TWILIO para servicio de mensajeria (periodo de prueba)
         *  Tipo 2: Mensaje al cliente cuando recibio una cotizacion
         *  Tipo 1: Mensaje al profesional cuando fue contratado
         * */

        sendSMS: function(To, Body, Type, name) {

            var ACCOUNT_SID = 'ACe5321e306357e72e720e5436cd635bb2';
            var AUTH_TOKEN = 'bbb60362bd0b7f1b96a81cf35802c648';
            var FROM = '+17758354287'
            var twilio = Twilio(ACCOUNT_SID, AUTH_TOKEN);

            var sms = global["sms"];
            var numsms = sms.find().count();

            if(numsms <= 100) {

                if (Type == "1") {
                    console.log("****** Mensaje para Profesional Contratado, " + name + " al numero " + To + "  ********* "+FROM);
                    twilio.sendSms({
                            to: To,
                            from: FROM,
                            body: Body
                        },

                        function (err, responseData) {
                            if (!err) {
                                console.log("Mensaje Procesado, id: " + responseData.sid);
                            }
                        });
                }
                if (Type == "2") {
                    console.log("****** Mensaje para Cliente, " + name + " al numero " + To + " al recibir cotizacion  ********* "+FROM);
                    twilio.sendSms({
                            to: To,
                            from: FROM,
                            body: Body
                        },

                        function (err, responseData) {
                            if (!err) {
                                console.log("Mensaje Procesado, id: " + responseData.sid);
                            }
                        });
                }
            }
            else
            {
                console.log("No se pudo enviar el Mensaje, se alcanzo limite de 100 SMS")
                return false;
            }
        }
    });
});
