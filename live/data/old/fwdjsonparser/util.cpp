// $Id: util.cpp,v 1.1 2014-04-14 19:48:38-07 - - $
/*
 * Sergio Ortiz
 * sortiz1@ucsc.edu
 */
#include <cerrno>
#include <cstdlib>
#include <cstring>
#include <ctime>
#include <sstream>
#include <stdexcept>
#include <string>
#include <typeinfo>

using namespace std;

#include "typeid.h"
#include "util.h"

list<string> split (const string &line, const string &delimiters) {
   list<string> words;
   int end = 0;
   for (;;) {
      size_t start = line.find_first_not_of (delimiters, end);
      if (start == string::npos) break;
      end = line.find_first_of (delimiters, start);
      words.push_back (line.substr (start, end - start));
   }
   return words;
}
