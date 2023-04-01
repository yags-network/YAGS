const dwjo = {
  referenceAngle: 0,
  ...genericJointOptions
}

class WeldJoint extends Joint {
  constructor(bodyA, bodyB, options=dwjo){
    super();
    const { show, referenceAngle, offsetA, offsetB, collide } = { ...dwjo, ...options }
    const wjd = new b2WeldJointDef();
    wjd.bodyA = bodyA.body;
    wjd.bodyB = bodyB.body;

    wjd.collideConnected = collide;
    wjd.localAnchorA = box2d.coordPixelsToWorld(offsetA);
    wjd.localAnchorB = box2d.coordPixelsToWorld(offsetB);
      
    wjd.referenceAngle = referenceAngle;
    this.randering = { show }
        
    this.joint = box2d.createJoint(wjd);
  }
}