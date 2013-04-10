Hivolts is a 1970's video game on the PLATO system. This program is a reverse engineering of that game. The game is turn-based and played on a 12x12 grid. Your character is the blue circle. Your goal is to outlast the Mhos, the red circles. In each of your turns, you have the option of moving into any square adjacent to you (diagonals included) or staying in the same square. If you move into an electric fence, orange square, or a Mho, you will die and lose the game. Once your turn is done, the Mhos will take their turns moving. Mhos will chase you during their turns, moving one square at a time towards you. If a Mho catches you, you lose the game. Mhos are not very smart, however, and they will sometimes run into electric fences and kill themselves! If you can outlast all 12 Mhos, you win the game. Sometimes, the Mhos will be one square away from reaching you, and you don't want to let them, so you can take a risk and jump. When you jump, you jump onto a random square which does not contain a fence. If you land on an empty square, you are safe and the Mhos take their turns moving. If you land on a Mho, they will kill you, and you will lose the game. The controls are as follows:
  Q: up and left
  W: up
  E: up and right
  A: left
  S: sit (stay on the same square for one turn)
  D: right
  Z: down and left
  X: down
  C: down and right
  J: jump

The program creates an applet called HiVolts that contains a blue dot (you) and
a bunch of red dots (mhos). The field contains yellow boxes which are the fences
and allows you to move in 8 different directions. To modify the number of tiles in the
grid you edit the SIDE_LENGTH constant found in the Globals.java file. All of the editable
functions in HiVolts can be edited in the Globals.java file.

The list of editable functions is here:

SIDE_LENGTH: changes the number of tiles in the grid.
YOU_COUNT: changes the number of YOUs. Though since you all move identically this does not exactly help you.
FENCE_COUNT: change to a constant number to have direct control over the number of fences. By default it simply is proportional to the size of the grid.
MHO_COUNT: change to a constant number to have direct control over the number of mhos. By default it simply is proportional to the size of the grid.

You can also go into the Mho.java, You.java, and Square.java classes and edit the color functions to set them to your own color preference.
Just look at the part that says COLOR.whatever and change 'whatever' to the color of your choice.
