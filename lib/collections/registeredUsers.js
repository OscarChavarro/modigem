registeredUsers = new Mongo.Collection('registeredUsers');
users = Meteor.users; // Equivalente a new Mongo.Collection("users"); pero dentro del package Meteor.users
