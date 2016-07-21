# Expression PTT - Config File

## OPTIONS
### Debugging Options
#### Debug (string)
* TRUE
* FALSE

__Default : FALSE__

#### VideoInstruction (string)
* TRUE
* FALSE

__Default : FALSE__

#### VideoLink (string)
* Ex : https://www.youtube.com/watch?v=YgdR5FvnNPc

### Income Related
#### Endowment (int | array)
* Same for all. Ex : 3
* Different between Subjects. Ex : [3, 5]
__Default : 3__

#### TargetIncome (int | array)
* Same for all. Ex : 10
* Different between Subjects. Ex : 15
__Default : 10__

### Treatment
#### Treatment (string)
* 'Directed Message' "DM" (default)
* 'No Message' "NM"
* 'Free Message' "FM"
* 'Third Party' (previously called 'Readers') "TP"
__Default : "DM"__


#### Group (array)
Groups of two or three subject ID numbers.
* Group of two integers. Ex : (default) [5, 7] 
* Group of three integers. Ex : [3, 1, 8]

*Property : one ID does not repeat in one or other
groups (exection if ID corresponds to R)*

__Default : [1,2]__


#### Role (array)
A replaces T, B replaces P
* Group of two integers. Ex : (default) ["A", "B"] 
* Group of three integers. Ex : ["R", "A", "B"]

*Property : Role does not repeat within group*

__Default : ["A", "B"]__

#### Method (string)
* 'BDM_CONT_WTP' (default)
* 'BDM_LIST_WTP'
* 'BDM_CONT_WTA'
* 'BDM_LIST_WTA'
* 'SOP_WTP'
* 'SOP_WTA'

__Default : "BDM_CONT_WTP"__

#### MethodParams (array | int)
* For 'BDM' : (default : [0, Endowment, 11]) [lowerbound, upperbound(, numberofsteps)] 
* For 'SOP' : price

__Default : 'BDM' -> [0, 3(, 11)]; 'SOP' -> 0.50__

### Emotion Questionaire
#### Questionaire (string)
* 'Batson'
* 'Bosman'

__Default : 'Batson'__

#### EmotionRange (array | int)
* Batson -> Both emotions add to value. Ex : 10, both emotions add up to 10.
* Bosman -> Range for emotion. Ex : [0,9], slider goes from 0 to 9

__Default : Batson -> 10; Bosman -> 7__

#### EmotionList (array)
* Batson -> Array of pairs. Ex : [['happy', 'sad'], ['inspired', 'uninspired']]
* Bosman -> Array of strings. Ex : ['interested', 'excited']

__Default : 'there are in the code'__

## Change log
*add page for video
*change to config for videoInstruction option
*get rid of scale parameter from config file
*replace P, T with A, B for user roles. R remains R for third party