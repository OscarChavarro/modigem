 var imageStore = new FS.Store.FileSystem('images');

Images = new FS.Collection('images', {
     stores: [imageStore]
});