/**
 *  MEQROB - MVC WEB FrameWork
 *  The way to simplify
 *
 *  @package   MEQROB WEB
 *  @author    Sapunov Nikita
 *  @link      http://meqrob.ru/framework
 *
 *
 *  =================
 *  COMMON JS LIBRARY
 *  =================
 *
**/

if (!window._ua) {
	var _ua = navigator.userAgent.toLowerCase();
}

var browser = {
	version: (_ua.match(/.+(?:me|ox|on|rv|it|era|opr|ie)[\/: ]([\d.]+)/) || [0, '0'])[1],
	opera: (/opera/i.test(_ua) || /opr/i.test(_ua)),
	msie: (/msie/i.test(_ua) && !/opera/i.test(_ua) || /trident\//i.test(_ua)),
	msie6: (/msie 6/i.test(_ua) && !/opera/i.test(_ua)),
	msie7: (/msie 7/i.test(_ua) && !/opera/i.test(_ua)),
	msie8: (/msie 8/i.test(_ua) && !/opera/i.test(_ua)),
	msie9: (/msie 9/i.test(_ua) && !/opera/i.test(_ua)),
	mozilla: /firefox/i.test(_ua),
	chrome: /chrome/i.test(_ua),
	safari: (!(/chrome/i.test(_ua)) && /webkit|safari|khtml/i.test(_ua)),
	iphone: /iphone/i.test(_ua),
	ipod: /ipod/i.test(_ua),
	iphone4: /iphone.*OS 4/i.test(_ua),
	ipod4: /ipod.*OS 4/i.test(_ua),
	ipad: /ipad/i.test(_ua),
	android: /android/i.test(_ua),
	bada: /bada/i.test(_ua),
	mobile: /iphone|ipod|ipad|opera mini|opera mobi|iemobile|android/i.test(_ua),
	msie_mobile: /iemobile/i.test(_ua),
	safari_mobile: /iphone|ipod|ipad/i.test(_ua),
	opera_mobile: /opera mini|opera mobi/i.test(_ua),
	opera_mini: /opera mini/i.test(_ua),
	mac: /mac/i.test(_ua)
};

var _logTimer = (new Date()).getTime();

function debugLog(msg) {
	try {
		window.debuglogClient && debuglogClient(msg);
		var t = '[' + (((new Date()).getTime() - _logTimer) / 1000) + '] ';
		if (window.console && console.log) {
			var args = Array.prototype.slice.call(arguments);
			args.unshift(t);
			if (browser.msie || browser.mobile) {
				console.log(args.join(' '));
			} else {
				console.log.apply(console, args);
			}
		}
	} catch (e) {}
}

var host = window.location.protocol + "//" + window.location.host + "/";
debugLog("HOST", host);

function ge(e) {
	return "string" == typeof e || "number" == typeof e ? document.getElementById(e) : e
}

function geByTag(searchTag, node) {
	node = ge(node) || document;
	return node.getElementsByTagName(searchTag);
}

function clearVal(e) {
	e.value = '';
}
var parseJSON = window.JSON && JSON.parse ? function(obj) {
	try {
		return JSON.parse(obj)
	} catch (e) {
		console.log("parseJSON::", e.message);
		try {
			return eval("(" + obj + ")");
		} catch (e) {
			return console.log("parseJSON::", e.message), !1;
		}
	}
} : function(obj) {
	try {
		return eval("(" + obj + ")");
	} catch (e) {
		return console.log("parseJSON::", e.message), !1;
	}
};

function show(el) {
	el.style.display = "block";
}

function hide(el) {
	el.style.display = "none";
}

function insertAfter(elem, refElem) {
	var parent = refElem.parentNode;
	var next = refElem.nextSibling;
	if (next) {
		return parent.insertBefore(elem, next);
	} else {
		return parent.appendChild(elem);
	}
}
var ajax = {
	_stat_box: function() {
		var o = document.createElement("div");
		o.className = "ajax_status";
		o.id = "ajax_status";
		insertAfter(o, document.body.firstChild);
		return o;
	},
	error: function(e, t) {
		var o = function(e) {
			var o = ge("ajax_status");
			if (o == null) {
				o = ajax._stat_box();
			}
			o.innerHTML = e, show(o);
			setTimeout(function() {
				hide(o);
			}, (t !== undefined) ? t : 5e3);
		};
		"" !== e && void 0 !== e ? o(e) : o("Undefined error");
		"" !== e && void 0 !== e ? console.log("AJAX::", e) : console.log("AJAX::", "undefined error");

	},
	status: function(e, t) {
		if (e == "" || e == void(0)) return !1;
		var o = function(e) {
			var o = ge("ajax_status");
			if (o == null) {
				o = ajax._stat_box();
			}
			o.className = "ajax_status_good";
			o.innerHTML = e, show(o);
			setTimeout(function() {
				hide(o);
			}, (t !== undefined) ? t : 5e3);
		};
		o(e);
	}
};
var dialog = {
	box: ge("screen"),
	show: function() {
		this.box.style.display = "block", window.document.body.style.overflow = "hidden"
	},
	hide: function() {
		this.box.innerHtml = '', this.box.style.display = "none", $(".dial").hide(), window.document.body.style.overflow = "auto"
	},
	text: function(text) {
		this.box.innerHTML = "<p>" + text + "</p>";
	}
};

function val(input) {
	input = ge(input);
	if (!input) return;

	return input.getValue ? input.getValue() :
		(((input.tagName == 'INPUT' || input.tagName == 'TEXTAREA') ? input.value : input.innerHTML) || '');
}

function each(object, callback) {
	var name, i = 0,
		length = object.length;

	if (length === undefined) {
		for (name in object)
			if (callback.call(object[name], name, object[name]) === false)
				break;
	} else {
		for (var value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) {}
	}

	return object;
}

function serializeForm(form) {
	if (typeof(form) != 'object') {
		return false;
	}
	var result = {};
	var g = function(n) {
		return geByTag(n, form);
	};
	var nv = function(i, e) {
		if (!e.name) return;
		if (e.type == 'text' || !e.type) {
			result[e.name] = val(e);
		} else {
			result[e.name] = (browser.msie && !e.value && form[e.name]) ? form[e.name].value : e.value;
		}
	};
	each(g('input'), function(i, e) {
		if ((e.type != 'radio' && e.type != 'checkbox') || e.checked) return nv(i, e);
	});
	each(g('select'), nv);
	each(g('textarea'), nv);

	return result;
}

function getScrollTop() {
	return Math.max(document.body.scrollTop, document.documentElement.scrollTop);
}
