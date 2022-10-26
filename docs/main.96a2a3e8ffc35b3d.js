"use strict";
(self.webpackChunkgood_knightz = self.webpackChunkgood_knightz || []).push([
  [179],
  {
    332: () => {
      function re(e) {
        return "function" == typeof e;
      }
      function Qr(e) {
        const n = e(r => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const Zr = Qr(
        e =>
          function(n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function Yn(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class lt {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (re(r))
              try {
                r();
              } catch (i) {
                t = i instanceof Zr ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  Ju(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof Zr ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new Zr(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) Ju(t);
            else {
              if (t instanceof lt) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && Yn(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && Yn(n, t), t instanceof lt && t._removeParent(this);
        }
      }
      lt.EMPTY = (() => {
        const e = new lt();
        return (e.closed = !0), e;
      })();
      const Ku = lt.EMPTY;
      function Yu(e) {
        return (
          e instanceof lt ||
          (e && "closed" in e && re(e.remove) && re(e.add) && re(e.unsubscribe))
        );
      }
      function Ju(e) {
        re(e) ? e() : e.unsubscribe();
      }
      const Gt = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1
        },
        Kr = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = Kr;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = Kr;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0
        };
      function Xu(e) {
        Kr.setTimeout(() => {
          const { onUnhandledError: t } = Gt;
          if (!t) throw e;
          t(e);
        });
      }
      function ec() {}
      const Jg = Ti("C", void 0, void 0);
      function Ti(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let zt = null;
      function Yr(e) {
        if (Gt.useDeprecatedSynchronousErrorHandling) {
          const t = !zt;
          if ((t && (zt = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = zt;
            if (((zt = null), n)) throw r;
          }
        } else e();
      }
      class Ai extends lt {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), Yu(t) && t.add(this))
              : (this.destination = im);
        }
        static create(t, n, r) {
          return new Jn(t, n, r);
        }
        next(t) {
          this.isStopped
            ? Pi(
                (function em(e) {
                  return Ti("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? Pi(
                (function Xg(e) {
                  return Ti("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? Pi(Jg, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const nm = Function.prototype.bind;
      function xi(e, t) {
        return nm.call(e, t);
      }
      class rm {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              Jr(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              Jr(r);
            }
          else Jr(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              Jr(n);
            }
        }
      }
      class Jn extends Ai {
        constructor(t, n, r) {
          let o;
          if ((super(), re(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0
            };
          else {
            let i;
            this && Gt.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && xi(t.next, i),
                  error: t.error && xi(t.error, i),
                  complete: t.complete && xi(t.complete, i)
                }))
              : (o = t);
          }
          this.destination = new rm(o);
        }
      }
      function Jr(e) {
        Gt.useDeprecatedSynchronousErrorHandling
          ? (function tm(e) {
              Gt.useDeprecatedSynchronousErrorHandling &&
                zt &&
                ((zt.errorThrown = !0), (zt.error = e));
            })(e)
          : Xu(e);
      }
      function Pi(e, t) {
        const { onStoppedNotification: n } = Gt;
        n && Kr.setTimeout(() => n(e, t));
      }
      const im = {
          closed: !0,
          next: ec,
          error: function om(e) {
            throw e;
          },
          complete: ec
        },
        Ni =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function tc(e) {
        return e;
      }
      let Pe = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function am(e) {
              return (
                (e && e instanceof Ai) ||
                ((function sm(e) {
                  return e && re(e.next) && re(e.error) && re(e.complete);
                })(e) &&
                  Yu(e))
              );
            })(n)
              ? n
              : new Jn(n, r, o);
            return (
              Yr(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = rc(r))((o, i) => {
              const s = new Jn({
                next: a => {
                  try {
                    n(a);
                  } catch (u) {
                    i(u), s.unsubscribe();
                  }
                },
                error: i,
                complete: o
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [Ni]() {
            return this;
          }
          pipe(...n) {
            return (function nc(e) {
              return 0 === e.length
                ? tc
                : 1 === e.length
                ? e[0]
                : function(n) {
                    return e.reduce((r, o) => o(r), n);
                  };
            })(n)(this);
          }
          toPromise(n) {
            return new (n = rc(n))((r, o) => {
              let i;
              this.subscribe(
                s => (i = s),
                s => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = t => new e(t)), e;
      })();
      function rc(e) {
        var t;
        return null !== (t = e ?? Gt.Promise) && void 0 !== t ? t : Promise;
      }
      const um = Qr(
        e =>
          function() {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let Fi = (() => {
        class e extends Pe {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new oc(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new um();
          }
          next(n) {
            Yr(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            Yr(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            Yr(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? Ku
              : ((this.currentObservers = null),
                i.push(n),
                new lt(() => {
                  (this.currentObservers = null), Yn(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new Pe();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new oc(t, n)), e;
      })();
      class oc extends Fi {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : Ku;
        }
      }
      function Xn(e) {
        return t => {
          if (
            (function cm(e) {
              return re(e?.lift);
            })(t)
          )
            return t.lift(function(n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Xr(e, t, n, r, o) {
        return new lm(e, t, n, r, o);
      }
      class lm extends Ai {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function(a) {
                  try {
                    n(a);
                  } catch (u) {
                    t.error(u);
                  }
                }
              : super._next),
            (this._error = o
              ? function(a) {
                  try {
                    o(a);
                  } catch (u) {
                    t.error(u);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function() {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function qt(e) {
        return this instanceof qt ? ((this.v = e), this) : new qt(e);
      }
      function pm(e, t, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var o,
          r = n.apply(e, t || []),
          i = [];
        return (
          (o = {}),
          s("next"),
          s("throw"),
          s("return"),
          (o[Symbol.asyncIterator] = function() {
            return this;
          }),
          o
        );
        function s(f) {
          r[f] &&
            (o[f] = function(h) {
              return new Promise(function(p, g) {
                i.push([f, h, p, g]) > 1 || a(f, h);
              });
            });
        }
        function a(f, h) {
          try {
            !(function u(f) {
              f.value instanceof qt
                ? Promise.resolve(f.value.v).then(c, l)
                : d(i[0][2], f);
            })(r[f](h));
          } catch (p) {
            d(i[0][3], p);
          }
        }
        function c(f) {
          a("next", f);
        }
        function l(f) {
          a("throw", f);
        }
        function d(f, h) {
          f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
        }
      }
      function gm(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function ac(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function() {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  }
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function() {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function(s) {
              return new Promise(function(a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function(c) {
                    i({ value: c, done: a });
                  }, s);
                })(a, u, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      const uc = e =>
        e && "number" == typeof e.length && "function" != typeof e;
      function cc(e) {
        return re(e?.then);
      }
      function lc(e) {
        return re(e[Ni]);
      }
      function dc(e) {
        return Symbol.asyncIterator && re(e?.[Symbol.asyncIterator]);
      }
      function fc(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const hc = (function ym() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function pc(e) {
        return re(e?.[hc]);
      }
      function gc(e) {
        return pm(this, arguments, function*() {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield qt(n.read());
              if (o) return yield qt(void 0);
              yield yield qt(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function mc(e) {
        return re(e?.getReader);
      }
      function Wt(e) {
        if (e instanceof Pe) return e;
        if (null != e) {
          if (lc(e))
            return (function Dm(e) {
              return new Pe(t => {
                const n = e[Ni]();
                if (re(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (uc(e))
            return (function vm(e) {
              return new Pe(t => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (cc(e))
            return (function wm(e) {
              return new Pe(t => {
                e.then(
                  n => {
                    t.closed || (t.next(n), t.complete());
                  },
                  n => t.error(n)
                ).then(null, Xu);
              });
            })(e);
          if (dc(e)) return yc(e);
          if (pc(e))
            return (function _m(e) {
              return new Pe(t => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (mc(e))
            return (function Cm(e) {
              return yc(gc(e));
            })(e);
        }
        throw fc(e);
      }
      function yc(e) {
        return new Pe(t => {
          (function Em(e, t) {
            var n, r, o, i;
            return (function fm(e, t, n, r) {
              return new (n || (n = Promise))(function(i, s) {
                function a(l) {
                  try {
                    c(r.next(l));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(l) {
                  try {
                    c(r.throw(l));
                  } catch (d) {
                    s(d);
                  }
                }
                function c(l) {
                  l.done
                    ? i(l.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function(s) {
                              s(i);
                            });
                      })(l.value).then(a, u);
                }
                c((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function*() {
              try {
                for (n = gm(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch(n => t.error(n));
        });
      }
      function Ot(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function() {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function Dc(e, t, n = 1 / 0) {
        return re(t)
          ? Dc(
              (r, o) =>
                (function dm(e, t) {
                  return Xn((n, r) => {
                    let o = 0;
                    n.subscribe(
                      Xr(r, i => {
                        r.next(e.call(t, i, o++));
                      })
                    );
                  });
                })((i, s) => t(r, i, o, s))(Wt(e(r, o))),
              n
            )
          : ("number" == typeof t && (n = t),
            Xn((r, o) =>
              (function bm(e, t, n, r, o, i, s, a) {
                const u = [];
                let c = 0,
                  l = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !c && t.complete();
                  },
                  h = g => (c < r ? p(g) : u.push(g)),
                  p = g => {
                    i && t.next(g), c++;
                    let D = !1;
                    Wt(n(g, l++)).subscribe(
                      Xr(
                        t,
                        v => {
                          o?.(v), i ? h(v) : t.next(v);
                        },
                        () => {
                          D = !0;
                        },
                        void 0,
                        () => {
                          if (D)
                            try {
                              for (c--; u.length && c < r; ) {
                                const v = u.shift();
                                s ? Ot(t, s, () => p(v)) : p(v);
                              }
                              f();
                            } catch (v) {
                              t.error(v);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    Xr(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      const vc = new Pe(e => e.complete());
      function Ri(e) {
        return e[e.length - 1];
      }
      function wc(e, t = 0) {
        return Xn((n, r) => {
          n.subscribe(
            Xr(
              r,
              o => Ot(r, e, () => r.next(o), t),
              () => Ot(r, e, () => r.complete(), t),
              o => Ot(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function _c(e, t = 0) {
        return Xn((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function Cc(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new Pe(n => {
          Ot(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            Ot(
              n,
              t,
              () => {
                r.next().then(o => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function km(...e) {
        const t = (function Tm(e) {
            return (function Sm(e) {
              return e && re(e.schedule);
            })(Ri(e))
              ? e.pop()
              : void 0;
          })(e),
          n = (function Am(e, t) {
            return "number" == typeof Ri(e) ? e.pop() : t;
          })(e, 1 / 0),
          r = e;
        return r.length
          ? 1 === r.length
            ? Wt(r[0])
            : (function Im(e = 1 / 0) {
                return Dc(tc, e);
              })(n)(
                (function Lm(e, t) {
                  return t
                    ? (function Rm(e, t) {
                        if (null != e) {
                          if (lc(e))
                            return (function xm(e, t) {
                              return Wt(e).pipe(_c(t), wc(t));
                            })(e, t);
                          if (uc(e))
                            return (function Nm(e, t) {
                              return new Pe(n => {
                                let r = 0;
                                return t.schedule(function() {
                                  r === e.length
                                    ? n.complete()
                                    : (n.next(e[r++]),
                                      n.closed || this.schedule());
                                });
                              });
                            })(e, t);
                          if (cc(e))
                            return (function Pm(e, t) {
                              return Wt(e).pipe(_c(t), wc(t));
                            })(e, t);
                          if (dc(e)) return Cc(e, t);
                          if (pc(e))
                            return (function Fm(e, t) {
                              return new Pe(n => {
                                let r;
                                return (
                                  Ot(n, t, () => {
                                    (r = e[hc]()),
                                      Ot(
                                        n,
                                        t,
                                        () => {
                                          let o, i;
                                          try {
                                            ({ value: o, done: i } = r.next());
                                          } catch (s) {
                                            return void n.error(s);
                                          }
                                          i ? n.complete() : n.next(o);
                                        },
                                        0,
                                        !0
                                      );
                                  }),
                                  () => re(r?.return) && r.return()
                                );
                              });
                            })(e, t);
                          if (mc(e))
                            return (function Om(e, t) {
                              return Cc(gc(e), t);
                            })(e, t);
                        }
                        throw fc(e);
                      })(e, t)
                    : Wt(e);
                })(r, t)
              )
          : vc;
      }
      function Li(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new Jn({
          next: () => {
            r.unsubscribe(), e();
          }
        });
        return t(...n).subscribe(r);
      }
      function Q(e) {
        for (let t in e) if (e[t] === Q) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function Z(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(Z).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function Vi(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const jm = Q({ __forward_ref__: Q });
      function ji(e) {
        return (
          (e.__forward_ref__ = ji),
          (e.toString = function() {
            return Z(this());
          }),
          e
        );
      }
      function S(e) {
        return (function Bi(e) {
          return (
            "function" == typeof e &&
            e.hasOwnProperty(jm) &&
            e.__forward_ref__ === ji
          );
        })(e)
          ? e()
          : e;
      }
      class I extends Error {
        constructor(t, n) {
          super(
            (function eo(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function x(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function to(e, t) {
        throw new I(-201, !1);
      }
      function ke(e, t) {
        null == e &&
          (function z(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function X(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0
        };
      }
      function un(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function no(e) {
        return Ec(e, ro) || Ec(e, Ic);
      }
      function Ec(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function bc(e) {
        return e && (e.hasOwnProperty(Hi) || e.hasOwnProperty(Wm))
          ? e[Hi]
          : null;
      }
      const ro = Q({ ɵprov: Q }),
        Hi = Q({ ɵinj: Q }),
        Ic = Q({ ngInjectableDef: Q }),
        Wm = Q({ ngInjectorDef: Q });
      var T = (() => (
        ((T = T || {})[(T.Default = 0)] = "Default"),
        (T[(T.Host = 1)] = "Host"),
        (T[(T.Self = 2)] = "Self"),
        (T[(T.SkipSelf = 4)] = "SkipSelf"),
        (T[(T.Optional = 8)] = "Optional"),
        T
      ))();
      let $i;
      function Ge(e) {
        const t = $i;
        return ($i = e), t;
      }
      function Mc(e, t, n) {
        const r = no(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & T.Optional
          ? null
          : void 0 !== t
          ? t
          : void to(Z(e));
      }
      function Rt(e) {
        return { toString: e }.toString();
      }
      var Je = (() => (
          ((Je = Je || {})[(Je.OnPush = 0)] = "OnPush"),
          (Je[(Je.Default = 1)] = "Default"),
          Je
        ))(),
        dt = (() => {
          return (
            ((e = dt || (dt = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            dt
          );
          var e;
        })();
      const K = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        cn = {},
        G = [],
        oo = Q({ ɵcmp: Q }),
        Ui = Q({ ɵdir: Q }),
        Gi = Q({ ɵpipe: Q }),
        Sc = Q({ ɵmod: Q }),
        wt = Q({ ɵfac: Q }),
        er = Q({ __NG_ELEMENT_ID__: Q });
      let Zm = 0;
      function Xe(e) {
        return Rt(() => {
          const n = !0 === e.standalone,
            r = {},
            o = {
              type: e.type,
              providersResolver: null,
              decls: e.decls,
              vars: e.vars,
              factory: null,
              template: e.template || null,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              hostBindings: e.hostBindings || null,
              hostVars: e.hostVars || 0,
              hostAttrs: e.hostAttrs || null,
              contentQueries: e.contentQueries || null,
              declaredInputs: r,
              inputs: null,
              outputs: null,
              exportAs: e.exportAs || null,
              onPush: e.changeDetection === Je.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              standalone: n,
              dependencies: (n && e.dependencies) || null,
              getStandaloneInjector: null,
              selectors: e.selectors || G,
              viewQuery: e.viewQuery || null,
              features: e.features || null,
              data: e.data || {},
              encapsulation: e.encapsulation || dt.Emulated,
              id: "c" + Zm++,
              styles: e.styles || G,
              _: null,
              setInput: null,
              schemas: e.schemas || null,
              tView: null
            },
            i = e.dependencies,
            s = e.features;
          return (
            (o.inputs = xc(e.inputs, r)),
            (o.outputs = xc(e.outputs)),
            s && s.forEach(a => a(o)),
            (o.directiveDefs = i
              ? () => ("function" == typeof i ? i() : i).map(Tc).filter(Ac)
              : null),
            (o.pipeDefs = i
              ? () => ("function" == typeof i ? i() : i).map(Ie).filter(Ac)
              : null),
            o
          );
        });
      }
      function Tc(e) {
        return W(e) || be(e);
      }
      function Ac(e) {
        return null !== e;
      }
      function tr(e) {
        return Rt(() => ({
          type: e.type,
          bootstrap: e.bootstrap || G,
          declarations: e.declarations || G,
          imports: e.imports || G,
          exports: e.exports || G,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null
        }));
      }
      function xc(e, t) {
        if (null == e) return cn;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      const ze = Xe;
      function W(e) {
        return e[oo] || null;
      }
      function be(e) {
        return e[Ui] || null;
      }
      function Ie(e) {
        return e[Gi] || null;
      }
      const O = 11,
        Y = 22;
      function Fe(e) {
        return Array.isArray(e) && "object" == typeof e[1];
      }
      function tt(e) {
        return Array.isArray(e) && !0 === e[1];
      }
      function Wi(e) {
        return 0 != (8 & e.flags);
      }
      function uo(e) {
        return 2 == (2 & e.flags);
      }
      function co(e) {
        return 1 == (1 & e.flags);
      }
      function nt(e) {
        return null !== e.template;
      }
      function ty(e) {
        return 0 != (256 & e[2]);
      }
      function Jt(e, t) {
        return e.hasOwnProperty(wt) ? e[wt] : null;
      }
      class oy {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Fc(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = sy), iy;
      }
      function iy() {
        const e = Rc(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === cn) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function sy(e, t, n, r) {
        const o =
            Rc(e) ||
            (function ay(e, t) {
              return (e[Oc] = t);
            })(e, { previous: cn, current: null }),
          i = o.current || (o.current = {}),
          s = o.previous,
          a = this.declaredInputs[n],
          u = s[a];
        (i[a] = new oy(u && u.currentValue, t, s === cn)), (e[r] = t);
      }
      const Oc = "__ngSimpleChanges__";
      function Rc(e) {
        return e[Oc] || null;
      }
      function ce(e) {
        for (; Array.isArray(e); ) e = e[0];
        return e;
      }
      function Qe(e, t) {
        return ce(t[e.index]);
      }
      function Ji(e, t) {
        return e.data[t];
      }
      function Be(e, t) {
        const n = t[e];
        return Fe(n) ? n : n[0];
      }
      function ho(e) {
        return 64 == (64 & e[2]);
      }
      function Lt(e, t) {
        return null == t ? null : e[t];
      }
      function Lc(e) {
        e[18] = 0;
      }
      function Xi(e, t) {
        e[5] += t;
        let n = e,
          r = e[3];
        for (
          ;
          null !== r && ((1 === t && 1 === n[5]) || (-1 === t && 0 === n[5]));

        )
          (r[5] += t), (n = r), (r = r[3]);
      }
      const A = { lFrame: qc(null), bindingsEnabled: !0 };
      function Vc() {
        return A.bindingsEnabled;
      }
      function y() {
        return A.lFrame.lView;
      }
      function B() {
        return A.lFrame.tView;
      }
      function he() {
        let e = jc();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function jc() {
        return A.lFrame.currentTNode;
      }
      function ft(e, t) {
        const n = A.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function es() {
        return A.lFrame.isParent;
      }
      function pn() {
        return A.lFrame.bindingIndex++;
      }
      function by(e, t) {
        const n = A.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), ns(t);
      }
      function ns(e) {
        A.lFrame.currentDirectiveIndex = e;
      }
      function os(e) {
        A.lFrame.currentQueryIndex = e;
      }
      function My(e) {
        const t = e[1];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null;
      }
      function Gc(e, t, n) {
        if (n & T.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & T.Host ||
              ((o = My(i)), null === o || ((i = i[15]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (A.lFrame = zc());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function is(e) {
        const t = zc(),
          n = e[1];
        (A.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function zc() {
        const e = A.lFrame,
          t = null === e ? null : e.child;
        return null === t ? qc(e) : t;
      }
      function qc(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1
        };
        return null !== e && (e.child = t), t;
      }
      function Wc() {
        const e = A.lFrame;
        return (
          (A.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const Qc = Wc;
      function ss() {
        const e = Wc();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Se() {
        return A.lFrame.selectedIndex;
      }
      function kt(e) {
        A.lFrame.selectedIndex = e;
      }
      function po(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: c,
              ngOnDestroy: l
            } = i;
          s && (e.contentHooks || (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks || (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)),
            u && (e.viewHooks || (e.viewHooks = [])).push(-n, u),
            c &&
              ((e.viewHooks || (e.viewHooks = [])).push(n, c),
              (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, c)),
            null != l && (e.destroyHooks || (e.destroyHooks = [])).push(n, l);
        }
      }
      function go(e, t, n) {
        Zc(e, t, 3, n);
      }
      function mo(e, t, n, r) {
        (3 & e[2]) === n && Zc(e, t, n, r);
      }
      function as(e, t) {
        let n = e[2];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[2] = n));
      }
      function Zc(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[18] : 0; u < s; u++)
          if ("number" == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[18] += 65536),
              (a < i || -1 == i) &&
                (Ry(e, n, t, u), (e[18] = (4294901760 & e[18]) + u + 2)),
              u++;
      }
      function Ry(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        if (o) {
          if (e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === t) {
            e[2] += 2048;
            try {
              i.call(a);
            } finally {
            }
          }
        } else
          try {
            i.call(a);
          } finally {
          }
      }
      class ur {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function yo(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            Yc(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function Kc(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function Yc(e) {
        return 64 === e.charCodeAt(0);
      }
      function Do(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  Jc(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function Jc(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      function Xc(e) {
        return -1 !== e;
      }
      function gn(e) {
        return 32767 & e;
      }
      function mn(e, t) {
        let n = (function By(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let cs = !0;
      function vo(e) {
        const t = cs;
        return (cs = e), t;
      }
      let Hy = 0;
      const ht = {};
      function lr(e, t) {
        const n = ds(e, t);
        if (-1 !== n) return n;
        const r = t[1];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          ls(r.data, e),
          ls(t, null),
          ls(r.blueprint, null));
        const o = wo(e, t),
          i = e.injectorIndex;
        if (Xc(o)) {
          const s = gn(o),
            a = mn(o, t),
            u = a[1].data;
          for (let c = 0; c < 8; c++) t[i + c] = a[s + c] | u[s + c];
        }
        return (t[i + 8] = o), i;
      }
      function ls(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function ds(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function wo(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = ul(o)), null === r)) return -1;
          if ((n++, (o = o[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return -1;
      }
      function _o(e, t, n) {
        !(function $y(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(er) && (r = n[er]),
            null == r && (r = n[er] = Hy++);
          const o = 255 & r;
          t.data[e + (o >> 5)] |= 1 << o;
        })(e, t, n);
      }
      function nl(e, t, n) {
        if (n & T.Optional || void 0 !== e) return e;
        to();
      }
      function rl(e, t, n, r) {
        if (
          (n & T.Optional && void 0 === r && (r = null),
          0 == (n & (T.Self | T.Host)))
        ) {
          const o = e[9],
            i = Ge(void 0);
          try {
            return o ? o.get(t, r, n & T.Optional) : Mc(t, r, n & T.Optional);
          } finally {
            Ge(i);
          }
        }
        return nl(r, 0, n);
      }
      function ol(e, t, n, r = T.Default, o) {
        if (null !== e) {
          if (1024 & t[2]) {
            const s = (function Qy(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 1024 & s[2] && !(256 & s[2]);

              ) {
                const a = il(i, s, n, r | T.Self, ht);
                if (a !== ht) return a;
                let u = i.parent;
                if (!u) {
                  const c = s[21];
                  if (c) {
                    const l = c.get(n, ht, r);
                    if (l !== ht) return l;
                  }
                  (u = ul(s)), (s = s[15]);
                }
                i = u;
              }
              return o;
            })(e, t, n, r, ht);
            if (s !== ht) return s;
          }
          const i = il(e, t, n, r, ht);
          if (i !== ht) return i;
        }
        return rl(t, n, r, o);
      }
      function il(e, t, n, r, o) {
        const i = (function zy(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(er) ? e[er] : void 0;
          return "number" == typeof t ? (t >= 0 ? 255 & t : qy) : t;
        })(n);
        if ("function" == typeof i) {
          if (!Gc(t, e, r)) return r & T.Host ? nl(o, 0, r) : rl(t, n, r, o);
          try {
            const s = i(r);
            if (null != s || r & T.Optional) return s;
            to();
          } finally {
            Qc();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = ds(e, t),
            u = -1,
            c = r & T.Host ? t[16][6] : null;
          for (
            (-1 === a || r & T.SkipSelf) &&
            ((u = -1 === a ? wo(e, t) : t[a + 8]),
            -1 !== u && al(r, !1)
              ? ((s = t[1]), (a = gn(u)), (t = mn(u, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const l = t[1];
            if (sl(i, a, l.data)) {
              const d = Gy(a, t, n, s, r, c);
              if (d !== ht) return d;
            }
            (u = t[a + 8]),
              -1 !== u && al(r, t[1].data[a + 8] === c) && sl(i, a, t)
                ? ((s = l), (a = gn(u)), (t = mn(u, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function Gy(e, t, n, r, o, i) {
        const s = t[1],
          a = s.data[e + 8],
          l = (function Co(e, t, n, r, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              u = e.directiveStart,
              l = i >> 20,
              f = o ? a + l : e.directiveEnd;
            for (let h = r ? a : a + l; h < f; h++) {
              const p = s[h];
              if ((h < u && n === p) || (h >= u && p.type === n)) return h;
            }
            if (o) {
              const h = s[u];
              if (h && nt(h) && h.type === n) return u;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? uo(a) && cs : r != s && 0 != (3 & a.type),
            o & T.Host && i === a
          );
        return null !== l ? dr(t, s, l, a) : ht;
      }
      function dr(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function Ly(e) {
            return e instanceof ur;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function Bm(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new I(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function U(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : x(e);
              })(i[n])
            );
          const a = vo(s.canSeeViewProviders);
          s.resolving = !0;
          const u = s.injectImpl ? Ge(s.injectImpl) : null;
          Gc(e, r, T.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function Oy(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i
                  } = t.type.prototype;
                  if (r) {
                    const s = Fc(t);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  o &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== u && Ge(u), vo(a), (s.resolving = !1), Qc();
          }
        }
        return o;
      }
      function sl(e, t, n) {
        return !!(n[t + (e >> 5)] & (1 << e));
      }
      function al(e, t) {
        return !(e & T.Self || (e & T.Host && t));
      }
      class yn {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return ol(this._tNode, this._lView, t, r, n);
        }
      }
      function qy() {
        return new yn(he(), y());
      }
      function ul(e) {
        const t = e[1],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[6] : null;
      }
      const vn = "__parameters__";
      function _n(e, t, n) {
        return Rt(() => {
          const r = (function ps(e) {
            return function(...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(u, c, l) {
              const d = u.hasOwnProperty(vn)
                ? u[vn]
                : Object.defineProperty(u, vn, { value: [] })[vn];
              for (; d.length <= l; ) d.push(null);
              return (d[l] = d[l] || []).push(s), u;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      class V {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = X({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function Et(e, t) {
        e.forEach(n => (Array.isArray(n) ? Et(n, t) : t(n)));
      }
      function ll(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function Eo(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      const gr = {},
        Ds = "__NG_DI_FLAG__",
        Io = "ngTempTokenPath",
        sD = /\n/gm,
        pl = "__source";
      let mr;
      function En(e) {
        const t = mr;
        return (mr = e), t;
      }
      function uD(e, t = T.Default) {
        if (void 0 === mr) throw new I(-203, !1);
        return null === mr
          ? Mc(e, void 0, t)
          : mr.get(e, t & T.Optional ? null : void 0, t);
      }
      function q(e, t = T.Default) {
        return (
          (function Qm() {
            return $i;
          })() || uD
        )(S(e), t);
      }
      function vs(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = S(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new I(900, !1);
            let o,
              i = T.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = lD(a);
              "number" == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a);
            }
            t.push(q(o, i));
          } else t.push(q(r));
        }
        return t;
      }
      function yr(e, t) {
        return (e[Ds] = t), (e.prototype[Ds] = t), e;
      }
      function lD(e) {
        return e[Ds];
      }
      const Mo = yr(_n("Optional"), 8),
        So = yr(_n("SkipSelf"), 4);
      let _s;
      const Ll = new V("ENVIRONMENT_INITIALIZER"),
        kl = new V("INJECTOR", -1),
        Vl = new V("INJECTOR_DEF_TYPES");
      class jl {
        get(t, n = gr) {
          if (n === gr) {
            const r = new Error(`NullInjectorError: No provider for ${Z(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function QD(...e) {
        return { ɵproviders: Bl(0, e) };
      }
      function Bl(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        return (
          Et(t, i => {
            const s = i;
            Ts(s, n, [], r) && (o || (o = []), o.push(s));
          }),
          void 0 !== o && Hl(o, n),
          n
        );
      }
      function Hl(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: o } = e[n];
          Et(o, i => {
            t.push(i);
          });
        }
      }
      function Ts(e, t, n, r) {
        if (!(e = S(e))) return !1;
        let o = null,
          i = bc(e);
        const s = !i && W(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const u = e.ngModule;
          if (((i = bc(u)), !i)) return !1;
          o = u;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const u =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const c of u) Ts(c, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let c;
              r.add(o);
              try {
                Et(i.imports, l => {
                  Ts(l, t, n, r) && (c || (c = []), c.push(l));
                });
              } finally {
              }
              void 0 !== c && Hl(c, t);
            }
            if (!a) {
              const c = Jt(o) || (() => new o());
              t.push(
                { provide: o, useFactory: c, deps: G },
                { provide: Vl, useValue: o, multi: !0 },
                { provide: Ll, useValue: () => q(o), multi: !0 }
              );
            }
            const u = i.providers;
            null == u ||
              a ||
              Et(u, l => {
                t.push(l);
              });
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      const ZD = Q({ provide: String, useValue: Q });
      function As(e) {
        return null !== e && "object" == typeof e && ZD in e;
      }
      function Xt(e) {
        return "function" == typeof e;
      }
      const xs = new V("Set Injector scope."),
        Fo = {},
        YD = {};
      let Ps;
      function Oo() {
        return void 0 === Ps && (Ps = new jl()), Ps;
      }
      class Mn {}
      class Gl extends Mn {
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            Fs(t, s => this.processProvider(s)),
            this.records.set(kl, Sn(void 0, this)),
            o.has("environment") && this.records.set(Mn, Sn(void 0, this));
          const i = this.records.get(xs);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(Vl.multi, G, T.Self)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = En(this),
            r = Ge(void 0);
          try {
            return t();
          } finally {
            En(n), Ge(r);
          }
        }
        get(t, n = gr, r = T.Default) {
          this.assertNotDestroyed();
          const o = En(this),
            i = Ge(void 0);
          try {
            if (!(r & T.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const u =
                  (function nv(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof V)
                    );
                  })(t) && no(t);
                (a = u && this.injectableDefInScope(u) ? Sn(Ns(t), Fo) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & T.Self ? Oo() : this.parent).get(
              t,
              (n = r & T.Optional && n === gr ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[Io] = s[Io] || []).unshift(Z(t)), o)) throw s;
              return (function dD(e, t, n, r) {
                const o = e[Io];
                throw (t[pl] && o.unshift(t[pl]),
                (e.message = (function fD(e, t, n, r = null) {
                  e =
                    e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                      ? e.slice(2)
                      : e;
                  let o = Z(t);
                  if (Array.isArray(t)) o = t.map(Z).join(" -> ");
                  else if ("object" == typeof t) {
                    let i = [];
                    for (let s in t)
                      if (t.hasOwnProperty(s)) {
                        let a = t[s];
                        i.push(
                          s +
                            ":" +
                            ("string" == typeof a ? JSON.stringify(a) : Z(a))
                        );
                      }
                    o = `{${i.join(", ")}}`;
                  }
                  return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                    sD,
                    "\n  "
                  )}`;
                })("\n" + e.message, o, n, r)),
                (e.ngTokenPath = o),
                (e[Io] = null),
                e);
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            Ge(i), En(o);
          }
        }
        resolveInjectorInitializers() {
          const t = En(this),
            n = Ge(void 0);
          try {
            const r = this.get(Ll.multi, G, T.Self);
            for (const o of r) o();
          } finally {
            En(t), Ge(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(Z(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new I(205, !1);
        }
        processProvider(t) {
          let n = Xt((t = S(t))) ? t : S(t && t.provide);
          const r = (function XD(e) {
            return As(e)
              ? Sn(void 0, e.useValue)
              : Sn(
                  (function zl(e, t, n) {
                    let r;
                    if (Xt(e)) {
                      const o = S(e);
                      return Jt(o) || Ns(o);
                    }
                    if (As(e)) r = () => S(e.useValue);
                    else if (
                      (function Ul(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(...vs(e.deps || []));
                    else if (
                      (function $l(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => q(S(e.useExisting));
                    else {
                      const o = S(e && (e.useClass || e.provide));
                      if (
                        !(function ev(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return Jt(o) || Ns(o);
                      r = () => new o(...vs(e.deps));
                    }
                    return r;
                  })(e),
                  Fo
                );
          })(t);
          if (Xt(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = Sn(void 0, Fo, !0)),
              (o.factory = () => vs(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === Fo && ((n.value = YD), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function tv(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = S(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
      }
      function Ns(e) {
        const t = no(e),
          n = null !== t ? t.factory : Jt(e);
        if (null !== n) return n;
        if (e instanceof V) throw new I(204, !1);
        if (e instanceof Function)
          return (function JD(e) {
            const t = e.length;
            if (t > 0)
              throw ((function pr(e, t) {
                const n = [];
                for (let r = 0; r < e; r++) n.push(t);
                return n;
              })(t, "?"),
              new I(204, !1));
            const n = (function zm(e) {
              const t = e && (e[ro] || e[Ic]);
              if (t) {
                const n = (function qm(e) {
                  if (e.hasOwnProperty("name")) return e.name;
                  const t = ("" + e).match(/^function\s*([^\s(]+)/);
                  return null === t ? "" : t[1];
                })(e);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  t
                );
              }
              return null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new I(204, !1);
      }
      function Sn(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function rv(e) {
        return !!e.ɵproviders;
      }
      function Fs(e, t) {
        for (const n of e)
          Array.isArray(n) ? Fs(n, t) : rv(n) ? Fs(n.ɵproviders, t) : t(n);
      }
      class ql {}
      class sv {
        resolveComponentFactory(t) {
          throw (function iv(e) {
            const t = Error(
              `No component factory found for ${Z(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Ro = (() => {
        class e {}
        return (e.NULL = new sv()), e;
      })();
      function av() {
        return Tn(he(), y());
      }
      function Tn(e, t) {
        return new An(Qe(e, t));
      }
      let An = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = av), e;
      })();
      class Ql {}
      let lv = (() => {
        class e {}
        return (
          (e.ɵprov = X({ token: e, providedIn: "root", factory: () => null })),
          e
        );
      })();
      class Os {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t
              .split(".")
              .slice(2)
              .join("."));
        }
      }
      const dv = new Os("14.2.4"),
        Rs = {};
      function Bs(e) {
        return e.ngOriginalError;
      }
      class xn {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && Bs(t);
          for (; n && Bs(n); ) n = Bs(n);
          return n || null;
        }
      }
      const Hs = new Map();
      let Ev = 0;
      const Us = "__ngContext__";
      function we(e, t) {
        Fe(t)
          ? ((e[Us] = t[20]),
            (function Iv(e) {
              Hs.set(e[20], e);
            })(t))
          : (e[Us] = t);
      }
      var Oe = (() => (
        ((Oe = Oe || {})[(Oe.Important = 1)] = "Important"),
        (Oe[(Oe.DashCase = 2)] = "DashCase"),
        Oe
      ))();
      function zs(e, t) {
        return undefined(e, t);
      }
      function br(e) {
        const t = e[3];
        return tt(t) ? t[3] : t;
      }
      function qs(e) {
        return cd(e[13]);
      }
      function Ws(e) {
        return cd(e[4]);
      }
      function cd(e) {
        for (; null !== e && !tt(e); ) e = e[4];
        return e;
      }
      function Nn(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          tt(r) ? (i = r) : Fe(r) && ((s = !0), (r = r[0]));
          const a = ce(r);
          0 === e && null !== n
            ? null == o
              ? gd(t, n, a)
              : en(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? en(t, n, a, o || null, !0)
            : 2 === e
            ? (function Cd(e, t, n) {
                const r = Lo(e, t);
                r &&
                  (function Jv(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function tw(e, t, n, r, o) {
                const i = n[7];
                i !== ce(n) && Nn(t, e, r, i, o);
                for (let a = 10; a < n.length; a++) {
                  const u = n[a];
                  Ir(u[1], u, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function Zs(e, t, n) {
        return e.createElement(t, n);
      }
      function dd(e, t) {
        const n = e[9],
          r = n.indexOf(t),
          o = t[3];
        512 & t[2] && ((t[2] &= -513), Xi(o, -1)), n.splice(r, 1);
      }
      function Ks(e, t) {
        if (e.length <= 10) return;
        const n = 10 + t,
          r = e[n];
        if (r) {
          const o = r[17];
          null !== o && o !== e && dd(o, r), t > 0 && (e[n - 1][4] = r[4]);
          const i = Eo(e, 10 + t);
          !(function Gv(e, t) {
            Ir(e, t, t[O], 2, null, null), (t[0] = null), (t[6] = null);
          })(r[1], r);
          const s = i[19];
          null !== s && s.detachView(i[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -65);
        }
        return r;
      }
      function fd(e, t) {
        if (!(128 & t[2])) {
          const n = t[O];
          n.destroyNode && Ir(e, t, n, 3, null, null),
            (function Wv(e) {
              let t = e[13];
              if (!t) return Ys(e[1], e);
              for (; t; ) {
                let n = null;
                if (Fe(t)) n = t[13];
                else {
                  const r = t[10];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[4] && t !== e; )
                    Fe(t) && Ys(t[1], t), (t = t[3]);
                  null === t && (t = e), Fe(t) && Ys(t[1], t), (n = t && t[4]);
                }
                t = n;
              }
            })(t);
        }
      }
      function Ys(e, t) {
        if (!(128 & t[2])) {
          (t[2] &= -65),
            (t[2] |= 128),
            (function Yv(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof ur)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1];
                        try {
                          u.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        i.call(o);
                      } finally {
                      }
                  }
                }
            })(e, t),
            (function Kv(e, t) {
              const n = e.cleanup,
                r = t[7];
              let o = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 1],
                      a = "function" == typeof s ? s(t) : ce(t[s]),
                      u = r[(o = n[i + 2])],
                      c = n[i + 3];
                    "boolean" == typeof c
                      ? a.removeEventListener(n[i], u, c)
                      : c >= 0
                      ? r[(o = c)]()
                      : r[(o = -c)].unsubscribe(),
                      (i += 2);
                  } else {
                    const s = r[(o = n[i + 1])];
                    n[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) (0, r[i])();
                t[7] = null;
              }
            })(e, t),
            1 === t[1].type && t[O].destroy();
          const n = t[17];
          if (null !== n && tt(t[3])) {
            n !== t[3] && dd(n, t);
            const r = t[19];
            null !== r && r.detachView(e);
          }
          !(function Mv(e) {
            Hs.delete(e[20]);
          })(t);
        }
      }
      function hd(e, t, n) {
        return (function pd(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[0];
          if (2 & r.flags) {
            const o = e.data[r.directiveStart].encapsulation;
            if (o === dt.None || o === dt.Emulated) return null;
          }
          return Qe(r, n);
        })(e, t.parent, n);
      }
      function en(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function gd(e, t, n) {
        e.appendChild(t, n);
      }
      function md(e, t, n, r, o) {
        null !== r ? en(e, t, n, r, o) : gd(e, t, n);
      }
      function Lo(e, t) {
        return e.parentNode(t);
      }
      let vd = function Dd(e, t, n) {
        return 40 & e.type ? Qe(e, n) : null;
      };
      function ko(e, t, n, r) {
        const o = hd(e, r, t),
          i = t[O],
          a = (function yd(e, t, n) {
            return vd(e, t, n);
          })(r.parent || t[6], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) md(i, o, n[u], a, !1);
          else md(i, o, n, a, !1);
      }
      function Vo(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return Qe(t, e);
          if (4 & n) return Xs(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return Vo(e, r);
            {
              const o = e[t.index];
              return tt(o) ? Xs(-1, o) : ce(o);
            }
          }
          if (32 & n) return zs(t, e)() || ce(e[t.index]);
          {
            const r = _d(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Vo(br(e[16]), r)
              : Vo(e, t.next);
          }
        }
        return null;
      }
      function _d(e, t) {
        return null !== t ? e[16][6].projection[t.projection] : null;
      }
      function Xs(e, t) {
        const n = 10 + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[1].firstChild;
          if (null !== o) return Vo(r, o);
        }
        return t[7];
      }
      function ea(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type;
          if (
            (s && 0 === t && (a && we(ce(a), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & u) ea(e, t, n.child, r, o, i, !1), Nn(t, e, o, a, i);
            else if (32 & u) {
              const c = zs(n, r);
              let l;
              for (; (l = c()); ) Nn(t, e, o, l, i);
              Nn(t, e, o, a, i);
            } else 16 & u ? Ed(e, t, r, n, o, i) : Nn(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function Ir(e, t, n, r, o, i) {
        ea(n, r, e.firstChild, t, o, i, !1);
      }
      function Ed(e, t, n, r, o, i) {
        const s = n[16],
          u = s[6].projection[r.projection];
        if (Array.isArray(u))
          for (let c = 0; c < u.length; c++) Nn(t, e, o, u[c], i);
        else ea(e, t, u, s[3], o, i, !0);
      }
      function bd(e, t, n) {
        e.setAttribute(t, "style", n);
      }
      function ta(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function Id(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      const Md = "ng-template";
      function rw(e, t, n) {
        let r = 0;
        for (; r < e.length; ) {
          let o = e[r++];
          if (n && "class" === o) {
            if (((o = e[r]), -1 !== Id(o.toLowerCase(), t, 0))) return !0;
          } else if (1 === o) {
            for (; r < e.length && "string" == typeof (o = e[r++]); )
              if (o.toLowerCase() === t) return !0;
            return !1;
          }
        }
        return !1;
      }
      function Sd(e) {
        return 4 === e.type && e.value !== Md;
      }
      function ow(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Md);
      }
      function iw(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function uw(e) {
            for (let t = 0; t < e.length; t++) if (Kc(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ("number" != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== u && !ow(e, u, n)) || ("" === u && 1 === t.length))
                ) {
                  if (rt(r)) return !1;
                  s = !0;
                }
              } else {
                const c = 8 & r ? u : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!rw(e.attrs, c, n)) {
                    if (rt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = sw(8 & r ? "class" : u, o, Sd(e), n);
                if (-1 === d) {
                  if (rt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== c) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== Id(h, c, 0)) || (2 & r && c !== f)) {
                    if (rt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !rt(r) && !rt(u)) return !1;
            if (s && rt(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return rt(r) || s;
      }
      function rt(e) {
        return 0 == (1 & e);
      }
      function sw(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function cw(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function Td(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (iw(e, t[r], n)) return !0;
        return !1;
      }
      function Ad(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function dw(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !rt(s) && ((t += Ad(i, o)), (o = "")),
              (r = s),
              (i = i || !rt(r));
          n++;
        }
        return "" !== o && (t += Ad(i, o)), t;
      }
      const P = {};
      function Mr(e) {
        xd(B(), y(), Se() + e, !1);
      }
      function xd(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[2])) {
            const i = e.preOrderCheckHooks;
            null !== i && go(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && mo(t, i, 0, n);
          }
        kt(n);
      }
      function Od(e, t = null, n = null, r) {
        const o = Rd(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function Rd(e, t = null, n = null, r, o = new Set()) {
        const i = [n || G, QD(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : Z(e))),
          new Gl(i, t || Oo(), r || null, o)
        );
      }
      let tn = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return Od({ name: "" }, r, n, "");
            {
              const o = n.name ?? "";
              return Od({ name: o }, n.parent, n.providers, o);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = gr),
          (e.NULL = new jl()),
          (e.ɵprov = X({ token: e, providedIn: "any", factory: () => q(kl) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function R(e, t = T.Default) {
        const n = y();
        return null === n ? q(e, t) : ol(he(), n, S(e), t);
      }
      function Jd(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const o = n[r],
              i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              os(o), s.contentQueries(2, t[i], i);
            }
          }
      }
      function Uo(e, t, n, r, o, i, s, a, u, c, l) {
        const d = t.blueprint.slice();
        return (
          (d[0] = o),
          (d[2] = 76 | r),
          (null !== l || (e && 1024 & e[2])) && (d[2] |= 1024),
          Lc(d),
          (d[3] = d[15] = e),
          (d[8] = n),
          (d[10] = s || (e && e[10])),
          (d[O] = a || (e && e[O])),
          (d[12] = u || (e && e[12]) || null),
          (d[9] = c || (e && e[9]) || null),
          (d[6] = i),
          (d[20] = (function bv() {
            return Ev++;
          })()),
          (d[21] = l),
          (d[16] = 2 == t.type ? e[16] : d),
          d
        );
      }
      function On(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function ma(e, t, n, r, o) {
            const i = jc(),
              s = es(),
              u = (e.data[t] = (function Qw(e, t, n, r, o, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0
                };
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && (i.next = u)),
              u
            );
          })(e, t, n, r, o)),
            (function Ey() {
              return A.lFrame.inI18n;
            })() && (i.flags |= 64);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function ar() {
            const e = A.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return ft(i, !0), i;
      }
      function Rn(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function ya(e, t, n) {
        is(t);
        try {
          const r = e.viewQuery;
          null !== r && Ia(1, r, n);
          const o = e.template;
          null !== o && Xd(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Jd(e, t),
            e.staticViewQueries && Ia(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function zw(e, t) {
              for (let n = 0; n < t.length; n++) l_(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (e.firstCreatePass &&
            ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
          r);
        } finally {
          (t[2] &= -5), ss();
        }
      }
      function Go(e, t, n, r) {
        const o = t[2];
        if (128 != (128 & o)) {
          is(t);
          try {
            Lc(t),
              (function Hc(e) {
                return (A.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && Xd(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const c = e.preOrderCheckHooks;
              null !== c && go(t, c, null);
            } else {
              const c = e.preOrderHooks;
              null !== c && mo(t, c, 0, null), as(t, 0);
            }
            if (
              ((function u_(e) {
                for (let t = qs(e); null !== t; t = Ws(t)) {
                  if (!t[2]) continue;
                  const n = t[9];
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r],
                      i = o[3];
                    0 == (512 & o[2]) && Xi(i, 1), (o[2] |= 512);
                  }
                }
              })(t),
              (function a_(e) {
                for (let t = qs(e); null !== t; t = Ws(t))
                  for (let n = 10; n < t.length; n++) {
                    const r = t[n],
                      o = r[1];
                    ho(r) && Go(o, r, o.template, r[8]);
                  }
              })(t),
              null !== e.contentQueries && Jd(e, t),
              s)
            ) {
              const c = e.contentCheckHooks;
              null !== c && go(t, c);
            } else {
              const c = e.contentHooks;
              null !== c && mo(t, c, 1), as(t, 1);
            }
            !(function Uw(e, t) {
              const n = e.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    if (o < 0) kt(~o);
                    else {
                      const i = o,
                        s = n[++r],
                        a = n[++r];
                      by(s, i), a(2, t[i]);
                    }
                  }
                } finally {
                  kt(-1);
                }
            })(e, t);
            const a = e.components;
            null !== a &&
              (function Gw(e, t) {
                for (let n = 0; n < t.length; n++) c_(e, t[n]);
              })(t, a);
            const u = e.viewQuery;
            if ((null !== u && Ia(2, u, r), s)) {
              const c = e.viewCheckHooks;
              null !== c && go(t, c);
            } else {
              const c = e.viewHooks;
              null !== c && mo(t, c, 2), as(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[2] &= -41),
              512 & t[2] && ((t[2] &= -513), Xi(t[3], -1));
          } finally {
            ss();
          }
        }
      }
      function Xd(e, t, n, r, o) {
        const i = Se(),
          s = 2 & r;
        try {
          kt(-1), s && t.length > Y && xd(e, t, Y, !1), n(r, o);
        } finally {
          kt(i);
        }
      }
      function Da(e, t, n) {
        !Vc() ||
          ((function Xw(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            e.firstCreatePass || lr(n, t), we(r, t);
            const s = n.initialInputs;
            for (let a = o; a < i; a++) {
              const u = e.data[a],
                c = nt(u);
              c && o_(t, n, u);
              const l = dr(t, e, a, n);
              we(l, t),
                null !== s && i_(0, a - o, l, u, 0, s),
                c && (Be(n.index, t)[8] = l);
            }
          })(e, t, n, Qe(n, t)),
          128 == (128 & n.flags) &&
            (function e_(e, t, n) {
              const r = n.directiveStart,
                o = n.directiveEnd,
                i = n.index,
                s = (function Iy() {
                  return A.lFrame.currentDirectiveIndex;
                })();
              try {
                kt(i);
                for (let a = r; a < o; a++) {
                  const u = e.data[a],
                    c = t[a];
                  ns(a),
                    (null !== u.hostBindings ||
                      0 !== u.hostVars ||
                      null !== u.hostAttrs) &&
                      uf(u, c);
                }
              } finally {
                kt(-1), ns(s);
              }
            })(e, t, n));
      }
      function va(e, t, n = Qe) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function tf(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = wa(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function wa(e, t, n, r, o, i, s, a, u, c) {
        const l = Y + r,
          d = l + o,
          f = (function qw(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : P);
            return n;
          })(l, d),
          h = "function" == typeof c ? c() : c;
        return (f[1] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: f.slice().fill(null, l),
          bindingStartIndex: l,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: h,
          incompleteFirstPass: !1
        });
      }
      function rf(e, t, n) {
        for (let r in e)
          if (e.hasOwnProperty(r)) {
            const o = e[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(t, o)
              : (n[r] = [t, o]);
          }
        return n;
      }
      function of(e, t) {
        const r = t.directiveEnd,
          o = e.data,
          i = t.attrs,
          s = [];
        let a = null,
          u = null;
        for (let c = t.directiveStart; c < r; c++) {
          const l = o[c],
            d = l.inputs,
            f = null === i || Sd(t) ? null : s_(d, i);
          s.push(f), (a = rf(d, c, a)), (u = rf(l.outputs, c, u));
        }
        null !== a &&
          (a.hasOwnProperty("class") && (t.flags |= 16),
          a.hasOwnProperty("style") && (t.flags |= 32)),
          (t.initialInputs = s),
          (t.inputs = a),
          (t.outputs = u);
      }
      function sf(e, t) {
        const n = Be(t, e);
        16 & n[2] || (n[2] |= 32);
      }
      function _a(e, t, n, r) {
        let o = !1;
        if (Vc()) {
          const i = (function t_(e, t, n) {
              const r = e.directiveRegistry;
              let o = null;
              if (r)
                for (let i = 0; i < r.length; i++) {
                  const s = r[i];
                  Td(n, s.selectors, !1) &&
                    (o || (o = []),
                    _o(lr(n, t), e, s.type),
                    nt(s) ? (cf(e, n), o.unshift(s)) : o.push(s));
                }
              return o;
            })(e, t, n),
            s = null === r ? null : { "": -1 };
          if (null !== i) {
            (o = !0), lf(n, e.data.length, i.length);
            for (let l = 0; l < i.length; l++) {
              const d = i[l];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              u = !1,
              c = Rn(e, t, i.length, null);
            for (let l = 0; l < i.length; l++) {
              const d = i[l];
              (n.mergedAttrs = Do(n.mergedAttrs, d.hostAttrs)),
                df(e, n, t, c, d),
                r_(c, d, s),
                null !== d.contentQueries && (n.flags |= 8),
                (null !== d.hostBindings ||
                  null !== d.hostAttrs ||
                  0 !== d.hostVars) &&
                  (n.flags |= 128);
              const f = d.type.prototype;
              !a &&
                (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) &&
                ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index),
                (a = !0)),
                !u &&
                  (f.ngOnChanges || f.ngDoCheck) &&
                  ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(
                    n.index
                  ),
                  (u = !0)),
                c++;
            }
            of(e, n);
          }
          s &&
            (function n_(e, t, n) {
              if (t) {
                const r = (e.localNames = []);
                for (let o = 0; o < t.length; o += 2) {
                  const i = n[t[o + 1]];
                  if (null == i) throw new I(-301, !1);
                  r.push(t[o], i);
                }
              }
            })(n, r, s);
        }
        return (n.mergedAttrs = Do(n.mergedAttrs, n.attrs)), o;
      }
      function af(e, t, n, r, o, i) {
        const s = i.hostBindings;
        if (s) {
          let a = e.hostBindingOpCodes;
          null === a && (a = e.hostBindingOpCodes = []);
          const u = ~t.index;
          (function Jw(e) {
            let t = e.length;
            for (; t > 0; ) {
              const n = e[--t];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(a) != u && a.push(u),
            a.push(r, o, s);
        }
      }
      function uf(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function cf(e, t) {
        (t.flags |= 2), (e.components || (e.components = [])).push(t.index);
      }
      function r_(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          nt(t) && (n[""] = e);
        }
      }
      function lf(e, t, n) {
        (e.flags |= 1),
          (e.directiveStart = t),
          (e.directiveEnd = t + n),
          (e.providerIndexes = t);
      }
      function df(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = Jt(o.type)),
          s = new ur(i, nt(o), R);
        (e.blueprint[r] = s),
          (n[r] = s),
          af(e, t, 0, r, Rn(e, n, o.hostVars, P), o);
      }
      function o_(e, t, n) {
        const r = Qe(t, e),
          o = tf(n),
          i = e[10],
          s = zo(
            e,
            Uo(
              e,
              o,
              null,
              n.onPush ? 32 : 16,
              r,
              t,
              i,
              i.createRenderer(r, n),
              null,
              null,
              null
            )
          );
        e[t.index] = s;
      }
      function i_(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s) {
          const a = r.setInput;
          for (let u = 0; u < s.length; ) {
            const c = s[u++],
              l = s[u++],
              d = s[u++];
            null !== a ? r.setInput(n, d, c, l) : (n[l] = d);
          }
        }
      }
      function s_(e, t) {
        let n = null,
          r = 0;
        for (; r < t.length; ) {
          const o = t[r];
          if (0 !== o)
            if (5 !== o) {
              if ("number" == typeof o) break;
              e.hasOwnProperty(o) &&
                (null === n && (n = []), n.push(o, e[o], t[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function ff(e, t, n, r) {
        return new Array(e, !0, !1, t, null, 0, r, n, null, null);
      }
      function c_(e, t) {
        const n = Be(t, e);
        if (ho(n)) {
          const r = n[1];
          48 & n[2] ? Go(r, n, r.template, n[8]) : n[5] > 0 && Ea(n);
        }
      }
      function Ea(e) {
        for (let r = qs(e); null !== r; r = Ws(r))
          for (let o = 10; o < r.length; o++) {
            const i = r[o];
            if (ho(i))
              if (512 & i[2]) {
                const s = i[1];
                Go(s, i, s.template, i[8]);
              } else i[5] > 0 && Ea(i);
          }
        const n = e[1].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = Be(n[r], e);
            ho(o) && o[5] > 0 && Ea(o);
          }
      }
      function l_(e, t) {
        const n = Be(t, e),
          r = n[1];
        (function d_(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          ya(r, n, n[8]);
      }
      function zo(e, t) {
        return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t;
      }
      function qo(e, t, n, r = !0) {
        const o = t[10];
        o.begin && o.begin();
        try {
          Go(e, t, e.template, n);
        } catch (s) {
          throw (r &&
            (function mf(e, t) {
              const n = e[9],
                r = n ? n.get(xn, null) : null;
              r && r.handleError(t);
            })(t, s),
          s);
        } finally {
          o.end && o.end();
        }
      }
      function Ia(e, t, n) {
        os(0), t(e, n);
      }
      function Ma(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++],
            u = t[s],
            c = e.data[s];
          null !== c.setInput ? c.setInput(u, o, r, a) : (u[a] = o);
        }
      }
      function St(e, t, n) {
        const r = (function fo(e, t) {
          return ce(t[e]);
        })(t, e);
        !(function ld(e, t, n) {
          e.setValue(t, n);
        })(e[O], r, n);
      }
      function Wo(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = Vi(o, a))
              : 2 == i && (r = Vi(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function Qo(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(ce(i)), tt(i)))
            for (let a = 10; a < i.length; a++) {
              const u = i[a],
                c = u[1].firstChild;
              null !== c && Qo(u[1], u, c, r);
            }
          const s = n.type;
          if (8 & s) Qo(e, t, n.child, r);
          else if (32 & s) {
            const a = zs(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = _d(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = br(t[16]);
              Qo(u[1], u, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      class Sr {
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            n = t[1];
          return Qo(n, t, n.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(t) {
          this._lView[8] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (tt(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (Ks(t, r), Eo(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          fd(this._lView[1], this._lView);
        }
        onDestroy(t) {
          !(function nf(e, t, n, r) {
            const o = (function hf(e) {
              return e[7] || (e[7] = []);
            })(t);
            null === n
              ? o.push(r)
              : (o.push(n),
                e.firstCreatePass &&
                  (function pf(e) {
                    return e.cleanup || (e.cleanup = []);
                  })(e).push(r, o.length - 1));
          })(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          !(function ba(e) {
            for (; e; ) {
              e[2] |= 32;
              const t = br(e);
              if (ty(e) && !t) return e;
              e = t;
            }
            return null;
          })(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -65;
        }
        reattach() {
          this._lView[2] |= 64;
        }
        detectChanges() {
          qo(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new I(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function qv(e, t) {
              Ir(e, t, t[O], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new I(902, !1);
          this._appRef = t;
        }
      }
      class f_ extends Sr {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          qo(t[1], t, t[8], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class Sa extends Ro {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = W(t);
          return new Tr(n, this.ngModule);
        }
      }
      function yf(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class p_ {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          const o = this.injector.get(t, Rs, r);
          return o !== Rs || n === Rs ? o : this.parentInjector.get(t, n, r);
        }
      }
      class Tr extends ql {
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function fw(e) {
              return e.map(dw).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        get inputs() {
          return yf(this.componentDef.inputs);
        }
        get outputs() {
          return yf(this.componentDef.outputs);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof Mn ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new p_(t, i) : t,
            a = s.get(Ql, null);
          if (null === a) throw new I(407, !1);
          const u = s.get(lv, null),
            c = a.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || "div",
            d = r
              ? (function Ww(e, t, n) {
                  return e.selectRootElement(t, n === dt.ShadowDom);
                })(c, r, this.componentDef.encapsulation)
              : Zs(
                  a.createRenderer(null, this.componentDef),
                  l,
                  (function h_(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(l)
                ),
            f = this.componentDef.onPush ? 288 : 272,
            h = wa(0, null, null, 1, 0, null, null, null, null, null),
            p = Uo(null, h, null, f, null, null, a, c, u, s, null);
          let g, D;
          is(p);
          try {
            const v = (function y_(e, t, n, r, o, i) {
              const s = n[1];
              n[22] = e;
              const u = On(s, 22, 2, "#host", null),
                c = (u.mergedAttrs = t.hostAttrs);
              null !== c &&
                (Wo(u, c, !0),
                null !== e &&
                  (yo(o, e, c),
                  null !== u.classes && ta(o, e, u.classes),
                  null !== u.styles && bd(o, e, u.styles)));
              const l = r.createRenderer(e, t),
                d = Uo(
                  n,
                  tf(t),
                  null,
                  t.onPush ? 32 : 16,
                  n[22],
                  u,
                  r,
                  l,
                  i || null,
                  null,
                  null
                );
              return (
                s.firstCreatePass &&
                  (_o(lr(u, n), s, t.type), cf(s, u), lf(u, n.length, 1)),
                zo(n, d),
                (n[22] = d)
              );
            })(d, this.componentDef, p, a, c);
            if (d)
              if (r) yo(c, d, ["ng-version", dv.full]);
              else {
                const { attrs: C, classes: m } = (function hw(e) {
                  const t = [],
                    n = [];
                  let r = 1,
                    o = 2;
                  for (; r < e.length; ) {
                    let i = e[r];
                    if ("string" == typeof i)
                      2 === o
                        ? "" !== i && t.push(i, e[++r])
                        : 8 === o && n.push(i);
                    else {
                      if (!rt(o)) break;
                      o = i;
                    }
                    r++;
                  }
                  return { attrs: t, classes: n };
                })(this.componentDef.selectors[0]);
                C && yo(c, d, C), m && m.length > 0 && ta(c, d, m.join(" "));
              }
            if (((D = Ji(h, Y)), void 0 !== n)) {
              const C = (D.projection = []);
              for (let m = 0; m < this.ngContentSelectors.length; m++) {
                const E = n[m];
                C.push(null != E ? Array.from(E) : null);
              }
            }
            (g = (function D_(e, t, n, r) {
              const o = n[1],
                i = (function Yw(e, t, n) {
                  const r = he();
                  e.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    df(e, r, t, Rn(e, t, 1, null), n),
                    of(e, r));
                  const o = dr(t, e, r.directiveStart, r);
                  we(o, t);
                  const i = Qe(r, t);
                  return i && we(i, t), o;
                })(o, n, t);
              if (((e[8] = n[8] = i), null !== r)) for (const a of r) a(i, t);
              if (t.contentQueries) {
                const a = he();
                t.contentQueries(1, i, a.directiveStart);
              }
              const s = he();
              return (
                !o.firstCreatePass ||
                  (null === t.hostBindings && null === t.hostAttrs) ||
                  (kt(s.index),
                  af(n[1], s, 0, s.directiveStart, s.directiveEnd, t),
                  uf(t, i)),
                i
              );
            })(v, this.componentDef, p, [v_])),
              ya(h, p, null);
          } finally {
            ss();
          }
          return new m_(this.componentType, g, Tn(D, p), p, D);
        }
      }
      class m_ extends class ov {} {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new f_(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            const i = this._rootLView;
            Ma(i[1], i, o, t, n), sf(i, this._tNode.index);
          }
        }
        get injector() {
          return new yn(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function v_() {
        const e = he();
        po(y()[1], e);
      }
      let Zo = null;
      function nn() {
        if (!Zo) {
          const e = K.Symbol;
          if (e && e.iterator) Zo = e.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let n = 0; n < t.length; ++n) {
              const r = t[n];
              "entries" !== r &&
                "size" !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (Zo = r);
            }
          }
        }
        return Zo;
      }
      function Ar(e) {
        return (
          !!(function Aa(e) {
            return (
              null !== e && ("function" == typeof e || "object" == typeof e)
            );
          })(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && nn() in e))
        );
      }
      function _e(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function xa(e, t, n, r, o, i, s, a) {
        const u = y(),
          c = B(),
          l = e + Y,
          d = c.firstCreatePass
            ? (function P_(e, t, n, r, o, i, s, a, u) {
                const c = t.consts,
                  l = On(t, e, 4, s || null, Lt(c, a));
                _a(t, n, l, Lt(c, u)), po(t, l);
                const d = (l.tViews = wa(
                  2,
                  l,
                  r,
                  o,
                  i,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  c
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, l),
                    (d.queries = t.queries.embeddedTView(l))),
                  l
                );
              })(l, c, u, t, n, r, o, i, s)
            : c.data[l];
        ft(d, !1);
        const f = u[O].createComment("");
        ko(c, u, f, d),
          we(f, u),
          zo(u, (u[l] = ff(f, u, f, d))),
          co(d) && Da(c, u, d),
          null != s && va(u, d, a);
      }
      function Yo(e, t, n) {
        const r = y();
        return (
          _e(r, pn(), t) &&
            (function Ue(e, t, n, r, o, i, s, a) {
              const u = Qe(t, n);
              let l,
                c = t.inputs;
              !a && null != c && (l = c[r])
                ? (Ma(e, n, l, r, o), uo(t) && sf(n, t.index))
                : 3 & t.type &&
                  ((r = (function Zw(e) {
                    return "class" === e
                      ? "className"
                      : "for" === e
                      ? "htmlFor"
                      : "formaction" === e
                      ? "formAction"
                      : "innerHtml" === e
                      ? "innerHTML"
                      : "readonly" === e
                      ? "readOnly"
                      : "tabindex" === e
                      ? "tabIndex"
                      : e;
                  })(r)),
                  (o = null != s ? s(o, t.value || "", r) : o),
                  i.setProperty(u, r, o));
            })(
              B(),
              (function ie() {
                const e = A.lFrame;
                return Ji(e.tView, e.selectedIndex);
              })(),
              r,
              e,
              t,
              r[O],
              n,
              !1
            ),
          Yo
        );
      }
      function Pa(e, t, n, r, o) {
        const s = o ? "class" : "style";
        Ma(e, n, t.inputs[s], s, r);
      }
      function L(e, t, n, r) {
        const o = y(),
          i = B(),
          s = Y + e,
          a = o[O],
          u = (o[s] = Zs(
            a,
            t,
            (function Fy() {
              return A.lFrame.currentNamespace;
            })()
          )),
          c = i.firstCreatePass
            ? (function O_(e, t, n, r, o, i, s) {
                const a = t.consts,
                  c = On(t, e, 2, o, Lt(a, i));
                return (
                  _a(t, n, c, Lt(a, s)),
                  null !== c.attrs && Wo(c, c.attrs, !1),
                  null !== c.mergedAttrs && Wo(c, c.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, c),
                  c
                );
              })(s, i, o, 0, t, n, r)
            : i.data[s];
        ft(c, !0);
        const l = c.mergedAttrs;
        null !== l && yo(a, u, l);
        const d = c.classes;
        null !== d && ta(a, u, d);
        const f = c.styles;
        return (
          null !== f && bd(a, u, f),
          64 != (64 & c.flags) && ko(i, o, u, c),
          0 ===
            (function gy() {
              return A.lFrame.elementDepthCount;
            })() && we(u, o),
          (function my() {
            A.lFrame.elementDepthCount++;
          })(),
          co(c) &&
            (Da(i, o, c),
            (function ef(e, t, n) {
              if (Wi(t)) {
                const o = t.directiveEnd;
                for (let i = t.directiveStart; i < o; i++) {
                  const s = e.data[i];
                  s.contentQueries && s.contentQueries(1, n[i], i);
                }
              }
            })(i, c, o)),
          null !== r && va(o, c),
          L
        );
      }
      function k() {
        let e = he();
        es()
          ? (function ts() {
              A.lFrame.isParent = !1;
            })()
          : ((e = e.parent), ft(e, !1));
        const t = e;
        !(function yy() {
          A.lFrame.elementDepthCount--;
        })();
        const n = B();
        return (
          n.firstCreatePass && (po(n, e), Wi(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function Vy(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            Pa(n, t, y(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function jy(e) {
              return 0 != (32 & e.flags);
            })(t) &&
            Pa(n, t, y(), t.stylesWithoutHost, !1),
          k
        );
      }
      function se(e, t, n, r) {
        return L(e, t, n, r), k(), se;
      }
      function Oa(e) {
        return !!e && "function" == typeof e.then;
      }
      const k_ = function Pf(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function $(e, t = "") {
        const n = y(),
          r = B(),
          o = e + Y,
          i = r.firstCreatePass ? On(r, o, 1, t, null) : r.data[o],
          s = (n[o] = (function Qs(e, t) {
            return e.createText(t);
          })(n[O], t));
        ko(r, n, s, i), ft(i, !1);
      }
      function ka(e) {
        return Xo("", e, ""), ka;
      }
      function Xo(e, t, n) {
        const r = y(),
          o = (function kn(e, t, n, r) {
            return _e(e, pn(), n) ? t + x(n) + r : P;
          })(r, e, t, n);
        return o !== P && St(r, Se(), o), Xo;
      }
      const Wn = "en-US";
      let Th = Wn;
      class Qn {}
      class ep extends Qn {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Sa(this));
          const r = (function Ve(e, t) {
            const n = e[Sc] || null;
            if (!n && !0 === t)
              throw new Error(
                `Type ${Z(e)} does not have '\u0275mod' property.`
              );
            return n;
          })(t);
          (this._bootstrapComponents = (function It(e) {
            return e instanceof Function ? e() : e;
          })(r.bootstrap)),
            (this._r3Injector = Rd(
              t,
              n,
              [
                { provide: Qn, useValue: this },
                { provide: Ro, useValue: this.componentFactoryResolver }
              ],
              Z(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach(n => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class Ga extends class ME {} {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new ep(this.moduleType, t);
        }
      }
      function qa(e) {
        return t => {
          setTimeout(e, void 0, t);
        };
      }
      const Tt = class nb extends Fi {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const u = t;
            (o = u.next?.bind(u)),
              (i = u.error?.bind(u)),
              (s = u.complete?.bind(u));
          }
          this.__isAsync && ((i = qa(i)), o && (o = qa(o)), s && (s = qa(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof lt && t.add(a), a;
        }
      };
      let At = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = sb), e;
      })();
      const ob = At,
        ib = class extends ob {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t, n) {
            const r = this._declarationTContainer.tViews,
              o = Uo(
                this._declarationLView,
                r,
                t,
                16,
                null,
                r.declTNode,
                null,
                null,
                null,
                null,
                n || null
              );
            o[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return (
              null !== s && (o[19] = s.createEmbeddedView(r)),
              ya(r, o, t),
              new Sr(o)
            );
          }
        };
      function sb() {
        return (function oi(e, t) {
          return 4 & e.type ? new ib(t, e, Tn(e, t)) : null;
        })(he(), y());
      }
      let Dt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = ab), e;
      })();
      function ab() {
        return (function gp(e, t) {
          let n;
          const r = t[e.index];
          if (tt(r)) n = r;
          else {
            let o;
            if (8 & e.type) o = ce(r);
            else {
              const i = t[O];
              o = i.createComment("");
              const s = Qe(e, t);
              en(
                i,
                Lo(i, s),
                o,
                (function Xv(e, t) {
                  return e.nextSibling(t);
                })(i, s),
                !1
              );
            }
            (t[e.index] = n = ff(r, t, o, e)), zo(t, n);
          }
          return new hp(n, e, t);
        })(he(), y());
      }
      const ub = Dt,
        hp = class extends ub {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Tn(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new yn(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = wo(this._hostTNode, this._hostLView);
            if (Xc(t)) {
              const n = mn(t, this._hostLView),
                r = gn(t);
              return new yn(n[1].data[r + 8], n);
            }
            return new yn(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = pp(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const s = t.createEmbeddedView(n || {}, i);
            return this.insert(s, o), s;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function hr(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (o = d.projectableNodes),
                (i = d.environmentInjector || d.ngModuleRef);
            }
            const u = s ? t : new Tr(W(t)),
              c = r || this.parentInjector;
            if (!i && null == u.ngModule) {
              const f = (s ? c : this.parentInjector).get(Mn, null);
              f && (i = f);
            }
            const l = u.create(c, o, void 0, i);
            return this.insert(l.hostView, a), l;
          }
          insert(t, n) {
            const r = t._lView,
              o = r[1];
            if (
              (function py(e) {
                return tt(e[3]);
              })(r)
            ) {
              const l = this.indexOf(t);
              if (-1 !== l) this.detach(l);
              else {
                const d = r[3],
                  f = new hp(d, d[6], d[3]);
                f.detach(f.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer;
            !(function Qv(e, t, n, r) {
              const o = 10 + r,
                i = n.length;
              r > 0 && (n[o - 1][4] = t),
                r < i - 10
                  ? ((t[4] = n[o]), ll(n, 10 + r, t))
                  : (n.push(t), (t[4] = null)),
                (t[3] = n);
              const s = t[17];
              null !== s &&
                n !== s &&
                (function Zv(e, t) {
                  const n = e[9];
                  t[16] !== t[3][3][16] && (e[2] = !0),
                    null === n ? (e[9] = [t]) : n.push(t);
                })(s, t);
              const a = t[19];
              null !== a && a.insertView(e), (t[2] |= 64);
            })(o, r, s, i);
            const a = Xs(i, s),
              u = r[O],
              c = Lo(u, s[7]);
            return (
              null !== c &&
                (function zv(e, t, n, r, o, i) {
                  (r[0] = o), (r[6] = t), Ir(e, r, n, 1, o, i);
                })(o, s[6], u, r, c, a),
              t.attachToViewContainerRef(),
              ll(Qa(s), i, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = pp(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = Ks(this._lContainer, n);
            r && (Eo(Qa(this._lContainer), n), fd(r[1], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = Ks(this._lContainer, n);
            return r && null != Eo(Qa(this._lContainer), n) ? new Sr(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function pp(e) {
        return e[8];
      }
      function Qa(e) {
        return e[8] || (e[8] = []);
      }
      function si(...e) {}
      const jp = new V("Application Initializer");
      let ai = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = si),
              (this.reject = si),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (Oa(i)) n.push(i);
                else if (k_(i)) {
                  const s = new Promise((a, u) => {
                    i.subscribe({ complete: a, error: u });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch(o => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function(n) {
            return new (n || e)(q(jp, 8));
          }),
          (e.ɵprov = X({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Br = new V("AppId", {
        providedIn: "root",
        factory: function Bp() {
          return `${ou()}${ou()}${ou()}`;
        }
      });
      function ou() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Hp = new V("Platform Initializer"),
        $p = new V("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown"
        }),
        Hb = new V("appBootstrapListener"),
        xt = new V("LocaleId", {
          providedIn: "root",
          factory: () =>
            (function cD(e, t = T.Default) {
              return (
                "number" != typeof t &&
                  (t =
                    0 |
                    (t.optional && 8) |
                    (t.host && 1) |
                    (t.self && 2) |
                    (t.skipSelf && 4)),
                q(e, t)
              );
            })(xt, T.Optional | T.SkipSelf) ||
            (function $b() {
              return (typeof $localize < "u" && $localize.locale) || Wn;
            })()
        }),
        Wb = (() => Promise.resolve(0))();
      function iu(e) {
        typeof Zone > "u"
          ? Wb.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class Ce {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Tt(!1)),
            (this.onMicrotaskEmpty = new Tt(!1)),
            (this.onStable = new Tt(!1)),
            (this.onError = new Tt(!1)),
            typeof Zone > "u")
          )
            throw new I(908, !1);
          Zone.assertZonePatched();
          const o = this;
          if (
            ((o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.AsyncStackTaggingZoneSpec)
          ) {
            const i = Zone.AsyncStackTaggingZoneSpec;
            o._inner = o._inner.fork(new i("Angular"));
          }
          Zone.TaskTrackingZoneSpec &&
            (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function Qb() {
              let e = K.requestAnimationFrame,
                t = K.cancelAnimationFrame;
              if (typeof Zone < "u" && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t
              };
            })().nativeRequestAnimationFrame),
            (function Yb(e) {
              const t = () => {
                !(function Kb(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(
                      K,
                      () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                au(e),
                                (e.isCheckStableRunning = !0),
                                su(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      }
                    )),
                    au(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return zp(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      qp(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, u) => {
                  try {
                    return zp(e), n.invoke(o, i, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), qp(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          au(e),
                          su(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                )
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!Ce.isInAngularZone()) throw new I(909, !1);
        }
        static assertNotInAngularZone() {
          if (Ce.isInAngularZone()) throw new I(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, Zb, si, si);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const Zb = {};
      function su(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function au(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function zp(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function qp(e) {
        e._nesting--, su(e);
      }
      class Jb {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Tt()),
            (this.onMicrotaskEmpty = new Tt()),
            (this.onStable = new Tt()),
            (this.onError = new Tt());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const Wp = new V(""),
        ui = new V("");
      let lu,
        uu = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                lu ||
                  ((function Xb(e) {
                    lu = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                }
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Ce.assertNotInAngularZone(),
                        iu(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    }
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                iu(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  r =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map(n => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    s => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function(n) {
              return new (n || e)(q(Ce), q(cu), q(ui));
            }),
            (e.ɵprov = X({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        cu = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return lu?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function(n) {
              return new (n || e)();
            }),
            (e.ɵprov = X({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform"
            })),
            e
          );
        })(),
        $t = null;
      const Qp = new V("AllowMultipleToken"),
        du = new V("PlatformDestroyListeners");
      function Kp(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new V(r);
        return (i = []) => {
          let s = fu();
          if (!s || s.injector.get(Qp, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function n0(e) {
                  if ($t && !$t.get(Qp, !1)) throw new I(400, !1);
                  $t = e;
                  const t = e.get(Jp);
                  (function Zp(e) {
                    const t = e.get(Hp, null);
                    t && t.forEach(n => n());
                  })(e);
                })(
                  (function Yp(e = [], t) {
                    return tn.create({
                      name: t,
                      providers: [
                        { provide: xs, useValue: "platform" },
                        { provide: du, useValue: new Set([() => ($t = null)]) },
                        ...e
                      ]
                    });
                  })(a, r)
                );
          }
          return (function o0(e) {
            const t = fu();
            if (!t) throw new I(401, !1);
            return t;
          })();
        };
      }
      function fu() {
        return $t?.get(Jp) ?? null;
      }
      let Jp = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const o = (function eg(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new Jb()
                      : ("zone.js" === e ? void 0 : e) || new Ce(t)),
                  n
                );
              })(
                r?.ngZone,
                (function Xp(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!e || !e.ngZoneRunCoalescing) || !1
                  };
                })(r)
              ),
              i = [{ provide: Ce, useValue: o }];
            return o.run(() => {
              const s = tn.create({
                  providers: i,
                  parent: this.injector,
                  name: n.moduleType.name
                }),
                a = n.create(s),
                u = a.injector.get(xn, null);
              if (!u) throw new I(402, !1);
              return (
                o.runOutsideAngular(() => {
                  const c = o.onError.subscribe({
                    next: l => {
                      u.handleError(l);
                    }
                  });
                  a.onDestroy(() => {
                    ci(this._modules, a), c.unsubscribe();
                  });
                }),
                (function tg(e, t, n) {
                  try {
                    const r = n();
                    return Oa(r)
                      ? r.catch(o => {
                          throw (t.runOutsideAngular(() => e.handleError(o)),
                          o);
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(u, o, () => {
                  const c = a.injector.get(ai);
                  return (
                    c.runInitializers(),
                    c.donePromise.then(
                      () => (
                        (function Ah(e) {
                          ke(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (Th = e.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(xt, Wn) || Wn),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = ng({}, r);
            return (function e0(e, t, n) {
              const r = new Ga(n);
              return Promise.resolve(r);
            })(0, 0, n).then(i => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(hu);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach(o => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new I(403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new I(404, !1);
            this._modules.slice().forEach(r => r.destroy()),
              this._destroyListeners.forEach(r => r());
            const n = this._injector.get(du, null);
            n && (n.forEach(r => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function(n) {
            return new (n || e)(q(tn));
          }),
          (e.ɵprov = X({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function ng(e, t) {
        return Array.isArray(t) ? t.reduce(ng, e) : { ...e, ...t };
      }
      let hu = (() => {
        class e {
          constructor(n, r, o) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe(
                {
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  }
                }
              ));
            const i = new Pe(a => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new Pe(a => {
                let u;
                this._zone.runOutsideAngular(() => {
                  u = this._zone.onStable.subscribe(() => {
                    Ce.assertNotInAngularZone(),
                      iu(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const c = this._zone.onUnstable.subscribe(() => {
                  Ce.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  u.unsubscribe(), c.unsubscribe();
                };
              });
            this.isStable = km(
              i,
              s.pipe(
                (function Vm(e = {}) {
                  const {
                    connector: t = () => new Fi(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0
                  } = e;
                  return i => {
                    let s,
                      a,
                      u,
                      c = 0,
                      l = !1,
                      d = !1;
                    const f = () => {
                        a?.unsubscribe(), (a = void 0);
                      },
                      h = () => {
                        f(), (s = u = void 0), (l = d = !1);
                      },
                      p = () => {
                        const g = s;
                        h(), g?.unsubscribe();
                      };
                    return Xn((g, D) => {
                      c++, !d && !l && f();
                      const v = (u = u ?? t());
                      D.add(() => {
                        c--, 0 === c && !d && !l && (a = Li(p, o));
                      }),
                        v.subscribe(D),
                        !s &&
                          c > 0 &&
                          ((s = new Jn({
                            next: C => v.next(C),
                            error: C => {
                              (d = !0), f(), (a = Li(h, n, C)), v.error(C);
                            },
                            complete: () => {
                              (l = !0), f(), (a = Li(h, r)), v.complete();
                            }
                          })),
                          Wt(g).subscribe(s));
                    })(i);
                  };
                })()
              )
            );
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(n, r) {
            const o = n instanceof ql;
            if (!this._injector.get(ai).done)
              throw (!o &&
                (function nr(e) {
                  const t = W(e) || be(e) || Ie(e);
                  return null !== t && t.standalone;
                })(n),
              new I(405, false));
            let s;
            (s = o ? n : this._injector.get(Ro).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function t0(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Qn),
              c = s.create(tn.NULL, [], r || s.selector, a),
              l = c.location.nativeElement,
              d = c.injector.get(Wp, null);
            return (
              d?.registerApplication(l),
              c.onDestroy(() => {
                this.detachView(c.hostView),
                  ci(this.components, c),
                  d?.unregisterApplication(l);
              }),
              this._loadComponent(c),
              c
            );
          }
          tick() {
            if (this._runningTick) throw new I(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            ci(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView),
              this.tick(),
              this.components.push(n),
              this._injector
                .get(Hb, [])
                .concat(this._bootstrapListeners)
                .forEach(o => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach(n => n()),
                  this._views.slice().forEach(n => n.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => ci(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new I(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function(n) {
            return new (n || e)(q(Ce), q(Mn), q(xn));
          }),
          (e.ɵprov = X({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function ci(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let og = !0;
      class cg {
        constructor() {}
        supports(t) {
          return Ar(t);
        }
        create(t) {
          return new m0(t);
        }
      }
      const g0 = (e, t) => t;
      class m0 {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || g0);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < dg(r, o, i)) ? n : r,
              a = dg(s, o, i),
              u = s.currentIndex;
            if (s === r) o--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const c = a - o,
                l = u - o;
              if (c != l) {
                for (let f = 0; f < c; f++) {
                  const h = f < i.length ? i[f] : (i[f] = 0),
                    p = h + f;
                  l <= p && p < c && (i[f] = h + 1);
                }
                i[s.previousIndex] = l - c;
              }
            }
            a !== u && t(s, a, u);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !Ar(t))) throw new I(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let o,
            i,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (i = t[a]),
                (s = this._trackByFn(a, i)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, i, s, a)),
                    Object.is(n.item, i) || this._addIdentityChange(n, i))
                  : ((n = this._mismatch(n, i, s, a)), (r = !0)),
                (n = n._next);
          } else
            (o = 0),
              (function T_(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[nn()]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, a => {
                (s = this._trackByFn(o, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, o)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, o)), (r = !0)),
                  (n = n._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, o) {
          let i;
          return (
            null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, o))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new y0(n, r), i, o)),
            t
          );
        }
        _verifyReinsertion(t, n, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (t = this._reinsertAfter(i, t._prev, o))
              : t.currentIndex != o &&
                ((t.currentIndex = o), this._addToMoves(t, o)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const o = t._prevRemoved,
            i = t._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const o = null === n ? this._itHead : n._next;
          return (
            (t._next = o),
            (t._prev = n),
            null === o ? (this._itTail = t) : (o._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new lg()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new lg()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class y0 {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class D0 {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class lg {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new D0()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const o = this.map.get(t);
          return o ? o.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function dg(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + t + o;
      }
      function hg() {
        return new fi([new cg()]);
      }
      let fi = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: r => e.create(n, r || hg()),
              deps: [[e, new So(), new Mo()]]
            };
          }
          find(n) {
            const r = this.factories.find(o => o.supports(n));
            if (null != r) return r;
            throw new I(901, !1);
          }
        }
        return (e.ɵprov = X({ token: e, providedIn: "root", factory: hg })), e;
      })();
      const E0 = Kp(null, "core", []);
      let b0 = (() => {
          class e {
            constructor(n) {}
          }
          return (
            (e.ɵfac = function(n) {
              return new (n || e)(q(hu));
            }),
            (e.ɵmod = tr({ type: e })),
            (e.ɵinj = un({})),
            e
          );
        })(),
        hi = null;
      function $r() {
        return hi;
      }
      const Nt = new V("DocumentToken");
      class gI {
        constructor(t, n, r, o) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let Su = (() => {
        class e {
          constructor(n, r, o) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = o),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((o, i, s) => {
              if (null == o.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new gI(o.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === i ? void 0 : i);
              else if (null !== i) {
                const a = r.get(i);
                r.move(a, s), Mg(a, o);
              }
            });
            for (let o = 0, i = r.length; o < i; o++) {
              const a = r.get(o).context;
              (a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange(o => {
              Mg(r.get(o.currentIndex), o);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function(n) {
            return new (n || e)(R(Dt), R(At), R(fi));
          }),
          (e.ɵdir = ze({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate"
            },
            standalone: !0
          })),
          e
        );
      })();
      function Mg(e, t) {
        e.context.$implicit = t.item;
      }
      let zI = (() => {
        class e {}
        return (
          (e.ɵfac = function(n) {
            return new (n || e)();
          }),
          (e.ɵmod = tr({ type: e })),
          (e.ɵinj = un({})),
          e
        );
      })();
      class Ou extends class pM extends class S0 {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function M0(e) {
            hi || (hi = e);
          })(new Ou());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function gM() {
            return (
              (qr = qr || document.querySelector("base")),
              qr ? qr.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function mM(e) {
                (bi = bi || document.createElement("a")),
                  bi.setAttribute("href", e);
                const t = bi.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          qr = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function fI(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(";")) {
              const r = n.indexOf("="),
                [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
              if (o.trim() === t) return decodeURIComponent(i);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let bi,
        qr = null;
      const Rg = new V("TRANSITION_ID"),
        DM = [
          {
            provide: jp,
            useFactory: function yM(e, t, n) {
              return () => {
                n.get(ai).donePromise.then(() => {
                  const r = $r(),
                    o = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [Rg, Nt, tn],
            multi: !0
          }
        ];
      let wM = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function(n) {
            return new (n || e)();
          }),
          (e.ɵprov = X({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Ii = new V("EventManagerPlugins");
      let Mi = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach(o => (o.manager = this)),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          addGlobalEventListener(n, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const o = this._plugins;
            for (let i = 0; i < o.length; i++) {
              const s = o[i];
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function(n) {
            return new (n || e)(q(Ii), q(Ce));
          }),
          (e.ɵprov = X({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Lg {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const o = $r().getGlobalEventTarget(this._doc, t);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${n}`);
          return this.addEventListener(o, n, r);
        }
      }
      let kg = (() => {
          class e {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(n) {
              const r = new Set();
              n.forEach(o => {
                this._stylesSet.has(o) || (this._stylesSet.add(o), r.add(o));
              }),
                this.onStylesAdded(r);
            }
            onStylesAdded(n) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (e.ɵfac = function(n) {
              return new (n || e)();
            }),
            (e.ɵprov = X({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Wr = (() => {
          class e extends kg {
            constructor(n) {
              super(),
                (this._doc = n),
                (this._hostNodes = new Map()),
                this._hostNodes.set(n.head, []);
            }
            _addStylesToHost(n, r, o) {
              n.forEach(i => {
                const s = this._doc.createElement("style");
                (s.textContent = i), o.push(r.appendChild(s));
              });
            }
            addHost(n) {
              const r = [];
              this._addStylesToHost(this._stylesSet, n, r),
                this._hostNodes.set(n, r);
            }
            removeHost(n) {
              const r = this._hostNodes.get(n);
              r && r.forEach(Vg), this._hostNodes.delete(n);
            }
            onStylesAdded(n) {
              this._hostNodes.forEach((r, o) => {
                this._addStylesToHost(n, o, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach(n => n.forEach(Vg));
            }
          }
          return (
            (e.ɵfac = function(n) {
              return new (n || e)(q(Nt));
            }),
            (e.ɵprov = X({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      function Vg(e) {
        $r().remove(e);
      }
      const Ru = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/"
        },
        Lu = /%COMP%/g;
      function Si(e, t, n) {
        for (let r = 0; r < t.length; r++) {
          let o = t[r];
          Array.isArray(o) ? Si(e, o, n) : ((o = o.replace(Lu, e)), n.push(o));
        }
        return n;
      }
      function Hg(e) {
        return t => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let ku = (() => {
        class e {
          constructor(n, r, o) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Vu(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            switch (r.encapsulation) {
              case dt.Emulated: {
                let o = this.rendererByCompId.get(r.id);
                return (
                  o ||
                    ((o = new MM(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, o)),
                  o.applyToHost(n),
                  o
                );
              }
              case 1:
              case dt.ShadowDom:
                return new SM(this.eventManager, this.sharedStylesHost, n, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const o = Si(r.id, r.styles, []);
                  this.sharedStylesHost.addStyles(o),
                    this.rendererByCompId.set(r.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function(n) {
            return new (n || e)(q(Mi), q(Wr), q(Br));
          }),
          (e.ɵprov = X({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Vu {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(Ru[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          (Ug(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (Ug(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = Ru[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = Ru[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (Oe.DashCase | Oe.Important)
            ? t.style.setProperty(n, r, o & Oe.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & Oe.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, Hg(r))
            : this.eventManager.addEventListener(t, n, Hg(r));
        }
      }
      function Ug(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class MM extends Vu {
        constructor(t, n, r, o) {
          super(t), (this.component = r);
          const i = Si(o + "-" + r.id, r.styles, []);
          n.addStyles(i),
            (this.contentAttr = (function EM(e) {
              return "_ngcontent-%COMP%".replace(Lu, e);
            })(o + "-" + r.id)),
            (this.hostAttr = (function bM(e) {
              return "_nghost-%COMP%".replace(Lu, e);
            })(o + "-" + r.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      class SM extends Vu {
        constructor(t, n, r, o) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = Si(o.id, o.styles, []);
          for (let s = 0; s < i.length; s++) {
            const a = document.createElement("style");
            (a.textContent = i[s]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let TM = (() => {
        class e extends Lg {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
        }
        return (
          (e.ɵfac = function(n) {
            return new (n || e)(q(Nt));
          }),
          (e.ɵprov = X({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Gg = ["alt", "control", "meta", "shift"],
        AM = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS"
        },
        xM = {
          alt: e => e.altKey,
          control: e => e.ctrlKey,
          meta: e => e.metaKey,
          shift: e => e.shiftKey
        };
      let PM = (() => {
        class e extends Lg {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => $r().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              Gg.forEach(c => {
                const l = r.indexOf(c);
                l > -1 && (r.splice(l, 1), (s += c + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const u = {};
            return (u.domEventName = o), (u.fullKey = s), u;
          }
          static matchEventFullKeyCode(n, r) {
            let o = AM[n.key] || n.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                Gg.forEach(s => {
                  s !== o && (0, xM[s])(n) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(n, r, o) {
            return i => {
              e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function(n) {
            return new (n || e)(q(Nt));
          }),
          (e.ɵprov = X({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const RM = Kp(E0, "browser", [
          { provide: $p, useValue: "browser" },
          {
            provide: Hp,
            useValue: function NM() {
              Ou.makeCurrent();
            },
            multi: !0
          },
          {
            provide: Nt,
            useFactory: function OM() {
              return (
                (function CD(e) {
                  _s = e;
                })(document),
                document
              );
            },
            deps: []
          }
        ]),
        Wg = new V(""),
        Qg = [
          {
            provide: ui,
            useClass: class vM {
              addToWindow(t) {
                (K.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o);
                  if (null == i)
                    throw new Error("Could not find testability for element.");
                  return i;
                }),
                  (K.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (K.getAllAngularRootElements = () => t.getAllRootElements()),
                  K.frameworkStabilizers || (K.frameworkStabilizers = []),
                  K.frameworkStabilizers.push(r => {
                    const o = K.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function(u) {
                      (s = s || u), i--, 0 == i && r(s);
                    };
                    o.forEach(function(u) {
                      u.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? $r().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: []
          },
          { provide: Wp, useClass: uu, deps: [Ce, cu, ui] },
          { provide: uu, useClass: uu, deps: [Ce, cu, ui] }
        ],
        Zg = [
          { provide: xs, useValue: "root" },
          {
            provide: xn,
            useFactory: function FM() {
              return new xn();
            },
            deps: []
          },
          { provide: Ii, useClass: TM, multi: !0, deps: [Nt, Ce, $p] },
          { provide: Ii, useClass: PM, multi: !0, deps: [Nt] },
          { provide: ku, useClass: ku, deps: [Mi, Wr, Br] },
          { provide: Ql, useExisting: ku },
          { provide: kg, useExisting: Wr },
          { provide: Wr, useClass: Wr, deps: [Nt] },
          { provide: Mi, useClass: Mi, deps: [Ii, Ce] },
          { provide: class KI {}, useClass: wM, deps: [] },
          []
        ];
      let LM = (() => {
        class e {
          constructor(n) {}
          static withServerTransition(n) {
            return {
              ngModule: e,
              providers: [
                { provide: Br, useValue: n.appId },
                { provide: Rg, useExisting: Br },
                DM
              ]
            };
          }
        }
        return (
          (e.ɵfac = function(n) {
            return new (n || e)(q(Wg, 12));
          }),
          (e.ɵmod = tr({ type: e })),
          (e.ɵinj = un({ providers: [...Zg, ...Qg], imports: [zI, b0] })),
          e
        );
      })();
      typeof window < "u" && window;
      let qM = (() => {
          class e {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function(n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Xe({
              type: e,
              selectors: [["app-header"]],
              decls: 3,
              vars: 0,
              consts: [
                [1, "flex", "header-wrap"],
                ["src", "assets/Logo.svg", 1, "logo-img"],
                ["src", "assets/burger-menu.svg", 1, "burger-menu"]
              ],
              template: function(n, r) {
                1 & n && (L(0, "div", 0), se(1, "img", 1)(2, "img", 2), k());
              },
              styles: [
                ".header-wrap[_ngcontent-%COMP%]{padding:3vw 10vw 0 6vw;justify-content:space-between}.logo-img[_ngcontent-%COMP%]{width:37vw}.burger-menu[_ngcontent-%COMP%]{width:11%}"
              ]
            })),
            e
          );
        })(),
        WM = (() => {
          class e {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function(n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Xe({
              type: e,
              selectors: [["rounded-button"]],
              decls: 4,
              vars: 0,
              consts: [["src", "assets/icon1.png", 1, "icon1"]],
              template: function(n, r) {
                1 & n &&
                  (L(0, "button"),
                  se(1, "img", 0),
                  L(2, "span"),
                  $(3, "Add to your server"),
                  k()());
              },
              styles: [
                "button[_ngcontent-%COMP%]{background-color:#9948e6;color:#fff;width:85%;font-size:4.7vw;border:none;border-radius:25px;margin:auto;display:flex;align-items:center;justify-content:center;padding:3% 0;font-family:MontserratSemiBold}span[_ngcontent-%COMP%]{padding-left:7%}.icon1[_ngcontent-%COMP%]{width:12%}"
              ]
            })),
            e
          );
        })();
      function QM(e, t) {
        if (
          (1 & e &&
            (L(0, "div", 5)(1, "span"), $(2), k(), se(3, "img", 6), k()),
          2 & e)
        ) {
          const n = t.$implicit;
          Mr(2), ka(n);
        }
      }
      let ZM = (() => {
          class e {
            constructor() {
              this.questionsArray = [
                "What features does Good Knight provide?",
                "How much does Good Knight cost?",
                "My admins/mods are careful and would never get hacked!",
                "How does the Good Knight stop NFT scams?",
                "Wait, Good Knight is going to store a password? Is it secure?",
                "What happens if the Good Knight database is compromised?",
                "I have <insert your favorite bot> (AutoMod, Dyno, MEE6, Wick, Beemo, etc.), why do I need Good Knight?"
              ];
            }
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function(n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Xe({
              type: e,
              selectors: [["app-faq-section"]],
              decls: 6,
              vars: 1,
              consts: [
                [1, "faq-wrapper"],
                [1, "txt-center"],
                ["src", "assets/birdonrock.png", 1, "bird-img"],
                [1, "questions-wrapper"],
                [
                  "class",
                  "question-item flex space-between",
                  4,
                  "ngFor",
                  "ngForOf"
                ],
                [1, "question-item", "flex", "space-between"],
                ["src", "assets/plusbtn.svg", 1, "expand-btn"]
              ],
              template: function(n, r) {
                1 & n &&
                  (L(0, "div", 0)(1, "h1", 1),
                  $(2, "FAQ"),
                  k(),
                  se(3, "img", 2),
                  L(4, "div", 3),
                  xa(5, QM, 4, 1, "div", 4),
                  k()()),
                  2 & n && (Mr(5), Yo("ngForOf", r.questionsArray));
              },
              dependencies: [Su],
              styles: [
                "*[_ngcontent-%COMP%]{overflow-x:unset}h1[_ngcontent-%COMP%]{font-family:MontserratBold;font-size:8vw}.faq-wrapper[_ngcontent-%COMP%]{padding:13% 0}.faq-wrapper[_ngcontent-%COMP%]   .bird-img[_ngcontent-%COMP%]{width:19vw;margin-left:6%;margin-top:-9%}.faq-wrapper[_ngcontent-%COMP%]   .questions-wrapper[_ngcontent-%COMP%]{padding:0 6%}.faq-wrapper[_ngcontent-%COMP%]   .question-item[_ngcontent-%COMP%]{background-color:#3a2657;color:#f5adff;font-family:MontserratSemiBold;margin:0 0 6%;font-size:3.8vw;padding:5.4% 6%;border-radius:9px}.faq-wrapper[_ngcontent-%COMP%]   .question-item[_ngcontent-%COMP%]:nth-of-type(1)   span[_ngcontent-%COMP%]{margin-right:25%}.faq-wrapper[_ngcontent-%COMP%]   .question-item[_ngcontent-%COMP%]:nth-of-type(2)   span[_ngcontent-%COMP%]{margin-right:35%}.faq-wrapper[_ngcontent-%COMP%]   .question-item[_ngcontent-%COMP%]:nth-of-type(3)   span[_ngcontent-%COMP%], .faq-wrapper[_ngcontent-%COMP%]   .question-item[_ngcontent-%COMP%]:nth-of-type(4)   span[_ngcontent-%COMP%]{margin-right:10%}.faq-wrapper[_ngcontent-%COMP%]   .question-item[_ngcontent-%COMP%]:nth-of-type(5)   span[_ngcontent-%COMP%]{margin-right:12%}.faq-wrapper[_ngcontent-%COMP%]   .question-item[_ngcontent-%COMP%]:nth-of-type(7)   span[_ngcontent-%COMP%]{margin-right:5%}.faq-wrapper[_ngcontent-%COMP%]   .question-item[_ngcontent-%COMP%]:first-of-type{margin-top:-10%;position:relative}.faq-wrapper[_ngcontent-%COMP%]   .question-item[_ngcontent-%COMP%]   .expand-btn[_ngcontent-%COMP%]{width:11%}"
              ]
            })),
            e
          );
        })(),
        KM = (() => {
          class e {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function(n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Xe({
              type: e,
              selectors: [["square-button"]],
              decls: 4,
              vars: 0,
              consts: [["src", "assets/arrow-icon.svg", 1, "icon1"]],
              template: function(n, r) {
                1 & n &&
                  (L(0, "button")(1, "span"),
                  $(2, "Get Started"),
                  k(),
                  se(3, "img", 0),
                  k());
              },
              styles: [
                "button[_ngcontent-%COMP%]{color:#321a70;border-radius:5px;display:flex;justify-content:center;align-items:center;padding:5%;border:3px solid #321A70;width:100%;background-color:transparent;font-family:MontserratSemiBold}button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:4%}button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:4.7vw;padding-right:5%}"
              ]
            })),
            e
          );
        })(),
        YM = (() => {
          class e {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function(n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Xe({
              type: e,
              selectors: [["app-secure-for-free"]],
              decls: 7,
              vars: 0,
              consts: [
                [1, "white-wrapper", "txt-center"],
                ["src", "assets/unicorn-knight.svg", 1, "unicorn-knight"]
              ],
              template: function(n, r) {
                1 & n &&
                  (L(0, "div", 0)(1, "h1"),
                  $(2, "Secure your server for "),
                  L(3, "span"),
                  $(4, "free"),
                  k()(),
                  se(5, "square-button"),
                  k(),
                  se(6, "img", 1));
              },
              dependencies: [KM],
              styles: [
                ".white-wrapper[_ngcontent-%COMP%]{background-color:#fff;color:#321a70;margin:4% 7% 0;font-family:MontserratBold;border-radius:15px;padding:3% 9% 8%}.white-wrapper[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:8vw;margin-bottom:5%}.white-wrapper[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#efa500}.unicorn-knight[_ngcontent-%COMP%]{width:43%;margin-top:-7%;float:right;margin-right:11%}"
              ]
            })),
            e
          );
        })();
      function JM(e, t) {
        if ((1 & e && (L(0, "div", 7), $(1), k()), 2 & e)) {
          const n = t.$implicit;
          Mr(1), Xo(" ", n, " ");
        }
      }
      let XM = (() => {
          class e {
            constructor() {
              this.footerItems = [
                "Privacy Policy",
                "Terms Of Service",
                "Support"
              ];
            }
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function(n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Xe({
              type: e,
              selectors: [["app-footer"]],
              decls: 8,
              vars: 1,
              consts: [
                [1, "footer-wrapper", "txt-center"],
                ["class", "footer-item", 4, "ngFor", "ngForOf"],
                [1, "flex", "icons-div"],
                ["src", "assets/twitericon.svg", 1, "logo-img"],
                ["src", "assets/icon1.png", 1, "logo-img"],
                [1, "solid"],
                [1, "rarefied"],
                [1, "footer-item"]
              ],
              template: function(n, r) {
                1 & n &&
                  (L(0, "div", 0),
                  xa(1, JM, 2, 1, "div", 1),
                  L(2, "div", 2),
                  se(3, "img", 3)(4, "img", 4),
                  k(),
                  se(5, "hr", 5),
                  L(6, "p", 6),
                  $(7, "\xa9 Rarefied Studios, LLC"),
                  k()()),
                  2 & n && (Mr(1), Yo("ngForOf", r.footerItems));
              },
              dependencies: [Su],
              styles: [
                ".footer-wrapper[_ngcontent-%COMP%]{background-image:url(assets/footer-mobile.svg);background-size:100%;width:100%;padding:14% 4% 0;box-sizing:border-box;font-family:MontserratRegular;position:absolute;margin-top:40%}.footer-item[_ngcontent-%COMP%]{font-size:4vw;margin-bottom:3%}.logo-img[_ngcontent-%COMP%]{width:6%}.icons-div[_ngcontent-%COMP%]{margin-top:9%;justify-content:center}.icons-div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-last-of-type(2){margin-right:8px}.icons-div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-last-of-type(1){margin-left:8px}.solid[_ngcontent-%COMP%]{border:1px solid #404040;margin-top:7%;width:93%}.rarefied[_ngcontent-%COMP%]{font-size:3.6vw;text-transform:uppercase;margin:5%}"
              ]
            })),
            e
          );
        })(),
        eS = (() => {
          class e {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function(n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Xe({
              type: e,
              selectors: [["app-landing-description"]],
              decls: 66,
              vars: 0,
              consts: [
                [1, "defend-wrap"],
                [1, "defend-title"],
                [1, "descr-defend"],
                [1, "txt-center"],
                ["src", "assets/image1.svg", 1, "white-hat"],
                [1, "txt-center", "trusted-wrap"],
                [1, "orange-font"],
                [1, "yellow-font"],
                [1, "layer2-sec-wrap", "txt-center"],
                ["src", "assets/ipad4.png", 1, "layer2-ipad-img"],
                [1, "text-wrap"],
                [1, "password-prot-wrap", "txt-center"],
                ["src", "assets/iphones.png"],
                [1, "panic-mode-wrap", "txt-center"],
                ["src", "assets/computer.png"],
                [1, "power-wizard-wrap", "txt-center"],
                [1, "anti-link-wrap", "txt-center"],
                ["src", "assets/ipadpng.png"],
                [1, "learn-more-wrap", "txt-center"]
              ],
              template: function(n, r) {
                1 & n &&
                  (L(0, "div")(1, "div", 0)(2, "h1", 1),
                  $(3, "Defend your Discord realm from hackers"),
                  k(),
                  L(4, "p", 2),
                  $(
                    5,
                    "The only bot that can protect your discord server after an account compromise"
                  ),
                  k(),
                  L(6, "div", 3),
                  se(7, "rounded-button"),
                  k()(),
                  se(8, "img", 4),
                  k(),
                  L(9, "div", 5)(10, "h2"),
                  $(11, "Trusted by "),
                  L(12, "span", 6),
                  $(13, "200+ servers"),
                  k()(),
                  L(14, "h2"),
                  $(15, "Protecting "),
                  L(16, "span", 7),
                  $(17, "500k+ users"),
                  k()()(),
                  L(18, "div", 8)(19, "h1"),
                  $(20, "Layer-2 Security"),
                  k(),
                  se(21, "img", 9),
                  L(22, "div", 10)(23, "p")(24, "span"),
                  $(25, "First layer-2"),
                  k(),
                  $(
                    26,
                    " discord security bot that protects servers from compromised accounts and bots."
                  ),
                  k(),
                  L(27, "p"),
                  $(
                    28,
                    "While all other discord bots attempt to stop scams before they happen, "
                  ),
                  L(29, "span"),
                  $(
                    30,
                    "Good Knight is the only bot that cripples a hacker after they've gained access to your server!"
                  ),
                  k()()()(),
                  L(31, "div", 11)(32, "h1"),
                  $(33, "Password Protection"),
                  k(),
                  L(34, "p"),
                  $(
                    35,
                    "Innovative password & 2FA protection secures Good Knight commands so that hackers cannot gain control of your server, even after compromising an admin or a moderator. "
                  ),
                  k(),
                  se(36, "img", 12),
                  k(),
                  L(37, "div", 13)(38, "h1"),
                  $(39, "Panic Mode"),
                  k(),
                  L(40, "p"),
                  $(
                    41,
                    "Instant server lockdown to safely stop any hack or raid. Good Knight takes a snapshot of your existing server settings and seamlessly reapplies them after the danger has passed. "
                  ),
                  k(),
                  se(42, "img", 14),
                  k(),
                  L(43, "div", 15)(44, "h1"),
                  $(45, "Power Wizard"),
                  k(),
                  L(46, "p"),
                  $(
                    47,
                    "Safely grant your moderators temporary access to power permissions. "
                  ),
                  se(48, "br"),
                  $(
                    49,
                    " The magic of all Discord permissions at your fingertips without any of the risk! "
                  ),
                  k()(),
                  L(50, "div", 16)(51, "h1"),
                  $(52, "Anti-link, anti-webhook and more..."),
                  k(),
                  se(53, "img", 17),
                  L(54, "p"),
                  $(
                    55,
                    "Guards your server against webhook attacks, shields mass mentions, "
                  ),
                  se(56, "br"),
                  $(
                    57,
                    " restricts moderation commands, password protects server lockdown, and more! "
                  ),
                  k()(),
                  L(58, "div", 18)(59, "h1"),
                  $(60, "Learn more about free and premium options "),
                  L(61, "span"),
                  $(62, "here"),
                  k()()(),
                  se(63, "app-faq-section")(64, "app-secure-for-free")(
                    65,
                    "app-footer"
                  ));
              },
              dependencies: [WM, ZM, YM, XM],
              styles: [
                "*[_ngcontent-%COMP%]{margin:0;font-family:MontserratRegular}p[_ngcontent-%COMP%]{font-size:3.8vw;font-family:MontserratMedium;margin:5%}h1[_ngcontent-%COMP%]{font-family:MontserratBold;font-size:8vw}.defend-wrap[_ngcontent-%COMP%]{padding:20vw 5vw 17vw}.defend-title[_ngcontent-%COMP%]{text-align:center;font-size:8vw;line-height:10vw;font-family:MontserratBold}.descr-defend[_ngcontent-%COMP%]{text-align:center;font-size:3.7vw;padding-top:3%;line-height:4.4vw;padding-bottom:10vw;margin:0}.white-hat[_ngcontent-%COMP%]{width:100%}.trusted-wrap[_ngcontent-%COMP%]{margin-top:9%}.trusted-wrap[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:5.6vw;font-family:MontserratBold}.trusted-wrap[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .trusted-wrap[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-family:MontserratBold}.trusted-wrap[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-right:24px;margin-top:27px;width:141px}.layer2-sec-wrap[_ngcontent-%COMP%]{background-image:url(assets/layer2-background.svg);margin-top:9%;padding-top:36%;min-height:161vw;background-size:cover;color:#3a2657}.layer2-sec-wrap[_ngcontent-%COMP%]   .text-wrap[_ngcontent-%COMP%]{margin-top:-1%}.layer2-sec-wrap[_ngcontent-%COMP%]   .layer2-ipad-img[_ngcontent-%COMP%]{width:111%;margin-top:-2%;margin-left:-3%}.layer2-sec-wrap[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0 5%}.layer2-sec-wrap[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:first-child{margin-bottom:5%}.layer2-sec-wrap[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-family:MontserratSemiBold}.password-prot-wrap[_ngcontent-%COMP%]{background-color:#251b33;color:#fff;padding:15% 0 0}.password-prot-wrap[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:109%;margin-top:7%;margin-left:-5%}.panic-mode-wrap[_ngcontent-%COMP%]{padding-bottom:16%}.panic-mode-wrap[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:96%;margin-top:1%}.panic-mode-wrap[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-left:5%;margin-right:5%}.power-wizard-wrap[_ngcontent-%COMP%]{background-image:url(assets/wizard.png);background-color:#fff;background-size:cover;color:#3a2657;padding:21vw 0 129vw}.power-wizard-wrap[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:5% 7%}.anti-link-wrap[_ngcontent-%COMP%]{color:#fff;padding-bottom:10%;padding-top:24%}.anti-link-wrap[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{padding:0 20vw}.anti-link-wrap[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:117%;margin-left:-5%}.anti-link-wrap[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:-2% 8% 14% 9%}.learn-more-wrap[_ngcontent-%COMP%]{background-color:#fff;color:#251b33}.learn-more-wrap[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{padding:10% 1%;font-size:5.8vw}.learn-more-wrap[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#f7a302;font-family:MontserratBold}"
              ]
            })),
            e
          );
        })(),
        tS = (() => {
          class e {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function(n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Xe({
              type: e,
              selectors: [["app-features-page"]],
              decls: 3,
              vars: 0,
              consts: [[1, "site-body"]],
              template: function(n, r) {
                1 & n &&
                  (L(0, "div", 0),
                  se(1, "app-header")(2, "app-landing-description"),
                  k());
              },
              dependencies: [qM, eS],
              styles: [
                ".site-body[_ngcontent-%COMP%]{background-color:#251b33}"
              ]
            })),
            e
          );
        })(),
        nS = (() => {
          class e {
            constructor() {
              this.title = "good-knightz";
            }
          }
          return (
            (e.ɵfac = function(n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Xe({
              type: e,
              selectors: [["app-root"]],
              decls: 1,
              vars: 0,
              template: function(n, r) {
                1 & n && se(0, "app-features-page");
              },
              dependencies: [tS]
            })),
            e
          );
        })(),
        rS = (() => {
          class e {}
          return (
            (e.ɵfac = function(n) {
              return new (n || e)();
            }),
            (e.ɵmod = tr({ type: e, bootstrap: [nS] })),
            (e.ɵinj = un({ imports: [LM] })),
            e
          );
        })();
      (function a0() {
        og = !1;
      })(),
        RM()
          .bootstrapModule(rS)
          .catch(e => console.error(e));
    }
  },
  re => {
    re((re.s = 332));
  }
]);
