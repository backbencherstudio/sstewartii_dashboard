import Image from 'next/image';
import React from 'react';
import { FileText, PlusCircle, MinusCircle, RotateCw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';


export default function DocumentViewer({ onClose }: { onClose: () => void }) {
  // Assuming this close handler is passed down or managed here
  const handleClose = () => {
    console.log("Closing document viewer");
  };

  return (
    <div className="w-full   bg-gray-50/50 rounded-2xl border border-gray-100 shadow-sm font-sans flex flex-col ">
      
      {/* 1. The Toolbar Section */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white rounded-t-2xl">
        {/* Document Title */}
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-gray-400" />
          <h2 className="text-xl font-medium text-gray-900 leading-tight">
            Business License.pdf
          </h2>
        </div>

        {/* Controls and Close Button */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-gray-500">
            <button  className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <PlusCircle className="w-6 h-6" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <MinusCircle className="w-6 h-6" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <RotateCw className="w-6 h-6" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
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
      <div className="grow flex items-center justify-center p-6 md:p-10 overflow-auto bg-white rounded-b-2xl">
        {/* Document Canvas (or Image) */}
     
     <div className='w-[800px]  aspect-[84/65] shadow-[0_0_20px_5px_rgba(0,0,0,0.15)]'>
     <Image
        src="/images/document-view.png"
        alt="Document View"
        width={1000}
        height={1000}
        className="object-contain"
       />
     </div>
      </div>
    </div>
  );
}