const { b2Vec2, b2Vec3, b2Math } = Box2D.Common.Math;
const { b2ContactListener, b2DebugDraw, b2BodyDef, b2Body, b2FixtureDef, b2Fixture, b2World } = Box2D.Dynamics;
const { b2MassData, b2PolygonShape, b2CircleShape } = Box2D.Collision.Shapes;
const { b2_dynamicBody: DYNAMIC, b2_staticBody: STATIC } = b2Body;
const { 
  b2DistanceJointDef,
  b2MouseJointDef,
  b2RevoluteJointDef,
  b2PrismaticJointDef,
  b2WeldJointDef,
  b2PulleyJointDef,
  b2GearJointDef
} = Box2D.Dynamics.Joints;

let listener = new b2ContactListener();
let world;

let debugDraw;

class Box2d {
  constructor(){
    // the box2d docs says that bodies sould be between 0.1 and 10, my pixel to meter scale is 100
    // so bodies should have a size between 10 and 1000
    this.scale = 100;
    this.t1=0;
    this.t2=0;
  }
  destroyJoint(joint){
    world.DestroyJoint(joint);
  }
  destroyBody(body){
    world.DestroyBody(body);
  }
  getRevoluteJointPos(joint){
    const posA = joint.GetAnchorA();
    const posB = joint.GetAnchorB();
    return [this.coordWorldToPixels(posA.x, posA.y), this.coordWorldToPixels(posB.x, posB.y)]
  }
  getDistanceJointPos(joint){
    const posA = box2d.coordWorldToPixels(joint.GetAnchorA());
    const posB = box2d.coordWorldToPixels(joint.GetAnchorB());
    return { posA, posB }
  }
  createJoint(jd){
    return world.CreateJoint(jd);
  }
  createBody(bd){
    return world.CreateBody(bd);
  }
  step(dt){
    this.t2 = new Date().getTime();
    this.dt = this.t2-this.t1>100?100:this.t2-this.t1;
    dt||=this.dt
    world.Step(dt/500, 10, 10);
    world.ClearForces();
    this.t1 = new Date().getTime();
  }
  getBodyPos(body){
    return this.coordWorldToPixels(body.GetTransform().position);
  }
  createWorld(gravity = new b2Vec2(0, 100)){
    world = new b2World(this.coordPixelsToWorld(gravity), true);
	  this.groundBody = new Wall(0, 0, 0, 0);
    world.SetContactListener(listener);
    listener.BeginContact = contact =>{
      const bodyA = contact.GetFixtureA().GetBody().GetUserData();
      const bodyB = contact.GetFixtureB().GetBody().GetUserData();
      bodyA.beginContact(bodyA, bodyB);
      bodyB.beginContact(bodyB, bodyA);
    }
    listener.EndContact = contact =>{
      const bodyA = contact.GetFixtureA().GetBody().GetUserData();
      const bodyB = contact.GetFixtureB().GetBody().GetUserData();
      bodyA.endContact(bodyA, bodyB);
      bodyB.endContact(bodyB, bodyA);
    }
    listener.PostSolve = contact =>{
      const bodyA = contact.GetFixtureA().GetBody().GetUserData();
      const bodyB = contact.GetFixtureB().GetBody().GetUserData();
      bodyA.postSolve(bodyA, bodyB);
      bodyB.postSolve(bodyB, bodyA);
    }
    listener.PreSolve = contact =>{
      const bodyA = contact.GetFixtureA().GetBody().GetUserData();
      const bodyB = contact.GetFixtureB().GetBody().GetUserData();
      bodyA.preSolve(bodyA, bodyB);
      bodyB.preSolve(bodyB, bodyA);
    }
    // debugDraw = new b2DebugDraw();
    // debugDraw.SetSprite(document.getElementById('canvas').getContext('2d'));
    // debugDraw.SetDrawScale(40.0);
    // debugDraw.SetFillAlpha(0.5);
    // debugDraw.SetLineThickness(1.0);
    // debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    // world.SetDebugDraw(debugDraw);
  }
  scalarWorldToPixels(s){
    return s * this.scale;
  }
  coordWorldToPixels(x, y){
    if(x instanceof b2Vec2) return new b2Vec2(x.x*this.scale, x.y*this.scale);
    return new b2Vec2(x*this.scale, y*this.scale);
  }
  scalarPixelsToWorld(s){
    return s / this.scale;
  }
  coordPixelsToWorld(x, y){
    if(x.x!==undefined) return new b2Vec2(x.x/this.scale, x.y/this.scale);
    return new b2Vec2(x/this.scale, y/this.scale);
  }
}
