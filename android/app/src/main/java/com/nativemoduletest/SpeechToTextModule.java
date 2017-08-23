package com.nativemoduletest;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.speech.RecognizerIntent;
import android.widget.Toast;
import android.widget.TextView;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.List;

import javax.annotation.Nullable;

public class SpeechToTextModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    private final int SPEECH_RECOGNITION_CODE = 1;
    private Promise speech;
    private ReactApplicationContext mReactContext;

    private TextView voiceInput;
    private TextView speakButton;
    private final int REQ_CODE_SPEECH_INPUT = 100;

    public SpeechToTextModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
        mReactContext = reactContext;
    }

    @ReactMethod
    public void writeSpeech(Promise promise) {
        speechToText();
        speech = promise;
    }

    public void speechToText() {
        // Showing google speech input dialog
        Activity currentActivity = getCurrentActivity();
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL,
                RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault());
        intent.putExtra(RecognizerIntent.EXTRA_PROMPT,
                "Hi speak something");
        try {
            currentActivity.startActivityForResult(intent, REQ_CODE_SPEECH_INPUT);
        } catch (ActivityNotFoundException a) {
 
        }

    }

    @Override
    public String getName() {
        return "SpeechToText";
    }

    
    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        // Receiving speech input
 
        switch (requestCode) {
            case REQ_CODE_SPEECH_INPUT: {
                if (null != data) {
 
                    ArrayList<String> result = data
                            .getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
                    speech.resolve(result.get(0));
                }
                break;
            }
 
        }
    }

    @Override
    public void onNewIntent(Intent intent) {

    }
}
