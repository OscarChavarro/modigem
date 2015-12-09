/**
Esta función se utiliza para tener acceso a las variables del método
GET cuando se usa el operador "?" en una URL, como
http://www.servidor.com/carpeta/archivo?parametro=valor&parametro2=valor2

Se retorna un arreglo con todos los parametros y valores, como
[{parametro: valor}, {parametro2:valor2}]
*/
accessGetParameters = function()
{
    var _GET = {};
    var params = window.location.search;
    
    if ( params.length > 1 || params.length <= 20 ) {
        params = "{\"" + params.substring(1, params.length) + "\"}"; 
        var re = new RegExp("&", 'g');
        params = params.replace(re, "\", \"");
        re = new RegExp("=", 'g');
        params = params.replace(re, "\":\"");
        if ( params.toString().length <= 4 ) {
            return _GET;
        }
        _GET = JSON.parse(params);
    }
    return _GET;
}

/**
Esta función retorna false si el objeto es null o está
indefinido. Esta función es de uso común y fundamental en el proyecto
tanto del lado del cliente como del lado del servidor.
*/
valid = function(o)
{
    if ( typeof o === "undefined" || o == null ) {
        return false;
    }
    return true;
}

/**
Revisar cómo integrar una version JSON-stringifada.
*/
printObject = function(o)
{
    if ( o === null || typeof o === "undefined" ) {
        console.log("El objeto es indefinido!");
    }
    else if ( typeof o === "object" ) {
        if ( o.length < 1 ) {
            console.log("  * Objeto vacío");
        }
        else {
            console.log("* Objeto con los siguientes atributos:");
            for ( var i in o ) {
                console.log("  - " + i + ": " + o[i]);
            }
        }
    }
    else if ( typeof o === "string" ||
               typeof o === "number" ) {
        console.log(o);
    }
    else {
        console.log("Objeto desconocido! Ver funcion printObject");
        console.log("  - tipo: " + typeof o);
    }   
}
