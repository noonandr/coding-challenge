import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import OutputList from '@/components/OutputList.vue'

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

  describe('createGrid', () => {
    outputList.vm.createGrid()
  })

  describe('startLocation', () => {
    it('should set the x, y and direction to expected values', () => {
      outputList.vm.startLocation('1 2 N')
      expect(outputList.vm.x).to.equal(1)
      expect(outputList.vm.y).to.equal(2)
      expect(outputList.vm.direction).to.equal('N')
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
    it('should move if move is allowed', () => {
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
