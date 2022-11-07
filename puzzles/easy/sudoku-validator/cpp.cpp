#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

bool checkGrid(int grid[9][9], int YXgrid[9][9], int BOXgrid[9][9])
{
    for (int i = 0; i < 9; i++) {
        for (int j = 1; j < 9; j++) {
            int currentINT = grid[i][j];
            int YXcurrentINT = YXgrid[i][j];
            int BOXcurrentINT = BOXgrid[i][j];

            for (int k = 0; k < j; ++k) {
                if (grid[i][k] == currentINT) {
                    return false;
                }

                if (YXgrid[i][k] == YXcurrentINT) {
                    return false;
                }

                if (BOXgrid[i][k] == BOXcurrentINT) {
                    return false;
                }
            }
        }
    }

    return true;
}

int main()
{
    int grid[9][9];
    int YXgrid[9][9];
    int BOXgrid[9][9];

    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            int n;
            cin >> n; cin.ignore();

            grid[i][j] = n;
            YXgrid[j][i] = n;
        }
    }

    // I couldn't figure out how to put this in a seperate function
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            /*
                012
                345
                678
            */
            int sector = (i - (i % 3)) / 3;
            sector += (j - (j % 3));

            int innerSector = i % 3;
            innerSector += 3 * (j % 3);

            BOXgrid[sector][innerSector] = grid[i][j];
        }
    }

    bool good = checkGrid(grid, YXgrid, BOXgrid);

    string stringGood = good ? "true" : "false";

    cout << stringGood << endl;
}