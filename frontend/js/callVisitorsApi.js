// Initialize the message so it doesn't pop-up after waiting for the API call.
document.getElementById("visitor-number-message").innerHTML  = 'You are visit # ...'

const visitorCounterEndpoint = 'https://bqjnm5buh4.execute-api.us-east-1.amazonaws.com/prod/visitors'
incrementVisitorCounter(visitorCounterEndpoint)

// incrementVisitorCounter sends a POST to the AWS endpoint using fetch() and updates the hits counter.
function incrementVisitorCounter(endpoint){
    data = {};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    fetch(endpoint, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(data.status);
            }
        }).then(responseData => {
            console.log('Success: ',responseData.body);
            document.getElementById('visitor-number-message').innerHTML  =  `You are visit # ${JSON.parse(responseData.body).visits}!`;
            return responseData;
        }).catch(err => {
            console.log('Error: ', err);
            return err
        })

}