package com.operationapp;

import com.facebook.react.ReactActivity;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {
  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      SplashScreen.show(this);
      View decorView = getWindow().getDecorView();
      decorView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
      if (Build.VERSION.SDK_INT >= 21) {
          getWindow().setStatusBarColor(Color.TRANSPARENT);
          getWindow().setNavigationBarColor(Color.parseColor("#f2f2f7"));
      }
  }
  
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "operationApp";
  }
}
