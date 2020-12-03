var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) 
     throw err;
 
  var dbo = db.db("gisum");
  //Find the first document in the customers collection:
  dbo.collection("sessions").find().toArray(function(err, result) {
    if (err)
    	throw err;

//    console.log(result);
	for(session of result) {
//		console.log(session);
		if(!session.metadata.area) {
            console.log('no area found in session');
		    continue;
        }
		const indexOf = session.metadata.area.indexOf('_');
		const country = session.metadata.area.slice(0, indexOf);
		const region = session.metadata.area.slice(indexOf + 1);    //+1 to omit the '_'
		var newvalues = {
		    $set: {
                'metadata.area_locality': country,
                'metadata.area_region': region
            },
		    $unset: {
		        'metadata.area': ''
            }};
        dbo.collection("sessions").updateOne({_id: session._id}, newvalues, function(err, res) {
			
			if (err)
				throw err;
			console.log("1 document updated");
	    });
		
	}
	
    db.close();
  });
});
