#Expression PTT - Config File

##OPTIONS
###Group (array)
Groups of two or three numbers
* Group of two integers. Ex : [5, 7]
* Group of three integers. Ex : [3, 1, 8]

###Role (array)
* Group of two integers. Ex : ["T", "P"]
* Group of three integers. Ex : ["R", "T", "P"]

###Treatment (string)
* 'Directed Message'
* 'No Message'
* 'Free Message'
* 'Readers' (soon to be called 'Third Party')

###Method (string)
* 'BDM_CONT_WTP'
* 'BDM_LIST_WTP'
* 'BDM_CONT_WTA'
* 'BDM_LIST_WTA'
* 'SOP_WTP'
* 'SOP_WTA'

###MethodValues (array | int)
* For 'BDM' : [lowerbound, upperbound(, numberofsteps)]
* For 'SOP' : valuetoaccept

###Endowment (int | array)
* Same for all. Ex : 3
* Different between Subjects. Ex : [3, 5]

###TargetIncome (int | array)
* Same for all. Ex : 10
* Different between Subjects. Ex : 15

###Scale (int | array)
* Same for all. Ex : 1
* Different between Subjects. Ex : [2, 1]

###Debug (string)
* TRUE
* FALSE

###Questionaire (string)
* Batson
* Bosman

###QuestionList (array)
* Batson :[['happy', 'sad'], ['inspired', 'uninspired']]
* Bosman : ['interested', 'excited']
