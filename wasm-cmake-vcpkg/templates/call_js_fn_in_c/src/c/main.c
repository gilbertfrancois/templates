#ifdef __EMSCRIPTEN__
#include <emscripten/emscripten.h>
#else
#define EMSCRIPTEN_KEEPALIVE
#endif

extern int js_myfunction();

EMSCRIPTEN_KEEPALIVE
// Receive a buffer from Javascript
unsigned long wasm_myfunction() {
    unsigned long answer = js_myfunction();
    return answer;

}
