// $Id: typeid.h,v 1.2 2013-07-18 20:25:35-07 - - $
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

#ifndef __TYPEID_H__
#define __TYPEID_H__

#include <string>
#include <typeinfo>

using namespace std;

#ifdef __GNUC__
#include <cxxabi.h>
#endif

template <typename type>
string typeid_name (const type &object) {
   #ifdef __GNUC__

   const char *const name = typeid (object).name();
   int status;
   char *demangled = abi::__cxa_demangle (name, NULL, 0, &status);
   if (status != 0) return name;
   string result = demangled;
   free (demangled);
   return result;

   #else

   return typeid (object).name();

   #endif
}

#endif

