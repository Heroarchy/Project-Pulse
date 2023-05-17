const boardSizeX = 10;
const boardSizeY = 10;

const grid = document.getElementById("grid");

////////////////////////////////
//       Ilib functions       //
////////////////////////////////
function clamp(value, min, max) { //clamps the value so that it cant go above or below a certain value
    if (value < min) {
        value = min;
    }
    if (value > max) {
        value = max;
    }
    
    return value;
}

function randomIntegerInRange(min = 0, max = 100) { //returns a random integer within the specified range
    return Math.floor(Math.random() * max) + min;
}

function randomFloatInRange(min = 0.0, max = 100.0) { //returns a random float within the specified range
    return Math.random() * max + min;
}

function TrimDecimal(n, d) { //trims a decimal value to the specified amount of digits
    return Number(Math.round(n + "e" + d) + "e-" + d);
}

function randomHex() {
    let r, g, b;

    // Generate R, G, B values between 55 and 200
    do {
        r = Math.floor(Math.random() * 256);
    } while (r < 55 || r > 200);

    do {
        g = Math.floor(Math.random() * 256);
    } while (g < 55 || g > 200);

    do {
        b = Math.floor(Math.random() * 256);
    } while (b < 55 || b > 200);

    // Convert the RGB values to a hex string
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function wait(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

function randomProperty(obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
}

////////////////////////////////
//      Creates the grid      //
////////////////////////////////
for (let x = 0; x < boardSizeX; x++) {
  const row = document.createElement("div"); // create a new row for each y value
  row.classList.add("row");
  for (let y = 0; y < boardSizeY; y++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.id = `${x + 1}-${y + 1}`;
    
    row.appendChild(square); // add the square to the current row
    square.addEventListener("mouseover", function() {
        this.style.backgroundColor = "rgba(255, 0, 0, 0.6)";
        this.innerHTML = this.id;
    });
    square.addEventListener("mouseout", function() {
        if (square.dataset.highlighted == "false") {
            this.style.backgroundColor = "transparent";
        }
        this.innerHTML = "";
    });
    square.dataset.highlighted = "false";
  }
  grid.appendChild(row); // add the row to the grid
}

////////////////////////////////
//      Other functions      ///
////////////////////////////////
function getPlayerAtLocation(x, y) {
    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      if (player.location[0] === x && player.location[1] === y) {
        return player;
      }
    }
    return null;
}

function getAffectedLocations(centerLocation, range, direction, type) {
    let affectedLocations = [];

    switch (type) {
        
        case "straight":
            for (let i = 1; i <= range; i++) {
                let location = [...centerLocation];
                switch (direction) {
                    case "N":
                        location[1] -= i;
                        break;
                    case "NE":
                        location[0] += i;
                        location[1] -= i;
                        break;
                    case "E":
                        location[0] += i;
                        break;
                    case "SE":
                        location[0] += i;
                        location[1] += i;
                        break;
                    case "S":
                        location[1] += i;
                        break;
                    case "SW":
                        location[0] -= i;
                        location[1] += i;
                        break;
                    case "W":
                        location[0] -= i;
                        break;
                    case "NW":
                        location[0] -= i;
                        location[1] -= i;
                        break;
                }
                affectedLocations.push(location);
            }
            break;
        
        case "swing":
            let location = [...centerLocation];
            switch (direction) {
                case "N":
                    location[1] -= 1;
                    break;
                case "NE":
                    location[0] += 1;
                    location[1] -= 1;
                    break;
                case "E":
                    location[0] += 1;
                    break;
                case "SE":
                    location[0] += 1;
                    location[1] += 1;
                    break;
                case "S":
                    location[1] += 1;
                    break;
                case "SW":
                    location[0] -= 1;
                    location[1] += 1;
                    break;
                case "W":
                    location[0] -= 1;
                    break;
                case "NW":
                    location[0] -= 1;
                    location[1] -= 1;
                    break;
            }
            affectedLocations.push(location);
            for (let i = 1; i <= range; i++) {
                location = [...centerLocation];
                switch (direction) {
                    case "N":
                        for (let i = -range; i <= range; i++) {
                            for (let j = -range; j <= range; j++) {
                                if (i == centerLocation[0] && centerLocation[1] == 0) {
                                    continue;
                                }
                                if (centerLocation[1] + j < centerLocation[1]) {
                                    continue;
                                }
                                let location = [centerLocation[0] + i, centerLocation[1] + j];
                                affectedLocations.push(location);
                            }
                        }
                        break;
                    case "NE":
                        for (let i = -range; i <= range; i++) {
                            for (let j = -range; j <= range; j++) {
                                if (i == centerLocation[0] && centerLocation[1] == 0) {
                                    continue;
                                }
                                if (centerLocation[1] + j < centerLocation[1]) {
                                    continue;
                                }
                                if (centerLocation[0] + i < centerLocation[0]) {
                                    continue;
                                }
                                let location = [centerLocation[0] + i, centerLocation[1] + j];
                                affectedLocations.push(location);
                            }
                        }
                        break;
                    case "E":
                        for (let i = -range; i <= range; i++) {
                            for (let j = -range; j <= range; j++) {
                                if (i == centerLocation[0] && centerLocation[1] == 0) {
                                    continue;
                                }
                                if (centerLocation[0] + i < centerLocation[0]) {
                                    continue;
                                }
                                let location = [centerLocation[0] + i, centerLocation[1] + j];
                                affectedLocations.push(location);
                            }
                        }
                        break;
                    case "SE":
                        for (let i = -range; i <= range; i++) {
                            for (let j = -range; j <= range; j++) {
                                if (i == centerLocation[0] && centerLocation[1] == 0) {
                                    continue;
                                }
                                if (centerLocation[1] + j > centerLocation[1]) {
                                    continue;
                                }
                                if (centerLocation[0] + i < centerLocation[0]) {
                                    continue;
                                }
                                let location = [centerLocation[0] + i, centerLocation[1] + j];
                                affectedLocations.push(location);
                            }
                        }
                        break;
                    case "S":
                        for (let i = -range; i <= range; i++) {
                            for (let j = -range; j <= range; j++) {
                                if (i == centerLocation[0] && centerLocation[1] == 0) {
                                    continue;
                                }
                                if (centerLocation[1] + j > centerLocation[1]) {
                                    continue;
                                }
                                let location = [centerLocation[0] + i, centerLocation[1] + j];
                                affectedLocations.push(location);
                            }
                        }
                        break;
                    case "SW":
                        for (let i = -range; i <= range; i++) {
                            for (let j = -range; j <= range; j++) {
                                if (i == centerLocation[0] && centerLocation[1] == 0) {
                                    continue;
                                }
                                if (centerLocation[1] + j > centerLocation[1]) {
                                    continue;
                                }
                                if (centerLocation[0] + i > centerLocation[0]) {
                                    continue;
                                }
                                let location = [centerLocation[0] + i, centerLocation[1] + j];
                                affectedLocations.push(location);
                            }
                        }
                        break;
                    case "W":
                        for (let i = -range; i <= range; i++) {
                            for (let j = -range; j <= range; j++) {
                                if (i == centerLocation[0] && centerLocation[1] == 0) {
                                    continue;
                                }
                                if (centerLocation[0] + i > centerLocation[0]) {
                                    continue;
                                }
                                let location = [centerLocation[0] + i, centerLocation[1] + j];
                                affectedLocations.push(location);
                            }
                        }
                        break;
                    case "NW":
                        for (let i = -range; i <= range; i++) {
                            for (let j = -range; j <= range; j++) {
                                if (i == centerLocation[0] && centerLocation[1] == 0) {
                                    continue;
                                }
                                if (centerLocation[1] + j < centerLocation[1]) {
                                    continue;
                                }
                                if (centerLocation[0] + i > centerLocation[0]) {
                                    continue;
                                }
                                let location = [centerLocation[0] + i, centerLocation[1] + j];
                                affectedLocations.push(location);
                            }
                        }
                        break;
                }
            }
        
        case "area":
            for (let i = -range; i <= range; i++) {
                for (let j = -range; j <= range; j++) {
                    if (i == centerLocation[0] && centerLocation[1] == 0) {
                        continue;
                    }
                    let location = [centerLocation[0] + i, centerLocation[1] + j];
                    affectedLocations.push(location);
                }
            }
            break;

        case "boomerang":
            location = [...centerLocation];
            for (let i = 1; i <= range; i++) {
                location = [...centerLocation];
                switch (direction) {
                    case "N":
                        for (let i = range; i <= range; i++) {
                            for (let j = range; j <= range; j++) {
                                if (i == centerLocation[0] && centerLocation[1] == 0) {
                                    continue;
                                }
                                if (centerLocation[1] + j < centerLocation[1]) {
                                    continue;
                                }
                                let location = [centerLocation[0] + i, centerLocation[1] + j];
                                affectedLocations.push(location);
                            }
                        }
                        break;
                    case "NE":
                        for (let i = range; i <= range; i++) {
                            for (let j = range; j <= range; j++) {
                                if (i == centerLocation[0] && centerLocation[1] == 0) {
                                    continue;
                                }
                                if (centerLocation[1] + j < centerLocation[1]) {
                                    continue;
                                }
                                if (centerLocation[0] + i < centerLocation[0]) {
                                    continue;
                                }
                                let location = [centerLocation[0] + i, centerLocation[1] + j];
                                affectedLocations.push(location);
                            }
                        }
                        break;
                    case "E":
                        for (let i = range; i <= range; i++) {
                            for (let j = range; j <= range; j++) {
                                if (i == centerLocation[0] && centerLocation[1] == 0) {
                                    continue;
                                }
                                if (centerLocation[0] + i < centerLocation[0]) {
                                    continue;
                                }
                                let location = [centerLocation[0] + i, centerLocation[1] + j];
                                affectedLocations.push(location);
                            }
                        }
                        break;
                    case "SE":
                        for (let i = range; i <= range; i++) {
                            for (let j = range; j <= range; j++) {
                                if (i == centerLocation[0] && centerLocation[1] == 0) {
                                    continue;
                                }
                                if (centerLocation[1] + j > centerLocation[1]) {
                                    continue;
                                }
                                if (centerLocation[0] + i < centerLocation[0]) {
                                    continue;
                                }
                                let location = [centerLocation[0] + i, centerLocation[1] + j];
                                affectedLocations.push(location);
                            }
                        }
                        break;
                    case "S":
                        for (let i = range; i <= range; i++) {
                            for (let j = range; j <= range; j++) {
                                if (i == centerLocation[0] && centerLocation[1] == 0) {
                                    continue;
                                }
                                if (centerLocation[1] + j > centerLocation[1]) {
                                    continue;
                                }
                                let location = [centerLocation[0] + i, centerLocation[1] + j];
                                affectedLocations.push(location);
                            }
                        }
                        break;
                    case "SW":
                        for (let i = range; i <= range; i++) {
                            for (let j = range; j <= range; j++) {
                                if (i == centerLocation[0] && centerLocation[1] == 0) {
                                    continue;
                                }
                                if (centerLocation[1] + j > centerLocation[1]) {
                                    continue;
                                }
                                if (centerLocation[0] + i > centerLocation[0]) {
                                    continue;
                                }
                                let location = [centerLocation[0] + i, centerLocation[1] + j];
                                affectedLocations.push(location);
                            }
                        }
                        break;
                    case "W":
                        for (let i = range; i <= range; i++) {
                            for (let j = range; j <= range; j++) {
                                if (i == centerLocation[0] && centerLocation[1] == 0) {
                                    continue;
                                }
                                if (centerLocation[0] + i > centerLocation[0]) {
                                    continue;
                                }
                                let location = [centerLocation[0] + i, centerLocation[1] + j];
                                affectedLocations.push(location);
                            }
                        }
                        break;
                    case "NW":
                        for (let i = range; i <= range; i++) {
                            for (let j = range; j <= range; j++) {
                                if (i == centerLocation[0] && centerLocation[1] == 0) {
                                    continue;
                                }
                                if (centerLocation[1] + j < centerLocation[1]) {
                                    continue;
                                }
                                if (centerLocation[0] + i > centerLocation[0]) {
                                    continue;
                                }
                                let location = [centerLocation[0] + i, centerLocation[1] + j];
                                affectedLocations.push(location);
                            }
                        }
                        break;
                }
            }
            break;

        case "wide":
            location = [...centerLocation];
            switch (direction) {
                case "N":
                    location[1] -= 1;

                    location[0] -= i;
                    affectedLocations.push(location);
                    location[0] += i * 2;
                    affectedLocations.push(location);
                    break;
                case "NE":
                    location[0] += 1;
                    location[1] -= 1;

                    location[0] -= i;
                    location[1] -= i;
                    affectedLocations.push(location);
                    location[0] += i * 2;
                    location[1] += i * 2;
                    affectedLocations.push(location);
                    break;
                case "E":
                    location[0] += 1;

                    location[1] -= i;
                    affectedLocations.push(location);
                    location[1] += i * 2;
                    affectedLocations.push(location);
                    break;
                case "SE":
                    location[0] += 1;
                    location[1] += 1;

                    location[0] += i;
                    location[1] -= i;
                    affectedLocations.push(location);
                    location[0] -= i * 2;
                    location[1] += i * 2;
                    affectedLocations.push(location);
                    break;
                case "S":
                    location[1] += 1;

                    location[0] -= i;
                    affectedLocations.push(location);
                    location[0] += i * 2;
                    affectedLocations.push(location);
                    break;
                case "SW":
                    location[0] -= 1;
                    location[1] += 1;

                    location[0] -= i;
                    location[1] -= i;
                    affectedLocations.push(location);
                    location[0] += i * 2;
                    location[1] += i * 2;
                    affectedLocations.push(location);
                    break;
                case "W":
                    location[0] -= 1;

                    location[1] -= i;
                    affectedLocations.push(location);
                    location[1] += i * 2;
                    affectedLocations.push(location);
                    break;
                case "NW":
                    location[0] -= 1;
                    location[1] -= 1;

                    location[0] += i;
                    location[1] -= i;
                    affectedLocations.push(location);
                    location[0] -= i * 2;
                    location[1] += i * 2;
                    affectedLocations.push(location);
                    break;
            }
            break;

        case "spinslash":
            break;
    
        default:
            alert(`Invalid range shape type: ${type}`);
            break;
    }

    return affectedLocations;
}


function highlightTileAt(x, y) {
    let square = document.getElementById(`${x}-${y}`);
    square.style.backgroundColor = "rgba(255, 0, 0, 0.6)";
    square.dataset.highlighted = "true";
}

function removeHighlightTileAt(x, y) {
    let square = document.getElementById(`${x}-${y}`);
    square.style.backgroundColor = "transparent";
    square.dataset.highlighted = "false";
}

function getDistance(location1, location2) {
    const dx = location1[0] - location2[0];
    const dy = location1[1] - location2[1];
    return Math.sqrt(dx*dx + dy*dy);
}

function getPlayerByNumber(number, players) {
    for (let i = 0; i < players.length; i++) {
        if (players[i].playerNumber === number) {
            return players[i];
        }
    }
    return null;
}

function getPlayerAtLocation(x, y) {
    for (let i = 0; i < players.length; i++) {
        if (players[i].location[0] === x && players[i].location[1] === y) {
            return players[i];
        }
    }
}

function getPlayersInArea(centerX, centerY, radius) {
    let playersInArea = [];
    for (let i = 0; i < players.length; i++) {
        let dx = Math.abs(players[i].location[0] - centerX);
        let dy = Math.abs(players[i].location[1] - centerY);
        if (dx <= radius && dy <= radius) {
            let distance = getDistance(centerX, centerY, players[i].location[0], players[i].location[1]);
            if (distance <= radius) {
                playersInArea.push(players[i]);
            }
        }
    }
    return playersInArea;
}

function getAdjacentTiles(x, y) {
    let adjacentTiles = [];
    if (isValidLocation(x-1, y)) {
        adjacentTiles.push([x-1, y]);
    }
    if (isValidLocation(x+1, y)) {
        adjacentTiles.push([x+1, y]);
    }
    if (isValidLocation(x, y-1)) {
        adjacentTiles.push([x, y-1]);
    }
    if (isValidLocation(x, y+1)) {
        adjacentTiles.push([x, y+1]);
    }
    return adjacentTiles;
}

function getDiagonalTiles(x, y) {
    let diagonalTiles = [];
    if (isValidLocation(x-1, y-1)) {
        diagonalTiles.push([x-1, y-1]);
    }
    if (isValidLocation(x+1, y-1)) {
        diagonalTiles.push([x+1, y-1]);
    }
    if (isValidLocation(x-1, y+1)) {
        diagonalTiles.push([x-1, y+1]);
    }
    if (isValidLocation(x+1, y+1)) {
        diagonalTiles.push([x+1, y+1]);
    }
    return diagonalTiles;
}

function getTilesInLine(startX, startY, endX, endY) {
    let line = [];
    let dx = Math.abs(endX - startX);
    let dy = Math.abs(endY - startY);
    let sx = (startX < endX) ? 1 : -1;
    let sy = (startY < endY) ? 1 : -1;
    let err = dx - dy;
    let x = startX;
    let y = startY;
    
    while (true) {
        line.push({x: x, y: y});
      
        if (x === endX && y === endY) {
            break;
        }
      
        let e2 = 2 * err;
      
        if (e2 > -dy) {
            err -= dy;
            x += sx;
        }
      
        if (e2 < dx) {
            err += dx;
            y += sy;
        }
    }
    
    return line;
}  

function isValidLocation(x, y) {
    if (x < 0 || x >= boardSizeX || y < 0 || y >= boardSizeY) {
        return false;
    }
    
    return true;
}

function getValidMovementTiles(location, speed) {
    const validTiles = [];

    // Check tiles in all directions up to player's speed
    for (let i = 1; i <= speed; i++) {
        // Check tile above
        if (location[1] - i >= 0 && isValidLocation(location[0], location[1] - i)) {
            validTiles.push([location[0], location[1] - i]);
        }
        // Check tile below
        if (location[1] + i <= boardSizeY && isValidLocation(location[0], location[1] + i)) {
            validTiles.push([location[0], location[1] + i]);
        }
        // Check tile to left
        if (location[0] - i >= 0 && isValidLocation(location[0] - i, location[1])) {
            validTiles.push([location[0] - i, location[1]]);
        }
        // Check tile to right
        if (location[0] + i <= boardSizeX && isValidLocation(location[0] + i, location[1])) {
            validTiles.push([location[0] + i, location[1]]);
        }
    }

    return validTiles;
}

function initialTurnOrder(players) {
    // Sort players by speed, then agility
    const sortedPlayers = players.sort((a, b) => {
        if (a.speed !== b.speed) {
            return b.speed - a.speed;
        } else {
            return b.agility - a.agility;
        }
    });
  
    // Create a new array with player numbers in order
    const turnOrder = sortedPlayers.map((player) => {
        return player.number;
    });
  
    return turnOrder;
}

function isLocationOccupied(location) {
    for (let i = 0; i < players.length; i++) {
      if (players[i].location[0] === location[0] && players[i].location[1] === location[1]) {
        return true;
      }
    }
    return false;
}  

function createExplosion(location, radius) {
    // Get all the affected locations within the explosion radius
    const affectedLocations = getAffectedLocations(location, radius, "", "circle");
  
    // Iterate over the affected locations
    for (let i = 0; i < affectedLocations.length; i++) {
      const [x, y] = affectedLocations[i];
  
      // Check if there's a player at the current location
      const player = getPlayerAtLocation([x, y]);
      if (player) {
        // Apply damage to the player
        player.changeHealth(-20); // Apply 20 damage to the player
      }
  
      // Check if there's an obstacle at the current location
      const obstacle = getObstacleAtLocation([x, y]);
      if (obstacle) {
        // Apply damage to the obstacle
        obstacle.changeHealth(-10); // Apply 10 damage to the obstacle
      }
      
      // Highlight the affected tile for visual feedback
      highlightTileAt(x, y);
    }
}

function createProjectile(startLocation, endLocation, speed, damage, onHitCallback) {
    let projectile = {
        startLocation: startLocation,
        endLocation: endLocation,
        speed: speed,
        damage: damage,
        onHitCallback: onHitCallback,
        location: startLocation,
        isDone: false,
        move: function() {
            let distance = getDistance(this.startLocation, this.endLocation);
            let dx = (this.endLocation[0] - this.startLocation[0]) / distance;
            let dy = (this.endLocation[1] - this.startLocation[1]) / distance;
            this.location[0] += dx * this.speed;
            this.location[1] += dy * this.speed;
            // Check if the projectile hits the end location
            if (getDistance(this.location, this.endLocation) <= this.speed) {
                this.isDone = true;
                this.onHitCallback(this.endLocation, this.damage);
            }
        }
    };
    return projectile;
}

function canSee(player1, player2) {
    const [x1, y1] = player1.location;
    const [x2, y2] = player2.location;
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI) + 180;
    const diff = Math.abs(player1.direction - angle);
    return (diff <= player1.awareness / 2 || diff >= 360 - player1.awareness / 2);
}  

