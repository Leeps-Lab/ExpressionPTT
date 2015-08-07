// $Id: parse_csv.cpp,v 1.4 2014-04-14 22:35:45-07 - - $
/*
 * Sergio Ortiz
 * sortiz1@ucsc.edu
 */
#include <fstream>
#include <iostream>
#include <string>
#include <iomanip>
#include <vector>

using namespace std;

#include "util.h"

//
// Parse a file.  Read lines from input file, parse each line,
// and interpret the command.
//

void print_line(list<string> list, ostream &outfile){
   for(auto it = list.begin(); it != list.end(); ++it)
     outfile << *it << " ";

   outfile << endl;
}

vector<string> extract_data (vector<string> &vec){
   vector<string> res;

   string tmp = vec.at(0);
   
   string str = "";

   string per = vec.at(0);
   string grp = vec.at(1);
   string tmp2 = per + " " + grp + " ";

   for(auto it = vec.begin(); it != vec.end(); ++it){
      string s = *it;
      s.push_back(',');
      vector<char> v(s.begin(), s.end());
      int flag = 0;
      for(auto it2 = v.begin(); it2 != v.end(); ++it2){

         if(*it2 == ':') flag = 1;
         if(flag == 1 && *it2 != ':' && *it2 != ',') str.push_back(*it2);
         if(*it2 == ','){
            flag = 0;
            str.push_back(' ');
         }
      }
      string con = tmp2 + str;
      res.push_back(con);
      str = "";
   }
   return res;
}

vector<string> delete_front (vector<string> &vec){
   vector<string> res;

   for(auto it = vec.begin(); it != vec.end(); ++it){
      string s = *it;
      vector<char> v(next(s.begin(),7), s.end());
      string str (v.begin(),v.end());
      res.push_back(str);
   }
   return res;
}

vector<string> delete_mid (vector<string> &vec){
   vector<string> res;
   vector<string> tmp;

   for(auto it = vec.begin(); it != vec.end(); ++it){
      string s = *it;
      vector<char> v(s.begin(), s.end());
      string str = "";
      for(auto it2 = v.begin(); it2 != v.end(); ++it2){
         if(*it2 != ' ') str.push_back(*it2);
         else if (*it2 == ' ' && str != " " && str != "  " && str != ""){
            tmp.push_back(str);
            str = "";
         }
      }
      
      string str2 = "";
      int cnt = 0;
      for(auto it3 = tmp.begin(); it3 != tmp.end(); ++it3){
         if(cnt == 0 || cnt == 1 || cnt == 3 ||cnt == 4 || cnt == 6 || cnt == 8)
            str2 += *it3 + ",";
         ++cnt;
      }
      
      //for(int i = 0; i < 8; ++i)
      for(int i = 0; i < 9; ++i)
         tmp.pop_back();
      res.push_back(str2);
   }

   return res;  
  
}

vector<char> trim_front(vector<char> &vec){
   vector<char> res;
   int cnt = 0;
   for(auto it = vec.begin(); it != vec.end(); ++it){
      if(*it == '\"') ++cnt;
      if(cnt == 2 && *it != '\"') res.push_back(*next(it,1));
      else if(cnt >= 3 && *it != '\"') res.push_back(*it);
   }
   return res;
}

vector<char> trim_mid(vector<char> &vec){
   vector<char> res;
   int cnt = 0;
   res.push_back(vec.at(0));
   res.push_back(' ');
   for(auto it = vec.begin(); it != vec.end(); ++it){
      if(cnt >= 10 && *it != '\"') res.push_back(*it);
      ++cnt;
   }
   return res;
}

