#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float u_time;
uniform vec2 u_resolution;


float map(vec3 p ) {
	return length(p) - 3.0;
}

void main( void ) {
	vec2 uv = ( 2.0 * gl_FragCoord.xy - u_resolution.xy ) / min(u_resolution.x, u_resolution.y);
	vec3 dir = normalize(vec3(uv, 1.0));
	dir.x += cos(u_time * 0.5) * 0.1;
	dir.y += sin(u_time * 0.3) * 0.1;
	
	float t =  0.0;
	vec3 pos = vec3(0, 0, -5.0);
	vec3 ip = (t * dir + pos);
	for(int i = 0 ; i < 100; i++ ){
		dir = normalize(dir);
		t += map(t * dir + pos) * 0.1;
		ip = (t * dir + pos);
		dir.x -= cos(ip.z * 3.5 + u_time) * 0.01;
		dir.y += sin(ip.z * 2.7 - u_time) * 0.02;
		
	}
	float a = map(ip);
	vec3 N = normalize(vec3(
		a - map(ip + vec3(0.001, 0.000, 0.000)),
		a - map(ip + vec3(0.000, 0.001, 0.000)),
		a - map(ip + vec3(0.000, 0.000, 0.001))));
	vec3 L = normalize(vec3(3,1,-2));
	float D = max(0.01, dot(N, L));
	gl_FragColor = vec4(D * t * 0.3 * vec3(1,1,3) * 0.15, 1.0);
}