////////////////////////////////
//         Main Game         ///
////////////////////////////////
let gameType  = "sw";


if (gameType === "pg") {
    document.getElementsByTagName("title")[0].innerHTML = "Princess Game Sim";
} else if (gameType === "sw") {
    document.getElementsByTagName("title")[0].innerHTML = "Skywarrior Game Sim";
    class SkyWarrior {
        constructor(name, location, rotation, color, weapon, hp, toughness, stamina, speed, reactionTime, gemSummoning, agility, awareness, strength, accuracy, combo, playerNumber, team) {
            this.name = name;
            this.location = location;
            this.rotation = rotation;
            this.color = color;
            this.time = 0.0;
            this.weapon = weapon;
            this.maxhp = hp;
            this.hp = hp;
            this.toughness = toughness;
            this.stamina = stamina;
            this.speed = speed;
            this.reactionTime = reactionTime;
            this.gemSummoning = gemSummoning;
            this.agility = agility;
            this.awareness = awareness;
            this.strength = strength;
            this.accuracy = accuracy;
            this.combo = combo;
            this.playerNumber = playerNumber;
            this.team = team;
            this.isDead = false;
        }
      
        changeHealth(value) {
            this.hp += value;
            if (this.hp <= 0) {
                this.hp = 0;
                this.isDead = true;
            }
            if (this.hp > this.maxhp) {
                this.hp = this.maxhp;
            }
        }
      
        changeWeapon(weapon) {
            this.weapon = weapon;
        }

        knockback(distance, attackerLocation) {
            let deltaX = attackerLocation[0] - this.location[0];
            let deltaY = attackerLocation[1] - this.location[1];
            let directionX = deltaX > 0 ? 1 : -1;
            let directionY = deltaY > 0 ? 1 : -1;
            let distanceX = Math.abs(deltaX);
            let distanceY = Math.abs(deltaY);
            let newX = this.location[0] + directionX * Math.min(distance, distanceX);
            let newY = this.location[1] + directionY * Math.min(distance - Math.min(distance, distanceX), distanceY);
        
            if (isValidLocation(newX, newY)) {
                this.location = [newX, newY];
            } else {
                let remainingDistance = distance - Math.min(distance, distanceX) - Math.min(distance - Math.min(distance, distanceX), distanceY);
                this.hp -= remainingDistance;
            }
        }
      
        // method to update player card
        updatePlayerCard() {
            // Find the corresponding player card and update its stats
            const playerCard = document.querySelector(`.player-card[data-player="${this.playerNumber}"]`);
            playerCard.style.backgroundColor = this.color;

            const cardHeader = playerCard.querySelector('.card-header');
            cardHeader.querySelector('.card-name').textContent = `Player ${this.playerNumber}`;
            cardHeader.querySelector('.card-weapon').textContent = `Weapon: ${this.weapon.name}`;
            cardHeader.querySelector('.card-hp').textContent = `HP: ${this.hp}/100`;
            cardHeader.querySelector('.card-time').textContent = `Time: ${TrimDecimal(this.time, 1)}`;
          
            const cardStats = playerCard.querySelector('.card-stats');
            cardStats.querySelector('.card-stat[data-stat="toughness"]').textContent = `Toughness: ${this.toughness}`;
            cardStats.querySelector('.card-stat[data-stat="stamina"]').textContent = `Stamina: ${this.stamina}`;
            cardStats.querySelector('.card-stat[data-stat="speed"]').textContent = `Speed: ${this.speed}`;
            cardStats.querySelector('.card-stat[data-stat="reaction-time"]').textContent = `Reaction Time: ${this.reactionTime}`;
            cardStats.querySelector('.card-stat[data-stat="gem-summoning"]').textContent = `Gem Summoning: ${this.gemSummoning}`;
            cardStats.querySelector('.card-stat[data-stat="agility"]').textContent = `Agility: ${this.agility}`;
            cardStats.querySelector('.card-stat[data-stat="awareness"]').textContent = `Awareness: ${this.awareness}`;
            cardStats.querySelector('.card-stat[data-stat="strength"]').textContent = `Strength: ${this.strength}`;
            cardStats.querySelector('.card-stat[data-stat="accuracy"]').textContent = `Accuracy: ${this.accuracy}`;
            cardStats.querySelector('.card-stat[data-stat="combo"]').textContent = `Combo: ${this.combo}`;
        }

        movePlayerMarker() {
            const playerMarker = document.getElementById(`player-${this.playerNumber}`);
            if (playerMarker) {
                const offsetX = (window.innerWidth - ((boardSizeX + 2) * 50)) / 2;
                const offsetY = (window.innerHeight - ((boardSizeY + 2) * 50)) / 2;
                playerMarker.style.left = `${this.location[0] * 50 + offsetX}px`;
                playerMarker.style.top = `${this.location[1] * 50 + offsetY}px`;
                playerMarker.style.backgroundColor = this.color;
            }
        }

        rotateMarker() {
            const marker = document.getElementById(`player-${this.playerNumber}`);
            const degree = {
                "N": 0,
                "NE": 45,
                "E": 90,
                "SE": 135,
                "S": 180,
                "SW": 225,
                "W": 270,
                "NW": 315
            };
            marker.style.transform = `rotate(${degree[this.rotation]}deg)`;
        }
    }

    const weapons = {
        green: {
            name: "green",
            defence: 6,
            weight: 2,
            speed: 0,
            combo: 2,
            attacks: {
                swing: {
                    attackName: "Swing",
                    attackTime: 0.7,
                    endLag: 0.3,
                    range: 3,
                    knockback: 1,
                    stunTime: 0.5,
                    damage: 6,
                    stamina: 10,
                    attackShape: 'swing',
                    attackType: 'damage'
                },
                grab: {
                    attackName: "Grab",
                    attackTime: 0.8,
                    endLag: 0.5,
                    range: 4,
                    knockback: 0,
                    stunTime: 0.3,
                    damage: [3, 3],
                    stamina: 20,
                    attackShape: 'swing',
                    attackType: 'grab'
                },
                extend: {
                    attackName: "Extend",
                    attackTime: 1,
                    endLag: 0.8,
                    range: 6,
                    knockback: 3,
                    stunTime: 0.6,
                    damage: 9,
                    stamina: 5,
                    attackShape: 'straight',
                    attackType: 'damage'
                },
                guard: {
                    attackName: "Guard",
                    attackTime: 0.5,
                    endLag: 0.4,
                    range: 1,
                    knockback: 1,
                    stunTime: 0.8,
                    damage: 0,
                    stamina: 10,
                    attackShape: 'straight',
                    attackType: 'defence'
                }
            }
        },
        blue: {
            name: "blue",
            defence: 10,
            weight: 2,
            speed: 0,
            combo: 3,
            attacks: {
                stab: {
                    attackName: "Stab",
                    attackTime: 0.7,
                    endLag: 0.3,
                    range: 3,
                    knockback: 2,
                    stunTime: 0.5,
                    damage: 10,
                    stamina: 8,
                    attackShape: 'straight',
                    attackType: 'damage'
                },
                swing: {
                    attackName: "Swing",
                    attackTime: 0.9,
                    endLag: 0.2,
                    range: 3,
                    knockback: 3,
                    stunTime: 0.7,
                    damage: 10,
                    stamina: 8,
                    attackShape: 'swing',
                    attackType: 'damage'
                },
                throw: {
                    attackName: "Throw",
                    attackTime: 0.6,
                    endLag: 0.3,
                    range: 12,
                    knockback: 0,
                    stunTime: 0.4,
                    damage: 10,
                    stamina: 10,
                    attackShape: 'straight',
                    attackType: 'damage'
                },
                shoot: {
                    attackName: "Shoot",
                    attackTime: 0.2,
                    endLag: 0.1,
                    range: 12,
                    knockback: 0,
                    stunTime: 0,
                    damage: 4,
                    stamina: 4,
                    attackShape: 'straight',
                    attackType: 'damage'
                },
                guard: {
                    attackName: "Guard",
                    attackTime: 0.3,
                    endLag: 0.5,
                    range: 2,
                    knockback: 0,
                    stunTime: 0.6,
                    damage: 0,
                    stamina: 12,
                    attackShape: 'wide',
                    attackType: 'defence'
                }
            }
        },
        red: {
            name: "red",
            defence: 10,
            weight: 2,
            speed: 0,
            combo: 4,
            attacks: {
                swing: {
                    attackName: "Swing",
                    attackTime: 0.7,
                    endLag: 0.4,
                    range: 3,
                    knockback: 2,
                    stunTime: 0.6,
                    damage: 13,
                    stamina: 10,
                    attackShape: 'swing',
                    attackType: 'damage'
                },
                spinslash: {
                    attackName: "Spin Slash",
                    attackTime: 0.4,
                    endLag: 0.2,
                    range: 3,
                    knockback: 1,
                    stunTime: 0.3,
                    damage: 9,
                    stamina: 20,
                    attackShape: 'spinslash',
                    attackType: 'damage'
                },
                spin: {
                    attackName: "Spin",
                    attackTime: 0.8,
                    endLag: 0.3,
                    range: 3,
                    knockback: 4,
                    stunTime: 0.6,
                    damage: 13,
                    stamina: 15,
                    attackShape: 'area',
                    attackType: 'damage'
                },
                shoot: {
                    attackName: "Shoot",
                    attackTime: 0.2,
                    endLag: 0.1,
                    range: 7,
                    knockback: 1,
                    stunTime: 0,
                    damage: 3,
                    stamina: 8,
                    attackShape: 'straight',
                    attackType: 'damage'
                },
                guard: {
                    attackName: "Guard",
                    attackTime: 0.3,
                    endLag: 0.5,
                    range: 2,
                    knockback: 0,
                    stunTime: 0.8,
                    damage: 0,
                    stamina: 10,
                    attackShape: 'wide',
                    attackType: 'defence'
                }
            }
        },
        black: {
            name: "black",
            defence: 2,
            weight: 1,
            speed: 0,
            combo: 1,
            attacks: {
                forwardthrow: {
                    attackName: "Forward Throw",
                    attackTime: 0.4,
                    endLag: 0.3,
                    range: 6,
                    knockback: 1,
                    stunTime: 1.2,
                    damage: 7,
                    stamina: 8,
                    attackShape: 'straight',
                    attackType: 'damage'
                },
                curvethrow: {
                    attackName: "Curve Throw",
                    attackTime: 0.4,
                    endLag: 0.3,
                    range: 6,
                    knockback: 1,
                    stunTime: 1.2,
                    damage: 7,
                    stamina: 8,
                    attackShape: 'boomerang',
                    attackType: 'damage'
                },
                spiralthrow: {
                    attackName: "Spiral Throw",
                    attackTime: 0.6,
                    endLag: 0.3,
                    range: 6,
                    knockback: 1,
                    stunTime: 1.2,
                    damage: 9,
                    stamina: 8,
                    attackShape: 'area',
                    attackType: 'damage'
                },
                hit: {
                    attackName: "Hit",
                    attackTime: 0.4,
                    endLag: 0.3,
                    range: 1,
                    knockback: 1,
                    stunTime: 0.8,
                    damage: 10,
                    stamina: 10,
                    attackShape: 'straight',
                    attackType: 'damage'
                },
                guard: {
                    attackName: "Guard",
                    attackTime: 0.6,
                    endLag: 0.4,
                    range: 1,
                    knockback: 0,
                    stunTime: 0.3,
                    damage: 0,
                    stamina: 15,
                    attackShape: 'straight',
                    attackType: 'defence'
                }
            }
        },
        white: {
            name: "white",
            defence: 15,
            weight: 2,
            speed: 0,
            combo: 2,
            attacks: {
                throw: {
                    attackName: "Throw",
                    attackTime: 0.5,
                    endLag: 0.5,
                    range: 4,
                    knockback: 2,
                    stunTime: 0.7,
                    damage: 7,
                    stamina: 10,
                    attackShape: 'straight',
                    attackType: 'damage'
                },
                slam: {
                    attackName: "Slam",
                    attackTime: 0.7,
                    endLag: 1.2,
                    range: 1,
                    knockback: 2,
                    stunTime: 0.8,
                    damage: 10,
                    stamina: 10,
                    attackShape: 'straight',
                    attackType: 'damage'
                },
                guard: {
                    attackName: "Guard",
                    attackTime: 0.4,
                    endLag: 0.8,
                    range: 1,
                    knockback: 1,
                    stunTime: 1.3,
                    damage: 0,
                    stamina: 5,
                    attackShape: 'straight',
                    attackType: 'defence'
                }
            }
        },
        gray: {
            name: "gray",
            defence: 8,
            weight: 2,
            speed: 0,
            combo: 5,
            attacks: {
                slash: {
                    attackName: "Slash",
                    attackTime: 0.9,
                    endLag: 0.3,
                    range: 4,
                    knockback: 0,
                    stunTime: 0.4,
                    damage: 12,
                    stamina: 10,
                    attackShape: 'swing',
                    attackType: 'damage'
                },
                stab: {
                    attackName: "Stab",
                    attackTime: 0.7,
                    endLag: 0.2,
                    range: 4,
                    knockback: 0,
                    stunTime: 0.5,
                    damage: 15,
                    stamina: 8,
                    attackShape: 'straight',
                    attackType: 'piercing'
                },
                guard: {
                    attackName: "Guard",
                    attackTime: 0.3,
                    endLag: 0.5,
                    range: 1,
                    knockback: 0,
                    stunTime: 0.7,
                    damage: 0,
                    stamina: 8,
                    attackShape: 'straight',
                    attackType: 'defence'
                }
            }
        },
        orange: {
            name: "orange",
            defence: 5,
            weight: 2,
            speed: 0,
            combo: 3,
            attacks: {
                swing: {
                    attackName: "Swing",
                    attackTime: 0.7,
                    endLag: 0.3,
                    range: 3,
                    knockback: 2,
                    stunTime: 0.5,
                    damage: 6,
                    stamina: 10,
                    attackShape: 'swing',
                    attackType: 'damage'
                },
                poke: {
                    attackName: "Poke",
                    attackTime: 0.4,
                    endLag: 0.4,
                    range: 3,
                    knockback: 2,
                    stunTime: 0.5,
                    damage: 4,
                    stamina: 6,
                    attackShape: 'straight',
                    attackType: 'damage'
                },
                guard: {
                    attackName: "Guard",
                    attackTime: 0.5,
                    endLag: 0.4,
                    range: 1,
                    knockback: 0,
                    stunTime: 0.5,
                    damage: 0,
                    stamina: 8,
                    attackShape: 'straight',
                    attackType: 'defence'
                }
            }
        },
        brown: {
            name: "brown",
            defence: 3,
            weight: 3,
            speed: 0,
            combo: 1,
            attacks: {
                swing: {
                    attackName: "Swing",
                    attackTime: 1.2,
                    endLag: 0.7,
                    range: 2,
                    knockback: 4,
                    stunTime: 1.5,
                    damage: 14,
                    stamina: 20,
                    attackShape: 'swing',
                    attackType: 'damage'
                },
                slam: {
                    attackName: "Slam",
                    attackTime: 0.8,
                    endLag: 0.9,
                    range: 2,
                    knockback: 2,
                    stunTime: 2,
                    damage: 18,
                    stamina: 15,
                    attackShape: 'straight',
                    attackType: 'damage'
                },
                guard: {
                    attackName: "Guard",
                    attackTime: 0.8,
                    endLag: 0.4,
                    range: 1,
                    knockback: 0,
                    stunTime: 0.3,
                    damage: 0,
                    stamina: 20,
                    attackShape: 'straight',
                    attackType: 'defence'
                }
            }
        },
        pink: {
            name: "pink",
            defence: 4,
            weight: 3,
            speed: 0,
            combo: 1,
            attacks: {
                swing: {
                    attackName: "Swing",
                    attackTime: 1.2,
                    endLag: 0.7,
                    range: 2,
                    knockback: 3,
                    stunTime: 1.3,
                    damage: 18,
                    stamina: 20,
                    attackShape: 'swing',
                    attackType: 'damage'
                },
                chop: {
                    attackName: "Chop",
                    attackTime: 1.2,
                    endLag: 0.8,
                    range: 2,
                    knockback: 1,
                    stunTime: 0.8,
                    damage: 21,
                    stamina: 10,
                    attackShape: 'straight',
                    attackType: 'damage'
                },
                guard: {
                    attackName: "Guard",
                    attackTime: 0.8,
                    endLag: 0.4,
                    range: 1,
                    knockback: 0,
                    stunTime: 0.3,
                    damage: 0,
                    stamina: 15,
                    attackShape: 'straight',
                    attackType: 'defence'
                }
            }
        },
        yellow: {
            name: "yellow",
            defence: 4,
            weight: 2,
            speed: 0,
            combo: 2,
            attacks: {
                swing: {
                    attackName: "Swing",
                    attackTime: 0.6,
                    endLag: 0.4,
                    range: 2,
                    knockback: 1,
                    stunTime: 0.5,
                    damage: 8,
                    stamina: 8,
                    attackShape: 'swing',
                    attackType: 'damage'
                },
                guard: {
                    attackName: "Guard",
                    attackTime: 0.4,
                    endLag: 0.2,
                    range: 1,
                    knockback: 0,
                    stunTime: 0.4,
                    damage: 0,
                    stamina: 5,
                    attackShape: 'straight',
                    attackType: 'defence'
                }
            }
        },
        purple: {
            name: "purple",
            defence: 8,
            weight: 2,
            speed: 0,
            combo: 4,
            attacks: {
                uppercut: {
                    attackName: "Uppercut",
                    attackTime: 0.4,
                    endLag: 0.5,
                    range: 1,
                    knockback: 1,
                    stunTime: 0.6,
                    damage: 17,
                    stamina: 12,
                    attackShape: 'straight',
                    attackType: 'damage'
                },
                hook: {
                    attackName: "Hook",
                    attackTime: 0.6,
                    endLag: 0.3,
                    range: 1,
                    knockback: 1,
                    stunTime: 0.6,
                    damage: 15,
                    stamina: 10,
                    attackShape: 'swing',
                    attackType: 'damage'
                },
                punch: {
                    attackName: "Punch",
                    attackTime: 0.6,
                    endLag: 0.3,
                    range: 2,
                    knockback: 1,
                    stunTime: 0.6,
                    damage: 13,
                    stamina: 10,
                    attackShape: 'straight',
                    attackType: 'damage'
                },
                guard: {
                    attackName: "Guard",
                    attackTime: 0.6,
                    endLag: 0.5,
                    range: 1,
                    knockback: 0,
                    stunTime: 0.4,
                    damage: 0,
                    stamina: 8,
                    attackShape: 'straight',
                    attackType: 'defence'
                }
            }
        },
    }

    // Create 8 SkyWarrior instances with random stats
    const players = [];
    for (let i = 1; i <= 8; i++) {
        const player = new SkyWarrior(`Player ${i}`, [i, 1], (i > 4) ? "N" : "S", randomHex(), randomProperty(weapons), 100, randomIntegerInRange(0, 15), randomIntegerInRange(100, 500), randomIntegerInRange(1, 9), TrimDecimal(randomFloatInRange(0.1, 1.2), 1), randomIntegerInRange(1, 5), randomIntegerInRange(1, 19), randomIntegerInRange(0, 270), randomIntegerInRange(1, 5), randomIntegerInRange(1, 9), randomIntegerInRange(1, 9), i, (i < 5) ? "team1" : "team2");
        players.push(player);
    }

    // Create player markers
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        const marker = document.createElement("div");
        marker.innerHTML = player.name;
        marker.classList.add("player-marker");
        marker.id = `player-${i+1}`;
        marker.style.backgroundColor = player.color;
        document.getElementById("grid").appendChild(marker);
    }

