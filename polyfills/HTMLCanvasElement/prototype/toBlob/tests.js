/* eslint-env mocha, browser */
/* global proclaim */

it("should output a PNG blob", function(done) {
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.height = 10;
	canvas.width = 10;
	ctx.fillRect(0, 0, 10, 10);
	canvas.toBlob(function(blob) {
		try {
			proclaim.greaterThan(blob.size, 0);
			proclaim.equal(blob.type, "image/png");
			done();
		} catch (e) {
			done(e);
		}
	});
});

it("should output a JPG blob", function(done) {
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.height = 10;
	canvas.width = 10;
	ctx.fillRect(0, 0, 10, 10);

	canvas.toBlob(function(blob) {
		try {
			proclaim.equal(blob.type, "image/jpeg");
			done();
		} catch (e) {
			done(e);
		}
	}, "image/jpeg");
});
