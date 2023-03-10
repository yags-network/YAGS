const ddjo = {
  damping: 0.9,
  frequency: 5,
  show: true,
  ...genericJointOptions
}

class DistanceJoint extends Joint {
  constructor(bodyA, bodyB, options=ddjo){
    super();
    const {collide, show, frequency, damping, offsetA, offsetB, length} = { ...ddjo, ...options };
    this.rendering = { show }
    const djd = new b2DistanceJointDef();
    djd.bodyA = bodyA.body;
    djd.bodyB = bodyB.body;
    djd.dampingRatio = damping;
    djd.frequencyHz = frequency;

    djd.collideConnected = collide;

    djd.localAnchorA = box2d.coordPixelsToWorld(offsetA);
    djd.localAnchorB = box2d.coordPixelsToWorld(offsetB);

    const d = sqrt((bodyA.x+offsetA.x-bodyB.x+offsetB.x)**2+(bodyA.y+offsetA.y-bodyB.y+offsetB.y)**2);
    const wd = box2d.scalarPixelsToWorld(length)
    djd.length = isNaN(wd)?box2d.scalarPixelsToWorld(d):wd

    this.joint = box2d.createJoint(djd);
  }
  show(){
    stroke(0);
    super.show();
  }
}