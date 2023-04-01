class Body {
  applyForce(force, strengh, pos=this.pos){
    this.body.ApplyForce(box2d.coordPixelsToWorld(force), box2d.coordPixelsToWorld(pos));
  }
  applyForceTo(x, y, strengh, pos=new b2Vec2()){
    pos.Add(this.pos);
    const force = new b2Vec2(x, y);
    force.Subtract(pos);
    force.Normalize();
    force.Multiply(strengh);
    this.applyForce(force, strengh, pos);
  }
  beginContact(){}
  endContact(){}
  preSolve(){}
  postSolve(){}
  contains(x, y){
    const point = box2d.coordPixelsToWorld(x, y);
    const fixture = this.body.GetFixtureList();
    if(fixture.TestPoint(point)){
      return this;
    }
    return null;
  }
  destroy(){
    box2d.destroyBody(this.body);
  }
  get pos(){
    return box2d.getBodyPos(this.body);
  }
  get x(){
    return box2d.getBodyPos(this.body).x;
  }
  get y(){
    return box2d.getBodyPos(this.body).y;
  }
}

const dop = {
  angle: 0,
  type: DYNAMIC,
  beginContact: ()=>{},
  endContact: ()=>{},
  preSolve: ()=>{},
  postSolve: ()=>{}
}

class Compound extends Body {
  constructor(x, y, parts, options=dop){
    super();
    const { type, angle, postSolve, preSolve, endContact, beginContact } = { ...dop, ...options };
    const bd = new b2BodyDef();
    bd.position = box2d.coordPixelsToWorld(x, y);
    bd.angle = angle;
    bd.type = type;

    this.body = box2d.createBody(bd);
    for(let i=0;i<parts.length;i++){
      parts[i].body = this;
      this.body.CreateFixture(parts[i].fixture);
    }
    this.body.SetUserData(this);
    this.parts = parts;
    this.postSolve = postSolve;
    this.preSolve = preSolve;
    this.endContact = endContact;
    this.beginContact = beginContact;
  }
  show(){
    const pos = box2d.getBodyPos(this.body);
    const a = this.body.GetAngle();

    for(let i=0;i<this.parts.length;i++){
      this.parts[i].show(pos.x, pos.y, a);
    }
  }
}

class Composite {
  constructor(bodies, joints=[]){
    this.bodies = bodies;
    this.joints = joints;
  }
  contains(x, y){
    const point = new b2Vec2(x, y);
    for(let i=0;i<this.bodies.length;i++){
      if(this.bodies[i].contains(point)){
        return this.bodies[i].contains(point);
      }
    }
  }
  show(){
    for(let i=0;i<this.bodies.length;i++){
      this.bodies[i].show();
    }
    for(let i=0;i<this.joints.length;i++){
      this.joints[i].show();
    }
  }
}