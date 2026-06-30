import React, { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';

const ImageUpload = ({ onExtract }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith('image/')) {
        setFile(droppedFile);
        setPreview(URL.createObjectURL(droppedFile));
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview('');
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      await onExtract(file);
      handleRemove();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800">
      <h3 className="text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider">AI Task Extraction (Image)</h3>
      
      {!file ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${
            dragActive 
              ? 'border-emerald-400 bg-emerald-500/5' 
              : 'border-slate-800 hover:border-slate-700 bg-slate-900/10'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="p-3 rounded-full bg-slate-900 border border-slate-800 mb-3">
            <Upload className="h-6 w-6 text-slate-400" />
          </div>
          <p className="text-sm font-semibold text-slate-300 text-center">Drag & drop syllabus, list, or handwritten note</p>
          <p className="text-xs text-slate-500 mt-1">PNG, JPG, or WEBP up to 5MB</p>
        </div>
      ) : (
        <div className="relative border border-slate-800 rounded-xl p-4 bg-slate-900/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <img src={preview} alt="Upload preview" className="h-14 w-14 rounded-lg object-cover border border-slate-800" />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-slate-200 truncate max-w-[180px]">{file.name}</p>
              <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleUpload}
              disabled={loading}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-800/40 text-slate-950 font-bold text-xs rounded-lg smooth-transition flex items-center justify-center gap-1.5"
            >
              {loading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Extracting...
                </>
              ) : (
                'Extract Tasks'
              )}
            </button>
            <button
              onClick={handleRemove}
              disabled={loading}
              className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-400 smooth-transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
