#include <stdbool.h>
#include <stdio.h>
#include <time.h>
#ifdef _WIN32
#include <Windows.h>
#else
#include <unistd.h>
#endif

#ifdef __EMSCRIPTEN__
#include <emscripten/emscripten.h>
#else
#define EMSCRIPTEN_KEEPALIVE
#endif

typedef struct {
    int target_fps;
    bool vsync;
    bool running;
    unsigned long frame_nr;
} Context;

void main_loop(void *args) {
    Context *ctx = (Context *)args;
    // do something
    printf("frame number: %lu\n", ctx->frame_nr++);
}

void _sleep(unsigned long delay_msec) {
#ifdef _WIN32
    Sleep(delay_msec);
#else
    usleep(delay_msec * 1000);
#endif
}

int main(int argc, char **argv) {
    Context ctx = {.target_fps = 1, .vsync = false, .running = true, .frame_nr = 0};
#ifdef __EMSCRIPTEN__
    // https://emscripten.org/docs/api_reference/emscripten.h.html#c.emscripten_set_main_loop_arg
    // https://emscripten.org/docs/api_reference/emscripten.h.html#c.emscripten_set_main_loop_timing

    const int SIMULATE_INFINITE_LOOP = 1;
    emscripten_set_main_loop_arg(main_loop, &ctx, ctx.target_fps, SIMULATE_INFINITE_LOOP);
    emscripten_set_main_loop_timing(EM_TIMING_RAF, 1);
#else
    while (ctx.running) {
        unsigned long msec_per_frame = 1000 / ctx.target_fps;
        clock_t tic = clock();
        main_loop(&ctx);
        clock_t toc = clock();
        clock_t chrono_frame = toc - tic;
        unsigned long sleep_msec = msec_per_frame - chrono_frame;
        if (sleep_msec > 0)
            _sleep(sleep_msec);
    }
#endif
    return 0;
}
