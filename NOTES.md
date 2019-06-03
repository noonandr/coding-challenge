# EPIC NOTES

## Epic Title: Survey Ships

## Breakdown

### TERMINOLOGY

Control Station = issues instructions
Grid = scope of coordinates
Ship Position = x-coordinate y-coordinate and direction
Grid Point = grid coordinates
Instruction String = series of L, R and F instructions

### INSTRUCTIONS

L = turn left 90 deg
R = turn right 90 deg
F = move one space forward

Instruction String = series of L, R and F commands

Orientation = N / S / E / W

Current grid position = (x, y)
N = (x, y+1)
S = (x, y-1)
E = (x+1, y)
W = (x-1, y)

### REQUIREMENTS

Summary - ships are placed on a predefine grid and given a set of instructions sequentially. The output is the eventual position and state of those ships.

If ship is lost off the edge of the grid then the space should recorded as 'LOST'

If the ship is lost and another ship attempts to go off the world then that ship should not perform that move.

This means that that move is ignored but further moves in that instruction string should be performed.

The grid is 'rectangular and bounded'. Therefore if a ship falls off the north east edge when moving east it should be able to alert future ships that both moving east and north from this position is an invalid move.

Also the wording refers to a move off the grid point. This infers any move and not just the move that results in the ship being lost should be ignored if it would result in the ship being lost from that Grid Point.

Therefore will need to check when lost if the ship is on a corner and the subsequent direction would result in the ship being LOST. Though this doesn't really comply with the impression I have that the ships are not aware of the grid they are moving on.


### INPUTS

Set A - 1 input for Grid size (single input)

Set B - 2 inputs per ship (repeatable, start position and instructions)

Input A1 = is size of world. Expected input integer then space then integer e.g. '5 3'.

Input B1 = ship start position. Two coordinates and direction e.g. '1 1 E'

Input B2 = a string series of instructions e.g. 'RFRFRFRF'

Ship instructions should be done sequentially i.e. ship a, then ship b etc

Max coordinate value = 50

The word 'coordinate' can be used to refer to a pair of coordinates or to one coordinate. Given that the word 'coordinates' in the instructions is used to refer to a pair I will assume that this means that the x value for a coordinate can not be greater than the integer 50 and the y value for a coordinate.

As the text states the value can not be greater than 50 there are 51 possible coordinates as a valid value would be 0.

Instruction String should be less that 100 i.e. should not be greater than 99

### OUTPUTS

Output should be array of strings. String should be x-coordinate y-coordinate and direction

If the ship is lost then 'LOST' should be added to the end of the string.

e.g. 

    1 1 E
    3 3 N LOST
    2 3 S

## OTHER NOTES

It is not clear if it is possible for ships to collide. A ship has a final position and ship commands are process in sequence. Therefore a ship could be assumed to be on the grid in a stationary position once it's moves have finished. Therefore a check could be made on a move to see if the ship has collided with a previous ship. This does assume that two ships cannot occupy the same coordinate.

If two ships collide then is it fair to assume that they both sink and make the grid point empty again.

It is not clear how to handle a start position if it is not inside the grid and so what should the output be. What should the UI display.

Given that the start position can be outside the grid then is it logical to return an invalid grid position in the output list. Expect that that should be a null null LOST or just LOST as the ship never started in a valid position. UI can stop user from setting a value outside of the grid but output must be able to handle case where invalid input results in just returning LOST with no coordinates in such a situation as function should make sense absent of a UI. Given the wording it does not make sense to return a value outside the known grid.

The max value of a coordinate is 50, therefore the grid should not be more than 50 and no move should be more than 50. If a grid cannot be larger than does a function need to check if an invalid move is greater than 50 or should the grid be the limiting factor.

## UI OUTLINE

* Instructions suggest actions of inputs then outputs.
* UI could be input screen with action button leading to output screen
* State can be stored so that user can go back to input screen with past input commands
* As the bounding of the grid is required as each set of inputs it is fair to assume that each gird and set of input commands are new even if the value of the gird is identical to the last grid
* Input to set grid can be two separate inputs
* Input is limited to 50 therefore simplest and least error handling UI would be dropdown with values 0 to 50
* Initial position of ship can be set using a dropdown for x, y and radio buttons for direction
* Input for the Instruction String could be text field / textarea as limited to 99 characters
* Input buttons could be used for rotating left or right and forward move when creating the Instruction String
* Quicker to test out textarea but far more error handling. Only error handling required with buttons is if the string exceeds the 99 character limit
* The instructions state that the Instruction String should be a series of letters but the wording does not suggest that this could limit the UI to a text input
* Buttons will be needed to add and remove sets of ship instructions
* Button to carry out actions
* Output should be the resulting grid then the list the output strings
* Grid on top of the list of output strings for mobile
* When screen is large enough then grid on the left and list output strings on the right


## STRATEGY

* Assume main component is simply a component that outputs the result of the expected inputs
* Write tests for output component
* Create output component to pass the tests
* Use that output component as the list of output strings
* This will fill the primary requirements before adding the bulk of the UI that is not necessary
* Create button that passes hardcoded data to output component
* Create input related elements
* Create input related components
* Create input page
* Wire inputs to to pass inputs to out component
* This fills all requirements
* Create transition from input page to output page
* Create grid component
* Add grid to output page
* Unit tests for components other than the main output would take too long given the constraint of a few hours
* Completing a polished output of the UI will also likely go beyond the few hour constraint
* I may continue past the constraint of a few hours to finish the exercise
* The stories below are outlined before starting
* Given I expect the full UI outlined above to not be achieved in a few hours the stories below are not likely to be completed in the same time constraint


## STORIES

    SS-001 - create Vue scaffolding

    SS-002 - create basic readme

    SS-003 - create SurveyShips view

    SS-004 - write tests for OutputList component

    SS-005 - create OutputList component

    SS-006 - create store for ships


    SS-007 - create ShipInputs component in SurveyShips


    SS-008 - create SendTheShips component and wire to OutputList


    SS-009 - create GridCoordinateInput component

    SS-010 - create GridDirectionInput component

    SS-011 - create GridDirection component

    SS-012 - create ShipInstructionInput component

    SS-013 - create ShipInstructionInputs component

    SS-014 - create ShipInstructionOutput component


    SS-015 - create GridSize component

    SS-016 - create ShipStart component

    SS-017 - create ShipInstructions component


    SS-018 - create ShipAdd component

    SS-019 - create ShipRemove component


    SS-020 - integrate	ShipAdd and ShipRemove component


    SS-021 - create GridCell component

    SS-022 - create Grid component

    SS-023 - create Output view

    SS-024 - integrate Grid and OutputList into Output view


    SS-025 - integrate SurveyShips view and Output view