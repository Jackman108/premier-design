import React, {Suspense} from 'react';
import PhotoViewer from './PhotoViewer';
import {PhotoViewerProps} from "@features/examples/interface/PhotoViewer.props";

const AsyncPhotoViewer: React.FC<PhotoViewerProps> = (props) => {
    return (
        <Suspense fallback={<div>Подгружаем данные...</div>}>
            <PhotoViewer {...props} />
        </Suspense>
    );
};

export default AsyncPhotoViewer;
