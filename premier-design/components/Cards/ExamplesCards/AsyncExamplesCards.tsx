import React, { Suspense } from 'react';
import ExamplesCards from './ExamplesCards';

const AsyncExamplesCards: React.FC<{ data: ExampleCardProps[] }> = (props) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ExamplesCards {...props} />
        </Suspense>
    );
};

export default AsyncExamplesCards;
