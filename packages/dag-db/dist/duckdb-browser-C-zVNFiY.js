function E(n, t, e, i) {
  function s(r) {
    return r instanceof e ? r : new e(function(o) {
      o(r);
    });
  }
  return new (e || (e = Promise))(function(r, o) {
    function a(l) {
      try {
        u(i.next(l));
      } catch (h) {
        o(h);
      }
    }
    function d(l) {
      try {
        u(i.throw(l));
      } catch (h) {
        o(h);
      }
    }
    function u(l) {
      l.done ? r(l.value) : s(l.value).then(a, d);
    }
    u((i = i.apply(n, t || [])).next());
  });
}
function zi(n) {
  var t = typeof Symbol == "function" && Symbol.iterator, e = t && n[t], i = 0;
  if (e) return e.call(n);
  if (n && typeof n.length == "number") return {
    next: function() {
      return n && i >= n.length && (n = void 0), { value: n && n[i++], done: !n };
    }
  };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function T(n) {
  return this instanceof T ? (this.v = n, this) : new T(n);
}
function Et(n, t, e) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var i = e.apply(n, t || []), s, r = [];
  return s = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), a("next"), a("throw"), a("return", o), s[Symbol.asyncIterator] = function() {
    return this;
  }, s;
  function o(F) {
    return function(H) {
      return Promise.resolve(H).then(F, h);
    };
  }
  function a(F, H) {
    i[F] && (s[F] = function(te) {
      return new Promise(function(zn, Pt) {
        r.push([F, te, zn, Pt]) > 1 || d(F, te);
      });
    }, H && (s[F] = H(s[F])));
  }
  function d(F, H) {
    try {
      u(i[F](H));
    } catch (te) {
      $(r[0][3], te);
    }
  }
  function u(F) {
    F.value instanceof T ? Promise.resolve(F.value.v).then(l, h) : $(r[0][2], F);
  }
  function l(F) {
    d("next", F);
  }
  function h(F) {
    d("throw", F);
  }
  function $(F, H) {
    F(H), r.shift(), r.length && d(r[0][0], r[0][1]);
  }
}
function qe(n) {
  var t, e;
  return t = {}, i("next"), i("throw", function(s) {
    throw s;
  }), i("return"), t[Symbol.iterator] = function() {
    return this;
  }, t;
  function i(s, r) {
    t[s] = n[s] ? function(o) {
      return (e = !e) ? { value: T(n[s](o)), done: !1 } : r ? r(o) : o;
    } : r;
  }
}
function Qt(n) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = n[Symbol.asyncIterator], e;
  return t ? t.call(n) : (n = typeof zi == "function" ? zi(n) : n[Symbol.iterator](), e = {}, i("next"), i("throw"), i("return"), e[Symbol.asyncIterator] = function() {
    return this;
  }, e);
  function i(r) {
    e[r] = n[r] && function(o) {
      return new Promise(function(a, d) {
        o = n[r](o), s(a, d, o.done, o.value);
      });
    };
  }
  function s(r, o, a, d) {
    Promise.resolve(d).then(function(u) {
      r({ value: u, done: a });
    }, o);
  }
}
const Eo = new TextDecoder("utf-8"), ti = (n) => Eo.decode(n), To = new TextEncoder(), pi = (n) => To.encode(n), Oo = (n) => typeof n == "number", ms = (n) => typeof n == "boolean", W = (n) => typeof n == "function", it = (n) => n != null && Object(n) === n, Jt = (n) => it(n) && W(n.then), je = (n) => it(n) && W(n[Symbol.iterator]), Se = (n) => it(n) && W(n[Symbol.asyncIterator]), ei = (n) => it(n) && it(n.schema), _s = (n) => it(n) && "done" in n && "value" in n, gs = (n) => it(n) && W(n.stat) && Oo(n.fd), bs = (n) => it(n) && yi(n.body), Cn = (n) => "_getDOMStream" in n && "_getNodeStream" in n, Bo = (n) => it(n) && W(n.abort) && W(n.getWriter) && !Cn(n), yi = (n) => it(n) && W(n.cancel) && W(n.getReader) && !Cn(n), Ao = (n) => it(n) && W(n.end) && W(n.write) && ms(n.writable) && !Cn(n), Is = (n) => it(n) && W(n.read) && W(n.pipe) && ms(n.readable) && !Cn(n), Fo = (n) => it(n) && W(n.clear) && W(n.bytes) && W(n.position) && W(n.setPosition) && W(n.capacity) && W(n.getBufferIdentifier) && W(n.createLong), mi = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : ArrayBuffer;
function Do(n) {
  const t = n[0] ? [n[0]] : [];
  let e, i, s, r;
  for (let o, a, d = 0, u = 0, l = n.length; ++d < l; ) {
    if (o = t[u], a = n[d], !o || !a || o.buffer !== a.buffer || a.byteOffset < o.byteOffset) {
      a && (t[++u] = a);
      continue;
    }
    if ({ byteOffset: e, byteLength: s } = o, { byteOffset: i, byteLength: r } = a, e + s < i || i + r < e) {
      a && (t[++u] = a);
      continue;
    }
    t[u] = new Uint8Array(o.buffer, e, i - e + r);
  }
  return t;
}
function $i(n, t, e = 0, i = t.byteLength) {
  const s = n.byteLength, r = new Uint8Array(n.buffer, n.byteOffset, s), o = new Uint8Array(t.buffer, t.byteOffset, Math.min(i, s));
  return r.set(o, e), n;
}
function Ot(n, t) {
  const e = Do(n), i = e.reduce((l, h) => l + h.byteLength, 0);
  let s, r, o, a = 0, d = -1;
  const u = Math.min(t || Number.POSITIVE_INFINITY, i);
  for (const l = e.length; ++d < l; ) {
    if (s = e[d], r = s.subarray(0, Math.min(s.length, u - a)), u <= a + r.length) {
      r.length < s.length ? e[d] = s.subarray(r.length) : r.length === s.length && d++, o ? $i(o, r, a) : o = r;
      break;
    }
    $i(o || (o = new Uint8Array(u)), r, a), a += r.length;
  }
  return [o || new Uint8Array(0), e.slice(d), i - (o ? o.byteLength : 0)];
}
function C(n, t) {
  let e = _s(t) ? t.value : t;
  return e instanceof n ? n === Uint8Array ? new n(e.buffer, e.byteOffset, e.byteLength) : e : e ? (typeof e == "string" && (e = pi(e)), e instanceof ArrayBuffer ? new n(e) : e instanceof mi ? new n(e) : Fo(e) ? C(n, e.bytes()) : ArrayBuffer.isView(e) ? e.byteLength <= 0 ? new n(0) : new n(e.buffer, e.byteOffset, e.byteLength / n.BYTES_PER_ELEMENT) : n.from(e)) : new n(0);
}
const Ee = (n) => C(Int32Array, n), Yi = (n) => C(BigInt64Array, n), A = (n) => C(Uint8Array, n), ni = (n) => (n.next(), n);
function* Ro(n, t) {
  const e = function* (s) {
    yield s;
  }, i = typeof t == "string" || ArrayBuffer.isView(t) || t instanceof ArrayBuffer || t instanceof mi ? e(t) : je(t) ? t : e(t);
  return yield* ni(function* (s) {
    let r = null;
    do
      r = s.next(yield C(n, r));
    while (!r.done);
  }(i[Symbol.iterator]())), new n();
}
const No = (n) => Ro(Uint8Array, n);
function ws(n, t) {
  return Et(this, arguments, function* () {
    if (Jt(t))
      return yield T(yield T(yield* qe(Qt(ws(n, yield T(t))))));
    const i = function(o) {
      return Et(this, arguments, function* () {
        yield yield T(yield T(o));
      });
    }, s = function(o) {
      return Et(this, arguments, function* () {
        yield T(yield* qe(Qt(ni(function* (a) {
          let d = null;
          do
            d = a.next(yield d == null ? void 0 : d.value);
          while (!d.done);
        }(o[Symbol.iterator]())))));
      });
    }, r = typeof t == "string" || ArrayBuffer.isView(t) || t instanceof ArrayBuffer || t instanceof mi ? i(t) : je(t) ? s(t) : Se(t) ? t : i(t);
    return yield T(
      // otherwise if AsyncIterable, use it
      yield* qe(Qt(ni(function(o) {
        return Et(this, arguments, function* () {
          let a = null;
          do
            a = yield T(o.next(yield yield T(C(n, a))));
          while (!a.done);
        });
      }(r[Symbol.asyncIterator]()))))
    ), yield T(new n());
  });
}
const Lo = (n) => ws(Uint8Array, n);
function Ss(n, t, e) {
  if (n !== 0) {
    e = e.slice(0, t);
    for (let i = -1, s = e.length; ++i < s; )
      e[i] += n;
  }
  return e.subarray(0, t);
}
function Mo(n, t) {
  let e = 0;
  const i = n.length;
  if (i !== t.length)
    return !1;
  if (i > 0)
    do
      if (n[e] !== t[e])
        return !1;
    while (++e < i);
  return !0;
}
const dt = {
  fromIterable(n) {
    return We(Uo(n));
  },
  fromAsyncIterable(n) {
    return We(ko(n));
  },
  fromDOMStream(n) {
    return We(Co(n));
  },
  fromNodeStream(n) {
    return We(xo(n));
  },
  // @ts-ignore
  toDOMStream(n, t) {
    throw new Error('"toDOMStream" not available in this environment');
  },
  // @ts-ignore
  toNodeStream(n, t) {
    throw new Error('"toNodeStream" not available in this environment');
  }
}, We = (n) => (n.next(), n);
function* Uo(n) {
  let t, e = !1, i = [], s, r, o, a = 0;
  function d() {
    return r === "peek" ? Ot(i, o)[0] : ([s, i, a] = Ot(i, o), s);
  }
  ({ cmd: r, size: o } = (yield null) || { cmd: "read", size: 0 });
  const u = No(n)[Symbol.iterator]();
  try {
    do
      if ({ done: t, value: s } = Number.isNaN(o - a) ? u.next() : u.next(o - a), !t && s.byteLength > 0 && (i.push(s), a += s.byteLength), t || o <= a)
        do
          ({ cmd: r, size: o } = yield d());
        while (o < a);
    while (!t);
  } catch (l) {
    (e = !0) && typeof u.throw == "function" && u.throw(l);
  } finally {
    e === !1 && typeof u.return == "function" && u.return(null);
  }
  return null;
}
function ko(n) {
  return Et(this, arguments, function* () {
    let e, i = !1, s = [], r, o, a, d = 0;
    function u() {
      return o === "peek" ? Ot(s, a)[0] : ([r, s, d] = Ot(s, a), r);
    }
    ({ cmd: o, size: a } = (yield yield T(null)) || { cmd: "read", size: 0 });
    const l = Lo(n)[Symbol.asyncIterator]();
    try {
      do
        if ({ done: e, value: r } = Number.isNaN(a - d) ? yield T(l.next()) : yield T(l.next(a - d)), !e && r.byteLength > 0 && (s.push(r), d += r.byteLength), e || a <= d)
          do
            ({ cmd: o, size: a } = yield yield T(u()));
          while (a < d);
      while (!e);
    } catch (h) {
      (i = !0) && typeof l.throw == "function" && (yield T(l.throw(h)));
    } finally {
      i === !1 && typeof l.return == "function" && (yield T(l.return(new Uint8Array(0))));
    }
    return yield T(null);
  });
}
function Co(n) {
  return Et(this, arguments, function* () {
    let e = !1, i = !1, s = [], r, o, a, d = 0;
    function u() {
      return o === "peek" ? Ot(s, a)[0] : ([r, s, d] = Ot(s, a), r);
    }
    ({ cmd: o, size: a } = (yield yield T(null)) || { cmd: "read", size: 0 });
    const l = new Po(n);
    try {
      do
        if ({ done: e, value: r } = Number.isNaN(a - d) ? yield T(l.read()) : yield T(l.read(a - d)), !e && r.byteLength > 0 && (s.push(A(r)), d += r.byteLength), e || a <= d)
          do
            ({ cmd: o, size: a } = yield yield T(u()));
          while (a < d);
      while (!e);
    } catch (h) {
      (i = !0) && (yield T(l.cancel(h)));
    } finally {
      i === !1 ? yield T(l.cancel()) : n.locked && l.releaseLock();
    }
    return yield T(null);
  });
}
class Po {
  constructor(t) {
    this.source = t, this.reader = null, this.reader = this.source.getReader(), this.reader.closed.catch(() => {
    });
  }
  get closed() {
    return this.reader ? this.reader.closed.catch(() => {
    }) : Promise.resolve();
  }
  releaseLock() {
    this.reader && this.reader.releaseLock(), this.reader = null;
  }
  cancel(t) {
    return E(this, void 0, void 0, function* () {
      const { reader: e, source: i } = this;
      e && (yield e.cancel(t).catch(() => {
      })), i && i.locked && this.releaseLock();
    });
  }
  read(t) {
    return E(this, void 0, void 0, function* () {
      if (t === 0)
        return { done: this.reader == null, value: new Uint8Array(0) };
      const e = yield this.reader.read();
      return !e.done && (e.value = A(e)), e;
    });
  }
}
const $n = (n, t) => {
  const e = (s) => i([t, s]);
  let i;
  return [t, e, new Promise((s) => (i = s) && n.once(t, e))];
};
function xo(n) {
  return Et(this, arguments, function* () {
    const e = [];
    let i = "error", s = !1, r = null, o, a, d = 0, u = [], l;
    function h() {
      return o === "peek" ? Ot(u, a)[0] : ([l, u, d] = Ot(u, a), l);
    }
    if ({ cmd: o, size: a } = (yield yield T(null)) || { cmd: "read", size: 0 }, n.isTTY)
      return yield yield T(new Uint8Array(0)), yield T(null);
    try {
      e[0] = $n(n, "end"), e[1] = $n(n, "error");
      do {
        if (e[2] = $n(n, "readable"), [i, r] = yield T(Promise.race(e.map((F) => F[2]))), i === "error")
          break;
        if ((s = i === "end") || (Number.isFinite(a - d) ? (l = A(n.read(a - d)), l.byteLength < a - d && (l = A(n.read()))) : l = A(n.read()), l.byteLength > 0 && (u.push(l), d += l.byteLength)), s || a <= d)
          do
            ({ cmd: o, size: a } = yield yield T(h()));
          while (a < d);
      } while (!s);
    } finally {
      yield T($(e, i === "error" ? r : null));
    }
    return yield T(null);
    function $(F, H) {
      return l = u = null, new Promise((te, zn) => {
        for (const [Pt, vo] of F)
          n.off(Pt, vo);
        try {
          const Pt = n.destroy;
          Pt && Pt.call(n, H), H = void 0;
        } catch (Pt) {
          H = Pt || H;
        } finally {
          H != null ? zn(H) : te();
        }
      });
    }
  });
}
var Y;
(function(n) {
  n[n.V1 = 0] = "V1", n[n.V2 = 1] = "V2", n[n.V3 = 2] = "V3", n[n.V4 = 3] = "V4", n[n.V5 = 4] = "V5";
})(Y || (Y = {}));
var K;
(function(n) {
  n[n.Sparse = 0] = "Sparse", n[n.Dense = 1] = "Dense";
})(K || (K = {}));
var q;
(function(n) {
  n[n.HALF = 0] = "HALF", n[n.SINGLE = 1] = "SINGLE", n[n.DOUBLE = 2] = "DOUBLE";
})(q || (q = {}));
var ft;
(function(n) {
  n[n.DAY = 0] = "DAY", n[n.MILLISECOND = 1] = "MILLISECOND";
})(ft || (ft = {}));
var g;
(function(n) {
  n[n.SECOND = 0] = "SECOND", n[n.MILLISECOND = 1] = "MILLISECOND", n[n.MICROSECOND = 2] = "MICROSECOND", n[n.NANOSECOND = 3] = "NANOSECOND";
})(g || (g = {}));
var Bt;
(function(n) {
  n[n.YEAR_MONTH = 0] = "YEAR_MONTH", n[n.DAY_TIME = 1] = "DAY_TIME", n[n.MONTH_DAY_NANO = 2] = "MONTH_DAY_NANO";
})(Bt || (Bt = {}));
const Yn = 2, wt = 4, Lt = 4, M = 4, Vt = new Int32Array(2), Wi = new Float32Array(Vt.buffer), Gi = new Float64Array(Vt.buffer), Ge = new Uint16Array(new Uint8Array([1, 0]).buffer)[0] === 1;
var ii;
(function(n) {
  n[n.UTF8_BYTES = 1] = "UTF8_BYTES", n[n.UTF16_STRING = 2] = "UTF16_STRING";
})(ii || (ii = {}));
let _e = class vs {
  /**
   * Create a new ByteBuffer with a given array of bytes (`Uint8Array`)
   */
  constructor(t) {
    this.bytes_ = t, this.position_ = 0, this.text_decoder_ = new TextDecoder();
  }
  /**
   * Create and allocate a new ByteBuffer with a given size.
   */
  static allocate(t) {
    return new vs(new Uint8Array(t));
  }
  clear() {
    this.position_ = 0;
  }
  /**
   * Get the underlying `Uint8Array`.
   */
  bytes() {
    return this.bytes_;
  }
  /**
   * Get the buffer's position.
   */
  position() {
    return this.position_;
  }
  /**
   * Set the buffer's position.
   */
  setPosition(t) {
    this.position_ = t;
  }
  /**
   * Get the buffer's capacity.
   */
  capacity() {
    return this.bytes_.length;
  }
  readInt8(t) {
    return this.readUint8(t) << 24 >> 24;
  }
  readUint8(t) {
    return this.bytes_[t];
  }
  readInt16(t) {
    return this.readUint16(t) << 16 >> 16;
  }
  readUint16(t) {
    return this.bytes_[t] | this.bytes_[t + 1] << 8;
  }
  readInt32(t) {
    return this.bytes_[t] | this.bytes_[t + 1] << 8 | this.bytes_[t + 2] << 16 | this.bytes_[t + 3] << 24;
  }
  readUint32(t) {
    return this.readInt32(t) >>> 0;
  }
  readInt64(t) {
    return BigInt.asIntN(64, BigInt(this.readUint32(t)) + (BigInt(this.readUint32(t + 4)) << BigInt(32)));
  }
  readUint64(t) {
    return BigInt.asUintN(64, BigInt(this.readUint32(t)) + (BigInt(this.readUint32(t + 4)) << BigInt(32)));
  }
  readFloat32(t) {
    return Vt[0] = this.readInt32(t), Wi[0];
  }
  readFloat64(t) {
    return Vt[Ge ? 0 : 1] = this.readInt32(t), Vt[Ge ? 1 : 0] = this.readInt32(t + 4), Gi[0];
  }
  writeInt8(t, e) {
    this.bytes_[t] = e;
  }
  writeUint8(t, e) {
    this.bytes_[t] = e;
  }
  writeInt16(t, e) {
    this.bytes_[t] = e, this.bytes_[t + 1] = e >> 8;
  }
  writeUint16(t, e) {
    this.bytes_[t] = e, this.bytes_[t + 1] = e >> 8;
  }
  writeInt32(t, e) {
    this.bytes_[t] = e, this.bytes_[t + 1] = e >> 8, this.bytes_[t + 2] = e >> 16, this.bytes_[t + 3] = e >> 24;
  }
  writeUint32(t, e) {
    this.bytes_[t] = e, this.bytes_[t + 1] = e >> 8, this.bytes_[t + 2] = e >> 16, this.bytes_[t + 3] = e >> 24;
  }
  writeInt64(t, e) {
    this.writeInt32(t, Number(BigInt.asIntN(32, e))), this.writeInt32(t + 4, Number(BigInt.asIntN(32, e >> BigInt(32))));
  }
  writeUint64(t, e) {
    this.writeUint32(t, Number(BigInt.asUintN(32, e))), this.writeUint32(t + 4, Number(BigInt.asUintN(32, e >> BigInt(32))));
  }
  writeFloat32(t, e) {
    Wi[0] = e, this.writeInt32(t, Vt[0]);
  }
  writeFloat64(t, e) {
    Gi[0] = e, this.writeInt32(t, Vt[Ge ? 0 : 1]), this.writeInt32(t + 4, Vt[Ge ? 1 : 0]);
  }
  /**
   * Return the file identifier.   Behavior is undefined for FlatBuffers whose
   * schema does not include a file_identifier (likely points at padding or the
   * start of a the root vtable).
   */
  getBufferIdentifier() {
    if (this.bytes_.length < this.position_ + wt + Lt)
      throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");
    let t = "";
    for (let e = 0; e < Lt; e++)
      t += String.fromCharCode(this.readInt8(this.position_ + wt + e));
    return t;
  }
  /**
   * Look up a field in the vtable, return an offset into the object, or 0 if the
   * field is not present.
   */
  __offset(t, e) {
    const i = t - this.readInt32(t);
    return e < this.readInt16(i) ? this.readInt16(i + e) : 0;
  }
  /**
   * Initialize any Table-derived type to point to the union at the given offset.
   */
  __union(t, e) {
    return t.bb_pos = e + this.readInt32(e), t.bb = this, t;
  }
  /**
   * Create a JavaScript string from UTF-8 data stored inside the FlatBuffer.
   * This allocates a new string and converts to wide chars upon each access.
   *
   * To avoid the conversion to string, pass Encoding.UTF8_BYTES as the
   * "optionalEncoding" argument. This is useful for avoiding conversion when
   * the data will just be packaged back up in another FlatBuffer later on.
   *
   * @param offset
   * @param opt_encoding Defaults to UTF16_STRING
   */
  __string(t, e) {
    t += this.readInt32(t);
    const i = this.readInt32(t);
    t += wt;
    const s = this.bytes_.subarray(t, t + i);
    return e === ii.UTF8_BYTES ? s : this.text_decoder_.decode(s);
  }
  /**
   * Handle unions that can contain string as its member, if a Table-derived type then initialize it,
   * if a string then return a new one
   *
   * WARNING: strings are immutable in JS so we can't change the string that the user gave us, this
   * makes the behaviour of __union_with_string different compared to __union
   */
  __union_with_string(t, e) {
    return typeof t == "string" ? this.__string(e) : this.__union(t, e);
  }
  /**
   * Retrieve the relative offset stored at "offset"
   */
  __indirect(t) {
    return t + this.readInt32(t);
  }
  /**
   * Get the start of data of a vector whose offset is stored at "offset" in this object.
   */
  __vector(t) {
    return t + this.readInt32(t) + wt;
  }
  /**
   * Get the length of a vector whose offset is stored at "offset" in this object.
   */
  __vector_len(t) {
    return this.readInt32(t + this.readInt32(t));
  }
  __has_identifier(t) {
    if (t.length != Lt)
      throw new Error("FlatBuffers: file identifier must be length " + Lt);
    for (let e = 0; e < Lt; e++)
      if (t.charCodeAt(e) != this.readInt8(this.position() + wt + e))
        return !1;
    return !0;
  }
  /**
   * A helper function for generating list for obj api
   */
  createScalarList(t, e) {
    const i = [];
    for (let s = 0; s < e; ++s) {
      const r = t(s);
      r !== null && i.push(r);
    }
    return i;
  }
  /**
   * A helper function for generating list for obj api
   * @param listAccessor function that accepts an index and return data at that index
   * @param listLength listLength
   * @param res result list
   */
  createObjList(t, e) {
    const i = [];
    for (let s = 0; s < e; ++s) {
      const r = t(s);
      r !== null && i.push(r.unpack());
    }
    return i;
  }
}, Es = class Ts {
  /**
   * Create a FlatBufferBuilder.
   */
  constructor(t) {
    this.minalign = 1, this.vtable = null, this.vtable_in_use = 0, this.isNested = !1, this.object_start = 0, this.vtables = [], this.vector_num_elems = 0, this.force_defaults = !1, this.string_maps = null, this.text_encoder = new TextEncoder();
    let e;
    t ? e = t : e = 1024, this.bb = _e.allocate(e), this.space = e;
  }
  clear() {
    this.bb.clear(), this.space = this.bb.capacity(), this.minalign = 1, this.vtable = null, this.vtable_in_use = 0, this.isNested = !1, this.object_start = 0, this.vtables = [], this.vector_num_elems = 0, this.force_defaults = !1, this.string_maps = null;
  }
  /**
   * In order to save space, fields that are set to their default value
   * don't get serialized into the buffer. Forcing defaults provides a
   * way to manually disable this optimization.
   *
   * @param forceDefaults true always serializes default values
   */
  forceDefaults(t) {
    this.force_defaults = t;
  }
  /**
   * Get the ByteBuffer representing the FlatBuffer. Only call this after you've
   * called finish(). The actual data starts at the ByteBuffer's current position,
   * not necessarily at 0.
   */
  dataBuffer() {
    return this.bb;
  }
  /**
   * Get the bytes representing the FlatBuffer. Only call this after you've
   * called finish().
   */
  asUint8Array() {
    return this.bb.bytes().subarray(this.bb.position(), this.bb.position() + this.offset());
  }
  /**
   * Prepare to write an element of `size` after `additional_bytes` have been
   * written, e.g. if you write a string, you need to align such the int length
   * field is aligned to 4 bytes, and the string data follows it directly. If all
   * you need to do is alignment, `additional_bytes` will be 0.
   *
   * @param size This is the of the new element to write
   * @param additional_bytes The padding size
   */
  prep(t, e) {
    t > this.minalign && (this.minalign = t);
    const i = ~(this.bb.capacity() - this.space + e) + 1 & t - 1;
    for (; this.space < i + t + e; ) {
      const s = this.bb.capacity();
      this.bb = Ts.growByteBuffer(this.bb), this.space += this.bb.capacity() - s;
    }
    this.pad(i);
  }
  pad(t) {
    for (let e = 0; e < t; e++)
      this.bb.writeInt8(--this.space, 0);
  }
  writeInt8(t) {
    this.bb.writeInt8(this.space -= 1, t);
  }
  writeInt16(t) {
    this.bb.writeInt16(this.space -= 2, t);
  }
  writeInt32(t) {
    this.bb.writeInt32(this.space -= 4, t);
  }
  writeInt64(t) {
    this.bb.writeInt64(this.space -= 8, t);
  }
  writeFloat32(t) {
    this.bb.writeFloat32(this.space -= 4, t);
  }
  writeFloat64(t) {
    this.bb.writeFloat64(this.space -= 8, t);
  }
  /**
   * Add an `int8` to the buffer, properly aligned, and grows the buffer (if necessary).
   * @param value The `int8` to add the buffer.
   */
  addInt8(t) {
    this.prep(1, 0), this.writeInt8(t);
  }
  /**
   * Add an `int16` to the buffer, properly aligned, and grows the buffer (if necessary).
   * @param value The `int16` to add the buffer.
   */
  addInt16(t) {
    this.prep(2, 0), this.writeInt16(t);
  }
  /**
   * Add an `int32` to the buffer, properly aligned, and grows the buffer (if necessary).
   * @param value The `int32` to add the buffer.
   */
  addInt32(t) {
    this.prep(4, 0), this.writeInt32(t);
  }
  /**
   * Add an `int64` to the buffer, properly aligned, and grows the buffer (if necessary).
   * @param value The `int64` to add the buffer.
   */
  addInt64(t) {
    this.prep(8, 0), this.writeInt64(t);
  }
  /**
   * Add a `float32` to the buffer, properly aligned, and grows the buffer (if necessary).
   * @param value The `float32` to add the buffer.
   */
  addFloat32(t) {
    this.prep(4, 0), this.writeFloat32(t);
  }
  /**
   * Add a `float64` to the buffer, properly aligned, and grows the buffer (if necessary).
   * @param value The `float64` to add the buffer.
   */
  addFloat64(t) {
    this.prep(8, 0), this.writeFloat64(t);
  }
  addFieldInt8(t, e, i) {
    (this.force_defaults || e != i) && (this.addInt8(e), this.slot(t));
  }
  addFieldInt16(t, e, i) {
    (this.force_defaults || e != i) && (this.addInt16(e), this.slot(t));
  }
  addFieldInt32(t, e, i) {
    (this.force_defaults || e != i) && (this.addInt32(e), this.slot(t));
  }
  addFieldInt64(t, e, i) {
    (this.force_defaults || e !== i) && (this.addInt64(e), this.slot(t));
  }
  addFieldFloat32(t, e, i) {
    (this.force_defaults || e != i) && (this.addFloat32(e), this.slot(t));
  }
  addFieldFloat64(t, e, i) {
    (this.force_defaults || e != i) && (this.addFloat64(e), this.slot(t));
  }
  addFieldOffset(t, e, i) {
    (this.force_defaults || e != i) && (this.addOffset(e), this.slot(t));
  }
  /**
   * Structs are stored inline, so nothing additional is being added. `d` is always 0.
   */
  addFieldStruct(t, e, i) {
    e != i && (this.nested(e), this.slot(t));
  }
  /**
   * Structures are always stored inline, they need to be created right
   * where they're used.  You'll get this assertion failure if you
   * created it elsewhere.
   */
  nested(t) {
    if (t != this.offset())
      throw new TypeError("FlatBuffers: struct must be serialized inline.");
  }
  /**
   * Should not be creating any other object, string or vector
   * while an object is being constructed
   */
  notNested() {
    if (this.isNested)
      throw new TypeError("FlatBuffers: object serialization must not be nested.");
  }
  /**
   * Set the current vtable at `voffset` to the current location in the buffer.
   */
  slot(t) {
    this.vtable !== null && (this.vtable[t] = this.offset());
  }
  /**
   * @returns Offset relative to the end of the buffer.
   */
  offset() {
    return this.bb.capacity() - this.space;
  }
  /**
   * Doubles the size of the backing ByteBuffer and copies the old data towards
   * the end of the new buffer (since we build the buffer backwards).
   *
   * @param bb The current buffer with the existing data
   * @returns A new byte buffer with the old data copied
   * to it. The data is located at the end of the buffer.
   *
   * uint8Array.set() formally takes {Array<number>|ArrayBufferView}, so to pass
   * it a uint8Array we need to suppress the type check:
   * @suppress {checkTypes}
   */
  static growByteBuffer(t) {
    const e = t.capacity();
    if (e & 3221225472)
      throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");
    const i = e << 1, s = _e.allocate(i);
    return s.setPosition(i - e), s.bytes().set(t.bytes(), i - e), s;
  }
  /**
   * Adds on offset, relative to where it will be written.
   *
   * @param offset The offset to add.
   */
  addOffset(t) {
    this.prep(wt, 0), this.writeInt32(this.offset() - t + wt);
  }
  /**
   * Start encoding a new object in the buffer.  Users will not usually need to
   * call this directly. The FlatBuffers compiler will generate helper methods
   * that call this method internally.
   */
  startObject(t) {
    this.notNested(), this.vtable == null && (this.vtable = []), this.vtable_in_use = t;
    for (let e = 0; e < t; e++)
      this.vtable[e] = 0;
    this.isNested = !0, this.object_start = this.offset();
  }
  /**
   * Finish off writing the object that is under construction.
   *
   * @returns The offset to the object inside `dataBuffer`
   */
  endObject() {
    if (this.vtable == null || !this.isNested)
      throw new Error("FlatBuffers: endObject called without startObject");
    this.addInt32(0);
    const t = this.offset();
    let e = this.vtable_in_use - 1;
    for (; e >= 0 && this.vtable[e] == 0; e--)
      ;
    const i = e + 1;
    for (; e >= 0; e--)
      this.addInt16(this.vtable[e] != 0 ? t - this.vtable[e] : 0);
    const s = 2;
    this.addInt16(t - this.object_start);
    const r = (i + s) * Yn;
    this.addInt16(r);
    let o = 0;
    const a = this.space;
    t: for (e = 0; e < this.vtables.length; e++) {
      const d = this.bb.capacity() - this.vtables[e];
      if (r == this.bb.readInt16(d)) {
        for (let u = Yn; u < r; u += Yn)
          if (this.bb.readInt16(a + u) != this.bb.readInt16(d + u))
            continue t;
        o = this.vtables[e];
        break;
      }
    }
    return o ? (this.space = this.bb.capacity() - t, this.bb.writeInt32(this.space, o - t)) : (this.vtables.push(this.offset()), this.bb.writeInt32(this.bb.capacity() - t, this.offset() - t)), this.isNested = !1, t;
  }
  /**
   * Finalize a buffer, poiting to the given `root_table`.
   */
  finish(t, e, i) {
    const s = i ? M : 0;
    if (e) {
      const r = e;
      if (this.prep(this.minalign, wt + Lt + s), r.length != Lt)
        throw new TypeError("FlatBuffers: file identifier must be length " + Lt);
      for (let o = Lt - 1; o >= 0; o--)
        this.writeInt8(r.charCodeAt(o));
    }
    this.prep(this.minalign, wt + s), this.addOffset(t), s && this.addInt32(this.bb.capacity() - this.space), this.bb.setPosition(this.space);
  }
  /**
   * Finalize a size prefixed buffer, pointing to the given `root_table`.
   */
  finishSizePrefixed(t, e) {
    this.finish(t, e, !0);
  }
  /**
   * This checks a required field has been set in a given table that has
   * just been constructed.
   */
  requiredField(t, e) {
    const i = this.bb.capacity() - t, s = i - this.bb.readInt32(i);
    if (!(e < this.bb.readInt16(s) && this.bb.readInt16(s + e) != 0))
      throw new TypeError("FlatBuffers: field " + e + " must be set");
  }
  /**
   * Start a new array/vector of objects.  Users usually will not call
   * this directly. The FlatBuffers compiler will create a start/end
   * method for vector types in generated code.
   *
   * @param elem_size The size of each element in the array
   * @param num_elems The number of elements in the array
   * @param alignment The alignment of the array
   */
  startVector(t, e, i) {
    this.notNested(), this.vector_num_elems = e, this.prep(wt, t * e), this.prep(i, t * e);
  }
  /**
   * Finish off the creation of an array and all its elements. The array must be
   * created with `startVector`.
   *
   * @returns The offset at which the newly created array
   * starts.
   */
  endVector() {
    return this.writeInt32(this.vector_num_elems), this.offset();
  }
  /**
   * Encode the string `s` in the buffer using UTF-8. If the string passed has
   * already been seen, we return the offset of the already written string
   *
   * @param s The string to encode
   * @return The offset in the buffer where the encoded string starts
   */
  createSharedString(t) {
    if (!t)
      return 0;
    if (this.string_maps || (this.string_maps = /* @__PURE__ */ new Map()), this.string_maps.has(t))
      return this.string_maps.get(t);
    const e = this.createString(t);
    return this.string_maps.set(t, e), e;
  }
  /**
   * Encode the string `s` in the buffer using UTF-8. If a Uint8Array is passed
   * instead of a string, it is assumed to contain valid UTF-8 encoded data.
   *
   * @param s The string to encode
   * @return The offset in the buffer where the encoded string starts
   */
  createString(t) {
    if (t == null)
      return 0;
    let e;
    return t instanceof Uint8Array ? e = t : e = this.text_encoder.encode(t), this.addInt8(0), this.startVector(1, e.length, 1), this.bb.setPosition(this.space -= e.length), this.bb.bytes().set(e, this.space), this.endVector();
  }
  /**
   * Create a byte vector.
   *
   * @param v The bytes to add
   * @returns The offset in the buffer where the byte vector starts
   */
  createByteVector(t) {
    return t == null ? 0 : (this.startVector(1, t.length, 1), this.bb.setPosition(this.space -= t.length), this.bb.bytes().set(t, this.space), this.endVector());
  }
  /**
   * A helper function to pack an object
   *
   * @returns offset of obj
   */
  createObjectOffset(t) {
    return t === null ? 0 : typeof t == "string" ? this.createString(t) : t.pack(this);
  }
  /**
   * A helper function to pack a list of object
   *
   * @returns list of offsets of each non null object
   */
  createObjectOffsetList(t) {
    const e = [];
    for (let i = 0; i < t.length; ++i) {
      const s = t[i];
      if (s !== null)
        e.push(this.createObjectOffset(s));
      else
        throw new TypeError("FlatBuffers: Argument for createObjectOffsetList cannot contain null.");
    }
    return e;
  }
  createStructOffsetList(t, e) {
    return e(this, t.length), this.createObjectOffsetList(t.slice().reverse()), this.endVector();
  }
};
var on;
(function(n) {
  n[n.BUFFER = 0] = "BUFFER";
})(on || (on = {}));
var an;
(function(n) {
  n[n.LZ4_FRAME = 0] = "LZ4_FRAME", n[n.ZSTD = 1] = "ZSTD";
})(an || (an = {}));
class zt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsBodyCompression(t, e) {
    return (e || new zt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBodyCompression(t, e) {
    return t.setPosition(t.position() + M), (e || new zt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  /**
   * Compressor library.
   * For LZ4_FRAME, each compressed buffer must consist of a single frame.
   */
  codec() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt8(this.bb_pos + t) : an.LZ4_FRAME;
  }
  /**
   * Indicates the way the record batch body was compressed
   */
  method() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt8(this.bb_pos + t) : on.BUFFER;
  }
  static startBodyCompression(t) {
    t.startObject(2);
  }
  static addCodec(t, e) {
    t.addFieldInt8(0, e, an.LZ4_FRAME);
  }
  static addMethod(t, e) {
    t.addFieldInt8(1, e, on.BUFFER);
  }
  static endBodyCompression(t) {
    return t.endObject();
  }
  static createBodyCompression(t, e, i) {
    return zt.startBodyCompression(t), zt.addCodec(t, e), zt.addMethod(t, i), zt.endBodyCompression(t);
  }
}
class Os {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  /**
   * The relative offset into the shared memory page where the bytes for this
   * buffer starts
   */
  offset() {
    return this.bb.readInt64(this.bb_pos);
  }
  /**
   * The absolute length (in bytes) of the memory buffer. The memory is found
   * from offset (inclusive) to offset + length (non-inclusive). When building
   * messages using the encapsulated IPC message, padding bytes may be written
   * after a buffer, but such padding bytes do not need to be accounted for in
   * the size here.
   */
  length() {
    return this.bb.readInt64(this.bb_pos + 8);
  }
  static sizeOf() {
    return 16;
  }
  static createBuffer(t, e, i) {
    return t.prep(8, 16), t.writeInt64(BigInt(i ?? 0)), t.writeInt64(BigInt(e ?? 0)), t.offset();
  }
}
let Bs = class {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  /**
   * The number of value slots in the Arrow array at this level of a nested
   * tree
   */
  length() {
    return this.bb.readInt64(this.bb_pos);
  }
  /**
   * The number of observed nulls. Fields with null_count == 0 may choose not
   * to write their physical validity bitmap out as a materialized buffer,
   * instead setting the length of the bitmap buffer to 0.
   */
  nullCount() {
    return this.bb.readInt64(this.bb_pos + 8);
  }
  static sizeOf() {
    return 16;
  }
  static createFieldNode(t, e, i) {
    return t.prep(8, 16), t.writeInt64(BigInt(i ?? 0)), t.writeInt64(BigInt(e ?? 0)), t.offset();
  }
}, Dt = class si {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsRecordBatch(t, e) {
    return (e || new si()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsRecordBatch(t, e) {
    return t.setPosition(t.position() + M), (e || new si()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  /**
   * number of records / rows. The arrays in the batch should all have this
   * length
   */
  length() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt64(this.bb_pos + t) : BigInt("0");
  }
  /**
   * Nodes correspond to the pre-ordered flattened logical schema
   */
  nodes(t, e) {
    const i = this.bb.__offset(this.bb_pos, 6);
    return i ? (e || new Bs()).__init(this.bb.__vector(this.bb_pos + i) + t * 16, this.bb) : null;
  }
  nodesLength() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  /**
   * Buffers correspond to the pre-ordered flattened buffer tree
   *
   * The number of buffers appended to this list depends on the schema. For
   * example, most primitive arrays will have 2 buffers, 1 for the validity
   * bitmap and 1 for the values. For struct arrays, there will only be a
   * single buffer for the validity (nulls) bitmap
   */
  buffers(t, e) {
    const i = this.bb.__offset(this.bb_pos, 8);
    return i ? (e || new Os()).__init(this.bb.__vector(this.bb_pos + i) + t * 16, this.bb) : null;
  }
  buffersLength() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  /**
   * Optional compression of the message body
   */
  compression(t) {
    const e = this.bb.__offset(this.bb_pos, 10);
    return e ? (t || new zt()).__init(this.bb.__indirect(this.bb_pos + e), this.bb) : null;
  }
  static startRecordBatch(t) {
    t.startObject(4);
  }
  static addLength(t, e) {
    t.addFieldInt64(0, e, BigInt("0"));
  }
  static addNodes(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static startNodesVector(t, e) {
    t.startVector(16, e, 8);
  }
  static addBuffers(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static startBuffersVector(t, e) {
    t.startVector(16, e, 8);
  }
  static addCompression(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endRecordBatch(t) {
    return t.endObject();
  }
}, ne = class ri {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsDictionaryBatch(t, e) {
    return (e || new ri()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDictionaryBatch(t, e) {
    return t.setPosition(t.position() + M), (e || new ri()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt64(this.bb_pos + t) : BigInt("0");
  }
  data(t) {
    const e = this.bb.__offset(this.bb_pos, 6);
    return e ? (t || new Dt()).__init(this.bb.__indirect(this.bb_pos + e), this.bb) : null;
  }
  /**
   * If isDelta is true the values in the dictionary are to be appended to a
   * dictionary with the indicated id. If isDelta is false this dictionary
   * should replace the existing dictionary.
   */
  isDelta() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? !!this.bb.readInt8(this.bb_pos + t) : !1;
  }
  static startDictionaryBatch(t) {
    t.startObject(3);
  }
  static addId(t, e) {
    t.addFieldInt64(0, e, BigInt("0"));
  }
  static addData(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addIsDelta(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static endDictionaryBatch(t) {
    return t.endObject();
  }
};
var ge;
(function(n) {
  n[n.Little = 0] = "Little", n[n.Big = 1] = "Big";
})(ge || (ge = {}));
var cn;
(function(n) {
  n[n.DenseArray = 0] = "DenseArray";
})(cn || (cn = {}));
class ot {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsInt(t, e) {
    return (e || new ot()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsInt(t, e) {
    return t.setPosition(t.position() + M), (e || new ot()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  bitWidth() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isSigned() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? !!this.bb.readInt8(this.bb_pos + t) : !1;
  }
  static startInt(t) {
    t.startObject(2);
  }
  static addBitWidth(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addIsSigned(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static endInt(t) {
    return t.endObject();
  }
  static createInt(t, e, i) {
    return ot.startInt(t), ot.addBitWidth(t, e), ot.addIsSigned(t, i), ot.endInt(t);
  }
}
class Mt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsDictionaryEncoding(t, e) {
    return (e || new Mt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDictionaryEncoding(t, e) {
    return t.setPosition(t.position() + M), (e || new Mt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  /**
   * The known dictionary id in the application where this data is used. In
   * the file or streaming formats, the dictionary ids are found in the
   * DictionaryBatch messages
   */
  id() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt64(this.bb_pos + t) : BigInt("0");
  }
  /**
   * The dictionary indices are constrained to be non-negative integers. If
   * this field is null, the indices must be signed int32. To maximize
   * cross-language compatibility and performance, implementations are
   * recommended to prefer signed integer types over unsigned integer types
   * and to avoid uint64 indices unless they are required by an application.
   */
  indexType(t) {
    const e = this.bb.__offset(this.bb_pos, 6);
    return e ? (t || new ot()).__init(this.bb.__indirect(this.bb_pos + e), this.bb) : null;
  }
  /**
   * By default, dictionaries are not ordered, or the order does not have
   * semantic meaning. In some statistical, applications, dictionary-encoding
   * is used to represent ordered categorical data, and we provide a way to
   * preserve that metadata here
   */
  isOrdered() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? !!this.bb.readInt8(this.bb_pos + t) : !1;
  }
  dictionaryKind() {
    const t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt16(this.bb_pos + t) : cn.DenseArray;
  }
  static startDictionaryEncoding(t) {
    t.startObject(4);
  }
  static addId(t, e) {
    t.addFieldInt64(0, e, BigInt("0"));
  }
  static addIndexType(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addIsOrdered(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static addDictionaryKind(t, e) {
    t.addFieldInt16(3, e, cn.DenseArray);
  }
  static endDictionaryEncoding(t) {
    return t.endObject();
  }
}
class G {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsKeyValue(t, e) {
    return (e || new G()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsKeyValue(t, e) {
    return t.setPosition(t.position() + M), (e || new G()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  key(t) {
    const e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : null;
  }
  value(t) {
    const e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : null;
  }
  static startKeyValue(t) {
    t.startObject(2);
  }
  static addKey(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addValue(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endKeyValue(t) {
    return t.endObject();
  }
  static createKeyValue(t, e, i) {
    return G.startKeyValue(t), G.addKey(t, e), G.addValue(t, i), G.endKeyValue(t);
  }
}
let Hi = class Te {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsBinary(t, e) {
    return (e || new Te()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBinary(t, e) {
    return t.setPosition(t.position() + M), (e || new Te()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startBinary(t) {
    t.startObject(0);
  }
  static endBinary(t) {
    return t.endObject();
  }
  static createBinary(t) {
    return Te.startBinary(t), Te.endBinary(t);
  }
}, qi = class Oe {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsBool(t, e) {
    return (e || new Oe()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBool(t, e) {
    return t.setPosition(t.position() + M), (e || new Oe()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startBool(t) {
    t.startObject(0);
  }
  static endBool(t) {
    return t.endObject();
  }
  static createBool(t) {
    return Oe.startBool(t), Oe.endBool(t);
  }
}, Ke = class ie {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsDate(t, e) {
    return (e || new ie()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDate(t, e) {
    return t.setPosition(t.position() + M), (e || new ie()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  unit() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : ft.MILLISECOND;
  }
  static startDate(t) {
    t.startObject(1);
  }
  static addUnit(t, e) {
    t.addFieldInt16(0, e, ft.MILLISECOND);
  }
  static endDate(t) {
    return t.endObject();
  }
  static createDate(t, e) {
    return ie.startDate(t), ie.addUnit(t, e), ie.endDate(t);
  }
}, se = class jt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsDecimal(t, e) {
    return (e || new jt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDecimal(t, e) {
    return t.setPosition(t.position() + M), (e || new jt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  /**
   * Total number of decimal digits
   */
  precision() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  /**
   * Number of digits after the decimal point "."
   */
  scale() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  /**
   * Number of bits per value. The only accepted widths are 128 and 256.
   * We use bitWidth for consistency with Int::bitWidth.
   */
  bitWidth() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 128;
  }
  static startDecimal(t) {
    t.startObject(3);
  }
  static addPrecision(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addScale(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addBitWidth(t, e) {
    t.addFieldInt32(2, e, 128);
  }
  static endDecimal(t) {
    return t.endObject();
  }
  static createDecimal(t, e, i, s) {
    return jt.startDecimal(t), jt.addPrecision(t, e), jt.addScale(t, i), jt.addBitWidth(t, s), jt.endDecimal(t);
  }
}, Qe = class re {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsDuration(t, e) {
    return (e || new re()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDuration(t, e) {
    return t.setPosition(t.position() + M), (e || new re()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  unit() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : g.MILLISECOND;
  }
  static startDuration(t) {
    t.startObject(1);
  }
  static addUnit(t, e) {
    t.addFieldInt16(0, e, g.MILLISECOND);
  }
  static endDuration(t) {
    return t.endObject();
  }
  static createDuration(t, e) {
    return re.startDuration(t), re.addUnit(t, e), re.endDuration(t);
  }
}, Je = class oe {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsFixedSizeBinary(t, e) {
    return (e || new oe()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFixedSizeBinary(t, e) {
    return t.setPosition(t.position() + M), (e || new oe()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  /**
   * Number of bytes per value
   */
  byteWidth() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startFixedSizeBinary(t) {
    t.startObject(1);
  }
  static addByteWidth(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endFixedSizeBinary(t) {
    return t.endObject();
  }
  static createFixedSizeBinary(t, e) {
    return oe.startFixedSizeBinary(t), oe.addByteWidth(t, e), oe.endFixedSizeBinary(t);
  }
}, Ze = class ae {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsFixedSizeList(t, e) {
    return (e || new ae()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFixedSizeList(t, e) {
    return t.setPosition(t.position() + M), (e || new ae()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  /**
   * Number of list items per value
   */
  listSize() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startFixedSizeList(t) {
    t.startObject(1);
  }
  static addListSize(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endFixedSizeList(t) {
    return t.endObject();
  }
  static createFixedSizeList(t, e) {
    return ae.startFixedSizeList(t), ae.addListSize(t, e), ae.endFixedSizeList(t);
  }
};
class St {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsFloatingPoint(t, e) {
    return (e || new St()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFloatingPoint(t, e) {
    return t.setPosition(t.position() + M), (e || new St()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  precision() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : q.HALF;
  }
  static startFloatingPoint(t) {
    t.startObject(1);
  }
  static addPrecision(t, e) {
    t.addFieldInt16(0, e, q.HALF);
  }
  static endFloatingPoint(t) {
    return t.endObject();
  }
  static createFloatingPoint(t, e) {
    return St.startFloatingPoint(t), St.addPrecision(t, e), St.endFloatingPoint(t);
  }
}
class vt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsInterval(t, e) {
    return (e || new vt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsInterval(t, e) {
    return t.setPosition(t.position() + M), (e || new vt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  unit() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : Bt.YEAR_MONTH;
  }
  static startInterval(t) {
    t.startObject(1);
  }
  static addUnit(t, e) {
    t.addFieldInt16(0, e, Bt.YEAR_MONTH);
  }
  static endInterval(t) {
    return t.endObject();
  }
  static createInterval(t, e) {
    return vt.startInterval(t), vt.addUnit(t, e), vt.endInterval(t);
  }
}
let Ki = class Be {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsLargeBinary(t, e) {
    return (e || new Be()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsLargeBinary(t, e) {
    return t.setPosition(t.position() + M), (e || new Be()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startLargeBinary(t) {
    t.startObject(0);
  }
  static endLargeBinary(t) {
    return t.endObject();
  }
  static createLargeBinary(t) {
    return Be.startLargeBinary(t), Be.endLargeBinary(t);
  }
}, Qi = class Ae {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsLargeUtf8(t, e) {
    return (e || new Ae()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsLargeUtf8(t, e) {
    return t.setPosition(t.position() + M), (e || new Ae()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startLargeUtf8(t) {
    t.startObject(0);
  }
  static endLargeUtf8(t) {
    return t.endObject();
  }
  static createLargeUtf8(t) {
    return Ae.startLargeUtf8(t), Ae.endLargeUtf8(t);
  }
}, Ji = class Fe {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsList(t, e) {
    return (e || new Fe()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsList(t, e) {
    return t.setPosition(t.position() + M), (e || new Fe()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startList(t) {
    t.startObject(0);
  }
  static endList(t) {
    return t.endObject();
  }
  static createList(t) {
    return Fe.startList(t), Fe.endList(t);
  }
}, Xe = class ce {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsMap(t, e) {
    return (e || new ce()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsMap(t, e) {
    return t.setPosition(t.position() + M), (e || new ce()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  /**
   * Set to true if the keys within each value are sorted
   */
  keysSorted() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? !!this.bb.readInt8(this.bb_pos + t) : !1;
  }
  static startMap(t) {
    t.startObject(1);
  }
  static addKeysSorted(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static endMap(t) {
    return t.endObject();
  }
  static createMap(t, e) {
    return ce.startMap(t), ce.addKeysSorted(t, e), ce.endMap(t);
  }
}, Zi = class De {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsNull(t, e) {
    return (e || new De()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsNull(t, e) {
    return t.setPosition(t.position() + M), (e || new De()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startNull(t) {
    t.startObject(0);
  }
  static endNull(t) {
    return t.endObject();
  }
  static createNull(t) {
    return De.startNull(t), De.endNull(t);
  }
};
class Kt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsStruct_(t, e) {
    return (e || new Kt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsStruct_(t, e) {
    return t.setPosition(t.position() + M), (e || new Kt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startStruct_(t) {
    t.startObject(0);
  }
  static endStruct_(t) {
    return t.endObject();
  }
  static createStruct_(t) {
    return Kt.startStruct_(t), Kt.endStruct_(t);
  }
}
class ut {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsTime(t, e) {
    return (e || new ut()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTime(t, e) {
    return t.setPosition(t.position() + M), (e || new ut()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  unit() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : g.MILLISECOND;
  }
  bitWidth() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 32;
  }
  static startTime(t) {
    t.startObject(2);
  }
  static addUnit(t, e) {
    t.addFieldInt16(0, e, g.MILLISECOND);
  }
  static addBitWidth(t, e) {
    t.addFieldInt32(1, e, 32);
  }
  static endTime(t) {
    return t.endObject();
  }
  static createTime(t, e, i) {
    return ut.startTime(t), ut.addUnit(t, e), ut.addBitWidth(t, i), ut.endTime(t);
  }
}
class lt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsTimestamp(t, e) {
    return (e || new lt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTimestamp(t, e) {
    return t.setPosition(t.position() + M), (e || new lt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  unit() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : g.SECOND;
  }
  timezone(t) {
    const e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : null;
  }
  static startTimestamp(t) {
    t.startObject(2);
  }
  static addUnit(t, e) {
    t.addFieldInt16(0, e, g.SECOND);
  }
  static addTimezone(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endTimestamp(t) {
    return t.endObject();
  }
  static createTimestamp(t, e, i) {
    return lt.startTimestamp(t), lt.addUnit(t, e), lt.addTimezone(t, i), lt.endTimestamp(t);
  }
}
class et {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsUnion(t, e) {
    return (e || new et()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsUnion(t, e) {
    return t.setPosition(t.position() + M), (e || new et()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  mode() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : K.Sparse;
  }
  typeIds(t) {
    const e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4) : 0;
  }
  typeIdsLength() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  typeIdsArray() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t)) : null;
  }
  static startUnion(t) {
    t.startObject(2);
  }
  static addMode(t, e) {
    t.addFieldInt16(0, e, K.Sparse);
  }
  static addTypeIds(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createTypeIdsVector(t, e) {
    t.startVector(4, e.length, 4);
    for (let i = e.length - 1; i >= 0; i--)
      t.addInt32(e[i]);
    return t.endVector();
  }
  static startTypeIdsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endUnion(t) {
    return t.endObject();
  }
  static createUnion(t, e, i) {
    return et.startUnion(t), et.addMode(t, e), et.addTypeIds(t, i), et.endUnion(t);
  }
}
let Xi = class Re {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsUtf8(t, e) {
    return (e || new Re()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsUtf8(t, e) {
    return t.setPosition(t.position() + M), (e || new Re()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startUtf8(t) {
    t.startObject(0);
  }
  static endUtf8(t) {
    return t.endObject();
  }
  static createUtf8(t) {
    return Re.startUtf8(t), Re.endUtf8(t);
  }
};
var x;
(function(n) {
  n[n.NONE = 0] = "NONE", n[n.Null = 1] = "Null", n[n.Int = 2] = "Int", n[n.FloatingPoint = 3] = "FloatingPoint", n[n.Binary = 4] = "Binary", n[n.Utf8 = 5] = "Utf8", n[n.Bool = 6] = "Bool", n[n.Decimal = 7] = "Decimal", n[n.Date = 8] = "Date", n[n.Time = 9] = "Time", n[n.Timestamp = 10] = "Timestamp", n[n.Interval = 11] = "Interval", n[n.List = 12] = "List", n[n.Struct_ = 13] = "Struct_", n[n.Union = 14] = "Union", n[n.FixedSizeBinary = 15] = "FixedSizeBinary", n[n.FixedSizeList = 16] = "FixedSizeList", n[n.Map = 17] = "Map", n[n.Duration = 18] = "Duration", n[n.LargeBinary = 19] = "LargeBinary", n[n.LargeUtf8 = 20] = "LargeUtf8", n[n.LargeList = 21] = "LargeList", n[n.RunEndEncoded = 22] = "RunEndEncoded";
})(x || (x = {}));
let ct = class tn {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsField(t, e) {
    return (e || new tn()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsField(t, e) {
    return t.setPosition(t.position() + M), (e || new tn()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  name(t) {
    const e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : null;
  }
  /**
   * Whether or not this field can contain nulls. Should be true in general.
   */
  nullable() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? !!this.bb.readInt8(this.bb_pos + t) : !1;
  }
  typeType() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readUint8(this.bb_pos + t) : x.NONE;
  }
  /**
   * This is the type of the decoded value if the field is dictionary encoded.
   */
  type(t) {
    const e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.__union(t, this.bb_pos + e) : null;
  }
  /**
   * Present only if the field is dictionary encoded.
   */
  dictionary(t) {
    const e = this.bb.__offset(this.bb_pos, 12);
    return e ? (t || new Mt()).__init(this.bb.__indirect(this.bb_pos + e), this.bb) : null;
  }
  /**
   * children apply only to nested data types like Struct, List and Union. For
   * primitive types children will have length 0.
   */
  children(t, e) {
    const i = this.bb.__offset(this.bb_pos, 14);
    return i ? (e || new tn()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb) : null;
  }
  childrenLength() {
    const t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  /**
   * User-defined metadata
   */
  customMetadata(t, e) {
    const i = this.bb.__offset(this.bb_pos, 16);
    return i ? (e || new G()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb) : null;
  }
  customMetadataLength() {
    const t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startField(t) {
    t.startObject(7);
  }
  static addName(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addNullable(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static addTypeType(t, e) {
    t.addFieldInt8(2, e, x.NONE);
  }
  static addType(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addDictionary(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static addChildren(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static createChildrenVector(t, e) {
    t.startVector(4, e.length, 4);
    for (let i = e.length - 1; i >= 0; i--)
      t.addOffset(e[i]);
    return t.endVector();
  }
  static startChildrenVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addCustomMetadata(t, e) {
    t.addFieldOffset(6, e, 0);
  }
  static createCustomMetadataVector(t, e) {
    t.startVector(4, e.length, 4);
    for (let i = e.length - 1; i >= 0; i--)
      t.addOffset(e[i]);
    return t.endVector();
  }
  static startCustomMetadataVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endField(t) {
    return t.endObject();
  }
}, bt = class Ft {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsSchema(t, e) {
    return (e || new Ft()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSchema(t, e) {
    return t.setPosition(t.position() + M), (e || new Ft()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  /**
   * endianness of the buffer
   * it is Little Endian by default
   * if endianness doesn't match the underlying system then the vectors need to be converted
   */
  endianness() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : ge.Little;
  }
  fields(t, e) {
    const i = this.bb.__offset(this.bb_pos, 6);
    return i ? (e || new ct()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb) : null;
  }
  fieldsLength() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  customMetadata(t, e) {
    const i = this.bb.__offset(this.bb_pos, 8);
    return i ? (e || new G()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb) : null;
  }
  customMetadataLength() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  /**
   * Features used in the stream/file.
   */
  features(t) {
    const e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.readInt64(this.bb.__vector(this.bb_pos + e) + t * 8) : BigInt(0);
  }
  featuresLength() {
    const t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startSchema(t) {
    t.startObject(4);
  }
  static addEndianness(t, e) {
    t.addFieldInt16(0, e, ge.Little);
  }
  static addFields(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createFieldsVector(t, e) {
    t.startVector(4, e.length, 4);
    for (let i = e.length - 1; i >= 0; i--)
      t.addOffset(e[i]);
    return t.endVector();
  }
  static startFieldsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addCustomMetadata(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createCustomMetadataVector(t, e) {
    t.startVector(4, e.length, 4);
    for (let i = e.length - 1; i >= 0; i--)
      t.addOffset(e[i]);
    return t.endVector();
  }
  static startCustomMetadataVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addFeatures(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static createFeaturesVector(t, e) {
    t.startVector(8, e.length, 8);
    for (let i = e.length - 1; i >= 0; i--)
      t.addInt64(e[i]);
    return t.endVector();
  }
  static startFeaturesVector(t, e) {
    t.startVector(8, e, 8);
  }
  static endSchema(t) {
    return t.endObject();
  }
  static finishSchemaBuffer(t, e) {
    t.finish(e);
  }
  static finishSizePrefixedSchemaBuffer(t, e) {
    t.finish(e, void 0, !0);
  }
  static createSchema(t, e, i, s, r) {
    return Ft.startSchema(t), Ft.addEndianness(t, e), Ft.addFields(t, i), Ft.addCustomMetadata(t, s), Ft.addFeatures(t, r), Ft.endSchema(t);
  }
};
var R;
(function(n) {
  n[n.NONE = 0] = "NONE", n[n.Schema = 1] = "Schema", n[n.DictionaryBatch = 2] = "DictionaryBatch", n[n.RecordBatch = 3] = "RecordBatch", n[n.Tensor = 4] = "Tensor", n[n.SparseTensor = 5] = "SparseTensor";
})(R || (R = {}));
var c;
(function(n) {
  n[n.NONE = 0] = "NONE", n[n.Null = 1] = "Null", n[n.Int = 2] = "Int", n[n.Float = 3] = "Float", n[n.Binary = 4] = "Binary", n[n.Utf8 = 5] = "Utf8", n[n.Bool = 6] = "Bool", n[n.Decimal = 7] = "Decimal", n[n.Date = 8] = "Date", n[n.Time = 9] = "Time", n[n.Timestamp = 10] = "Timestamp", n[n.Interval = 11] = "Interval", n[n.List = 12] = "List", n[n.Struct = 13] = "Struct", n[n.Union = 14] = "Union", n[n.FixedSizeBinary = 15] = "FixedSizeBinary", n[n.FixedSizeList = 16] = "FixedSizeList", n[n.Map = 17] = "Map", n[n.Duration = 18] = "Duration", n[n.LargeBinary = 19] = "LargeBinary", n[n.LargeUtf8 = 20] = "LargeUtf8", n[n.Dictionary = -1] = "Dictionary", n[n.Int8 = -2] = "Int8", n[n.Int16 = -3] = "Int16", n[n.Int32 = -4] = "Int32", n[n.Int64 = -5] = "Int64", n[n.Uint8 = -6] = "Uint8", n[n.Uint16 = -7] = "Uint16", n[n.Uint32 = -8] = "Uint32", n[n.Uint64 = -9] = "Uint64", n[n.Float16 = -10] = "Float16", n[n.Float32 = -11] = "Float32", n[n.Float64 = -12] = "Float64", n[n.DateDay = -13] = "DateDay", n[n.DateMillisecond = -14] = "DateMillisecond", n[n.TimestampSecond = -15] = "TimestampSecond", n[n.TimestampMillisecond = -16] = "TimestampMillisecond", n[n.TimestampMicrosecond = -17] = "TimestampMicrosecond", n[n.TimestampNanosecond = -18] = "TimestampNanosecond", n[n.TimeSecond = -19] = "TimeSecond", n[n.TimeMillisecond = -20] = "TimeMillisecond", n[n.TimeMicrosecond = -21] = "TimeMicrosecond", n[n.TimeNanosecond = -22] = "TimeNanosecond", n[n.DenseUnion = -23] = "DenseUnion", n[n.SparseUnion = -24] = "SparseUnion", n[n.IntervalDayTime = -25] = "IntervalDayTime", n[n.IntervalYearMonth = -26] = "IntervalYearMonth", n[n.DurationSecond = -27] = "DurationSecond", n[n.DurationMillisecond = -28] = "DurationMillisecond", n[n.DurationMicrosecond = -29] = "DurationMicrosecond", n[n.DurationNanosecond = -30] = "DurationNanosecond";
})(c || (c = {}));
var Rt;
(function(n) {
  n[n.OFFSET = 0] = "OFFSET", n[n.DATA = 1] = "DATA", n[n.VALIDITY = 2] = "VALIDITY", n[n.TYPE = 3] = "TYPE";
})(Rt || (Rt = {}));
const jo = void 0;
function Me(n) {
  if (n === null)
    return "null";
  if (n === jo)
    return "undefined";
  switch (typeof n) {
    case "number":
      return `${n}`;
    case "bigint":
      return `${n}`;
    case "string":
      return `"${n}"`;
  }
  return typeof n[Symbol.toPrimitive] == "function" ? n[Symbol.toPrimitive]("string") : ArrayBuffer.isView(n) ? n instanceof BigInt64Array || n instanceof BigUint64Array ? `[${[...n].map((t) => Me(t))}]` : `[${n}]` : ArrayBuffer.isView(n) ? `[${n}]` : JSON.stringify(n, (t, e) => typeof e == "bigint" ? `${e}` : e);
}
function P(n) {
  if (typeof n == "bigint" && (n < Number.MIN_SAFE_INTEGER || n > Number.MAX_SAFE_INTEGER))
    throw new TypeError(`${n} is not safe to convert to a number.`);
  return Number(n);
}
function As(n, t) {
  return P(n / t) + P(n % t) / P(t);
}
const Vo = Symbol.for("isArrowBigNum");
function _t(n, ...t) {
  return t.length === 0 ? Object.setPrototypeOf(C(this.TypedArray, n), this.constructor.prototype) : Object.setPrototypeOf(new this.TypedArray(n, ...t), this.constructor.prototype);
}
_t.prototype[Vo] = !0;
_t.prototype.toJSON = function() {
  return `"${ke(this)}"`;
};
_t.prototype.valueOf = function(n) {
  return Fs(this, n);
};
_t.prototype.toString = function() {
  return ke(this);
};
_t.prototype[Symbol.toPrimitive] = function(n = "default") {
  switch (n) {
    case "number":
      return Fs(this);
    case "string":
      return ke(this);
    case "default":
      return Yo(this);
  }
  return ke(this);
};
function fe(...n) {
  return _t.apply(this, n);
}
function pe(...n) {
  return _t.apply(this, n);
}
function Ue(...n) {
  return _t.apply(this, n);
}
Object.setPrototypeOf(fe.prototype, Object.create(Int32Array.prototype));
Object.setPrototypeOf(pe.prototype, Object.create(Uint32Array.prototype));
Object.setPrototypeOf(Ue.prototype, Object.create(Uint32Array.prototype));
Object.assign(fe.prototype, _t.prototype, { constructor: fe, signed: !0, TypedArray: Int32Array, BigIntArray: BigInt64Array });
Object.assign(pe.prototype, _t.prototype, { constructor: pe, signed: !1, TypedArray: Uint32Array, BigIntArray: BigUint64Array });
Object.assign(Ue.prototype, _t.prototype, { constructor: Ue, signed: !0, TypedArray: Uint32Array, BigIntArray: BigUint64Array });
const zo = BigInt(4294967296) * BigInt(4294967296), $o = zo - BigInt(1);
function Fs(n, t) {
  const { buffer: e, byteOffset: i, byteLength: s, signed: r } = n, o = new BigUint64Array(e, i, s / 8), a = r && o.at(-1) & BigInt(1) << BigInt(63);
  let d = BigInt(0), u = 0;
  if (a) {
    for (const l of o)
      d |= (l ^ $o) * (BigInt(1) << BigInt(64 * u++));
    d *= BigInt(-1), d -= BigInt(1);
  } else
    for (const l of o)
      d |= l * (BigInt(1) << BigInt(64 * u++));
  if (typeof t == "number") {
    const l = BigInt(Math.pow(10, t)), h = d / l, $ = d % l;
    return P(h) + P($) / P(l);
  }
  return P(d);
}
function ke(n) {
  if (n.byteLength === 8)
    return `${new n.BigIntArray(n.buffer, n.byteOffset, 1)[0]}`;
  if (!n.signed)
    return Wn(n);
  let t = new Uint16Array(n.buffer, n.byteOffset, n.byteLength / 2);
  if (new Int16Array([t.at(-1)])[0] >= 0)
    return Wn(n);
  t = t.slice();
  let i = 1;
  for (let r = 0; r < t.length; r++) {
    const o = t[r], a = ~o + i;
    t[r] = a, i &= o === 0 ? 1 : 0;
  }
  return `-${Wn(t)}`;
}
function Yo(n) {
  return n.byteLength === 8 ? new n.BigIntArray(n.buffer, n.byteOffset, 1)[0] : ke(n);
}
function Wn(n) {
  let t = "";
  const e = new Uint32Array(2);
  let i = new Uint16Array(n.buffer, n.byteOffset, n.byteLength / 2);
  const s = new Uint32Array((i = new Uint16Array(i).reverse()).buffer);
  let r = -1;
  const o = i.length - 1;
  do {
    for (e[0] = i[r = 0]; r < o; )
      i[r++] = e[1] = e[0] / 10, e[0] = (e[0] - e[1] * 10 << 16) + i[r];
    i[r] = e[1] = e[0] / 10, e[0] = e[0] - e[1] * 10, t = `${e[0]}${t}`;
  } while (s[0] || s[1] || s[2] || s[3]);
  return t ?? "0";
}
class _i {
  /** @nocollapse */
  static new(t, e) {
    switch (e) {
      case !0:
        return new fe(t);
      case !1:
        return new pe(t);
    }
    switch (t.constructor) {
      case Int8Array:
      case Int16Array:
      case Int32Array:
      case BigInt64Array:
        return new fe(t);
    }
    return t.byteLength === 16 ? new Ue(t) : new pe(t);
  }
  /** @nocollapse */
  static signed(t) {
    return new fe(t);
  }
  /** @nocollapse */
  static unsigned(t) {
    return new pe(t);
  }
  /** @nocollapse */
  static decimal(t) {
    return new Ue(t);
  }
  constructor(t, e) {
    return _i.new(t, e);
  }
}
var Ds, Rs, Ns, Ls, Ms, Us, ks, Cs, Ps, xs, js, Vs, zs, $s, Ys, Ws, Gs, Hs, qs, Ks, Qs, Js;
class f {
  /** @nocollapse */
  static isNull(t) {
    return (t == null ? void 0 : t.typeId) === c.Null;
  }
  /** @nocollapse */
  static isInt(t) {
    return (t == null ? void 0 : t.typeId) === c.Int;
  }
  /** @nocollapse */
  static isFloat(t) {
    return (t == null ? void 0 : t.typeId) === c.Float;
  }
  /** @nocollapse */
  static isBinary(t) {
    return (t == null ? void 0 : t.typeId) === c.Binary;
  }
  /** @nocollapse */
  static isLargeBinary(t) {
    return (t == null ? void 0 : t.typeId) === c.LargeBinary;
  }
  /** @nocollapse */
  static isUtf8(t) {
    return (t == null ? void 0 : t.typeId) === c.Utf8;
  }
  /** @nocollapse */
  static isLargeUtf8(t) {
    return (t == null ? void 0 : t.typeId) === c.LargeUtf8;
  }
  /** @nocollapse */
  static isBool(t) {
    return (t == null ? void 0 : t.typeId) === c.Bool;
  }
  /** @nocollapse */
  static isDecimal(t) {
    return (t == null ? void 0 : t.typeId) === c.Decimal;
  }
  /** @nocollapse */
  static isDate(t) {
    return (t == null ? void 0 : t.typeId) === c.Date;
  }
  /** @nocollapse */
  static isTime(t) {
    return (t == null ? void 0 : t.typeId) === c.Time;
  }
  /** @nocollapse */
  static isTimestamp(t) {
    return (t == null ? void 0 : t.typeId) === c.Timestamp;
  }
  /** @nocollapse */
  static isInterval(t) {
    return (t == null ? void 0 : t.typeId) === c.Interval;
  }
  /** @nocollapse */
  static isDuration(t) {
    return (t == null ? void 0 : t.typeId) === c.Duration;
  }
  /** @nocollapse */
  static isList(t) {
    return (t == null ? void 0 : t.typeId) === c.List;
  }
  /** @nocollapse */
  static isStruct(t) {
    return (t == null ? void 0 : t.typeId) === c.Struct;
  }
  /** @nocollapse */
  static isUnion(t) {
    return (t == null ? void 0 : t.typeId) === c.Union;
  }
  /** @nocollapse */
  static isFixedSizeBinary(t) {
    return (t == null ? void 0 : t.typeId) === c.FixedSizeBinary;
  }
  /** @nocollapse */
  static isFixedSizeList(t) {
    return (t == null ? void 0 : t.typeId) === c.FixedSizeList;
  }
  /** @nocollapse */
  static isMap(t) {
    return (t == null ? void 0 : t.typeId) === c.Map;
  }
  /** @nocollapse */
  static isDictionary(t) {
    return (t == null ? void 0 : t.typeId) === c.Dictionary;
  }
  /** @nocollapse */
  static isDenseUnion(t) {
    return f.isUnion(t) && t.mode === K.Dense;
  }
  /** @nocollapse */
  static isSparseUnion(t) {
    return f.isUnion(t) && t.mode === K.Sparse;
  }
  constructor(t) {
    this.typeId = t;
  }
}
Ds = Symbol.toStringTag;
f[Ds] = ((n) => (n.children = null, n.ArrayType = Array, n.OffsetArrayType = Int32Array, n[Symbol.toStringTag] = "DataType"))(f.prototype);
class $t extends f {
  constructor() {
    super(c.Null);
  }
  toString() {
    return "Null";
  }
}
Rs = Symbol.toStringTag;
$t[Rs] = ((n) => n[Symbol.toStringTag] = "Null")($t.prototype);
class Zt extends f {
  constructor(t, e) {
    super(c.Int), this.isSigned = t, this.bitWidth = e;
  }
  get ArrayType() {
    switch (this.bitWidth) {
      case 8:
        return this.isSigned ? Int8Array : Uint8Array;
      case 16:
        return this.isSigned ? Int16Array : Uint16Array;
      case 32:
        return this.isSigned ? Int32Array : Uint32Array;
      case 64:
        return this.isSigned ? BigInt64Array : BigUint64Array;
    }
    throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`);
  }
  toString() {
    return `${this.isSigned ? "I" : "Ui"}nt${this.bitWidth}`;
  }
}
Ns = Symbol.toStringTag;
Zt[Ns] = ((n) => (n.isSigned = null, n.bitWidth = null, n[Symbol.toStringTag] = "Int"))(Zt.prototype);
class Ce extends Zt {
  constructor() {
    super(!0, 32);
  }
  get ArrayType() {
    return Int32Array;
  }
}
Object.defineProperty(Ce.prototype, "ArrayType", { value: Int32Array });
class dn extends f {
  constructor(t) {
    super(c.Float), this.precision = t;
  }
  get ArrayType() {
    switch (this.precision) {
      case q.HALF:
        return Uint16Array;
      case q.SINGLE:
        return Float32Array;
      case q.DOUBLE:
        return Float64Array;
    }
    throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`);
  }
  toString() {
    return `Float${this.precision << 5 || 16}`;
  }
}
Ls = Symbol.toStringTag;
dn[Ls] = ((n) => (n.precision = null, n[Symbol.toStringTag] = "Float"))(dn.prototype);
class un extends f {
  constructor() {
    super(c.Binary);
  }
  toString() {
    return "Binary";
  }
}
Ms = Symbol.toStringTag;
un[Ms] = ((n) => (n.ArrayType = Uint8Array, n[Symbol.toStringTag] = "Binary"))(un.prototype);
class ln extends f {
  constructor() {
    super(c.LargeBinary);
  }
  toString() {
    return "LargeBinary";
  }
}
Us = Symbol.toStringTag;
ln[Us] = ((n) => (n.ArrayType = Uint8Array, n.OffsetArrayType = BigInt64Array, n[Symbol.toStringTag] = "LargeBinary"))(ln.prototype);
class hn extends f {
  constructor() {
    super(c.Utf8);
  }
  toString() {
    return "Utf8";
  }
}
ks = Symbol.toStringTag;
hn[ks] = ((n) => (n.ArrayType = Uint8Array, n[Symbol.toStringTag] = "Utf8"))(hn.prototype);
class fn extends f {
  constructor() {
    super(c.LargeUtf8);
  }
  toString() {
    return "LargeUtf8";
  }
}
Cs = Symbol.toStringTag;
fn[Cs] = ((n) => (n.ArrayType = Uint8Array, n.OffsetArrayType = BigInt64Array, n[Symbol.toStringTag] = "LargeUtf8"))(fn.prototype);
class pn extends f {
  constructor() {
    super(c.Bool);
  }
  toString() {
    return "Bool";
  }
}
Ps = Symbol.toStringTag;
pn[Ps] = ((n) => (n.ArrayType = Uint8Array, n[Symbol.toStringTag] = "Bool"))(pn.prototype);
class yn extends f {
  constructor(t, e, i = 128) {
    super(c.Decimal), this.scale = t, this.precision = e, this.bitWidth = i;
  }
  toString() {
    return `Decimal[${this.precision}e${this.scale > 0 ? "+" : ""}${this.scale}]`;
  }
}
xs = Symbol.toStringTag;
yn[xs] = ((n) => (n.scale = null, n.precision = null, n.ArrayType = Uint32Array, n[Symbol.toStringTag] = "Decimal"))(yn.prototype);
class mn extends f {
  constructor(t) {
    super(c.Date), this.unit = t;
  }
  toString() {
    return `Date${(this.unit + 1) * 32}<${ft[this.unit]}>`;
  }
  get ArrayType() {
    return this.unit === ft.DAY ? Int32Array : BigInt64Array;
  }
}
js = Symbol.toStringTag;
mn[js] = ((n) => (n.unit = null, n[Symbol.toStringTag] = "Date"))(mn.prototype);
class _n extends f {
  constructor(t, e) {
    super(c.Time), this.unit = t, this.bitWidth = e;
  }
  toString() {
    return `Time${this.bitWidth}<${g[this.unit]}>`;
  }
  get ArrayType() {
    switch (this.bitWidth) {
      case 32:
        return Int32Array;
      case 64:
        return BigInt64Array;
    }
    throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`);
  }
}
Vs = Symbol.toStringTag;
_n[Vs] = ((n) => (n.unit = null, n.bitWidth = null, n[Symbol.toStringTag] = "Time"))(_n.prototype);
class gn extends f {
  constructor(t, e) {
    super(c.Timestamp), this.unit = t, this.timezone = e;
  }
  toString() {
    return `Timestamp<${g[this.unit]}${this.timezone ? `, ${this.timezone}` : ""}>`;
  }
}
zs = Symbol.toStringTag;
gn[zs] = ((n) => (n.unit = null, n.timezone = null, n.ArrayType = BigInt64Array, n[Symbol.toStringTag] = "Timestamp"))(gn.prototype);
class bn extends f {
  constructor(t) {
    super(c.Interval), this.unit = t;
  }
  toString() {
    return `Interval<${Bt[this.unit]}>`;
  }
}
$s = Symbol.toStringTag;
bn[$s] = ((n) => (n.unit = null, n.ArrayType = Int32Array, n[Symbol.toStringTag] = "Interval"))(bn.prototype);
class In extends f {
  constructor(t) {
    super(c.Duration), this.unit = t;
  }
  toString() {
    return `Duration<${g[this.unit]}>`;
  }
}
Ys = Symbol.toStringTag;
In[Ys] = ((n) => (n.unit = null, n.ArrayType = BigInt64Array, n[Symbol.toStringTag] = "Duration"))(In.prototype);
class wn extends f {
  constructor(t) {
    super(c.List), this.children = [t];
  }
  toString() {
    return `List<${this.valueType}>`;
  }
  get valueType() {
    return this.children[0].type;
  }
  get valueField() {
    return this.children[0];
  }
  get ArrayType() {
    return this.valueType.ArrayType;
  }
}
Ws = Symbol.toStringTag;
wn[Ws] = ((n) => (n.children = null, n[Symbol.toStringTag] = "List"))(wn.prototype);
class J extends f {
  constructor(t) {
    super(c.Struct), this.children = t;
  }
  toString() {
    return `Struct<{${this.children.map((t) => `${t.name}:${t.type}`).join(", ")}}>`;
  }
}
Gs = Symbol.toStringTag;
J[Gs] = ((n) => (n.children = null, n[Symbol.toStringTag] = "Struct"))(J.prototype);
class Sn extends f {
  constructor(t, e, i) {
    super(c.Union), this.mode = t, this.children = i, this.typeIds = e = Int32Array.from(e), this.typeIdToChildIndex = e.reduce((s, r, o) => (s[r] = o) && s || s, /* @__PURE__ */ Object.create(null));
  }
  toString() {
    return `${this[Symbol.toStringTag]}<${this.children.map((t) => `${t.type}`).join(" | ")}>`;
  }
}
Hs = Symbol.toStringTag;
Sn[Hs] = ((n) => (n.mode = null, n.typeIds = null, n.children = null, n.typeIdToChildIndex = null, n.ArrayType = Int8Array, n[Symbol.toStringTag] = "Union"))(Sn.prototype);
class vn extends f {
  constructor(t) {
    super(c.FixedSizeBinary), this.byteWidth = t;
  }
  toString() {
    return `FixedSizeBinary[${this.byteWidth}]`;
  }
}
qs = Symbol.toStringTag;
vn[qs] = ((n) => (n.byteWidth = null, n.ArrayType = Uint8Array, n[Symbol.toStringTag] = "FixedSizeBinary"))(vn.prototype);
class En extends f {
  constructor(t, e) {
    super(c.FixedSizeList), this.listSize = t, this.children = [e];
  }
  get valueType() {
    return this.children[0].type;
  }
  get valueField() {
    return this.children[0];
  }
  get ArrayType() {
    return this.valueType.ArrayType;
  }
  toString() {
    return `FixedSizeList[${this.listSize}]<${this.valueType}>`;
  }
}
Ks = Symbol.toStringTag;
En[Ks] = ((n) => (n.children = null, n.listSize = null, n[Symbol.toStringTag] = "FixedSizeList"))(En.prototype);
class Tn extends f {
  constructor(t, e = !1) {
    var i, s, r;
    if (super(c.Map), this.children = [t], this.keysSorted = e, t && (t.name = "entries", !((i = t == null ? void 0 : t.type) === null || i === void 0) && i.children)) {
      const o = (s = t == null ? void 0 : t.type) === null || s === void 0 ? void 0 : s.children[0];
      o && (o.name = "key");
      const a = (r = t == null ? void 0 : t.type) === null || r === void 0 ? void 0 : r.children[1];
      a && (a.name = "value");
    }
  }
  get keyType() {
    return this.children[0].type.children[0].type;
  }
  get valueType() {
    return this.children[0].type.children[1].type;
  }
  get childType() {
    return this.children[0].type;
  }
  toString() {
    return `Map<{${this.children[0].type.children.map((t) => `${t.name}:${t.type}`).join(", ")}}>`;
  }
}
Qs = Symbol.toStringTag;
Tn[Qs] = ((n) => (n.children = null, n.keysSorted = null, n[Symbol.toStringTag] = "Map_"))(Tn.prototype);
const Wo = /* @__PURE__ */ ((n) => () => ++n)(-1);
class be extends f {
  constructor(t, e, i, s) {
    super(c.Dictionary), this.indices = e, this.dictionary = t, this.isOrdered = s || !1, this.id = i == null ? Wo() : P(i);
  }
  get children() {
    return this.dictionary.children;
  }
  get valueType() {
    return this.dictionary;
  }
  get ArrayType() {
    return this.dictionary.ArrayType;
  }
  toString() {
    return `Dictionary<${this.indices}, ${this.dictionary}>`;
  }
}
Js = Symbol.toStringTag;
be[Js] = ((n) => (n.id = null, n.indices = null, n.isOrdered = null, n.dictionary = null, n[Symbol.toStringTag] = "Dictionary"))(be.prototype);
function Nt(n) {
  const t = n;
  switch (n.typeId) {
    case c.Decimal:
      return n.bitWidth / 32;
    case c.Interval:
      return 1 + t.unit;
    // case Type.Int: return 1 + +((t as Int_).bitWidth > 32);
    // case Type.Time: return 1 + +((t as Time_).bitWidth > 32);
    case c.FixedSizeList:
      return t.listSize;
    case c.FixedSizeBinary:
      return t.byteWidth;
    default:
      return 1;
  }
}
class O {
  visitMany(t, ...e) {
    return t.map((i, s) => this.visit(i, ...e.map((r) => r[s])));
  }
  visit(...t) {
    return this.getVisitFn(t[0], !1).apply(this, t);
  }
  getVisitFn(t, e = !0) {
    return Go(this, t, e);
  }
  getVisitFnByTypeId(t, e = !0) {
    return de(this, t, e);
  }
  visitNull(t, ...e) {
    return null;
  }
  visitBool(t, ...e) {
    return null;
  }
  visitInt(t, ...e) {
    return null;
  }
  visitFloat(t, ...e) {
    return null;
  }
  visitUtf8(t, ...e) {
    return null;
  }
  visitLargeUtf8(t, ...e) {
    return null;
  }
  visitBinary(t, ...e) {
    return null;
  }
  visitLargeBinary(t, ...e) {
    return null;
  }
  visitFixedSizeBinary(t, ...e) {
    return null;
  }
  visitDate(t, ...e) {
    return null;
  }
  visitTimestamp(t, ...e) {
    return null;
  }
  visitTime(t, ...e) {
    return null;
  }
  visitDecimal(t, ...e) {
    return null;
  }
  visitList(t, ...e) {
    return null;
  }
  visitStruct(t, ...e) {
    return null;
  }
  visitUnion(t, ...e) {
    return null;
  }
  visitDictionary(t, ...e) {
    return null;
  }
  visitInterval(t, ...e) {
    return null;
  }
  visitDuration(t, ...e) {
    return null;
  }
  visitFixedSizeList(t, ...e) {
    return null;
  }
  visitMap(t, ...e) {
    return null;
  }
}
function Go(n, t, e = !0) {
  return typeof t == "number" ? de(n, t, e) : typeof t == "string" && t in c ? de(n, c[t], e) : t && t instanceof f ? de(n, ts(t), e) : t != null && t.type && t.type instanceof f ? de(n, ts(t.type), e) : de(n, c.NONE, e);
}
function de(n, t, e = !0) {
  let i = null;
  switch (t) {
    case c.Null:
      i = n.visitNull;
      break;
    case c.Bool:
      i = n.visitBool;
      break;
    case c.Int:
      i = n.visitInt;
      break;
    case c.Int8:
      i = n.visitInt8 || n.visitInt;
      break;
    case c.Int16:
      i = n.visitInt16 || n.visitInt;
      break;
    case c.Int32:
      i = n.visitInt32 || n.visitInt;
      break;
    case c.Int64:
      i = n.visitInt64 || n.visitInt;
      break;
    case c.Uint8:
      i = n.visitUint8 || n.visitInt;
      break;
    case c.Uint16:
      i = n.visitUint16 || n.visitInt;
      break;
    case c.Uint32:
      i = n.visitUint32 || n.visitInt;
      break;
    case c.Uint64:
      i = n.visitUint64 || n.visitInt;
      break;
    case c.Float:
      i = n.visitFloat;
      break;
    case c.Float16:
      i = n.visitFloat16 || n.visitFloat;
      break;
    case c.Float32:
      i = n.visitFloat32 || n.visitFloat;
      break;
    case c.Float64:
      i = n.visitFloat64 || n.visitFloat;
      break;
    case c.Utf8:
      i = n.visitUtf8;
      break;
    case c.LargeUtf8:
      i = n.visitLargeUtf8;
      break;
    case c.Binary:
      i = n.visitBinary;
      break;
    case c.LargeBinary:
      i = n.visitLargeBinary;
      break;
    case c.FixedSizeBinary:
      i = n.visitFixedSizeBinary;
      break;
    case c.Date:
      i = n.visitDate;
      break;
    case c.DateDay:
      i = n.visitDateDay || n.visitDate;
      break;
    case c.DateMillisecond:
      i = n.visitDateMillisecond || n.visitDate;
      break;
    case c.Timestamp:
      i = n.visitTimestamp;
      break;
    case c.TimestampSecond:
      i = n.visitTimestampSecond || n.visitTimestamp;
      break;
    case c.TimestampMillisecond:
      i = n.visitTimestampMillisecond || n.visitTimestamp;
      break;
    case c.TimestampMicrosecond:
      i = n.visitTimestampMicrosecond || n.visitTimestamp;
      break;
    case c.TimestampNanosecond:
      i = n.visitTimestampNanosecond || n.visitTimestamp;
      break;
    case c.Time:
      i = n.visitTime;
      break;
    case c.TimeSecond:
      i = n.visitTimeSecond || n.visitTime;
      break;
    case c.TimeMillisecond:
      i = n.visitTimeMillisecond || n.visitTime;
      break;
    case c.TimeMicrosecond:
      i = n.visitTimeMicrosecond || n.visitTime;
      break;
    case c.TimeNanosecond:
      i = n.visitTimeNanosecond || n.visitTime;
      break;
    case c.Decimal:
      i = n.visitDecimal;
      break;
    case c.List:
      i = n.visitList;
      break;
    case c.Struct:
      i = n.visitStruct;
      break;
    case c.Union:
      i = n.visitUnion;
      break;
    case c.DenseUnion:
      i = n.visitDenseUnion || n.visitUnion;
      break;
    case c.SparseUnion:
      i = n.visitSparseUnion || n.visitUnion;
      break;
    case c.Dictionary:
      i = n.visitDictionary;
      break;
    case c.Interval:
      i = n.visitInterval;
      break;
    case c.IntervalDayTime:
      i = n.visitIntervalDayTime || n.visitInterval;
      break;
    case c.IntervalYearMonth:
      i = n.visitIntervalYearMonth || n.visitInterval;
      break;
    case c.Duration:
      i = n.visitDuration;
      break;
    case c.DurationSecond:
      i = n.visitDurationSecond || n.visitDuration;
      break;
    case c.DurationMillisecond:
      i = n.visitDurationMillisecond || n.visitDuration;
      break;
    case c.DurationMicrosecond:
      i = n.visitDurationMicrosecond || n.visitDuration;
      break;
    case c.DurationNanosecond:
      i = n.visitDurationNanosecond || n.visitDuration;
      break;
    case c.FixedSizeList:
      i = n.visitFixedSizeList;
      break;
    case c.Map:
      i = n.visitMap;
      break;
  }
  if (typeof i == "function")
    return i;
  if (!e)
    return () => null;
  throw new Error(`Unrecognized type '${c[t]}'`);
}
function ts(n) {
  switch (n.typeId) {
    case c.Null:
      return c.Null;
    case c.Int: {
      const { bitWidth: t, isSigned: e } = n;
      switch (t) {
        case 8:
          return e ? c.Int8 : c.Uint8;
        case 16:
          return e ? c.Int16 : c.Uint16;
        case 32:
          return e ? c.Int32 : c.Uint32;
        case 64:
          return e ? c.Int64 : c.Uint64;
      }
      return c.Int;
    }
    case c.Float:
      switch (n.precision) {
        case q.HALF:
          return c.Float16;
        case q.SINGLE:
          return c.Float32;
        case q.DOUBLE:
          return c.Float64;
      }
      return c.Float;
    case c.Binary:
      return c.Binary;
    case c.LargeBinary:
      return c.LargeBinary;
    case c.Utf8:
      return c.Utf8;
    case c.LargeUtf8:
      return c.LargeUtf8;
    case c.Bool:
      return c.Bool;
    case c.Decimal:
      return c.Decimal;
    case c.Time:
      switch (n.unit) {
        case g.SECOND:
          return c.TimeSecond;
        case g.MILLISECOND:
          return c.TimeMillisecond;
        case g.MICROSECOND:
          return c.TimeMicrosecond;
        case g.NANOSECOND:
          return c.TimeNanosecond;
      }
      return c.Time;
    case c.Timestamp:
      switch (n.unit) {
        case g.SECOND:
          return c.TimestampSecond;
        case g.MILLISECOND:
          return c.TimestampMillisecond;
        case g.MICROSECOND:
          return c.TimestampMicrosecond;
        case g.NANOSECOND:
          return c.TimestampNanosecond;
      }
      return c.Timestamp;
    case c.Date:
      switch (n.unit) {
        case ft.DAY:
          return c.DateDay;
        case ft.MILLISECOND:
          return c.DateMillisecond;
      }
      return c.Date;
    case c.Interval:
      switch (n.unit) {
        case Bt.DAY_TIME:
          return c.IntervalDayTime;
        case Bt.YEAR_MONTH:
          return c.IntervalYearMonth;
      }
      return c.Interval;
    case c.Duration:
      switch (n.unit) {
        case g.SECOND:
          return c.DurationSecond;
        case g.MILLISECOND:
          return c.DurationMillisecond;
        case g.MICROSECOND:
          return c.DurationMicrosecond;
        case g.NANOSECOND:
          return c.DurationNanosecond;
      }
      return c.Duration;
    case c.Map:
      return c.Map;
    case c.List:
      return c.List;
    case c.Struct:
      return c.Struct;
    case c.Union:
      switch (n.mode) {
        case K.Dense:
          return c.DenseUnion;
        case K.Sparse:
          return c.SparseUnion;
      }
      return c.Union;
    case c.FixedSizeBinary:
      return c.FixedSizeBinary;
    case c.FixedSizeList:
      return c.FixedSizeList;
    case c.Dictionary:
      return c.Dictionary;
  }
  throw new Error(`Unrecognized type '${c[n.typeId]}'`);
}
O.prototype.visitInt8 = null;
O.prototype.visitInt16 = null;
O.prototype.visitInt32 = null;
O.prototype.visitInt64 = null;
O.prototype.visitUint8 = null;
O.prototype.visitUint16 = null;
O.prototype.visitUint32 = null;
O.prototype.visitUint64 = null;
O.prototype.visitFloat16 = null;
O.prototype.visitFloat32 = null;
O.prototype.visitFloat64 = null;
O.prototype.visitDateDay = null;
O.prototype.visitDateMillisecond = null;
O.prototype.visitTimestampSecond = null;
O.prototype.visitTimestampMillisecond = null;
O.prototype.visitTimestampMicrosecond = null;
O.prototype.visitTimestampNanosecond = null;
O.prototype.visitTimeSecond = null;
O.prototype.visitTimeMillisecond = null;
O.prototype.visitTimeMicrosecond = null;
O.prototype.visitTimeNanosecond = null;
O.prototype.visitDenseUnion = null;
O.prototype.visitSparseUnion = null;
O.prototype.visitIntervalDayTime = null;
O.prototype.visitIntervalYearMonth = null;
O.prototype.visitDuration = null;
O.prototype.visitDurationSecond = null;
O.prototype.visitDurationMillisecond = null;
O.prototype.visitDurationMicrosecond = null;
O.prototype.visitDurationNanosecond = null;
const Zs = new Float64Array(1), ee = new Uint32Array(Zs.buffer);
function Xs(n) {
  const t = (n & 31744) >> 10, e = (n & 1023) / 1024, i = Math.pow(-1, (n & 32768) >> 15);
  switch (t) {
    case 31:
      return i * (e ? Number.NaN : 1 / 0);
    case 0:
      return i * (e ? 6103515625e-14 * e : 0);
  }
  return i * Math.pow(2, t - 15) * (1 + e);
}
function Ho(n) {
  if (n !== n)
    return 32256;
  Zs[0] = n;
  const t = (ee[1] & 2147483648) >> 16 & 65535;
  let e = ee[1] & 2146435072, i = 0;
  return e >= 1089470464 ? ee[0] > 0 ? e = 31744 : (e = (e & 2080374784) >> 16, i = (ee[1] & 1048575) >> 10) : e <= 1056964608 ? (i = 1048576 + (ee[1] & 1048575), i = 1048576 + (i << (e >> 20) - 998) >> 21, e = 0) : (e = e - 1056964608 >> 10, i = (ee[1] & 1048575) + 512 >> 10), t | e | i & 65535;
}
class b extends O {
}
function S(n) {
  return (t, e, i) => {
    if (t.setValid(e, i != null))
      return n(t, e, i);
  };
}
const qo = (n, t, e) => {
  n[t] = Math.floor(e / 864e5);
}, tr = (n, t, e, i) => {
  if (e + 1 < t.length) {
    const s = P(t[e]), r = P(t[e + 1]);
    n.set(i.subarray(0, r - s), s);
  }
}, Ko = ({ offset: n, values: t }, e, i) => {
  const s = n + e;
  i ? t[s >> 3] |= 1 << s % 8 : t[s >> 3] &= ~(1 << s % 8);
}, Ut = ({ values: n }, t, e) => {
  n[t] = e;
}, gi = ({ values: n }, t, e) => {
  n[t] = e;
}, er = ({ values: n }, t, e) => {
  n[t] = Ho(e);
}, Qo = (n, t, e) => {
  switch (n.type.precision) {
    case q.HALF:
      return er(n, t, e);
    case q.SINGLE:
    case q.DOUBLE:
      return gi(n, t, e);
  }
}, nr = ({ values: n }, t, e) => {
  qo(n, t, e.valueOf());
}, ir = ({ values: n }, t, e) => {
  n[t] = BigInt(e);
}, Jo = ({ stride: n, values: t }, e, i) => {
  t.set(i.subarray(0, n), n * e);
}, sr = ({ values: n, valueOffsets: t }, e, i) => tr(n, t, e, i), rr = ({ values: n, valueOffsets: t }, e, i) => tr(n, t, e, pi(i)), Zo = (n, t, e) => {
  n.type.unit === ft.DAY ? nr(n, t, e) : ir(n, t, e);
}, or = ({ values: n }, t, e) => {
  n[t] = BigInt(e / 1e3);
}, ar = ({ values: n }, t, e) => {
  n[t] = BigInt(e);
}, cr = ({ values: n }, t, e) => {
  n[t] = BigInt(e * 1e3);
}, dr = ({ values: n }, t, e) => {
  n[t] = BigInt(e * 1e6);
}, Xo = (n, t, e) => {
  switch (n.type.unit) {
    case g.SECOND:
      return or(n, t, e);
    case g.MILLISECOND:
      return ar(n, t, e);
    case g.MICROSECOND:
      return cr(n, t, e);
    case g.NANOSECOND:
      return dr(n, t, e);
  }
}, ur = ({ values: n }, t, e) => {
  n[t] = e;
}, lr = ({ values: n }, t, e) => {
  n[t] = e;
}, hr = ({ values: n }, t, e) => {
  n[t] = e;
}, fr = ({ values: n }, t, e) => {
  n[t] = e;
}, ta = (n, t, e) => {
  switch (n.type.unit) {
    case g.SECOND:
      return ur(n, t, e);
    case g.MILLISECOND:
      return lr(n, t, e);
    case g.MICROSECOND:
      return hr(n, t, e);
    case g.NANOSECOND:
      return fr(n, t, e);
  }
}, ea = ({ values: n, stride: t }, e, i) => {
  n.set(i.subarray(0, t), t * e);
}, na = (n, t, e) => {
  const i = n.children[0], s = n.valueOffsets, r = pt.getVisitFn(i);
  if (Array.isArray(e))
    for (let o = -1, a = s[t], d = s[t + 1]; a < d; )
      r(i, a++, e[++o]);
  else
    for (let o = -1, a = s[t], d = s[t + 1]; a < d; )
      r(i, a++, e.get(++o));
}, ia = (n, t, e) => {
  const i = n.children[0], { valueOffsets: s } = n, r = pt.getVisitFn(i);
  let { [t]: o, [t + 1]: a } = s;
  const d = e instanceof Map ? e.entries() : Object.entries(e);
  for (const u of d)
    if (r(i, o, u), ++o >= a)
      break;
}, sa = (n, t) => (e, i, s, r) => i && e(i, n, t[r]), ra = (n, t) => (e, i, s, r) => i && e(i, n, t.get(r)), oa = (n, t) => (e, i, s, r) => i && e(i, n, t.get(s.name)), aa = (n, t) => (e, i, s, r) => i && e(i, n, t[s.name]), ca = (n, t, e) => {
  const i = n.type.children.map((r) => pt.getVisitFn(r.type)), s = e instanceof Map ? oa(t, e) : e instanceof N ? ra(t, e) : Array.isArray(e) ? sa(t, e) : aa(t, e);
  n.type.children.forEach((r, o) => s(i[o], n.children[o], r, o));
}, da = (n, t, e) => {
  n.type.mode === K.Dense ? pr(n, t, e) : yr(n, t, e);
}, pr = (n, t, e) => {
  const i = n.type.typeIdToChildIndex[n.typeIds[t]], s = n.children[i];
  pt.visit(s, n.valueOffsets[t], e);
}, yr = (n, t, e) => {
  const i = n.type.typeIdToChildIndex[n.typeIds[t]], s = n.children[i];
  pt.visit(s, t, e);
}, ua = (n, t, e) => {
  var i;
  (i = n.dictionary) === null || i === void 0 || i.set(n.values[t], e);
}, la = (n, t, e) => {
  n.type.unit === Bt.DAY_TIME ? mr(n, t, e) : _r(n, t, e);
}, mr = ({ values: n }, t, e) => {
  n.set(e.subarray(0, 2), 2 * t);
}, _r = ({ values: n }, t, e) => {
  n[t] = e[0] * 12 + e[1] % 12;
}, gr = ({ values: n }, t, e) => {
  n[t] = e;
}, br = ({ values: n }, t, e) => {
  n[t] = e;
}, Ir = ({ values: n }, t, e) => {
  n[t] = e;
}, wr = ({ values: n }, t, e) => {
  n[t] = e;
}, ha = (n, t, e) => {
  switch (n.type.unit) {
    case g.SECOND:
      return gr(n, t, e);
    case g.MILLISECOND:
      return br(n, t, e);
    case g.MICROSECOND:
      return Ir(n, t, e);
    case g.NANOSECOND:
      return wr(n, t, e);
  }
}, fa = (n, t, e) => {
  const { stride: i } = n, s = n.children[0], r = pt.getVisitFn(s);
  if (Array.isArray(e))
    for (let o = -1, a = t * i; ++o < i; )
      r(s, a + o, e[o]);
  else
    for (let o = -1, a = t * i; ++o < i; )
      r(s, a + o, e.get(o));
};
b.prototype.visitBool = S(Ko);
b.prototype.visitInt = S(Ut);
b.prototype.visitInt8 = S(Ut);
b.prototype.visitInt16 = S(Ut);
b.prototype.visitInt32 = S(Ut);
b.prototype.visitInt64 = S(Ut);
b.prototype.visitUint8 = S(Ut);
b.prototype.visitUint16 = S(Ut);
b.prototype.visitUint32 = S(Ut);
b.prototype.visitUint64 = S(Ut);
b.prototype.visitFloat = S(Qo);
b.prototype.visitFloat16 = S(er);
b.prototype.visitFloat32 = S(gi);
b.prototype.visitFloat64 = S(gi);
b.prototype.visitUtf8 = S(rr);
b.prototype.visitLargeUtf8 = S(rr);
b.prototype.visitBinary = S(sr);
b.prototype.visitLargeBinary = S(sr);
b.prototype.visitFixedSizeBinary = S(Jo);
b.prototype.visitDate = S(Zo);
b.prototype.visitDateDay = S(nr);
b.prototype.visitDateMillisecond = S(ir);
b.prototype.visitTimestamp = S(Xo);
b.prototype.visitTimestampSecond = S(or);
b.prototype.visitTimestampMillisecond = S(ar);
b.prototype.visitTimestampMicrosecond = S(cr);
b.prototype.visitTimestampNanosecond = S(dr);
b.prototype.visitTime = S(ta);
b.prototype.visitTimeSecond = S(ur);
b.prototype.visitTimeMillisecond = S(lr);
b.prototype.visitTimeMicrosecond = S(hr);
b.prototype.visitTimeNanosecond = S(fr);
b.prototype.visitDecimal = S(ea);
b.prototype.visitList = S(na);
b.prototype.visitStruct = S(ca);
b.prototype.visitUnion = S(da);
b.prototype.visitDenseUnion = S(pr);
b.prototype.visitSparseUnion = S(yr);
b.prototype.visitDictionary = S(ua);
b.prototype.visitInterval = S(la);
b.prototype.visitIntervalDayTime = S(mr);
b.prototype.visitIntervalYearMonth = S(_r);
b.prototype.visitDuration = S(ha);
b.prototype.visitDurationSecond = S(gr);
b.prototype.visitDurationMillisecond = S(br);
b.prototype.visitDurationMicrosecond = S(Ir);
b.prototype.visitDurationNanosecond = S(wr);
b.prototype.visitFixedSizeList = S(fa);
b.prototype.visitMap = S(ia);
const pt = new b(), yt = Symbol.for("parent"), ye = Symbol.for("rowIndex");
class bi {
  constructor(t, e) {
    return this[yt] = t, this[ye] = e, new Proxy(this, new ya());
  }
  toArray() {
    return Object.values(this.toJSON());
  }
  toJSON() {
    const t = this[ye], e = this[yt], i = e.type.children, s = {};
    for (let r = -1, o = i.length; ++r < o; )
      s[i[r].name] = st.visit(e.children[r], t);
    return s;
  }
  toString() {
    return `{${[...this].map(([t, e]) => `${Me(t)}: ${Me(e)}`).join(", ")}}`;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toString();
  }
  [Symbol.iterator]() {
    return new pa(this[yt], this[ye]);
  }
}
class pa {
  constructor(t, e) {
    this.childIndex = 0, this.children = t.children, this.rowIndex = e, this.childFields = t.type.children, this.numChildren = this.childFields.length;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    const t = this.childIndex;
    return t < this.numChildren ? (this.childIndex = t + 1, {
      done: !1,
      value: [
        this.childFields[t].name,
        st.visit(this.children[t], this.rowIndex)
      ]
    }) : { done: !0, value: null };
  }
}
Object.defineProperties(bi.prototype, {
  [Symbol.toStringTag]: { enumerable: !1, configurable: !1, value: "Row" },
  [yt]: { writable: !0, enumerable: !1, configurable: !1, value: null },
  [ye]: { writable: !0, enumerable: !1, configurable: !1, value: -1 }
});
class ya {
  isExtensible() {
    return !1;
  }
  deleteProperty() {
    return !1;
  }
  preventExtensions() {
    return !0;
  }
  ownKeys(t) {
    return t[yt].type.children.map((e) => e.name);
  }
  has(t, e) {
    return t[yt].type.children.findIndex((i) => i.name === e) !== -1;
  }
  getOwnPropertyDescriptor(t, e) {
    if (t[yt].type.children.findIndex((i) => i.name === e) !== -1)
      return { writable: !0, enumerable: !0, configurable: !0 };
  }
  get(t, e) {
    if (Reflect.has(t, e))
      return t[e];
    const i = t[yt].type.children.findIndex((s) => s.name === e);
    if (i !== -1) {
      const s = st.visit(t[yt].children[i], t[ye]);
      return Reflect.set(t, e, s), s;
    }
  }
  set(t, e, i) {
    const s = t[yt].type.children.findIndex((r) => r.name === e);
    return s !== -1 ? (pt.visit(t[yt].children[s], t[ye], i), Reflect.set(t, e, i)) : Reflect.has(t, e) || typeof e == "symbol" ? Reflect.set(t, e, i) : !1;
  }
}
class p extends O {
}
function I(n) {
  return (t, e) => t.getValid(e) ? n(t, e) : null;
}
const ma = (n, t) => 864e5 * n[t], _a = (n, t) => null, Sr = (n, t, e) => {
  if (e + 1 >= t.length)
    return null;
  const i = P(t[e]), s = P(t[e + 1]);
  return n.subarray(i, s);
}, ga = ({ offset: n, values: t }, e) => {
  const i = n + e;
  return (t[i >> 3] & 1 << i % 8) !== 0;
}, vr = ({ values: n }, t) => ma(n, t), Er = ({ values: n }, t) => P(n[t]), Ht = ({ stride: n, values: t }, e) => t[n * e], ba = ({ stride: n, values: t }, e) => Xs(t[n * e]), Tr = ({ values: n }, t) => n[t], Ia = ({ stride: n, values: t }, e) => t.subarray(n * e, n * (e + 1)), Or = ({ values: n, valueOffsets: t }, e) => Sr(n, t, e), Br = ({ values: n, valueOffsets: t }, e) => {
  const i = Sr(n, t, e);
  return i !== null ? ti(i) : null;
}, wa = ({ values: n }, t) => n[t], Sa = ({ type: n, values: t }, e) => n.precision !== q.HALF ? t[e] : Xs(t[e]), va = (n, t) => n.type.unit === ft.DAY ? vr(n, t) : Er(n, t), Ar = ({ values: n }, t) => 1e3 * P(n[t]), Fr = ({ values: n }, t) => P(n[t]), Dr = ({ values: n }, t) => As(n[t], BigInt(1e3)), Rr = ({ values: n }, t) => As(n[t], BigInt(1e6)), Ea = (n, t) => {
  switch (n.type.unit) {
    case g.SECOND:
      return Ar(n, t);
    case g.MILLISECOND:
      return Fr(n, t);
    case g.MICROSECOND:
      return Dr(n, t);
    case g.NANOSECOND:
      return Rr(n, t);
  }
}, Nr = ({ values: n }, t) => n[t], Lr = ({ values: n }, t) => n[t], Mr = ({ values: n }, t) => n[t], Ur = ({ values: n }, t) => n[t], Ta = (n, t) => {
  switch (n.type.unit) {
    case g.SECOND:
      return Nr(n, t);
    case g.MILLISECOND:
      return Lr(n, t);
    case g.MICROSECOND:
      return Mr(n, t);
    case g.NANOSECOND:
      return Ur(n, t);
  }
}, Oa = ({ values: n, stride: t }, e) => _i.decimal(n.subarray(t * e, t * (e + 1))), Ba = (n, t) => {
  const { valueOffsets: e, stride: i, children: s } = n, { [t * i]: r, [t * i + 1]: o } = e, d = s[0].slice(r, o - r);
  return new N([d]);
}, Aa = (n, t) => {
  const { valueOffsets: e, children: i } = n, { [t]: s, [t + 1]: r } = e, o = i[0];
  return new Ii(o.slice(s, r - s));
}, Fa = (n, t) => new bi(n, t), Da = (n, t) => n.type.mode === K.Dense ? kr(n, t) : Cr(n, t), kr = (n, t) => {
  const e = n.type.typeIdToChildIndex[n.typeIds[t]], i = n.children[e];
  return st.visit(i, n.valueOffsets[t]);
}, Cr = (n, t) => {
  const e = n.type.typeIdToChildIndex[n.typeIds[t]], i = n.children[e];
  return st.visit(i, t);
}, Ra = (n, t) => {
  var e;
  return (e = n.dictionary) === null || e === void 0 ? void 0 : e.get(n.values[t]);
}, Na = (n, t) => n.type.unit === Bt.DAY_TIME ? Pr(n, t) : xr(n, t), Pr = ({ values: n }, t) => n.subarray(2 * t, 2 * (t + 1)), xr = ({ values: n }, t) => {
  const e = n[t], i = new Int32Array(2);
  return i[0] = Math.trunc(e / 12), i[1] = Math.trunc(e % 12), i;
}, jr = ({ values: n }, t) => n[t], Vr = ({ values: n }, t) => n[t], zr = ({ values: n }, t) => n[t], $r = ({ values: n }, t) => n[t], La = (n, t) => {
  switch (n.type.unit) {
    case g.SECOND:
      return jr(n, t);
    case g.MILLISECOND:
      return Vr(n, t);
    case g.MICROSECOND:
      return zr(n, t);
    case g.NANOSECOND:
      return $r(n, t);
  }
}, Ma = (n, t) => {
  const { stride: e, children: i } = n, r = i[0].slice(t * e, e);
  return new N([r]);
};
p.prototype.visitNull = I(_a);
p.prototype.visitBool = I(ga);
p.prototype.visitInt = I(wa);
p.prototype.visitInt8 = I(Ht);
p.prototype.visitInt16 = I(Ht);
p.prototype.visitInt32 = I(Ht);
p.prototype.visitInt64 = I(Tr);
p.prototype.visitUint8 = I(Ht);
p.prototype.visitUint16 = I(Ht);
p.prototype.visitUint32 = I(Ht);
p.prototype.visitUint64 = I(Tr);
p.prototype.visitFloat = I(Sa);
p.prototype.visitFloat16 = I(ba);
p.prototype.visitFloat32 = I(Ht);
p.prototype.visitFloat64 = I(Ht);
p.prototype.visitUtf8 = I(Br);
p.prototype.visitLargeUtf8 = I(Br);
p.prototype.visitBinary = I(Or);
p.prototype.visitLargeBinary = I(Or);
p.prototype.visitFixedSizeBinary = I(Ia);
p.prototype.visitDate = I(va);
p.prototype.visitDateDay = I(vr);
p.prototype.visitDateMillisecond = I(Er);
p.prototype.visitTimestamp = I(Ea);
p.prototype.visitTimestampSecond = I(Ar);
p.prototype.visitTimestampMillisecond = I(Fr);
p.prototype.visitTimestampMicrosecond = I(Dr);
p.prototype.visitTimestampNanosecond = I(Rr);
p.prototype.visitTime = I(Ta);
p.prototype.visitTimeSecond = I(Nr);
p.prototype.visitTimeMillisecond = I(Lr);
p.prototype.visitTimeMicrosecond = I(Mr);
p.prototype.visitTimeNanosecond = I(Ur);
p.prototype.visitDecimal = I(Oa);
p.prototype.visitList = I(Ba);
p.prototype.visitStruct = I(Fa);
p.prototype.visitUnion = I(Da);
p.prototype.visitDenseUnion = I(kr);
p.prototype.visitSparseUnion = I(Cr);
p.prototype.visitDictionary = I(Ra);
p.prototype.visitInterval = I(Na);
p.prototype.visitIntervalDayTime = I(Pr);
p.prototype.visitIntervalYearMonth = I(xr);
p.prototype.visitDuration = I(La);
p.prototype.visitDurationSecond = I(jr);
p.prototype.visitDurationMillisecond = I(Vr);
p.prototype.visitDurationMicrosecond = I(zr);
p.prototype.visitDurationNanosecond = I($r);
p.prototype.visitFixedSizeList = I(Ma);
p.prototype.visitMap = I(Aa);
const st = new p(), ue = Symbol.for("keys"), me = Symbol.for("vals"), le = Symbol.for("kKeysAsStrings"), oi = Symbol.for("_kKeysAsStrings");
class Ii {
  constructor(t) {
    return this[ue] = new N([t.children[0]]).memoize(), this[me] = t.children[1], new Proxy(this, new ka());
  }
  /** @ignore */
  get [le]() {
    return this[oi] || (this[oi] = Array.from(this[ue].toArray(), String));
  }
  [Symbol.iterator]() {
    return new Ua(this[ue], this[me]);
  }
  get size() {
    return this[ue].length;
  }
  toArray() {
    return Object.values(this.toJSON());
  }
  toJSON() {
    const t = this[ue], e = this[me], i = {};
    for (let s = -1, r = t.length; ++s < r; )
      i[t.get(s)] = st.visit(e, s);
    return i;
  }
  toString() {
    return `{${[...this].map(([t, e]) => `${Me(t)}: ${Me(e)}`).join(", ")}}`;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toString();
  }
}
class Ua {
  constructor(t, e) {
    this.keys = t, this.vals = e, this.keyIndex = 0, this.numKeys = t.length;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    const t = this.keyIndex;
    return t === this.numKeys ? { done: !0, value: null } : (this.keyIndex++, {
      done: !1,
      value: [
        this.keys.get(t),
        st.visit(this.vals, t)
      ]
    });
  }
}
class ka {
  isExtensible() {
    return !1;
  }
  deleteProperty() {
    return !1;
  }
  preventExtensions() {
    return !0;
  }
  ownKeys(t) {
    return t[le];
  }
  has(t, e) {
    return t[le].includes(e);
  }
  getOwnPropertyDescriptor(t, e) {
    if (t[le].indexOf(e) !== -1)
      return { writable: !0, enumerable: !0, configurable: !0 };
  }
  get(t, e) {
    if (Reflect.has(t, e))
      return t[e];
    const i = t[le].indexOf(e);
    if (i !== -1) {
      const s = st.visit(Reflect.get(t, me), i);
      return Reflect.set(t, e, s), s;
    }
  }
  set(t, e, i) {
    const s = t[le].indexOf(e);
    return s !== -1 ? (pt.visit(Reflect.get(t, me), s, i), Reflect.set(t, e, i)) : Reflect.has(t, e) ? Reflect.set(t, e, i) : !1;
  }
}
Object.defineProperties(Ii.prototype, {
  [Symbol.toStringTag]: { enumerable: !1, configurable: !1, value: "Row" },
  [ue]: { writable: !0, enumerable: !1, configurable: !1, value: null },
  [me]: { writable: !0, enumerable: !1, configurable: !1, value: null },
  [oi]: { writable: !0, enumerable: !1, configurable: !1, value: null }
});
let es;
function Yr(n, t, e, i) {
  const { length: s = 0 } = n;
  let r = typeof t != "number" ? 0 : t, o = typeof e != "number" ? s : e;
  return r < 0 && (r = (r % s + s) % s), o < 0 && (o = (o % s + s) % s), o < r && (es = r, r = o, o = es), o > s && (o = s), i ? i(n, r, o) : [r, o];
}
const wi = (n, t) => n < 0 ? t + n : n, ns = (n) => n !== n;
function ve(n) {
  if (typeof n !== "object" || n === null)
    return ns(n) ? ns : (e) => e === n;
  if (n instanceof Date) {
    const e = n.valueOf();
    return (i) => i instanceof Date ? i.valueOf() === e : !1;
  }
  return ArrayBuffer.isView(n) ? (e) => e ? Mo(n, e) : !1 : n instanceof Map ? Pa(n) : Array.isArray(n) ? Ca(n) : n instanceof N ? xa(n) : ja(n, !0);
}
function Ca(n) {
  const t = [];
  for (let e = -1, i = n.length; ++e < i; )
    t[e] = ve(n[e]);
  return Pn(t);
}
function Pa(n) {
  let t = -1;
  const e = [];
  for (const i of n.values())
    e[++t] = ve(i);
  return Pn(e);
}
function xa(n) {
  const t = [];
  for (let e = -1, i = n.length; ++e < i; )
    t[e] = ve(n.get(e));
  return Pn(t);
}
function ja(n, t = !1) {
  const e = Object.keys(n);
  if (!t && e.length === 0)
    return () => !1;
  const i = [];
  for (let s = -1, r = e.length; ++s < r; )
    i[s] = ve(n[e[s]]);
  return Pn(i, e);
}
function Pn(n, t) {
  return (e) => {
    if (!e || typeof e != "object")
      return !1;
    switch (e.constructor) {
      case Array:
        return Va(n, e);
      case Map:
        return is(n, e, e.keys());
      case Ii:
      case bi:
      case Object:
      case void 0:
        return is(n, e, t || Object.keys(e));
    }
    return e instanceof N ? za(n, e) : !1;
  };
}
function Va(n, t) {
  const e = n.length;
  if (t.length !== e)
    return !1;
  for (let i = -1; ++i < e; )
    if (!n[i](t[i]))
      return !1;
  return !0;
}
function za(n, t) {
  const e = n.length;
  if (t.length !== e)
    return !1;
  for (let i = -1; ++i < e; )
    if (!n[i](t.get(i)))
      return !1;
  return !0;
}
function is(n, t, e) {
  const i = e[Symbol.iterator](), s = t instanceof Map ? t.keys() : Object.keys(t)[Symbol.iterator](), r = t instanceof Map ? t.values() : Object.values(t)[Symbol.iterator]();
  let o = 0;
  const a = n.length;
  let d = r.next(), u = i.next(), l = s.next();
  for (; o < a && !u.done && !l.done && !d.done && !(u.value !== l.value || !n[o](d.value)); ++o, u = i.next(), l = s.next(), d = r.next())
    ;
  return o === a && u.done && l.done && d.done ? !0 : (i.return && i.return(), s.return && s.return(), r.return && r.return(), !1);
}
function Wr(n, t, e, i) {
  return (e & 1 << i) !== 0;
}
function $a(n, t, e, i) {
  return (e & 1 << i) >> i;
}
function On(n, t, e) {
  const i = e.byteLength + 7 & -8;
  if (n > 0 || e.byteLength < i) {
    const s = new Uint8Array(i);
    return s.set(n % 8 === 0 ? e.subarray(n >> 3) : (
      // Otherwise iterate each bit from the offset and return a new one
      Bn(new Si(e, n, t, null, Wr)).subarray(0, i)
    )), s;
  }
  return e;
}
function Bn(n) {
  const t = [];
  let e = 0, i = 0, s = 0;
  for (const o of n)
    o && (s |= 1 << i), ++i === 8 && (t[e++] = s, s = i = 0);
  (e === 0 || i > 0) && (t[e++] = s);
  const r = new Uint8Array(t.length + 7 & -8);
  return r.set(t), r;
}
class Si {
  constructor(t, e, i, s, r) {
    this.bytes = t, this.length = i, this.context = s, this.get = r, this.bit = e % 8, this.byteIndex = e >> 3, this.byte = t[this.byteIndex++], this.index = 0;
  }
  next() {
    return this.index < this.length ? (this.bit === 8 && (this.bit = 0, this.byte = this.bytes[this.byteIndex++]), {
      value: this.get(this.context, this.index++, this.byte, this.bit++)
    }) : { done: !0, value: null };
  }
  [Symbol.iterator]() {
    return this;
  }
}
function ai(n, t, e) {
  if (e - t <= 0)
    return 0;
  if (e - t < 8) {
    let r = 0;
    for (const o of new Si(n, t, e - t, n, $a))
      r += o;
    return r;
  }
  const i = e >> 3 << 3, s = t + (t % 8 === 0 ? 0 : 8 - t % 8);
  return (
    // Get the popcnt of bits between the left hand side, and the next highest multiple of 8
    ai(n, t, s) + // Get the popcnt of bits between the right hand side, and the next lowest multiple of 8
    ai(n, i, e) + // Get the popcnt of all bits between the left and right hand sides' multiples of 8
    Ya(n, s >> 3, i - s >> 3)
  );
}
function Ya(n, t, e) {
  let i = 0, s = Math.trunc(t);
  const r = new DataView(n.buffer, n.byteOffset, n.byteLength), o = e === void 0 ? n.byteLength : s + e;
  for (; o - s >= 4; )
    i += Gn(r.getUint32(s)), s += 4;
  for (; o - s >= 2; )
    i += Gn(r.getUint16(s)), s += 2;
  for (; o - s >= 1; )
    i += Gn(r.getUint8(s)), s += 1;
  return i;
}
function Gn(n) {
  let t = Math.trunc(n);
  return t = t - (t >>> 1 & 1431655765), t = (t & 858993459) + (t >>> 2 & 858993459), (t + (t >>> 4) & 252645135) * 16843009 >>> 24;
}
const Wa = -1;
class U {
  get typeId() {
    return this.type.typeId;
  }
  get ArrayType() {
    return this.type.ArrayType;
  }
  get buffers() {
    return [this.valueOffsets, this.values, this.nullBitmap, this.typeIds];
  }
  get nullable() {
    if (this._nullCount !== 0) {
      const { type: t } = this;
      return f.isSparseUnion(t) ? this.children.some((e) => e.nullable) : f.isDenseUnion(t) ? this.children.some((e) => e.nullable) : this.nullBitmap && this.nullBitmap.byteLength > 0;
    }
    return !0;
  }
  get byteLength() {
    let t = 0;
    const { valueOffsets: e, values: i, nullBitmap: s, typeIds: r } = this;
    return e && (t += e.byteLength), i && (t += i.byteLength), s && (t += s.byteLength), r && (t += r.byteLength), this.children.reduce((o, a) => o + a.byteLength, t);
  }
  get nullCount() {
    if (f.isUnion(this.type))
      return this.children.reduce((i, s) => i + s.nullCount, 0);
    let t = this._nullCount, e;
    return t <= Wa && (e = this.nullBitmap) && (this._nullCount = t = e.length === 0 ? (
      // no null bitmap, so all values are valid
      0
    ) : this.length - ai(e, this.offset, this.offset + this.length)), t;
  }
  constructor(t, e, i, s, r, o = [], a) {
    this.type = t, this.children = o, this.dictionary = a, this.offset = Math.floor(Math.max(e || 0, 0)), this.length = Math.floor(Math.max(i || 0, 0)), this._nullCount = Math.floor(Math.max(s || 0, -1));
    let d;
    r instanceof U ? (this.stride = r.stride, this.values = r.values, this.typeIds = r.typeIds, this.nullBitmap = r.nullBitmap, this.valueOffsets = r.valueOffsets) : (this.stride = Nt(t), r && ((d = r[0]) && (this.valueOffsets = d), (d = r[1]) && (this.values = d), (d = r[2]) && (this.nullBitmap = d), (d = r[3]) && (this.typeIds = d)));
  }
  getValid(t) {
    const { type: e } = this;
    if (f.isUnion(e)) {
      const i = e, s = this.children[i.typeIdToChildIndex[this.typeIds[t]]], r = i.mode === K.Dense ? this.valueOffsets[t] : t;
      return s.getValid(r);
    }
    if (this.nullable && this.nullCount > 0) {
      const i = this.offset + t;
      return (this.nullBitmap[i >> 3] & 1 << i % 8) !== 0;
    }
    return !0;
  }
  setValid(t, e) {
    let i;
    const { type: s } = this;
    if (f.isUnion(s)) {
      const r = s, o = this.children[r.typeIdToChildIndex[this.typeIds[t]]], a = r.mode === K.Dense ? this.valueOffsets[t] : t;
      i = o.getValid(a), o.setValid(a, e);
    } else {
      let { nullBitmap: r } = this;
      const { offset: o, length: a } = this, d = o + t, u = 1 << d % 8, l = d >> 3;
      (!r || r.byteLength <= l) && (r = new Uint8Array((o + a + 63 & -64) >> 3).fill(255), this.nullCount > 0 ? (r.set(On(o, a, this.nullBitmap), 0), Object.assign(this, { nullBitmap: r })) : Object.assign(this, { nullBitmap: r, _nullCount: 0 }));
      const h = r[l];
      i = (h & u) !== 0, r[l] = e ? h | u : h & ~u;
    }
    return i !== !!e && (this._nullCount = this.nullCount + (e ? -1 : 1)), e;
  }
  clone(t = this.type, e = this.offset, i = this.length, s = this._nullCount, r = this, o = this.children) {
    return new U(t, e, i, s, r, o, this.dictionary);
  }
  slice(t, e) {
    const { stride: i, typeId: s, children: r } = this, o = +(this._nullCount === 0) - 1, a = s === 16 ? i : 1, d = this._sliceBuffers(t, e, i, s);
    return this.clone(
      this.type,
      this.offset + t,
      e,
      o,
      d,
      // Don't slice children if we have value offsets (the variable-width types)
      r.length === 0 || this.valueOffsets ? r : this._sliceChildren(r, a * t, a * e)
    );
  }
  _changeLengthAndBackfillNullBitmap(t) {
    if (this.typeId === c.Null)
      return this.clone(this.type, 0, t, 0);
    const { length: e, nullCount: i } = this, s = new Uint8Array((t + 63 & -64) >> 3).fill(255, 0, e >> 3);
    s[e >> 3] = (1 << e - (e & -8)) - 1, i > 0 && s.set(On(this.offset, e, this.nullBitmap), 0);
    const r = this.buffers;
    return r[Rt.VALIDITY] = s, this.clone(this.type, 0, t, i + (t - e), r);
  }
  _sliceBuffers(t, e, i, s) {
    let r;
    const { buffers: o } = this;
    return (r = o[Rt.TYPE]) && (o[Rt.TYPE] = r.subarray(t, t + e)), (r = o[Rt.OFFSET]) && (o[Rt.OFFSET] = r.subarray(t, t + e + 1)) || // Otherwise if no offsets, slice the data buffer. Don't slice the data vector for Booleans, since the offset goes by bits not bytes
    (r = o[Rt.DATA]) && (o[Rt.DATA] = s === 6 ? r : r.subarray(i * t, i * (t + e))), o;
  }
  _sliceChildren(t, e, i) {
    return t.map((s) => s.slice(e, i));
  }
}
U.prototype.children = Object.freeze([]);
class Le extends O {
  visit(t) {
    return this.getVisitFn(t.type).call(this, t);
  }
  visitNull(t) {
    const { ["type"]: e, ["offset"]: i = 0, ["length"]: s = 0 } = t;
    return new U(e, i, s, s);
  }
  visitBool(t) {
    const { ["type"]: e, ["offset"]: i = 0 } = t, s = A(t.nullBitmap), r = C(e.ArrayType, t.data), { ["length"]: o = r.length >> 3, ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new U(e, i, o, a, [void 0, r, s]);
  }
  visitInt(t) {
    const { ["type"]: e, ["offset"]: i = 0 } = t, s = A(t.nullBitmap), r = C(e.ArrayType, t.data), { ["length"]: o = r.length, ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new U(e, i, o, a, [void 0, r, s]);
  }
  visitFloat(t) {
    const { ["type"]: e, ["offset"]: i = 0 } = t, s = A(t.nullBitmap), r = C(e.ArrayType, t.data), { ["length"]: o = r.length, ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new U(e, i, o, a, [void 0, r, s]);
  }
  visitUtf8(t) {
    const { ["type"]: e, ["offset"]: i = 0 } = t, s = A(t.data), r = A(t.nullBitmap), o = Ee(t.valueOffsets), { ["length"]: a = o.length - 1, ["nullCount"]: d = t.nullBitmap ? -1 : 0 } = t;
    return new U(e, i, a, d, [o, s, r]);
  }
  visitLargeUtf8(t) {
    const { ["type"]: e, ["offset"]: i = 0 } = t, s = A(t.data), r = A(t.nullBitmap), o = Yi(t.valueOffsets), { ["length"]: a = o.length - 1, ["nullCount"]: d = t.nullBitmap ? -1 : 0 } = t;
    return new U(e, i, a, d, [o, s, r]);
  }
  visitBinary(t) {
    const { ["type"]: e, ["offset"]: i = 0 } = t, s = A(t.data), r = A(t.nullBitmap), o = Ee(t.valueOffsets), { ["length"]: a = o.length - 1, ["nullCount"]: d = t.nullBitmap ? -1 : 0 } = t;
    return new U(e, i, a, d, [o, s, r]);
  }
  visitLargeBinary(t) {
    const { ["type"]: e, ["offset"]: i = 0 } = t, s = A(t.data), r = A(t.nullBitmap), o = Yi(t.valueOffsets), { ["length"]: a = o.length - 1, ["nullCount"]: d = t.nullBitmap ? -1 : 0 } = t;
    return new U(e, i, a, d, [o, s, r]);
  }
  visitFixedSizeBinary(t) {
    const { ["type"]: e, ["offset"]: i = 0 } = t, s = A(t.nullBitmap), r = C(e.ArrayType, t.data), { ["length"]: o = r.length / Nt(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new U(e, i, o, a, [void 0, r, s]);
  }
  visitDate(t) {
    const { ["type"]: e, ["offset"]: i = 0 } = t, s = A(t.nullBitmap), r = C(e.ArrayType, t.data), { ["length"]: o = r.length / Nt(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new U(e, i, o, a, [void 0, r, s]);
  }
  visitTimestamp(t) {
    const { ["type"]: e, ["offset"]: i = 0 } = t, s = A(t.nullBitmap), r = C(e.ArrayType, t.data), { ["length"]: o = r.length / Nt(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new U(e, i, o, a, [void 0, r, s]);
  }
  visitTime(t) {
    const { ["type"]: e, ["offset"]: i = 0 } = t, s = A(t.nullBitmap), r = C(e.ArrayType, t.data), { ["length"]: o = r.length / Nt(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new U(e, i, o, a, [void 0, r, s]);
  }
  visitDecimal(t) {
    const { ["type"]: e, ["offset"]: i = 0 } = t, s = A(t.nullBitmap), r = C(e.ArrayType, t.data), { ["length"]: o = r.length / Nt(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new U(e, i, o, a, [void 0, r, s]);
  }
  visitList(t) {
    const { ["type"]: e, ["offset"]: i = 0, ["child"]: s } = t, r = A(t.nullBitmap), o = Ee(t.valueOffsets), { ["length"]: a = o.length - 1, ["nullCount"]: d = t.nullBitmap ? -1 : 0 } = t;
    return new U(e, i, a, d, [o, void 0, r], [s]);
  }
  visitStruct(t) {
    const { ["type"]: e, ["offset"]: i = 0, ["children"]: s = [] } = t, r = A(t.nullBitmap), { length: o = s.reduce((d, { length: u }) => Math.max(d, u), 0), nullCount: a = t.nullBitmap ? -1 : 0 } = t;
    return new U(e, i, o, a, [void 0, void 0, r], s);
  }
  visitUnion(t) {
    const { ["type"]: e, ["offset"]: i = 0, ["children"]: s = [] } = t, r = C(e.ArrayType, t.typeIds), { ["length"]: o = r.length, ["nullCount"]: a = -1 } = t;
    if (f.isSparseUnion(e))
      return new U(e, i, o, a, [void 0, void 0, void 0, r], s);
    const d = Ee(t.valueOffsets);
    return new U(e, i, o, a, [d, void 0, void 0, r], s);
  }
  visitDictionary(t) {
    const { ["type"]: e, ["offset"]: i = 0 } = t, s = A(t.nullBitmap), r = C(e.indices.ArrayType, t.data), { ["dictionary"]: o = new N([new Le().visit({ type: e.dictionary })]) } = t, { ["length"]: a = r.length, ["nullCount"]: d = t.nullBitmap ? -1 : 0 } = t;
    return new U(e, i, a, d, [void 0, r, s], [], o);
  }
  visitInterval(t) {
    const { ["type"]: e, ["offset"]: i = 0 } = t, s = A(t.nullBitmap), r = C(e.ArrayType, t.data), { ["length"]: o = r.length / Nt(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new U(e, i, o, a, [void 0, r, s]);
  }
  visitDuration(t) {
    const { ["type"]: e, ["offset"]: i = 0 } = t, s = A(t.nullBitmap), r = C(e.ArrayType, t.data), { ["length"]: o = r.length, ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new U(e, i, o, a, [void 0, r, s]);
  }
  visitFixedSizeList(t) {
    const { ["type"]: e, ["offset"]: i = 0, ["child"]: s = new Le().visit({ type: e.valueType }) } = t, r = A(t.nullBitmap), { ["length"]: o = s.length / Nt(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new U(e, i, o, a, [void 0, void 0, r], [s]);
  }
  visitMap(t) {
    const { ["type"]: e, ["offset"]: i = 0, ["child"]: s = new Le().visit({ type: e.childType }) } = t, r = A(t.nullBitmap), o = Ee(t.valueOffsets), { ["length"]: a = o.length - 1, ["nullCount"]: d = t.nullBitmap ? -1 : 0 } = t;
    return new U(e, i, a, d, [o, void 0, r], [s]);
  }
}
const Ga = new Le();
function B(n) {
  return Ga.visit(n);
}
class ss {
  constructor(t = 0, e) {
    this.numChunks = t, this.getChunkIterator = e, this.chunkIndex = 0, this.chunkIterator = this.getChunkIterator(0);
  }
  next() {
    for (; this.chunkIndex < this.numChunks; ) {
      const t = this.chunkIterator.next();
      if (!t.done)
        return t;
      ++this.chunkIndex < this.numChunks && (this.chunkIterator = this.getChunkIterator(this.chunkIndex));
    }
    return { done: !0, value: null };
  }
  [Symbol.iterator]() {
    return this;
  }
}
function Ha(n) {
  return n.some((t) => t.nullable);
}
function Gr(n) {
  return n.reduce((t, e) => t + e.nullCount, 0);
}
function Hr(n) {
  return n.reduce((t, e, i) => (t[i + 1] = t[i] + e.length, t), new Uint32Array(n.length + 1));
}
function qr(n, t, e, i) {
  const s = [];
  for (let r = -1, o = n.length; ++r < o; ) {
    const a = n[r], d = t[r], { length: u } = a;
    if (d >= i)
      break;
    if (e >= d + u)
      continue;
    if (d >= e && d + u <= i) {
      s.push(a);
      continue;
    }
    const l = Math.max(0, e - d), h = Math.min(i - d, u);
    s.push(a.slice(l, h - l));
  }
  return s.length === 0 && s.push(n[0].slice(0, 0)), s;
}
function vi(n, t, e, i) {
  let s = 0, r = 0, o = t.length - 1;
  do {
    if (s >= o - 1)
      return e < t[o] ? i(n, s, e - t[s]) : null;
    r = s + Math.trunc((o - s) * 0.5), e < t[r] ? o = r : s = r;
  } while (s < o);
}
function Ei(n, t) {
  return n.getValid(t);
}
function An(n) {
  function t(e, i, s) {
    return n(e[i], s);
  }
  return function(e) {
    const i = this.data;
    return vi(i, this._offsets, e, t);
  };
}
function Kr(n) {
  let t;
  function e(i, s, r) {
    return n(i[s], r, t);
  }
  return function(i, s) {
    const r = this.data;
    t = s;
    const o = vi(r, this._offsets, i, e);
    return t = void 0, o;
  };
}
function Qr(n) {
  let t;
  function e(i, s, r) {
    let o = r, a = 0, d = 0;
    for (let u = s - 1, l = i.length; ++u < l; ) {
      const h = i[u];
      if (~(a = n(h, t, o)))
        return d + a;
      o = 0, d += h.length;
    }
    return -1;
  }
  return function(i, s) {
    t = i;
    const r = this.data, o = typeof s != "number" ? e(r, 0, 0) : vi(r, this._offsets, s, e);
    return t = void 0, o;
  };
}
class y extends O {
}
function qa(n, t) {
  return t === null && n.length > 0 ? 0 : -1;
}
function Ka(n, t) {
  const { nullBitmap: e } = n;
  if (!e || n.nullCount <= 0)
    return -1;
  let i = 0;
  for (const s of new Si(e, n.offset + (t || 0), n.length, e, Wr)) {
    if (!s)
      return i;
    ++i;
  }
  return -1;
}
function v(n, t, e) {
  if (t === void 0)
    return -1;
  if (t === null)
    switch (n.typeId) {
      // Unions don't have a nullBitmap of its own, so compare the `searchElement` to `get()`.
      case c.Union:
        break;
      // Dictionaries do have a nullBitmap, but their dictionary could also have null elements.
      case c.Dictionary:
        break;
      // All other types can iterate the null bitmap
      default:
        return Ka(n, e);
    }
  const i = st.getVisitFn(n), s = ve(t);
  for (let r = (e || 0) - 1, o = n.length; ++r < o; )
    if (s(i(n, r)))
      return r;
  return -1;
}
function Jr(n, t, e) {
  const i = st.getVisitFn(n), s = ve(t);
  for (let r = (e || 0) - 1, o = n.length; ++r < o; )
    if (s(i(n, r)))
      return r;
  return -1;
}
y.prototype.visitNull = qa;
y.prototype.visitBool = v;
y.prototype.visitInt = v;
y.prototype.visitInt8 = v;
y.prototype.visitInt16 = v;
y.prototype.visitInt32 = v;
y.prototype.visitInt64 = v;
y.prototype.visitUint8 = v;
y.prototype.visitUint16 = v;
y.prototype.visitUint32 = v;
y.prototype.visitUint64 = v;
y.prototype.visitFloat = v;
y.prototype.visitFloat16 = v;
y.prototype.visitFloat32 = v;
y.prototype.visitFloat64 = v;
y.prototype.visitUtf8 = v;
y.prototype.visitLargeUtf8 = v;
y.prototype.visitBinary = v;
y.prototype.visitLargeBinary = v;
y.prototype.visitFixedSizeBinary = v;
y.prototype.visitDate = v;
y.prototype.visitDateDay = v;
y.prototype.visitDateMillisecond = v;
y.prototype.visitTimestamp = v;
y.prototype.visitTimestampSecond = v;
y.prototype.visitTimestampMillisecond = v;
y.prototype.visitTimestampMicrosecond = v;
y.prototype.visitTimestampNanosecond = v;
y.prototype.visitTime = v;
y.prototype.visitTimeSecond = v;
y.prototype.visitTimeMillisecond = v;
y.prototype.visitTimeMicrosecond = v;
y.prototype.visitTimeNanosecond = v;
y.prototype.visitDecimal = v;
y.prototype.visitList = v;
y.prototype.visitStruct = v;
y.prototype.visitUnion = v;
y.prototype.visitDenseUnion = Jr;
y.prototype.visitSparseUnion = Jr;
y.prototype.visitDictionary = v;
y.prototype.visitInterval = v;
y.prototype.visitIntervalDayTime = v;
y.prototype.visitIntervalYearMonth = v;
y.prototype.visitDuration = v;
y.prototype.visitDurationSecond = v;
y.prototype.visitDurationMillisecond = v;
y.prototype.visitDurationMicrosecond = v;
y.prototype.visitDurationNanosecond = v;
y.prototype.visitFixedSizeList = v;
y.prototype.visitMap = v;
const Fn = new y();
class m extends O {
}
function w(n) {
  const { type: t } = n;
  if (n.nullCount === 0 && n.stride === 1 && // Don't defer to native iterator for timestamps since Numbers are expected
  // (DataType.isTimestamp(type)) && type.unit === TimeUnit.MILLISECOND ||
  (f.isInt(t) && t.bitWidth !== 64 || f.isTime(t) && t.bitWidth !== 64 || f.isFloat(t) && t.precision !== q.HALF))
    return new ss(n.data.length, (i) => {
      const s = n.data[i];
      return s.values.subarray(0, s.length)[Symbol.iterator]();
    });
  let e = 0;
  return new ss(n.data.length, (i) => {
    const r = n.data[i].length, o = n.slice(e, e + r);
    return e += r, new Qa(o);
  });
}
class Qa {
  constructor(t) {
    this.vector = t, this.index = 0;
  }
  next() {
    return this.index < this.vector.length ? {
      value: this.vector.get(this.index++)
    } : { done: !0, value: null };
  }
  [Symbol.iterator]() {
    return this;
  }
}
m.prototype.visitNull = w;
m.prototype.visitBool = w;
m.prototype.visitInt = w;
m.prototype.visitInt8 = w;
m.prototype.visitInt16 = w;
m.prototype.visitInt32 = w;
m.prototype.visitInt64 = w;
m.prototype.visitUint8 = w;
m.prototype.visitUint16 = w;
m.prototype.visitUint32 = w;
m.prototype.visitUint64 = w;
m.prototype.visitFloat = w;
m.prototype.visitFloat16 = w;
m.prototype.visitFloat32 = w;
m.prototype.visitFloat64 = w;
m.prototype.visitUtf8 = w;
m.prototype.visitLargeUtf8 = w;
m.prototype.visitBinary = w;
m.prototype.visitLargeBinary = w;
m.prototype.visitFixedSizeBinary = w;
m.prototype.visitDate = w;
m.prototype.visitDateDay = w;
m.prototype.visitDateMillisecond = w;
m.prototype.visitTimestamp = w;
m.prototype.visitTimestampSecond = w;
m.prototype.visitTimestampMillisecond = w;
m.prototype.visitTimestampMicrosecond = w;
m.prototype.visitTimestampNanosecond = w;
m.prototype.visitTime = w;
m.prototype.visitTimeSecond = w;
m.prototype.visitTimeMillisecond = w;
m.prototype.visitTimeMicrosecond = w;
m.prototype.visitTimeNanosecond = w;
m.prototype.visitDecimal = w;
m.prototype.visitList = w;
m.prototype.visitStruct = w;
m.prototype.visitUnion = w;
m.prototype.visitDenseUnion = w;
m.prototype.visitSparseUnion = w;
m.prototype.visitDictionary = w;
m.prototype.visitInterval = w;
m.prototype.visitIntervalDayTime = w;
m.prototype.visitIntervalYearMonth = w;
m.prototype.visitDuration = w;
m.prototype.visitDurationSecond = w;
m.prototype.visitDurationMillisecond = w;
m.prototype.visitDurationMicrosecond = w;
m.prototype.visitDurationNanosecond = w;
m.prototype.visitFixedSizeList = w;
m.prototype.visitMap = w;
const Ti = new m();
var Zr;
const Xr = {}, to = {};
class N {
  constructor(t) {
    var e, i, s;
    const r = t[0] instanceof N ? t.flatMap((a) => a.data) : t;
    if (r.length === 0 || r.some((a) => !(a instanceof U)))
      throw new TypeError("Vector constructor expects an Array of Data instances.");
    const o = (e = r[0]) === null || e === void 0 ? void 0 : e.type;
    switch (r.length) {
      case 0:
        this._offsets = [0];
        break;
      case 1: {
        const { get: a, set: d, indexOf: u } = Xr[o.typeId], l = r[0];
        this.isValid = (h) => Ei(l, h), this.get = (h) => a(l, h), this.set = (h, $) => d(l, h, $), this.indexOf = (h) => u(l, h), this._offsets = [0, l.length];
        break;
      }
      default:
        Object.setPrototypeOf(this, to[o.typeId]), this._offsets = Hr(r);
        break;
    }
    this.data = r, this.type = o, this.stride = Nt(o), this.numChildren = (s = (i = o.children) === null || i === void 0 ? void 0 : i.length) !== null && s !== void 0 ? s : 0, this.length = this._offsets.at(-1);
  }
  /**
   * The aggregate size (in bytes) of this Vector's buffers and/or child Vectors.
   */
  get byteLength() {
    return this.data.reduce((t, e) => t + e.byteLength, 0);
  }
  /**
   * Whether this Vector's elements can contain null values.
   */
  get nullable() {
    return Ha(this.data);
  }
  /**
   * The number of null elements in this Vector.
   */
  get nullCount() {
    return Gr(this.data);
  }
  /**
   * The Array or TypedArray constructor used for the JS representation
   *  of the element's values in {@link Vector.prototype.toArray `toArray()`}.
   */
  get ArrayType() {
    return this.type.ArrayType;
  }
  /**
   * The name that should be printed when the Vector is logged in a message.
   */
  get [Symbol.toStringTag]() {
    return `${this.VectorName}<${this.type[Symbol.toStringTag]}>`;
  }
  /**
   * The name of this Vector.
   */
  get VectorName() {
    return `${c[this.type.typeId]}Vector`;
  }
  /**
   * Check whether an element is null.
   * @param index The index at which to read the validity bitmap.
   */
  // @ts-ignore
  isValid(t) {
    return !1;
  }
  /**
   * Get an element value by position.
   * @param index The index of the element to read.
   */
  // @ts-ignore
  get(t) {
    return null;
  }
  /**
   * Get an element value by position.
   * @param index The index of the element to read. A negative index will count back from the last element.
   */
  at(t) {
    return this.get(wi(t, this.length));
  }
  /**
   * Set an element value by position.
   * @param index The index of the element to write.
   * @param value The value to set.
   */
  // @ts-ignore
  set(t, e) {
  }
  /**
   * Retrieve the index of the first occurrence of a value in an Vector.
   * @param element The value to locate in the Vector.
   * @param offset The index at which to begin the search. If offset is omitted, the search starts at index 0.
   */
  // @ts-ignore
  indexOf(t, e) {
    return -1;
  }
  includes(t, e) {
    return this.indexOf(t, e) > -1;
  }
  /**
   * Iterator for the Vector's elements.
   */
  [Symbol.iterator]() {
    return Ti.visit(this);
  }
  /**
   * Combines two or more Vectors of the same type.
   * @param others Additional Vectors to add to the end of this Vector.
   */
  concat(...t) {
    return new N(this.data.concat(t.flatMap((e) => e.data).flat(Number.POSITIVE_INFINITY)));
  }
  /**
   * Return a zero-copy sub-section of this Vector.
   * @param start The beginning of the specified portion of the Vector.
   * @param end The end of the specified portion of the Vector. This is exclusive of the element at the index 'end'.
   */
  slice(t, e) {
    return new N(Yr(this, t, e, ({ data: i, _offsets: s }, r, o) => qr(i, s, r, o)));
  }
  toJSON() {
    return [...this];
  }
  /**
   * Return a JavaScript Array or TypedArray of the Vector's elements.
   *
   * @note If this Vector contains a single Data chunk and the Vector's type is a
   *  primitive numeric type corresponding to one of the JavaScript TypedArrays, this
   *  method returns a zero-copy slice of the underlying TypedArray values. If there's
   *  more than one chunk, the resulting TypedArray will be a copy of the data from each
   *  chunk's underlying TypedArray values.
   *
   * @returns An Array or TypedArray of the Vector's elements, based on the Vector's DataType.
   */
  toArray() {
    const { type: t, data: e, length: i, stride: s, ArrayType: r } = this;
    switch (t.typeId) {
      case c.Int:
      case c.Float:
      case c.Decimal:
      case c.Time:
      case c.Timestamp:
        switch (e.length) {
          case 0:
            return new r();
          case 1:
            return e[0].values.subarray(0, i * s);
          default:
            return e.reduce((o, { values: a, length: d }) => (o.array.set(a.subarray(0, d * s), o.offset), o.offset += d * s, o), { array: new r(i * s), offset: 0 }).array;
        }
    }
    return [...this];
  }
  /**
   * Returns a string representation of the Vector.
   *
   * @returns A string representation of the Vector.
   */
  toString() {
    return `[${[...this].join(",")}]`;
  }
  /**
   * Returns a child Vector by name, or null if this Vector has no child with the given name.
   * @param name The name of the child to retrieve.
   */
  getChild(t) {
    var e;
    return this.getChildAt((e = this.type.children) === null || e === void 0 ? void 0 : e.findIndex((i) => i.name === t));
  }
  /**
   * Returns a child Vector by index, or null if this Vector has no child at the supplied index.
   * @param index The index of the child to retrieve.
   */
  getChildAt(t) {
    return t > -1 && t < this.numChildren ? new N(this.data.map(({ children: e }) => e[t])) : null;
  }
  get isMemoized() {
    return f.isDictionary(this.type) ? this.data[0].dictionary.isMemoized : !1;
  }
  /**
   * Adds memoization to the Vector's {@link get} method. For dictionary
   * vectors, this method return a vector that memoizes only the dictionary
   * values.
   *
   * Memoization is very useful when decoding a value is expensive such as
   * Utf8. The memoization creates a cache of the size of the Vector and
   * therefore increases memory usage.
   *
   * @returns A new vector that memoizes calls to {@link get}.
   */
  memoize() {
    if (f.isDictionary(this.type)) {
      const t = new Dn(this.data[0].dictionary), e = this.data.map((i) => {
        const s = i.clone();
        return s.dictionary = t, s;
      });
      return new N(e);
    }
    return new Dn(this);
  }
  /**
   * Returns a vector without memoization of the {@link get} method. If this
   * vector is not memoized, this method returns this vector.
   *
   * @returns A new vector without memoization.
   */
  unmemoize() {
    if (f.isDictionary(this.type) && this.isMemoized) {
      const t = this.data[0].dictionary.unmemoize(), e = this.data.map((i) => {
        const s = i.clone();
        return s.dictionary = t, s;
      });
      return new N(e);
    }
    return this;
  }
}
Zr = Symbol.toStringTag;
N[Zr] = ((n) => {
  n.type = f.prototype, n.data = [], n.length = 0, n.stride = 1, n.numChildren = 0, n._offsets = new Uint32Array([0]), n[Symbol.isConcatSpreadable] = !0;
  const t = Object.keys(c).map((e) => c[e]).filter((e) => typeof e == "number" && e !== c.NONE);
  for (const e of t) {
    const i = st.getVisitFnByTypeId(e), s = pt.getVisitFnByTypeId(e), r = Fn.getVisitFnByTypeId(e);
    Xr[e] = { get: i, set: s, indexOf: r }, to[e] = Object.create(n, {
      isValid: { value: An(Ei) },
      get: { value: An(st.getVisitFnByTypeId(e)) },
      set: { value: Kr(pt.getVisitFnByTypeId(e)) },
      indexOf: { value: Qr(Fn.getVisitFnByTypeId(e)) }
    });
  }
  return "Vector";
})(N.prototype);
class Dn extends N {
  constructor(t) {
    super(t.data);
    const e = this.get, i = this.set, s = this.slice, r = new Array(this.length);
    Object.defineProperty(this, "get", {
      value(o) {
        const a = r[o];
        if (a !== void 0)
          return a;
        const d = e.call(this, o);
        return r[o] = d, d;
      }
    }), Object.defineProperty(this, "set", {
      value(o, a) {
        i.call(this, o, a), r[o] = a;
      }
    }), Object.defineProperty(this, "slice", {
      value: (o, a) => new Dn(s.call(this, o, a))
    }), Object.defineProperty(this, "isMemoized", { value: !0 }), Object.defineProperty(this, "unmemoize", {
      value: () => new N(this.data)
    }), Object.defineProperty(this, "memoize", {
      value: () => this
    });
  }
}
class ci {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  /**
   * Index to the start of the RecordBlock (note this is past the Message header)
   */
  offset() {
    return this.bb.readInt64(this.bb_pos);
  }
  /**
   * Length of the metadata
   */
  metaDataLength() {
    return this.bb.readInt32(this.bb_pos + 8);
  }
  /**
   * Length of the data (this is aligned so there can be a gap between this and
   * the metadata).
   */
  bodyLength() {
    return this.bb.readInt64(this.bb_pos + 16);
  }
  static sizeOf() {
    return 24;
  }
  static createBlock(t, e, i, s) {
    return t.prep(8, 24), t.writeInt64(BigInt(s ?? 0)), t.pad(4), t.writeInt32(i), t.writeInt64(BigInt(e ?? 0)), t.offset();
  }
}
class rt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsFooter(t, e) {
    return (e || new rt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFooter(t, e) {
    return t.setPosition(t.position() + M), (e || new rt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  version() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : Y.V1;
  }
  schema(t) {
    const e = this.bb.__offset(this.bb_pos, 6);
    return e ? (t || new bt()).__init(this.bb.__indirect(this.bb_pos + e), this.bb) : null;
  }
  dictionaries(t, e) {
    const i = this.bb.__offset(this.bb_pos, 8);
    return i ? (e || new ci()).__init(this.bb.__vector(this.bb_pos + i) + t * 24, this.bb) : null;
  }
  dictionariesLength() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  recordBatches(t, e) {
    const i = this.bb.__offset(this.bb_pos, 10);
    return i ? (e || new ci()).__init(this.bb.__vector(this.bb_pos + i) + t * 24, this.bb) : null;
  }
  recordBatchesLength() {
    const t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  /**
   * User-defined metadata
   */
  customMetadata(t, e) {
    const i = this.bb.__offset(this.bb_pos, 12);
    return i ? (e || new G()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb) : null;
  }
  customMetadataLength() {
    const t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startFooter(t) {
    t.startObject(5);
  }
  static addVersion(t, e) {
    t.addFieldInt16(0, e, Y.V1);
  }
  static addSchema(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addDictionaries(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static startDictionariesVector(t, e) {
    t.startVector(24, e, 8);
  }
  static addRecordBatches(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static startRecordBatchesVector(t, e) {
    t.startVector(24, e, 8);
  }
  static addCustomMetadata(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static createCustomMetadataVector(t, e) {
    t.startVector(4, e.length, 4);
    for (let i = e.length - 1; i >= 0; i--)
      t.addOffset(e[i]);
    return t.endVector();
  }
  static startCustomMetadataVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endFooter(t) {
    return t.endObject();
  }
  static finishFooterBuffer(t, e) {
    t.finish(e);
  }
  static finishSizePrefixedFooterBuffer(t, e) {
    t.finish(e, void 0, !0);
  }
}
class L {
  constructor(t = [], e, i, s = Y.V5) {
    this.fields = t || [], this.metadata = e || /* @__PURE__ */ new Map(), i || (i = di(this.fields)), this.dictionaries = i, this.metadataVersion = s;
  }
  get [Symbol.toStringTag]() {
    return "Schema";
  }
  get names() {
    return this.fields.map((t) => t.name);
  }
  toString() {
    return `Schema<{ ${this.fields.map((t, e) => `${e}: ${t}`).join(", ")} }>`;
  }
  /**
   * Construct a new Schema containing only specified fields.
   *
   * @param fieldNames Names of fields to keep.
   * @returns A new Schema of fields matching the specified names.
   */
  select(t) {
    const e = new Set(t), i = this.fields.filter((s) => e.has(s.name));
    return new L(i, this.metadata);
  }
  /**
   * Construct a new Schema containing only fields at the specified indices.
   *
   * @param fieldIndices Indices of fields to keep.
   * @returns A new Schema of fields at the specified indices.
   */
  selectAt(t) {
    const e = t.map((i) => this.fields[i]).filter(Boolean);
    return new L(e, this.metadata);
  }
  assign(...t) {
    const e = t[0] instanceof L ? t[0] : Array.isArray(t[0]) ? new L(t[0]) : new L(t), i = [...this.fields], s = He(He(/* @__PURE__ */ new Map(), this.metadata), e.metadata), r = e.fields.filter((a) => {
      const d = i.findIndex((u) => u.name === a.name);
      return ~d ? (i[d] = a.clone({
        metadata: He(He(/* @__PURE__ */ new Map(), i[d].metadata), a.metadata)
      })) && !1 : !0;
    }), o = di(r, /* @__PURE__ */ new Map());
    return new L([...i, ...r], s, new Map([...this.dictionaries, ...o]));
  }
}
L.prototype.fields = null;
L.prototype.metadata = null;
L.prototype.dictionaries = null;
class j {
  /** @nocollapse */
  static new(...t) {
    let [e, i, s, r] = t;
    return t[0] && typeof t[0] == "object" && ({ name: e } = t[0], i === void 0 && (i = t[0].type), s === void 0 && (s = t[0].nullable), r === void 0 && (r = t[0].metadata)), new j(`${e}`, i, s, r);
  }
  constructor(t, e, i = !1, s) {
    this.name = t, this.type = e, this.nullable = i, this.metadata = s || /* @__PURE__ */ new Map();
  }
  get typeId() {
    return this.type.typeId;
  }
  get [Symbol.toStringTag]() {
    return "Field";
  }
  toString() {
    return `${this.name}: ${this.type}`;
  }
  clone(...t) {
    let [e, i, s, r] = t;
    return !t[0] || typeof t[0] != "object" ? [e = this.name, i = this.type, s = this.nullable, r = this.metadata] = t : { name: e = this.name, type: i = this.type, nullable: s = this.nullable, metadata: r = this.metadata } = t[0], j.new(e, i, s, r);
  }
}
j.prototype.type = null;
j.prototype.name = null;
j.prototype.nullable = null;
j.prototype.metadata = null;
function He(n, t) {
  return new Map([...n || /* @__PURE__ */ new Map(), ...t || /* @__PURE__ */ new Map()]);
}
function di(n, t = /* @__PURE__ */ new Map()) {
  for (let e = -1, i = n.length; ++e < i; ) {
    const r = n[e].type;
    if (f.isDictionary(r)) {
      if (!t.has(r.id))
        t.set(r.id, r.dictionary);
      else if (t.get(r.id) !== r.dictionary)
        throw new Error("Cannot create Schema containing two different dictionaries with the same Id");
    }
    r.children && r.children.length > 0 && di(r.children, t);
  }
  return t;
}
var Ja = Es, Za = _e;
class Pe {
  /** @nocollapse */
  static decode(t) {
    t = new Za(A(t));
    const e = rt.getRootAsFooter(t), i = L.decode(e.schema(), /* @__PURE__ */ new Map(), e.version());
    return new Xa(i, e);
  }
  /** @nocollapse */
  static encode(t) {
    const e = new Ja(), i = L.encode(e, t.schema);
    rt.startRecordBatchesVector(e, t.numRecordBatches);
    for (const o of [...t.recordBatches()].slice().reverse())
      Yt.encode(e, o);
    const s = e.endVector();
    rt.startDictionariesVector(e, t.numDictionaries);
    for (const o of [...t.dictionaryBatches()].slice().reverse())
      Yt.encode(e, o);
    const r = e.endVector();
    return rt.startFooter(e), rt.addSchema(e, i), rt.addVersion(e, Y.V5), rt.addRecordBatches(e, s), rt.addDictionaries(e, r), rt.finishFooterBuffer(e, rt.endFooter(e)), e.asUint8Array();
  }
  get numRecordBatches() {
    return this._recordBatches.length;
  }
  get numDictionaries() {
    return this._dictionaryBatches.length;
  }
  constructor(t, e = Y.V5, i, s) {
    this.schema = t, this.version = e, i && (this._recordBatches = i), s && (this._dictionaryBatches = s);
  }
  *recordBatches() {
    for (let t, e = -1, i = this.numRecordBatches; ++e < i; )
      (t = this.getRecordBatch(e)) && (yield t);
  }
  *dictionaryBatches() {
    for (let t, e = -1, i = this.numDictionaries; ++e < i; )
      (t = this.getDictionaryBatch(e)) && (yield t);
  }
  getRecordBatch(t) {
    return t >= 0 && t < this.numRecordBatches && this._recordBatches[t] || null;
  }
  getDictionaryBatch(t) {
    return t >= 0 && t < this.numDictionaries && this._dictionaryBatches[t] || null;
  }
}
class Xa extends Pe {
  get numRecordBatches() {
    return this._footer.recordBatchesLength();
  }
  get numDictionaries() {
    return this._footer.dictionariesLength();
  }
  constructor(t, e) {
    super(t, e.version()), this._footer = e;
  }
  getRecordBatch(t) {
    if (t >= 0 && t < this.numRecordBatches) {
      const e = this._footer.recordBatches(t);
      if (e)
        return Yt.decode(e);
    }
    return null;
  }
  getDictionaryBatch(t) {
    if (t >= 0 && t < this.numDictionaries) {
      const e = this._footer.dictionaries(t);
      if (e)
        return Yt.decode(e);
    }
    return null;
  }
}
class Yt {
  /** @nocollapse */
  static decode(t) {
    return new Yt(t.metaDataLength(), t.bodyLength(), t.offset());
  }
  /** @nocollapse */
  static encode(t, e) {
    const { metaDataLength: i } = e, s = BigInt(e.offset), r = BigInt(e.bodyLength);
    return ci.createBlock(t, s, i, r);
  }
  constructor(t, e, i) {
    this.metaDataLength = t, this.offset = P(i), this.bodyLength = P(e);
  }
}
const V = Object.freeze({ done: !0, value: void 0 });
class rs {
  constructor(t) {
    this._json = t;
  }
  get schema() {
    return this._json.schema;
  }
  get batches() {
    return this._json.batches || [];
  }
  get dictionaries() {
    return this._json.dictionaries || [];
  }
}
class Oi {
  tee() {
    return this._getDOMStream().tee();
  }
  pipe(t, e) {
    return this._getNodeStream().pipe(t, e);
  }
  pipeTo(t, e) {
    return this._getDOMStream().pipeTo(t, e);
  }
  pipeThrough(t, e) {
    return this._getDOMStream().pipeThrough(t, e);
  }
  _getDOMStream() {
    return this._DOMStream || (this._DOMStream = this.toDOMStream());
  }
  _getNodeStream() {
    return this._nodeStream || (this._nodeStream = this.toNodeStream());
  }
}
class tc extends Oi {
  constructor() {
    super(), this._values = [], this.resolvers = [], this._closedPromise = new Promise((t) => this._closedPromiseResolve = t);
  }
  get closed() {
    return this._closedPromise;
  }
  cancel(t) {
    return E(this, void 0, void 0, function* () {
      yield this.return(t);
    });
  }
  write(t) {
    this._ensureOpen() && (this.resolvers.length <= 0 ? this._values.push(t) : this.resolvers.shift().resolve({ done: !1, value: t }));
  }
  abort(t) {
    this._closedPromiseResolve && (this.resolvers.length <= 0 ? this._error = { error: t } : this.resolvers.shift().reject({ done: !0, value: t }));
  }
  close() {
    if (this._closedPromiseResolve) {
      const { resolvers: t } = this;
      for (; t.length > 0; )
        t.shift().resolve(V);
      this._closedPromiseResolve(), this._closedPromiseResolve = void 0;
    }
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  toDOMStream(t) {
    return dt.toDOMStream(this._closedPromiseResolve || this._error ? this : this._values, t);
  }
  toNodeStream(t) {
    return dt.toNodeStream(this._closedPromiseResolve || this._error ? this : this._values, t);
  }
  throw(t) {
    return E(this, void 0, void 0, function* () {
      return yield this.abort(t), V;
    });
  }
  return(t) {
    return E(this, void 0, void 0, function* () {
      return yield this.close(), V;
    });
  }
  read(t) {
    return E(this, void 0, void 0, function* () {
      return (yield this.next(t, "read")).value;
    });
  }
  peek(t) {
    return E(this, void 0, void 0, function* () {
      return (yield this.next(t, "peek")).value;
    });
  }
  next(...t) {
    return this._values.length > 0 ? Promise.resolve({ done: !1, value: this._values.shift() }) : this._error ? Promise.reject({ done: !0, value: this._error.error }) : this._closedPromiseResolve ? new Promise((e, i) => {
      this.resolvers.push({ resolve: e, reject: i });
    }) : Promise.resolve(V);
  }
  _ensureOpen() {
    if (this._closedPromiseResolve)
      return !0;
    throw new Error("AsyncQueue is closed");
  }
}
class en extends tc {
  write(t) {
    if ((t = A(t)).byteLength > 0)
      return super.write(t);
  }
  toString(t = !1) {
    return t ? ti(this.toUint8Array(!0)) : this.toUint8Array(!1).then(ti);
  }
  toUint8Array(t = !1) {
    return t ? Ot(this._values)[0] : E(this, void 0, void 0, function* () {
      var e, i, s, r;
      const o = [];
      let a = 0;
      try {
        for (var d = !0, u = Qt(this), l; l = yield u.next(), e = l.done, !e; d = !0) {
          r = l.value, d = !1;
          const h = r;
          o.push(h), a += h.byteLength;
        }
      } catch (h) {
        i = { error: h };
      } finally {
        try {
          !d && !e && (s = u.return) && (yield s.call(u));
        } finally {
          if (i) throw i.error;
        }
      }
      return Ot(o, a)[0];
    });
  }
}
class Rn {
  constructor(t) {
    t && (this.source = new ec(dt.fromIterable(t)));
  }
  [Symbol.iterator]() {
    return this;
  }
  next(t) {
    return this.source.next(t);
  }
  throw(t) {
    return this.source.throw(t);
  }
  return(t) {
    return this.source.return(t);
  }
  peek(t) {
    return this.source.peek(t);
  }
  read(t) {
    return this.source.read(t);
  }
}
class Ie {
  constructor(t) {
    t instanceof Ie ? this.source = t.source : t instanceof en ? this.source = new qt(dt.fromAsyncIterable(t)) : Is(t) ? this.source = new qt(dt.fromNodeStream(t)) : yi(t) ? this.source = new qt(dt.fromDOMStream(t)) : bs(t) ? this.source = new qt(dt.fromDOMStream(t.body)) : je(t) ? this.source = new qt(dt.fromIterable(t)) : Jt(t) ? this.source = new qt(dt.fromAsyncIterable(t)) : Se(t) && (this.source = new qt(dt.fromAsyncIterable(t)));
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  next(t) {
    return this.source.next(t);
  }
  throw(t) {
    return this.source.throw(t);
  }
  return(t) {
    return this.source.return(t);
  }
  get closed() {
    return this.source.closed;
  }
  cancel(t) {
    return this.source.cancel(t);
  }
  peek(t) {
    return this.source.peek(t);
  }
  read(t) {
    return this.source.read(t);
  }
}
class ec {
  constructor(t) {
    this.source = t;
  }
  cancel(t) {
    this.return(t);
  }
  peek(t) {
    return this.next(t, "peek").value;
  }
  read(t) {
    return this.next(t, "read").value;
  }
  next(t, e = "read") {
    return this.source.next({ cmd: e, size: t });
  }
  throw(t) {
    return Object.create(this.source.throw && this.source.throw(t) || V);
  }
  return(t) {
    return Object.create(this.source.return && this.source.return(t) || V);
  }
}
class qt {
  constructor(t) {
    this.source = t, this._closedPromise = new Promise((e) => this._closedPromiseResolve = e);
  }
  cancel(t) {
    return E(this, void 0, void 0, function* () {
      yield this.return(t);
    });
  }
  get closed() {
    return this._closedPromise;
  }
  read(t) {
    return E(this, void 0, void 0, function* () {
      return (yield this.next(t, "read")).value;
    });
  }
  peek(t) {
    return E(this, void 0, void 0, function* () {
      return (yield this.next(t, "peek")).value;
    });
  }
  next(t) {
    return E(this, arguments, void 0, function* (e, i = "read") {
      return yield this.source.next({ cmd: i, size: e });
    });
  }
  throw(t) {
    return E(this, void 0, void 0, function* () {
      const e = this.source.throw && (yield this.source.throw(t)) || V;
      return this._closedPromiseResolve && this._closedPromiseResolve(), this._closedPromiseResolve = void 0, Object.create(e);
    });
  }
  return(t) {
    return E(this, void 0, void 0, function* () {
      const e = this.source.return && (yield this.source.return(t)) || V;
      return this._closedPromiseResolve && this._closedPromiseResolve(), this._closedPromiseResolve = void 0, Object.create(e);
    });
  }
}
class os extends Rn {
  constructor(t, e) {
    super(), this.position = 0, this.buffer = A(t), this.size = e === void 0 ? this.buffer.byteLength : e;
  }
  readInt32(t) {
    const { buffer: e, byteOffset: i } = this.readAt(t, 4);
    return new DataView(e, i).getInt32(0, !0);
  }
  seek(t) {
    return this.position = Math.min(t, this.size), t < this.size;
  }
  read(t) {
    const { buffer: e, size: i, position: s } = this;
    return e && s < i ? (typeof t != "number" && (t = Number.POSITIVE_INFINITY), this.position = Math.min(i, s + Math.min(i - s, t)), e.subarray(s, this.position)) : null;
  }
  readAt(t, e) {
    const i = this.buffer, s = Math.min(this.size, t + e);
    return i ? i.subarray(t, s) : new Uint8Array(e);
  }
  close() {
    this.buffer && (this.buffer = null);
  }
  throw(t) {
    return this.close(), { done: !0, value: t };
  }
  return(t) {
    return this.close(), { done: !0, value: t };
  }
}
class Nn extends Ie {
  constructor(t, e) {
    super(), this.position = 0, this._handle = t, typeof e == "number" ? this.size = e : this._pending = E(this, void 0, void 0, function* () {
      this.size = (yield t.stat()).size, delete this._pending;
    });
  }
  readInt32(t) {
    return E(this, void 0, void 0, function* () {
      const { buffer: e, byteOffset: i } = yield this.readAt(t, 4);
      return new DataView(e, i).getInt32(0, !0);
    });
  }
  seek(t) {
    return E(this, void 0, void 0, function* () {
      return this._pending && (yield this._pending), this.position = Math.min(t, this.size), t < this.size;
    });
  }
  read(t) {
    return E(this, void 0, void 0, function* () {
      this._pending && (yield this._pending);
      const { _handle: e, size: i, position: s } = this;
      if (e && s < i) {
        typeof t != "number" && (t = Number.POSITIVE_INFINITY);
        let r = s, o = 0, a = 0;
        const d = Math.min(i, r + Math.min(i - r, t)), u = new Uint8Array(Math.max(0, (this.position = d) - r));
        for (; (r += a) < d && (o += a) < u.byteLength; )
          ({ bytesRead: a } = yield e.read(u, o, u.byteLength - o, r));
        return u;
      }
      return null;
    });
  }
  readAt(t, e) {
    return E(this, void 0, void 0, function* () {
      this._pending && (yield this._pending);
      const { _handle: i, size: s } = this;
      if (i && t + e < s) {
        const r = Math.min(s, t + e), o = new Uint8Array(r - t);
        return (yield i.read(o, 0, e, t)).buffer;
      }
      return new Uint8Array(e);
    });
  }
  close() {
    return E(this, void 0, void 0, function* () {
      const t = this._handle;
      this._handle = null, t && (yield t.close());
    });
  }
  throw(t) {
    return E(this, void 0, void 0, function* () {
      return yield this.close(), { done: !0, value: t };
    });
  }
  return(t) {
    return E(this, void 0, void 0, function* () {
      return yield this.close(), { done: !0, value: t };
    });
  }
}
const nc = 65536;
function he(n) {
  return n < 0 && (n = 4294967295 + n + 1), `0x${n.toString(16)}`;
}
const we = 8, Bi = [
  1,
  10,
  100,
  1e3,
  1e4,
  1e5,
  1e6,
  1e7,
  1e8
];
class eo {
  constructor(t) {
    this.buffer = t;
  }
  high() {
    return this.buffer[1];
  }
  low() {
    return this.buffer[0];
  }
  _times(t) {
    const e = new Uint32Array([
      this.buffer[1] >>> 16,
      this.buffer[1] & 65535,
      this.buffer[0] >>> 16,
      this.buffer[0] & 65535
    ]), i = new Uint32Array([
      t.buffer[1] >>> 16,
      t.buffer[1] & 65535,
      t.buffer[0] >>> 16,
      t.buffer[0] & 65535
    ]);
    let s = e[3] * i[3];
    this.buffer[0] = s & 65535;
    let r = s >>> 16;
    return s = e[2] * i[3], r += s, s = e[3] * i[2] >>> 0, r += s, this.buffer[0] += r << 16, this.buffer[1] = r >>> 0 < s ? nc : 0, this.buffer[1] += r >>> 16, this.buffer[1] += e[1] * i[3] + e[2] * i[2] + e[3] * i[1], this.buffer[1] += e[0] * i[3] + e[1] * i[2] + e[2] * i[1] + e[3] * i[0] << 16, this;
  }
  _plus(t) {
    const e = this.buffer[0] + t.buffer[0] >>> 0;
    this.buffer[1] += t.buffer[1], e < this.buffer[0] >>> 0 && ++this.buffer[1], this.buffer[0] = e;
  }
  lessThan(t) {
    return this.buffer[1] < t.buffer[1] || this.buffer[1] === t.buffer[1] && this.buffer[0] < t.buffer[0];
  }
  equals(t) {
    return this.buffer[1] === t.buffer[1] && this.buffer[0] == t.buffer[0];
  }
  greaterThan(t) {
    return t.lessThan(this);
  }
  hex() {
    return `${he(this.buffer[1])} ${he(this.buffer[0])}`;
  }
}
class k extends eo {
  times(t) {
    return this._times(t), this;
  }
  plus(t) {
    return this._plus(t), this;
  }
  /** @nocollapse */
  static from(t, e = new Uint32Array(2)) {
    return k.fromString(typeof t == "string" ? t : t.toString(), e);
  }
  /** @nocollapse */
  static fromNumber(t, e = new Uint32Array(2)) {
    return k.fromString(t.toString(), e);
  }
  /** @nocollapse */
  static fromString(t, e = new Uint32Array(2)) {
    const i = t.length, s = new k(e);
    for (let r = 0; r < i; ) {
      const o = we < i - r ? we : i - r, a = new k(new Uint32Array([Number.parseInt(t.slice(r, r + o), 10), 0])), d = new k(new Uint32Array([Bi[o], 0]));
      s.times(d), s.plus(a), r += o;
    }
    return s;
  }
  /** @nocollapse */
  static convertArray(t) {
    const e = new Uint32Array(t.length * 2);
    for (let i = -1, s = t.length; ++i < s; )
      k.from(t[i], new Uint32Array(e.buffer, e.byteOffset + 2 * i * 4, 2));
    return e;
  }
  /** @nocollapse */
  static multiply(t, e) {
    return new k(new Uint32Array(t.buffer)).times(e);
  }
  /** @nocollapse */
  static add(t, e) {
    return new k(new Uint32Array(t.buffer)).plus(e);
  }
}
class tt extends eo {
  negate() {
    return this.buffer[0] = ~this.buffer[0] + 1, this.buffer[1] = ~this.buffer[1], this.buffer[0] == 0 && ++this.buffer[1], this;
  }
  times(t) {
    return this._times(t), this;
  }
  plus(t) {
    return this._plus(t), this;
  }
  lessThan(t) {
    const e = this.buffer[1] << 0, i = t.buffer[1] << 0;
    return e < i || e === i && this.buffer[0] < t.buffer[0];
  }
  /** @nocollapse */
  static from(t, e = new Uint32Array(2)) {
    return tt.fromString(typeof t == "string" ? t : t.toString(), e);
  }
  /** @nocollapse */
  static fromNumber(t, e = new Uint32Array(2)) {
    return tt.fromString(t.toString(), e);
  }
  /** @nocollapse */
  static fromString(t, e = new Uint32Array(2)) {
    const i = t.startsWith("-"), s = t.length, r = new tt(e);
    for (let o = i ? 1 : 0; o < s; ) {
      const a = we < s - o ? we : s - o, d = new tt(new Uint32Array([Number.parseInt(t.slice(o, o + a), 10), 0])), u = new tt(new Uint32Array([Bi[a], 0]));
      r.times(u), r.plus(d), o += a;
    }
    return i ? r.negate() : r;
  }
  /** @nocollapse */
  static convertArray(t) {
    const e = new Uint32Array(t.length * 2);
    for (let i = -1, s = t.length; ++i < s; )
      tt.from(t[i], new Uint32Array(e.buffer, e.byteOffset + 2 * i * 4, 2));
    return e;
  }
  /** @nocollapse */
  static multiply(t, e) {
    return new tt(new Uint32Array(t.buffer)).times(e);
  }
  /** @nocollapse */
  static add(t, e) {
    return new tt(new Uint32Array(t.buffer)).plus(e);
  }
}
class It {
  constructor(t) {
    this.buffer = t;
  }
  high() {
    return new tt(new Uint32Array(this.buffer.buffer, this.buffer.byteOffset + 8, 2));
  }
  low() {
    return new tt(new Uint32Array(this.buffer.buffer, this.buffer.byteOffset, 2));
  }
  negate() {
    return this.buffer[0] = ~this.buffer[0] + 1, this.buffer[1] = ~this.buffer[1], this.buffer[2] = ~this.buffer[2], this.buffer[3] = ~this.buffer[3], this.buffer[0] == 0 && ++this.buffer[1], this.buffer[1] == 0 && ++this.buffer[2], this.buffer[2] == 0 && ++this.buffer[3], this;
  }
  times(t) {
    const e = new k(new Uint32Array([this.buffer[3], 0])), i = new k(new Uint32Array([this.buffer[2], 0])), s = new k(new Uint32Array([this.buffer[1], 0])), r = new k(new Uint32Array([this.buffer[0], 0])), o = new k(new Uint32Array([t.buffer[3], 0])), a = new k(new Uint32Array([t.buffer[2], 0])), d = new k(new Uint32Array([t.buffer[1], 0])), u = new k(new Uint32Array([t.buffer[0], 0]));
    let l = k.multiply(r, u);
    this.buffer[0] = l.low();
    const h = new k(new Uint32Array([l.high(), 0]));
    return l = k.multiply(s, u), h.plus(l), l = k.multiply(r, d), h.plus(l), this.buffer[1] = h.low(), this.buffer[3] = h.lessThan(l) ? 1 : 0, this.buffer[2] = h.high(), new k(new Uint32Array(this.buffer.buffer, this.buffer.byteOffset + 8, 2)).plus(k.multiply(i, u)).plus(k.multiply(s, d)).plus(k.multiply(r, a)), this.buffer[3] += k.multiply(e, u).plus(k.multiply(i, d)).plus(k.multiply(s, a)).plus(k.multiply(r, o)).low(), this;
  }
  plus(t) {
    const e = new Uint32Array(4);
    return e[3] = this.buffer[3] + t.buffer[3] >>> 0, e[2] = this.buffer[2] + t.buffer[2] >>> 0, e[1] = this.buffer[1] + t.buffer[1] >>> 0, e[0] = this.buffer[0] + t.buffer[0] >>> 0, e[0] < this.buffer[0] >>> 0 && ++e[1], e[1] < this.buffer[1] >>> 0 && ++e[2], e[2] < this.buffer[2] >>> 0 && ++e[3], this.buffer[3] = e[3], this.buffer[2] = e[2], this.buffer[1] = e[1], this.buffer[0] = e[0], this;
  }
  hex() {
    return `${he(this.buffer[3])} ${he(this.buffer[2])} ${he(this.buffer[1])} ${he(this.buffer[0])}`;
  }
  /** @nocollapse */
  static multiply(t, e) {
    return new It(new Uint32Array(t.buffer)).times(e);
  }
  /** @nocollapse */
  static add(t, e) {
    return new It(new Uint32Array(t.buffer)).plus(e);
  }
  /** @nocollapse */
  static from(t, e = new Uint32Array(4)) {
    return It.fromString(typeof t == "string" ? t : t.toString(), e);
  }
  /** @nocollapse */
  static fromNumber(t, e = new Uint32Array(4)) {
    return It.fromString(t.toString(), e);
  }
  /** @nocollapse */
  static fromString(t, e = new Uint32Array(4)) {
    const i = t.startsWith("-"), s = t.length, r = new It(e);
    for (let o = i ? 1 : 0; o < s; ) {
      const a = we < s - o ? we : s - o, d = new It(new Uint32Array([Number.parseInt(t.slice(o, o + a), 10), 0, 0, 0])), u = new It(new Uint32Array([Bi[a], 0, 0, 0]));
      r.times(u), r.plus(d), o += a;
    }
    return i ? r.negate() : r;
  }
  /** @nocollapse */
  static convertArray(t) {
    const e = new Uint32Array(t.length * 4);
    for (let i = -1, s = t.length; ++i < s; )
      It.from(t[i], new Uint32Array(e.buffer, e.byteOffset + 4 * 4 * i, 4));
    return e;
  }
}
class no extends O {
  constructor(t, e, i, s, r = Y.V5) {
    super(), this.nodesIndex = -1, this.buffersIndex = -1, this.bytes = t, this.nodes = e, this.buffers = i, this.dictionaries = s, this.metadataVersion = r;
  }
  visit(t) {
    return super.visit(t instanceof j ? t.type : t);
  }
  visitNull(t, { length: e } = this.nextFieldNode()) {
    return B({ type: t, length: e });
  }
  visitBool(t, { length: e, nullCount: i } = this.nextFieldNode()) {
    return B({ type: t, length: e, nullCount: i, nullBitmap: this.readNullBitmap(t, i), data: this.readData(t) });
  }
  visitInt(t, { length: e, nullCount: i } = this.nextFieldNode()) {
    return B({ type: t, length: e, nullCount: i, nullBitmap: this.readNullBitmap(t, i), data: this.readData(t) });
  }
  visitFloat(t, { length: e, nullCount: i } = this.nextFieldNode()) {
    return B({ type: t, length: e, nullCount: i, nullBitmap: this.readNullBitmap(t, i), data: this.readData(t) });
  }
  visitUtf8(t, { length: e, nullCount: i } = this.nextFieldNode()) {
    return B({ type: t, length: e, nullCount: i, nullBitmap: this.readNullBitmap(t, i), valueOffsets: this.readOffsets(t), data: this.readData(t) });
  }
  visitLargeUtf8(t, { length: e, nullCount: i } = this.nextFieldNode()) {
    return B({ type: t, length: e, nullCount: i, nullBitmap: this.readNullBitmap(t, i), valueOffsets: this.readOffsets(t), data: this.readData(t) });
  }
  visitBinary(t, { length: e, nullCount: i } = this.nextFieldNode()) {
    return B({ type: t, length: e, nullCount: i, nullBitmap: this.readNullBitmap(t, i), valueOffsets: this.readOffsets(t), data: this.readData(t) });
  }
  visitLargeBinary(t, { length: e, nullCount: i } = this.nextFieldNode()) {
    return B({ type: t, length: e, nullCount: i, nullBitmap: this.readNullBitmap(t, i), valueOffsets: this.readOffsets(t), data: this.readData(t) });
  }
  visitFixedSizeBinary(t, { length: e, nullCount: i } = this.nextFieldNode()) {
    return B({ type: t, length: e, nullCount: i, nullBitmap: this.readNullBitmap(t, i), data: this.readData(t) });
  }
  visitDate(t, { length: e, nullCount: i } = this.nextFieldNode()) {
    return B({ type: t, length: e, nullCount: i, nullBitmap: this.readNullBitmap(t, i), data: this.readData(t) });
  }
  visitTimestamp(t, { length: e, nullCount: i } = this.nextFieldNode()) {
    return B({ type: t, length: e, nullCount: i, nullBitmap: this.readNullBitmap(t, i), data: this.readData(t) });
  }
  visitTime(t, { length: e, nullCount: i } = this.nextFieldNode()) {
    return B({ type: t, length: e, nullCount: i, nullBitmap: this.readNullBitmap(t, i), data: this.readData(t) });
  }
  visitDecimal(t, { length: e, nullCount: i } = this.nextFieldNode()) {
    return B({ type: t, length: e, nullCount: i, nullBitmap: this.readNullBitmap(t, i), data: this.readData(t) });
  }
  visitList(t, { length: e, nullCount: i } = this.nextFieldNode()) {
    return B({ type: t, length: e, nullCount: i, nullBitmap: this.readNullBitmap(t, i), valueOffsets: this.readOffsets(t), child: this.visit(t.children[0]) });
  }
  visitStruct(t, { length: e, nullCount: i } = this.nextFieldNode()) {
    return B({ type: t, length: e, nullCount: i, nullBitmap: this.readNullBitmap(t, i), children: this.visitMany(t.children) });
  }
  visitUnion(t, { length: e, nullCount: i } = this.nextFieldNode()) {
    return this.metadataVersion < Y.V5 && this.readNullBitmap(t, i), t.mode === K.Sparse ? this.visitSparseUnion(t, { length: e, nullCount: i }) : this.visitDenseUnion(t, { length: e, nullCount: i });
  }
  visitDenseUnion(t, { length: e, nullCount: i } = this.nextFieldNode()) {
    return B({ type: t, length: e, nullCount: i, typeIds: this.readTypeIds(t), valueOffsets: this.readOffsets(t), children: this.visitMany(t.children) });
  }
  visitSparseUnion(t, { length: e, nullCount: i } = this.nextFieldNode()) {
    return B({ type: t, length: e, nullCount: i, typeIds: this.readTypeIds(t), children: this.visitMany(t.children) });
  }
  visitDictionary(t, { length: e, nullCount: i } = this.nextFieldNode()) {
    return B({ type: t, length: e, nullCount: i, nullBitmap: this.readNullBitmap(t, i), data: this.readData(t.indices), dictionary: this.readDictionary(t) });
  }
  visitInterval(t, { length: e, nullCount: i } = this.nextFieldNode()) {
    return B({ type: t, length: e, nullCount: i, nullBitmap: this.readNullBitmap(t, i), data: this.readData(t) });
  }
  visitDuration(t, { length: e, nullCount: i } = this.nextFieldNode()) {
    return B({ type: t, length: e, nullCount: i, nullBitmap: this.readNullBitmap(t, i), data: this.readData(t) });
  }
  visitFixedSizeList(t, { length: e, nullCount: i } = this.nextFieldNode()) {
    return B({ type: t, length: e, nullCount: i, nullBitmap: this.readNullBitmap(t, i), child: this.visit(t.children[0]) });
  }
  visitMap(t, { length: e, nullCount: i } = this.nextFieldNode()) {
    return B({ type: t, length: e, nullCount: i, nullBitmap: this.readNullBitmap(t, i), valueOffsets: this.readOffsets(t), child: this.visit(t.children[0]) });
  }
  nextFieldNode() {
    return this.nodes[++this.nodesIndex];
  }
  nextBufferRange() {
    return this.buffers[++this.buffersIndex];
  }
  readNullBitmap(t, e, i = this.nextBufferRange()) {
    return e > 0 && this.readData(t, i) || new Uint8Array(0);
  }
  readOffsets(t, e) {
    return this.readData(t, e);
  }
  readTypeIds(t, e) {
    return this.readData(t, e);
  }
  readData(t, { length: e, offset: i } = this.nextBufferRange()) {
    return this.bytes.subarray(i, i + e);
  }
  readDictionary(t) {
    return this.dictionaries.get(t.id);
  }
}
class ic extends no {
  constructor(t, e, i, s, r) {
    super(new Uint8Array(0), e, i, s, r), this.sources = t;
  }
  readNullBitmap(t, e, { offset: i } = this.nextBufferRange()) {
    return e <= 0 ? new Uint8Array(0) : Bn(this.sources[i]);
  }
  readOffsets(t, { offset: e } = this.nextBufferRange()) {
    return C(Uint8Array, C(t.OffsetArrayType, this.sources[e]));
  }
  readTypeIds(t, { offset: e } = this.nextBufferRange()) {
    return C(Uint8Array, C(t.ArrayType, this.sources[e]));
  }
  readData(t, { offset: e } = this.nextBufferRange()) {
    const { sources: i } = this;
    return f.isTimestamp(t) || (f.isInt(t) || f.isTime(t)) && t.bitWidth === 64 || f.isDuration(t) || f.isDate(t) && t.unit === ft.MILLISECOND ? C(Uint8Array, tt.convertArray(i[e])) : f.isDecimal(t) ? C(Uint8Array, It.convertArray(i[e])) : f.isBinary(t) || f.isLargeBinary(t) || f.isFixedSizeBinary(t) ? sc(i[e]) : f.isBool(t) ? Bn(i[e]) : f.isUtf8(t) || f.isLargeUtf8(t) ? pi(i[e].join("")) : C(Uint8Array, C(t.ArrayType, i[e].map((s) => +s)));
  }
}
function sc(n) {
  const t = n.join(""), e = new Uint8Array(t.length / 2);
  for (let i = 0; i < t.length; i += 2)
    e[i >> 1] = Number.parseInt(t.slice(i, i + 2), 16);
  return e;
}
class _ extends O {
  compareSchemas(t, e) {
    return t === e || e instanceof t.constructor && this.compareManyFields(t.fields, e.fields);
  }
  compareManyFields(t, e) {
    return t === e || Array.isArray(t) && Array.isArray(e) && t.length === e.length && t.every((i, s) => this.compareFields(i, e[s]));
  }
  compareFields(t, e) {
    return t === e || e instanceof t.constructor && t.name === e.name && t.nullable === e.nullable && this.visit(t.type, e.type);
  }
}
function X(n, t) {
  return t instanceof n.constructor;
}
function Xt(n, t) {
  return n === t || X(n, t);
}
function kt(n, t) {
  return n === t || X(n, t) && n.bitWidth === t.bitWidth && n.isSigned === t.isSigned;
}
function xn(n, t) {
  return n === t || X(n, t) && n.precision === t.precision;
}
function rc(n, t) {
  return n === t || X(n, t) && n.byteWidth === t.byteWidth;
}
function Ai(n, t) {
  return n === t || X(n, t) && n.unit === t.unit;
}
function Ve(n, t) {
  return n === t || X(n, t) && n.unit === t.unit && n.timezone === t.timezone;
}
function ze(n, t) {
  return n === t || X(n, t) && n.unit === t.unit && n.bitWidth === t.bitWidth;
}
function oc(n, t) {
  return n === t || X(n, t) && n.children.length === t.children.length && Wt.compareManyFields(n.children, t.children);
}
function ac(n, t) {
  return n === t || X(n, t) && n.children.length === t.children.length && Wt.compareManyFields(n.children, t.children);
}
function Fi(n, t) {
  return n === t || X(n, t) && n.mode === t.mode && n.typeIds.every((e, i) => e === t.typeIds[i]) && Wt.compareManyFields(n.children, t.children);
}
function cc(n, t) {
  return n === t || X(n, t) && n.id === t.id && n.isOrdered === t.isOrdered && Wt.visit(n.indices, t.indices) && Wt.visit(n.dictionary, t.dictionary);
}
function Di(n, t) {
  return n === t || X(n, t) && n.unit === t.unit;
}
function $e(n, t) {
  return n === t || X(n, t) && n.unit === t.unit;
}
function dc(n, t) {
  return n === t || X(n, t) && n.listSize === t.listSize && n.children.length === t.children.length && Wt.compareManyFields(n.children, t.children);
}
function uc(n, t) {
  return n === t || X(n, t) && n.keysSorted === t.keysSorted && n.children.length === t.children.length && Wt.compareManyFields(n.children, t.children);
}
_.prototype.visitNull = Xt;
_.prototype.visitBool = Xt;
_.prototype.visitInt = kt;
_.prototype.visitInt8 = kt;
_.prototype.visitInt16 = kt;
_.prototype.visitInt32 = kt;
_.prototype.visitInt64 = kt;
_.prototype.visitUint8 = kt;
_.prototype.visitUint16 = kt;
_.prototype.visitUint32 = kt;
_.prototype.visitUint64 = kt;
_.prototype.visitFloat = xn;
_.prototype.visitFloat16 = xn;
_.prototype.visitFloat32 = xn;
_.prototype.visitFloat64 = xn;
_.prototype.visitUtf8 = Xt;
_.prototype.visitLargeUtf8 = Xt;
_.prototype.visitBinary = Xt;
_.prototype.visitLargeBinary = Xt;
_.prototype.visitFixedSizeBinary = rc;
_.prototype.visitDate = Ai;
_.prototype.visitDateDay = Ai;
_.prototype.visitDateMillisecond = Ai;
_.prototype.visitTimestamp = Ve;
_.prototype.visitTimestampSecond = Ve;
_.prototype.visitTimestampMillisecond = Ve;
_.prototype.visitTimestampMicrosecond = Ve;
_.prototype.visitTimestampNanosecond = Ve;
_.prototype.visitTime = ze;
_.prototype.visitTimeSecond = ze;
_.prototype.visitTimeMillisecond = ze;
_.prototype.visitTimeMicrosecond = ze;
_.prototype.visitTimeNanosecond = ze;
_.prototype.visitDecimal = Xt;
_.prototype.visitList = oc;
_.prototype.visitStruct = ac;
_.prototype.visitUnion = Fi;
_.prototype.visitDenseUnion = Fi;
_.prototype.visitSparseUnion = Fi;
_.prototype.visitDictionary = cc;
_.prototype.visitInterval = Di;
_.prototype.visitIntervalDayTime = Di;
_.prototype.visitIntervalYearMonth = Di;
_.prototype.visitDuration = $e;
_.prototype.visitDurationSecond = $e;
_.prototype.visitDurationMillisecond = $e;
_.prototype.visitDurationMicrosecond = $e;
_.prototype.visitDurationNanosecond = $e;
_.prototype.visitFixedSizeList = dc;
_.prototype.visitMap = uc;
const Wt = new _();
function ui(n, t) {
  return Wt.compareSchemas(n, t);
}
function Hn(n, t) {
  return lc(n, t.map((e) => e.data.concat()));
}
function lc(n, t) {
  const e = [...n.fields], i = [], s = { numBatches: t.reduce((h, $) => Math.max(h, $.length), 0) };
  let r = 0, o = 0, a = -1;
  const d = t.length;
  let u, l = [];
  for (; s.numBatches-- > 0; ) {
    for (o = Number.POSITIVE_INFINITY, a = -1; ++a < d; )
      l[a] = u = t[a].shift(), o = Math.min(o, u ? u.length : o);
    Number.isFinite(o) && (l = hc(e, o, l, t, s), o > 0 && (i[r++] = B({
      type: new J(e),
      length: o,
      nullCount: 0,
      children: l.slice()
    })));
  }
  return [
    n = n.assign(e),
    i.map((h) => new nt(n, h))
  ];
}
function hc(n, t, e, i, s) {
  var r;
  const o = (t + 63 & -64) >> 3;
  for (let a = -1, d = i.length; ++a < d; ) {
    const u = e[a], l = u == null ? void 0 : u.length;
    if (l >= t)
      l === t ? e[a] = u : (e[a] = u.slice(0, t), s.numBatches = Math.max(s.numBatches, i[a].unshift(u.slice(t, l - t))));
    else {
      const h = n[a];
      n[a] = h.clone({ nullable: !0 }), e[a] = (r = u == null ? void 0 : u._changeLengthAndBackfillNullBitmap(t)) !== null && r !== void 0 ? r : B({
        type: h.type,
        length: t,
        nullCount: t,
        nullBitmap: new Uint8Array(o)
      });
    }
  }
  return e;
}
var io;
class Q {
  constructor(...t) {
    var e, i;
    if (t.length === 0)
      return this.batches = [], this.schema = new L([]), this._offsets = [0], this;
    let s, r;
    t[0] instanceof L && (s = t.shift()), t.at(-1) instanceof Uint32Array && (r = t.pop());
    const o = (d) => {
      if (d) {
        if (d instanceof nt)
          return [d];
        if (d instanceof Q)
          return d.batches;
        if (d instanceof U) {
          if (d.type instanceof J)
            return [new nt(new L(d.type.children), d)];
        } else {
          if (Array.isArray(d))
            return d.flatMap((u) => o(u));
          if (typeof d[Symbol.iterator] == "function")
            return [...d].flatMap((u) => o(u));
          if (typeof d == "object") {
            const u = Object.keys(d), l = u.map((F) => new N([d[F]])), h = s ?? new L(u.map((F, H) => new j(String(F), l[H].type, l[H].nullable))), [, $] = Hn(h, l);
            return $.length === 0 ? [new nt(d)] : $;
          }
        }
      }
      return [];
    }, a = t.flatMap((d) => o(d));
    if (s = (i = s ?? ((e = a[0]) === null || e === void 0 ? void 0 : e.schema)) !== null && i !== void 0 ? i : new L([]), !(s instanceof L))
      throw new TypeError("Table constructor expects a [Schema, RecordBatch[]] pair.");
    for (const d of a) {
      if (!(d instanceof nt))
        throw new TypeError("Table constructor expects a [Schema, RecordBatch[]] pair.");
      if (!ui(s, d.schema))
        throw new TypeError("Table and inner RecordBatch schemas must be equivalent.");
    }
    this.schema = s, this.batches = a, this._offsets = r ?? Hr(this.data);
  }
  /**
   * The contiguous {@link RecordBatch `RecordBatch`} chunks of the Table rows.
   */
  get data() {
    return this.batches.map(({ data: t }) => t);
  }
  /**
   * The number of columns in this Table.
   */
  get numCols() {
    return this.schema.fields.length;
  }
  /**
   * The number of rows in this Table.
   */
  get numRows() {
    return this.data.reduce((t, e) => t + e.length, 0);
  }
  /**
   * The number of null rows in this Table.
   */
  get nullCount() {
    return this._nullCount === -1 && (this._nullCount = Gr(this.data)), this._nullCount;
  }
  /**
   * Check whether an element is null.
   *
   * @param index The index at which to read the validity bitmap.
   */
  // @ts-ignore
  isValid(t) {
    return !1;
  }
  /**
   * Get an element value by position.
   *
   * @param index The index of the element to read.
   */
  // @ts-ignore
  get(t) {
    return null;
  }
  /**
    * Get an element value by position.
    * @param index The index of the element to read. A negative index will count back from the last element.
    */
  // @ts-ignore
  at(t) {
    return this.get(wi(t, this.numRows));
  }
  /**
   * Set an element value by position.
   *
   * @param index The index of the element to write.
   * @param value The value to set.
   */
  // @ts-ignore
  set(t, e) {
  }
  /**
   * Retrieve the index of the first occurrence of a value in an Vector.
   *
   * @param element The value to locate in the Vector.
   * @param offset The index at which to begin the search. If offset is omitted, the search starts at index 0.
   */
  // @ts-ignore
  indexOf(t, e) {
    return -1;
  }
  /**
   * Iterator for rows in this Table.
   */
  [Symbol.iterator]() {
    return this.batches.length > 0 ? Ti.visit(new N(this.data)) : new Array(0)[Symbol.iterator]();
  }
  /**
   * Return a JavaScript Array of the Table rows.
   *
   * @returns An Array of Table rows.
   */
  toArray() {
    return [...this];
  }
  /**
   * Returns a string representation of the Table rows.
   *
   * @returns A string representation of the Table rows.
   */
  toString() {
    return `[
  ${this.toArray().join(`,
  `)}
]`;
  }
  /**
   * Combines two or more Tables of the same schema.
   *
   * @param others Additional Tables to add to the end of this Tables.
   */
  concat(...t) {
    const e = this.schema, i = this.data.concat(t.flatMap(({ data: s }) => s));
    return new Q(e, i.map((s) => new nt(e, s)));
  }
  /**
   * Return a zero-copy sub-section of this Table.
   *
   * @param begin The beginning of the specified portion of the Table.
   * @param end The end of the specified portion of the Table. This is exclusive of the element at the index 'end'.
   */
  slice(t, e) {
    const i = this.schema;
    [t, e] = Yr({ length: this.numRows }, t, e);
    const s = qr(this.data, this._offsets, t, e);
    return new Q(i, s.map((r) => new nt(i, r)));
  }
  /**
   * Returns a child Vector by name, or null if this Vector has no child with the given name.
   *
   * @param name The name of the child to retrieve.
   */
  getChild(t) {
    return this.getChildAt(this.schema.fields.findIndex((e) => e.name === t));
  }
  /**
   * Returns a child Vector by index, or null if this Vector has no child at the supplied index.
   *
   * @param index The index of the child to retrieve.
   */
  getChildAt(t) {
    if (t > -1 && t < this.schema.fields.length) {
      const e = this.data.map((i) => i.children[t]);
      if (e.length === 0) {
        const { type: i } = this.schema.fields[t], s = B({ type: i, length: 0, nullCount: 0 });
        e.push(s._changeLengthAndBackfillNullBitmap(this.numRows));
      }
      return new N(e);
    }
    return null;
  }
  /**
   * Sets a child Vector by name.
   *
   * @param name The name of the child to overwrite.
   * @returns A new Table with the supplied child for the specified name.
   */
  setChild(t, e) {
    var i;
    return this.setChildAt((i = this.schema.fields) === null || i === void 0 ? void 0 : i.findIndex((s) => s.name === t), e);
  }
  setChildAt(t, e) {
    let i = this.schema, s = [...this.batches];
    if (t > -1 && t < this.numCols) {
      e || (e = new N([B({ type: new $t(), length: this.numRows })]));
      const r = i.fields.slice(), o = r[t].clone({ type: e.type }), a = this.schema.fields.map((d, u) => this.getChildAt(u));
      [r[t], a[t]] = [o, e], [i, s] = Hn(i, a);
    }
    return new Q(i, s);
  }
  /**
   * Construct a new Table containing only specified columns.
   *
   * @param columnNames Names of columns to keep.
   * @returns A new Table of columns matching the specified names.
   */
  select(t) {
    const e = this.schema.fields.reduce((i, s, r) => i.set(s.name, r), /* @__PURE__ */ new Map());
    return this.selectAt(t.map((i) => e.get(i)).filter((i) => i > -1));
  }
  /**
   * Construct a new Table containing only columns at the specified indices.
   *
   * @param columnIndices Indices of columns to keep.
   * @returns A new Table of columns at the specified indices.
   */
  selectAt(t) {
    const e = this.schema.selectAt(t), i = this.batches.map((s) => s.selectAt(t));
    return new Q(e, i);
  }
  assign(t) {
    const e = this.schema.fields, [i, s] = t.schema.fields.reduce((a, d, u) => {
      const [l, h] = a, $ = e.findIndex((F) => F.name === d.name);
      return ~$ ? h[$] = u : l.push(u), a;
    }, [[], []]), r = this.schema.assign(t.schema), o = [
      ...e.map((a, d) => [d, s[d]]).map(([a, d]) => d === void 0 ? this.getChildAt(a) : t.getChildAt(d)),
      ...i.map((a) => t.getChildAt(a))
    ].filter(Boolean);
    return new Q(...Hn(r, o));
  }
}
io = Symbol.toStringTag;
Q[io] = ((n) => (n.schema = null, n.batches = [], n._offsets = new Uint32Array([0]), n._nullCount = -1, n[Symbol.isConcatSpreadable] = !0, n.isValid = An(Ei), n.get = An(st.getVisitFn(c.Struct)), n.set = Kr(pt.getVisitFn(c.Struct)), n.indexOf = Qr(Fn.getVisitFn(c.Struct)), "Table"))(Q.prototype);
var so;
let nt = class Ne {
  constructor(...t) {
    switch (t.length) {
      case 2: {
        if ([this.schema] = t, !(this.schema instanceof L))
          throw new TypeError("RecordBatch constructor expects a [Schema, Data] pair.");
        if ([
          ,
          this.data = B({
            nullCount: 0,
            type: new J(this.schema.fields),
            children: this.schema.fields.map((e) => B({ type: e.type, nullCount: 0 }))
          })
        ] = t, !(this.data instanceof U))
          throw new TypeError("RecordBatch constructor expects a [Schema, Data] pair.");
        [this.schema, this.data] = as(this.schema, this.data.children);
        break;
      }
      case 1: {
        const [e] = t, { fields: i, children: s, length: r } = Object.keys(e).reduce((d, u, l) => (d.children[l] = e[u], d.length = Math.max(d.length, e[u].length), d.fields[l] = j.new({ name: u, type: e[u].type, nullable: !0 }), d), {
          length: 0,
          fields: new Array(),
          children: new Array()
        }), o = new L(i), a = B({ type: new J(i), length: r, children: s, nullCount: 0 });
        [this.schema, this.data] = as(o, a.children, r);
        break;
      }
      default:
        throw new TypeError("RecordBatch constructor expects an Object mapping names to child Data, or a [Schema, Data] pair.");
    }
  }
  get dictionaries() {
    return this._dictionaries || (this._dictionaries = ro(this.schema.fields, this.data.children));
  }
  /**
   * The number of columns in this RecordBatch.
   */
  get numCols() {
    return this.schema.fields.length;
  }
  /**
   * The number of rows in this RecordBatch.
   */
  get numRows() {
    return this.data.length;
  }
  /**
   * The number of null rows in this RecordBatch.
   */
  get nullCount() {
    return this.data.nullCount;
  }
  /**
   * Check whether an row is null.
   * @param index The index at which to read the validity bitmap.
   */
  isValid(t) {
    return this.data.getValid(t);
  }
  /**
   * Get a row by position.
   * @param index The index of the row to read.
   */
  get(t) {
    return st.visit(this.data, t);
  }
  /**
    * Get a row value by position.
    * @param index The index of the row to read. A negative index will count back from the last row.
    */
  at(t) {
    return this.get(wi(t, this.numRows));
  }
  /**
   * Set a row by position.
   * @param index The index of the row to write.
   * @param value The value to set.
   */
  set(t, e) {
    return pt.visit(this.data, t, e);
  }
  /**
   * Retrieve the index of the first occurrence of a row in an RecordBatch.
   * @param element The row to locate in the RecordBatch.
   * @param offset The index at which to begin the search. If offset is omitted, the search starts at index 0.
   */
  indexOf(t, e) {
    return Fn.visit(this.data, t, e);
  }
  /**
   * Iterator for rows in this RecordBatch.
   */
  [Symbol.iterator]() {
    return Ti.visit(new N([this.data]));
  }
  /**
   * Return a JavaScript Array of the RecordBatch rows.
   * @returns An Array of RecordBatch rows.
   */
  toArray() {
    return [...this];
  }
  /**
   * Combines two or more RecordBatch of the same schema.
   * @param others Additional RecordBatch to add to the end of this RecordBatch.
   */
  concat(...t) {
    return new Q(this.schema, [this, ...t]);
  }
  /**
   * Return a zero-copy sub-section of this RecordBatch.
   * @param start The beginning of the specified portion of the RecordBatch.
   * @param end The end of the specified portion of the RecordBatch. This is exclusive of the row at the index 'end'.
   */
  slice(t, e) {
    const [i] = new N([this.data]).slice(t, e).data;
    return new Ne(this.schema, i);
  }
  /**
   * Returns a child Vector by name, or null if this Vector has no child with the given name.
   * @param name The name of the child to retrieve.
   */
  getChild(t) {
    var e;
    return this.getChildAt((e = this.schema.fields) === null || e === void 0 ? void 0 : e.findIndex((i) => i.name === t));
  }
  /**
   * Returns a child Vector by index, or null if this Vector has no child at the supplied index.
   * @param index The index of the child to retrieve.
   */
  getChildAt(t) {
    return t > -1 && t < this.schema.fields.length ? new N([this.data.children[t]]) : null;
  }
  /**
   * Sets a child Vector by name.
   * @param name The name of the child to overwrite.
   * @returns A new RecordBatch with the new child for the specified name.
   */
  setChild(t, e) {
    var i;
    return this.setChildAt((i = this.schema.fields) === null || i === void 0 ? void 0 : i.findIndex((s) => s.name === t), e);
  }
  setChildAt(t, e) {
    let i = this.schema, s = this.data;
    if (t > -1 && t < this.numCols) {
      e || (e = new N([B({ type: new $t(), length: this.numRows })]));
      const r = i.fields.slice(), o = s.children.slice(), a = r[t].clone({ type: e.type });
      [r[t], o[t]] = [a, e.data[0]], i = new L(r, new Map(this.schema.metadata)), s = B({ type: new J(r), children: o });
    }
    return new Ne(i, s);
  }
  /**
   * Construct a new RecordBatch containing only specified columns.
   *
   * @param columnNames Names of columns to keep.
   * @returns A new RecordBatch of columns matching the specified names.
   */
  select(t) {
    const e = this.schema.select(t), i = new J(e.fields), s = [];
    for (const r of t) {
      const o = this.schema.fields.findIndex((a) => a.name === r);
      ~o && (s[o] = this.data.children[o]);
    }
    return new Ne(e, B({ type: i, length: this.numRows, children: s }));
  }
  /**
   * Construct a new RecordBatch containing only columns at the specified indices.
   *
   * @param columnIndices Indices of columns to keep.
   * @returns A new RecordBatch of columns matching at the specified indices.
   */
  selectAt(t) {
    const e = this.schema.selectAt(t), i = t.map((r) => this.data.children[r]).filter(Boolean), s = B({ type: new J(e.fields), length: this.numRows, children: i });
    return new Ne(e, s);
  }
};
so = Symbol.toStringTag;
nt[so] = ((n) => (n._nullCount = -1, n[Symbol.isConcatSpreadable] = !0, "RecordBatch"))(nt.prototype);
function as(n, t, e = t.reduce((i, s) => Math.max(i, s.length), 0)) {
  var i;
  const s = [...n.fields], r = [...t], o = (e + 63 & -64) >> 3;
  for (const [a, d] of n.fields.entries()) {
    const u = t[a];
    (!u || u.length !== e) && (s[a] = d.clone({ nullable: !0 }), r[a] = (i = u == null ? void 0 : u._changeLengthAndBackfillNullBitmap(e)) !== null && i !== void 0 ? i : B({
      type: d.type,
      length: e,
      nullCount: e,
      nullBitmap: new Uint8Array(o)
    }));
  }
  return [
    n.assign(s),
    B({ type: new J(s), length: e, children: r })
  ];
}
function ro(n, t, e = /* @__PURE__ */ new Map()) {
  var i, s;
  if (((i = n == null ? void 0 : n.length) !== null && i !== void 0 ? i : 0) > 0 && (n == null ? void 0 : n.length) === (t == null ? void 0 : t.length))
    for (let r = -1, o = n.length; ++r < o; ) {
      const { type: a } = n[r], d = t[r];
      for (const u of [d, ...((s = d == null ? void 0 : d.dictionary) === null || s === void 0 ? void 0 : s.data) || []])
        ro(a.children, u == null ? void 0 : u.children, e);
      if (f.isDictionary(a)) {
        const { id: u } = a;
        if (!e.has(u))
          d != null && d.dictionary && e.set(u, d.dictionary);
        else if (e.get(u) !== d.dictionary)
          throw new Error("Cannot create Schema containing two different dictionaries with the same Id");
      }
    }
  return e;
}
class Ri extends nt {
  constructor(t) {
    const e = t.fields.map((s) => B({ type: s.type })), i = B({ type: new J(t.fields), nullCount: 0, children: e });
    super(t, i);
  }
}
let xt = class gt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsMessage(t, e) {
    return (e || new gt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsMessage(t, e) {
    return t.setPosition(t.position() + M), (e || new gt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  version() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : Y.V1;
  }
  headerType() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readUint8(this.bb_pos + t) : R.NONE;
  }
  header(t) {
    const e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__union(t, this.bb_pos + e) : null;
  }
  bodyLength() {
    const t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt64(this.bb_pos + t) : BigInt("0");
  }
  customMetadata(t, e) {
    const i = this.bb.__offset(this.bb_pos, 12);
    return i ? (e || new G()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb) : null;
  }
  customMetadataLength() {
    const t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startMessage(t) {
    t.startObject(5);
  }
  static addVersion(t, e) {
    t.addFieldInt16(0, e, Y.V1);
  }
  static addHeaderType(t, e) {
    t.addFieldInt8(1, e, R.NONE);
  }
  static addHeader(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addBodyLength(t, e) {
    t.addFieldInt64(3, e, BigInt("0"));
  }
  static addCustomMetadata(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static createCustomMetadataVector(t, e) {
    t.startVector(4, e.length, 4);
    for (let i = e.length - 1; i >= 0; i--)
      t.addOffset(e[i]);
    return t.endVector();
  }
  static startCustomMetadataVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endMessage(t) {
    return t.endObject();
  }
  static finishMessageBuffer(t, e) {
    t.finish(e);
  }
  static finishSizePrefixedMessageBuffer(t, e) {
    t.finish(e, void 0, !0);
  }
  static createMessage(t, e, i, s, r, o) {
    return gt.startMessage(t), gt.addVersion(t, e), gt.addHeaderType(t, i), gt.addHeader(t, s), gt.addBodyLength(t, r), gt.addCustomMetadata(t, o), gt.endMessage(t);
  }
};
class fc extends O {
  visit(t, e) {
    return t == null || e == null ? void 0 : super.visit(t, e);
  }
  visitNull(t, e) {
    return Zi.startNull(e), Zi.endNull(e);
  }
  visitInt(t, e) {
    return ot.startInt(e), ot.addBitWidth(e, t.bitWidth), ot.addIsSigned(e, t.isSigned), ot.endInt(e);
  }
  visitFloat(t, e) {
    return St.startFloatingPoint(e), St.addPrecision(e, t.precision), St.endFloatingPoint(e);
  }
  visitBinary(t, e) {
    return Hi.startBinary(e), Hi.endBinary(e);
  }
  visitLargeBinary(t, e) {
    return Ki.startLargeBinary(e), Ki.endLargeBinary(e);
  }
  visitBool(t, e) {
    return qi.startBool(e), qi.endBool(e);
  }
  visitUtf8(t, e) {
    return Xi.startUtf8(e), Xi.endUtf8(e);
  }
  visitLargeUtf8(t, e) {
    return Qi.startLargeUtf8(e), Qi.endLargeUtf8(e);
  }
  visitDecimal(t, e) {
    return se.startDecimal(e), se.addScale(e, t.scale), se.addPrecision(e, t.precision), se.addBitWidth(e, t.bitWidth), se.endDecimal(e);
  }
  visitDate(t, e) {
    return Ke.startDate(e), Ke.addUnit(e, t.unit), Ke.endDate(e);
  }
  visitTime(t, e) {
    return ut.startTime(e), ut.addUnit(e, t.unit), ut.addBitWidth(e, t.bitWidth), ut.endTime(e);
  }
  visitTimestamp(t, e) {
    const i = t.timezone && e.createString(t.timezone) || void 0;
    return lt.startTimestamp(e), lt.addUnit(e, t.unit), i !== void 0 && lt.addTimezone(e, i), lt.endTimestamp(e);
  }
  visitInterval(t, e) {
    return vt.startInterval(e), vt.addUnit(e, t.unit), vt.endInterval(e);
  }
  visitDuration(t, e) {
    return Qe.startDuration(e), Qe.addUnit(e, t.unit), Qe.endDuration(e);
  }
  visitList(t, e) {
    return Ji.startList(e), Ji.endList(e);
  }
  visitStruct(t, e) {
    return Kt.startStruct_(e), Kt.endStruct_(e);
  }
  visitUnion(t, e) {
    et.startTypeIdsVector(e, t.typeIds.length);
    const i = et.createTypeIdsVector(e, t.typeIds);
    return et.startUnion(e), et.addMode(e, t.mode), et.addTypeIds(e, i), et.endUnion(e);
  }
  visitDictionary(t, e) {
    const i = this.visit(t.indices, e);
    return Mt.startDictionaryEncoding(e), Mt.addId(e, BigInt(t.id)), Mt.addIsOrdered(e, t.isOrdered), i !== void 0 && Mt.addIndexType(e, i), Mt.endDictionaryEncoding(e);
  }
  visitFixedSizeBinary(t, e) {
    return Je.startFixedSizeBinary(e), Je.addByteWidth(e, t.byteWidth), Je.endFixedSizeBinary(e);
  }
  visitFixedSizeList(t, e) {
    return Ze.startFixedSizeList(e), Ze.addListSize(e, t.listSize), Ze.endFixedSizeList(e);
  }
  visitMap(t, e) {
    return Xe.startMap(e), Xe.addKeysSorted(e, t.keysSorted), Xe.endMap(e);
  }
}
const qn = new fc();
function pc(n, t = /* @__PURE__ */ new Map()) {
  return new L(mc(n, t), nn(n.metadata), t);
}
function oo(n) {
  return new at(n.count, ao(n.columns), co(n.columns));
}
function yc(n) {
  return new At(oo(n.data), n.id, n.isDelta);
}
function mc(n, t) {
  return (n.fields || []).filter(Boolean).map((e) => j.fromJSON(e, t));
}
function cs(n, t) {
  return (n.children || []).filter(Boolean).map((e) => j.fromJSON(e, t));
}
function ao(n) {
  return (n || []).reduce((t, e) => [
    ...t,
    new Gt(e.count, _c(e.VALIDITY)),
    ...ao(e.children)
  ], []);
}
function co(n, t = []) {
  for (let e = -1, i = (n || []).length; ++e < i; ) {
    const s = n[e];
    s.VALIDITY && t.push(new Tt(t.length, s.VALIDITY.length)), s.TYPE_ID && t.push(new Tt(t.length, s.TYPE_ID.length)), s.OFFSET && t.push(new Tt(t.length, s.OFFSET.length)), s.DATA && t.push(new Tt(t.length, s.DATA.length)), t = co(s.children, t);
  }
  return t;
}
function _c(n) {
  return (n || []).reduce((t, e) => t + +(e === 0), 0);
}
function gc(n, t) {
  let e, i, s, r, o, a;
  return !t || !(r = n.dictionary) ? (o = us(n, cs(n, t)), s = new j(n.name, o, n.nullable, nn(n.metadata))) : t.has(e = r.id) ? (i = (i = r.indexType) ? ds(i) : new Ce(), a = new be(t.get(e), i, e, r.isOrdered), s = new j(n.name, a, n.nullable, nn(n.metadata))) : (i = (i = r.indexType) ? ds(i) : new Ce(), t.set(e, o = us(n, cs(n, t))), a = new be(o, i, e, r.isOrdered), s = new j(n.name, a, n.nullable, nn(n.metadata))), s || null;
}
function nn(n = []) {
  return new Map(n.map(({ key: t, value: e }) => [t, e]));
}
function ds(n) {
  return new Zt(n.isSigned, n.bitWidth);
}
function us(n, t) {
  const e = n.type.name;
  switch (e) {
    case "NONE":
      return new $t();
    case "null":
      return new $t();
    case "binary":
      return new un();
    case "largebinary":
      return new ln();
    case "utf8":
      return new hn();
    case "largeutf8":
      return new fn();
    case "bool":
      return new pn();
    case "list":
      return new wn((t || [])[0]);
    case "struct":
      return new J(t || []);
    case "struct_":
      return new J(t || []);
  }
  switch (e) {
    case "int": {
      const i = n.type;
      return new Zt(i.isSigned, i.bitWidth);
    }
    case "floatingpoint": {
      const i = n.type;
      return new dn(q[i.precision]);
    }
    case "decimal": {
      const i = n.type;
      return new yn(i.scale, i.precision, i.bitWidth);
    }
    case "date": {
      const i = n.type;
      return new mn(ft[i.unit]);
    }
    case "time": {
      const i = n.type;
      return new _n(g[i.unit], i.bitWidth);
    }
    case "timestamp": {
      const i = n.type;
      return new gn(g[i.unit], i.timezone);
    }
    case "interval": {
      const i = n.type;
      return new bn(Bt[i.unit]);
    }
    case "duration": {
      const i = n.type;
      return new In(g[i.unit]);
    }
    case "union": {
      const i = n.type, [s, ...r] = (i.mode + "").toLowerCase(), o = s.toUpperCase() + r.join("");
      return new Sn(K[o], i.typeIds || [], t || []);
    }
    case "fixedsizebinary": {
      const i = n.type;
      return new vn(i.byteWidth);
    }
    case "fixedsizelist": {
      const i = n.type;
      return new En(i.listSize, (t || [])[0]);
    }
    case "map": {
      const i = n.type;
      return new Tn((t || [])[0], i.keysSorted);
    }
  }
  throw new Error(`Unrecognized type: "${e}"`);
}
var bc = Es, Ic = _e;
class Z {
  /** @nocollapse */
  static fromJSON(t, e) {
    const i = new Z(0, Y.V5, e);
    return i._createHeader = wc(t, e), i;
  }
  /** @nocollapse */
  static decode(t) {
    t = new Ic(A(t));
    const e = xt.getRootAsMessage(t), i = e.bodyLength(), s = e.version(), r = e.headerType(), o = new Z(i, s, r);
    return o._createHeader = Sc(e, r), o;
  }
  /** @nocollapse */
  static encode(t) {
    const e = new bc();
    let i = -1;
    return t.isSchema() ? i = L.encode(e, t.header()) : t.isRecordBatch() ? i = at.encode(e, t.header()) : t.isDictionaryBatch() && (i = At.encode(e, t.header())), xt.startMessage(e), xt.addVersion(e, Y.V5), xt.addHeader(e, i), xt.addHeaderType(e, t.headerType), xt.addBodyLength(e, BigInt(t.bodyLength)), xt.finishMessageBuffer(e, xt.endMessage(e)), e.asUint8Array();
  }
  /** @nocollapse */
  static from(t, e = 0) {
    if (t instanceof L)
      return new Z(0, Y.V5, R.Schema, t);
    if (t instanceof at)
      return new Z(e, Y.V5, R.RecordBatch, t);
    if (t instanceof At)
      return new Z(e, Y.V5, R.DictionaryBatch, t);
    throw new Error(`Unrecognized Message header: ${t}`);
  }
  get type() {
    return this.headerType;
  }
  get version() {
    return this._version;
  }
  get headerType() {
    return this._headerType;
  }
  get bodyLength() {
    return this._bodyLength;
  }
  header() {
    return this._createHeader();
  }
  isSchema() {
    return this.headerType === R.Schema;
  }
  isRecordBatch() {
    return this.headerType === R.RecordBatch;
  }
  isDictionaryBatch() {
    return this.headerType === R.DictionaryBatch;
  }
  constructor(t, e, i, s) {
    this._version = e, this._headerType = i, this.body = new Uint8Array(0), s && (this._createHeader = () => s), this._bodyLength = P(t);
  }
}
class at {
  get nodes() {
    return this._nodes;
  }
  get length() {
    return this._length;
  }
  get buffers() {
    return this._buffers;
  }
  constructor(t, e, i) {
    this._nodes = e, this._buffers = i, this._length = P(t);
  }
}
class At {
  get id() {
    return this._id;
  }
  get data() {
    return this._data;
  }
  get isDelta() {
    return this._isDelta;
  }
  get length() {
    return this.data.length;
  }
  get nodes() {
    return this.data.nodes;
  }
  get buffers() {
    return this.data.buffers;
  }
  constructor(t, e, i = !1) {
    this._data = t, this._isDelta = i, this._id = P(e);
  }
}
class Tt {
  constructor(t, e) {
    this.offset = P(t), this.length = P(e);
  }
}
class Gt {
  constructor(t, e) {
    this.length = P(t), this.nullCount = P(e);
  }
}
function wc(n, t) {
  return () => {
    switch (t) {
      case R.Schema:
        return L.fromJSON(n);
      case R.RecordBatch:
        return at.fromJSON(n);
      case R.DictionaryBatch:
        return At.fromJSON(n);
    }
    throw new Error(`Unrecognized Message type: { name: ${R[t]}, type: ${t} }`);
  };
}
function Sc(n, t) {
  return () => {
    switch (t) {
      case R.Schema:
        return L.decode(n.header(new bt()), /* @__PURE__ */ new Map(), n.version());
      case R.RecordBatch:
        return at.decode(n.header(new Dt()), n.version());
      case R.DictionaryBatch:
        return At.decode(n.header(new ne()), n.version());
    }
    throw new Error(`Unrecognized Message type: { name: ${R[t]}, type: ${t} }`);
  };
}
j.encode = Lc;
j.decode = Rc;
j.fromJSON = gc;
L.encode = Nc;
L.decode = vc;
L.fromJSON = pc;
at.encode = Mc;
at.decode = Ec;
at.fromJSON = oo;
At.encode = Uc;
At.decode = Tc;
At.fromJSON = yc;
Gt.encode = kc;
Gt.decode = Bc;
Tt.encode = Cc;
Tt.decode = Oc;
function vc(n, t = /* @__PURE__ */ new Map(), e = Y.V5) {
  const i = Dc(n, t);
  return new L(i, sn(n), t, e);
}
function Ec(n, t = Y.V5) {
  if (n.compression() !== null)
    throw new Error("Record batch compression not implemented");
  return new at(n.length(), Ac(n), Fc(n, t));
}
function Tc(n, t = Y.V5) {
  return new At(at.decode(n.data(), t), n.id(), n.isDelta());
}
function Oc(n) {
  return new Tt(n.offset(), n.length());
}
function Bc(n) {
  return new Gt(n.length(), n.nullCount());
}
function Ac(n) {
  const t = [];
  for (let e, i = -1, s = -1, r = n.nodesLength(); ++i < r; )
    (e = n.nodes(i)) && (t[++s] = Gt.decode(e));
  return t;
}
function Fc(n, t) {
  const e = [];
  for (let i, s = -1, r = -1, o = n.buffersLength(); ++s < o; )
    (i = n.buffers(s)) && (t < Y.V4 && (i.bb_pos += 8 * (s + 1)), e[++r] = Tt.decode(i));
  return e;
}
function Dc(n, t) {
  const e = [];
  for (let i, s = -1, r = -1, o = n.fieldsLength(); ++s < o; )
    (i = n.fields(s)) && (e[++r] = j.decode(i, t));
  return e;
}
function ls(n, t) {
  const e = [];
  for (let i, s = -1, r = -1, o = n.childrenLength(); ++s < o; )
    (i = n.children(s)) && (e[++r] = j.decode(i, t));
  return e;
}
function Rc(n, t) {
  let e, i, s, r, o, a;
  return !t || !(a = n.dictionary()) ? (s = fs(n, ls(n, t)), i = new j(n.name(), s, n.nullable(), sn(n))) : t.has(e = P(a.id())) ? (r = (r = a.indexType()) ? hs(r) : new Ce(), o = new be(t.get(e), r, e, a.isOrdered()), i = new j(n.name(), o, n.nullable(), sn(n))) : (r = (r = a.indexType()) ? hs(r) : new Ce(), t.set(e, s = fs(n, ls(n, t))), o = new be(s, r, e, a.isOrdered()), i = new j(n.name(), o, n.nullable(), sn(n))), i || null;
}
function sn(n) {
  const t = /* @__PURE__ */ new Map();
  if (n)
    for (let e, i, s = -1, r = Math.trunc(n.customMetadataLength()); ++s < r; )
      (e = n.customMetadata(s)) && (i = e.key()) != null && t.set(i, e.value());
  return t;
}
function hs(n) {
  return new Zt(n.isSigned(), n.bitWidth());
}
function fs(n, t) {
  const e = n.typeType();
  switch (e) {
    case x.NONE:
      return new $t();
    case x.Null:
      return new $t();
    case x.Binary:
      return new un();
    case x.LargeBinary:
      return new ln();
    case x.Utf8:
      return new hn();
    case x.LargeUtf8:
      return new fn();
    case x.Bool:
      return new pn();
    case x.List:
      return new wn((t || [])[0]);
    case x.Struct_:
      return new J(t || []);
  }
  switch (e) {
    case x.Int: {
      const i = n.type(new ot());
      return new Zt(i.isSigned(), i.bitWidth());
    }
    case x.FloatingPoint: {
      const i = n.type(new St());
      return new dn(i.precision());
    }
    case x.Decimal: {
      const i = n.type(new se());
      return new yn(i.scale(), i.precision(), i.bitWidth());
    }
    case x.Date: {
      const i = n.type(new Ke());
      return new mn(i.unit());
    }
    case x.Time: {
      const i = n.type(new ut());
      return new _n(i.unit(), i.bitWidth());
    }
    case x.Timestamp: {
      const i = n.type(new lt());
      return new gn(i.unit(), i.timezone());
    }
    case x.Interval: {
      const i = n.type(new vt());
      return new bn(i.unit());
    }
    case x.Duration: {
      const i = n.type(new Qe());
      return new In(i.unit());
    }
    case x.Union: {
      const i = n.type(new et());
      return new Sn(i.mode(), i.typeIdsArray() || [], t || []);
    }
    case x.FixedSizeBinary: {
      const i = n.type(new Je());
      return new vn(i.byteWidth());
    }
    case x.FixedSizeList: {
      const i = n.type(new Ze());
      return new En(i.listSize(), (t || [])[0]);
    }
    case x.Map: {
      const i = n.type(new Xe());
      return new Tn((t || [])[0], i.keysSorted());
    }
  }
  throw new Error(`Unrecognized type: "${x[e]}" (${e})`);
}
function Nc(n, t) {
  const e = t.fields.map((r) => j.encode(n, r));
  bt.startFieldsVector(n, e.length);
  const i = bt.createFieldsVector(n, e), s = t.metadata && t.metadata.size > 0 ? bt.createCustomMetadataVector(n, [...t.metadata].map(([r, o]) => {
    const a = n.createString(`${r}`), d = n.createString(`${o}`);
    return G.startKeyValue(n), G.addKey(n, a), G.addValue(n, d), G.endKeyValue(n);
  })) : -1;
  return bt.startSchema(n), bt.addFields(n, i), bt.addEndianness(n, Pc ? ge.Little : ge.Big), s !== -1 && bt.addCustomMetadata(n, s), bt.endSchema(n);
}
function Lc(n, t) {
  let e = -1, i = -1, s = -1;
  const r = t.type;
  let o = t.typeId;
  f.isDictionary(r) ? (o = r.dictionary.typeId, s = qn.visit(r, n), i = qn.visit(r.dictionary, n)) : i = qn.visit(r, n);
  const a = (r.children || []).map((l) => j.encode(n, l)), d = ct.createChildrenVector(n, a), u = t.metadata && t.metadata.size > 0 ? ct.createCustomMetadataVector(n, [...t.metadata].map(([l, h]) => {
    const $ = n.createString(`${l}`), F = n.createString(`${h}`);
    return G.startKeyValue(n), G.addKey(n, $), G.addValue(n, F), G.endKeyValue(n);
  })) : -1;
  return t.name && (e = n.createString(t.name)), ct.startField(n), ct.addType(n, i), ct.addTypeType(n, o), ct.addChildren(n, d), ct.addNullable(n, !!t.nullable), e !== -1 && ct.addName(n, e), s !== -1 && ct.addDictionary(n, s), u !== -1 && ct.addCustomMetadata(n, u), ct.endField(n);
}
function Mc(n, t) {
  const e = t.nodes || [], i = t.buffers || [];
  Dt.startNodesVector(n, e.length);
  for (const o of e.slice().reverse())
    Gt.encode(n, o);
  const s = n.endVector();
  Dt.startBuffersVector(n, i.length);
  for (const o of i.slice().reverse())
    Tt.encode(n, o);
  const r = n.endVector();
  return Dt.startRecordBatch(n), Dt.addLength(n, BigInt(t.length)), Dt.addNodes(n, s), Dt.addBuffers(n, r), Dt.endRecordBatch(n);
}
function Uc(n, t) {
  const e = at.encode(n, t.data);
  return ne.startDictionaryBatch(n), ne.addId(n, BigInt(t.id)), ne.addIsDelta(n, t.isDelta), ne.addData(n, e), ne.endDictionaryBatch(n);
}
function kc(n, t) {
  return Bs.createFieldNode(n, BigInt(t.length), BigInt(t.nullCount));
}
function Cc(n, t) {
  return Os.createBuffer(n, BigInt(t.offset), BigInt(t.length));
}
const Pc = (() => {
  const n = new ArrayBuffer(2);
  return new DataView(n).setInt16(
    0,
    256,
    !0
    /* littleEndian */
  ), new Int16Array(n)[0] === 256;
})(), Ni = (n) => `Expected ${R[n]} Message in stream, but was null or length 0.`, Li = (n) => `Header pointer of flatbuffer-encoded ${R[n]} Message is null or length 0.`, uo = (n, t) => `Expected to read ${n} metadata bytes, but only read ${t}.`, lo = (n, t) => `Expected to read ${n} bytes for message body, but only read ${t}.`;
class ho {
  constructor(t) {
    this.source = t instanceof Rn ? t : new Rn(t);
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    let t;
    return (t = this.readMetadataLength()).done || t.value === -1 && (t = this.readMetadataLength()).done || (t = this.readMetadata(t.value)).done ? V : t;
  }
  throw(t) {
    return this.source.throw(t);
  }
  return(t) {
    return this.source.return(t);
  }
  readMessage(t) {
    let e;
    if ((e = this.next()).done)
      return null;
    if (t != null && e.value.headerType !== t)
      throw new Error(Ni(t));
    return e.value;
  }
  readMessageBody(t) {
    if (t <= 0)
      return new Uint8Array(0);
    const e = A(this.source.read(t));
    if (e.byteLength < t)
      throw new Error(lo(t, e.byteLength));
    return (
      /* 1. */
      e.byteOffset % 8 === 0 && /* 2. */
      e.byteOffset + e.byteLength <= e.buffer.byteLength ? e : e.slice()
    );
  }
  readSchema(t = !1) {
    const e = R.Schema, i = this.readMessage(e), s = i == null ? void 0 : i.header();
    if (t && !s)
      throw new Error(Li(e));
    return s;
  }
  readMetadataLength() {
    const t = this.source.read(jn), e = t && new _e(t), i = (e == null ? void 0 : e.readInt32(0)) || 0;
    return { done: i === 0, value: i };
  }
  readMetadata(t) {
    const e = this.source.read(t);
    if (!e)
      return V;
    if (e.byteLength < t)
      throw new Error(uo(t, e.byteLength));
    return { done: !1, value: Z.decode(e) };
  }
}
class xc {
  constructor(t, e) {
    this.source = t instanceof Ie ? t : gs(t) ? new Nn(t, e) : new Ie(t);
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  next() {
    return E(this, void 0, void 0, function* () {
      let t;
      return (t = yield this.readMetadataLength()).done || t.value === -1 && (t = yield this.readMetadataLength()).done || (t = yield this.readMetadata(t.value)).done ? V : t;
    });
  }
  throw(t) {
    return E(this, void 0, void 0, function* () {
      return yield this.source.throw(t);
    });
  }
  return(t) {
    return E(this, void 0, void 0, function* () {
      return yield this.source.return(t);
    });
  }
  readMessage(t) {
    return E(this, void 0, void 0, function* () {
      let e;
      if ((e = yield this.next()).done)
        return null;
      if (t != null && e.value.headerType !== t)
        throw new Error(Ni(t));
      return e.value;
    });
  }
  readMessageBody(t) {
    return E(this, void 0, void 0, function* () {
      if (t <= 0)
        return new Uint8Array(0);
      const e = A(yield this.source.read(t));
      if (e.byteLength < t)
        throw new Error(lo(t, e.byteLength));
      return (
        /* 1. */
        e.byteOffset % 8 === 0 && /* 2. */
        e.byteOffset + e.byteLength <= e.buffer.byteLength ? e : e.slice()
      );
    });
  }
  readSchema() {
    return E(this, arguments, void 0, function* (t = !1) {
      const e = R.Schema, i = yield this.readMessage(e), s = i == null ? void 0 : i.header();
      if (t && !s)
        throw new Error(Li(e));
      return s;
    });
  }
  readMetadataLength() {
    return E(this, void 0, void 0, function* () {
      const t = yield this.source.read(jn), e = t && new _e(t), i = (e == null ? void 0 : e.readInt32(0)) || 0;
      return { done: i === 0, value: i };
    });
  }
  readMetadata(t) {
    return E(this, void 0, void 0, function* () {
      const e = yield this.source.read(t);
      if (!e)
        return V;
      if (e.byteLength < t)
        throw new Error(uo(t, e.byteLength));
      return { done: !1, value: Z.decode(e) };
    });
  }
}
class jc extends ho {
  constructor(t) {
    super(new Uint8Array(0)), this._schema = !1, this._body = [], this._batchIndex = 0, this._dictionaryIndex = 0, this._json = t instanceof rs ? t : new rs(t);
  }
  next() {
    const { _json: t } = this;
    if (!this._schema)
      return this._schema = !0, { done: !1, value: Z.fromJSON(t.schema, R.Schema) };
    if (this._dictionaryIndex < t.dictionaries.length) {
      const e = t.dictionaries[this._dictionaryIndex++];
      return this._body = e.data.columns, { done: !1, value: Z.fromJSON(e, R.DictionaryBatch) };
    }
    if (this._batchIndex < t.batches.length) {
      const e = t.batches[this._batchIndex++];
      return this._body = e.columns, { done: !1, value: Z.fromJSON(e, R.RecordBatch) };
    }
    return this._body = [], V;
  }
  readMessageBody(t) {
    return e(this._body);
    function e(i) {
      return (i || []).reduce((s, r) => [
        ...s,
        ...r.VALIDITY && [r.VALIDITY] || [],
        ...r.TYPE_ID && [r.TYPE_ID] || [],
        ...r.OFFSET && [r.OFFSET] || [],
        ...r.DATA && [r.DATA] || [],
        ...e(r.children)
      ], []);
    }
  }
  readMessage(t) {
    let e;
    if ((e = this.next()).done)
      return null;
    if (t != null && e.value.headerType !== t)
      throw new Error(Ni(t));
    return e.value;
  }
  readSchema() {
    const t = R.Schema, e = this.readMessage(t), i = e == null ? void 0 : e.header();
    if (!e || !i)
      throw new Error(Li(t));
    return i;
  }
}
const jn = 4, li = "ARROW1", xe = new Uint8Array(li.length);
for (let n = 0; n < li.length; n += 1)
  xe[n] = li.codePointAt(n);
function Mi(n, t = 0) {
  for (let e = -1, i = xe.length; ++e < i; )
    if (xe[e] !== n[t + e])
      return !1;
  return !0;
}
const Ye = xe.length, fo = Ye + jn, Vc = Ye * 2 + jn;
class ht extends Oi {
  constructor(t) {
    super(), this._impl = t;
  }
  get closed() {
    return this._impl.closed;
  }
  get schema() {
    return this._impl.schema;
  }
  get autoDestroy() {
    return this._impl.autoDestroy;
  }
  get dictionaries() {
    return this._impl.dictionaries;
  }
  get numDictionaries() {
    return this._impl.numDictionaries;
  }
  get numRecordBatches() {
    return this._impl.numRecordBatches;
  }
  get footer() {
    return this._impl.isFile() ? this._impl.footer : null;
  }
  isSync() {
    return this._impl.isSync();
  }
  isAsync() {
    return this._impl.isAsync();
  }
  isFile() {
    return this._impl.isFile();
  }
  isStream() {
    return this._impl.isStream();
  }
  next() {
    return this._impl.next();
  }
  throw(t) {
    return this._impl.throw(t);
  }
  return(t) {
    return this._impl.return(t);
  }
  cancel() {
    return this._impl.cancel();
  }
  reset(t) {
    return this._impl.reset(t), this._DOMStream = void 0, this._nodeStream = void 0, this;
  }
  open(t) {
    const e = this._impl.open(t);
    return Jt(e) ? e.then(() => this) : this;
  }
  readRecordBatch(t) {
    return this._impl.isFile() ? this._impl.readRecordBatch(t) : null;
  }
  [Symbol.iterator]() {
    return this._impl[Symbol.iterator]();
  }
  [Symbol.asyncIterator]() {
    return this._impl[Symbol.asyncIterator]();
  }
  toDOMStream() {
    return dt.toDOMStream(this.isSync() ? { [Symbol.iterator]: () => this } : { [Symbol.asyncIterator]: () => this });
  }
  toNodeStream() {
    return dt.toNodeStream(this.isSync() ? { [Symbol.iterator]: () => this } : { [Symbol.asyncIterator]: () => this }, { objectMode: !0 });
  }
  /** @nocollapse */
  // @ts-ignore
  static throughNode(t) {
    throw new Error('"throughNode" not available in this environment');
  }
  /** @nocollapse */
  static throughDOM(t, e) {
    throw new Error('"throughDOM" not available in this environment');
  }
  /** @nocollapse */
  static from(t) {
    return t instanceof ht ? t : ei(t) ? Wc(t) : gs(t) ? qc(t) : Jt(t) ? E(this, void 0, void 0, function* () {
      return yield ht.from(yield t);
    }) : bs(t) || yi(t) || Is(t) || Se(t) ? Hc(new Ie(t)) : Gc(new Rn(t));
  }
  /** @nocollapse */
  static readAll(t) {
    return t instanceof ht ? t.isSync() ? ps(t) : ys(t) : ei(t) || ArrayBuffer.isView(t) || je(t) || _s(t) ? ps(t) : ys(t);
  }
}
class Ln extends ht {
  constructor(t) {
    super(t), this._impl = t;
  }
  readAll() {
    return [...this];
  }
  [Symbol.iterator]() {
    return this._impl[Symbol.iterator]();
  }
  [Symbol.asyncIterator]() {
    return Et(this, arguments, function* () {
      yield T(yield* qe(Qt(this[Symbol.iterator]())));
    });
  }
}
class Mn extends ht {
  constructor(t) {
    super(t), this._impl = t;
  }
  readAll() {
    return E(this, void 0, void 0, function* () {
      var t, e, i, s;
      const r = new Array();
      try {
        for (var o = !0, a = Qt(this), d; d = yield a.next(), t = d.done, !t; o = !0) {
          s = d.value, o = !1;
          const u = s;
          r.push(u);
        }
      } catch (u) {
        e = { error: u };
      } finally {
        try {
          !o && !t && (i = a.return) && (yield i.call(a));
        } finally {
          if (e) throw e.error;
        }
      }
      return r;
    });
  }
  [Symbol.iterator]() {
    throw new Error("AsyncRecordBatchStreamReader is not Iterable");
  }
  [Symbol.asyncIterator]() {
    return this._impl[Symbol.asyncIterator]();
  }
}
class po extends Ln {
  constructor(t) {
    super(t), this._impl = t;
  }
}
class zc extends Mn {
  constructor(t) {
    super(t), this._impl = t;
  }
}
class yo {
  get numDictionaries() {
    return this._dictionaryIndex;
  }
  get numRecordBatches() {
    return this._recordBatchIndex;
  }
  constructor(t = /* @__PURE__ */ new Map()) {
    this.closed = !1, this.autoDestroy = !0, this._dictionaryIndex = 0, this._recordBatchIndex = 0, this.dictionaries = t;
  }
  isSync() {
    return !1;
  }
  isAsync() {
    return !1;
  }
  isFile() {
    return !1;
  }
  isStream() {
    return !1;
  }
  reset(t) {
    return this._dictionaryIndex = 0, this._recordBatchIndex = 0, this.schema = t, this.dictionaries = /* @__PURE__ */ new Map(), this;
  }
  _loadRecordBatch(t, e) {
    const i = this._loadVectors(t, e, this.schema.fields), s = B({ type: new J(this.schema.fields), length: t.length, children: i });
    return new nt(this.schema, s);
  }
  _loadDictionaryBatch(t, e) {
    const { id: i, isDelta: s } = t, { dictionaries: r, schema: o } = this, a = r.get(i), d = o.dictionaries.get(i), u = this._loadVectors(t.data, e, [d]);
    return (a && s ? a.concat(new N(u)) : new N(u)).memoize();
  }
  _loadVectors(t, e, i) {
    return new no(e, t.nodes, t.buffers, this.dictionaries, this.schema.metadataVersion).visitMany(i);
  }
}
class Un extends yo {
  constructor(t, e) {
    super(e), this._reader = ei(t) ? new jc(this._handle = t) : new ho(this._handle = t);
  }
  isSync() {
    return !0;
  }
  isStream() {
    return !0;
  }
  [Symbol.iterator]() {
    return this;
  }
  cancel() {
    !this.closed && (this.closed = !0) && (this.reset()._reader.return(), this._reader = null, this.dictionaries = null);
  }
  open(t) {
    return this.closed || (this.autoDestroy = _o(this, t), this.schema || (this.schema = this._reader.readSchema()) || this.cancel()), this;
  }
  throw(t) {
    return !this.closed && this.autoDestroy && (this.closed = !0) ? this.reset()._reader.throw(t) : V;
  }
  return(t) {
    return !this.closed && this.autoDestroy && (this.closed = !0) ? this.reset()._reader.return(t) : V;
  }
  next() {
    if (this.closed)
      return V;
    let t;
    const { _reader: e } = this;
    for (; t = this._readNextMessageAndValidate(); )
      if (t.isSchema())
        this.reset(t.header());
      else if (t.isRecordBatch()) {
        this._recordBatchIndex++;
        const i = t.header(), s = e.readMessageBody(t.bodyLength);
        return { done: !1, value: this._loadRecordBatch(i, s) };
      } else if (t.isDictionaryBatch()) {
        this._dictionaryIndex++;
        const i = t.header(), s = e.readMessageBody(t.bodyLength), r = this._loadDictionaryBatch(i, s);
        this.dictionaries.set(i.id, r);
      }
    return this.schema && this._recordBatchIndex === 0 ? (this._recordBatchIndex++, { done: !1, value: new Ri(this.schema) }) : this.return();
  }
  _readNextMessageAndValidate(t) {
    return this._reader.readMessage(t);
  }
}
class kn extends yo {
  constructor(t, e) {
    super(e), this._reader = new xc(this._handle = t);
  }
  isAsync() {
    return !0;
  }
  isStream() {
    return !0;
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  cancel() {
    return E(this, void 0, void 0, function* () {
      !this.closed && (this.closed = !0) && (yield this.reset()._reader.return(), this._reader = null, this.dictionaries = null);
    });
  }
  open(t) {
    return E(this, void 0, void 0, function* () {
      return this.closed || (this.autoDestroy = _o(this, t), this.schema || (this.schema = yield this._reader.readSchema()) || (yield this.cancel())), this;
    });
  }
  throw(t) {
    return E(this, void 0, void 0, function* () {
      return !this.closed && this.autoDestroy && (this.closed = !0) ? yield this.reset()._reader.throw(t) : V;
    });
  }
  return(t) {
    return E(this, void 0, void 0, function* () {
      return !this.closed && this.autoDestroy && (this.closed = !0) ? yield this.reset()._reader.return(t) : V;
    });
  }
  next() {
    return E(this, void 0, void 0, function* () {
      if (this.closed)
        return V;
      let t;
      const { _reader: e } = this;
      for (; t = yield this._readNextMessageAndValidate(); )
        if (t.isSchema())
          yield this.reset(t.header());
        else if (t.isRecordBatch()) {
          this._recordBatchIndex++;
          const i = t.header(), s = yield e.readMessageBody(t.bodyLength);
          return { done: !1, value: this._loadRecordBatch(i, s) };
        } else if (t.isDictionaryBatch()) {
          this._dictionaryIndex++;
          const i = t.header(), s = yield e.readMessageBody(t.bodyLength), r = this._loadDictionaryBatch(i, s);
          this.dictionaries.set(i.id, r);
        }
      return this.schema && this._recordBatchIndex === 0 ? (this._recordBatchIndex++, { done: !1, value: new Ri(this.schema) }) : yield this.return();
    });
  }
  _readNextMessageAndValidate(t) {
    return E(this, void 0, void 0, function* () {
      return yield this._reader.readMessage(t);
    });
  }
}
class mo extends Un {
  get footer() {
    return this._footer;
  }
  get numDictionaries() {
    return this._footer ? this._footer.numDictionaries : 0;
  }
  get numRecordBatches() {
    return this._footer ? this._footer.numRecordBatches : 0;
  }
  constructor(t, e) {
    super(t instanceof os ? t : new os(t), e);
  }
  isSync() {
    return !0;
  }
  isFile() {
    return !0;
  }
  open(t) {
    if (!this.closed && !this._footer) {
      this.schema = (this._footer = this._readFooter()).schema;
      for (const e of this._footer.dictionaryBatches())
        e && this._readDictionaryBatch(this._dictionaryIndex++);
    }
    return super.open(t);
  }
  readRecordBatch(t) {
    var e;
    if (this.closed)
      return null;
    this._footer || this.open();
    const i = (e = this._footer) === null || e === void 0 ? void 0 : e.getRecordBatch(t);
    if (i && this._handle.seek(i.offset)) {
      const s = this._reader.readMessage(R.RecordBatch);
      if (s != null && s.isRecordBatch()) {
        const r = s.header(), o = this._reader.readMessageBody(s.bodyLength);
        return this._loadRecordBatch(r, o);
      }
    }
    return null;
  }
  _readDictionaryBatch(t) {
    var e;
    const i = (e = this._footer) === null || e === void 0 ? void 0 : e.getDictionaryBatch(t);
    if (i && this._handle.seek(i.offset)) {
      const s = this._reader.readMessage(R.DictionaryBatch);
      if (s != null && s.isDictionaryBatch()) {
        const r = s.header(), o = this._reader.readMessageBody(s.bodyLength), a = this._loadDictionaryBatch(r, o);
        this.dictionaries.set(r.id, a);
      }
    }
  }
  _readFooter() {
    const { _handle: t } = this, e = t.size - fo, i = t.readInt32(e), s = t.readAt(e - i, i);
    return Pe.decode(s);
  }
  _readNextMessageAndValidate(t) {
    var e;
    if (this._footer || this.open(), this._footer && this._recordBatchIndex < this.numRecordBatches) {
      const i = (e = this._footer) === null || e === void 0 ? void 0 : e.getRecordBatch(this._recordBatchIndex);
      if (i && this._handle.seek(i.offset))
        return this._reader.readMessage(t);
    }
    return null;
  }
}
class $c extends kn {
  get footer() {
    return this._footer;
  }
  get numDictionaries() {
    return this._footer ? this._footer.numDictionaries : 0;
  }
  get numRecordBatches() {
    return this._footer ? this._footer.numRecordBatches : 0;
  }
  constructor(t, ...e) {
    const i = typeof e[0] != "number" ? e.shift() : void 0, s = e[0] instanceof Map ? e.shift() : void 0;
    super(t instanceof Nn ? t : new Nn(t, i), s);
  }
  isFile() {
    return !0;
  }
  isAsync() {
    return !0;
  }
  open(t) {
    const e = Object.create(null, {
      open: { get: () => super.open }
    });
    return E(this, void 0, void 0, function* () {
      if (!this.closed && !this._footer) {
        this.schema = (this._footer = yield this._readFooter()).schema;
        for (const i of this._footer.dictionaryBatches())
          i && (yield this._readDictionaryBatch(this._dictionaryIndex++));
      }
      return yield e.open.call(this, t);
    });
  }
  readRecordBatch(t) {
    return E(this, void 0, void 0, function* () {
      var e;
      if (this.closed)
        return null;
      this._footer || (yield this.open());
      const i = (e = this._footer) === null || e === void 0 ? void 0 : e.getRecordBatch(t);
      if (i && (yield this._handle.seek(i.offset))) {
        const s = yield this._reader.readMessage(R.RecordBatch);
        if (s != null && s.isRecordBatch()) {
          const r = s.header(), o = yield this._reader.readMessageBody(s.bodyLength);
          return this._loadRecordBatch(r, o);
        }
      }
      return null;
    });
  }
  _readDictionaryBatch(t) {
    return E(this, void 0, void 0, function* () {
      var e;
      const i = (e = this._footer) === null || e === void 0 ? void 0 : e.getDictionaryBatch(t);
      if (i && (yield this._handle.seek(i.offset))) {
        const s = yield this._reader.readMessage(R.DictionaryBatch);
        if (s != null && s.isDictionaryBatch()) {
          const r = s.header(), o = yield this._reader.readMessageBody(s.bodyLength), a = this._loadDictionaryBatch(r, o);
          this.dictionaries.set(r.id, a);
        }
      }
    });
  }
  _readFooter() {
    return E(this, void 0, void 0, function* () {
      const { _handle: t } = this;
      t._pending && (yield t._pending);
      const e = t.size - fo, i = yield t.readInt32(e), s = yield t.readAt(e - i, i);
      return Pe.decode(s);
    });
  }
  _readNextMessageAndValidate(t) {
    return E(this, void 0, void 0, function* () {
      if (this._footer || (yield this.open()), this._footer && this._recordBatchIndex < this.numRecordBatches) {
        const e = this._footer.getRecordBatch(this._recordBatchIndex);
        if (e && (yield this._handle.seek(e.offset)))
          return yield this._reader.readMessage(t);
      }
      return null;
    });
  }
}
class Yc extends Un {
  constructor(t, e) {
    super(t, e);
  }
  _loadVectors(t, e, i) {
    return new ic(e, t.nodes, t.buffers, this.dictionaries, this.schema.metadataVersion).visitMany(i);
  }
}
function _o(n, t) {
  return t && typeof t.autoDestroy == "boolean" ? t.autoDestroy : n.autoDestroy;
}
function* ps(n) {
  const t = ht.from(n);
  try {
    if (!t.open({ autoDestroy: !1 }).closed)
      do
        yield t;
      while (!t.reset().open().closed);
  } finally {
    t.cancel();
  }
}
function ys(n) {
  return Et(this, arguments, function* () {
    const e = yield T(ht.from(n));
    try {
      if (!(yield T(e.open({ autoDestroy: !1 }))).closed)
        do
          yield yield T(e);
        while (!(yield T(e.reset().open())).closed);
    } finally {
      yield T(e.cancel());
    }
  });
}
function Wc(n) {
  return new Ln(new Yc(n));
}
function Gc(n) {
  const t = n.peek(Ye + 7 & -8);
  return t && t.byteLength >= 4 ? Mi(t) ? new po(new mo(n.read())) : new Ln(new Un(n)) : new Ln(new Un(function* () {
  }()));
}
function Hc(n) {
  return E(this, void 0, void 0, function* () {
    const t = yield n.peek(Ye + 7 & -8);
    return t && t.byteLength >= 4 ? Mi(t) ? new po(new mo(yield n.read())) : new Mn(new kn(n)) : new Mn(new kn(function() {
      return Et(this, arguments, function* () {
      });
    }()));
  });
}
function qc(n) {
  return E(this, void 0, void 0, function* () {
    const { size: t } = yield n.stat(), e = new Nn(n, t);
    return t >= Vc && Mi(yield e.readAt(0, Ye + 7 & -8)) ? new zc(new $c(e)) : new Mn(new kn(e));
  });
}
class z extends O {
  /** @nocollapse */
  static assemble(...t) {
    const e = (s) => s.flatMap((r) => Array.isArray(r) ? e(r) : r instanceof nt ? r.data.children : r.data), i = new z();
    return i.visitMany(e(t)), i;
  }
  constructor() {
    super(), this._byteLength = 0, this._nodes = [], this._buffers = [], this._bufferRegions = [];
  }
  visit(t) {
    if (t instanceof N)
      return this.visitMany(t.data), this;
    const { type: e } = t;
    if (!f.isDictionary(e)) {
      const { length: i } = t;
      if (i > 2147483647)
        throw new RangeError("Cannot write arrays larger than 2^31 - 1 in length");
      if (f.isUnion(e))
        this.nodes.push(new Gt(i, 0));
      else {
        const { nullCount: s } = t;
        f.isNull(e) || mt.call(this, s <= 0 ? new Uint8Array(0) : On(t.offset, i, t.nullBitmap)), this.nodes.push(new Gt(i, s));
      }
    }
    return super.visit(t);
  }
  visitNull(t) {
    return this;
  }
  visitDictionary(t) {
    return this.visit(t.clone(t.type.indices));
  }
  get nodes() {
    return this._nodes;
  }
  get buffers() {
    return this._buffers;
  }
  get byteLength() {
    return this._byteLength;
  }
  get bufferRegions() {
    return this._bufferRegions;
  }
}
function mt(n) {
  const t = n.byteLength + 7 & -8;
  return this.buffers.push(n), this.bufferRegions.push(new Tt(this._byteLength, t)), this._byteLength += t, this;
}
function Kc(n) {
  var t;
  const { type: e, length: i, typeIds: s, valueOffsets: r } = n;
  if (mt.call(this, s), e.mode === K.Sparse)
    return hi.call(this, n);
  if (e.mode === K.Dense) {
    if (n.offset <= 0)
      return mt.call(this, r), hi.call(this, n);
    {
      const o = new Int32Array(i), a = /* @__PURE__ */ Object.create(null), d = /* @__PURE__ */ Object.create(null);
      for (let u, l, h = -1; ++h < i; )
        (u = s[h]) !== void 0 && ((l = a[u]) === void 0 && (l = a[u] = r[h]), o[h] = r[h] - l, d[u] = ((t = d[u]) !== null && t !== void 0 ? t : 0) + 1);
      mt.call(this, o), this.visitMany(n.children.map((u, l) => {
        const h = e.typeIds[l], $ = a[h], F = d[h];
        return u.slice($, Math.min(i, F));
      }));
    }
  }
  return this;
}
function Qc(n) {
  let t;
  return n.nullCount >= n.length ? mt.call(this, new Uint8Array(0)) : (t = n.values) instanceof Uint8Array ? mt.call(this, On(n.offset, n.length, t)) : mt.call(this, Bn(n.values));
}
function Ct(n) {
  return mt.call(this, n.values.subarray(0, n.length * n.stride));
}
function Vn(n) {
  const { length: t, values: e, valueOffsets: i } = n, s = P(i[0]), r = P(i[t]), o = Math.min(r - s, e.byteLength - s);
  return mt.call(this, Ss(-s, t + 1, i)), mt.call(this, e.subarray(s, s + o)), this;
}
function Ui(n) {
  const { length: t, valueOffsets: e } = n;
  if (e) {
    const { [0]: i, [t]: s } = e;
    return mt.call(this, Ss(-i, t + 1, e)), this.visit(n.children[0].slice(i, s - i));
  }
  return this.visit(n.children[0]);
}
function hi(n) {
  return this.visitMany(n.type.children.map((t, e) => n.children[e]).filter(Boolean))[0];
}
z.prototype.visitBool = Qc;
z.prototype.visitInt = Ct;
z.prototype.visitFloat = Ct;
z.prototype.visitUtf8 = Vn;
z.prototype.visitLargeUtf8 = Vn;
z.prototype.visitBinary = Vn;
z.prototype.visitLargeBinary = Vn;
z.prototype.visitFixedSizeBinary = Ct;
z.prototype.visitDate = Ct;
z.prototype.visitTimestamp = Ct;
z.prototype.visitTime = Ct;
z.prototype.visitDecimal = Ct;
z.prototype.visitList = Ui;
z.prototype.visitStruct = hi;
z.prototype.visitUnion = Kc;
z.prototype.visitInterval = Ct;
z.prototype.visitDuration = Ct;
z.prototype.visitFixedSizeList = Ui;
z.prototype.visitMap = Ui;
class go extends Oi {
  /** @nocollapse */
  // @ts-ignore
  static throughNode(t) {
    throw new Error('"throughNode" not available in this environment');
  }
  /** @nocollapse */
  static throughDOM(t, e) {
    throw new Error('"throughDOM" not available in this environment');
  }
  constructor(t) {
    super(), this._position = 0, this._started = !1, this._sink = new en(), this._schema = null, this._dictionaryBlocks = [], this._recordBatchBlocks = [], this._seenDictionaries = /* @__PURE__ */ new Map(), this._dictionaryDeltaOffsets = /* @__PURE__ */ new Map(), it(t) || (t = { autoDestroy: !0, writeLegacyIpcFormat: !1 }), this._autoDestroy = typeof t.autoDestroy == "boolean" ? t.autoDestroy : !0, this._writeLegacyIpcFormat = typeof t.writeLegacyIpcFormat == "boolean" ? t.writeLegacyIpcFormat : !1;
  }
  toString(t = !1) {
    return this._sink.toString(t);
  }
  toUint8Array(t = !1) {
    return this._sink.toUint8Array(t);
  }
  writeAll(t) {
    return Jt(t) ? t.then((e) => this.writeAll(e)) : Se(t) ? xi(this, t) : Pi(this, t);
  }
  get closed() {
    return this._sink.closed;
  }
  [Symbol.asyncIterator]() {
    return this._sink[Symbol.asyncIterator]();
  }
  toDOMStream(t) {
    return this._sink.toDOMStream(t);
  }
  toNodeStream(t) {
    return this._sink.toNodeStream(t);
  }
  close() {
    return this.reset()._sink.close();
  }
  abort(t) {
    return this.reset()._sink.abort(t);
  }
  finish() {
    return this._autoDestroy ? this.close() : this.reset(this._sink, this._schema), this;
  }
  reset(t = this._sink, e = null) {
    return t === this._sink || t instanceof en ? this._sink = t : (this._sink = new en(), t && Bo(t) ? this.toDOMStream({ type: "bytes" }).pipeTo(t) : t && Ao(t) && this.toNodeStream({ objectMode: !1 }).pipe(t)), this._started && this._schema && this._writeFooter(this._schema), this._started = !1, this._dictionaryBlocks = [], this._recordBatchBlocks = [], this._seenDictionaries = /* @__PURE__ */ new Map(), this._dictionaryDeltaOffsets = /* @__PURE__ */ new Map(), (!e || !ui(e, this._schema)) && (e == null ? (this._position = 0, this._schema = null) : (this._started = !0, this._schema = e, this._writeSchema(e))), this;
  }
  write(t) {
    let e = null;
    if (this._sink) {
      if (t == null)
        return this.finish() && void 0;
      if (t instanceof Q && !(e = t.schema))
        return this.finish() && void 0;
      if (t instanceof nt && !(e = t.schema))
        return this.finish() && void 0;
    } else throw new Error("RecordBatchWriter is closed");
    if (e && !ui(e, this._schema)) {
      if (this._started && this._autoDestroy)
        return this.close();
      this.reset(this._sink, e);
    }
    t instanceof nt ? t instanceof Ri || this._writeRecordBatch(t) : t instanceof Q ? this.writeAll(t.batches) : je(t) && this.writeAll(t);
  }
  _writeMessage(t, e = 8) {
    const i = e - 1, s = Z.encode(t), r = s.byteLength, o = this._writeLegacyIpcFormat ? 4 : 8, a = r + o + i & ~i, d = a - r - o;
    return t.headerType === R.RecordBatch ? this._recordBatchBlocks.push(new Yt(a, t.bodyLength, this._position)) : t.headerType === R.DictionaryBatch && this._dictionaryBlocks.push(new Yt(a, t.bodyLength, this._position)), this._writeLegacyIpcFormat || this._write(Int32Array.of(-1)), this._write(Int32Array.of(a - o)), r > 0 && this._write(s), this._writePadding(d);
  }
  _write(t) {
    if (this._started) {
      const e = A(t);
      e && e.byteLength > 0 && (this._sink.write(e), this._position += e.byteLength);
    }
    return this;
  }
  _writeSchema(t) {
    return this._writeMessage(Z.from(t));
  }
  // @ts-ignore
  _writeFooter(t) {
    return this._writeLegacyIpcFormat ? this._write(Int32Array.of(0)) : this._write(Int32Array.of(-1, 0));
  }
  _writeMagic() {
    return this._write(xe);
  }
  _writePadding(t) {
    return t > 0 ? this._write(new Uint8Array(t)) : this;
  }
  _writeRecordBatch(t) {
    const { byteLength: e, nodes: i, bufferRegions: s, buffers: r } = z.assemble(t), o = new at(t.numRows, i, s), a = Z.from(o, e);
    return this._writeDictionaries(t)._writeMessage(a)._writeBodyBuffers(r);
  }
  _writeDictionaryBatch(t, e, i = !1) {
    const { byteLength: s, nodes: r, bufferRegions: o, buffers: a } = z.assemble(new N([t])), d = new at(t.length, r, o), u = new At(d, e, i), l = Z.from(u, s);
    return this._writeMessage(l)._writeBodyBuffers(a);
  }
  _writeBodyBuffers(t) {
    let e, i, s;
    for (let r = -1, o = t.length; ++r < o; )
      (e = t[r]) && (i = e.byteLength) > 0 && (this._write(e), (s = (i + 7 & -8) - i) > 0 && this._writePadding(s));
    return this;
  }
  _writeDictionaries(t) {
    var e, i;
    for (const [s, r] of t.dictionaries) {
      const o = (e = r == null ? void 0 : r.data) !== null && e !== void 0 ? e : [], a = this._seenDictionaries.get(s), d = (i = this._dictionaryDeltaOffsets.get(s)) !== null && i !== void 0 ? i : 0;
      if (!a || a.data[0] !== o[0])
        for (const [u, l] of o.entries())
          this._writeDictionaryBatch(l, s, u > 0);
      else if (d < o.length)
        for (const u of o.slice(d))
          this._writeDictionaryBatch(u, s, !0);
      this._seenDictionaries.set(s, r), this._dictionaryDeltaOffsets.set(s, o.length);
    }
    return this;
  }
}
class ki extends go {
  /** @nocollapse */
  static writeAll(t, e) {
    const i = new ki(e);
    return Jt(t) ? t.then((s) => i.writeAll(s)) : Se(t) ? xi(i, t) : Pi(i, t);
  }
}
class Ci extends go {
  /** @nocollapse */
  static writeAll(t) {
    const e = new Ci();
    return Jt(t) ? t.then((i) => e.writeAll(i)) : Se(t) ? xi(e, t) : Pi(e, t);
  }
  constructor() {
    super(), this._autoDestroy = !0;
  }
  // @ts-ignore
  _writeSchema(t) {
    return this._writeMagic()._writePadding(2);
  }
  _writeDictionaryBatch(t, e, i = !1) {
    if (!i && this._seenDictionaries.has(e))
      throw new Error("The Arrow File format does not support replacement dictionaries. ");
    return super._writeDictionaryBatch(t, e, i);
  }
  _writeFooter(t) {
    const e = Pe.encode(new Pe(t, Y.V5, this._recordBatchBlocks, this._dictionaryBlocks));
    return super._writeFooter(t)._write(e)._write(Int32Array.of(e.byteLength))._writeMagic();
  }
}
function Pi(n, t) {
  let e = t;
  t instanceof Q && (e = t.batches, n.reset(void 0, t.schema));
  for (const i of e)
    n.write(i);
  return n.finish();
}
function xi(n, t) {
  return E(this, void 0, void 0, function* () {
    var e, i, s, r, o, a, d;
    try {
      for (e = !0, i = Qt(t); s = yield i.next(), r = s.done, !r; e = !0) {
        d = s.value, e = !1;
        const u = d;
        n.write(u);
      }
    } catch (u) {
      o = { error: u };
    } finally {
      try {
        !e && !r && (a = i.return) && (yield a.call(i));
      } finally {
        if (o) throw o.error;
      }
    }
    return n.finish();
  });
}
function Jc(n, t = "stream") {
  return (t === "stream" ? ki : Ci).writeAll(n).toUint8Array(!0);
}
var Zc = Object.create, bo = Object.defineProperty, Xc = Object.getOwnPropertyDescriptor, td = Object.getOwnPropertyNames, ed = Object.getPrototypeOf, nd = Object.prototype.hasOwnProperty, id = (n, t) => () => (t || n((t = { exports: {} }).exports, t), t.exports), sd = (n, t, e, i) => {
  if (t && typeof t == "object" || typeof t == "function") for (let s of td(t)) !nd.call(n, s) && s !== e && bo(n, s, { get: () => t[s], enumerable: !(i = Xc(t, s)) || i.enumerable });
  return n;
}, rd = (n, t, e) => (e = n != null ? Zc(ed(n)) : {}, sd(!n || !n.__esModule ? bo(e, "default", { value: n, enumerable: !0 }) : e, n)), od = id((n, t) => {
  t.exports = Worker;
}), ad = ((n) => (n[n.UNDEFINED = 0] = "UNDEFINED", n[n.AUTOMATIC = 1] = "AUTOMATIC", n[n.READ_ONLY = 2] = "READ_ONLY", n[n.READ_WRITE = 3] = "READ_WRITE", n))(ad || {}), cd = ((n) => (n[n.IDENTIFIER = 0] = "IDENTIFIER", n[n.NUMERIC_CONSTANT = 1] = "NUMERIC_CONSTANT", n[n.STRING_CONSTANT = 2] = "STRING_CONSTANT", n[n.OPERATOR = 3] = "OPERATOR", n[n.KEYWORD = 4] = "KEYWORD", n[n.COMMENT = 5] = "COMMENT", n))(cd || {}), dd = ((n) => (n[n.NONE = 0] = "NONE", n[n.DEBUG = 1] = "DEBUG", n[n.INFO = 2] = "INFO", n[n.WARNING = 3] = "WARNING", n[n.ERROR = 4] = "ERROR", n))(dd || {}), ud = ((n) => (n[n.NONE = 0] = "NONE", n[n.CONNECT = 1] = "CONNECT", n[n.DISCONNECT = 2] = "DISCONNECT", n[n.OPEN = 3] = "OPEN", n[n.QUERY = 4] = "QUERY", n[n.INSTANTIATE = 5] = "INSTANTIATE", n))(ud || {}), ld = ((n) => (n[n.NONE = 0] = "NONE", n[n.OK = 1] = "OK", n[n.ERROR = 2] = "ERROR", n[n.START = 3] = "START", n[n.RUN = 4] = "RUN", n[n.CAPTURE = 5] = "CAPTURE", n))(ld || {}), hd = ((n) => (n[n.NONE = 0] = "NONE", n[n.WEB_WORKER = 1] = "WEB_WORKER", n[n.NODE_WORKER = 2] = "NODE_WORKER", n[n.BINDINGS = 3] = "BINDINGS", n[n.ASYNC_DUCKDB = 4] = "ASYNC_DUCKDB", n))(hd || {}), Dd = class {
  log(n) {
  }
}, Rd = class {
  constructor(n = 2) {
    this.level = n;
  }
  log(n) {
    n.level >= this.level && console.log(n);
  }
};
function Nd(n) {
  switch (n) {
    case 0:
      return "NONE";
    case 1:
      return "DEBUG";
    case 2:
      return "INFO";
    case 3:
      return "WARNING";
    case 4:
      return "ERROR";
    default:
      return "?";
  }
}
function Ld(n) {
  switch (n) {
    case 0:
      return "NONE";
    case 1:
      return "OK";
    case 2:
      return "ERROR";
    case 3:
      return "START";
    case 4:
      return "RUN";
    case 5:
      return "CAPTURE";
    default:
      return "?";
  }
}
function Md(n) {
  switch (n) {
    case 1:
      return "CONNECT";
    case 2:
      return "DISCONNECT";
    case 5:
      return "INSTANTIATE";
    case 3:
      return "OPEN";
    case 4:
      return "QUERY";
    default:
      return "?";
  }
}
function Ud(n) {
  switch (n) {
    case 0:
      return "NONE";
    case 1:
      return "WEB WORKER";
    case 2:
      return "NODE WORKER";
    case 3:
      return "DUCKDB BINDINGS";
    case 4:
      return "DUCKDB";
    default:
      return "?";
  }
}
var fd = ((n) => (n[n.SUCCESS = 0] = "SUCCESS", n))(fd || {}), pd = class {
  constructor(n, t) {
    this._bindings = n, this._conn = t;
  }
  get bindings() {
    return this._bindings;
  }
  async close() {
    return this._bindings.disconnect(this._conn);
  }
  useUnsafe(n) {
    return n(this._bindings, this._conn);
  }
  async query(n) {
    this._bindings.logger.log({ timestamp: /* @__PURE__ */ new Date(), level: 2, origin: 4, topic: 4, event: 4, value: n });
    let t = await this._bindings.runQuery(this._conn, n), e = ht.from(t);
    return console.assert(e.isSync(), "Reader is not sync"), console.assert(e.isFile(), "Reader is not file"), new Q(e);
  }
  async send(n) {
    this._bindings.logger.log({ timestamp: /* @__PURE__ */ new Date(), level: 2, origin: 4, topic: 4, event: 4, value: n });
    let t = await this._bindings.startPendingQuery(this._conn, n);
    for (; t == null; ) t = await this._bindings.pollPendingQuery(this._conn);
    let e = new Io(this._bindings, this._conn, t), i = await ht.from(e);
    return console.assert(i.isAsync()), console.assert(i.isStream()), i;
  }
  async cancelSent() {
    return await this._bindings.cancelPendingQuery(this._conn);
  }
  async getTableNames(n) {
    return await this._bindings.getTableNames(this._conn, n);
  }
  async prepare(n) {
    let t = await this._bindings.createPrepared(this._conn, n);
    return new yd(this._bindings, this._conn, t);
  }
  async insertArrowTable(n, t) {
    let e = Jc(n, "stream");
    await this.insertArrowFromIPCStream(e, t);
  }
  async insertArrowFromIPCStream(n, t) {
    await this._bindings.insertArrowFromIPCStream(this._conn, n, t);
  }
  async insertCSVFromPath(n, t) {
    await this._bindings.insertCSVFromPath(this._conn, n, t);
  }
  async insertJSONFromPath(n, t) {
    await this._bindings.insertJSONFromPath(this._conn, n, t);
  }
}, Io = class {
  constructor(n, t, e) {
    this.db = n, this.conn = t, this.header = e, this._first = !0, this._depleted = !1, this._inFlight = null;
  }
  async next() {
    if (this._first) return this._first = !1, { done: !1, value: this.header };
    if (this._depleted) return { done: !0, value: null };
    let n;
    return this._inFlight != null ? (n = await this._inFlight, this._inFlight = null) : n = await this.db.fetchQueryResults(this.conn), this._depleted = n.length == 0, this._depleted || (this._inFlight = this.db.fetchQueryResults(this.conn)), { done: this._depleted, value: n };
  }
  [Symbol.asyncIterator]() {
    return this;
  }
}, yd = class {
  constructor(n, t, e) {
    this.bindings = n, this.connectionId = t, this.statementId = e;
  }
  async close() {
    await this.bindings.closePrepared(this.connectionId, this.statementId);
  }
  async query(...n) {
    let t = await this.bindings.runPrepared(this.connectionId, this.statementId, n), e = ht.from(t);
    return console.assert(e.isSync()), console.assert(e.isFile()), new Q(e);
  }
  async send(...n) {
    let t = await this.bindings.sendPrepared(this.connectionId, this.statementId, n), e = new Io(this.bindings, this.connectionId, t), i = await ht.from(e);
    return console.assert(i.isAsync()), console.assert(i.isStream()), i;
  }
}, md = ((n) => (n.CANCEL_PENDING_QUERY = "CANCEL_PENDING_QUERY", n.CLOSE_PREPARED = "CLOSE_PREPARED", n.COLLECT_FILE_STATISTICS = "COLLECT_FILE_STATISTICS", n.CONNECT = "CONNECT", n.COPY_FILE_TO_BUFFER = "COPY_FILE_TO_BUFFER", n.COPY_FILE_TO_PATH = "COPY_FILE_TO_PATH", n.CREATE_PREPARED = "CREATE_PREPARED", n.DISCONNECT = "DISCONNECT", n.DROP_FILE = "DROP_FILE", n.DROP_FILES = "DROP_FILES", n.EXPORT_FILE_STATISTICS = "EXPORT_FILE_STATISTICS", n.FETCH_QUERY_RESULTS = "FETCH_QUERY_RESULTS", n.FLUSH_FILES = "FLUSH_FILES", n.GET_FEATURE_FLAGS = "GET_FEATURE_FLAGS", n.GET_TABLE_NAMES = "GET_TABLE_NAMES", n.GET_VERSION = "GET_VERSION", n.GLOB_FILE_INFOS = "GLOB_FILE_INFOS", n.INSERT_ARROW_FROM_IPC_STREAM = "INSERT_ARROW_FROM_IPC_STREAM", n.INSERT_CSV_FROM_PATH = "IMPORT_CSV_FROM_PATH", n.INSERT_JSON_FROM_PATH = "IMPORT_JSON_FROM_PATH", n.INSTANTIATE = "INSTANTIATE", n.OPEN = "OPEN", n.PING = "PING", n.POLL_PENDING_QUERY = "POLL_PENDING_QUERY", n.REGISTER_FILE_BUFFER = "REGISTER_FILE_BUFFER", n.REGISTER_FILE_HANDLE = "REGISTER_FILE_HANDLE", n.REGISTER_FILE_URL = "REGISTER_FILE_URL", n.RESET = "RESET", n.RUN_PREPARED = "RUN_PREPARED", n.RUN_QUERY = "RUN_QUERY", n.SEND_PREPARED = "SEND_PREPARED", n.START_PENDING_QUERY = "START_PENDING_QUERY", n.TOKENIZE = "TOKENIZE", n))(md || {}), _d = ((n) => (n.CONNECTION_INFO = "CONNECTION_INFO", n.ERROR = "ERROR", n.FEATURE_FLAGS = "FEATURE_FLAGS", n.FILE_BUFFER = "FILE_BUFFER", n.FILE_INFOS = "FILE_INFOS", n.FILE_SIZE = "FILE_SIZE", n.FILE_STATISTICS = "FILE_STATISTICS", n.INSTANTIATE_PROGRESS = "INSTANTIATE_PROGRESS", n.LOG = "LOG", n.OK = "OK", n.PREPARED_STATEMENT_ID = "PREPARED_STATEMENT_ID", n.QUERY_PLAN = "QUERY_PLAN", n.QUERY_RESULT = "QUERY_RESULT", n.QUERY_RESULT_CHUNK = "QUERY_RESULT_CHUNK", n.QUERY_RESULT_HEADER = "QUERY_RESULT_HEADER", n.QUERY_RESULT_HEADER_OR_NULL = "QUERY_RESULT_HEADER_OR_NULL", n.REGISTERED_FILE = "REGISTERED_FILE", n.SCRIPT_TOKENS = "SCRIPT_TOKENS", n.SUCCESS = "SUCCESS", n.TABLE_NAMES = "TABLE_NAMES", n.VERSION_STRING = "VERSION_STRING", n))(_d || {}), D = class {
  constructor(n, t) {
    this.promiseResolver = () => {
    }, this.promiseRejecter = () => {
    }, this.type = n, this.data = t, this.promise = new Promise((e, i) => {
      this.promiseResolver = e, this.promiseRejecter = i;
    });
  }
};
function rn(n) {
  switch (n.typeId) {
    case c.Binary:
      return { sqlType: "binary" };
    case c.Bool:
      return { sqlType: "bool" };
    case c.Date:
      return { sqlType: "date" };
    case c.DateDay:
      return { sqlType: "date32[d]" };
    case c.DateMillisecond:
      return { sqlType: "date64[ms]" };
    case c.Decimal: {
      let t = n;
      return { sqlType: "decimal", precision: t.precision, scale: t.scale };
    }
    case c.Float:
      return { sqlType: "float" };
    case c.Float16:
      return { sqlType: "float16" };
    case c.Float32:
      return { sqlType: "float32" };
    case c.Float64:
      return { sqlType: "float64" };
    case c.Int:
      return { sqlType: "int32" };
    case c.Int16:
      return { sqlType: "int16" };
    case c.Int32:
      return { sqlType: "int32" };
    case c.Int64:
      return { sqlType: "int64" };
    case c.Uint16:
      return { sqlType: "uint16" };
    case c.Uint32:
      return { sqlType: "uint32" };
    case c.Uint64:
      return { sqlType: "uint64" };
    case c.Uint8:
      return { sqlType: "uint8" };
    case c.IntervalDayTime:
      return { sqlType: "interval[dt]" };
    case c.IntervalYearMonth:
      return { sqlType: "interval[m]" };
    case c.List:
      return { sqlType: "list", valueType: rn(n.valueType) };
    case c.FixedSizeBinary:
      return { sqlType: "fixedsizebinary", byteWidth: n.byteWidth };
    case c.Null:
      return { sqlType: "null" };
    case c.Utf8:
      return { sqlType: "utf8" };
    case c.Struct:
      return { sqlType: "struct", fields: n.children.map((t) => fi(t.name, t.type)) };
    case c.Map: {
      let t = n;
      return { sqlType: "map", keyType: rn(t.keyType), valueType: rn(t.valueType) };
    }
    case c.Time:
      return { sqlType: "time[s]" };
    case c.TimeMicrosecond:
      return { sqlType: "time[us]" };
    case c.TimeMillisecond:
      return { sqlType: "time[ms]" };
    case c.TimeNanosecond:
      return { sqlType: "time[ns]" };
    case c.TimeSecond:
      return { sqlType: "time[s]" };
    case c.Timestamp:
      return { sqlType: "timestamp", timezone: n.timezone || void 0 };
    case c.TimestampSecond:
      return { sqlType: "timestamp[s]", timezone: n.timezone || void 0 };
    case c.TimestampMicrosecond:
      return { sqlType: "timestamp[us]", timezone: n.timezone || void 0 };
    case c.TimestampNanosecond:
      return { sqlType: "timestamp[ns]", timezone: n.timezone || void 0 };
    case c.TimestampMillisecond:
      return { sqlType: "timestamp[ms]", timezone: n.timezone || void 0 };
  }
  throw new Error("unsupported arrow type: ".concat(n.toString()));
}
function fi(n, t) {
  let e = rn(t);
  return e.name = n, e;
}
var gd = new TextEncoder(), kd = class {
  constructor(n, t = null) {
    this._onInstantiationProgress = [], this._worker = null, this._workerShutdownPromise = null, this._workerShutdownResolver = () => {
    }, this._nextMessageId = 0, this._pendingRequests = /* @__PURE__ */ new Map(), this._logger = n, this._onMessageHandler = this.onMessage.bind(this), this._onErrorHandler = this.onError.bind(this), this._onCloseHandler = this.onClose.bind(this), t != null && this.attach(t);
  }
  get logger() {
    return this._logger;
  }
  attach(n) {
    this._worker = n, this._worker.addEventListener("message", this._onMessageHandler), this._worker.addEventListener("error", this._onErrorHandler), this._worker.addEventListener("close", this._onCloseHandler), this._workerShutdownPromise = new Promise((t, e) => {
      this._workerShutdownResolver = t;
    });
  }
  detach() {
    this._worker && (this._worker.removeEventListener("message", this._onMessageHandler), this._worker.removeEventListener("error", this._onErrorHandler), this._worker.removeEventListener("close", this._onCloseHandler), this._worker = null, this._workerShutdownResolver(null), this._workerShutdownPromise = null, this._workerShutdownResolver = () => {
    });
  }
  async terminate() {
    this._worker && (this._worker.terminate(), this._worker = null, this._workerShutdownPromise = null, this._workerShutdownResolver = () => {
    });
  }
  async postTask(n, t = []) {
    if (!this._worker) {
      console.error("cannot send a message since the worker is not set!");
      return;
    }
    let e = this._nextMessageId++;
    return this._pendingRequests.set(e, n), this._worker.postMessage({ messageId: e, type: n.type, data: n.data }, t), await n.promise;
  }
  onMessage(n) {
    var t;
    let e = n.data;
    switch (e.type) {
      case "LOG": {
        this._logger.log(e.data);
        return;
      }
      case "INSTANTIATE_PROGRESS": {
        for (let s of this._onInstantiationProgress) s(e.data);
        return;
      }
    }
    let i = this._pendingRequests.get(e.requestId);
    if (!i) {
      console.warn("unassociated response: [".concat(e.requestId, ", ").concat(e.type.toString(), "]"));
      return;
    }
    if (this._pendingRequests.delete(e.requestId), e.type == "ERROR") {
      let s = new Error(e.data.message);
      s.name = e.data.name, (t = Object.getOwnPropertyDescriptor(s, "stack")) != null && t.writable && (s.stack = e.data.stack), i.promiseRejecter(s);
      return;
    }
    switch (i.type) {
      case "CLOSE_PREPARED":
      case "COLLECT_FILE_STATISTICS":
      case "COPY_FILE_TO_PATH":
      case "DISCONNECT":
      case "DROP_FILE":
      case "DROP_FILES":
      case "FLUSH_FILES":
      case "INSERT_ARROW_FROM_IPC_STREAM":
      case "IMPORT_CSV_FROM_PATH":
      case "IMPORT_JSON_FROM_PATH":
      case "OPEN":
      case "PING":
      case "REGISTER_FILE_BUFFER":
      case "REGISTER_FILE_HANDLE":
      case "REGISTER_FILE_URL":
      case "RESET":
        if (e.type == "OK") {
          i.promiseResolver(e.data);
          return;
        }
        break;
      case "INSTANTIATE":
        if (this._onInstantiationProgress = [], e.type == "OK") {
          i.promiseResolver(e.data);
          return;
        }
        break;
      case "GLOB_FILE_INFOS":
        if (e.type == "FILE_INFOS") {
          i.promiseResolver(e.data);
          return;
        }
        break;
      case "GET_VERSION":
        if (e.type == "VERSION_STRING") {
          i.promiseResolver(e.data);
          return;
        }
        break;
      case "GET_FEATURE_FLAGS":
        if (e.type == "FEATURE_FLAGS") {
          i.promiseResolver(e.data);
          return;
        }
        break;
      case "GET_TABLE_NAMES":
        if (e.type == "TABLE_NAMES") {
          i.promiseResolver(e.data);
          return;
        }
        break;
      case "TOKENIZE":
        if (e.type == "SCRIPT_TOKENS") {
          i.promiseResolver(e.data);
          return;
        }
        break;
      case "COPY_FILE_TO_BUFFER":
        if (e.type == "FILE_BUFFER") {
          i.promiseResolver(e.data);
          return;
        }
        break;
      case "EXPORT_FILE_STATISTICS":
        if (e.type == "FILE_STATISTICS") {
          i.promiseResolver(e.data);
          return;
        }
        break;
      case "CONNECT":
        if (e.type == "CONNECTION_INFO") {
          i.promiseResolver(e.data);
          return;
        }
        break;
      case "RUN_PREPARED":
      case "RUN_QUERY":
        if (e.type == "QUERY_RESULT") {
          i.promiseResolver(e.data);
          return;
        }
        break;
      case "SEND_PREPARED":
        if (e.type == "QUERY_RESULT_HEADER") {
          i.promiseResolver(e.data);
          return;
        }
        break;
      case "START_PENDING_QUERY":
        if (e.type == "QUERY_RESULT_HEADER_OR_NULL") {
          i.promiseResolver(e.data);
          return;
        }
        break;
      case "POLL_PENDING_QUERY":
        if (e.type == "QUERY_RESULT_HEADER_OR_NULL") {
          i.promiseResolver(e.data);
          return;
        }
        break;
      case "CANCEL_PENDING_QUERY":
        if (this._onInstantiationProgress = [], e.type == "SUCCESS") {
          i.promiseResolver(e.data);
          return;
        }
        break;
      case "FETCH_QUERY_RESULTS":
        if (e.type == "QUERY_RESULT_CHUNK") {
          i.promiseResolver(e.data);
          return;
        }
        break;
      case "CREATE_PREPARED":
        if (e.type == "PREPARED_STATEMENT_ID") {
          i.promiseResolver(e.data);
          return;
        }
        break;
    }
    i.promiseRejecter(new Error("unexpected response type: ".concat(e.type.toString())));
  }
  onError(n) {
    console.error(n), console.error("error in duckdb worker: ".concat(n.message)), this._pendingRequests.clear();
  }
  onClose() {
    if (this._workerShutdownResolver(null), this._pendingRequests.size != 0) {
      console.warn("worker terminated with ".concat(this._pendingRequests.size, " pending requests"));
      return;
    }
    this._pendingRequests.clear();
  }
  async reset() {
    let n = new D("RESET", null);
    return await this.postTask(n);
  }
  async ping() {
    let n = new D("PING", null);
    await this.postTask(n);
  }
  async dropFile(n) {
    let t = new D("DROP_FILE", n);
    return await this.postTask(t);
  }
  async dropFiles() {
    let n = new D("DROP_FILES", null);
    return await this.postTask(n);
  }
  async flushFiles() {
    let n = new D("FLUSH_FILES", null);
    return await this.postTask(n);
  }
  async instantiate(n, t = null, e = (i) => {
  }) {
    this._onInstantiationProgress.push(e);
    let i = new D("INSTANTIATE", [n, t]);
    return await this.postTask(i);
  }
  async getVersion() {
    let n = new D("GET_VERSION", null);
    return await this.postTask(n);
  }
  async getFeatureFlags() {
    let n = new D("GET_FEATURE_FLAGS", null);
    return await this.postTask(n);
  }
  async open(n) {
    let t = new D("OPEN", n);
    await this.postTask(t);
  }
  async tokenize(n) {
    let t = new D("TOKENIZE", n);
    return await this.postTask(t);
  }
  async connectInternal() {
    let n = new D("CONNECT", null);
    return await this.postTask(n);
  }
  async connect() {
    let n = await this.connectInternal();
    return new pd(this, n);
  }
  async disconnect(n) {
    let t = new D("DISCONNECT", n);
    await this.postTask(t);
  }
  async runQuery(n, t) {
    let e = new D("RUN_QUERY", [n, t]);
    return await this.postTask(e);
  }
  async startPendingQuery(n, t) {
    let e = new D("START_PENDING_QUERY", [n, t]);
    return await this.postTask(e);
  }
  async pollPendingQuery(n) {
    let t = new D("POLL_PENDING_QUERY", n);
    return await this.postTask(t);
  }
  async cancelPendingQuery(n) {
    let t = new D("CANCEL_PENDING_QUERY", n);
    return await this.postTask(t);
  }
  async fetchQueryResults(n) {
    let t = new D("FETCH_QUERY_RESULTS", n);
    return await this.postTask(t);
  }
  async getTableNames(n, t) {
    let e = new D("GET_TABLE_NAMES", [n, t]);
    return await this.postTask(e);
  }
  async createPrepared(n, t) {
    let e = new D("CREATE_PREPARED", [n, t]);
    return await this.postTask(e);
  }
  async closePrepared(n, t) {
    let e = new D("CLOSE_PREPARED", [n, t]);
    await this.postTask(e);
  }
  async runPrepared(n, t, e) {
    let i = new D("RUN_PREPARED", [n, t, e]);
    return await this.postTask(i);
  }
  async sendPrepared(n, t, e) {
    let i = new D("SEND_PREPARED", [n, t, e]);
    return await this.postTask(i);
  }
  async globFiles(n) {
    let t = new D("GLOB_FILE_INFOS", n);
    return await this.postTask(t);
  }
  async registerFileText(n, t) {
    let e = gd.encode(t);
    await this.registerFileBuffer(n, e);
  }
  async registerFileURL(n, t, e, i) {
    t === void 0 && (t = n);
    let s = new D("REGISTER_FILE_URL", [n, t, e, i]);
    await this.postTask(s);
  }
  async registerEmptyFileBuffer(n) {
  }
  async registerFileBuffer(n, t) {
    let e = new D("REGISTER_FILE_BUFFER", [n, t]);
    await this.postTask(e, [t.buffer]);
  }
  async registerFileHandle(n, t, e, i) {
    let s = new D("REGISTER_FILE_HANDLE", [n, t, e, i]);
    await this.postTask(s, []);
  }
  async collectFileStatistics(n, t) {
    let e = new D("COLLECT_FILE_STATISTICS", [n, t]);
    await this.postTask(e, []);
  }
  async exportFileStatistics(n) {
    let t = new D("EXPORT_FILE_STATISTICS", n);
    return await this.postTask(t, []);
  }
  async copyFileToBuffer(n) {
    let t = new D("COPY_FILE_TO_BUFFER", n);
    return await this.postTask(t);
  }
  async copyFileToPath(n, t) {
    let e = new D("COPY_FILE_TO_PATH", [n, t]);
    await this.postTask(e);
  }
  async insertArrowFromIPCStream(n, t, e) {
    if (t.length == 0) return;
    let i = new D("INSERT_ARROW_FROM_IPC_STREAM", [n, t, e]);
    await this.postTask(i, [t.buffer]);
  }
  async insertCSVFromPath(n, t, e) {
    if (e.columns !== void 0) {
      let s = [];
      for (let r in e.columns) {
        let o = e.columns[r];
        s.push(fi(r, o));
      }
      e.columnsFlat = s, delete e.columns;
    }
    let i = new D("IMPORT_CSV_FROM_PATH", [n, t, e]);
    await this.postTask(i);
  }
  async insertJSONFromPath(n, t, e) {
    if (e.columns !== void 0) {
      let s = [];
      for (let r in e.columns) {
        let o = e.columns[r];
        s.push(fi(r, o));
      }
      e.columnsFlat = s, delete e.columns;
    }
    let i = new D("IMPORT_JSON_FROM_PATH", [n, t, e]);
    await this.postTask(i);
  }
}, Cd = class {
  constructor() {
    this._bindings = null, this._nextMessageId = 0;
  }
  log(n) {
    this.postMessage({ messageId: this._nextMessageId++, requestId: 0, type: "LOG", data: n }, []);
  }
  sendOK(n) {
    this.postMessage({ messageId: this._nextMessageId++, requestId: n.messageId, type: "OK", data: null }, []);
  }
  failWith(n, t) {
    let e = { name: t.name, message: t.message, stack: t.stack || void 0 };
    this.postMessage({ messageId: this._nextMessageId++, requestId: n.messageId, type: "ERROR", data: e }, []);
  }
  async onMessage(n) {
    switch (n.type) {
      case "PING":
        this.sendOK(n);
        return;
      case "INSTANTIATE":
        this._bindings != null && this.failWith(n, new Error("duckdb already initialized"));
        try {
          this._bindings = await this.instantiate(n.data[0], n.data[1], (t) => {
            this.postMessage({ messageId: this._nextMessageId++, requestId: n.messageId, type: "INSTANTIATE_PROGRESS", data: t }, []);
          }), this.sendOK(n);
        } catch (t) {
          console.log(t), this._bindings = null, this.failWith(n, t);
        }
        return;
    }
    if (!this._bindings) return this.failWith(n, new Error("duckdb is not initialized"));
    try {
      switch (n.type) {
        case "GET_VERSION":
          this.postMessage({ messageId: this._nextMessageId++, requestId: n.messageId, type: "VERSION_STRING", data: this._bindings.getVersion() }, []);
          break;
        case "GET_FEATURE_FLAGS":
          this.postMessage({ messageId: this._nextMessageId++, requestId: n.messageId, type: "FEATURE_FLAGS", data: this._bindings.getFeatureFlags() }, []);
          break;
        case "RESET":
          this._bindings.reset(), this.sendOK(n);
          break;
        case "OPEN":
          this._bindings.open(n.data), this.sendOK(n);
          break;
        case "DROP_FILE":
          this._bindings.dropFile(n.data), this.sendOK(n);
          break;
        case "DROP_FILES":
          this._bindings.dropFiles(), this.sendOK(n);
          break;
        case "FLUSH_FILES":
          this._bindings.flushFiles(), this.sendOK(n);
          break;
        case "CONNECT": {
          let t = this._bindings.connect();
          this.postMessage({ messageId: this._nextMessageId++, requestId: n.messageId, type: "CONNECTION_INFO", data: t.useUnsafe((e, i) => i) }, []);
          break;
        }
        case "DISCONNECT":
          this._bindings.disconnect(n.data), this.sendOK(n);
          break;
        case "CREATE_PREPARED": {
          let t = this._bindings.createPrepared(n.data[0], n.data[1]);
          this.postMessage({ messageId: this._nextMessageId++, requestId: n.messageId, type: "PREPARED_STATEMENT_ID", data: t }, []);
          break;
        }
        case "CLOSE_PREPARED": {
          this._bindings.closePrepared(n.data[0], n.data[1]), this.sendOK(n);
          break;
        }
        case "RUN_PREPARED": {
          let t = this._bindings.runPrepared(n.data[0], n.data[1], n.data[2]);
          this.postMessage({ messageId: this._nextMessageId++, requestId: n.messageId, type: "QUERY_RESULT", data: t }, [t.buffer]);
          break;
        }
        case "RUN_QUERY": {
          let t = this._bindings.runQuery(n.data[0], n.data[1]);
          this.postMessage({ messageId: this._nextMessageId++, requestId: n.messageId, type: "QUERY_RESULT", data: t }, [t.buffer]);
          break;
        }
        case "SEND_PREPARED": {
          let t = this._bindings.sendPrepared(n.data[0], n.data[1], n.data[2]);
          this.postMessage({ messageId: this._nextMessageId++, requestId: n.messageId, type: "QUERY_RESULT_HEADER", data: t }, [t.buffer]);
          break;
        }
        case "START_PENDING_QUERY": {
          let t = this._bindings.startPendingQuery(n.data[0], n.data[1]), e = [];
          t && e.push(t.buffer), this.postMessage({ messageId: this._nextMessageId++, requestId: n.messageId, type: "QUERY_RESULT_HEADER_OR_NULL", data: t }, e);
          break;
        }
        case "POLL_PENDING_QUERY": {
          let t = this._bindings.pollPendingQuery(n.data), e = [];
          t && e.push(t.buffer), this.postMessage({ messageId: this._nextMessageId++, requestId: n.messageId, type: "QUERY_RESULT_HEADER_OR_NULL", data: t }, e);
          break;
        }
        case "CANCEL_PENDING_QUERY": {
          let t = this._bindings.cancelPendingQuery(n.data);
          this.postMessage({ messageId: this._nextMessageId++, requestId: n.messageId, type: "SUCCESS", data: t }, []);
          break;
        }
        case "FETCH_QUERY_RESULTS": {
          let t = this._bindings.fetchQueryResults(n.data);
          this.postMessage({ messageId: this._nextMessageId++, requestId: n.messageId, type: "QUERY_RESULT_CHUNK", data: t }, [t.buffer]);
          break;
        }
        case "GET_TABLE_NAMES": {
          let t = this._bindings.getTableNames(n.data[0], n.data[1]);
          this.postMessage({ messageId: this._nextMessageId++, requestId: n.messageId, type: "TABLE_NAMES", data: t }, []);
          break;
        }
        case "GLOB_FILE_INFOS": {
          let t = this._bindings.globFiles(n.data);
          this.postMessage({ messageId: this._nextMessageId++, requestId: n.messageId, type: "FILE_INFOS", data: t }, []);
          break;
        }
        case "REGISTER_FILE_URL":
          this._bindings.registerFileURL(n.data[0], n.data[1], n.data[2], n.data[3]), this.sendOK(n);
          break;
        case "REGISTER_FILE_BUFFER":
          this._bindings.registerFileBuffer(n.data[0], n.data[1]), this.sendOK(n);
          break;
        case "REGISTER_FILE_HANDLE":
          this._bindings.registerFileHandle(n.data[0], n.data[1], n.data[2], n.data[3]), this.sendOK(n);
          break;
        case "COPY_FILE_TO_PATH":
          this._bindings.copyFileToPath(n.data[0], n.data[1]), this.sendOK(n);
          break;
        case "COPY_FILE_TO_BUFFER": {
          let t = this._bindings.copyFileToBuffer(n.data);
          this.postMessage({ messageId: this._nextMessageId++, requestId: n.messageId, type: "FILE_BUFFER", data: t }, []);
          break;
        }
        case "COLLECT_FILE_STATISTICS":
          this._bindings.collectFileStatistics(n.data[0], n.data[1]), this.sendOK(n);
          break;
        case "EXPORT_FILE_STATISTICS": {
          this.postMessage({ messageId: this._nextMessageId++, requestId: n.messageId, type: "FILE_STATISTICS", data: this._bindings.exportFileStatistics(n.data) }, []);
          break;
        }
        case "INSERT_ARROW_FROM_IPC_STREAM": {
          this._bindings.insertArrowFromIPCStream(n.data[0], n.data[1], n.data[2]), this.sendOK(n);
          break;
        }
        case "IMPORT_CSV_FROM_PATH": {
          this._bindings.insertCSVFromPath(n.data[0], n.data[1], n.data[2]), this.sendOK(n);
          break;
        }
        case "IMPORT_JSON_FROM_PATH": {
          this._bindings.insertJSONFromPath(n.data[0], n.data[1], n.data[2]), this.sendOK(n);
          break;
        }
        case "TOKENIZE": {
          let t = this._bindings.tokenize(n.data);
          this.postMessage({ messageId: this._nextMessageId++, requestId: n.messageId, type: "SCRIPT_TOKENS", data: t }, []);
          break;
        }
      }
    } catch (t) {
      return console.log(t), this.failWith(n, t);
    }
  }
}, bd = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 3, 1, 0, 1, 10, 14, 1, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10, 0, 0, 11])), Id = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 8, 1, 6, 0, 6, 64, 25, 11, 11])), wd = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11])), Sd = () => (async (n) => {
  try {
    return typeof MessageChannel < "u" && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(n);
  } catch {
    return !1;
  }
})(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11])), ji = { name: "@duckdb/duckdb-wasm", version: "1.29.0", description: "DuckDB powered by WebAssembly", license: "MIT", repository: { type: "git", url: "https://github.com/duckdb/duckdb-wasm.git" }, keywords: ["sql", "duckdb", "relational", "database", "data", "query", "wasm", "analytics", "olap", "arrow", "parquet", "json", "csv"], dependencies: { "apache-arrow": "^17.0.0" }, devDependencies: { "@types/emscripten": "^1.39.10", "@types/jasmine": "^5.1.4", "@typescript-eslint/eslint-plugin": "^6.21.0", "@typescript-eslint/parser": "^6.21.0", esbuild: "^0.20.2", eslint: "^8.57.0", "eslint-plugin-jasmine": "^4.1.3", "eslint-plugin-react": "^7.34.0", "fast-glob": "^3.3.2", jasmine: "^5.1.0", "jasmine-core": "^5.1.2", "jasmine-spec-reporter": "^7.0.0", "js-sha256": "^0.11.0", karma: "^6.4.2", "karma-chrome-launcher": "^3.2.0", "karma-coverage": "^2.2.1", "karma-firefox-launcher": "^2.1.3", "karma-jasmine": "^5.1.0", "karma-jasmine-html-reporter": "^2.1.0", "karma-sourcemap-loader": "^0.4.0", "karma-spec-reporter": "^0.0.36", "make-dir": "^4.0.0", nyc: "^15.1.0", prettier: "^3.2.5", puppeteer: "^22.8.0", rimraf: "^5.0.5", s3rver: "^3.7.1", typedoc: "^0.25.13", typescript: "^5.3.3", "wasm-feature-detect": "^1.6.1", "web-worker": "^1.2.0" }, scripts: { "build:debug": "node bundle.mjs debug && tsc --emitDeclarationOnly", "build:release": "node bundle.mjs release && tsc --emitDeclarationOnly", docs: "typedoc", report: "node ./coverage.mjs", "test:node": "node --enable-source-maps ../../node_modules/jasmine/bin/jasmine ./dist/tests-node.cjs", "test:node:debug": "node --inspect-brk --enable-source-maps ../../node_modules/jasmine/bin/jasmine ./dist/tests-node.cjs", "test:node:coverage": "nyc -r json --report-dir ./coverage/node node ../../node_modules/jasmine/bin/jasmine ./dist/tests-node.cjs", "test:firefox": "karma start ./karma/tests-firefox.cjs", "test:chrome": "karma start ./karma/tests-chrome.cjs", "test:chrome:eh": "karma start ./karma/tests-chrome-eh.cjs", "test:chrome:coverage": "karma start ./karma/tests-chrome-coverage.cjs", "test:browser": "karma start ./karma/tests-all.cjs", "test:browser:debug": "karma start ./karma/tests-debug.cjs", test: "npm run test:chrome && npm run test:node", "test:coverage": "npm run test:chrome:coverage && npm run test:node:coverage && npm run report", lint: "eslint src test" }, files: ["dist", "!dist/tests-*", "!dist/duckdb-browser-mvp.worker.js.map", "!dist/types/test"], main: "dist/duckdb-browser.cjs", module: "dist/duckdb-browser.mjs", types: "dist/duckdb-browser.d.ts", jsdelivr: "dist/duckdb-browser.cjs", unpkg: "dist/duckdb-browser.mjs", sideEffects: !1, browser: { fs: !1, path: !1, perf_hooks: !1, os: !1, worker_threads: !1 }, exports: { "./dist/duckdb-mvp.wasm": "./dist/duckdb-mvp.wasm", "./dist/duckdb-eh.wasm": "./dist/duckdb-eh.wasm", "./dist/duckdb-coi.wasm": "./dist/duckdb-coi.wasm", "./dist/duckdb-browser": "./dist/duckdb-browser.mjs", "./dist/duckdb-browser.cjs": "./dist/duckdb-browser.cjs", "./dist/duckdb-browser.mjs": "./dist/duckdb-browser.mjs", "./dist/duckdb-browser-coi.pthread.worker.js": "./dist/duckdb-browser-coi.pthread.worker.js", "./dist/duckdb-browser-coi.worker.js": "./dist/duckdb-browser-coi.worker.js", "./dist/duckdb-browser-eh.worker.js": "./dist/duckdb-browser-eh.worker.js", "./dist/duckdb-browser-mvp.worker.js": "./dist/duckdb-browser-mvp.worker.js", "./dist/duckdb-node": "./dist/duckdb-node.cjs", "./dist/duckdb-node.cjs": "./dist/duckdb-node.cjs", "./dist/duckdb-node-blocking": "./dist/duckdb-node-blocking.cjs", "./dist/duckdb-node-blocking.cjs": "./dist/duckdb-node-blocking.cjs", "./dist/duckdb-node-eh.worker.cjs": "./dist/duckdb-node-eh.worker.cjs", "./dist/duckdb-node-mvp.worker.cjs": "./dist/duckdb-node-mvp.worker.cjs", "./blocking": { node: { types: "./dist/duckdb-node-blocking.d.ts", require: "./dist/duckdb-node-blocking.cjs", import: "./dist/duckdb-node-blocking.cjs" }, types: "./dist/duckdb-node-blocking.d.ts", import: "./dist/duckdb-node-blocking.mjs", require: "./dist/duckdb-node-blocking.cjs" }, ".": { browser: { types: "./dist/duckdb-browser.d.ts", import: "./dist/duckdb-browser.mjs", require: "./dist/duckdb-browser.cjs" }, node: { types: "./dist/duckdb-node.d.ts", import: "./dist/duckdb-node.cjs", require: "./dist/duckdb-node.cjs" }, types: "./dist/duckdb-browser.d.ts", import: "./dist/duckdb-browser.mjs", require: "./dist/duckdb-browser.cjs" } } }, vd = ji.name, Ed = ji.version, Vi = ji.version.split("."), Pd = Vi[0], xd = Vi[1], jd = Vi[2], wo = () => typeof navigator > "u", So = () => wo() ? "node" : navigator.userAgent, Vd = () => So().includes("Firefox"), zd = () => /^((?!chrome|android).)*safari/i.test(So());
function $d() {
  let n = "https://cdn.jsdelivr.net/npm/".concat(vd, "@").concat(Ed, "/dist/");
  return { mvp: { mainModule: "".concat(n, "duckdb-mvp.wasm"), mainWorker: "".concat(n, "duckdb-browser-mvp.worker.js") }, eh: { mainModule: "".concat(n, "duckdb-eh.wasm"), mainWorker: "".concat(n, "duckdb-browser-eh.worker.js") } };
}
var Kn = null, Qn = null, Jn = null, Zn = null, Xn = null;
async function Td() {
  return Kn == null && (Kn = typeof BigInt64Array < "u"), Qn == null && (Qn = await Id()), Jn == null && (Jn = await Sd()), Zn == null && (Zn = await wd()), Xn == null && (Xn = await bd()), { bigInt64Array: Kn, crossOriginIsolated: wo() || globalThis.crossOriginIsolated || !1, wasmExceptions: Qn, wasmSIMD: Zn, wasmThreads: Jn, wasmBulkMemory: Xn };
}
async function Yd(n) {
  let t = await Td();
  if (t.wasmExceptions) {
    if (t.wasmSIMD && t.wasmThreads && t.crossOriginIsolated && n.coi) return { mainModule: n.coi.mainModule, mainWorker: n.coi.mainWorker, pthreadWorker: n.coi.pthreadWorker };
    if (n.eh) return { mainModule: n.eh.mainModule, mainWorker: n.eh.mainWorker, pthreadWorker: null };
  }
  return { mainModule: n.mvp.mainModule, mainWorker: n.mvp.mainWorker, pthreadWorker: null };
}
var Od = rd(od());
async function Wd(n) {
  let t = new Request(n), e = await fetch(t), i = URL.createObjectURL(await e.blob());
  return new Od.default(i);
}
function Bd() {
  let n = new TextDecoder();
  return (t) => (typeof SharedArrayBuffer < "u" && t.buffer instanceof SharedArrayBuffer && (t = new Uint8Array(t)), n.decode(t));
}
Bd();
var Ad = ((n) => (n[n.BUFFER = 0] = "BUFFER", n[n.NODE_FS = 1] = "NODE_FS", n[n.BROWSER_FILEREADER = 2] = "BROWSER_FILEREADER", n[n.BROWSER_FSACCESS = 3] = "BROWSER_FSACCESS", n[n.HTTP = 4] = "HTTP", n[n.S3 = 5] = "S3", n))(Ad || {});
export {
  kd as AsyncDuckDB,
  pd as AsyncDuckDBConnection,
  Cd as AsyncDuckDBDispatcher,
  yd as AsyncPreparedStatement,
  Io as AsyncResultStreamIterator,
  Rd as ConsoleLogger,
  ad as DuckDBAccessMode,
  Ad as DuckDBDataProtocol,
  ld as LogEvent,
  dd as LogLevel,
  hd as LogOrigin,
  ud as LogTopic,
  vd as PACKAGE_NAME,
  Ed as PACKAGE_VERSION,
  Pd as PACKAGE_VERSION_MAJOR,
  xd as PACKAGE_VERSION_MINOR,
  jd as PACKAGE_VERSION_PATCH,
  fd as StatusCode,
  cd as TokenType,
  Dd as VoidLogger,
  md as WorkerRequestType,
  _d as WorkerResponseType,
  D as WorkerTask,
  Wd as createWorker,
  $d as getJsDelivrBundles,
  Ld as getLogEventLabel,
  Nd as getLogLevelLabel,
  Ud as getLogOriginLabel,
  Md as getLogTopicLabel,
  Td as getPlatformFeatures,
  Vd as isFirefox,
  wo as isNode,
  zd as isSafari,
  Yd as selectBundle
};
