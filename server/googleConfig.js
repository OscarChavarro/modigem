//GOOGLE
ServiceConfiguration.configurations.remove({
    service: 'google'
});
if (process.env.HOSTNAME === 'modigem.museodigital.org') {
 ServiceConfiguration.configurations.insert({
    service: 'google',
    clientId: '867822180775-7k7k5vbrmb9kokhkp1k95t6a51n0j0bn.apps.googleusercontent.com', //clientId con URL registrada: 'http://modigem.museodigital.org/' MODIGEM
    secret: 'CMSjNGhDlverFe0YvifnO3Fo'
});
        }else{
 ServiceConfiguration.configurations.insert({
    service: 'google',
    consumerKey: '17624622797-be1qj7233o12i4glmsbqkvk47p06krof.apps.googleusercontent.com', //clientId con URL registrada: 'http://localhost:3000'
    secret: 'HHuPTT9KU6wde-Wp-mSo496I'
});
}