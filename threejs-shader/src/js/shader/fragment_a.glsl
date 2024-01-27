varying vec2  vUv;
uniform vec2  iMouse;
uniform vec2  iResolution;
uniform vec2  iViewPortMin;
uniform vec2  iViewPortMax;
uniform float iViewPortRatio;
uniform float iGlobalTime;
uniform sampler2D iChannel0;


/**
 * Helper function: Maps the input vector with min-max range to a destination dimension space.
 *
 * @param src        Source vector.
 * @param src_min    Minimum value of the source.
 * @param src_max    Maximum value of the source.
 * @param dst_min    Minimun value of the destination.
 * @param dst_max    Maximum value of the destination.
 */
vec2 map(in vec2 src, in vec2 src_min, in vec2 src_max, in vec2 dst_min, in vec2 dst_max) {
    return (src - src_min) / (src_max - src_min) * (dst_max - dst_min) + dst_min;
}

/**
 * Helper function: Maps the input vector with range 0 ≤ src ≤ 1 to a destination dimension space.
 *
 * @param src        Source vector.
 * @param dst_min    Minimun value of the destination.
 * @param dst_max    Maximum value of the destination.
 */
vec2 mapn(in vec2 src, in vec2 dst_min, in vec2 dst_max) {
    return src * (dst_max - dst_min) + dst_min;
}

/**
 * Debug function: Shows a ckeckerboard pattern for verification and debugging with 
 *      green color foreach x > 0 and y > 0
 *      red color   foreach x < 0 and y < 0 
 *      
 * @param uv      Normalized coordinate.
 * @param scale   Grid scale, or number of squares per unit.
 * @returns       vec3 color
 */
vec3 show_grid(in vec2 uv, in float scale) {
    vec2 suv = scale * uv;
    float chessboard = floor(suv.x) + floor(suv.y);
    chessboard = fract(chessboard * 0.5) * 2.0;
    vec3 quad = vec3(0.0);
    if (suv.x > 0.0 && suv.y > 0.0) {
        quad = vec3(0.0, 1.0, 0.0);
    }
    if (suv.x < 0.0 && suv.y < 0.0) {
        quad = vec3(1.0, 0.0, 0.0);
    }
    vec3 col = 0.5 * vec3(chessboard) + 0.5 * quad;
    return col;
}

/**
 * Main
 *
 */
void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    uv = mapn(uv, iViewPortMin, iViewPortMax);
    // show checkerboard
    vec3 cc = show_grid(uv, 10.0);
    // show working mouse interaction
    vec3 cm = vec3(0.5*(iMouse.x + iMouse.y));
    // blend
    vec3 col = 0.8 * cc + 0.2 * cm;
	gl_FragColor = vec4(col, 1.0);
}
