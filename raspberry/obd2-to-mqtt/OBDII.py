"""
#
# Author:       L. Saetta
# created:      29 december 2017
# last update:  04/02/2017
#
# published under MIT license (see LICENSE file)
"""

# pylint: disable=invalid-name

import json
import datetime
import obd
import configparser
import os


# config
# read OBD2_HOME env variable
OBD2HOME = os.getenv('OBD2_HOME')

config = configparser.ConfigParser()
config.read(OBD2HOME + '/gateway.ini')

OBDDATA_FORMAT_STRING = config['DEFAULT']['OBDDATA_FORMAT_STRING']
STFORMAT1 = "%d-%m-%Y %H:%M:%S"


class OBDII(object):
    """ This class encapsulate communication with OBD-II interface """

    # Constructor
    def __init__(self):
        self.connOK = False

        # create the connection
        self.obdconn = obd.OBD()

        print('OBD connection status: ', self.obdconn.status())

        # TODO: here I can add a check to see if it is connected
        # and eventually retry the connection...
        #
        self.connOK = True

        print('*** OBDII Connection OK\n')

    # method definition

    # utility method to format float with a fixed number of decimals
    def format_float(self, value):
        return float(OBDDATA_FORMAT_STRING.format(value))

    # methods reading value from OBDII interface
    def getENGINELOAD(self):
        return self.format_float(self.getValue(obd.commands.ENGINE_LOAD))

    def getCOOLANTTEMP(self):
        return self.getValue(obd.commands.COOLANT_TEMP)

    def getRPM(self):
        return self.getValue(obd.commands.RPM)

    def getSPEED(self):
        return self.getValue(obd.commands.SPEED)

    def getRUNTIME(self):
        return self.getValue(obd.commands.RUN_TIME)

    def getFUELLEVEL(self):
        return self.getValue(bd.commands.FUEL_LEVEL)

    def getAMBIANTAIRTEMP(self):
        return self.getValue(obd.commands.AMBIANT_AIR_TEMP)

    def getOILTEMP(self):
        return self.getValue(obd.commands.OIL_TEMP)

    # added 14/01/2018
    def getMAF(self):
        return self.format_float(self.getValue(obd.commands.MAF))

    def getINTAKE_AIR_TEMP(self):
        return self.getValue(obd.commands.INTAKE_TEMP)

    def getWARMUPS(self):
        return self.getValue(obd.commands.WARMUPS_SINCE_DTC_CLEAR)

    def getDISTANCE(self):
        return self.getValue(obd.commands.DISTANCE_SINCE_DTC_CLEAR)

    def getTHROTTLE(self):
        return self.format_float(self.getValue(obd.commands.THROTTLE_POS))

    def getFuelRate():
        return self.getValue(obd.commands.FUEL_RATE)

    def getFuelLevel():
        return self.getValue(obd.commands.FUEL_LEVEL)

    # end added 14/01/2018

    def getValue(self, cmd):
        response = self.obdconn.query(cmd)

        return response.value.magnitude

    def getMessage(self):
        msg = {}
        msg['DTIME'] = datetime.datetime.now().strftime(STFORMAT1)
        msg['ENGINE_LOAD'] = self.getENGINELOAD()
        msg['COOLANT_TEMP'] = self.getCOOLANTTEMP()
        msg['RPM'] = self.getRPM()
        msg['SPEED'] = self.getSPEED()
        msg['RUN_TIME'] = self.getRUNTIME()
        # msg['FUEL_LEVEL'] = self.getFUELLEVEL()
        msg['AMBIANT_AIR_TEMP'] = self.getAMBIANTAIRTEMP()
        # msg['OIL_TEMP'] = self.getOILTEMP()

        msg['THROTTLE_POS'] = self.getTHROTTLE()
        msg['INTAKE_TEMP'] = self.getINTAKE_AIR_TEMP()
        msg['WARMUPS'] = self.getWARMUPS()
        msg['DISTANCE'] = self.getDISTANCE()
        msg['MAF'] = self.getMAF()

        # msg['FUEL_RATE'] = self.getFuelRate()
        # msg['FUEL_LEVEL'] = self.getFuelLevel()

        return msg
