import React, { Suspense } from 'react';
import PhotoViewer from './PhotoViewer';
import {PhotoViewerProps} from "../../interface/PhotoViewer.props";

const AsyncPhotoViewer: React.FC<PhotoViewerProps> = (props) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PhotoViewer {...props} />
        </Suspense>
    );
};

export default AsyncPhotoViewer;
