const dprjo = {
  enableLimit: false,
  lowerLimit: 0,
  upperLimit: 0,
  referenceAngle: 0,
  maxMotorForce: 0,
  motorSpeed: 0, 
  enableMotor: false,
  ...genericJointOptions
}

class PrismaticJoint extends Joint {
  constructor(bodyA, bodyB, options=dprjo){
    super();
    const { angle, referenceAngle, show, maxMotorForce, motorSpeed, enableMotor, collide, offsetA, offsetB, enableLimit, lowerLimit, upperLimit } = { ...dprjo, ...options };
    const pjd = new b2PrismaticJointDef();
    pjd.bodyA = bodyA.body;
    pjd.bodyB = bodyB.body;

    pjd.collideConnected = collide;
    const relativeAngle = angle??atan2(bodyB.y-bodyA.y, bodyB.x-bodyA.x);
    pjd.localAxisA = new b2Vec2(cos(relativeAngle), sin(relativeAngle));

    pjd.localAnchorA = box2d.coordPixelsToWorld(offsetA);
    pjd.localAnchorB = box2d.coordPixelsToWorld(offsetB);

    pjd.enableLimit = enableLimit;
    pjd.lowerTranslation = box2d.scalarPixelsToWorld(lowerLimit);
    pjd.upperTranslation = box2d.scalarPixelsToWorld(upperLimit);

    pjd.referenceAngle = referenceAngle;

    pjd.enableMotor = enableMotor;
    pjd.maxMotorForce = maxMotorForce;
    pjd.motorSpeed = motorSpeed;

    this.joint = box2d.createJoint(pjd);
    this.rendering = { show }
  }
  getJointTranslation(){
    return box2d.scalarWorldToPixels(this.joint.GetJointTranslation());
  }
  enableMotor(enabled){
    this.joint.EnableMotor(enabled);
  }
  setMotorSpeed(speed){
    this.joint.SetMotorSpeed(speed);
  }
  setMaxMotorForce(force){
    this.joint.SetMaxMotorForce(force);
  }
}