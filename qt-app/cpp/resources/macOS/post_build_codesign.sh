#!/usr/bin/env bash
#
# The variable CODE_SIGN_IDENTITY should be set in your shell environment.
#

APP_BUNDLE_PATH=$1

# Code sign
codesign --deep --force --verify --verbose --options runtime --sign "${CODE_SIGN_IDENTITY}" ${APP_BUNDLE_PATH}
