# $Id: Makefile,v 1.14 2013-07-23 19:08:23-07 - - $

MKFILE      = Makefile
DEPFILE     = ${MKFILE}.dep
NOINCL      = clean
NEEDINCL    = ${filter ${NOINCL}, ${MAKECMDGOALS}}
GMAKE       = ${MAKE} --no-print-directory
COMPILECPP  = g++ -g -O0 -Wall -Wextra -std=gnu++0x
MAKEDEPCPP  = g++ -MM

MODULES     = util
CPPHEADER   = ${MODULES:=.h} demangle.h
CPPSOURCE   = ${MODULES:=.cpp} parse_csv.cpp
EXECBIN     = parse_csv
OBJECTS     = ${CPPSOURCE:.cpp=.o}
OTHERS      = ${MKFILE} README
ALLSOURCES  = ${CPPHEADER} ${CPPSOURCE} ${OTHERS}

all : ${EXECBIN}

${EXECBIN} : ${OBJECTS}
	${COMPILECPP} -o $@ ${OBJECTS}

%.o : %.cpp
#	cid + $<
	${COMPILECPP} -c $<

clean :
	- rm ${OBJECTS} ${DEPFILE} core ${EXECBIN}.errs

dep : ${CPPSOURCE} ${CPPHEADER}
	@ echo "# ${DEPFILE} created `LC_TIME=C date`" >${DEPFILE}
	${MAKEDEPCPP} ${CPPSOURCE} >>${DEPFILE}

${DEPFILE} :
	@ touch ${DEPFILE}
	${GMAKE} dep

again :
	${GMAKE} spotless dep all

ifeq (${NEEDINCL}, )
include ${DEPFILE}
endif

