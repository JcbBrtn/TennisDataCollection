# TennisDataCollection

## How to Use
If you have decided to download this and run it locally, please open the TennisDataTracker.html using your favorite web browser. From there Fill out the Player's names at the top on the screen where prompted. If you are tracking the stats for a singles match please only use The Player 1 and the Player 2 field. For a doubles match, follow the teams labels.

Once you are ready to begin tracking the points, start by filling out the "Point Information" section, starting with the Shot Count section and filling out the whole row before moving down. 

For the Shot Count, the serve is 1. Any ball that is marked as a one is either a service fault or an Ace. 2 will be the return.

For the point ended by, this is the last person to touch the ball. If it is a miss hit, try to guess the shot they were attempting to hit and fill out from there.

When tracking a serve, you do not need to place or Forehand or Backhand. The stat will also not be able to be tracked if the "How the point ended" is filled out as a Forced Error. 

For ease of use, we have enabled the keyboard to be used by using the tab key to move forward in the section, space bar to select the radio button. and enter once you get the the Add Point button will send the focus back to the shot count which can be incremented using the arrow keys.

## What data should we keep track of and what should we do with it
There are a lot of ways to achieve this.  From past data collection I’ve done, we generally followed this outline:

- Point number (index value)

- Shot Count

- Point Ended (Forehand/Backhand, Drive/Lob/Overhead/Volley, Long/Wide/Net)/(Double Fault)

- Unforced Error/Forced Error/Winner

- Player (The player that hit the shot that ended the point)

 

## For the statistics we get from this, here is what we extract

- Shot Count Analysis ( x < 3, 4 < x < 9, 10 < x < 20, 20 < x )

- Back to Back points with Shot Count > 10

- Average shot count per player (this would be the average shot count when the point is ended)

- Standard Deviation of shot count.

- Shot Tolerance ( mean SC + Standard Deviation) This means 80% of the time, as soon as the ball passes this shot count, you will end the point.

- Unforced Errors 
    - (Forehand/Backhand)

    - Service Fault

    - Drives (net, long, wide) can breakdown further into forehand and backhand

    - Volleys  (net, long, wide) can breakdown further into forehand and backhand

    - Lobs  (net, long, wide) can breakdown further into forehand and backhand

    - Overheads  (net, long, wide)

- Forced Errors, for each area we labeled in unforced errors (Except Serves)

- Clean winners, for each of the areas labeled above
