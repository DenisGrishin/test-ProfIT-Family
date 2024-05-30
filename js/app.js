(() => {
  var e = {
      144: function (e) {
        e.exports = (function () {
          "use strict";
          const e = "undefined" != typeof window,
            t =
              (e && !("onscroll" in window)) ||
              ("undefined" != typeof navigator &&
                /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
            s = e && window.devicePixelRatio > 1,
            i = {
              elements_selector: ".lazy",
              container: t || e ? document : null,
              threshold: 300,
              thresholds: null,
              data_src: "src",
              data_srcset: "srcset",
              data_sizes: "sizes",
              data_bg: "bg",
              data_bg_hidpi: "bg-hidpi",
              data_bg_multi: "bg-multi",
              data_bg_multi_hidpi: "bg-multi-hidpi",
              data_bg_set: "bg-set",
              data_poster: "poster",
              class_applied: "applied",
              class_loading: "loading",
              class_loaded: "loaded",
              class_error: "error",
              class_entered: "entered",
              class_exited: "exited",
              unobserve_completed: !0,
              unobserve_entered: !1,
              cancel_on_exit: !0,
              callback_enter: null,
              callback_exit: null,
              callback_applied: null,
              callback_loading: null,
              callback_loaded: null,
              callback_error: null,
              callback_finish: null,
              callback_cancel: null,
              use_native: !1,
              restore_on_error: !1,
            },
            r = (e) => Object.assign({}, i, e),
            a = function (e, t) {
              let s;
              const i = "LazyLoad::Initialized",
                r = new e(t);
              try {
                s = new CustomEvent(i, { detail: { instance: r } });
              } catch (e) {
                (s = document.createEvent("CustomEvent")),
                  s.initCustomEvent(i, !1, !1, { instance: r });
              }
              window.dispatchEvent(s);
            },
            n = "src",
            o = "srcset",
            l = "sizes",
            d = "poster",
            c = "llOriginalAttrs",
            p = "data",
            u = "loading",
            m = "loaded",
            h = "applied",
            f = "error",
            g = "native",
            v = "data-",
            w = "ll-status",
            b = (e, t) => e.getAttribute(v + t),
            y = (e) => b(e, w),
            S = (e, t) =>
              ((e, t, s) => {
                const i = v + t;
                null !== s ? e.setAttribute(i, s) : e.removeAttribute(i);
              })(e, w, t),
            T = (e) => S(e, null),
            E = (e) => null === y(e),
            x = (e) => y(e) === g,
            C = [u, m, h, f],
            _ = (e, t, s, i) => {
              e &&
                "function" == typeof e &&
                (void 0 === i ? (void 0 === s ? e(t) : e(t, s)) : e(t, s, i));
            },
            L = (t, s) => {
              e && "" !== s && t.classList.add(s);
            },
            M = (t, s) => {
              e && "" !== s && t.classList.remove(s);
            },
            P = (e) => e.llTempImage,
            k = (e, t) => {
              if (!t) return;
              const s = t._observer;
              s && s.unobserve(e);
            },
            A = (e, t) => {
              e && (e.loadingCount += t);
            },
            I = (e, t) => {
              e && (e.toLoadCount = t);
            },
            O = (e) => {
              let t = [];
              for (let s, i = 0; (s = e.children[i]); i += 1)
                "SOURCE" === s.tagName && t.push(s);
              return t;
            },
            z = (e, t) => {
              const s = e.parentNode;
              s && "PICTURE" === s.tagName && O(s).forEach(t);
            },
            G = (e, t) => {
              O(e).forEach(t);
            },
            D = [n],
            $ = [n, d],
            B = [n, o, l],
            V = [p],
            q = (e) => !!e[c],
            H = (e) => e[c],
            N = (e) => delete e[c],
            F = (e, t) => {
              if (q(e)) return;
              const s = {};
              t.forEach((t) => {
                s[t] = e.getAttribute(t);
              }),
                (e[c] = s);
            },
            R = (e, t) => {
              if (!q(e)) return;
              const s = H(e);
              t.forEach((t) => {
                ((e, t, s) => {
                  s ? e.setAttribute(t, s) : e.removeAttribute(t);
                })(e, t, s[t]);
              });
            },
            j = (e, t, s) => {
              L(e, t.class_applied),
                S(e, h),
                s &&
                  (t.unobserve_completed && k(e, t),
                  _(t.callback_applied, e, s));
            },
            W = (e, t, s) => {
              L(e, t.class_loading),
                S(e, u),
                s && (A(s, 1), _(t.callback_loading, e, s));
            },
            Y = (e, t, s) => {
              s && e.setAttribute(t, s);
            },
            X = (e, t) => {
              Y(e, l, b(e, t.data_sizes)),
                Y(e, o, b(e, t.data_srcset)),
                Y(e, n, b(e, t.data_src));
            },
            U = {
              IMG: (e, t) => {
                z(e, (e) => {
                  F(e, B), X(e, t);
                }),
                  F(e, B),
                  X(e, t);
              },
              IFRAME: (e, t) => {
                F(e, D), Y(e, n, b(e, t.data_src));
              },
              VIDEO: (e, t) => {
                G(e, (e) => {
                  F(e, D), Y(e, n, b(e, t.data_src));
                }),
                  F(e, $),
                  Y(e, d, b(e, t.data_poster)),
                  Y(e, n, b(e, t.data_src)),
                  e.load();
              },
              OBJECT: (e, t) => {
                F(e, V), Y(e, p, b(e, t.data_src));
              },
            },
            K = ["IMG", "IFRAME", "VIDEO", "OBJECT"],
            J = (e, t) => {
              !t ||
                ((e) => e.loadingCount > 0)(t) ||
                ((e) => e.toLoadCount > 0)(t) ||
                _(e.callback_finish, t);
            },
            Q = (e, t, s) => {
              e.addEventListener(t, s), (e.llEvLisnrs[t] = s);
            },
            Z = (e, t, s) => {
              e.removeEventListener(t, s);
            },
            ee = (e) => !!e.llEvLisnrs,
            te = (e) => {
              if (!ee(e)) return;
              const t = e.llEvLisnrs;
              for (let s in t) {
                const i = t[s];
                Z(e, s, i);
              }
              delete e.llEvLisnrs;
            },
            se = (e, t, s) => {
              ((e) => {
                delete e.llTempImage;
              })(e),
                A(s, -1),
                ((e) => {
                  e && (e.toLoadCount -= 1);
                })(s),
                M(e, t.class_loading),
                t.unobserve_completed && k(e, s);
            },
            ie = (e, t, s) => {
              const i = P(e) || e;
              ee(i) ||
                ((e, t, s) => {
                  ee(e) || (e.llEvLisnrs = {});
                  const i = "VIDEO" === e.tagName ? "loadeddata" : "load";
                  Q(e, i, t), Q(e, "error", s);
                })(
                  i,
                  (r) => {
                    ((e, t, s, i) => {
                      const r = x(t);
                      se(t, s, i),
                        L(t, s.class_loaded),
                        S(t, m),
                        _(s.callback_loaded, t, i),
                        r || J(s, i);
                    })(0, e, t, s),
                      te(i);
                  },
                  (r) => {
                    ((e, t, s, i) => {
                      const r = x(t);
                      se(t, s, i),
                        L(t, s.class_error),
                        S(t, f),
                        _(s.callback_error, t, i),
                        s.restore_on_error && R(t, B),
                        r || J(s, i);
                    })(0, e, t, s),
                      te(i);
                  },
                );
            },
            re = (e, t, i) => {
              ((e) => K.indexOf(e.tagName) > -1)(e)
                ? ((e, t, s) => {
                    ie(e, t, s),
                      ((e, t, s) => {
                        const i = U[e.tagName];
                        i && (i(e, t), W(e, t, s));
                      })(e, t, s);
                  })(e, t, i)
                : ((e, t, i) => {
                    ((e) => {
                      e.llTempImage = document.createElement("IMG");
                    })(e),
                      ie(e, t, i),
                      ((e) => {
                        q(e) ||
                          (e[c] = { backgroundImage: e.style.backgroundImage });
                      })(e),
                      ((e, t, i) => {
                        const r = b(e, t.data_bg),
                          a = b(e, t.data_bg_hidpi),
                          o = s && a ? a : r;
                        o &&
                          ((e.style.backgroundImage = `url("${o}")`),
                          P(e).setAttribute(n, o),
                          W(e, t, i));
                      })(e, t, i),
                      ((e, t, i) => {
                        const r = b(e, t.data_bg_multi),
                          a = b(e, t.data_bg_multi_hidpi),
                          n = s && a ? a : r;
                        n && ((e.style.backgroundImage = n), j(e, t, i));
                      })(e, t, i),
                      ((e, t, s) => {
                        const i = b(e, t.data_bg_set);
                        if (!i) return;
                        let r = i.split("|").map((e) => `image-set(${e})`);
                        (e.style.backgroundImage = r.join()), j(e, t, s);
                      })(e, t, i);
                  })(e, t, i);
            },
            ae = (e) => {
              e.removeAttribute(n), e.removeAttribute(o), e.removeAttribute(l);
            },
            ne = (e) => {
              z(e, (e) => {
                R(e, B);
              }),
                R(e, B);
            },
            oe = {
              IMG: ne,
              IFRAME: (e) => {
                R(e, D);
              },
              VIDEO: (e) => {
                G(e, (e) => {
                  R(e, D);
                }),
                  R(e, $),
                  e.load();
              },
              OBJECT: (e) => {
                R(e, V);
              },
            },
            le = (e, t) => {
              ((e) => {
                const t = oe[e.tagName];
                t
                  ? t(e)
                  : ((e) => {
                      if (!q(e)) return;
                      const t = H(e);
                      e.style.backgroundImage = t.backgroundImage;
                    })(e);
              })(e),
                ((e, t) => {
                  E(e) ||
                    x(e) ||
                    (M(e, t.class_entered),
                    M(e, t.class_exited),
                    M(e, t.class_applied),
                    M(e, t.class_loading),
                    M(e, t.class_loaded),
                    M(e, t.class_error));
                })(e, t),
                T(e),
                N(e);
            },
            de = ["IMG", "IFRAME", "VIDEO"],
            ce = (e) => e.use_native && "loading" in HTMLImageElement.prototype,
            pe = (e, t, s) => {
              e.forEach((e) =>
                ((e) => e.isIntersecting || e.intersectionRatio > 0)(e)
                  ? ((e, t, s, i) => {
                      const r = ((e) => C.indexOf(y(e)) >= 0)(e);
                      S(e, "entered"),
                        L(e, s.class_entered),
                        M(e, s.class_exited),
                        ((e, t, s) => {
                          t.unobserve_entered && k(e, s);
                        })(e, s, i),
                        _(s.callback_enter, e, t, i),
                        r || re(e, s, i);
                    })(e.target, e, t, s)
                  : ((e, t, s, i) => {
                      E(e) ||
                        (L(e, s.class_exited),
                        ((e, t, s, i) => {
                          s.cancel_on_exit &&
                            ((e) => y(e) === u)(e) &&
                            "IMG" === e.tagName &&
                            (te(e),
                            ((e) => {
                              z(e, (e) => {
                                ae(e);
                              }),
                                ae(e);
                            })(e),
                            ne(e),
                            M(e, s.class_loading),
                            A(i, -1),
                            T(e),
                            _(s.callback_cancel, e, t, i));
                        })(e, t, s, i),
                        _(s.callback_exit, e, t, i));
                    })(e.target, e, t, s),
              );
            },
            ue = (e) => Array.prototype.slice.call(e),
            me = (e) => e.container.querySelectorAll(e.elements_selector),
            he = (e) => ((e) => y(e) === f)(e),
            fe = (e, t) => ((e) => ue(e).filter(E))(e || me(t)),
            ge = function (t, s) {
              const i = r(t);
              (this._settings = i),
                (this.loadingCount = 0),
                ((e, t) => {
                  ce(e) ||
                    (t._observer = new IntersectionObserver(
                      (s) => {
                        pe(s, e, t);
                      },
                      ((e) => ({
                        root: e.container === document ? null : e.container,
                        rootMargin: e.thresholds || e.threshold + "px",
                      }))(e),
                    ));
                })(i, this),
                ((t, s) => {
                  e &&
                    ((s._onlineHandler = () => {
                      ((e, t) => {
                        var s;
                        ((s = me(e)), ue(s).filter(he)).forEach((t) => {
                          M(t, e.class_error), T(t);
                        }),
                          t.update();
                      })(t, s);
                    }),
                    window.addEventListener("online", s._onlineHandler));
                })(i, this),
                this.update(s);
            };
          return (
            (ge.prototype = {
              update: function (e) {
                const s = this._settings,
                  i = fe(e, s);
                var r, a;
                I(this, i.length),
                  t
                    ? this.loadAll(i)
                    : ce(s)
                      ? ((e, t, s) => {
                          e.forEach((e) => {
                            -1 !== de.indexOf(e.tagName) &&
                              ((e, t, s) => {
                                e.setAttribute("loading", "lazy"),
                                  ie(e, t, s),
                                  ((e, t) => {
                                    const s = U[e.tagName];
                                    s && s(e, t);
                                  })(e, t),
                                  S(e, g);
                              })(e, t, s);
                          }),
                            I(s, 0);
                        })(i, s, this)
                      : ((a = i),
                        ((e) => {
                          e.disconnect();
                        })((r = this._observer)),
                        ((e, t) => {
                          t.forEach((t) => {
                            e.observe(t);
                          });
                        })(r, a));
              },
              destroy: function () {
                this._observer && this._observer.disconnect(),
                  e &&
                    window.removeEventListener("online", this._onlineHandler),
                  me(this._settings).forEach((e) => {
                    N(e);
                  }),
                  delete this._observer,
                  delete this._settings,
                  delete this._onlineHandler,
                  delete this.loadingCount,
                  delete this.toLoadCount;
              },
              loadAll: function (e) {
                const t = this._settings;
                fe(e, t).forEach((e) => {
                  k(e, this), re(e, t, this);
                });
              },
              restoreAll: function () {
                const e = this._settings;
                me(e).forEach((t) => {
                  le(t, e);
                });
              },
            }),
            (ge.load = (e, t) => {
              const s = r(t);
              re(e, s);
            }),
            (ge.resetStatus = (e) => {
              T(e);
            }),
            e &&
              ((e, t) => {
                if (t)
                  if (t.length) for (let s, i = 0; (s = t[i]); i += 1) a(e, s);
                  else a(e, t);
              })(ge, window.lazyLoadOptions),
            ge
          );
        })();
      },
    },
    t = {};
  function s(i) {
    var r = t[i];
    if (void 0 !== r) return r.exports;
    var a = (t[i] = { exports: {} });
    return e[i].call(a.exports, a, a.exports, s), a.exports;
  }
  (() => {
    "use strict";
    let e = (e, t = 500, s = 0) => {
        e.classList.contains("_slide") ||
          (e.classList.add("_slide"),
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = `${e.offsetHeight}px`),
          e.offsetHeight,
          (e.style.overflow = "hidden"),
          (e.style.height = s ? `${s}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          window.setTimeout(() => {
            (e.hidden = !s),
              !s && e.style.removeProperty("height"),
              e.style.removeProperty("padding-top"),
              e.style.removeProperty("padding-bottom"),
              e.style.removeProperty("margin-top"),
              e.style.removeProperty("margin-bottom"),
              !s && e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide");
          }, t));
      },
      t = (e, t = 500, s = 0) => {
        if (!e.classList.contains("_slide")) {
          e.classList.add("_slide"),
            (e.hidden = !e.hidden && null),
            s && e.style.removeProperty("height");
          let i = e.offsetHeight;
          (e.style.overflow = "hidden"),
            (e.style.height = s ? `${s}px` : "0px"),
            (e.style.paddingTop = 0),
            (e.style.paddingBottom = 0),
            (e.style.marginTop = 0),
            (e.style.marginBottom = 0),
            e.offsetHeight,
            (e.style.transitionProperty = "height, margin, padding"),
            (e.style.transitionDuration = t + "ms"),
            (e.style.height = i + "px"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            window.setTimeout(() => {
              e.style.removeProperty("height"),
                e.style.removeProperty("overflow"),
                e.style.removeProperty("transition-duration"),
                e.style.removeProperty("transition-property"),
                e.classList.remove("_slide");
            }, t);
        }
      },
      i = !0,
      r = (e = 500) => {
        let t = document.querySelector("body");
        if (i) {
          let s = document.querySelectorAll("[data-lp]");
          setTimeout(() => {
            for (let e = 0; e < s.length; e++) {
              s[e].style.paddingRight = "0px";
            }
            (t.style.paddingRight = "0px"),
              document.documentElement.classList.remove("lock");
          }, e),
            (i = !1),
            setTimeout(function () {
              i = !0;
            }, e);
        }
      };
    function a(e) {
      setTimeout(() => {
        window.FLS && console.log(e);
      }, 0);
    }
    function n(e, t) {
      const s = Array.from(e).filter(function (e, s, i) {
        if (e.dataset[t]) return e.dataset[t].split(",")[0];
      });
      if (s.length) {
        const e = [];
        s.forEach((s) => {
          const i = {},
            r = s.dataset[t].split(",");
          (i.value = r[0]),
            (i.type = r[1] ? r[1].trim() : "max"),
            (i.item = s),
            e.push(i);
        });
        let i = e.map(function (e) {
          return (
            "(" +
            e.type +
            "-width: " +
            e.value +
            "px)," +
            e.value +
            "," +
            e.type
          );
        });
        i = (function (e) {
          return e.filter(function (e, t, s) {
            return s.indexOf(e) === t;
          });
        })(i);
        const r = [];
        if (i.length)
          return (
            i.forEach((t) => {
              const s = t.split(","),
                i = s[1],
                a = s[2],
                n = window.matchMedia(s[0]),
                o = e.filter(function (e) {
                  if (e.value === i && e.type === a) return !0;
                });
              r.push({ itemsArray: o, matchMedia: n });
            }),
            r
          );
      }
    }
    let o = (e, t = !1, s = 500, i = 0) => {
      const n = document.querySelector(e);
      if (n) {
        let o = "",
          l = 0;
        t &&
          ((o = "header.header"), (l = document.querySelector(o).offsetHeight));
        let d = {
          speedAsDuration: !0,
          speed: s,
          header: o,
          offset: i,
          easing: "easeOutQuad",
        };
        if (
          (document.documentElement.classList.contains("menu-open") &&
            (r(), document.documentElement.classList.remove("menu-open")),
          "undefined" != typeof SmoothScroll)
        )
          new SmoothScroll().animateScroll(n, "", d);
        else {
          let e = n.getBoundingClientRect().top + scrollY;
          window.scrollTo({ top: l ? e - l : e, behavior: "smooth" });
        }
        a(`[gotoBlock]: Юхуу...едем к ${e}`);
      } else a(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
    };
    function l(e) {
      return (
        null !== e &&
        "object" == typeof e &&
        "constructor" in e &&
        e.constructor === Object
      );
    }
    function d(e, t) {
      void 0 === e && (e = {}),
        void 0 === t && (t = {}),
        Object.keys(t).forEach((s) => {
          void 0 === e[s]
            ? (e[s] = t[s])
            : l(t[s]) &&
              l(e[s]) &&
              Object.keys(t[s]).length > 0 &&
              d(e[s], t[s]);
        });
    }
    const c = {
      body: {},
      addEventListener() {},
      removeEventListener() {},
      activeElement: { blur() {}, nodeName: "" },
      querySelector: () => null,
      querySelectorAll: () => [],
      getElementById: () => null,
      createEvent: () => ({ initEvent() {} }),
      createElement: () => ({
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {},
        getElementsByTagName: () => [],
      }),
      createElementNS: () => ({}),
      importNode: () => null,
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: "",
      },
    };
    function p() {
      const e = "undefined" != typeof document ? document : {};
      return d(e, c), e;
    }
    const u = {
      document: c,
      navigator: { userAgent: "" },
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: "",
      },
      history: { replaceState() {}, pushState() {}, go() {}, back() {} },
      CustomEvent: function () {
        return this;
      },
      addEventListener() {},
      removeEventListener() {},
      getComputedStyle: () => ({ getPropertyValue: () => "" }),
      Image() {},
      Date() {},
      screen: {},
      setTimeout() {},
      clearTimeout() {},
      matchMedia: () => ({}),
      requestAnimationFrame: (e) =>
        "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
      cancelAnimationFrame(e) {
        "undefined" != typeof setTimeout && clearTimeout(e);
      },
    };
    function m() {
      const e = "undefined" != typeof window ? window : {};
      return d(e, u), e;
    }
    function h(e, t) {
      return void 0 === t && (t = 0), setTimeout(e, t);
    }
    function f() {
      return Date.now();
    }
    function g(e, t) {
      void 0 === t && (t = "x");
      const s = m();
      let i, r, a;
      const n = (function (e) {
        const t = m();
        let s;
        return (
          t.getComputedStyle && (s = t.getComputedStyle(e, null)),
          !s && e.currentStyle && (s = e.currentStyle),
          s || (s = e.style),
          s
        );
      })(e);
      return (
        s.WebKitCSSMatrix
          ? ((r = n.transform || n.webkitTransform),
            r.split(",").length > 6 &&
              (r = r
                .split(", ")
                .map((e) => e.replace(",", "."))
                .join(", ")),
            (a = new s.WebKitCSSMatrix("none" === r ? "" : r)))
          : ((a =
              n.MozTransform ||
              n.OTransform ||
              n.MsTransform ||
              n.msTransform ||
              n.transform ||
              n
                .getPropertyValue("transform")
                .replace("translate(", "matrix(1, 0, 0, 1,")),
            (i = a.toString().split(","))),
        "x" === t &&
          (r = s.WebKitCSSMatrix
            ? a.m41
            : 16 === i.length
              ? parseFloat(i[12])
              : parseFloat(i[4])),
        "y" === t &&
          (r = s.WebKitCSSMatrix
            ? a.m42
            : 16 === i.length
              ? parseFloat(i[13])
              : parseFloat(i[5])),
        r || 0
      );
    }
    function v(e) {
      return (
        "object" == typeof e &&
        null !== e &&
        e.constructor &&
        "Object" === Object.prototype.toString.call(e).slice(8, -1)
      );
    }
    function w() {
      const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
        t = ["__proto__", "constructor", "prototype"];
      for (let i = 1; i < arguments.length; i += 1) {
        const r = i < 0 || arguments.length <= i ? void 0 : arguments[i];
        if (
          null != r &&
          ((s = r),
          !("undefined" != typeof window && void 0 !== window.HTMLElement
            ? s instanceof HTMLElement
            : s && (1 === s.nodeType || 11 === s.nodeType)))
        ) {
          const s = Object.keys(Object(r)).filter((e) => t.indexOf(e) < 0);
          for (let t = 0, i = s.length; t < i; t += 1) {
            const i = s[t],
              a = Object.getOwnPropertyDescriptor(r, i);
            void 0 !== a &&
              a.enumerable &&
              (v(e[i]) && v(r[i])
                ? r[i].__swiper__
                  ? (e[i] = r[i])
                  : w(e[i], r[i])
                : !v(e[i]) && v(r[i])
                  ? ((e[i] = {}),
                    r[i].__swiper__ ? (e[i] = r[i]) : w(e[i], r[i]))
                  : (e[i] = r[i]));
          }
        }
      }
      var s;
      return e;
    }
    function b(e, t, s) {
      e.style.setProperty(t, s);
    }
    function y(e) {
      let { swiper: t, targetPosition: s, side: i } = e;
      const r = m(),
        a = -t.translate;
      let n,
        o = null;
      const l = t.params.speed;
      (t.wrapperEl.style.scrollSnapType = "none"),
        r.cancelAnimationFrame(t.cssModeFrameID);
      const d = s > a ? "next" : "prev",
        c = (e, t) => ("next" === d && e >= t) || ("prev" === d && e <= t),
        p = () => {
          (n = new Date().getTime()), null === o && (o = n);
          const e = Math.max(Math.min((n - o) / l, 1), 0),
            d = 0.5 - Math.cos(e * Math.PI) / 2;
          let u = a + d * (s - a);
          if ((c(u, s) && (u = s), t.wrapperEl.scrollTo({ [i]: u }), c(u, s)))
            return (
              (t.wrapperEl.style.overflow = "hidden"),
              (t.wrapperEl.style.scrollSnapType = ""),
              setTimeout(() => {
                (t.wrapperEl.style.overflow = ""),
                  t.wrapperEl.scrollTo({ [i]: u });
              }),
              void r.cancelAnimationFrame(t.cssModeFrameID)
            );
          t.cssModeFrameID = r.requestAnimationFrame(p);
        };
      p();
    }
    function S(e, t) {
      return (
        void 0 === t && (t = ""), [...e.children].filter((e) => e.matches(t))
      );
    }
    function T(e) {
      try {
        return void console.warn(e);
      } catch (e) {}
    }
    function E(e, t) {
      void 0 === t && (t = []);
      const s = document.createElement(e);
      return (
        s.classList.add(
          ...(Array.isArray(t)
            ? t
            : (function (e) {
                return (
                  void 0 === e && (e = ""),
                  e
                    .trim()
                    .split(" ")
                    .filter((e) => !!e.trim())
                );
              })(t)),
        ),
        s
      );
    }
    function x(e, t) {
      return m().getComputedStyle(e, null).getPropertyValue(t);
    }
    function C(e) {
      let t,
        s = e;
      if (s) {
        for (t = 0; null !== (s = s.previousSibling); )
          1 === s.nodeType && (t += 1);
        return t;
      }
    }
    function _(e, t) {
      const s = [];
      let i = e.parentElement;
      for (; i; )
        t ? i.matches(t) && s.push(i) : s.push(i), (i = i.parentElement);
      return s;
    }
    function L(e, t, s) {
      const i = m();
      return s
        ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
            parseFloat(
              i
                .getComputedStyle(e, null)
                .getPropertyValue(
                  "width" === t ? "margin-right" : "margin-top",
                ),
            ) +
            parseFloat(
              i
                .getComputedStyle(e, null)
                .getPropertyValue(
                  "width" === t ? "margin-left" : "margin-bottom",
                ),
            )
        : e.offsetWidth;
    }
    function M(e) {
      return (Array.isArray(e) ? e : [e]).filter((e) => !!e);
    }
    let P, k, A;
    function I() {
      return (
        P ||
          (P = (function () {
            const e = m(),
              t = p();
            return {
              smoothScroll:
                t.documentElement &&
                t.documentElement.style &&
                "scrollBehavior" in t.documentElement.style,
              touch: !!(
                "ontouchstart" in e ||
                (e.DocumentTouch && t instanceof e.DocumentTouch)
              ),
            };
          })()),
        P
      );
    }
    function O(e) {
      return (
        void 0 === e && (e = {}),
        k ||
          (k = (function (e) {
            let { userAgent: t } = void 0 === e ? {} : e;
            const s = I(),
              i = m(),
              r = i.navigator.platform,
              a = t || i.navigator.userAgent,
              n = { ios: !1, android: !1 },
              o = i.screen.width,
              l = i.screen.height,
              d = a.match(/(Android);?[\s\/]+([\d.]+)?/);
            let c = a.match(/(iPad).*OS\s([\d_]+)/);
            const p = a.match(/(iPod)(.*OS\s([\d_]+))?/),
              u = !c && a.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
              h = "Win32" === r;
            let f = "MacIntel" === r;
            return (
              !c &&
                f &&
                s.touch &&
                [
                  "1024x1366",
                  "1366x1024",
                  "834x1194",
                  "1194x834",
                  "834x1112",
                  "1112x834",
                  "768x1024",
                  "1024x768",
                  "820x1180",
                  "1180x820",
                  "810x1080",
                  "1080x810",
                ].indexOf(`${o}x${l}`) >= 0 &&
                ((c = a.match(/(Version)\/([\d.]+)/)),
                c || (c = [0, 1, "13_0_0"]),
                (f = !1)),
              d && !h && ((n.os = "android"), (n.android = !0)),
              (c || u || p) && ((n.os = "ios"), (n.ios = !0)),
              n
            );
          })(e)),
        k
      );
    }
    function z() {
      return (
        A ||
          (A = (function () {
            const e = m(),
              t = O();
            let s = !1;
            function i() {
              const t = e.navigator.userAgent.toLowerCase();
              return (
                t.indexOf("safari") >= 0 &&
                t.indexOf("chrome") < 0 &&
                t.indexOf("android") < 0
              );
            }
            if (i()) {
              const t = String(e.navigator.userAgent);
              if (t.includes("Version/")) {
                const [e, i] = t
                  .split("Version/")[1]
                  .split(" ")[0]
                  .split(".")
                  .map((e) => Number(e));
                s = e < 16 || (16 === e && i < 2);
              }
            }
            const r = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                e.navigator.userAgent,
              ),
              a = i();
            return {
              isSafari: s || a,
              needPerspectiveFix: s,
              need3dFix: a || (r && t.ios),
              isWebView: r,
            };
          })()),
        A
      );
    }
    var G = {
      on(e, t, s) {
        const i = this;
        if (!i.eventsListeners || i.destroyed) return i;
        if ("function" != typeof t) return i;
        const r = s ? "unshift" : "push";
        return (
          e.split(" ").forEach((e) => {
            i.eventsListeners[e] || (i.eventsListeners[e] = []),
              i.eventsListeners[e][r](t);
          }),
          i
        );
      },
      once(e, t, s) {
        const i = this;
        if (!i.eventsListeners || i.destroyed) return i;
        if ("function" != typeof t) return i;
        function r() {
          i.off(e, r), r.__emitterProxy && delete r.__emitterProxy;
          for (var s = arguments.length, a = new Array(s), n = 0; n < s; n++)
            a[n] = arguments[n];
          t.apply(i, a);
        }
        return (r.__emitterProxy = t), i.on(e, r, s);
      },
      onAny(e, t) {
        const s = this;
        if (!s.eventsListeners || s.destroyed) return s;
        if ("function" != typeof e) return s;
        const i = t ? "unshift" : "push";
        return (
          s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
        );
      },
      offAny(e) {
        const t = this;
        if (!t.eventsListeners || t.destroyed) return t;
        if (!t.eventsAnyListeners) return t;
        const s = t.eventsAnyListeners.indexOf(e);
        return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
      },
      off(e, t) {
        const s = this;
        return !s.eventsListeners || s.destroyed
          ? s
          : s.eventsListeners
            ? (e.split(" ").forEach((e) => {
                void 0 === t
                  ? (s.eventsListeners[e] = [])
                  : s.eventsListeners[e] &&
                    s.eventsListeners[e].forEach((i, r) => {
                      (i === t ||
                        (i.__emitterProxy && i.__emitterProxy === t)) &&
                        s.eventsListeners[e].splice(r, 1);
                    });
              }),
              s)
            : s;
      },
      emit() {
        const e = this;
        if (!e.eventsListeners || e.destroyed) return e;
        if (!e.eventsListeners) return e;
        let t, s, i;
        for (var r = arguments.length, a = new Array(r), n = 0; n < r; n++)
          a[n] = arguments[n];
        "string" == typeof a[0] || Array.isArray(a[0])
          ? ((t = a[0]), (s = a.slice(1, a.length)), (i = e))
          : ((t = a[0].events), (s = a[0].data), (i = a[0].context || e)),
          s.unshift(i);
        return (
          (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
            e.eventsAnyListeners &&
              e.eventsAnyListeners.length &&
              e.eventsAnyListeners.forEach((e) => {
                e.apply(i, [t, ...s]);
              }),
              e.eventsListeners &&
                e.eventsListeners[t] &&
                e.eventsListeners[t].forEach((e) => {
                  e.apply(i, s);
                });
          }),
          e
        );
      },
    };
    const D = (e, t, s) => {
      t && !e.classList.contains(s)
        ? e.classList.add(s)
        : !t && e.classList.contains(s) && e.classList.remove(s);
    };
    const $ = (e, t, s) => {
      t && !e.classList.contains(s)
        ? e.classList.add(s)
        : !t && e.classList.contains(s) && e.classList.remove(s);
    };
    const B = (e, t) => {
        if (!e || e.destroyed || !e.params) return;
        const s = t.closest(
          e.isElement ? "swiper-slide" : `.${e.params.slideClass}`,
        );
        if (s) {
          let t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
          !t &&
            e.isElement &&
            (s.shadowRoot
              ? (t = s.shadowRoot.querySelector(
                  `.${e.params.lazyPreloaderClass}`,
                ))
              : requestAnimationFrame(() => {
                  s.shadowRoot &&
                    ((t = s.shadowRoot.querySelector(
                      `.${e.params.lazyPreloaderClass}`,
                    )),
                    t && t.remove());
                })),
            t && t.remove();
        }
      },
      V = (e, t) => {
        if (!e.slides[t]) return;
        const s = e.slides[t].querySelector('[loading="lazy"]');
        s && s.removeAttribute("loading");
      },
      q = (e) => {
        if (!e || e.destroyed || !e.params) return;
        let t = e.params.lazyPreloadPrevNext;
        const s = e.slides.length;
        if (!s || !t || t < 0) return;
        t = Math.min(t, s);
        const i =
            "auto" === e.params.slidesPerView
              ? e.slidesPerViewDynamic()
              : Math.ceil(e.params.slidesPerView),
          r = e.activeIndex;
        if (e.params.grid && e.params.grid.rows > 1) {
          const s = r,
            a = [s - t];
          return (
            a.push(...Array.from({ length: t }).map((e, t) => s + i + t)),
            void e.slides.forEach((t, s) => {
              a.includes(t.column) && V(e, s);
            })
          );
        }
        const a = r + i - 1;
        if (e.params.rewind || e.params.loop)
          for (let i = r - t; i <= a + t; i += 1) {
            const t = ((i % s) + s) % s;
            (t < r || t > a) && V(e, t);
          }
        else
          for (let i = Math.max(r - t, 0); i <= Math.min(a + t, s - 1); i += 1)
            i !== r && (i > a || i < r) && V(e, i);
      };
    var H = {
      updateSize: function () {
        const e = this;
        let t, s;
        const i = e.el;
        (t =
          void 0 !== e.params.width && null !== e.params.width
            ? e.params.width
            : i.clientWidth),
          (s =
            void 0 !== e.params.height && null !== e.params.height
              ? e.params.height
              : i.clientHeight),
          (0 === t && e.isHorizontal()) ||
            (0 === s && e.isVertical()) ||
            ((t =
              t -
              parseInt(x(i, "padding-left") || 0, 10) -
              parseInt(x(i, "padding-right") || 0, 10)),
            (s =
              s -
              parseInt(x(i, "padding-top") || 0, 10) -
              parseInt(x(i, "padding-bottom") || 0, 10)),
            Number.isNaN(t) && (t = 0),
            Number.isNaN(s) && (s = 0),
            Object.assign(e, {
              width: t,
              height: s,
              size: e.isHorizontal() ? t : s,
            }));
      },
      updateSlides: function () {
        const e = this;
        function t(t, s) {
          return parseFloat(t.getPropertyValue(e.getDirectionLabel(s)) || 0);
        }
        const s = e.params,
          {
            wrapperEl: i,
            slidesEl: r,
            size: a,
            rtlTranslate: n,
            wrongRTL: o,
          } = e,
          l = e.virtual && s.virtual.enabled,
          d = l ? e.virtual.slides.length : e.slides.length,
          c = S(r, `.${e.params.slideClass}, swiper-slide`),
          p = l ? e.virtual.slides.length : c.length;
        let u = [];
        const m = [],
          h = [];
        let f = s.slidesOffsetBefore;
        "function" == typeof f && (f = s.slidesOffsetBefore.call(e));
        let g = s.slidesOffsetAfter;
        "function" == typeof g && (g = s.slidesOffsetAfter.call(e));
        const v = e.snapGrid.length,
          w = e.slidesGrid.length;
        let y = s.spaceBetween,
          T = -f,
          E = 0,
          C = 0;
        if (void 0 === a) return;
        "string" == typeof y && y.indexOf("%") >= 0
          ? (y = (parseFloat(y.replace("%", "")) / 100) * a)
          : "string" == typeof y && (y = parseFloat(y)),
          (e.virtualSize = -y),
          c.forEach((e) => {
            n ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
              (e.style.marginBottom = ""),
              (e.style.marginTop = "");
          }),
          s.centeredSlides &&
            s.cssMode &&
            (b(i, "--swiper-centered-offset-before", ""),
            b(i, "--swiper-centered-offset-after", ""));
        const _ = s.grid && s.grid.rows > 1 && e.grid;
        let M;
        _ ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides();
        const P =
          "auto" === s.slidesPerView &&
          s.breakpoints &&
          Object.keys(s.breakpoints).filter(
            (e) => void 0 !== s.breakpoints[e].slidesPerView,
          ).length > 0;
        for (let i = 0; i < p; i += 1) {
          let r;
          if (
            ((M = 0),
            c[i] && (r = c[i]),
            _ && e.grid.updateSlide(i, r, c),
            !c[i] || "none" !== x(r, "display"))
          ) {
            if ("auto" === s.slidesPerView) {
              P && (c[i].style[e.getDirectionLabel("width")] = "");
              const a = getComputedStyle(r),
                n = r.style.transform,
                o = r.style.webkitTransform;
              if (
                (n && (r.style.transform = "none"),
                o && (r.style.webkitTransform = "none"),
                s.roundLengths)
              )
                M = e.isHorizontal() ? L(r, "width", !0) : L(r, "height", !0);
              else {
                const e = t(a, "width"),
                  s = t(a, "padding-left"),
                  i = t(a, "padding-right"),
                  n = t(a, "margin-left"),
                  o = t(a, "margin-right"),
                  l = a.getPropertyValue("box-sizing");
                if (l && "border-box" === l) M = e + n + o;
                else {
                  const { clientWidth: t, offsetWidth: a } = r;
                  M = e + s + i + n + o + (a - t);
                }
              }
              n && (r.style.transform = n),
                o && (r.style.webkitTransform = o),
                s.roundLengths && (M = Math.floor(M));
            } else
              (M = (a - (s.slidesPerView - 1) * y) / s.slidesPerView),
                s.roundLengths && (M = Math.floor(M)),
                c[i] && (c[i].style[e.getDirectionLabel("width")] = `${M}px`);
            c[i] && (c[i].swiperSlideSize = M),
              h.push(M),
              s.centeredSlides
                ? ((T = T + M / 2 + E / 2 + y),
                  0 === E && 0 !== i && (T = T - a / 2 - y),
                  0 === i && (T = T - a / 2 - y),
                  Math.abs(T) < 0.001 && (T = 0),
                  s.roundLengths && (T = Math.floor(T)),
                  C % s.slidesPerGroup == 0 && u.push(T),
                  m.push(T))
                : (s.roundLengths && (T = Math.floor(T)),
                  (C - Math.min(e.params.slidesPerGroupSkip, C)) %
                    e.params.slidesPerGroup ==
                    0 && u.push(T),
                  m.push(T),
                  (T = T + M + y)),
              (e.virtualSize += M + y),
              (E = M),
              (C += 1);
          }
        }
        if (
          ((e.virtualSize = Math.max(e.virtualSize, a) + g),
          n &&
            o &&
            ("slide" === s.effect || "coverflow" === s.effect) &&
            (i.style.width = `${e.virtualSize + y}px`),
          s.setWrapperSize &&
            (i.style[e.getDirectionLabel("width")] = `${e.virtualSize + y}px`),
          _ && e.grid.updateWrapperSize(M, u),
          !s.centeredSlides)
        ) {
          const t = [];
          for (let i = 0; i < u.length; i += 1) {
            let r = u[i];
            s.roundLengths && (r = Math.floor(r)),
              u[i] <= e.virtualSize - a && t.push(r);
          }
          (u = t),
            Math.floor(e.virtualSize - a) - Math.floor(u[u.length - 1]) > 1 &&
              u.push(e.virtualSize - a);
        }
        if (l && s.loop) {
          const t = h[0] + y;
          if (s.slidesPerGroup > 1) {
            const i = Math.ceil(
                (e.virtual.slidesBefore + e.virtual.slidesAfter) /
                  s.slidesPerGroup,
              ),
              r = t * s.slidesPerGroup;
            for (let e = 0; e < i; e += 1) u.push(u[u.length - 1] + r);
          }
          for (
            let i = 0;
            i < e.virtual.slidesBefore + e.virtual.slidesAfter;
            i += 1
          )
            1 === s.slidesPerGroup && u.push(u[u.length - 1] + t),
              m.push(m[m.length - 1] + t),
              (e.virtualSize += t);
        }
        if ((0 === u.length && (u = [0]), 0 !== y)) {
          const t =
            e.isHorizontal() && n
              ? "marginLeft"
              : e.getDirectionLabel("marginRight");
          c.filter(
            (e, t) => !(s.cssMode && !s.loop) || t !== c.length - 1,
          ).forEach((e) => {
            e.style[t] = `${y}px`;
          });
        }
        if (s.centeredSlides && s.centeredSlidesBounds) {
          let e = 0;
          h.forEach((t) => {
            e += t + (y || 0);
          }),
            (e -= y);
          const t = e - a;
          u = u.map((e) => (e <= 0 ? -f : e > t ? t + g : e));
        }
        if (s.centerInsufficientSlides) {
          let e = 0;
          h.forEach((t) => {
            e += t + (y || 0);
          }),
            (e -= y);
          const t = (s.slidesOffsetBefore || 0) + (s.slidesOffsetAfter || 0);
          if (e + t < a) {
            const s = (a - e - t) / 2;
            u.forEach((e, t) => {
              u[t] = e - s;
            }),
              m.forEach((e, t) => {
                m[t] = e + s;
              });
          }
        }
        if (
          (Object.assign(e, {
            slides: c,
            snapGrid: u,
            slidesGrid: m,
            slidesSizesGrid: h,
          }),
          s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
        ) {
          b(i, "--swiper-centered-offset-before", -u[0] + "px"),
            b(
              i,
              "--swiper-centered-offset-after",
              e.size / 2 - h[h.length - 1] / 2 + "px",
            );
          const t = -e.snapGrid[0],
            s = -e.slidesGrid[0];
          (e.snapGrid = e.snapGrid.map((e) => e + t)),
            (e.slidesGrid = e.slidesGrid.map((e) => e + s));
        }
        if (
          (p !== d && e.emit("slidesLengthChange"),
          u.length !== v &&
            (e.params.watchOverflow && e.checkOverflow(),
            e.emit("snapGridLengthChange")),
          m.length !== w && e.emit("slidesGridLengthChange"),
          s.watchSlidesProgress && e.updateSlidesOffset(),
          e.emit("slidesUpdated"),
          !(l || s.cssMode || ("slide" !== s.effect && "fade" !== s.effect)))
        ) {
          const t = `${s.containerModifierClass}backface-hidden`,
            i = e.el.classList.contains(t);
          p <= s.maxBackfaceHiddenSlides
            ? i || e.el.classList.add(t)
            : i && e.el.classList.remove(t);
        }
      },
      updateAutoHeight: function (e) {
        const t = this,
          s = [],
          i = t.virtual && t.params.virtual.enabled;
        let r,
          a = 0;
        "number" == typeof e
          ? t.setTransition(e)
          : !0 === e && t.setTransition(t.params.speed);
        const n = (e) => (i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e]);
        if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
          if (t.params.centeredSlides)
            (t.visibleSlides || []).forEach((e) => {
              s.push(e);
            });
          else
            for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
              const e = t.activeIndex + r;
              if (e > t.slides.length && !i) break;
              s.push(n(e));
            }
        else s.push(n(t.activeIndex));
        for (r = 0; r < s.length; r += 1)
          if (void 0 !== s[r]) {
            const e = s[r].offsetHeight;
            a = e > a ? e : a;
          }
        (a || 0 === a) && (t.wrapperEl.style.height = `${a}px`);
      },
      updateSlidesOffset: function () {
        const e = this,
          t = e.slides,
          s = e.isElement
            ? e.isHorizontal()
              ? e.wrapperEl.offsetLeft
              : e.wrapperEl.offsetTop
            : 0;
        for (let i = 0; i < t.length; i += 1)
          t[i].swiperSlideOffset =
            (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) -
            s -
            e.cssOverflowAdjustment();
      },
      updateSlidesProgress: function (e) {
        void 0 === e && (e = (this && this.translate) || 0);
        const t = this,
          s = t.params,
          { slides: i, rtlTranslate: r, snapGrid: a } = t;
        if (0 === i.length) return;
        void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
        let n = -e;
        r && (n = e), (t.visibleSlidesIndexes = []), (t.visibleSlides = []);
        let o = s.spaceBetween;
        "string" == typeof o && o.indexOf("%") >= 0
          ? (o = (parseFloat(o.replace("%", "")) / 100) * t.size)
          : "string" == typeof o && (o = parseFloat(o));
        for (let e = 0; e < i.length; e += 1) {
          const l = i[e];
          let d = l.swiperSlideOffset;
          s.cssMode && s.centeredSlides && (d -= i[0].swiperSlideOffset);
          const c =
              (n + (s.centeredSlides ? t.minTranslate() : 0) - d) /
              (l.swiperSlideSize + o),
            p =
              (n - a[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) /
              (l.swiperSlideSize + o),
            u = -(n - d),
            m = u + t.slidesSizesGrid[e],
            h = u >= 0 && u <= t.size - t.slidesSizesGrid[e],
            f =
              (u >= 0 && u < t.size - 1) ||
              (m > 1 && m <= t.size) ||
              (u <= 0 && m >= t.size);
          f && (t.visibleSlides.push(l), t.visibleSlidesIndexes.push(e)),
            D(l, f, s.slideVisibleClass),
            D(l, h, s.slideFullyVisibleClass),
            (l.progress = r ? -c : c),
            (l.originalProgress = r ? -p : p);
        }
      },
      updateProgress: function (e) {
        const t = this;
        if (void 0 === e) {
          const s = t.rtlTranslate ? -1 : 1;
          e = (t && t.translate && t.translate * s) || 0;
        }
        const s = t.params,
          i = t.maxTranslate() - t.minTranslate();
        let { progress: r, isBeginning: a, isEnd: n, progressLoop: o } = t;
        const l = a,
          d = n;
        if (0 === i) (r = 0), (a = !0), (n = !0);
        else {
          r = (e - t.minTranslate()) / i;
          const s = Math.abs(e - t.minTranslate()) < 1,
            o = Math.abs(e - t.maxTranslate()) < 1;
          (a = s || r <= 0), (n = o || r >= 1), s && (r = 0), o && (r = 1);
        }
        if (s.loop) {
          const s = t.getSlideIndexByData(0),
            i = t.getSlideIndexByData(t.slides.length - 1),
            r = t.slidesGrid[s],
            a = t.slidesGrid[i],
            n = t.slidesGrid[t.slidesGrid.length - 1],
            l = Math.abs(e);
          (o = l >= r ? (l - r) / n : (l + n - a) / n), o > 1 && (o -= 1);
        }
        Object.assign(t, {
          progress: r,
          progressLoop: o,
          isBeginning: a,
          isEnd: n,
        }),
          (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
            t.updateSlidesProgress(e),
          a && !l && t.emit("reachBeginning toEdge"),
          n && !d && t.emit("reachEnd toEdge"),
          ((l && !a) || (d && !n)) && t.emit("fromEdge"),
          t.emit("progress", r);
      },
      updateSlidesClasses: function () {
        const e = this,
          { slides: t, params: s, slidesEl: i, activeIndex: r } = e,
          a = e.virtual && s.virtual.enabled,
          n = e.grid && s.grid && s.grid.rows > 1,
          o = (e) => S(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
        let l, d, c;
        if (a)
          if (s.loop) {
            let t = r - e.virtual.slidesBefore;
            t < 0 && (t = e.virtual.slides.length + t),
              t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
              (l = o(`[data-swiper-slide-index="${t}"]`));
          } else l = o(`[data-swiper-slide-index="${r}"]`);
        else
          n
            ? ((l = t.filter((e) => e.column === r)[0]),
              (c = t.filter((e) => e.column === r + 1)[0]),
              (d = t.filter((e) => e.column === r - 1)[0]))
            : (l = t[r]);
        l &&
          (n ||
            ((c = (function (e, t) {
              const s = [];
              for (; e.nextElementSibling; ) {
                const i = e.nextElementSibling;
                t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
              }
              return s;
            })(l, `.${s.slideClass}, swiper-slide`)[0]),
            s.loop && !c && (c = t[0]),
            (d = (function (e, t) {
              const s = [];
              for (; e.previousElementSibling; ) {
                const i = e.previousElementSibling;
                t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
              }
              return s;
            })(l, `.${s.slideClass}, swiper-slide`)[0]),
            s.loop && 0 === !d && (d = t[t.length - 1]))),
          t.forEach((e) => {
            $(e, e === l, s.slideActiveClass),
              $(e, e === c, s.slideNextClass),
              $(e, e === d, s.slidePrevClass);
          }),
          e.emitSlidesClasses();
      },
      updateActiveIndex: function (e) {
        const t = this,
          s = t.rtlTranslate ? t.translate : -t.translate,
          {
            snapGrid: i,
            params: r,
            activeIndex: a,
            realIndex: n,
            snapIndex: o,
          } = t;
        let l,
          d = e;
        const c = (e) => {
          let s = e - t.virtual.slidesBefore;
          return (
            s < 0 && (s = t.virtual.slides.length + s),
            s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
            s
          );
        };
        if (
          (void 0 === d &&
            (d = (function (e) {
              const { slidesGrid: t, params: s } = e,
                i = e.rtlTranslate ? e.translate : -e.translate;
              let r;
              for (let e = 0; e < t.length; e += 1)
                void 0 !== t[e + 1]
                  ? i >= t[e] && i < t[e + 1] - (t[e + 1] - t[e]) / 2
                    ? (r = e)
                    : i >= t[e] && i < t[e + 1] && (r = e + 1)
                  : i >= t[e] && (r = e);
              return (
                s.normalizeSlideIndex && (r < 0 || void 0 === r) && (r = 0), r
              );
            })(t)),
          i.indexOf(s) >= 0)
        )
          l = i.indexOf(s);
        else {
          const e = Math.min(r.slidesPerGroupSkip, d);
          l = e + Math.floor((d - e) / r.slidesPerGroup);
        }
        if ((l >= i.length && (l = i.length - 1), d === a && !t.params.loop))
          return void (
            l !== o && ((t.snapIndex = l), t.emit("snapIndexChange"))
          );
        if (d === a && t.params.loop && t.virtual && t.params.virtual.enabled)
          return void (t.realIndex = c(d));
        const p = t.grid && r.grid && r.grid.rows > 1;
        let u;
        if (t.virtual && r.virtual.enabled && r.loop) u = c(d);
        else if (p) {
          const e = t.slides.filter((e) => e.column === d)[0];
          let s = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
          Number.isNaN(s) && (s = Math.max(t.slides.indexOf(e), 0)),
            (u = Math.floor(s / r.grid.rows));
        } else if (t.slides[d]) {
          const e = t.slides[d].getAttribute("data-swiper-slide-index");
          u = e ? parseInt(e, 10) : d;
        } else u = d;
        Object.assign(t, {
          previousSnapIndex: o,
          snapIndex: l,
          previousRealIndex: n,
          realIndex: u,
          previousIndex: a,
          activeIndex: d,
        }),
          t.initialized && q(t),
          t.emit("activeIndexChange"),
          t.emit("snapIndexChange"),
          (t.initialized || t.params.runCallbacksOnInit) &&
            (n !== u && t.emit("realIndexChange"), t.emit("slideChange"));
      },
      updateClickedSlide: function (e, t) {
        const s = this,
          i = s.params;
        let r = e.closest(`.${i.slideClass}, swiper-slide`);
        !r &&
          s.isElement &&
          t &&
          t.length > 1 &&
          t.includes(e) &&
          [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e) => {
            !r &&
              e.matches &&
              e.matches(`.${i.slideClass}, swiper-slide`) &&
              (r = e);
          });
        let a,
          n = !1;
        if (r)
          for (let e = 0; e < s.slides.length; e += 1)
            if (s.slides[e] === r) {
              (n = !0), (a = e);
              break;
            }
        if (!r || !n)
          return (s.clickedSlide = void 0), void (s.clickedIndex = void 0);
        (s.clickedSlide = r),
          s.virtual && s.params.virtual.enabled
            ? (s.clickedIndex = parseInt(
                r.getAttribute("data-swiper-slide-index"),
                10,
              ))
            : (s.clickedIndex = a),
          i.slideToClickedSlide &&
            void 0 !== s.clickedIndex &&
            s.clickedIndex !== s.activeIndex &&
            s.slideToClickedSlide();
      },
    };
    var N = {
      getTranslate: function (e) {
        void 0 === e && (e = this.isHorizontal() ? "x" : "y");
        const { params: t, rtlTranslate: s, translate: i, wrapperEl: r } = this;
        if (t.virtualTranslate) return s ? -i : i;
        if (t.cssMode) return i;
        let a = g(r, e);
        return (a += this.cssOverflowAdjustment()), s && (a = -a), a || 0;
      },
      setTranslate: function (e, t) {
        const s = this,
          { rtlTranslate: i, params: r, wrapperEl: a, progress: n } = s;
        let o,
          l = 0,
          d = 0;
        s.isHorizontal() ? (l = i ? -e : e) : (d = e),
          r.roundLengths && ((l = Math.floor(l)), (d = Math.floor(d))),
          (s.previousTranslate = s.translate),
          (s.translate = s.isHorizontal() ? l : d),
          r.cssMode
            ? (a[s.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                s.isHorizontal() ? -l : -d)
            : r.virtualTranslate ||
              (s.isHorizontal()
                ? (l -= s.cssOverflowAdjustment())
                : (d -= s.cssOverflowAdjustment()),
              (a.style.transform = `translate3d(${l}px, ${d}px, 0px)`));
        const c = s.maxTranslate() - s.minTranslate();
        (o = 0 === c ? 0 : (e - s.minTranslate()) / c),
          o !== n && s.updateProgress(e),
          s.emit("setTranslate", s.translate, t);
      },
      minTranslate: function () {
        return -this.snapGrid[0];
      },
      maxTranslate: function () {
        return -this.snapGrid[this.snapGrid.length - 1];
      },
      translateTo: function (e, t, s, i, r) {
        void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === s && (s = !0),
          void 0 === i && (i = !0);
        const a = this,
          { params: n, wrapperEl: o } = a;
        if (a.animating && n.preventInteractionOnTransition) return !1;
        const l = a.minTranslate(),
          d = a.maxTranslate();
        let c;
        if (
          ((c = i && e > l ? l : i && e < d ? d : e),
          a.updateProgress(c),
          n.cssMode)
        ) {
          const e = a.isHorizontal();
          if (0 === t) o[e ? "scrollLeft" : "scrollTop"] = -c;
          else {
            if (!a.support.smoothScroll)
              return (
                y({ swiper: a, targetPosition: -c, side: e ? "left" : "top" }),
                !0
              );
            o.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
          }
          return !0;
        }
        return (
          0 === t
            ? (a.setTransition(0),
              a.setTranslate(c),
              s &&
                (a.emit("beforeTransitionStart", t, r),
                a.emit("transitionEnd")))
            : (a.setTransition(t),
              a.setTranslate(c),
              s &&
                (a.emit("beforeTransitionStart", t, r),
                a.emit("transitionStart")),
              a.animating ||
                ((a.animating = !0),
                a.onTranslateToWrapperTransitionEnd ||
                  (a.onTranslateToWrapperTransitionEnd = function (e) {
                    a &&
                      !a.destroyed &&
                      e.target === this &&
                      (a.wrapperEl.removeEventListener(
                        "transitionend",
                        a.onTranslateToWrapperTransitionEnd,
                      ),
                      (a.onTranslateToWrapperTransitionEnd = null),
                      delete a.onTranslateToWrapperTransitionEnd,
                      (a.animating = !1),
                      s && a.emit("transitionEnd"));
                  }),
                a.wrapperEl.addEventListener(
                  "transitionend",
                  a.onTranslateToWrapperTransitionEnd,
                ))),
          !0
        );
      },
    };
    function F(e) {
      let { swiper: t, runCallbacks: s, direction: i, step: r } = e;
      const { activeIndex: a, previousIndex: n } = t;
      let o = i;
      if (
        (o || (o = a > n ? "next" : a < n ? "prev" : "reset"),
        t.emit(`transition${r}`),
        s && a !== n)
      ) {
        if ("reset" === o) return void t.emit(`slideResetTransition${r}`);
        t.emit(`slideChangeTransition${r}`),
          "next" === o
            ? t.emit(`slideNextTransition${r}`)
            : t.emit(`slidePrevTransition${r}`);
      }
    }
    var R = {
      slideTo: function (e, t, s, i, r) {
        void 0 === e && (e = 0),
          void 0 === s && (s = !0),
          "string" == typeof e && (e = parseInt(e, 10));
        const a = this;
        let n = e;
        n < 0 && (n = 0);
        const {
          params: o,
          snapGrid: l,
          slidesGrid: d,
          previousIndex: c,
          activeIndex: p,
          rtlTranslate: u,
          wrapperEl: m,
          enabled: h,
        } = a;
        if (
          (!h && !i && !r) ||
          a.destroyed ||
          (a.animating && o.preventInteractionOnTransition)
        )
          return !1;
        void 0 === t && (t = a.params.speed);
        const f = Math.min(a.params.slidesPerGroupSkip, n);
        let g = f + Math.floor((n - f) / a.params.slidesPerGroup);
        g >= l.length && (g = l.length - 1);
        const v = -l[g];
        if (o.normalizeSlideIndex)
          for (let e = 0; e < d.length; e += 1) {
            const t = -Math.floor(100 * v),
              s = Math.floor(100 * d[e]),
              i = Math.floor(100 * d[e + 1]);
            void 0 !== d[e + 1]
              ? t >= s && t < i - (i - s) / 2
                ? (n = e)
                : t >= s && t < i && (n = e + 1)
              : t >= s && (n = e);
          }
        if (a.initialized && n !== p) {
          if (
            !a.allowSlideNext &&
            (u
              ? v > a.translate && v > a.minTranslate()
              : v < a.translate && v < a.minTranslate())
          )
            return !1;
          if (
            !a.allowSlidePrev &&
            v > a.translate &&
            v > a.maxTranslate() &&
            (p || 0) !== n
          )
            return !1;
        }
        let w;
        if (
          (n !== (c || 0) && s && a.emit("beforeSlideChangeStart"),
          a.updateProgress(v),
          (w = n > p ? "next" : n < p ? "prev" : "reset"),
          (u && -v === a.translate) || (!u && v === a.translate))
        )
          return (
            a.updateActiveIndex(n),
            o.autoHeight && a.updateAutoHeight(),
            a.updateSlidesClasses(),
            "slide" !== o.effect && a.setTranslate(v),
            "reset" !== w && (a.transitionStart(s, w), a.transitionEnd(s, w)),
            !1
          );
        if (o.cssMode) {
          const e = a.isHorizontal(),
            s = u ? v : -v;
          if (0 === t) {
            const t = a.virtual && a.params.virtual.enabled;
            t &&
              ((a.wrapperEl.style.scrollSnapType = "none"),
              (a._immediateVirtual = !0)),
              t && !a._cssModeVirtualInitialSet && a.params.initialSlide > 0
                ? ((a._cssModeVirtualInitialSet = !0),
                  requestAnimationFrame(() => {
                    m[e ? "scrollLeft" : "scrollTop"] = s;
                  }))
                : (m[e ? "scrollLeft" : "scrollTop"] = s),
              t &&
                requestAnimationFrame(() => {
                  (a.wrapperEl.style.scrollSnapType = ""),
                    (a._immediateVirtual = !1);
                });
          } else {
            if (!a.support.smoothScroll)
              return (
                y({ swiper: a, targetPosition: s, side: e ? "left" : "top" }),
                !0
              );
            m.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
          }
          return !0;
        }
        return (
          a.setTransition(t),
          a.setTranslate(v),
          a.updateActiveIndex(n),
          a.updateSlidesClasses(),
          a.emit("beforeTransitionStart", t, i),
          a.transitionStart(s, w),
          0 === t
            ? a.transitionEnd(s, w)
            : a.animating ||
              ((a.animating = !0),
              a.onSlideToWrapperTransitionEnd ||
                (a.onSlideToWrapperTransitionEnd = function (e) {
                  a &&
                    !a.destroyed &&
                    e.target === this &&
                    (a.wrapperEl.removeEventListener(
                      "transitionend",
                      a.onSlideToWrapperTransitionEnd,
                    ),
                    (a.onSlideToWrapperTransitionEnd = null),
                    delete a.onSlideToWrapperTransitionEnd,
                    a.transitionEnd(s, w));
                }),
              a.wrapperEl.addEventListener(
                "transitionend",
                a.onSlideToWrapperTransitionEnd,
              )),
          !0
        );
      },
      slideToLoop: function (e, t, s, i) {
        if (
          (void 0 === e && (e = 0),
          void 0 === s && (s = !0),
          "string" == typeof e)
        ) {
          e = parseInt(e, 10);
        }
        const r = this;
        if (r.destroyed) return;
        void 0 === t && (t = r.params.speed);
        const a = r.grid && r.params.grid && r.params.grid.rows > 1;
        let n = e;
        if (r.params.loop)
          if (r.virtual && r.params.virtual.enabled)
            n += r.virtual.slidesBefore;
          else {
            let e;
            if (a) {
              const t = n * r.params.grid.rows;
              e = r.slides.filter(
                (e) => 1 * e.getAttribute("data-swiper-slide-index") === t,
              )[0].column;
            } else e = r.getSlideIndexByData(n);
            const t = a
                ? Math.ceil(r.slides.length / r.params.grid.rows)
                : r.slides.length,
              { centeredSlides: s } = r.params;
            let o = r.params.slidesPerView;
            "auto" === o
              ? (o = r.slidesPerViewDynamic())
              : ((o = Math.ceil(parseFloat(r.params.slidesPerView, 10))),
                s && o % 2 == 0 && (o += 1));
            let l = t - e < o;
            if (
              (s && (l = l || e < Math.ceil(o / 2)),
              i && s && "auto" !== r.params.slidesPerView && !a && (l = !1),
              l)
            ) {
              const i = s
                ? e < r.activeIndex
                  ? "prev"
                  : "next"
                : e - r.activeIndex - 1 < r.params.slidesPerView
                  ? "next"
                  : "prev";
              r.loopFix({
                direction: i,
                slideTo: !0,
                activeSlideIndex: "next" === i ? e + 1 : e - t + 1,
                slideRealIndex: "next" === i ? r.realIndex : void 0,
              });
            }
            if (a) {
              const e = n * r.params.grid.rows;
              n = r.slides.filter(
                (t) => 1 * t.getAttribute("data-swiper-slide-index") === e,
              )[0].column;
            } else n = r.getSlideIndexByData(n);
          }
        return (
          requestAnimationFrame(() => {
            r.slideTo(n, t, s, i);
          }),
          r
        );
      },
      slideNext: function (e, t, s) {
        void 0 === t && (t = !0);
        const i = this,
          { enabled: r, params: a, animating: n } = i;
        if (!r || i.destroyed) return i;
        void 0 === e && (e = i.params.speed);
        let o = a.slidesPerGroup;
        "auto" === a.slidesPerView &&
          1 === a.slidesPerGroup &&
          a.slidesPerGroupAuto &&
          (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
        const l = i.activeIndex < a.slidesPerGroupSkip ? 1 : o,
          d = i.virtual && a.virtual.enabled;
        if (a.loop) {
          if (n && !d && a.loopPreventsSliding) return !1;
          if (
            (i.loopFix({ direction: "next" }),
            (i._clientLeft = i.wrapperEl.clientLeft),
            i.activeIndex === i.slides.length - 1 && a.cssMode)
          )
            return (
              requestAnimationFrame(() => {
                i.slideTo(i.activeIndex + l, e, t, s);
              }),
              !0
            );
        }
        return a.rewind && i.isEnd
          ? i.slideTo(0, e, t, s)
          : i.slideTo(i.activeIndex + l, e, t, s);
      },
      slidePrev: function (e, t, s) {
        void 0 === t && (t = !0);
        const i = this,
          {
            params: r,
            snapGrid: a,
            slidesGrid: n,
            rtlTranslate: o,
            enabled: l,
            animating: d,
          } = i;
        if (!l || i.destroyed) return i;
        void 0 === e && (e = i.params.speed);
        const c = i.virtual && r.virtual.enabled;
        if (r.loop) {
          if (d && !c && r.loopPreventsSliding) return !1;
          i.loopFix({ direction: "prev" }),
            (i._clientLeft = i.wrapperEl.clientLeft);
        }
        function p(e) {
          return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
        }
        const u = p(o ? i.translate : -i.translate),
          m = a.map((e) => p(e));
        let h = a[m.indexOf(u) - 1];
        if (void 0 === h && r.cssMode) {
          let e;
          a.forEach((t, s) => {
            u >= t && (e = s);
          }),
            void 0 !== e && (h = a[e > 0 ? e - 1 : e]);
        }
        let f = 0;
        if (
          (void 0 !== h &&
            ((f = n.indexOf(h)),
            f < 0 && (f = i.activeIndex - 1),
            "auto" === r.slidesPerView &&
              1 === r.slidesPerGroup &&
              r.slidesPerGroupAuto &&
              ((f = f - i.slidesPerViewDynamic("previous", !0) + 1),
              (f = Math.max(f, 0)))),
          r.rewind && i.isBeginning)
        ) {
          const r =
            i.params.virtual && i.params.virtual.enabled && i.virtual
              ? i.virtual.slides.length - 1
              : i.slides.length - 1;
          return i.slideTo(r, e, t, s);
        }
        return r.loop && 0 === i.activeIndex && r.cssMode
          ? (requestAnimationFrame(() => {
              i.slideTo(f, e, t, s);
            }),
            !0)
          : i.slideTo(f, e, t, s);
      },
      slideReset: function (e, t, s) {
        void 0 === t && (t = !0);
        const i = this;
        if (!i.destroyed)
          return (
            void 0 === e && (e = i.params.speed),
            i.slideTo(i.activeIndex, e, t, s)
          );
      },
      slideToClosest: function (e, t, s, i) {
        void 0 === t && (t = !0), void 0 === i && (i = 0.5);
        const r = this;
        if (r.destroyed) return;
        void 0 === e && (e = r.params.speed);
        let a = r.activeIndex;
        const n = Math.min(r.params.slidesPerGroupSkip, a),
          o = n + Math.floor((a - n) / r.params.slidesPerGroup),
          l = r.rtlTranslate ? r.translate : -r.translate;
        if (l >= r.snapGrid[o]) {
          const e = r.snapGrid[o];
          l - e > (r.snapGrid[o + 1] - e) * i && (a += r.params.slidesPerGroup);
        } else {
          const e = r.snapGrid[o - 1];
          l - e <= (r.snapGrid[o] - e) * i && (a -= r.params.slidesPerGroup);
        }
        return (
          (a = Math.max(a, 0)),
          (a = Math.min(a, r.slidesGrid.length - 1)),
          r.slideTo(a, e, t, s)
        );
      },
      slideToClickedSlide: function () {
        const e = this;
        if (e.destroyed) return;
        const { params: t, slidesEl: s } = e,
          i =
            "auto" === t.slidesPerView
              ? e.slidesPerViewDynamic()
              : t.slidesPerView;
        let r,
          a = e.clickedIndex;
        const n = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
        if (t.loop) {
          if (e.animating) return;
          (r = parseInt(
            e.clickedSlide.getAttribute("data-swiper-slide-index"),
            10,
          )),
            t.centeredSlides
              ? a < e.loopedSlides - i / 2 ||
                a > e.slides.length - e.loopedSlides + i / 2
                ? (e.loopFix(),
                  (a = e.getSlideIndex(
                    S(s, `${n}[data-swiper-slide-index="${r}"]`)[0],
                  )),
                  h(() => {
                    e.slideTo(a);
                  }))
                : e.slideTo(a)
              : a > e.slides.length - i
                ? (e.loopFix(),
                  (a = e.getSlideIndex(
                    S(s, `${n}[data-swiper-slide-index="${r}"]`)[0],
                  )),
                  h(() => {
                    e.slideTo(a);
                  }))
                : e.slideTo(a);
        } else e.slideTo(a);
      },
    };
    var j = {
      loopCreate: function (e) {
        const t = this,
          { params: s, slidesEl: i } = t;
        if (!s.loop || (t.virtual && t.params.virtual.enabled)) return;
        const r = () => {
            S(i, `.${s.slideClass}, swiper-slide`).forEach((e, t) => {
              e.setAttribute("data-swiper-slide-index", t);
            });
          },
          a = t.grid && s.grid && s.grid.rows > 1,
          n = s.slidesPerGroup * (a ? s.grid.rows : 1),
          o = t.slides.length % n != 0,
          l = a && t.slides.length % s.grid.rows != 0,
          d = (e) => {
            for (let i = 0; i < e; i += 1) {
              const e = t.isElement
                ? E("swiper-slide", [s.slideBlankClass])
                : E("div", [s.slideClass, s.slideBlankClass]);
              t.slidesEl.append(e);
            }
          };
        if (o) {
          if (s.loopAddBlankSlides) {
            d(n - (t.slides.length % n)), t.recalcSlides(), t.updateSlides();
          } else
            T(
              "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
            );
          r();
        } else if (l) {
          if (s.loopAddBlankSlides) {
            d(s.grid.rows - (t.slides.length % s.grid.rows)),
              t.recalcSlides(),
              t.updateSlides();
          } else
            T(
              "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
            );
          r();
        } else r();
        t.loopFix({
          slideRealIndex: e,
          direction: s.centeredSlides ? void 0 : "next",
        });
      },
      loopFix: function (e) {
        let {
          slideRealIndex: t,
          slideTo: s = !0,
          direction: i,
          setTranslate: r,
          activeSlideIndex: a,
          byController: n,
          byMousewheel: o,
        } = void 0 === e ? {} : e;
        const l = this;
        if (!l.params.loop) return;
        l.emit("beforeLoopFix");
        const {
            slides: d,
            allowSlidePrev: c,
            allowSlideNext: p,
            slidesEl: u,
            params: m,
          } = l,
          { centeredSlides: h } = m;
        if (
          ((l.allowSlidePrev = !0),
          (l.allowSlideNext = !0),
          l.virtual && m.virtual.enabled)
        )
          return (
            s &&
              (m.centeredSlides || 0 !== l.snapIndex
                ? m.centeredSlides && l.snapIndex < m.slidesPerView
                  ? l.slideTo(l.virtual.slides.length + l.snapIndex, 0, !1, !0)
                  : l.snapIndex === l.snapGrid.length - 1 &&
                    l.slideTo(l.virtual.slidesBefore, 0, !1, !0)
                : l.slideTo(l.virtual.slides.length, 0, !1, !0)),
            (l.allowSlidePrev = c),
            (l.allowSlideNext = p),
            void l.emit("loopFix")
          );
        let f = m.slidesPerView;
        "auto" === f
          ? (f = l.slidesPerViewDynamic())
          : ((f = Math.ceil(parseFloat(m.slidesPerView, 10))),
            h && f % 2 == 0 && (f += 1));
        const g = m.slidesPerGroupAuto ? f : m.slidesPerGroup;
        let v = g;
        v % g != 0 && (v += g - (v % g)),
          (v += m.loopAdditionalSlides),
          (l.loopedSlides = v);
        const w = l.grid && m.grid && m.grid.rows > 1;
        d.length < f + v
          ? T(
              "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters",
            )
          : w &&
            "row" === m.grid.fill &&
            T(
              "Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`",
            );
        const b = [],
          y = [];
        let S = l.activeIndex;
        void 0 === a
          ? (a = l.getSlideIndex(
              d.filter((e) => e.classList.contains(m.slideActiveClass))[0],
            ))
          : (S = a);
        const E = "next" === i || !i,
          x = "prev" === i || !i;
        let C = 0,
          _ = 0;
        const L = w ? Math.ceil(d.length / m.grid.rows) : d.length,
          M = (w ? d[a].column : a) + (h && void 0 === r ? -f / 2 + 0.5 : 0);
        if (M < v) {
          C = Math.max(v - M, g);
          for (let e = 0; e < v - M; e += 1) {
            const t = e - Math.floor(e / L) * L;
            if (w) {
              const e = L - t - 1;
              for (let t = d.length - 1; t >= 0; t -= 1)
                d[t].column === e && b.push(t);
            } else b.push(L - t - 1);
          }
        } else if (M + f > L - v) {
          _ = Math.max(M - (L - 2 * v), g);
          for (let e = 0; e < _; e += 1) {
            const t = e - Math.floor(e / L) * L;
            w
              ? d.forEach((e, s) => {
                  e.column === t && y.push(s);
                })
              : y.push(t);
          }
        }
        if (
          ((l.__preventObserver__ = !0),
          requestAnimationFrame(() => {
            l.__preventObserver__ = !1;
          }),
          x &&
            b.forEach((e) => {
              (d[e].swiperLoopMoveDOM = !0),
                u.prepend(d[e]),
                (d[e].swiperLoopMoveDOM = !1);
            }),
          E &&
            y.forEach((e) => {
              (d[e].swiperLoopMoveDOM = !0),
                u.append(d[e]),
                (d[e].swiperLoopMoveDOM = !1);
            }),
          l.recalcSlides(),
          "auto" === m.slidesPerView
            ? l.updateSlides()
            : w &&
              ((b.length > 0 && x) || (y.length > 0 && E)) &&
              l.slides.forEach((e, t) => {
                l.grid.updateSlide(t, e, l.slides);
              }),
          m.watchSlidesProgress && l.updateSlidesOffset(),
          s)
        )
          if (b.length > 0 && x) {
            if (void 0 === t) {
              const e = l.slidesGrid[S],
                t = l.slidesGrid[S + C] - e;
              o
                ? l.setTranslate(l.translate - t)
                : (l.slideTo(S + Math.ceil(C), 0, !1, !0),
                  r &&
                    ((l.touchEventsData.startTranslate =
                      l.touchEventsData.startTranslate - t),
                    (l.touchEventsData.currentTranslate =
                      l.touchEventsData.currentTranslate - t)));
            } else if (r) {
              const e = w ? b.length / m.grid.rows : b.length;
              l.slideTo(l.activeIndex + e, 0, !1, !0),
                (l.touchEventsData.currentTranslate = l.translate);
            }
          } else if (y.length > 0 && E)
            if (void 0 === t) {
              const e = l.slidesGrid[S],
                t = l.slidesGrid[S - _] - e;
              o
                ? l.setTranslate(l.translate - t)
                : (l.slideTo(S - _, 0, !1, !0),
                  r &&
                    ((l.touchEventsData.startTranslate =
                      l.touchEventsData.startTranslate - t),
                    (l.touchEventsData.currentTranslate =
                      l.touchEventsData.currentTranslate - t)));
            } else {
              const e = w ? y.length / m.grid.rows : y.length;
              l.slideTo(l.activeIndex - e, 0, !1, !0);
            }
        if (
          ((l.allowSlidePrev = c),
          (l.allowSlideNext = p),
          l.controller && l.controller.control && !n)
        ) {
          const e = {
            slideRealIndex: t,
            direction: i,
            setTranslate: r,
            activeSlideIndex: a,
            byController: !0,
          };
          Array.isArray(l.controller.control)
            ? l.controller.control.forEach((t) => {
                !t.destroyed &&
                  t.params.loop &&
                  t.loopFix({
                    ...e,
                    slideTo: t.params.slidesPerView === m.slidesPerView && s,
                  });
              })
            : l.controller.control instanceof l.constructor &&
              l.controller.control.params.loop &&
              l.controller.control.loopFix({
                ...e,
                slideTo:
                  l.controller.control.params.slidesPerView ===
                    m.slidesPerView && s,
              });
        }
        l.emit("loopFix");
      },
      loopDestroy: function () {
        const e = this,
          { params: t, slidesEl: s } = e;
        if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
        e.recalcSlides();
        const i = [];
        e.slides.forEach((e) => {
          const t =
            void 0 === e.swiperSlideIndex
              ? 1 * e.getAttribute("data-swiper-slide-index")
              : e.swiperSlideIndex;
          i[t] = e;
        }),
          e.slides.forEach((e) => {
            e.removeAttribute("data-swiper-slide-index");
          }),
          i.forEach((e) => {
            s.append(e);
          }),
          e.recalcSlides(),
          e.slideTo(e.realIndex, 0);
      },
    };
    function W(e, t, s) {
      const i = m(),
        { params: r } = e,
        a = r.edgeSwipeDetection,
        n = r.edgeSwipeThreshold;
      return (
        !a ||
        !(s <= n || s >= i.innerWidth - n) ||
        ("prevent" === a && (t.preventDefault(), !0))
      );
    }
    function Y(e) {
      const t = this,
        s = p();
      let i = e;
      i.originalEvent && (i = i.originalEvent);
      const r = t.touchEventsData;
      if ("pointerdown" === i.type) {
        if (null !== r.pointerId && r.pointerId !== i.pointerId) return;
        r.pointerId = i.pointerId;
      } else
        "touchstart" === i.type &&
          1 === i.targetTouches.length &&
          (r.touchId = i.targetTouches[0].identifier);
      if ("touchstart" === i.type)
        return void W(t, i, i.targetTouches[0].pageX);
      const { params: a, touches: n, enabled: o } = t;
      if (!o) return;
      if (!a.simulateTouch && "mouse" === i.pointerType) return;
      if (t.animating && a.preventInteractionOnTransition) return;
      !t.animating && a.cssMode && a.loop && t.loopFix();
      let l = i.target;
      if ("wrapper" === a.touchEventsTarget && !t.wrapperEl.contains(l)) return;
      if ("which" in i && 3 === i.which) return;
      if ("button" in i && i.button > 0) return;
      if (r.isTouched && r.isMoved) return;
      const d = !!a.noSwipingClass && "" !== a.noSwipingClass,
        c = i.composedPath ? i.composedPath() : i.path;
      d && i.target && i.target.shadowRoot && c && (l = c[0]);
      const u = a.noSwipingSelector
          ? a.noSwipingSelector
          : `.${a.noSwipingClass}`,
        h = !(!i.target || !i.target.shadowRoot);
      if (
        a.noSwiping &&
        (h
          ? (function (e, t) {
              return (
                void 0 === t && (t = this),
                (function t(s) {
                  if (!s || s === p() || s === m()) return null;
                  s.assignedSlot && (s = s.assignedSlot);
                  const i = s.closest(e);
                  return i || s.getRootNode
                    ? i || t(s.getRootNode().host)
                    : null;
                })(t)
              );
            })(u, l)
          : l.closest(u))
      )
        return void (t.allowClick = !0);
      if (a.swipeHandler && !l.closest(a.swipeHandler)) return;
      (n.currentX = i.pageX), (n.currentY = i.pageY);
      const g = n.currentX,
        v = n.currentY;
      if (!W(t, i, g)) return;
      Object.assign(r, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0,
      }),
        (n.startX = g),
        (n.startY = v),
        (r.touchStartTime = f()),
        (t.allowClick = !0),
        t.updateSize(),
        (t.swipeDirection = void 0),
        a.threshold > 0 && (r.allowThresholdMove = !1);
      let w = !0;
      l.matches(r.focusableElements) &&
        ((w = !1), "SELECT" === l.nodeName && (r.isTouched = !1)),
        s.activeElement &&
          s.activeElement.matches(r.focusableElements) &&
          s.activeElement !== l &&
          s.activeElement.blur();
      const b = w && t.allowTouchMove && a.touchStartPreventDefault;
      (!a.touchStartForcePreventDefault && !b) ||
        l.isContentEditable ||
        i.preventDefault(),
        a.freeMode &&
          a.freeMode.enabled &&
          t.freeMode &&
          t.animating &&
          !a.cssMode &&
          t.freeMode.onTouchStart(),
        t.emit("touchStart", i);
    }
    function X(e) {
      const t = p(),
        s = this,
        i = s.touchEventsData,
        { params: r, touches: a, rtlTranslate: n, enabled: o } = s;
      if (!o) return;
      if (!r.simulateTouch && "mouse" === e.pointerType) return;
      let l,
        d = e;
      if (
        (d.originalEvent && (d = d.originalEvent), "pointermove" === d.type)
      ) {
        if (null !== i.touchId) return;
        if (d.pointerId !== i.pointerId) return;
      }
      if ("touchmove" === d.type) {
        if (
          ((l = [...d.changedTouches].filter(
            (e) => e.identifier === i.touchId,
          )[0]),
          !l || l.identifier !== i.touchId)
        )
          return;
      } else l = d;
      if (!i.isTouched)
        return void (
          i.startMoving &&
          i.isScrolling &&
          s.emit("touchMoveOpposite", d)
        );
      const c = l.pageX,
        u = l.pageY;
      if (d.preventedByNestedSwiper) return (a.startX = c), void (a.startY = u);
      if (!s.allowTouchMove)
        return (
          d.target.matches(i.focusableElements) || (s.allowClick = !1),
          void (
            i.isTouched &&
            (Object.assign(a, {
              startX: c,
              startY: u,
              currentX: c,
              currentY: u,
            }),
            (i.touchStartTime = f()))
          )
        );
      if (r.touchReleaseOnEdges && !r.loop)
        if (s.isVertical()) {
          if (
            (u < a.startY && s.translate <= s.maxTranslate()) ||
            (u > a.startY && s.translate >= s.minTranslate())
          )
            return (i.isTouched = !1), void (i.isMoved = !1);
        } else if (
          (c < a.startX && s.translate <= s.maxTranslate()) ||
          (c > a.startX && s.translate >= s.minTranslate())
        )
          return;
      if (
        t.activeElement &&
        d.target === t.activeElement &&
        d.target.matches(i.focusableElements)
      )
        return (i.isMoved = !0), void (s.allowClick = !1);
      i.allowTouchCallbacks && s.emit("touchMove", d),
        (a.previousX = a.currentX),
        (a.previousY = a.currentY),
        (a.currentX = c),
        (a.currentY = u);
      const m = a.currentX - a.startX,
        h = a.currentY - a.startY;
      if (s.params.threshold && Math.sqrt(m ** 2 + h ** 2) < s.params.threshold)
        return;
      if (void 0 === i.isScrolling) {
        let e;
        (s.isHorizontal() && a.currentY === a.startY) ||
        (s.isVertical() && a.currentX === a.startX)
          ? (i.isScrolling = !1)
          : m * m + h * h >= 25 &&
            ((e = (180 * Math.atan2(Math.abs(h), Math.abs(m))) / Math.PI),
            (i.isScrolling = s.isHorizontal()
              ? e > r.touchAngle
              : 90 - e > r.touchAngle));
      }
      if (
        (i.isScrolling && s.emit("touchMoveOpposite", d),
        void 0 === i.startMoving &&
          ((a.currentX === a.startX && a.currentY === a.startY) ||
            (i.startMoving = !0)),
        i.isScrolling ||
          ("touchmove" === d.type && i.preventTouchMoveFromPointerMove))
      )
        return void (i.isTouched = !1);
      if (!i.startMoving) return;
      (s.allowClick = !1),
        !r.cssMode && d.cancelable && d.preventDefault(),
        r.touchMoveStopPropagation && !r.nested && d.stopPropagation();
      let g = s.isHorizontal() ? m : h,
        v = s.isHorizontal()
          ? a.currentX - a.previousX
          : a.currentY - a.previousY;
      r.oneWayMovement &&
        ((g = Math.abs(g) * (n ? 1 : -1)), (v = Math.abs(v) * (n ? 1 : -1))),
        (a.diff = g),
        (g *= r.touchRatio),
        n && ((g = -g), (v = -v));
      const w = s.touchesDirection;
      (s.swipeDirection = g > 0 ? "prev" : "next"),
        (s.touchesDirection = v > 0 ? "prev" : "next");
      const b = s.params.loop && !r.cssMode,
        y =
          ("next" === s.touchesDirection && s.allowSlideNext) ||
          ("prev" === s.touchesDirection && s.allowSlidePrev);
      if (!i.isMoved) {
        if (
          (b && y && s.loopFix({ direction: s.swipeDirection }),
          (i.startTranslate = s.getTranslate()),
          s.setTransition(0),
          s.animating)
        ) {
          const e = new window.CustomEvent("transitionend", {
            bubbles: !0,
            cancelable: !0,
            detail: { bySwiperTouchMove: !0 },
          });
          s.wrapperEl.dispatchEvent(e);
        }
        (i.allowMomentumBounce = !1),
          !r.grabCursor ||
            (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
            s.setGrabCursor(!0),
          s.emit("sliderFirstMove", d);
      }
      if (
        (new Date().getTime(),
        i.isMoved &&
          i.allowThresholdMove &&
          w !== s.touchesDirection &&
          b &&
          y &&
          Math.abs(g) >= 1)
      )
        return (
          Object.assign(a, {
            startX: c,
            startY: u,
            currentX: c,
            currentY: u,
            startTranslate: i.currentTranslate,
          }),
          (i.loopSwapReset = !0),
          void (i.startTranslate = i.currentTranslate)
        );
      s.emit("sliderMove", d),
        (i.isMoved = !0),
        (i.currentTranslate = g + i.startTranslate);
      let S = !0,
        T = r.resistanceRatio;
      if (
        (r.touchReleaseOnEdges && (T = 0),
        g > 0
          ? (b &&
              y &&
              i.allowThresholdMove &&
              i.currentTranslate >
                (r.centeredSlides
                  ? s.minTranslate() - s.slidesSizesGrid[s.activeIndex + 1]
                  : s.minTranslate()) &&
              s.loopFix({
                direction: "prev",
                setTranslate: !0,
                activeSlideIndex: 0,
              }),
            i.currentTranslate > s.minTranslate() &&
              ((S = !1),
              r.resistance &&
                (i.currentTranslate =
                  s.minTranslate() -
                  1 +
                  (-s.minTranslate() + i.startTranslate + g) ** T)))
          : g < 0 &&
            (b &&
              y &&
              i.allowThresholdMove &&
              i.currentTranslate <
                (r.centeredSlides
                  ? s.maxTranslate() +
                    s.slidesSizesGrid[s.slidesSizesGrid.length - 1]
                  : s.maxTranslate()) &&
              s.loopFix({
                direction: "next",
                setTranslate: !0,
                activeSlideIndex:
                  s.slides.length -
                  ("auto" === r.slidesPerView
                    ? s.slidesPerViewDynamic()
                    : Math.ceil(parseFloat(r.slidesPerView, 10))),
              }),
            i.currentTranslate < s.maxTranslate() &&
              ((S = !1),
              r.resistance &&
                (i.currentTranslate =
                  s.maxTranslate() +
                  1 -
                  (s.maxTranslate() - i.startTranslate - g) ** T))),
        S && (d.preventedByNestedSwiper = !0),
        !s.allowSlideNext &&
          "next" === s.swipeDirection &&
          i.currentTranslate < i.startTranslate &&
          (i.currentTranslate = i.startTranslate),
        !s.allowSlidePrev &&
          "prev" === s.swipeDirection &&
          i.currentTranslate > i.startTranslate &&
          (i.currentTranslate = i.startTranslate),
        s.allowSlidePrev ||
          s.allowSlideNext ||
          (i.currentTranslate = i.startTranslate),
        r.threshold > 0)
      ) {
        if (!(Math.abs(g) > r.threshold || i.allowThresholdMove))
          return void (i.currentTranslate = i.startTranslate);
        if (!i.allowThresholdMove)
          return (
            (i.allowThresholdMove = !0),
            (a.startX = a.currentX),
            (a.startY = a.currentY),
            (i.currentTranslate = i.startTranslate),
            void (a.diff = s.isHorizontal()
              ? a.currentX - a.startX
              : a.currentY - a.startY)
          );
      }
      r.followFinger &&
        !r.cssMode &&
        (((r.freeMode && r.freeMode.enabled && s.freeMode) ||
          r.watchSlidesProgress) &&
          (s.updateActiveIndex(), s.updateSlidesClasses()),
        r.freeMode &&
          r.freeMode.enabled &&
          s.freeMode &&
          s.freeMode.onTouchMove(),
        s.updateProgress(i.currentTranslate),
        s.setTranslate(i.currentTranslate));
    }
    function U(e) {
      const t = this,
        s = t.touchEventsData;
      let i,
        r = e;
      r.originalEvent && (r = r.originalEvent);
      if ("touchend" === r.type || "touchcancel" === r.type) {
        if (
          ((i = [...r.changedTouches].filter(
            (e) => e.identifier === s.touchId,
          )[0]),
          !i || i.identifier !== s.touchId)
        )
          return;
      } else {
        if (null !== s.touchId) return;
        if (r.pointerId !== s.pointerId) return;
        i = r;
      }
      if (
        ["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(
          r.type,
        )
      ) {
        if (
          !(
            ["pointercancel", "contextmenu"].includes(r.type) &&
            (t.browser.isSafari || t.browser.isWebView)
          )
        )
          return;
      }
      (s.pointerId = null), (s.touchId = null);
      const {
        params: a,
        touches: n,
        rtlTranslate: o,
        slidesGrid: l,
        enabled: d,
      } = t;
      if (!d) return;
      if (!a.simulateTouch && "mouse" === r.pointerType) return;
      if (
        (s.allowTouchCallbacks && t.emit("touchEnd", r),
        (s.allowTouchCallbacks = !1),
        !s.isTouched)
      )
        return (
          s.isMoved && a.grabCursor && t.setGrabCursor(!1),
          (s.isMoved = !1),
          void (s.startMoving = !1)
        );
      a.grabCursor &&
        s.isMoved &&
        s.isTouched &&
        (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
        t.setGrabCursor(!1);
      const c = f(),
        p = c - s.touchStartTime;
      if (t.allowClick) {
        const e = r.path || (r.composedPath && r.composedPath());
        t.updateClickedSlide((e && e[0]) || r.target, e),
          t.emit("tap click", r),
          p < 300 &&
            c - s.lastClickTime < 300 &&
            t.emit("doubleTap doubleClick", r);
      }
      if (
        ((s.lastClickTime = f()),
        h(() => {
          t.destroyed || (t.allowClick = !0);
        }),
        !s.isTouched ||
          !s.isMoved ||
          !t.swipeDirection ||
          (0 === n.diff && !s.loopSwapReset) ||
          (s.currentTranslate === s.startTranslate && !s.loopSwapReset))
      )
        return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
      let u;
      if (
        ((s.isTouched = !1),
        (s.isMoved = !1),
        (s.startMoving = !1),
        (u = a.followFinger
          ? o
            ? t.translate
            : -t.translate
          : -s.currentTranslate),
        a.cssMode)
      )
        return;
      if (a.freeMode && a.freeMode.enabled)
        return void t.freeMode.onTouchEnd({ currentPos: u });
      const m = u >= -t.maxTranslate() && !t.params.loop;
      let g = 0,
        v = t.slidesSizesGrid[0];
      for (
        let e = 0;
        e < l.length;
        e += e < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup
      ) {
        const t = e < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
        void 0 !== l[e + t]
          ? (m || (u >= l[e] && u < l[e + t])) &&
            ((g = e), (v = l[e + t] - l[e]))
          : (m || u >= l[e]) &&
            ((g = e), (v = l[l.length - 1] - l[l.length - 2]));
      }
      let w = null,
        b = null;
      a.rewind &&
        (t.isBeginning
          ? (b =
              a.virtual && a.virtual.enabled && t.virtual
                ? t.virtual.slides.length - 1
                : t.slides.length - 1)
          : t.isEnd && (w = 0));
      const y = (u - l[g]) / v,
        S = g < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
      if (p > a.longSwipesMs) {
        if (!a.longSwipes) return void t.slideTo(t.activeIndex);
        "next" === t.swipeDirection &&
          (y >= a.longSwipesRatio
            ? t.slideTo(a.rewind && t.isEnd ? w : g + S)
            : t.slideTo(g)),
          "prev" === t.swipeDirection &&
            (y > 1 - a.longSwipesRatio
              ? t.slideTo(g + S)
              : null !== b && y < 0 && Math.abs(y) > a.longSwipesRatio
                ? t.slideTo(b)
                : t.slideTo(g));
      } else {
        if (!a.shortSwipes) return void t.slideTo(t.activeIndex);
        t.navigation &&
        (r.target === t.navigation.nextEl || r.target === t.navigation.prevEl)
          ? r.target === t.navigation.nextEl
            ? t.slideTo(g + S)
            : t.slideTo(g)
          : ("next" === t.swipeDirection && t.slideTo(null !== w ? w : g + S),
            "prev" === t.swipeDirection && t.slideTo(null !== b ? b : g));
      }
    }
    function K() {
      const e = this,
        { params: t, el: s } = e;
      if (s && 0 === s.offsetWidth) return;
      t.breakpoints && e.setBreakpoint();
      const { allowSlideNext: i, allowSlidePrev: r, snapGrid: a } = e,
        n = e.virtual && e.params.virtual.enabled;
      (e.allowSlideNext = !0),
        (e.allowSlidePrev = !0),
        e.updateSize(),
        e.updateSlides(),
        e.updateSlidesClasses();
      const o = n && t.loop;
      !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
      !e.isEnd ||
      e.isBeginning ||
      e.params.centeredSlides ||
      o
        ? e.params.loop && !n
          ? e.slideToLoop(e.realIndex, 0, !1, !0)
          : e.slideTo(e.activeIndex, 0, !1, !0)
        : e.slideTo(e.slides.length - 1, 0, !1, !0),
        e.autoplay &&
          e.autoplay.running &&
          e.autoplay.paused &&
          (clearTimeout(e.autoplay.resizeTimeout),
          (e.autoplay.resizeTimeout = setTimeout(() => {
            e.autoplay &&
              e.autoplay.running &&
              e.autoplay.paused &&
              e.autoplay.resume();
          }, 500))),
        (e.allowSlidePrev = r),
        (e.allowSlideNext = i),
        e.params.watchOverflow && a !== e.snapGrid && e.checkOverflow();
    }
    function J(e) {
      const t = this;
      t.enabled &&
        (t.allowClick ||
          (t.params.preventClicks && e.preventDefault(),
          t.params.preventClicksPropagation &&
            t.animating &&
            (e.stopPropagation(), e.stopImmediatePropagation())));
    }
    function Q() {
      const e = this,
        { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
      if (!i) return;
      let r;
      (e.previousTranslate = e.translate),
        e.isHorizontal()
          ? (e.translate = -t.scrollLeft)
          : (e.translate = -t.scrollTop),
        0 === e.translate && (e.translate = 0),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
      const a = e.maxTranslate() - e.minTranslate();
      (r = 0 === a ? 0 : (e.translate - e.minTranslate()) / a),
        r !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
        e.emit("setTranslate", e.translate, !1);
    }
    function Z(e) {
      const t = this;
      B(t, e.target),
        t.params.cssMode ||
          ("auto" !== t.params.slidesPerView && !t.params.autoHeight) ||
          t.update();
    }
    function ee() {
      const e = this;
      e.documentTouchHandlerProceeded ||
        ((e.documentTouchHandlerProceeded = !0),
        e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
    }
    const te = (e, t) => {
      const s = p(),
        { params: i, el: r, wrapperEl: a, device: n } = e,
        o = !!i.nested,
        l = "on" === t ? "addEventListener" : "removeEventListener",
        d = t;
      s[l]("touchstart", e.onDocumentTouchStart, { passive: !1, capture: o }),
        r[l]("touchstart", e.onTouchStart, { passive: !1 }),
        r[l]("pointerdown", e.onTouchStart, { passive: !1 }),
        s[l]("touchmove", e.onTouchMove, { passive: !1, capture: o }),
        s[l]("pointermove", e.onTouchMove, { passive: !1, capture: o }),
        s[l]("touchend", e.onTouchEnd, { passive: !0 }),
        s[l]("pointerup", e.onTouchEnd, { passive: !0 }),
        s[l]("pointercancel", e.onTouchEnd, { passive: !0 }),
        s[l]("touchcancel", e.onTouchEnd, { passive: !0 }),
        s[l]("pointerout", e.onTouchEnd, { passive: !0 }),
        s[l]("pointerleave", e.onTouchEnd, { passive: !0 }),
        s[l]("contextmenu", e.onTouchEnd, { passive: !0 }),
        (i.preventClicks || i.preventClicksPropagation) &&
          r[l]("click", e.onClick, !0),
        i.cssMode && a[l]("scroll", e.onScroll),
        i.updateOnWindowResize
          ? e[d](
              n.ios || n.android
                ? "resize orientationchange observerUpdate"
                : "resize observerUpdate",
              K,
              !0,
            )
          : e[d]("observerUpdate", K, !0),
        r[l]("load", e.onLoad, { capture: !0 });
    };
    const se = (e, t) => e.grid && t.grid && t.grid.rows > 1;
    var ie = {
      init: !0,
      direction: "horizontal",
      oneWayMovement: !1,
      swiperElementNodeName: "SWIPER-CONTAINER",
      touchEventsTarget: "wrapper",
      initialSlide: 0,
      speed: 300,
      cssMode: !1,
      updateOnWindowResize: !0,
      resizeObserver: !0,
      nested: !1,
      createElements: !1,
      eventsPrefix: "swiper",
      enabled: !0,
      focusableElements:
        "input, select, option, textarea, button, video, label",
      width: null,
      height: null,
      preventInteractionOnTransition: !1,
      userAgent: null,
      url: null,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      breakpointsBase: "window",
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      slidesPerGroupAuto: !1,
      centeredSlides: !1,
      centeredSlidesBounds: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !0,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 5,
      touchMoveStopPropagation: !1,
      touchStartPreventDefault: !0,
      touchStartForcePreventDefault: !1,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: 0.85,
      watchSlidesProgress: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      loop: !1,
      loopAddBlankSlides: !0,
      loopAdditionalSlides: 0,
      loopPreventsSliding: !0,
      rewind: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      maxBackfaceHiddenSlides: 10,
      containerModifierClass: "swiper-",
      slideClass: "swiper-slide",
      slideBlankClass: "swiper-slide-blank",
      slideActiveClass: "swiper-slide-active",
      slideVisibleClass: "swiper-slide-visible",
      slideFullyVisibleClass: "swiper-slide-fully-visible",
      slideNextClass: "swiper-slide-next",
      slidePrevClass: "swiper-slide-prev",
      wrapperClass: "swiper-wrapper",
      lazyPreloaderClass: "swiper-lazy-preloader",
      lazyPreloadPrevNext: 0,
      runCallbacksOnInit: !0,
      _emitClasses: !1,
    };
    function re(e, t) {
      return function (s) {
        void 0 === s && (s = {});
        const i = Object.keys(s)[0],
          r = s[i];
        "object" == typeof r && null !== r
          ? (!0 === e[i] && (e[i] = { enabled: !0 }),
            "navigation" === i &&
              e[i] &&
              e[i].enabled &&
              !e[i].prevEl &&
              !e[i].nextEl &&
              (e[i].auto = !0),
            ["pagination", "scrollbar"].indexOf(i) >= 0 &&
              e[i] &&
              e[i].enabled &&
              !e[i].el &&
              (e[i].auto = !0),
            i in e && "enabled" in r
              ? ("object" != typeof e[i] ||
                  "enabled" in e[i] ||
                  (e[i].enabled = !0),
                e[i] || (e[i] = { enabled: !1 }),
                w(t, s))
              : w(t, s))
          : w(t, s);
      };
    }
    const ae = {
        eventsEmitter: G,
        update: H,
        translate: N,
        transition: {
          setTransition: function (e, t) {
            const s = this;
            s.params.cssMode ||
              ((s.wrapperEl.style.transitionDuration = `${e}ms`),
              (s.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : "")),
              s.emit("setTransition", e, t);
          },
          transitionStart: function (e, t) {
            void 0 === e && (e = !0);
            const s = this,
              { params: i } = s;
            i.cssMode ||
              (i.autoHeight && s.updateAutoHeight(),
              F({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
          },
          transitionEnd: function (e, t) {
            void 0 === e && (e = !0);
            const s = this,
              { params: i } = s;
            (s.animating = !1),
              i.cssMode ||
                (s.setTransition(0),
                F({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
          },
        },
        slide: R,
        loop: j,
        grabCursor: {
          setGrabCursor: function (e) {
            const t = this;
            if (
              !t.params.simulateTouch ||
              (t.params.watchOverflow && t.isLocked) ||
              t.params.cssMode
            )
              return;
            const s =
              "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
            t.isElement && (t.__preventObserver__ = !0),
              (s.style.cursor = "move"),
              (s.style.cursor = e ? "grabbing" : "grab"),
              t.isElement &&
                requestAnimationFrame(() => {
                  t.__preventObserver__ = !1;
                });
          },
          unsetGrabCursor: function () {
            const e = this;
            (e.params.watchOverflow && e.isLocked) ||
              e.params.cssMode ||
              (e.isElement && (e.__preventObserver__ = !0),
              (e[
                "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
              ].style.cursor = ""),
              e.isElement &&
                requestAnimationFrame(() => {
                  e.__preventObserver__ = !1;
                }));
          },
        },
        events: {
          attachEvents: function () {
            const e = this,
              { params: t } = e;
            (e.onTouchStart = Y.bind(e)),
              (e.onTouchMove = X.bind(e)),
              (e.onTouchEnd = U.bind(e)),
              (e.onDocumentTouchStart = ee.bind(e)),
              t.cssMode && (e.onScroll = Q.bind(e)),
              (e.onClick = J.bind(e)),
              (e.onLoad = Z.bind(e)),
              te(e, "on");
          },
          detachEvents: function () {
            te(this, "off");
          },
        },
        breakpoints: {
          setBreakpoint: function () {
            const e = this,
              { realIndex: t, initialized: s, params: i, el: r } = e,
              a = i.breakpoints;
            if (!a || (a && 0 === Object.keys(a).length)) return;
            const n = e.getBreakpoint(a, e.params.breakpointsBase, e.el);
            if (!n || e.currentBreakpoint === n) return;
            const o = (n in a ? a[n] : void 0) || e.originalParams,
              l = se(e, i),
              d = se(e, o),
              c = e.params.grabCursor,
              p = o.grabCursor,
              u = i.enabled;
            l && !d
              ? (r.classList.remove(
                  `${i.containerModifierClass}grid`,
                  `${i.containerModifierClass}grid-column`,
                ),
                e.emitContainerClasses())
              : !l &&
                d &&
                (r.classList.add(`${i.containerModifierClass}grid`),
                ((o.grid.fill && "column" === o.grid.fill) ||
                  (!o.grid.fill && "column" === i.grid.fill)) &&
                  r.classList.add(`${i.containerModifierClass}grid-column`),
                e.emitContainerClasses()),
              c && !p ? e.unsetGrabCursor() : !c && p && e.setGrabCursor(),
              ["navigation", "pagination", "scrollbar"].forEach((t) => {
                if (void 0 === o[t]) return;
                const s = i[t] && i[t].enabled,
                  r = o[t] && o[t].enabled;
                s && !r && e[t].disable(), !s && r && e[t].enable();
              });
            const m = o.direction && o.direction !== i.direction,
              h = i.loop && (o.slidesPerView !== i.slidesPerView || m),
              f = i.loop;
            m && s && e.changeDirection(), w(e.params, o);
            const g = e.params.enabled,
              v = e.params.loop;
            Object.assign(e, {
              allowTouchMove: e.params.allowTouchMove,
              allowSlideNext: e.params.allowSlideNext,
              allowSlidePrev: e.params.allowSlidePrev,
            }),
              u && !g ? e.disable() : !u && g && e.enable(),
              (e.currentBreakpoint = n),
              e.emit("_beforeBreakpoint", o),
              s &&
                (h
                  ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
                  : !f && v
                    ? (e.loopCreate(t), e.updateSlides())
                    : f && !v && e.loopDestroy()),
              e.emit("breakpoint", o);
          },
          getBreakpoint: function (e, t, s) {
            if (
              (void 0 === t && (t = "window"), !e || ("container" === t && !s))
            )
              return;
            let i = !1;
            const r = m(),
              a = "window" === t ? r.innerHeight : s.clientHeight,
              n = Object.keys(e).map((e) => {
                if ("string" == typeof e && 0 === e.indexOf("@")) {
                  const t = parseFloat(e.substr(1));
                  return { value: a * t, point: e };
                }
                return { value: e, point: e };
              });
            n.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
            for (let e = 0; e < n.length; e += 1) {
              const { point: a, value: o } = n[e];
              "window" === t
                ? r.matchMedia(`(min-width: ${o}px)`).matches && (i = a)
                : o <= s.clientWidth && (i = a);
            }
            return i || "max";
          },
        },
        checkOverflow: {
          checkOverflow: function () {
            const e = this,
              { isLocked: t, params: s } = e,
              { slidesOffsetBefore: i } = s;
            if (i) {
              const t = e.slides.length - 1,
                s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
              e.isLocked = e.size > s;
            } else e.isLocked = 1 === e.snapGrid.length;
            !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
              !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
              t && t !== e.isLocked && (e.isEnd = !1),
              t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
          },
        },
        classes: {
          addClasses: function () {
            const e = this,
              { classNames: t, params: s, rtl: i, el: r, device: a } = e,
              n = (function (e, t) {
                const s = [];
                return (
                  e.forEach((e) => {
                    "object" == typeof e
                      ? Object.keys(e).forEach((i) => {
                          e[i] && s.push(t + i);
                        })
                      : "string" == typeof e && s.push(t + e);
                  }),
                  s
                );
              })(
                [
                  "initialized",
                  s.direction,
                  { "free-mode": e.params.freeMode && s.freeMode.enabled },
                  { autoheight: s.autoHeight },
                  { rtl: i },
                  { grid: s.grid && s.grid.rows > 1 },
                  {
                    "grid-column":
                      s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
                  },
                  { android: a.android },
                  { ios: a.ios },
                  { "css-mode": s.cssMode },
                  { centered: s.cssMode && s.centeredSlides },
                  { "watch-progress": s.watchSlidesProgress },
                ],
                s.containerModifierClass,
              );
            t.push(...n), r.classList.add(...t), e.emitContainerClasses();
          },
          removeClasses: function () {
            const { el: e, classNames: t } = this;
            e.classList.remove(...t), this.emitContainerClasses();
          },
        },
      },
      ne = {};
    class oe {
      constructor() {
        let e, t;
        for (var s = arguments.length, i = new Array(s), r = 0; r < s; r++)
          i[r] = arguments[r];
        1 === i.length &&
        i[0].constructor &&
        "Object" === Object.prototype.toString.call(i[0]).slice(8, -1)
          ? (t = i[0])
          : ([e, t] = i),
          t || (t = {}),
          (t = w({}, t)),
          e && !t.el && (t.el = e);
        const a = p();
        if (
          t.el &&
          "string" == typeof t.el &&
          a.querySelectorAll(t.el).length > 1
        ) {
          const e = [];
          return (
            a.querySelectorAll(t.el).forEach((s) => {
              const i = w({}, t, { el: s });
              e.push(new oe(i));
            }),
            e
          );
        }
        const n = this;
        (n.__swiper__ = !0),
          (n.support = I()),
          (n.device = O({ userAgent: t.userAgent })),
          (n.browser = z()),
          (n.eventsListeners = {}),
          (n.eventsAnyListeners = []),
          (n.modules = [...n.__modules__]),
          t.modules && Array.isArray(t.modules) && n.modules.push(...t.modules);
        const o = {};
        n.modules.forEach((e) => {
          e({
            params: t,
            swiper: n,
            extendParams: re(t, o),
            on: n.on.bind(n),
            once: n.once.bind(n),
            off: n.off.bind(n),
            emit: n.emit.bind(n),
          });
        });
        const l = w({}, ie, o);
        return (
          (n.params = w({}, l, ne, t)),
          (n.originalParams = w({}, n.params)),
          (n.passedParams = w({}, t)),
          n.params &&
            n.params.on &&
            Object.keys(n.params.on).forEach((e) => {
              n.on(e, n.params.on[e]);
            }),
          n.params && n.params.onAny && n.onAny(n.params.onAny),
          Object.assign(n, {
            enabled: n.params.enabled,
            el: e,
            classNames: [],
            slides: [],
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            isHorizontal: () => "horizontal" === n.params.direction,
            isVertical: () => "vertical" === n.params.direction,
            activeIndex: 0,
            realIndex: 0,
            isBeginning: !0,
            isEnd: !1,
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: !1,
            cssOverflowAdjustment() {
              return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
            },
            allowSlideNext: n.params.allowSlideNext,
            allowSlidePrev: n.params.allowSlidePrev,
            touchEventsData: {
              isTouched: void 0,
              isMoved: void 0,
              allowTouchCallbacks: void 0,
              touchStartTime: void 0,
              isScrolling: void 0,
              currentTranslate: void 0,
              startTranslate: void 0,
              allowThresholdMove: void 0,
              focusableElements: n.params.focusableElements,
              lastClickTime: 0,
              clickTimeout: void 0,
              velocities: [],
              allowMomentumBounce: void 0,
              startMoving: void 0,
              pointerId: null,
              touchId: null,
            },
            allowClick: !0,
            allowTouchMove: n.params.allowTouchMove,
            touches: {
              startX: 0,
              startY: 0,
              currentX: 0,
              currentY: 0,
              diff: 0,
            },
            imagesToLoad: [],
            imagesLoaded: 0,
          }),
          n.emit("_swiper"),
          n.params.init && n.init(),
          n
        );
      }
      getDirectionLabel(e) {
        return this.isHorizontal()
          ? e
          : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom",
            }[e];
      }
      getSlideIndex(e) {
        const { slidesEl: t, params: s } = this,
          i = C(S(t, `.${s.slideClass}, swiper-slide`)[0]);
        return C(e) - i;
      }
      getSlideIndexByData(e) {
        return this.getSlideIndex(
          this.slides.filter(
            (t) => 1 * t.getAttribute("data-swiper-slide-index") === e,
          )[0],
        );
      }
      recalcSlides() {
        const { slidesEl: e, params: t } = this;
        this.slides = S(e, `.${t.slideClass}, swiper-slide`);
      }
      enable() {
        const e = this;
        e.enabled ||
          ((e.enabled = !0),
          e.params.grabCursor && e.setGrabCursor(),
          e.emit("enable"));
      }
      disable() {
        const e = this;
        e.enabled &&
          ((e.enabled = !1),
          e.params.grabCursor && e.unsetGrabCursor(),
          e.emit("disable"));
      }
      setProgress(e, t) {
        const s = this;
        e = Math.min(Math.max(e, 0), 1);
        const i = s.minTranslate(),
          r = (s.maxTranslate() - i) * e + i;
        s.translateTo(r, void 0 === t ? 0 : t),
          s.updateActiveIndex(),
          s.updateSlidesClasses();
      }
      emitContainerClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const t = e.el.className
          .split(" ")
          .filter(
            (t) =>
              0 === t.indexOf("swiper") ||
              0 === t.indexOf(e.params.containerModifierClass),
          );
        e.emit("_containerClasses", t.join(" "));
      }
      getSlideClasses(e) {
        const t = this;
        return t.destroyed
          ? ""
          : e.className
              .split(" ")
              .filter(
                (e) =>
                  0 === e.indexOf("swiper-slide") ||
                  0 === e.indexOf(t.params.slideClass),
              )
              .join(" ");
      }
      emitSlidesClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const t = [];
        e.slides.forEach((s) => {
          const i = e.getSlideClasses(s);
          t.push({ slideEl: s, classNames: i }), e.emit("_slideClass", s, i);
        }),
          e.emit("_slideClasses", t);
      }
      slidesPerViewDynamic(e, t) {
        void 0 === e && (e = "current"), void 0 === t && (t = !1);
        const {
          params: s,
          slides: i,
          slidesGrid: r,
          slidesSizesGrid: a,
          size: n,
          activeIndex: o,
        } = this;
        let l = 1;
        if ("number" == typeof s.slidesPerView) return s.slidesPerView;
        if (s.centeredSlides) {
          let e,
            t = i[o] ? Math.ceil(i[o].swiperSlideSize) : 0;
          for (let s = o + 1; s < i.length; s += 1)
            i[s] &&
              !e &&
              ((t += Math.ceil(i[s].swiperSlideSize)),
              (l += 1),
              t > n && (e = !0));
          for (let s = o - 1; s >= 0; s -= 1)
            i[s] &&
              !e &&
              ((t += i[s].swiperSlideSize), (l += 1), t > n && (e = !0));
        } else if ("current" === e)
          for (let e = o + 1; e < i.length; e += 1) {
            (t ? r[e] + a[e] - r[o] < n : r[e] - r[o] < n) && (l += 1);
          }
        else
          for (let e = o - 1; e >= 0; e -= 1) {
            r[o] - r[e] < n && (l += 1);
          }
        return l;
      }
      update() {
        const e = this;
        if (!e || e.destroyed) return;
        const { snapGrid: t, params: s } = e;
        function i() {
          const t = e.rtlTranslate ? -1 * e.translate : e.translate,
            s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
          e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
        }
        let r;
        if (
          (s.breakpoints && e.setBreakpoint(),
          [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
            t.complete && B(e, t);
          }),
          e.updateSize(),
          e.updateSlides(),
          e.updateProgress(),
          e.updateSlidesClasses(),
          s.freeMode && s.freeMode.enabled && !s.cssMode)
        )
          i(), s.autoHeight && e.updateAutoHeight();
        else {
          if (
            ("auto" === s.slidesPerView || s.slidesPerView > 1) &&
            e.isEnd &&
            !s.centeredSlides
          ) {
            const t =
              e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
            r = e.slideTo(t.length - 1, 0, !1, !0);
          } else r = e.slideTo(e.activeIndex, 0, !1, !0);
          r || i();
        }
        s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
          e.emit("update");
      }
      changeDirection(e, t) {
        void 0 === t && (t = !0);
        const s = this,
          i = s.params.direction;
        return (
          e || (e = "horizontal" === i ? "vertical" : "horizontal"),
          e === i ||
            ("horizontal" !== e && "vertical" !== e) ||
            (s.el.classList.remove(`${s.params.containerModifierClass}${i}`),
            s.el.classList.add(`${s.params.containerModifierClass}${e}`),
            s.emitContainerClasses(),
            (s.params.direction = e),
            s.slides.forEach((t) => {
              "vertical" === e ? (t.style.width = "") : (t.style.height = "");
            }),
            s.emit("changeDirection"),
            t && s.update()),
          s
        );
      }
      changeLanguageDirection(e) {
        const t = this;
        (t.rtl && "rtl" === e) ||
          (!t.rtl && "ltr" === e) ||
          ((t.rtl = "rtl" === e),
          (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
          t.rtl
            ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
              (t.el.dir = "rtl"))
            : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
              (t.el.dir = "ltr")),
          t.update());
      }
      mount(e) {
        const t = this;
        if (t.mounted) return !0;
        let s = e || t.params.el;
        if (("string" == typeof s && (s = document.querySelector(s)), !s))
          return !1;
        (s.swiper = t),
          s.parentNode &&
            s.parentNode.host &&
            s.parentNode.host.nodeName ===
              t.params.swiperElementNodeName.toUpperCase() &&
            (t.isElement = !0);
        const i = () =>
          `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
        let r = (() => {
          if (s && s.shadowRoot && s.shadowRoot.querySelector) {
            return s.shadowRoot.querySelector(i());
          }
          return S(s, i())[0];
        })();
        return (
          !r &&
            t.params.createElements &&
            ((r = E("div", t.params.wrapperClass)),
            s.append(r),
            S(s, `.${t.params.slideClass}`).forEach((e) => {
              r.append(e);
            })),
          Object.assign(t, {
            el: s,
            wrapperEl: r,
            slidesEl:
              t.isElement && !s.parentNode.host.slideSlots
                ? s.parentNode.host
                : r,
            hostEl: t.isElement ? s.parentNode.host : s,
            mounted: !0,
            rtl: "rtl" === s.dir.toLowerCase() || "rtl" === x(s, "direction"),
            rtlTranslate:
              "horizontal" === t.params.direction &&
              ("rtl" === s.dir.toLowerCase() || "rtl" === x(s, "direction")),
            wrongRTL: "-webkit-box" === x(r, "display"),
          }),
          !0
        );
      }
      init(e) {
        const t = this;
        if (t.initialized) return t;
        if (!1 === t.mount(e)) return t;
        t.emit("beforeInit"),
          t.params.breakpoints && t.setBreakpoint(),
          t.addClasses(),
          t.updateSize(),
          t.updateSlides(),
          t.params.watchOverflow && t.checkOverflow(),
          t.params.grabCursor && t.enabled && t.setGrabCursor(),
          t.params.loop && t.virtual && t.params.virtual.enabled
            ? t.slideTo(
                t.params.initialSlide + t.virtual.slidesBefore,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0,
              )
            : t.slideTo(
                t.params.initialSlide,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0,
              ),
          t.params.loop && t.loopCreate(),
          t.attachEvents();
        const s = [...t.el.querySelectorAll('[loading="lazy"]')];
        return (
          t.isElement &&
            s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
          s.forEach((e) => {
            e.complete
              ? B(t, e)
              : e.addEventListener("load", (e) => {
                  B(t, e.target);
                });
          }),
          q(t),
          (t.initialized = !0),
          q(t),
          t.emit("init"),
          t.emit("afterInit"),
          t
        );
      }
      destroy(e, t) {
        void 0 === e && (e = !0), void 0 === t && (t = !0);
        const s = this,
          { params: i, el: r, wrapperEl: a, slides: n } = s;
        return (
          void 0 === s.params ||
            s.destroyed ||
            (s.emit("beforeDestroy"),
            (s.initialized = !1),
            s.detachEvents(),
            i.loop && s.loopDestroy(),
            t &&
              (s.removeClasses(),
              r.removeAttribute("style"),
              a.removeAttribute("style"),
              n &&
                n.length &&
                n.forEach((e) => {
                  e.classList.remove(
                    i.slideVisibleClass,
                    i.slideFullyVisibleClass,
                    i.slideActiveClass,
                    i.slideNextClass,
                    i.slidePrevClass,
                  ),
                    e.removeAttribute("style"),
                    e.removeAttribute("data-swiper-slide-index");
                })),
            s.emit("destroy"),
            Object.keys(s.eventsListeners).forEach((e) => {
              s.off(e);
            }),
            !1 !== e &&
              ((s.el.swiper = null),
              (function (e) {
                const t = e;
                Object.keys(t).forEach((e) => {
                  try {
                    t[e] = null;
                  } catch (e) {}
                  try {
                    delete t[e];
                  } catch (e) {}
                });
              })(s)),
            (s.destroyed = !0)),
          null
        );
      }
      static extendDefaults(e) {
        w(ne, e);
      }
      static get extendedDefaults() {
        return ne;
      }
      static get defaults() {
        return ie;
      }
      static installModule(e) {
        oe.prototype.__modules__ || (oe.prototype.__modules__ = []);
        const t = oe.prototype.__modules__;
        "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
      }
      static use(e) {
        return Array.isArray(e)
          ? (e.forEach((e) => oe.installModule(e)), oe)
          : (oe.installModule(e), oe);
      }
    }
    function le(e, t, s, i) {
      return (
        e.params.createElements &&
          Object.keys(i).forEach((r) => {
            if (!s[r] && !0 === s.auto) {
              let a = S(e.el, `.${i[r]}`)[0];
              a || ((a = E("div", i[r])), (a.className = i[r]), e.el.append(a)),
                (s[r] = a),
                (t[r] = a);
            }
          }),
        s
      );
    }
    function de(e) {
      let { swiper: t, extendParams: s, on: i, emit: r } = e;
      function a(e) {
        let s;
        return e &&
          "string" == typeof e &&
          t.isElement &&
          ((s = t.el.querySelector(e)), s)
          ? s
          : (e &&
              ("string" == typeof e && (s = [...document.querySelectorAll(e)]),
              t.params.uniqueNavElements &&
              "string" == typeof e &&
              s &&
              s.length > 1 &&
              1 === t.el.querySelectorAll(e).length
                ? (s = t.el.querySelector(e))
                : s && 1 === s.length && (s = s[0])),
            e && !s ? e : s);
      }
      function n(e, s) {
        const i = t.params.navigation;
        (e = M(e)).forEach((e) => {
          e &&
            (e.classList[s ? "add" : "remove"](...i.disabledClass.split(" ")),
            "BUTTON" === e.tagName && (e.disabled = s),
            t.params.watchOverflow &&
              t.enabled &&
              e.classList[t.isLocked ? "add" : "remove"](i.lockClass));
        });
      }
      function o() {
        const { nextEl: e, prevEl: s } = t.navigation;
        if (t.params.loop) return n(s, !1), void n(e, !1);
        n(s, t.isBeginning && !t.params.rewind),
          n(e, t.isEnd && !t.params.rewind);
      }
      function l(e) {
        e.preventDefault(),
          (!t.isBeginning || t.params.loop || t.params.rewind) &&
            (t.slidePrev(), r("navigationPrev"));
      }
      function d(e) {
        e.preventDefault(),
          (!t.isEnd || t.params.loop || t.params.rewind) &&
            (t.slideNext(), r("navigationNext"));
      }
      function c() {
        const e = t.params.navigation;
        if (
          ((t.params.navigation = le(
            t,
            t.originalParams.navigation,
            t.params.navigation,
            { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" },
          )),
          !e.nextEl && !e.prevEl)
        )
          return;
        let s = a(e.nextEl),
          i = a(e.prevEl);
        Object.assign(t.navigation, { nextEl: s, prevEl: i }),
          (s = M(s)),
          (i = M(i));
        const r = (s, i) => {
          s && s.addEventListener("click", "next" === i ? d : l),
            !t.enabled && s && s.classList.add(...e.lockClass.split(" "));
        };
        s.forEach((e) => r(e, "next")), i.forEach((e) => r(e, "prev"));
      }
      function p() {
        let { nextEl: e, prevEl: s } = t.navigation;
        (e = M(e)), (s = M(s));
        const i = (e, s) => {
          e.removeEventListener("click", "next" === s ? d : l),
            e.classList.remove(...t.params.navigation.disabledClass.split(" "));
        };
        e.forEach((e) => i(e, "next")), s.forEach((e) => i(e, "prev"));
      }
      s({
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: !1,
          disabledClass: "swiper-button-disabled",
          hiddenClass: "swiper-button-hidden",
          lockClass: "swiper-button-lock",
          navigationDisabledClass: "swiper-navigation-disabled",
        },
      }),
        (t.navigation = { nextEl: null, prevEl: null }),
        i("init", () => {
          !1 === t.params.navigation.enabled ? u() : (c(), o());
        }),
        i("toEdge fromEdge lock unlock", () => {
          o();
        }),
        i("destroy", () => {
          p();
        }),
        i("enable disable", () => {
          let { nextEl: e, prevEl: s } = t.navigation;
          (e = M(e)),
            (s = M(s)),
            t.enabled
              ? o()
              : [...e, ...s]
                  .filter((e) => !!e)
                  .forEach((e) =>
                    e.classList.add(t.params.navigation.lockClass),
                  );
        }),
        i("click", (e, s) => {
          let { nextEl: i, prevEl: a } = t.navigation;
          (i = M(i)), (a = M(a));
          const n = s.target;
          if (
            t.params.navigation.hideOnClick &&
            !a.includes(n) &&
            !i.includes(n)
          ) {
            if (
              t.pagination &&
              t.params.pagination &&
              t.params.pagination.clickable &&
              (t.pagination.el === n || t.pagination.el.contains(n))
            )
              return;
            let e;
            i.length
              ? (e = i[0].classList.contains(t.params.navigation.hiddenClass))
              : a.length &&
                (e = a[0].classList.contains(t.params.navigation.hiddenClass)),
              r(!0 === e ? "navigationShow" : "navigationHide"),
              [...i, ...a]
                .filter((e) => !!e)
                .forEach((e) =>
                  e.classList.toggle(t.params.navigation.hiddenClass),
                );
          }
        });
      const u = () => {
        t.el.classList.add(
          ...t.params.navigation.navigationDisabledClass.split(" "),
        ),
          p();
      };
      Object.assign(t.navigation, {
        enable: () => {
          t.el.classList.remove(
            ...t.params.navigation.navigationDisabledClass.split(" "),
          ),
            c(),
            o();
        },
        disable: u,
        update: o,
        init: c,
        destroy: p,
      });
    }
    function ce(e) {
      return (
        void 0 === e && (e = ""),
        `.${e
          .trim()
          .replace(/([\.:!+\/])/g, "\\$1")
          .replace(/ /g, ".")}`
      );
    }
    function pe(e) {
      let { swiper: t, extendParams: s, on: i, emit: r } = e;
      const a = "swiper-pagination";
      let n;
      s({
        pagination: {
          el: null,
          bulletElement: "span",
          clickable: !1,
          hideOnClick: !1,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: !1,
          type: "bullets",
          dynamicBullets: !1,
          dynamicMainBullets: 1,
          formatFractionCurrent: (e) => e,
          formatFractionTotal: (e) => e,
          bulletClass: `${a}-bullet`,
          bulletActiveClass: `${a}-bullet-active`,
          modifierClass: `${a}-`,
          currentClass: `${a}-current`,
          totalClass: `${a}-total`,
          hiddenClass: `${a}-hidden`,
          progressbarFillClass: `${a}-progressbar-fill`,
          progressbarOppositeClass: `${a}-progressbar-opposite`,
          clickableClass: `${a}-clickable`,
          lockClass: `${a}-lock`,
          horizontalClass: `${a}-horizontal`,
          verticalClass: `${a}-vertical`,
          paginationDisabledClass: `${a}-disabled`,
        },
      }),
        (t.pagination = { el: null, bullets: [] });
      let o = 0;
      function l() {
        return (
          !t.params.pagination.el ||
          !t.pagination.el ||
          (Array.isArray(t.pagination.el) && 0 === t.pagination.el.length)
        );
      }
      function d(e, s) {
        const { bulletActiveClass: i } = t.params.pagination;
        e &&
          (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
          (e.classList.add(`${i}-${s}`),
          (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
            e.classList.add(`${i}-${s}-${s}`));
      }
      function c(e) {
        const s = e.target.closest(ce(t.params.pagination.bulletClass));
        if (!s) return;
        e.preventDefault();
        const i = C(s) * t.params.slidesPerGroup;
        if (t.params.loop) {
          if (t.realIndex === i) return;
          t.slideToLoop(i);
        } else t.slideTo(i);
      }
      function p() {
        const e = t.rtl,
          s = t.params.pagination;
        if (l()) return;
        let i,
          a,
          c = t.pagination.el;
        c = M(c);
        const p =
            t.virtual && t.params.virtual.enabled
              ? t.virtual.slides.length
              : t.slides.length,
          u = t.params.loop
            ? Math.ceil(p / t.params.slidesPerGroup)
            : t.snapGrid.length;
        if (
          (t.params.loop
            ? ((a = t.previousRealIndex || 0),
              (i =
                t.params.slidesPerGroup > 1
                  ? Math.floor(t.realIndex / t.params.slidesPerGroup)
                  : t.realIndex))
            : void 0 !== t.snapIndex
              ? ((i = t.snapIndex), (a = t.previousSnapIndex))
              : ((a = t.previousIndex || 0), (i = t.activeIndex || 0)),
          "bullets" === s.type &&
            t.pagination.bullets &&
            t.pagination.bullets.length > 0)
        ) {
          const r = t.pagination.bullets;
          let l, p, u;
          if (
            (s.dynamicBullets &&
              ((n = L(r[0], t.isHorizontal() ? "width" : "height", !0)),
              c.forEach((e) => {
                e.style[t.isHorizontal() ? "width" : "height"] =
                  n * (s.dynamicMainBullets + 4) + "px";
              }),
              s.dynamicMainBullets > 1 &&
                void 0 !== a &&
                ((o += i - (a || 0)),
                o > s.dynamicMainBullets - 1
                  ? (o = s.dynamicMainBullets - 1)
                  : o < 0 && (o = 0)),
              (l = Math.max(i - o, 0)),
              (p = l + (Math.min(r.length, s.dynamicMainBullets) - 1)),
              (u = (p + l) / 2)),
            r.forEach((e) => {
              const t = [
                ...[
                  "",
                  "-next",
                  "-next-next",
                  "-prev",
                  "-prev-prev",
                  "-main",
                ].map((e) => `${s.bulletActiveClass}${e}`),
              ]
                .map((e) =>
                  "string" == typeof e && e.includes(" ") ? e.split(" ") : e,
                )
                .flat();
              e.classList.remove(...t);
            }),
            c.length > 1)
          )
            r.forEach((e) => {
              const r = C(e);
              r === i
                ? e.classList.add(...s.bulletActiveClass.split(" "))
                : t.isElement && e.setAttribute("part", "bullet"),
                s.dynamicBullets &&
                  (r >= l &&
                    r <= p &&
                    e.classList.add(
                      ...`${s.bulletActiveClass}-main`.split(" "),
                    ),
                  r === l && d(e, "prev"),
                  r === p && d(e, "next"));
            });
          else {
            const e = r[i];
            if (
              (e && e.classList.add(...s.bulletActiveClass.split(" ")),
              t.isElement &&
                r.forEach((e, t) => {
                  e.setAttribute("part", t === i ? "bullet-active" : "bullet");
                }),
              s.dynamicBullets)
            ) {
              const e = r[l],
                t = r[p];
              for (let e = l; e <= p; e += 1)
                r[e] &&
                  r[e].classList.add(
                    ...`${s.bulletActiveClass}-main`.split(" "),
                  );
              d(e, "prev"), d(t, "next");
            }
          }
          if (s.dynamicBullets) {
            const i = Math.min(r.length, s.dynamicMainBullets + 4),
              a = (n * i - n) / 2 - u * n,
              o = e ? "right" : "left";
            r.forEach((e) => {
              e.style[t.isHorizontal() ? o : "top"] = `${a}px`;
            });
          }
        }
        c.forEach((e, a) => {
          if (
            ("fraction" === s.type &&
              (e.querySelectorAll(ce(s.currentClass)).forEach((e) => {
                e.textContent = s.formatFractionCurrent(i + 1);
              }),
              e.querySelectorAll(ce(s.totalClass)).forEach((e) => {
                e.textContent = s.formatFractionTotal(u);
              })),
            "progressbar" === s.type)
          ) {
            let r;
            r = s.progressbarOpposite
              ? t.isHorizontal()
                ? "vertical"
                : "horizontal"
              : t.isHorizontal()
                ? "horizontal"
                : "vertical";
            const a = (i + 1) / u;
            let n = 1,
              o = 1;
            "horizontal" === r ? (n = a) : (o = a),
              e.querySelectorAll(ce(s.progressbarFillClass)).forEach((e) => {
                (e.style.transform = `translate3d(0,0,0) scaleX(${n}) scaleY(${o})`),
                  (e.style.transitionDuration = `${t.params.speed}ms`);
              });
          }
          "custom" === s.type && s.renderCustom
            ? ((e.innerHTML = s.renderCustom(t, i + 1, u)),
              0 === a && r("paginationRender", e))
            : (0 === a && r("paginationRender", e), r("paginationUpdate", e)),
            t.params.watchOverflow &&
              t.enabled &&
              e.classList[t.isLocked ? "add" : "remove"](s.lockClass);
        });
      }
      function u() {
        const e = t.params.pagination;
        if (l()) return;
        const s =
          t.virtual && t.params.virtual.enabled
            ? t.virtual.slides.length
            : t.grid && t.params.grid.rows > 1
              ? t.slides.length / Math.ceil(t.params.grid.rows)
              : t.slides.length;
        let i = t.pagination.el;
        i = M(i);
        let a = "";
        if ("bullets" === e.type) {
          let i = t.params.loop
            ? Math.ceil(s / t.params.slidesPerGroup)
            : t.snapGrid.length;
          t.params.freeMode && t.params.freeMode.enabled && i > s && (i = s);
          for (let s = 0; s < i; s += 1)
            e.renderBullet
              ? (a += e.renderBullet.call(t, s, e.bulletClass))
              : (a += `<${e.bulletElement} ${t.isElement ? 'part="bullet"' : ""} class="${e.bulletClass}"></${e.bulletElement}>`);
        }
        "fraction" === e.type &&
          (a = e.renderFraction
            ? e.renderFraction.call(t, e.currentClass, e.totalClass)
            : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
          "progressbar" === e.type &&
            (a = e.renderProgressbar
              ? e.renderProgressbar.call(t, e.progressbarFillClass)
              : `<span class="${e.progressbarFillClass}"></span>`),
          (t.pagination.bullets = []),
          i.forEach((s) => {
            "custom" !== e.type && (s.innerHTML = a || ""),
              "bullets" === e.type &&
                t.pagination.bullets.push(
                  ...s.querySelectorAll(ce(e.bulletClass)),
                );
          }),
          "custom" !== e.type && r("paginationRender", i[0]);
      }
      function m() {
        t.params.pagination = le(
          t,
          t.originalParams.pagination,
          t.params.pagination,
          { el: "swiper-pagination" },
        );
        const e = t.params.pagination;
        if (!e.el) return;
        let s;
        "string" == typeof e.el &&
          t.isElement &&
          (s = t.el.querySelector(e.el)),
          s ||
            "string" != typeof e.el ||
            (s = [...document.querySelectorAll(e.el)]),
          s || (s = e.el),
          s &&
            0 !== s.length &&
            (t.params.uniqueNavElements &&
              "string" == typeof e.el &&
              Array.isArray(s) &&
              s.length > 1 &&
              ((s = [...t.el.querySelectorAll(e.el)]),
              s.length > 1 &&
                (s = s.filter((e) => _(e, ".swiper")[0] === t.el)[0])),
            Array.isArray(s) && 1 === s.length && (s = s[0]),
            Object.assign(t.pagination, { el: s }),
            (s = M(s)),
            s.forEach((s) => {
              "bullets" === e.type &&
                e.clickable &&
                s.classList.add(...(e.clickableClass || "").split(" ")),
                s.classList.add(e.modifierClass + e.type),
                s.classList.add(
                  t.isHorizontal() ? e.horizontalClass : e.verticalClass,
                ),
                "bullets" === e.type &&
                  e.dynamicBullets &&
                  (s.classList.add(`${e.modifierClass}${e.type}-dynamic`),
                  (o = 0),
                  e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
                "progressbar" === e.type &&
                  e.progressbarOpposite &&
                  s.classList.add(e.progressbarOppositeClass),
                e.clickable && s.addEventListener("click", c),
                t.enabled || s.classList.add(e.lockClass);
            }));
      }
      function h() {
        const e = t.params.pagination;
        if (l()) return;
        let s = t.pagination.el;
        s &&
          ((s = M(s)),
          s.forEach((s) => {
            s.classList.remove(e.hiddenClass),
              s.classList.remove(e.modifierClass + e.type),
              s.classList.remove(
                t.isHorizontal() ? e.horizontalClass : e.verticalClass,
              ),
              e.clickable &&
                (s.classList.remove(...(e.clickableClass || "").split(" ")),
                s.removeEventListener("click", c));
          })),
          t.pagination.bullets &&
            t.pagination.bullets.forEach((t) =>
              t.classList.remove(...e.bulletActiveClass.split(" ")),
            );
      }
      i("changeDirection", () => {
        if (!t.pagination || !t.pagination.el) return;
        const e = t.params.pagination;
        let { el: s } = t.pagination;
        (s = M(s)),
          s.forEach((s) => {
            s.classList.remove(e.horizontalClass, e.verticalClass),
              s.classList.add(
                t.isHorizontal() ? e.horizontalClass : e.verticalClass,
              );
          });
      }),
        i("init", () => {
          !1 === t.params.pagination.enabled ? f() : (m(), u(), p());
        }),
        i("activeIndexChange", () => {
          void 0 === t.snapIndex && p();
        }),
        i("snapIndexChange", () => {
          p();
        }),
        i("snapGridLengthChange", () => {
          u(), p();
        }),
        i("destroy", () => {
          h();
        }),
        i("enable disable", () => {
          let { el: e } = t.pagination;
          e &&
            ((e = M(e)),
            e.forEach((e) =>
              e.classList[t.enabled ? "remove" : "add"](
                t.params.pagination.lockClass,
              ),
            ));
        }),
        i("lock unlock", () => {
          p();
        }),
        i("click", (e, s) => {
          const i = s.target,
            a = M(t.pagination.el);
          if (
            t.params.pagination.el &&
            t.params.pagination.hideOnClick &&
            a &&
            a.length > 0 &&
            !i.classList.contains(t.params.pagination.bulletClass)
          ) {
            if (
              t.navigation &&
              ((t.navigation.nextEl && i === t.navigation.nextEl) ||
                (t.navigation.prevEl && i === t.navigation.prevEl))
            )
              return;
            const e = a[0].classList.contains(t.params.pagination.hiddenClass);
            r(!0 === e ? "paginationShow" : "paginationHide"),
              a.forEach((e) =>
                e.classList.toggle(t.params.pagination.hiddenClass),
              );
          }
        });
      const f = () => {
        t.el.classList.add(t.params.pagination.paginationDisabledClass);
        let { el: e } = t.pagination;
        e &&
          ((e = M(e)),
          e.forEach((e) =>
            e.classList.add(t.params.pagination.paginationDisabledClass),
          )),
          h();
      };
      Object.assign(t.pagination, {
        enable: () => {
          t.el.classList.remove(t.params.pagination.paginationDisabledClass);
          let { el: e } = t.pagination;
          e &&
            ((e = M(e)),
            e.forEach((e) =>
              e.classList.remove(t.params.pagination.paginationDisabledClass),
            )),
            m(),
            u(),
            p();
        },
        disable: f,
        render: u,
        update: p,
        init: m,
        destroy: h,
      });
    }
    function ue(e) {
      let { swiper: t, extendParams: s, on: i } = e;
      s({
        thumbs: {
          swiper: null,
          multipleActiveThumbs: !0,
          autoScrollOffset: 0,
          slideThumbActiveClass: "swiper-slide-thumb-active",
          thumbsContainerClass: "swiper-thumbs",
        },
      });
      let r = !1,
        a = !1;
      function n() {
        const e = t.thumbs.swiper;
        if (!e || e.destroyed) return;
        const s = e.clickedIndex,
          i = e.clickedSlide;
        if (i && i.classList.contains(t.params.thumbs.slideThumbActiveClass))
          return;
        if (null == s) return;
        let r;
        (r = e.params.loop
          ? parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10)
          : s),
          t.params.loop ? t.slideToLoop(r) : t.slideTo(r);
      }
      function o() {
        const { thumbs: e } = t.params;
        if (r) return !1;
        r = !0;
        const s = t.constructor;
        if (e.swiper instanceof s)
          (t.thumbs.swiper = e.swiper),
            Object.assign(t.thumbs.swiper.originalParams, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            }),
            Object.assign(t.thumbs.swiper.params, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            }),
            t.thumbs.swiper.update();
        else if (v(e.swiper)) {
          const i = Object.assign({}, e.swiper);
          Object.assign(i, {
            watchSlidesProgress: !0,
            slideToClickedSlide: !1,
          }),
            (t.thumbs.swiper = new s(i)),
            (a = !0);
        }
        return (
          t.thumbs.swiper.el.classList.add(
            t.params.thumbs.thumbsContainerClass,
          ),
          t.thumbs.swiper.on("tap", n),
          !0
        );
      }
      function l(e) {
        const s = t.thumbs.swiper;
        if (!s || s.destroyed) return;
        const i =
          "auto" === s.params.slidesPerView
            ? s.slidesPerViewDynamic()
            : s.params.slidesPerView;
        let r = 1;
        const a = t.params.thumbs.slideThumbActiveClass;
        if (
          (t.params.slidesPerView > 1 &&
            !t.params.centeredSlides &&
            (r = t.params.slidesPerView),
          t.params.thumbs.multipleActiveThumbs || (r = 1),
          (r = Math.floor(r)),
          s.slides.forEach((e) => e.classList.remove(a)),
          s.params.loop || (s.params.virtual && s.params.virtual.enabled))
        )
          for (let e = 0; e < r; e += 1)
            S(
              s.slidesEl,
              `[data-swiper-slide-index="${t.realIndex + e}"]`,
            ).forEach((e) => {
              e.classList.add(a);
            });
        else
          for (let e = 0; e < r; e += 1)
            s.slides[t.realIndex + e] &&
              s.slides[t.realIndex + e].classList.add(a);
        const n = t.params.thumbs.autoScrollOffset,
          o = n && !s.params.loop;
        if (t.realIndex !== s.realIndex || o) {
          const r = s.activeIndex;
          let a, l;
          if (s.params.loop) {
            const e = s.slides.filter(
              (e) =>
                e.getAttribute("data-swiper-slide-index") === `${t.realIndex}`,
            )[0];
            (a = s.slides.indexOf(e)),
              (l = t.activeIndex > t.previousIndex ? "next" : "prev");
          } else (a = t.realIndex), (l = a > t.previousIndex ? "next" : "prev");
          o && (a += "next" === l ? n : -1 * n),
            s.visibleSlidesIndexes &&
              s.visibleSlidesIndexes.indexOf(a) < 0 &&
              (s.params.centeredSlides
                ? (a =
                    a > r
                      ? a - Math.floor(i / 2) + 1
                      : a + Math.floor(i / 2) - 1)
                : a > r && s.params.slidesPerGroup,
              s.slideTo(a, e ? 0 : void 0));
        }
      }
      (t.thumbs = { swiper: null }),
        i("beforeInit", () => {
          const { thumbs: e } = t.params;
          if (e && e.swiper)
            if (
              "string" == typeof e.swiper ||
              e.swiper instanceof HTMLElement
            ) {
              const s = p(),
                i = () => {
                  const i =
                    "string" == typeof e.swiper
                      ? s.querySelector(e.swiper)
                      : e.swiper;
                  if (i && i.swiper) (e.swiper = i.swiper), o(), l(!0);
                  else if (i) {
                    const s = (r) => {
                      (e.swiper = r.detail[0]),
                        i.removeEventListener("init", s),
                        o(),
                        l(!0),
                        e.swiper.update(),
                        t.update();
                    };
                    i.addEventListener("init", s);
                  }
                  return i;
                },
                r = () => {
                  if (t.destroyed) return;
                  i() || requestAnimationFrame(r);
                };
              requestAnimationFrame(r);
            } else o(), l(!0);
        }),
        i("slideChange update resize observerUpdate", () => {
          l();
        }),
        i("setTransition", (e, s) => {
          const i = t.thumbs.swiper;
          i && !i.destroyed && i.setTransition(s);
        }),
        i("beforeDestroy", () => {
          const e = t.thumbs.swiper;
          e && !e.destroyed && a && e.destroy();
        }),
        Object.assign(t.thumbs, { init: o, update: l });
    }
    function me() {
      let e = document.querySelectorAll(
        '[class*="__swiper"]:not(.swiper-wrapper)',
      );
      e &&
        e.forEach((e) => {
          e.parentElement.classList.add("swiper"),
            e.classList.add("swiper-wrapper");
          for (const t of e.children) t.classList.add("swiper-slide");
        });
    }
    Object.keys(ae).forEach((e) => {
      Object.keys(ae[e]).forEach((t) => {
        oe.prototype[t] = ae[e][t];
      });
    }),
      oe.use([
        function (e) {
          let { swiper: t, on: s, emit: i } = e;
          const r = m();
          let a = null,
            n = null;
          const o = () => {
              t &&
                !t.destroyed &&
                t.initialized &&
                (i("beforeResize"), i("resize"));
            },
            l = () => {
              t && !t.destroyed && t.initialized && i("orientationchange");
            };
          s("init", () => {
            t.params.resizeObserver && void 0 !== r.ResizeObserver
              ? t &&
                !t.destroyed &&
                t.initialized &&
                ((a = new ResizeObserver((e) => {
                  n = r.requestAnimationFrame(() => {
                    const { width: s, height: i } = t;
                    let r = s,
                      a = i;
                    e.forEach((e) => {
                      let { contentBoxSize: s, contentRect: i, target: n } = e;
                      (n && n !== t.el) ||
                        ((r = i ? i.width : (s[0] || s).inlineSize),
                        (a = i ? i.height : (s[0] || s).blockSize));
                    }),
                      (r === s && a === i) || o();
                  });
                })),
                a.observe(t.el))
              : (r.addEventListener("resize", o),
                r.addEventListener("orientationchange", l));
          }),
            s("destroy", () => {
              n && r.cancelAnimationFrame(n),
                a && a.unobserve && t.el && (a.unobserve(t.el), (a = null)),
                r.removeEventListener("resize", o),
                r.removeEventListener("orientationchange", l);
            });
        },
        function (e) {
          let { swiper: t, extendParams: s, on: i, emit: r } = e;
          const a = [],
            n = m(),
            o = function (e, s) {
              void 0 === s && (s = {});
              const i = new (n.MutationObserver || n.WebkitMutationObserver)(
                (e) => {
                  if (t.__preventObserver__) return;
                  if (1 === e.length) return void r("observerUpdate", e[0]);
                  const s = function () {
                    r("observerUpdate", e[0]);
                  };
                  n.requestAnimationFrame
                    ? n.requestAnimationFrame(s)
                    : n.setTimeout(s, 0);
                },
              );
              i.observe(e, {
                attributes: void 0 === s.attributes || s.attributes,
                childList: void 0 === s.childList || s.childList,
                characterData: void 0 === s.characterData || s.characterData,
              }),
                a.push(i);
            };
          s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
            i("init", () => {
              if (t.params.observer) {
                if (t.params.observeParents) {
                  const e = _(t.hostEl);
                  for (let t = 0; t < e.length; t += 1) o(e[t]);
                }
                o(t.hostEl, { childList: t.params.observeSlideChildren }),
                  o(t.wrapperEl, { attributes: !1 });
              }
            }),
            i("destroy", () => {
              a.forEach((e) => {
                e.disconnect();
              }),
                a.splice(0, a.length);
            });
        },
      ]),
      window.addEventListener("load", function (e) {
        !(function () {
          if (
            (me(),
            document.querySelector(".slider-bottom__slider") &&
              new oe(".slider-bottom__slider", {
                modules: [de, pe],
                slidesPerView: 5,
                spaceBetween: 20,
                autoHeight: !0,
                speed: 500,
                navigation: {
                  nextEl: " .slider-bottom__next",
                  prevEl: " .slider-bottom__prev",
                },
                on: {},
              }),
            document.querySelector(".block-slider__slider") &&
              new oe(".block-slider__slider", {
                modules: [de, pe],
                observer: !0,
                observeParents: !0,
                slidesPerView: 1,
                spaceBetween: 30,
                autoHeight: !0,
                speed: 800,
                pagination: { el: ".block-slider__pagin", clickable: !0 },
                navigation: {
                  nextEl: ".block-slider__nav .block-slider__next",
                  prevEl: ".block-slider__nav .block-slider__prev",
                },
                on: {},
              }),
            document.querySelector(".slider-th__slider"))
          ) {
            new oe(".slider-th__slider", {
              modules: [de, ue],
              direction: "vertical",
              autoHeight: !0,
              slidesPerView: "8",
              navigation: {
                nextEl: ".slider-th__next",
                prevEl: ".slider-th__prev",
              },
              on: {},
            });
            const e = document.querySelector(".slider-th__swiper"),
              t = document.querySelector(".page__img-slide").firstChild,
              s = document.querySelectorAll(".slider-th__slide");
            e.addEventListener("mouseover", (e) => {
              t.setAttribute(
                "src",
                `img/slider-dns/${e.target.dataset.idImg}.webp`,
              ),
                e.target.closest(".slider-th__slide ") &&
                  (console.log(e.target.dataset.idImg),
                  s[0].classList.remove("_active-slide"),
                  s.forEach((t, s) => {
                    t.classList.remove("_active-slide"),
                      +e.target.dataset.idImg === s &&
                        t.classList.add("_active-slide");
                  }));
            }),
              e.addEventListener("mouseout", (e) => {
                e.target.closest(".slider-th__slide ");
              });
          }
        })();
      });
    new (s(144))({
      elements_selector: "[data-src]",
      class_loaded: "_lazy-loaded",
      use_native: !0,
    });
    let he = !1;
    if (
      (setTimeout(() => {
        if (he) {
          let e = new Event("windowScroll");
          window.addEventListener("scroll", function (t) {
            document.dispatchEvent(e);
          });
        }
      }, 0),
      window.matchMedia("(max-width: 767.98px)").matches)
    ) {
      const e = document.querySelectorAll(".dropdown__header"),
        t = document.querySelector(".dropdown__close");
      0 !== e.length &&
        e.forEach((s) => {
          s.addEventListener("click", function (i) {
            i.target.closest("._show") ||
              (e.forEach((e) => {
                e.nextElementSibling.classList.remove("_show"),
                  e.children[0].classList.remove("_show"),
                  document.querySelector("body").classList.remove("lock");
              }),
              t.classList.add("_show"),
              s.nextElementSibling.classList.add("_show"),
              s.children[0].classList.add("_show"),
              document.querySelector("body").classList.add("lock"));
          });
        }),
        t &&
          t.addEventListener("click", function (s) {
            t.classList.remove("_show"),
              document.querySelector("body").classList.remove("lock"),
              e.forEach((e) => {
                e.nextElementSibling.classList.remove("_show"),
                  e.children[0].classList.remove("_show");
              });
          });
    }
    function fe(e) {
      let t = e.querySelector(".video__link"),
        s = e.querySelector(".video__media"),
        i = e.querySelector(".video__button"),
        r = (function (e) {
          let t =
              /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i,
            s = e.src;
          return s.match(t)[1];
        })(s);
      e.addEventListener("click", () => {
        let s = (function (e) {
          let t = document.createElement("iframe");
          return (
            t.setAttribute("allowfullscreen", ""),
            t.setAttribute("allow", "autoplay"),
            t.setAttribute(
              "src",
              (function (e) {
                return (
                  "https://www.youtube.com/embed/" +
                  e +
                  "?rel=0&showinfo=0&autoplay=1"
                );
              })(e),
            ),
            t.classList.add("video__media"),
            t
          );
        })(r);
        t.remove(), i.remove(), e.appendChild(s);
      }),
        t.removeAttribute("href"),
        e.classList.add("video--enabled");
    }
    document.querySelector(".info-item__favorite") &&
      document
        .querySelector(".info-item__favorite")
        .addEventListener("click", () => {
          document
            .querySelector(".info-item__favorite")
            .classList.toggle("_active");
        }),
      (function () {
        let e = document.querySelectorAll(".video");
        for (let t = 0; t < e.length; t++) fe(e[t]);
      })(),
      (window.FLS = !0),
      (function (e) {
        let t = new Image();
        (t.onload = t.onerror =
          function () {
            e(2 == t.height);
          }),
          (t.src =
            "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
      })(function (e) {
        let t = !0 === e ? "webp" : "no-webp";
        document.documentElement.classList.add(t);
      }),
      (function () {
        const s = document.querySelectorAll("[data-showmore]");
        let i, r;
        function a(e) {
          e.forEach((e) => {
            o(e.itemsArray, e.matchMedia);
          });
        }
        function o(s, i) {
          s.forEach((s) => {
            !(function (s, i = !1) {
              s = i ? s.item : s;
              const r = s.querySelector("[data-showmore-content]"),
                a = s.querySelector("[data-showmore-button]"),
                n = l(s, r);
              (i.matches || !i) &&
              n <
                (function (e) {
                  let t = e.offsetHeight;
                  e.style.removeProperty("height");
                  let s = e.offsetHeight;
                  return (e.style.height = `${t}px`), s;
                })(r)
                ? (e(r, 0, n), (a.hidden = !1))
                : (t(r, 0, n), (a.hidden = !0));
            })(s, i);
          });
        }
        function l(e, t) {
          let s = 0;
          if ("items" === (e.dataset.showmore ? e.dataset.showmore : "size")) {
            const e = t.dataset.showmoreContent ? t.dataset.showmoreContent : 3,
              i = t.children;
            for (let t = 1; t < i.length; t++) {
              if (((s += i[t - 1].offsetHeight), t === e)) break;
            }
          } else {
            s = t.dataset.showmoreContent ? t.dataset.showmoreContent : 150;
          }
          return s;
        }
        function d(s) {
          const n = s.target,
            d = s.type;
          if ("click" === d) {
            if (n.closest("[data-showmore-button]")) {
              const s = n
                  .closest("[data-showmore-button]")
                  .closest("[data-showmore]"),
                i = s.querySelector("[data-showmore-content]"),
                r = s.dataset.showmoreButton ? s.dataset.showmoreButton : "500",
                a = l(s, i);
              i.classList.contains("_slide") ||
                (s.classList.contains("_showmore-active")
                  ? e(i, r, a)
                  : t(i, r, a),
                s.classList.toggle("_showmore-active"));
            }
          } else "rsesize" === d && (i.length && o(i), r.length && a(r));
        }
        s.length &&
          ((i = Array.from(s).filter(function (e, t, s) {
            return !e.dataset.showmoreMedia;
          })),
          i.length && o(i),
          document.addEventListener("click", d),
          window.addEventListener("resize", d),
          (r = n(s, "showmoreMedia")),
          r &&
            r.length &&
            (r.forEach((e) => {
              e.matchMedia.addEventListener("change", function () {
                o(e.itemsArray, e.matchMedia);
              });
            }),
            a(r)));
      })(),
      (function () {
        const e = document.querySelectorAll(".rating");
        e.length > 0 &&
          (function () {
            let t, s;
            for (let t = 0; t < e.length; t++) {
              i(e[t]);
            }
            function i(e) {
              r(e), a(), e.classList.contains("rating_set") && n(e);
            }
            function r(e) {
              (t = e.querySelector(".rating__active")),
                (s = e.querySelector(".rating__value"));
            }
            function a(e = s.innerHTML) {
              const i = e / 0.05;
              t.style.width = `${i}%`;
            }
            function n(e) {
              const t = e.querySelectorAll(".rating__item");
              for (let i = 0; i < t.length; i++) {
                const n = t[i];
                n.addEventListener("mouseenter", function (t) {
                  r(e), a(n.value);
                }),
                  n.addEventListener("mouseleave", function (e) {
                    a();
                  }),
                  n.addEventListener("click", function (t) {
                    r(e),
                      e.dataset.ajax
                        ? o(n.value, e)
                        : ((s.innerHTML = i + 1), a());
                  });
              }
            }
            async function o(e, t) {
              if (!t.classList.contains("rating_sending")) {
                t.classList.add("rating_sending");
                let e = await fetch("rating.json", { method: "GET" });
                if (e.ok) {
                  const i = (await e.json()).newRating;
                  (s.innerHTML = i), a(), t.classList.remove("rating_sending");
                } else alert("Ошибка"), t.classList.remove("rating_sending");
              }
            }
          })();
      })(),
      (function () {
        function e(e) {
          if ("click" === e.type) {
            const t = e.target;
            if (t.closest("[data-goto]")) {
              const s = t.closest("[data-goto]"),
                i = s.dataset.goto ? s.dataset.goto : "",
                r = !!s.hasAttribute("data-goto-header"),
                a = s.dataset.gotoSpeed ? s.dataset.gotoSpeed : "500";
              o(i, r, a), e.preventDefault();
            }
          } else if ("watcherCallback" === e.type && e.detail) {
            const t = e.detail.entry,
              s = t.target;
            if ("navigator" === s.dataset.watch) {
              const e = s.id,
                i =
                  (document.querySelector("[data-goto]._navigator-active"),
                  document.querySelector(`[data-goto="${e}"]`));
              t.isIntersecting
                ? i && i.classList.add("_navigator-active")
                : i && i.classList.remove("_navigator-active");
            }
          }
        }
        document.addEventListener("click", e),
          document.addEventListener("watcherCallback", e);
      })(),
      (function () {
        he = !0;
        const e = document.querySelector("header.header"),
          t = e.hasAttribute("data-scroll-show"),
          s = e.dataset.scrollShow ? e.dataset.scrollShow : 500,
          i = e.dataset.scroll ? e.dataset.scroll : 1;
        let r,
          a = 0;
        document.addEventListener("windowScroll", function (n) {
          const o = window.scrollY;
          clearTimeout(r),
            o >= i
              ? (!e.classList.contains("_header-scroll") &&
                  e.classList.add("_header-scroll"),
                t &&
                  (o > a
                    ? e.classList.contains("_header-show") &&
                      e.classList.remove("_header-show")
                    : !e.classList.contains("_header-show") &&
                      e.classList.add("_header-show"),
                  (r = setTimeout(() => {
                    !e.classList.contains("_header-show") &&
                      e.classList.add("_header-show");
                  }, s))))
              : (e.classList.contains("_header-scroll") &&
                  e.classList.remove("_header-scroll"),
                t &&
                  e.classList.contains("_header-show") &&
                  e.classList.remove("_header-show")),
            (a = o <= 0 ? 0 : o);
        });
      })(),
      (he = !0),
      (function () {
        const e = document.querySelectorAll("[data-sticky]");
        e.length &&
          e.forEach((e) => {
            let t = {
              top: e.dataset.stickyTop ? parseInt(e.dataset.stickyTop) : 0,
              bottom: e.dataset.stickyBottom
                ? parseInt(e.dataset.stickyBottom)
                : 0,
              header: e.hasAttribute("data-sticky-header")
                ? document.querySelector("header.header").offsetHeight
                : 0,
            };
            !(function (e, t) {
              const s = e.querySelector("[data-sticky-item]"),
                i = t.header,
                r = i + t.top,
                a = s.getBoundingClientRect().top + scrollY - r;
              document.addEventListener("windowScroll", function (i) {
                const n =
                  e.offsetHeight +
                  e.getBoundingClientRect().top +
                  scrollY -
                  (r + s.offsetHeight + t.bottom);
                let o = {
                  position: "relative",
                  bottom: "auto",
                  top: "0px",
                  left: "0px",
                  width: "auto",
                };
                r + t.bottom + s.offsetHeight < window.innerHeight &&
                  (scrollY >= a && scrollY <= n
                    ? ((o.position = "fixed"),
                      (o.bottom = "auto"),
                      (o.top = `${r}px`),
                      (o.left = `${s.getBoundingClientRect().left}px`),
                      (o.width = `${s.offsetWidth}px`))
                    : scrollY >= n &&
                      ((o.position = "absolute"),
                      (o.bottom = `${t.bottom}px`),
                      (o.top = "auto"),
                      (o.left = "0px"),
                      (o.width = `${s.offsetWidth}px`))),
                  (function (e, t) {
                    e.style.cssText = `position:${t.position};bottom:${t.bottom};top:${t.top};left:${t.left};width:${t.width};`;
                  })(s, o);
              });
            })(e, t);
          });
      })();
  })();
})();
