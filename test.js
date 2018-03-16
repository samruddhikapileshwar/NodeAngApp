var chai = require('chai');  
var assert = chai.assert;

var Model = require('./model/model.js');
Model = new Model();

describe('Calculation Tests', function() {

    it('Save Data', function(done) {
        Model.saveData(2, 3).then(function(res) {
            assert.equal(res.affectedRows, 1);
            done();
        }, function(err) {
            done(new Error("Error during saving record"));
        }).catch(function(err) {
        	console.log(err);
            done(new Error("Saving record operation failed."));
        });
    });

    it('Get Data', function(done) {
        Model.getData().then(function(res) {
            assert.isOk(res.length != 0, 'this will fail');
            done();
        }, function(err) {
            done(new Error("Error during fetching record"));
        }).catch(function(err) {
            console.log(err);
            done(new Error("Fetching record operation failed."));
        });
    });
});
