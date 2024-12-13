class ScrollMovement {

    _velocity = 0;
    _maxSpeed = 0;
    _accelerationRate = 0;
    _friction = 0;

    constructor( 
        velocity=0, 
        maxSpeed=10,
        accelerationRate=0.5,
        friction=0.1
    ){
        this._velocity = velocity;
        this._maxSpeed = maxSpeed;
        this._accelerationRate = accelerationRate;
        this._friction = friction;
    }

    /* SETTERS GETTERS */
    getVelocity(){
        return this._velocity;
    }
    setVelocity(velocity){
        this._velocity = velocity;
    }

    getMaxSpeed(){
        return this._maxSpeed;
    }
    setMaxSpeed(maxSpeed){
        this._maxSpeed = maxSpeed;
    }

    getAccelerationRate(){
        return this._accelerationRate;
    }
    setAccelerationRate(accelerationRate){
        this._accelerationRate = accelerationRate;
    }

    getFriction(){
        return this._friction;
    }
    setFriction(friction){
        this._friction = friction;
    }

    /* UPDATE */
    update(direction){
        this._velocity = this._velocity + (direction * this._accelerationRate) + this._friction;
    }

}

export default ScrollMovement