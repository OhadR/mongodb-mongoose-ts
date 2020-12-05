const conn = new Mongo();

let db = conn.getDB("admin");
db.auth('###', '####');
print(`authenticated!`);


db = conn.getDB("gisum");

const totalDocCount = db.getCollection('sessions').find().count();
print(`totalDocCount: [${totalDocCount}]`);

//Find the first document in the customers collection:
const result = db.getCollection('sessions').find({'session.metadata.area_locality' : 'usa'}).toArray();

let i = 0;

//    console.log(result);
for(session of result) {
	const tmp = session.metadata.area_region;
	var newvalues = {
		$set: {
			'metadata.area_locality': tmp,
			'metadata.area_region': 'usa'
		}};
	db.getCollection("sessions").updateOne({_id: session._id}, newvalues);
	print("documents updated: ", ++i);
}

//	db.close();
