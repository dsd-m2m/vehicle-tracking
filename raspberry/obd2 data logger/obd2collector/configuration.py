#!/usr/bin/env python
# -*- coding: UTF-8 -*-

#The MIT License (MIT)
#
#Copyright (c) 2013-2014 Christian Schwarz
#
#Permission is hereby granted, free of charge, to any person obtaining a copy of
#this software and associated documentation files (the "Software"), to deal in
#the Software without restriction, including without limitation the rights to
#use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
#the Software, and to permit persons to whom the Software is furnished to do so,
#subject to the following conditions:
#
#The above copyright notice and this permission notice shall be included in all
#copies or substantial portions of the Software.
#
#THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
#IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
#FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
#COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
#IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
#CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

from os import getenv as _getenv

CONFIGURATION = {
    ## ending for all log files
    "logending":  "log_v2",

    ## ODB2 connector settings
    "device":     _getenv("CANADAPTER"),
    
    #### USB connected data reader
    "obd2reader": "BluetoothDataReader",
    "speed":      "1",

    #### Blutooth connected data reader

    ## GPS daemon settings
    "gpsdPort":  2947,
    "gpsdHost":  "localhost",

    ## display settings
    "refreshRate":  2,
    "height":       4,
    "width":       20,
    "pins_db":    [23, 17, 27, 22], ## can be [23, 17, 21, 22] on older Raspberry Pi models
    "pin_rs":      25,
    "pin_e":       24,
    "displaytype": "FourLineLCD",

    ## enable log server
    "logServer":     True,
    "logServerPort": 55555
}
