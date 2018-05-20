rm platforms/android/build/outputs/apk/*.apk

ionic cordova build android --prod --release
$JAVA_HOME/bin/jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $1 platforms/android/build/outputs/apk/android-release-unsigned.apk my-alias
$ANDROID_HOME/build-tools/27.0.3/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk platforms/android/build/outputs/apk/RCFC.apk
$ANDROID_HOME/build-tools/27.0.3/apksigner verify platforms/android/build/outputs/apk/RCFC.apk