//#region MOVEMENT

    // Add an event listener to each player marker
    const playerMarkers = document.querySelectorAll(".player-marker");
    playerMarkers.forEach(marker => {
        
        marker.addEventListener("click", function() {
            const playerId = marker.getAttribute("id").slice(7); // Get the player id from the marker id
            const player = getPlayerByNumber(parseInt(playerId), players); // Get the player object using the id
            
            // Calculate the valid movement tiles
            const validTiles = getValidMovementTiles(player.location, player.speed);

            console.log(validTiles);
            
            // Highlight the valid tiles
            validTiles.forEach(tile => {
                if (isValidLocation(tile[0], tile[1])) {
                    console.log(tile[0], tile[1]);
                    highlightTileAt(tile[0], tile[1]);
                }
            });
            
            // Add a click event listener to each valid tile
            validTiles.forEach(tile => {
                const tileElement = document.getElementById(`${tile[0]}-${tile[1]}`);
                const clickEventFn = () => clickHandler(player, validTiles, tile);


                const clickHandler = function(player, validTiles, tile) {
                    if (player != null) {
                        // Move the player to the clicked tile
                        player.location = [tile[0], tile[1]];
                        player.movePlayerMarker();
                        player.time += 1 - (player.speed * 0.1);
                        player.updatePlayerCard();
                        
                        // Remove the click event listeners from the valid tiles
                        validTiles.forEach(tile => {
                            const tileElement = document.getElementById(`${tile[0]}-${tile[1]}`);
                            tileElement.removeEventListener("click", clickEventFn);
                            removeHighlightTileAt(tile[0], tile[1]);
                        });

                        const allTiles = document.querySelectorAll('.square');
                        allTiles.forEach(tileElement => {
                            const tileId = tileElement.getAttribute("id").split('-');
                            const tile = [parseInt(tileId[0]), parseInt(tileId[1])];
                            tileElement.removeEventListener("click", clickEventFn);
                            removeHighlightTileAt(tile[0], tile[1]);
                        });

                        player = null;
                    }
                }


                tileElement.addEventListener("click", clickEventFn);
            });
        });
    });
