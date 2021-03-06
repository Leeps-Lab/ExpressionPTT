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
* Ex : https://www.youtube.com/...

### Income Related
#### Endowment (int | array)
* Same for all. Ex : 3
* Different between Subjects. Ex : [3, 5]
__Default : 3__

#### TargetIncome (int | array)
* Same for all. Ex : 10
* Different between Subjects. Ex : 15
__Default : 10__

#### Scale (int | array)
* Same for all. Ex : 1
* Different between Subjects. Ex : [2, 1]
__Default : 1__

### Treatment
#### Treatment (string)
* 'Directed Message' "DM" (default)
* 'No Message' "NM"
* 'Free Message' "FM"
* 'Readers' (soon to be called 'Third Party') "TP"
__Default : "DM"__


#### Group (array)
Groups of two or three subject ID numbers.
* Group of two integers. Ex : [5, 7] (default)
* Group of three integers. Ex : [3, 1, 8]

*Property : one ID does not repeat in one or other
groups*

__Default : [1,2]__


#### Role (array)
* Group of two integers. Ex : ["T", "P"] (default)
* Group of three integers. Ex : ["R", "T", "P"]

*Property : Role does not repeat within group*

__Default : ["T", "P"]__

#### Method (string)
* 'BDM_CONT_WTP' (default)
* 'BDM_LIST_WTP'
* 'BDM_CONT_WTA'
* 'BDM_LIST_WTA'
* 'SOP_WTP'
* 'SOP_WTA'

__Default : "BDM_CONT_WTP"__

#### MethodParams (array | int)
* For 'BDM' : [lowerbound, upperbound(, numberofsteps)] (default : [0, Endowment, 11])
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
