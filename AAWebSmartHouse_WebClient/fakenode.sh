#!/usr/bin/env bash

# this script is called from VS Code with these arguments:
#    --debug-brk=<port> <runtimeArgs> <program> <args>

# here you could tweak the arguments (e.g. drop the 'program', extract the port, etc.)

# pass the arguments to the npm script 'debug'
# make sure that the node process eventually launched by the following uses the correct port
# because VS Code will try to attach to it.
#npm run-script debug -- $*
npm start