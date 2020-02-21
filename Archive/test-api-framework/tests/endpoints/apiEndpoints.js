let self = module.exports = {

    getEndpoint: (job) => {
        let endPoint = {};
        if (job == 'local'){
            endPoint['sampleRestApi'] = 'http://localhost:3000/api/customerDetailsFinders/customerDetails';
            endPoint['sampleSoapApi'] = {
                url: 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso',
                wsdl: 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL'
            }
            endPoint['samplePerfApi'] = 'https://reqres.in/api/users?page=2';
        } else{
            endPoint['sampleApi'] = 'http://{API_ENDPOINT}/api/customerDetailsFinders/customerDetails';
            endPoint['samplePerfApi'] = 'https://reqres.in/api/users?page=2';
        }
        return endPoint;
    }

};