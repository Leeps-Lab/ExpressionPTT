import csv, sys, time, json
from datetime import timedelta
from sys import argv

if (len(sys.argv) <= 2):
	print 'usage: parseCSV.py inputfilename outputfilename'
	sys.exit(0)

filename = argv[1]
outfile = argv[2]

output = open(outfile, 'wb')
writer = csv.writer(output)

data = [['Message', 'Period', 'Time', 'Slot', 'Subject', 'Group', 'CTR', 'Revenue', 'Bid', 'VFC', 'Cost', 'Payoff']]
writer.writerows(data)

data = []

with open(filename, 'rb') as f:
	try:
		for line in f.readlines():
			array = line.split(',');
			first_item = array[0];

		num_colums = len(array)
		f.seek(0)

		reader = csv.reader(f)
		included_cols = [0, 3, 5, 6];

		rowNum = 0;
		for row in reader:
			if (rowNum != 0):
				period = row[0]
				current_slot = -1
				ctr = -1
				revenue = -1
				user = -1
				bid = -1
				vfc = -1
				cost = -1
				payoff = -1
				thetime = -1
				group = -1
				##parsing client time, in order to get readable timestamp
				thetime = int(float(row[4]))
				thetime = time.gmtime(thetime/1000)

				
				#grab the message so we know what was sent
				message = row[5];

				#parsing JSON now, if it is invalid json we will just return an empty string
				jsonField = row[6]
				try:
					json_object = json.loads(jsonField)
					#print(json_object)

					#If the message doesn't have a json parameter, let's pass
					if (json_object == 0): continue

					#if the message sets the group, lets grab it.
					if ("group" in json_object):
						group = json_object["group"]

					if ("tmp" in json_object):
						data = []

						for userInfo in json_object["tmp"]:
							
							current_slot = userInfo["current_slot"]


							ctr = userInfo["ctr"]
							revenue = userInfo["revenue"]
							user = userInfo["name"]
							bid = userInfo["bid"]
							vfc = userInfo["vfc"]
							cost = userInfo["cost"]
							payoff = userInfo["payoff"]

							messageTime = time.strftime('%H:%M:%S', thetime)
							
							userData = [message, period, messageTime, current_slot, user, group, ctr, revenue, bid, vfc, cost, payoff]
							data.append(userData)
							
						data.append([''])

					writer.writerows(data)

					json_object = json.dumps(json_object, sort_keys=True, indent=3, separators=(',', ': '))

				except ValueError:
					json_object = ''



				content = (period, time.strftime('%%H:%M:%S', thetime), message)
				#print >> output, content
				#print >> output, json_object


			rowNum = rowNum + 1

	except csv.Error as e:
		sys.exit('file %s, line %d: %s' % (filename, reader.line_num, e))
