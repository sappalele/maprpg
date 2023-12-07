#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

const float Pi = 3.14159;
uniform vec2 mouse;

const int   complexity      = 100;    // More points of color.
const float fluid_speed     = 9999.0;  // Drives speed, higher number will make it slower.
const float color_intensity = 1.0;
  

void main()
{
  vec3 col = vec3(0.6);
  vec3 colorIn  = vec3(0.06,0.36,0.00);
  vec3 colorOut = vec3(0.42,0.6,0.06);
  vec2 p=gl_FragCoord.xy/u_resolution.xy;
  for(int i=1;i<complexity;i++)
  {
	vec2 position = ( gl_FragCoord.xy / u_resolution.xy ) * mouse / 90.0;
    	vec2 newp=p + u_time*0.0045;
	newp.x+=0.6/float(i)*cos(float(i)*p.y+u_time/fluid_speed+0.3*float(i)) + 0.5;
    	newp.y+=0.6/float(i)*sin(float(i)*p.x+u_time/fluid_speed+0.3*float(i+10)) - 0.1;
		
    		
    		p=newp;
	
  }
  float pct = sin(Pi * p.x) * sin(3.0 * p.y);
  col = mix(colorIn, colorOut, pct);
  //vec3 col=vec3(color_intensity*sin(3.0*p.x)+color_intensity,color_intensity*sin(3.0*p.y)+color_intensity,color_intensity*sin(p.x+p.y)+color_intensity);
  //col = mix(colorIn, colorOut, sin(p.x));
  gl_FragColor=vec4(col, 5.0);
  
}
