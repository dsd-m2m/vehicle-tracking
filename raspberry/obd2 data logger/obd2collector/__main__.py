#!/usr/bin/env python
# -*- coding: UTF-8 -*-

#use the same fuctions that you are using for the obd2car package

import sys, os
sys.path.append("%s/lib" % os.path.dirname(os.path.realpath(__file__)))

from time          import time as _getCurrentTime
from datacollector import DataCollector
from compressor    import Compressor
from util          import Thread
from configuration import CONFIGURATION
from display       import Display

def main(dataPath, datacollector, display):
    """Main function of the odb2collector.

    :param String        dataPath:         Directory where the data will be stored.
    :param DataCollector datacollector:    DataCollector instance used.
    :param Display       display:          Display instance used to show messages.
    """
    ## Numer of bytes stored
    loggedBytes = 0

    ## Initiate the compressor
    gzip = Compressor()
    gzip.start()

    logEnding = CONFIGURATION["logending"]

    while True:
        message = [
            "Logged %skB" % (loggedBytes / 1024)
        ]
        
        print "\n".join(message)
        
        display.write_message(message)

        datafile = "%s/%s.%s" % (dataPath, _getCurrentTime(), logEnding)
        
        loggedBytes += datacollector.write_data_log(
            datafile,
            nbrOfOBDFrames=1000,
            messagesPerTimestamp=20
        )

        print "Collected data log..."
        gzip.add_file_for_compression(datafile)

if __name__=="__main__":
    ## make sure the script is called correctly
    if 2 != len(sys.argv):
        raise OSError("[ERROR] Correct usage:\n  python obd2collector <data directory>")

    dataPath      = sys.argv[1]

    print "Starting OBD2 DataCollector"
    
    display       = Display(autostart=True)
    datacollector = DataCollector(display)
    

    try:
        main(dataPath, datacollector, display)
    except KeyboardInterrupt:
        ## close all threads (hopefully)
        Thread.shutdown()
