"""
#
# Author:       L. Saetta
# created:      30 december 2017
# last update:  30/12/2017
#
# published under MIT license (see LICENSE file)
"""

# pylint: disable=invalid-name

import configparser
import datetime
import json
import math
import os
import time

# read OBD2_HOME env variable
OBD2HOME = os.getenv('OBD2_HOME')

config = configparser.ConfigParser()
config.read(OBD2HOME + '/gateway.ini')

# format for float values (number of decimals)
OBDDATA_FORMAT_STRING = config['DEFAULT']['OBDDATA_FORMAT_STRING']
STFORMAT1 = "%d-%m-%Y %H:%M:%S"


class OBDIISimulator(object):
    """ This class simulate data from OBDII """

    # Constructor
    def __init__(self):
        # register start time
        self.tStart = time.time()

        self.connOK = False

        self.connOK = True

        print('*** OBDII Connection OK\n')

    def getENGINELOAD(self):
        # test reducing to 2 decimals
        eng_load = 33.3333395
        eng_load = self.format_float(eng_load)

        return eng_load

    def getRPM(self):
        # simulate oscillation of RPM
        PERIOD = 120
        MINRPM = 1000
        MAXRPM = 1000

        tElapsed = (time.time() - self.tStart)

        return self.format_float((MINRPM + MAXRPM * math.sin((2 * math.pi * tElapsed) / PERIOD)))

    def getSPEED(self):
        # simulate oscillation of RPM
        PERIOD = 120
        MINSPEED = 60
        MAXSPEED = 60

        tElapsed = (time.time() - self.tStart)

        return self.format_float((MINSPEED + MAXSPEED * math.sin((2 * math.pi * tElapsed) / PERIOD)))

    def getCOOLANTTEMP(self):
        # simulate oscillation of RPM
        PERIOD = 120
        MINTEMP = 10
        TEMP_RATE = 10

        tElapsed = (time.time() - self.tStart)

        return self.format_float(MINTEMP + TEMP_RATE * tElapsed / PERIOD)

    # utility method to format float with a fixed number of decimals
    def format_float(self, value):
        return float(OBDDATA_FORMAT_STRING.format(value))

    # method definition
    def getMessage(self):
        msg = {}
        msg['DTIME'] = datetime.datetime.now().strftime(STFORMAT1)

        msg['ENGINE_LOAD'] = self.getENGINELOAD()
        msg['COOLANT_TEMP'] = self.getCOOLANTTEMP()
        msg['RPM'] = self.getRPM()
        msg['SPEED'] = self.getSPEED()
        msg['RUN_TIME'] = 100
        # msg['FUEL_LEVEL'] = 30
        msg['AMBIANT_AIR_TEMP'] = 12
        # msg['OIL_TEMP'] = 88

        return msg
