imageClon = new Mongo.Collection('imageClon');
imageClon.allow({
    insert: function(){
    return true;
 },
    update: function(){
    return true;
 },
    remove: function(){
    return true;
 }
});
