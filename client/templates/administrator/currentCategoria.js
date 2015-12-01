Template.currentCategoria.helpers ({
    runner: function() {
		variable = piece.find().fetch()[piece.find().count()-1].categoria;
		    if (variable="Visual"){
			    return true;
			    
		    } else if (variable="Texto"){
				return true;
			} else if (variable="AudioVisual"){
				return true;
			} else if (variable="Auditivo"){
				return true;
			}
	    },
	piece: function() {
        return piece.find().fetch()[piece.find().count()-1];
    }
});