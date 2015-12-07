Template.formularioPieza1.onCreated ( function (){
    this.Visual= new ReactiveVar(false);
    this.Texto= new ReactiveVar(false);
    this.AudioVisual= new ReactiveVar(false);
    this.Auditivo= new ReactiveVar(false);
});

Template.formularioPieza1.helpers({
    Visual: function() {
        return Template.instance().Visual.get();
    },
    Texto: function() {
        return Template.instance().Texto.get();
    },
    AudioVisual: function(){
        return Template.instance().AudioVisual.get();
    },
    Auditivo: function() {
        return Template.instance().Auditivo.get();
    }
});
Template.formularioPieza1.events({
    'click label': function( event, template ) {
        if ( $( event.target ).val() === "Visual" ) {
            template.Visual.set( true );
            template.Texto.set(false);
            template.AudioVisual.set(false);
            template.Auditivo.set(false);    
        } else if ( $( event.target ).val() === "Texto" ){
            template.Visual.set(false);
            template.Texto.set(true);
            template.AudioVisual.set(false);
            template.Auditivo.set(false);
        } else if ( $( event.target ).val() === "AudioVisual" ){
            template.Visual.set(false);
            template.Texto.set(false);
            template.AudioVisual.set(true);
            template.Auditivo.set(false);
        } else if ($( event.target ).val() === "Auditivo") {
            template.Visual.set(false);
            template.Texto.set(false);
            template.AudioVisual.set(false);
            template.Auditivo.set(true);
        } else {
            template.Visual.set(false);
            template.Texto.set(false);
            template.AudioVisual.set(false);
            template.Auditivo.set(false);
        }
  },
    'submit form': function(e) {
        e.preventDefault();
        var llorar= document.getElementsByName("medio");
            for(var i=0; i<llorar.length; i++) {
                if (llorar[i].checked==true) {
                inputTipo = llorar[i].value;
                }
            }
        var NuevaPieza = {
            nombre1: $(e.target).find('[name=nombrepieza]').val(),
            nombre2: $(e.target).find('[name=nombrepopular]').val(),
            etiqueta: $(e.target).find('[name=etiqueta]').val(),
            descripcion: $(e.target).find('[name=descripcion]').val(),
            categoria: inputTipo,
            obra: $(e.target).find('[name=obra]').val(),
            tecnica: $(e.target).find('[name=tecnica]').val(),
            dimensiones: $(e.target).find('[name=dimensiones]').val(),
            caracteres: $(e.target).find('[name=caracteres]').val(),
            idioma: $(e.target).find('[name=idioma]').val(),
            tiempo: $(e.target).find('[name=tiempo]').val(),
            formato: $(e.target).find('[name=formato]').val(),
            duracion: $(e.target).find('[name=duracion]').val(),
            streaming: $(e.target).find('[name=streaming]').val(),
            inicio: $(e.target).find('[name=inicio]').val(),
            fin: $(e.target).find('[name=fin]').val(),
            origen: $(e.target).find('[name=origen]').val(),
            ubicacion: $(e.target).find('[name=ubicacion]').val(),
            coleccion: $(e.target).find('[name=coleccion]').val(),
            estado: $(e.target).find('[name=estado]').val(),
            imagen: $(e.target).find('[name=imagen]').val(),
            imagenID: images.find().fetch()[images.find().count()-1]._id
        };
        piece.insert(NuevaPieza);
        
        
    }
    
});