//#endregion

    // Update the player cards with the initial stats and moves the player markers to there initial position
    players.forEach(player => {
        player.updatePlayerCard();
        player.movePlayerMarker();
        player.rotateMarker();
    });

    // Change The Position O the players

    for (let i = 4; i < 8; i++) {
        players[i - 4].location = [i, 1];
        players[i - 4].movePlayerMarker();
    }
    
    for (let i = 4; i < 8; i++) {
        players[i].location = [i, boardSizeY];
        players[i].movePlayerMarker();
    }
        
    // players[0].location = [4, 1];
    // players[0].movePlayerMarker();
    // players[1].location = [5, 1];
    // players[1].movePlayerMarker();
    // players[2].location = [6, 1];
    // players[2].movePlayerMarker();
    // players[3].location = [7, 1];
    // players[3].movePlayerMarker();
    // players[4].location = [4, boardSizeY];
    // players[4].movePlayerMarker();
    // players[5].location = [5, boardSizeY];
    // players[5].movePlayerMarker();
    // players[6].location = [6, boardSizeY];
    // players[6].movePlayerMarker();
    // players[7].location = [7, boardSizeY];
    // players[7].movePlayerMarker();

    function gameLoop() {
        
    }

    // while (true) {
    //     gameLoop();
    // }

} else {
    alert(`Unknown game type "${gameType}"`);
}