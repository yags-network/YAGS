class MouseJoint extends Joint {
  constructor(options=ddjo){
    const { show, damping, frequency } = { ...ddjo, ...options }
    super();
    this.joint = null;
    this.dampingRatio = damping;
    this.frequencyHz = frequency;
    this.rendering = { show }
  }
  update(x, y){
    if(this.joint!==null){
      const pos = box2d.coordPixelsToWorld(x, y);
      this.joint.SetTarget(pos);
    }
  }
  show(){
    if(this.joint!==null){
      stroke(0, 255, 0);
      super.show();
    }
  }
  bind(x, y, body){
    const mjd = new b2MouseJointDef();
    mjd.bodyA = box2d.groundBody.body;
    mjd.bodyB = body.body;

    mjd.target = box2d.coordPixelsToWorld(x, y);

    mjd.maxForce = 5000*body.body.m_mass;
    mjd.dampingRatio = this.dampingRatio;
    mjd.frequencyHz = this.frequencyHz;

    this.joint = box2d.createJoint(mjd);
  }
  destroy(){
    if(this.joint){
      box2d.destroyJoint(this.joint);
      this.joint = null;
    }
  }
}