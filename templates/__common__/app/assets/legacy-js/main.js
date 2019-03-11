!(function(t, e) {
  var n = 'fixed-supported',
    i = t.document.createElement('div'),
    a = t.navigator.userAgent,
    o = t.document.documentElement;
  function s() {
    var a =
      'scrollTop' in t.document.body ? t.document.body.scrollTop : o.scrollTop;
    a !== e &&
      a > 0 &&
      t.document.body &&
      (t.document.body.insertBefore(i, t.document.body.firstChild),
      (i.getBoundingClientRect && 0 === i.getBoundingClientRect().top) ||
        (o.className = o.className.replace(n, '')),
      t.document.body.removeChild(i),
      t.removeEventListener
        ? t.removeEventListener('scroll', s, !1)
        : t.detachEvent('onscroll', s));
  }
  (i.style.position = 'fixed'),
    (i.style.top = 0),
    (a.match(/Android 2\.[1256]/) &&
      a.indexOf('AppleWebKit') > -1 &&
      a.match(/Opera Mobi\/([0-9]+)/) &&
      RegExp.$1 < 7458 &&
      t.operamini &&
      '[object OperaMini]' === {}.toString.call(t.operamini) &&
      a.match(/Fennec\/([0-9]+)/) &&
      RegExp.$1 < 6) ||
      ((o.className += ' ' + n),
      t.addEventListener
        ? t.addEventListener('scroll', s, !1)
        : t.attachEvent('onscroll', s)),
    (t.FixedFixed = s);
})(this),
  (function(t, e) {
    'object' == typeof exports && 'undefined' != typeof module
      ? (module.exports = e())
      : 'function' == typeof define && define.amd
      ? define(e)
      : (t.stickybits = e());
  })(this, function() {
    'use strict';
    function t(t, e) {
      return (
        (this.el = t),
        (this.se = (e && e.scrollEl) || window),
        (this.offset = (e && e.stickyBitStickyOffset) || 0),
        (this.vp = (e && e.verticalPosition) || 'top'),
        (this.useClasses = (e && e.useStickyClasses) || !1),
        (this.ns = (e && e.noStyles) || !1),
        (this.styles = this.el.style),
        this.setStickyPosition(),
        ('fixed' !== this.positionVal && !0 !== this.useClasses) ||
          this.manageStickiness(),
        this
      );
    }
    return (
      (t.prototype.setStickyPosition = function() {
        for (
          var t = ['', '-o-', '-webkit-', '-moz-', '-ms-'],
            e = this.styles,
            n = this.vp,
            i = 0;
          i < t.length;
          i += 1
        )
          e.position = t[i] + 'sticky';
        return (
          '' !== e.position
            ? ((this.positionVal = e.position),
              'top' !== n || this.ns || (e[n] = this.offset + 'px'))
            : (this.positionVal = 'fixed'),
          this
        );
      }),
      (t.prototype.manageStickiness = function() {
        function t(t, n) {
          var i = e.className.split(' ');
          n && -1 === i.indexOf(n) && i.push(n);
          var a = i.indexOf(t);
          -1 !== a && i.splice(a, 1), (e.className = i.join(' '));
        }
        var e = this.el,
          n = e.parentNode,
          i = this.positionVal,
          a = this.vp,
          o = this.styles,
          s = this.ns,
          r = this.se,
          l = r === window,
          c = l || 'fixed' !== i ? 0 : r.getBoundingClientRect().top,
          d = c + this.offset,
          h =
            void 0 !== r.requestAnimationFrame
              ? r.requestAnimationFrame
              : function(t) {
                  t();
                };
        n.className += ' js-stickybit-parent';
        var u = l
            ? n.getBoundingClientRect().top
            : n.getBoundingClientRect().top - c,
          p = u + n.offsetHeight - (e.offsetHeight - d),
          f = 'default';
        return (
          (this.manageState = function() {
            var e = l ? r.scrollY || r.pageYOffset : r.scrollTop,
              n = e < u && 'sticky' === f,
              c = e > p && 'sticky' === f;
            e > u && e < p && ('default' === f || 'stuck' === f)
              ? ((f = 'sticky'),
                h(function() {
                  t('js-is-stuck', 'js-is-sticky'),
                    (o.position = i),
                    s || ((o.bottom = ''), (o[a] = d + 'px'));
                }))
              : n
              ? ((f = 'default'),
                h(function() {
                  t('js-is-sticky'), 'fixed' === i && (o.position = '');
                }))
              : c &&
                ((f = 'stuck'),
                h(function() {
                  t('js-is-sticky', 'js-is-stuck'),
                    'fixed' !== i ||
                      s ||
                      ((o.top = ''),
                      (o.bottom = '0'),
                      (o.position = 'absolute'));
                }));
          }),
          r.addEventListener('scroll', this.manageState),
          this
        );
      }),
      (t.prototype.cleanup = function() {
        function t(t, e) {
          var n = t,
            i = n.className.split(' '),
            a = i.indexOf(e);
          -1 !== a && i.splice(a, 1), (n.className = i.join(' '));
        }
        var e = this.el,
          n = this.styles;
        (n.position = ''),
          (n[this.vp] = ''),
          t(e, 'js-is-sticky'),
          t(e, 'js-is-stuck'),
          t(e.parentNode, 'js-stickybit-parent'),
          this.se.removeEventListener('scroll', this.manageState),
          (this.manageState = !1);
      }),
      function(e, n) {
        var i = 'string' == typeof e ? document.querySelectorAll(e) : e;
        'length' in i || (i = [i]);
        for (var a = [], o = 0; o < i.length; o += 1) {
          var s = i[o];
          a.push(new t(s, n));
        }
        return new function(t) {
          this.privateInstances = t || [];
          var e = this.privateInstances;
          this.cleanup = function() {
            for (var t = 0; t < e.length; t += 1) e[t].cleanup();
          };
        }(a);
      }
    );
  }),
  (function(t, e, n, i) {
    var a = 'collapsible',
      o = {
        pluginClass: a,
        collapsedClass: a + '-collapsed',
        expandedClass: a + '-expanded',
        headerClass: a + '-header',
        contentClass: a + '-content',
        enhancedClass: a + '-enhanced',
        instructions: !1,
        innerButton: !1,
        collapsed: !1,
      };
    function s(e, n) {
      this.element = t(e);
      var s = {};
      if (this.element.is('[data-config]'))
        for (var r in o)
          if (o.hasOwnProperty(r)) {
            var l = this.element.attr(
              'data-' +
                r.replace(/[A-Z]/g, function(t) {
                  return '-' + t.toLowerCase();
                })
            );
            l !== i &&
              (s[r] = 'true' === l || 'false' === l ? 'true' === l : l);
          }
      (this.options = t.extend({}, o, s, n)),
        this.element.is('.' + this.options.collapsedClass) &&
          (this.options.collapsed = !0),
        (this._defaults = o),
        (this._name = a),
        this.init();
    }
    (s.prototype = {
      init: function() {
        (this.header = this.element
          .children()
          .filter('.' + this.options.headerClass)),
          this.header.length || (this.header = this.element.children().eq(0)),
          (this.content = this.element
            .children()
            .filter('.' + this.options.contentClass)),
          this.content.length || (this.content = this.header.next()),
          this.options.innerButton &&
            ((this.headerHTML = this.header.text()),
            (this.headerButton = t('<button></button>').append(
              this.headerHTML
            ))),
          this._addAttributes(),
          this._bindEvents(),
          0,
          this.element.data(a, this),
          this.element.trigger('init');
      },
      _addAttributes: function() {
        this.element
          .addClass(this.options.pluginClass)
          .addClass(this.options.enhancedClass),
          this.header.addClass(this.options.headerClass),
          this._addA11yAttrs(),
          this.content.addClass(this.options.contentClass);
      },
      _addA11yAttrs: function() {
        this.options.innerButton
          ? (this.header.html(''), this.header.append(this.headerButton))
          : (this.header.attr('role', 'button'),
            this.header.attr('tabindex', '0'),
            this.options.instructions &&
              this.header.attr('title', this.options.instructions));
      },
      _removeA11yAttrs: function() {
        this.options.innerButton
          ? (this.header.html(''), this.header.append(this.headerHTML))
          : (this.header.removeAttr('role'),
            this.header.removeAttr('tabindex'),
            this.header.removeAttr('title'));
      },
      _isNonInteractive: function() {
        var t = e.getComputedStyle(this.content[0], null),
          n = e.getComputedStyle(this.header[0], null);
        return (
          this.options.innerButton &&
            (n = e.getComputedStyle(this.headerButton[0], null)),
          'none' !== t.getPropertyValue('display') &&
            'hidden' !== t.getPropertyValue('visibility') &&
            'default' === n.getPropertyValue('cursor')
        );
      },
      _checkInteractivity: function() {
        this._isNonInteractive()
          ? this._removeA11yAttrs()
          : this._addA11yAttrs();
      },
      _bindEvents: function() {
        var n,
          i = this;
        this.header
          .bind('click', function(t) {
            i.toggle(t.target), t.preventDefault();
          })
          .bind('keydown.' + a, function(t) {
            (13 !== t.which && 32 !== t.which) ||
              (i.toggle(t.target), t.preventDefault());
          }),
          this.options.collapsed ? this._collapse() : this._expand(),
          this._checkInteractivity(),
          t(e).bind('resize', function() {
            n && clearTimeout(n),
              (n = setTimeout(function() {
                i._checkInteractivity.call(i);
              }, 150));
          });
      },
      collapsed: !1,
      _expand: function() {
        this.element.removeClass(this.options.collapsedClass),
          this.element.addClass(this.options.expandedClass),
          this.options.innerButton
            ? this.headerButton.attr('aria-expanded', 'true')
            : this.header.attr('aria-expanded', 'true'),
          (this.collapsed = !1);
      },
      expand: function() {
        var e = t(this).data(a) || this;
        e._expand(), e.element.trigger('expand');
      },
      _collapse: function() {
        this.element.addClass(this.options.collapsedClass),
          this.element.removeClass(this.options.expandedClass),
          this.options.innerButton
            ? this.headerButton.attr('aria-expanded', 'false')
            : this.header.attr('aria-expanded', 'false'),
          (this.collapsed = !0);
      },
      collapse: function() {
        var e = t(this).data(a) || this;
        e._collapse(), e.element.trigger('collapse');
      },
      toggle: function() {
        this.collapsed ? this.expand() : this.collapse();
      },
      focusable: "a, input, textarea, select, button, [tabindex='0']",
    }),
      (t.fn[a] = function(e) {
        return this.each(function() {
          t(this).data(a) || new s(this, e);
        });
      }),
      t(n).bind('enhance', function(e) {
        var n = '.' + a;
        t(t(e.target).is(n) && e.target)
          .add(n, e.target)
          .filter(n)
          [a]();
      });
  })(jQuery, window, document),
  (function(t, e, n, i) {
    var a = 'collapsible',
      o = 'data-collapsible-target',
      s = o;
    function r(e) {
      (this.$toggle = e),
        (this.isLink = this.$toggle.is('a[href]')),
        (this.isSelect = !this.isLink && this.$toggle.is('select')),
        (this.isRadio = !this.isSelect && this.$toggle.is("[type='radio']")),
        (this.$target = t(e.attr(o) || e.attr('href'))),
        (this.component = this.$target.data(a));
    }
    function l(t) {
      var e = t.data(s);
      return e || ((e = new r(t)), t.data(s, e)), e;
    }
    (r.prototype.getForcedElement = function() {
      return this.isSelect
        ? this.$toggle.find('option').eq(this.$toggle[0].selectedIndex)
        : this.$toggle;
    }),
      (r.prototype.toggle = function() {
        var t = this.getForcedElement();
        t.is('[data-force-expand]')
          ? this.component.expand()
          : t.is('[data-force-collapse]')
          ? this.component.collapse()
          : t.is('[data-ignore]') || this.component.toggle();
      }),
      (r.prototype.initSelect = function() {
        var t = this;
        this.isSelect &&
          this.$toggle.unbind('change.' + a).bind('change.' + a, function() {
            t.toggle();
          });
      }),
      (r.prototype.onclick = function(e) {
        var n = this;
        this.isLink
          ? (e.preventDefault(), this.toggle())
          : this.isSelect ||
            (this.isRadio
              ? t("[name='" + this.$toggle.attr('name') + "']")
                  .unbind('change.' + a)
                  .bind('change.' + a, function() {
                    n.$toggle[0].checked
                      ? n.component.expand()
                      : n.component.collapse();
                  })
                  .trigger('change')
              : this.toggle());
      }),
      t(n).bind('click.' + a, function(e) {
        t(e.target)
          .closest('[' + o + ']')
          .each(function() {
            var n = l(t(this));
            n.onclick.call(n, e);
          });
      }),
      t(n).bind('enhance', function(e) {
        var n = 'select[' + o + ']';
        t(t(e.target).is(n) && e.target)
          .add(n, e.target)
          .filter(n)
          .each(function() {
            l(t(this)).initSelect();
          });
      });
  })(jQuery, window, document),
  (function(t, e, n, i) {
    t(n).bind('init', function(n) {
      var i = 'collapsible';
      if (t(n.target).is('.collapsible')) {
        var a,
          o = t(n.target),
          s = o.data(i),
          r = o.prev().filter('.collapsible-trigger'),
          l = function() {
            return (
              'absolute' ===
                o.children('.collapsible-content').css('position') ||
              o.is('[data-collapsible-ismenu]')
            );
          },
          c = !1;
        t('body')
          .bind('gesturestart.collapsible', function() {
            c = !0;
          })
          .bind('mousemove.collapsible', function() {
            c = !0;
          })
          .bind(
            'touchstart.collapsible pointerdown.collapsible MSPointerDown.collapsible',
            function(t) {
              a = t.target.getBoundingClientRect().top;
            }
          )
          .bind(
            'focusin.collapsible touchend.collapsible click.collapsible pointerup.collapsible MSPointerUp.collapsible',
            function(e) {
              var s = e.originalEvent ? e.originalEvent.type : e.type;
              ('touchend' !== s && 'pointerup' !== s && 'MSPointerUp' !== s) ||
                (a &&
                  Math.abs(a - e.target.getBoundingClientRect().top) > 5 &&
                  (c = !0)),
                t(e.target).closest(n.target).length ||
                  t(e.target).closest(r).length ||
                  o.data(i).collapsed ||
                  !l() ||
                  !1 !== c ||
                  (setTimeout(function() {
                    o.data(i).collapse();
                  }),
                  t(e.target).closest('a,select,input,textarea,button,label')
                    .length &&
                    !t(e.target).closest('.collapsible-header').length &&
                    e.preventDefault()),
                setTimeout(function() {
                  (a = null), (c = !1);
                }, 200);
            }
          );
        var d,
          h = !1,
          u = o.is('[data-collapsible-hover]'),
          p = o.is("[data-collapsible-hover='exclusive']");
        u &&
          (p && s.header.unbind('click tap'),
          o
            .add(r)
            .bind('touchstart pointerdown MSPointerDown', function(t) {
              var e = t.originalEvent ? t.originalEvent : t;
              (('pointerdown' !== e.type && 'MSPointerDown' !== e.type) ||
                !e.pointerType ||
                ('mouse' !== e.pointerType && 4 !== e.pointerType)) &&
                (h = !0);
            })
            .bind('mouseover.collapsible', function(e) {
              (d = new Date().getTime()),
                !h &&
                  l() &&
                  t(e.target).closest(s.header).length &&
                  o.data(i).expand();
            })
            .bind('mouseleave.collapsible', function() {
              (d = null),
                !h && l() && t(n.target).is(o) && o.data(i).collapse();
            })
            .bind('click', function(n) {
              if (d) {
                var i = new Date().getTime() - d;
                t(n.target).is(s.header) &&
                  l() &&
                  t(n.target).is('a[href]') &&
                  !h &&
                  i > 300 &&
                  (e.location.href = n.target.href);
              }
            }),
          o
            .bind('expand', function() {
              r.addClass('collapsible-trigger-expand');
            })
            .bind('collapse', function() {
              r.removeClass('collapsible-trigger-expand');
            })),
          (s.arrow = function(e, n) {
            var i,
              a = this.content.find(this.focusable);
            if (t(e).is(this.header) && !n) i = a[0];
            else {
              n && (a = a.reverse ? a.reverse() : t(a.get().reverse()));
              var o = !1;
              a.each(function() {
                !i &&
                  o &&
                  this.offsetHeight > 0 &&
                  this.offsetLeft > -1 &&
                  (i = this),
                  o || (o = t(this).is(e));
              });
            }
            i ? i.focus() : this.header[0].focus();
          }),
          s.element.bind('keydown.collapsible', function(t) {
            !s.collapsed &&
              l() &&
              (39 === t.which || 40 === t.which
                ? (s.arrow(t.target), t.preventDefault())
                : (37 !== t.which && 38 !== t.which) ||
                  (s.arrow(t.target, !0), t.preventDefault()));
          });
      }
    });
  })(jQuery, window, document),
  (function(t, e, n, i) {
    t(n).bind('expand.collapsible', function(i) {
      var a = 'data-collapsible-set',
        o = t(i.target);
      if (o.is('.collapsible[data-collapsible-set]')) {
        var s = o.attr(a);
        t('.collapsible-enhanced[' + a + "='" + s + "']")
          .filter(function() {
            return this !== o[0];
          })
          .each(function() {
            var e = t(this).data('collapsible');
            e && e.collapse();
          });
        var r =
          i.target.getBoundingClientRect().top +
          (n.body.scrollY || n.body.scrollTop || n.documentElement.scrollTop);
        (e
          ? 'pageYOffset' in e
            ? e.pageYOffset
            : e.document.documentElement.scrollTop
          : e.document.body.scrollTop) > r && e.scrollTo(0, r);
      }
    });
  })(jQuery, window, document),
  (function(t, e, n) {
    var i = 'tab-active',
      a = { tabindex: '-1', 'aria-selected': !1 },
      o = 0;
    function s(t) {
      t.addClass(i)
        .attr({ 'aria-selected': 'true' })
        .removeAttr('tabindex');
    }
    t(n).bind('init', function(e) {
      var n,
        r,
        l,
        c = t(e.target).closest('.collapsible'),
        d = c.parent(),
        h = d.find('.tabnav');
      if (c.is('.collapsible') && d.is('.tabs')) {
        (r = (n = c.data('collapsible')).content.attr('id')),
          h.find('[aria-controls=' + r + ']').remove(),
          r || ((r = 'collapsible-id-' + ++o), n.content.attr('id', r));
        var u = { id: (l = r + '-link'), 'aria-controls': r, role: 'tab' };
        for (var p in a) u[p] = a[p];
        (n.$tabHeaderListItem = t('<li>').attr('role', 'presentation')),
          (n.$tabHeader = t(
            "<a href='#" + r + "'>" + n.header[0].innerHTML + '</a>'
          ).attr(u)),
          n.header.css('display', 'none'),
          n.content.attr({ 'aria-labeledby': l }),
          n.$tabHeader
            .bind('click', function(t) {
              t.preventDefault(),
                t.stopPropagation(),
                n.$tabHeader.is('.' + i) ||
                  (d
                    .find('.' + i)
                    .removeClass(i)
                    .attr(a),
                  s(n.$tabHeader),
                  n.toggle());
            })
            .bind('keydown', function(t) {
              var e,
                n = h.find('.' + i);
              39 === t.which ? (e = 'next') : 37 === t.which && (e = 'prev'),
                e &&
                  (n
                    .parent()
                    [e]()
                    .find('a')
                    .trigger('click')
                    .focus(),
                  t.preventDefault());
            }),
          h.length ||
            ((h = t("<ul class='tabnav' role='tablist'></nav>")), d.prepend(h)),
          n.collapsed || (s(n.$tabHeader), n._expand()),
          h.append(n.$tabHeaderListItem.append(n.$tabHeader));
      }
    });
  })(jQuery, window, document),
  (function(t, e, n) {
    var i = {
      boundAttr: 'data-ajax-bound',
      interactionAttr: 'data-interaction',
      makeReq: function(e, n, i) {
        t.get(e, function(t, e, i) {
          n.trigger('ajaxIncludeResponse', [t, i]);
        });
      },
      plugins: {},
    };
    (t.fn.ajaxInclude = function(n) {
      var a = [],
        o = t(),
        s = { proxy: null };
      function r(e) {
        var n = e.data('url');
        s.proxy && -1 === t.inArray(n, a)
          ? (a.push(n), (o = o.add(e)))
          : i.makeReq(n, e);
      }
      function l() {
        a.length && (i.makeReq(s.proxy + a.join(','), o), (o = t()), (a = []));
      }
      return (
        'string' == typeof n ? (s.proxy = n) : (s = t.extend(s, n)),
        this.not('[' + i.boundAttr + ']')
          .not('[' + i.interactionAttr + ']')
          .each(function(n) {
            for (
              var a,
                o,
                c = t(this),
                d = c.attr('data-media'),
                h = ['append', 'replace', 'before', 'after'],
                u = !1,
                p = c.attr('data-target'),
                f = h.length,
                g = 0;
              g < f;
              g++
            )
              c.is('[data-' + h[g] + ']') &&
                ((a = h[g]), (o = c.attr('data-' + a)));
            o || ((o = c.attr('href') || c.attr('action')), (u = !0)),
              'replace' === a && (a += 'With'),
              c
                .data('method', a)
                .data('url', o)
                .data('target', p)
                .attr(i.boundAttr, !0)
                .each(function() {
                  for (var t in i.plugins) i.plugins[t].call(this, s);
                })
                .bind('ajaxIncludeResponse', function(e, n, i) {
                  var o = n,
                    r = p ? t(p) : c;
                  if (s.proxy) {
                    var l = new RegExp(
                      '<entry url=["\']?' +
                        c.data('url') +
                        '["\']?>((?:(?!</entry>)(.|\n))*)',
                      'gmi'
                    ).exec(o);
                    l && (o = l[1]);
                  }
                  var d = c.triggerHandler('ajaxIncludeFilter', [o]);
                  d && (o = d),
                    'replaceWith' === a
                      ? (c.trigger('ajaxInclude', [o]), r[c.data('method')](o))
                      : (r[c.data('method')](o), c.trigger('ajaxInclude', [o]));
                }),
              u
                ? i.makeReq(o, c, !0)
                : !d || (e.matchMedia && e.matchMedia(d).matches)
                ? r(c)
                : d &&
                  e.matchMedia &&
                  (function(t, n) {
                    var i = e.matchMedia(n);
                    i.addListener &&
                      i.addListener(function e() {
                        r(t), l(), i.removeListener(e);
                      });
                  })(c, d);
          }),
        l(),
        this
      );
    }),
      (e.AjaxInclude = i);
  })(jQuery, this),
  (function(t) {
    t.fn.appendAround = function() {
      return this.each(function() {
        var e = t(this),
          n = e.parent(),
          i = n[0],
          a = n.attr('data-set'),
          o = t("[data-set='" + a + "']");
        function s(e) {
          return 'none' === t(e).css('display');
        }
        function r() {
          if (s(i)) {
            var t = 0;
            o.each(function() {
              s(this) || t || (e.appendTo(this), t++, (i = this));
            });
          }
        }
        r(), t(window).bind('resize', r);
      });
    };
  })(jQuery),
  (function() {
    'use strict';
    function t(i) {
      if (!i) throw new Error('No options passed to Waypoint constructor');
      if (!i.element)
        throw new Error('No element option passed to Waypoint constructor');
      if (!i.handler)
        throw new Error('No handler option passed to Waypoint constructor');
      (this.key = 'waypoint-' + e),
        (this.options = t.Adapter.extend({}, t.defaults, i)),
        (this.element = this.options.element),
        (this.adapter = new t.Adapter(this.element)),
        (this.callback = i.handler),
        (this.axis = this.options.horizontal ? 'horizontal' : 'vertical'),
        (this.enabled = this.options.enabled),
        (this.triggerPoint = null),
        (this.group = t.Group.findOrCreate({
          name: this.options.group,
          axis: this.axis,
        })),
        (this.context = t.Context.findOrCreateByElement(this.options.context)),
        t.offsetAliases[this.options.offset] &&
          (this.options.offset = t.offsetAliases[this.options.offset]),
        this.group.add(this),
        this.context.add(this),
        (n[this.key] = this),
        (e += 1);
    }
    var e = 0,
      n = {};
    (t.prototype.queueTrigger = function(t) {
      this.group.queueTrigger(this, t);
    }),
      (t.prototype.trigger = function(t) {
        this.enabled && this.callback && this.callback.apply(this, t);
      }),
      (t.prototype.destroy = function() {
        this.context.remove(this), this.group.remove(this), delete n[this.key];
      }),
      (t.prototype.disable = function() {
        return (this.enabled = !1), this;
      }),
      (t.prototype.enable = function() {
        return this.context.refresh(), (this.enabled = !0), this;
      }),
      (t.prototype.next = function() {
        return this.group.next(this);
      }),
      (t.prototype.previous = function() {
        return this.group.previous(this);
      }),
      (t.invokeAll = function(t) {
        var e = [];
        for (var i in n) e.push(n[i]);
        for (var a = 0, o = e.length; o > a; a++) e[a][t]();
      }),
      (t.destroyAll = function() {
        t.invokeAll('destroy');
      }),
      (t.disableAll = function() {
        t.invokeAll('disable');
      }),
      (t.enableAll = function() {
        t.invokeAll('enable');
      }),
      (t.refreshAll = function() {
        t.Context.refreshAll();
      }),
      (t.viewportHeight = function() {
        return window.innerHeight || document.documentElement.clientHeight;
      }),
      (t.viewportWidth = function() {
        return document.documentElement.clientWidth;
      }),
      (t.adapters = []),
      (t.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: 'default',
        horizontal: !1,
        offset: 0,
      }),
      (t.offsetAliases = {
        'bottom-in-view': function() {
          return this.context.innerHeight() - this.adapter.outerHeight();
        },
        'right-in-view': function() {
          return this.context.innerWidth() - this.adapter.outerWidth();
        },
      }),
      (window.Waypoint = t);
  })(),
  (function() {
    'use strict';
    function t(t) {
      window.setTimeout(t, 1e3 / 60);
    }
    function e(t) {
      (this.element = t),
        (this.Adapter = a.Adapter),
        (this.adapter = new this.Adapter(t)),
        (this.key = 'waypoint-context-' + n),
        (this.didScroll = !1),
        (this.didResize = !1),
        (this.oldScroll = {
          x: this.adapter.scrollLeft(),
          y: this.adapter.scrollTop(),
        }),
        (this.waypoints = { vertical: {}, horizontal: {} }),
        (t.waypointContextKey = this.key),
        (i[t.waypointContextKey] = this),
        (n += 1),
        this.createThrottledScrollHandler(),
        this.createThrottledResizeHandler();
    }
    var n = 0,
      i = {},
      a = window.Waypoint,
      o = window.onload;
    (e.prototype.add = function(t) {
      var e = t.options.horizontal ? 'horizontal' : 'vertical';
      (this.waypoints[e][t.key] = t), this.refresh();
    }),
      (e.prototype.checkEmpty = function() {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
          e = this.Adapter.isEmptyObject(this.waypoints.vertical);
        t && e && (this.adapter.off('.waypoints'), delete i[this.key]);
      }),
      (e.prototype.createThrottledResizeHandler = function() {
        function t() {
          e.handleResize(), (e.didResize = !1);
        }
        var e = this;
        this.adapter.on('resize.waypoints', function() {
          e.didResize || ((e.didResize = !0), a.requestAnimationFrame(t));
        });
      }),
      (e.prototype.createThrottledScrollHandler = function() {
        function t() {
          e.handleScroll(), (e.didScroll = !1);
        }
        var e = this;
        this.adapter.on('scroll.waypoints', function() {
          (!e.didScroll || a.isTouch) &&
            ((e.didScroll = !0), a.requestAnimationFrame(t));
        });
      }),
      (e.prototype.handleResize = function() {
        a.Context.refreshAll();
      }),
      (e.prototype.handleScroll = function() {
        var t = {},
          e = {
            horizontal: {
              newScroll: this.adapter.scrollLeft(),
              oldScroll: this.oldScroll.x,
              forward: 'right',
              backward: 'left',
            },
            vertical: {
              newScroll: this.adapter.scrollTop(),
              oldScroll: this.oldScroll.y,
              forward: 'down',
              backward: 'up',
            },
          };
        for (var n in e) {
          var i = e[n],
            a = i.newScroll > i.oldScroll ? i.forward : i.backward;
          for (var o in this.waypoints[n]) {
            var s = this.waypoints[n][o],
              r = i.oldScroll < s.triggerPoint,
              l = i.newScroll >= s.triggerPoint;
            ((r && l) || (!r && !l)) &&
              (s.queueTrigger(a), (t[s.group.id] = s.group));
          }
        }
        for (var c in t) t[c].flushTriggers();
        this.oldScroll = { x: e.horizontal.newScroll, y: e.vertical.newScroll };
      }),
      (e.prototype.innerHeight = function() {
        return this.element == this.element.window
          ? a.viewportHeight()
          : this.adapter.innerHeight();
      }),
      (e.prototype.remove = function(t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty();
      }),
      (e.prototype.innerWidth = function() {
        return this.element == this.element.window
          ? a.viewportWidth()
          : this.adapter.innerWidth();
      }),
      (e.prototype.destroy = function() {
        var t = [];
        for (var e in this.waypoints)
          for (var n in this.waypoints[e]) t.push(this.waypoints[e][n]);
        for (var i = 0, a = t.length; a > i; i++) t[i].destroy();
      }),
      (e.prototype.refresh = function() {
        var t,
          e = this.element == this.element.window,
          n = this.adapter.offset(),
          i = {};
        for (var a in (this.handleScroll(),
        (t = {
          horizontal: {
            contextOffset: e ? 0 : n.left,
            contextScroll: e ? 0 : this.oldScroll.x,
            contextDimension: this.innerWidth(),
            oldScroll: this.oldScroll.x,
            forward: 'right',
            backward: 'left',
            offsetProp: 'left',
          },
          vertical: {
            contextOffset: e ? 0 : n.top,
            contextScroll: e ? 0 : this.oldScroll.y,
            contextDimension: this.innerHeight(),
            oldScroll: this.oldScroll.y,
            forward: 'down',
            backward: 'up',
            offsetProp: 'top',
          },
        }))) {
          var o = t[a];
          for (var s in this.waypoints[a]) {
            var r,
              l,
              c,
              d,
              h = this.waypoints[a][s],
              u = h.options.offset,
              p = h.triggerPoint,
              f = 0,
              g = null == p;
            h.element !== h.element.window &&
              (f = h.adapter.offset()[o.offsetProp]),
              'function' == typeof u
                ? (u = u.apply(h))
                : 'string' == typeof u &&
                  ((u = parseFloat(u)),
                  h.options.offset.indexOf('%') > -1 &&
                    (u = Math.ceil((o.contextDimension * u) / 100))),
              (r = o.contextScroll - o.contextOffset),
              (h.triggerPoint = f + r - u),
              (l = p < o.oldScroll),
              (c = h.triggerPoint >= o.oldScroll),
              (d = !l && !c),
              !g && (l && c)
                ? (h.queueTrigger(o.backward), (i[h.group.id] = h.group))
                : !g && d
                ? (h.queueTrigger(o.forward), (i[h.group.id] = h.group))
                : g &&
                  o.oldScroll >= h.triggerPoint &&
                  (h.queueTrigger(o.forward), (i[h.group.id] = h.group));
          }
        }
        for (var b in i) i[b].flushTriggers();
        return this;
      }),
      (e.findOrCreateByElement = function(t) {
        return e.findByElement(t) || new e(t);
      }),
      (e.refreshAll = function() {
        for (var t in i) i[t].refresh();
      }),
      (e.findByElement = function(t) {
        return i[t.waypointContextKey];
      }),
      (window.onload = function() {
        o && o(), e.refreshAll();
      }),
      (a.requestAnimationFrame = function(e) {
        (
          window.requestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          t
        ).call(window, e);
      }),
      (a.Context = e);
  })(),
  (function() {
    'use strict';
    function t(t, e) {
      return t.triggerPoint - e.triggerPoint;
    }
    function e(t, e) {
      return e.triggerPoint - t.triggerPoint;
    }
    function n(t) {
      (this.name = t.name),
        (this.axis = t.axis),
        (this.id = this.name + '-' + this.axis),
        (this.waypoints = []),
        this.clearTriggerQueues(),
        (i[this.axis][this.name] = this);
    }
    var i = { vertical: {}, horizontal: {} },
      a = window.Waypoint;
    (n.prototype.add = function(t) {
      this.waypoints.push(t);
    }),
      (n.prototype.clearTriggerQueues = function() {
        this.triggerQueues = { up: [], down: [], left: [], right: [] };
      }),
      (n.prototype.flushTriggers = function() {
        for (var n in this.triggerQueues) {
          var i = this.triggerQueues[n],
            a = 'up' === n || 'left' === n;
          i.sort(a ? e : t);
          for (var o = 0, s = i.length; s > o; o += 1) {
            var r = i[o];
            (r.options.continuous || o === i.length - 1) && r.trigger([n]);
          }
        }
        this.clearTriggerQueues();
      }),
      (n.prototype.next = function(e) {
        this.waypoints.sort(t);
        var n = a.Adapter.inArray(e, this.waypoints);
        return n === this.waypoints.length - 1 ? null : this.waypoints[n + 1];
      }),
      (n.prototype.previous = function(e) {
        this.waypoints.sort(t);
        var n = a.Adapter.inArray(e, this.waypoints);
        return n ? this.waypoints[n - 1] : null;
      }),
      (n.prototype.queueTrigger = function(t, e) {
        this.triggerQueues[e].push(t);
      }),
      (n.prototype.remove = function(t) {
        var e = a.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1);
      }),
      (n.prototype.first = function() {
        return this.waypoints[0];
      }),
      (n.prototype.last = function() {
        return this.waypoints[this.waypoints.length - 1];
      }),
      (n.findOrCreate = function(t) {
        return i[t.axis][t.name] || new n(t);
      }),
      (a.Group = n);
  })(),
  (function() {
    'use strict';
    function t(t) {
      this.$element = e(t);
    }
    var e = window.jQuery,
      n = window.Waypoint;
    e.each(
      [
        'innerHeight',
        'innerWidth',
        'off',
        'offset',
        'on',
        'outerHeight',
        'outerWidth',
        'scrollLeft',
        'scrollTop',
      ],
      function(e, n) {
        t.prototype[n] = function() {
          var t = Array.prototype.slice.call(arguments);
          return this.$element[n].apply(this.$element, t);
        };
      }
    ),
      e.each(['extend', 'inArray', 'isEmptyObject'], function(n, i) {
        t[i] = e[i];
      }),
      n.adapters.push({ name: 'jquery', Adapter: t }),
      (n.Adapter = t);
  })(),
  (function() {
    'use strict';
    function t(t) {
      return function() {
        var n = [],
          i = arguments[0];
        return (
          t.isFunction(arguments[0]) &&
            ((i = t.extend({}, arguments[1])).handler = arguments[0]),
          this.each(function() {
            var a = t.extend({}, i, { element: this });
            'string' == typeof a.context &&
              (a.context = t(this).closest(a.context)[0]),
              n.push(new e(a));
          }),
          n
        );
      };
    }
    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)),
      window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto));
  })(),
  (function() {
    'use strict';
    function t() {}
    var e = window.Waypoint;
    function n(t) {
      (this.options = e.Adapter.extend({}, n.defaults, t)),
        (this.axis = this.options.horizontal ? 'horizontal' : 'vertical'),
        (this.waypoints = []),
        (this.element = this.options.element),
        this.createWaypoints();
    }
    (n.prototype.createWaypoints = function() {
      for (
        var t = {
            vertical: [
              { down: 'enter', up: 'exited', offset: '100%' },
              { down: 'entered', up: 'exit', offset: 'bottom-in-view' },
              { down: 'exit', up: 'entered', offset: 0 },
              {
                down: 'exited',
                up: 'enter',
                offset: function() {
                  return -this.adapter.outerHeight();
                },
              },
            ],
            horizontal: [
              { right: 'enter', left: 'exited', offset: '100%' },
              { right: 'entered', left: 'exit', offset: 'right-in-view' },
              { right: 'exit', left: 'entered', offset: 0 },
              {
                right: 'exited',
                left: 'enter',
                offset: function() {
                  return -this.adapter.outerWidth();
                },
              },
            ],
          },
          e = 0,
          n = t[this.axis].length;
        e < n;
        e++
      ) {
        var i = t[this.axis][e];
        this.createWaypoint(i);
      }
    }),
      (n.prototype.createWaypoint = function(t) {
        var n = this;
        this.waypoints.push(
          new e({
            context: this.options.context,
            element: this.options.element,
            enabled: this.options.enabled,
            handler: (function(t) {
              return function(e) {
                n.options[t[e]].call(n, e);
              };
            })(t),
            offset: t.offset,
            horizontal: this.options.horizontal,
          })
        );
      }),
      (n.prototype.destroy = function() {
        for (var t = 0, e = this.waypoints.length; t < e; t++)
          this.waypoints[t].destroy();
        this.waypoints = [];
      }),
      (n.prototype.disable = function() {
        for (var t = 0, e = this.waypoints.length; t < e; t++)
          this.waypoints[t].disable();
      }),
      (n.prototype.enable = function() {
        for (var t = 0, e = this.waypoints.length; t < e; t++)
          this.waypoints[t].enable();
      }),
      (n.defaults = {
        context: window,
        enabled: !0,
        enter: t,
        entered: t,
        exit: t,
        exited: t,
      }),
      (e.Inview = n);
  })(),
  (function(t) {
    'use strict';
    t(document).bind('enhance', function(e) {
      t('h1, h2, h3, h4, h5, h6').each(function() {
        var e = t(this);
        e.html(e.html().replace(/\s([^\s<]+)\s*$/, '&nbsp;$1'));
      });
    });
  })(jQuery),
  (function(t) {
    'function' == typeof define && define.amd
      ? define(['jquery'], t)
      : 'object' == typeof module && module.exports
      ? (module.exports = function(e, n) {
          return (
            void 0 === n &&
              (n =
                'undefined' != typeof window
                  ? require('jquery')
                  : require('jquery')(e)),
            t(n),
            n
          );
        })
      : t(jQuery);
  })(function(t) {
    'use strict';
    var e,
      n,
      i,
      a,
      o,
      s,
      r,
      l,
      c,
      d = 'undefined' != typeof window ? window : this,
      h = {
        i18n: {
          modeStack: 'Stack',
          modeSwipe: 'Swipe',
          modeToggle: 'Toggle',
          modeSwitchColumnsAbbreviated: 'Cols',
          modeSwitchColumns: 'Columns',
          columnToggleButton: 'Columns',
          columnToggleError: 'No eligible columns.',
          sort: 'Sort',
          swipePreviousColumn: 'Previous column',
          swipeNextColumn: 'Next column',
        },
        mustard:
          'head' in document &&
          (!window.blackberry || window.WebKitPoint) &&
          !window.operamini,
      };
    t(d.document).on('enhance.tablesaw', function() {
      'undefined' != typeof TablesawConfig &&
        TablesawConfig.i18n &&
        (h.i18n = t.extend(h.i18n, TablesawConfig.i18n || {})),
        (h.i18n.modes = [
          h.i18n.modeStack,
          h.i18n.modeSwipe,
          h.i18n.modeToggle,
        ]);
    }),
      h.mustard && t(document.documentElement).addClass('tablesaw-enhanced'),
      (function() {
        var e = 'tablesaw-bar',
          n = {
            create: 'tablesawcreate',
            destroy: 'tablesawdestroy',
            refresh: 'tablesawrefresh',
            resize: 'tablesawresize',
          },
          i = {};
        h.events = n;
        var a = function(e) {
          if (!e) throw new Error('Tablesaw requires an element.');
          (this.table = e),
            (this.$table = t(e)),
            (this.$thead = this.$table
              .children()
              .filter('thead')
              .eq(0)),
            (this.$tbody = this.$table.children().filter('tbody')),
            (this.mode = this.$table.attr('data-tablesaw-mode') || 'stack'),
            (this.$toolbar = null),
            this.init();
        };
        (a.prototype.init = function() {
          if (!this.$thead.length)
            throw new Error(
              'tablesaw: a <thead> is required, but none was found.'
            );
          if (!this.$thead.find('th').length)
            throw new Error(
              'tablesaw: no header cells found. Are you using <th> inside of <thead>?'
            );
          this.$table.attr('id') ||
            this.$table.attr(
              'id',
              'tablesaw-' + Math.round(1e4 * Math.random())
            ),
            this.createToolbar(),
            this._initCells(),
            this.$table.data('tablesaw', this),
            this.$table.trigger(n.create, [this]);
        }),
          (a.prototype.getConfig = function(e) {
            var n = t.extend(i, e || {});
            return t.extend(
              n,
              'undefined' != typeof TablesawConfig ? TablesawConfig : {}
            );
          }),
          (a.prototype._getPrimaryHeaderRow = function() {
            return this._getHeaderRows().eq(0);
          }),
          (a.prototype._getHeaderRows = function() {
            return this.$thead
              .children()
              .filter('tr')
              .filter(function() {
                return !t(this).is('[data-tablesaw-ignorerow]');
              });
          }),
          (a.prototype._getRowIndex = function(t) {
            return t.prevAll().length;
          }),
          (a.prototype._getHeaderRowIndeces = function() {
            var e = this,
              n = [];
            return (
              this._getHeaderRows().each(function() {
                n.push(e._getRowIndex(t(this)));
              }),
              n
            );
          }),
          (a.prototype._getPrimaryHeaderCells = function(t) {
            return (t || this._getPrimaryHeaderRow()).find('th');
          }),
          (a.prototype._findPrimaryHeadersForCell = function(t) {
            for (
              var e = this._getPrimaryHeaderRow(),
                n = this._getPrimaryHeaderCells(e),
                i = this._getRowIndex(e),
                a = [],
                o = 0;
              o < this.headerMapping.length;
              o++
            )
              if (o !== i)
                for (var s = 0; s < this.headerMapping[o].length; s++)
                  this.headerMapping[o][s] === t && a.push(n[s]);
            return a;
          }),
          (a.prototype.getRows = function() {
            var e = this;
            return this.$table.find('tr').filter(function() {
              return t(this)
                .closest('table')
                .is(e.$table);
            });
          }),
          (a.prototype.getBodyRows = function(e) {
            return (e ? t(e) : this.$tbody).children().filter('tr');
          }),
          (a.prototype.getHeaderCellIndex = function(t) {
            for (var e = this.headerMapping[0], n = 0; n < e.length; n++)
              if (e[n] === t) return n;
            return -1;
          }),
          (a.prototype._initCells = function() {
            var e = this.getRows(),
              n = [];
            e.each(function(t) {
              n[t] = [];
            }),
              e.each(function(e) {
                var i = 0;
                t(this)
                  .children()
                  .each(function() {
                    for (
                      var t = parseInt(this.getAttribute('colspan'), 10),
                        a = parseInt(this.getAttribute('rowspan'), 10);
                      n[e][i];

                    )
                      i++;
                    if (((n[e][i] = this), t))
                      for (var o = 0; o < t - 1; o++) i++, (n[e][i] = this);
                    if (a) for (var s = 1; s < a; s++) n[e + s][i] = this;
                    i++;
                  });
              });
            for (
              var i = this._getHeaderRowIndeces(), a = 0;
              a < n[0].length;
              a++
            )
              for (var o = 0, s = i.length; o < s; o++) {
                var r,
                  l = n[i[o]][a],
                  c = i[o];
                for (l.cells || (l.cells = []); c < n.length; )
                  l !== (r = n[c][a]) && l.cells.push(r), c++;
              }
            this.headerMapping = n;
          }),
          (a.prototype.refresh = function() {
            this._initCells(), this.$table.trigger(n.refresh, [this]);
          }),
          (a.prototype._getToolbarAnchor = function() {
            var t = this.$table.parent();
            return t.is('.tablesaw-overflow') ? t : this.$table;
          }),
          (a.prototype._getToolbar = function(t) {
            return (
              t || (t = this._getToolbarAnchor()), t.prev().filter('.' + e)
            );
          }),
          (a.prototype.createToolbar = function() {
            var n = this._getToolbarAnchor(),
              i = this._getToolbar(n);
            i.length ||
              (i = t('<div>')
                .addClass(e)
                .insertBefore(n)),
              (this.$toolbar = i),
              this.mode && this.$toolbar.addClass('tablesaw-mode-' + this.mode);
          }),
          (a.prototype.destroy = function() {
            this._getToolbar().each(function() {
              this.className = this.className.replace(
                /\btablesaw-mode\-\w*\b/gi,
                ''
              );
            });
            var e = this.$table.attr('id');
            t(document).off('.' + e),
              t(window).off('.' + e),
              this.$table.trigger(n.destroy, [this]),
              this.$table.removeData('tablesaw');
          }),
          (t.fn.tablesaw = function() {
            return this.each(function() {
              t(this).data('tablesaw') || new a(this);
            });
          });
        var o = t(d.document);
        o.on('enhance.tablesaw', function(e) {
          h.mustard &&
            t(e.target)
              .find('table')
              .filter(
                '[data-tablesaw],[data-tablesaw-mode],[data-tablesaw-sortable]'
              )
              .tablesaw();
        });
        var s,
          r,
          l = !1;
        o.on('scroll.tablesaw', function() {
          (l = !0),
            d.clearTimeout(s),
            (s = d.setTimeout(function() {
              l = !1;
            }, 300));
        }),
          t(d).on('resize', function() {
            l ||
              (d.clearTimeout(r),
              (r = d.setTimeout(function() {
                o.trigger(n.resize);
              }, 150)));
          });
      })(),
      (e = 'tablesaw-stack'),
      (n = 'tablesaw-cell-label'),
      (i = 'tablesaw-cell-content'),
      (a = 'tablesaw-stack'),
      (o = 'data-tablesaw-no-labels'),
      (s = 'data-tablesaw-hide-empty'),
      ((r = function(e, n) {
        (this.tablesaw = n),
          (this.$table = t(e)),
          (this.labelless = this.$table.is('[' + o + ']')),
          (this.hideempty = this.$table.is('[' + s + ']')),
          this.$table.data(a, this);
      }).prototype.init = function() {
        if ((this.$table.addClass(e), !this.labelless)) {
          var a = this;
          this.$table
            .find('th, td')
            .filter(function() {
              return !t(this).closest('thead').length;
            })
            .filter(function() {
              return !(
                t(this)
                  .closest('tr')
                  .is('[' + o + ']') ||
                (a.hideempty && !t(this).html())
              );
            })
            .each(function() {
              var e = t(document.createElement('b')).addClass(n),
                o = t(this);
              t(a.tablesaw._findPrimaryHeadersForCell(this)).each(function(n) {
                var i = t(this.cloneNode(!0)),
                  a = i.find('.tablesaw-sortable-btn');
                i.find('.tablesaw-sortable-arrow').remove();
                var o = i.find('[data-tablesaw-checkall]');
                o.closest('label').remove(),
                  o.length
                    ? (e = t([]))
                    : (n > 0 && e.append(document.createTextNode(', ')),
                      e.append(a.length ? a[0].childNodes : i[0].childNodes));
              }),
                e.length &&
                  !o.find('.' + i).length &&
                  o.wrapInner("<span class='" + i + "'></span>");
              var s = o.find('.' + n);
              s.length ? s.replaceWith(e) : o.prepend(e);
            });
        }
      }),
      (r.prototype.destroy = function() {
        this.$table.removeClass(e),
          this.$table.find('.' + n).remove(),
          this.$table.find('.' + i).each(function() {
            t(this).replaceWith(this.childNodes);
          });
      }),
      t(document)
        .on(h.events.create, function(t, e) {
          'stack' === e.mode && new r(e.table, e).init();
        })
        .on(h.events.refresh, function(e, n) {
          'stack' === n.mode &&
            t(n.table)
              .data(a)
              .init();
        })
        .on(h.events.destroy, function(e, n) {
          'stack' === n.mode &&
            t(n.table)
              .data(a)
              .destroy();
        }),
      (l = {
        _create: function() {
          return t(this).each(function() {
            t(this)
              .trigger('beforecreate.tablesawbtn')
              .tablesawbtn('_init')
              .trigger('create.tablesawbtn');
          });
        },
        _init: function() {
          var e = t(this),
            n = this.getElementsByTagName('select')[0];
          return (
            n &&
              t(this)
                .addClass('btn-select tablesaw-btn-select')
                .tablesawbtn('_select', n),
            e
          );
        },
        _select: function(e) {
          var n = function(e, n) {
            var i,
              a,
              o = t(n).find('option'),
              s = document.createElement('span'),
              r = !1;
            if (
              (s.setAttribute('aria-hidden', 'true'),
              (s.innerHTML = '&#160;'),
              o.each(function() {
                this.selected && (s.innerHTML = this.text);
              }),
              (a = e.childNodes),
              o.length > 0)
            ) {
              for (var l = 0, c = a.length; l < c; l++)
                (i = a[l]) &&
                  'SPAN' === i.nodeName.toUpperCase() &&
                  (e.replaceChild(s, i), (r = !0));
              r || e.insertBefore(s, e.firstChild);
            }
          };
          n(this, e),
            t(this).on('change refresh', function() {
              n(this, e);
            });
        },
      }),
      (t.fn.tablesawbtn = function(e, n, i, a) {
        return this.each(function() {
          return e && 'string' == typeof e
            ? t.fn.tablesawbtn.prototype[e].call(this, n, i, a)
            : t(this).data('tablesawbtnactive')
            ? t(this)
            : (t(this).data('tablesawbtnactive', !0),
              void t.fn.tablesawbtn.prototype._create.call(this));
        });
      }),
      t.extend(t.fn.tablesawbtn.prototype, l),
      (function() {
        var e = 'tablesaw-coltoggle',
          n = function(n) {
            (this.$table = t(n)),
              this.$table.length &&
                ((this.tablesaw = this.$table.data('tablesaw')),
                (this.attributes = {
                  subrow: 'data-tablesaw-subrow',
                  ignorerow: 'data-tablesaw-ignorerow',
                  btnTarget: 'data-tablesaw-columntoggle-btn-target',
                  set: 'data-tablesaw-columntoggle-set',
                }),
                (this.classes = {
                  columnToggleTable: 'tablesaw-columntoggle',
                  columnBtnContain:
                    'tablesaw-columntoggle-btnwrap tablesaw-advance',
                  columnBtn: 'tablesaw-columntoggle-btn tablesaw-nav-btn down',
                  popup: 'tablesaw-columntoggle-popup',
                  priorityPrefix: 'tablesaw-priority-',
                }),
                (this.set = []),
                (this.$headers = this.tablesaw._getPrimaryHeaderCells()),
                this.$table.data(e, this));
          };
        (n.prototype.initSet = function() {
          var e = this.$table.attr(this.attributes.set);
          if (e) {
            var n = this.$table[0];
            this.set = t('table[' + this.attributes.set + "='" + e + "']")
              .filter(function() {
                return this !== n;
              })
              .get();
          }
        }),
          (n.prototype.init = function() {
            if (this.$table.length) {
              var n,
                i,
                a,
                o,
                s,
                r,
                l = this,
                c = this.tablesaw.getConfig({
                  getColumnToggleLabelTemplate: function(t) {
                    return (
                      "<label><input type='checkbox' checked>" + t + '</label>'
                    );
                  },
                });
              this.$table.addClass(this.classes.columnToggleTable),
                (i = (n = this.$table.attr('id')) + '-popup'),
                (r = t(
                  "<div class='" + this.classes.columnBtnContain + "'></div>"
                )),
                (a = t(
                  "<a href='#" +
                    i +
                    "' class='btn tablesaw-btn btn-micro " +
                    this.classes.columnBtn +
                    "' data-popup-link><span>" +
                    h.i18n.columnToggleButton +
                    '</span></a>'
                )),
                (o = t(
                  "<div class='" +
                    this.classes.popup +
                    "' id='" +
                    i +
                    "'></div>"
                )),
                (s = t("<div class='btn-group'></div>")),
                (this.$popup = o);
              var d = !1;
              this.$headers.each(function() {
                var e = t(this),
                  n = e.attr('data-tablesaw-priority'),
                  i = l.$getCells(this);
                n &&
                  'persist' !== n &&
                  (i.addClass(l.classes.priorityPrefix + n),
                  t(c.getColumnToggleLabelTemplate(e.text()))
                    .appendTo(s)
                    .find('input[type="checkbox"]')
                    .data('tablesaw-header', this),
                  (d = !0));
              }),
                d ||
                  s.append('<label>' + h.i18n.columnToggleError + '</label>'),
                s.appendTo(o),
                s.find('input[type="checkbox"]').on('change', function(n) {
                  var i;
                  (b(n.target), l.set.length) &&
                    (t(l.$popup)
                      .find("input[type='checkbox']")
                      .each(function(t) {
                        if (this === n.target) return (i = t), !1;
                      }),
                    t(l.set).each(function() {
                      var a = t(this)
                        .data(e)
                        .$popup.find("input[type='checkbox']")
                        .get(i);
                      a && ((a.checked = n.target.checked), b(a));
                    }));
                }),
                a.appendTo(r);
              var u,
                p = t(this.$table.attr(this.attributes.btnTarget));
              r.appendTo(p.length ? p : this.tablesaw.$toolbar),
                a.on('click.tablesaw', function(e) {
                  e.preventDefault(),
                    r.is('.visible')
                      ? w()
                      : (r.addClass('visible'),
                        a.removeClass('down').addClass('up'),
                        t(document).off('click.' + n, w),
                        window.clearTimeout(u),
                        (u = window.setTimeout(function() {
                          t(document).on('click.' + n, w);
                        }, 15)));
                }),
                o.appendTo(r),
                (this.$menu = s);
              var f,
                g = this.$table.closest('.tablesaw-overflow');
              if (g.css('-webkit-overflow-scrolling'))
                g.on('scroll', function() {
                  var e = t(this);
                  window.clearTimeout(f),
                    (f = window.setTimeout(function() {
                      e.css('-webkit-overflow-scrolling', 'auto'),
                        window.setTimeout(function() {
                          e.css('-webkit-overflow-scrolling', 'touch');
                        }, 0);
                    }, 100));
                });
              t(window).on(h.events.resize + '.' + n, function() {
                l.refreshToggle();
              }),
                this.initSet(),
                this.refreshToggle();
            }
            function b(e) {
              var n = e.checked,
                i = l.getHeaderFromCheckbox(e),
                a = l.$getCells(i);
              a[n ? 'removeClass' : 'addClass']('tablesaw-toggle-cellhidden'),
                a[n ? 'addClass' : 'removeClass'](
                  'tablesaw-toggle-cellvisible'
                ),
                l.updateColspanIgnoredRows(n, t(i).add(i.cells)),
                l.$table.trigger('tablesawcolumns');
            }
            function w(e) {
              (e && t(e.target).closest('.' + l.classes.popup).length) ||
                (t(document).off('click.' + n),
                a.removeClass('up').addClass('down'),
                r.removeClass('visible'));
            }
          }),
          (n.prototype.updateColspanIgnoredRows = function(e, n) {
            this.$table
              .find(
                '[' +
                  this.attributes.subrow +
                  '],[' +
                  this.attributes.ignorerow +
                  ']'
              )
              .each(function() {
                var i,
                  a,
                  o,
                  s,
                  r = t(this),
                  l = r.find('td[colspan]').eq(0);
                !0 === e || !1 === e
                  ? ((s = n.filter(function() {
                      return this === l[0];
                    }).length
                      ? e
                        ? 1
                        : -1
                      : 0),
                    (a = parseInt(l.attr('colspan'), 10) + s))
                  : ((o = l.data('original-colspan'))
                      ? (a = o)
                      : ((a = parseInt(l.attr('colspan'), 10)),
                        l.data('original-colspan', a)),
                    (i = r.find('td').filter(function() {
                      return this !== l[0] && 'none' === t(this).css('display');
                    }).length),
                    (a -= e - i)),
                  l.attr('colspan', a);
              });
          }),
          (n.prototype.$getCells = function(e) {
            var n = this;
            return t(e)
              .add(e.cells)
              .filter(function() {
                var e = t(this),
                  i = e.parent(),
                  a = e.is('[colspan]');
                return !(
                  i.is('[' + n.attributes.subrow + ']') ||
                  (i.is('[' + n.attributes.ignorerow + ']') && a)
                );
              });
          }),
          (n.prototype.getHeaderFromCheckbox = function(e) {
            return t(e).data('tablesaw-header');
          }),
          (n.prototype.refreshToggle = function() {
            var t = this,
              e = 0;
            this.$menu.find('input').each(function() {
              var n = t.getHeaderFromCheckbox(this),
                i =
                  'table-cell' ===
                  t
                    .$getCells(n)
                    .eq(0)
                    .css('display');
              (this.checked = i), i || e++;
            }),
              this.updateColspanIgnoredRows(e);
          }),
          (n.prototype.destroy = function() {
            this.$table.removeClass(this.classes.columnToggleTable),
              this.$table.find('th, td').each(function() {
                t(this)
                  .removeClass('tablesaw-toggle-cellhidden')
                  .removeClass('tablesaw-toggle-cellvisible'),
                  (this.className = this.className.replace(
                    /\bui\-table\-priority\-\d\b/g,
                    ''
                  ));
              });
          }),
          t(document).on(h.events.create, function(t, e) {
            'columntoggle' === e.mode && new n(e.table).init();
          }),
          t(document).on(h.events.destroy, function(n, i) {
            'columntoggle' === i.mode &&
              t(i.table)
                .data(e)
                .destroy();
          }),
          t(document).on(h.events.refresh, function(n, i) {
            'columntoggle' === i.mode &&
              t(i.table)
                .data(e)
                .refreshPriority();
          });
      })(),
      (function() {
        function e(e) {
          var n = [];
          return (
            t(e.childNodes).each(function() {
              var e = t(this);
              e.is('input, select')
                ? n.push(e.val())
                : e.is('.tablesaw-cell-label') ||
                  n.push((e.text() || '').replace(/^\s+|\s+$/g, ''));
            }),
            n.join('')
          );
        }
        var n = 'tablesaw-sortable',
          i = 'table[data-' + n + ']',
          a = '[data-' + n + '-switch]',
          o = {
            sortCol: 'data-tablesaw-sortable-col',
            defaultCol: 'data-tablesaw-sortable-default-col',
            numericCol: 'data-tablesaw-sortable-numeric',
            subRow: 'data-tablesaw-subrow',
            ignoreRow: 'data-tablesaw-ignorerow',
          },
          s = {
            head: n + '-head',
            ascend: n + '-ascending',
            descend: n + '-descending',
            switcher: n + '-switch',
            tableToolbar: 'tablesaw-bar-section',
            sortButton: n + '-btn',
          },
          r = {
            _create: function(e) {
              return t(this).each(function() {
                if (t(this).data(n + '-init')) return !1;
                t(this)
                  .data(n + '-init', !0)
                  .trigger('beforecreate.' + n)
                  [n]('_init', e)
                  .trigger('create.' + n);
              });
            },
            _init: function() {
              var i,
                r,
                l,
                c = t(this),
                d = c.data('tablesaw');
              function u(e) {
                t.each(e, function(e, n) {
                  var i = t(n);
                  i.removeAttr(o.defaultCol),
                    i.removeClass(s.ascend),
                    i.removeClass(s.descend);
                });
              }
              c.addClass(n),
                (i = c
                  .children()
                  .filter('thead')
                  .find('th[' + o.sortCol + ']')),
                (l = i),
                t.each(l, function(e, n) {
                  t(n).addClass(s.head);
                }),
                (function(e, n) {
                  t.each(e, function(e, i) {
                    var a = t("<button class='" + s.sortButton + "'/>");
                    a.on('click', { col: i }, n),
                      t(i)
                        .wrapInner(a)
                        .find('button')
                        .append("<span class='tablesaw-sortable-arrow'>");
                  });
                })(i, function(e) {
                  if (!t(e.target).is('a[href]')) {
                    e.stopPropagation();
                    var a = t(e.target).closest('[' + o.sortCol + ']'),
                      l = e.data.col,
                      d = i.index(a[0]);
                    u(
                      a
                        .closest('thead')
                        .find('th')
                        .filter(function() {
                          return this !== a[0];
                        })
                    ),
                      a.is('.' + s.descend) || !a.is('.' + s.ascend)
                        ? (c[n]('sortBy', l, !0), (d += '_asc'))
                        : (c[n]('sortBy', l), (d += '_desc')),
                      r &&
                        r
                          .find('select')
                          .val(d)
                          .trigger('refresh'),
                      e.preventDefault();
                  }
                }),
                (function(e) {
                  t.each(e, function(e, n) {
                    var i = t(n);
                    i.is('[' + o.defaultCol + ']') &&
                      (i.is('.' + s.descend) || i.addClass(s.ascend));
                  });
                })(i),
                c.is(a) &&
                  (function(i) {
                    r = t('<div>')
                      .addClass(s.switcher)
                      .addClass(s.tableToolbar);
                    var a = ['<label>' + h.i18n.sort + ':'];
                    a.push('<span class="btn tablesaw-btn"><select>'),
                      i.each(function(n) {
                        var i = t(this),
                          r = i.is('[' + o.defaultCol + ']'),
                          l = i.is('.' + s.descend),
                          c = i.is('[' + o.numericCol + ']'),
                          d = 0;
                        t(this.cells.slice(0, 5)).each(function() {
                          isNaN(parseInt(e(this), 10)) || d++;
                        });
                        var h = 5 === d;
                        c || i.attr(o.numericCol, h ? '' : 'false'),
                          a.push(
                            '<option' +
                              (r && !l ? ' selected' : '') +
                              ' value="' +
                              n +
                              '_asc">' +
                              i.text() +
                              ' ' +
                              (h ? '&#x2191;' : '(A-Z)') +
                              '</option>'
                          ),
                          a.push(
                            '<option' +
                              (r && l ? ' selected' : '') +
                              ' value="' +
                              n +
                              '_desc">' +
                              i.text() +
                              ' ' +
                              (h ? '&#x2193;' : '(Z-A)') +
                              '</option>'
                          );
                      }),
                      a.push('</select></span></label>'),
                      r.html(a.join(''));
                    var l = d.$toolbar.children().eq(0);
                    l.length ? r.insertBefore(l) : r.appendTo(d.$toolbar),
                      r.find('.tablesaw-btn').tablesawbtn(),
                      r.find('select').on('change', function() {
                        var e = t(this)
                            .val()
                            .split('_'),
                          a = i.eq(e[0]);
                        u(a.siblings()),
                          c[n]('sortBy', a.get(0), 'asc' === e[1]);
                      });
                  })(i);
            },
            sortRows: function(n, i, a, s, r) {
              var l,
                c = (function(n, i) {
                  var a = [];
                  return (
                    t.each(n, function(n, s) {
                      for (
                        var r = s.parentNode, l = t(r), c = [], d = l.next();
                        d.is('[' + o.subRow + ']');

                      )
                        c.push(d[0]), (d = d.next());
                      var h = r.parentNode;
                      l.is('[' + o.subRow + ']') ||
                        (h === i &&
                          a.push({
                            element: s,
                            cell: e(s),
                            row: r,
                            subrows: c.length ? c : null,
                            ignored: l.is('[' + o.ignoreRow + ']'),
                          }));
                    }),
                    a
                  );
                })(s.cells, r),
                d = t(s).data('tablesaw-sort');
              return (
                (l =
                  (!(!d || 'function' != typeof d) && d(a)) ||
                  (function(t, e) {
                    var n = /[^\-\+\d\.]/g;
                    return t
                      ? function(t, i) {
                          return t.ignored || i.ignored
                            ? 0
                            : e
                            ? parseFloat(t.cell.replace(n, '')) -
                              parseFloat(i.cell.replace(n, ''))
                            : t.cell.toLowerCase() > i.cell.toLowerCase()
                            ? 1
                            : -1;
                        }
                      : function(t, i) {
                          return t.ignored || i.ignored
                            ? 0
                            : e
                            ? parseFloat(i.cell.replace(n, '')) -
                              parseFloat(t.cell.replace(n, ''))
                            : t.cell.toLowerCase() < i.cell.toLowerCase()
                            ? 1
                            : -1;
                        };
                  })(
                    a,
                    t(s).is('[' + o.numericCol + ']') &&
                      !t(s).is('[' + o.numericCol + '="false"]')
                  )),
                (function(t) {
                  var e,
                    n,
                    i = [];
                  for (e = 0, n = t.length; e < n; e++)
                    i.push(t[e].row), t[e].subrows && i.push(t[e].subrows);
                  return i;
                })(c.sort(l))
              );
            },
            makeColDefault: function(e, n) {
              var i = t(e);
              i.attr(o.defaultCol, 'true'),
                n
                  ? (i.removeClass(s.descend), i.addClass(s.ascend))
                  : (i.removeClass(s.ascend), i.addClass(s.descend));
            },
            sortBy: function(e, i) {
              var a,
                o = t(this),
                s = o.data('tablesaw');
              s.$tbody.each(function() {
                var r,
                  l,
                  c,
                  d = t(this),
                  h = s.getBodyRows(this),
                  u = s.headerMapping[0];
                for (l = 0, c = u.length; l < c; l++)
                  if (u[l] === e) {
                    a = l;
                    break;
                  }
                for (
                  l = 0, c = (r = o[n]('sortRows', h, a, i, e, this)).length;
                  l < c;
                  l++
                )
                  d.append(r[l]);
              }),
                o[n]('makeColDefault', e, i),
                o.trigger('tablesaw-sorted');
            },
          };
        (t.fn[n] = function(e) {
          var i,
            a = Array.prototype.slice.call(arguments, 1);
          return e && 'string' == typeof e
            ? void 0 !== (i = t.fn[n].prototype[e].apply(this[0], a))
              ? i
              : t(this)
            : (t(this).data(n + '-active') ||
                (t(this).data(n + '-active', !0),
                t.fn[n].prototype._create.call(this, e)),
              t(this));
        }),
          t.extend(t.fn[n].prototype, r),
          t(document).on(h.events.create, function(t, e) {
            e.$table.is(i) && e.$table[n]();
          });
      })(),
      (function() {
        var e = {
            hideBtn: 'disabled',
            persistWidths: 'tablesaw-fix-persist',
            hiddenCol: 'tablesaw-swipe-cellhidden',
            persistCol: 'tablesaw-swipe-cellpersist',
            allColumnsVisible: 'tablesaw-all-cols-visible',
          },
          n = {
            disableTouchEvents: 'data-tablesaw-no-touch',
            ignorerow: 'data-tablesaw-ignorerow',
            subrow: 'data-tablesaw-subrow',
          };
        function i(i, a) {
          var o = a.data('tablesaw'),
            s = t("<div class='tablesaw-advance'></div>"),
            r = t(
              "<a href='#' class='btn tablesaw-nav-btn tablesaw-btn btn-micro left' title='" +
                h.i18n.swipePreviousColumn +
                "'></a>"
            ).appendTo(s),
            l = t(
              "<a href='#' class='btn tablesaw-nav-btn tablesaw-btn btn-micro right' title='" +
                h.i18n.swipeNextColumn +
                "'></a>"
            ).appendTo(s),
            c = i._getPrimaryHeaderCells(),
            u = c.not('[data-tablesaw-priority="persist"]'),
            p = [],
            f = t(document.head || 'head'),
            g = a.attr('id');
          if (!c.length)
            throw new Error('tablesaw swipe: no header cells found.');
          function b(e) {
            return t(e.cells)
              .add(e)
              .filter(function() {
                return !t(this)
                  .parent()
                  .is('[' + n.ignorerow + '],[' + n.subrow + ']');
              });
          }
          function w(t) {
            b(t).removeClass(e.hiddenCol);
          }
          function m(t) {
            b(t).addClass(e.hiddenCol);
          }
          function v(i) {
            var o;
            i ||
              ((o = 0),
              c.each(function() {
                var n = t(this);
                n.is('.' + e.hiddenCol) ||
                  (o += parseInt(n.attr('colspan') || 1, 10));
              }),
              (i = o)),
              a
                .find('[' + n.ignorerow + '],[' + n.subrow + ']')
                .find('td[colspan]')
                .each(function() {
                  var e = t(this);
                  parseInt(e.attr('colspan'), 10);
                  e.attr('colspan', i);
                });
          }
          function y() {
            var n,
              i = '#' + g + '.tablesaw-swipe ',
              o = [],
              s = a.width(),
              r = [];
            if (
              (c.each(function(n) {
                var a;
                t(this).is('[data-tablesaw-priority="persist"]') &&
                  (a = this.getBoundingClientRect().width) < 0.75 * s &&
                  (r.push(n + '-' + a),
                  o.push(
                    i +
                      ' .' +
                      e.persistCol +
                      ':nth-child(' +
                      (n + 1) +
                      ') { width: ' +
                      a +
                      'px; }'
                  ));
              }),
              (n = r.join('_')),
              o.length)
            ) {
              a.addClass(e.persistWidths);
              var l = t('#' + g + '-persist');
              (l.length && l.data('tablesaw-hash') === n) ||
                (l.remove(),
                t('<style>' + o.join('\n') + '</style>')
                  .attr('id', g + '-persist')
                  .data('tablesaw-hash', n)
                  .appendTo(f));
            }
          }
          function C() {
            var n,
              i = [];
            return (
              u.each(function(a) {
                var o = t(this),
                  s = 'none' === o.css('display') || o.is('.' + e.hiddenCol);
                if (s || n) {
                  if (s && n) return (i[1] = a), !1;
                } else (n = !0), (i[0] = a);
              }),
              i
            );
          }
          function x() {
            var t = C();
            return [t[1] - 1, t[0] - 1];
          }
          function k(t) {
            return t[1] > -1 && t[1] < u.length;
          }
          function T() {
            if (
              !(n = a.attr('data-tablesaw-swipe-media')) ||
              ('matchMedia' in d && d.matchMedia(n).matches)
            ) {
              var n,
                i = a.parent().width(),
                o = [],
                s = 0,
                r = [],
                l = c.length;
              c.each(function(e) {
                var n = t(this).is('[data-tablesaw-priority="persist"]');
                o.push(n), (s += p[e]), r.push(s), (n || s > i) && l--;
              });
              var h = 0 === l,
                u = 0;
              c.each(function(n) {
                var a = parseInt(t(this).attr('colspan') || 1, 10);
                if (o[n]) return (u += a), void b(this).addClass(e.persistCol);
                r[n] <= i || h ? ((u += a), (h = !1), w(this)) : m(this);
              }),
                v(u),
                a.removeClass(e.persistWidths),
                t('#' + g + '-persist').remove(),
                a.trigger('tablesawcolumns');
            }
          }
          function $(t) {
            var e = (function(t) {
              return t ? C() : x();
            })(t);
            k(e) &&
              (isNaN(e[0]) && (e[0] = t ? 0 : u.length - 1),
              y(),
              m(u.get(e[0])),
              w(u.get(e[1])),
              v(),
              a.trigger('tablesawcolumns'));
          }
          function S(t, e) {
            return (t.touches || t.originalEvent.touches)[0][e];
          }
          a.addClass('tablesaw-swipe'),
            a.find('.' + e.hiddenCol).removeClass(e.hiddenCol),
            c.each(function() {
              var t = this.offsetWidth;
              p.push(t);
            }),
            s.appendTo(o.$toolbar),
            g ||
              ((g = 'tableswipe-' + Math.round(1e4 * Math.random())),
              a.attr('id', g)),
            r.add(l).on('click', function(e) {
              $(!!t(e.target).closest(l).length), e.preventDefault();
            }),
            a.is('[' + n.disableTouchEvents + ']') ||
              a.on('touchstart.swipetoggle', function(e) {
                var n,
                  a,
                  o = S(e, 'pageX'),
                  s = S(e, 'pageY'),
                  r = window.pageYOffset;
                t(d).off(h.events.resize, T),
                  t(this)
                    .on('touchmove.swipetoggle', function(t) {
                      (n = S(t, 'pageX')), (a = S(t, 'pageY'));
                    })
                    .on('touchend.swipetoggle', function() {
                      var e = i.getConfig({
                          swipeHorizontalThreshold: 30,
                          swipeVerticalThreshold: 30,
                        }),
                        l = e.swipe
                          ? e.swipe.verticalThreshold
                          : e.swipeVerticalThreshold,
                        c = e.swipe
                          ? e.swipe.horizontalThreshold
                          : e.swipeHorizontalThreshold,
                        u = Math.abs(window.pageYOffset - r) >= l;
                      Math.abs(a - s) >= l ||
                        u ||
                        (n - o < -1 * c && $(!0), n - o > c && $(!1)),
                        window.setTimeout(function() {
                          t(d).on(h.events.resize, T);
                        }, 300),
                        t(this).off(
                          'touchmove.swipetoggle touchend.swipetoggle'
                        );
                    });
              }),
            a
              .on('tablesawcolumns.swipetoggle', function() {
                var t = k(x()),
                  n = k(C());
                r[t ? 'removeClass' : 'addClass'](e.hideBtn),
                  l[n ? 'removeClass' : 'addClass'](e.hideBtn),
                  o.$toolbar[t || n ? 'removeClass' : 'addClass'](
                    e.allColumnsVisible
                  );
              })
              .on('tablesawnext.swipetoggle', function() {
                $(!0);
              })
              .on('tablesawprev.swipetoggle', function() {
                $(!1);
              })
              .on(h.events.destroy + '.swipetoggle', function() {
                var e = t(this);
                e.removeClass('tablesaw-swipe'),
                  o.$toolbar.find('.tablesaw-advance').remove(),
                  t(d).off(h.events.resize, T),
                  e.off('.swipetoggle');
              })
              .on(h.events.refresh, function() {
                (p = []),
                  c.each(function() {
                    var t = this.offsetWidth;
                    p.push(t);
                  }),
                  T();
              }),
            T(),
            t(d).on(h.events.resize, T);
        }
        t(document).on(h.events.create, function(t, e) {
          'swipe' === e.mode && i(e, e.$table);
        });
      })(),
      (function() {
        var e = { attr: { init: 'data-tablesaw-minimap' } };
        function n(n) {
          var i = n.data('tablesaw'),
            a = t('<div class="tablesaw-advance minimap">'),
            o = t('<ul class="tablesaw-advance-dots">').appendTo(a),
            s = 'tablesaw-advance-dots-hide';
          function r() {
            if (
              (function(t) {
                var n = t.attr(e.attr.init);
                return !n || (d.matchMedia && d.matchMedia(n).matches);
              })(n)
            ) {
              a.css('display', 'block');
              var i = o.find('li').removeClass(s);
              n.find('thead th').each(function(e) {
                'none' === t(this).css('display') && i.eq(e).addClass(s);
              });
            } else a.css('display', 'none');
          }
          n.find('thead th').each(function() {
            o.append('<li><i></i></li>');
          }),
            a.appendTo(i.$toolbar),
            r(),
            t(d).on(h.events.resize, r),
            n
              .on('tablesawcolumns.minimap', function() {
                r();
              })
              .on(h.events.destroy + '.minimap', function() {
                var e = t(this);
                i.$toolbar.find('.tablesaw-advance').remove(),
                  t(d).off(h.events.resize, r),
                  e.off('.minimap');
              });
        }
        t(document).on(h.events.create, function(t, i) {
          ('swipe' !== i.mode && 'columntoggle' !== i.mode) ||
            !i.$table.is('[ ' + e.attr.init + ']') ||
            n(i.$table);
        });
      })(),
      (c = {
        selectors: { init: 'table[data-tablesaw-mode-switch]' },
        attributes: { excludeMode: 'data-tablesaw-mode-exclude' },
        classes: {
          main: 'tablesaw-modeswitch',
          toolbar: 'tablesaw-bar-section',
        },
        modes: ['stack', 'swipe', 'columntoggle'],
        init: function(e) {
          var n,
            i = t(e),
            a = i.data('tablesaw'),
            o = i.attr(c.attributes.excludeMode),
            s = a.$toolbar,
            r = t('<div>').addClass(c.classes.main + ' ' + c.classes.toolbar),
            l = [
              '<label><span class="abbreviated">' +
                h.i18n.modeSwitchColumnsAbbreviated +
                '</span><span class="longform">' +
                h.i18n.modeSwitchColumns +
                '</span>:',
            ],
            d = i.attr('data-tablesaw-mode');
          l.push('<span class="btn tablesaw-btn"><select>');
          for (var u = 0, p = c.modes.length; u < p; u++)
            (o && o.toLowerCase() === c.modes[u]) ||
              ((n = d === c.modes[u]),
              l.push(
                '<option' +
                  (n ? ' selected' : '') +
                  ' value="' +
                  c.modes[u] +
                  '">' +
                  h.i18n.modes[u] +
                  '</option>'
              ));
          l.push('</select></span></label>'), r.html(l.join(''));
          var f = s.find('.tablesaw-advance').eq(0);
          f.length ? r.insertBefore(f) : r.appendTo(s),
            r.find('.tablesaw-btn').tablesawbtn(),
            r.find('select').on('change', function(n) {
              return c.onModeChange.call(e, n, t(this).val());
            });
        },
        onModeChange: function(e, n) {
          var i = t(this),
            a = i.data('tablesaw');
          a.$toolbar.find('.' + c.classes.main).remove(),
            a.destroy(),
            i.attr('data-tablesaw-mode', n),
            i.tablesaw();
        },
      }),
      t(d.document).on(h.events.create, function(t, e) {
        e.$table.is(c.selectors.init) && c.init(e.table);
      }),
      (function() {
        var e = 'tablesawCheckAll';
        function n(t) {
          (this.tablesaw = t),
            (this.$table = t.$table),
            (this.attr = 'data-tablesaw-checkall'),
            (this.checkAllSelector = '[' + this.attr + ']'),
            (this.forceCheckedSelector = '[' + this.attr + '-checked]'),
            (this.forceUncheckedSelector = '[' + this.attr + '-unchecked]'),
            (this.checkboxSelector = 'input[type="checkbox"]'),
            (this.$triggers = null),
            (this.$checkboxes = null),
            this.$table.data(e) || (this.$table.data(e, this), this.init());
        }
        (n.prototype._filterCells = function(e) {
          return e
            .filter(function() {
              return !t(this)
                .closest('tr')
                .is('[data-tablesaw-subrow],[data-tablesaw-ignorerow]');
            })
            .find(this.checkboxSelector)
            .not(this.checkAllSelector);
        }),
          (n.prototype.getCheckboxesForButton = function(e) {
            return this._filterCells(t(t(e).attr(this.attr)));
          }),
          (n.prototype.getCheckboxesForCheckbox = function(e) {
            return this._filterCells(t(t(e).closest('th')[0].cells));
          }),
          (n.prototype.init = function() {
            var e = this;
            this.$table.find(this.checkAllSelector).each(function() {
              t(this).is(e.checkboxSelector)
                ? e.addCheckboxEvents(this)
                : e.addButtonEvents(this);
            });
          }),
          (n.prototype.addButtonEvents = function(n) {
            var i = this;
            t(n).on('click', function(n) {
              n.preventDefault();
              var a,
                o = i.getCheckboxesForButton(this),
                s = !0;
              o.each(function() {
                this.checked || (s = !1);
              }),
                (a =
                  !!t(this).is(i.forceCheckedSelector) ||
                  (!t(this).is(i.forceUncheckedSelector) && !s)),
                o.each(function() {
                  (this.checked = a), t(this).trigger('change.' + e);
                });
            });
          }),
          (n.prototype.addCheckboxEvents = function(n) {
            var i = this;
            t(n).on('change', function() {
              var t = this.checked;
              i.getCheckboxesForCheckbox(this).each(function() {
                this.checked = t;
              });
            });
            var a = i.getCheckboxesForCheckbox(n);
            a.on('change.' + e, function() {
              var t = 0;
              a.each(function() {
                this.checked && t++;
              });
              var e = t === a.length;
              (n.checked = e), (n.indeterminate = 0 !== t && !e);
            });
          }),
          t(document).on(h.events.create, function(t, e) {
            new n(e);
          });
      })();
  }),
  (function(t) {
    'use strict';
    var e;
    if ('shoestring' in t) e = t.shoestring;
    else {
      if (!('jQuery' in t)) throw new Error('tablesaw: DOM library not found.');
      e = t.jQuery;
    }
    'addEventListener' in document &&
      document.addEventListener('DOMContentLoaded', function() {
        e(document).trigger('enhance.tablesaw');
      });
  })('undefined' != typeof window ? window : this),
  (function(t, e) {
    void 0 === e.fn.clone &&
      (e.fn.clone = function() {
        var t = [];
        return (
          this.each(function() {
            t.push(this.cloneNode(!0));
          }),
          e(t)
        );
      });
    var n = {
      selectors: { init: '.table--long' },
      tests: {
        sticky: PP.utils.featureTest('position', 'sticky'),
        fixed: PP.utils.featureTest('position', 'fixed', !0),
      },
      getScrollTop: function() {
        return t
          ? 'pageYOffset' in t
            ? t.pageYOffset
            : t.document.documentElement.scrollTop
          : elem.scrollTop;
      },
      init: function(i) {
        var a,
          o,
          s = e(i),
          r = s.find('thead').eq(0),
          l = s.next().is('.stickyclone'),
          c = function(t) {
            return t.tagName + ':eq(' + e(t).prevAll().length + ')';
          },
          d = function() {
            var t = l.find('th'),
              n = window.getComputedStyle
                ? getComputedStyle(s[0], null)
                : s[0].currentStyle,
              i = parseInt(n.getPropertyValue('width'), 10),
              a =
                navigator.userAgent.toLowerCase().indexOf('firefox') > -1
                  ? 0
                  : 1;
            l.css('width', i - a + 'px'),
              r.find('th').each(function(n) {
                var i,
                  a = e(this),
                  o = t.eq(n);
                'none' !== a.css('display')
                  ? ((i = a),
                    o.replaceWith(
                      i.clone().css('width', i[0].clientWidth + 1 + 'px')
                    ))
                  : o.css('display', 'none');
              });
          };
        function h(t) {
          l[l.is('.on') ? 'removeClass' : 'addClass']('on'), t && d();
        }
        l.length ||
          (((a = document.createElement('table')).className =
            i.className.replace(/\bstickyheaders\b/, '') + ' stickyclone'),
          (l = e(a)).append(r.clone()),
          l.on('click', function(t) {
            var n = e(t.target),
              i = [c(t.target)];
            n.is('a[href]') ||
              (n.parents().each(function() {
                var t = this.tagName;
                if ('THEAD' === t) return !1;
                i.unshift(c(this)), ('TH' !== t && 'TD' !== t) || i;
              }),
              r.find(i.join(' > ')).trigger(t.type),
              d());
          }),
          s.after(l)),
          e(t)
            .bind('scroll', function() {
              var t = s.offset().top,
                e = n.getScrollTop(),
                i = l.is('.on');
              t > e || t + s.height() < e ? i && h() : i || h(!0);
            })
            .trigger('scroll'),
          e(t).bind('resize', function(t) {
            clearTimeout(o),
              (o = setTimeout(function() {
                l.is('.on') && d();
              }, 150));
          });
      },
    };
    (t.StickyHeaders = n),
      !n.tests.sticky &&
        n.tests.fixed &&
        e(t.document).on('enhance', function(t) {
          e(n.selectors.init).each(function() {
            n.init(this);
          });
        });
  })(this, jQuery),
  (function(t, e, n) {
    'use strict';
    var i = '.table--shortened:not([data-enhanced-table--shortened])',
      a = 'container-shortened';
    (t.fn['table--shortened'] = function() {
      return this.not('.stickyclone').each(function() {
        var e = t(this),
          n = function(e) {
            var n = t(e),
              i = n.scrollTop();
            0 == i
              ? n.addClass('at-top').removeClass('at-bottom')
              : i + n.innerHeight() >= n[0].scrollHeight
              ? n.addClass('at-bottom').removeClass('at-top')
              : n.removeClass('at-top at-bottom');
          };
        e.wrap('<div class="' + a + '-inner"></div>')
          .parent()
          .wrap('<div class="' + a + ' full"></div>')
          .prepend(
            '<div class="' +
              a +
              '-cap ' +
              a +
              '-cap--top" role="presentation" aria-hidden></div>'
          )
          .append(
            '<div class="' +
              a +
              '-cap ' +
              a +
              '-cap--bottom" role="presentation" aria-hidden></div>'
          );
        var i = e.parent();
        i.on('scroll', function(t) {
          n(t.target);
        }),
          n(i[0]);
      });
    }),
      t(document).bind('enhance', function(e) {
        (t(e.target).is(i) ? t(e.target) : t(i, e.target))
          ['table--shortened']()
          .attr('data-enhanced-table--shortened', 'true');
      });
  })(jQuery),
  (function(t) {
    'use strict';
    t('.site-nav-item').bind('ajaxInclude', function() {
      t(this)
        .addClass('collapsible collapsible-collapsed')
        .attr('data-collapsible-set', 'nav-primary')
        .attr('data-collapsible-hover', ''),
        t(document).trigger('enhance');
    }),
      t(window).on('resize', function() {
        t(
          '.site-mast .collapsible-expanded .collapsible-header, .modal.collapsible-expanded .collapsible-header'
        ).trigger('click');
      }),
      t(document).keyup(function(e) {
        27 === e.keyCode &&
          t('.modal.collapsible-expanded .collapsible-header').trigger('click');
      });
  })(jQuery),
  (function(t) {
    'use strict';
    var e = '.site-mast:not([data-enhanced-site-mast])',
      n = t('html').is('.fixed-supported');
    (t.fn['site-mast'] = function() {
      return this.each(function() {
        var e = t(this);
        if (n)
          new Waypoint({
            element: t('.content')[0],
            handler: function(n) {
              'down' === n
                ? (e.addClass('is-fixed'),
                  t('body').addClass('has-fixed-masthead'))
                : (e.removeClass('is-fixed'),
                  t('body').removeClass('has-fixed-masthead'));
            },
          });
      });
    }),
      t(document).bind('enhance', function(n) {
        (t(n.target).is(e) ? t(n.target) : t(e, n.target))
          ['site-mast']()
          .attr('data-enhanced-site-mast', 'true');
      });
  })(jQuery),
  (function(t) {
    'use strict';
    var e = '.site-mast-mini-fixed:not([data-enhanced-site-mast-mini-fixed])',
      n = t('html').is('.fixed-supported'),
      i = [];
    (t.fn['site-mast-mini-fixed'] = function() {
      return this.each(function() {
        var e = t(this);
        if (n) {
          t('body').addClass('has-fixed-masthead'), e.addClass('is-fixed');
          new Waypoint({
            element: t('.pg-main')[0],
            handler: function(t) {
              'down' === t
                ? e.addClass('is-scrolling')
                : e.removeClass('is-scrolling');
            },
          });
          var a = function(t, n) {
            if ('add' === n) i.push(t), e.addClass('is-hidden');
            else {
              var a = i.indexOf(t);
              a > -1 && i.splice(a, 1),
                0 === i.length && e.removeClass('is-hidden');
            }
          };
          t('.table--long, .table--shortened')
            .not('.stickyclone')
            .each(function() {
              new Waypoint.Inview({
                element: t(this)[0],
                enter: function(t) {
                  a(this.element, 'add');
                },
                exited: function(t) {
                  a(this.element, 'remove');
                },
              });
            });
        }
      });
    }),
      t(document).bind('enhance', function(n) {
        (t(n.target).is(e) ? t(n.target) : t(e, n.target))
          ['site-mast-mini-fixed']()
          .attr('data-enhanced-site-mast-mini-fixed', 'true');
      });
  })(jQuery),
  (function(t) {
    'use strict';
    stickybits('.subnav', { customVerticalPosition: !0, useStickyClasses: !0 });
    var e = [];
    (t.fn.subnav = function() {
      return this.each(function() {
        var n = t(this),
          i = function(t, i) {
            if ('add' === i) e.push(t), n.addClass('is-hidden');
            else {
              var a = e.indexOf(t);
              a > -1 && e.splice(a, 1),
                0 === e.length && n.removeClass('is-hidden');
            }
          };
        t(
          '.medium, .full, .site-footer, .aside.aside-medium, .aside.aside-large'
        )
          .not('.aside--alt, .stickyclone')
          .each(function() {
            new Waypoint.Inview({
              element: t(this)[0],
              enter: function(t) {
                i(this.element, 'add');
              },
              exited: function(t) {
                i(this.element, 'remove');
              },
            });
          });
      });
    }),
      t(document).bind('enhance', function(e) {
        (t(e.target).is('.subnav:not([data-enhanced-subnav])')
          ? t(e.target)
          : t('.subnav:not([data-enhanced-subnav])', e.target)
        )
          .subnav()
          .attr('data-enhanced-subnav', 'true');
      });
  })(jQuery),
  (function(t) {
    'use strict';
    var e = [
      '<div class="rank-scale" role="presentation" aria-hidden>',
      '    <span class="rank-marker" style="left: {{ position }}"></span>',
      '    <ul class="rank-labels">',
      '        <li>High</li>',
      '        <li>Low</li>',
      '    </ul>',
      '</div>',
    ].join('\n');
    (t.fn.number = function() {
      return this.each(function() {
        var n = t(this),
          i = t('.rank', n);
        if (0 === t('.rank-scale', n).length && i.length > 0) {
          var a = (i.attr('data-rank') / i.attr('data-total')) * 100,
            o = e.split('{{ position }}').join(a + '%');
          i.prepend(o);
        }
      });
    }),
      t(document).bind('enhance', function(e) {
        (t(e.target).is('.number:not([data-enhanced-number])')
          ? t(e.target)
          : t('.number:not([data-enhanced-number])', e.target)
        )
          .number()
          .attr('data-enhanced-number', 'true');
      });
  })(jQuery),
  $(document).ready(function() {
    $('html').addClass('enhanced'),
      $(
        '[data-append], [data-replace], [data-after], [data-before]'
      ).ajaxInclude(),
      $('[data-set] > *').appendAround(),
      $(document).trigger('enhance');
  });
