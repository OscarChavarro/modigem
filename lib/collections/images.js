 var imageStore = new FS.Store.FileSystem('images');

images = new FS.Collection('images', {
     stores: [imageStore]
});
images.allow({
    insert: function(){
    return true;
 },
    update: function(){
    return true;
 },
    remove: function(){
    return true;
 },
    download: function(){
    return true;
 }
});