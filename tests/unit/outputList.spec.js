import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import OutputList from '@/components/OutputList.vue'

/* eslint-disable no-unused-expressions */

describe('OutputList.vue', () => {
  const outputList = shallowMount(OutputList)
  const grid = {
    width: 5,
    height: 3
  }
  const ships = [
    {
      startLocation: '1 1 E',
      instructions: 'RFRFRFRF'
    },
    {
      startLocation: '3 2 N',
      instructions: 'FRRFLLFFRRFLL'
    },
    {
      startLocation: '0 3 W',
      instructions: 'LLFFFLFLFL'
    }
  ]

  outputList.setProps({ grid: grid })
  outputList.setProps({ ships: ships })
  outputList.vm.createGrid()

  describe('createGrid', () => {
    it('should create a grid with the properties passed into the component', () => {
      outputList.vm.createGrid()
      expect(outputList.vm.newGrid).to.not.be.empty
      expect(outputList.vm.newGrid[0][0]['N']).to.equal(true)
      expect(outputList.vm.newGrid[0][3]['N']).to.equal(true)
      expect(outputList.vm.newGrid[5][0]['N']).to.equal(true)
      expect(outputList.vm.newGrid[5][3]['N']).to.equal(true)
    })
  })

  describe('startLocation', () => {
    it('should set the x, y and direction to expected values', () => {
      outputList.vm.startLocation('1 2 N')
      expect(outputList.vm.x).to.equal(1)
      expect(outputList.vm.y).to.equal(2)
      expect(outputList.vm.direction).to.equal('N')
    })
    it('should set the x, y and direction to expected values if on the edge of the grid', () => {
      outputList.vm.startLocation('5 3 N')
      expect(outputList.vm.x).to.equal(5)
      expect(outputList.vm.y).to.equal(3)
      expect(outputList.vm.direction).to.equal('N')
    })
    it('should set the values for x, y and direction to null if statrting outside of the maxium size of cooridates', () => {
      outputList.vm.startLocation('51 51 N')
      expect(outputList.vm.x).to.equal(null)
      expect(outputList.vm.y).to.equal(null)
      expect(outputList.vm.direction).to.equal(null)
    })
    it('should set the values for x, y and direction to null if statrting outside of the grid', () => {
      outputList.vm.startLocation('6 3 N')
      expect(outputList.vm.x).to.equal(null)
      expect(outputList.vm.y).to.equal(null)
      expect(outputList.vm.direction).to.equal(null)
    })
    it('should set the values for x, y and direction to null if statrting outside of the grid', () => {
      outputList.vm.startLocation('5 4 N')
      expect(outputList.vm.x).to.equal(null)
      expect(outputList.vm.y).to.equal(null)
      expect(outputList.vm.direction).to.equal(null)
    })
  })

  describe('forward', () => {
    outputList.vm.createGrid()
    it('should set the y to 3 when facing north and moving forward', () => {
      outputList.vm.startLocation('2 1 N')
      outputList.vm.forward()
      expect(outputList.vm.x).to.equal(2)
      expect(outputList.vm.y).to.equal(2)
      expect(outputList.vm.direction).to.equal('N')
    })
    it('should set the y to 1 when facing south and moving forward', () => {
      outputList.vm.startLocation('2 2 S')
      outputList.vm.forward()
      expect(outputList.vm.x).to.equal(2)
      expect(outputList.vm.y).to.equal(1)
      expect(outputList.vm.direction).to.equal('S')
    })
    it('should set the x to 3 when facing east and moving forward', () => {
      outputList.vm.startLocation('2 2 E')
      outputList.vm.forward()
      expect(outputList.vm.x).to.equal(3)
      expect(outputList.vm.y).to.equal(2)
      expect(outputList.vm.direction).to.equal('E')
    })
    it('should set the x to 1 when facing west and moving forward', () => {
      outputList.vm.startLocation('2 2 W')
      outputList.vm.forward()
      expect(outputList.vm.x).to.equal(1)
      expect(outputList.vm.y).to.equal(2)
      expect(outputList.vm.direction).to.equal('W')
    })
  })

  describe('forward lost', () => {
    it('should be in the same position when starting in the bottom left corner and facing south', () => {
      outputList.vm.startLocation('0 0 S')
      outputList.vm.forward()
      expect(outputList.vm.x).to.equal(0)
      expect(outputList.vm.y).to.equal(0)
      expect(outputList.vm.direction).to.equal('S')
    })
    it('should be in the same position when starting in the bottom left corner and facing west', () => {
      outputList.vm.startLocation('0 0 W')
      outputList.vm.forward()
      expect(outputList.vm.x).to.equal(0)
      expect(outputList.vm.y).to.equal(0)
      expect(outputList.vm.direction).to.equal('W')
    })
    it('should be in the same position when starting in the bottom right corner and facing south', () => {
      outputList.vm.startLocation('5 0 S')
      outputList.vm.forward()
      expect(outputList.vm.x).to.equal(5)
      expect(outputList.vm.y).to.equal(0)
      expect(outputList.vm.direction).to.equal('S')
    })
    it('should be in the same position when starting in the bottom right corner and facing west', () => {
      outputList.vm.startLocation('5 0 E')
      outputList.vm.forward()
      expect(outputList.vm.x).to.equal(5)
      expect(outputList.vm.y).to.equal(0)
      expect(outputList.vm.direction).to.equal('E')
    })
    it('should be in the same position when starting in the top left corner and facing north', () => {
      outputList.vm.startLocation('0 3 N')
      outputList.vm.forward()
      expect(outputList.vm.x).to.equal(0)
      expect(outputList.vm.y).to.equal(3)
      expect(outputList.vm.direction).to.equal('N')
    })
    it('should be in the same position when starting in the top left corner and facing west', () => {
      outputList.vm.startLocation('0 3 W')
      outputList.vm.forward()
      expect(outputList.vm.x).to.equal(0)
      expect(outputList.vm.y).to.equal(3)
      expect(outputList.vm.direction).to.equal('W')
    })
    it('should be in the same position when starting in the top right corner and facing north', () => {
      outputList.vm.startLocation('5 3 N')
      outputList.vm.forward()
      expect(outputList.vm.x).to.equal(5)
      expect(outputList.vm.y).to.equal(3)
      expect(outputList.vm.direction).to.equal('N')
    })
    it('should be in the same position when starting in the top right corner and facing east', () => {
      outputList.vm.startLocation('5 3 E')
      outputList.vm.forward()
      expect(outputList.vm.x).to.equal(5)
      expect(outputList.vm.y).to.equal(3)
      expect(outputList.vm.direction).to.equal('E')
    })
  })

  describe('checkMove', () => {
    it('if a valid move is passed it should return true', () => {
      outputList.vm.startLocation('5 3 S')
      expect(outputList.vm.checkMove(4, 3, 'S')).to.be.true
    })
    it('if an invalid move is passed it should be retrun false', () => {
      outputList.vm.startLocation('5 3 N')
      expect(outputList.vm.checkMove(6, 3, 'N')).to.be.false
    })
    it('if moving off the bottom right edge of the board facing W it should return false and set west and south for that point to false', () => {
      outputList.vm.startLocation('0 0 W')
      expect(outputList.vm.checkMove(-1, 0, 'W')).to.be.false
      expect(outputList.vm.newGrid[0][0]['S']).to.equal(false)
      expect(outputList.vm.newGrid[0][0]['W']).to.equal(false)
    })
    it('if moving off the bottom right edge of the board facing S it should return false and set west and south for that point to false', () => {
      outputList.vm.startLocation('0 0 S')
      expect(outputList.vm.checkMove(0, -1, 'S')).to.be.false
      expect(outputList.vm.newGrid[0][0]['S']).to.equal(false)
      expect(outputList.vm.newGrid[0][0]['W']).to.equal(false)
    })
    it('if moving off the bottom left edge of the board facing E it should return false and set west and south for that point to false', () => {
      outputList.vm.startLocation('5 0 E')
      expect(outputList.vm.checkMove(6, 0, 'E')).to.be.false
      expect(outputList.vm.newGrid[5][0]['S']).to.equal(false)
      expect(outputList.vm.newGrid[5][0]['E']).to.equal(false)
    })
    it('if moving off the bottom left edge of the board facing S it should return false and set west and south for that point to false', () => {
      outputList.vm.startLocation('5 0 S')
      expect(outputList.vm.checkMove(0, -1, 'S')).to.be.false
      expect(outputList.vm.newGrid[5][0]['S']).to.equal(false)
      expect(outputList.vm.newGrid[5][0]['E']).to.equal(false)
    })
    it('if moving off the bottom right edge of the board facing W it should return false and set west and south for that point to false', () => {
      outputList.vm.startLocation('0 3 W')
      expect(outputList.vm.checkMove(-1, 3, 'W')).to.be.false
      expect(outputList.vm.newGrid[0][3]['N']).to.equal(false)
      expect(outputList.vm.newGrid[0][3]['W']).to.equal(false)
    })
    it('if moving off the bottom right edge of the board facing S it should return false and set west and south for that point to false', () => {
      outputList.vm.startLocation('0 3 W')
      expect(outputList.vm.checkMove(0, -1, 'N')).to.be.false
      expect(outputList.vm.newGrid[0][3]['N']).to.equal(false)
      expect(outputList.vm.newGrid[0][3]['W']).to.equal(false)
    })
    it('if moving off the bottom right edge of the board facing W it should return false and set west and south for that point to false', () => {
      outputList.vm.startLocation('5 3 W')
      expect(outputList.vm.checkMove(6, 3, 'W')).to.be.false
      expect(outputList.vm.newGrid[5][3]['N']).to.equal(false)
      expect(outputList.vm.newGrid[5][3]['W']).to.equal(false)
    })
    it('if moving off the bottom right edge of the board facing S it should return false and set west and south for that point to false', () => {
      outputList.vm.startLocation('5 3 W')
      expect(outputList.vm.checkMove(5, 4, 'N')).to.be.false
      expect(outputList.vm.newGrid[5][3]['N']).to.equal(false)
      expect(outputList.vm.newGrid[5][3]['W']).to.equal(false)
    })
  })

  describe('turnLeft', () => {
    it('should be facing W if it starts facing N and turns left', () => {
      outputList.vm.startLocation('0 0 N')
      outputList.vm.turnLeft()
      expect(outputList.vm.direction).to.equal('W')
    })
    it('should be facing E if it starts facing S and turns left', () => {
      outputList.vm.startLocation('0 0 S')
      outputList.vm.turnLeft()
      expect(outputList.vm.direction).to.equal('E')
    })
    it('should be facing N if it starts facing E and turns left', () => {
      outputList.vm.startLocation('0 0 E')
      outputList.vm.turnLeft()
      expect(outputList.vm.direction).to.equal('N')
    })
    it('should be facing S if it starts facing W and turns left', () => {
      outputList.vm.startLocation('0 0 W')
      outputList.vm.turnLeft()
      expect(outputList.vm.direction).to.equal('S')
    })
  })

  describe('turnRight', () => {
    it('should be facing E if it starts facing N and turns right', () => {
      outputList.vm.startLocation('0 0 N')
      outputList.vm.turnRight()
      expect(outputList.vm.direction).to.equal('E')
    })
    it('should be facing W if it starts facing S and turns right', () => {
      outputList.vm.startLocation('0 0 S')
      outputList.vm.turnRight()
      expect(outputList.vm.direction).to.equal('W')
    })
    it('should be facing S if it starts facing E and turns right', () => {
      outputList.vm.startLocation('0 0 E')
      outputList.vm.turnRight()
      expect(outputList.vm.direction).to.equal('S')
    })
    it('should be facing N if it starts facing W and turns right', () => {
      outputList.vm.startLocation('0 0 W')
      outputList.vm.turnRight()
      expect(outputList.vm.direction).to.equal('N')
    })
  })

  describe('runShips', () => {
    it('should return expected list when runShips is called', () => {
      outputList.vm.runShips()
    })
  })
})
