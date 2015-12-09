//FACEBOOK
ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
if (process.env.HOSTNAME === 'modigem.museodigital.org') {
 ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '539374709554821', //AppId con URL registrada: 'http://modigem.museodigital.org/'1g
    secret: '37c3d25a9684061d463ab2e3c5056251'
});
        }else{
 ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1671219196483781', //AppId con URL registrada: 'http://localhost:3000'
    secret: 'f864e2c59979eaed7c47b3905d1403eb'
});
}

