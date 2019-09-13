import { abort } from 'env';

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
 var nBodyForces_G = 6.674e-11;
 var $lib_rt_tlsf_ROOT = 0;
 var $lib_rt_pure_CUR = 0;
 var $lib_rt_pure_END = 0;
 var $lib_rt_pure_ROOTS = 0;
 function $lib_rt_tlsf_removeBlock($0, $1) {
  var $2 = 0, $3 = 0, $4 = 0, $5 = 0;
  $2 = HEAP32[$1 >> 2] & -4 | 0;
  if ($2 >>> 0 < 256 >>> 0) {
   $4 = $2 >>> 4 | 0;
   $2 = 0;
  } else {
   $3 = $2;
   $2 = 31 - Math_clz32($2) | 0;
   $4 = ($3 >>> ($2 - 4 | 0) | 0) ^ 16 | 0;
   $2 = $2 - 7 | 0;
  }
  $3 = HEAP32[($1 + 20 | 0) >> 2];
  $5 = HEAP32[($1 + 16 | 0) >> 2];
  if ($5) {
   HEAP32[($5 + 20 | 0) >> 2] = $3
  }
  if ($3) {
   HEAP32[($3 + 16 | 0) >> 2] = $5
  }
  if ((HEAP32[((((($2 << 4 | 0) + $4 | 0) << 2 | 0) + $0 | 0) + 96 | 0) >> 2] | 0) == ($1 | 0)) {
   HEAP32[((((($2 << 4 | 0) + $4 | 0) << 2 | 0) + $0 | 0) + 96 | 0) >> 2] = $3;
   if (!$3) {
    $3 = ($2 << 2 | 0) + $0 | 0;
    $1 = HEAP32[($3 + 4 | 0) >> 2] & ((1 << $4 | 0) ^ -1 | 0) | 0;
    HEAP32[($3 + 4 | 0) >> 2] = $1;
    if (!$1) {
     HEAP32[$0 >> 2] = HEAP32[$0 >> 2] & ((1 << $2 | 0) ^ -1 | 0) | 0
    }
   }
  }
 }
 
 function $lib_rt_tlsf_insertBlock($0, $1) {
  var $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0;
  $3 = HEAP32[$1 >> 2];
  $4 = ($1 + 16 | 0) + ($3 & -4 | 0) | 0;
  $5 = HEAP32[$4 >> 2];
  if ($5 & 1 | 0) {
   $2 = (($3 & -4 | 0) + 16 | 0) + ($5 & -4 | 0) | 0;
   if ($2 >>> 0 < 1073741808 >>> 0) {
    $lib_rt_tlsf_removeBlock($0, $4);
    $3 = $2 | ($3 & 3 | 0) | 0;
    HEAP32[$1 >> 2] = $3;
    $4 = ($1 + 16 | 0) + (HEAP32[$1 >> 2] & -4 | 0) | 0;
    $5 = HEAP32[$4 >> 2];
   }
  }
  if ($3 & 2 | 0) {
   $2 = HEAP32[($1 - 4 | 0) >> 2];
   $6 = HEAP32[$2 >> 2];
   $7 = (($6 & -4 | 0) + 16 | 0) + ($3 & -4 | 0) | 0;
   if ($7 >>> 0 < 1073741808 >>> 0) {
    $lib_rt_tlsf_removeBlock($0, $2);
    $3 = $6 & 3 | 0 | $7 | 0;
    HEAP32[$2 >> 2] = $3;
    $1 = $2;
   }
  }
  HEAP32[$4 >> 2] = $5 | 2 | 0;
  HEAP32[($4 - 4 | 0) >> 2] = $1;
  $2 = $3 & -4 | 0;
  if ($2 >>> 0 < 256 >>> 0) {
   $4 = $2 >>> 4 | 0;
   $2 = 0;
  } else {
   $3 = $2;
   $2 = 31 - Math_clz32($2) | 0;
   $4 = ($3 >>> ($2 - 4 | 0) | 0) ^ 16 | 0;
   $2 = $2 - 7 | 0;
  }
  $3 = HEAP32[((((($2 << 4 | 0) + $4 | 0) << 2 | 0) + $0 | 0) + 96 | 0) >> 2];
  HEAP32[($1 + 16 | 0) >> 2] = 0;
  HEAP32[($1 + 20 | 0) >> 2] = $3;
  if ($3) {
   HEAP32[($3 + 16 | 0) >> 2] = $1
  }
  HEAP32[((((($2 << 4 | 0) + $4 | 0) << 2 | 0) + $0 | 0) + 96 | 0) >> 2] = $1;
  HEAP32[$0 >> 2] = HEAP32[$0 >> 2] | (1 << $2 | 0) | 0;
  $0 = ($2 << 2 | 0) + $0 | 0;
  $1 = HEAP32[($0 + 4 | 0) >> 2] | (1 << $4 | 0) | 0;
  HEAP32[($0 + 4 | 0) >> 2] = $1;
 }
 
 function $lib_rt_tlsf_addMemory($0, $1, $2) {
  var $3 = 0, $4 = 0;
  $3 = $2;
  $2 = HEAP32[($0 + 1568 | 0) >> 2];
  if ($2) {
   if (($2 | 0) == ($1 - 16 | 0 | 0)) {
    $4 = HEAP32[$2 >> 2];
    $1 = $1 - 16 | 0;
   }
  }
  $2 = $3 - $1 | 0;
  if ($2 >>> 0 < 48 >>> 0) {
   return
  }
  HEAP32[$1 >> 2] = $4 & 2 | 0 | ($2 - 32 | 0 | 1 | 0) | 0;
  HEAP32[($1 + 16 | 0) >> 2] = 0;
  HEAP32[($1 + 20 | 0) >> 2] = 0;
  $2 = ($1 + $2 | 0) - 16 | 0;
  HEAP32[$2 >> 2] = 2;
  HEAP32[($0 + 1568 | 0) >> 2] = $2;
  $lib_rt_tlsf_insertBlock($0, $1);
 }
 
 function $lib_rt_tlsf_initializeRoot() {
  var $0 = 0, $1 = 0;
  $0 = __wasm_memory_size();
  if ((1 | 0) > ($0 | 0)) {
   $0 = (__wasm_memory_grow(1 - $0 | 0 | 0) | 0) < (0 | 0)
  } else {
   $0 = 0
  }
  if ($0) {
   abort()
  }
  HEAP32[400 >> 2] = 0;
  HEAP32[1968 >> 2] = 0;
  $0 = 0;
  loop_0 : while (1) {
   if ($0 >>> 0 < 23 >>> 0) {
    HEAP32[((($0 << 2 | 0) + 400 | 0) + 4 | 0) >> 2] = 0;
    $1 = 0;
    loop_1 : while (1) {
     if ($1 >>> 0 < 16 >>> 0) {
      HEAP32[((((($0 << 4 | 0) + $1 | 0) << 2 | 0) + 400 | 0) + 96 | 0) >> 2] = 0;
      $1 = $1 + 1 | 0;
      continue loop_1;
     }
     break loop_1;
    };
    $0 = $0 + 1 | 0;
    continue loop_0;
   }
   break loop_0;
  };
  $lib_rt_tlsf_addMemory(400, 1984, __wasm_memory_size() << 16 | 0);
  $lib_rt_tlsf_ROOT = 400;
 }
 
 function $lib_rt_tlsf_prepareSize($0) {
  if ($0 >>> 0 >= 1073741808 >>> 0) {
   $lib_builtins_abort(128 | 0, 184 | 0, 457 | 0, 29 | 0);
   abort();
  }
  $0 = ($0 + 15 | 0) & -16 | 0;
  return $0 >>> 0 > 16 >>> 0 ? $0 : 16;
 }
 
 function $lib_rt_tlsf_searchBlock($0, $1) {
  var $2 = 0;
  if ($1 >>> 0 < 256 >>> 0) {
   $1 = $1 >>> 4 | 0;
   $2 = 0;
  } else {
   if ($1 >>> 0 < 536870904 >>> 0) {
    $1 = ((1 << (27 - Math_clz32($1) | 0) | 0) + $1 | 0) - 1 | 0
   }
   $2 = 31 - Math_clz32($1) | 0;
   $1 = ($1 >>> ($2 - 4 | 0) | 0) ^ 16 | 0;
   $2 = $2 - 7 | 0;
  }
  $1 = HEAP32[((($2 << 2 | 0) + $0 | 0) + 4 | 0) >> 2] & (-1 << $1 | 0) | 0;
  if ($1) {
   if ($1) {
    $1 = 31 - Math_clz32(($1 + -1 | 0) ^ $1 | 0) | 0
   } else {
    $1 = 32
   }
   $0 = HEAP32[(((($1 + ($2 << 4 | 0) | 0) << 2 | 0) + $0 | 0) + 96 | 0) >> 2];
  } else {
   $1 = HEAP32[$0 >> 2] & (-1 << ($2 + 1 | 0) | 0) | 0;
   if ($1) {
    if ($1) {
     $1 = 31 - Math_clz32(($1 + -1 | 0) ^ $1 | 0) | 0
    } else {
     $1 = 32
    }
    $2 = HEAP32[((($1 << 2 | 0) + $0 | 0) + 4 | 0) >> 2];
    __inlined_func$__wasm_ctz_i320 : {
     if ($2) {
      $2 = 31 - Math_clz32(($2 + -1 | 0) ^ $2 | 0) | 0;
      break __inlined_func$__wasm_ctz_i320;
     }
     $2 = 32;
    }
    $0 = HEAP32[(((($2 + ($1 << 4 | 0) | 0) << 2 | 0) + $0 | 0) + 96 | 0) >> 2];
   } else {
    $0 = 0
   }
  }
  return $0;
 }
 
 function $lib_rt_tlsf_growMemory($0, $1) {
  var $2 = 0, $3 = 0;
  $2 = __wasm_memory_size();
  $3 = $2;
  if ($1 >>> 0 < 536870904 >>> 0) {
   $1 = ((1 << (27 - Math_clz32($1) | 0) | 0) - 1 | 0) + $1 | 0
  }
  $1 = ((((16 << ((HEAP32[($0 + 1568 | 0) >> 2] | 0) != (($2 << 16 | 0) - 16 | 0 | 0)) | 0) + $1 | 0) + 65535 | 0) & -65536 | 0) >>> 16 | 0;
  if ((__wasm_memory_grow((($2 | 0) > ($1 | 0) ? $3 : $1) | 0) | 0) < (0 | 0)) {
   if ((__wasm_memory_grow($1 | 0) | 0) < (0 | 0)) {
    abort()
   }
  }
  $lib_rt_tlsf_addMemory($0, $2 << 16 | 0, __wasm_memory_size() << 16 | 0);
 }
 
 function $lib_rt_tlsf_prepareBlock($0, $1, $2) {
  var $3 = 0, $4 = 0;
  $3 = HEAP32[$1 >> 2];
  $4 = ($3 & -4 | 0) - $2 | 0;
  if ($4 >>> 0 >= 32 >>> 0) {
   HEAP32[$1 >> 2] = $3 & 2 | 0 | $2 | 0;
   $1 = ($1 + 16 | 0) + $2 | 0;
   HEAP32[$1 >> 2] = $4 - 16 | 0 | 1 | 0;
   $lib_rt_tlsf_insertBlock($0, $1);
  } else {
   HEAP32[$1 >> 2] = $3 & -2 | 0;
   $0 = ($1 + 16 | 0) + (HEAP32[$1 >> 2] & -4 | 0) | 0;
   $1 = HEAP32[$0 >> 2] & -3 | 0;
   HEAP32[$0 >> 2] = $1;
  }
 }
 
 function $lib_rt_tlsf_allocateBlock($0, $1) {
  var $2 = 0, $3 = 0;
  $3 = $lib_rt_tlsf_prepareSize($1);
  $2 = $lib_rt_tlsf_searchBlock($0, $3);
  if (!$2) {
   $lib_rt_tlsf_growMemory($0, $3);
   $2 = $lib_rt_tlsf_searchBlock($0, $3);
  }
  HEAP32[($2 + 4 | 0) >> 2] = 0;
  HEAP32[($2 + 12 | 0) >> 2] = $1;
  $lib_rt_tlsf_removeBlock($0, $2);
  $lib_rt_tlsf_prepareBlock($0, $2, $3);
  return $2;
 }
 
 function $lib_rt_tlsf___alloc($0, $1) {
  var $2 = 0;
  $2 = $lib_rt_tlsf_ROOT;
  if (!$2) {
   $lib_rt_tlsf_initializeRoot();
   $2 = $lib_rt_tlsf_ROOT;
  }
  $0 = $lib_rt_tlsf_allocateBlock($2, $0);
  HEAP32[($0 + 8 | 0) >> 2] = $1;
  return $0 + 16 | 0;
 }
 
 function $lib_memory_memory_fill($0, $1) {
  var $2 = 0;
  $lib_util_memory_memset_inlined_0 : {
   if (!$1) {
    break $lib_util_memory_memset_inlined_0
   }
   HEAP8[$0 >> 0] = 0;
   HEAP8[(($0 + $1 | 0) - 1 | 0) >> 0] = 0;
   if ($1 >>> 0 <= 2 >>> 0) {
    break $lib_util_memory_memset_inlined_0
   }
   HEAP8[($0 + 1 | 0) >> 0] = 0;
   HEAP8[($0 + 2 | 0) >> 0] = 0;
   $2 = $0 + $1 | 0;
   HEAP8[($2 - 2 | 0) >> 0] = 0;
   HEAP8[($2 - 3 | 0) >> 0] = 0;
   if ($1 >>> 0 <= 6 >>> 0) {
    break $lib_util_memory_memset_inlined_0
   }
   HEAP8[($0 + 3 | 0) >> 0] = 0;
   HEAP8[(($0 + $1 | 0) - 4 | 0) >> 0] = 0;
   if ($1 >>> 0 <= 8 >>> 0) {
    break $lib_util_memory_memset_inlined_0
   }
   $2 = $1;
   $1 = (0 - $0 | 0) & 3 | 0;
   $2 = $2 - $1 | 0;
   $0 = $0 + $1 | 0;
   HEAP32[$0 >> 2] = 0;
   $1 = $2 & -4 | 0;
   HEAP32[(($1 + $0 | 0) - 4 | 0) >> 2] = 0;
   if ($1 >>> 0 <= 8 >>> 0) {
    break $lib_util_memory_memset_inlined_0
   }
   HEAP32[($0 + 4 | 0) >> 2] = 0;
   HEAP32[($0 + 8 | 0) >> 2] = 0;
   $2 = $0 + $1 | 0;
   HEAP32[($2 - 12 | 0) >> 2] = 0;
   HEAP32[($2 - 8 | 0) >> 2] = 0;
   if ($1 >>> 0 <= 24 >>> 0) {
    break $lib_util_memory_memset_inlined_0
   }
   HEAP32[($0 + 12 | 0) >> 2] = 0;
   HEAP32[($0 + 16 | 0) >> 2] = 0;
   HEAP32[($0 + 20 | 0) >> 2] = 0;
   HEAP32[($0 + 24 | 0) >> 2] = 0;
   $2 = $0 + $1 | 0;
   HEAP32[($2 - 28 | 0) >> 2] = 0;
   HEAP32[($2 - 24 | 0) >> 2] = 0;
   HEAP32[($2 - 20 | 0) >> 2] = 0;
   HEAP32[($2 - 16 | 0) >> 2] = 0;
   $2 = ($0 & 4 | 0) + 24 | 0;
   $0 = $2 + $0 | 0;
   $1 = $1 - $2 | 0;
   continue_0 : while (1) {
    if ($1 >>> 0 >= 32 >>> 0) {
     HEAP32[$0 >> 2] = 0;
     HEAP32[($0 + 4 | 0) >> 2] = 0;
     $2 = $0 + 8 | 0;
     HEAP32[$2 >> 2] = 0;
     HEAP32[($2 + 4 | 0) >> 2] = 0;
     $2 = $0 + 16 | 0;
     HEAP32[$2 >> 2] = 0;
     HEAP32[($2 + 4 | 0) >> 2] = 0;
     $2 = $0 + 24 | 0;
     HEAP32[$2 >> 2] = 0;
     HEAP32[($2 + 4 | 0) >> 2] = 0;
     $1 = $1 - 32 | 0;
     $0 = $0 + 32 | 0;
     continue continue_0;
    }
    break continue_0;
   };
  }
 }
 
 function $lib_rt_tlsf_freeBlock($0, $1) {
  HEAP32[$1 >> 2] = HEAP32[$1 >> 2] | 1 | 0;
  $lib_rt_tlsf_insertBlock($0, $1);
 }
 
 function $lib_rt___typeinfo($0) {
  if ($0 >>> 0 > HEAP32[360 >> 2] >>> 0) {
   $lib_builtins_abort(232 | 0, 288 | 0, 22 | 0, 27 | 0);
   abort();
  }
  return HEAP32[(($0 << 3 | 0) + 364 | 0) >> 2];
 }
 
 function $lib_util_memory_memcpy($0, $1, $2) {
  var $3 = 0, $4 = 0, $5 = 0;
  continue_0 : while (1) {
   if ($2 ? $1 & 3 | 0 : 0) {
    $3 = $0;
    $0 = $0 + 1 | 0;
    $4 = $1;
    $1 = $1 + 1 | 0;
    HEAP8[$3 >> 0] = HEAPU8[$4 >> 0];
    $2 = $2 - 1 | 0;
    continue continue_0;
   }
   break continue_0;
  };
  if (!($0 & 3 | 0)) {
   continue_1 : while (1) {
    if ($2 >>> 0 >= 16 >>> 0) {
     HEAP32[$0 >> 2] = HEAP32[$1 >> 2];
     HEAP32[($0 + 4 | 0) >> 2] = HEAP32[($1 + 4 | 0) >> 2];
     HEAP32[($0 + 8 | 0) >> 2] = HEAP32[($1 + 8 | 0) >> 2];
     HEAP32[($0 + 12 | 0) >> 2] = HEAP32[($1 + 12 | 0) >> 2];
     $1 = $1 + 16 | 0;
     $0 = $0 + 16 | 0;
     $2 = $2 - 16 | 0;
     continue continue_1;
    }
    break continue_1;
   };
   if ($2 & 8 | 0) {
    HEAP32[$0 >> 2] = HEAP32[$1 >> 2];
    HEAP32[($0 + 4 | 0) >> 2] = HEAP32[($1 + 4 | 0) >> 2];
    $1 = $1 + 8 | 0;
    $0 = $0 + 8 | 0;
   }
   if ($2 & 4 | 0) {
    HEAP32[$0 >> 2] = HEAP32[$1 >> 2];
    $1 = $1 + 4 | 0;
    $0 = $0 + 4 | 0;
   }
   if ($2 & 2 | 0) {
    HEAP16[$0 >> 1] = HEAPU16[$1 >> 1];
    $1 = $1 + 2 | 0;
    $0 = $0 + 2 | 0;
   }
   if ($2 & 1 | 0) {
    HEAP8[$0 >> 0] = HEAPU8[$1 >> 0]
   }
   return;
  }
  if ($2 >>> 0 >= 32 >>> 0) {
   break_2 : {
    case2_2 : {
     case1_2 : {
      $3 = $0 & 3 | 0;
      if (($3 | 0) != (1 | 0)) {
       if (($3 | 0) == (2 | 0)) {
        break case1_2
       }
       if (($3 | 0) == (3 | 0)) {
        break case2_2
       }
       break break_2;
      }
      $5 = HEAP32[$1 >> 2];
      HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
      $0 = $0 + 1 | 0;
      $1 = $1 + 1 | 0;
      HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
      $3 = $0 + 1 | 0;
      $0 = $3 + 1 | 0;
      $4 = $1 + 1 | 0;
      $1 = $4 + 1 | 0;
      HEAP8[$3 >> 0] = HEAPU8[$4 >> 0];
      $2 = $2 - 3 | 0;
      continue_3 : while (1) {
       if ($2 >>> 0 >= 17 >>> 0) {
        $3 = HEAP32[($1 + 1 | 0) >> 2];
        HEAP32[$0 >> 2] = $3 << 8 | 0 | ($5 >>> 24 | 0) | 0;
        $4 = $3 >>> 24 | 0;
        $3 = HEAP32[($1 + 5 | 0) >> 2];
        HEAP32[($0 + 4 | 0) >> 2] = $4 | ($3 << 8 | 0) | 0;
        $4 = $3 >>> 24 | 0;
        $3 = HEAP32[($1 + 9 | 0) >> 2];
        HEAP32[($0 + 8 | 0) >> 2] = $4 | ($3 << 8 | 0) | 0;
        $5 = HEAP32[($1 + 13 | 0) >> 2];
        HEAP32[($0 + 12 | 0) >> 2] = $5 << 8 | 0 | ($3 >>> 24 | 0) | 0;
        $1 = $1 + 16 | 0;
        $0 = $0 + 16 | 0;
        $2 = $2 - 16 | 0;
        continue continue_3;
       }
       break continue_3;
      };
      break break_2;
     }
     $5 = HEAP32[$1 >> 2];
     HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
     $3 = $0 + 1 | 0;
     $0 = $3 + 1 | 0;
     $4 = $1 + 1 | 0;
     $1 = $4 + 1 | 0;
     HEAP8[$3 >> 0] = HEAPU8[$4 >> 0];
     $2 = $2 - 2 | 0;
     continue_4 : while (1) {
      if ($2 >>> 0 >= 18 >>> 0) {
       $3 = HEAP32[($1 + 2 | 0) >> 2];
       HEAP32[$0 >> 2] = $3 << 16 | 0 | ($5 >>> 16 | 0) | 0;
       $4 = $3 >>> 16 | 0;
       $3 = HEAP32[($1 + 6 | 0) >> 2];
       HEAP32[($0 + 4 | 0) >> 2] = $4 | ($3 << 16 | 0) | 0;
       $4 = $3 >>> 16 | 0;
       $3 = HEAP32[($1 + 10 | 0) >> 2];
       HEAP32[($0 + 8 | 0) >> 2] = $4 | ($3 << 16 | 0) | 0;
       $5 = HEAP32[($1 + 14 | 0) >> 2];
       HEAP32[($0 + 12 | 0) >> 2] = $5 << 16 | 0 | ($3 >>> 16 | 0) | 0;
       $1 = $1 + 16 | 0;
       $0 = $0 + 16 | 0;
       $2 = $2 - 16 | 0;
       continue continue_4;
      }
      break continue_4;
     };
     break break_2;
    }
    $5 = HEAP32[$1 >> 2];
    $3 = $0;
    $0 = $0 + 1 | 0;
    $4 = $1;
    $1 = $1 + 1 | 0;
    HEAP8[$3 >> 0] = HEAPU8[$4 >> 0];
    $2 = $2 - 1 | 0;
    continue_5 : while (1) {
     if ($2 >>> 0 >= 19 >>> 0) {
      $3 = HEAP32[($1 + 3 | 0) >> 2];
      HEAP32[$0 >> 2] = $3 << 24 | 0 | ($5 >>> 8 | 0) | 0;
      $4 = $3 >>> 8 | 0;
      $3 = HEAP32[($1 + 7 | 0) >> 2];
      HEAP32[($0 + 4 | 0) >> 2] = $4 | ($3 << 24 | 0) | 0;
      $4 = $3 >>> 8 | 0;
      $3 = HEAP32[($1 + 11 | 0) >> 2];
      HEAP32[($0 + 8 | 0) >> 2] = $4 | ($3 << 24 | 0) | 0;
      $5 = HEAP32[($1 + 15 | 0) >> 2];
      HEAP32[($0 + 12 | 0) >> 2] = $5 << 24 | 0 | ($3 >>> 8 | 0) | 0;
      $1 = $1 + 16 | 0;
      $0 = $0 + 16 | 0;
      $2 = $2 - 16 | 0;
      continue continue_5;
     }
     break continue_5;
    };
   }
  }
  if ($2 & 16 | 0) {
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $0 = $0 + 1 | 0;
   $1 = $1 + 1 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $0 = $0 + 1 | 0;
   $1 = $1 + 1 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $0 = $0 + 1 | 0;
   $1 = $1 + 1 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $0 = $0 + 1 | 0;
   $1 = $1 + 1 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $0 = $0 + 1 | 0;
   $1 = $1 + 1 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $0 = $0 + 1 | 0;
   $1 = $1 + 1 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $0 = $0 + 1 | 0;
   $1 = $1 + 1 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $0 = $0 + 1 | 0;
   $1 = $1 + 1 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $0 = $0 + 1 | 0;
   $1 = $1 + 1 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $0 = $0 + 1 | 0;
   $1 = $1 + 1 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $0 = $0 + 1 | 0;
   $1 = $1 + 1 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $0 = $0 + 1 | 0;
   $1 = $1 + 1 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $0 = $0 + 1 | 0;
   $1 = $1 + 1 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $0 = $0 + 1 | 0;
   $1 = $1 + 1 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $3 = $0 + 1 | 0;
   $0 = $3 + 1 | 0;
   $4 = $1 + 1 | 0;
   $1 = $4 + 1 | 0;
   HEAP8[$3 >> 0] = HEAPU8[$4 >> 0];
  }
  if ($2 & 8 | 0) {
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $0 = $0 + 1 | 0;
   $1 = $1 + 1 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $0 = $0 + 1 | 0;
   $1 = $1 + 1 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $0 = $0 + 1 | 0;
   $1 = $1 + 1 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $0 = $0 + 1 | 0;
   $1 = $1 + 1 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $0 = $0 + 1 | 0;
   $1 = $1 + 1 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $0 = $0 + 1 | 0;
   $1 = $1 + 1 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $3 = $0 + 1 | 0;
   $0 = $3 + 1 | 0;
   $4 = $1 + 1 | 0;
   $1 = $4 + 1 | 0;
   HEAP8[$3 >> 0] = HEAPU8[$4 >> 0];
  }
  if ($2 & 4 | 0) {
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $0 = $0 + 1 | 0;
   $1 = $1 + 1 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $0 = $0 + 1 | 0;
   $1 = $1 + 1 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $3 = $0 + 1 | 0;
   $0 = $3 + 1 | 0;
   $4 = $1 + 1 | 0;
   $1 = $4 + 1 | 0;
   HEAP8[$3 >> 0] = HEAPU8[$4 >> 0];
  }
  if ($2 & 2 | 0) {
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $3 = $0 + 1 | 0;
   $0 = $3 + 1 | 0;
   $4 = $1 + 1 | 0;
   $1 = $4 + 1 | 0;
   HEAP8[$3 >> 0] = HEAPU8[$4 >> 0];
  }
  if ($2 & 1 | 0) {
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0]
  }
 }
 
 function $lib_memory_memory_copy($0, $1, $2) {
  var $3 = 0, $4 = 0, $5 = 0;
  $3 = $2;
  $lib_util_memory_memmove_inlined_0 : {
   if (($0 | 0) == ($1 | 0)) {
    break $lib_util_memory_memmove_inlined_0
   }
   if (($1 + $3 | 0) >>> 0 <= $0 >>> 0 ? 1 : ($0 + $3 | 0) >>> 0 <= $1 >>> 0) {
    $lib_util_memory_memcpy($0, $1, $3);
    break $lib_util_memory_memmove_inlined_0;
   }
   if ($0 >>> 0 < $1 >>> 0) {
    if (($1 & 7 | 0 | 0) == ($0 & 7 | 0 | 0)) {
     continue_0 : while (1) {
      if ($0 & 7 | 0) {
       if (!$3) {
        break $lib_util_memory_memmove_inlined_0
       }
       $3 = $3 - 1 | 0;
       $2 = $0;
       $0 = $0 + 1 | 0;
       $4 = $1;
       $1 = $1 + 1 | 0;
       HEAP8[$2 >> 0] = HEAPU8[$4 >> 0];
       continue continue_0;
      }
      break continue_0;
     };
     continue_1 : while (1) {
      if ($3 >>> 0 >= 8 >>> 0) {
       $2 = HEAP32[($1 + 4 | 0) >> 2];
       HEAP32[$0 >> 2] = HEAP32[$1 >> 2];
       HEAP32[($0 + 4 | 0) >> 2] = $2;
       $3 = $3 - 8 | 0;
       $0 = $0 + 8 | 0;
       $1 = $1 + 8 | 0;
       continue continue_1;
      }
      break continue_1;
     };
    }
    continue_2 : while (1) {
     if ($3) {
      $2 = $0;
      $0 = $0 + 1 | 0;
      $4 = $1;
      $1 = $1 + 1 | 0;
      HEAP8[$2 >> 0] = HEAPU8[$4 >> 0];
      $3 = $3 - 1 | 0;
      continue continue_2;
     }
     break continue_2;
    };
   } else {
    if (($1 & 7 | 0 | 0) == ($0 & 7 | 0 | 0)) {
     continue_3 : while (1) {
      if (($0 + $3 | 0) & 7 | 0) {
       if (!$3) {
        break $lib_util_memory_memmove_inlined_0
       }
       $3 = $3 - 1 | 0;
       $2 = $3 + $1 | 0;
       HEAP8[($0 + $3 | 0) >> 0] = HEAPU8[$2 >> 0];
       continue continue_3;
      }
      break continue_3;
     };
     continue_4 : while (1) {
      if ($3 >>> 0 >= 8 >>> 0) {
       $3 = $3 - 8 | 0;
       $2 = $3 + $1 | 0;
       $4 = HEAP32[($2 + 4 | 0) >> 2];
       $5 = $0 + $3 | 0;
       HEAP32[$5 >> 2] = HEAP32[$2 >> 2];
       HEAP32[($5 + 4 | 0) >> 2] = $4;
       continue continue_4;
      }
      break continue_4;
     };
    }
    continue_5 : while (1) {
     if ($3) {
      $3 = $3 - 1 | 0;
      $2 = $3 + $1 | 0;
      HEAP8[($0 + $3 | 0) >> 0] = HEAPU8[$2 >> 0];
      continue continue_5;
     }
     break continue_5;
    };
   }
  }
 }
 
 function $lib_rt_pure_growRoots() {
  var $0 = 0, $1 = 0, $2 = 0, $3 = 0;
  $1 = $lib_rt_pure_ROOTS;
  $3 = $lib_rt_pure_CUR - $1 | 0;
  $0 = $3 << 1 | 0;
  $2 = $0 >>> 0 > 256 >>> 0;
  $2 = $2 ? $0 : 256;
  $0 = $lib_rt_tlsf___alloc($2, 0);
  $lib_memory_memory_copy($0, $1, $3);
  if ($1) {
   $lib_rt_tlsf_freeBlock($lib_rt_tlsf_ROOT, $1 - 16 | 0)
  }
  $lib_rt_pure_ROOTS = $0;
  $lib_rt_pure_CUR = $0 + $3 | 0;
  $lib_rt_pure_END = $0 + $2 | 0;
 }
 
 function $lib_rt_pure_appendRoot($0) {
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
  var $1 = 0, $2 = 0;
  $1 = HEAP32[($0 + 4 | 0) >> 2];
  $2 = $1 & 268435455 | 0;
  if (($2 | 0) == (1 | 0)) {
   $lib_rt___visit_members($0 + 16 | 0, 1);
   if ($1 & -2147483648 | 0) {
    HEAP32[($0 + 4 | 0) >> 2] = -2147483648
   } else {
    $lib_rt_tlsf_freeBlock($lib_rt_tlsf_ROOT, $0)
   }
  } else {
   if ($lib_rt___typeinfo(HEAP32[($0 + 8 | 0) >> 2]) & 16 | 0) {
    HEAP32[($0 + 4 | 0) >> 2] = $2 - 1 | 0 | ($1 & -268435456 | 0) | 0
   } else {
    HEAP32[($0 + 4 | 0) >> 2] = $2 - 1 | 0 | -1342177280 | 0;
    if (!($1 & -2147483648 | 0)) {
     $lib_rt_pure_appendRoot($0)
    }
   }
  }
 }
 
 function $lib_rt_pure___release($0) {
  if ($0 >>> 0 > 396 >>> 0) {
   $lib_rt_pure_decrement($0 - 16 | 0)
  }
 }
 
 function $lib_arraybuffer_ArrayBufferView_constructor($0, $1) {
  var $2 = 0, $3 = 0, $4 = 0;
  if ($1 >>> 0 > 134217726 >>> 0) {
   $lib_builtins_abort(24 | 0, 72 | 0, 14 | 0, 56 | 0);
   abort();
  }
  $4 = $1 << 3 | 0;
  $1 = $lib_rt_tlsf___alloc($4, 0);
  $lib_memory_memory_fill($1, $4);
  if (!$0) {
   $0 = $lib_rt_tlsf___alloc(12, 2);
   if ($0 >>> 0 > 396 >>> 0) {
    $2 = $0 - 16 | 0;
    $3 = HEAP32[($2 + 4 | 0) >> 2] + 1 | 0;
    HEAP32[($2 + 4 | 0) >> 2] = $3;
   }
  }
  HEAP32[$0 >> 2] = 0;
  HEAP32[($0 + 4 | 0) >> 2] = 0;
  HEAP32[($0 + 8 | 0) >> 2] = 0;
  $2 = HEAP32[$0 >> 2];
  if (($2 | 0) != ($1 | 0)) {
   if ($1 >>> 0 > 396 >>> 0) {
    $3 = $1 - 16 | 0;
    HEAP32[($3 + 4 | 0) >> 2] = HEAP32[($3 + 4 | 0) >> 2] + 1 | 0;
   }
   $lib_rt_pure___release($2);
  }
  HEAP32[$0 >> 2] = $1;
  HEAP32[($0 + 4 | 0) >> 2] = $1;
  HEAP32[($0 + 8 | 0) >> 2] = $4;
  return $0;
 }
 
 function $lib_array_Array_f64__constructor($0) {
  var $1 = 0, $2 = 0;
  $1 = $lib_rt_tlsf___alloc(16, 3);
  if ($1 >>> 0 > 396 >>> 0) {
   $2 = $1 - 16 | 0;
   HEAP32[($2 + 4 | 0) >> 2] = HEAP32[($2 + 4 | 0) >> 2] + 1 | 0;
  }
  $1 = $lib_arraybuffer_ArrayBufferView_constructor($1, $0);
  HEAP32[($1 + 12 | 0) >> 2] = 0;
  HEAP32[($1 + 12 | 0) >> 2] = $0;
  return $1;
 }
 
 function $lib_rt_tlsf_reallocateBlock($0, $1, $2) {
  var $3 = 0, $4 = 0, $5 = 0, $6 = 0;
  $3 = $lib_rt_tlsf_prepareSize($2);
  $5 = HEAP32[$1 >> 2];
  if ($3 >>> 0 <= ($5 & -4 | 0) >>> 0) {
   $lib_rt_tlsf_prepareBlock($0, $1, $3);
   HEAP32[($1 + 12 | 0) >> 2] = $2;
   return $1;
  }
  $6 = ($1 + 16 | 0) + (HEAP32[$1 >> 2] & -4 | 0) | 0;
  $4 = HEAP32[$6 >> 2];
  if ($4 & 1 | 0) {
   $4 = (($5 & -4 | 0) + 16 | 0) + ($4 & -4 | 0) | 0;
   if ($4 >>> 0 >= $3 >>> 0) {
    $lib_rt_tlsf_removeBlock($0, $6);
    HEAP32[$1 >> 2] = $4 | ($5 & 3 | 0) | 0;
    HEAP32[($1 + 12 | 0) >> 2] = $2;
    $lib_rt_tlsf_prepareBlock($0, $1, $3);
    return $1;
   }
  }
  $3 = $lib_rt_tlsf_allocateBlock($0, $2);
  HEAP32[($3 + 8 | 0) >> 2] = HEAP32[($1 + 8 | 0) >> 2];
  $lib_memory_memory_copy($3 + 16 | 0, $1 + 16 | 0, $2);
  HEAP32[$1 >> 2] = $5 | 1 | 0;
  $lib_rt_tlsf_insertBlock($0, $1);
  return $3;
 }
 
 function $lib_array_ensureSize($0, $1) {
  var $2 = 0, $3 = 0, $4 = 0;
  $2 = HEAP32[($0 + 8 | 0) >> 2];
  if ($1 >>> 0 > ($2 >>> 3 | 0) >>> 0) {
   if ($1 >>> 0 > 134217726 >>> 0) {
    $lib_builtins_abort(24 | 0, 328 | 0, 14 | 0, 47 | 0);
    abort();
   }
   $3 = HEAP32[$0 >> 2];
   $4 = $1 << 3 | 0;
   $1 = $lib_rt_tlsf_reallocateBlock($lib_rt_tlsf_ROOT, $3 - 16 | 0, $4) + 16 | 0;
   $lib_memory_memory_fill($1 + $2 | 0, $4 - $2 | 0);
   if (($1 | 0) != ($3 | 0)) {
    if ($1 >>> 0 > 396 >>> 0) {
     $2 = $1 - 16 | 0;
     $3 = HEAP32[($2 + 4 | 0) >> 2] + 1 | 0;
     HEAP32[($2 + 4 | 0) >> 2] = $3;
    }
    HEAP32[$0 >> 2] = $1;
    HEAP32[($0 + 4 | 0) >> 2] = $1;
   }
   HEAP32[($0 + 8 | 0) >> 2] = $4;
  }
 }
 
 function $lib_array_Array_f64____set($0, $1, $2) {
  var $3 = 0;
  $3 = HEAP32[($0 + 12 | 0) >> 2];
  $lib_array_ensureSize($0, $1 + 1 | 0);
  HEAPF64[(HEAP32[($0 + 4 | 0) >> 2] + ($1 << 3 | 0) | 0) >> 3] = $2;
  if (($1 | 0) >= ($3 | 0)) {
   HEAP32[($0 + 12 | 0) >> 2] = $1 + 1 | 0
  }
 }
 
 function nBodyForces_twoBodyForces($0, $1, $2, $3, $4, $5) {
  $0 = +$0;
  $1 = +$1;
  $2 = +$2;
  $3 = +$3;
  $4 = +$4;
  $5 = +$5;
  var $6 = 0;
  $6 = $lib_array_Array_f64__constructor(2);
  $2 = 6.674e-11 * $2 * $5;
  $0 = $3 - $0;
  $lib_array_Array_f64____set($6, 0, $2 / ($0 * $0));
  $0 = $4 - $1;
  $lib_array_Array_f64____set($6, 1, $2 / ($0 * $0));
  return $6 | 0;
 }
 
 function $lib_array_Array_f64____get($0, $1) {
  if ($1 >>> 0 >= (HEAP32[($0 + 8 | 0) >> 2] >>> 3 | 0) >>> 0) {
   $lib_builtins_abort(232 | 0, 328 | 0, 109 | 0, 61 | 0);
   abort();
  }
  return HEAPF64[(HEAP32[($0 + 4 | 0) >> 2] + ($1 << 3 | 0) | 0) >> 3];
 }
 
 function nBodyForces_nBodyForces($0) {
  $0 = $0 | 0;
  var $1 = 0, $2 = 0, $3 = 0, $4 = 0.0, $5 = 0, $6 = 0, $7 = 0;
  if ($0 >>> 0 > 396 >>> 0) {
   $2 = $0 - 16 | 0;
   $3 = HEAP32[($2 + 4 | 0) >> 2] + 1 | 0;
   HEAP32[($2 + 4 | 0) >> 2] = $3;
  }
  if ((HEAP32[($0 + 12 | 0) >> 2] | 0) % (3 | 0) | 0) {
   $2 = $lib_array_Array_f64__constructor(0);
   $lib_rt_pure___release($0);
   return $2 | 0;
  }
  $7 = (HEAP32[($0 + 12 | 0) >> 2] | 0) / (3 | 0) | 0;
  $2 = $lib_array_Array_f64__constructor($7 << 1 | 0);
  loop_0 : while (1) {
   if (($5 | 0) < ($7 | 0)) {
    $6 = $5 + 1 | 0;
    loop_1 : while (1) {
     if (($5 | 0) < ($7 | 0)) {
      $3 = Math_imul($5, 3);
      $1 = Math_imul($6, 3);
      $3 = nBodyForces_twoBodyForces($lib_array_Array_f64____get($0, $3), $lib_array_Array_f64____get($0, $3 + 1 | 0), $lib_array_Array_f64____get($0, $3 + 2 | 0), $lib_array_Array_f64____get($0, $1), $lib_array_Array_f64____get($0, $1 + 1 | 0), $lib_array_Array_f64____get($0, $1 + 2 | 0));
      $1 = $5 << 1 | 0;
      $4 = $lib_array_Array_f64____get($2, $1);
      $lib_array_Array_f64____set($2, $1, $4 + $lib_array_Array_f64____get($3, 0));
      $1 = $1 + 1 | 0;
      $4 = $lib_array_Array_f64____get($2, $1);
      $lib_array_Array_f64____set($2, $1, $4 + $lib_array_Array_f64____get($3, 1));
      $1 = $6 << 1 | 0;
      $4 = $lib_array_Array_f64____get($2, $1);
      $lib_array_Array_f64____set($2, $1, $4 + $lib_array_Array_f64____get($3, 0));
      $1 = $1 + 1 | 0;
      $4 = $lib_array_Array_f64____get($2, $1);
      $lib_array_Array_f64____set($2, $1, $4 + $lib_array_Array_f64____get($3, 1));
      $6 = $6 + 1 | 0;
      $lib_rt_pure___release($3);
      continue loop_1;
     }
     break loop_1;
    };
    $5 = $5 + 1 | 0;
    continue loop_0;
   }
   break loop_0;
  };
  $lib_rt_pure___release($0);
  return $2 | 0;
 }
 
 function $lib_rt_pure_markGray($0) {
  var $1 = 0;
  $1 = HEAP32[($0 + 4 | 0) >> 2];
  if (($1 & 1879048192 | 0 | 0) != (268435456 | 0)) {
   HEAP32[($0 + 4 | 0) >> 2] = $1 & -1879048193 | 0 | 268435456 | 0;
   $lib_rt___visit_members($0 + 16 | 0, 2);
  }
 }
 
 function $lib_rt_pure_scanBlack($0) {
  HEAP32[($0 + 4 | 0) >> 2] = HEAP32[($0 + 4 | 0) >> 2] & -1879048193 | 0;
  $lib_rt___visit_members($0 + 16 | 0, 4);
 }
 
 function $lib_rt_pure_scan($0) {
  var $1 = 0;
  $1 = HEAP32[($0 + 4 | 0) >> 2];
  if (($1 & 1879048192 | 0 | 0) == (268435456 | 0)) {
   if (($1 & 268435455 | 0) >>> 0 > 0 >>> 0) {
    $lib_rt_pure_scanBlack($0)
   } else {
    HEAP32[($0 + 4 | 0) >> 2] = $1 & -1879048193 | 0 | 536870912 | 0;
    $lib_rt___visit_members($0 + 16 | 0, 3);
   }
  }
 }
 
 function $lib_rt_pure_collectWhite($0) {
  var $1 = 0, $2 = 0;
  $1 = HEAP32[($0 + 4 | 0) >> 2];
  if (($1 & 1879048192 | 0 | 0) == (536870912 | 0)) {
   $2 = !($1 & -2147483648 | 0)
  } else {
   $2 = 0
  }
  if ($2) {
   HEAP32[($0 + 4 | 0) >> 2] = $1 & -1879048193 | 0;
   $lib_rt___visit_members($0 + 16 | 0, 5);
   $lib_rt_tlsf_freeBlock($lib_rt_tlsf_ROOT, $0);
  }
 }
 
 function $lib_rt_pure___visit($0, $1) {
  if ($0 >>> 0 < 396 >>> 0) {
   return
  }
  $0 = $0 - 16 | 0;
  break_0 : {
   case4_0 : {
    case3_0 : {
     case2_0 : {
      case1_0 : {
       if (($1 | 0) != (1 | 0)) {
        if (($1 | 0) == (2 | 0)) {
         break case1_0
        }
        tablify_0 : {
         switch ($1 - 3 | 0 | 0) {
         case 0:
          break case2_0;
         case 1:
          break case3_0;
         case 2:
          break case4_0;
         default:
          break tablify_0;
         };
        }
        break break_0;
       }
       $lib_rt_pure_decrement($0);
       break break_0;
      }
      HEAP32[($0 + 4 | 0) >> 2] = HEAP32[($0 + 4 | 0) >> 2] - 1 | 0;
      $lib_rt_pure_markGray($0);
      break break_0;
     }
     $lib_rt_pure_scan($0);
     break break_0;
    }
    $1 = HEAP32[($0 + 4 | 0) >> 2];
    HEAP32[($0 + 4 | 0) >> 2] = $1 + 1 | 0;
    if ($1 & 1879048192 | 0) {
     $lib_rt_pure_scanBlack($0)
    }
    break break_0;
   }
   $lib_rt_pure_collectWhite($0);
  }
 }
 
 function $lib_rt___visit_members($0, $1) {
  block$4$break : {
   switch (HEAP32[($0 - 8 | 0) >> 2] | 0) {
   case 0:
   case 1:
    return;
   default:
    abort();
   case 2:
   case 3:
    break block$4$break;
   };
  }
  $0 = HEAP32[$0 >> 2];
  if ($0) {
   $lib_rt_pure___visit($0, $1)
  }
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
  "twoBodyForces": nBodyForces_twoBodyForces, 
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
assignasmFunc(8, "HAAAAAEAAAABAAAAHAAAAEkAbgB2AGEAbABpAGQAIABsAGUAbgBnAHQAaA==");
assignasmFunc(56, "JgAAAAEAAAABAAAAJgAAAH4AbABpAGIALwBhAHIAcgBhAHkAYgB1AGYAZgBlAHIALgB0AHM=");
assignasmFunc(112, "KAAAAAEAAAABAAAAKAAAAGEAbABsAG8AYwBhAHQAaQBvAG4AIAB0AG8AbwAgAGwAYQByAGcAZQ==");
assignasmFunc(168, "HgAAAAEAAAABAAAAHgAAAH4AbABpAGIALwByAHQALwB0AGwAcwBmAC4AdABz");
assignasmFunc(216, "JAAAAAEAAAABAAAAJAAAAEkAbgBkAGUAeAAgAG8AdQB0ACAAbwBmACAAcgBhAG4AZwBl");
assignasmFunc(272, "FAAAAAEAAAABAAAAFAAAAH4AbABpAGIALwByAHQALgB0AHM=");
assignasmFunc(312, "GgAAAAEAAAABAAAAGgAAAH4AbABpAGIALwBhAHIAcgBhAHkALgB0AHM=");
assignasmFunc(360, "BAAAABAAAAAAAAAAEAAAAAAAAAAQAAAAAAAAABMNAAAC");
var retasmFunc = asmFunc({Math,Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,NaN,Infinity}, {abort:function() { throw new Error('abort'); },abort},memasmFunc);
export var memory = retasmFunc.memory;
export var twoBodyForces = retasmFunc.twoBodyForces;
export var nBodyForces = retasmFunc.nBodyForces;
