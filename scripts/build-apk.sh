#!/usr/bin/env bash
set -e

echo "=== Building AnimStudio Android APK (Strict Portrait Orientation) ==="

# 1. Build Vite web bundle
npm run build

# 2. Prepare directories
mkdir -p /build-apk/src/com/animstudio/app \
         /build-apk/res/values \
         /build-apk/res/drawable \
         /build-apk/res/drawable-hdpi \
         /build-apk/res/drawable-xhdpi \
         /build-apk/res/drawable-xxhdpi \
         /build-apk/res/drawable-xxxhdpi \
         /build-apk/res/mipmap-mdpi \
         /build-apk/res/mipmap-hdpi \
         /build-apk/res/mipmap-xhdpi \
         /build-apk/res/mipmap-xxhdpi \
         /build-apk/res/mipmap-xxxhdpi \
         /build-apk/assets/www \
         /build-apk/gen \
         /build-apk/obj \
         /build-apk/bin

# 3. Copy compiled web app to assets
rm -rf /build-apk/assets/www/*
cp -r dist/* /build-apk/assets/www/

# 4. Copy launcher icon (using high-res logo.png)
mkdir -p /build-apk/res/drawable \
         /build-apk/res/drawable-hdpi \
         /build-apk/res/drawable-xhdpi \
         /build-apk/res/drawable-xxhdpi \
         /build-apk/res/drawable-xxxhdpi \
         /build-apk/res/mipmap-mdpi \
         /build-apk/res/mipmap-hdpi \
         /build-apk/res/mipmap-xhdpi \
         /build-apk/res/mipmap-xxhdpi \
         /build-apk/res/mipmap-xxxhdpi

ffmpeg -y -i public/logo.png -vf scale=48:48 /build-apk/res/mipmap-mdpi/ic_launcher.png
ffmpeg -y -i public/logo.png -vf scale=72:72 /build-apk/res/mipmap-hdpi/ic_launcher.png
ffmpeg -y -i public/logo.png -vf scale=96:96 /build-apk/res/mipmap-xhdpi/ic_launcher.png
ffmpeg -y -i public/logo.png -vf scale=144:144 /build-apk/res/mipmap-xxhdpi/ic_launcher.png
ffmpeg -y -i public/logo.png -vf scale=192:192 /build-apk/res/mipmap-xxxhdpi/ic_launcher.png

cp /build-apk/res/mipmap-mdpi/ic_launcher.png /build-apk/res/mipmap-mdpi/ic_launcher_round.png
cp /build-apk/res/mipmap-hdpi/ic_launcher.png /build-apk/res/mipmap-hdpi/ic_launcher_round.png
cp /build-apk/res/mipmap-xhdpi/ic_launcher.png /build-apk/res/mipmap-xhdpi/ic_launcher_round.png
cp /build-apk/res/mipmap-xxhdpi/ic_launcher.png /build-apk/res/mipmap-xxhdpi/ic_launcher_round.png
cp /build-apk/res/mipmap-xxxhdpi/ic_launcher.png /build-apk/res/mipmap-xxxhdpi/ic_launcher_round.png

cp public/logo.png /build-apk/res/drawable/ic_launcher.png
ffmpeg -y -i public/logo.png -vf scale=144:144 /build-apk/res/drawable-hdpi/ic_launcher.png
ffmpeg -y -i public/logo.png -vf scale=192:192 /build-apk/res/drawable-xhdpi/ic_launcher.png
ffmpeg -y -i public/logo.png -vf scale=384:384 /build-apk/res/drawable-xxhdpi/ic_launcher.png
cp public/logo.png /build-apk/res/drawable-xxxhdpi/ic_launcher.png

# 5. Write AndroidManifest.xml strictly configured for Portrait mode
cat << 'EOF' > /build-apk/AndroidManifest.xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.animstudio.app"
    android:versionCode="2"
    android:versionName="1.1.0">

    <uses-sdk android:minSdkVersion="21" android:targetSdkVersion="34" />

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />

    <application
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:hardwareAccelerated="true"
        android:allowBackup="true">
        <activity
            android:name="com.animstudio.app.MainActivity"
            android:label="@string/app_name"
            android:icon="@mipmap/ic_launcher"
            android:theme="@android:style/Theme.NoTitleBar"
            android:screenOrientation="portrait"
            android:configChanges="orientation|screenSize|keyboardHidden|screenLayout"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
EOF

# 6. Write strings.xml
cat << 'EOF' > /build-apk/res/values/strings.xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Animstudio</string>
</resources>
EOF

# 7. Write MainActivity.java strictly configured for Portrait mode
cat << 'EOF' > /build-apk/src/com/animstudio/app/MainActivity.java
package com.animstudio.app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ContentValues;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Message;
import android.provider.MediaStore;
import android.util.Base64;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.CookieManager;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

public class MainActivity extends Activity {

    private WebView webView;
    private ValueCallback<Uri[]> filePathCallback;
    private static final int FILE_CHOOSER_REQUEST_CODE = 1001;

    @Override
    @SuppressLint("SetJavaScriptEnabled")
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        requestWindowFeature(Window.FEATURE_NO_TITLE);
        // Ensure system status bar & navigation bar are permanently visible at all times
        getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            getWindow().addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            getWindow().setStatusBarColor(0xFF141414);
            getWindow().setNavigationBarColor(0xFF141414);
        }
        // Strictly Portrait Mode
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);

        webView = new WebView(this);
        setContentView(webView);

        configureWebView();

        webView.loadUrl("file:///android_asset/www/index.html");
    }

    @SuppressLint("SetJavaScriptEnabled")
    private void configureWebView() {
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowUniversalAccessFromFileURLs(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);
        settings.setSupportZoom(false);
        settings.setBuiltInZoomControls(false);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        settings.setSupportMultipleWindows(true);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
            CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true);
        }
        CookieManager.getInstance().setAcceptCookie(true);

        webView.addJavascriptInterface(new AndroidGalleryBridge(), "AndroidBridge");

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return handleUrlNavigation(url);
            }
        });

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onCreateWindow(WebView view, boolean isDialog, boolean isUserGesture, Message resultMsg) {
                WebView tempWebView = new WebView(MainActivity.this);
                tempWebView.setWebViewClient(new WebViewClient() {
                    @Override
                    public boolean shouldOverrideUrlLoading(WebView v, String targetUrl) {
                        return handleUrlNavigation(targetUrl);
                    }
                });
                WebView.WebViewTransport transport = (WebView.WebViewTransport) resultMsg.obj;
                transport.setWebView(tempWebView);
                resultMsg.sendToTarget();
                return true;
            }

            @Override
            public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback, FileChooserParams params) {
                if (filePathCallback != null) {
                    filePathCallback.onReceiveValue(null);
                }
                filePathCallback = callback;

                Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
                intent.setType("*/*");
                intent.addCategory(Intent.CATEGORY_OPENABLE);
                try {
                    startActivityForResult(Intent.createChooser(intent, "Select File"), FILE_CHOOSER_REQUEST_CODE);
                } catch (Exception e) {
                    filePathCallback = null;
                    return false;
                }
                return true;
            }
        });
    }

    private boolean handleUrlNavigation(String url) {
        if (url != null && (url.startsWith("http://") || url.startsWith("https://"))) {
            if (url.startsWith("file:///android_asset/")) {
                return false;
            }
            try {
                Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                browserIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(browserIntent);
                return true;
            } catch (Exception e) {
                return false;
            }
        }
        return false;
    }

    public class AndroidGalleryBridge {
        @JavascriptInterface
        public void openInBrowser(final String url) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    try {
                        Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                        browserIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                        MainActivity.this.startActivity(browserIntent);
                    } catch (Exception e) {
                        Toast.makeText(MainActivity.this, "Opening ad in browser...", Toast.LENGTH_SHORT).show();
                    }
                }
            });
        }

        @JavascriptInterface
        public void saveVideoToGallery(final String base64Data, final String mimeType, final String fileName) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    try {
                        byte[] videoBytes = Base64.decode(base64Data, Base64.DEFAULT);
                        String cleanFileName = (fileName != null && fileName.length() > 0) ? fileName : ("AnimStudio_" + System.currentTimeMillis() + ".webm");

                        File moviesDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MOVIES);
                        File animStudioDir = new File(moviesDir, "AnimStudio");
                        if (!animStudioDir.exists()) {
                            animStudioDir.mkdirs();
                        }
                        File file = new File(animStudioDir, cleanFileName);
                        FileOutputStream outputStream = new FileOutputStream(file);
                        outputStream.write(videoBytes);
                        outputStream.flush();
                        outputStream.close();

                        Intent mediaScanIntent = new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
                        Uri savedUri = Uri.fromFile(file);
                        mediaScanIntent.setData(savedUri);
                        sendBroadcast(mediaScanIntent);

                        Toast.makeText(MainActivity.this, "Exported directly to Gallery: " + cleanFileName, Toast.LENGTH_LONG).show();
                    } catch (Exception e) {
                        Toast.makeText(MainActivity.this, "Error saving: " + e.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                }
            });
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == FILE_CHOOSER_REQUEST_CODE) {
            if (filePathCallback != null) {
                Uri[] results = null;
                if (resultCode == Activity.RESULT_OK && data != null) {
                    String dataString = data.getDataString();
                    if (dataString != null) {
                        results = new Uri[]{Uri.parse(dataString)};
                    }
                }
                filePathCallback.onReceiveValue(results);
                filePathCallback = null;
            }
        }
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
EOF

