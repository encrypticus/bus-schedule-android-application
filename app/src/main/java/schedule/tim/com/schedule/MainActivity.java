package schedule.tim.com.schedule;

import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Handler;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity implements SwipeRefreshLayout.OnRefreshListener {

    WebView vw;
    int blue;// yellow color
    int red;
    int green;
    int yellow;
    private SwipeRefreshLayout refresh;


    private void init(){
        vw = (WebView)findViewById(R.id.webView);
        blue = Color.BLUE;
        red = Color.RED;
        green = Color.GREEN;
        yellow = Color.YELLOW;
        refresh = (SwipeRefreshLayout) findViewById(R.id.refresh);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        init();

        vw.getSettings().setJavaScriptEnabled(true);
        vw.setWebChromeClient(new WebChromeClient());
        vw.loadUrl("file:///android_asset/index.html");

        refresh.setColorSchemeColors(blue, green, red, yellow);
        refresh.setOnRefreshListener(this);
        getSupportActionBar().setBackgroundDrawable(new ColorDrawable(Color.GREEN));
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.settings, menu);
        return super.onCreateOptionsMenu(menu);
    }

    public void reloadUI(MenuItem item){
        onRefresh();
    }

    private void showMessage(String message){
        Toast toast = Toast.makeText(getApplicationContext(), message, Toast.LENGTH_LONG);
        toast.show();
    }

    @Override
    public void onBackPressed() {
        showMessage("Удачи на дорогах :-)");
        finish();
        super.onBackPressed();
    }

    @Override
    public void onRefresh() {

        vw.reload();

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                refresh.setRefreshing(false);
            }

        }, 2000);
    }
}
