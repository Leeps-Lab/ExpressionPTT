#!/usr/bin/python
import csv, sys
from random import randint

# avaliable treatments
avaliableTreatments = ['1','2','3','4']
# prints out the treatments
def printTreatments():
    print '1 : pay message'
    print '2 : no message'
    print '3 : free message'
    print '4 : readers'

# period is set to 1, not sure if needed, but to make sure it doesn't break
period = 1

# gets the treatment from user
treatment = raw_input('What treatment? Type "help" to see options\n')
while (treatment not in avaliableTreatments):
    if (treatment == 'help'):
        printTreatments()
    else:
        print 'not a valid option, type "help" to see options'
    treatment = raw_input('What treatment? Type "help" to see options\n')
treatment = int(treatment)

def isInt(s):
    try:
        int(s)
        return True
    except ValueError:
        return False

# checks if the number of people is valid
# t : treatment; n : numberofpeople
def validNofP(t,n):
    if (not isInt(n)):
        return False
    n = int(n)
    # treatment t, under 10 people
    if (t == 4 and n <= 9 and n % 2 == 1):
        return True
    # treatment t, over 9 people
    elif (t == 4 and n > 9 and n % 2 == 0):
        return True
    # even if t != 4
    elif (t != 4 and n % 2 == 0):
        return True
    return False

# get the number of people
numberofpeople = raw_input('How many people are participating?\n')
while (not validNofP(treatment, numberofpeople)):
    print 'please enter a valid number of people'
    if (treatment != 4):
        print 'there has to be an even amount of people'
    else:
        print 'if there are less than 10 people, the number has to be',
        print 'odd, otherwise it has to be even'
    numberofpeople = raw_input('How many people are participating?\n')
numberofpeople = int(numberofpeople)

# puts in the value at the place
def replacePerson(people,person,location):
    people.pop(location - 1)
    people.insert(location - 1,person)
    return people
# gives the person a partner
def partnerup(people,person,location):
    replacePerson(people,location,person)
    return people
def isreader(people,location):
    if people[location - 1] == -1:
        return True
    return False

# generates pairs
# t : treatment; n : numberofpeople
# cannot get onself, cannot already be in the array
# if t == 4, there has to be either one or two readers
def generatepairs(t,n):
    # define inital variables
    location = 1
    people = [0] * n
    # if t == 4
    if t == 4 and n <= 9:
        # one reader
        reader = randint(1,n)
        people = replacePerson(people,-1,reader)
        print people
    elif t == 4 and n > 9:
        # two readers
        reader = randint(1,n)
        people = replacePerson(people,-1,reader)
        reader = randint(1,n)
        while isreader(people,reader):
            reader = randint(1,n)
        people = replacePerson(people,-1,reader)
    # while loop
    while (0 in people):
        person = randint(1,n)
        while people[location - 1] != 0:
            location += 1
        while person in people or isreader(people,person) or person == location:
            person = randint(1,n)
        people = replacePerson(people,person,location)
        people = partnerup(people,person,location)
        location += 1
    return people
# gets the pairs
pairs = generatepairs(treatment, numberofpeople)

# 'T' 'P' 'R'
# 'u' is undefined
def generateroles(t,p):
    location = 0
    roles = ["u"] * len(p)
    while "u" in roles:
        if p[location] == -1:
            roles[location] = 3
            location += 1
            continue
        role = randint(1,2)
        # a 50/50
        if role == 1:
            # person is 'T'
            roles[location] = 1
            roles[p[location] - 1] = 2
        elif role == 2:
            # person is 'P'
            roles[location] = 2
            roles[p[location] - 1] = 1
        location += 1
    return roles

roles = generateroles(treatment,pairs)
print pairs
print roles

endownment = raw_input('What is the inital endownment?\n')
while (not isInt(endownment)):
    print 'please enter a number'
    endownment = raw_input('What is the inital endownment?\n')
endownment = int(endownment)

incomegoal = raw_input('What is the income goal?\n')
while (not isInt(incomegoal)):
    print 'please enter a number'
    incomegoal = raw_input('What is the income goal?\n')
incomegoal = int(incomegoal)

def isDebug(d):
    if not isInt(debug):
        return True
    elif int(d) == 0 or int(d) == 1:
        return False
    return True
debug = raw_input('Are you debugging? 1 for yes, 0 for no\n')
while (isDebug(debug)):
    print 'please enter a number'
    debug = raw_input('Are you debugging? 1 for yes, 0 for no\n')
debug = int(debug)

scale = raw_input('What is the scale?\n')
while (not isInt(scale)):
    print 'please enter a number'
    scale = raw_input('What is the scale?\n')
scale = int(scale)

with open('config.csv', 'wb') as csvfile:
    spamwriter = csv.writer(csvfile,quoting=csv.QUOTE_MINIMAL)
    spamwriter.writerow(['period','pairs','endownment','incomegoal','roles','debug','numberofpeople','scale','treatement'])
    spamwriter.writerow([period,pairs,endownment,incomegoal,roles,debug,numberofpeople,scale,treatment])

