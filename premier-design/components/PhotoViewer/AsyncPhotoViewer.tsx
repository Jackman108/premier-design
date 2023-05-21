import React, { Suspense } from 'react';
import PhotoViewer, { PhotoViewerProps } from './PhotoViewer';

const AsyncPhotoViewer: React.FC<PhotoViewerProps> = (props) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PhotoViewer {...props} />
        </Suspense>
    );
};

export default AsyncPhotoViewer;
