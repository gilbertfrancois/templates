# Deploying for macOS


## Bash profile

To build the application for macOS, cmake needs the Qt bin dir in its path and the code sign identity variable set. 
Look for your Developer ID Application certificate in _Keychain Access_. Copy its signature (including the uuid) and 
use this to set CODE_SIGN_IDENTITY for signing the app. Put the following lines in e.g. `~/.bash_profile`:

```bash
# Qt
export QT_LIBRARY_PATH=${HOME}/Development/lib/Qt5.12.0/5.12.0/clang_64
export PATH=${QT_LIBRARY_PATH}/bin:${PATH}
export CODE_SIGN_IDENTITY="Developer ID Application: Your Name (XXXXXXXXXX)"
```


## Code signing

Code signing is taken care of automatically when building a Release (not in Debug build mode). The script that is 
invoked by cmake is located in `resources/macOS/post_build_codesign.sh`. To run successfully, the script needs the
shell environment variable `CODE_SIGN_IDENTITY` been set.


## Troubleshooting

Below are some issues that I've seen and solved:

 - Error: "No identity found" when using codesign:
    - The certificate name is incorrect. Lookup the name in Keychain Access.
    - The certificate is expired. Create a new certificate on the Apple Developers Portal.
 