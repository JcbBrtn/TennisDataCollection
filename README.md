# TennisDataCollection

> “Plans are worthless, but planning is essential“ - Dwight D. Eisenhower

[]  - To Do
[/] - In Progress
[X] - Done


## Status - Task | Acceptance Criteria | Design Notes
- [/] - Create Data Collection Page
    - A HTML Form that updates a list of points played with the data entered. The data entry should be able to be accomplished easily without ever taking your hands off the keyboard. I want this to be as easy of a process as possible so the user does not see this data tracking as a burden.
    - Start off with doing by point tracking as outlined in the data collection section below.
- [] -  Create Statistical Analysis Page
    - A nice looking page with empty fields. Maybe allow the page to take in some data to fill in those fields.
    - This is mainly just to get the UI right. There’s going to be a lot of information so displaying it in a clean and understandable fashion is important
- [] - Create Backend server to support the running process
    - Data entered into the collection page should now be properly analyzed within the analysis page.
- [] - Connect the Data Page and the Analysis Page
    - The Pages created should now only be accessible when running the server locally
- [] - Launch the Website
    - This should now be accessible via any internet connected device.
- [] - Extra Features

# Brain Storming Design
Over all, I would like to create a web server that 2 main features. the first feature is used to enter data. This data will be points/shots during a tennis match. The second feature will show the statistical analysis of the data collected. There are a few features that will need to be decided if we want to add for functionality sake. Depending on the length of this sprint we may only end with a MVP. But the other features may be added as extra improvements in future sprints. or free time.

Here are some ideas… spit balling here:

- Saving match data (This would require a database… or some txt files :wink:).

- Downloading data as CSV.

- Graphs!

- Data uploading capabilities.

- Monte Carlo simulations of fake matches between players (This requires saving a lot of data (But would be one of the coolest features… I wonder if this would have viable results to optimizing match betting (Or end the age old debate of the greatest player of all time)))

- Login accounts

- By shot tracking option

## What data should we keep track of and what should we do with it
There are a lot of ways to achieve this.  From past data collection I’ve done, we generally followed this outline:

- Point number (index value)

- Shot Count

- Point Ended (Forehand/Backhand, Drive/Lob/Overhead/Volley, Long/Wide/Net)/(Double Fault)

- Unforced Error/Forced Error/Winner

- Player (The player that hit the shot that ended the point)

We can break this down further by a per shot basis where one point consists of multiple shots we add in the following shot dimension that can be of the form:

- Player Serving

- Forehand/Backhand, Drive/Lob/Overhead/Volley (or  1st/2nd Serve), Deuce/Middle/Ad/Long/Wide/Net

- Unforced Error/Forced Error/Winner

This by shot feature will be put into the ideas area for added features.

 

## For the statistics we get from this, here is what we extract

- Shot Count Analysis ( x < 3, 4 < x < 9, 10 < x < 20, 20 < x )

- Back to Back points with Shot Count > 10 

- Average shot count per player (this would be the average shot count when the point is ended)

- Standard Deviation of shot count.

- Shot Tolerance ( mean SC + Standard Deviation) This means 80% of the time, as soon as the ball passes this shot count, you will end the point.

- Unforced Errors (Forehand/Backhand)

- Service Fault

- Drives (net, long, wide) can breakdown further into forehand and backhand

- Volleys  (net, long, wide) can breakdown further into forehand and backhand

- Lobs  (net, long, wide) can breakdown further into forehand and backhand

- Overheads  (net, long, wide)

- Forced Errors, for each area we labeled in unforced errors

- Clean winners, for each of the areas labeled above
