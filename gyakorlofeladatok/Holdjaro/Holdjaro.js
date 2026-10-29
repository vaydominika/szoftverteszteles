class Holdjaro {
    constructor(options = {}) {
        this.x = options.x;
        this.y = options.y;
        this.direction = options.direction;
        this.width = options.width ?? 8;
        this.height = options.height ?? 8;
        this.obstacles = options.obstacles ?? [];

    }

    getPosition() { return {x: this.x, y: this.y, direction: this.direction}; }

    execute(commands) {
        for (const [commandIndex, command] of [...commands].entries()) {
            const before = this.getPosition();
if (command === 'f' && this.direction === 'N') this.y -= 1;
if (command === 'b' && this.direction === 'N') this.y += 1;
if (command === 'f' && this.direction === 'E') this.x += 1;
if (command === 'b' && this.direction === 'E') this.x -= 1;
if (command === 'f' && this.direction === 'S') this.y += 1;
if (command === 'b' && this.direction === 'S') this.y -= 1;
if (command === 'f' && this.direction === 'W') this.x -= 1;
if (command === 'b' && this.direction === 'W') this.x += 1;
if (command === 'r') this.direction = ['N', 'E', 'S', 'W'][(['N', 'E', 'S', 'W'].indexOf(this.direction) + 1) % 4];
if (command === 'l') this.direction = ['N', 'E', 'S', 'W'][(['N', 'E', 'S', 'W'].indexOf(this.direction) + 3) % 4];
if (this.x > this.width) this.x = 1;
if (this.x < 1) this.x = this.width;
if (this.y < 1) { this.y = 1; this.x = (this.x - 1 + this.width / 2) % this.width + 1; this.direction = this.direction === 'N' ? 'S' : 'N'; }
if (this.y > this.height) { this.y = this.height; this.x = (this.x - 1 + this.width / 2) % this.width + 1; this.direction = this.direction === 'N' ? 'S' : 'N'; }
            if ((command === 'f' || command === 'b') && this.obstacles.some(([x, y]) => x === this.x && y === this.y)) {
                const obstacle = {x: this.x, y: this.y, commandIndex};
                this.x = before.x;
                this.y = before.y;
                this.direction = before.direction;
                return {position: this.getPosition(), obstacle};
            }
        }
        return {position: this.getPosition(), obstacle: null};
    }
}
if (typeof module !== 'undefined') module.exports = Holdjaro;
