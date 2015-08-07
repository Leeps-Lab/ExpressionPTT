// $Id: demangle.h,v 1.2 2013-07-23 14:50:58-07 - - $
// Sergio Ortiz
// sortiz1@ucsc.edu
// Chris Lopez
// clopez5@ucsc.edu
// asg3
// 8/5/2013
//
// Demangle a class name.
// For __GNUC__, use __cxa_demangle.
// As a fallback, just use typeid.name()
// The functions are fully specified in this header as non-inline
// functions in order to avoid the need for explicit instantiation.
// http://gcc.gnu.org/onlinedocs/libstdc++/manual/ext_demangling.html
//

#ifndef __DEMANGLE_H__
#define __DEMANGLE_H__

#include <string>
#include <typeinfo>

using namespace std;

#ifdef __GNUC__

#include <cxxabi.h>

template <typename type>
string demangle (const type &object) {
   const char *const name = typeid (object).name();
   int status;
   char *demangled = abi::__cxa_demangle (name, NULL, 0, &status);
   if (status != 0 || demangled == NULL) return name;
   string result = demangled;
   free (demangled);
   return result;
}

#else

template <typename type>
string demangle (const type &object) {
   return typeid (object).name();
}

#endif

#endif

