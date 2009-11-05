

var extend = function(Parent, props) {
    var Type = function() {
        this.constructor.apply(this, arguments);
    };
    var constructor = Parent.prototype.constructor;
    Parent.prototype.constructor = function() {};
    var prototype = new Parent();
    if (constructor === undefined) {
        delete Parent.prototype.constructor;
    } else {
        Parent.prototype.constructor = constructor;
    }
    var getter, setter, straight;
    for (var name in props) {
        if (props.hasOwnProperty(name)) {
            getter = props.__lookupGetter__(name);
            setter = props.__lookupSetter__(name);
            straight = true;
            if (typeof getter === "function") {
                prototype.__defineGetter__(name, getter);
                straight = false;
            }
            if (typeof setter === "function") {
                prototype.__defineSetter__(name, setter);
                straight = false;
            }
            if (straight) {
                prototype[name] = props[name];                
            }
        }
    }
    if (prototype.hasOwnProperty("toFullString") && !prototype.hasOwnProperty("toString")) {
        prototype.toString = function() {
            var str = this.toFullString();
            if (str.length > 60) {
                str = str.substring(0, 60) + "...";
            }
            return "<" + this.constructor.name + " " + str + ">";
        }
    }
    Type.prototype = prototype;
    return Type;
};


var toURL = function(o) {
    var url;
    if (o instanceof java.net.URL) {
        url = obj;
    } else if (o instanceof java.net.URI || o instanceof java.io.File) {
        url = o.toURL();
    } else if (typeof o === "string") {
        url = (new java.io.File(o)).toURL();
    }
    return url;
};

var toFile = function(o) {
    var file;
    if (o instanceof java.io.File) {
        file = o;
    } else if (o instanceof java.net.URI) {
        file = toFile(o.toURL());
    } else if (o instanceof java.net.URL) {
        file = toFile(o.getFile());
    } else if (typeof o === "string") {
        file = new java.io.File(o);
    }
}

exports.extend = extend;
exports.toURL = toURL;
exports.toFile = toFile;