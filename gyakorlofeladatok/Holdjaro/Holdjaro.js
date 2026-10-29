class Holdjaro {
    constructor(options = {}) {
        
    }

    getPosition() { return undefined; }

    execute(commands) {
                return {position: this.getPosition(), obstacle: null};
    }
}
if (typeof module !== 'undefined') module.exports = Holdjaro;
