Template.showPieces.helpers({
	
	VISUAL: function() {
		    if (piece.find().fetch()[piece.find().count()-1].categoria=='Visual'){
				return true;		    
		    }else{
				return false
			}
	    },
    TEXTO: function() {
		    if (piece.find().fetch()[piece.find().count()-1].categoria=='Texto'){
				return true;		    
		    }else{
				return false
			}
	    },
    AUDIOVISUAL: function() {
		    if (piece.find().fetch()[piece.find().count()-1].categoria=='AudioVisual'){
				return true;		    
		    }else{
				return false
			}
	    },
	AUDITIVO: function() {
		    if (piece.find().fetch()[piece.find().count()-1].categoria=='Auditivo'){
				return true;		    
		    }else{
				return false
			}
	    }
	},
	pieces: function() {
        return piece.find();
    },
});