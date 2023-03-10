const renderingOpe = {
  color: [255, 255, 255],
  stroke: [0, 0, 0],
  debug: true
}

const defaultBoxOptions = {
  group: 0,
  restitution: 0.6,
  friction: 0.7,
  density: 1,
  type: DYNAMIC,
  angle: 0,
  offset: new b2Vec2(),
  roundCorners: false,
  isSensor: false,
  beginContact: ()=>{},
  endContact: ()=>{},
  preSolve: ()=>{},
  postSolve: ()=>{},
  rendering: renderingOpe
}

class Box extends Compound {
  constructor(x, y, w, h, options=defaultBoxOptions){
    let { rendering, postSolve, preSolve, endContact, beginContact, isSensor, roundCorners, group, type, friction, restitution, density, angle } = {...defaultBoxOptions, ...options};
    rendering = {...renderingOpe, ...rendering};
    const parts = [];
    if(roundCorners){
      if(w>h){
        w-=h;
        parts.push(new Circle.fixture(h/2, { offset: new b2Vec2(w/2, 0), group, friction, restitution, density }));
        parts.push(new Circle.fixture(h/2, { offset: new b2Vec2(-w/2, 0), group, friction, restitution, density }))
      }else{
        h-=w;
        parts.push(new Circle.fixture(w/2, { offset: new b2Vec2(0, h/2), group, friction, restitution, density }));
        parts.push(new Circle.fixture(w/2, { offset: new b2Vec2(0, -h/2), group, friction, restitution, density }))
      }
    }
    parts.push(new Box.fixture(w, h, { isSensor, group, friction, restitution, density }));
    super(x, y, parts, { type, angle });
    this.postSolve = postSolve;
    this.preSolve = preSolve;
    this.endContact = endContact;
    this.beginContact = beginContact;
    this.rendering = rendering;
  }
  static fixture = class {
    constructor(w, h, options = defaultBoxOptions){
      const { isSensor, group, friction, restitution, density, offset } = {...defaultBoxOptions, ...options};
      this.w = w;
      this.h = h;
      this.offset = offset;
      const ps = new b2PolygonShape();
      const ww = box2d.scalarPixelsToWorld(w/2);
      const wh = box2d.scalarPixelsToWorld(h/2);
      ps.SetAsBox(ww, wh);
      const offsetw = box2d.coordPixelsToWorld(offset);
      for(let i=0;i<ps.m_vertices.length;i++){
        ps.m_vertices[i].Add(offsetw);
      }
      const fd = new b2FixtureDef();
      fd.shape = ps;
      fd.density = density;
      fd.friction = friction;
      fd.restitution = restitution;
      fd.filter.groupIndex = group;
      fd.isSensor = isSensor;

      this.fixture = fd;
    }
    show(x, y, a){
      push();
      fill(this.body.rendering.color);
      stroke(this.body.rendering.stroke);
      translate(x, y);
      rotate(a);
      translate(this.offset.x, this.offset.y);
      rect(0, 0, this.w, this.h);
      pop();
    }
  }
}

class Room extends Composite {
  constructor(x, y, w, h, tickness, options={}){
    const walls = [];
    walls.push(
      new Wall(x+w/2, y, w+tickness, tickness, { ...options }),
      new Wall(x+w, y+h/2, tickness, h+tickness, { ...options }),
      new Wall(x+w/2, y+h, w+tickness, tickness, { ...options }),
      new Wall(x, y+h/2, tickness, h+tickness, { ...options })
    );
    super(walls);
  }
}

class Wall extends Box{
  constructor(x, y, w, h){
    super(x, y, w, h, { type: STATIC });
  }
}