# import RPi.GPIO as GPIO # Import Raspberry Pi GPIO library

# def initPins():
#     GPIO.setwarnings(False) # Ignore warning for now
#     GPIO.setmode(GPIO.BOARD) # Use physical pin numbering
#     GPIO.setup(10, GPIO.IN, pull_up_down=GPIO.PUD_DOWN) # Set pin 10 to be an input pin and set initial value to be pulled low (off)
#     GPIO.add_event_detect(10,GPIO.RISING,callback=startParty)

import api
app = api.app
