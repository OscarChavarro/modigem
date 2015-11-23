Template.previewPiece.helpers({
    piece: function() {
        return piece.find().fetch()[piece.find().count()-1];
    }
});