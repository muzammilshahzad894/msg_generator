! function(t) {
    function e(t, e) {
        if (!(t.originalEvent.touches.length > 1)) {
            t.preventDefault();
            var n = t.originalEvent.changedTouches[0],
                i = document.createEvent("MouseEvents");
            i.initMouseEvent(e, !0, !0, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), t.target.dispatchEvent(i)
        }
    }
    if (t.support.touch = "ontouchend" in document, t.support.touch) {
        var n, i = t.ui.mouse.prototype,
            o = i._mouseInit,
            r = i._mouseDestroy;
        i._touchStart = function(t) { var i = this;!n && i._mouseCapture(t.originalEvent.changedTouches[0]) && (n = !0, i._touchMoved = !1, e(t, "mouseover"), e(t, "mousemove"), e(t, "mousedown")) }, i._touchMove = function(t) { n && (this._touchMoved = !0, e(t, "mousemove")) }, i._touchEnd = function(t) { n && (e(t, "mouseup"), e(t, "mouseout"), this._touchMoved || e(t, "click"), n = !1) }, i._mouseInit = function() {
            var e = this;
            e.element.bind({ touchstart: t.proxy(e, "_touchStart"), touchmove: t.proxy(e, "_touchMove"), touchend: t.proxy(e, "_touchEnd") }), o.call(e)
        }, i._mouseDestroy = function() {
            var e = this;
            e.element.unbind({ touchstart: t.proxy(e, "_touchStart"), touchmove: t.proxy(e, "_touchMove"), touchend: t.proxy(e, "_touchEnd") }), r.call(e)
        }
    }
}(jQuery),
function(t, e, n, i, o, r) {
    function s(t, e, n, i, o) {
        return m(t, t, n, i, e, t.defaultView.pageXOffset, t.defaultView.pageYOffset).then(function(r) {
            R("Document cloned");
            var s = Yt + o,
                c = "[" + s + "='" + o + "']";
            t.querySelector(c).removeAttribute(s);
            var l = r.contentWindow,
                h = l.document.querySelector(c);
            return ("function" == typeof e.onclone ? Promise.resolve(e.onclone(l.document)) : Promise.resolve(!0)).then(function() { return a(h, r, e, n, i) })
        })
    }

    function a(t, n, i, o, r) {
        var s = n.contentWindow,
            a = new Dt(s.document),
            d = new L(i, a),
            p = W(t),
            f = "view" === i.type ? o : h(s.document),
            m = "view" === i.type ? r : u(s.document),
            g = new i.renderer(f, m, d, i, e);
        return new V(t, g, a, d, i).ready.then(function() { R("Finished rendering"); var e; return e = "view" === i.type ? l(g.canvas, { width: g.canvas.width, height: g.canvas.height, top: 0, left: 0, x: 0, y: 0 }) : t === s.document.body || t === s.document.documentElement || null != i.canvas ? g.canvas : l(g.canvas, { width: null != i.width ? i.width : p.width, height: null != i.height ? i.height : p.height, top: p.top, left: p.left, x: s.pageXOffset, y: s.pageYOffset }), c(n, i), e })
    }

    function c(t, e) { e.removeContainer && (t.parentNode.removeChild(t), R("Cleaned up container")) }

    function l(t, n) {
        var i = e.createElement("canvas"),
            o = Math.min(t.width - 1, Math.max(0, n.left)),
            r = Math.min(t.width, Math.max(1, n.left + n.width)),
            s = Math.min(t.height - 1, Math.max(0, n.top)),
            a = Math.min(t.height, Math.max(1, n.top + n.height));
        return i.width = n.width, i.height = n.height, R("Cropping canvas at:", "left:", n.left, "top:", n.top, "width:", r - o, "height:", a - s), R("Resulting crop with width", n.width, "and height", n.height, " with x", o, "and y", s), i.getContext("2d").drawImage(t, o, s, r - o, a - s, n.x, n.y, r - o, a - s), i
    }

    function h(t) { return Math.max(Math.max(t.body.scrollWidth, t.documentElement.scrollWidth), Math.max(t.body.offsetWidth, t.documentElement.offsetWidth), Math.max(t.body.clientWidth, t.documentElement.clientWidth)) }

    function u(t) { return Math.max(Math.max(t.body.scrollHeight, t.documentElement.scrollHeight), Math.max(t.body.offsetHeight, t.documentElement.offsetHeight), Math.max(t.body.clientHeight, t.documentElement.clientHeight)) }

    function d() { return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" }

    function p() { return e.documentMode && e.documentMode <= 9 }

    function f(t, n) { for (var i = 3 === t.nodeType ? e.createTextNode(t.nodeValue) : t.cloneNode(!1), o = t.firstChild; o;) !0 !== n && 1 === o.nodeType && "SCRIPT" === o.nodeName || i.appendChild(f(o, n)), o = o.nextSibling; return i }

    function m(t, e, n, i, o, r, s) {
        w(t);
        var a = p() ? f(t.documentElement, o.javascriptEnabled) : t.documentElement.cloneNode(!0),
            c = e.createElement("iframe");
        return c.className = "html2canvas-container", c.style.visibility = "hidden", c.style.position = "fixed", c.style.left = "-10000px", c.style.top = "0px", c.style.border = "0", c.width = n, c.height = i, c.scrolling = "no", e.body.appendChild(c), new Promise(function(e) {
            var n = c.contentWindow.document;
            g(t.documentElement, a, "textarea"), g(t.documentElement, a, "select"), c.contentWindow.onload = c.onload = function() { var i = setInterval(function() { n.body.childNodes.length > 0 && (x(t, n), clearInterval(i), "view" === o.type && c.contentWindow.scrollTo(r, s), e(c)) }, 50) }, n.open(), n.write("<!DOCTYPE html><html></html>"), v(t, r, s), n.replaceChild(!0 === o.javascriptEnabled ? n.adoptNode(a) : k(n.adoptNode(a)), n.documentElement), n.close()
        })
    }

    function g(t, e, n) { for (var i = t.getElementsByTagName(n), o = e.getElementsByTagName(n), r = i.length, s = 0; s < r; s++) o[s].value = i[s].value }

    function v(t, e, n) {!t.defaultView || e === t.defaultView.pageXOffset && n === t.defaultView.pageYOffset || t.defaultView.scrollTo(e, n) }

    function y(e, n, i, o, r, s) { return new It(e, n, t.document).then(b(e)).then(function(t) { return m(t, i, o, r, s, 0, 0) }) }

    function b(t) {
        return function(n) {
            var i, o = new DOMParser;
            try { i = o.parseFromString(n, "text/html") } catch (t) { R("DOMParser not supported, falling back to createHTMLDocument"), i = e.implementation.createHTMLDocument(""); try { i.open(), i.write(n), i.close() } catch (t) { R("createHTMLDocument write not supported, falling back to document.body.innerHTML"), i.body.innerHTML = n } }
            var r = i.querySelector("base");
            if (!r || !r.href.host) {
                var s = i.createElement("base");
                s.href = t, i.head.insertBefore(s, i.head.firstChild)
            }
            return i
        }
    }

    function w(t) {
        [].slice.call(t.querySelectorAll("canvas"), 0).forEach(function(t) { t.setAttribute(Ut, "canvas-" + Gt++) })
    }

    function x(t, e) {
        [].slice.call(t.querySelectorAll("[" + Ut + "]"), 0).forEach(function(t) {
            try {
                var n = e.querySelector("[" + Ut + '="' + t.getAttribute(Ut) + '"]');
                n && (n.width = t.width, n.height = t.height, n.getContext("2d").putImageData(t.getContext("2d").getImageData(0, 0, t.width, t.height), 0, 0))
            } catch (e) { R("Unable to copy canvas content from", t, e) }
            t.removeAttribute(Ut)
        })
    }

    function k(t) { return [].slice.call(t.childNodes, 0).filter(E).forEach(function(e) { "SCRIPT" === e.tagName ? t.removeChild(e) : k(e) }), t }

    function E(t) { return t.nodeType === Node.ELEMENT_NODE }

    function C(t) { var n = e.createElement("a"); return n.href = t, n.href = n.href, n }

    function T(t) { this.r = 0, this.g = 0, this.b = 0, this.a = null, this.fromArray(t) || this.namedColor(t) || this.rgb(t) || this.rgba(t) || this.hex6(t) || this.hex3(t) }

    function S(t) {
        if (this.src = t, R("DummyImageContainer for", t), !this.promise || !this.image) {
            R("Initiating DummyImageContainer"), S.prototype.image = new Image;
            var e = this.image;
            S.prototype.promise = new Promise(function(t, n) { e.onload = t, e.onerror = n, e.src = d(), !0 === e.complete && t(e) })
        }
    }

    function $(t, n) {
        var i, o, r = e.createElement("div"),
            s = e.createElement("img"),
            a = e.createElement("span");
        r.style.visibility = "hidden", r.style.fontFamily = t, r.style.fontSize = n, r.style.margin = 0, r.style.padding = 0, e.body.appendChild(r), s.src = d(), s.width = 1, s.height = 1, s.style.margin = 0, s.style.padding = 0, s.style.verticalAlign = "baseline", a.style.fontFamily = t, a.style.fontSize = n, a.style.margin = 0, a.style.padding = 0, a.appendChild(e.createTextNode("Hidden Text")), r.appendChild(a), r.appendChild(s), i = s.offsetTop - a.offsetTop + 1, r.removeChild(a), r.appendChild(e.createTextNode("Hidden Text")), r.style.lineHeight = "normal", s.style.verticalAlign = "super", o = s.offsetTop - r.offsetTop + 1, e.body.removeChild(r), this.baseline = i, this.lineWidth = 1, this.middle = o
    }

    function I() { this.data = {} }

    function O(t, e, n) {
        this.image = null, this.src = t;
        var i = this,
            o = W(t);
        this.promise = (e ? new Promise(function(e) { "about:blank" === t.contentWindow.document.URL || null == t.contentWindow.document.documentElement ? t.contentWindow.onload = t.onload = function() { e(t) } : e(t) }) : this.proxyLoad(n.proxy, o, n)).then(function(t) { return html2canvas(t.contentWindow.document.documentElement, { type: "view", width: t.width, height: t.height, proxy: n.proxy, javascriptEnabled: n.javascriptEnabled, removeContainer: n.removeContainer, allowTaint: n.allowTaint, imageTimeout: n.imageTimeout / 2 }) }).then(function(t) { return i.image = t })
    }

    function A(t) { this.src = t.value, this.colorStops = [], this.type = null, this.x0 = .5, this.y0 = .5, this.x1 = .5, this.y1 = .5, this.promise = Promise.resolve(!0) }

    function M(t, e) {
        this.src = t, this.image = new Image;
        var n = this;
        this.tainted = null, this.promise = new Promise(function(i, o) { n.image.onload = i, n.image.onerror = o, e && (n.image.crossOrigin = "anonymous"), n.image.src = t, !0 === n.image.complete && i(n.image) })
    }

    function L(e, n) { this.link = null, this.options = e, this.support = n, this.origin = this.getOrigin(t.location.href) }

    function N(t) {
        A.apply(this, arguments), this.type = this.TYPES.LINEAR;
        var e = null === t.args[0].match(this.stepRegExp);
        e ? t.args[0].split(" ").reverse().forEach(function(t) {
            switch (t) {
                case "left":
                    this.x0 = 0, this.x1 = 1;
                    break;
                case "top":
                    this.y0 = 0, this.y1 = 1;
                    break;
                case "right":
                    this.x0 = 1, this.x1 = 0;
                    break;
                case "bottom":
                    this.y0 = 1, this.y1 = 0;
                    break;
                case "to":
                    var e = this.y0,
                        n = this.x0;
                    this.y0 = this.y1, this.x0 = this.x1, this.x1 = n, this.y1 = e
            }
        }, this) : (this.y0 = 0, this.y1 = 1), this.colorStops = t.args.slice(e ? 1 : 0).map(function(t) { var e = t.match(this.stepRegExp); return { color: new T(e[1]), stop: "%" === e[3] ? e[2] / 100 : null } }, this), null === this.colorStops[0].stop && (this.colorStops[0].stop = 0), null === this.colorStops[this.colorStops.length - 1].stop && (this.colorStops[this.colorStops.length - 1].stop = 1), this.colorStops.forEach(function(t, e) { null === t.stop && this.colorStops.slice(e).some(function(n, i) { return null !== n.stop && (t.stop = (n.stop - this.colorStops[e - 1].stop) / (i + 1) + this.colorStops[e - 1].stop, !0) }, this) }, this)
    }

    function R() { t.html2canvas.logging && t.console && t.console.log && Function.prototype.bind.call(t.console.log, t.console).apply(t.console, [Date.now() - t.html2canvas.start + "ms", "html2canvas:"].concat([].slice.call(arguments, 0))) }

    function P(t, e) { this.node = t, this.parent = e, this.stack = null, this.bounds = null, this.borders = null, this.clip = [], this.backgroundClip = [], this.offsetBounds = null, this.visible = null, this.computedStyles = null, this.colors = {}, this.styles = {}, this.backgroundImages = null, this.transformData = null, this.transformMatrix = null, this.isPseudoElement = !1, this.opacity = null }

    function B(t) { var e = t.options[t.selectedIndex || 0]; return e ? e.text || "" : "" }

    function D(t) { if (t && "matrix" === t[1]) return t[2].split(",").map(function(t) { return parseFloat(t.trim()) }) }

    function _(t) { return -1 !== t.toString().indexOf("%") }

    function j(t) {
        var e, n, i, o, r, s, a, c = [],
            l = 0,
            h = 0,
            u = function() { e && ('"' === n.substr(0, 1) && (n = n.substr(1, n.length - 2)), n && a.push(n), "-" === e.substr(0, 1) && (o = e.indexOf("-", 1) + 1) > 0 && (i = e.substr(0, o), e = e.substr(o)), c.push({ prefix: i, method: e.toLowerCase(), value: r, args: a, image: null })), a = [], e = i = n = r = "" };
        return a = [], e = i = n = r = "", t.split("").forEach(function(t) {
            if (!(0 === l && " \r\n\t".indexOf(t) > -1)) {
                switch (t) {
                    case '"':
                        s ? s === t && (s = null) : s = t;
                        break;
                    case "(":
                        if (s) break;
                        if (0 === l) return l = 1, void(r += t);
                        h++;
                        break;
                    case ")":
                        if (s) break;
                        if (1 === l) {
                            if (0 === h) return l = 0, r += t, void u();
                            h--
                        }
                        break;
                    case ",":
                        if (s) break;
                        if (0 === l) return void u();
                        if (1 === l && 0 === h && !e.match(/^url$/i)) return a.push(n), n = "", void(r += t)
                }
                r += t, 0 === l ? e += t : n += t
            }
        }), u(), c
    }

    function F(t) { return t.replace("px", "") }

    function H(t) { return parseFloat(t) }

    function W(t) {
        if (t.getBoundingClientRect) {
            var e = t.getBoundingClientRect(),
                n = null == t.offsetWidth ? e.width : t.offsetWidth;
            return { top: e.top, bottom: e.bottom || e.top + e.height, right: e.left + n, left: e.left, width: n, height: null == t.offsetHeight ? e.height : t.offsetHeight }
        }
        return {}
    }

    function z(t) { var e = t.offsetParent ? z(t.offsetParent) : { top: 0, left: 0 }; return { top: t.offsetTop + e.top, bottom: t.offsetTop + t.offsetHeight + e.top, right: t.offsetLeft + e.left + t.offsetWidth, left: t.offsetLeft + e.left, width: t.offsetWidth, height: t.offsetHeight } }

    function V(t, e, n, i, o) {
        R("Starting NodeParser"), this.renderer = e, this.options = o, this.range = null, this.support = n, this.renderQueue = [], this.stack = new Bt(!0, 1, t.ownerDocument, null);
        var r = new P(t, null);
        if (o.background && e.rectangle(0, 0, e.width, e.height, new T(o.background)), t === t.ownerDocument.documentElement) {
            var s = new P(r.color("backgroundColor").isTransparent() ? t.ownerDocument.body : t.ownerDocument.documentElement, null);
            e.rectangle(0, 0, e.width, e.height, s.color("backgroundColor"))
        }
        r.visibile = r.isElementVisible(), this.createPseudoHideStyles(t.ownerDocument), this.disableAnimations(t.ownerDocument), this.nodes = Et([r].concat(this.getChildren(r)).filter(function(t) { return t.visible = t.isElementVisible() }).map(this.getPseudoElements, this)), this.fontMetrics = new I, R("Fetched nodes, total:", this.nodes.length), R("Calculate overflow clips"), this.calculateOverflowClips(), R("Start fetching images"), this.images = i.fetch(this.nodes.filter(ft)), this.ready = this.images.ready.then(bt(function() { return R("Images loaded, starting parsing"), R("Creating stacking contexts"), this.createStackingContexts(), R("Sorting stacking contexts"), this.sortStackingContexts(this.stack), this.parse(this.stack), R("Render queue created with " + this.renderQueue.length + " items"), new Promise(bt(function(t) { o.async ? "function" == typeof o.async ? o.async.call(this, this.renderQueue, t) : this.renderQueue.length > 0 ? (this.renderIndex = 0, this.asyncRenderer(this.renderQueue, t)) : t() : (this.renderQueue.forEach(this.paint, this), t()) }, this)) }, this))
    }

    function q(t) { return t.parent && t.parent.clip.length }

    function X(t) { return t.replace(/(\-[a-z])/g, function(t) { return t.toUpperCase().replace("-", "") }) }

    function Y() {}

    function U(t, e, n, i) {
        return t.map(function(o, r) {
            if (o.width > 0) {
                var s = e.left,
                    a = e.top,
                    c = e.width,
                    l = e.height - t[2].width;
                switch (r) {
                    case 0:
                        l = t[0].width, o.args = K({ c1: [s, a], c2: [s + c, a], c3: [s + c - t[1].width, a + l], c4: [s + t[3].width, a + l] }, i[0], i[1], n.topLeftOuter, n.topLeftInner, n.topRightOuter, n.topRightInner);
                        break;
                    case 1:
                        s = e.left + e.width - t[1].width, c = t[1].width, o.args = K({ c1: [s + c, a], c2: [s + c, a + l + t[2].width], c3: [s, a + l], c4: [s, a + t[0].width] }, i[1], i[2], n.topRightOuter, n.topRightInner, n.bottomRightOuter, n.bottomRightInner);
                        break;
                    case 2:
                        a = a + e.height - t[2].width, l = t[2].width, o.args = K({ c1: [s + c, a + l], c2: [s, a + l], c3: [s + t[3].width, a], c4: [s + c - t[3].width, a] }, i[2], i[3], n.bottomRightOuter, n.bottomRightInner, n.bottomLeftOuter, n.bottomLeftInner);
                        break;
                    case 3:
                        c = t[3].width, o.args = K({ c1: [s, a + l + t[2].width], c2: [s, a], c3: [s + c, a + t[0].width], c4: [s + c, a + l] }, i[3], i[0], n.bottomLeftOuter, n.bottomLeftInner, n.topLeftOuter, n.topLeftInner)
                }
            }
            return o
        })
    }

    function G(t, e, n, i) {
        var o = (Math.sqrt(2) - 1) / 3 * 4,
            r = n * o,
            s = i * o,
            a = t + n,
            c = e + i;
        return { topLeft: J({ x: t, y: c }, { x: t, y: c - s }, { x: a - r, y: e }, { x: a, y: e }), topRight: J({ x: t, y: e }, { x: t + r, y: e }, { x: a, y: c - s }, { x: a, y: c }), bottomRight: J({ x: a, y: e }, { x: a, y: e + s }, { x: t + r, y: c }, { x: t, y: c }), bottomLeft: J({ x: a, y: c }, { x: a - r, y: c }, { x: t, y: e + s }, { x: t, y: e }) }
    }

    function Q(t, e, n) {
        var i = t.left,
            o = t.top,
            r = t.width,
            s = t.height,
            a = e[0][0],
            c = e[0][1],
            l = e[1][0],
            h = e[1][1],
            u = e[2][0],
            d = e[2][1],
            p = e[3][0],
            f = e[3][1],
            m = r - l,
            g = s - d,
            v = r - u,
            y = s - f;
        return { topLeftOuter: G(i, o, a, c).topLeft.subdivide(.5), topLeftInner: G(i + n[3].width, o + n[0].width, Math.max(0, a - n[3].width), Math.max(0, c - n[0].width)).topLeft.subdivide(.5), topRightOuter: G(i + m, o, l, h).topRight.subdivide(.5), topRightInner: G(i + Math.min(m, r + n[3].width), o + n[0].width, m > r + n[3].width ? 0 : l - n[3].width, h - n[0].width).topRight.subdivide(.5), bottomRightOuter: G(i + v, o + g, u, d).bottomRight.subdivide(.5), bottomRightInner: G(i + Math.min(v, r - n[3].width), o + Math.min(g, s + n[0].width), Math.max(0, u - n[1].width), d - n[2].width).bottomRight.subdivide(.5), bottomLeftOuter: G(i, o + y, p, f).bottomLeft.subdivide(.5), bottomLeftInner: G(i + n[3].width, o + y, Math.max(0, p - n[3].width), f - n[2].width).bottomLeft.subdivide(.5) }
    }

    function J(t, e, n, i) {
        var o = function(t, e, n) { return { x: t.x + (e.x - t.x) * n, y: t.y + (e.y - t.y) * n } };
        return {
            start: t,
            startControl: e,
            endControl: n,
            end: i,
            subdivide: function(r) {
                var s = o(t, e, r),
                    a = o(e, n, r),
                    c = o(n, i, r),
                    l = o(s, a, r),
                    h = o(a, c, r),
                    u = o(l, h, r);
                return [J(t, s, l, u), J(u, h, c, i)]
            },
            curveTo: function(t) { t.push(["bezierCurve", e.x, e.y, n.x, n.y, i.x, i.y]) },
            curveToReversed: function(i) { i.push(["bezierCurve", n.x, n.y, e.x, e.y, t.x, t.y]) }
        }
    }

    function K(t, e, n, i, o, r, s) { var a = []; return e[0] > 0 || e[1] > 0 ? (a.push(["line", i[1].start.x, i[1].start.y]), i[1].curveTo(a)) : a.push(["line", t.c1[0], t.c1[1]]), n[0] > 0 || n[1] > 0 ? (a.push(["line", r[0].start.x, r[0].start.y]), r[0].curveTo(a), a.push(["line", s[0].end.x, s[0].end.y]), s[0].curveToReversed(a)) : (a.push(["line", t.c2[0], t.c2[1]]), a.push(["line", t.c3[0], t.c3[1]])), e[0] > 0 || e[1] > 0 ? (a.push(["line", o[1].end.x, o[1].end.y]), o[1].curveToReversed(a)) : a.push(["line", t.c4[0], t.c4[1]]), a }

    function Z(t, e, n, i, o, r, s) { e[0] > 0 || e[1] > 0 ? (t.push(["line", i[0].start.x, i[0].start.y]), i[0].curveTo(t), i[1].curveTo(t)) : t.push(["line", r, s]), (n[0] > 0 || n[1] > 0) && t.push(["line", o[0].start.x, o[0].start.y]) }

    function tt(t) { return t.cssInt("zIndex") < 0 }

    function et(t) { return t.cssInt("zIndex") > 0 }

    function nt(t) { return 0 === t.cssInt("zIndex") }

    function it(t) { return -1 !== ["inline", "inline-block", "inline-table"].indexOf(t.css("display")) }

    function ot(t) { return t instanceof Bt }

    function rt(t) { return t.node.data.trim().length > 0 }

    function st(t) { return /^(normal|none|0px)$/.test(t.parent.css("letterSpacing")) }

    function at(t) { return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function(e) { var n = t.css("border" + e + "Radius").split(" "); return n.length <= 1 && (n[1] = n[0]), n.map(wt) }) }

    function ct(t) { return t.nodeType === Node.TEXT_NODE || t.nodeType === Node.ELEMENT_NODE }

    function lt(t) { var e = t.css("position"); return "auto" !== (-1 !== ["absolute", "relative", "fixed"].indexOf(e) ? t.css("zIndex") : "auto") }

    function ht(t) { return "static" !== t.css("position") }

    function ut(t) { return "none" !== t.css("float") }

    function dt(t) { return -1 !== ["inline-block", "inline-table"].indexOf(t.css("display")) }

    function pt(t) { var e = this; return function() { return !t.apply(e, arguments) } }

    function ft(t) { return t.node.nodeType === Node.ELEMENT_NODE }

    function mt(t) { return !0 === t.isPseudoElement }

    function gt(t) { return t.node.nodeType === Node.TEXT_NODE }

    function vt(t) { return function(e, n) { return e.cssInt("zIndex") + t.indexOf(e) / t.length - (n.cssInt("zIndex") + t.indexOf(n) / t.length) } }

    function yt(t) { return t.getOpacity() < 1 }

    function bt(t, e) { return function() { return t.apply(e, arguments) } }

    function wt(t) { return parseInt(t, 10) }

    function xt(t) { return t.width }

    function kt(t) { return t.node.nodeType !== Node.ELEMENT_NODE || -1 === ["SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION"].indexOf(t.node.nodeName) }

    function Et(t) { return [].concat.apply([], t) }

    function Ct(t) { var e = t.substr(0, 1); return e === t.substr(t.length - 1) && e.match(/'|"/) ? t.substr(1, t.length - 2) : t }

    function Tt(e) { for (var n, i = [], o = 0, r = !1; e.length;) St(e[o]) === r ? ((n = e.splice(0, o)).length && i.push(t.html2canvas.punycode.ucs2.encode(n)), r = !r, o = 0) : o++, o >= e.length && (n = e.splice(0, o)).length && i.push(t.html2canvas.punycode.ucs2.encode(n)); return i }

    function St(t) { return -1 !== [32, 13, 10, 9, 45].indexOf(t) }

    function $t(t) { return /[^\u0000-\u00ff]/.test(t) }

    function It(t, e, n) {
        if (!e) return Promise.reject("No proxy configured");
        var i = Mt(oe),
            o = Lt(e, t, i);
        return oe ? Vt(o) : At(n, o, i).then(function(t) { return jt(t.content) })
    }

    function Ot(t, e, n) {
        var i = Mt(re),
            o = Lt(e, t, i);
        return re ? Promise.resolve(o) : At(n, o, i).then(function(t) { return "data:" + t.type + ";base64," + t.content })
    }

    function At(e, n, i) {
        return new Promise(function(o, r) {
            var s = e.createElement("script"),
                a = function() { delete t.html2canvas.proxy[i], e.body.removeChild(s) };
            t.html2canvas.proxy[i] = function(t) { a(), o(t) }, s.src = n, s.onerror = function(t) { a(), r(t) }, e.body.appendChild(s)
        })
    }

    function Mt(t) { return t ? "" : "html2canvas_" + Date.now() + "_" + ++ie + "_" + Math.round(1e5 * Math.random()) }

    function Lt(t, e, n) { return t + "?url=" + encodeURIComponent(e) + (n.length ? "&callback=html2canvas.proxy." + n : "") }

    function Nt(t, n) {
        e.createElement("script");
        var i = e.createElement("a");
        i.href = t, t = i.href, this.src = t, this.image = new Image;
        var o = this;
        this.promise = new Promise(function(i, r) { o.image.crossOrigin = "Anonymous", o.image.onload = i, o.image.onerror = r, new Ot(t, n, e).then(function(t) { o.image.src = t }).catch(r) })
    }

    function Rt(t, e, n) { P.call(this, t, e), this.isPseudoElement = !0, this.before = ":before" === n }

    function Pt(t, e, n, i, o) { this.width = t, this.height = e, this.images = n, this.options = i, this.document = o }

    function Bt(t, e, n, i) { P.call(this, n, i), this.ownStacking = t, this.contexts = [], this.children = [], this.opacity = (this.parent ? this.parent.stack.opacity : 1) * e }

    function Dt(t) { this.rangeBounds = this.testRangeBounds(t), this.cors = this.testCORS(), this.svg = this.testSVG() }

    function _t(t) {
        this.src = t, this.image = null;
        var e = this;
        this.promise = this.hasFabric().then(function() { return e.isInline(t) ? Promise.resolve(e.inlineFormatting(t)) : Vt(t) }).then(function(t) { return new Promise(function(n) { html2canvas.fabric.loadSVGFromString(t, e.createCanvas.call(e, n)) }) })
    }

    function jt(t) {
        var e, n, i, o, r, s, a, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            l = t.length,
            h = "";
        for (e = 0; e < l; e += 4) r = c.indexOf(t[e]) << 2 | (n = c.indexOf(t[e + 1])) >> 4, s = (15 & n) << 4 | (i = c.indexOf(t[e + 2])) >> 2, a = (3 & i) << 6 | (o = c.indexOf(t[e + 3])), h += 64 === i ? String.fromCharCode(r) : 64 === o || -1 === o ? String.fromCharCode(r, s) : String.fromCharCode(r, s, a);
        return h
    }

    function Ft(t, e) {
        this.src = t, this.image = null;
        var n = this;
        this.promise = e ? new Promise(function(e, i) { n.image = new Image, n.image.onload = e, n.image.onerror = i, n.image.src = "data:image/svg+xml," + (new XMLSerializer).serializeToString(t), !0 === n.image.complete && e(n.image) }) : this.hasFabric().then(function() { return new Promise(function(e) { html2canvas.fabric.parseSVGDocument(t, n.createCanvas.call(n, e)) }) })
    }

    function Ht(t, e) { P.call(this, t, e) }

    function Wt(t, e, n) { if (t.length > 0) return e + n.toUpperCase() }

    function zt(t) { A.apply(this, arguments), this.type = "linear" === t.args[0] ? this.TYPES.LINEAR : this.TYPES.RADIAL }

    function Vt(t) {
        return new Promise(function(e, n) {
            var i = new XMLHttpRequest;
            i.open("GET", t), i.onload = function() { 200 === i.status ? e(i.responseText) : n(new Error(i.statusText)) }, i.onerror = function() { n(new Error("Network Error")) }, i.send()
        })
    }

    function qt(t, e) { Pt.apply(this, arguments), this.canvas = this.options.canvas || this.document.createElement("canvas"), this.options.canvas || (this.canvas.width = t, this.canvas.height = e), this.ctx = this.canvas.getContext("2d"), this.taintCtx = this.document.createElement("canvas").getContext("2d"), this.ctx.textBaseline = "bottom", this.variables = {}, R("Initialized CanvasRenderer with size", t, "x", e) }

    function Xt(t) { return t.length > 0 }
    if (function() {
            function n(t, e) { $[C] = t, $[C + 1] = e, 2 === (C += 2) && k() }

            function r(t) { return "function" == typeof t }

            function s() {
                for (var t = 0; t < C; t += 2)(0, $[t])($[t + 1]), $[t] = void 0, $[t + 1] = void 0;
                C = 0
            }

            function a() {}

            function c(t, e, n, i) { try { t.call(e, n, i) } catch (t) { return t } }

            function l(t, e, i) {
                n(function(t) {
                    var n = !1,
                        o = c(i, e, function(i) { n || (n = !0, e !== i ? u(t, i) : p(t, i)) }, function(e) { n || (n = !0, f(t, e)) });
                    !n && o && (n = !0, f(t, o))
                }, t)
            }

            function h(t, e) { 1 === e.a ? p(t, e.b) : 2 === t.a ? f(t, e.b) : m(e, void 0, function(e) { u(t, e) }, function(e) { f(t, e) }) }

            function u(t, e) {
                if (t === e) f(t, new TypeError("You cannot resolve a promise with itself"));
                else if ("function" == typeof e || "object" == typeof e && null !== e)
                    if (e.constructor === t.constructor) h(t, e);
                    else {
                        var n;
                        try { n = e.then } catch (t) { I.error = t, n = I }
                        n === I ? f(t, I.error) : void 0 === n ? p(t, e) : r(n) ? l(t, e, n) : p(t, e)
                    }
                else p(t, e)
            }

            function d(t) { t.f && t.f(t.b), g(t) }

            function p(t, e) { void 0 === t.a && (t.b = e, t.a = 1, 0 !== t.e.length && n(g, t)) }

            function f(t, e) { void 0 === t.a && (t.a = 2, t.b = e, n(d, t)) }

            function m(t, e, i, o) {
                var r = t.e,
                    s = r.length;
                t.f = null, r[s] = e, r[s + 1] = i, r[s + 2] = o, 0 === s && t.a && n(g, t)
            }

            function g(t) {
                var e = t.e,
                    n = t.a;
                if (0 !== e.length) {
                    for (var i, o, r = t.b, s = 0; s < e.length; s += 3) i = e[s], o = e[s + n], i ? y(n, i, o, r) : o(r);
                    t.e.length = 0
                }
            }

            function v() { this.error = null }

            function y(t, e, n, i) {
                var o, s, a, c, l = r(n);
                if (l) { try { o = n(i) } catch (t) { O.error = t, o = O } if (o === O ? (c = !0, s = o.error, o = null) : a = !0, e === o) return void f(e, new TypeError("A promises callback cannot return that same promise.")) } else o = i, a = !0;
                void 0 === e.a && (l && a ? u(e, o) : c ? f(e, s) : 1 === t ? p(e, o) : 2 === t && f(e, o))
            }

            function b(t, e) { try { e(function(e) { u(t, e) }, function(e) { f(t, e) }) } catch (e) { f(t, e) } }

            function w(t, e, n, i) { this.n = t, this.c = new t(a, i), this.i = n, this.o(e) ? (this.m = e, this.d = this.length = e.length, this.l(), 0 === this.length ? p(this.c, this.b) : (this.length = this.length || 0, this.k(), 0 === this.d && p(this.c, this.b))) : f(this.c, this.p()) }

            function x(t) {
                if (A++, this.b = this.a = void 0, this.e = [], a !== t) {
                    if (!r(t)) throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
                    if (!(this instanceof x)) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                    b(this, t)
                }
            }
            var k, E = Array.isArray ? Array.isArray : function(t) { return "[object Array]" === Object.prototype.toString.call(t) },
                C = 0,
                T = (S = void 0 !== t ? t : {}).MutationObserver || S.WebKitMutationObserver,
                S = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
                $ = Array(1e3);
            k = "undefined" != typeof process && "[object process]" === {}.toString.call(process) ? function() { return function() { process.nextTick(s) } }() : T ? function() {
                var t = 0,
                    n = new T(s),
                    i = e.createTextNode("");
                return n.observe(i, { characterData: !0 }),
                    function() { i.data = t = ++t % 2 }
            }() : S ? function() {
                var t = new MessageChannel;
                return t.port1.onmessage = s,
                    function() { t.port2.postMessage(0) }
            }() : function() { return function() { setTimeout(s, 1) } }();
            var I = new v,
                O = new v;
            w.prototype.o = function(t) { return E(t) }, w.prototype.p = function() { return Error("Array Methods must be provided an Array") }, w.prototype.l = function() { this.b = Array(this.length) }, w.prototype.k = function() { for (var t = this.length, e = this.c, n = this.m, i = 0; void 0 === e.a && i < t; i++) this.j(n[i], i) }, w.prototype.j = function(t, e) { var n = this.n; "object" == typeof t && null !== t ? t.constructor === n && void 0 !== t.a ? (t.f = null, this.g(t.a, e, t.b)) : this.q(n.resolve(t), e) : (this.d--, this.b[e] = this.h(t)) }, w.prototype.g = function(t, e, n) {
                var i = this.c;
                void 0 === i.a && (this.d--, this.i && 2 === t ? f(i, n) : this.b[e] = this.h(n)), 0 === this.d && p(i, this.b)
            }, w.prototype.h = function(t) { return t }, w.prototype.q = function(t, e) {
                var n = this;
                m(t, void 0, function(t) { n.g(1, e, t) }, function(t) { n.g(2, e, t) })
            };
            var A = 0;
            x.all = function(t, e) { return new w(this, t, !0, e).c }, x.race = function(t, e) {
                function n(t) { u(o, t) }

                function i(t) { f(o, t) }
                var o = new this(a, e);
                if (!E(t)) return f(o, new TypeError("You must pass an array to race.")), o;
                for (var r = t.length, s = 0; void 0 === o.a && s < r; s++) m(this.resolve(t[s]), void 0, n, i);
                return o
            }, x.resolve = function(t, e) { if (t && "object" == typeof t && t.constructor === this) return t; var n = new this(a, e); return u(n, t), n }, x.reject = function(t, e) { var n = new this(a, e); return f(n, t), n }, x.prototype = {
                constructor: x,
                then: function(t, e) {
                    var i = this.a;
                    if (1 === i && !t || 2 === i && !e) return this;
                    var o = new this.constructor(a),
                        r = this.b;
                    if (i) {
                        var s = arguments[i - 1];
                        n(function() { y(i, o, s, r) })
                    } else m(this, o, t, e);
                    return o
                },
                catch: function(t) { return this.then(null, t) }
            };
            var M = { Promise: x, polyfill: function() { var e; "Promise" in (e = void 0 !== i ? i : void 0 !== t && t.document ? t : self) && "resolve" in e.Promise && "reject" in e.Promise && "all" in e.Promise && "race" in e.Promise && function() { var t; return new e.Promise(function(e) { t = e }), r(t) }() || (e.Promise = x) } };
            "function" == typeof o && o.amd ? o(function() { return M }) : "undefined" != typeof module && module.exports ? module.exports = M : void 0 !== this && (this.ES6Promise = M)
        }.call(t), t && t.ES6Promise.polyfill(), void 0 !== e && "function" == typeof Object.create && "function" == typeof e.createElement("canvas").getContext) {
        ! function(t) {
            function e(t) { throw RangeError(N[t]) }

            function r(t, e) { for (var n = t.length, i = []; n--;) i[n] = e(t[n]); return i }

            function s(t, e) {
                var n = t.split("@"),
                    i = "";
                return n.length > 1 && (i = n[0] + "@", t = n[1]), i + r(t.split(L), e).join(".")
            }

            function a(t) { for (var e, n, i = [], o = 0, r = t.length; o < r;)(e = t.charCodeAt(o++)) >= 55296 && e <= 56319 && o < r ? 56320 == (64512 & (n = t.charCodeAt(o++))) ? i.push(((1023 & e) << 10) + (1023 & n) + 65536) : (i.push(e), o--) : i.push(e); return i }

            function c(t) { return r(t, function(t) { var e = ""; return t > 65535 && (e += B((t -= 65536) >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), e += B(t) }).join("") }

            function l(t) { return t - 48 < 10 ? t - 22 : t - 65 < 26 ? t - 65 : t - 97 < 26 ? t - 97 : k }

            function h(t, e) { return t + 22 + 75 * (t < 26) - ((0 != e) << 5) }

            function u(t, e, n) { var i = 0; for (t = n ? P(t / S) : t >> 1, t += P(t / e); t > R * C >> 1; i += k) t = P(t / R); return P(i + (R + 1) * t / (t + T)) }

            function d(t) {
                var n, i, o, r, s, a, h, d, p, f, m = [],
                    g = t.length,
                    v = 0,
                    y = I,
                    b = $;
                for ((i = t.lastIndexOf(O)) < 0 && (i = 0), o = 0; o < i; ++o) t.charCodeAt(o) >= 128 && e("not-basic"), m.push(t.charCodeAt(o));
                for (r = i > 0 ? i + 1 : 0; r < g;) {
                    for (s = v, a = 1, h = k; r >= g && e("invalid-input"), ((d = l(t.charCodeAt(r++))) >= k || d > P((x - v) / a)) && e("overflow"), v += d * a, p = h <= b ? E : h >= b + C ? C : h - b, !(d < p); h += k) a > P(x / (f = k - p)) && e("overflow"), a *= f;
                    b = u(v - s, n = m.length + 1, 0 == s), P(v / n) > x - y && e("overflow"), y += P(v / n), v %= n, m.splice(v++, 0, y)
                }
                return c(m)
            }

            function p(t) {
                var n, i, o, r, s, c, l, d, p, f, m, g, v, y, b, w = [];
                for (g = (t = a(t)).length, n = I, i = 0, s = $, c = 0; c < g; ++c)(m = t[c]) < 128 && w.push(B(m));
                for (o = r = w.length, r && w.push(O); o < g;) {
                    for (l = x, c = 0; c < g; ++c)(m = t[c]) >= n && m < l && (l = m);
                    for (l - n > P((x - i) / (v = o + 1)) && e("overflow"), i += (l - n) * v, n = l, c = 0; c < g; ++c)
                        if ((m = t[c]) < n && ++i > x && e("overflow"), m == n) {
                            for (d = i, p = k; f = p <= s ? E : p >= s + C ? C : p - s, !(d < f); p += k) b = d - f, y = k - f, w.push(B(h(f + b % y, 0))), d = P(b / y);
                            w.push(B(h(d, 0))), s = u(i, v, o == r), i = 0, ++o
                        }++i, ++n
                }
                return w.join("")
            }

            function f(t) { return s(t, function(t) { return A.test(t) ? d(t.slice(4).toLowerCase()) : t }) }

            function m(t) { return s(t, function(t) { return M.test(t) ? "xn--" + p(t) : t }) }
            var g = "object" == typeof n && n && !n.nodeType && n,
                v = "object" == typeof module && module && !module.nodeType && module,
                y = "object" == typeof i && i;
            y.global !== y && y.window !== y && y.self !== y || (t = y);
            var b, w, x = 2147483647,
                k = 36,
                E = 1,
                C = 26,
                T = 38,
                S = 700,
                $ = 72,
                I = 128,
                O = "-",
                A = /^xn--/,
                M = /[^\x20-\x7E]/,
                L = /[\x2E\u3002\uFF0E\uFF61]/g,
                N = { overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input" },
                R = k - E,
                P = Math.floor,
                B = String.fromCharCode;
            if (b = { version: "1.3.1", ucs2: { decode: a, encode: c }, decode: d, encode: p, toASCII: m, toUnicode: f }, "function" == typeof o && "object" == typeof o.amd && o.amd) o("punycode", function() { return b });
            else if (g && v)
                if (module.exports == g) v.exports = b;
                else
                    for (w in b) b.hasOwnProperty(w) && (g[w] = b[w]);
            else t.punycode = b
        }(this);
        var Yt = "data-html2canvas-node",
            Ut = "data-html2canvas-canvas-clone",
            Gt = 0,
            Qt = 0;
        t.html2canvas = function(n, i) {
            var o = Qt++;
            if ((i = i || {}).logging && (t.html2canvas.logging = !0, t.html2canvas.start = Date.now()), i.async = void 0 === i.async || i.async, i.allowTaint = void 0 !== i.allowTaint && i.allowTaint, i.removeContainer = void 0 === i.removeContainer || i.removeContainer, i.javascriptEnabled = void 0 !== i.javascriptEnabled && i.javascriptEnabled, i.imageTimeout = void 0 === i.imageTimeout ? 1e4 : i.imageTimeout, i.renderer = "function" == typeof i.renderer ? i.renderer : qt, i.strict = !!i.strict, "string" == typeof n) {
                if ("string" != typeof i.proxy) return Promise.reject("Proxy must be used when rendering url");
                var c = null != i.width ? i.width : t.innerWidth,
                    l = null != i.height ? i.height : t.innerHeight;
                return y(C(n), i.proxy, e, c, l, i).then(function(t) { return a(t.contentWindow.document.documentElement, t, i, c, l) })
            }
            var h = (n === r ? [e.documentElement] : n.length ? n : [n])[0];
            return h.setAttribute(Yt + o, o), s(h.ownerDocument, i, h.ownerDocument.defaultView.innerWidth, h.ownerDocument.defaultView.innerHeight, o).then(function(t) { return "function" == typeof i.onrendered && (R("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas"), i.onrendered(t)), t })
        }, t.html2canvas.punycode = this.punycode, t.html2canvas.proxy = {}, T.prototype.darken = function(t) { var e = 1 - t; return new T([Math.round(this.r * e), Math.round(this.g * e), Math.round(this.b * e), this.a]) }, T.prototype.isTransparent = function() { return 0 === this.a }, T.prototype.isBlack = function() { return 0 === this.r && 0 === this.g && 0 === this.b }, T.prototype.fromArray = function(t) { return Array.isArray(t) && (this.r = Math.min(t[0], 255), this.g = Math.min(t[1], 255), this.b = Math.min(t[2], 255), t.length > 3 && (this.a = t[3])), Array.isArray(t) };
        var Jt = /^#([a-f0-9]{3})$/i;
        T.prototype.hex3 = function(t) { var e = null; return null !== (e = t.match(Jt)) && (this.r = parseInt(e[1][0] + e[1][0], 16), this.g = parseInt(e[1][1] + e[1][1], 16), this.b = parseInt(e[1][2] + e[1][2], 16)), null !== e };
        var Kt = /^#([a-f0-9]{6})$/i;
        T.prototype.hex6 = function(t) { var e = null; return null !== (e = t.match(Kt)) && (this.r = parseInt(e[1].substring(0, 2), 16), this.g = parseInt(e[1].substring(2, 4), 16), this.b = parseInt(e[1].substring(4, 6), 16)), null !== e };
        var Zt = /^rgb\((\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3})\)$/;
        T.prototype.rgb = function(t) { var e = null; return null !== (e = t.match(Zt)) && (this.r = Number(e[1]), this.g = Number(e[2]), this.b = Number(e[3])), null !== e };
        var te = /^rgba\((\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3}) *, *(\d+\.?\d*)\)$/;
        T.prototype.rgba = function(t) { var e = null; return null !== (e = t.match(te)) && (this.r = Number(e[1]), this.g = Number(e[2]), this.b = Number(e[3]), this.a = Number(e[4])), null !== e }, T.prototype.toString = function() { return null !== this.a && 1 !== this.a ? "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")" : "rgb(" + [this.r, this.g, this.b].join(",") + ")" }, T.prototype.namedColor = function(t) {
            var e = ee[t.toLowerCase()];
            if (e) this.r = e[0], this.g = e[1], this.b = e[2];
            else if ("transparent" === t.toLowerCase()) return this.r = this.g = this.b = this.a = 0, !0;
            return !!e
        }, T.prototype.isColor = !0;
        var ee = { aliceblue: [240, 248, 255], antiquewhite: [250, 235, 215], aqua: [0, 255, 255], aquamarine: [127, 255, 212], azure: [240, 255, 255], beige: [245, 245, 220], bisque: [255, 228, 196], black: [0, 0, 0], blanchedalmond: [255, 235, 205], blue: [0, 0, 255], blueviolet: [138, 43, 226], brown: [165, 42, 42], burlywood: [222, 184, 135], cadetblue: [95, 158, 160], chartreuse: [127, 255, 0], chocolate: [210, 105, 30], coral: [255, 127, 80], cornflowerblue: [100, 149, 237], cornsilk: [255, 248, 220], crimson: [220, 20, 60], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgoldenrod: [184, 134, 11], darkgray: [169, 169, 169], darkgreen: [0, 100, 0], darkgrey: [169, 169, 169], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkseagreen: [143, 188, 143], darkslateblue: [72, 61, 139], darkslategray: [47, 79, 79], darkslategrey: [47, 79, 79], darkturquoise: [0, 206, 209], darkviolet: [148, 0, 211], deeppink: [255, 20, 147], deepskyblue: [0, 191, 255], dimgray: [105, 105, 105], dimgrey: [105, 105, 105], dodgerblue: [30, 144, 255], firebrick: [178, 34, 34], floralwhite: [255, 250, 240], forestgreen: [34, 139, 34], fuchsia: [255, 0, 255], gainsboro: [220, 220, 220], ghostwhite: [248, 248, 255], gold: [255, 215, 0], goldenrod: [218, 165, 32], gray: [128, 128, 128], green: [0, 128, 0], greenyellow: [173, 255, 47], grey: [128, 128, 128], honeydew: [240, 255, 240], hotpink: [255, 105, 180], indianred: [205, 92, 92], indigo: [75, 0, 130], ivory: [255, 255, 240], khaki: [240, 230, 140], lavender: [230, 230, 250], lavenderblush: [255, 240, 245], lawngreen: [124, 252, 0], lemonchiffon: [255, 250, 205], lightblue: [173, 216, 230], lightcoral: [240, 128, 128], lightcyan: [224, 255, 255], lightgoldenrodyellow: [250, 250, 210], lightgray: [211, 211, 211], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightsalmon: [255, 160, 122], lightseagreen: [32, 178, 170], lightskyblue: [135, 206, 250], lightslategray: [119, 136, 153], lightslategrey: [119, 136, 153], lightsteelblue: [176, 196, 222], lightyellow: [255, 255, 224], lime: [0, 255, 0], limegreen: [50, 205, 50], linen: [250, 240, 230], magenta: [255, 0, 255], maroon: [128, 0, 0], mediumaquamarine: [102, 205, 170], mediumblue: [0, 0, 205], mediumorchid: [186, 85, 211], mediumpurple: [147, 112, 219], mediumseagreen: [60, 179, 113], mediumslateblue: [123, 104, 238], mediumspringgreen: [0, 250, 154], mediumturquoise: [72, 209, 204], mediumvioletred: [199, 21, 133], midnightblue: [25, 25, 112], mintcream: [245, 255, 250], mistyrose: [255, 228, 225], moccasin: [255, 228, 181], navajowhite: [255, 222, 173], navy: [0, 0, 128], oldlace: [253, 245, 230], olive: [128, 128, 0], olivedrab: [107, 142, 35], orange: [255, 165, 0], orangered: [255, 69, 0], orchid: [218, 112, 214], palegoldenrod: [238, 232, 170], palegreen: [152, 251, 152], paleturquoise: [175, 238, 238], palevioletred: [219, 112, 147], papayawhip: [255, 239, 213], peachpuff: [255, 218, 185], peru: [205, 133, 63], pink: [255, 192, 203], plum: [221, 160, 221], powderblue: [176, 224, 230], purple: [128, 0, 128], rebeccapurple: [102, 51, 153], red: [255, 0, 0], rosybrown: [188, 143, 143], royalblue: [65, 105, 225], saddlebrown: [139, 69, 19], salmon: [250, 128, 114], sandybrown: [244, 164, 96], seagreen: [46, 139, 87], seashell: [255, 245, 238], sienna: [160, 82, 45], silver: [192, 192, 192], skyblue: [135, 206, 235], slateblue: [106, 90, 205], slategray: [112, 128, 144], slategrey: [112, 128, 144], snow: [255, 250, 250], springgreen: [0, 255, 127], steelblue: [70, 130, 180], tan: [210, 180, 140], teal: [0, 128, 128], thistle: [216, 191, 216], tomato: [255, 99, 71], turquoise: [64, 224, 208], violet: [238, 130, 238], wheat: [245, 222, 179], white: [255, 255, 255], whitesmoke: [245, 245, 245], yellow: [255, 255, 0], yellowgreen: [154, 205, 50] };
        I.prototype.getMetrics = function(t, e) { return this.data[t + "-" + e] === r && (this.data[t + "-" + e] = new $(t, e)), this.data[t + "-" + e] }, O.prototype.proxyLoad = function(t, e, n) { var i = this.src; return y(i.src, t, i.ownerDocument, e.width, e.height, n) }, A.prototype.TYPES = { LINEAR: 1, RADIAL: 2 }, L.prototype.findImages = function(t) {
            var e = [];
            return t.reduce(function(t, e) {
                switch (e.node.nodeName) {
                    case "IMG":
                        return t.concat([{ args: [e.node.src], method: "url" }]);
                    case "svg":
                    case "IFRAME":
                        return t.concat([{ args: [e.node], method: e.node.nodeName }])
                }
                return t
            }, []).forEach(this.addImage(e, this.loadImage), this), e
        }, L.prototype.findBackgroundImage = function(t, e) { return e.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(t, this.loadImage), this), t }, L.prototype.addImage = function(t, e) { return function(n) { n.args.forEach(function(i) { this.imageExists(t, i) || (t.splice(0, 0, e.call(this, n)), R("Added image #" + t.length, "string" == typeof i ? i.substring(0, 100) : i)) }, this) } }, L.prototype.hasImageBackground = function(t) { return "none" !== t.method }, L.prototype.loadImage = function(t) { if ("url" === t.method) { var e = t.args[0]; return !this.isSVG(e) || this.support.svg || this.options.allowTaint ? e.match(/data:image\/.*;base64,/i) ? new M(e.replace(/url\(['"]{0,}|['"]{0,}\)$/gi, ""), !1) : this.isSameOrigin(e) || !0 === this.options.allowTaint || this.isSVG(e) ? new M(e, !1) : this.support.cors && !this.options.allowTaint && this.options.useCORS ? new M(e, !0) : this.options.proxy ? new Nt(e, this.options.proxy) : new S(e) : new _t(e) } return "linear-gradient" === t.method ? new N(t) : "gradient" === t.method ? new zt(t) : "svg" === t.method ? new Ft(t.args[0], this.support.svg) : "IFRAME" === t.method ? new O(t.args[0], this.isSameOrigin(t.args[0].src), this.options) : new S(t) }, L.prototype.isSVG = function(t) { return "svg" === t.substring(t.length - 3).toLowerCase() || _t.prototype.isInline(t) }, L.prototype.imageExists = function(t, e) { return t.some(function(t) { return t.src === e }) }, L.prototype.isSameOrigin = function(t) { return this.getOrigin(t) === this.origin }, L.prototype.getOrigin = function(t) { var n = this.link || (this.link = e.createElement("a")); return n.href = t, n.href = n.href, n.protocol + n.hostname + n.port }, L.prototype.getPromise = function(t) { return this.timeout(t, this.options.imageTimeout).catch(function() { return new S(t.src).promise.then(function(e) { t.image = e }) }) }, L.prototype.get = function(t) { var e = null; return this.images.some(function(n) { return (e = n).src === t }) ? e : null }, L.prototype.fetch = function(t) { return this.images = t.reduce(bt(this.findBackgroundImage, this), this.findImages(t)), this.images.forEach(function(t, e) { t.promise.then(function() { R("Succesfully loaded image #" + (e + 1), t) }, function(n) { R("Failed loading image #" + (e + 1), t, n) }) }), this.ready = Promise.all(this.images.map(this.getPromise, this)), R("Finished searching images"), this }, L.prototype.timeout = function(t, e) { var n, i = Promise.race([t.promise, new Promise(function(i, o) { n = setTimeout(function() { R("Timed out loading image", t), o(t) }, e) })]).then(function(t) { return clearTimeout(n), t }); return i.catch(function() { clearTimeout(n) }), i }, N.prototype = Object.create(A.prototype), N.prototype.stepRegExp = /((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/, P.prototype.cloneTo = function(t) { t.visible = this.visible, t.borders = this.borders, t.bounds = this.bounds, t.clip = this.clip, t.backgroundClip = this.backgroundClip, t.computedStyles = this.computedStyles, t.styles = this.styles, t.backgroundImages = this.backgroundImages, t.opacity = this.opacity }, P.prototype.getOpacity = function() { return null === this.opacity ? this.opacity = this.cssFloat("opacity") : this.opacity }, P.prototype.assignStack = function(t) { this.stack = t, t.children.push(this) }, P.prototype.isElementVisible = function() { return this.node.nodeType === Node.TEXT_NODE ? this.parent.visible : "none" !== this.css("display") && "hidden" !== this.css("visibility") && !this.node.hasAttribute("data-html2canvas-ignore") && ("INPUT" !== this.node.nodeName || "hidden" !== this.node.getAttribute("type")) }, P.prototype.css = function(t) { return this.computedStyles || (this.computedStyles = this.isPseudoElement ? this.parent.computedStyle(this.before ? ":before" : ":after") : this.computedStyle(null)), this.styles[t] || (this.styles[t] = this.computedStyles[t]) }, P.prototype.prefixedCss = function(t) {
            var e = ["webkit", "moz", "ms", "o"],
                n = this.css(t);
            return n === r && e.some(function(e) { return (n = this.css(e + t.substr(0, 1).toUpperCase() + t.substr(1))) !== r }, this), n === r ? null : n
        }, P.prototype.computedStyle = function(t) { return this.node.ownerDocument.defaultView.getComputedStyle(this.node, t) }, P.prototype.cssInt = function(t) { var e = parseInt(this.css(t), 10); return isNaN(e) ? 0 : e }, P.prototype.color = function(t) { return this.colors[t] || (this.colors[t] = new T(this.css(t))) }, P.prototype.cssFloat = function(t) { var e = parseFloat(this.css(t)); return isNaN(e) ? 0 : e }, P.prototype.fontWeight = function() {
            var t = this.css("fontWeight");
            switch (parseInt(t, 10)) {
                case 401:
                    t = "bold";
                    break;
                case 400:
                    t = "normal"
            }
            return t
        }, P.prototype.parseClip = function() { var t = this.css("clip").match(this.CLIP); return t ? { top: parseInt(t[1], 10), right: parseInt(t[2], 10), bottom: parseInt(t[3], 10), left: parseInt(t[4], 10) } : null }, P.prototype.parseBackgroundImages = function() { return this.backgroundImages || (this.backgroundImages = j(this.css("backgroundImage"))) }, P.prototype.cssList = function(t, e) { var n = (this.css(t) || "").split(","); return n = n[e || 0] || n[0] || "auto", 1 === (n = n.trim().split(" ")).length && (n = [n[0], n[0]]), n }, P.prototype.parseBackgroundSize = function(t, e, n) {
            var i, o, r = this.cssList("backgroundSize", n);
            if (_(r[0])) i = t.width * parseFloat(r[0]) / 100;
            else {
                if (/contain|cover/.test(r[0])) {
                    var s = t.width / t.height,
                        a = e.width / e.height;
                    return s < a ^ "contain" === r[0] ? { width: t.height * a, height: t.height } : { width: t.width, height: t.width / a }
                }
                i = parseInt(r[0], 10)
            }
            return o = "auto" === r[0] && "auto" === r[1] ? e.height : "auto" === r[1] ? i / e.width * e.height : _(r[1]) ? t.height * parseFloat(r[1]) / 100 : parseInt(r[1], 10), "auto" === r[0] && (i = o / e.height * e.width), { width: i, height: o }
        }, P.prototype.parseBackgroundPosition = function(t, e, n, i) { var o, r, s = this.cssList("backgroundPosition", n); return o = _(s[0]) ? (t.width - (i || e).width) * (parseFloat(s[0]) / 100) : parseInt(s[0], 10), r = "auto" === s[1] ? o / e.width * e.height : _(s[1]) ? (t.height - (i || e).height) * parseFloat(s[1]) / 100 : parseInt(s[1], 10), "auto" === s[0] && (o = r / e.height * e.width), { left: o, top: r } }, P.prototype.parseBackgroundRepeat = function(t) { return this.cssList("backgroundRepeat", t)[0] }, P.prototype.parseTextShadows = function() {
            var t = this.css("textShadow"),
                e = [];
            if (t && "none" !== t)
                for (var n = t.match(this.TEXT_SHADOW_PROPERTY), i = 0; n && i < n.length; i++) {
                    var o = n[i].match(this.TEXT_SHADOW_VALUES);
                    e.push({ color: new T(o[0]), offsetX: o[1] ? parseFloat(o[1].replace("px", "")) : 0, offsetY: o[2] ? parseFloat(o[2].replace("px", "")) : 0, blur: o[3] ? o[3].replace("px", "") : 0 })
                }
            return e
        }, P.prototype.parseTransform = function() {
            if (!this.transformData)
                if (this.hasTransform()) {
                    var t = this.parseBounds(),
                        e = this.prefixedCss("transformOrigin").split(" ").map(F).map(H);
                    e[0] += t.left, e[1] += t.top, this.transformData = { origin: e, matrix: this.parseTransformMatrix() }
                } else this.transformData = { origin: [0, 0], matrix: [1, 0, 0, 1, 0, 0] };
            return this.transformData
        }, P.prototype.parseTransformMatrix = function() {
            if (!this.transformMatrix) {
                var t = this.prefixedCss("transform"),
                    e = t ? D(t.match(this.MATRIX_PROPERTY)) : null;
                this.transformMatrix = e || [1, 0, 0, 1, 0, 0]
            }
            return this.transformMatrix
        }, P.prototype.parseBounds = function() { return this.bounds || (this.bounds = this.hasTransform() ? z(this.node) : W(this.node)) }, P.prototype.hasTransform = function() { return "1,0,0,1,0,0" !== this.parseTransformMatrix().join(",") || this.parent && this.parent.hasTransform() }, P.prototype.getValue = function() { var t = this.node.value || ""; return "SELECT" === this.node.tagName ? t = B(this.node) : "password" === this.node.type && (t = Array(t.length + 1).join("•")), 0 === t.length ? this.node.placeholder || "" : t }, P.prototype.MATRIX_PROPERTY = /(matrix)\((.+)\)/, P.prototype.TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g, P.prototype.TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g, P.prototype.CLIP = /^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/, V.prototype.calculateOverflowClips = function() {
            this.nodes.forEach(function(t) {
                if (ft(t)) {
                    mt(t) && t.appendToDOM(), t.borders = this.parseBorders(t);
                    var e = "hidden" === t.css("overflow") ? [t.borders.clip] : [],
                        n = t.parseClip();
                    n && -1 !== ["absolute", "fixed"].indexOf(t.css("position")) && e.push([
                        ["rect", t.bounds.left + n.left, t.bounds.top + n.top, n.right - n.left, n.bottom - n.top]
                    ]), t.clip = q(t) ? t.parent.clip.concat(e) : e, t.backgroundClip = "hidden" !== t.css("overflow") ? t.clip.concat([t.borders.clip]) : t.clip, mt(t) && t.cleanDOM()
                } else gt(t) && (t.clip = q(t) ? t.parent.clip : []);
                mt(t) || (t.bounds = null)
            }, this)
        }, V.prototype.asyncRenderer = function(t, e, n) { n = n || Date.now(), this.paint(t[this.renderIndex++]), t.length === this.renderIndex ? e() : n + 20 > Date.now() ? this.asyncRenderer(t, e, n) : setTimeout(bt(function() { this.asyncRenderer(t, e) }, this), 0) }, V.prototype.createPseudoHideStyles = function(t) { this.createStyles(t, "." + Rt.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + ':before { content: "" !important; display: none !important; }.' + Rt.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER + ':after { content: "" !important; display: none !important; }') }, V.prototype.disableAnimations = function(t) { this.createStyles(t, "* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; -webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}") }, V.prototype.createStyles = function(t, e) {
            var n = t.createElement("style");
            n.innerHTML = e, t.body.appendChild(n)
        }, V.prototype.getPseudoElements = function(t) {
            var e = [
                [t]
            ];
            if (t.node.nodeType === Node.ELEMENT_NODE) {
                var n = this.getPseudoElement(t, ":before"),
                    i = this.getPseudoElement(t, ":after");
                n && e.push(n), i && e.push(i)
            }
            return Et(e)
        }, V.prototype.getPseudoElement = function(t, n) {
            var i = t.computedStyle(n);
            if (!i || !i.content || "none" === i.content || "-moz-alt-content" === i.content || "none" === i.display) return null;
            for (var o = Ct(i.content), r = "url" === o.substr(0, 3), s = e.createElement(r ? "img" : "html2canvaspseudoelement"), a = new Rt(s, t, n), c = i.length - 1; c >= 0; c--) {
                var l = X(i.item(c));
                s.style[l] = i[l]
            }
            if (s.className = Rt.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + Rt.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER, r) return s.src = j(o)[0].args[0], [a];
            var h = e.createTextNode(o);
            return s.appendChild(h), [a, new Ht(h, a)]
        }, V.prototype.getChildren = function(t) { return Et([].filter.call(t.node.childNodes, ct).map(function(e) { var n = [e.nodeType === Node.TEXT_NODE ? new Ht(e, t) : new P(e, t)].filter(kt); return e.nodeType === Node.ELEMENT_NODE && n.length && "TEXTAREA" !== e.tagName ? n[0].isElementVisible() ? n.concat(this.getChildren(n[0])) : [] : n }, this)) }, V.prototype.newStackingContext = function(t, e) {
            var n = new Bt(e, t.getOpacity(), t.node, t.parent);
            t.cloneTo(n), (e ? n.getParentStack(this) : n.parent.stack).contexts.push(n), t.stack = n
        }, V.prototype.createStackingContexts = function() { this.nodes.forEach(function(t) { ft(t) && (this.isRootElement(t) || yt(t) || lt(t) || this.isBodyWithTransparentRoot(t) || t.hasTransform()) ? this.newStackingContext(t, !0) : ft(t) && (ht(t) && nt(t) || dt(t) || ut(t)) ? this.newStackingContext(t, !1) : t.assignStack(t.parent.stack) }, this) }, V.prototype.isBodyWithTransparentRoot = function(t) { return "BODY" === t.node.nodeName && t.parent.color("backgroundColor").isTransparent() }, V.prototype.isRootElement = function(t) { return null === t.parent }, V.prototype.sortStackingContexts = function(t) { t.contexts.sort(vt(t.contexts.slice(0))), t.contexts.forEach(this.sortStackingContexts, this) }, V.prototype.parseTextBounds = function(t) {
            return function(e, n, i) {
                if ("none" !== t.parent.css("textDecoration").substr(0, 4) || 0 !== e.trim().length) {
                    if (this.support.rangeBounds && !t.parent.hasTransform()) { var o = i.slice(0, n).join("").length; return this.getRangeBounds(t.node, o, e.length) }
                    if (t.node && "string" == typeof t.node.data) {
                        var r = t.node.splitText(e.length),
                            s = this.getWrapperBounds(t.node, t.parent.hasTransform());
                        return t.node = r, s
                    }
                } else this.support.rangeBounds && !t.parent.hasTransform() || (t.node = t.node.splitText(e.length));
                return {}
            }
        }, V.prototype.getWrapperBounds = function(t, e) {
            var n = t.ownerDocument.createElement("html2canvaswrapper"),
                i = t.parentNode,
                o = t.cloneNode(!0);
            n.appendChild(t.cloneNode(!0)), i.replaceChild(n, t);
            var r = e ? z(n) : W(n);
            return i.replaceChild(o, n), r
        }, V.prototype.getRangeBounds = function(t, e, n) { var i = this.range || (this.range = t.ownerDocument.createRange()); return i.setStart(t, e), i.setEnd(t, e + n), i.getBoundingClientRect() }, V.prototype.parse = function(t) {
            var e = t.contexts.filter(tt),
                n = t.children.filter(ft),
                i = n.filter(pt(ut)),
                o = i.filter(pt(ht)).filter(pt(it)),
                r = n.filter(pt(ht)).filter(ut),
                s = i.filter(pt(ht)).filter(it),
                a = t.contexts.concat(i.filter(ht)).filter(nt),
                c = t.children.filter(gt).filter(rt),
                l = t.contexts.filter(et);
            e.concat(o).concat(r).concat(s).concat(a).concat(c).concat(l).forEach(function(t) { this.renderQueue.push(t), ot(t) && (this.parse(t), this.renderQueue.push(new Y)) }, this)
        }, V.prototype.paint = function(t) { try { t instanceof Y ? this.renderer.ctx.restore() : gt(t) ? (mt(t.parent) && t.parent.appendToDOM(), this.paintText(t), mt(t.parent) && t.parent.cleanDOM()) : this.paintNode(t) } catch (t) { if (R(t), this.options.strict) throw t } }, V.prototype.paintNode = function(t) { ot(t) && (this.renderer.setOpacity(t.opacity), this.renderer.ctx.save(), t.hasTransform() && this.renderer.setTransform(t.parseTransform())), "INPUT" === t.node.nodeName && "checkbox" === t.node.type ? this.paintCheckbox(t) : "INPUT" === t.node.nodeName && "radio" === t.node.type ? this.paintRadio(t) : this.paintElement(t) }, V.prototype.paintElement = function(t) {
            var e = t.parseBounds();
            this.renderer.clip(t.backgroundClip, function() { this.renderer.renderBackground(t, e, t.borders.borders.map(xt)) }, this), this.renderer.clip(t.clip, function() { this.renderer.renderBorders(t.borders.borders) }, this), this.renderer.clip(t.backgroundClip, function() {
                switch (t.node.nodeName) {
                    case "svg":
                    case "IFRAME":
                        var n = this.images.get(t.node);
                        n ? this.renderer.renderImage(t, e, t.borders, n) : R("Error loading <" + t.node.nodeName + ">", t.node);
                        break;
                    case "IMG":
                        var i = this.images.get(t.node.src);
                        i ? this.renderer.renderImage(t, e, t.borders, i) : R("Error loading <img>", t.node.src);
                        break;
                    case "CANVAS":
                        this.renderer.renderImage(t, e, t.borders, { image: t.node });
                        break;
                    case "SELECT":
                    case "INPUT":
                    case "TEXTAREA":
                        this.paintFormValue(t)
                }
            }, this)
        }, V.prototype.paintCheckbox = function(t) {
            var e = t.parseBounds(),
                n = Math.min(e.width, e.height),
                i = { width: n - 1, height: n - 1, top: e.top, left: e.left },
                o = [3, 3],
                r = [o, o, o, o],
                s = [1, 1, 1, 1].map(function(t) { return { color: new T("#A5A5A5"), width: t } }),
                a = Q(i, r, s);
            this.renderer.clip(t.backgroundClip, function() { this.renderer.rectangle(i.left + 1, i.top + 1, i.width - 2, i.height - 2, new T("#DEDEDE")), this.renderer.renderBorders(U(s, i, a, r)), t.node.checked && (this.renderer.font(new T("#424242"), "normal", "normal", "bold", n - 3 + "px", "arial"), this.renderer.text("✔", i.left + n / 6, i.top + n - 1)) }, this)
        }, V.prototype.paintRadio = function(t) {
            var e = t.parseBounds(),
                n = Math.min(e.width, e.height) - 2;
            this.renderer.clip(t.backgroundClip, function() { this.renderer.circleStroke(e.left + 1, e.top + 1, n, new T("#DEDEDE"), 1, new T("#A5A5A5")), t.node.checked && this.renderer.circle(Math.ceil(e.left + n / 4) + 1, Math.ceil(e.top + n / 4) + 1, Math.floor(n / 2), new T("#424242")) }, this)
        }, V.prototype.paintFormValue = function(t) {
            var e = t.getValue();
            if (e.length > 0) {
                var n = t.node.ownerDocument,
                    i = n.createElement("html2canvaswrapper");
                ["lineHeight", "textAlign", "fontFamily", "fontWeight", "fontSize", "color", "paddingLeft", "paddingTop", "paddingRight", "paddingBottom", "width", "height", "borderLeftStyle", "borderTopStyle", "borderLeftWidth", "borderTopWidth", "boxSizing", "whiteSpace", "wordWrap"].forEach(function(e) { try { i.style[e] = t.css(e) } catch (t) { R("html2canvas: Parse: Exception caught in renderFormValue: " + t.message) } });
                var o = t.parseBounds();
                i.style.position = "fixed", i.style.left = o.left + "px", i.style.top = o.top + "px", i.textContent = e, n.body.appendChild(i), this.paintText(new Ht(i.firstChild, t)), n.body.removeChild(i)
            }
        }, V.prototype.paintText = function(e) {
            e.applyTextTransform();
            var n = t.html2canvas.punycode.ucs2.decode(e.node.data),
                i = this.options.letterRendering && !st(e) || $t(e.node.data) ? n.map(function(e) { return t.html2canvas.punycode.ucs2.encode([e]) }) : Tt(n),
                o = e.parent.fontWeight(),
                r = e.parent.css("fontSize"),
                s = e.parent.css("fontFamily"),
                a = e.parent.parseTextShadows();
            this.renderer.font(e.parent.color("color"), e.parent.css("fontStyle"), e.parent.css("fontVariant"), o, r, s), a.length ? this.renderer.fontShadow(a[0].color, a[0].offsetX, a[0].offsetY, a[0].blur) : this.renderer.clearShadow(), this.renderer.clip(e.parent.clip, function() { i.map(this.parseTextBounds(e), this).forEach(function(t, n) { t && (this.renderer.text(i[n], t.left, t.bottom), this.renderTextDecoration(e.parent, t, this.fontMetrics.getMetrics(s, r))) }, this) }, this)
        }, V.prototype.renderTextDecoration = function(t, e, n) {
            switch (t.css("textDecoration").split(" ")[0]) {
                case "underline":
                    this.renderer.rectangle(e.left, Math.round(e.top + n.baseline + n.lineWidth), e.width, 1, t.color("color"));
                    break;
                case "overline":
                    this.renderer.rectangle(e.left, Math.round(e.top), e.width, 1, t.color("color"));
                    break;
                case "line-through":
                    this.renderer.rectangle(e.left, Math.ceil(e.top + n.middle + n.lineWidth), e.width, 1, t.color("color"))
            }
        };
        var ne = {
            inset: [
                ["darken", .6],
                ["darken", .1],
                ["darken", .1],
                ["darken", .6]
            ]
        };
        V.prototype.parseBorders = function(t) {
            var e = t.parseBounds(),
                n = at(t),
                i = ["Top", "Right", "Bottom", "Left"].map(function(e, n) {
                    var i = t.css("border" + e + "Style"),
                        o = t.color("border" + e + "Color");
                    "inset" === i && o.isBlack() && (o = new T([255, 255, 255, o.a]));
                    var r = ne[i] ? ne[i][n] : null;
                    return { width: t.cssInt("border" + e + "Width"), color: r ? o[r[0]](r[1]) : o, args: null }
                }),
                o = Q(e, n, i);
            return { clip: this.parseBackgroundClip(t, o, i, n, e), borders: U(i, e, o, n) }
        }, V.prototype.parseBackgroundClip = function(t, e, n, i, o) {
            var r = [];
            switch (t.css("backgroundClip")) {
                case "content-box":
                case "padding-box":
                    Z(r, i[0], i[1], e.topLeftInner, e.topRightInner, o.left + n[3].width, o.top + n[0].width), Z(r, i[1], i[2], e.topRightInner, e.bottomRightInner, o.left + o.width - n[1].width, o.top + n[0].width), Z(r, i[2], i[3], e.bottomRightInner, e.bottomLeftInner, o.left + o.width - n[1].width, o.top + o.height - n[2].width), Z(r, i[3], i[0], e.bottomLeftInner, e.topLeftInner, o.left + n[3].width, o.top + o.height - n[2].width);
                    break;
                default:
                    Z(r, i[0], i[1], e.topLeftOuter, e.topRightOuter, o.left, o.top), Z(r, i[1], i[2], e.topRightOuter, e.bottomRightOuter, o.left + o.width, o.top), Z(r, i[2], i[3], e.bottomRightOuter, e.bottomLeftOuter, o.left + o.width, o.top + o.height), Z(r, i[3], i[0], e.bottomLeftOuter, e.topLeftOuter, o.left, o.top + o.height)
            }
            return r
        };
        var ie = 0,
            oe = "withCredentials" in new XMLHttpRequest,
            re = "crossOrigin" in new Image;
        Rt.prototype.cloneTo = function(t) { Rt.prototype.cloneTo.call(this, t), t.isPseudoElement = !0, t.before = this.before }, Rt.prototype = Object.create(P.prototype), Rt.prototype.appendToDOM = function() { this.before ? this.parent.node.insertBefore(this.node, this.parent.node.firstChild) : this.parent.node.appendChild(this.node), this.parent.node.className += " " + this.getHideClass() }, Rt.prototype.cleanDOM = function() { this.node.parentNode.removeChild(this.node), this.parent.node.className = this.parent.node.className.replace(this.getHideClass(), "") }, Rt.prototype.getHideClass = function() { return this["PSEUDO_HIDE_ELEMENT_CLASS_" + (this.before ? "BEFORE" : "AFTER")] }, Rt.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before", Rt.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after", Pt.prototype.renderImage = function(t, e, n, i) {
            var o = t.cssInt("paddingLeft"),
                r = t.cssInt("paddingTop"),
                s = t.cssInt("paddingRight"),
                a = t.cssInt("paddingBottom"),
                c = n.borders,
                l = e.width - (c[1].width + c[3].width + o + s),
                h = e.height - (c[0].width + c[2].width + r + a);
            this.drawImage(i, 0, 0, i.image.width || l, i.image.height || h, e.left + o + c[3].width, e.top + r + c[0].width, l, h)
        }, Pt.prototype.renderBackground = function(t, e, n) { e.height > 0 && e.width > 0 && (this.renderBackgroundColor(t, e), this.renderBackgroundImage(t, e, n)) }, Pt.prototype.renderBackgroundColor = function(t, e) {
            var n = t.color("backgroundColor");
            n.isTransparent() || this.rectangle(e.left, e.top, e.width, e.height, n)
        }, Pt.prototype.renderBorders = function(t) { t.forEach(this.renderBorder, this) }, Pt.prototype.renderBorder = function(t) { t.color.isTransparent() || null === t.args || this.drawShape(t.args, t.color) }, Pt.prototype.renderBackgroundImage = function(t, e, n) {
            t.parseBackgroundImages().reverse().forEach(function(i, o, r) {
                switch (i.method) {
                    case "url":
                        var s = this.images.get(i.args[0]);
                        s ? this.renderBackgroundRepeating(t, e, s, r.length - (o + 1), n) : R("Error loading background-image", i.args[0]);
                        break;
                    case "linear-gradient":
                    case "gradient":
                        var a = this.images.get(i.value);
                        a ? this.renderBackgroundGradient(a, e, n) : R("Error loading background-image", i.args[0]);
                        break;
                    case "none":
                        break;
                    default:
                        R("Unknown background-image type", i.args[0])
                }
            }, this)
        }, Pt.prototype.renderBackgroundRepeating = function(t, e, n, i, o) {
            var r = t.parseBackgroundSize(e, n.image, i),
                s = t.parseBackgroundPosition(e, n.image, i, r);
            switch (t.parseBackgroundRepeat(i)) {
                case "repeat-x":
                case "repeat no-repeat":
                    this.backgroundRepeatShape(n, s, r, e, e.left + o[3], e.top + s.top + o[0], 99999, r.height, o);
                    break;
                case "repeat-y":
                case "no-repeat repeat":
                    this.backgroundRepeatShape(n, s, r, e, e.left + s.left + o[3], e.top + o[0], r.width, 99999, o);
                    break;
                case "no-repeat":
                    this.backgroundRepeatShape(n, s, r, e, e.left + s.left + o[3], e.top + s.top + o[0], r.width, r.height, o);
                    break;
                default:
                    this.renderBackgroundRepeat(n, s, r, { top: e.top, left: e.left }, o[3], o[0])
            }
        }, Bt.prototype = Object.create(P.prototype), Bt.prototype.getParentStack = function(t) { var e = this.parent ? this.parent.stack : null; return e ? e.ownStacking ? e : e.getParentStack(t) : t.stack }, Dt.prototype.testRangeBounds = function(t) { var e, n, i = !1; return t.createRange && (e = t.createRange()).getBoundingClientRect && ((n = t.createElement("boundtest")).style.height = "123px", n.style.display = "block", t.body.appendChild(n), e.selectNode(n), 123 === e.getBoundingClientRect().height && (i = !0), t.body.removeChild(n)), i }, Dt.prototype.testCORS = function() { return void 0 !== (new Image).crossOrigin }, Dt.prototype.testSVG = function() {
            var t = new Image,
                n = e.createElement("canvas"),
                i = n.getContext("2d");
            t.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
            try { i.drawImage(t, 0, 0), n.toDataURL() } catch (t) { return !1 }
            return !0
        }, _t.prototype.hasFabric = function() { return html2canvas.fabric ? Promise.resolve() : Promise.reject(new Error("html2canvas.svg.js is not loaded, cannot render svg")) }, _t.prototype.inlineFormatting = function(t) { return /^data:image\/svg\+xml;base64,/.test(t) ? this.decode64(this.removeContentType(t)) : this.removeContentType(t) }, _t.prototype.removeContentType = function(t) { return t.replace(/^data:image\/svg\+xml(;base64)?,/, "") }, _t.prototype.isInline = function(t) { return /^data:image\/svg\+xml/i.test(t) }, _t.prototype.createCanvas = function(t) {
            var e = this;
            return function(n, i) {
                var o = new html2canvas.fabric.StaticCanvas("c");
                e.image = o.lowerCanvasEl, o.setWidth(i.width).setHeight(i.height).add(html2canvas.fabric.util.groupSVGElements(n, i)).renderAll(), t(o.lowerCanvasEl)
            }
        }, _t.prototype.decode64 = function(e) { return "function" == typeof t.atob ? t.atob(e) : jt(e) }, Ft.prototype = Object.create(_t.prototype), Ht.prototype = Object.create(P.prototype), Ht.prototype.applyTextTransform = function() { this.node.data = this.transform(this.parent.css("textTransform")) }, Ht.prototype.transform = function(t) {
            var e = this.node.data;
            switch (t) {
                case "lowercase":
                    return e.toLowerCase();
                case "capitalize":
                    return e.replace(/(^|\s|:|-|\(|\))([a-z])/g, Wt);
                case "uppercase":
                    return e.toUpperCase();
                default:
                    return e
            }
        }, zt.prototype = Object.create(A.prototype), qt.prototype = Object.create(Pt.prototype), qt.prototype.setFillStyle = function(t) { return this.ctx.fillStyle = "object" == typeof t && t.isColor ? t.toString() : t, this.ctx }, qt.prototype.rectangle = function(t, e, n, i, o) { this.setFillStyle(o).fillRect(t, e, n, i) }, qt.prototype.circle = function(t, e, n, i) { this.setFillStyle(i), this.ctx.beginPath(), this.ctx.arc(t + n / 2, e + n / 2, n / 2, 0, 2 * Math.PI, !0), this.ctx.closePath(), this.ctx.fill() }, qt.prototype.circleStroke = function(t, e, n, i, o, r) { this.circle(t, e, n, i), this.ctx.strokeStyle = r.toString(), this.ctx.stroke() }, qt.prototype.drawShape = function(t, e) { this.shape(t), this.setFillStyle(e).fill() }, qt.prototype.taints = function(t) { if (null === t.tainted) { this.taintCtx.drawImage(t.image, 0, 0); try { this.taintCtx.getImageData(0, 0, 1, 1), t.tainted = !1 } catch (n) { this.taintCtx = e.createElement("canvas").getContext("2d"), t.tainted = !0 } } return t.tainted }, qt.prototype.drawImage = function(t, e, n, i, o, r, s, a, c) { this.taints(t) && !this.options.allowTaint || this.ctx.drawImage(t.image, e, n, i, o, r, s, a, c) }, qt.prototype.clip = function(t, e, n) { this.ctx.save(), t.filter(Xt).forEach(function(t) { this.shape(t).clip() }, this), e.call(n), this.ctx.restore() }, qt.prototype.shape = function(t) { return this.ctx.beginPath(), t.forEach(function(t, e) { "rect" === t[0] ? this.ctx.rect.apply(this.ctx, t.slice(1)) : this.ctx[0 === e ? "moveTo" : t[0] + "To"].apply(this.ctx, t.slice(1)) }, this), this.ctx.closePath(), this.ctx }, qt.prototype.font = function(t, e, n, i, o, r) { this.setFillStyle(t).font = [e, n, i, o, r].join(" ").split(",")[0] }, qt.prototype.fontShadow = function(t, e, n, i) { this.setVariable("shadowColor", t.toString()).setVariable("shadowOffsetY", e).setVariable("shadowOffsetX", n).setVariable("shadowBlur", i) }, qt.prototype.clearShadow = function() { this.setVariable("shadowColor", "rgba(0,0,0,0)") }, qt.prototype.setOpacity = function(t) { this.ctx.globalAlpha = t }, qt.prototype.setTransform = function(t) { this.ctx.translate(t.origin[0], t.origin[1]), this.ctx.transform.apply(this.ctx, t.matrix), this.ctx.translate(-t.origin[0], -t.origin[1]) }, qt.prototype.setVariable = function(t, e) { return this.variables[t] !== e && (this.variables[t] = this.ctx[t] = e), this }, qt.prototype.text = function(t, e, n) { this.ctx.fillText(t, e, n) }, qt.prototype.backgroundRepeatShape = function(t, e, n, i, o, r, s, a, c) {
            var l = [
                ["line", Math.round(o), Math.round(r)],
                ["line", Math.round(o + s), Math.round(r)],
                ["line", Math.round(o + s), Math.round(a + r)],
                ["line", Math.round(o), Math.round(a + r)]
            ];
            this.clip([l], function() { this.renderBackgroundRepeat(t, e, n, i, c[3], c[0]) }, this)
        }, qt.prototype.renderBackgroundRepeat = function(t, e, n, i, o, r) {
            var s = Math.round(i.left + e.left + o),
                a = Math.round(i.top + e.top + r);
            this.setFillStyle(this.ctx.createPattern(this.resizeImage(t, n), "repeat")), this.ctx.translate(s, a), this.ctx.fill(), this.ctx.translate(-s, -a)
        }, qt.prototype.renderBackgroundGradient = function(t, e) {
            if (t instanceof N) {
                var n = this.ctx.createLinearGradient(e.left + e.width * t.x0, e.top + e.height * t.y0, e.left + e.width * t.x1, e.top + e.height * t.y1);
                t.colorStops.forEach(function(t) { n.addColorStop(t.stop, t.color.toString()) }), this.rectangle(e.left, e.top, e.width, e.height, n)
            }
        }, qt.prototype.resizeImage = function(t, n) { var i = t.image; if (i.width === n.width && i.height === n.height) return i; var o = e.createElement("canvas"); return o.width = n.width, o.height = n.height, o.getContext("2d").drawImage(i, 0, 0, i.width, i.height, 0, 0, n.width, n.height), o }
    } else(t || module.exports).html2canvas = function() { return Promise.reject("No canvas support") }
}.call({}, "undefined" != typeof window ? window : void 0, "undefined" != typeof document ? document : void 0),
    function() {
        function t(e) { var n = t.modules[e]; if (!n) throw new Error('failed to require "' + e + '"'); return "exports" in n || "function" != typeof n.definition || (n.client = n.component = !0, n.definition.call(this, n.exports = {}, n), delete n.definition), n.exports }
        t.loader = "component", t.helper = {}, t.helper.semVerSort = function(t, e) {
            for (var n = t.version.split("."), i = e.version.split("."), o = 0; o < n.length; ++o) {
                var r = parseInt(n[o], 10),
                    s = parseInt(i[o], 10);
                if (r !== s) return r > s ? 1 : -1;
                var a = n[o].substr(("" + r).length),
                    c = i[o].substr(("" + s).length);
                if ("" === a && "" !== c) return 1;
                if ("" !== a && "" === c) return -1;
                if ("" !== a && "" !== c) return a > c ? 1 : -1
            }
            return 0
        }, t.latest = function(e, n) {
            function i(t) { throw new Error('failed to find latest module of "' + t + '"') }
            var o = /(.*)~(.*)@v?(\d+\.\d+\.\d+[^\/]*)$/;
            /(.*)~(.*)/.test(e) || i(e);
            for (var r = Object.keys(t.modules), s = [], a = [], c = 0; c < r.length; c++) {
                var l = r[c];
                if (new RegExp(e + "@").test(l)) {
                    var h = l.substr(e.length + 1);
                    null != o.exec(l) ? s.push({ version: h, name: l }) : a.push({ version: h, name: l })
                }
            }
            if (0 === s.concat(a).length && i(e), s.length > 0) { u = s.sort(t.helper.semVerSort).pop().name; return !0 === n ? u : t(u) }
            var u = a.sort(function(t, e) { return t.name > e.name })[0].name;
            return !0 === n ? u : t(u)
        }, t.modules = {}, t.register = function(e, n) { t.modules[e] = { definition: n } }, t.define = function(e, n) { t.modules[e] = { exports: n } }, t.register("abpetkov~transitionize@0.0.3", function(t, e) {
            function n(t, e) {
                if (!(this instanceof n)) return new n(t, e);
                this.element = t, this.props = e || {}, this.init()
            }
            e.exports = n, n.prototype.isSafari = function() { return /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor) }, n.prototype.init = function() {
                var t = [];
                for (var e in this.props) t.push(e + " " + this.props[e]);
                this.element.style.transition = t.join(", "), this.isSafari() && (this.element.style.webkitTransition = t.join(", "))
            }
        }), t.register("ftlabs~fastclick@v0.6.11", function(t, e) {
            function n(t) {
                "use strict";
                var e, i = this;
                if (this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = 10, this.layer = t, !t || !t.nodeType) throw new TypeError("Layer must be a document node");
                this.onClick = function() { return n.prototype.onClick.apply(i, arguments) }, this.onMouse = function() { return n.prototype.onMouse.apply(i, arguments) }, this.onTouchStart = function() { return n.prototype.onTouchStart.apply(i, arguments) }, this.onTouchMove = function() { return n.prototype.onTouchMove.apply(i, arguments) }, this.onTouchEnd = function() { return n.prototype.onTouchEnd.apply(i, arguments) }, this.onTouchCancel = function() { return n.prototype.onTouchCancel.apply(i, arguments) }, n.notNeeded(t) || (this.deviceIsAndroid && (t.addEventListener("mouseover", this.onMouse, !0), t.addEventListener("mousedown", this.onMouse, !0), t.addEventListener("mouseup", this.onMouse, !0)), t.addEventListener("click", this.onClick, !0), t.addEventListener("touchstart", this.onTouchStart, !1), t.addEventListener("touchmove", this.onTouchMove, !1), t.addEventListener("touchend", this.onTouchEnd, !1), t.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (t.removeEventListener = function(e, n, i) { var o = Node.prototype.removeEventListener; "click" === e ? o.call(t, e, n.hijacked || n, i) : o.call(t, e, n, i) }, t.addEventListener = function(e, n, i) { var o = Node.prototype.addEventListener; "click" === e ? o.call(t, e, n.hijacked || (n.hijacked = function(t) { t.propagationStopped || n(t) }), i) : o.call(t, e, n, i) }), "function" == typeof t.onclick && (e = t.onclick, t.addEventListener("click", function(t) { e(t) }, !1), t.onclick = null))
            }
            n.prototype.deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0, n.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent), n.prototype.deviceIsIOS4 = n.prototype.deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent), n.prototype.deviceIsIOSWithBadTarget = n.prototype.deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent), n.prototype.needsClick = function(t) {
                "use strict";
                switch (t.nodeName.toLowerCase()) {
                    case "button":
                    case "select":
                    case "textarea":
                        if (t.disabled) return !0;
                        break;
                    case "input":
                        if (this.deviceIsIOS && "file" === t.type || t.disabled) return !0;
                        break;
                    case "label":
                    case "video":
                        return !0
                }
                return /\bneedsclick\b/.test(t.className)
            }, n.prototype.needsFocus = function(t) {
                "use strict";
                switch (t.nodeName.toLowerCase()) {
                    case "textarea":
                        return !0;
                    case "select":
                        return !this.deviceIsAndroid;
                    case "input":
                        switch (t.type) {
                            case "button":
                            case "checkbox":
                            case "file":
                            case "image":
                            case "radio":
                            case "submit":
                                return !1
                        }
                        return !t.disabled && !t.readOnly;
                    default:
                        return /\bneedsfocus\b/.test(t.className)
                }
            }, n.prototype.sendClick = function(t, e) {
                "use strict";
                var n, i;
                document.activeElement && document.activeElement !== t && document.activeElement.blur(), i = e.changedTouches[0], (n = document.createEvent("MouseEvents")).initMouseEvent(this.determineEventType(t), !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, t.dispatchEvent(n)
            }, n.prototype.determineEventType = function(t) { "use strict"; return this.deviceIsAndroid && "select" === t.tagName.toLowerCase() ? "mousedown" : "click" }, n.prototype.focus = function(t) {
                "use strict";
                var e;
                this.deviceIsIOS && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus()
            }, n.prototype.updateScrollParent = function(t) {
                "use strict";
                var e, n;
                if (!(e = t.fastClickScrollParent) || !e.contains(t)) {
                    n = t;
                    do {
                        if (n.scrollHeight > n.offsetHeight) { e = n, t.fastClickScrollParent = n; break }
                        n = n.parentElement
                    } while (n)
                }
                e && (e.fastClickLastScrollTop = e.scrollTop)
            }, n.prototype.getTargetElementFromEventTarget = function(t) { "use strict"; return t.nodeType === Node.TEXT_NODE ? t.parentNode : t }, n.prototype.onTouchStart = function(t) {
                "use strict";
                var e, n, i;
                if (t.targetTouches.length > 1) return !0;
                if (e = this.getTargetElementFromEventTarget(t.target), n = t.targetTouches[0], this.deviceIsIOS) {
                    if ((i = window.getSelection()).rangeCount && !i.isCollapsed) return !0;
                    if (!this.deviceIsIOS4) {
                        if (n.identifier === this.lastTouchIdentifier) return t.preventDefault(), !1;
                        this.lastTouchIdentifier = n.identifier, this.updateScrollParent(e)
                    }
                }
                return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = n.pageX, this.touchStartY = n.pageY, t.timeStamp - this.lastClickTime < 200 && t.preventDefault(), !0
            }, n.prototype.touchHasMoved = function(t) {
                "use strict";
                var e = t.changedTouches[0],
                    n = this.touchBoundary;
                return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n
            }, n.prototype.onTouchMove = function(t) { "use strict"; return !this.trackingClick || ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, this.targetElement = null), !0) }, n.prototype.findControl = function(t) { "use strict"; return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea") }, n.prototype.onTouchEnd = function(t) {
                "use strict";
                var e, n, i, o, r, s = this.targetElement;
                if (!this.trackingClick) return !0;
                if (t.timeStamp - this.lastClickTime < 200) return this.cancelNextClick = !0, !0;
                if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, n = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, this.deviceIsIOSWithBadTarget && (r = t.changedTouches[0], (s = document.elementFromPoint(r.pageX - window.pageXOffset, r.pageY - window.pageYOffset) || s).fastClickScrollParent = this.targetElement.fastClickScrollParent), "label" === (i = s.tagName.toLowerCase())) {
                    if (e = this.findControl(s)) {
                        if (this.focus(s), this.deviceIsAndroid) return !1;
                        s = e
                    }
                } else if (this.needsFocus(s)) return t.timeStamp - n > 100 || this.deviceIsIOS && window.top !== window && "input" === i ? (this.targetElement = null, !1) : (this.focus(s), this.deviceIsIOS4 && "select" === i || (this.targetElement = null, t.preventDefault()), !1);
                return !(!this.deviceIsIOS || this.deviceIsIOS4 || !(o = s.fastClickScrollParent) || o.fastClickLastScrollTop === o.scrollTop) || (this.needsClick(s) || (t.preventDefault(), this.sendClick(s, t)), !1)
            }, n.prototype.onTouchCancel = function() {
                "use strict";
                this.trackingClick = !1, this.targetElement = null
            }, n.prototype.onMouse = function(t) { "use strict"; return !this.targetElement || (!!t.forwardedTouchEvent || (!t.cancelable || (!(!this.needsClick(this.targetElement) || this.cancelNextClick) || (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1)))) }, n.prototype.onClick = function(t) { "use strict"; var e; return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail || ((e = this.onMouse(t)) || (this.targetElement = null), e) }, n.prototype.destroy = function() {
                "use strict";
                var t = this.layer;
                this.deviceIsAndroid && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1)
            }, n.notNeeded = function(t) { "use strict"; var e, i; if (void 0 === window.ontouchstart) return !0; if (i = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) { if (!n.prototype.deviceIsAndroid) return !0; if (e = document.querySelector("meta[name=viewport]")) { if (-1 !== e.content.indexOf("user-scalable=no")) return !0; if (i > 31 && window.innerWidth <= window.screen.width) return !0 } } return "none" === t.style.msTouchAction }, n.attach = function(t) { "use strict"; return new n(t) }, "undefined" != typeof define && define.amd ? define(function() { "use strict"; return n }) : void 0 !== e && e.exports ? (e.exports = n.attach, e.exports.FastClick = n) : window.FastClick = n
        }), t.register("component~indexof@0.0.3", function(t, e) {
            e.exports = function(t, e) {
                if (t.indexOf) return t.indexOf(e);
                for (var n = 0; n < t.length; ++n)
                    if (t[n] === e) return n;
                return -1
            }
        }), t.register("component~classes@1.2.1", function(e, n) {
            function i(t) {
                if (!t) throw new Error("A DOM element reference is required");
                this.el = t, this.list = t.classList
            }
            var o = t("component~indexof@0.0.3"),
                r = /\s+/,
                s = Object.prototype.toString;
            n.exports = function(t) { return new i(t) }, i.prototype.add = function(t) { if (this.list) return this.list.add(t), this; var e = this.array(); return ~o(e, t) || e.push(t), this.el.className = e.join(" "), this }, i.prototype.remove = function(t) {
                if ("[object RegExp]" == s.call(t)) return this.removeMatching(t);
                if (this.list) return this.list.remove(t), this;
                var e = this.array(),
                    n = o(e, t);
                return ~n && e.splice(n, 1), this.el.className = e.join(" "), this
            }, i.prototype.removeMatching = function(t) { for (var e = this.array(), n = 0; n < e.length; n++) t.test(e[n]) && this.remove(e[n]); return this }, i.prototype.toggle = function(t, e) { return this.list ? (void 0 !== e ? e !== this.list.toggle(t, e) && this.list.toggle(t) : this.list.toggle(t), this) : (void 0 !== e ? e ? this.add(t) : this.remove(t) : this.has(t) ? this.remove(t) : this.add(t), this) }, i.prototype.array = function() { var t = this.el.className.replace(/^\s+|\s+$/g, "").split(r); return "" === t[0] && t.shift(), t }, i.prototype.has = i.prototype.contains = function(t) { return this.list ? this.list.contains(t) : !!~o(this.array(), t) }
        }), t.register("component~event@0.1.4", function(t, e) {
            var n = window.addEventListener ? "addEventListener" : "attachEvent",
                i = window.removeEventListener ? "removeEventListener" : "detachEvent",
                o = "addEventListener" !== n ? "on" : "";
            t.bind = function(t, e, i, r) { return t[n](o + e, i, r || !1), i }, t.unbind = function(t, e, n, r) { return t[i](o + e, n, r || !1), n }
        }), t.register("component~query@0.0.3", function(t, e) {
            function n(t, e) { return e.querySelector(t) }(t = e.exports = function(t, e) { return e = e || document, n(t, e) }).all = function(t, e) { return (e = e || document).querySelectorAll(t) }, t.engine = function(e) { if (!e.one) throw new Error(".one callback required"); if (!e.all) throw new Error(".all callback required"); return n = e.one, t.all = e.all, t }
        }), t.register("component~matches-selector@0.1.5", function(e, n) {
            function i(t, e) {
                if (!t || 1 !== t.nodeType) return !1;
                if (s) return s.call(t, e);
                for (var n = o.all(e, t.parentNode), i = 0; i < n.length; ++i)
                    if (n[i] == t) return !0;
                return !1
            }
            var o = t("component~query@0.0.3"),
                r = Element.prototype,
                s = r.matches || r.webkitMatchesSelector || r.mozMatchesSelector || r.msMatchesSelector || r.oMatchesSelector;
            n.exports = i
        }), t.register("component~closest@0.1.4", function(e, n) {
            var i = t("component~matches-selector@0.1.5");
            n.exports = function(t, e, n, o) {
                for (t = n ? { parentNode: t } : t, o = o || document;
                    (t = t.parentNode) && t !== document;) { if (i(t, e)) return t; if (t === o) return }
            }
        }), t.register("component~delegate@0.2.3", function(e, n) {
            var i = t("component~closest@0.1.4"),
                o = t("component~event@0.1.4");
            e.bind = function(t, e, n, r, s) {
                return o.bind(t, n, function(n) {
                    var o = n.target || n.srcElement;
                    n.delegateTarget = i(o, e, !0, t), n.delegateTarget && r.call(t, n)
                }, s)
            }, e.unbind = function(t, e, n, i) { o.unbind(t, e, n, i) }
        }), t.register("component~events@1.0.9", function(e, n) {
            function i(t, e) {
                if (!(this instanceof i)) return new i(t, e);
                if (!t) throw new Error("element required");
                if (!e) throw new Error("object required");
                this.el = t, this.obj = e, this._events = {}
            }

            function o(t) { var e = t.split(/ +/); return { name: e.shift(), selector: e.join(" ") } }
            var r = t("component~event@0.1.4"),
                s = t("component~delegate@0.2.3");
            n.exports = i, i.prototype.sub = function(t, e, n) { this._events[t] = this._events[t] || {}, this._events[t][e] = n }, i.prototype.bind = function(t, e) {
                function n() {
                    var t = [].slice.call(arguments).concat(h);
                    c[e].apply(c, t)
                }
                var i = o(t),
                    a = this.el,
                    c = this.obj,
                    l = i.name,
                    e = e || "on" + l,
                    h = [].slice.call(arguments, 2);
                return i.selector ? n = s.bind(a, i.selector, l, n) : r.bind(a, l, n), this.sub(l, e, n), n
            }, i.prototype.unbind = function(t, e) {
                if (0 == arguments.length) return this.unbindAll();
                if (1 == arguments.length) return this.unbindAllOf(t);
                var n = this._events[t];
                if (n) {
                    var i = n[e];
                    i && r.unbind(this.el, t, i)
                }
            }, i.prototype.unbindAll = function() { for (var t in this._events) this.unbindAllOf(t) }, i.prototype.unbindAllOf = function(t) {
                var e = this._events[t];
                if (e)
                    for (var n in e) this.unbind(t, n)
            }
        }), t.register("switchery", function(e, n) {
            function i(t, e) {
                if (!(this instanceof i)) return new i(t, e);
                this.element = t, this.options = e || {};
                for (var n in c) null == this.options[n] && (this.options[n] = c[n]);
                null != this.element && "checkbox" == this.element.type && this.init(), !0 === this.isDisabled() && this.disable()
            }
            var o = t("abpetkov~transitionize@0.0.3"),
                r = t("ftlabs~fastclick@v0.6.11"),
                s = t("component~classes@1.2.1"),
                a = t("component~events@1.0.9");
            n.exports = i;
            var c = { color: "#64bd63", secondaryColor: "#dfdfdf", jackColor: "#fff", jackSecondaryColor: null, className: "switchery", disabled: !1, disabledOpacity: .5, speed: "0.4s", size: "default" };
            i.prototype.hide = function() { this.element.style.display = "none" }, i.prototype.show = function() {
                var t = this.create();
                this.insertAfter(this.element, t)
            }, i.prototype.create = function() { return this.switcher = document.createElement("span"), this.jack = document.createElement("small"), this.switcher.appendChild(this.jack), this.switcher.className = this.options.className, this.events = a(this.switcher, this), this.switcher }, i.prototype.insertAfter = function(t, e) { t.parentNode.insertBefore(e, t.nextSibling) }, i.prototype.setPosition = function(t) {
                var e = this.isChecked(),
                    n = this.switcher,
                    i = this.jack;
                t && e ? e = !1 : t && !e && (e = !0), !0 === e ? (this.element.checked = !0, window.getComputedStyle ? i.style.left = parseInt(window.getComputedStyle(n).width) - parseInt(window.getComputedStyle(i).width) + "px" : i.style.left = parseInt(n.currentStyle.width) - parseInt(i.currentStyle.width) + "px", this.options.color && this.colorize(), this.setSpeed()) : (i.style.left = 0, this.element.checked = !1, this.switcher.style.boxShadow = "inset 0 0 0 0 " + this.options.secondaryColor, this.switcher.style.borderColor = this.options.secondaryColor, this.switcher.style.backgroundColor = this.options.secondaryColor !== c.secondaryColor ? this.options.secondaryColor : "#fff", this.jack.style.backgroundColor = this.options.jackSecondaryColor !== this.options.jackColor ? this.options.jackSecondaryColor : this.options.jackColor, this.setSpeed())
            }, i.prototype.setSpeed = function() {
                var t = {},
                    e = { "background-color": this.options.speed, left: this.options.speed.replace(/[a-z]/, "") / 2 + "s" };
                t = this.isChecked() ? { border: this.options.speed, "box-shadow": this.options.speed, "background-color": 3 * this.options.speed.replace(/[a-z]/, "") + "s" } : { border: this.options.speed, "box-shadow": this.options.speed }, o(this.switcher, t), o(this.jack, e)
            }, i.prototype.setSize = function() {
                switch (this.options.size) {
                    case "small":
                        s(this.switcher).add("switchery-small");
                        break;
                    case "large":
                        s(this.switcher).add("switchery-large");
                        break;
                    default:
                        s(this.switcher).add("switchery-default")
                }
            }, i.prototype.colorize = function() {
                var t = this.switcher.offsetHeight / 2;
                this.switcher.style.backgroundColor = this.options.color, this.switcher.style.borderColor = this.options.color, this.switcher.style.boxShadow = "inset 0 0 0 " + t + "px " + this.options.color, this.jack.style.backgroundColor = this.options.jackColor
            }, i.prototype.handleOnchange = function(t) {
                if (document.dispatchEvent) {
                    var e = document.createEvent("HTMLEvents");
                    e.initEvent("change", !0, !0), this.element.dispatchEvent(e)
                } else this.element.fireEvent("onchange")
            }, i.prototype.handleChange = function() {
                var t = this,
                    e = this.element;
                e.addEventListener ? e.addEventListener("change", function() { t.setPosition() }) : e.attachEvent("onchange", function() { t.setPosition() })
            }, i.prototype.handleClick = function() {
                var t = this.switcher;
                r(t), this.events.bind("click", "bindClick")
            }, i.prototype.bindClick = function() {
                var t = "label" !== this.element.parentNode.tagName.toLowerCase();
                this.setPosition(t), this.handleOnchange(this.element.checked)
            }, i.prototype.markAsSwitched = function() { this.element.setAttribute("data-switchery", !0) }, i.prototype.markedAsSwitched = function() { return this.element.getAttribute("data-switchery") }, i.prototype.init = function() { this.hide(), this.show(), this.setSize(), this.setPosition(), this.markAsSwitched(), this.handleChange(), this.handleClick() }, i.prototype.isChecked = function() { return this.element.checked }, i.prototype.isDisabled = function() { return this.options.disabled || this.element.disabled || this.element.readOnly }, i.prototype.destroy = function() { this.events.unbind() }, i.prototype.enable = function() { this.options.disabled && (this.options.disabled = !1), this.element.disabled && (this.element.disabled = !1), this.element.readOnly && (this.element.readOnly = !1), this.switcher.style.opacity = 1, this.events.bind("click", "bindClick") }, i.prototype.disable = function() { this.options.disabled || (this.options.disabled = !0), this.element.disabled || (this.element.disabled = !0), this.element.readOnly || (this.element.readOnly = !0), this.switcher.style.opacity = this.options.disabledOpacity, this.destroy() }
        }), "object" == typeof exports ? module.exports = t("switchery") : "function" == typeof define && define.amd ? define("Switchery", [], function() { return t("switchery") }) : (this || window).Switchery = t("switchery")
    }(), $(function() {
        function t() { $("#name").html($("#field-name").val()), $("#name1").html($("#field-name").val()), $("#phone").width() > 320 ? $("#name").width() > 155 ? ($("#name").addClass("name-fixed"), $("#name").width() > 220 && e(220)) : $("#name").removeClass("name-fixed") : $("#name").width() > 104 ? ($("#name").addClass("name-fixed"), $("#name").width() > 151 && e(151)) : $("#name").removeClass("name-fixed") }

        function e(t) { for (var e = $("#name").html(); $("#name").width() > t;) e = (e = e.substr(0, e.length - 1)).replace(/\s*$/, ""), e += "...", $("#name").html(e), e = e.substr(0, e.length - 3) }

        function n(t) { l = t.parent().parent().attr("id"), l = l.replace("message-", ""), h = $("#bubble-" + l).find("span").html(), $("#bubble-" + l).find("span").html(t.val()), "" != t.val() ? "" == h && ($("#bubble-" + l).css("top", "75px"), $("#bubble-" + l).fadeIn({ queue: !1 }), $("#bubble-" + l).animate({ top: "0px" }, 500)) : $("#bubble-" + l).fadeOut(), $(window).width() > 568 ? (!u && $(".body").height() > 668 && ($(".message-warning-big").fadeIn(500), u = !0), !d && $(".body").height() > 1200 && ($(".message-warning-max").fadeIn(500), d = !0), u && $(".body").height() <= 668 && ($(".message-warning-big").fadeOut(250), u = !1), d && $(".body").height() <= 1200 && ($(".message-warning-max").fadeOut(250), d = !1)) : (!u && $(".body").height() > 446 && ($(".message-warning-big").fadeIn(500), u = !0), !d && $(".body").height() > 800 && ($(".message-warning-max").fadeIn(500), d = !0), u && $(".body").height() <= 446 && ($(".message-warning-big").fadeOut(250), u = !1), d && $(".body").height() <= 800 && ($(".message-warning-max").fadeOut(250), d = !1)) }

        function i(t) { $(".prompt").addClass("prompt-active"), $(".promptContent").html(t) }

        function o() { $(".prompt").removeClass("prompt-active"), setTimeout(function() { r() }, 200) }

        function r() { $("#promptContent").html("") }
        $(".text-message-form").length && document.forms[0].reset(), $("#preloader").fadeIn(0);
        for (var s = document.querySelectorAll(".switchery"), a = 0; a < s.length; a++) new Switchery(s[a]);
        $(document).on("click", ".sectionHeader", function() { $(this).parent().find(".settings").slideToggle() }), $("#field-name").focusin(function() { "Name" == $(this).val() && $(this).val("") }), $("#field-name").focusout(function() { "" == $(this).val() && $(this).val("Name"), t() }), $("#field-name").keyup(function() { t() }), $("#title-name").click(function() { $("#field-name").focus() }), $("#field-blackout").change(function() { $(this).is(":checked") ? ($(".blackout").fadeIn(), $("#name").fadeOut()) : ($(".blackout").fadeOut(), $("#name").fadeIn()) });
        var c = 1;
        $("#addMessage").click(function() {
            messageBarHTML = '<div class="setting message" id="message-' + c + '"><div class="settingOption"><input type="text" class="field-message" name="message-' + c + '" placeholder="Message..." /><div class="color grey colorActive"></div><div class="color blue"></div><div class="color green"></div> <div class="color delete" id="' + c + '">x</div> <select class="field-message-color" name="message-color-' + c + '"><option>w</option><option>b</option><option>g</option></select></div></div>', bubbleHTML = '<div class="bubbleWrap" id="bubble-' + c + '"><div class="bubble grey"><span></span><div class="corner"></div></div></div>';


            var countMessages = [];
            $('.field-message').each(function(index, element) {
                countMessages.push($(element).val());
            });

            var len = countMessages.length;



            
            if(len < 9){
                $(".messages").append(messageBarHTML), $(".body").append(bubbleHTML), $("#message-" + c).find("input").focus(), c++,
                $(".delete").click(function() {
                    test = $('.field-message').first().val();
                    id = $(this).attr('id');
                    $("#message-" + id + "").remove();
                    $("#bubble-" + id + "").remove();

                })
            }else if(len >=9 && len<18){
                $('#phone1').show();
                $('#btn-Preview-Image1').css('display', 'inline-block');
                $('#btn-Convert-Html2Image1').css('display', 'inline-block');
                $(".messages").append(messageBarHTML), $(".body2").append(bubbleHTML), $("#message-" + c).find("input").focus(), c++,
                $(".delete").click(function() {
                    test = $('.field-message').first().val();
                    id = $(this).attr('id');
                    $("#message-" + id + "").remove();
                    $("#bubble-" + id + "").remove();

                })
            }

        }),
        
        $(document).on("click", ".color", function() { $(this).parent().find(".color").removeClass("colorActive"), $(this).addClass("colorActive"), l = $(this).parent().parent().attr("id"), l = l.replace("message-", ""), $("#bubble-" + l).find(".bubble").removeClass("grey blue green"), $(this).hasClass("grey") ? ($("#bubble-" + l).find(".bubble").addClass("grey"), $("#message-" + l).find(".field-message-color").val("w")) : $(this).hasClass("blue") ? ($("#bubble-" + l).find(".bubble").addClass("blue"), $("#message-" + l).find(".field-message-color").val("b")) : ($("#bubble-" + l).find(".bubble").addClass("green"), $("#message-" + l).find(".field-message-color").val("g")) });
        var l = 0,
            h = "",
            u = !1,
            d = !1;
        $(document).on("change keyup blur input", ".field-message", function() { n($(this)) });
        var p = 0;
        $(function() { $("#slider-level").slider({ range: "min", value: 75, min: 0, max: 100, slide: function(t, e) { $("#field-level").val(e.value + "%"), $(".percent").html(e.value + "%"), p = Math.ceil(30 * e.value / 100), $(".juice").css("width", p), e.value <= 20 ? $(".juice").css("background-color", "#ff3b30") : $(".juice").css("background-color", "#000") } }), $("#field-level").val($("#slider-level").slider("value") + "%") }), $("#field-percent").change(function() { $(this).is(":checked") ? $(".percent").fadeIn() : $(".percent").fadeOut() }), $("#field-battery").change(function() { $(this).is(":checked") ? $(".battery").fadeIn() : $(".battery").fadeOut() }), $(function() { $("#slider-signal").slider({ range: "min", value: 3, min: 0, max: 5, slide: function(t, e) { $("#field-signal").val(e.value), $("#barsAmount, #barsAmountSetting").removeClass("bars0 bars1 bars2 bars3 bars4 bars5"), $("#barsAmount, #barsAmountSetting").addClass("bars" + e.value) } }), $("#field-signal").val($("#slider-signal").slider("value")) }), $("#field-network").keyup(function() { $(".network").html($(this).val()) }), $("#title-network").click(function() { $("#field-network").focus() }), $("#field-connection").change(function() { "WiFi" == $(this).val() ? $(".connection").html("<img src='images/icon_wifi.png' class='icon-wifi' />") : "none" != $(this).val() ? $(".connection").html($(this).val()) : $(".connection").html("") }), $("#title-connection").click(function() { $("#field-connection").focus() }), $("#field-airplane").change(function() { $(this).is(":checked") ? ($(".connectionWrapper").fadeOut(), $(".airplane").css("left", "-30px"), $(".airplane").fadeIn({ queue: !1 }), $(".airplane").animate({ left: "0px" }, 500)) : ($(".connectionWrapper").fadeIn(), $(".airplane").fadeOut({ queue: !1 }), $(".airplane").animate({ left: "120px" }, 450)) }), $("#field-time").keyup(function() { $(".time").html($(this).val()) }), $("#title-time").click(function() { $("#field-time").focus() }), $("#field-bluetooth").change(function() { $(this).is(":checked") ? $(".bluetooth").fadeIn() : $(".bluetooth").fadeOut() }), $("#field-alarm").change(function() { $(this).is(":checked") ? $(".alarm").fadeIn() : $(".alarm").fadeOut() }), $("#field-lock").change(function() { $(this).is(":checked") ? $(".lock").fadeIn() : $(".lock").fadeOut() }), $("#field-disturb").change(function() { $(this).is(":checked") ? $(".moon").fadeIn() : $(".moon").fadeOut() }), $("#field-messageArea").change(function() { $(".messageArea").html($(this).val()) }), $("#title-messageArea").click(function() { $("#field-messageArea").focus() }), $("#field-sendButton").change(function() { "Microphone" == $(this).val() ? $(".sendButton").html("<img src='images/icon_mic.png' class='icon-mic' />") : $(".sendButton").html("<img src='images/icon_send.png' class='icon-send' />") }), $("#title-sendButton").click(function() { $("#field-sendButton").focus() }), $("#createButton").click(function(t) {
            $(this).hasClass("disabledButton") || ($(this).addClass("disabledButton"), $(this).html("Creating Image..."), $(".phoneSmall").removeClass("phoneSmall"), html2canvas($("#phone")).then(function(t) {
                $("#display").append(t);
                var e = t.toDataURL("image/png");
                $("#base64").val(e), $("#submit").click()
            }))
        }), $(window).keydown(function(t) { if (13 == t.keyCode) return t.preventDefault(), !1 }), $(".mobile-menu-icon").click(function() { $(".mobile-menu").toggleClass("mobile-menu-active"), $(".mobile-menu-bg").toggleClass("mobile-menu-bg-active") }), $(".mobile-menu-bg").click(function() { $(".mobile-menu").toggleClass("mobile-menu-active"), $(".mobile-menu-bg").toggleClass("mobile-menu-bg-active") }), $(".title-app-clickable").click(function() { $(".mobile-menu").toggleClass("mobile-menu-active"), $(".mobile-menu-bg").toggleClass("mobile-menu-bg-active") }), $(document).on("click", ".savedButton-delete", function() { i("<h4>Delete Image</h4><p>Are you sure you want to delete this image?</p><div class='android-buttons'><div class='android-button android-button-cancel'>Cancel</div><a class='android-button android-button-delete android-button-last' href='" + $(this).attr("deletelink") + "'>Delete</a></div>") }), $(".promptBG").click(function() { o() }), $(".promptExitButton").click(function() { o() }), $(".prompt").on("click", ".android-button-cancel", function() { o() })
    }), $(function() {
        function t() {
            var t = $(".tutorial-step").length;
            $(".tutorial-step").each(function(e) { $(this).addClass("tutorial-step-" + e), 0 == e && $(this).addClass("tutorial-step-first"), e == t - 1 && $(this).addClass("tutorial-step-last") }), k = $(window).width(), d = 0, p = $(".tutorial-steps"), g = $(".tutorial-steps .triangle"), e(d)
        }

        function e(t) { f = $(".tutorial-step-" + t), $(".tutorial-step").hide(), f.show(), f.hasClass("tutorial-step-0") ? p.addClass("tutorial-steps-first") : (p.removeClass("tutorial-steps-first"), f.hasClass("tutorial-step-last") ? p.addClass("tutorial-steps-last") : p.removeClass("tutorial-steps-last")), $(".tutorial-highlight").removeClass("tutorial-highlight"), (m = f.attr("tutorial-highlight")) ? ((m = $(m)).addClass("tutorial-highlight"), a = m.offset(), c = a.top, l = a.left, h = m.outerHeight(), u = m.outerWidth(), b = f[0].hasAttribute("tutorial-position") && "" != f.attr("tutorial-position") ? f.attr("tutorial-position") : C, p.removeClass("tutorial-steps-default"), p.removeClass("tutorial-position-bottom"), p.removeClass("tutorial-position-top"), p.removeClass("tutorial-position-left"), p.removeClass("tutorial-position-right"), "bottom" == b ? (v = c + h + E, y = l + u / 2 - p.outerWidth() / 2, p.addClass("tutorial-position-bottom")) : "top" == b ? (v = c - p.outerHeight() - E, y = l + u / 2 - p.outerWidth() / 2, p.addClass("tutorial-position-top")) : "left" == b ? (v = c + h / 2 - p.outerHeight() / 2, y = l - p.outerWidth() - E, p.addClass("tutorial-position-left")) : "right" == b && (v = c + h / 2 - p.outerHeight() / 2, y = l + m.outerWidth() + E, p.addClass("tutorial-position-right")), $(window).width() < T && (b = f[0].hasAttribute("tutorial-position-mobile") && "" != f.attr("tutorial-position-mobile") ? f.attr("tutorial-position-mobile") : C, p.removeClass("tutorial-steps-default"), p.removeClass("tutorial-position-bottom"), p.removeClass("tutorial-position-top"), p.removeClass("tutorial-position-left"), p.removeClass("tutorial-position-right"), "bottom" == b ? (v = c + h + E, y = l + u / 2 - p.outerWidth() / 2, p.addClass("tutorial-position-bottom")) : "top" == b && (v = c - p.outerHeight() - E, y = l + u / 2 - p.outerWidth() / 2, p.addClass("tutorial-position-top"))), p.css("top", v + "px"), p.css("left", y + "px")) : p.addClass("tutorial-steps-default"), w = $(window).scrollTop(), x = w + $(window).height(), (p.offset().top < w || p.offset().top + p.outerHeight() > x) && ("top" == b ? $("html, body").animate({ scrollTop: p.offset().top - 20 }, 200) : $("html, body").animate({ scrollTop: p.offset().top + p.outerHeight() - $(window).height() + 20 }, 200)) }

        function n() { e(++d) }

        function i() { e(--d) }

        function o() { setTimeout(function() { e(d) }, 100) }

        function r() { $(".tutorial").addClass("tutorial-exited"), $(".footerSection").addClass("tutorial-exited-footerSection"), $(".tutorial-highlight").removeClass("tutorial-highlight") }

        function s() { $(".tutorial").removeClass("tutorial-exited"), $(".footerSection").removeClass("tutorial-exited-footerSection"), e(d) }
        var a, c, l, h, u, d, p, f, m, g, v, y, b, w, x, k, E = 13,
            C = "bottom",
            T = 568;
        $(".tutorial").length && setTimeout(function() { t() }, 100), $(".tutorial").on("click", ".tutorial-control-next", function() { n() }), $(".tutorial").on("click", ".tutorial-control-prev", function() { i() }), $(".tutorial").on("click", ".tutorial-exit-button", function() { r() }), $(".tutorial").on("click", ".tutorial-steps-last .tutorial-control-next", function() { r(), d = 0 }), $(document).on("click", ".tutorial-restart-button", function() { s() }), $(window).resize(function() { k != $(window).width() && (k = $(window).width(), o()) }), $(document).on("click", "#addMessage", function() { 4 == d ? o() : 5 == d && o() }), $(document).on("click", ".sectionHeader", function() { 7 == d && setTimeout(function() { o() }) })
    });