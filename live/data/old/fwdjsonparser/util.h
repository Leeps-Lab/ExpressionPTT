// $Id: util.h,v 1.6 2013-07-18 15:23:06-07 - - $
// Sergio Ortiz
// sortiz1@ucsc.edu
//
// util -
//    A utility class to provide various services not conveniently
//    included in other modules.
//

#ifndef __UTIL_H__
#define __UTIL_H__

#include <iostream>
#include <list>
#include <stdexcept>
#include <string>

using namespace std;

//
// split -
//    Split a string into a list<string>..  Any sequence
//    of chars in the delimiter string is used as a separator.  To
//    Split a pathname, use "/".  To split a shell command, use " ".
//

list<string> split (const string &line, const string &delimiter);

#endif

