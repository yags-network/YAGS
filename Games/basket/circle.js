const defaultCircleOptions = {
  group: 0,
  restitution: 0.8,
  friction: 0.7,
  density: 1,
  type: DYNAMIC,
  offset: new b2Vec2(),
  debugLine: true,
  isSensor: false,
  beginContact: ()=>{},
  endContact: ()=>{},
  preSolve: ()=>{},
  postSolve: ()=>{},
  rendering: renderingOpe
}

class Circle extends Body {
  constructor(x, y, r, options=defaultCircleOptions){
    super();
    
    this.r = r;
    let { rendering, postSolve, preSolve, endContact, beginContact, isSensor, debugLine, group, offset, type, friction, restitution, density } = {...defaultCircleOptions, ...options};
    rendering = {...renderingOpe, ...rendering};

    this.debugLine = debugLine;
    const bd = new b2BodyDef();
    bd.type = type;
    bd.position = box2d.coordPixelsToWorld(x, y);
    bd.userData = this;

    const fd = new Circle.fixture(r, { group, offset, friction, restitution, density }).fixture;

    this.body = box2d.createBody(bd);
    this.body.CreateFixture(fd);
    this.postSolve = postSolve;
    this.preSolve = preSolve;
    this.endContact = endContact;
    this.beginContact = beginContact;
    this.body.SetUserData(this);

    this.rendering = rendering;
  }
  show(){
    const pos = box2d.getBodyPos(this.body);
    const a = this.body.GetAngle();

    push();
    fill(this.rendering.color);
    stroke(this.rendering.stroke);
    translate(pos.x, pos.y);
    rotate(a);
    ellipse(0, 0, this.r*2);
    if(this.rendering.debug){
      line(0, 0, this.r, 0);
    }
    pop();
  }
  static fixture = class {
    constructor(r, options=defaultCircleOptions){
      const { debugLine, group, offset, friction, restitution, density } = {...defaultCircleOptions, ...options};
      this.debugLine = debugLine;
      this.r = r;
      const cs = new b2CircleShape();
      cs.m_radius = box2d.scalarPixelsToWorld(r);
      const offsetW = box2d.coordPixelsToWorld(offset);
      cs.m_p.Set(offsetW.x, offsetW.y);
      this.offset = offset;

      const fd = new b2FixtureDef();
      fd.shape = cs;
      fd.restitution = restitution;
      fd.friction = friction;
      fd.density = density;
      fd.filter.groupIndex = group;

      this.fixture = fd;
    }
    show(x, y, a){
      push();
      translate(x, y);
      fill(this.body.rendering.color);
      stroke(this.body.rendering.stroke);
      rotate(a);
      translate(this.offset.x, this.offset.y);
      ellipse(0, 0, this.r*2);
      if(this.body.rendering.debug){
        line(0, 0, this.r, 0);
      }
      pop();
    }
  }
}