vector<string> extract_subs (vector<char> &vec){
   vector<string> res;
   int flag = 0;
   string str = "";
   str.push_back(vec.at(0));

   string per = "";
   string grp = "";
   int f = 0;
   for(int i = 0; i < 7; ++i){
      if(vec.at(i) != ',' && f == 0){
         if(vec.at(i) != '\"' && vec.at(i) != ']' && vec.at(i) != '[' && vec.at(i) != '{') per.push_back(vec.at(i));
      } else if (vec.at(i) != ',' && f == 1){
         if(vec.at(i) != '\"' && vec.at(i) != ']' && vec.at(i) != '[' && vec.at(i) != '{') grp.push_back(vec.at(i));
      } else if(vec.at(i) == ','){
        f = 1;
      }
   }
   //cout << per << "," << grp << ",";
   res.push_back(per);
   res.push_back(grp);

   for(auto it = vec.begin(); it != --vec.end(); ++it){
      if(*it == '{') flag = 1;    
      if(flag == 1 && *it != '{' && *it != '}') str.push_back(*it);
      if(*it == '}'){ 
         flag = 0;
         res.push_back(str);
         str = "";
      }
   }
   return res;
}

vector<char> delete_quotes (vector<char> &vec){
   vector<char> res;
   for(auto it = vec.begin(); it != vec.end(); ++it){
      if(*it != '\'') res.push_back(*it);
   }
   return res;
}

void parsefile (const string &infilename,
                     istream &infile, ostream &outfile) {
cout << "Period Time Slot Subject CTR Revenue Bid VFC Cost Payoff" << endl;
   for (int linenr = 1;; ++linenr) {
      try {
         string line;
         getline (infile, line);
         if (infile.eof()) break;
         if (line.size() == 0 || line.size() < 30) continue;
  
         for (;;) {
            int last = line.size() - 1;
            if (line[last] != '\\') break;
            line[last] =      ' ';
            string contin;
            getline (infile, contin);
            if (infile.eof()) break;

            line += contin;
         }

         //vector<char> data(line.begin(), ------line.end());
         vector<char> data(line.begin(), line.end());
         data = delete_quotes(data);
         //data = trim_front(data);
         //data = trim_mid(data);
         vector<string> subs = extract_subs(data);
         subs = extract_data(subs);
         //subs = delete_front(subs);
         //subs = delete_mid(subs);
         for(auto it = subs.begin(); it != subs.end(); ++it){
            cout << *it << endl;
         }

      }catch (runtime_error error) {
         outfile << infilename << ":" << linenr << ": "
                    << error.what() << endl;
      }
   }
}

//
// Scan the option -@ and check for operands.
//

/*void scan_options (int argc, char **argv) {
   opterr = 0;
   for (;;) {
      int option = getopt (argc, argv, "h:");
      if (option == EOF) break;
      switch (option) {
         case 'h':
            cout << "Usage: ./cpp_mem filename" << endl;
            cout << "This program parses output from python script ps_mem.py to find RStudio relevant memory usage." << endl;
            break;
         default:
            cout << "-" << (char) optopt << ": invalid option"
                       << endl;
            break;
      }
   }
}*/

//
// Strip off the dirname portion and the suffix
//
string get_outfilename (const string &infilename) {
      string suffix = ".csv";
      int slashpos = infilename.find_last_of ('/') + 1;
      string outname = infilename.substr (slashpos);
      int baselen = outname.size();
      int suffixlen = suffix.size();
      int difflen = baselen - suffixlen;
      if (baselen > suffixlen && outname.substr (difflen) == suffix) {
         outname = outname.substr (0, difflen);
      }
      return outname + ".txt";
}


//
// Main function.  Iterate over files if given, use cin if not.
//
int main (int argc, char **argv) {
   
   //scan_options (argc, argv);
   for(int argi = 1; argi < argc; ++argi){
//for (int argi = optind; argi < argc; ++argi) {
      const string infilename = argv[argi];
      ifstream infile (infilename.c_str());
      if (infile.fail()) continue;

      const string outfilename = get_outfilename (infilename);
      ofstream outfile (outfilename.c_str());
      if (outfile.fail()) continue;
      parsefile (infilename, infile, outfile);
      // fstream objects auto closed when destroyed
   }  
   return EXIT_SUCCESS;
}

