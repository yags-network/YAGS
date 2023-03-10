const dgjd = {
  
}

class GearJoint extends Joint {
  constructor(bodyA, bodyB, jointA, jointB){
    super();
    console.log(bodyA, bodyB, jointA, jointB);
    const gjd = new b2GearJointDef();
    gjd.bodyA = bodyA.body;
    gjd.bodyB = bodyB.body;
    gjd.joint1 = jointA.joint;
    gjd.joint2 = jointB.joint;
    gjd.ratio = 1;

    this.joint = box2d.createJoint(gjd);
  }
  show(){

  }
}