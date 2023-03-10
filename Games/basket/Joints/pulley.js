// const dpjo = {
//   anchorPosA: new b2Vec2(),
//   anchorPosB: new b2Vec2(),
//   ratio: 1,
//   lengthA: 10,
//   lengthB: 10,
//   maxLengthA: 10000,
//   maxLengthB: 10000,
//   ...genericJointOptions
// }

// class PulleyJoint extends Joint { // not working, YET
//   constructor(bodyA, bodyB, options=dpjo){
//     super();
//     const { offsetA, offsetB, collide, show, anchorPosA, anchorPosB, ratio, maxLengthA, maxLengthB, lengthA, lengthB } = { ...dpjo, ...options }
//     this.groundAnchorA = anchorPosA;
//     this.groundAnchorB = anchorPosB;
    
//     const pjd = new b2PulleyJointDef();
//     pjd.collideConnected = collide;
   
//     const anchor1 = box2d.coordPixelsToWorld(offsetA);
//     const anchor2 = box2d.coordPixelsToWorld(offsetB);
//     const groundAnchor1 = box2d.coordPixelsToWorld(anchorPosA);
//     const groundAnchor2 = box2d.coordPixelsToWorld(anchorPosB);

//     pjd.Initialize(bodyA.body, bodyA.body, groundAnchor1, groundAnchor2, anchor1, anchor2, ratio);

//     pjd.lengthA = box2d.scalarPixelsToWorld(lengthA);
//     pjd.lengthB = box2d.scalarPixelsToWorld(lengthB);

//     pjd.maxLengthA = 200;
//     pjd.maxLengthB = 200;
    
//     console.log(pjd);
//     console.log(world.CreateJoint(pjd));
//     console.log("hmmm");
//   }
//   show(){
//     const { posA, posB } = box2d.getDistanceJointPos(this.joint);
//     beginShape();
//     noFill();
//     vertex(posA.x, posA.y);
//     vertex(this.groundAnchorA.x, this.groundAnchorA.y);
//     vertex(this.groundAnchorB.x, this.groundAnchorB.y);
//     vertex(posB.x, posB.y);
//     endShape();
//     fill(255);
//   }
// }