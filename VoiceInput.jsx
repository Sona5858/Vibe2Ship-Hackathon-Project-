import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Loader2, Sparkles } from 'lucide-react';

const VoiceInput = ({ onVoiceSubmit }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      rec.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      setRecognition(rec);
    }
  }, []);

  const toggleRecording = () => {
    if (!recognition) {
      alert("Voice input is not supported in this browser. Try Chrome or Edge.");
      return;
    }

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      setTranscript('');
      recognition.start();
      setIsRecording(true);
    }
  };

  const handleSubmit = async () => {
    if (!transcript) return;
    setLoading(true);
    try {
      await onVoiceSubmit(transcript);
      setTranscript('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">AI Task Extraction (Voice)</h3>
        {isRecording && (
          <span className="flex items-center gap-1.5 text-xs text-red-400 font-medium">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
            Listening...
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleRecording}
          type="button"
          className={`h-16 w-16 rounded-full border flex items-center justify-center cursor-pointer smooth-transition shrink-0 ${
            isRecording 
              ? 'bg-red-500/10 border-red-500/30 text-red-500 shadow-lg shadow-red-500/10 animate-pulse' 
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
          }`}
        >
          {isRecording ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
        </button>

        <div className="flex-1 min-h-[64px] bg-slate-950/40 border border-slate-900 rounded-xl p-3 text-sm text-slate-300 flex items-center">
          {transcript ? (
            <p className="italic font-medium">{transcript}</p>
          ) : (
            <p className="text-slate-500 text-xs">Click mic to record e.g., "I need to draft the budget spreadsheet by Friday afternoon."</p>
          )}
        </div>
      </div>

      {transcript && !isRecording && (
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => setTranscript('')}
            disabled={loading}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg text-xs font-semibold smooth-transition"
          >
            Clear
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-800/40 text-slate-950 font-bold text-xs rounded-lg smooth-transition flex items-center gap-1.5"
          >
            {loading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Extracting...
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                Extract Voice Tasks
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default VoiceInput;
