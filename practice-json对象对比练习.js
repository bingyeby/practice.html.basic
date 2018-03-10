

var modeler = {};
//比较数组是否相同
modeler.compArray = function (array1, array2) {
    if ((array1 && typeof array1 === "object" && array1.constructor === Array) && (array2 && typeof array2 === "object" && array2.constructor === Array)) {
        if (array1.length == array2.length) {
            for (var i = 0; i < array1.length; i++) {
                var ggg = modeler.compObj(array1[i], array2[i]);
                if (!ggg) {
                    return false;
                }

            }
        } else {
            return false;
        }
    } else {
        throw new Error("argunment is  error ;");
    }

    return true;
};
//比较两个对象是否相等，不包含原形上的属性计较
modeler.compObj = function (obj1, obj2) {
    if ((obj1 && typeof obj1 === "object") && ((obj2 && typeof obj2 === "object"))) {
        var count1 = modeler.propertyLength(obj1);
        var count2 = modeler.propertyLength(obj2);
        if (count1 == count2) {
            for (var ob in obj1) {
                if (obj1.hasOwnProperty(ob) && obj2.hasOwnProperty(ob)) {

                    if (obj1[ob].constructor == Array && obj2[ob].constructor == Array)//如果属性是数组
                    {
                        if (!modeler.compArray(obj1[ob], obj2[ob])) {
                            return false;
                        }
                    } else if (typeof obj1[ob] === "string" && typeof obj2[ob] === "string")//纯属性
                    {
                        if (obj1[ob] !== obj2[ob]) {
                            return false;
                        }
                    } else if (typeof obj1[ob] === "object" && typeof obj2[ob] === "object")//属性是对象
                    {
                        if (!modeler.compObj(obj1[ob], obj2[ob])) {
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    }

    return true;
};
modeler.propertyLength = function (obj)//获得对象上的属性个数，不包含对象原形上的属性
{
    var count = 0;
    if (obj && typeof obj === "object") {
        for (var ooo in obj) {
            if (obj.hasOwnProperty(ooo)) {
                count++;
            }
        }
        return count;
    } else {
        throw new Error("argunment can not be null;");
    }

};

var a = {
    "format": "example", "version": 3.1, "content": [{
        "list": false,
        "depth": 0,
        "ordered": false,
        "content": [{
            "content": "And please, feel free to send us your feedback and comments to ",
            "style": { "size": 20, "color": "FFFFFF", "name": "Arial", "bold": 2, "italic": 2, "underline": 2 }
        }, {
            "content": "foo",
            "style": { "size": 20, "color": "4DC2FF", "name": "Arial", "bold": 2, "italic": 2, "underline": 2 }
        }, {
            "content": ", or just by clicking on the ",
            "style": { "size": 30, "color": "FFFFFF", "name": "Arial", "bold": 2, "italic": 2, "underline": 2 }
        }, {
            "content": "feedback",
            "style": { "size": 20, "color": "4DC2FF", "name": "Arial", "bold": 2, "italic": 2, "underline": 2 }
        }, {
            "content": " button up above.",
            "style": { "size": 20, "color": "FFFFFF", "name": "Arial", "bold": 2, "italic": 2, "underline": 2 }
        }],
        "align": "center"
    }]
}
var b = { a: "a" }
var c = {
    "format": "example", "version": 3.1, "content": [{
        "list": false,
        "depth": 0,
        "ordered": false,
        "content": [{
            "content": "And please, feel free to send us your feedback and comments to ",
            "style": { "size": 20, "color": "FFFFFF", "name": "Arial", "bold": 2, "italic": 2, "underline": 2 }
        }, {
            "content": "foo",
            "style": { "size": 20, "color": "4DC2FF", "name": "Arial", "bold": 2, "italic": 2, "underline": 2 }
        }, {
            "content": ", or just by clicking on the ",
            "style": { "size": 30, "color": "FFFFFF", "name": "Arial", "bold": 2, "italic": 2, "underline": 2 }
        }, {
            "content": "feedback",
            "style": { "size": 20, "color": "4DC2FF", "name": "Arial", "bold": 2, "italic": 2, "underline": 2 }
        }, {
            "content": " button up above.",
            "style": { "size": 20, "color": "FFFFFF", "name": "Arial", "bold": 2, "italic": 2, "underline": 2 }
        }],
        "align": "center"
    }]
}
//    console.log(a.valueOf());
//    console.log(b.valueOf())
//    console.log(a.propertyIsEnumerable("format"))
//    console.log(a.valueOf()==c.valueOf());
//    console.log(a.hasOwnProperty("format"));
//    console.log(a.hasOwnProperty("content"));
//    console.log(a.hasOwnProperty("name"));

console.log("11111111");
console.log(_.isEqual(a, b));
console.log(_.isEqual(a, c));



console.log(_.keys(a));

var ZYC = { object: {} };
/*
 *keys-get a array contains all the keys in object*
 *@function*
 *@param {Object} source*
 *@return {Array}*
 *@mark we have not check the source is or not object*
 */
ZYC.object.keys = function (source) {
    var result = [],
        key,
        _length = 0;
    for (key in source) {
        if (source.hasOwnProperty(key)) {
            result[_length++] = key;
        }
    }
    return result;
};
//    2、获取Object对应的values
/*
 *values-get a array contains all the values in object*
 *@function*
 *@param {Object} source*
 *@return {Array}*
 *@mark we have not check the source is or not object*
 */
ZYC.object.values = function (source) {
    var result = [], key, _length = 0;
    for (key in source) {
        if (source.hasOwnProperty(key)) {
            result[_length++] = source[key];
        }
    }
    return result;
};

