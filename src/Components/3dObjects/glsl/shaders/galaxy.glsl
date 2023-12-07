#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;

#define mouse vec2(sin(u_time)/48.,cos(u_time)/48.)
#define iterations 14
#define formuparam2.79

#define volsteps 5
#define stepsize.390

#define zoom 2.
#define tile.850
#define speed2 100.
#define brightness.003
#define darkmatter.400
#define distfading.560
#define saturation.800

#define transverseSpeed zoom*2.
#define cloud.11

float field(in vec3 p){
    float strength=7.+.03*log(1.e-6+fract(sin(u_time)*4373.11));
    float accum=0.;
    float prev=0.;
    float tw=0.;
    
    for(int i=0;i<6;++i){
        float mag=dot(p,p);
        p=abs(p)/mag+vec3(-.5,-.8+.1*sin(u_time*.7+2.),-1.1+.3*cos(u_time*.3));
        float w=exp(-float(i)/7.);
        accum+=w*exp(-strength*pow(abs(mag-prev),2.3));
        tw+=w;
        prev=mag;
    }
    return max(0.,5.*accum/tw-.7);
}

void main(){
    vec2 uv2=2.*gl_FragCoord.xy/vec2(512)-1.;
    vec2 uvs=uv2*vec2(512)/512.;
    
    float time2=u_time;
    float speed=speed2;
    speed=.01*cos(time2*.02+3.1415926/4.);
    
    float formuparam=formuparam2;
    
    vec2 uv=uvs;
    
    float a_xz=.9;
    float a_yz=-.6;
    float a_xy=.9+u_time*.08;
    
    mat2 rot_xz=mat2(cos(a_xz),sin(a_xz),-sin(a_xz),cos(a_xz));
    mat2 rot_yz=mat2(cos(a_yz),sin(a_yz),-sin(a_yz),cos(a_yz));
    mat2 rot_xy=mat2(cos(a_xy),sin(a_xy),-sin(a_xy),cos(a_xy));
    
    float v2=1.;
    vec3 dir=vec3(uv*zoom,1.);
    vec3 from=vec3(0.,0.,0.);
    from.x-=5.*(mouse.x-.5);
    from.y-=5.*(mouse.y-.5);
    
    vec3 forward=vec3(0.0157, 0.0157, 0.2275);
    from.x+=transverseSpeed*(1.)*cos(.01*u_time)+.001*u_time;
    from.y+=transverseSpeed*(1.)*sin(.01*u_time)+.001*u_time;
    from.z+=.003*u_time;
    
    dir.xy*=rot_xy;
    forward.xy*=rot_xy;
    dir.xz*=rot_xz;
    forward.xz*=rot_xz;
    dir.yz*=rot_yz;
    forward.yz*=rot_yz;
    
    from.xy*=-rot_xy;
    from.xz*=rot_xz;
    from.yz*=rot_yz;
    
    float zooom=(time2-3311.)*speed;
    from+=forward*zooom;
    float sampleShift=mod(zooom,stepsize);
    
    float zoffset=-sampleShift;
    sampleShift/=stepsize;
    
    float s=.24;
    float s3=s+stepsize/2.;
    vec3 v=vec3(0.);
    float t3=0.;
    
    vec3 backCol2=vec3(0.);
    for(int r=0;r<volsteps;r++){
        vec3 p2=from+(s+zoffset)*dir;
        vec3 p3=from+(s3+zoffset)*dir;
        
        p2=abs(vec3(tile)-mod(p2,vec3(tile*2.)));
        p3=abs(vec3(tile)-mod(p3,vec3(tile*2.)));
        #ifdef cloud
        t3=field(p3);
        #endif
        
        float pa,a=pa=0.;
        for(int i=0;i<iterations;i++){
            p2=abs(p2)/dot(p2,p2)-formuparam;
            
            float D=abs(length(p2)-pa);
            a+=i>7?min(12.,D):D;
            pa=length(p2);
        }
        
        a*=a*a;
        
        float s1=s+zoffset;
        
        float fade=pow(distfading,max(0.,float(r)-sampleShift));
        
        v+=fade;
        
        if(r==0)
        fade*=(1.-(sampleShift));
        
        if(r==volsteps-1)
        fade*=sampleShift;
        v+=vec3(s1,s1*s1,s1*s1*s1*s1)*a*brightness*fade;
        
        backCol2+=mix(.4,1.,v2)*vec3(1.8*t3*t3*t3,1.4*t3*t3,t3)*fade;
        
        s+=stepsize;
        s3+=stepsize;
    }
    
    v=mix(vec3(length(v)),v,saturation);
    
    vec4 forCol2=vec4(v*.01,1.);
    #ifdef cloud
    backCol2*=cloud;
    #endif
    backCol2.b*=1.8;
    backCol2.r*=.05;
    
    backCol2.b=.5*mix(backCol2.g,backCol2.b,.8);
    backCol2.g=0.;
    backCol2.bg=mix(backCol2.gb,backCol2.bg,.5*(cos(u_time*.01)+1.));
    gl_FragColor=forCol2+vec4(backCol2,1.);
}