import Image from 'next/image';
import React, { useState } from 'react';
import { FileText, PlusCircle, MinusCircle, RotateCw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DocumentItem } from '@/types/vendor.types';

export default function DocumentViewer({ document, onClose }: { document: DocumentItem, onClose: () => void }) {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 300)); // Max zoom 300%
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 25)); // Min zoom 25%
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(document.fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = window.document.createElement('a');
      link.href = url;
      link.download = document.label || 'document';
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  console.dir(document);

  return (
    <div className="w-full bg-gray-50/50 rounded-2xl border border-gray-100 shadow-sm font-sans flex flex-col">
      
      {/* 1. The Toolbar Section */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white rounded-t-2xl">
        {/* Document Title */}
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-gray-400" />
          <h2 className="text-xl font-medium text-gray-900 leading-tight">
            {document.label}
          </h2>
        </div>

        {/* Controls and Close Button */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-gray-500">
            <button 
              onClick={handleZoomOut}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={zoomLevel <= 25}
            >
              <MinusCircle className="w-6 h-6" />
            </button>
            <span className="text-sm font-medium text-gray-700 min-w-[50px] text-center">
              {zoomLevel}%
            </span>
            <button 
              onClick={handleZoomIn}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={zoomLevel >= 300}
            >
              <PlusCircle className="w-6 h-6" />
            </button>
            <button 
              onClick={handleRotate}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <RotateCw className="w-6 h-6" />
            </button>
            <button 
              onClick={handleDownload}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Download className="w-6 h-6" />
            </button>
          </div>
          
          <Button                                                        
            onClick={onClose} 
            variant="outline" 
            className="text-lg font-medium border border-gray-200 text-gray-900 hover:bg-gray-100 transition-colors px-6 py-2 rounded-xl h-auto"
          >
            close
          </Button>
        </div>
      </div>

      {/* 2. The Document Content Area */}
      <div className="grow flex items-center justify-center p-6 md:p-10 bg-white rounded-b-2xl overflow-auto">
        {/* Document Canvas (or Image) */}
        <div className='w-[800px] h-[620px] shadow-[0_0_20px_5px_rgba(0,0,0,0.15)] overflow-hidden flex items-center justify-center bg-gray-50'>
          <div
            style={{
              transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
              transition: 'transform 0.2s ease-in-out',
            }}
          >
            <Image
              src={document.fileUrl}
              alt="Document View"
              width={1000}
              height={1000}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}