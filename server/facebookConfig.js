//FACEBOOK
ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
if (process.env.HOSTNAME === 'modigem.museodigital.org') {
 ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '924578264298107', //AppId con URL registrada: 'http://modigem.museodigital.org/' MODIGEM
    secret: 'fd1b375d846e6c65d5064d86bc373515'
});
        }else{
 ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1671219196483781', //AppId con URL registrada: 'http://localhost:3000'
    secret: 'f864e2c59979eaed7c47b3905d1403eb'
});
}

