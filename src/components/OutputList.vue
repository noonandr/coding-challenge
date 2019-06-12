<template>
  <div>
    <p v-for="(line, key) in outputList" :key="key">
      {{ line }}
  </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      x: null,
      y: null,
      direction: null,
      compass: 'NESW',
      outputList: [],
      newGrid: [],
      shipsList: this.ships,
      lost: false
    }
  },
  props: {
    grid: Object,
    ships: Array
  },
  watch: {
    ships (newShips) {
      this.runShips()
    },
    grid (newGrid) {
      this.createGrid()
      this.runShips()
    }
  },
  methods: {
    createGrid () {
      let pointsX = this.grid.width + 1
      let pointsY = this.grid.height + 1
      this.newGrid = new Array(pointsX)
      for (var ix = 0; ix < pointsX; ix++) {
        this.newGrid[ix] = []
        for (var iy = 0; iy < pointsY; iy++) {
          this.newGrid[ix][iy] = {
            N: true,
            S: true,
            E: true,
            W: true
          }
        }
      }
    },
    checkMove (xNew, yNew, direction) {
      let xOld = this.x
      let yOld = this.y
      if (xNew > this.grid.width || xNew < 0 || yNew > this.grid.height || yNew < 0) {
        this.newGrid[xOld][yOld][direction] = false
        if (yNew === 0 && xNew < 0) {
          this.newGrid[xOld][yOld]['S'] = false
          return false
        } else if (yNew === 0 && xNew > this.grid.width) {
          this.newGrid[xOld][yOld]['S'] = false
          return false
        } else if (yNew < 0 && xNew === 0) {
          this.newGrid[xOld][yOld]['W'] = false
          return false
        } else if (yNew < 0 && xNew === this.grid.width) {
          this.newGrid[xOld][yOld]['E'] = false
          return false
        } else if (yNew === this.grid.height && xNew < 0) {
          this.newGrid[xOld][yOld]['N'] = false
          return false
        } else if (yNew === this.grid.height && xNew > this.grid.width) {
          this.newGrid[xOld][yOld]['N'] = false
          return false
        } else if (yNew > this.grid.height && xNew === 0) {
          this.newGrid[xOld][yOld]['W'] = false
          return false
        } else if (yNew > this.grid.height && xNew > this.grid.width) {
          this.newGrid[xOld][yOld]['E'] = false
          return false
        } else {
          return false
        }
      }
      return true
    },
    startLocation (coordiantesAndDirection) {
      this.lost = false
      let startX = parseInt(coordiantesAndDirection.split(' ')[0])
      let startY = parseInt(coordiantesAndDirection.split(' ')[1])
      let startDirection = coordiantesAndDirection.slice(-1)
      this.x = startX < 50 && startY < 50 && startX <= this.grid.width && startY <= this.grid.height ? startX : null
      this.y = startX < 50 && startY < 50 && startX <= this.grid.width && startY <= this.grid.height ? startY : null
      this.direction = startX < 50 && startY < 50 && startX <= this.grid.width && startY <= this.grid.height ? startDirection : null
    },
    forward () {
      if (this.newGrid[this.x][this.y][this.direction]) {
        switch (this.direction) {
          case 'N':
            if (this.checkMove(this.x, this.y + 1, this.direction)) {
              this.y = this.y + 1
            } else {
              return false
            }
            break
          case 'S':
            if (this.checkMove(this.x, this.y - 1, this.direction)) {
              this.y = this.y - 1
            } else {
              return false
            }
            break
          case 'E':
            if (this.checkMove(this.x + 1, this.y, this.direction)) {
              this.x = this.x + 1
            } else {
              return false
            }
            break
          case 'W':
            if (this.checkMove(this.x - 1, this.y, this.direction)) {
              this.x = this.x - 1
            } else {
              return false
            }
            break
        }
      }
    },
    turnLeft () {
      this.direction = this.compass[this.compass.indexOf(this.direction) - 1] || 'W'
    },
    turnRight () {
      this.direction = this.compass[this.compass.indexOf(this.direction) + 1] || 'N'
    },
    runShips () {
      this.ships.forEach(function (ship) {
        this.startLocation(ship.startLocation)
        for (var ix = 0; ix < ship.instructions.length && this.lost !== true; ix++) {
          switch (ship.instructions[ix]) {
            case 'F':
              if (this.forward() === false) {
                this.lost = true
              }
              break
            case 'L':
              this.turnLeft()
              break
            case 'R':
              this.turnRight()
              break
          }
        }
        let finalPosition = this.lost ? this.x + ' ' + this.y + ' ' + this.direction + ' ' + 'LOST' : this.x + ' ' + this.y + ' ' + this.direction
        this.outputList.push(finalPosition)
      }.bind(this))
    }
  }
}
</script>
