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

    let i = 0;

//    console.log(result);
	for(session of result) {
		if(session.metadata.area_locality === 'usa') {
			const tmp = session.metadata.area_region;
			var newvalues = {
				$set: {
					'metadata.area_locality': tmp,
					'metadata.area_region': 'usa'
				}};
			dbo.collection("sessions").updateOne({_id: session._id}, newvalues, function(err, res) {

				if (err)
					throw err;
				console.log("documents updated: ", ++i);
			});
        }
	}
	
    db.close();
  });
});
