(window.PP = {}),
  (window.PP.utils = {}),
  (function(e, t) {
    var n = e.PP;
    (n.utils.loadJS = function(e, t) {
      'use strict';
      var n = window.document.getElementsByTagName('script')[0],
        o = window.document.createElement('script');
      return (
        (o.src = e),
        (o.async = !0),
        n.parentNode.insertBefore(o, n),
        t && 'function' == typeof t && (o.onload = t),
        o
      );
    }),
      (n.utils.cookie = function(e, n, o) {
        if (n === t) {
          var i = ('; ' + window.document.cookie).split('; ' + e + '=');
          return 2 === i.length
            ? i
                .pop()
                .split(';')
                .shift()
            : null;
        }
        var a;
        if ((!1 === n && (o = -1), o)) {
          var s = new Date();
          s.setTime(s.getTime() + 24 * o * 60 * 60 * 1e3),
            (a = '; expires=' + s.toGMTString());
        } else a = '';
        window.document.cookie = e + '=' + n + a + '; path=/';
      }),
      (n.utils.featureTest = function(e, t, n) {
        var o = e + ':',
          i = document.createElement('test').style;
        return (
          (i.cssText = n
            ? o + t
            : o +
              ['-webkit-', '-moz-', '-ms-', '-o-', '']
                .join(t + ';' + o)
                .slice(0, -o.length)),
          -1 !== i[e].indexOf(t)
        );
      });
  })(this),
  (function() {
    'use strict';
    var e,
      t = [];
    function n() {
      for (; t.length; ) t[0](), t.shift();
    }
    function o(e) {
      (this.a = i), (this.b = void 0), (this.f = []);
      var t = this;
      try {
        e(
          function(e) {
            !(function e(t, n) {
              if (t.a == i) {
                if (n == t) throw new TypeError();
                var o = !1;
                try {
                  var a = n && n.then;
                  if (
                    null != n &&
                    'object' == typeof n &&
                    'function' == typeof a
                  )
                    return void a.call(
                      n,
                      function(n) {
                        o || e(t, n), (o = !0);
                      },
                      function(e) {
                        o || s(t, e), (o = !0);
                      }
                    );
                } catch (e) {
                  return void (o || s(t, e));
                }
                (t.a = 0), (t.b = n), r(t);
              }
            })(t, e);
          },
          function(e) {
            s(t, e);
          }
        );
      } catch (e) {
        s(t, e);
      }
    }
    e = function() {
      setTimeout(n);
    };
    var i = 2;
    function a(e) {
      return new o(function(t) {
        t(e);
      });
    }
    function s(e, t) {
      if (e.a == i) {
        if (t == e) throw new TypeError();
        (e.a = 1), (e.b = t), r(e);
      }
    }
    function r(n) {
      !(function(n) {
        t.push(n), 1 == t.length && e();
      })(function() {
        if (n.a != i)
          for (; n.f.length; ) {
            var e = (a = n.f.shift())[0],
              t = a[1],
              o = a[2],
              a = a[3];
            try {
              0 == n.a
                ? o('function' == typeof e ? e.call(void 0, n.b) : n.b)
                : 1 == n.a &&
                  ('function' == typeof t ? o(t.call(void 0, n.b)) : a(n.b));
            } catch (e) {
              a(e);
            }
          }
      });
    }
    (o.prototype.g = function(e) {
      return this.c(void 0, e);
    }),
      (o.prototype.c = function(e, t) {
        var n = this;
        return new o(function(o, i) {
          n.f.push([e, t, o, i]), r(n);
        });
      }),
      window.Promise ||
        ((window.Promise = o),
        (window.Promise.resolve = a),
        (window.Promise.reject = function(e) {
          return new o(function(t, n) {
            n(e);
          });
        }),
        (window.Promise.race = function(e) {
          return new o(function(t, n) {
            for (var o = 0; o < e.length; o += 1) a(e[o]).c(t, n);
          });
        }),
        (window.Promise.all = function(e) {
          return new o(function(t, n) {
            function o(n) {
              return function(o) {
                (s[n] = o), (i += 1) == e.length && t(s);
              };
            }
            var i = 0,
              s = [];
            0 == e.length && t(s);
            for (var r = 0; r < e.length; r += 1) a(e[r]).c(o(r), n);
          });
        }),
        (window.Promise.prototype.then = o.prototype.c),
        (window.Promise.prototype.catch = o.prototype.g));
  })(),
  (function() {
    function e(e, t) {
      document.addEventListener
        ? e.addEventListener('scroll', t, !1)
        : e.attachEvent('scroll', t);
    }
    function t(e) {
      (this.a = document.createElement('div')),
        this.a.setAttribute('aria-hidden', 'true'),
        this.a.appendChild(document.createTextNode(e)),
        (this.b = document.createElement('span')),
        (this.c = document.createElement('span')),
        (this.h = document.createElement('span')),
        (this.f = document.createElement('span')),
        (this.g = -1),
        (this.b.style.cssText =
          'max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;'),
        (this.c.style.cssText =
          'max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;'),
        (this.f.style.cssText =
          'max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;'),
        (this.h.style.cssText =
          'display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;'),
        this.b.appendChild(this.h),
        this.c.appendChild(this.f),
        this.a.appendChild(this.b),
        this.a.appendChild(this.c);
    }
    function n(e, t) {
      e.a.style.cssText =
        'max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:' +
        t +
        ';';
    }
    function o(e) {
      var t = e.a.offsetWidth,
        n = t + 100;
      return (
        (e.f.style.width = n + 'px'),
        (e.c.scrollLeft = n),
        (e.b.scrollLeft = e.b.scrollWidth + 100),
        e.g !== t && ((e.g = t), !0)
      );
    }
    function i(t, n) {
      function i() {
        var e = a;
        o(e) && e.a.parentNode && n(e.g);
      }
      var a = t;
      e(t.b, i), e(t.c, i), o(t);
    }
    function a(e, t) {
      var n = t || {};
      (this.family = e),
        (this.style = n.style || 'normal'),
        (this.weight = n.weight || 'normal'),
        (this.stretch = n.stretch || 'normal');
    }
    var s = null,
      r = null,
      c = null,
      l = null;
    function d() {
      return null === l && (l = !!document.fonts), l;
    }
    function u(e, t) {
      return [
        e.style,
        e.weight,
        (function() {
          if (null === c) {
            var e = document.createElement('div');
            try {
              e.style.font = 'condensed 100px sans-serif';
            } catch (e) {}
            c = '' !== e.style.font;
          }
          return c;
        })()
          ? e.stretch
          : '',
        '100px',
        t,
      ].join(' ');
    }
    (a.prototype.load = function(e, o) {
      var a = this,
        c = e || 'BESbswy',
        l = 0,
        f = o || 3e3,
        h = new Date().getTime();
      return new Promise(function(e, o) {
        if (
          d() &&
          !(function() {
            if (null === r)
              if (d() && /Apple/.test(window.navigator.vendor)) {
                var e = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(
                  window.navigator.userAgent
                );
                r = !!e && 603 > parseInt(e[1], 10);
              } else r = !1;
            return r;
          })()
        ) {
          var p = new Promise(function(e, t) {
              !(function n() {
                new Date().getTime() - h >= f
                  ? t()
                  : document.fonts.load(u(a, '"' + a.family + '"'), c).then(
                      function(t) {
                        1 <= t.length ? e() : setTimeout(n, 25);
                      },
                      function() {
                        t();
                      }
                    );
              })();
            }),
            m = new Promise(function(e, t) {
              l = setTimeout(t, f);
            });
          Promise.race([m, p]).then(
            function() {
              clearTimeout(l), e(a);
            },
            function() {
              o(a);
            }
          );
        } else
          !(function(e) {
            document.body
              ? e()
              : document.addEventListener
              ? document.addEventListener('DOMContentLoaded', function t() {
                  document.removeEventListener('DOMContentLoaded', t), e();
                })
              : document.attachEvent('onreadystatechange', function t() {
                  ('interactive' != document.readyState &&
                    'complete' != document.readyState) ||
                    (document.detachEvent('onreadystatechange', t), e());
                });
          })(function() {
            function r() {
              var t;
              (t =
                (-1 != w && -1 != g) ||
                (-1 != w && -1 != v) ||
                (-1 != g && -1 != v)) &&
                ((t = w != g && w != v && g != v) ||
                  (null === s &&
                    ((t = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(
                      window.navigator.userAgent
                    )),
                    (s =
                      !!t &&
                      (536 > parseInt(t[1], 10) ||
                        (536 === parseInt(t[1], 10) &&
                          11 >= parseInt(t[2], 10))))),
                  (t =
                    s &&
                    ((w == y && g == y && v == y) ||
                      (w == b && g == b && v == b) ||
                      (w == T && g == T && v == T)))),
                (t = !t)),
                t &&
                  (x.parentNode && x.parentNode.removeChild(x),
                  clearTimeout(l),
                  e(a));
            }
            var d = new t(c),
              p = new t(c),
              m = new t(c),
              w = -1,
              g = -1,
              v = -1,
              y = -1,
              b = -1,
              T = -1,
              x = document.createElement('div');
            (x.dir = 'ltr'),
              n(d, u(a, 'sans-serif')),
              n(p, u(a, 'serif')),
              n(m, u(a, 'monospace')),
              x.appendChild(d.a),
              x.appendChild(p.a),
              x.appendChild(m.a),
              document.body.appendChild(x),
              (y = d.a.offsetWidth),
              (b = p.a.offsetWidth),
              (T = m.a.offsetWidth),
              (function e() {
                if (new Date().getTime() - h >= f)
                  x.parentNode && x.parentNode.removeChild(x), o(a);
                else {
                  var t = document.hidden;
                  (!0 !== t && void 0 !== t) ||
                    ((w = d.a.offsetWidth),
                    (g = p.a.offsetWidth),
                    (v = m.a.offsetWidth),
                    r()),
                    (l = setTimeout(e, 50));
                }
              })(),
              i(d, function(e) {
                (w = e), r();
              }),
              n(d, u(a, '"' + a.family + '",sans-serif')),
              i(p, function(e) {
                (g = e), r();
              }),
              n(p, u(a, '"' + a.family + '",serif')),
              i(m, function(e) {
                (v = e), r();
              }),
              n(m, u(a, '"' + a.family + '",monospace'));
          });
      });
    }),
      'object' == typeof module
        ? (module.exports = a)
        : ((window.FontFaceObserver = a),
          (window.FontFaceObserver.prototype.load = a.prototype.load));
  })(),
  (window.googletag = window.googletag || {}),
  (googletag.cmd = googletag.cmd || []);
