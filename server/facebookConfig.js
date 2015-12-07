//FACEBOOK
ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
if (process.env.HOSTNAME === 'modigem.museodigital.org') {
 ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1028848720505595', //AppId con URL registrada: 'http://modigem.museodigital.org/'
    secret: 'a96157a2b8e38428b198ac3cf3cde566'
});
        }else{
 ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1671219196483781', //AppId con URL registrada: 'http://localhost:3000'
    secret: 'f864e2c59979eaed7c47b3905d1403eb'
});
}

