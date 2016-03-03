var express = require('express')
	,bodyParser = require('body-parser')
    ,AWS = require('aws-sdk')
	,AWSConfig = require('./aws.config');

var app = express();

app.use(express.Router());
app.use(bodyParser.json());

//serve all things
app.use(express.static(__dirname + '/'), function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

app.listen(process.env.PORT || 8080);

app.get('/treeOutput', function (req, res) {
	
	AWS.config.update(
      {
        accessKeyId: AWSConfig.accessKeyId, 
        secretAccessKey: AWSConfig.secretAccessKey,
        region: 'us-west-2'
      }
    );
	
	var s3 = new AWS.S3();
    var options = {
        Bucket    : "smx.spark.bio.bucket",
        Key    : "treeOutput/newick",
    };
	
	s3.getObject(options, function(err, data) {
		if (err) { 
			res.send(err);
		
		} else {
		
			var newick;
			newick = data.Body.toString();
			res.send(newick);
		}
	});
	
    //var fileStream = s3.getObject(options).createReadStream();
    //fileStream.pipe(res);

});
