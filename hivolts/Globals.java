/**
 * Stores the global variables
 * @author Max Bernstein, Chris Hinstorff, Marco Valente
 *
 */
public class Globals {
  final static int GRID_SIZE = 32;
  final static int UNIT_SIZE = 24;

  final static int SIDE_LENGTH = 12;
  final static int INNER_LENGTH = SIDE_LENGTH - 2;
  final static int BORDER_COUNT = 4 * (SIDE_LENGTH - 1);

  final static int SIDE_LENGTH_PX = GRID_SIZE*SIDE_LENGTH;

  final static int ALL_SIZE   = SIDE_LENGTH * SIDE_LENGTH;
  final static int INNER_SIZE = INNER_LENGTH * INNER_LENGTH;

  final static int FENCE_COUNT = (int) ((1.0/5) * INNER_LENGTH * INNER_LENGTH);
  final static int MHO_COUNT = (int) ((3.0/25) * INNER_LENGTH  * INNER_LENGTH);
  final static int YOU_COUNT = 1;

  final static int FENCE_VALUE = 3;
  final static int MHO_VALUE   = 2;
  final static int YOU_VALUE   = 1;
  final static int BLANK_VALUE = 0;
}
