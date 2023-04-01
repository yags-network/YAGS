const genericJointOptions = {
  offsetA: {x:0,y:0},
  offsetB: {x:0,y:0},
  show: true,
  collide: false
}
class Joint {
  show(){
    if(this.rendering?.show){
      const { posA, posB } = box2d.getDistanceJointPos(this.joint);
      line(posA.x, posA.y, posB.x, posB.y); 
    }
  }
  destroy(){
    box2d.destroyJoint(this.joint);
  }
}

const drjo = {
  enableMotor: false,
  motorSpeed: Math.PI,
  maxMotorTorque: 1000,
  ...genericJointOptions
}

class RevoluteJoint extends Joint {
  constructor(bodyA, bodyB, options=drjo){
    super();
    const { collide, show, offsetA, offsetB, enableMotor, motorSpeed, maxMotorTorque } = {...drjo, ...options};
    this.rendering = { show };
    const rjd = new b2RevoluteJointDef();
    rjd.bodyA = bodyA.body;
    rjd.bodyB = bodyB.body;

    rjd.collideConnected = collide;

    rjd.localAnchorA = box2d.coordPixelsToWorld(offsetA);
    rjd.localAnchorB = box2d.coordPixelsToWorld(offsetB);

    rjd.enableMotor = enableMotor;
    rjd.motorSpeed = motorSpeed;
    rjd.maxMotorTorque = maxMotorTorque;

    this.joint = box2d.createJoint(rjd);
  }
  show(){
    push();
    if(this.rendering.show){
      const [posA, posB] = box2d.getRevoluteJointPos(this.joint);
      stroke(0);
      strokeWeight(3);
      point(posA.x, posA.y);
      point(posB.x, posB.y);
    }
    pop();
  }
}