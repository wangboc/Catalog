# coding=utf-8
__author__ = 'ho'
import re


def test():
    file = "C:\Users\ho\Desktop\串联单\桐乡新闻 2014-07-30.txt"
    file = file.decode('utf-8')
    input = open(file, 'r')
    NewParamCount = 0
    for line in input.readlines():
        print  line.decode('gbk')
        RexDateString = re.compile(r'\d{4}-\d{2}-\d{2}\s*\d{2}:\d{2}:\d{2}:\d{2}')
        position = RexDateString.search(line)
        if (position):
            NewParamCount += 1
            print "New Paramgram !      " + str(NewParamCount)
            print "==============="
            print "~~~~~~~~~~~~~~~~~~~~~~~~~~~"
        else:
            print "~~~~~~~~~~~~~~~~~~~~~~~~~~~"

    else:
        print NewParamCount


if __name__ == '__main__':
    DirTest()

