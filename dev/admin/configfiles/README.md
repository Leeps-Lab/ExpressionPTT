# Expression PTT - Config File

## OPTIONS
### Income Related
#### Endowment (int | array)
* Same for all. Ex : 3
* Different between Subjects. Ex : [3, 5]

#### TargetIncome (int | array)
* Same for all. Ex : 10
* Different between Subjects. Ex : 15

#### Scale (int | array)
* Same for all. Ex : 1
* Different between Subjects. Ex : [2, 1]

### Treatment
#### Treatment (string)
* 'Directed Message' "DM" (default)
* 'No Message' "NM"
* 'Free Message' "FM"
* 'Readers' (soon to be called 'Third Party') "TP"

#### Group (array)
Groups of two or three subject ID numbers.
* Group of two integers. Ex : [5, 7] (default)
* Group of three integers. Ex : [3, 1, 8]

*Property : one ID does not repeat in one or other groups*

#### Role (array)
* Group of two integers. Ex : ["T", "P"] (default)
* Group of three integers. Ex : ["R", "T", "P"]

*Property : Role does not repeat within group*

#### Method (string)
* 'BDM_CONT_WTP' (default)
* 'BDM_LIST_WTP'
* 'BDM_CONT_WTA'
* 'BDM_LIST_WTA'
* 'SOP_WTP'
* 'SOP_WTA'

#### MethodParams (array | int)
* For 'BDM' : [lowerbound, upperbound(, numberofsteps)] (default : [0, Endowment, 11])
* For 'SOP' : price

### Emotion Questionaire
#### Questionaire (string)
* 'Batson'
* 'Bosman'

#### EmotionList (array)
* Batson -> Array of pairs. Ex : [['happy', 'sad'], ['inspired', 'uninspired']]
* Bosman -> Array of strings. Ex : ['interested', 'excited']

#### EmotionRange (array | int)
* Ex : [0,9] slider goes from 0 to 9

### Debugging Options
#### Debug (string)
* TRUE
* FALSE
