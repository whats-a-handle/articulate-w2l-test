const Express = require("express");
const Router = Express.Router();
const request = require('request');


Router.get("/pricing",function(req,res){
  //This is mocking a response from Salesforce. Realistically, 
  //we'd query SF or the DB where pricing is held to return the stored values rather than hardcoding them 
  //in the server. This would get returned to the state on our pricing page
  const pricing = {
   basic : {
    name: 'Basic',
    price : '99.99',
    accounts : '12',
    support : '24/7',
    description : 'Just need a few features? We\'ve got you covered.',
  },

   standard : {
    name : 'Standard',
    price : '199.99',
    accounts : '12',
    support : '24/7',
    description : 'Great for small-medium size businesses',

  },
  
   enterprise : {
    name : 'Enterprise',
    price : '1000',
    accounts : '50',
    support : '24/7',
    description : 'Need that next level of support and all the tools in the shed? Say no more!',
  }
}
  //Pretend we're getting pricing from Salesforce here.
  res.json({
    pricing
  });

})
Router.post("/submit", function(req, res) {
  //This information should be managed somewhere else in a configuration file or something
  const webToLeadURL = 'https://webto.salesforce.com/servlet/servlet.WebToLead';
  const oid = '00D1U000000E0fh';
  //Here, we could choose to query SF and deduplicate prior to sending to SF
  //We could also create a dedupe method in SF and POST our data to the method
  //That method would then determine whether or not to insert the record
  //Coding within SF can be painful, so doing heavy lifting outside is preferable, but it's
  //important to maintain a balance between API callouts etc.
  console.log(req.body);
  request.post(webToLeadURL,{form :{
    'first_name' : req.body.first_name,
    'last_name' : req.body.last_name,
    'email' : req.body.email,
    'company' : req.body.company,
    'oid' : oid,
    'lead_source' : 'Web',
    
  }}
  ,(error,response,body)=>{
    //for debugging.
    if(error){
      console.log('ERROR: \n' + error);
      res.json({error:error});
      return;
    }
    console.log('success');
    res.json({response : response, body:body});
  });

});


module.exports = Router;
