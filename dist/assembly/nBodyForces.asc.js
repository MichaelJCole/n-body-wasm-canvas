import { abort } from 'env';
import { trace } from 'env';

function asmFunc(global, env, buffer) {
 var HEAP8 = new global.Int8Array(buffer);
 var HEAP16 = new global.Int16Array(buffer);
 var HEAP32 = new global.Int32Array(buffer);
 var HEAPU8 = new global.Uint8Array(buffer);
 var HEAPU16 = new global.Uint16Array(buffer);
 var HEAPU32 = new global.Uint32Array(buffer);
 var HEAPF32 = new global.Float32Array(buffer);
 var HEAPF64 = new global.Float64Array(buffer);
 var Math_imul = global.Math.imul;
 var Math_fround = global.Math.fround;
 var Math_abs = global.Math.abs;
 var Math_clz32 = global.Math.clz32;
 var Math_min = global.Math.min;
 var Math_max = global.Math.max;
 var Math_floor = global.Math.floor;
 var Math_ceil = global.Math.ceil;
 var Math_sqrt = global.Math.sqrt;
 var abort = env.abort;
 var nan = global.NaN;
 var infinity = global.Infinity;
 var $lib_builtins_abort = env.abort;
 var $lib_builtins_trace = env.trace;
 var $lib_rt_tlsf_ROOT = 0;
 var $lib_rt_pure_CUR = 0;
 var $lib_rt_pure_END = 0;
 var $lib_rt_pure_ROOTS = 0;
 var nBodyForces_FLOAT64ARRAY_ID = 3;
 var nBodyForces_G = 6.674e-11;
 var nBodyForces_bodySize = 4;
 var nBodyForces_forceSize = 3;
 var $lib_rt___rtti_base = 576;
 var $lib_heap___heap_base = 620;
 function $lib_rt_tlsf_removeBlock($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $4 = 0, $9 = 0, $3 = 0, $7 = 0, $5 = 0, $8 = 0, $6 = 0, $2 = 0, $24 = 0, $47 = 0;
  $2 = HEAP32[$1 >> 2] | 0;
  if (!($2 & 1 | 0)) {
   $lib_builtins_abort(0 | 0, 24 | 0, 277 | 0, 13 | 0);
   abort();
  }
  $3 = $2 & (3 ^ -1 | 0) | 0;
  if ($3 >>> 0 >= 16 >>> 0) {
   $24 = $3 >>> 0 < 1073741808 >>> 0
  } else {
   $24 = 0
  }
  if (!$24) {
   $lib_builtins_abort(0 | 0, 24 | 0, 279 | 0, 13 | 0);
   abort();
  }
  if ($3 >>> 0 < 256 >>> 0) {
   $4 = 0;
   $5 = $3 >>> 4 | 0;
  } else {
   $4 = 31 - Math_clz32($3) | 0;
   $5 = ($3 >>> ($4 - 4 | 0) | 0) ^ (1 << 4 | 0) | 0;
   $4 = $4 - (8 - 1 | 0) | 0;
  }
  if ($4 >>> 0 < 23 >>> 0) {
   $47 = $5 >>> 0 < 16 >>> 0
  } else {
   $47 = 0
  }
  if (!$47) {
   $lib_builtins_abort(0 | 0, 24 | 0, 292 | 0, 13 | 0);
   abort();
  }
  $6 = HEAP32[($1 + 16 | 0) >> 2] | 0;
  $7 = HEAP32[($1 + 20 | 0) >> 2] | 0;
  if ($6) {
   HEAP32[($6 + 20 | 0) >> 2] = $7
  }
  if ($7) {
   HEAP32[($7 + 16 | 0) >> 2] = $6
  }
  $lib_rt_tlsf_GETHEAD_inlined_0 : {
   $9 = $4;
   $8 = $5;
  }
  if (($1 | 0) == (HEAP32[(($0 + ((($9 << 4 | 0) + $8 | 0) << 2 | 0) | 0) + 96 | 0) >> 2] | 0 | 0)) {
   $lib_rt_tlsf_SETHEAD_inlined_1 : {
    $9 = $5;
    $8 = $7;
    HEAP32[(($0 + ((($4 << 4 | 0) + $9 | 0) << 2 | 0) | 0) + 96 | 0) >> 2] = $7;
   }
   if (!$7) {
    $lib_rt_tlsf_GETSL_inlined_0 : {
     $9 = $0;
     $8 = $4;
    }
    $9 = HEAP32[(($9 + ($8 << 2 | 0) | 0) + 4 | 0) >> 2] | 0;
    $lib_rt_tlsf_SETSL_inlined_1 : {
     $8 = $0;
     $9 = $9 & ((1 << $5 | 0) ^ -1 | 0) | 0;
     HEAP32[(($0 + ($4 << 2 | 0) | 0) + 4 | 0) >> 2] = $9;
    }
    if (!$9) {
     HEAP32[$0 >> 2] = (HEAP32[$0 >> 2] | 0) & ((1 << $4 | 0) ^ -1 | 0) | 0
    }
   }
  }
 }
 
 function $lib_rt_tlsf_insertBlock($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $3 = 0, $6 = 0, $9 = 0, $2 = 0, $4 = 0, $7 = 0, $8 = 0, $10 = 0, $5 = 0, $11 = 0, $107 = 0, $140 = 0;
  if (!$1) {
   $lib_builtins_abort(0 | 0, 24 | 0, 205 | 0, 13 | 0);
   abort();
  }
  $2 = HEAP32[$1 >> 2] | 0;
  if (!($2 & 1 | 0)) {
   $lib_builtins_abort(0 | 0, 24 | 0, 207 | 0, 13 | 0);
   abort();
  }
  $3 = $1;
  $4 = ($3 + 16 | 0) + ((HEAP32[$3 >> 2] | 0) & (3 ^ -1 | 0) | 0) | 0;
  $5 = HEAP32[$4 >> 2] | 0;
  if ($5 & 1 | 0) {
   $3 = (($2 & (3 ^ -1 | 0) | 0) + 16 | 0) + ($5 & (3 ^ -1 | 0) | 0) | 0;
   if ($3 >>> 0 < 1073741808 >>> 0) {
    $lib_rt_tlsf_removeBlock($0 | 0, $4 | 0);
    $2 = $2 & 3 | 0 | $3 | 0;
    HEAP32[$1 >> 2] = $2;
    $6 = $1;
    $4 = ($6 + 16 | 0) + ((HEAP32[$6 >> 2] | 0) & (3 ^ -1 | 0) | 0) | 0;
    $5 = HEAP32[$4 >> 2] | 0;
   }
  }
  if ($2 & 2 | 0) {
   $6 = $1;
   $6 = HEAP32[($6 - 4 | 0) >> 2] | 0;
   $3 = HEAP32[$6 >> 2] | 0;
   if (!($3 & 1 | 0)) {
    $lib_builtins_abort(0 | 0, 24 | 0, 228 | 0, 15 | 0);
    abort();
   }
   $7 = (($3 & (3 ^ -1 | 0) | 0) + 16 | 0) + ($2 & (3 ^ -1 | 0) | 0) | 0;
   if ($7 >>> 0 < 1073741808 >>> 0) {
    $lib_rt_tlsf_removeBlock($0 | 0, $6 | 0);
    $2 = $3 & 3 | 0 | $7 | 0;
    HEAP32[$6 >> 2] = $2;
    $1 = $6;
   }
  }
  HEAP32[$4 >> 2] = $5 | 2 | 0;
  $8 = $2 & (3 ^ -1 | 0) | 0;
  if ($8 >>> 0 >= 16 >>> 0) {
   $107 = $8 >>> 0 < 1073741808 >>> 0
  } else {
   $107 = 0
  }
  if (!$107) {
   $lib_builtins_abort(0 | 0, 24 | 0, 243 | 0, 13 | 0);
   abort();
  }
  if (!((($1 + 16 | 0) + $8 | 0 | 0) == ($4 | 0))) {
   $lib_builtins_abort(0 | 0, 24 | 0, 244 | 0, 13 | 0);
   abort();
  }
  HEAP32[($4 - 4 | 0) >> 2] = $1;
  if ($8 >>> 0 < 256 >>> 0) {
   $9 = 0;
   $10 = $8 >>> 4 | 0;
  } else {
   $9 = 31 - Math_clz32($8) | 0;
   $10 = ($8 >>> ($9 - 4 | 0) | 0) ^ (1 << 4 | 0) | 0;
   $9 = $9 - (8 - 1 | 0) | 0;
  }
  if ($9 >>> 0 < 23 >>> 0) {
   $140 = $10 >>> 0 < 16 >>> 0
  } else {
   $140 = 0
  }
  if (!$140) {
   $lib_builtins_abort(0 | 0, 24 | 0, 260 | 0, 13 | 0);
   abort();
  }
  $lib_rt_tlsf_GETHEAD_inlined_1 : {
   $7 = $0;
   $3 = $9;
   $6 = $10;
  }
  $11 = HEAP32[(($7 + ((($3 << 4 | 0) + $6 | 0) << 2 | 0) | 0) + 96 | 0) >> 2] | 0;
  HEAP32[($1 + 16 | 0) >> 2] = 0;
  HEAP32[($1 + 20 | 0) >> 2] = $11;
  if ($11) {
   HEAP32[($11 + 16 | 0) >> 2] = $1
  }
  $lib_rt_tlsf_SETHEAD_inlined_2 : {
   $7 = $9;
   $3 = $10;
   $6 = $1;
   HEAP32[(($0 + ((($9 << 4 | 0) + $3 | 0) << 2 | 0) | 0) + 96 | 0) >> 2] = $1;
  }
  HEAP32[$0 >> 2] = HEAP32[$0 >> 2] | 0 | (1 << $9 | 0) | 0;
  $lib_rt_tlsf_SETSL_inlined_2 : {
   $lib_rt_tlsf_GETSL_inlined_1 : {
    $3 = $0;
    $6 = $9;
   }
   $7 = HEAP32[(($3 + ($6 << 2 | 0) | 0) + 4 | 0) >> 2] | 0 | (1 << $10 | 0) | 0;
   HEAP32[(($0 + ($9 << 2 | 0) | 0) + 4 | 0) >> 2] = $7;
  }
 }
 
 function $lib_rt_tlsf_addMemory($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $4 = 0, $6 = 0, $16 = 0, $21 = 0, $5 = 0;
  if ($1 >>> 0 <= $2 >>> 0) {
   $16 = !($1 & 15 | 0)
  } else {
   $16 = 0
  }
  if ($16) {
   $21 = !($2 & 15 | 0)
  } else {
   $21 = 0
  }
  if (!$21) {
   $lib_builtins_abort(0 | 0, 24 | 0, 386 | 0, 4 | 0);
   abort();
  }
  $4 = HEAP32[($0 + 1568 | 0) >> 2] | 0;
  $5 = 0;
  if ($4) {
   if (!($1 >>> 0 >= ($4 + 16 | 0) >>> 0)) {
    $lib_builtins_abort(0 | 0, 24 | 0, 396 | 0, 15 | 0);
    abort();
   }
   if (($1 - 16 | 0 | 0) == ($4 | 0)) {
    $1 = $1 - 16 | 0;
    $5 = HEAP32[$4 >> 2] | 0;
   }
  } else {
   if (!($1 >>> 0 >= ($0 + 1572 | 0) >>> 0)) {
    $lib_builtins_abort(0 | 0, 24 | 0, 408 | 0, 4 | 0);
    abort();
   }
  }
  $6 = $2 - $1 | 0;
  if ($6 >>> 0 < 48 >>> 0) {
   return 0 | 0
  }
  HEAP32[$1 >> 2] = $6 - (16 << 1 | 0) | 0 | 1 | 0 | ($5 & 2 | 0) | 0;
  HEAP32[($1 + 16 | 0) >> 2] = 0;
  HEAP32[($1 + 20 | 0) >> 2] = 0;
  $4 = ($1 + $6 | 0) - 16 | 0;
  HEAP32[$4 >> 2] = 0 | 2 | 0;
  HEAP32[($0 + 1568 | 0) >> 2] = $4;
  $lib_rt_tlsf_insertBlock($0 | 0, $1 | 0);
  return 1 | 0;
 }
 
 function $lib_rt_tlsf_initializeRoot() {
  var $3 = 0, $5 = 0, $4 = 0, $7 = 0, $0 = 0, $1 = 0, $2 = 0, $29 = 0;
  $0 = ($lib_heap___heap_base + 15 | 0) & (15 ^ -1 | 0) | 0;
  $1 = __wasm_memory_size();
  $2 = ((($0 + 1572 | 0) + 65535 | 0) & (65535 ^ -1 | 0) | 0) >>> 16 | 0;
  if (($2 | 0) > ($1 | 0)) {
   $29 = (__wasm_memory_grow($2 - $1 | 0 | 0) | 0) < (0 | 0)
  } else {
   $29 = 0
  }
  if ($29) {
   abort()
  }
  $3 = $0;
  HEAP32[$3 >> 2] = 0;
  $lib_rt_tlsf_SETTAIL_inlined_0 : {
   $5 = $3;
   $4 = 0;
   HEAP32[($3 + 1568 | 0) >> 2] = $4;
  }
  break_0 : {
   $5 = 0;
   loop_0 : while (1) {
    if (!($5 >>> 0 < 23 >>> 0)) {
     break break_0
    }
    $lib_rt_tlsf_SETSL_inlined_0 : {
     $7 = $3;
     $4 = 0;
     HEAP32[(($3 + ($5 << 2 | 0) | 0) + 4 | 0) >> 2] = $4;
    }
    break_1 : {
     $7 = 0;
     loop_1 : while (1) {
      if (!($7 >>> 0 < 16 >>> 0)) {
       break break_1
      }
      $lib_rt_tlsf_SETHEAD_inlined_0 : {
       $4 = 0;
       HEAP32[(($3 + ((($5 << 4 | 0) + $7 | 0) << 2 | 0) | 0) + 96 | 0) >> 2] = $4;
      }
      $7 = $7 + 1 | 0;
      continue loop_1;
     };
    }
    $5 = $5 + 1 | 0;
    continue loop_0;
   };
  }
  $lib_rt_tlsf_addMemory($3 | 0, (($0 + 1572 | 0) + 15 | 0) & (15 ^ -1 | 0) | 0 | 0, __wasm_memory_size() << 16 | 0 | 0) | 0;
  $lib_rt_tlsf_ROOT = $3;
 }
 
 function $lib_rt_tlsf_prepareSize($0) {
  $0 = $0 | 0;
  var $1 = 0, $2 = 0;
  if ($0 >>> 0 >= 1073741808 >>> 0) {
   $lib_builtins_abort(72 | 0, 24 | 0, 457 | 0, 29 | 0);
   abort();
  }
  $1 = ($0 + 15 | 0) & (15 ^ -1 | 0) | 0;
  $2 = 16;
  return ($1 >>> 0 > $2 >>> 0 ? $1 : $2) | 0;
 }
 
 function $lib_rt_tlsf_searchBlock($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $2 = 0, $4 = 0, $6 = 0, $8 = 0, $5 = 0, $7 = 0, $3 = 0, $9 = 0, $24 = 0, $42 = 0;
  if ($1 >>> 0 < 256 >>> 0) {
   $2 = 0;
   $3 = $1 >>> 4 | 0;
  } else {
   if ($1 >>> 0 < 536870904 >>> 0) {
    $24 = ($1 + (1 << (27 - Math_clz32($1) | 0) | 0) | 0) - 1 | 0
   } else {
    $24 = $1
   }
   $4 = $24;
   $2 = 31 - Math_clz32($4) | 0;
   $3 = ($4 >>> ($2 - 4 | 0) | 0) ^ (1 << 4 | 0) | 0;
   $2 = $2 - (8 - 1 | 0) | 0;
  }
  if ($2 >>> 0 < 23 >>> 0) {
   $42 = $3 >>> 0 < 16 >>> 0
  } else {
   $42 = 0
  }
  if (!$42) {
   $lib_builtins_abort(0 | 0, 24 | 0, 338 | 0, 13 | 0);
   abort();
  }
  $lib_rt_tlsf_GETSL_inlined_2 : {
   $5 = $0;
   $4 = $2;
  }
  $6 = (HEAP32[(($5 + ($4 << 2 | 0) | 0) + 4 | 0) >> 2] | 0) & ((0 ^ -1 | 0) << $3 | 0) | 0;
  $7 = 0;
  if (!$6) {
   $5 = (HEAP32[$0 >> 2] | 0) & ((0 ^ -1 | 0) << ($2 + 1 | 0) | 0) | 0;
   if (!$5) {
    $7 = 0
   } else {
    $2 = __wasm_ctz_i32($5 | 0) | 0;
    $lib_rt_tlsf_GETSL_inlined_3 : {
     $8 = $0;
     $4 = $2;
    }
    $6 = HEAP32[(($8 + ($4 << 2 | 0) | 0) + 4 | 0) >> 2] | 0;
    if (!$6) {
     $lib_builtins_abort(0 | 0, 24 | 0, 351 | 0, 17 | 0);
     abort();
    }
    $lib_rt_tlsf_GETHEAD_inlined_2 : {
     $9 = $0;
     $8 = $2;
     $4 = __wasm_ctz_i32($6 | 0) | 0;
    }
    $7 = HEAP32[(($9 + ((($8 << 4 | 0) + $4 | 0) << 2 | 0) | 0) + 96 | 0) >> 2] | 0;
   }
  } else {
   $lib_rt_tlsf_GETHEAD_inlined_3 : {
    $9 = $0;
    $8 = $2;
    $4 = __wasm_ctz_i32($6 | 0) | 0;
   }
   $7 = HEAP32[(($9 + ((($8 << 4 | 0) + $4 | 0) << 2 | 0) | 0) + 96 | 0) >> 2] | 0;
  }
  return $7 | 0;
 }
 
 function $lib_rt_tlsf_growMemory($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $2 = 0, $4 = 0;
  if ($1 >>> 0 < 536870904 >>> 0) {
   $1 = $1 + ((1 << (27 - Math_clz32($1) | 0) | 0) - 1 | 0) | 0
  }
  $2 = __wasm_memory_size();
  $1 = $1 + (16 << ((($2 << 16 | 0) - 16 | 0 | 0) != (HEAP32[($0 + 1568 | 0) >> 2] | 0 | 0)) | 0) | 0;
  $4 = (($1 + 65535 | 0) & (65535 ^ -1 | 0) | 0) >>> 16 | 0;
  if ((__wasm_memory_grow((($2 | 0) > ($4 | 0) ? $2 : $4) | 0) | 0) < (0 | 0)) {
   if ((__wasm_memory_grow($4 | 0) | 0) < (0 | 0)) {
    abort()
   }
  }
  $lib_rt_tlsf_addMemory($0 | 0, $2 << 16 | 0 | 0, __wasm_memory_size() << 16 | 0 | 0) | 0;
 }
 
 function $lib_rt_tlsf_prepareBlock($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $5 = 0, $3 = 0, $4 = 0, $47 = 0;
  $3 = HEAP32[$1 >> 2] | 0;
  if (!!($2 & 15 | 0)) {
   $lib_builtins_abort(0 | 0, 24 | 0, 365 | 0, 13 | 0);
   abort();
  }
  $4 = ($3 & (3 ^ -1 | 0) | 0) - $2 | 0;
  if ($4 >>> 0 >= 32 >>> 0) {
   HEAP32[$1 >> 2] = $2 | ($3 & 2 | 0) | 0;
   $5 = ($1 + 16 | 0) + $2 | 0;
   HEAP32[$5 >> 2] = $4 - 16 | 0 | 1 | 0;
   $lib_rt_tlsf_insertBlock($0 | 0, $5 | 0);
  } else {
   HEAP32[$1 >> 2] = $3 & (1 ^ -1 | 0) | 0;
   $5 = $1;
   $47 = ($5 + 16 | 0) + ((HEAP32[$5 >> 2] | 0) & (3 ^ -1 | 0) | 0) | 0;
   $5 = $1;
   HEAP32[$47 >> 2] = (HEAP32[(($5 + 16 | 0) + ((HEAP32[$5 >> 2] | 0) & (3 ^ -1 | 0) | 0) | 0) >> 2] | 0) & (2 ^ -1 | 0) | 0;
  }
 }
 
 function $lib_rt_tlsf_allocateBlock($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $3 = 0, $2 = 0;
  $2 = $lib_rt_tlsf_prepareSize($1 | 0) | 0;
  $3 = $lib_rt_tlsf_searchBlock($0 | 0, $2 | 0) | 0;
  if (!$3) {
   $lib_rt_tlsf_growMemory($0 | 0, $2 | 0);
   $3 = $lib_rt_tlsf_searchBlock($0 | 0, $2 | 0) | 0;
   if (!$3) {
    $lib_builtins_abort(0 | 0, 24 | 0, 487 | 0, 15 | 0);
    abort();
   }
  }
  if (!(((HEAP32[$3 >> 2] | 0) & -4 | 0) >>> 0 >= $2 >>> 0)) {
   $lib_builtins_abort(0 | 0, 24 | 0, 489 | 0, 13 | 0);
   abort();
  }
  HEAP32[($3 + 4 | 0) >> 2] = 0;
  HEAP32[($3 + 12 | 0) >> 2] = $1;
  $lib_rt_tlsf_removeBlock($0 | 0, $3 | 0);
  $lib_rt_tlsf_prepareBlock($0 | 0, $3 | 0, $2 | 0);
  return $3 | 0;
 }
 
 function $lib_rt_tlsf___alloc($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $2 = 0, $3 = 0;
  $2 = $lib_rt_tlsf_ROOT;
  if (!$2) {
   $lib_rt_tlsf_initializeRoot();
   $2 = $lib_rt_tlsf_ROOT;
  }
  $3 = $lib_rt_tlsf_allocateBlock($2 | 0, $0 | 0) | 0;
  HEAP32[($3 + 8 | 0) >> 2] = $1;
  return $3 + 16 | 0 | 0;
 }
 
 function $lib_rt_pure_increment($0) {
  $0 = $0 | 0;
  var $1 = 0;
  $1 = HEAP32[($0 + 4 | 0) >> 2] | 0;
  if (!(($1 & -268435456 | 0 | 0) == (($1 + 1 | 0) & -268435456 | 0 | 0))) {
   $lib_builtins_abort(0 | 0, 128 | 0, 104 | 0, 2 | 0);
   abort();
  }
  HEAP32[($0 + 4 | 0) >> 2] = $1 + 1 | 0;
  if (!!((HEAP32[$0 >> 2] | 0) & 1 | 0)) {
   $lib_builtins_abort(0 | 0, 128 | 0, 107 | 0, 13 | 0);
   abort();
  }
 }
 
 function $lib_rt_pure___retain($0) {
  $0 = $0 | 0;
  if ($0 >>> 0 > $lib_heap___heap_base >>> 0) {
   $lib_rt_pure_increment($0 - 16 | 0 | 0)
  }
  return $0 | 0;
 }
 
 function $lib_rt_tlsf_freeBlock($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $2 = 0;
  $2 = HEAP32[$1 >> 2] | 0;
  if (!!($2 & 1 | 0)) {
   $lib_builtins_abort(0 | 0, 24 | 0, 546 | 0, 2 | 0);
   abort();
  }
  HEAP32[$1 >> 2] = $2 | 1 | 0;
  $lib_rt_tlsf_insertBlock($0 | 0, $1 | 0);
 }
 
 function $lib_rt___typeinfo($0) {
  $0 = $0 | 0;
  var $1 = 0;
  $1 = $lib_rt___rtti_base;
  if ($0 >>> 0 > (HEAP32[$1 >> 2] | 0) >>> 0) {
   $lib_builtins_abort(176 | 0, 232 | 0, 22 | 0, 27 | 0);
   abort();
  }
  return HEAP32[(($1 + 4 | 0) + Math_imul($0, 8) | 0) >> 2] | 0 | 0;
 }
 
 function $lib_util_memory_memcpy($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $5 = 0, $3 = 0, $4 = 0, $9 = 0, $17 = 0, $96 = 0, $121 = 0, $134 = 0, $147 = 0, $212 = 0, $225 = 0, $290 = 0, $355 = 0, $368 = 0, $381 = 0, $394 = 0, $407 = 0, $420 = 0, $433 = 0, $446 = 0, $459 = 0, $472 = 0, $485 = 0, $498 = 0, $511 = 0, $524 = 0, $537 = 0, $550 = 0, $565 = 0, $578 = 0, $591 = 0, $604 = 0, $617 = 0, $630 = 0, $643 = 0, $656 = 0, $671 = 0, $684 = 0, $697 = 0, $710 = 0, $725 = 0, $738 = 0, $753 = 0;
  break_0 : {
   continue_0 : while (1) {
    if ($2) {
     $9 = $1 & 3 | 0
    } else {
     $9 = 0
    }
    if (!$9) {
     break break_0
    }
    $5 = $0;
    $0 = $5 + 1 | 0;
    $17 = $5;
    $5 = $1;
    $1 = $5 + 1 | 0;
    HEAP8[$17 >> 0] = HEAPU8[$5 >> 0] | 0;
    $2 = $2 - 1 | 0;
    continue continue_0;
   };
  }
  if (($0 & 3 | 0 | 0) == (0 | 0)) {
   break_1 : {
    continue_1 : while (1) {
     if (!($2 >>> 0 >= 16 >>> 0)) {
      break break_1
     }
     HEAP32[$0 >> 2] = HEAP32[$1 >> 2] | 0;
     HEAP32[($0 + 4 | 0) >> 2] = HEAP32[($1 + 4 | 0) >> 2] | 0;
     HEAP32[($0 + 8 | 0) >> 2] = HEAP32[($1 + 8 | 0) >> 2] | 0;
     HEAP32[($0 + 12 | 0) >> 2] = HEAP32[($1 + 12 | 0) >> 2] | 0;
     $1 = $1 + 16 | 0;
     $0 = $0 + 16 | 0;
     $2 = $2 - 16 | 0;
     continue continue_1;
    };
   }
   if ($2 & 8 | 0) {
    HEAP32[$0 >> 2] = HEAP32[$1 >> 2] | 0;
    HEAP32[($0 + 4 | 0) >> 2] = HEAP32[($1 + 4 | 0) >> 2] | 0;
    $0 = $0 + 8 | 0;
    $1 = $1 + 8 | 0;
   }
   if ($2 & 4 | 0) {
    HEAP32[$0 >> 2] = HEAP32[$1 >> 2] | 0;
    $0 = $0 + 4 | 0;
    $1 = $1 + 4 | 0;
   }
   if ($2 & 2 | 0) {
    HEAP16[$0 >> 1] = HEAPU16[$1 >> 1] | 0;
    $0 = $0 + 2 | 0;
    $1 = $1 + 2 | 0;
   }
   if ($2 & 1 | 0) {
    $5 = $0;
    $0 = $5 + 1 | 0;
    $96 = $5;
    $5 = $1;
    $1 = $5 + 1 | 0;
    HEAP8[$96 >> 0] = HEAPU8[$5 >> 0] | 0;
   }
   return;
  }
  if ($2 >>> 0 >= 32 >>> 0) {
   break_2 : {
    case2_2 : {
     case1_2 : {
      case0_2 : {
       $5 = $0 & 3 | 0;
       if (($5 | 0) == (1 | 0)) {
        break case0_2
       }
       if (($5 | 0) == (2 | 0)) {
        break case1_2
       }
       if (($5 | 0) == (3 | 0)) {
        break case2_2
       }
       break break_2;
      }
      $3 = HEAP32[$1 >> 2] | 0;
      $5 = $0;
      $0 = $5 + 1 | 0;
      $121 = $5;
      $5 = $1;
      $1 = $5 + 1 | 0;
      HEAP8[$121 >> 0] = HEAPU8[$5 >> 0] | 0;
      $5 = $0;
      $0 = $5 + 1 | 0;
      $134 = $5;
      $5 = $1;
      $1 = $5 + 1 | 0;
      HEAP8[$134 >> 0] = HEAPU8[$5 >> 0] | 0;
      $5 = $0;
      $0 = $5 + 1 | 0;
      $147 = $5;
      $5 = $1;
      $1 = $5 + 1 | 0;
      HEAP8[$147 >> 0] = HEAPU8[$5 >> 0] | 0;
      $2 = $2 - 3 | 0;
      break_3 : {
       continue_3 : while (1) {
        if (!($2 >>> 0 >= 17 >>> 0)) {
         break break_3
        }
        $4 = HEAP32[($1 + 1 | 0) >> 2] | 0;
        HEAP32[$0 >> 2] = $3 >>> 24 | 0 | ($4 << 8 | 0) | 0;
        $3 = HEAP32[($1 + 5 | 0) >> 2] | 0;
        HEAP32[($0 + 4 | 0) >> 2] = $4 >>> 24 | 0 | ($3 << 8 | 0) | 0;
        $4 = HEAP32[($1 + 9 | 0) >> 2] | 0;
        HEAP32[($0 + 8 | 0) >> 2] = $3 >>> 24 | 0 | ($4 << 8 | 0) | 0;
        $3 = HEAP32[($1 + 13 | 0) >> 2] | 0;
        HEAP32[($0 + 12 | 0) >> 2] = $4 >>> 24 | 0 | ($3 << 8 | 0) | 0;
        $1 = $1 + 16 | 0;
        $0 = $0 + 16 | 0;
        $2 = $2 - 16 | 0;
        continue continue_3;
       };
      }
      break break_2;
     }
     $3 = HEAP32[$1 >> 2] | 0;
     $5 = $0;
     $0 = $5 + 1 | 0;
     $212 = $5;
     $5 = $1;
     $1 = $5 + 1 | 0;
     HEAP8[$212 >> 0] = HEAPU8[$5 >> 0] | 0;
     $5 = $0;
     $0 = $5 + 1 | 0;
     $225 = $5;
     $5 = $1;
     $1 = $5 + 1 | 0;
     HEAP8[$225 >> 0] = HEAPU8[$5 >> 0] | 0;
     $2 = $2 - 2 | 0;
     break_4 : {
      continue_4 : while (1) {
       if (!($2 >>> 0 >= 18 >>> 0)) {
        break break_4
       }
       $4 = HEAP32[($1 + 2 | 0) >> 2] | 0;
       HEAP32[$0 >> 2] = $3 >>> 16 | 0 | ($4 << 16 | 0) | 0;
       $3 = HEAP32[($1 + 6 | 0) >> 2] | 0;
       HEAP32[($0 + 4 | 0) >> 2] = $4 >>> 16 | 0 | ($3 << 16 | 0) | 0;
       $4 = HEAP32[($1 + 10 | 0) >> 2] | 0;
       HEAP32[($0 + 8 | 0) >> 2] = $3 >>> 16 | 0 | ($4 << 16 | 0) | 0;
       $3 = HEAP32[($1 + 14 | 0) >> 2] | 0;
       HEAP32[($0 + 12 | 0) >> 2] = $4 >>> 16 | 0 | ($3 << 16 | 0) | 0;
       $1 = $1 + 16 | 0;
       $0 = $0 + 16 | 0;
       $2 = $2 - 16 | 0;
       continue continue_4;
      };
     }
     break break_2;
    }
    $3 = HEAP32[$1 >> 2] | 0;
    $5 = $0;
    $0 = $5 + 1 | 0;
    $290 = $5;
    $5 = $1;
    $1 = $5 + 1 | 0;
    HEAP8[$290 >> 0] = HEAPU8[$5 >> 0] | 0;
    $2 = $2 - 1 | 0;
    break_5 : {
     continue_5 : while (1) {
      if (!($2 >>> 0 >= 19 >>> 0)) {
       break break_5
      }
      $4 = HEAP32[($1 + 3 | 0) >> 2] | 0;
      HEAP32[$0 >> 2] = $3 >>> 8 | 0 | ($4 << 24 | 0) | 0;
      $3 = HEAP32[($1 + 7 | 0) >> 2] | 0;
      HEAP32[($0 + 4 | 0) >> 2] = $4 >>> 8 | 0 | ($3 << 24 | 0) | 0;
      $4 = HEAP32[($1 + 11 | 0) >> 2] | 0;
      HEAP32[($0 + 8 | 0) >> 2] = $3 >>> 8 | 0 | ($4 << 24 | 0) | 0;
      $3 = HEAP32[($1 + 15 | 0) >> 2] | 0;
      HEAP32[($0 + 12 | 0) >> 2] = $4 >>> 8 | 0 | ($3 << 24 | 0) | 0;
      $1 = $1 + 16 | 0;
      $0 = $0 + 16 | 0;
      $2 = $2 - 16 | 0;
      continue continue_5;
     };
    }
    break break_2;
   }
  }
  if ($2 & 16 | 0) {
   $5 = $0;
   $0 = $5 + 1 | 0;
   $355 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$355 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $368 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$368 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $381 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$381 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $394 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$394 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $407 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$407 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $420 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$420 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $433 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$433 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $446 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$446 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $459 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$459 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $472 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$472 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $485 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$485 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $498 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$498 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $511 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$511 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $524 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$524 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $537 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$537 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $550 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$550 >> 0] = HEAPU8[$5 >> 0] | 0;
  }
  if ($2 & 8 | 0) {
   $5 = $0;
   $0 = $5 + 1 | 0;
   $565 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$565 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $578 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$578 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $591 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$591 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $604 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$604 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $617 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$617 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $630 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$630 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $643 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$643 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $656 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$656 >> 0] = HEAPU8[$5 >> 0] | 0;
  }
  if ($2 & 4 | 0) {
   $5 = $0;
   $0 = $5 + 1 | 0;
   $671 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$671 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $684 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$684 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $697 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$697 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $710 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$710 >> 0] = HEAPU8[$5 >> 0] | 0;
  }
  if ($2 & 2 | 0) {
   $5 = $0;
   $0 = $5 + 1 | 0;
   $725 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$725 >> 0] = HEAPU8[$5 >> 0] | 0;
   $5 = $0;
   $0 = $5 + 1 | 0;
   $738 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$738 >> 0] = HEAPU8[$5 >> 0] | 0;
  }
  if ($2 & 1 | 0) {
   $5 = $0;
   $0 = $5 + 1 | 0;
   $753 = $5;
   $5 = $1;
   $1 = $5 + 1 | 0;
   HEAP8[$753 >> 0] = HEAPU8[$5 >> 0] | 0;
  }
 }
 
 function $lib_memory_memory_copy($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $3 = 0, $5 = 0, $4 = 0, $6 = 0, i64toi32_i32$1 = 0, i64toi32_i32$0 = 0, i64toi32_i32$2 = 0, $23 = 0, $48 = 0, $61 = 0, $75 = 0, $117 = 0;
  $lib_util_memory_memmove_inlined_0 : {
   $5 = $0;
   $4 = $1;
   $3 = $2;
   if (($5 | 0) == ($4 | 0)) {
    break $lib_util_memory_memmove_inlined_0
   }
   if (($4 + $3 | 0) >>> 0 <= $5 >>> 0) {
    $23 = 1
   } else {
    $23 = ($5 + $3 | 0) >>> 0 <= $4 >>> 0
   }
   if ($23) {
    $lib_util_memory_memcpy($5 | 0, $4 | 0, $3 | 0);
    break $lib_util_memory_memmove_inlined_0;
   }
   if ($5 >>> 0 < $4 >>> 0) {
    if (($4 & 7 | 0 | 0) == ($5 & 7 | 0 | 0)) {
     break_0 : {
      continue_0 : while (1) {
       if (!($5 & 7 | 0)) {
        break break_0
       }
       if (!$3) {
        break $lib_util_memory_memmove_inlined_0
       }
       $3 = $3 - 1 | 0;
       $6 = $5;
       $5 = $5 + 1 | 0;
       $48 = $6;
       $6 = $4;
       $4 = $4 + 1 | 0;
       HEAP8[$48 >> 0] = HEAPU8[$6 >> 0] | 0;
       continue continue_0;
      };
     }
     break_1 : {
      continue_1 : while (1) {
       if (!($3 >>> 0 >= 8 >>> 0)) {
        break break_1
       }
       i64toi32_i32$2 = $4;
       i64toi32_i32$0 = HEAP32[$4 >> 2] | 0;
       i64toi32_i32$1 = HEAP32[($4 + 4 | 0) >> 2] | 0;
       $61 = i64toi32_i32$0;
       i64toi32_i32$0 = $5;
       HEAP32[$5 >> 2] = $61;
       HEAP32[($5 + 4 | 0) >> 2] = i64toi32_i32$1;
       $3 = $3 - 8 | 0;
       $5 = $5 + 8 | 0;
       $4 = $4 + 8 | 0;
       continue continue_1;
      };
     }
    }
    break_2 : {
     continue_2 : while (1) {
      if (!$3) {
       break break_2
      }
      $6 = $5;
      $5 = $5 + 1 | 0;
      $75 = $6;
      $6 = $4;
      $4 = $4 + 1 | 0;
      HEAP8[$75 >> 0] = HEAPU8[$6 >> 0] | 0;
      $3 = $3 - 1 | 0;
      continue continue_2;
     };
    }
   } else {
    if (($4 & 7 | 0 | 0) == ($5 & 7 | 0 | 0)) {
     break_3 : {
      continue_3 : while (1) {
       if (!(($5 + $3 | 0) & 7 | 0)) {
        break break_3
       }
       if (!$3) {
        break $lib_util_memory_memmove_inlined_0
       }
       $3 = $3 - 1 | 0;
       HEAP8[($5 + $3 | 0) >> 0] = HEAPU8[($4 + $3 | 0) >> 0] | 0;
       continue continue_3;
      };
     }
     break_4 : {
      continue_4 : while (1) {
       if (!($3 >>> 0 >= 8 >>> 0)) {
        break break_4
       }
       $3 = $3 - 8 | 0;
       i64toi32_i32$2 = $4 + $3 | 0;
       i64toi32_i32$1 = HEAP32[i64toi32_i32$2 >> 2] | 0;
       i64toi32_i32$0 = HEAP32[(i64toi32_i32$2 + 4 | 0) >> 2] | 0;
       $117 = i64toi32_i32$1;
       i64toi32_i32$1 = $5 + $3 | 0;
       HEAP32[i64toi32_i32$1 >> 2] = $117;
       HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
       continue continue_4;
      };
     }
    }
    break_5 : {
     continue_5 : while (1) {
      if (!$3) {
       break break_5
      }
      $3 = $3 - 1 | 0;
      HEAP8[($5 + $3 | 0) >> 0] = HEAPU8[($4 + $3 | 0) >> 0] | 0;
      continue continue_5;
     };
    }
   }
  }
 }
 
 function $lib_rt_tlsf___free($0) {
  $0 = $0 | 0;
  var $8 = 0;
  if (!$lib_rt_tlsf_ROOT) {
   $lib_builtins_abort(0 | 0, 24 | 0, 576 | 0, 13 | 0);
   abort();
  }
  if (($0 | 0) != (0 | 0)) {
   $8 = !($0 & 15 | 0)
  } else {
   $8 = 0
  }
  if (!$8) {
   $lib_builtins_abort(0 | 0, 24 | 0, 577 | 0, 2 | 0);
   abort();
  }
  $lib_rt_tlsf_freeBlock($lib_rt_tlsf_ROOT | 0, $0 - 16 | 0 | 0);
 }
 
 function $lib_rt_pure_growRoots() {
  var $0 = 0, $5 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0;
  $0 = $lib_rt_pure_ROOTS;
  $1 = $lib_rt_pure_CUR - $0 | 0;
  $2 = Math_imul($1, 2);
  $3 = 64 << 2 | 0;
  $4 = $2 >>> 0 > $3 >>> 0 ? $2 : $3;
  $5 = $lib_rt_tlsf___alloc($4 | 0, 0 | 0) | 0;
  $lib_memory_memory_copy($5 | 0, $0 | 0, $1 | 0);
  if ($0) {
   $lib_rt_tlsf___free($0 | 0)
  }
  $lib_rt_pure_ROOTS = $5;
  $lib_rt_pure_CUR = $5 + $1 | 0;
  $lib_rt_pure_END = $5 + $4 | 0;
 }
 
 function $lib_rt_pure_appendRoot($0) {
  $0 = $0 | 0;
  var $1 = 0;
  $1 = $lib_rt_pure_CUR;
  if ($1 >>> 0 >= $lib_rt_pure_END >>> 0) {
   $lib_rt_pure_growRoots();
   $1 = $lib_rt_pure_CUR;
  }
  HEAP32[$1 >> 2] = $0;
  $lib_rt_pure_CUR = $1 + 4 | 0;
 }
 
 function $lib_rt_pure_decrement($0) {
  $0 = $0 | 0;
  var $1 = 0, $2 = 0;
  $1 = HEAP32[($0 + 4 | 0) >> 2] | 0;
  $2 = $1 & 268435455 | 0;
  if (!!((HEAP32[$0 >> 2] | 0) & 1 | 0)) {
   $lib_builtins_abort(0 | 0, 128 | 0, 115 | 0, 13 | 0);
   abort();
  }
  if (($2 | 0) == (1 | 0)) {
   $lib_rt___visit_members($0 + 16 | 0 | 0, 1 | 0);
   if (!($1 & -2147483648 | 0)) {
    $lib_rt_tlsf_freeBlock($lib_rt_tlsf_ROOT | 0, $0 | 0)
   } else {
    HEAP32[($0 + 4 | 0) >> 2] = -2147483648 | 0 | 0 | 0 | 0
   }
  } else {
   if (!($2 >>> 0 > 0 >>> 0)) {
    $lib_builtins_abort(0 | 0, 128 | 0, 124 | 0, 15 | 0);
    abort();
   }
   if (!(($lib_rt___typeinfo(HEAP32[($0 + 8 | 0) >> 2] | 0 | 0) | 0) & 16 | 0)) {
    HEAP32[($0 + 4 | 0) >> 2] = -2147483648 | 805306368 | 0 | ($2 - 1 | 0) | 0;
    if (!($1 & -2147483648 | 0)) {
     $lib_rt_pure_appendRoot($0 | 0)
    }
   } else {
    HEAP32[($0 + 4 | 0) >> 2] = $1 & (268435455 ^ -1 | 0) | 0 | ($2 - 1 | 0) | 0
   }
  }
 }
 
 function $lib_rt_pure___release($0) {
  $0 = $0 | 0;
  if ($0 >>> 0 > $lib_heap___heap_base >>> 0) {
   $lib_rt_pure_decrement($0 - 16 | 0 | 0)
  }
 }
 
 function $lib_rt_pure_markGray($0) {
  $0 = $0 | 0;
  var $1 = 0;
  $1 = HEAP32[($0 + 4 | 0) >> 2] | 0;
  if (($1 & 1879048192 | 0 | 0) != (268435456 | 0)) {
   HEAP32[($0 + 4 | 0) >> 2] = $1 & (1879048192 ^ -1 | 0) | 0 | 268435456 | 0;
   $lib_rt___visit_members($0 + 16 | 0 | 0, 2 | 0);
  }
 }
 
 function $lib_rt_pure_scanBlack($0) {
  $0 = $0 | 0;
  HEAP32[($0 + 4 | 0) >> 2] = (HEAP32[($0 + 4 | 0) >> 2] | 0) & (1879048192 ^ -1 | 0) | 0 | 0 | 0;
  $lib_rt___visit_members($0 + 16 | 0 | 0, 4 | 0);
 }
 
 function $lib_rt_pure_scan($0) {
  $0 = $0 | 0;
  var $1 = 0;
  $1 = HEAP32[($0 + 4 | 0) >> 2] | 0;
  if (($1 & 1879048192 | 0 | 0) == (268435456 | 0)) {
   if (($1 & 268435455 | 0) >>> 0 > 0 >>> 0) {
    $lib_rt_pure_scanBlack($0 | 0)
   } else {
    HEAP32[($0 + 4 | 0) >> 2] = $1 & (1879048192 ^ -1 | 0) | 0 | 536870912 | 0;
    $lib_rt___visit_members($0 + 16 | 0 | 0, 3 | 0);
   }
  }
 }
 
 function $lib_rt_pure_collectWhite($0) {
  $0 = $0 | 0;
  var $1 = 0, $10 = 0;
  $1 = HEAP32[($0 + 4 | 0) >> 2] | 0;
  if (($1 & 1879048192 | 0 | 0) == (536870912 | 0)) {
   $10 = !($1 & -2147483648 | 0)
  } else {
   $10 = 0
  }
  if ($10) {
   HEAP32[($0 + 4 | 0) >> 2] = $1 & (1879048192 ^ -1 | 0) | 0 | 0 | 0;
   $lib_rt___visit_members($0 + 16 | 0 | 0, 5 | 0);
   $lib_rt_tlsf_freeBlock($lib_rt_tlsf_ROOT | 0, $0 | 0);
  }
 }
 
 function $lib_rt_pure___collect() {
  var $5 = 0, $4 = 0, $1 = 0, $0 = 0, $2 = 0, $24 = 0, $37 = 0, $3 = 0;
  $0 = $lib_rt_pure_ROOTS;
  $1 = $0;
  break_0 : {
   $2 = $1;
   $3 = $lib_rt_pure_CUR;
   loop_0 : while (1) {
    if (!($2 >>> 0 < $3 >>> 0)) {
     break break_0
    }
    $4 = HEAP32[$2 >> 2] | 0;
    $5 = HEAP32[($4 + 4 | 0) >> 2] | 0;
    if (($5 & 1879048192 | 0 | 0) == (805306368 | 0)) {
     $24 = ($5 & 268435455 | 0) >>> 0 > 0 >>> 0
    } else {
     $24 = 0
    }
    if ($24) {
     $lib_rt_pure_markGray($4 | 0);
     HEAP32[$1 >> 2] = $4;
     $1 = $1 + 4 | 0;
    } else {
     if (($5 & 1879048192 | 0 | 0) == (0 | 0)) {
      $37 = !($5 & 268435455 | 0)
     } else {
      $37 = 0
     }
     if ($37) {
      $lib_rt_tlsf_freeBlock($lib_rt_tlsf_ROOT | 0, $4 | 0)
     } else {
      HEAP32[($4 + 4 | 0) >> 2] = $5 & (-2147483648 ^ -1 | 0) | 0
     }
    }
    $2 = $2 + 4 | 0;
    continue loop_0;
   };
  }
  $lib_rt_pure_CUR = $1;
  break_1 : {
   $5 = $0;
   loop_1 : while (1) {
    if (!($5 >>> 0 < $1 >>> 0)) {
     break break_1
    }
    $lib_rt_pure_scan(HEAP32[$5 >> 2] | 0 | 0);
    $5 = $5 + 4 | 0;
    continue loop_1;
   };
  }
  break_2 : {
   $5 = $0;
   loop_2 : while (1) {
    if (!($5 >>> 0 < $1 >>> 0)) {
     break break_2
    }
    $4 = HEAP32[$5 >> 2] | 0;
    HEAP32[($4 + 4 | 0) >> 2] = (HEAP32[($4 + 4 | 0) >> 2] | 0) & (-2147483648 ^ -1 | 0) | 0;
    $lib_rt_pure_collectWhite($4 | 0);
    $5 = $5 + 4 | 0;
    continue loop_2;
   };
  }
  $lib_rt_pure_CUR = $0;
 }
 
 function $lib_arraybuffer_ArrayBufferView_get_byteLength($0) {
  $0 = $0 | 0;
  return HEAP32[($0 + 8 | 0) >> 2] | 0 | 0;
 }
 
 function $lib_typedarray_Float64Array_get_length($0) {
  $0 = $0 | 0;
  return ($lib_arraybuffer_ArrayBufferView_get_byteLength($0 | 0) | 0) >>> 3 | 0 | 0;
 }
 
 function $lib_memory_memory_fill($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $5 = 0, $3 = 0, $7 = 0, i64toi32_i32$0 = 0, i64toi32_i32$2 = 0, $4 = 0, $6 = 0, i64toi32_i32$1 = 0, i64toi32_i32$4 = 0, i64toi32_i32$3 = 0, $8 = 0, $18 = 0, $135 = 0, $135$hi = 0, $138$hi = 0, $8$hi = 0;
  $lib_util_memory_memset_inlined_0 : {
   $5 = $0;
   $4 = $1;
   $3 = $2;
   if (!$3) {
    break $lib_util_memory_memset_inlined_0
   }
   HEAP8[$5 >> 0] = $4;
   HEAP8[(($5 + $3 | 0) - 1 | 0) >> 0] = $4;
   if ($3 >>> 0 <= 2 >>> 0) {
    break $lib_util_memory_memset_inlined_0
   }
   HEAP8[($5 + 1 | 0) >> 0] = $4;
   HEAP8[($5 + 2 | 0) >> 0] = $4;
   HEAP8[(($5 + $3 | 0) - 2 | 0) >> 0] = $4;
   HEAP8[(($5 + $3 | 0) - 3 | 0) >> 0] = $4;
   if ($3 >>> 0 <= 6 >>> 0) {
    break $lib_util_memory_memset_inlined_0
   }
   HEAP8[($5 + 3 | 0) >> 0] = $4;
   HEAP8[(($5 + $3 | 0) - 4 | 0) >> 0] = $4;
   if ($3 >>> 0 <= 8 >>> 0) {
    break $lib_util_memory_memset_inlined_0
   }
   $6 = (0 - $5 | 0) & 3 | 0;
   $5 = $5 + $6 | 0;
   $3 = $3 - $6 | 0;
   $3 = $3 & -4 | 0;
   $7 = Math_imul((-1 >>> 0) / (255 >>> 0) | 0, $4 & 255 | 0);
   HEAP32[$5 >> 2] = $7;
   HEAP32[(($5 + $3 | 0) - 4 | 0) >> 2] = $7;
   if ($3 >>> 0 <= 8 >>> 0) {
    break $lib_util_memory_memset_inlined_0
   }
   HEAP32[($5 + 4 | 0) >> 2] = $7;
   HEAP32[($5 + 8 | 0) >> 2] = $7;
   HEAP32[(($5 + $3 | 0) - 12 | 0) >> 2] = $7;
   HEAP32[(($5 + $3 | 0) - 8 | 0) >> 2] = $7;
   if ($3 >>> 0 <= 24 >>> 0) {
    break $lib_util_memory_memset_inlined_0
   }
   HEAP32[($5 + 12 | 0) >> 2] = $7;
   HEAP32[($5 + 16 | 0) >> 2] = $7;
   HEAP32[($5 + 20 | 0) >> 2] = $7;
   HEAP32[($5 + 24 | 0) >> 2] = $7;
   HEAP32[(($5 + $3 | 0) - 28 | 0) >> 2] = $7;
   HEAP32[(($5 + $3 | 0) - 24 | 0) >> 2] = $7;
   HEAP32[(($5 + $3 | 0) - 20 | 0) >> 2] = $7;
   HEAP32[(($5 + $3 | 0) - 16 | 0) >> 2] = $7;
   $6 = 24 + ($5 & 4 | 0) | 0;
   $5 = $5 + $6 | 0;
   $3 = $3 - $6 | 0;
   i64toi32_i32$0 = 0;
   $135 = $7;
   $135$hi = i64toi32_i32$0;
   i64toi32_i32$0 = 0;
   i64toi32_i32$2 = $7;
   i64toi32_i32$1 = 0;
   i64toi32_i32$3 = 32;
   i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
   if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
    i64toi32_i32$1 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
    $18 = 0;
   } else {
    i64toi32_i32$1 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$2 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$0 << i64toi32_i32$4 | 0) | 0;
    $18 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
   }
   $138$hi = i64toi32_i32$1;
   i64toi32_i32$1 = $135$hi;
   i64toi32_i32$0 = $135;
   i64toi32_i32$2 = $138$hi;
   i64toi32_i32$3 = $18;
   i64toi32_i32$2 = i64toi32_i32$1 | i64toi32_i32$2 | 0;
   $8 = i64toi32_i32$0 | i64toi32_i32$3 | 0;
   $8$hi = i64toi32_i32$2;
   break_0 : {
    continue_0 : while (1) {
     if (!($3 >>> 0 >= 32 >>> 0)) {
      break break_0
     }
     i64toi32_i32$2 = $8$hi;
     i64toi32_i32$0 = $5;
     HEAP32[$5 >> 2] = $8;
     HEAP32[($5 + 4 | 0) >> 2] = i64toi32_i32$2;
     i64toi32_i32$0 = $5 + 8 | 0;
     HEAP32[i64toi32_i32$0 >> 2] = $8;
     HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$2;
     i64toi32_i32$0 = $5 + 16 | 0;
     HEAP32[i64toi32_i32$0 >> 2] = $8;
     HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$2;
     i64toi32_i32$0 = $5 + 24 | 0;
     HEAP32[i64toi32_i32$0 >> 2] = $8;
     HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$2;
     $3 = $3 - 32 | 0;
     $5 = $5 + 32 | 0;
     continue continue_0;
    };
   }
  }
 }
 
 function $lib_arraybuffer_ArrayBufferView_constructor($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $3 = 0, $4 = 0, $5 = 0, $27 = 0;
  if ($1 >>> 0 > (1073741808 >>> $2 | 0) >>> 0) {
   $lib_builtins_abort(384 | 0, 432 | 0, 14 | 0, 56 | 0);
   abort();
  }
  $1 = $1 << $2 | 0;
  $3 = $lib_rt_tlsf___alloc($1 | 0, 0 | 0) | 0;
  $lib_memory_memory_fill($3 | 0, 0 | 0, $1 | 0);
  if (!$0) {
   $0 = $lib_rt_pure___retain($lib_rt_tlsf___alloc(12 | 0, 2 | 0) | 0 | 0) | 0
  }
  HEAP32[$0 >> 2] = 0;
  HEAP32[($0 + 4 | 0) >> 2] = 0;
  HEAP32[($0 + 8 | 0) >> 2] = 0;
  $4 = $0;
  $27 = $0;
  $5 = $3;
  $4 = HEAP32[$0 >> 2] | 0;
  if (($3 | 0) != ($4 | 0)) {
   $lib_rt_pure___retain($5 | 0) | 0;
   $lib_rt_pure___release($4 | 0);
  }
  HEAP32[$27 >> 2] = $5;
  HEAP32[($0 + 4 | 0) >> 2] = $3;
  HEAP32[($0 + 8 | 0) >> 2] = $1;
  return $0 | 0;
 }
 
 function $lib_typedarray_Float64Array_constructor($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $6 = 0;
  if ($0) {
   $6 = $0
  } else {
   $6 = $lib_rt_pure___retain($lib_rt_tlsf___alloc(12 | 0, 3 | 0) | 0 | 0) | 0
  }
  $0 = $lib_arraybuffer_ArrayBufferView_constructor($6 | 0, $1 | 0, 3 | 0) | 0;
  return $0 | 0;
 }
 
 function $lib_typedarray_Float64Array___get($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  if ($1 >>> 0 >= ((HEAP32[($0 + 8 | 0) >> 2] | 0) >>> 3 | 0) >>> 0) {
   $lib_builtins_abort(176 | 0, 488 | 0, 1308 | 0, 63 | 0);
   abort();
  }
  return +(+HEAPF64[((HEAP32[($0 + 4 | 0) >> 2] | 0) + ($1 << 3 | 0) | 0) >> 3]);
 }
 
 function $lib_array_Array_f64__constructor($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $6 = 0;
  if ($0) {
   $6 = $0
  } else {
   $6 = $lib_rt_pure___retain($lib_rt_tlsf___alloc(16 | 0, 4 | 0) | 0 | 0) | 0
  }
  $0 = $lib_arraybuffer_ArrayBufferView_constructor($6 | 0, $1 | 0, 3 | 0) | 0;
  HEAP32[($0 + 12 | 0) >> 2] = 0;
  HEAP32[($0 + 12 | 0) >> 2] = $1;
  return $0 | 0;
 }
 
 function $lib_rt_tlsf_reallocateBlock($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $4 = 0, $5 = 0, $3 = 0, $8 = 0, $20 = 0, $6 = 0, $7 = 0;
  $3 = $lib_rt_tlsf_prepareSize($2 | 0) | 0;
  $4 = HEAP32[$1 >> 2] | 0;
  if (!($4 & 1 | 0)) {
   $20 = !((HEAP32[($1 + 4 | 0) >> 2] | 0) & -268435456 | 0)
  } else {
   $20 = 0
  }
  if (!$20) {
   $lib_builtins_abort(0 | 0, 24 | 0, 504 | 0, 4 | 0);
   abort();
  }
  if ($3 >>> 0 <= ($4 & -4 | 0) >>> 0) {
   $lib_rt_tlsf_prepareBlock($0 | 0, $1 | 0, $3 | 0);
   HEAP32[($1 + 12 | 0) >> 2] = $2;
   return $1 | 0;
  }
  $5 = $1;
  $6 = ($5 + 16 | 0) + ((HEAP32[$5 >> 2] | 0) & (3 ^ -1 | 0) | 0) | 0;
  $7 = HEAP32[$6 >> 2] | 0;
  if ($7 & 1 | 0) {
   $5 = (($4 & (3 ^ -1 | 0) | 0) + 16 | 0) + ($7 & (3 ^ -1 | 0) | 0) | 0;
   if ($5 >>> 0 >= $3 >>> 0) {
    $lib_rt_tlsf_removeBlock($0 | 0, $6 | 0);
    HEAP32[$1 >> 2] = $4 & 3 | 0 | $5 | 0;
    HEAP32[($1 + 12 | 0) >> 2] = $2;
    $lib_rt_tlsf_prepareBlock($0 | 0, $1 | 0, $3 | 0);
    return $1 | 0;
   }
  }
  $8 = $lib_rt_tlsf_allocateBlock($0 | 0, $2 | 0) | 0;
  HEAP32[($8 + 8 | 0) >> 2] = HEAP32[($1 + 8 | 0) >> 2] | 0;
  $lib_memory_memory_copy($8 + 16 | 0 | 0, $1 + 16 | 0 | 0, $2 | 0);
  HEAP32[$1 >> 2] = $4 | 1 | 0;
  $lib_rt_tlsf_insertBlock($0 | 0, $1 | 0);
  return $8 | 0;
 }
 
 function $lib_rt_tlsf___realloc($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $9 = 0;
  if (!$lib_rt_tlsf_ROOT) {
   $lib_builtins_abort(0 | 0, 24 | 0, 568 | 0, 13 | 0);
   abort();
  }
  if (($0 | 0) != (0 | 0)) {
   $9 = !($0 & 15 | 0)
  } else {
   $9 = 0
  }
  if (!$9) {
   $lib_builtins_abort(0 | 0, 24 | 0, 569 | 0, 2 | 0);
   abort();
  }
  return ($lib_rt_tlsf_reallocateBlock($lib_rt_tlsf_ROOT | 0, $0 - 16 | 0 | 0, $1 | 0) | 0) + 16 | 0 | 0;
 }
 
 function $lib_array_ensureSize($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $6 = 0, $3 = 0, $5 = 0, $4 = 0, wasm2js_i32$0 = 0, wasm2js_i32$1 = 0;
  $3 = HEAP32[($0 + 8 | 0) >> 2] | 0;
  if ($1 >>> 0 > ($3 >>> $2 | 0) >>> 0) {
   if ($1 >>> 0 > (1073741808 >>> $2 | 0) >>> 0) {
    $lib_builtins_abort(384 | 0, 544 | 0, 14 | 0, 47 | 0);
    abort();
   }
   $4 = HEAP32[$0 >> 2] | 0;
   $5 = $1 << $2 | 0;
   $6 = $lib_rt_tlsf___realloc($4 | 0, $5 | 0) | 0;
   $lib_memory_memory_fill($6 + $3 | 0 | 0, 0 | 0, $5 - $3 | 0 | 0);
   if (($6 | 0) != ($4 | 0)) {
    (wasm2js_i32$0 = $0, wasm2js_i32$1 = $lib_rt_pure___retain($6 | 0) | 0), HEAP32[wasm2js_i32$0 >> 2] = wasm2js_i32$1;
    HEAP32[($0 + 4 | 0) >> 2] = $6;
   }
   HEAP32[($0 + 8 | 0) >> 2] = $5;
  }
 }
 
 function $lib_array_Array_f64____unchecked_set($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = +$2;
  HEAPF64[((HEAP32[($0 + 4 | 0) >> 2] | 0) + ($1 << 3 | 0) | 0) >> 3] = $2;
 }
 
 function $lib_array_Array_f64____set($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = +$2;
  var $3 = 0;
  $3 = HEAP32[($0 + 12 | 0) >> 2] | 0;
  $lib_array_ensureSize($0 | 0, $1 + 1 | 0 | 0, 3 | 0);
  $lib_array_Array_f64____unchecked_set($0 | 0, $1 | 0, +$2);
  if (($1 | 0) >= ($3 | 0)) {
   HEAP32[($0 + 12 | 0) >> 2] = $1 + 1 | 0
  }
 }
 
 function nBodyForces_twoBodyForces($0, $1, $2, $3, $4, $5, $6, $7) {
  $0 = +$0;
  $1 = +$1;
  $2 = +$2;
  $3 = +$3;
  $4 = +$4;
  $5 = +$5;
  $6 = +$6;
  $7 = +$7;
  var $12 = 0, $8 = 0.0, $9 = 0.0, $10 = 0.0, $11 = 0.0;
  $8 = 6.674e-11 * $3 * $7;
  $9 = $4 - $0;
  $10 = $5 - $1;
  $11 = $6 - $2;
  $12 = $lib_array_Array_f64__constructor(0 | 0, 3 | 0) | 0;
  $lib_array_Array_f64____set($12 | 0, 0 | 0, +($8 / ($9 * $9)));
  $lib_array_Array_f64____set($12 | 0, 1 | 0, +($8 / ($10 * $10)));
  $lib_array_Array_f64____set($12 | 0, 2 | 0, +($8 / ($11 * $11)));
  return $12 | 0;
 }
 
 function $lib_array_Array_f64____unchecked_get($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  return +(+HEAPF64[((HEAP32[($0 + 4 | 0) >> 2] | 0) + ($1 << 3 | 0) | 0) >> 3]);
 }
 
 function $lib_array_Array_f64____get($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  if ($1 >>> 0 >= ((HEAP32[($0 + 8 | 0) >> 2] | 0) >>> 3 | 0) >>> 0) {
   $lib_builtins_abort(176 | 0, 544 | 0, 109 | 0, 61 | 0);
   abort();
  }
  return +(+$lib_array_Array_f64____unchecked_get($0 | 0, $1 | 0));
 }
 
 function $lib_typedarray_Float64Array___set($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = +$2;
  if ($1 >>> 0 >= ((HEAP32[($0 + 8 | 0) >> 2] | 0) >>> 3 | 0) >>> 0) {
   $lib_builtins_abort(176 | 0, 488 | 0, 1319 | 0, 63 | 0);
   abort();
  }
  HEAPF64[((HEAP32[($0 + 4 | 0) >> 2] | 0) + ($1 << 3 | 0) | 0) >> 3] = $2;
 }
 
 function nBodyForces_nBodyForces($0) {
  $0 = $0 | 0;
  var $2 = 0, $3 = 0, $7 = 0, $8 = 0, $9 = 0, $4 = 0, $5 = 0, $6 = 0, $1 = 0;
  $lib_rt_pure___retain($0 | 0) | 0;
  $1 = ($lib_typedarray_Float64Array_get_length($0 | 0) | 0 | 0) / (4 | 0) | 0;
  if ((($lib_typedarray_Float64Array_get_length($0 | 0) | 0 | 0) % (4 | 0) | 0 | 0) != (0 | 0)) {
   $lib_builtins_trace(272 | 0, 0 | 0, +(0.0), +(0.0), +(0.0), +(0.0), +(0.0))
  }
  $2 = $lib_typedarray_Float64Array_constructor(0 | 0, Math_imul($1, nBodyForces_forceSize) | 0) | 0;
  break_0 : {
   $3 = 0;
   loop_0 : while (1) {
    if (!(($3 | 0) < ($1 | 0))) {
     break break_0
    }
    break_1 : {
     $4 = $3 + 1 | 0;
     loop_1 : while (1) {
      if (!(($4 | 0) < ($1 | 0))) {
       break break_1
      }
      $5 = Math_imul($3, 4);
      $6 = Math_imul($4, 4);
      $7 = nBodyForces_twoBodyForces(+(+$lib_typedarray_Float64Array___get($0 | 0, $5 | 0)), +(+$lib_typedarray_Float64Array___get($0 | 0, $5 + 1 | 0 | 0)), +(+$lib_typedarray_Float64Array___get($0 | 0, $5 + 2 | 0 | 0)), +(+$lib_typedarray_Float64Array___get($0 | 0, $5 + 3 | 0 | 0)), +(+$lib_typedarray_Float64Array___get($0 | 0, $6 | 0)), +(+$lib_typedarray_Float64Array___get($0 | 0, $6 + 1 | 0 | 0)), +(+$lib_typedarray_Float64Array___get($0 | 0, $6 + 2 | 0 | 0)), +(+$lib_typedarray_Float64Array___get($0 | 0, $6 + 3 | 0 | 0))) | 0;
      $8 = Math_imul($3, 3);
      $9 = Math_imul($4, 3);
      $lib_typedarray_Float64Array___set($2 | 0, $8 | 0, +(+$lib_typedarray_Float64Array___get($2 | 0, $8 | 0) + +$lib_array_Array_f64____get($7 | 0, 0 | 0)));
      $lib_typedarray_Float64Array___set($2 | 0, $8 + 1 | 0 | 0, +(+$lib_typedarray_Float64Array___get($2 | 0, $8 + 1 | 0 | 0) + +$lib_array_Array_f64____get($7 | 0, 1 | 0)));
      $lib_typedarray_Float64Array___set($2 | 0, $8 + 2 | 0 | 0, +(+$lib_typedarray_Float64Array___get($2 | 0, $8 + 2 | 0 | 0) + +$lib_array_Array_f64____get($7 | 0, 2 | 0)));
      $lib_typedarray_Float64Array___set($2 | 0, $9 | 0, +(+$lib_typedarray_Float64Array___get($2 | 0, $9 | 0) - +$lib_array_Array_f64____get($7 | 0, 0 | 0)));
      $lib_typedarray_Float64Array___set($2 | 0, $9 + 1 | 0 | 0, +(+$lib_typedarray_Float64Array___get($2 | 0, $9 + 1 | 0 | 0) - +$lib_array_Array_f64____get($7 | 0, 1 | 0)));
      $lib_typedarray_Float64Array___set($2 | 0, $9 + 2 | 0 | 0, +(+$lib_typedarray_Float64Array___get($2 | 0, $9 + 2 | 0 | 0) - +$lib_array_Array_f64____get($7 | 0, 2 | 0)));
      $4 = $4 + 1 | 0;
      $lib_rt_pure___release($7 | 0);
      continue loop_1;
     };
    }
    $3 = $3 + 1 | 0;
    continue loop_0;
   };
  }
  $3 = $2;
  $lib_rt_pure___release($0 | 0);
  return $2 | 0;
 }
 
 function $lib_array_Array_f64____visit_impl($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
 }
 
 function $lib_rt_pure___visit($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $2 = 0, $3 = 0;
  if ($0 >>> 0 < $lib_heap___heap_base >>> 0) {
   return
  }
  $2 = $0 - 16 | 0;
  break_0 : {
   case5_0 : {
    case4_0 : {
     case3_0 : {
      case2_0 : {
       case1_0 : {
        case0_0 : {
         $3 = $1;
         if (($3 | 0) == (1 | 0)) {
          break case0_0
         }
         if (($3 | 0) == (2 | 0)) {
          break case1_0
         }
         if (($3 | 0) == (3 | 0)) {
          break case2_0
         }
         if (($3 | 0) == (4 | 0)) {
          break case3_0
         }
         if (($3 | 0) == (5 | 0)) {
          break case4_0
         }
         break case5_0;
        }
        $lib_rt_pure_decrement($2 | 0);
        break break_0;
       }
       if (!(((HEAP32[($2 + 4 | 0) >> 2] | 0) & 268435455 | 0) >>> 0 > 0 >>> 0)) {
        $lib_builtins_abort(0 | 0, 128 | 0, 75 | 0, 17 | 0);
        abort();
       }
       HEAP32[($2 + 4 | 0) >> 2] = (HEAP32[($2 + 4 | 0) >> 2] | 0) - 1 | 0;
       $lib_rt_pure_markGray($2 | 0);
       break break_0;
      }
      $lib_rt_pure_scan($2 | 0);
      break break_0;
     }
     $3 = HEAP32[($2 + 4 | 0) >> 2] | 0;
     if (!(($3 & -268435456 | 0 | 0) == (($3 + 1 | 0) & -268435456 | 0 | 0))) {
      $lib_builtins_abort(0 | 0, 128 | 0, 86 | 0, 6 | 0);
      abort();
     }
     HEAP32[($2 + 4 | 0) >> 2] = $3 + 1 | 0;
     if (($3 & 1879048192 | 0 | 0) != (0 | 0)) {
      $lib_rt_pure_scanBlack($2 | 0)
     }
     break break_0;
    }
    $lib_rt_pure_collectWhite($2 | 0);
    break break_0;
   }
   if (!0) {
    $lib_builtins_abort(0 | 0, 128 | 0, 97 | 0, 24 | 0);
    abort();
   }
  }
 }
 
 function $lib_rt___visit_members($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $2 = 0;
  block$4$break : {
   switch$1$leave : {
    switch (HEAP32[($0 - 8 | 0) >> 2] | 0 | 0) {
    case 0:
    case 1:
     return;
    case 2:
    case 3:
     break block$4$break;
    case 4:
     $lib_array_Array_f64____visit_impl($0 | 0, $1 | 0);
     break block$4$break;
    default:
     abort();
    };
   }
  }
  $2 = HEAP32[$0 >> 2] | 0;
  if ($2) {
   $lib_rt_pure___visit($2 | 0, $1 | 0)
  }
  return;
 }
 
 function null_() {
  
 }
 
 function __wasm_ctz_i32(var$0) {
  var$0 = var$0 | 0;
  if (var$0) {
   return 31 - Math_clz32((var$0 + -1 | 0) ^ var$0 | 0) | 0 | 0
  }
  return 32 | 0;
 }
 
 var FUNCTION_TABLE = [];
 function __wasm_memory_size() {
  return buffer.byteLength / 65536 | 0;
 }
 
 function __wasm_memory_grow(pagesToAdd) {
  pagesToAdd = pagesToAdd | 0;
  var oldPages = __wasm_memory_size() | 0;
  var newPages = oldPages + pagesToAdd | 0;
  if ((oldPages < newPages) && (newPages < 65536)) {
   var newBuffer = new ArrayBuffer(Math_imul(newPages, 65536));
   var newHEAP8 = new global.Int8Array(newBuffer);
   newHEAP8.set(HEAP8);
   HEAP8 = newHEAP8;
   HEAP8 = new global.Int8Array(newBuffer);
   HEAP16 = new global.Int16Array(newBuffer);
   HEAP32 = new global.Int32Array(newBuffer);
   HEAPU8 = new global.Uint8Array(newBuffer);
   HEAPU16 = new global.Uint16Array(newBuffer);
   HEAPU32 = new global.Uint32Array(newBuffer);
   HEAPF32 = new global.Float32Array(newBuffer);
   HEAPF64 = new global.Float64Array(newBuffer);
   buffer = newBuffer;
  }
  return oldPages;
 }
 
 return {
  "memory": Object.create(Object.prototype, {
   "grow": {
    "value": __wasm_memory_grow
   }, 
   "buffer": {
    "get": function () {
     return buffer;
    }
    
   }
  }), 
  "__alloc": $lib_rt_tlsf___alloc, 
  "__retain": $lib_rt_pure___retain, 
  "__release": $lib_rt_pure___release, 
  "__collect": $lib_rt_pure___collect, 
  "nBodyForces": nBodyForces_nBodyForces
 };
}