# 8. Generate R.java with AAPT
aapt package -f -m -J /build-apk/gen -M /build-apk/AndroidManifest.xml -S /build-apk/res -I /usr/lib/android-sdk/platforms/android-23/android.jar

# 9. Compile Java sources
javac -proc:none -source 1.8 -target 1.8 -d /build-apk/obj -cp /usr/lib/android-sdk/platforms/android-23/android.jar /build-apk/gen/com/animstudio/app/R.java /build-apk/src/com/animstudio/app/MainActivity.java

# 10. Convert bytecode to Dalvik DEX
/usr/bin/dalvik-exchange --dex --output=/build-apk/bin/classes.dex /build-apk/obj

# 11. Package APK resources and assets
aapt package -f -M /build-apk/AndroidManifest.xml -S /build-apk/res -A /build-apk/assets -I /usr/lib/android-sdk/platforms/android-23/android.jar -F /build-apk/bin/AnimStudio.unsigned.apk

# 12. Add classes.dex
(cd /build-apk/bin && aapt add AnimStudio.unsigned.apk classes.dex)

# 13. Zipalign APK
zipalign -f -p 4 /build-apk/bin/AnimStudio.unsigned.apk /build-apk/bin/AnimStudio.aligned.apk

# 14. Sign with release keystore
if [ ! -f /build-apk/release.keystore ]; then
  keytool -genkey -v -keystore /build-apk/release.keystore -alias animstudio -keyalg RSA -keysize 2048 -validity 10000 -storepass animstudio123 -keypass animstudio123 -dname "CN=AnimStudio, OU=Animation, O=AnimStudio, L=SanFrancisco, ST=CA, C=US"
fi

apksigner sign --ks /build-apk/release.keystore --ks-pass pass:animstudio123 --key-pass pass:animstudio123 --out ./public/AnimStudio.apk /build-apk/bin/AnimStudio.aligned.apk
cp ./public/AnimStudio.apk ./dist/AnimStudio.apk

apksigner verify -v ./public/AnimStudio.apk

echo "=== APK Successfully Built & Signed (Strict Portrait Mode): public/AnimStudio.apk ==="
