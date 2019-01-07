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

## add the lib dir into the python path, if the script is called directly
import os, sys
sys.path.append("%s/lib" % os.path.dirname(os.path.realpath(__file__)))

from datetime         import datetime
from configuration    import CONFIGURATION
from util             import Thread

import _lcdisplays
import time

class Display(Thread):
    """A wrapper class for the connected LC display."""
    
    def __init__(self, autostart=True):
        """Initializes the Display.
        
        :param Bool autostart:    Defines, if the display should start to set messages automatically.
                                  Do not modify this parameter, unless you really know, what you are
                                  doing.
        """
        super(Display, self).__init__()
        
        lcdclass = getattr(_lcdisplays, CONFIGURATION["displaytype"])
        
        self._lcd = lcdclass(pin_rs=CONFIGURATION["pin_rs"],
                             pin_e=CONFIGURATION["pin_e"],
                             pins_db=CONFIGURATION["pins_db"]
        )
        
        ## read the Display configuration
        self._width       = CONFIGURATION["width"]
        self._height      = CONFIGURATION["height"]
        self._refreshRate = CONFIGURATION["refreshRate"]
        
        self._lcd.begin(self._width, self._height)
        
        self._messages    = []
        
        ## start the Thread
        if autostart:
            self.start()
    
    def run(self):
        """Runs the Display thread until the Display is :py:meth:`Display.shutdown`."""
        while self._continueRunning:
            self._show_message()
            time.sleep(self._refreshRate)

    def write_message(self, messages):
        """Writes the given messages onto the display.

        :param List messages:   A List of messages that will be displayed.
        """
        self._lock.acquire()
        self._messages = messages
        self._lock.release()
    
    def _show_message(self):
        """Displays the messages set by the last :py:meth:`Display.write_messages` call."""
        
        self._lock.acquire()
        self._lcd.clear()
        message = self._lcd._get_screen_message([datetime.now().strftime("%b %d  %H:%M:%S UTC")] + self._messages)
        self._lcd.message(message)
        self._lock.release()

## makes the display script callable directly
if __name__=="__main__":
    ## read the script arguments and use them as messages
    messages = sys.argv[1:]
    
    ## set the messages and force the display to show it directly
    display = Display(autostart=False)
    display.write_message(messages)
    display._show_message()