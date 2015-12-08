//GOOGLE
ServiceConfiguration.configurations.remove({
    service: 'google'
});
if (process.env.HOSTNAME === 'modigem.museodigital.org') {
 ServiceConfiguration.configurations.insert({
    service: 'google',
    clientId: '867822180775-hevb99lqr3fhh1q85g3e7ec5b19hslae.apps.googleusercontent.com', //clientId con URL registrada: 'http://modigem.museodigital.org/' MODIGEM
    secret: 'vGDl7b1yWCuDY453rFUSFc61'
});
        }else{
 ServiceConfiguration.configurations.insert({
    service: 'google',
    consumerKey: '17624622797-be1qj7233o12i4glmsbqkvk47p06krof.apps.googleusercontent.com', //clientId con URL registrada: 'http://localhost:3000'
    secret: 'HHuPTT9KU6wde-Wp-mSo496I'
});
}