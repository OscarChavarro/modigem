Template.formularioPieza1.events({
        'submit form': function(e) {
           e.preventDefault();
    var NuevaPieza = {
         titulo: $(e.target).find('[name=nombrepieza]').val(),
         categoria: $(e.target).find('[name=cat]').val(),
         natOcult: $(e.target).find('[name=natocult]').val(),
         matOinmat: $(e.target).find('[name=matoinmat]').val(),
         patCientifico: $(e.target).find('[name=patcient]').val(),
         ancho: $(e.target).find('[name=anchodim]').val(),
         largo: $(e.target).find('[name=largodim]').val(),
         alto: $(e.target).find('[name=altodim]').val(),
         desdeAno: $(e.target).find('[name=anodesd]').val(),
         hastaAno: $(e.target).find('[name=anohasta]').val(),
         tecnicaUsada: $(e.target).find('[name=tecnica]').val(),
         medioUsado: $(e.target).find('[name=medioh]').val(),
         tipoMedioAudio: $(e.target).find('[name=audio]').val(),
         ubicacionMuseo: $(e.target).find('[name=ubic]').val(),
         estadoConserv: $(e.target).find('[name=conserv]').val(),
         imagen: $(e.target).find('[name=imagen]').val(),
         imagenID: images.find().fetch()[images.find().count()-1]._id
        };
        piece.insert(NuevaPieza);
        }
        });