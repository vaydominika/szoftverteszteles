class Holdjaro {
    constructor({x, y, direction, width = 8, height = 8, obstacles = []} = {}) {
        if (!Number.isSafeInteger(width) || width < 2 || width % 2 !== 0) {
            throw new RangeError('Positive even longitude count required');
        }
        if (!Number.isSafeInteger(height) || height < 1) {
            throw new RangeError('Positive integer latitude count required');
        }
        if (!['N', 'E', 'S', 'W'].includes(direction)) {
            throw new RangeError('Invalid direction');
        }

        this.width = width;
        this.height = height;
        if (!this.isCoordinate(x, y)) throw new RangeError('Starting point outside globe');
        if (!Array.isArray(obstacles) || obstacles.some(cell =>
            !Array.isArray(cell) || cell.length !== 2 || !this.isCoordinate(...cell))) {
            throw new RangeError('Invalid obstacle coordinates');
        }

        this.obstacles = new Set(obstacles.map(([obstacleX, obstacleY]) => `${obstacleX},${obstacleY}`));
        if (this.obstacles.has(`${x},${y}`)) throw new RangeError('Starting cell is blocked');
        this.x = x;
        this.y = y;
        this.direction = direction;
    }

    isCoordinate(x, y) {
        return Number.isSafeInteger(x) && Number.isSafeInteger(y)
            && x >= 1 && x <= this.width && y >= 1 && y <= this.height;
    }

    getPosition() {
        return {x: this.x, y: this.y, direction: this.direction};
    }

    execute(commands) {
        if (typeof commands !== 'string') throw new TypeError('Commands must be a string');
        if (!/^[fblr]*$/.test(commands)) throw new RangeError('Unknown command');

        const directions = ['N', 'E', 'S', 'W'];
        for (let commandIndex = 0; commandIndex < commands.length; commandIndex++) {
            const command = commands[commandIndex];
            if (command === 'l' || command === 'r') {
                const turn = command === 'r' ? 1 : 3;
                this.direction = directions[(directions.indexOf(this.direction) + turn) % 4];
                continue;
            }

            const next = this.nextPosition(command);
            if (this.obstacles.has(`${next.x},${next.y}`)) {
                return {
                    position: this.getPosition(),
                    obstacle: {x: next.x, y: next.y, commandIndex}
                };
            }
            this.x = next.x;
            this.y = next.y;
            this.direction = next.direction;
        }
        return {position: this.getPosition(), obstacle: null};
    }

    nextPosition(command) {
        const vectors = {N: [0, -1], E: [1, 0], S: [0, 1], W: [-1, 0]};
        const [dx, dy] = vectors[this.direction];
        const sign = command === 'f' ? 1 : -1;
        let {x, y, direction} = this.getPosition();
        x += sign * dx;
        y += sign * dy;

        if (x < 1) x = this.width;
        if (x > this.width) x = 1;
        if (y < 1 || y > this.height) {
            y = y < 1 ? 1 : this.height;
            const halfTurn = this.width / 2;
            x = x <= halfTurn ? x + halfTurn : x - halfTurn;
            direction = direction === 'N' ? 'S' : 'N';
        }
        return {x, y, direction};
    }
}

if (typeof module !== 'undefined') module.exports = Holdjaro;
