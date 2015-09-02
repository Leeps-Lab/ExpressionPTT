#The To-Do List

##Before Experiment
* 18

##Part 1

##Part 2
* 14

##Part 3
* 5
* 15
* 16

##Part 4

##After Experiment
* 19

#Old Feedback
5. The tick labels of part 3 are all collapsed in one point
7. Screens are shown after a certain time.

#Plan
##Quick Fixes
5. fix slider
7. done
11. done
12. done
13. done
17. done
##Changes
14. Reformat the game. Add tooltips.
15. find a way to parse the text area
16. do css for show earnings screens. needs to be formatted better. more
	propotional.
18. config file : add scale and treatments (at least 1,2,3). number of people will need a
	algorithm to find a way to sort all the people.
19. ask logan how I would parse the information and how it is currently
	outputed.

#New Feedback
11. Create waiting screens 'please wait'
12. for message part : make button say 'Send Message' and separate it more,
		further down. and please wait screen after the submition

13. Part 2 : instead of waiting on the part 2 have screen say "please wait" and then
go to the part 2 screen

14. Part 3 : Have the game in a square shape cover more of the screen. New
		format for page. Intructions are a tooltip. The things on the side are
		clearer and the locator text is above the game. The locator has a
		thicker line and a draw circle. Close is 0-20, Far is 21-100

15. Line breaks should be respected. button further down. wait screen. no
		wait for other person, should just go directly to pay off.

16. Just leave it blank on show earnings instead of lines. narrower table
		and same width for two last columns. go straight to part 4, no waiting
		for people to see their earnings.

17. Alert say 'This entry is not valid, please read instructions'

##18. Config File Updates
Add params :
	number of people : number of participates
	scale : income * scale, endownment * scale, avaliable points * scale
	treatment : which one of the cases are being used

Treatments :
	1) Pay Message : as is
	2) No Message : no references to messages
	3) Free Message : no references to paying for the message
	4) Separate readers : All messages go to a separate reader

##19. Output Format
Parse the output - ask Logan how to and where the parsing happens

