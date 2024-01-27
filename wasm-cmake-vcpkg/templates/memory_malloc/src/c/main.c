#import <stdlib.h>
#ifdef __EMSCRIPTEN__
#include <emscripten/emscripten.h>
#else
#define EMSCRIPTEN_KEEPALIVE
#endif

#ifdef __EMSCRIPTEN__
int main() {
    return 0;
}
#endif

EMSCRIPTEN_KEEPALIVE
// Receive a buffer from Javascript
int sum(int *arr, int size) {
    int sum = 0;
    while (size) {
        sum += arr[--size];
    }
    return sum;
}

EMSCRIPTEN_KEEPALIVE
// Send a buffer to Javascript.
const char *get_string() { 
    return "Hello World"; 
}

EMSCRIPTEN_KEEPALIVE
void *wasm_malloc(size_t size) {
    return malloc(size);
}

EMSCRIPTEN_KEEPALIVE
void wasm_free(void *ptr) {
    free(ptr);
}
