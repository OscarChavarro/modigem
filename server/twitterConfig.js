// TWITTER
ServiceConfiguration.configurations.remove({
    service: 'twitter'
});
if (process.env.HOSTNAME === 'modigem.museodigital.org') {
 ServiceConfiguration.configurations.insert({
    service: 'twitter',
    consumerKey: 'NR8lHYGLK52RGDOfdOj2HYNFq', //consumerKey con URL registrada: 'http://modigem.museodigital.org/' MODIGEM
    secret: 'h1KPoF18ibAFZBoJyAJ7Fl8uQfRrqdUaN5wvXQs4vWES8zdQyk'
});
        }else{
 ServiceConfiguration.configurations.insert({
    service: 'twitter',
    consumerKey: 'w4rJVBl9p16NONE4GAftFSWSB', //consumerKey con URL registrada: 'http://localhost:3000'
    secret: 'jMqWypHlZ1774f0qopACgr9DSBeVYd7J1V6ENsJJ9i4B5nohWu'
});
}