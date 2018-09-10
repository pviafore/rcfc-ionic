rm platforms/android/build/outputs/apk/*.apk
rm platforms/android/build/outputs/apk/release/*.apk

ionic cordova build android --prod --release
$JAVA_HOME/bin/jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $1 platforms/android/build/outputs/apk/release/android-release-unsigned.apk my-alias
$ANDROID_HOME/build-tools/28.0.2/zipalign -v 4 platforms/android/build/outputs/apk/release/android-release-unsigned.apk platforms/android/build/outputs/apk/RCFC.apk
$ANDROID_HOME/build-tools/28.0.2/apksigner verify platforms/android/build/outputs/apk/RCFC.apk