var htlbid = htlbid || {};
(htlbid.que = htlbid.que || []),
  (htlbid.opts = htlbid.opts || {}),
  (function() {
    var e = document.createElement('script');
    (e.type = 'text/javascript'),
      (e.async = !0),
      (e.src = '//htl.bid/build/bidder-propublica.js');
    var t = document.getElementsByTagName('head')[0];
    t.insertBefore(e, t.firstChild);
  })(),
  googletag.cmd.push(function() {
    htlbid.init(),
      googletag.pubads().setCentering(!0),
      googletag.pubads().collapseEmptyDivs(),
      googletag.pubads().setTargeting('is_testing', 'no'),
      googletag.enableServices();
  }),
  (function(e, t) {
    'use strict';
    e.PP.utils;
    var n = [];
    if ('sessionStorage' in window) {
      if ('loaded' === sessionStorage.getItem('fontsLoaded'))
        n.push('fonts-loaded');
      else {
        var o = new FontFaceObserver('Tiempos Text', { weight: 400 }),
          i = new FontFaceObserver('Tiempos Text', {
            style: 'italic',
            weight: 400,
          }),
          a = new FontFaceObserver('Tiempos Text', { weight: 700 }),
          s = new FontFaceObserver('Tiempos Text', {
            style: 'italic',
            weight: 700,
          }),
          r = new FontFaceObserver('Graphik', { weight: 400 }),
          c = new FontFaceObserver('Graphik', { style: 'italic', weight: 400 }),
          l = new FontFaceObserver('Graphik', { weight: 700 }),
          d = new FontFaceObserver('Graphik', { style: 'italic', weight: 700 });
        e.Promise.all([
          o.load(),
          i.load(),
          a.load(),
          s.load(),
          r.load(),
          c.load(),
          l.load(),
          d.load(),
        ]).then(function() {
          (e.document.documentElement.className += ' fonts-loaded'),
            sessionStorage.setItem('fontsLoaded', 'loaded');
        });
      }
    }
    e.document.documentElement.className += ' ' + n.join(' ');
  })(this);
