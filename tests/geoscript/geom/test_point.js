var assert = require("test/assert"),
    geom = require("geoscript/geom");

exports["test: Point"] = function() {
    
    var p = new geom.Point([1, 2]);
    
    assert.isTrue(p instanceof geom.Geometry, "point is a geometry");
    assert.isTrue(p instanceof geom.Point, "point is a point");
    assert.isEqual(2, p.coordinates.length, "point has two items in coordinates");
    assert.isEqual(1, p.x, "correct x coordinate");
    assert.isEqual(2, p.y, "correct y coordinate");
    assert.isTrue(isNaN(p.z), "no z");
    
    var p2 = new geom.Point([1, 2, 3]);
    assert.isEqual(3, p2.z, "3d");
    
};

exports["test: Point.equals"] = function() {

    var p1, p2;
    
    p1 = new geom.Point([1, 2]);
    p2 = new geom.Point([1, 2]);
    assert.isTrue(p1.equals(p2));
    assert.isTrue(p2.equals(p1));
    
    p1 = new geom.Point([1, 2]);
    p2 = new geom.Point([2, 3]);
    assert.isTrue(!p1.equals(p2));
    assert.isTrue(!p2.equals(p1));
    
    p1 = new geom.Point([1, 2, 3]);
    p2 = new geom.Point([1, 2, 3]);
    assert.isTrue(p1.equals(p2), "[1] 3d");
    assert.isTrue(p2.equals(p1), "[2] 3d");

    p1 = new geom.Point([1, 2, 3]);
    p2 = new geom.Point([1, 2, 4]);
    assert.isTrue(p1.equals(p2), "[1] different z");
    assert.isTrue(p2.equals(p1), "[2] different z");

    p1 = new geom.Point([1, 2]);
    p2 = new geom.Point([1, 2, 3]);
    assert.isTrue(p1.equals(p2), "2d == 3d");
    assert.isTrue(p2.equals(p1), "3d == 2d");

};

exports["test: Point.wkt"] = function() {

    var p = new geom.Point([1, 2]);
    assert.is("POINT (1 2)", p.wkt, "correct wkt");

};

exports["test: Point.fromWKT"] = function() {

    var p = new geom.Point([1, 2]);
    var p2 = geom.Geometry.fromWKT("POINT (1 2)");
    assert.isTrue(p2 instanceof geom.Geometry, "point from wkt is a geometry");
    assert.isTrue(p2 instanceof geom.Point, "point from wkt is a point");
    assert.isTrue(p2.equals(p), "p2 equals p");

};


exports["test: Point.buffer"] = function() {

    var p = new geom.Point([0, 0]);
    var b = p.buffer(1);
    
    assert.isTrue(b instanceof geom.Polygon, "buffered point creates a polygon");
    assert.is("3.12", b.area.toFixed(2), "almost PI");
    
    b = p.buffer(1, 24);
    assert.is("3.14", b.area.toFixed(2), "more arc segments, higher accuracy");

};

if (require.main === module.id) {
    require("test/runner").run(exports);
}