var memasmFunc = new ArrayBuffer(65536);
var assignasmFunc = (
    function(mem) {
      var _mem = new Uint8Array(mem);
      return function(offset, s) {
        var bytes, i;
        if (typeof Buffer === 'undefined') {
          bytes = atob(s);
          for (i = 0; i < bytes.length; i++)
            _mem[offset + i] = bytes.charCodeAt(i);
        } else {
          bytes = Buffer.from(s, 'base64');
          for (i = 0; i < bytes.length; i++)
            _mem[offset + i] = bytes[i];
        }
      }
    }
  )(memasmFunc);
assignasmFunc(8, "HgAAAAEAAAABAAAAHgAAAH4AbABpAGIALwByAHQALwB0AGwAcwBmAC4AdABzAA==");
assignasmFunc(56, "KAAAAAEAAAABAAAAKAAAAGEAbABsAG8AYwBhAHQAaQBvAG4AIAB0AG8AbwAgAGwAYQByAGcAZQA=");
assignasmFunc(112, "HgAAAAEAAAABAAAAHgAAAH4AbABpAGIALwByAHQALwBwAHUAcgBlAC4AdABzAA==");
assignasmFunc(160, "JAAAAAEAAAABAAAAJAAAAEkAbgBkAGUAeAAgAG8AdQB0ACAAbwBmACAAcgBhAG4AZwBlAA==");
assignasmFunc(216, "FAAAAAEAAAABAAAAFAAAAH4AbABpAGIALwByAHQALgB0AHMA");
assignasmFunc(256, "XgAAAAEAAAABAAAAXgAAAEkATgBWAEEATABJAEQAIABuAEIAbwBkAHkARgBvAHIAYwBlAHMAIABwAGEAcgBhAG0AZQB0AGUAcgAuACAAIABDAGgAYQBvAHMAIABlAG4AcwB1AGUAcwAuAC4ALgA=");
assignasmFunc(368, "HAAAAAEAAAABAAAAHAAAAEkAbgB2AGEAbABpAGQAIABsAGUAbgBnAHQAaAA=");
assignasmFunc(416, "JgAAAAEAAAABAAAAJgAAAH4AbABpAGIALwBhAHIAcgBhAHkAYgB1AGYAZgBlAHIALgB0AHMA");
assignasmFunc(472, "JAAAAAEAAAABAAAAJAAAAH4AbABpAGIALwB0AHkAcABlAGQAYQByAHIAYQB5AC4AdABzAA==");
assignasmFunc(528, "GgAAAAEAAAABAAAAGgAAAH4AbABpAGIALwBhAHIAcgBhAHkALgB0AHMA");
assignasmFunc(576, "BQAAABAAAAAAAAAAEAAAAAAAAAAQAAAAAAAAABENAAACAAAAEw0AAAIAAAA=");
var retasmFunc = asmFunc({Math,Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,NaN,Infinity}, {abort:function() { throw new Error('abort'); },abort,trace},memasmFunc);
export var memory = retasmFunc.memory;
export var __alloc = retasmFunc.__alloc;
export var __retain = retasmFunc.__retain;
export var __release = retasmFunc.__release;
export var __collect = retasmFunc.__collect;
export var nBodyForces = retasmFunc.nBodyForces;
